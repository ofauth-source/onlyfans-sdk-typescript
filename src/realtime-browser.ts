/* eslint-disable */
/**
 * Realtime in the browser: `@ofauth/onlyfans-sdk/realtime-browser`.
 *
 * Token-free. The page never holds an access token: your server mints a stream URL with
 * `client.realtime.createStreamUrl()` (`POST /v3/realtime`) and the page opens it here. The URL
 * carries a 10-minute stream credential that can only read that account's Realtime events.
 *
 * One stream per browser: tabs elect a leader with a Web Lock (`navigator.locks`), the leader holds
 * the `EventSource`, and `BroadcastChannel` fans its events out to the other tabs. When the leader
 * tab closes, another tab takes over and resumes from the last event it saw. Without those APIs,
 * every tab has its own stream.
 *
 * @example
 * ```ts
 * import { connectRealtimeStream } from '@ofauth/onlyfans-sdk/realtime-browser'
 *
 * const stream = connectRealtimeStream({ getStreamUrl: () => fetch('/api/realtime-url').then((r) => r.text()) })
 * stream.on('realtime.chat_message.received', (event) => showMessage(event.data))
 * ```
 *
 * @module
 */

import { OFAuthError, serverRetryDelaySeconds } from './runtime';
import { REALTIME_EVENT_TYPES } from './realtime-event-types';
import type {
  RealtimeCloseInfo,
  RealtimeCloseReason,
  RealtimeEvent,
  RealtimeEventOf,
  RealtimeEventType,
  RealtimeServerCloseReason,
} from './realtime-events';
import { advanceCursor, DEFAULT_HEARTBEAT_TIMEOUT_MS, DEFAULT_RETRY_MS, EventIdWindow, SseParser, parseCloseReason } from './realtime-sse';

export type {
  RealtimeCloseInfo,
  RealtimeCloseReason,
  RealtimeEvent,
  RealtimeEventOf,
  RealtimeEventType,
  RealtimeServerCloseReason,
} from './realtime-events';
export { REALTIME_EVENT_TYPES } from './realtime-event-types';

/** What `getStreamUrl` may return: the URL, or the whole `client.realtime.createStreamUrl()` result. */
export type RealtimeStreamUrlResult = string | { url: string; expiresAt?: string };

/** The parts of `EventSource` the client uses. */
export interface EventSourceLike {
  /** 0 connecting, 1 open, 2 closed (failed for good, or closed). */
  readonly readyState: number;
  onopen: ((event: unknown) => void) | null;
  onerror: ((event: unknown) => void) | null;
  addEventListener(type: string, listener: (event: { data: string; lastEventId?: string }) => void): void;
  close(): void;
}

export type EventSourceConstructor = new (url: string, init?: { withCredentials?: boolean }) => EventSourceLike;

/** The part of `navigator.locks` the client uses. */
export interface LockManagerLike {
  request(name: string, options: { signal?: AbortSignal }, callback: (lock: unknown) => Promise<void>): Promise<unknown>;
}

/** The parts of `BroadcastChannel` the client uses. */
export interface BroadcastChannelLike {
  onmessage: ((event: { data: unknown }) => void) | null;
  postMessage(message: unknown): void;
  close(): void;
}

export type BroadcastChannelConstructor = new (name: string) => BroadcastChannelLike;

export interface ConnectRealtimeStreamOptions {
  /**
   * Ask your server for a stream URL: it calls `client.realtime.createStreamUrl()` for the signed-in
   * user and returns the `url` (or the whole result). Called when a tab starts leading (a new
   * leader never reuses the old leader's URL), after `reauth` or a 401, on `resume()`, when the URL
   * is about to expire (return the whole result so the client knows `expiresAt`), and after a second
   * refused reconnect whose status `EventSource` hides. Reconnects after a drop, `unavailable`, 503,
   * or 429 reuse the current URL: the server allows one open stream per URL, and a URL's reconnect
   * replaces only its own stream. Throw (or reject) when there is none; the client retries with backoff.
   */
  getStreamUrl: () => RealtimeStreamUrlResult | Promise<RealtimeStreamUrlResult>;
  /**
   * The linked account the URLs are for. Names the stream shared across tabs, so pass it when
   * a page can stream more than one account.
   */
  linkedAccountId?: string;
  /** Resume after this event id (an event's `order`). */
  lastEventId?: string;
  /** Share one stream across this browser's tabs. Defaults to true. */
  shareAcrossTabs?: boolean;
  /** Upper bound for the reconnect backoff. Defaults to 30 seconds. */
  maxReconnectDelayMs?: number;
  /** `EventSource` implementation. Defaults to the global one, else a fetch-based fallback. */
  EventSource?: EventSourceConstructor;
  /** `fetch` for the fallback when there is no `EventSource`. Defaults to the global one. */
  fetch?: typeof fetch;
  /** Web Locks implementation. Defaults to `navigator.locks`; `null` turns tab sharing off. */
  locks?: LockManagerLike | null;
  /** `BroadcastChannel` implementation. Defaults to the global one; `null` turns tab sharing off. */
  BroadcastChannel?: BroadcastChannelConstructor | null;
}

