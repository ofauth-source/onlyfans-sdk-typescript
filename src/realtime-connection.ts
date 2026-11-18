/* eslint-disable */
/**
 * The Realtime connection behind `client.realtime()`: Server-Sent Events over fetch streaming.
 * Internal: not re-exported from the package index, so a connection can only be created by a
 * configured client. @internal
 */

import {
  OFAuthAPIError,
  OFAuthConnectionError,
  OFAuthError,
  callHook,
  debugLogger,
  isNetworkError,
  isRecord,
  mergeHeaders,
  readBody,
  redactHeaders,
  rejectCallerAuthorization,
  resolveAccessToken,
  sanitizeUrl,
} from './runtime';
import type { AccessTokenSource } from './runtime';
import type { RealtimeConnection, RealtimeOptions } from './realtime';
import type { RealtimeCloseInfo, RealtimeCloseReason, RealtimeEvent, RealtimeEventOf, RealtimeEventType, RealtimeServerCloseReason } from './realtime-events';
import {
  advanceCursor,
  DEFAULT_HEARTBEAT_TIMEOUT_MS,
  DEFAULT_RETRY_MS,
  EventIdWindow,
  REALTIME_EVENTS_PATH,
  SseParser,
  parseCloseReason,
} from './realtime-sse';
import type { SseMessage } from './realtime-sse';

/** What `client.realtime()` passes to the connection. @internal */
export interface RealtimeInit extends Omit<RealtimeOptions, 'linkedAccountId'> {
  accessToken: AccessTokenSource;
  linkedAccountId: string;
  /** Always `realtimeUrlFor(<client baseUrl>)`. */
  url: string;
  /** The client's `fetch`. */
  fetch?: typeof fetch;
  /** The client's extra headers (never `authorization`). */
  headers?: Record<string, string>;
}

type Listener<T> = (value: T) => void;


/**
 * The Realtime event stream URL on the API origin: `https://host` becomes
 * `https://host/v3/realtime/events`. Realtime is served on the same origin as every other API route,
 * so the token only goes where API requests go. Throws for a `baseUrl` that is not http(s). @internal
 */
export function realtimeUrlFor(baseUrl: string): string {
  const base = baseUrl.replace(/\/+$/, '');
  if (!/^https?:\/\//i.test(base)) {
    throw new OFAuthError(`Cannot derive the Realtime URL from baseUrl ${base}: it is not an http(s) URL.`);
  }
  return `${base}${REALTIME_EVENTS_PATH}`;
}

/** How one stream attempt ended. */
interface Outcome {
  reason: RealtimeCloseReason;
  status?: number;
  error?: unknown;
  retryAfterMs?: number;
  /** The stream delivered an event or a heartbeat. */
  healthy?: boolean;
  /** The token the attempt used, for a refresh after 401 / `reauth`. */
  token?: string;
}

/** The {@link RealtimeConnection} returned by `client.realtime()`. @internal */
export class ClientRealtimeConnection implements RealtimeConnection {
  private readonly config: RealtimeInit;
  /** Bumped by `connect()` and `close()`; a loop from an older generation stops. */
  private generation = 0;
  private active = false;
  private hasConnected = false;
  private pending?: { promise: Promise<void>; resolve: () => void; reject: (error: unknown) => void };
  private controller?: AbortController;
  private reconnectTimer?: ReturnType<typeof setTimeout>;
  private wake?: () => void;
  /** Hook attempt number: 1 for the first attempt, reset when a stream opens. */
  private attempt = 0;
  /** Consecutive attempts without a healthy stream, for the backoff. */
  private failures = 0;
  private retryMs = DEFAULT_RETRY_MS;
  private lastId: string | undefined;
  private readonly seen = new EventIdWindow();
  private readonly typed = new Map<string, Set<Listener<any>>>();
  private readonly listeners = {
    event: new Set<Listener<RealtimeEvent>>(),
    resync: new Set<Listener<void>>(),
    open: new Set<Listener<void>>(),
    close: new Set<Listener<RealtimeCloseInfo>>(),
    error: new Set<Listener<unknown>>(),
  };

