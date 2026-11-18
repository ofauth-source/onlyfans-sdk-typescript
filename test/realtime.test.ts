import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  OFAuthAPIError,
  OFAuthClient,
  OFAuthError,
  REALTIME_EVENT_TYPES,
  type RealtimeCloseInfo,
  type RealtimeEvent,
  type RequestHookInfo,
  type ResponseHookInfo,
} from '../src/index';
import { SseParser, type SseMessage } from '../src/realtime-sse';
import { json, mockFetch } from './helpers';
import { closedFrame, eventFrame, frame, sseFetch } from './sse';

const tick = (ms = 0) => vi.advanceTimersByTimeAsync(ms);

beforeEach(() => {
  vi.useFakeTimers();
  // No jitter: each backoff is its lower bound.
  vi.spyOn(Math, 'random').mockReturnValue(0);
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

function recorder() {
  const requests: RequestHookInfo[] = [];
  const responses: ResponseHookInfo[] = [];
  const lines: string[] = [];
  return {
    requests,
    responses,
    lines,
    hooks: {
      onRequest: (info: RequestHookInfo) => requests.push(info),
      onResponse: (info: ResponseHookInfo) => responses.push(info),
      debug: (line: string) => lines.push(line),
    },
  };
}

function track(realtime: ReturnType<OFAuthClient['realtime']>) {
  const events: RealtimeEvent[] = [];
  const closes: RealtimeCloseInfo[] = [];
  const errors: unknown[] = [];
  let opens = 0;
  let resyncs = 0;
  realtime.onEvent((event) => events.push(event));
  realtime.onClose((info) => closes.push(info));
  realtime.onError((error) => errors.push(error));
  realtime.onOpen(() => opens++);
  realtime.onResync(() => resyncs++);
  return { events, closes, errors, opens: () => opens, resyncs: () => resyncs };
}

/** A connected stream for `conn_1`, with the given fetch replies. */
async function connected(replies: Parameters<typeof sseFetch>, config: Partial<ConstructorParameters<typeof OFAuthClient>[0]> = {}, options: Parameters<OFAuthClient['realtime']>[0] = {}) {
  const server = sseFetch(...replies);
  const client = new OFAuthClient({ accessToken: 'tok', linkedAccountId: 'conn_1', fetch: server.fetch, ...config });
  const realtime = client.realtime(options);
  const seen = track(realtime);
  const connecting = realtime.connect();
  await tick();
  await connecting;
  return { server, realtime, seen };
}

describe('SSE parser', () => {
  function parse(chunks: string[]) {
    const messages: SseMessage[] = [];
    const retries: number[] = [];
    const comments: string[] = [];
    const parser = new SseParser({
      onMessage: (m) => messages.push(m),
      onRetry: (ms) => retries.push(ms),
      onComment: (text) => comments.push(text),
    });
    for (const chunk of chunks) parser.push(chunk);
    return { messages, retries, comments, parser };
  }

  it('parses events split across chunks anywhere, including inside \\r\\n', () => {
    const text = '﻿retry: 3000\r\n\r\nid: 42\r\nevent: realtime.chat_message.liked\r\ndata: {"a":1}\r\n\r\n: heartbeat\r\n\r\n';
    const whole = parse([text]);
    for (let size = 1; size <= 7; size++) {
      const chunks: string[] = [];
      for (let i = 0; i < text.length; i += size) chunks.push(text.slice(i, i + size));
      expect(parse(chunks)).toMatchObject({ messages: whole.messages, retries: whole.retries, comments: whole.comments });
    }
    expect(whole.messages).toEqual([{ event: 'realtime.chat_message.liked', data: '{"a":1}', lastEventId: '42' }]);
    expect(whole.retries).toEqual([3000]);
    expect(whole.comments).toEqual(['heartbeat']);
  });

  it('joins multi-line data with \\n and accepts \\n, \\r and \\r\\n line ends', () => {
    const { messages } = parse(['data: one\ndata:two\rdata:  three\r\n\n', 'data\n\n', 'data:\ndata:\n\n']);
    expect(messages.map((m) => m.data)).toEqual(['one\ntwo\n three', '', '\n']);
    expect(messages[0].event).toBe('message');
  });

  it('keeps the last id across events, ignores ids with NUL, invalid retry values, unknown fields, and events without data', () => {
    const { messages, retries, parser } = parse([
      'id: 7\nevent: resync\n\n', // no data: not dispatched, but the id still counts
      'event: x\ndata: a\n\n',
      'id: bad\0id\nretry: 12s\nfoo: bar\nevent: y\ndata: b\n\n',
      'id\ndata: c\n\n',
    ]);
    expect(messages).toEqual([
      { event: 'x', data: 'a', lastEventId: '7' },
      { event: 'y', data: 'b', lastEventId: '7' },
      { event: 'message', data: 'c', lastEventId: '' },
    ]);
    expect(retries).toEqual([]);
    expect(parser.lastEventId).toBe('');
  });

  it('discards an event cut off by the end of the stream', () => {
    const { messages, parser } = parse(['event: x\ndata: partial']);
    parser.end();
    parser.push('\n\n');
    expect(messages).toEqual([]);
  });
});

describe('client.realtime(): the request, hooks, and debug logging', () => {
  it('streams /v3/realtime/events with the bearer token, Accept: text/event-stream, and the client headers', async () => {
    const rec = recorder();
    const { server, realtime } = await connected(['stream'], {
      accessToken: 'secret-token',
      headers: { 'CF-Access-Client-Id': 'cf-id' },
      ...rec.hooks,
    });
    realtime.close();

    expect(server.calls[0].url).toBe('https://api.ofauth.com/v3/realtime/events?linkedAccountId=conn_1');
    expect(server.calls[0].init.method).toBe('GET');
    expect(server.calls[0].init.headers).toMatchObject({
      authorization: 'Bearer secret-token',
      accept: 'text/event-stream',
      'cf-access-client-id': 'cf-id',
    });
    expect(server.calls[0].init.headers['last-event-id']).toBeUndefined();
    expect(rec.requests).toEqual([
      {
        method: 'GET',
        url: 'https://api.ofauth.com/v3/realtime/events?linkedAccountId=conn_1',
        headers: { authorization: '[redacted]', accept: 'text/event-stream', 'cache-control': 'no-cache', 'cf-access-client-id': 'cf-id' },
        attempt: 1,
      },
    ]);
    expect(rec.responses).toHaveLength(1);
    expect(rec.responses[0]).toMatchObject({ method: 'GET', status: 200, requestId: 'rts_1', attempt: 1 });
    expect(rec.lines).toHaveLength(1);
    expect(rec.lines[0]).toMatch(/^\[ofauth\] SSE \/v3\/realtime\/events -> 200 \(\d+ms, rts_1\)$/);
    expect(JSON.stringify([rec.requests, rec.responses, rec.lines])).not.toContain('secret-token');
  });

  it('reports a refused stream with its status and rejects connect() with the API error', async () => {
    const rec = recorder();
    const server = sseFetch({ status: 503, headers: { 'retry-after': '7' }, body: { error: 'realtime_unavailable' } });
    const realtime = new OFAuthClient({ accessToken: 'tok', linkedAccountId: 'conn_1', fetch: server.fetch, ...rec.hooks }).realtime();
    const seen = track(realtime);
    const error = await realtime.connect().catch((e) => e);

    expect(error).toBeInstanceOf(OFAuthAPIError);
    expect(error).toMatchObject({ status: 503, code: 'realtime_unavailable', retryAfter: 7 });
    expect(rec.responses[0]).toMatchObject({ status: 503, attempt: 1 });
    expect(rec.lines[0]).toMatch(/^\[ofauth\] SSE \/v3\/realtime\/events -> 503 \(\d+ms\)$/);
    expect(seen.closes).toEqual([{ reason: 'unavailable', status: 503, willReconnect: false }]);
    expect(server.calls).toHaveLength(1);
  });

  it('reports a network failure with no status and rejects connect()', async () => {
    const rec = recorder();
    const server = sseFetch(new TypeError('fetch failed'));
    const realtime = new OFAuthClient({ accessToken: 'tok', linkedAccountId: 'conn_1', fetch: server.fetch, ...rec.hooks }).realtime();
    const error = await realtime.connect().catch((e) => e);
    expect(error).toBeInstanceOf(OFAuthError);
    expect(rec.responses[0].status).toBeUndefined();
    expect(rec.responses[0].error).toBe(error);
    expect(rec.lines[0]).toMatch(/-> network error/);
  });

  it('client.realtime() passes the client baseUrl, hooks, and debug setting', async () => {
    const rec = recorder();
    const { server, realtime } = await connected(['stream'], { baseUrl: 'https://realtime.test/', ...rec.hooks });
    realtime.close();
    expect(server.calls[0].url).toBe('https://realtime.test/v3/realtime/events?linkedAccountId=conn_1');
    expect(rec.requests[0].headers.authorization).toBe('[redacted]');
    expect(rec.lines[0]).toMatch(/^\[ofauth\] SSE \/v3\/realtime\/events -> 200/);
  });

  it('refuses an authorization header among the client headers', () => {
    const client = new OFAuthClient({ accessToken: 'tok', linkedAccountId: 'conn_1', headers: { Authorization: 'Bearer other' } });
    expect(() => client.realtime()).toThrow(OFAuthError);
  });

  it('connect() while connected is a no-op; close() stops and reports client_closed', async () => {
    const { server, realtime, seen } = await connected(['stream']);
    await realtime.connect();
    expect(server.calls).toHaveLength(1);
    realtime.close();
    await tick(60_000);
    expect(server.calls).toHaveLength(1);
    expect(seen.closes).toEqual([{ reason: 'client_closed', willReconnect: false }]);
  });
});

describe('client.realtime(): events', () => {
  it('delivers typed events, dedupes by eventId, and tracks the last event id', async () => {
    const { server, realtime, seen } = await connected(['stream']);
    const received: number[] = [];
    realtime.on('realtime.chat_message.received', (event) => received.push(event.data.id));
    server.last().push('retry: 3000\n\n');
    server.last().push(eventFrame(1));
    server.last().push(eventFrame(2, 'realtime.chat_message.liked'));
    server.last().push(eventFrame(1)); // at-least-once delivery: a repeat
    server.last().push(eventFrame(3).slice(0, 20));
    await tick();
    expect(realtime.lastEventId).toBe('2');
    server.last().push(eventFrame(3).slice(20));
    await tick();

    expect(seen.events.map((e) => e.order)).toEqual([1, 2, 3]);
    expect(received).toEqual([1, 3]);
    expect(realtime.lastEventId).toBe('3');
    realtime.close();
  });

  it('emits onResync for `event: resync`', async () => {
    const { server, realtime, seen } = await connected(['stream']);
    server.last().push(frame({ event: 'resync', data: {} }));
    await tick();
    expect(seen.resyncs()).toBe(1);
    expect(seen.events).toEqual([]);
    realtime.close();
  });

  it('reports an unparseable event to onError and keeps streaming', async () => {
    const { server, realtime, seen } = await connected(['stream']);
    server.last().push(frame({ id: 1, event: 'realtime.chat_message.received', data: '{not json' }));
    server.last().push(eventFrame(2));
    await tick();
    expect(seen.errors).toHaveLength(1);
    expect(seen.events.map((e) => e.order)).toEqual([2]);
    realtime.close();
  });

  it('exports every Realtime event type', () => {
    expect(REALTIME_EVENT_TYPES).toContain('realtime.chat_message.received');
    expect(REALTIME_EVENT_TYPES.every((type) => type.startsWith('realtime.'))).toBe(true);
  });
});

describe('client.realtime(): reconnects and resume', () => {
  it('resumes with Last-Event-ID after a drop, waiting the server retry time with jitter', async () => {
    const { server, realtime, seen } = await connected(['stream']);
    server.last().push('retry: 5000\n\n');
    server.last().push(eventFrame(41));
    server.last().push(eventFrame(42));
    await tick();
    server.last().end(); // no `closed`: a dropped connection

    await tick(4_999);
    expect(server.calls).toHaveLength(1);
    expect(seen.closes).toEqual([{ reason: 'dropped', willReconnect: true, retryInMs: expect.any(Number) }]);
    expect(seen.closes[0].retryInMs).toBeGreaterThanOrEqual(5000);
    expect(seen.closes[0].retryInMs).toBeLessThanOrEqual(7500);
    await tick(2_501);
    expect(server.calls).toHaveLength(2);
    expect(server.calls[1].init.headers['last-event-id']).toBe('42');
    expect(server.calls[1].init.headers.authorization).toBe('Bearer tok');
    expect(seen.opens()).toBe(2);

    // A replay of an event already delivered is dropped.
    server.last().push(eventFrame(42));
    server.last().push(eventFrame(43));
    await tick();
    expect(seen.events.map((e) => e.order)).toEqual([41, 42, 43]);
    realtime.close();
  });

  it('starts from options.lastEventId', async () => {
    const { server, realtime } = await connected(['stream'], {}, { lastEventId: '99' });
    expect(server.calls[0].init.headers['last-event-id']).toBe('99');
    realtime.close();
  });

  it('`closed: unavailable` backs off and resumes', async () => {
    const { server, realtime, seen } = await connected(['stream']);
    server.last().push(eventFrame(5));
    server.last().push(closedFrame('unavailable'));
    server.last().end();
    await tick();
    expect(seen.closes[0]).toMatchObject({ reason: 'unavailable', willReconnect: true });
    await tick(4_500);
    expect(server.calls).toHaveLength(2);
    expect(server.calls[1].init.headers['last-event-id']).toBe('5');
    realtime.close();
  });

  it('a 503 on reconnect waits at least Retry-After', async () => {
    const { server, realtime, seen } = await connected(['stream', { status: 503, headers: { 'retry-after': '20' } }, 'stream']);
    server.last().end();
    await tick(3_000);
    expect(server.calls).toHaveLength(2);
    expect(seen.closes[1]).toMatchObject({ reason: 'unavailable', status: 503, willReconnect: true, retryInMs: 20_000 });
    await tick(19_990);
    expect(server.calls).toHaveLength(2);
    await tick(20);
    expect(server.calls).toHaveLength(3);
    expect(seen.opens()).toBe(2);
    realtime.close();
  });

  it('backs off exponentially up to maxReconnectDelayMs', async () => {
    const { server, realtime, seen } = await connected(['stream', new TypeError('fetch failed')], {}, { maxReconnectDelayMs: 10_000 });
    server.last().end();
    await tick(120_000);
    const delays = seen.closes.map((c) => c.retryInMs!);
    expect(delays[0]).toBeGreaterThanOrEqual(3000);
    expect(delays[1]).toBeGreaterThanOrEqual(6000);
    expect(Math.max(...delays)).toBeLessThanOrEqual(10_000);
    realtime.close();
  });

  it('treats about 45 s without bytes as a dead connection and reconnects', async () => {
    const { server, realtime, seen } = await connected(['stream']);
    server.last().push(eventFrame(1));
    await tick(30_000);
    server.last().push(': heartbeat\n\n');
    await tick(44_000);
    expect(seen.closes).toEqual([]);
    await tick(1_000);
    expect(seen.closes[0]).toMatchObject({ reason: 'heartbeat_timeout', willReconnect: true });
    expect(server.bodies[0].closed).toBe(true);
    await tick(4_500);
    expect(server.calls).toHaveLength(2);
    expect(server.calls[1].init.headers['last-event-id']).toBe('1');
    realtime.close();
  });

  it('reconnect: false stops after a drop', async () => {
    const { server, realtime, seen } = await connected(['stream'], {}, { reconnect: false });
    server.last().end();
    await tick(60_000);
    expect(server.calls).toHaveLength(1);
    expect(seen.closes).toEqual([{ reason: 'dropped', willReconnect: false }]);
    realtime.close();
  });
});

describe('client.realtime(): close reasons and refusals', () => {
  it('`closed: reauth` refreshes the token and reconnects at once; a second reauth before a healthy stream stops', async () => {
    const tokens: Array<{ forceRefresh: boolean; rejectedAccessToken?: string }> = [];
    let n = 0;
    const accessToken = vi.fn((request: { forceRefresh: boolean; rejectedAccessToken?: string }) => {
      tokens.push(request);
      return `tok_${++n}`;
    });
    const { server, realtime, seen } = await connected(['stream'], { accessToken });
    server.last().push(eventFrame(1));
    server.last().push(closedFrame('reauth'));
    await tick();

    expect(server.calls).toHaveLength(2);
    expect(tokens[1]).toEqual({ forceRefresh: true, rejectedAccessToken: 'tok_1' });
    expect(server.calls[1].init.headers.authorization).toBe('Bearer tok_2');
    expect(server.calls[1].init.headers['last-event-id']).toBe('1');
    expect(seen.closes[0]).toEqual({ reason: 'reauth', willReconnect: true, retryInMs: 0 });

    server.last().push(closedFrame('reauth'));
    await tick(60_000);
    expect(server.calls).toHaveLength(2);
    expect(seen.closes[1]).toEqual({ reason: 'reauth', willReconnect: false });
    realtime.close();
  });

  it('a 401 refreshes the token and retries once; a second 401 stops', async () => {
    const accessToken = vi.fn(({ forceRefresh }: { forceRefresh: boolean }) => (forceRefresh ? 'fresh' : 'stale'));
    const server = sseFetch(401, 'stream');
    const realtime = new OFAuthClient({ accessToken, linkedAccountId: 'conn_1', fetch: server.fetch }).realtime();
    const seen = track(realtime);
    const connecting = realtime.connect();
    await tick();
    await connecting;
    expect(server.calls.map((c) => c.init.headers.authorization)).toEqual(['Bearer stale', 'Bearer fresh']);
    expect(seen.closes[0]).toMatchObject({ reason: 'reauth', status: 401, willReconnect: true });

    // Later: the stream drops and the reconnect is refused twice.
    const again = sseFetch(401);
    (realtime as any).config.fetch = again.fetch;
    server.last().push(': heartbeat\n\n'); // a healthy stream earns a new refresh
    await tick();
    server.last().end();
    await tick(10_000);
    expect(again.calls).toHaveLength(2);
    expect(seen.closes.at(-1)).toEqual({ reason: 'reauth', status: 401, willReconnect: false });
    await tick(60_000);
    expect(again.calls).toHaveLength(2);
  });

  it('a 401 with a string token stops at once and rejects connect()', async () => {
    const server = sseFetch(401);
    const realtime = new OFAuthClient({ accessToken: 'tok', linkedAccountId: 'conn_1', fetch: server.fetch }).realtime();
    const error = await realtime.connect().catch((e) => e);
    expect(error).toBeInstanceOf(OFAuthAPIError);
    expect(error.status).toBe(401);
    expect(server.calls).toHaveLength(1);
  });

  it('`closed: replaced` stops without reconnecting', async () => {
    const { server, realtime, seen } = await connected(['stream']);
    server.last().push(closedFrame('replaced'));
    await tick(60_000);
    expect(server.calls).toHaveLength(1);
    expect(seen.closes).toEqual([{ reason: 'replaced', willReconnect: false }]);
    realtime.close();
    expect(seen.closes).toHaveLength(1);
  });

  it('a 409 stream_replaced on reconnect stops', async () => {
    const { server, seen } = await connected(['stream', { status: 409, body: { error: 'stream_replaced' } }]);
    server.last().end();
    await tick(60_000);
    expect(server.calls).toHaveLength(2);
    expect(seen.closes.at(-1)).toEqual({ reason: 'replaced', status: 409, willReconnect: false });
    expect(seen.errors.at(-1)).toMatchObject({ status: 409, code: 'stream_replaced' });
  });

  it('a 403 (e.g. access_token_in_browser) is final', async () => {
    const { server, seen } = await connected(['stream', { status: 403, body: { error: 'access_token_in_browser' } }]);
    server.last().end();
    await tick(60_000);
    expect(server.calls).toHaveLength(2);
    expect(seen.closes.at(-1)).toEqual({ reason: 'rejected', status: 403, willReconnect: false });
  });

  it('a 200 that is not an event stream is rejected', async () => {
    const { fetch } = mockFetch(json({ ok: true }));
    const realtime = new OFAuthClient({ accessToken: 'tok', linkedAccountId: 'conn_1', fetch }).realtime();
    const error = await realtime.connect().catch((e) => e);
    expect(error).toBeInstanceOf(OFAuthAPIError);
  });
});

describe('client.realtime.createStreamUrl()', () => {
  it('POSTs /v3/realtime with the linked account and returns { url, expiresAt }', async () => {
    const result = { url: 'https://api.ofauth.com/v3/realtime/events?linkedAccountId=conn_2&credential=ofrs_x.y', expiresAt: '2026-10-25T09:40:00.000Z' };
    const { fetch, calls } = mockFetch(json(result));
    const client = new OFAuthClient({ accessToken: 'tok', linkedAccountId: 'conn_1', fetch });
    expect(await client.realtime.createStreamUrl({ linkedAccountId: 'conn_2' })).toEqual(result);
    expect(calls[0].url).toBe('https://api.ofauth.com/v3/realtime');
    expect(calls[0].init.method).toBe('POST');
    expect(JSON.parse(String(calls[0].init.body))).toEqual({ linkedAccountId: 'conn_2' });
    expect(calls[0].init.headers.authorization).toBe('Bearer tok');

    await client.realtime.createStreamUrl();
    expect(JSON.parse(String(calls[1].init.body))).toEqual({ linkedAccountId: 'conn_1' });
  });

  it('retries a 429 after Retry-After and surfaces other errors', async () => {
    const { fetch, calls } = mockFetch(
      json({ error: 'rate_limited' }, 429, { 'retry-after': '1' }),
      json({ url: 'https://api.ofauth.com/v3/realtime/events?credential=c', expiresAt: 'x' }),
    );
    const client = new OFAuthClient({ accessToken: 'tok', linkedAccountId: 'conn_1', fetch });
    const pending = client.realtime.createStreamUrl();
    await tick(1_000);
    await expect(pending).resolves.toMatchObject({ expiresAt: 'x' });
    expect(calls).toHaveLength(2);

    const denied = mockFetch(json({ error: 'access_denied' }, 403));
    const error = await new OFAuthClient({ accessToken: 'tok', linkedAccountId: 'conn_1', fetch: denied.fetch }).realtime
      .createStreamUrl()
      .catch((e) => e);
    expect(error).toMatchObject({ status: 403, code: 'access_denied', operation: 'realtime.createStreamUrl' });
  });

  it('needs a linked account', async () => {
    const client = new OFAuthClient({ accessToken: 'tok' });
    await expect(client.realtime.createStreamUrl()).rejects.toThrow(OFAuthError);
  });
});

it('bounds a stalled non-SSE error body over a real HTTP connection', async () => {
  vi.useRealTimers();
  const { createServer } = await import('node:http');
  const server = createServer((_request, response) => {
    response.writeHead(503, { 'content-type': 'application/json' });
    response.flushHeaders();
  });
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  const port = (server.address() as import('node:net').AddressInfo).port;
  const client = new OFAuthClient({ accessToken: 'tok', linkedAccountId: 'conn_1', baseUrl: `http://127.0.0.1:${port}` });
  const realtime = client.realtime({ heartbeatTimeoutMs: 50 });
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    const outcome = await Promise.race([
      realtime.connect().then(() => 'opened', () => 'rejected'),
      new Promise<string>((resolve) => { timer = setTimeout(() => resolve('hung'), 1_000); }),
    ]);
    expect(outcome).toBe('rejected');
  } finally {
    clearTimeout(timer);
    realtime.close();
    server.closeAllConnections();
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
});

it('resumes an initial id-only cursor over HTTP and never regresses it on duplicate events', async () => {
  vi.useRealTimers();
  const { createServer } = await import('node:http');
  const cursors: Array<string | undefined> = [];
  const server = createServer((request, response) => {
    cursors.push(request.headers['last-event-id'] as string | undefined);
    response.writeHead(200, { 'content-type': 'text/event-stream' });
    if (cursors.length === 1) response.end('retry: 1\n\nid: 10\n\n');
    else if (cursors.length === 2) response.end(eventFrame(11) + eventFrame(11).replace('id: 11\n', 'id: 9\n') + closedFrame('unavailable'));
    else response.end(closedFrame('replaced'));
  });
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  const port = (server.address() as import('node:net').AddressInfo).port;
  const realtime = new OFAuthClient({ accessToken: 'tok', linkedAccountId: 'conn_1', baseUrl: `http://127.0.0.1:${port}` }).realtime({ maxReconnectDelayMs: 5 });
  const events: RealtimeEvent[] = [];
  realtime.onEvent((event) => events.push(event));
  try {
    const ended = new Promise<void>((resolve) => realtime.onClose((info) => { if (!info.willReconnect) resolve(); }));
    await realtime.connect();
    await ended;
    expect(cursors).toEqual([undefined, '10', '11']);
    expect(events).toHaveLength(1);
    expect(realtime.lastEventId).toBe('11');
  } finally {
    realtime.close();
    server.closeAllConnections();
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
});

it('stops dispatching a fetched chunk when an event listener closes the connection', async () => {
  const { server, realtime, seen } = await connected(['stream']);
  realtime.onEvent(() => realtime.close());
  server.last().push(eventFrame(11) + eventFrame(12));
  await tick();
  expect(seen.events.map((event) => event.order)).toEqual([11]);
});