/**
 * - `connecting`: opening or reconnecting.
 * - `open`: events are flowing (in this tab or, for a follower, in the leader tab).
 * - `replaced`: another browser or device took the slot; nothing reconnects until `resume()`.
 * - `closed`: stopped for good (see the last `onClose`), or `close()` was called.
 */
export type RealtimeStreamState = 'connecting' | 'open' | 'replaced' | 'closed';

type Listener<T> = (value: T) => void;

/** A browser Realtime stream from {@link connectRealtimeStream}. */
export interface RealtimeStream {
  /** Listen for one event type. Returns an unsubscribe function. */
  on<T extends RealtimeEventType>(type: T, listener: Listener<RealtimeEventOf<T>>): () => void;
  /** Listen for every event. */
  onEvent(listener: Listener<RealtimeEvent>): () => void;
  /** Events were missed (the resume point was older than the replay buffer): refetch what you show. */
  onResync(listener: Listener<void>): () => void;
  onOpen(listener: Listener<void>): () => void;
  onClose(listener: Listener<RealtimeCloseInfo>): () => void;
  /**
   * Another browser or device took this account's stream slot. Nothing reconnects; show e.g.
   * "Realtime is open in another window" with a button that calls `resume()`.
   */
  onReplaced(listener: Listener<void>): () => void;
  /** Failures to get a URL, unparseable events, and listener errors. */
  onError(listener: Listener<unknown>): () => void;
  readonly state: RealtimeStreamState;
  /** True in the tab that holds the stream. */
  readonly isLeader: boolean;
  /** The id (`order`) of the last event received. */
  readonly lastEventId: string | undefined;
  /** Start again after `replaced` or a final close (gets a new URL; in every tab). */
  resume(): void;
  /** Stop in this tab. If it was the leader, another tab takes over. */
  close(): void;
}

const TOKEN_MESSAGE =
  'connectRealtimeStream never takes an access token: get a stream URL from your server ' +
  '(client.realtime.createStreamUrl()) and return it from getStreamUrl.';

/** Query parameters that would mean an access token is in the URL. */
const TOKEN_PARAMS = /^(access_?token|token|bearer|authorization|api_?key)$/i;

const MESSAGE_VERSION = 1;

type TabMessage =
  | { kind: 'hello' }
  | { kind: 'state'; state: RealtimeStreamState; lastEventId?: string }
  | { kind: 'open' }
  | { kind: 'event'; event: RealtimeEvent; lastEventId?: string }
  | { kind: 'resync'; lastEventId?: string }
  | { kind: 'close'; info: RealtimeCloseInfo; state: RealtimeStreamState; lastEventId?: string }
  | { kind: 'replaced'; info: RealtimeCloseInfo; lastEventId?: string }
  | { kind: 'resume' };

/**
 * Open a Realtime stream in the browser, shared by every tab of this browser. Starts right away.
 *
 * @example
 * ```ts
 * const stream = connectRealtimeStream({ getStreamUrl: () => fetch('/api/realtime-url').then((r) => r.text()) })
 * stream.on('realtime.chat_message.received', (event) => showMessage(event.data))
 * stream.onReplaced(() => showBanner('Realtime is open in another window', () => stream.resume()))
 * ```
 */
export function connectRealtimeStream(options: ConnectRealtimeStreamOptions): RealtimeStream {
  return new BrowserRealtimeStream(options);
}

