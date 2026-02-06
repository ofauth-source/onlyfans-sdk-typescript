/* eslint-disable */
/**
 * OFAuth Webhook Verification & Routing
 * Svix-compatible HMAC-SHA256 signature verification
 */

import * as crypto from "node:crypto";

// ============================================================================
// Types
// ============================================================================

/** Svix webhook headers */
export interface WebhookHeaders {
  "svix-id": string;
  "svix-timestamp": string;
  "svix-signature": string;
}

/** Options for webhook verification */
export interface WebhookVerificationOptions {
  /** Webhook signing secret (with or without whsec_ prefix) */
  secret: string;
  /** Maximum allowed timestamp age in seconds (default: 300 = 5 minutes) */
  tolerance?: number;
}

/** User data from OnlyFans */
export interface WebhookUserData {
  userId: string;
  name: string;
  username: string;
  avatar: string;
}

/** Connection object in webhook events */
export interface WebhookConnection {
  id: string;
  platformUserId: string;
  status: "active" | "awaiting_2fa" | "expired";
  userData?: WebhookUserData;
  permissions?: string[];
}

/** Dynamic rules configuration */
export interface WebhookDynamicRules {
  static_param: string;
  format: string;
  start: string;
  end: string;
  prefix: string;
  suffix: string;
  checksum_constant: number;
  checksum_indexes: number[];
  app_token: string;
  revision: string;
}

/** Base webhook event */
export interface BaseWebhookEvent {
  eventType: string;
  live: boolean;
  data: Record<string, any>;
}

/** connection.created event */
export interface ConnectionCreatedEvent extends BaseWebhookEvent {
  eventType: "connection.created";
  data: {
    connection: WebhookConnection;
    clientReferenceId: string | null;
  };
}

/** connection.updated event */
export interface ConnectionUpdatedEvent extends BaseWebhookEvent {
  eventType: "connection.updated";
  data: {
    connection: WebhookConnection;
    clientReferenceId: string | null;
  };
}

/** connection.expired event */
export interface ConnectionExpiredEvent extends BaseWebhookEvent {
  eventType: "connection.expired";
  data: {
    connection: {
      id: string;
      platformUserId: string;
      status: "expired";
    };
    clientReferenceId: string | null;
  };
}

/** rules.updated event */
export interface RulesUpdatedEvent extends BaseWebhookEvent {
  eventType: "rules.updated";
  data: {
    rules: WebhookDynamicRules;
    revision: string;
  };
}

/** Union of all webhook event types */
export type WebhookEvent =
  | ConnectionCreatedEvent
  | ConnectionUpdatedEvent
  | ConnectionExpiredEvent
  | RulesUpdatedEvent;

/** String literal union of event type names */
export type WebhookEventType = WebhookEvent["eventType"];

/** Extract the data shape for a given event type */
export type WebhookEventData<T extends WebhookEventType> = Extract<
  WebhookEvent,
  { eventType: T }
>["data"];

/** Handler function for a specific event type */
export type WebhookHandler<T extends WebhookEventType = WebhookEventType> = (
  event: Extract<WebhookEvent, { eventType: T }>
) => Promise<void> | void;

/** Configuration for WebhookRouter */
export interface WebhookRouterConfig {
  secret: string;
  tolerance?: number;
  handlers?: Partial<Record<WebhookEventType, WebhookHandler>>;
  defaultHandler?: WebhookHandler;
  errorHandler?: (error: Error, event?: WebhookEvent) => void;
}

// ============================================================================
// Errors
// ============================================================================

/** Error thrown when webhook verification fails */
export class WebhookVerificationError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = "WebhookVerificationError";
  }
}

/** Type guard for WebhookVerificationError */
export function isWebhookVerificationError(
  error: unknown
): error is WebhookVerificationError {
  return error instanceof WebhookVerificationError;
}

// ============================================================================
// Verification
// ============================================================================

/**
 * Extract and validate Svix webhook headers from a request.
 * Accepts either a plain object or a `Headers` instance.
 */
