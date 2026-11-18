/* eslint-disable */
/**
 * OFAuth V3 runtime: configuration, authentication, requests, retries, errors, pagination.
 */

export const DEFAULT_API_URL = 'https://api.ofauth.com';
export const LINKED_ACCOUNT_HEADER = 'x-linked-account-id';
/** Retries after the first attempt, unless configured. */
export const DEFAULT_MAX_RETRIES = 2;
/** Per-attempt timeout in milliseconds, unless configured. */
export const DEFAULT_TIMEOUT_MS = 60_000;
/** Longest server-requested wait (`Retry-After`) the client sleeps through before retrying. */
export const DEFAULT_MAX_RETRY_DELAY_MS = 60_000;

/** Options passed to an access token provider. */
export interface AccessTokenRequest {
  /**
   * True when the API rejected the previous token (`invalid_token`). Providers
   * should replace the rejected token, or reuse a newer valid token already acquired.
   */
  forceRefresh: boolean;
  /** The actual token rejected by this HTTP attempt; a newer cached token can be reused. */
  rejectedAccessToken?: string;
}

/** An object that hands out access tokens, owned by the caller's auth system. */
export interface AccessTokenProvider {
  getAccessToken(request?: AccessTokenRequest): string | Promise<string>;
}

/**
 * Where the client gets its bearer access token from:
 * - a token string (you refresh it yourself),
 * - a function, called before every request,
 * - a provider object owned by the caller's auth system.
 *
 * With a function or provider, a request rejected with `invalid_token` is
 * retried once with `forceRefresh: true`.
 */
export type AccessTokenSource =
  | string
  | ((request: AccessTokenRequest) => string | Promise<string>)
  | AccessTokenProvider;

/** Passed to {@link ClientOptions.onRequest} before each attempt. */
export interface RequestHookInfo {
  method: HttpMethod;
  /** Request URL without credentials: sensitive query values (signatures, tokens, keys) read `REDACTED`. */
  url: string;
  /**
   * Request headers, with lowercase names. Sensitive values (`authorization`, `cookie`, `x-api-key`,
   * `cf-access-client-secret`, and any name containing `token`, `secret`, or `password`) read `[redacted]`.
   */
  headers: Record<string, string>;
  /** 1 for the first attempt, then 2, 3, ... for retries and the `invalid_token` refresh. */
  attempt: number;
  /** Canonical operation name, e.g. `access.chats.messages.send`, when known. */
  operation?: string;
}

/** Passed to {@link ClientOptions.onResponse} after each attempt. */
export interface ResponseHookInfo {
  method: HttpMethod;
  /** Request URL without credentials, as in {@link RequestHookInfo.url}. */
  url: string;
  /** HTTP status, or undefined when no response arrived (network error, timeout, abort). */
  status?: number;
  requestId?: string;
  /** Milliseconds from sending the request to reading the response body. */
  durationMs: number;
  attempt: number;
  operation?: string;
  /** The network error or timeout, when no response arrived. */
  error?: unknown;
}

/** Receives one debug line at a time. Lines never contain tokens, secrets, or bodies. */
export type DebugLogger = (line: string) => void;

/** Transport options shared by {@link OFAuthClient} and the {@link OFAuth} facade. */
export interface ClientOptions {
  /** API origin. Defaults to `https://api.ofauth.com`. */
  baseUrl?: string;
  /**
   * Custom fetch implementation. Defaults to the global `fetch`. Only network failures
   * (a `TypeError`, or an error with a socket code such as `ECONNRESET`) are wrapped in
   * {@link OFAuthConnectionError} and retried; anything else it throws is rethrown unchanged.
   */
  fetch?: typeof fetch;
  /**
   * Extra headers sent with every request. Names are case-insensitive (an `Accept` here replaces the
   * default `accept`); `content-type` and `x-linked-account-id` set by the SDK win. `authorization` is not
   * allowed: the SDK sends the bearer token from `accessToken`.
   */
  headers?: Record<string, string>;
  /**
   * How many times to retry a failed request. Defaults to 2; `0` disables retries.
   *
   * Retried: 429 (any method), 503 `authorization_temporarily_unavailable` (any method),
   * other 502/503/504 and network errors or timeouts (GET, PUT, DELETE only).
   */
  maxRetries?: number;
  /** Per-attempt timeout in milliseconds. Defaults to 60 000. Upload part PUTs use at least 300 000. */
  timeout?: number;
  /**
   * Longest server-requested delay (`Retry-After` / `RateLimit-Reset`) to wait out, in
   * milliseconds. Longer delays (e.g. `quota_exhausted`) throw instead. Defaults to 60 000.
   */
  maxRetryDelay?: number;
  /** Called before each attempt. Errors thrown here are ignored. */
  onRequest?: (info: RequestHookInfo) => void;
  /** Called after each attempt. Errors thrown here are ignored. */
  onResponse?: (info: ResponseHookInfo) => void;
  /**
   * Log one line per attempt and each retry, e.g. `[ofauth] GET /v3/access/profile -> 200 (123ms, req_abc)`.
   * `true` logs with `console.debug`; pass a function to use your logger. Also enabled by `OFAUTH_DEBUG=1`.
   */
  debug?: boolean | DebugLogger;
}

