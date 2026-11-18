/* eslint-disable */
/**
 * Realtime event and close types shared by the server client (`client.realtime()`) and the
 * browser client (`@ofauth/onlyfans-sdk/realtime-browser`). Token-free: nothing here holds or
 * reads an access token.
 */

import type { RealtimeWebhookEvent } from './webhooks';

type StreamShape<E> = E extends unknown
  ? Omit<E, 'occurredAt' | 'authorizationId' | 'externalOauthClientId'> & {
      /** When OFAuth received the event. */
      receivedAt: string;
    }
  : never;

/**
 * A Realtime event from the event stream (`GET /v3/realtime/events`): the `realtime.*` webhook
 * envelope without `occurredAt`, `authorizationId`, and `externalOauthClientId`, plus `receivedAt`.
 * `order` is the SSE `id`; delivery is at least once, so the SDK drops repeated `eventId`s.
 */
export type RealtimeEvent = StreamShape<RealtimeWebhookEvent>;
export type RealtimeEventType = RealtimeEvent['type'];
/** The event for one type, e.g. `RealtimeEventOf<'realtime.chat_message.received'>`. */
export type RealtimeEventOf<T extends RealtimeEventType> = Extract<RealtimeEvent, { type: T }>;

/**
 * Why a Realtime stream ended:
 * - `reauth`: the stream's credential or authorization no longer holds (the server sent
 *   `closed` with `reauth`, or answered 401). The SDK gets a new token or stream URL and retries once.
 * - `replaced`: a newer stream for this linked account took the slot (more than 10 streams per
 *   account; the oldest is replaced), or 409 `stream_replaced`. The SDK stops.
 * - `unavailable`: a transient outage (`closed` with `unavailable`, 503, 429). The SDK backs off and resumes.
 * - `dropped`: the connection ended without a `closed` event, or failed (network error). The SDK resumes.
 * - `heartbeat_timeout`: no bytes, not even the 15 s heartbeat, for `heartbeatTimeoutMs`. The SDK resumes.
 * - `rejected`: the request was refused for good (400, 403, 404, 406, or a non-event-stream response). The SDK stops.
 * - `client_closed`: you called `close()`.
 */
export type RealtimeCloseReason =
  | 'reauth'
  | 'replaced'
  | 'unavailable'
  | 'dropped'
  | 'heartbeat_timeout'
  | 'rejected'
  | 'client_closed';

/** Passed to `onClose`, on the server and in the browser. */
export interface RealtimeCloseInfo {
  /** Why the stream ended. */
  reason: RealtimeCloseReason;
  /**
   * The HTTP status when the server refused the stream (401, 409, 503, ...). In the browser only the
   * fetch fallback knows it: `EventSource` hides the status.
   */
  status?: number;
  /** True when the client will reconnect. */
  willReconnect: boolean;
  /** When `willReconnect`, the delay before the next attempt. */
  retryInMs?: number;
}

/** The `reason` of the stream's `event: closed` frame. */
export type RealtimeServerCloseReason = 'reauth' | 'replaced' | 'unavailable';