export function extractWebhookHeaders(
  headers: Record<string, string> | Headers
): WebhookHeaders {
  const get = (name: string): string | null => {
    if (headers instanceof Headers) return headers.get(name);
    return headers[name] || headers[name.toLowerCase()] || null;
  };

  const svixId = get("svix-id");
  const svixTimestamp = get("svix-timestamp");
  const svixSignature = get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    throw new WebhookVerificationError(
      "Missing required webhook headers (svix-id, svix-timestamp, svix-signature)",
      "MISSING_HEADERS"
    );
  }

  return {
    "svix-id": svixId,
    "svix-timestamp": svixTimestamp,
    "svix-signature": svixSignature,
  };
}

/**
 * Verify a webhook signature using the Svix HMAC-SHA256 protocol.
 *
 * @returns true if the signature is valid
 * @throws WebhookVerificationError on failure
 */
export function verifyWebhookSignature(
  payload: string,
  headers: WebhookHeaders,
  options: WebhookVerificationOptions
): boolean {
  const { secret, tolerance = 300 } = options;

  // --- timestamp check ---
  const ts = parseInt(headers["svix-timestamp"], 10);
  if (isNaN(ts)) {
    throw new WebhookVerificationError("Invalid timestamp format", "INVALID_TIMESTAMP");
  }
  if (Math.abs(Math.floor(Date.now() / 1000) - ts) > tolerance) {
    throw new WebhookVerificationError("Webhook timestamp too old", "TIMESTAMP_TOO_OLD");
  }

  // --- compute expected signature ---
  const cleanSecret = secret.startsWith("whsec_") ? secret.slice(6) : secret;
  const key = Buffer.from(cleanSecret, "base64");
  const signed = `${headers["svix-id"]}.${headers["svix-timestamp"]}.${payload}`;
  const expected = crypto.createHmac("sha256", key).update(signed).digest("base64");

  // --- compare against provided signatures ---
  const sigs = headers["svix-signature"]
    .split(" ")
    .map((s) => {
      const [version, signature] = s.split(",");
      return { version, signature };
    })
    .filter((s) => s.version === "v1");

  if (sigs.length === 0) {
    throw new WebhookVerificationError("No valid v1 signatures found", "NO_VALID_SIGNATURES");
  }

  const isValid = sigs.some((s) => {
    try {
      return crypto.timingSafeEqual(
        Buffer.from(expected, "base64"),
        Buffer.from(s.signature, "base64")
      );
    } catch {
      return false;
    }
  });

  if (!isValid) {
    throw new WebhookVerificationError("Signature verification failed", "SIGNATURE_MISMATCH");
  }

  return true;
}

/**
 * Verify a webhook from a `Request` object (Cloudflare Workers, Deno, etc.).
 * Returns the parsed event payload.
 */
export async function verifyWebhookRequest<T = WebhookEvent>(
  request: Request,
  secret: string,
  tolerance?: number
): Promise<T> {
  const headers = extractWebhookHeaders(request.headers);
  const payload = await request.text();
  verifyWebhookSignature(payload, headers, { secret, tolerance });
  try {
    return JSON.parse(payload) as T;
  } catch {
    throw new WebhookVerificationError("Failed to parse webhook payload as JSON", "INVALID_JSON");
  }
}

/**
 * Verify a webhook from a raw payload + headers (Express.js, Node.js HTTP, etc.).
 * Returns the parsed event payload.
 */
export function verifyWebhookPayload<T = WebhookEvent>(
  payload: string | Buffer,
  headers: Record<string, string>,
  secret: string,
  tolerance?: number
): T {
  const payloadStr = typeof payload === "string" ? payload : payload.toString("utf8");
  const webhookHeaders = extractWebhookHeaders(headers);
  verifyWebhookSignature(payloadStr, webhookHeaders, { secret, tolerance });
  try {
    return JSON.parse(payloadStr) as T;
  } catch {
    throw new WebhookVerificationError("Failed to parse webhook payload as JSON", "INVALID_JSON");
  }
}

// ============================================================================
// Router
// ============================================================================

/**
 * Routes verified webhook events to registered handler functions.
 *
 * @example
 * ```ts
 * const router = createWebhookRouter({
 *   secret: "whsec_...",
 *   handlers: {
 *     "connection.created": async (event) => { ... },
 *   },
 * });
 * ```
 */