export interface OFAuthConfig extends ClientOptions {
  /** Bearer access token for one authorization, from `POST /v3/link/token`. */
  accessToken: AccessTokenSource;
  /**
   * Default linked account for Access and Vault+ operations, sent as
   * `x-linked-account-id`. Each call can override it with `linkedAccountId`.
   */
  linkedAccountId?: string;
  /**
   * Allow this client in a browser (a page with `window` and `document`, or a web worker).
   * Defaults to false: in a browser the client throws, because anyone who can open the page can
   * read the access token. Call OFAuth from your server instead, and for Realtime in the browser,
   * use a stream URL from your server (`client.realtime.createStreamUrl()` with `connectRealtimeStream`). Server runtimes (Node, Bun, Deno, Cloudflare Workers,
   * Vercel Edge, Next.js server code) never need this.
   */
  dangerouslyAllowBrowser?: boolean;
}

/** Per-call options accepted by every operation. */
export interface RequestOptions {
  /** Abort the request. An aborted request is never retried. */
  signal?: AbortSignal;
  /** Extra headers for this request. Same rules as {@link ClientOptions.headers}. */
  headers?: Record<string, string>;
  /** Override the client's `maxRetries` for this call. */
  maxRetries?: number;
  /** Override the client's per-attempt `timeout` (milliseconds) for this call. */
  timeout?: number;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface RequestConfig extends RequestOptions {
  method: HttpMethod;
  path: string;
  query?: Record<string, unknown>;
  /** JSON body. */
  body?: unknown;
  /** Raw body sent as-is (uploads). */
  rawBody?: BodyInit;
  contentType?: string;
  /** Linked account for this call. Falls back to the client default. */
  linkedAccountId?: string;
  /** Whether the operation requires `x-linked-account-id`. */
  linkedAccount?: boolean;
  /**
   * Absolute URL to call instead of `baseUrl + path`. Must be on the `baseUrl` origin:
   * any other origin throws {@link OFAuthError} before the request is sent.
   */
  url?: string;
  /** Canonical operation name, copied to errors. */
  operation?: string;
  /** OAuth scope the operation needs, copied to errors. */
  requiredScope?: string;
}

// ============================================================================
// Errors
// ============================================================================

/** Every documented `recovery.action`. */
export const RECOVERY_ACTIONS = [
  'obtain_external_oauth_token',
  'restart_authorization',
  'reconnect_linked_account',
  'select_linked_account',
  'grant_linked_account',
  'list_linked_accounts',
  'request_additional_consent',
  'enable_linked_account_vault_plus',
  'enable_vault_plus',
  'retry_after_reset',
  'retry',
  'complete_integration_approval',
  'update_developer_plan',
  'contact_integration_owner',
  'do_not_repeat',
  'check_request',
  'check_resource',
  'correct_request',
  'restart_upload',
] as const;

export type KnownRecoveryAction = (typeof RECOVERY_ACTIONS)[number];

/** What to do after an error. Unknown future actions are kept as plain strings. */
export type RecoveryAction = KnownRecoveryAction | (string & {});

const REAUTHORIZATION_ACTIONS: ReadonlySet<string> = new Set([
  'restart_authorization',
  'request_additional_consent',
  'grant_linked_account',
]);
const INTEGRATION_ACTIONS: ReadonlySet<string> = new Set([
  'complete_integration_approval',
  'update_developer_plan',
  'contact_integration_owner',
  'enable_vault_plus',
]);

/** Base class for every error thrown by the SDK. */
export class OFAuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OFAuthError';
  }
}

/** Request context attached to API and connection errors. */
export interface RequestErrorDetails {
  /** Canonical operation name, e.g. `access.chats.messages.send`. */
  operation?: string;
  /** OAuth scope the operation needs, e.g. `messages:write`. */
  requiredScope?: string;
  /** How many HTTP attempts were made, including retries. */
  attempts?: number;
}