class BrowserRealtimeStream implements RealtimeStream {
  private readonly options: ConnectRealtimeStreamOptions;
  private readonly name: string;
  private currentState: RealtimeStreamState = 'connecting';
  private leader = false;
  private stopped = false;
  private source?: EventSourceLike;
  private listening = new Set<string>();
  /** Bumped for each URL; callbacks from an older source are ignored. */
  private generation = 0;
  private timer?: ReturnType<typeof setTimeout>;
  private failures = 0;
  /** A 401 / `reauth` already led to a new URL that has not opened yet. */
  private retriedAuth = false;
  /**
   * This tab's current stream URL (without `lastEventId`). Only the leader holds one, and it is never
   * shared: the server allows one open stream per URL, so a second user of a URL would replace the first.
   */
  private current?: { href: string; expiresAt?: number };
  /** Refusals with an unknown status (EventSource hides it) since the last open. */
  private unknownRefusals = 0;
  private lastId: string | undefined;
  private readonly seen = new EventIdWindow();
  private channel?: BroadcastChannelLike;
  private lockAbort?: AbortController;
  private releaseLock?: () => void;
  private readonly typed = new Map<string, Set<Listener<any>>>();
  private readonly listeners = {
    event: new Set<Listener<RealtimeEvent>>(),
    resync: new Set<Listener<void>>(),
    open: new Set<Listener<void>>(),
    close: new Set<Listener<RealtimeCloseInfo>>(),
    replaced: new Set<Listener<void>>(),
    error: new Set<Listener<unknown>>(),
  };

  constructor(options: ConnectRealtimeStreamOptions) {
    if (!options || typeof options.getStreamUrl !== 'function') {
      throw new OFAuthError('connectRealtimeStream needs getStreamUrl: a function that gets a stream URL from your server.');
    }
    for (const key of ['accessToken', 'token', 'apiKey', 'authorization', 'headers']) {
      if (key in options) throw new OFAuthError(TOKEN_MESSAGE);
    }
    this.options = options;
    this.lastId = options.lastEventId || undefined;
    this.name = `ofauth-realtime:${options.linkedAccountId ?? 'default'}`;
    this.start();
  }

  get state(): RealtimeStreamState {
    return this.currentState;
  }

  get isLeader(): boolean {
    return this.leader;
  }

  get lastEventId(): string | undefined {
    return this.lastId;
  }

  on<T extends RealtimeEventType>(type: T, listener: Listener<RealtimeEventOf<T>>): () => void {
    if (!this.typed.has(type)) this.typed.set(type, new Set());
    this.typed.get(type)!.add(listener);
    if (this.source && !this.listening.has(type)) this.listen(this.source, this.generation, type);
    return () => this.typed.get(type)?.delete(listener);
  }

  onEvent(listener: Listener<RealtimeEvent>): () => void {
    return this.subscribe('event', listener);
  }

  onResync(listener: Listener<void>): () => void {
    return this.subscribe('resync', listener);
  }

  onOpen(listener: Listener<void>): () => void {
    return this.subscribe('open', listener);
  }

  onClose(listener: Listener<RealtimeCloseInfo>): () => void {
    return this.subscribe('close', listener);
  }

  onReplaced(listener: Listener<void>): () => void {
    return this.subscribe('replaced', listener);
  }

  onError(listener: Listener<unknown>): () => void {
    return this.subscribe('error', listener);
  }

  resume(): void {
    if (this.stopped) throw new OFAuthError('This Realtime stream was closed: call connectRealtimeStream again.');
    this.failures = 0;
    this.retriedAuth = false;
    if (this.leader) {
      void this.open();
    } else {
      this.currentState = 'connecting';
      this.post({ kind: 'resume' });
    }
  }

  close(): void {
    if (this.stopped) return;
    this.stopped = true;
    this.generation++;
    clearTimeout(this.timer);
    this.closeSource();
    this.lockAbort?.abort();
    if (this.leader) {
      this.leader = false;
      // Hands the stream to the next tab waiting for the lock.
      this.releaseLock?.();
    }
    this.channel?.close();
    this.currentState = 'closed';
    this.emit('close', { reason: 'client_closed', willReconnect: false });
  }

  // ------------------------------------------------------------------ leadership

