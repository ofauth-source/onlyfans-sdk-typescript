import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { OFAuthAPIError, OFAuthClient, OFAuthConnectionError, OFAuthTimeoutError } from '../src/index';
import { apiError, hangingFetch, json, mockFetch } from './helpers';

const client = (fetch: typeof globalThis.fetch, extra: Partial<ConstructorParameters<typeof OFAuthClient>[0]> = {}) =>
  new OFAuthClient({ accessToken: 'tok', linkedAccountId: 'conn_1', fetch, ...extra });

/** Settle a promise while running fake timers, without unhandled rejections. */
async function settle<T>(promise: Promise<T>): Promise<{ value?: T; error?: any }> {
  const result = promise.then(
    (value) => ({ value }),
    (error) => ({ error }),
  );
  await vi.runAllTimersAsync();
  return result;
}

beforeEach(() => {
  vi.useFakeTimers();
  vi.spyOn(Math, 'random').mockReturnValue(0.5);
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe('retries', () => {
  it('retries idempotent requests on 502/503/504 and reports attempts', async () => {
    const { fetch, calls } = mockFetch(
      apiError(503, 'transient_provider_failure', {}, 'retry'),
      apiError(502, 'bad_gateway'),
      json({ id: 1 }),
    );
    const { value } = await settle(client(fetch).access.profile.get());
    expect(value).toEqual({ id: 1 });
    expect(calls).toHaveLength(3);
  });

  it('does not retry non-idempotent requests on 503', async () => {
    const { fetch, calls } = mockFetch(apiError(503, 'transient_provider_failure'), json({}));
    const { error } = await settle(client(fetch).access.chats.messages.send({ userId: 1, body: { text: 'hi' } }));
    expect(error).toBeInstanceOf(OFAuthAPIError);
    expect(error.attempts).toBe(1);
    expect(calls).toHaveLength(1);
  });

  it('retries any method on 503 authorization_temporarily_unavailable', async () => {
    const { fetch, calls } = mockFetch(apiError(503, 'authorization_temporarily_unavailable'), json({ id: 2 }));
    const { value } = await settle(client(fetch).access.chats.messages.send({ userId: 1, body: { text: 'hi' } }));
    expect(value).toEqual({ id: 2 });
    expect(calls).toHaveLength(2);
  });

  it('retries 429 for any method and waits Retry-After seconds', async () => {
    const { fetch, calls } = mockFetch(apiError(429, 'rate_limited', { 'retry-after': '2' }, 'retry'), json({ id: 3 }));
    const promise = client(fetch).access.chats.messages.send({ userId: 1, body: { text: 'hi' } });
    await vi.advanceTimersByTimeAsync(1999);
    expect(calls).toHaveLength(1);
    await vi.advanceTimersByTimeAsync(1);
    expect(calls).toHaveLength(2);
    await expect(promise).resolves.toEqual({ id: 3 });
  });

  it('accepts Retry-After as an HTTP date', async () => {
    vi.setSystemTime(new Date('2026-01-01T00:00:00Z'));
    const { fetch, calls } = mockFetch(
      apiError(429, 'rate_limited', { 'retry-after': 'Thu, 01 Jan 2026 00:00:03 GMT' }),
      json({ ok: true }),
    );
    const promise = client(fetch).access.profile.get();
    await vi.advanceTimersByTimeAsync(2999);
    expect(calls).toHaveLength(1);
    await vi.advanceTimersByTimeAsync(1);
    await expect(promise).resolves.toEqual({ ok: true });
  });

  it('falls back to RateLimit-Reset', async () => {
    const { fetch, calls } = mockFetch(apiError(429, 'rate_limited', { 'ratelimit-reset': '5' }), json({ ok: true }));
    const promise = client(fetch).access.profile.get();
    await vi.advanceTimersByTimeAsync(4999);
    expect(calls).toHaveLength(1);
    await vi.advanceTimersByTimeAsync(1);
    await expect(promise).resolves.toEqual({ ok: true });
  });

  it('does not wait out delays longer than maxRetryDelay (quota_exhausted)', async () => {
    const { fetch, calls } = mockFetch(
      apiError(429, 'quota_exhausted', { 'retry-after': '3600' }, 'retry_after_reset'),
      json({}),
    );
    const { error } = await settle(client(fetch).access.profile.get());
    expect(error).toMatchObject({ code: 'quota_exhausted', retryAfter: 3600, attempts: 1 });
    expect(calls).toHaveLength(1);

    const patient = mockFetch(apiError(429, 'quota_exhausted', { 'retry-after': '3600' }), json({ ok: 1 }));
    const { value } = await settle(client(patient.fetch, { maxRetryDelay: 3_600_000 }).access.profile.get());
    expect(value).toEqual({ ok: 1 });
  });

  it('never retries other 4xx', async () => {
    const { fetch, calls } = mockFetch(apiError(400, 'invalid_request'), json({}));
    const { error } = await settle(client(fetch).access.profile.get());
    expect(error.code).toBe('invalid_request');
    expect(calls).toHaveLength(1);
  });

  it('stops after maxRetries and exposes the attempt count', async () => {
    const { fetch, calls } = mockFetch(apiError(503, 'transient_provider_failure'));
    const { error } = await settle(client(fetch).access.profile.get());
    expect(error).toBeInstanceOf(OFAuthAPIError);
    expect(error.attempts).toBe(3);
    expect(calls).toHaveLength(3);
  });

  it('can be disabled on the client or per call', async () => {
    const a = mockFetch(apiError(503, 'transient_provider_failure'));
    await settle(client(a.fetch, { maxRetries: 0 }).access.profile.get());
    expect(a.calls).toHaveLength(1);

    const b = mockFetch(apiError(503, 'transient_provider_failure'));
    await settle(client(b.fetch).access.profile.get({}, { maxRetries: 0 }));
    expect(b.calls).toHaveLength(1);

    const c = mockFetch(apiError(503, 'transient_provider_failure'));
    await settle(client(c.fetch, { maxRetries: 0 }).access.profile.get({}, { maxRetries: 4 }));
    expect(c.calls).toHaveLength(5);
  });

  it('backs off exponentially with full jitter, capped at 8s', async () => {
    vi.mocked(Math.random).mockReturnValue(1);
    const lines: string[] = [];
    const { fetch } = mockFetch(apiError(503, 'transient_provider_failure'));
    await settle(client(fetch, { maxRetries: 6, debug: (line) => lines.push(line) }).access.profile.get());
    const delays = lines.filter((l) => l.includes('retrying')).map((l) => /in ([\d.]+)s/.exec(l)![1]);
    expect(delays).toEqual(['0.5', '1.0', '2.0', '4.0', '8.0', '8.0']);
  });

  it('retries network errors for idempotent methods only', async () => {
    const get = mockFetch(new TypeError('fetch failed'), json({ id: 1 }));
    expect((await settle(client(get.fetch).access.profile.get())).value).toEqual({ id: 1 });
    expect(get.calls).toHaveLength(2);

    const post = mockFetch(new TypeError('fetch failed'), json({ id: 1 }));
    const { error } = await settle(client(post.fetch).access.chats.messages.send({ userId: 1, body: {} }));
    expect(error).toBeInstanceOf(OFAuthConnectionError);
    expect(error.cause).toBeInstanceOf(TypeError);
    expect(error.attempts).toBe(1);
    expect(error.operation).toBe('access.chats.messages.send');
    expect(post.calls).toHaveLength(1);
  });

  it('rethrows errors thrown on purpose by a custom fetch, without retrying or wrapping', async () => {
    class PolicyRefusal extends Error {}
    const refusal = new PolicyRefusal('blocked by policy');
    const { fetch, calls } = mockFetch(refusal, json({ id: 1 }));
    const seen: unknown[] = [];
    const { error } = await settle(client(fetch, { onResponse: (info) => seen.push(info.error) }).access.profile.get());
    expect(error).toBe(refusal);
    expect(calls).toHaveLength(1);
    expect(seen).toEqual([refusal]);
  });

  it('treats errors with a socket error code (itself or in cause) as network failures', async () => {
    const reset = Object.assign(new Error('socket hang up'), { code: 'ECONNRESET' });
    const wrapped = new Error('request failed', { cause: { code: 'UND_ERR_SOCKET' } });
    const { fetch, calls } = mockFetch(reset, wrapped, json({ id: 1 }));
    expect((await settle(client(fetch).access.profile.get())).value).toEqual({ id: 1 });
    expect(calls).toHaveLength(3);

    const failing = mockFetch(reset);
    const { error } = await settle(client(failing.fetch, { maxRetries: 1 }).access.profile.get());
    expect(error).toBeInstanceOf(OFAuthConnectionError);
    expect(error.cause).toBe(reset);
    expect(error.attempts).toBe(2);
  });

  it('times out each attempt', async () => {
    const { fetch, calls } = mockFetch(hangingFetch);
    const promise = settle(client(fetch, { timeout: 1000, maxRetries: 1 }).access.profile.get());
    const { error } = await promise;
    expect(error).toBeInstanceOf(OFAuthTimeoutError);
    expect(error.timeout).toBe(1000);
    expect(error.attempts).toBe(2);
    expect(calls).toHaveLength(2);
  });

  it('applies a per-call timeout', async () => {
    const { fetch } = mockFetch(hangingFetch);
    const promise = client(fetch, { maxRetries: 0 }).access.profile.get({}, { timeout: 50 }).catch((e) => e);
    await vi.advanceTimersByTimeAsync(50);
    expect(await promise).toBeInstanceOf(OFAuthTimeoutError);
  });

  it('never retries after the caller aborts', async () => {
    const controller = new AbortController();
    const { fetch, calls } = mockFetch(hangingFetch);
    const promise = client(fetch).access.profile.get({}, { signal: controller.signal }).catch((e) => e);
    await vi.advanceTimersByTimeAsync(10);
    controller.abort(new Error('user cancelled'));
    const error = await promise;
    expect(error.message).toBe('user cancelled');
    await vi.runAllTimersAsync();
    expect(calls).toHaveLength(1);
  });

  it('stops waiting between retries when aborted', async () => {
    const controller = new AbortController();
    const { fetch, calls } = mockFetch(apiError(503, 'transient_provider_failure'));
    const promise = client(fetch).access.profile.get({}, { signal: controller.signal }).catch((e) => e);
    await vi.advanceTimersByTimeAsync(0);
    controller.abort(new Error('stop'));
    expect((await promise).message).toBe('stop');
    expect(calls).toHaveLength(1);
  });

  it('does not count the invalid_token refresh against maxRetries', async () => {
    const { fetch, calls } = mockFetch(
      apiError(401, 'invalid_token', {}, 'obtain_external_oauth_token'),
      apiError(503, 'transient_provider_failure'),
      json({ id: 1 }),
    );
    const provider = vi.fn(async ({ forceRefresh }: { forceRefresh: boolean }) => (forceRefresh ? 'fresh' : 'cached'));
    const { value } = await settle(client(fetch, { accessToken: provider, maxRetries: 1 }).access.profile.get());
    expect(value).toEqual({ id: 1 });
    expect(calls.map((c) => c.init.headers.authorization)).toEqual(['Bearer cached', 'Bearer fresh', 'Bearer cached']);
  });

  it('gives upload part PUTs at least 300s per attempt', async () => {
    const { fetch, calls } = mockFetch(
      json({
        status: 'needs_upload',
        uploadId: 'u1',
        parts: [{ partNumber: 1, uploadUrl: 'https://api.ofauth.com/v3/access/uploads/u1/parts/1', byteRange: { start: 0, end: 1 } }],
      }),
      hangingFetch,
    );
    const promise = client(fetch, { timeout: 1000, maxRetries: 0 })
      .uploadMedia(new Uint8Array([1, 2]), { filename: 'upload.png', contentType: 'image/png' })
      .catch((e) => e);
    await vi.advanceTimersByTimeAsync(299_999);
    expect(calls).toHaveLength(2);
    let settled = false;
    promise.then(() => (settled = true));
    await vi.advanceTimersByTimeAsync(0);
    expect(settled).toBe(false);
    await vi.advanceTimersByTimeAsync(1);
    expect(await promise).toBeInstanceOf(OFAuthTimeoutError);
  });
});
