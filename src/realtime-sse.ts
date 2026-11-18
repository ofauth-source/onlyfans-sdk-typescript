/* eslint-disable */
/**
 * An incremental Server-Sent Events parser, per the HTML "event stream" interpretation rules
 * (https://html.spec.whatwg.org/multipage/server-sent-events.html#event-stream-interpretation).
 * Token-free and internal: used by `client.realtime()` and the browser client's fetch fallback. @internal
 */

import type { RealtimeServerCloseReason } from './realtime-events';

/** The path of the event stream. @internal */
export const REALTIME_EVENTS_PATH = '/v3/realtime/events';
/** EventSource's reconnection time until the stream sends `retry:`. @internal */
export const DEFAULT_RETRY_MS = 3_000;
/** Three missed 15 s heartbeats. @internal */
export const DEFAULT_HEARTBEAT_TIMEOUT_MS = 45_000;
/** How many recent `eventId`s are remembered for dedupe (the server's replay buffer holds 1,000 events). @internal */
export const DEDUPE_WINDOW = 1_000;

/** The `reason` of an `event: closed` frame; anything unknown counts as `unavailable`. @internal */
export function parseCloseReason(data: string): RealtimeServerCloseReason {
  try {
    const reason = JSON.parse(data)?.reason;
    if (reason === 'reauth' || reason === 'replaced' || reason === 'unavailable') return reason;
  } catch {
    // Fall through.
  }
  return 'unavailable';
}

/** Remembers the most recent `eventId`s. @internal */
export class EventIdWindow {
  private readonly ids = new Set<string>();
  constructor(private readonly size = DEDUPE_WINDOW) {}

  /** True the first time an id is seen. */
  add(id: string): boolean {
    if (this.ids.has(id)) return false;
    this.ids.add(id);
    if (this.ids.size > this.size) this.ids.delete(this.ids.values().next().value as string);
    return true;
  }
}

/** One dispatched SSE event. @internal */
export interface SseMessage {
  /** The `event` field, or `message` when there was none. */
  event: string;
  /** The `data` lines joined with `\n`. */
  data: string;
  /** The stream's last event id when the event was dispatched (the `id` field persists across events). */
  lastEventId: string;
}

/** @internal */
export interface SseHandlers {
  onMessage(message: SseMessage): void;
  /** An explicit id in a block without data, including an empty id reset. */
  onCursor?(id: string): void;
  /** A valid `retry` field, in milliseconds. */
  onRetry?(ms: number): void;
  /** A comment line, without the leading `:` and one optional space (e.g. `heartbeat`). */
  onComment?(text: string): void;
}

/**
 * Feed decoded text with {@link push}, in chunks of any size: lines may be split anywhere,
 * including between `\r` and `\n`. Lines end with `\n`, `\r\n`, or `\r`; a leading BOM is dropped.
 * @internal
 */
export class SseParser {
  /** The last event id, sent back as `Last-Event-ID` on reconnects. */
  lastEventId: string;
  private buffer = '';
  private scanned = 0;
  private started = false;
  private skipLf = false;
  private eventType = '';
  private data = '';
  private hasData = false;
  private idBuffer: string;
  private hasId = false;

  constructor(private readonly handlers: SseHandlers, lastEventId = '') {
    this.lastEventId = lastEventId;
    this.idBuffer = lastEventId;
  }

  push(text: string): void {
    if (!text) return;
    if (this.skipLf) {
      this.skipLf = false;
      if (text.charCodeAt(0) === 10) text = text.slice(1);
      if (!text) return;
    }
    if (!this.started) {
      this.started = true;
      if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
    }
    const buffer = this.buffer + text;
    let start = 0;
    for (let i = this.scanned; i < buffer.length; i++) {
      const c = buffer.charCodeAt(i);
      if (c !== 10 && c !== 13) continue;
      this.line(buffer.slice(start, i));
      if (c === 13) {
        if (i + 1 < buffer.length) {
          if (buffer.charCodeAt(i + 1) === 10) i++;
        } else {
          this.skipLf = true;
        }
      }
      start = i + 1;
    }
    this.buffer = buffer.slice(start);
    this.scanned = this.buffer.length;
  }

  /** The stream ended: an event without its closing blank line is discarded, as the spec requires. */
  end(): void {
    this.buffer = '';
    this.scanned = 0;
    this.eventType = '';
    this.data = '';
    this.hasData = false;
    this.hasId = false;
    this.idBuffer = this.lastEventId;
  }

  private line(line: string): void {
    if (line === '') return this.dispatch();
    if (line.charCodeAt(0) === 58 /* : */) {
      this.handlers.onComment?.(line.slice(1).replace(/^ /, ''));
      return;
    }
    const colon = line.indexOf(':');
    const field = colon < 0 ? line : line.slice(0, colon);
    const value = colon < 0 ? '' : line.slice(colon + 1).replace(/^ /, '');
    switch (field) {
      case 'event':
        this.eventType = value;
        break;
      case 'data':
        this.data += this.hasData ? `\n${value}` : value;
        this.hasData = true;
        break;
      case 'id':
        if (!value.includes('\0')) {
          this.idBuffer = value;
          this.hasId = true;
        }
        break;
      case 'retry':
        if (/^[0-9]+$/.test(value)) this.handlers.onRetry?.(Number(value));
        break;
      default:
        // Unknown fields are ignored.
        break;
    }
  }

  private dispatch(): void {
    this.lastEventId = this.idBuffer;
    const hasData = this.hasData;
    const message: SseMessage = { event: this.eventType || 'message', data: this.data, lastEventId: this.lastEventId };
    this.eventType = '';
    this.data = '';
    this.hasData = false;
    const hasId = this.hasId;
    this.hasId = false;
    if (hasData) this.handlers.onMessage(message);
    else if (hasId) this.handlers.onCursor?.(this.lastEventId);
  }
}

/** Resume cursors are per-account integer orders; duplicate frames cannot move them backwards. @internal */
export function advanceCursor(current: string | undefined, next: string): string | undefined {
  if (!next) return undefined;
  if (current && /^\d+$/.test(current) && /^\d+$/.test(next) && BigInt(next) < BigInt(current)) return current;
  return next;
}
