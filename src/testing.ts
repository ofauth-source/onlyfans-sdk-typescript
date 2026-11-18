/* eslint-disable */
/**
 * Test helpers for webhook handlers: `@ofauth/onlyfans-sdk/testing`.
 *
 * Build realistic events, sign them like OFAuth does, and run them through your
 * {@link WebhookRouter} or HTTP handler.
 *
 * @example
 * ```ts
 * import { createTestEvent, generateWebhookSecret, signWebhook } from '@ofauth/onlyfans-sdk/testing'
 *
 * const secret = generateWebhookSecret()
 * const router = new WebhookRouter({ secret }).on('authorization.revoked', onRevoked)
 * const event = createTestEvent('authorization.revoked', { authorizationId: 'authz_1' })
 * await router.handle(...(await signWebhook(event, secret)))
 * ```
 *
 * @module
 */

import { computeWebhookSignature } from './webhooks';
import type { WebhookEvent, WebhookEventOf, WebhookEventType, WebhookRouter } from './webhooks';
import { WEBHOOK_EVENT_EXAMPLES } from './webhook-examples';

/** Recursively optional, for event overrides. Arrays are replaced, not merged. */
export type DeepPartial<T> = T extends readonly unknown[]
  ? T
  : T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;

export interface SignWebhookOptions {
  /** `webhook-id`. Defaults to a random `msg_...` id. */
  id?: string;
  /** Signing time. Defaults to now. */
  timestamp?: Date | number;
}

/**
 * A signed delivery: the raw body and the headers (`webhook-id`, `webhook-timestamp`,
 * `webhook-signature: v1,<signature>`, `content-type`). Spread it into
 * `router.handle(...signed)` or `verifyWebhook(...signed, secret)`.
 */
export type SignedWebhook = [body: string, headers: Record<string, string>];

function randomId(prefix: string): string {
  const bytes = new Uint8Array(12);
  globalThis.crypto.getRandomValues(bytes);
  return prefix + Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

/** A random `whsec_` signing secret for tests. */
export function generateWebhookSecret(): string {
  const bytes = new Uint8Array(24);
  globalThis.crypto.getRandomValues(bytes);
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return `whsec_${btoa(binary)}`;
}

/**
 * Sign a payload the way OFAuth signs deliveries (Standard Webhooks).
 * Objects are serialized with `JSON.stringify`.
 */
export async function signWebhook(
  payload: string | object,
  secret: string,
  options: SignWebhookOptions = {},
): Promise<SignedWebhook> {
  const body = typeof payload === 'string' ? payload : JSON.stringify(payload);
  const id = options.id ?? randomId('msg_');
  const time = options.timestamp ?? Date.now();
  const seconds = Math.floor((time instanceof Date ? time.getTime() : time) / 1000);
  const signature = await computeWebhookSignature(secret, id, seconds, body);
  const headers: Record<string, string> = {
    'content-type': 'application/json',
    'webhook-id': id,
    'webhook-timestamp': String(seconds),
    'webhook-signature': `v1,${signature}`,
  };
  return [body, headers];
}

/**
 * A signed `POST` `Request`, for fetch-style handlers such as `createFetchWebhookHandler`
 * or a Next.js route.
 */
export async function signWebhookRequest(
  payload: string | object,
  secret: string,
  options: SignWebhookOptions & { url?: string } = {},
): Promise<Request> {
  const [body, headers] = await signWebhook(payload, secret, options);
  return new Request(options.url ?? 'https://example.test/webhooks/ofauth', { method: 'POST', headers, body });
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function deepMerge<T>(base: T, overrides: unknown): T {
  if (!isPlainObject(base) || !isPlainObject(overrides)) return (overrides === undefined ? base : overrides) as T;
  const out: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(overrides)) {
    if (value !== undefined) out[key] = deepMerge(out[key], value);
  }
  return out as T;
}

/** Every event type with a fixture. */
export const TEST_EVENT_TYPES = Object.keys(WEBHOOK_EVENT_EXAMPLES) as WebhookEventType[];

/**
 * A valid event envelope of the given type, built from the API reference example for that
 * type, with a fresh `eventId`. `overrides` are deep-merged (arrays are replaced).
 */
export function createTestEvent<T extends WebhookEventType>(type: T, overrides?: DeepPartial<WebhookEventOf<T>>): WebhookEventOf<T> {
  const example = WEBHOOK_EVENT_EXAMPLES[type];
  if (!example) throw new Error(`Unknown webhook event type "${type}"`);
  const base = { ...structuredClone(example), eventId: randomId('evt_test_') };
  return deepMerge(base, overrides) as WebhookEventOf<T>;
}

/**
 * Create, sign, and dispatch a test event through a router in one call. Returns the event the
 * router handled.
 *
 * @example
 * ```ts
 * await sendTestWebhook(router, secret, 'linked_account.expired', { linkedAccountId: 'conn_1' })
 * ```
 */
export async function sendTestWebhook<T extends WebhookEventType>(
  router: Pick<WebhookRouter, 'handle'>,
  secret: string,
  type: T,
  overrides?: DeepPartial<WebhookEventOf<T>>,
): Promise<WebhookEvent> {
  return router.handle(...(await signWebhook(createTestEvent(type, overrides), secret)));
}