/** One failed check from a request validation error (`RequestValidationError`). */
export interface ValidationIssue {
  /** Validator code, e.g. `too_big`. */
  code: string;
  /** Location of the bad value, e.g. `['limit']` or `['body', 'items', 0]`. */
  path: (string | number)[];
  /** Human-readable message. */
  message: string;
}

interface ParsedErrorBody {
  code: string;
  message?: string;
  recoveryAction?: string;
  issues?: ValidationIssue[];
  errorType?: string;
}

/**
 * Normalize the three documented error shapes:
 * `RuntimeError` (`error` code + `recovery`), `RequestValidationError` (`error: { name, issues }`),
 * and `AccessHandlerError` (`error` message + `type` class).
 */
function parseErrorBody(status: number, obj: Record<string, any>): ParsedErrorBody {
  const recovery = isRecord(obj.recovery) ? obj.recovery : undefined;
  const recoveryAction = typeof recovery?.action === 'string' ? recovery.action : undefined;
  const message = typeof obj.message === 'string' ? obj.message : undefined;
  if (isRecord(obj.error) && typeof obj.error.name === 'string' && Array.isArray(obj.error.issues)) {
    const issues: ValidationIssue[] = obj.error.issues.filter(isRecord).map((issue) => ({
      code: typeof issue.code === 'string' ? issue.code : '',
      path: Array.isArray(issue.path)
        ? issue.path.filter((p: unknown): p is string | number => typeof p === 'string' || typeof p === 'number')
        : [],
      message: typeof issue.message === 'string' ? issue.message : '',
    }));
    const summary = issues
      .map((issue) => (issue.path.length ? `${issue.path.join('.')}: ${issue.message}` : issue.message))
      .join('; ');
    return {
      code: 'invalid_request',
      message: summary || message,
      recoveryAction: recoveryAction ?? 'check_request',
      issues,
    };
  }
  if (typeof obj.error === 'string' && typeof obj.type === 'string' && !recovery) {
    return { code: obj.type.toLowerCase(), message: obj.error, errorType: obj.type };
  }
  if (typeof obj.error === 'string') return { code: obj.error, message, recoveryAction };
  return { code: `http_${status}`, message, recoveryAction };
}

/**
 * An error response from `/v3/access`, `/v3/vault-plus`, or `/v3/linked-accounts`.
 *
 * Branch on {@link recoveryAction} (or the `needs*` / `is*` shortcuts), not on the HTTP status alone.
 * Validation failures have code `invalid_request` and list {@link issues}; handler errors
 * (`{ error, type }` bodies) use the lower-cased `type` as {@link code} and keep it in {@link errorType}.
 */
export class OFAuthAPIError extends OFAuthError {
  /** HTTP status. */
  readonly status: number;
  /** Stable machine-readable code, e.g. `linked_account_reconnect_required`, `invalid_request`, or `resource_not_found`. */
  readonly code: string;
  /** Validation issues when the request failed validation (code `invalid_request`); otherwise undefined. */
  readonly issues?: readonly ValidationIssue[];
  /** Raw error class from handler errors (`{ error, type }` bodies), e.g. `RESOURCE_NOT_FOUND`. */
  readonly errorType?: string;
  /** What to do next, e.g. `reconnect_linked_account`. See the V3 errors reference. */
  readonly recoveryAction?: RecoveryAction;
  /** Request id, also sent as `x-request-id`. Quote it in support requests. */
  readonly requestId?: string;
  /** Seconds to wait before retrying, from `Retry-After` (or `RateLimit-Reset`). */
  readonly retryAfter?: number;
  /** Parsed response body. */
  readonly body: unknown;
  readonly headers: Headers;
  /** Canonical name of the operation that failed, e.g. `access.chats.messages.send`. */
  readonly operation?: string;
  /** The OAuth scope that operation needs, e.g. `messages:write`. Undefined for unscoped operations. */
  readonly requiredScope?: string;
  /** HTTP attempts made, including retries. */
  readonly attempts: number;

  constructor(status: number, body: unknown, headers: Headers, details: RequestErrorDetails = {}) {
    const obj = isRecord(body) ? body : {};
    const parsed = parseErrorBody(status, obj);
    const code = parsed.code;
    const message = parsed.message && parsed.message !== code ? `${code}: ${parsed.message}` : code;
    super(details.operation ? `${message} (${details.operation})` : message);
    this.name = 'OFAuthAPIError';
    this.status = status;
    this.code = code;
    this.recoveryAction = parsed.recoveryAction;
    this.issues = parsed.issues;
    this.errorType = parsed.errorType;
    this.requestId =
      (typeof obj.requestId === 'string' ? obj.requestId : undefined) ?? headers.get('x-request-id') ?? undefined;
    this.retryAfter = serverRetryDelaySeconds(headers);
    this.body = body;
    this.headers = headers;
    this.operation = details.operation;
    this.requiredScope = details.requiredScope;
    this.attempts = details.attempts ?? 1;
  }