  /** @internal Use `client.realtime()`. */
  constructor(config: RealtimeInit) {
    rejectCallerAuthorization(config.headers);
    this.config = config;
    this.lastId = config.lastEventId || undefined;
  }

  get lastEventId(): string | undefined {
    return this.lastId;
  }

  on<T extends RealtimeEventType>(type: T, listener: Listener<RealtimeEventOf<T>>): () => void {
    if (!this.typed.has(type)) this.typed.set(type, new Set());
    this.typed.get(type)!.add(listener);
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

  onError(listener: Listener<unknown>): () => void {
    return this.subscribe('error', listener);
  }

  connect(): Promise<void> {
    if (this.active) return this.pending?.promise ?? Promise.resolve();
    const generation = ++this.generation;
    this.active = true;
    this.hasConnected = false;
    this.attempt = 0;
    this.failures = 0;
    let resolve!: () => void;
    let reject!: (error: unknown) => void;
    const promise = new Promise<void>((res, rej) => {
      resolve = res;
      reject = rej;
    });
    this.pending = { promise, resolve, reject };
    void this.run(generation);
    return promise;
  }

  close(): void {
    if (!this.active) return;
    this.generation++;
    this.active = false;
    clearTimeout(this.reconnectTimer);
    this.wake?.();
    this.controller?.abort(new OFAuthError('Realtime connection closed'));
    this.settlePending(new OFAuthError('Realtime connection closed before it opened'));
    this.emit('close', { reason: 'client_closed', willReconnect: false } satisfies RealtimeCloseInfo);
  }

  private subscribe<K extends keyof ClientRealtimeConnection['listeners']>(
    kind: K,
    listener: Parameters<ClientRealtimeConnection['listeners'][K]['add']>[0],
  ): () => void {
    (this.listeners[kind] as Set<any>).add(listener);
    return () => (this.listeners[kind] as Set<any>).delete(listener);
  }

  private emit<K extends keyof ClientRealtimeConnection['listeners']>(kind: K, value: any): void {
    for (const listener of this.listeners[kind] as Set<Listener<any>>) {
      try {
        listener(value);
      } catch (error) {
        if (kind !== 'error') this.emit('error', error);
      }
    }
  }

  private settlePending(error?: unknown): void {
    const pending = this.pending;
    this.pending = undefined;
    if (!pending) return;
    if (error === undefined) pending.resolve();
    else pending.reject(error);
  }

  private async run(generation: number): Promise<void> {
    let refresh: { rejectedAccessToken?: string } | undefined;
    // One token refresh (and retry) per `reauth` / 401, until a stream is healthy again.
    let refreshUsed = false;
    for (;;) {
      const outcome = await this.stream(generation, refresh);
      refresh = undefined;
      if (generation !== this.generation) return;
      if (outcome.healthy) {
        this.failures = 0;
        refreshUsed = false;
      }

      let willReconnect = false;
      let delay = 0;
      switch (outcome.reason) {
        case 'reauth': {
          // A string token cannot be refreshed, so a 401 for it is final.
          const canRetry = !(outcome.status === 401 && typeof this.config.accessToken === 'string');
          if (!refreshUsed && canRetry) {
            refreshUsed = true;
            refresh = { rejectedAccessToken: outcome.token };
            willReconnect = true;
            this.failures++;
          }
          break;
        }
        case 'unavailable':
        case 'dropped':
        case 'heartbeat_timeout':
          willReconnect = this.config.reconnect !== false;
          if (willReconnect) delay = this.backoff(outcome.retryAfterMs);
          break;
        default:
          // `replaced`, `rejected`: final.
          break;
      }
      // A first connect that never opened rejects instead of retrying in the background,
      // except for the one token refresh.
      if (!this.hasConnected && !refresh) willReconnect = false;
      if (!willReconnect) {
        this.active = false;
        this.settlePending(outcome.error ?? new OFAuthError(`Realtime stream closed (${outcome.reason})`));
      }
      this.emit('close', {
        reason: outcome.reason,
        ...(outcome.status === undefined ? {} : { status: outcome.status }),
        willReconnect,
        ...(willReconnect ? { retryInMs: Math.round(delay) } : {}),
      } satisfies RealtimeCloseInfo);
      if (!willReconnect) return;
      if (delay > 0) await this.sleep(delay);
      if (generation !== this.generation) return;
    }
  }

  /** Exponential backoff from the server's `retry` time, with jitter, at least `Retry-After`. */
  private backoff(retryAfterMs?: number): number {
    const max = this.config.maxReconnectDelayMs ?? 30_000;
    const base = Math.min(max, this.retryMs * 2 ** this.failures);
    this.failures++;
    return Math.max(Math.min(max, base * (1 + Math.random() / 2)), retryAfterMs ?? 0);
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => {
      this.wake = () => {
        this.wake = undefined;
        clearTimeout(this.reconnectTimer);
        resolve();
      };
      this.reconnectTimer = setTimeout(() => this.wake?.(), ms);
    });
  }

