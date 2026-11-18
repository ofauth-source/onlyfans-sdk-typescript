import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  OFAuthClient,
  OFAuthError,
  OFAuthLink,
  createOFAuthClient,
  environmentFromClientId,
  extractWebhookHeaders,
  generatePkce,
  scopesFor,
  uploadMedia,
  verifyWebhook,
  WebhookRouter,
  type OFAuthConfig,
} from '../src/index';
import { createTestEvent, generateWebhookSecret, signWebhook } from '../src/testing';
import { isBrowserEnvironment, request } from '../src/runtime';
import { json, mockFetch } from './helpers';

/** Globals each runtime defines that matter for detection. Node's own globals stay in place. */
const ENVIRONMENTS: Record<string, Record<string, unknown>> = {
  'a browser page': { window: {}, document: {}, self: {}, navigator: { userAgent: 'Mozilla/5.0' } },
  'a dedicated or service worker': { self: {}, importScripts: () => {}, navigator: { userAgent: 'Mozilla/5.0' } },
};

const SERVER_ENVIRONMENTS: Record<string, Record<string, unknown>> = {
  Node: {},
  'Next.js server components': { process: { ...process, env: { ...process.env, NEXT_RUNTIME: 'nodejs' } } },
  Bun: { Bun: { version: '1.1.0' }, self: {}, navigator: { userAgent: 'Bun/1.1.0' } },
  'Deno 2': { Deno: { version: { deno: '2.0.0' } }, self: {}, navigator: { userAgent: 'Deno/2.0.0' } },
  // Deno 1.x had a `window` global but never a `document`.
  'Deno 1.x': { Deno: { version: { deno: '1.40.0' } }, window: {}, self: {}, navigator: { userAgent: 'Deno/1.40.0' } },
  'Cloudflare Workers': { self: {}, caches: {}, WebSocketPair: class {}, navigator: { userAgent: 'Cloudflare-Workers' } },
  'Vercel Edge': { EdgeRuntime: 'edge-runtime', self: {}, navigator: { userAgent: 'edge-runtime' } },
};

function stubGlobals(globals: Record<string, unknown>) {
  for (const [name, value] of Object.entries(globals)) vi.stubGlobal(name, value);
}

const tokenSources: Array<[string, OFAuthConfig['accessToken']]> = [
  ['a token string', 'secret-access-token'],
  ['a token function', () => 'secret-access-token'],
  ['a token provider', { getAccessToken: () => 'secret-access-token' }],
];

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('browser detection', () => {
  it.each(Object.entries(ENVIRONMENTS))('treats %s as a browser', (_name, globals) => {
    stubGlobals(globals);
    expect(isBrowserEnvironment()).toBe(true);
  });

  it.each(Object.entries(SERVER_ENVIRONMENTS))('does not treat %s as a browser', (_name, globals) => {
    stubGlobals(globals);
    expect(isBrowserEnvironment()).toBe(false);
  });
});

describe.each(Object.entries(ENVIRONMENTS))('access tokens in %s', (_name, globals) => {
  it.each(tokenSources)('refuses to construct a client with %s', (_kind, accessToken) => {
    stubGlobals(globals);
    let error: unknown;
    try {
      new OFAuthClient({ accessToken, linkedAccountId: 'acct_1' });
    } catch (e) {
      error = e;
    }
    expect(error).toBeInstanceOf(OFAuthError);
    const message = (error as Error).message;
    expect(message).toContain('OFAuth access tokens must not be used in a browser');
    expect(message).toContain('Call OFAuth from your server');
    expect(message).toContain('create a stream URL on your server');
    expect(message).toContain('dangerouslyAllowBrowser: true');
    expect(message).not.toContain('secret-access-token');
  });

  it('refuses createOFAuthClient, and dangerouslyAllowBrowser: false still refuses', () => {
    stubGlobals(globals);
    expect(() => createOFAuthClient({ accessToken: 'tok' })).toThrow(OFAuthError);
    expect(() => new OFAuthClient({ accessToken: 'tok', dangerouslyAllowBrowser: false })).toThrow(OFAuthError);
  });

  it('refuses the low-level request() and uploadMedia() before sending anything', async () => {
    stubGlobals(globals);
    const { fetch, calls } = mockFetch(json({}));
    const getAccessToken = vi.fn(() => 'tok');
    const config = { accessToken: { getAccessToken }, linkedAccountId: 'acct_1', fetch };
    await expect(request(config, { method: 'GET', path: '/v3/access/profile' })).rejects.toThrow(
      'OFAuth access tokens must not be used in a browser',
    );
    await expect(
      uploadMedia(config, new Uint8Array([1, 2, 3]), { filename: 'a.jpg', contentType: 'image/jpeg' }),
    ).rejects.toThrow('OFAuth access tokens must not be used in a browser');
    expect(calls).toHaveLength(0);
    expect(getAccessToken).not.toHaveBeenCalled();
  });

  it('works with dangerouslyAllowBrowser: true, including derived clients and Realtime', async () => {
    stubGlobals(globals);
    const { fetch, calls } = mockFetch(json({ id: 1 }));
    const client = new OFAuthClient({ accessToken: 'tok', linkedAccountId: 'acct_1', fetch, dangerouslyAllowBrowser: true });
    await client.access.profile.get();
    await client.withLinkedAccount('acct_2').access.profile.get();
    expect(calls).toHaveLength(2);
    expect(calls[1].init.headers['x-linked-account-id']).toBe('acct_2');
    expect(calls[0].init.headers.authorization).toBe('Bearer tok');
    expect(() => client.realtime()).not.toThrow();
  });

  it('keeps token-free helpers working: Link URLs, callbacks, PKCE, scopes, webhooks, testing helpers', async () => {
    stubGlobals(globals);
    expect(environmentFromClientId('ofext_live_abc')).toBe('live');
    expect(scopesFor('access.profile.get').length).toBeGreaterThan(0);
    const pkce = await generatePkce();
    expect(pkce.codeVerifier).toHaveLength(43);

    const link = new OFAuthLink({ clientId: 'ofext_live_abc', clientSecret: '', redirectUri: 'https://app.test/callback' });
    const { url, state } = await link.createAuthorizationUrl({ operations: ['access.profile.get'] });
    expect(url).toMatch(/^https:\/\/link\.ofauth\.com\/v3\/authorize\?/);
    const callback = `https://app.test/callback?code=c1&state=${state}&iss=${encodeURIComponent('https://api.ofauth.com/v3/link')}`;
    expect(link.parseCallback(callback, state)).toEqual({ code: 'c1', state });

    const secret = generateWebhookSecret();
    const event = createTestEvent('authorization.granted');
    const [body, headers] = await signWebhook(event, secret);
    expect(extractWebhookHeaders(headers).id).toBe(headers['webhook-id']);
    expect(await verifyWebhook(body, headers, secret)).toEqual(event);
    expect(new WebhookRouter({ secret })).toBeInstanceOf(WebhookRouter);
  });
});

describe.each(Object.entries(SERVER_ENVIRONMENTS))('server runtime: %s', (_name, globals) => {
  it.each(tokenSources)('constructs a client and sends requests with %s', async (_kind, accessToken) => {
    stubGlobals(globals);
    const { fetch, calls } = mockFetch(json({ id: 1 }));
    const client = new OFAuthClient({ accessToken, linkedAccountId: 'acct_1', fetch });
    await client.access.profile.get();
    expect(calls).toHaveLength(1);
    expect(calls[0].init.headers.authorization).toBe('Bearer secret-access-token');
  });
});