  private start(): void {
    const g = globalThis as { navigator?: { locks?: LockManagerLike }; BroadcastChannel?: BroadcastChannelConstructor };
    const locks = this.options.locks === undefined ? g.navigator?.locks : this.options.locks;
    const Channel = this.options.BroadcastChannel === undefined ? g.BroadcastChannel : this.options.BroadcastChannel;
    if (this.options.shareAcrossTabs === false || !locks || !Channel) {
      void this.lead();
      return;
    }
    this.channel = new Channel(this.name);
    this.channel.onmessage = (event) => this.receive(event.data);
    this.lockAbort = new AbortController();
    locks.request(this.name, { signal: this.lockAbort.signal }, () => this.lead()).catch(() => {
      // Aborted by close().
    });
    this.post({ kind: 'hello' });
  }

  /** Runs while this tab holds the lock; resolving it releases the lock. */
  private lead(): Promise<void> {
    return new Promise((release) => {
      if (this.stopped) return release();
      this.leader = true;
      this.releaseLock = release;
      // A stream that was replaced or stopped stays down until resume(), whichever tab leads.
      if (this.currentState === 'connecting' || this.currentState === 'open') void this.open();
    });
  }

  private post(message: TabMessage): void {
    try {
      this.channel?.postMessage({ v: MESSAGE_VERSION, ...message });
    } catch (error) {
      this.emit('error', error);
    }
  }

  private receive(data: unknown): void {
    if (this.stopped || typeof data !== 'object' || data === null || (data as { v?: unknown }).v !== MESSAGE_VERSION) return;
    const message = data as TabMessage;
    switch (message.kind) {
      case 'hello':
        if (this.leader) this.post({ kind: 'state', state: this.currentState, lastEventId: this.lastId });
        return;
      case 'resume':
        if (this.leader) {
          if (this.currentState === 'replaced' || this.currentState === 'closed') this.resume();
          else this.post({ kind: 'state', state: this.currentState, lastEventId: this.lastId });
        }
        return;
      default:
        break;
    }
    // Everything else comes from the leader.
    if (this.leader) return;
    switch (message.kind) {
      case 'state': {
        if (message.lastEventId) this.lastId = advanceCursor(this.lastId, message.lastEventId);
        const changed = this.currentState !== message.state;
        this.currentState = message.state;
        if (changed && message.state === 'open') this.emit('open', undefined);
        if (changed && message.state === 'replaced') this.emit('replaced', undefined);
        return;
      }
      case 'open':
        this.currentState = 'open';
        this.emit('open', undefined);
        return;
      case 'event':
        this.deliver(message.event, message.lastEventId);
        return;
      case 'resync':
        if (message.lastEventId) this.lastId = advanceCursor(this.lastId, message.lastEventId);
        this.emit('resync', undefined);
        return;
      case 'close':
        if (message.lastEventId) this.lastId = advanceCursor(this.lastId, message.lastEventId);
        this.currentState = message.state;
        this.emit('close', message.info);
        return;
      case 'replaced':
        if (message.lastEventId) this.lastId = advanceCursor(this.lastId, message.lastEventId);
        this.currentState = 'replaced';
        this.emit('close', message.info);
        this.emit('replaced', undefined);
        return;
    }
  }

  // ------------------------------------------------------------------ the stream (leader)