  /** Worth retrying later: action `retry` / `retry_after_reset`, or status 429, 502, 503, 504. */
  get isRetryable(): boolean {
    return (
      this.recoveryAction === 'retry' ||
      this.recoveryAction === 'retry_after_reset' ||
      [429, 502, 503, 504].includes(this.status)
    );
  }

  /** The access token is invalid or expired: refresh it through your auth system. */
  get needsTokenRefresh(): boolean {
    return this.recoveryAction === 'obtain_external_oauth_token';
  }

  /** Send the user through authorization again (new consent, scopes, or accounts). */
  get needsReauthorization(): boolean {
    return this.recoveryAction !== undefined && REAUTHORIZATION_ACTIONS.has(this.recoveryAction);
  }

  /** The account owner must reconnect the linked account in OFAuth. */
  get needsReconnect(): boolean {
    return this.recoveryAction === 'reconnect_linked_account';
  }

  /** A problem with your integration (approval, plan, Vault+), not with the user. */
  get isIntegrationProblem(): boolean {
    return this.recoveryAction !== undefined && INTEGRATION_ACTIONS.has(this.recoveryAction);
  }
}

/** No response arrived: a network failure. `cause` holds the underlying error. */
export class OFAuthConnectionError extends OFAuthError {
  readonly cause: unknown;
  readonly operation?: string;
  readonly requiredScope?: string;
  /** HTTP attempts made, including retries. */
  readonly attempts: number;

  constructor(message: string, cause: unknown, details: RequestErrorDetails = {}) {
    super(message);
    this.name = 'OFAuthConnectionError';
    this.cause = cause;
    this.operation = details.operation;
    this.requiredScope = details.requiredScope;
    this.attempts = details.attempts ?? 1;
  }
}

/** An attempt took longer than the configured `timeout`. */
export class OFAuthTimeoutError extends OFAuthConnectionError {
  /** The per-attempt timeout in milliseconds. */
  readonly timeout: number;

  constructor(timeout: number, details: RequestErrorDetails = {}) {
    super(`Request timed out after ${timeout}ms`, undefined, details);
    this.name = 'OFAuthTimeoutError';
    this.timeout = timeout;
  }
}

/** True for errors with the given code or recovery action. */
export function isOFAuthAPIError(error: unknown, code?: string): error is OFAuthAPIError {
  return error instanceof OFAuthAPIError && (code === undefined || error.code === code || error.recoveryAction === code);
}

export function isRecord(value: unknown): value is Record<string, any> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** `Retry-After` (seconds or HTTP date), else `RateLimit-Reset` (seconds), in seconds. */
export function serverRetryDelaySeconds(headers: Headers): number | undefined {
  const retryAfter = headers.get('retry-after');
  if (retryAfter) {
    const seconds = Number(retryAfter);
    if (Number.isFinite(seconds)) return Math.max(0, seconds);
    const date = Date.parse(retryAfter);
    if (!Number.isNaN(date)) return Math.max(0, Math.ceil((date - Date.now()) / 1000));
  }
  const reset = headers.get('ratelimit-reset');
  if (reset) {
    const seconds = Number(reset);
    if (Number.isFinite(seconds)) return Math.max(0, seconds);
  }
  return undefined;
}

function isJsonContentType(contentType: string | null): boolean {
  if (!contentType) return false;
  const lower = contentType.toLowerCase();
  return lower.includes('application/json') || lower.includes('+json');
}

export function buildQueryString(params: Record<string, unknown>): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;
    if (Array.isArray(value)) {
      for (const v of value) search.append(key, String(v));
    } else {
      search.append(key, String(value));
    }
  }
  const qs = search.toString();
  return qs ? `?${qs}` : '';
}

function parseBody(response: Response, text: string): unknown {
  if (response.status === 204 || text === '') return undefined;
  if (isJsonContentType(response.headers.get('content-type'))) return JSON.parse(text);
  return text;
}

export async function readBody(response: Response): Promise<unknown> {
  if (response.status === 204) return undefined;
  return parseBody(response, await response.text());
}

