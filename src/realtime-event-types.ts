/* eslint-disable */
/**
 * Every Realtime event type, from the spec (`components.schemas.Realtime*Envelope`). Generated; do not edit.
 */

import type { RealtimeEventType } from './realtime-events';

/**
 * Every Realtime event type this SDK version knows. The browser client listens for these on
 * `EventSource` (which only delivers named events to listeners for that name).
 */
export const REALTIME_EVENT_TYPES = [
  'realtime.chat_message.liked',
  'realtime.chat_message.received',
  'realtime.chat_message.unliked',
  'realtime.chat_typing.updated',
  'realtime.inbox_counts.updated',
  'realtime.post.published',
  'realtime.post_fundraising.updated',
  'realtime.stories.updated',
  'realtime.system_message.received',
  'realtime.system_messages.updated',
  'realtime.toasts.received'
] as const satisfies readonly RealtimeEventType[];

// Fails to compile when an event type is missing above.
const _complete: Exclude<RealtimeEventType, (typeof REALTIME_EVENT_TYPES)[number]> extends never ? true : never = true;
void _complete;