  /**
   * Open the stream. `reuse`: reconnect with this tab's current URL while it is unexpired (after
   * `unavailable`, 503, 429); otherwise (start, a new leader, `reauth`, 401, `resume()`) get a new one.
   */
  private async open(reuse = false): Promise<void> {
    const generation = ++this.generation;
    clearTimeout(this.timer);
    this.closeSource();
    this.currentState = 'connecting';
    let url: string;
    try {
      const current = this.current;
      const usable = reuse && current && (current.expiresAt === undefined || current.expiresAt - Date.now() > 5_000);
      url = this.withResumePoint(usable ? current.href : this.streamUrl(await this.options.getStreamUrl()));
    } catch (error) {
      if (generation !== this.generation || this.stopped) return;
      this.emit('error', error);
      if (generation !== this.generation || this.stopped) return;
      if (error instanceof OFAuthError && error.message === TOKEN_MESSAGE) return this.stop('rejected');
      return this.retryLater('unavailable', false);
    }
    if (generation !== this.generation || this.stopped || !this.leader) return;

    const EventSourceImpl = this.eventSource();
    if (!EventSourceImpl) {
      this.emit('error', new OFAuthError('No EventSource or fetch in this environment: pass options.EventSource.'));
      return this.stop('rejected');
    }
    const source = new EventSourceImpl(url, { withCredentials: false });
    this.source = source;
    this.listening = new Set();
    for (const type of [...REALTIME_EVENT_TYPES, ...this.typed.keys(), 'message', 'resync', 'closed']) {
      this.listen(source, generation, type);
    }
    source.onopen = () => {
      if (generation !== this.generation) return;
      this.failures = 0;
      this.retriedAuth = false;
      this.unknownRefusals = 0;
      this.currentState = 'open';
      this.post({ kind: 'open' });
      this.emit('open', undefined);
    };
    source.onerror = (event) => {
      if (generation !== this.generation) return;
      if (source.readyState !== 2) {
        // EventSource reconnects by itself, with Last-Event-ID.
        this.currentState = 'connecting';
        return;
      }
      // Failed for good: EventSource does this on any non-200 response.
      this.closeSource();
      const detail = (event ?? {}) as { status?: unknown; retryAfterMs?: unknown };
      this.refused(
        typeof detail.status === 'number' ? detail.status : undefined,
        typeof detail.retryAfterMs === 'number' ? detail.retryAfterMs : undefined,
      );
    };
  }

  private listen(source: EventSourceLike, generation: number, type: string): void {
    if (this.listening.has(type)) return;
    this.listening.add(type);
    source.addEventListener(type, (event) => {
      if (generation !== this.generation) return;
      if (type === 'closed' || type === 'resync') {
        if (event.lastEventId) this.lastId = advanceCursor(this.lastId, event.lastEventId);
      }
      if (type === 'closed') return this.serverClosed(parseCloseReason(event.data));
      if (type === 'resync') {
        this.post({ kind: 'resync', lastEventId: this.lastId });
        this.emit('resync', undefined);
        return;
      }
      this.handleEvent(event);
    });
  }

  private eventSource(): EventSourceConstructor | undefined {
    if (this.options.EventSource) return this.options.EventSource;
    const g = globalThis as { EventSource?: EventSourceConstructor; fetch?: typeof fetch };
    if (typeof g.EventSource === 'function') return g.EventSource;
    const found = this.options.fetch ?? g.fetch;
    if (typeof found !== 'function') return undefined;
    const fetchImpl: typeof fetch = found;
    return class extends FetchEventSource {
      constructor(url: string) {
        super(url, fetchImpl);
      }
    };
  }

  /** The URL with the resume point (`EventSource` sends `Last-Event-ID` itself only on its own reconnects). */
  private withResumePoint(href: string): string {
    if (!this.lastId) return href;
    const url = new URL(href);
    url.searchParams.set('lastEventId', this.lastId);
    return url.toString();
  }

  /** Check what `getStreamUrl` returned, and make it this tab's current URL. */
  private streamUrl(result: RealtimeStreamUrlResult): string {
    const raw = typeof result === 'string' ? result : result?.url;
    if (typeof raw !== 'string' || raw === '') throw new OFAuthError('getStreamUrl must return the stream URL (or { url }).');
    let url: URL;
    try {
      url = new URL(raw.trim(), (globalThis as { location?: { href?: string } }).location?.href);
    } catch {
      throw new OFAuthError('getStreamUrl returned something that is not a URL.');
    }
    if (url.protocol !== 'https:' && url.protocol !== 'http:') throw new OFAuthError('The stream URL must be http(s).');
    for (const name of url.searchParams.keys()) {
      if (TOKEN_PARAMS.test(name)) throw new OFAuthError(TOKEN_MESSAGE);
    }
    url.searchParams.delete('lastEventId');
    const expiresAt = typeof result === 'string' || !result.expiresAt ? NaN : Date.parse(result.expiresAt);
    this.current = { href: url.toString(), ...(Number.isNaN(expiresAt) ? {} : { expiresAt }) };
    return this.current.href;
  }

