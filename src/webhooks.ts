/* eslint-disable */
/**
 * OFAuth webhook verification and routing.
 *
 * Deliveries follow Standard Webhooks (https://www.standardwebhooks.com): the
 * `webhook-id`, `webhook-timestamp`, and `webhook-signature` headers, with an
 * HMAC-SHA256 signature over `${id}.${timestamp}.${body}` keyed by the
 * destination's `whsec_` secret. `svix-*` headers are accepted too.
 */

import { OFAuthError } from './runtime';
import type { LifecycleWebhookEventEnvelope, RealtimeWebhookEventEnvelope } from './models';

/** Every event a destination can receive: lifecycle and Realtime. */
export type WebhookEvent = RealtimeWebhookEventEnvelope;
/** `authorization.*` and `linked_account.*` events. */
export type LifecycleWebhookEvent = LifecycleWebhookEventEnvelope;
/** `realtime.*` events. */
export type RealtimeWebhookEvent = Exclude<WebhookEvent, LifecycleWebhookEvent>;
export type WebhookEventType = WebhookEvent['type'];
/** The event for one type, e.g. `WebhookEventOf<'authorization.revoked'>`. */
export type WebhookEventOf<T extends WebhookEventType> = Extract<WebhookEvent, { type: T }>;

export interface WebhookHeaders {
  id: string;
  timestamp: string;
  signature: string;
}

export interface WebhookVerificationOptions {
  /** Maximum age of the delivery in seconds. Defaults to 300. */
  tolerance?: number;
}

export type WebhookVerificationErrorCode =
  | 'MISSING_HEADERS'
  | 'INVALID_TIMESTAMP'
  | 'TIMESTAMP_OUT_OF_TOLERANCE'
  | 'NO_VALID_SIGNATURES'
  | 'SIGNATURE_MISMATCH'
  | 'INVALID_JSON';

/** The delivery failed verification. Respond with 400 or 401 and do not process it. */
export class WebhookVerificationError extends OFAuthError {
  readonly code: WebhookVerificationErrorCode;

  constructor(message: string, code: WebhookVerificationErrorCode) {
    super(message);
    this.name = 'WebhookVerificationError';
    this.code = code;
  }
}

export function isWebhookVerificationError(error: unknown): error is WebhookVerificationError {
  return error instanceof WebhookVerificationError;
}

type HeaderInput = Headers | Record<string, string | string[] | undefined>;

function headerValue(headers: HeaderInput, name: string): string | undefined {
  if (typeof (headers as Headers).get === 'function') return (headers as Headers).get(name) ?? undefined;
  const record = headers as Record<string, string | string[] | undefined>;
  const key = Object.keys(record).find((k) => k.toLowerCase() === name);
  const value = key === undefined ? undefined : record[key];
  return Array.isArray(value) ? value[0] : value;
}

/** Read the signature headers from a `Headers` object or a Node-style header record. */
export function extractWebhookHeaders(headers: HeaderInput): WebhookHeaders {
  const id = headerValue(headers, 'webhook-id') ?? headerValue(headers, 'svix-id');
  const timestamp = headerValue(headers, 'webhook-timestamp') ?? headerValue(headers, 'svix-timestamp');
  const signature = headerValue(headers, 'webhook-signature') ?? headerValue(headers, 'svix-signature');
  if (!id || !timestamp || !signature) {
    throw new WebhookVerificationError(
      'Missing webhook-id, webhook-timestamp, or webhook-signature header',
      'MISSING_HEADERS',
    );
  }
  return { id, timestamp, signature };
}

