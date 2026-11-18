/* eslint-disable */
/**
 * Realtime over Server-Sent Events: Realtime events for one linked account.
 *
 * - Servers: `client.realtime()` streams `GET /v3/realtime/events` on the client's `baseUrl`
 *   origin with the client's access token.
 * - Browsers: your server calls `client.realtime.createStreamUrl()` and hands the page the stream
 *   URL; the page uses `connectRealtimeStream` from `@ofauth/onlyfans-sdk/realtime-browser`.
 *
 * Lifecycle events (`authorization.*`, `linked_account.*`) are delivered by webhook only.
 */

import type { ClientOptions, RequestOptions } from './runtime';
import type { RealtimeCloseInfo, RealtimeEvent, RealtimeEventOf, RealtimeEventType } from './realtime-events';

export type {
  RealtimeCloseInfo,
  RealtimeCloseReason,
  RealtimeEvent,
  RealtimeEventOf,
  RealtimeEventType,
  RealtimeServerCloseReason,
} from './realtime-events';
export { REALTIME_EVENT_TYPES } from './realtime-event-types';

/**
 * Options for `client.realtime()`. The stream always goes to `/v3/realtime/events` on the client's
 * `baseUrl` origin with the client's access token and extra `headers`; there is no URL option.
 *
 * `onRequest` fires before each connection attempt (method `GET`, the URL, headers with
 * `authorization` redacted). `onResponse` fires when the response headers arrive (status 200 when the
 * stream opened), or with `error` and no status when no response arrived. `debug` logs e.g.
 * `[ofauth] SSE /v3/realtime/events -> 200 (85ms, <session id>)`. All three default to the client's.
 */
export interface RealtimeOptions extends Pick<ClientOptions, 'onRequest' | 'onResponse' | 'debug'> {
  /** The linked account to receive events for. Defaults to the client's. */
  linkedAccountId?: string;
  /** Resume after this event id (an event's `order`), e.g. one you stored before a restart. */
  lastEventId?: string;
  /** Reconnect after the stream drops or Realtime is briefly unavailable. Defaults to true. */
  reconnect?: boolean;
  /** Upper bound for the reconnect backoff. Defaults to 30 seconds. */
  maxReconnectDelayMs?: number;
  /**
   * Treat the stream as dead when nothing (not even the 15 s heartbeat) arrives for this long, and
   * reconnect. Also bounds the wait for the response headers. Defaults to 45 seconds; 0 disables it.
   */
  heartbeatTimeoutMs?: number;
}

/** `POST /v3/realtime`: a stream URL for a browser. */
export interface RealtimeStreamUrl {
  /** The full `GET /v3/realtime/events` URL, carrying a stream credential (not an access token). */
  url: string;
  /** When the credential expires (10 minutes, never after the access token). The open stream then ends with `reauth`. */
  expiresAt: string;
}

export interface CreateRealtimeStreamUrlParams {
  /** The linked account to stream. Defaults to the client's. */
  linkedAccountId?: string;
}

/**
 * `client.realtime`: call it for a server stream, or use `createStreamUrl` to mint a stream URL for a
 * browser.
 */
export interface RealtimeClient {
  /**
   * A Realtime stream for one linked account over Server-Sent Events, using this client's access
   * token, extra headers, `onRequest`/`onResponse` hooks, and `debug` setting. Call `connect()` on the result.
   */
  (options?: RealtimeOptions): RealtimeConnection;
  /**
   * Mint a stream URL for a browser (`POST /v3/realtime`). Send only the URL to the page, which
   * opens it with `connectRealtimeStream` (or `new EventSource(url)`). The URL carries a 10-minute
   * stream credential, which can only read this account's Realtime events; the access token never
   * leaves your server. Rate limited to 30 per minute per authorization.
   */
  createStreamUrl(params?: CreateRealtimeStreamUrlParams, options?: RequestOptions): Promise<RealtimeStreamUrl>;
}

type Listener<T> = (value: T) => void;

/**
 * A Realtime event stream for one linked account, with automatic reconnects and resume. Returned by
 * `client.realtime()`; there is no way to construct one without a client.
 *
 * Up to 10 streams per linked account can be open; a newer one replaces the oldest (`replaced`).
 *
 * @example
 * ```ts
 * const realtime = client.realtime()
 * realtime.on('realtime.chat_message.received', (event) => console.log(event.data))
 * realtime.onResync(() => refetchEverything())
 * realtime.onClose(({ reason, willReconnect }) => console.log('closed', reason, willReconnect))
 * await realtime.connect()
 * ```
 */
export interface RealtimeConnection {
  /** Listen for one event type. Returns an unsubscribe function. */
  on<T extends RealtimeEventType>(type: T, listener: Listener<RealtimeEventOf<T>>): () => void;
  /** Listen for every event. */
  onEvent(listener: Listener<RealtimeEvent>): () => void;
  /**
   * The resume point was older than the server's replay buffer (1,000 events or 15 minutes), so
   * events were missed: refetch the state you show through the REST API.
   */
  onResync(listener: Listener<void>): () => void;
  /** A stream opened (the first one, and every reconnect). */
  onOpen(listener: Listener<void>): () => void;
  onClose(listener: Listener<RealtimeCloseInfo>): () => void;
  onError(listener: Listener<unknown>): () => void;
  /** The id (`order`) of the last event received, sent as `Last-Event-ID` on reconnects. */
  readonly lastEventId: string | undefined;
  /**
   * Open the stream. Resolves once it is open; rejects when the first attempt fails (an
   * `OFAuthAPIError` with the status, e.g. 401, 409 or 503 with `retryAfter`). Calling it while
   * connected is a no-op.
   */
  connect(): Promise<void>;
  /** Close the stream and stop reconnecting. */
  close(): void;
}