  private handleEvent(message: { data: string; lastEventId?: string }): void {
    let event: RealtimeEvent;
    try {
      event = JSON.parse(message.data);
    } catch (error) {
      this.emit('error', error);
      return;
    }
    if (typeof event !== 'object' || event === null || typeof event.type !== 'string') {
      this.emit('error', new OFAuthError('Realtime event without a type'));
      return;
    }
    const id = message.lastEventId || (typeof event.order === 'number' ? String(event.order) : undefined);
    if (!this.deliver(event, id)) return;
    this.post({ kind: 'event', event, lastEventId: this.lastId });
  }

  /** Dispatch once per `eventId`. False for a repeat, which does not move the resume point back. */
  private deliver(event: RealtimeEvent, lastEventId: string | undefined): boolean {
    if (typeof event.eventId === 'string' && !this.seen.add(event.eventId)) return false;
    if (lastEventId) this.lastId = advanceCursor(this.lastId, lastEventId);
    this.emit('event', event);
    for (const listener of this.typed.get(event.type) ?? []) {
      try {
        listener(event);
      } catch (error) {
        this.emit('error', error);
      }
    }
    return true;
  }

  private serverClosed(reason: RealtimeServerCloseReason): void {
    this.closeSource();
    if (reason === 'replaced') return this.replaced();
    if (reason === 'reauth') return this.reauth();
    // Transient: reconnect with the same URL (it replaces only its own, closed, stream).
    this.retryLater('unavailable', true);
  }

  /** The stream URL was refused (`readyState` 2). `status` is only known with the fetch fallback. */
  private refused(status?: number, retryAfterMs?: number): void {
    if (status === 401) return this.reauth(401);
    if (status === 409) return this.replaced(409);
    if (status !== undefined && status >= 400 && status < 500 && status !== 429) return this.stop('rejected', status);
    // 503 or 429: back off and reuse the URL. Unknown (EventSource hides the status, and it may be
    // an expired URL's 401): reuse the URL once, then get a new one.
    const known = status !== undefined && status !== 0;
    const reuse = known || this.unknownRefusals++ === 0;
    this.retryLater(known ? 'unavailable' : 'dropped', reuse, status, retryAfterMs);
  }

  /** Get a new URL now, once; a second `reauth` / 401 before a stream opens is final. */
  private reauth(status?: number): void {
    if (this.retriedAuth) return this.stop('reauth', status);
    this.retriedAuth = true;
    this.closeInfo({ reason: 'reauth', ...(status === undefined ? {} : { status }), willReconnect: true, retryInMs: 0 });
    void this.open();
  }

  private replaced(status?: number): void {
    this.closeSource();
    clearTimeout(this.timer);
    this.currentState = 'replaced';
    const info: RealtimeCloseInfo = { reason: 'replaced', ...(status === undefined ? {} : { status }), willReconnect: false };
    this.post({ kind: 'replaced', info, lastEventId: this.lastId });
    this.emit('close', info);
    this.emit('replaced', undefined);
  }

  private stop(reason: RealtimeCloseReason, status?: number): void {
    this.closeSource();
    clearTimeout(this.timer);
    this.currentState = 'closed';
    this.closeInfo({ reason, ...(status === undefined ? {} : { status }), willReconnect: false });
  }

  private retryLater(reason: RealtimeCloseReason, reuse: boolean, status?: number, retryAfterMs?: number): void {
    const max = this.options.maxReconnectDelayMs ?? 30_000;
    const base = Math.min(max, DEFAULT_RETRY_MS * 2 ** this.failures);
    this.failures++;
    const delay = Math.round(Math.max(Math.min(max, base * (1 + Math.random() / 2)), retryAfterMs ?? 0));
    this.currentState = 'connecting';
    this.closeInfo({ reason, ...(status === undefined ? {} : { status }), willReconnect: true, retryInMs: delay });
    clearTimeout(this.timer);
    const generation = this.generation;
    this.timer = setTimeout(() => {
      if (generation === this.generation && !this.stopped && this.leader) void this.open(reuse);
    }, delay);
  }

  private closeInfo(info: RealtimeCloseInfo): void {
    this.post({ kind: 'close', info, state: this.currentState, lastEventId: this.lastId });
    this.emit('close', info);
  }

  private closeSource(): void {
    const source = this.source;
    this.source = undefined;
    if (!source) return;
    source.onopen = null;
    source.onerror = null;
    source.close();
  }

