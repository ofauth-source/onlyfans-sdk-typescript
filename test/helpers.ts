import { vi } from 'vitest';
import type { LinkTokenResponse } from '../src/index';

export type Call = { url: string; init: RequestInit & { headers: Record<string, string> } };
type Responder = Response | Error | ((call: Call) => Response | Promise<Response>);

/**
 * A fetch mock answering with each responder in turn (the last one repeats).
 * An `Error` responder makes fetch reject with it (a `TypeError` acts as a network failure).
 */
export function mockFetch(...responses: Responder[]) {
  const calls: Call[] = [];
  const fn = vi.fn(async (url: string | URL | Request, init?: RequestInit) => {
    const call = { url: String(url), init: init as Call['init'] };
    calls.push(call);
    const next = responses.length > 1 ? responses.shift()! : responses[0];
    if (next instanceof Error) throw next;
    return typeof next === 'function' ? next(call) : next.clone();
  });
  return { fetch: fn as unknown as typeof fetch, calls };
}

/** A fetch response that never arrives; rejects when the request is aborted. */
export function hangingFetch(call: Call): Promise<Response> {
  return new Promise((_, reject) => {
    const signal = call.init.signal;
    signal?.addEventListener('abort', () => reject(signal.reason ?? new Error('aborted')), { once: true });
  });
}

export const json = (body: unknown, status = 200, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', ...headers } });

export const apiError = (status: number, error: string, headers: Record<string, string> = {}, action?: string) =>
  json({ error, ...(action ? { recovery: { action } } : {}), requestId: `req_${status}` }, status, headers);

export const tokenResponse = (n: number, overrides: Partial<LinkTokenResponse> = {}): LinkTokenResponse => ({
  access_token: `access-${n}`,
  token_type: 'Bearer',
  expires_in: 900,
  refresh_token: `refresh-${n}`,
  scope: 'profile:read',
  authorization_id: 'external_live_1',
  ...overrides,
});
