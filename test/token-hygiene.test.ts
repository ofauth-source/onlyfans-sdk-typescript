import { describe, expect, it } from 'vitest';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  OFAuthClient,
  OFAuthConnectionError,
  OFAuthError,
  type RequestHookInfo,
  type ResponseHookInfo,
} from '../src/index';
import { redactHeaders, request, sanitizeUrl } from '../src/runtime';
import { realtimeUrlFor } from '../src/realtime-connection';
import { json, mockFetch } from './helpers';
import { sseFetch } from './sse';

describe('header casing and redaction', () => {
  it.each([['Authorization'], ['authorization'], ['AUTHORIZATION']])(
    'rejects a caller-supplied %s client header without sending anything',
    async (name) => {
      const { fetch, calls } = mockFetch(json({}));
      const requests: RequestHookInfo[] = [];
      const client = new OFAuthClient({
        accessToken: 'tok',
        linkedAccountId: 'conn_1',
        fetch,
        headers: { [name]: 'Bearer caller-secret' },
        onRequest: (info) => requests.push(info),
      });
      const err = await client.access.profile.get().catch((e) => e);
      expect(err).toBeInstanceOf(OFAuthError);
      expect(err.message).toMatch(/SDK sends "Bearer <access token>" itself/);
      expect(err.message).not.toContain('caller-secret');
      expect(calls).toHaveLength(0);
      expect(requests).toHaveLength(0);
    },
  );

  it('rejects a per-request Authorization header', async () => {
    const { fetch, calls } = mockFetch(json({}));
    const config = { accessToken: 'tok', fetch };
    await expect(
      request(config, { method: 'GET', path: '/v3/x', headers: { Authorization: 'Bearer other' } }),
    ).rejects.toThrow(OFAuthError);
    expect(calls).toHaveLength(0);
  });

  it('merges headers case-insensitively: SDK-owned headers win, caller headers are sent once', async () => {
    const { fetch, calls } = mockFetch(json({}));
    const client = new OFAuthClient({
      accessToken: 'tok',
      linkedAccountId: 'conn_1',
      fetch,
      headers: { 'X-Linked-Account-Id': 'conn_spoofed', Accept: 'text/plain', 'X-Trace': 'abc' },
    });
    await client.access.profile.get();
    const sent = calls[0].init.headers;
    expect(Object.keys(sent).sort()).toEqual(['accept', 'authorization', 'x-linked-account-id', 'x-trace']);
    expect(sent['x-linked-account-id']).toBe('conn_1');
    expect(sent.accept).toBe('text/plain'); // accept is only a default
    expect(sent.authorization).toBe('Bearer tok');
    expect(sent['x-trace']).toBe('abc');
  });

  it('redacts sensitive headers in onRequest whatever their casing', async () => {
    const { fetch } = mockFetch(json({}));
    const requests: RequestHookInfo[] = [];
    const client = new OFAuthClient({
      accessToken: 'secret-token',
      linkedAccountId: 'conn_1',
      fetch,
      headers: {
        Cookie: 'session=c1',
        'X-API-Key': 'k1',
        'CF-Access-Client-Secret': 's1',
        'X-Upstream-Token': 't1',
        'X-Client-Secret-Id': 's2',
        'X-Trace': 'visible',
      },
      onRequest: (info) => requests.push(info),
    });
    await client.access.profile.get();
    const headers = requests[0].headers;
    expect(headers).toMatchObject({
      authorization: '[redacted]',
      cookie: '[redacted]',
      'x-api-key': '[redacted]',
      'cf-access-client-secret': '[redacted]',
      'x-upstream-token': '[redacted]',
      'x-client-secret-id': '[redacted]',
      'x-trace': 'visible',
    });
    expect(JSON.stringify(requests)).not.toMatch(/secret-token|c1|k1|s1|t1|s2/);
  });

  it('redactHeaders matches names case-insensitively', () => {
    expect(redactHeaders({ Authorization: 'Bearer x', 'Proxy-Authorization': 'y', 'Set-Cookie': 'z', Accept: 'a' })).toEqual({
      authorization: '[redacted]',
      'proxy-authorization': '[redacted]',
      'set-cookie': '[redacted]',
      accept: 'a',
    });
  });
});