  private subscribe<K extends keyof BrowserRealtimeStream['listeners']>(
    kind: K,
    listener: Parameters<BrowserRealtimeStream['listeners'][K]['add']>[0],
  ): () => void {
    (this.listeners[kind] as Set<any>).add(listener);
    return () => (this.listeners[kind] as Set<any>).delete(listener);
  }

  private emit<K extends keyof BrowserRealtimeStream['listeners']>(kind: K, value: any): void {
    for (const listener of this.listeners[kind] as Set<Listener<any>>) {
      try {
        listener(value);
      } catch (error) {
        if (kind !== 'error') this.emit('error', error);
      }
    }
  }
}

/**
 * A minimal `EventSource` over fetch streaming, for environments without one. Sends no credentials
 * and no headers but `Accept` and `Last-Event-ID`. Unlike `EventSource`, a refused response's
 * `status` and `Retry-After` are on the `error` event. @internal
 */
class FetchEventSource implements EventSourceLike {
  readyState = 0;
  onopen: ((event: unknown) => void) | null = null;
  onerror: ((event: unknown) => void) | null = null;
  private readonly listeners = new Map<string, Set<(event: { data: string; lastEventId: string }) => void>>();
  private controller?: AbortController;
  private timer?: ReturnType<typeof setTimeout>;
  private lastId = '';
  private retryMs = DEFAULT_RETRY_MS;

  constructor(
    private readonly url: string,
    private readonly fetchImpl: typeof fetch,
  ) {
    void this.connect();
  }

  addEventListener(type: string, listener: (event: { data: string; lastEventId?: string }) => void): void {
    if (!this.listeners.has(type)) this.listeners.set(type, new Set());
    this.listeners.get(type)!.add(listener);
  }

  close(): void {
    this.readyState = 2;
    clearTimeout(this.timer);
    this.controller?.abort();
  }

  private async connect(): Promise<void> {
    if (this.readyState === 2) return;
    const controller = new AbortController();
    this.controller = controller;
    let heartbeat: ReturnType<typeof setTimeout> | undefined;
    const arm = () => {
      clearTimeout(heartbeat);
      heartbeat = setTimeout(() => controller.abort(), DEFAULT_HEARTBEAT_TIMEOUT_MS);
    };
    arm();
    const headers: Record<string, string> = { accept: 'text/event-stream' };
    if (this.lastId) headers['last-event-id'] = this.lastId;
    try {
      const response = await this.fetchImpl(this.url, {
        headers,
        credentials: 'omit',
        referrerPolicy: 'no-referrer',
        signal: controller.signal,
      });
      if (this.readyState === 2) return void response.body?.cancel().catch(() => {});
      const contentType = (response.headers.get('content-type') ?? '').toLowerCase();
      if (response.status !== 200 || !response.body || !contentType.startsWith('text/event-stream')) {
        clearTimeout(heartbeat);
        this.readyState = 2;
        const retryAfter = serverRetryDelaySeconds(response.headers);
        response.body?.cancel().catch(() => {});
        this.onerror?.({ type: 'error', status: response.status, ...(retryAfter !== undefined && retryAfter > 0 ? { retryAfterMs: retryAfter * 1000 } : {}) });
        return;
      }
      this.readyState = 1;
      this.onopen?.({ type: 'open' });
      const parser = new SseParser(
        {
          onCursor: (id) => { this.lastId = advanceCursor(this.lastId || undefined, id) ?? ''; },
          onRetry: (ms) => {
            this.retryMs = ms;
          },
          onMessage: (message) => {
            if (this.readyState === 2) return;
            for (const listener of this.listeners.get(message.event) ?? []) {
              listener({ data: message.data, lastEventId: message.lastEventId });
            }
          },
        },
        this.lastId,
      );
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done || this.readyState === 2) break;
          arm();
          parser.push(decoder.decode(value, { stream: true }));
        }
      } finally {
        this.lastId = parser.lastEventId;
        parser.end();
        reader.cancel().catch(() => {});
      }
    } catch {
      // A network error or the heartbeat timeout: reconnect, like EventSource.
    } finally {
      clearTimeout(heartbeat);
    }
    if (this.readyState === 2) return;
    this.readyState = 0;
    this.onerror?.({ type: 'error' });
    this.timer = setTimeout(() => void this.connect(), this.retryMs);
  }
}
