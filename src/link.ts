/* eslint-disable */
/**
 * OFAuth Link: the OAuth 2.0 Authorization Code flow with PKCE.
 *
 * Run this on your backend. It holds the client secret and PKCE verifier,
 * which must never reach a browser or native app.
 */

import { DEFAULT_API_URL, OFAuthError, isRecord, readBody } from './runtime';
import type { RecoveryAction } from './runtime';
import type { LinkAuthorizationServerMetadata, LinkTokenResponse, Scope } from './models';
import type { OperationName } from './operations';
import { scopesFor } from './scopes';

export const DEFAULT_AUTH_URL = 'https://link.ofauth.com';

/** `sandbox`, `test`, or `live`. Each environment has its own client. */
export type Environment = 'sandbox' | 'test' | 'live';

/** The environment a client ID belongs to (`ofext_live_...` -> `live`). */
export function environmentFromClientId(clientId: string): Environment | undefined {
  const match = /^ofext_(sandbox|test|live)_/.exec(clientId);
  return match ? (match[1] as Environment) : undefined;
}

export interface OFAuthLinkConfig {
  /** Client ID for one environment, e.g. `ofext_live_...`. */
  clientId: string;
  /** Client secret for that client. Required for token exchange, refresh, and revoke. */
  clientSecret: string;
  /** Confidential-client authentication at token and revocation endpoints. */
  clientAuthentication?: 'client_secret_basic' | 'client_secret_post';
  /** Default redirect URI. Must exactly match a URI registered for the client. */
  redirectUri?: string;
  /** Auth origin for the browser authorize route. Defaults to `https://link.ofauth.com`. */
  authUrl?: string;
  /** API origin for token and revoke. Defaults to `https://api.ofauth.com`. */
  apiUrl?: string;
  fetch?: typeof fetch;
}

export interface CreateAuthorizationUrlOptions {
  /** Scopes to request. Every successful code exchange returns a refresh token. */
  scopes?: Array<Scope | (string & {})> | string;
  /**
   * Operations you will call, e.g. `['access.chats.messages.send']`. Their scopes
   * (see {@link scopesFor}) are merged with `scopes`.
   */
  operations?: OperationName[];
  /** Redirect URI. Defaults to the configured one. */
  redirectUri?: string;
  /** One-use state value. Generated when omitted. */
  state?: string;
  /** PKCE verifier. Generated when omitted. */
  codeVerifier?: string;
}

export interface AuthorizationRequest {
  /** Send the user's browser to this URL. */
  url: string;
  /** Store with the pending authorization and check it on the callback. */
  state: string;
  /** Store on your backend; needed to exchange the code. */
  codeVerifier: string;
  codeChallenge: string;
}

export interface AuthorizationCallback {
  code: string;
  state: string;
}

/** Thrown by `parseCallback` when the user denied access or the request was invalid. */
export class OFAuthAuthorizationError extends OFAuthError {
  /** `access_denied` or `invalid_request`. */
  readonly code: string;
  readonly state?: string;
  readonly description?: string;

  constructor(code: string, state?: string, description?: string) {
    super(description ? `${code}: ${description}` : code);
    this.name = 'OFAuthAuthorizationError';
    this.code = code;
    this.state = state;
    this.description = description;
  }
}

/** An RFC 6749 error from the token or revoke endpoint. */
export class OFAuthOAuthError extends OFAuthError {
  readonly status: number;
  /** e.g. `invalid_grant`: the refresh token is revoked or expired; authorize again. */
  readonly code: string;
  readonly description?: string;
  /** `client_deleted`, `developer_plan_unavailable`, or `security_suspended`. */
  readonly reason?: string;
  readonly recoveryAction?: RecoveryAction;
  readonly retryAfter?: number;
  readonly body: unknown;

  /** The user must authorize again: `invalid_grant` (refresh token revoked or expired) or a re-authorization action. */
  get needsReauthorization(): boolean {
    return (
      this.code === 'invalid_grant' ||
      this.recoveryAction === 'restart_authorization' ||
      this.recoveryAction === 'request_additional_consent' ||
      this.recoveryAction === 'grant_linked_account'
    );
  }

