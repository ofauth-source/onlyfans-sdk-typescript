import { createHmac } from 'node:crypto';
import { createHash } from 'node:crypto';
import { describe, expect, it, vi } from 'vitest';
import {
  OFAuthAPIError,
  OFAuthClient,
  OFAuthError,
  WebhookRouter,
  md5Hex,
  verifyWebhook,
  type AccessUploadsFinalizeResponse,
  type MediaAsset,
  type UploadMediaResult,
} from '../src/index';
import { request } from '../src/runtime';

type Call = { url: string; init: RequestInit & { headers: Record<string, string> } };

function mockFetch(...responses: Array<Response | ((call: Call) => Response)>) {
  const calls: Call[] = [];
  const fn = vi.fn(async (url: string | URL | Request, init?: RequestInit) => {
    const call = { url: String(url), init: init as Call['init'] };
    calls.push(call);
    const next = responses.length > 1 ? responses.shift()! : responses[0];
    return typeof next === 'function' ? next(call) : next.clone();
  });
  return { fetch: fn as unknown as typeof fetch, calls };
}

const json = (body: unknown, status = 200, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', ...headers } });

describe('client requests', () => {
  it('sends the bearer token and linked account header', async () => {
    const { fetch, calls } = mockFetch(json({ id: 1 }));
    const client = new OFAuthClient({ accessToken: 'tok', linkedAccountId: 'conn_1', fetch, baseUrl: 'https://api.test' });
    await client.access.profile.get();
    expect(calls[0].url).toBe('https://api.test/v3/access/profile');
    expect(calls[0].init.headers.authorization).toBe('Bearer tok');
    expect(calls[0].init.headers['x-linked-account-id']).toBe('conn_1');
  });

  it('lets a call override the linked account and encodes path params and query', async () => {
    const { fetch, calls } = mockFetch(json({ items: [], page: { nextCursor: null, hasMore: false } }));
    const client = new OFAuthClient({ accessToken: 'tok', linkedAccountId: 'conn_1', fetch });
    await client.access.chats.messages.list({ userId: '12/3', limit: 5, linkedAccountId: 'conn_2' });
    expect(calls[0].url).toBe('https://api.ofauth.com/v3/access/chats/12%2F3/messages?limit=5');
    expect(calls[0].init.headers['x-linked-account-id']).toBe('conn_2');
  });

  it('sends JSON bodies', async () => {
    const { fetch, calls } = mockFetch(json({ id: 9 }));
    const client = new OFAuthClient({ accessToken: 'tok', linkedAccountId: 'conn_1', fetch });
    await client.access.chats.messages.send({ userId: 1, body: { text: 'hi' } });
    expect(calls[0].init.method).toBe('POST');
    expect(calls[0].init.body).toBe('{"text":"hi"}');
    expect(calls[0].init.headers['content-type']).toBe('application/json');
  });

  it('requires a linked account for Access operations', async () => {
    const { fetch } = mockFetch(json({}));
    const client = new OFAuthClient({ accessToken: 'tok', fetch });
    await expect(client.access.profile.get()).rejects.toBeInstanceOf(OFAuthError);
  });

  it('does not send x-linked-account-id to linked-accounts routes', async () => {
    const { fetch, calls } = mockFetch(json({ data: [], has_more: false, next_cursor: null }));
    const client = new OFAuthClient({ accessToken: 'tok', linkedAccountId: 'conn_1', fetch });
    await client.linkedAccounts.list({ limit: 10 });
    expect(calls[0].url).toBe('https://api.ofauth.com/v3/linked-accounts?limit=10');
    expect(calls[0].init.headers['x-linked-account-id']).toBeUndefined();
  });

  it('parses the error envelope', async () => {
    const { fetch } = mockFetch(
      json(
        { error: 'linked_account_reconnect_required', recovery: { action: 'reconnect_linked_account' }, requestId: 'req_1' },
        401,
      ),
    );
    const client = new OFAuthClient({ accessToken: 'tok', linkedAccountId: 'conn_1', fetch });
    const error = await client.access.profile.get().catch((e) => e);
    expect(error).toBeInstanceOf(OFAuthAPIError);
    expect(error.status).toBe(401);
    expect(error.code).toBe('linked_account_reconnect_required');
    expect(error.recoveryAction).toBe('reconnect_linked_account');
    expect(error.requestId).toBe('req_1');
  });

  it('reads Retry-After and the x-request-id header', async () => {
    const { fetch } = mockFetch(
      json({ error: 'rate_limited', recovery: { action: 'retry' } }, 429, { 'retry-after': '7', 'x-request-id': 'req_h' }),
    );
    const client = new OFAuthClient({ accessToken: 'tok', linkedAccountId: 'conn_1', fetch, maxRetries: 0 });
    const error = (await client.access.profile.get().catch((e) => e)) as OFAuthAPIError;
    expect(error.retryAfter).toBe(7);
    expect(error.requestId).toBe('req_h');
  });

  it('retries once with a refreshed token after invalid_token', async () => {
    const { fetch, calls } = mockFetch(
      json({ error: 'invalid_token', recovery: { action: 'obtain_external_oauth_token' } }, 401),
      json({ id: 1 }),
    );
    const provider = vi.fn(async ({ forceRefresh }: { forceRefresh: boolean }) => (forceRefresh ? 'fresh' : 'stale'));
    const client = new OFAuthClient({ accessToken: provider, linkedAccountId: 'conn_1', fetch });
    await expect(client.access.profile.get()).resolves.toEqual({ id: 1 });
    expect(calls.map((c) => c.init.headers.authorization)).toEqual(['Bearer stale', 'Bearer fresh']);
  });

  it('does not retry with a static token', async () => {
    const { fetch, calls } = mockFetch(json({ error: 'invalid_token' }, 401));
    const client = new OFAuthClient({ accessToken: 'tok', linkedAccountId: 'conn_1', fetch });
    await expect(client.access.profile.get()).rejects.toBeInstanceOf(OFAuthAPIError);
    expect(calls).toHaveLength(1);
  });

  it('returns undefined for 204', async () => {
    const { fetch } = mockFetch(new Response(null, { status: 204 }));
    const client = new OFAuthClient({ accessToken: 'tok', fetch });
    await expect(client.linkedAccounts.remove({ id: 'conn_1' })).resolves.toBeUndefined();
  });
});

describe('pagination', () => {
  it('follows page.nextCursor', async () => {
    const { fetch, calls } = mockFetch(
      json({ items: [{ user: { id: 1 } }, { user: { id: 2 } }], page: { nextCursor: 'c2', hasMore: true } }),
      json({ items: [{ user: { id: 3 } }], page: { nextCursor: null, hasMore: false } }),
    );
    const client = new OFAuthClient({ accessToken: 'tok', linkedAccountId: 'conn_1', fetch });
    const ids: number[] = [];
    for await (const chat of client.access.chats.iterate({ limit: 2 })) ids.push(chat.user.id);
    expect(ids).toEqual([1, 2, 3]);
    expect(calls[1].url).toContain('cursor=c2');
  });

  it('follows next_cursor for linked accounts and honors maxItems', async () => {
    const { fetch, calls } = mockFetch(
      json({ data: [{ id: 'a' }, { id: 'b' }], has_more: true, next_cursor: 'n1' }),
      json({ data: [{ id: 'c' }], has_more: false, next_cursor: null }),
    );
    const client = new OFAuthClient({ accessToken: 'tok', fetch });
    const all: string[] = [];
    for await (const account of client.linkedAccounts.iterate()) all.push(account.id);
    expect(all).toEqual(['a', 'b', 'c']);

    const limited: string[] = [];
    calls.length = 0;
    for await (const account of client.linkedAccounts.iterate({}, { maxItems: 1 })) limited.push(account.id);
    expect(limited).toEqual(['c']);
  });
});

describe('webhooks', () => {
  const secretBytes = Buffer.from('test-webhook-secret-bytes');
  const secret = `whsec_${secretBytes.toString('base64')}`;
  const event = {
    eventId: 'evt_1',
    type: 'authorization.revoked',
    schemaVersion: '1',
    order: 1,
    occurredAt: '2026-10-12T14:30:15.143Z',
    environment: 'live',
    integrationId: 'int_1',
    externalOauthClientId: 'c_1',
    authorizationId: 'external_live_1',
    linkedAccountId: null,
    test: false,
    data: { authorization_id: 'external_live_1', reason: 'owner_revoked', linked_account_ids: ['conn_1'] },
  };
  const body = JSON.stringify(event);
  const sign = (id: string, ts: number, payload: string) =>
    createHmac('sha256', secretBytes).update(`${id}.${ts}.${payload}`).digest('base64');
  const now = Math.floor(Date.now() / 1000);
  const headers = (prefix = 'webhook') => ({
    [`${prefix}-id`]: 'msg_1',
    [`${prefix}-timestamp`]: String(now),
    [`${prefix}-signature`]: `v1,bogus v1,${sign('msg_1', now, body)}`,
  });

  it('verifies a valid delivery', async () => {
    await expect(verifyWebhook(body, headers(), secret)).resolves.toEqual(event);
    await expect(verifyWebhook(new TextEncoder().encode(body), new Headers(headers()), secret)).resolves.toEqual(event);
  });

  it('accepts svix headers', async () => {
    await expect(verifyWebhook(body, headers('svix'), secret)).resolves.toEqual(event);
  });

  it('rejects bad signatures, old timestamps, and missing headers', async () => {
    await expect(verifyWebhook(body + ' ', headers(), secret)).rejects.toMatchObject({ code: 'SIGNATURE_MISMATCH' });
    const old = now - 600;
    await expect(
      verifyWebhook(body, { 'webhook-id': 'msg_1', 'webhook-timestamp': String(old), 'webhook-signature': `v1,${sign('msg_1', old, body)}` }, secret),
    ).rejects.toMatchObject({ code: 'TIMESTAMP_OUT_OF_TOLERANCE' });
    await expect(verifyWebhook(body, {}, secret)).rejects.toMatchObject({ code: 'MISSING_HEADERS' });
  });

  it('routes by type', async () => {
    const revoked = vi.fn();
    const fallback = vi.fn();
    const router = new WebhookRouter({ secret }).on('authorization.revoked', revoked).onDefault(fallback);
    await router.handle(body, headers());
    expect(revoked).toHaveBeenCalledWith(event);
    expect(fallback).not.toHaveBeenCalled();
  });
});

describe('uploads', () => {
  it('computes MD5', () => {
    for (const input of ['', 'abc', 'x'.repeat(1000)]) {
      expect(md5Hex(new TextEncoder().encode(input))).toBe(createHash('md5').update(input).digest('hex'));
    }
  });

  it('starts, uploads parts, and finalizes', async () => {
    const data = new Uint8Array(10).map((_, i) => i);
    const { fetch, calls } = mockFetch(
      json({
        status: 'needs_upload',
        uploadId: 'upload:1',
        uploadType: 'multipart',
        totalParts: 2,
        partSize: 6,
        expiresAt: '2026-01-01T00:00:00Z',
        parts: [
          { partNumber: 1, uploadUrl: 'https://api.ofauth.com/v3/access/uploads/upload%3A1/parts/1', byteRange: { start: 0, end: 5 } },
          { partNumber: 2, uploadUrl: 'https://api.ofauth.com/v3/access/uploads/upload%3A1/parts/2', byteRange: { start: 6, end: 9 } },
        ],
      }),
      json({ uploadId: 'upload:1', partNumber: 1 }),
      json({ uploadId: 'upload:1', partNumber: 2 }),
      json({ uploadIds: ['upload:1'] }),
    );
    const client = new OFAuthClient({ accessToken: 'tok', linkedAccountId: 'conn_1', fetch });
    const progress: number[] = [];
    const result = await client.uploadMedia(data, { filename: 'upload.png', contentType: 'image/png', onProgress: (n) => progress.push(n) });

    expect(result).toEqual({ status: 'uploaded', uploadId: 'upload:1', finalize: { uploadIds: ['upload:1'] } });
    expect(JSON.parse(String(calls[0].init.body))).toEqual({ filename: 'upload.png', etag: md5Hex(data), size: 10, contentType: 'image/png' });
    expect(calls[1].url).toBe('https://api.ofauth.com/v3/access/uploads/upload%3A1/parts/1');
    expect(calls[1].init.headers['content-type']).toBe('image/png');
    expect(calls[1].init.headers.authorization).toBe('Bearer tok');
    expect(calls[1].init.redirect).toBe('error');
    expect(Array.from(calls[2].init.body as Uint8Array)).toEqual([6, 7, 8, 9]);
    expect(calls[3].url).toBe('https://api.ofauth.com/v3/access/uploads/finalize');
    expect(progress).toEqual([6, 10]);
  });

  it('returns existing media without uploading', async () => {
    const { fetch, calls } = mockFetch(json({ status: 'already_exists', media: { id: 42 } }));
    const client = new OFAuthClient({ accessToken: 'tok', linkedAccountId: 'conn_1', fetch });
    const result: UploadMediaResult = await client.uploadMedia(new Uint8Array([1]), { filename: 'upload.png', contentType: 'image/png' });
    expect(result).toEqual({ status: 'already_exists', media: { id: 42 }, mediaId: 42 });
    if (result.status === 'already_exists') {
      // Typed as the generated vault media model.
      const media: MediaAsset = result.media;
      expect(media.id).toBe(42);
    }
    expect(calls).toHaveLength(1);
  });

  const startWithPart = (uploadUrl: string) =>
    json({ status: 'needs_upload', uploadId: 'u', parts: [{ partNumber: 1, uploadUrl, byteRange: { start: 0, end: 0 } }] });

  it('uploads parts on the configured baseUrl origin', async () => {
    const { fetch, calls } = mockFetch(
      startWithPart('https://api.test:8443/v3/access/uploads/u/parts/1'),
      json({ uploadId: 'u', partNumber: 1 }),
      json({ uploadIds: ['u'] }),
    );
    const client = new OFAuthClient({ accessToken: 'tok', linkedAccountId: 'conn_1', fetch, baseUrl: 'HTTPS://API.test:8443/' });
    await client.uploadMedia(new Uint8Array([1]), { filename: 'upload.png', contentType: 'image/png' });
    expect(calls.map((c) => c.url)).toEqual([
      'HTTPS://API.test:8443/v3/access/uploads/start',
      'https://api.test:8443/v3/access/uploads/u/parts/1',
      'HTTPS://API.test:8443/v3/access/uploads/finalize',
    ]);
  });

  it.each([
    ['another host', 'https://evil.example/v3/access/uploads/u/parts/1'],
    ['a subdomain', 'https://uploads.api.ofauth.com/v3/access/uploads/u/parts/1'],
    ['another scheme', 'http://api.ofauth.com/v3/access/uploads/u/parts/1'],
    ['another port', 'https://api.ofauth.com:8443/v3/access/uploads/u/parts/1'],
    ['userinfo tricks', 'https://api.ofauth.com@evil.example/v3/access/uploads/u/parts/1'],
  ])('refuses a part URL on %s without sending it', async (_, uploadUrl) => {
    const { fetch, calls } = mockFetch(startWithPart(uploadUrl), json({}));
    const client = new OFAuthClient({ accessToken: 'tok', linkedAccountId: 'conn_1', fetch });
    const err = await client.uploadMedia(new Uint8Array([1]), { filename: 'upload.png', contentType: 'image/png' }).catch((e) => e);
    expect(err).toBeInstanceOf(OFAuthError);
    expect(err.message).toMatch(/not the API origin \(https:\/\/api\.ofauth\.com\)/);
    expect(calls).toHaveLength(1); // only the start call; no part PUT, no finalize
  });

  it('checks absolute request URLs but leaves relative paths alone', async () => {
    const { fetch, calls } = mockFetch(json({ id: 1 }));
    const config = { accessToken: 'tok', fetch, baseUrl: 'https://api.test' };
    await request(config, { method: 'GET', path: '/v3/access/profile' });
    await request(config, { method: 'GET', path: '/x', url: 'https://api.test:443/v3/x' });
    await expect(request(config, { method: 'GET', path: '/x', url: 'https://api.ofauth.com/v3/x' })).rejects.toThrow(OFAuthError);
    await expect(request(config, { method: 'GET', path: '/x', url: '/v3/x' })).rejects.toThrow(/not an absolute URL/);
    expect(calls.map((c) => c.url)).toEqual(['https://api.test/v3/access/profile', 'https://api.test:443/v3/x']);
  });

  it('saves to the vault and extracts the vault media ids', async () => {
    const { fetch, calls } = mockFetch(
      json({
        status: 'needs_upload',
        uploadId: 'upload:1',
        parts: [{ partNumber: 1, uploadUrl: 'https://api.ofauth.com/v3/access/uploads/upload%3A1/parts/1', byteRange: { start: 0, end: 0 } }],
      }),
      json({ uploadId: 'upload:1', partNumber: 1 }),
      json({ listId: 5, uploads: [{ uploadId: 'upload:1', mediaId: 9001, media: { id: 9001 } }] }),
    );
    const client = new OFAuthClient({ accessToken: 'tok', linkedAccountId: 'conn_1', fetch });
    const result = await client.uploadMedia(new Uint8Array([1]), { filename: 'upload.png',
      contentType: 'image/png',
      vaultUpload: { userId: 'u1', listId: 5 },
    });
    expect(result).toMatchObject({ status: 'uploaded', uploadId: 'upload:1', vaultMediaIds: [9001] });
    if (result.status === 'uploaded') {
      const finalize: AccessUploadsFinalizeResponse = result.finalize;
      expect('uploads' in finalize && finalize.uploads[0].mediaId).toBe(9001);
    }
    expect(JSON.parse(String(calls[2].init.body))).toEqual({ uploadIds: ['upload:1'], vaultUpload: { userId: 'u1', listId: 5 } });
  });

  it('reads vault media ids from mediaIds or media[].id when uploads is absent', async () => {
    const upload = async (finalize: unknown) => {
      const { fetch } = mockFetch(
        json({
          status: 'needs_upload',
          uploadId: 'u',
          parts: [{ partNumber: 1, uploadUrl: 'https://api.ofauth.com/v3/access/uploads/u/parts/1', byteRange: { start: 0, end: 0 } }],
        }),
        json({}),
        json(finalize),
      );
      const client = new OFAuthClient({ accessToken: 'tok', linkedAccountId: 'conn_1', fetch });
      const result = await client.uploadMedia(new Uint8Array([1]), { filename: 'upload.png', contentType: 'image/png', vaultUpload: { userId: 'u1' } });
      return result.status === 'uploaded' ? result.vaultMediaIds : undefined;
    };
    expect(await upload({ mediaIds: [1, '2'] })).toEqual([1, 2]);
    expect(await upload({ media: [{ id: 3 }, { id: null }] })).toEqual([3]);
    expect(await upload({ uploadIds: ['u'] })).toEqual([]);
  });
});
