import { vi } from 'vitest';
import type { Call } from './helpers';

/** A text/event-stream body the test writes to. Aborting the request errors it, like fetch does. */
export function sseBody() {
  let controller!: ReadableStreamDefaultController<Uint8Array>;
  let closed = false;
  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    start(c) {
      controller = c;
    },
    cancel() {
      closed = true;
    },
  });
  return {
    stream,
    push(text: string) {
      if (!closed) controller.enqueue(encoder.encode(text));
    },
    end() {
      if (closed) return;
      closed = true;
      controller.close();
    },
    fail(error: unknown = new TypeError('terminated')) {
      if (closed) return;
      closed = true;
      controller.error(error);
    },
    get closed() {
      return closed;
    },
  };
}

export type SseBody = ReturnType<typeof sseBody>;

/** One SSE event frame. */
export function frame(fields: { id?: string | number; event?: string; data: unknown }): string {
  const data = typeof fields.data === 'string' ? fields.data : JSON.stringify(fields.data);
  return `${fields.id === undefined ? '' : `id: ${fields.id}\n`}${fields.event ? `event: ${fields.event}\n` : ''}data: ${data}\n\n`;
}

/** A Realtime event as the stream sends it. */
export function realtimeEvent(order: number, type = 'realtime.chat_message.received', overrides: Record<string, unknown> = {}) {
  return {
    eventId: `evt_${order}`,
    type,
    schemaVersion: '1',
    order,
    receivedAt: '2026-10-25T09:00:00.000Z',
    environment: 'sandbox',
    integrationId: 'int_1',
    linkedAccountId: 'conn_1',
    test: false,
    data: { id: order },
    ...overrides,
  };
}

export const eventFrame = (order: number, type?: string, overrides?: Record<string, unknown>) => {
  const event = realtimeEvent(order, type, overrides);
  return frame({ id: order, event: event.type, data: event });
};

export const closedFrame = (reason: string) => frame({ event: 'closed', data: { reason } });

/**
 * A fetch that answers each request with the next scripted reply (the last one repeats):
 * a number (an error status), `'stream'` (a 200 event stream the test drives), or an Error (rejects).
 */
export function sseFetch(...replies: Array<number | 'stream' | Error | { status: number; headers?: Record<string, string>; body?: unknown }>) {
  const calls: Call[] = [];
  const bodies: SseBody[] = [];
  const fn = vi.fn(async (url: string | URL | Request, init?: RequestInit) => {
    const call = { url: String(url), init: init as Call['init'] };
    calls.push(call);
    const reply = replies.length > 1 ? replies.shift()! : replies[0];
    if (reply instanceof Error) throw reply;
    if (reply === 'stream') {
      const body = sseBody();
      bodies.push(body);
      call.init.signal?.addEventListener('abort', () => body.fail(call.init.signal!.reason), { once: true });
      return new Response(body.stream, {
        status: 200,
        headers: { 'content-type': 'text/event-stream; charset=utf-8', 'x-realtime-session-id': `rts_${bodies.length}` },
      });
    }
    const status = typeof reply === 'number' ? reply : reply.status;
    const headers = typeof reply === 'number' ? {} : reply.headers ?? {};
    const body = typeof reply === 'number' ? { error: `http_${status}` } : reply.body ?? { error: `http_${status}` };
    return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', ...headers } });
  });
  return { fetch: fn as unknown as typeof fetch, calls, bodies, last: () => bodies[bodies.length - 1] };
}

/** Let pending promises and stream reads settle. */
export async function flush(times = 10) {
  for (let i = 0; i < times; i++) await new Promise<void>((resolve) => queueMicrotask(resolve));
}
