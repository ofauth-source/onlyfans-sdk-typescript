import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import {
  connectRealtimeStream,
  REALTIME_EVENT_TYPES,
  type BroadcastChannelConstructor,
  type BroadcastChannelLike,
  type ConnectRealtimeStreamOptions,
  type EventSourceConstructor,
  type LockManagerLike,
  type RealtimeEvent,
  type RealtimeStream,
  type RealtimeCloseInfo,
} from '../src/realtime-browser';
import { OFAuthError } from '../src/runtime';
import { closedFrame, eventFrame, realtimeEvent, sseFetch } from './sse';

const tick = (ms = 0) => vi.advanceTimersByTimeAsync(ms);

beforeEach(() => {
  vi.useFakeTimers();
  vi.spyOn(Math, 'random').mockReturnValue(0);
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

/** A fake `EventSource`: the test opens, feeds, drops, and fails each instance. */
function fakeEventSources() {
  const all: FakeEventSource[] = [];
  class FakeEventSource {
    readyState = 0;
    onopen: ((event: unknown) => void) | null = null;
    onerror: ((event: unknown) => void) | null = null;
    closed = false;
    readonly listeners = new Map<string, Array<(event: { data: string; lastEventId?: string }) => void>>();
    constructor(
      readonly url: string,
      readonly init?: { withCredentials?: boolean },
    ) {
      all.push(this);
    }
    addEventListener(type: string, listener: (event: { data: string; lastEventId?: string }) => void) {
      if (!this.listeners.has(type)) this.listeners.set(type, []);
      this.listeners.get(type)!.push(listener);
    }
    close() {
      this.closed = true;
      this.readyState = 2;
    }
    open() {
      this.readyState = 1;
      this.onopen?.({ type: 'open' });
    }
    emit(type: string, data: unknown, lastEventId = '') {
      for (const listener of this.listeners.get(type) ?? []) {
        listener({ data: typeof data === 'string' ? data : JSON.stringify(data), lastEventId });
      }
    }
    event(order: number, type = 'realtime.chat_message.received') {
      this.emit(type, realtimeEvent(order, type), String(order));
    }
    /** The connection dropped; EventSource reconnects by itself. */
    drop() {
      this.readyState = 0;
      this.onerror?.({ type: 'error' });
    }
    /** A non-200 response: EventSource gives up (and hides the status). */
    fail() {
      this.readyState = 2;
      this.onerror?.({ type: 'error' });
    }
  }
  return {
    EventSource: FakeEventSource as unknown as EventSourceConstructor,
    all,
    last: () => all[all.length - 1],
    open: () => all.filter((s) => !s.closed),
  };
}

/** One browser's Web Locks: exclusive, granted in request order, released when the callback settles. */
function fakeLocks(): LockManagerLike {
  const queues = new Map<string, Array<{ callback: () => Promise<void>; resolve: (v: unknown) => void; reject: (e: unknown) => void; signal?: AbortSignal }>>();
  const held = new Set<string>();
  const grant = (name: string) => {
    if (held.has(name)) return;
    const next = queues.get(name)?.shift();
    if (!next) return;
    held.add(name);
    next.callback().then(next.resolve, next.reject).finally(() => {
      held.delete(name);
      grant(name);
    });
  };
  return {
    request(name, options, callback) {
      return new Promise((resolve, reject) => {
        const entry = { callback: () => callback({ name }), resolve, reject, signal: options.signal };
        if (!queues.has(name)) queues.set(name, []);
        queues.get(name)!.push(entry);
        options.signal?.addEventListener('abort', () => {
          const queue = queues.get(name)!;
          const index = queue.indexOf(entry);
          if (index >= 0) {
            queue.splice(index, 1);
            reject(new DOMException('aborted', 'AbortError'));
          }
        });
        queueMicrotask(() => grant(name));
      });
    },
  };
}

/** One browser's BroadcastChannel: delivers asynchronously to every other open channel with the name. */
function fakeBroadcast(): BroadcastChannelConstructor {
  const channels = new Set<FakeChannel>();
  class FakeChannel implements BroadcastChannelLike {
    onmessage: ((event: { data: unknown }) => void) | null = null;
    constructor(readonly name: string) {
      channels.add(this);
    }
    postMessage(message: unknown) {
      const data = structuredClone(message);
      for (const channel of channels) {
        if (channel !== this && channel.name === this.name) queueMicrotask(() => channels.has(channel) && channel.onmessage?.({ data }));
      }
    }
    close() {
      channels.delete(this);
    }
  }
  return FakeChannel;
}

/** A browser: shared locks and channels, and a URL minter counting calls. */
function browser(shared = true) {
  const sources = fakeEventSources();
  const locks = shared ? fakeLocks() : null;
  const Channel = shared ? fakeBroadcast() : null;
  let minted = 0;
  const getStreamUrl = vi.fn(async () => `https://api.test/v3/realtime/events?linkedAccountId=conn_1&credential=ofrs_${++minted}`);
  const tab = (options: Partial<ConnectRealtimeStreamOptions> = {}) => {
    const stream = connectRealtimeStream({
      getStreamUrl,
      linkedAccountId: 'conn_1',
      EventSource: sources.EventSource,
      locks,
      BroadcastChannel: Channel,
      ...options,
    });
    return { stream, ...track(stream) };
  };
  return { sources, getStreamUrl, tab };
}

function track(stream: RealtimeStream) {
  const events: RealtimeEvent[] = [];
  const closes: RealtimeCloseInfo[] = [];
  const errors: unknown[] = [];
  let opens = 0;
  let resyncs = 0;
  let replaced = 0;
  stream.onEvent((event) => events.push(event));
  stream.onClose((info) => closes.push(info));
  stream.onError((error) => errors.push(error));
  stream.onOpen(() => opens++);
  stream.onResync(() => resyncs++);
  stream.onReplaced(() => replaced++);
  return { events, closes, errors, opens: () => opens, resyncs: () => resyncs, replaced: () => replaced };
}

const credentialOf = (url: string) => new URL(url).searchParams.get('credential');

describe('connectRealtimeStream: one stream per browser', () => {
  it('retains initial cursors from control frames across URL renewal and tab handoff', async () => {
    const { sources, tab } = browser();
    const a = tab();
    const b = tab();
    await tick();
    sources.last().open();
    sources.last().emit('resync', {}, '10');
    await tick();
    expect(a.stream.lastEventId).toBe('10');
    expect(b.stream.lastEventId).toBe('10');
    sources.last().emit('closed', { reason: 'reauth' }, '10');
    await tick();
    expect(new URL(sources.last().url).searchParams.get('lastEventId')).toBe('10');
    a.stream.close();
    await tick();
    expect(new URL(sources.last().url).searchParams.get('lastEventId')).toBe('10');
  });

  it('stays closed when the URL error listener closes the stream', async () => {
    const stream = connectRealtimeStream({
      getStreamUrl: async () => { throw new Error('signed out'); },
      shareAcrossTabs: false,
    });
    stream.onError(() => stream.close());
    await tick(60_000);
    expect(stream.state).toBe('closed');
    expect(stream.isLeader).toBe(false);
  });

  it('opens one EventSource for all tabs and fans its events out', async () => {
    const { sources, getStreamUrl, tab } = browser();
    const a = tab();
    const b = tab();
    const c = tab();
    await tick();
    expect(getStreamUrl).toHaveBeenCalledTimes(1);
    expect(sources.all).toHaveLength(1);
    expect(a.stream.isLeader).toBe(true);
    expect(b.stream.isLeader).toBe(false);
    expect(sources.last().init).toEqual({ withCredentials: false });

    sources.last().open();
    await tick();
    expect([a.opens(), b.opens(), c.opens()]).toEqual([1, 1, 1]);
    expect(b.stream.state).toBe('open');

    const typed: number[] = [];
    b.stream.on('realtime.chat_message.liked', (event) => typed.push(event.order));
    sources.last().event(1);
    sources.last().event(2, 'realtime.chat_message.liked');
    sources.last().emit('resync', {});
    await tick();
    for (const t of [a, b, c]) {
      expect(t.events.map((e) => e.order)).toEqual([1, 2]);
      expect(t.resyncs()).toBe(1);
    }
    expect(typed).toEqual([2]);
    expect(b.stream.lastEventId).toBe('2');
  });

  it('a tab opened later learns the stream is already open', async () => {
    const { sources, tab } = browser();
    tab();
    await tick();
    sources.last().open();
    const late = tab();
    await tick();
    expect(late.stream.state).toBe('open');
    expect(late.opens()).toBe(1);
    expect(sources.all).toHaveLength(1);
  });

  it('hands over when the leader closes: the next tab gets its own new URL and resumes from the last event', async () => {
    const { sources, getStreamUrl, tab } = browser();
    const a = tab();
    const b = tab();
    await tick();
    const first = sources.last();
    first.open();
    first.event(7);
    await tick();

    a.stream.close();
    await tick();
    expect(first.closed).toBe(true);
    expect(b.stream.isLeader).toBe(true);
    expect(getStreamUrl).toHaveBeenCalledTimes(2);
    expect(sources.all).toHaveLength(2);
    const second = sources.last();
    // Never the old leader's URL: each URL allows one open stream.
    expect(credentialOf(second.url)).toBe('ofrs_2');
    expect(credentialOf(second.url)).not.toBe(credentialOf(first.url));
    expect(new URL(second.url).searchParams.get('lastEventId')).toBe('7');
    expect(a.closes).toEqual([{ reason: 'client_closed', willReconnect: false }]);

    second.open();
    second.event(7); // replayed after the handover: deduped
    second.event(8);
    await tick();
    expect(b.events.map((e) => e.order)).toEqual([7, 8]);
  });

  it('a leader tab that goes away without close() (the lock is released) hands over too', async () => {
    const { sources, getStreamUrl, tab } = browser();
    const a = tab();
    const b = tab();
    await tick();
    sources.last().open();
    // Simulate the tab dying: its lock callback settles and its channel stops.
    (a.stream as any).channel.close();
    (a.stream as any).releaseLock();
    await tick();
    expect(b.stream.isLeader).toBe(true);
    expect(getStreamUrl).toHaveBeenCalledTimes(2);
    expect(credentialOf(sources.last().url)).toBe('ofrs_2');
  });

  it('without Web Locks or BroadcastChannel every tab has its own stream and its own URL', async () => {
    const { sources, getStreamUrl, tab } = browser(false);
    const a = tab();
    const b = tab();
    await tick();
    expect(a.stream.isLeader && b.stream.isLeader).toBe(true);
    expect(getStreamUrl).toHaveBeenCalledTimes(2);
    expect(sources.all.map((s) => credentialOf(s.url))).toEqual(['ofrs_1', 'ofrs_2']);

    const g = browser();
    const unshared = g.tab({ shareAcrossTabs: false });
    const other = g.tab({ shareAcrossTabs: false });
    await tick();
    expect(unshared.stream.isLeader && other.stream.isLeader).toBe(true);
    expect(new Set(g.sources.all.map((s) => s.url)).size).toBe(2);
  });

  it('falls back to a stream per tab when the globals are missing', async () => {
    vi.stubGlobal('navigator', {});
    vi.stubGlobal('BroadcastChannel', undefined);
    const sources = fakeEventSources();
    let n = 0;
    const getStreamUrl = async () => `https://api.test/v3/realtime/events?credential=c${++n}`;
    const a = connectRealtimeStream({ getStreamUrl, EventSource: sources.EventSource });
    const b = connectRealtimeStream({ getStreamUrl, EventSource: sources.EventSource });
    await tick();
    expect(a.isLeader && b.isLeader).toBe(true);
    expect(sources.all.map((s) => credentialOf(s.url))).toEqual(['c1', 'c2']);
  });

  it('dedupes by eventId', async () => {
    const { sources, tab } = browser(false);
    const a = tab();
    await tick();
    sources.last().open();
    sources.last().event(1);
    sources.last().event(1);
    sources.last().event(2);
    await tick();
    expect(a.events.map((e) => e.order)).toEqual([1, 2]);
  });

  it('listens for every known event type plus any type registered with on()', async () => {
    const { sources, tab } = browser(false);
    const a = tab();
    a.stream.on('realtime.future_event' as any, () => {});
    await tick();
    const types = [...sources.last().listeners.keys()];
    for (const type of REALTIME_EVENT_TYPES) expect(types).toContain(type);
    expect(types).toEqual(expect.arrayContaining(['resync', 'closed', 'realtime.future_event']));
    a.stream.on('realtime.later_event' as any, () => {});
    expect([...sources.last().listeners.keys()]).toContain('realtime.later_event');
  });
});

describe('connectRealtimeStream: close reasons', () => {
  it('`replaced` stops every tab and reports onReplaced; resume() from any tab starts again with a new URL', async () => {
    const { sources, getStreamUrl, tab } = browser();
    const a = tab();
    const b = tab();
    await tick();
    sources.last().open();
    sources.last().emit('closed', { reason: 'replaced' });
    await tick(120_000);
    expect(sources.all).toHaveLength(1);
    expect(sources.last().closed).toBe(true);
    for (const t of [a, b]) {
      expect(t.replaced()).toBe(1);
      expect(t.stream.state).toBe('replaced');
      expect(t.closes.at(-1)).toEqual({ reason: 'replaced', willReconnect: false });
    }

    // A tab opened now sees the replaced state and opens nothing.
    const c = tab();
    await tick();
    expect(c.stream.state).toBe('replaced');
    expect(c.replaced()).toBe(1);
    expect(sources.all).toHaveLength(1);

    b.stream.resume();
    await tick();
    expect(getStreamUrl).toHaveBeenCalledTimes(2);
    expect(sources.all).toHaveLength(2);
    sources.last().open();
    await tick();
    expect(a.stream.state).toBe('open');
    expect(b.stream.state).toBe('open');
  });

  it('a replaced leader that closes does not let the next tab reopen', async () => {
    const { sources, tab } = browser();
    const a = tab();
    const b = tab();
    await tick();
    sources.last().open();
    sources.last().emit('closed', { reason: 'replaced' });
    await tick();
    a.stream.close();
    await tick(60_000);
    expect(b.stream.isLeader).toBe(true);
    expect(b.stream.state).toBe('replaced');
    expect(sources.all).toHaveLength(1);
  });

  it('`reauth` gets a new URL at once; a second reauth before a stream opens stops', async () => {
    const { sources, getStreamUrl, tab } = browser(false);
    const a = tab();
    await tick();
    sources.last().open();
    sources.last().event(3);
    sources.last().emit('closed', { reason: 'reauth' });
    await tick();
    expect(getStreamUrl).toHaveBeenCalledTimes(2);
    expect(a.closes[0]).toEqual({ reason: 'reauth', willReconnect: true, retryInMs: 0 });
    expect(credentialOf(sources.last().url)).toBe('ofrs_2');
    expect(new URL(sources.last().url).searchParams.get('lastEventId')).toBe('3');

    // The new stream opens and later expires: another new URL.
    sources.last().open();
    sources.last().emit('closed', { reason: 'reauth' });
    await tick();
    expect(getStreamUrl).toHaveBeenCalledTimes(3);
    // ...which is refused with reauth before it opens: stop.
    sources.last().emit('closed', { reason: 'reauth' });
    await tick(60_000);
    expect(getStreamUrl).toHaveBeenCalledTimes(3);
    expect(a.stream.state).toBe('closed');
    expect(a.closes.at(-1)).toEqual({ reason: 'reauth', willReconnect: false });
  });

  it('`unavailable` backs off and reconnects with the same URL', async () => {
    const { sources, getStreamUrl, tab } = browser(false);
    const a = tab();
    await tick();
    const first = sources.last();
    first.open();
    first.event(4);
    first.emit('closed', { reason: 'unavailable' });
    await tick();
    expect(a.closes[0]).toEqual({ reason: 'unavailable', willReconnect: true, retryInMs: 3000 });
    await tick(2_999);
    expect(sources.all).toHaveLength(1);
    await tick(1);
    expect(sources.all).toHaveLength(2);
    expect(getStreamUrl).toHaveBeenCalledTimes(1);
    expect(credentialOf(sources.last().url)).toBe(credentialOf(first.url));
    expect(new URL(sources.last().url).searchParams.get('lastEventId')).toBe('4');
  });

  it('a dropped connection is left to EventSource (same instance, same URL)', async () => {
    const { sources, getStreamUrl, tab } = browser(false);
    const a = tab();
    await tick();
    sources.last().open();
    sources.last().drop();
    await tick(60_000);
    expect(a.stream.state).toBe('connecting');
    expect(sources.all).toHaveLength(1);
    expect(getStreamUrl).toHaveBeenCalledTimes(1);
    sources.last().open();
    expect(a.stream.state).toBe('open');
  });

  it('a refusal with a hidden status reuses the URL once, then gets a new one', async () => {
    const { sources, getStreamUrl, tab } = browser(false);
    const a = tab();
    await tick();
    sources.last().fail();
    await tick(3_000);
    expect(sources.all).toHaveLength(2);
    expect(getStreamUrl).toHaveBeenCalledTimes(1);
    sources.last().fail();
    await tick(6_000);
    expect(sources.all).toHaveLength(3);
    expect(getStreamUrl).toHaveBeenCalledTimes(2);
    expect(a.closes.map((c) => [c.reason, c.retryInMs])).toEqual([
      ['dropped', 3000],
      ['dropped', 6000],
    ]);
  });

  it('a URL that is about to expire is not reused', async () => {
    const { sources } = browser(false);
    let n = 0;
    const getStreamUrl = vi.fn(async () => ({
      url: `https://api.test/v3/realtime/events?credential=c${++n}`,
      expiresAt: new Date(Date.now() + 4_000).toISOString(),
    }));
    connectRealtimeStream({ getStreamUrl, EventSource: sources.EventSource, locks: null });
    await tick();
    sources.last().open();
    sources.last().emit('closed', { reason: 'unavailable' });
    await tick(3_000);
    expect(getStreamUrl).toHaveBeenCalledTimes(2);
    expect(credentialOf(sources.last().url)).toBe('c2');
  });

  it('retries getStreamUrl failures with backoff', async () => {
    const sources = fakeEventSources();
    const getStreamUrl = vi.fn().mockRejectedValueOnce(new Error('server down')).mockResolvedValue('https://api.test/v3/realtime/events?credential=c');
    const stream = connectRealtimeStream({ getStreamUrl, EventSource: sources.EventSource, locks: null });
    const seen = track(stream);
    await tick();
    expect(seen.errors).toHaveLength(1);
    expect(sources.all).toHaveLength(0);
    await tick(3_000);
    expect(sources.all).toHaveLength(1);
  });
});

describe('connectRealtimeStream: the fetch fallback (no EventSource)', () => {
  function fallback(...replies: Parameters<typeof sseFetch>) {
    const server = sseFetch(...replies);
    let n = 0;
    const getStreamUrl = vi.fn(async () => `https://api.test/v3/realtime/events?linkedAccountId=conn_1&credential=c${++n}`);
    const stream = connectRealtimeStream({ getStreamUrl, fetch: server.fetch, locks: null });
    return { server, getStreamUrl, stream, ...track(stream) };
  }

  it('streams with no credentials or token, and parses events', async () => {
    const t = fallback('stream');
    await tick();
    expect(t.server.calls[0].init.headers).toEqual({ accept: 'text/event-stream' });
    expect(t.server.calls[0].init.credentials).toBe('omit');
    expect(t.server.calls[0].init.referrerPolicy).toBe('no-referrer');
    t.server.last().push('retry: 3000\n\n' + eventFrame(1) + ': heartbeat\n\n' + eventFrame(2));
    await tick();
    expect(t.events.map((e) => e.order)).toEqual([1, 2]);
    expect(t.stream.state).toBe('open');
  });

  it('reconnects a dropped stream with Last-Event-ID and the same URL', async () => {
    const t = fallback('stream');
    await tick();
    t.server.last().push(eventFrame(5));
    await tick();
    t.server.last().end();
    await tick(3_000);
    expect(t.server.calls).toHaveLength(2);
    expect(t.server.calls[1].url).toBe(t.server.calls[0].url);
    expect(t.server.calls[1].init.headers['last-event-id']).toBe('5');
    expect(t.getStreamUrl).toHaveBeenCalledTimes(1);
  });

  it('401 gets a new URL once; a second 401 stops', async () => {
    const t = fallback(401);
    await tick();
    await tick();
    expect(t.getStreamUrl).toHaveBeenCalledTimes(2);
    expect(t.closes).toEqual([
      { reason: 'reauth', status: 401, willReconnect: true, retryInMs: 0 },
      { reason: 'reauth', status: 401, willReconnect: false },
    ]);
    expect(t.stream.state).toBe('closed');
  });

  it('409 stops as replaced', async () => {
    const t = fallback(409);
    await tick(60_000);
    expect(t.replaced()).toBe(1);
    expect(t.closes).toEqual([{ reason: 'replaced', status: 409, willReconnect: false }]);
    expect(t.server.calls).toHaveLength(1);
  });

  it('503 waits Retry-After and reuses the URL', async () => {
    const t = fallback({ status: 503, headers: { 'retry-after': '10' } }, 'stream');
    await tick();
    expect(t.closes).toEqual([{ reason: 'unavailable', status: 503, willReconnect: true, retryInMs: 10_000 }]);
    await tick(9_999);
    expect(t.server.calls).toHaveLength(1);
    await tick(1);
    expect(t.server.calls).toHaveLength(2);
    expect(t.server.calls[1].url).toBe(t.server.calls[0].url);
    expect(t.getStreamUrl).toHaveBeenCalledTimes(1);
  });

  it('429 waits an HTTP-date Retry-After before reusing the URL', async () => {
    const retryAt = new Date(Math.ceil(Date.now() / 1000) * 1000 + 20_000);
    const t = fallback({ status: 429, headers: { 'retry-after': retryAt.toUTCString() } }, 'stream');
    await tick();
    const delay = t.closes[0].retryInMs!;
    expect(delay).toBeGreaterThanOrEqual(20_000);
    await tick(delay - 1);
    expect(t.server.calls).toHaveLength(1);
    await tick(1);
    expect(t.server.calls).toHaveLength(2);
    expect(t.server.calls[1].url).toBe(t.server.calls[0].url);
    expect(t.getStreamUrl).toHaveBeenCalledTimes(1);
  });

  it('`closed` frames are handled like EventSource events', async () => {
    const t = fallback('stream');
    await tick();
    t.server.last().push(closedFrame('replaced'));
    await tick(60_000);
    expect(t.replaced()).toBe(1);
    expect(t.server.calls).toHaveLength(1);
  });

  it('heartbeat timeout reconnects', async () => {
    const t = fallback('stream');
    await tick();
    await tick(45_000);
    expect(t.server.bodies[0].closed).toBe(true);
    await tick(3_000);
    expect(t.server.calls).toHaveLength(2);
  });
});

describe('connectRealtimeStream never touches access tokens', () => {
  it('refuses token options', () => {
    for (const key of ['accessToken', 'token', 'apiKey', 'authorization', 'headers']) {
      expect(() => connectRealtimeStream({ getStreamUrl: async () => 'https://x.test', [key]: 'secret' } as any)).toThrow(
        'connectRealtimeStream never takes an access token',
      );
    }
    expect(() => connectRealtimeStream({} as any)).toThrow(OFAuthError);
  });

  it('refuses a stream URL that carries a token parameter', async () => {
    const sources = fakeEventSources();
    const stream = connectRealtimeStream({
      getStreamUrl: async () => 'https://api.test/v3/realtime/events?access_token=secret',
      EventSource: sources.EventSource,
      locks: null,
    });
    const seen = track(stream);
    await tick(60_000);
    expect(sources.all).toHaveLength(0);
    expect(stream.state).toBe('closed');
    expect(String(seen.errors[0])).toContain('never takes an access token');
  });

  it('works in a browser page without dangerouslyAllowBrowser', async () => {
    vi.stubGlobal('window', {});
    vi.stubGlobal('document', {});
    const sources = fakeEventSources();
    const stream = connectRealtimeStream({ getStreamUrl: () => 'https://api.test/v3/realtime/events?credential=c', EventSource: sources.EventSource, locks: null });
    await tick();
    expect(sources.all).toHaveLength(1);
    stream.close();
  });

  it('the module imports no client, token resolution, or request code', () => {
    const source = readFileSync(fileURLToPath(new URL('../src/realtime-browser.ts', import.meta.url)), 'utf8');
    const imports = source.match(/^import[^;]+;/gm) ?? [];
    expect(imports.join('\n')).not.toMatch(/\.\/client|\.\/realtime-connection|resolveAccessToken|\brequest\b|AccessToken/);
    expect(source).not.toMatch(/Bearer|authorization:|'authorization']/);
  });
});