/** The URL client.realtime() opens for a client with this baseUrl (and any extra client options). */
async function realtimeUrlOf(config: Partial<ConstructorParameters<typeof OFAuthClient>[0]>, options: Record<string, unknown> = {}) {
  const server = sseFetch('stream');
  const client = new OFAuthClient({ accessToken: 'tok', linkedAccountId: 'conn_1', fetch: server.fetch, ...config });
  const realtime = client.realtime(options);
  await realtime.connect();
  realtime.close();
  return server.calls[0].url;
}

describe('realtime URL is always the API origin', () => {
  it('derives the realtime URL from baseUrl', () => {
    expect(realtimeUrlFor('https://api.ofauth.com')).toBe('https://api.ofauth.com/v3/realtime/events');
    expect(realtimeUrlFor('https://api.staging.ofauth.com/')).toBe('https://api.staging.ofauth.com/v3/realtime/events');
    expect(realtimeUrlFor('HTTP://localhost:8787')).toBe('HTTP://localhost:8787/v3/realtime/events');
    expect(() => realtimeUrlFor('ftp://example.com')).toThrow(OFAuthError);
  });

  it('client.realtime() streams /v3/realtime/events on the baseUrl origin: default, staging, and loopback', async () => {
    expect(await realtimeUrlOf({})).toBe('https://api.ofauth.com/v3/realtime/events?linkedAccountId=conn_1');
    const staging = await realtimeUrlOf({ baseUrl: 'https://api.staging.ofauth.com' });
    expect(staging).toBe('https://api.staging.ofauth.com/v3/realtime/events?linkedAccountId=conn_1');
    expect(staging).not.toContain('api.ofauth.com');
    expect(await realtimeUrlOf({ baseUrl: 'http://127.0.0.1:8787/' })).toBe('http://127.0.0.1:8787/v3/realtime/events?linkedAccountId=conn_1');
  });

  it('has no way to point realtime elsewhere: a url option or client realtimeUrl is ignored', async () => {
    const url = await realtimeUrlOf(
      { baseUrl: 'https://api.staging.ofauth.com', realtimeUrl: 'https://evil.test/v3/realtime/events' } as any,
      { url: 'https://evil.test/v3/realtime/events' } as any,
    );
    expect(url).toBe('https://api.staging.ofauth.com/v3/realtime/events?linkedAccountId=conn_1');
  });

  it('client.realtime() rejects a baseUrl that is not http(s)', () => {
    const client = new OFAuthClient({ accessToken: 'tok', linkedAccountId: 'conn_1', baseUrl: 'ftp://api.test' });
    expect(() => client.realtime()).toThrow(OFAuthError);
  });
});

describe('realtime connections come only from a client', () => {
  it('the package does not export a RealtimeConnection constructor or a production realtime URL', async () => {
    const sdk: Record<string, unknown> = await import('../src/index');
    expect(sdk.RealtimeConnection).toBeUndefined();
    expect(sdk.DEFAULT_REALTIME_URL).toBeUndefined();
    expect(sdk.realtimeUrlFor).toBeUndefined();
    expect(Object.values(sdk).filter((v) => typeof v === 'string' && /^(wss?|https?):\/\/.*realtime/.test(v))).toEqual([]);
  });

  it('`new RealtimeConnection(...)` and a realtime url option do not compile', async () => {
    const ts = await import('typescript');
    const dir = fileURLToPath(new URL('.', import.meta.url));
    const file = path.join(dir, '__standalone_realtime__.ts');
    const source = [
      "import { OFAuthClient, RealtimeConnection } from '../src/index';",
      "const client = new OFAuthClient({ accessToken: 'tok', linkedAccountId: 'conn_1' });",
      'const fromClient: RealtimeConnection = client.realtime();',
      "new RealtimeConnection({ accessToken: 'tok', linkedAccountId: 'conn_1' });",
      "client.realtime({ url: 'https://elsewhere.test/v3/realtime/events' });",
      "new OFAuthClient({ accessToken: 'tok', realtimeUrl: 'https://elsewhere.test/v3/realtime/events' });",
      'export { fromClient };',
    ].join('\n');
    const options = { strict: true, noEmit: true, skipLibCheck: true, target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext, moduleResolution: ts.ModuleResolutionKind.Bundler, lib: ['lib.es2022.d.ts', 'lib.dom.d.ts'] };
    const host = ts.createCompilerHost(options);
    const readFile = host.readFile.bind(host);
    host.readFile = (name) => (path.resolve(name) === file ? source : readFile(name));
    const fileExists = host.fileExists.bind(host);
    host.fileExists = (name) => path.resolve(name) === file || fileExists(name);
    const program = ts.createProgram([file], options, host);
    const errors = program.getSemanticDiagnostics(program.getSourceFile(file)).map((d) => ({
      line: d.start === undefined ? -1 : d.file!.getLineAndCharacterOfPosition(d.start).line + 1,
      message: ts.flattenDiagnosticMessageText(d.messageText, '\n'),
    }));
    // Line 3 (the client-made connection) type-checks; lines 4-6 do not.
    expect([...new Set(errors.map((e) => e.line))], JSON.stringify(errors)).toEqual([4, 5, 6]);
    expect(errors[0].message).toMatch(/'RealtimeConnection' only refers to a type/);
  }, 60_000);
});