export async function resolveAccessToken(source: AccessTokenSource, forceRefresh: boolean, rejectedAccessToken?: string): Promise<string> {
  if (typeof source === 'string') return source;
  const request = { forceRefresh, ...(rejectedAccessToken === undefined ? {} : { rejectedAccessToken }) };
  if (typeof source === 'function') return source(request);
  return source.getAccessToken(request);
}

// ============================================================================
// Retries, hooks, debug logging
// ============================================================================

// Provider writes are never replayed after an ambiguous transport failure.
const IDEMPOTENT_METHODS: ReadonlySet<HttpMethod> = new Set(['GET']);

/** Retry delay in ms for an error response, or undefined when it must not be retried. */
function retryDelayFor(error: OFAuthAPIError, idempotent: boolean, retry: number, maxRetryDelay: number): number | undefined {
  const retryable =
    error.status === 429 ||
    (error.status === 503 && error.code === 'authorization_temporarily_unavailable') ||
    ([502, 503, 504].includes(error.status) && idempotent);
  if (!retryable) return undefined;
  if (error.retryAfter !== undefined) {
    const delay = error.retryAfter * 1000;
    return delay > maxRetryDelay ? undefined : delay;
  }
  return backoff(retry);
}

/** Exponential backoff with full jitter: random in [0, min(8s, 0.5s * 2^retry)). */
function backoff(retry: number): number {
  return Math.random() * Math.min(8000, 500 * 2 ** retry);
}

function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) return reject(signal.reason);
    const onAbort = () => {
      clearTimeout(timer);
      reject(signal!.reason);
    };
    const timer = setTimeout(() => {
      signal?.removeEventListener('abort', onAbort);
      resolve();
    }, ms);
    signal?.addEventListener('abort', onAbort, { once: true });
  });
}

/** Run a user hook without letting it break the request. @internal */
export function callHook<T>(hook: ((info: T) => unknown) | undefined, info: T): void {
  if (!hook) return;
  try {
    const result = hook(info);
    if (result && typeof (result as Promise<unknown>).catch === 'function') (result as Promise<unknown>).catch(() => {});
  } catch {
    // Hooks must not break requests.
  }
}

/** The logger for `debug`, or undefined when debug logging is off. */
export function debugLogger(debug: ClientOptions['debug']): DebugLogger | undefined {
  if (typeof debug === 'function') return debug;
  if (debug === false) return undefined;
  const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env;
  if (debug === true || env?.OFAUTH_DEBUG === '1' || env?.OFAUTH_DEBUG === 'true') {
    return (line) => console.debug(line);
  }
  return undefined;
}

const SENSITIVE_HEADERS: ReadonlySet<string> = new Set([
  'authorization',
  'proxy-authorization',
  'cookie',
  'set-cookie',
  'x-api-key',
  'api-key',
  'cf-access-client-secret',
]);

/** True for header names whose values are credentials. @internal */
export function isSensitiveHeader(name: string): boolean {
  const lower = name.toLowerCase();
  return SENSITIVE_HEADERS.has(lower) || /token|secret|password/.test(lower);
}

/** A copy of `headers` with lowercase names and credential values replaced by `[redacted]`. @internal */
export function redactHeaders(headers: Record<string, string>): Record<string, string> {
  const copy: Record<string, string> = {};
  for (const [name, value] of Object.entries(headers)) {
    const lower = name.toLowerCase();
    copy[lower] = isSensitiveHeader(lower) ? '[redacted]' : value;
  }
  return copy;
}

/**
 * Merge header maps case-insensitively (names are lowercased; later maps win), so a caller's
 * `Content-Type` cannot sit next to the SDK's `content-type`. @internal
 */
export function mergeHeaders(...maps: (Record<string, string> | undefined)[]): Record<string, string> {
  const merged: Record<string, string> = {};
  for (const map of maps) {
    for (const [name, value] of Object.entries(map ?? {})) merged[name.toLowerCase()] = value;
  }
  return merged;
}

/** Throw when caller headers set `authorization`: the SDK owns it and always sends the access token. @internal */
export function rejectCallerAuthorization(...maps: (Record<string, string> | undefined)[]): void {
  for (const map of maps) {
    for (const name of Object.keys(map ?? {})) {
      if (name.toLowerCase() === 'authorization') {
        throw new OFAuthError(
          `Do not set the ${name} header in headers: the SDK sends "Bearer <access token>" itself. ` +
            'Pass the token (or a token function or provider) as accessToken instead.',
        );
      }
    }
  }
}