export class WebhookRouter {
  private handlers: Partial<Record<WebhookEventType, WebhookHandler>> = {};
  private defaultHandler?: WebhookHandler;
  private errorHandler?: (error: Error, event?: WebhookEvent) => void;
  private secret: string;
  private tolerance: number;

  constructor(config: WebhookRouterConfig) {
    this.secret = config.secret;
    this.tolerance = config.tolerance ?? 300;
    if (config.handlers) this.handlers = { ...config.handlers };
    this.defaultHandler = config.defaultHandler;
    this.errorHandler = config.errorHandler;
  }

  /** Register a handler for a specific event type */
  on<T extends WebhookEventType>(eventType: T, handler: WebhookHandler<T>): this {
    this.handlers[eventType] = handler as unknown as WebhookHandler;
    return this;
  }

  /** Register a default handler for unmatched event types */
  onDefault(handler: WebhookHandler): this {
    this.defaultHandler = handler;
    return this;
  }

  /** Register an error handler */
  onError(handler: (error: Error, event?: WebhookEvent) => void): this {
    this.errorHandler = handler;
    return this;
  }

  /** Handle a `Request` object (Cloudflare Workers, Deno, Bun, Node 18+) */
  async handleRequest(request: Request): Promise<void> {
    try {
      const event = await verifyWebhookRequest<WebhookEvent>(
        request,
        this.secret,
        this.tolerance
      );
      await this.processEvent(event);
    } catch (error) {
      if (this.errorHandler) this.errorHandler(error as Error);
      else throw error;
    }
  }

  /** Handle a raw payload + headers (Express.js, Fastify, etc.) */
  async handlePayload(
    payload: string | Buffer,
    headers: Record<string, string>
  ): Promise<void> {
    try {
      const event = verifyWebhookPayload<WebhookEvent>(
        payload,
        headers,
        this.secret,
        this.tolerance
      );
      await this.processEvent(event);
    } catch (error) {
      if (this.errorHandler) this.errorHandler(error as Error);
      else throw error;
    }
  }

  /** Update the webhook secret at runtime */
  updateSecret(secret: string): void {
    this.secret = secret;
  }

  /** Update the timestamp tolerance at runtime */
  updateTolerance(tolerance: number): void {
    this.tolerance = tolerance;
  }

  private async processEvent(event: WebhookEvent): Promise<void> {
    try {
      const handler = this.handlers[event.eventType] || this.defaultHandler;
      if (!handler) {
        console.warn(`No handler registered for webhook event type: ${event.eventType}`);
        return;
      }
      await handler(event);
    } catch (error) {
      if (this.errorHandler) this.errorHandler(error as Error, event);
      else throw error;
    }
  }
}

/** Create a new WebhookRouter */
export function createWebhookRouter(config: WebhookRouterConfig): WebhookRouter {
  return new WebhookRouter(config);
}

// ============================================================================
// Framework Helpers
// ============================================================================

/**
 * Create a fetch-style handler (Cloudflare Workers, Deno, Bun).
 * Returns a `Response` with appropriate status codes.
 */
export function createFetchWebhookHandler(
  router: WebhookRouter
): (request: Request) => Promise<Response> {
  return async (request: Request): Promise<Response> => {
    try {
      await router.handleRequest(request);
      return new Response("OK", { status: 200 });
    } catch (error) {
      if (isWebhookVerificationError(error)) {
        return new Response(
          JSON.stringify({ error: error.message, code: error.code }),
          { status: 401, headers: { "Content-Type": "application/json" } }
        );
      }
      console.error("Webhook processing error:", error);
      return new Response("Internal server error", { status: 500 });
    }
  };
}

/**
 * Create an Express.js middleware for webhook handling.
 * Expects `express.raw({ type: "application/json" })` to be applied first.
 */
export function createExpressWebhookMiddleware(router: WebhookRouter): (req: any, res: any, next: any) => Promise<void> {
  return async (req: any, res: any, next: any) => {
    try {
      await router.handlePayload(req.body, req.headers);
      res.status(200).send("OK");
    } catch (error) {
      if (isWebhookVerificationError(error)) {
        res.status(401).json({ error: error.message, code: error.code });
      } else {
        res.status(500).json({ error: "Internal server error" });
        next(error);
      }
    }
  };
}