function base64ToBytes(value: string): Uint8Array {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function toText(payload: string | Uint8Array): string {
  return typeof payload === 'string' ? payload : new TextDecoder().decode(payload);
}

/**
 * The base64 HMAC-SHA256 signature of `${id}.${timestamp}.${payload}` (without the `v1,` prefix).
 * Use `signWebhook` from `@ofauth/onlyfans-sdk/testing` to build complete test deliveries.
 */
export async function computeWebhookSignature(
  secret: string,
  id: string,
  timestamp: string | number,
  payload: string | Uint8Array,
): Promise<string> {
  const key = await globalThis.crypto.subtle.importKey(
    'raw',
    base64ToBytes(secret.startsWith('whsec_') ? secret.slice(6) : secret) as BufferSource,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signed = new TextEncoder().encode(`${id}.${timestamp}.${toText(payload)}`);
  return bytesToBase64(new Uint8Array(await globalThis.crypto.subtle.sign('HMAC', key, signed)));
}

/**
 * Verify a delivery's signature against the raw request body.
 * Resolves to true, or throws {@link WebhookVerificationError}.
 */
export async function verifyWebhookSignature(
  payload: string | Uint8Array,
  headers: WebhookHeaders,
  secret: string,
  options: WebhookVerificationOptions = {},
): Promise<true> {
  const tolerance = options.tolerance ?? 300;
  const timestamp = Number(headers.timestamp);
  if (!Number.isInteger(timestamp)) {
    throw new WebhookVerificationError('Invalid webhook-timestamp', 'INVALID_TIMESTAMP');
  }
  if (Math.abs(Math.floor(Date.now() / 1000) - timestamp) > tolerance) {
    throw new WebhookVerificationError('Webhook timestamp is outside the tolerance', 'TIMESTAMP_OUT_OF_TOLERANCE');
  }

  const signatures = headers.signature
    .split(' ')
    .map((entry) => entry.split(','))
    .filter(([version, value]) => version === 'v1' && value)
    .map(([, value]) => value);
  if (signatures.length === 0) {
    throw new WebhookVerificationError('No v1 signature in webhook-signature', 'NO_VALID_SIGNATURES');
  }

  const expected = await computeWebhookSignature(secret, headers.id, headers.timestamp, payload);

  if (!signatures.some((signature) => timingSafeEqual(signature, expected))) {
    throw new WebhookVerificationError('Webhook signature does not match', 'SIGNATURE_MISMATCH');
  }
  return true;
}

/**
 * Verify a delivery and parse its event. Pass the raw body exactly as received.
 *
 * @example
 * ```ts
 * // Express: app.post('/webhooks/ofauth', express.raw({ type: 'application/json' }), ...)
 * const event = await verifyWebhook(req.body, req.headers, process.env.OFAUTH_WEBHOOK_SECRET!)
 * ```
 */
export async function verifyWebhook<T = WebhookEvent>(
  payload: string | Uint8Array,
  headers: HeaderInput,
  secret: string,
  options?: WebhookVerificationOptions,
): Promise<T> {
  await verifyWebhookSignature(payload, extractWebhookHeaders(headers), secret, options);
  try {
    return JSON.parse(toText(payload)) as T;
  } catch {
    throw new WebhookVerificationError('Webhook body is not valid JSON', 'INVALID_JSON');
  }
}

/** Verify a `Request` (Workers, Deno, Bun, Next.js route handlers) and parse its event. */
export async function verifyWebhookRequest<T = WebhookEvent>(
  request: Request,
  secret: string,
  options?: WebhookVerificationOptions,
): Promise<T> {
  return verifyWebhook<T>(await request.text(), request.headers, secret, options);
}

// ============================================================================
// Router
// ============================================================================

export type WebhookHandler<T extends WebhookEvent = WebhookEvent> = (event: T) => void | Promise<void>;

export interface WebhookRouterConfig {
  /** The destination's `whsec_` signing secret. */
  secret: string;
  tolerance?: number;
  /** Called for events without a specific handler. */
  defaultHandler?: WebhookHandler;
}

/**
 * Verifies deliveries and dispatches them by `type`.
 *
 * Deduplicate on `eventId`, and apply events per `linkedAccountId` in `order`:
 * retried deliveries can arrive out of order.
 *
 * @example
 * ```ts
 * const router = new WebhookRouter({ secret: process.env.OFAUTH_WEBHOOK_SECRET! })
 *   .on('authorization.revoked', async (event) => deleteTokens(event.authorizationId))
 *   .on('realtime.chat_message.received', async (event) => handleMessage(event.data))
 * export default { fetch: createFetchWebhookHandler(router) }
 * ```
 */
export class WebhookRouter {
  private readonly handlers = new Map<string, WebhookHandler<any>>();
  private secret: string;
  private readonly tolerance?: number;
  private defaultHandler?: WebhookHandler;

  constructor(config: WebhookRouterConfig) {
    this.secret = config.secret;
    this.tolerance = config.tolerance;
    this.defaultHandler = config.defaultHandler;
  }

  /** Handle one event type. */
  on<T extends WebhookEventType>(type: T, handler: WebhookHandler<WebhookEventOf<T>>): this {
    this.handlers.set(type, handler);
    return this;
  }

  /** Handle events without a specific handler. */
  onDefault(handler: WebhookHandler): this {
    this.defaultHandler = handler;
    return this;
  }

  /** Rotate the signing secret. */
  setSecret(secret: string): void {
    this.secret = secret;
  }

  /** Verify and dispatch a raw delivery. Returns the event. */
  async handle(payload: string | Uint8Array, headers: HeaderInput): Promise<WebhookEvent> {
    const event = await verifyWebhook<WebhookEvent>(payload, headers, this.secret, { tolerance: this.tolerance });
    await this.dispatch(event);
    return event;
  }

  /** Verify and dispatch a `Request`. Returns the event. */
  async handleRequest(request: Request): Promise<WebhookEvent> {
    return this.handle(await request.text(), request.headers);
  }

  /** Dispatch an already verified event. */
  async dispatch(event: WebhookEvent): Promise<void> {
    const handler = this.handlers.get(event.type) ?? this.defaultHandler;
    if (handler) await handler(event);
  }
}

/** A fetch-style handler: 200 on success, 401 on failed verification, 500 when a handler throws. */
export function createFetchWebhookHandler(router: WebhookRouter): (request: Request) => Promise<Response> {
  return async (request) => {
    try {
      await router.handleRequest(request);
      return new Response(null, { status: 200 });
    } catch (error) {
      if (isWebhookVerificationError(error)) {
        return Response.json({ error: error.code }, { status: 401 });
      }
      return Response.json({ error: 'handler_failed' }, { status: 500 });
    }
  };
}

/** Express middleware. Mount it after `express.raw({ type: 'application/json' })`. */
export function createExpressWebhookMiddleware(router: WebhookRouter) {
  return async (req: any, res: any, next: (error?: unknown) => void): Promise<void> => {
    try {
      await router.handle(req.body, req.headers);
      res.status(200).end();
    } catch (error) {
      if (isWebhookVerificationError(error)) {
        res.status(401).json({ error: error.code });
      } else {
        next(error);
      }
    }
  };
}