describe('sanitized URLs in hooks and errors', () => {
  it('sanitizeUrl redacts credential-like query values and keeps the rest', () => {
    expect(
      sanitizeUrl(
        'https://user:pw@api.test/v3/x/parts/1?X-Amz-Signature=abc&X-Amz-Credential=cred&token=t&sig=s&key=k&api_key=a&limit=10&cursor=c2#frag',
      ),
    ).toBe(
      'https://api.test/v3/x/parts/1?X-Amz-Signature=REDACTED&X-Amz-Credential=REDACTED&token=REDACTED&sig=REDACTED&key=REDACTED&api_key=REDACTED&limit=10&cursor=c2',
    );
    expect(sanitizeUrl('https://api.test/v3/access/profile')).toBe('https://api.test/v3/access/profile');
    expect(sanitizeUrl('wss://api.test/v3/realtime?linkedAccountId=conn_1')).toBe('wss://api.test/v3/realtime?linkedAccountId=conn_1');
  });

  it('passes sanitized URLs to onRequest and onResponse', async () => {
    const { fetch, calls } = mockFetch(json({ ok: true }));
    const requests: RequestHookInfo[] = [];
    const responses: ResponseHookInfo[] = [];
    const config = {
      accessToken: 'tok',
      fetch,
      baseUrl: 'https://api.test',
      onRequest: (info: RequestHookInfo) => requests.push(info),
      onResponse: (info: ResponseHookInfo) => responses.push(info),
    };
    const signed = 'https://api.test/v3/access/uploads/u/parts/1?X-Amz-Signature=deadbeef&partNumber=1';
    await request(config, { method: 'PUT', path: '/v3/access/uploads/u/parts/1', url: signed });
    expect(calls[0].url).toBe(signed); // the real request keeps the signature
    expect(requests[0].url).toBe('https://api.test/v3/access/uploads/u/parts/1?X-Amz-Signature=REDACTED&partNumber=1');
    expect(responses[0].url).toBe(requests[0].url);
    expect(JSON.stringify([requests, responses])).not.toContain('deadbeef');
  });

  it('keeps signed query values out of connection errors and the failed-attempt hook', async () => {
    const { fetch } = mockFetch(new TypeError('fetch failed'));
    const responses: ResponseHookInfo[] = [];
    const config = { accessToken: 'tok', fetch, baseUrl: 'https://api.test', maxRetries: 0, onResponse: (info: ResponseHookInfo) => responses.push(info) };
    const err = await request(config, {
      method: 'GET',
      path: '/v3/x',
      url: 'https://api.test/v3/x?token=deadbeef',
    }).catch((e) => e);
    expect(err).toBeInstanceOf(OFAuthConnectionError);
    expect(err.message).not.toContain('deadbeef');
    expect(responses[0].url).toBe('https://api.test/v3/x?token=REDACTED');
  });

  it('passes a sanitized URL to realtime hooks', async () => {
    const server = sseFetch('stream');
    const requests: RequestHookInfo[] = [];
    const responses: ResponseHookInfo[] = [];
    const client = new OFAuthClient({
      accessToken: 'tok',
      linkedAccountId: 'conn_1',
      baseUrl: 'https://user:deadbeef@rt.test',
      fetch: server.fetch,
      onRequest: (info) => requests.push(info),
      onResponse: (info) => responses.push(info),
    });
    const realtime = client.realtime();
    await realtime.connect();
    realtime.close();
    expect(server.calls[0].url).toContain('deadbeef');
    expect(requests[0].url).toBe('https://rt.test/v3/realtime/events?linkedAccountId=conn_1');
    expect(responses[0].url).toBe(requests[0].url);
  });
});