/**
 * True in a browser page (`window` and `document`) or a web worker (`self` and `importScripts`).
 * False in Node, Bun, Deno, Cloudflare Workers, Vercel Edge, and Next.js server code. @internal
 */
export function isBrowserEnvironment(): boolean {
  const g = globalThis as { window?: unknown; document?: unknown; self?: unknown; importScripts?: unknown };
  if (typeof g.window !== 'undefined' && typeof g.document !== 'undefined') return true;
  return typeof g.self !== 'undefined' && typeof g.importScripts === 'function';
}

/** Error message for an access token in a browser. @internal */
export const BROWSER_ACCESS_TOKEN_MESSAGE =
  'OFAuth access tokens must not be used in a browser: anyone who can open the page can read the token and act as the ' +
  'linked account. Call OFAuth from your server and send your frontend only the data it needs. For Realtime in the ' +
  'browser, create a stream URL on your server (client.realtime.createStreamUrl()) and open it with connectRealtimeStream ' +
  'from @ofauth/onlyfans-sdk/realtime-browser instead of using an access token. If you understand the risk, pass ' +
  '`dangerouslyAllowBrowser: true`.';

/**
 * Throw when a config holding an access token (string, function, or provider) is used in a browser,
 * unless `dangerouslyAllowBrowser` is set. @internal
 */
export function rejectBrowserAccessToken(config: Pick<OFAuthConfig, 'accessToken' | 'dangerouslyAllowBrowser'>): void {
  if (config.dangerouslyAllowBrowser === true || config.accessToken == null) return;
  if (isBrowserEnvironment()) throw new OFAuthError(BROWSER_ACCESS_TOKEN_MESSAGE);
}

const SENSITIVE_QUERY_KEY =/token|secret|sig|key|password|credential|auth|session/;

/** True for query parameter names whose values may be credentials, e.g. `X-Amz-Signature` or `token`. @internal */
export function isSensitiveQueryKey(name: string): boolean {
  const lower = name.toLowerCase();
  return lower.startsWith('x-amz-') || lower.startsWith('x-goog-') || SENSITIVE_QUERY_KEY.test(lower);
}

/**
 * `url` for hooks, logs, and errors: no user info or fragment, and the values of sensitive-looking
 * query parameters (signatures, tokens, keys, `X-Amz-*`) replaced by `REDACTED`. Other parameters
 * (`limit`, `cursor`, `linkedAccountId`, ...) are kept so hooks stay useful for debugging. @internal
 */