  constructor(status: number, body: unknown, headers: Headers) {
    const obj = isRecord(body) ? body : {};
    const code = typeof obj.error === 'string' ? obj.error : `http_${status}`;
    const description = typeof obj.error_description === 'string' ? obj.error_description : undefined;
    super(description ? `${code}: ${description}` : code);
    this.name = 'OFAuthOAuthError';
    this.status = status;
    this.code = code;
    this.description = description;
    this.reason = typeof obj.reason === 'string' ? obj.reason : undefined;
    this.recoveryAction = isRecord(obj.recovery) && typeof obj.recovery.action === 'string' ? obj.recovery.action : undefined;
    const retryAfter = Number(headers.get('retry-after'));
    this.retryAfter = Number.isFinite(retryAfter) && headers.has('retry-after') ? retryAfter : undefined;
    this.body = body;
  }
}

function base64Url(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function randomToken(byteLength = 32): string {
  const bytes = new Uint8Array(byteLength);
  globalThis.crypto.getRandomValues(bytes);
  return base64Url(bytes);
}

/** The S256 code challenge for a PKCE verifier. */
export async function createCodeChallenge(codeVerifier: string): Promise<string> {
  const digest = await globalThis.crypto.subtle.digest('SHA-256', new TextEncoder().encode(codeVerifier));
  return base64Url(new Uint8Array(digest));
}

/** A new PKCE verifier (43 characters) and its S256 challenge. */
export async function generatePkce(): Promise<{ codeVerifier: string; codeChallenge: string }> {
  const codeVerifier = randomToken(32);
  return { codeVerifier, codeChallenge: await createCodeChallenge(codeVerifier) };
}

/**
 * OAuth client for one environment.
 *
 * @example
 * ```ts
 * const link = new OFAuthLink({ clientId, clientSecret, redirectUri })
 * const { url, state, codeVerifier } = await link.createAuthorizationUrl({
 *   scopes: ['profile:read', 'messages:read'],
 * })
 * // ...store state + codeVerifier, redirect to url, then on the callback:
 * const { code } = link.parseCallback(request.url, state)
 * const tokens = await link.exchangeCode({ code, codeVerifier })
 * ```
 */
export class OFAuthLink {
  readonly clientId: string;
  /** Derived from the client ID. */
  readonly environment: Environment | undefined;
  private readonly clientSecret: string;
  private readonly clientAuthentication: 'client_secret_basic' | 'client_secret_post';
  private readonly redirectUri?: string;
  private readonly authUrl: string;
  private readonly apiUrl: string;
  private readonly fetchFn: typeof fetch;

  constructor(config: OFAuthLinkConfig) {
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
    this.clientAuthentication = config.clientAuthentication ?? 'client_secret_basic';
    if (!['client_secret_basic', 'client_secret_post'].includes(this.clientAuthentication)) throw new OFAuthError('Unsupported client authentication');
    this.redirectUri = config.redirectUri;
    this.authUrl = (config.authUrl ?? DEFAULT_AUTH_URL).replace(/\/+$/, '');
    this.apiUrl = (config.apiUrl ?? DEFAULT_API_URL).replace(/\/+$/, '');
    this.fetchFn = config.fetch ?? globalThis.fetch;
    this.environment = environmentFromClientId(config.clientId);
  }

  /** Build the URL to send the user to, with a fresh state and PKCE pair unless provided. */
  async createAuthorizationUrl(options: CreateAuthorizationUrlOptions): Promise<AuthorizationRequest> {
    const redirectUri = options.redirectUri ?? this.redirectUri;
    if (!redirectUri) throw new OFAuthError('createAuthorizationUrl needs a redirectUri');
    const requested = typeof options.scopes === 'string' ? options.scopes.split(' ') : (options.scopes ?? []);
    const merged = [...new Set([...requested, ...(options.operations?.length ? scopesFor(...options.operations) : [])])];
    const scope = merged.filter(Boolean).join(' ');
    if (!scope) throw new OFAuthError('createAuthorizationUrl needs scopes or operations');
    const state = options.state ?? randomToken(32);
    const codeVerifier = options.codeVerifier ?? randomToken(32);
    const codeChallenge = await createCodeChallenge(codeVerifier);

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.clientId,
      redirect_uri: redirectUri,
      scope,
      state,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
    });

    return { url: `${this.authUrl}/v3/authorize?${params.toString()}`, state, codeVerifier, codeChallenge };
  }

  /**
   * Read the callback query. Throws {@link OFAuthAuthorizationError} for
   * `error=...` callbacks, missing or mismatched state, and an unexpected issuer.
   */
  parseCallback(callback: string | URL | URLSearchParams, expectedState: string): AuthorizationCallback {
    const params =
      callback instanceof URLSearchParams
        ? callback
        : new URL(typeof callback === 'string' ? callback : callback.toString(), 'http://localhost').searchParams;
    for (const name of ['code', 'state', 'iss', 'error']) {
      if (params.getAll(name).length > 1) throw new OFAuthAuthorizationError('invalid_request');
    }
    const state = params.get('state') ?? undefined;
    if (!expectedState || state !== expectedState) {
      throw new OFAuthAuthorizationError('invalid_state', state, 'state does not match the pending authorization');
    }
    if (params.get('iss') !== `${this.apiUrl}/v3/link`) throw new OFAuthAuthorizationError('invalid_issuer');
    const error = params.get('error');
    if (error) throw new OFAuthAuthorizationError(error, state, params.get('error_description') ?? undefined);
    const code = params.get('code');
    if (!code || !state) throw new OFAuthAuthorizationError('invalid_request', state, 'missing code or state');
    return { code, state };
  }

  /** Exchange an authorization code for tokens. */
  exchangeCode(options: { code: string; codeVerifier: string; redirectUri?: string }): Promise<LinkTokenResponse> {
    const redirectUri = options.redirectUri ?? this.redirectUri;
    if (!redirectUri) throw new OFAuthError('exchangeCode needs the redirectUri used in the authorization request');
    return this.tokenRequest({
      grant_type: 'authorization_code',
      code: options.code,
      redirect_uri: redirectUri,
      code_verifier: options.codeVerifier,
    });
  }

  /**
   * Refresh the access token. The response echoes the same client-bound refresh token;
   * concurrent refreshes and retries after a lost response are supported.
   */
  refresh(options: { refreshToken: string; scope?: string | string[] }): Promise<LinkTokenResponse> {
    const body: Record<string, string> = { grant_type: 'refresh_token', refresh_token: options.refreshToken };
    if (options.scope) body.scope = Array.isArray(options.scope) ? options.scope.join(' ') : options.scope;
    return this.tokenRequest(body);
  }

  /** Revoke one access token, or a refresh credential and all its access tokens. */
  async revoke(options: { token: string; tokenTypeHint?: 'refresh_token' | 'access_token' }): Promise<void> {
    const body: Record<string, string> = { token: options.token };
    if (options.tokenTypeHint) body.token_type_hint = options.tokenTypeHint;
    await this.formRequest('/v3/link/revoke', body);
  }

  /** RFC 8414 authorization server metadata. */
  async getMetadata(): Promise<LinkAuthorizationServerMetadata> {
    const response = await this.fetchFn(`${this.apiUrl}/.well-known/oauth-authorization-server/v3/link`, {
      headers: { accept: 'application/json' },
    });
    const body = await readBody(response);
    if (!response.ok) throw new OFAuthOAuthError(response.status, body, response.headers);
    return body as LinkAuthorizationServerMetadata;
  }

  private async tokenRequest(body: Record<string, string>): Promise<LinkTokenResponse> {
    return (await this.formRequest('/v3/link/token', body)) as LinkTokenResponse;
  }

  private async formRequest(path: string, body: Record<string, string>): Promise<unknown> {
    if (!this.clientSecret) throw new OFAuthError(`${path} needs the client secret`);
    const headers: Record<string, string> = { 'content-type': 'application/x-www-form-urlencoded', accept: 'application/json' };
    if (this.clientAuthentication === 'client_secret_post') {
      body = { ...body, client_id: this.clientId, client_secret: this.clientSecret };
    } else {
      const encode = (value: string) => new URLSearchParams({ value }).toString().slice(6);
      headers.authorization = `Basic ${btoa(`${encode(this.clientId)}:${encode(this.clientSecret)}`)}`;
    }
    const response = await this.fetchFn(`${this.apiUrl}${path}`, {
      method: 'POST',
      headers,
      redirect: 'error',
      body: new URLSearchParams(body).toString(),
    });
    const parsed = await readBody(response);
    if (!response.ok) throw new OFAuthOAuthError(response.status, parsed, response.headers);
    return parsed;
  }
}