  /** One attempt: request the stream, then read it until it ends. */
  private async stream(generation: number, refresh: { rejectedAccessToken?: string } | undefined): Promise<Outcome> {
    const attempt = ++this.attempt;
    let token: string;
    try {
      token = await resolveAccessToken(this.config.accessToken, refresh !== undefined, refresh?.rejectedAccessToken);
    } catch (error) {
      if (generation === this.generation) this.emit('error', error);
      return { reason: 'dropped', error };
    }
    if (generation !== this.generation) return { reason: 'client_closed' };

    const url = new URL(this.config.url);
    url.searchParams.set('linkedAccountId', this.config.linkedAccountId);
    const href = url.toString();
    const safeUrl = sanitizeUrl(href);
    const headers = mergeHeaders(this.config.headers, {
      accept: 'text/event-stream',
      'cache-control': 'no-cache',
      authorization: `Bearer ${token}`,
    });
    if (this.lastId) headers['last-event-id'] = this.lastId;
    const log = debugLogger(this.config.debug);
    callHook(this.config.onRequest, { method: 'GET', url: safeUrl, headers: redactHeaders(headers), attempt });

    const controller = new AbortController();
    this.controller = controller;
    const heartbeatMs = this.config.heartbeatTimeoutMs ?? DEFAULT_HEARTBEAT_TIMEOUT_MS;
    let timedOut = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const arm = () => {
      if (!(heartbeatMs > 0)) return;
      clearTimeout(timer);
      timer = setTimeout(() => {
        timedOut = true;
        controller.abort(new OFAuthError(`Realtime stream silent for ${heartbeatMs}ms`));
      }, heartbeatMs);
    };
    arm();

    const started = Date.now();
    let response: Response;
    try {
      response = await (this.config.fetch ?? globalThis.fetch)(href, {
        method: 'GET',
        headers,
        signal: controller.signal,
        redirect: 'error',
      });
    } catch (cause) {
      clearTimeout(timer);
      const durationMs = Date.now() - started;
      if (generation !== this.generation) {
        callHook(this.config.onResponse, { method: 'GET', url: safeUrl, durationMs, attempt, error: cause });
        return { reason: 'client_closed' };
      }
      const network = timedOut || isNetworkError(cause);
      const error = timedOut
        ? new OFAuthConnectionError(`GET ${REALTIME_EVENTS_PATH} got no response in ${heartbeatMs}ms`, cause)
        : network
          ? new OFAuthConnectionError(`GET ${REALTIME_EVENTS_PATH} failed: ${cause instanceof Error ? cause.message : String(cause)}`, cause)
          : cause;
      callHook(this.config.onResponse, { method: 'GET', url: safeUrl, durationMs, attempt, error });
      log?.(`[ofauth] SSE ${REALTIME_EVENTS_PATH} -> ${timedOut ? 'timeout' : network ? 'network error' : 'fetch threw'} (${durationMs}ms)`);
      this.emit('error', error);
      // A custom fetch that throws on purpose (not a network failure) is final.
      return { reason: timedOut ? 'heartbeat_timeout' : network ? 'dropped' : 'rejected', error, token };
    }

    const durationMs = Date.now() - started;
    const status = response.status;
    const requestId = response.headers.get('x-realtime-session-id') || response.headers.get('x-request-id') || undefined;
    callHook(this.config.onResponse, { method: 'GET', url: safeUrl, status, requestId, durationMs, attempt });
    log?.(`[ofauth] SSE ${REALTIME_EVENTS_PATH} -> ${status} (${durationMs}ms${requestId ? `, ${requestId}` : ''})`);

    const contentType = (response.headers.get('content-type') ?? '').toLowerCase();
    if (status !== 200 || !response.body || !contentType.startsWith('text/event-stream')) {
      let body: unknown;
      try {
        body = await readBody(response);
      } catch {
        body = undefined;
      }
      clearTimeout(timer);
      const error = new OFAuthAPIError(status, body, response.headers, { operation: 'realtime' });
      if (generation !== this.generation) return { reason: 'client_closed' };
      this.emit('error', error);
      const reason: RealtimeCloseReason =
        status === 401 ? 'reauth' : status === 409 ? 'replaced' : status === 429 || status >= 500 ? 'unavailable' : 'rejected';
      return {
        reason,
        status,
        error,
        token,
        ...(error.retryAfter === undefined ? {} : { retryAfterMs: error.retryAfter * 1000 }),
      };
    }

    // Open.
    this.attempt = 0;
    this.hasConnected = true;
    this.settlePending();
    this.emit('open', undefined);

    let closed: RealtimeServerCloseReason | undefined;
    let healthy = false;
    const parser = new SseParser(
      {
        onCursor: (id) => {
          if (!closed && generation === this.generation) this.lastId = advanceCursor(this.lastId, id);
        },
        onRetry: (ms) => {
          this.retryMs = ms;
        },
        onComment: () => {
          healthy = true;
        },
        onMessage: (message) => {
          if (closed || generation !== this.generation) return;
          if (message.event === 'closed') {
            closed = parseCloseReason(message.data);
            return;
          }
          healthy = true;
          if (message.event === 'resync') this.emit('resync', undefined);
          else this.handleEvent(message);
        },
      },
      this.lastId ?? '',
    );
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let failure: unknown;
    try {
      while (!closed) {
        const { done, value } = await reader.read();
        if (done) break;
        arm();
        parser.push(decoder.decode(value, { stream: true }));
        if (generation !== this.generation) break;
      }
    } catch (error) {
      failure = error;
    } finally {
      clearTimeout(timer);
      parser.end();
      reader.cancel().catch(() => {});
    }
    if (generation !== this.generation) return { reason: 'client_closed', healthy };
    if (closed) return { reason: closed, healthy, token };
    if (timedOut) {
      const error = new OFAuthConnectionError(`Realtime stream silent for ${heartbeatMs}ms`, failure);
      this.emit('error', error);
      return { reason: 'heartbeat_timeout', healthy, error };
    }
    if (failure !== undefined) this.emit('error', failure);
    return { reason: 'dropped', healthy, ...(failure === undefined ? {} : { error: failure }) };
  }

  private handleEvent(message: SseMessage): void {
    let event: RealtimeEvent;
    try {
      event = JSON.parse(message.data);
    } catch (error) {
      if (message.lastEventId) this.lastId = message.lastEventId;
      this.emit('error', error);
      return;
    }
    if (!isRecord(event) || typeof event.type !== 'string') {
      if (message.lastEventId) this.lastId = message.lastEventId;
      this.emit('error', new OFAuthError(`Realtime event without a type (SSE event ${message.event})`));
      return;
    }
    // A repeat (at-least-once delivery) does not move the resume point back.
    if (typeof event.eventId === 'string' && !this.seen.add(event.eventId)) return;
    if (message.lastEventId) this.lastId = message.lastEventId;
    this.emit('event', event);
    for (const listener of this.typed.get(event.type) ?? []) {
      try {
        listener(event);
      } catch (error) {
        this.emit('error', error);
      }
    }
  }
}