export function sanitizeUrl(url: string): string {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return url.split(/[?#]/)[0];
  }
  const query = parsed.search
    .slice(1)
    .split('&')
    .filter(Boolean)
    .map((pair) => {
      const name = pair.split('=')[0];
      let decoded = name;
      try {
        decoded = decodeURIComponent(name.replace(/\+/g, ' '));
      } catch {
        // Keep the raw name.
      }
      return isSensitiveQueryKey(decoded) ? `${name}=REDACTED` : pair;
    });
  return `${parsed.origin}${parsed.pathname}${query.length ? `?${query.join('&')}` : ''}`;
}

/**
 * Return `url` when it is absolute and on the API origin (scheme, host, and port of `baseUrl`).
 * Requests carry the access token and the linked account header, so an absolute URL on any
 * other origin (e.g. an upload part URL pointing elsewhere) is refused before anything is sent.
 */
function sameOriginUrl(url: string, baseUrl: string): string {
  let origin: string;
  try {
    origin = new URL(url).origin;
  } catch {
    throw new OFAuthError('Refusing to send an authenticated request: the request URL is not an absolute URL.');
  }
  const apiOrigin = new URL(baseUrl).origin;
  if (origin !== apiOrigin) {
    throw new OFAuthError(
      `Refusing to send the access token to ${origin}: it is not the API origin (${apiOrigin}). ` +
        'Authenticated requests only go to the configured baseUrl.',
    );
  }
  return url;
}

function pathOf(url: string): string {
  try {
    return new URL(url).pathname;
  } catch {
    return url.split('?')[0];
  }
}

const NETWORK_ERROR_CODES: ReadonlySet<string> = new Set([
  'ECONNRESET',
  'ECONNREFUSED',
  'ECONNABORTED',
  'ETIMEDOUT',
  'EPIPE',
  'ENOTFOUND',
  'EAI_AGAIN',
  'EHOSTUNREACH',
  'ENETUNREACH',
  'ENETDOWN',
]);

function hasNetworkCode(value: unknown): boolean {
  const code = isRecord(value) ? value.code : undefined;
  return typeof code === 'string' && (NETWORK_ERROR_CODES.has(code) || code.startsWith('UND_ERR_'));
}

/**
 * True for a genuine network failure: `fetch` rejects with a `TypeError` (undici, browsers),
 * or an error carrying a socket error code (`ECONNRESET`, `UND_ERR_*`, ...) itself or in `cause`. @internal
 */
export function isNetworkError(error: unknown): boolean {
  return error instanceof TypeError || hasNetworkCode(error) || hasNetworkCode((error as { cause?: unknown } | null)?.cause);
}

// ============================================================================
// Request
// ============================================================================

/**
 * Send one request to the OFAuth API and return the parsed response body.
 * Retries per the client's retry policy; throws {@link OFAuthAPIError} or {@link OFAuthConnectionError}.
 * Errors a custom `fetch` throws that are not network failures propagate unchanged, without retries.
 */
export async function request<T>(config: OFAuthConfig, req: RequestConfig): Promise<T> {
  rejectBrowserAccessToken(config);
  const fetchFn = config.fetch ?? globalThis.fetch;
  const baseUrl = (config.baseUrl ?? DEFAULT_API_URL).replace(/\/+$/, '');
  const url = req.url !== undefined ? sameOriginUrl(req.url, baseUrl) : baseUrl + req.path + buildQueryString(req.query ?? {});
  // Hooks, logs, and errors only ever see this form of the URL.
  const safeUrl = sanitizeUrl(url);
  rejectCallerAuthorization(config.headers, req.headers);

  const linkedAccountId = req.linkedAccountId ?? config.linkedAccountId;
  if (req.linkedAccount && !linkedAccountId) {
    throw new OFAuthError(
      `${req.method} ${req.path} needs a linked account: pass linkedAccountId, or set it on the client.`,
    );
  }

  const maxRetries = Math.max(0, req.maxRetries ?? config.maxRetries ?? DEFAULT_MAX_RETRIES);
  const timeout = req.timeout ?? config.timeout ?? DEFAULT_TIMEOUT_MS;
  const maxRetryDelay = config.maxRetryDelay ?? DEFAULT_MAX_RETRY_DELAY_MS;
  const idempotent = IDEMPOTENT_METHODS.has(req.method);
  const log = debugLogger(config.debug);
  const target = `${req.method} ${pathOf(url)}`;
  const details = { operation: req.operation, requiredScope: req.requiredScope };

  let body: BodyInit | undefined;
  let contentType: string | undefined;
  if (req.rawBody !== undefined) {
    body = req.rawBody;
    contentType = req.contentType ?? 'application/octet-stream';
  } else if (req.body !== undefined) {
    body = JSON.stringify(req.body);
    contentType = 'application/json';
  }

  let attempt = 0;
  let retries = 0;
  let forceRefresh = false;
  let rejectedAccessToken: string | undefined;
  let refreshed = false;

  const retryAfterDelay = async (delay: number, reason: string) => {
    retries++;
    log?.(`[ofauth] retrying ${target} in ${(delay / 1000).toFixed(1)}s (retry ${retries}/${maxRetries}, ${reason})`);
    await sleep(delay, req.signal);
  };

  for (;;) {
    attempt++;
    if (req.signal?.aborted) throw req.signal.reason;

    const accessToken = await resolveAccessToken(config.accessToken, forceRefresh, rejectedAccessToken);
    const headers = mergeHeaders({ accept: 'application/json' }, config.headers, req.headers, {
      authorization: `Bearer ${accessToken}`,
    });
    forceRefresh = false;
    rejectedAccessToken = undefined;
    if (req.linkedAccount && linkedAccountId) headers[LINKED_ACCOUNT_HEADER] = linkedAccountId;
    if (contentType) headers['content-type'] = contentType;
    if (req.rawBody !== undefined) delete headers.accept;

    callHook(config.onRequest, { method: req.method, url: safeUrl, headers: redactHeaders(headers), attempt, operation: req.operation });

    // One controller per attempt: aborted by the caller's signal or the timeout.
    const controller = new AbortController();
    let timedOut = false;
    const onAbort = () => controller.abort(req.signal!.reason);
    req.signal?.addEventListener('abort', onAbort, { once: true });
    const timer = setTimeout(() => {
      timedOut = true;
      controller.abort(new OFAuthTimeoutError(timeout, details));
    }, timeout);

    const started = Date.now();
    let response: Response;
    let text: string;
    try {
      response = await fetchFn(url, { method: req.method, headers, body, signal: controller.signal, redirect: 'error' });
      text = response.status === 204 ? '' : await response.text();
    } catch (cause) {
      const durationMs = Date.now() - started;
      if (req.signal?.aborted) {
        callHook(config.onResponse, { method: req.method, url: safeUrl, durationMs, attempt, operation: req.operation, error: cause });
        throw req.signal.reason ?? cause;
      }
      if (!timedOut && !isNetworkError(cause)) {
        // Thrown on purpose by a custom fetch (e.g. a policy refusal): surface it unchanged, never retry.
        callHook(config.onResponse, { method: req.method, url: safeUrl, durationMs, attempt, operation: req.operation, error: cause });
        log?.(`[ofauth] ${target} -> fetch threw (${durationMs}ms)`);
        throw cause;
      }
      const error = timedOut
        ? new OFAuthTimeoutError(timeout, { ...details, attempts: attempt })
        : new OFAuthConnectionError(`${target} failed: ${cause instanceof Error ? cause.message : String(cause)}`, cause, {
            ...details,
            attempts: attempt,
          });
      callHook(config.onResponse, { method: req.method, url: safeUrl, durationMs, attempt, operation: req.operation, error });
      log?.(`[ofauth] ${target} -> ${timedOut ? 'timeout' : 'network error'} (${durationMs}ms)`);
      if (idempotent && retries < maxRetries) {
        await retryAfterDelay(backoff(retries), timedOut ? 'timeout' : 'network error');
        continue;
      }
      throw error;
    } finally {
      clearTimeout(timer);
      req.signal?.removeEventListener('abort', onAbort);
    }

    const durationMs = Date.now() - started;
    const parsed = parseBody(response, text);
    const requestId =
      response.headers.get('x-request-id') ??
      (isRecord(parsed) && typeof parsed.requestId === 'string' ? parsed.requestId : undefined) ??
      undefined;
    callHook(config.onResponse, {
      method: req.method,
      url: safeUrl,
      status: response.status,
      requestId,
      durationMs,
      attempt,
      operation: req.operation,
    });
    log?.(`[ofauth] ${target} -> ${response.status} (${durationMs}ms${requestId ? `, ${requestId}` : ''})`);

    if (response.ok) return parsed as T;

    // A rejected token is refreshed once; this does not count against maxRetries.
    if (
      response.status === 401 &&
      !refreshed &&
      typeof config.accessToken !== 'string' &&
      isRecord(parsed) &&
      parsed.error === 'invalid_token'
    ) {
      refreshed = true;
      forceRefresh = true;
      rejectedAccessToken = accessToken;
      log?.(`[ofauth] refreshing the access token and retrying ${target} (invalid_token)`);
      continue;
    }

    const error = new OFAuthAPIError(response.status, parsed, response.headers, { ...details, attempts: attempt });
    const delay = retries < maxRetries ? retryDelayFor(error, idempotent, retries, maxRetryDelay) : undefined;
    if (delay === undefined) throw error;
    await retryAfterDelay(delay, `${error.status} ${error.code}`);
  }
}

// ============================================================================
// Pagination
// ============================================================================

export interface PaginationOptions {
  /** Stop after this many items. */
  maxItems?: number;
}

/** Read a nested property, e.g. `['page', 'nextCursor']`. */
function at(value: unknown, path: readonly string[]): unknown {
  let current: unknown = value;
  for (const key of path) {
    if (!isRecord(current)) return undefined;
    current = current[key];
  }
  return current;
}

export interface CursorPagination {
  items: string;
  nextCursor: readonly string[];
  hasMore: readonly string[] | null;
}

/**
 * Iterate every item of a cursor-paginated operation.
 * `fetchPage` receives the cursor for the next page (undefined for the first).
 */
export async function* paginate<TItem>(
  fetchPage: (cursor: string | undefined) => Promise<unknown>,
  pagination: CursorPagination,
  options?: PaginationOptions,
): AsyncGenerator<TItem, void, unknown> {
  const maxItems = options?.maxItems ?? Infinity;
  let yielded = 0;
  let cursor: string | undefined;
  while (yielded < maxItems) {
    const page = await fetchPage(cursor);
    const items = isRecord(page) && Array.isArray(page[pagination.items]) ? (page[pagination.items] as TItem[]) : [];
    for (const item of items) {
      if (yielded >= maxItems) return;
      yield item;
      yielded++;
    }
    const next = at(page, pagination.nextCursor);
    const hasMore = pagination.hasMore ? at(page, pagination.hasMore) === true : true;
    if (!hasMore || next === null || next === undefined || next === '' || items.length === 0) return;
    cursor = String(next);
  }
}
