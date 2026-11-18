import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  OFAuthAPIError,
  OFAuthClient,
  OFAuthLink,
  OFAuthOAuthError,
  OPERATION_SCOPES,
  RECOVERY_ACTIONS,
  missingScopes,
  scopeFor,
  scopesFor,
  type RequestHookInfo,
  type ResponseHookInfo,
} from '../src/index';
import { apiError, json, mockFetch } from './helpers';

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

describe('hooks and debug logging', () => {
  it('calls onRequest and onResponse for each attempt with a redacted authorization header', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    const requests: RequestHookInfo[] = [];
    const responses: ResponseHookInfo[] = [];
    const { fetch } = mockFetch(apiError(503, 'transient_provider_failure', { 'x-request-id': 'req_a' }), json({ id: 1 }, 200, { 'x-request-id': 'req_b' }));
    const client = new OFAuthClient({
      accessToken: 'secret-token',
      linkedAccountId: 'conn_1',
      fetch,
      onRequest: (info) => requests.push(info),
      onResponse: (info) => responses.push(info),
    });
    await client.access.profile.get();

    expect(requests.map((r) => r.attempt)).toEqual([1, 2]);
    expect(requests[0]).toMatchObject({
      method: 'GET',
      url: 'https://api.ofauth.com/v3/access/profile',
      operation: 'access.profile.get',
    });
    expect(requests[0].headers.authorization).toBe('[redacted]');
    expect(requests[0].headers['x-linked-account-id']).toBe('conn_1');
    expect(JSON.stringify(requests)).not.toContain('secret-token');
    expect(responses.map((r) => [r.status, r.requestId, r.attempt])).toEqual([
      [503, 'req_a', 1],
      [200, 'req_b', 2],
    ]);
    expect(responses[0].durationMs).toBeGreaterThanOrEqual(0);
  });

  it('ignores hooks that throw', async () => {
    const { fetch } = mockFetch(json({ id: 1 }));
    const client = new OFAuthClient({
      accessToken: 'tok',
      linkedAccountId: 'conn_1',
      fetch,
      onRequest: () => {
        throw new Error('boom');
      },
      onResponse: () => {
        throw new Error('boom');
      },
    });
    await expect(client.access.profile.get()).resolves.toEqual({ id: 1 });
  });

  it('logs one line per attempt and retry notices, without tokens', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    const lines: string[] = [];
    const { fetch } = mockFetch(apiError(503, 'transient_provider_failure'), json({ id: 1 }, 200, { 'x-request-id': 'req_abc' }));
    const client = new OFAuthClient({ accessToken: 'secret-token', linkedAccountId: 'conn_1', fetch, debug: (l) => lines.push(l) });
    await client.access.profile.get();
    expect(lines).toHaveLength(3);
    expect(lines[0]).toMatch(/^\[ofauth\] GET \/v3\/access\/profile -> 503 \(\d+ms, req_503\)$/);
    expect(lines[1]).toMatch(/^\[ofauth\] retrying GET \/v3\/access\/profile in 0\.0s \(retry 1\/2, 503 transient_provider_failure\)$/);
    expect(lines[2]).toMatch(/^\[ofauth\] GET \/v3\/access\/profile -> 200 \(\d+ms, req_abc\)$/);
    expect(lines.join('\n')).not.toContain('secret-token');
  });

  it('logs with console.debug when debug is true or OFAUTH_DEBUG=1', async () => {
    const spy = vi.spyOn(console, 'debug').mockImplementation(() => {});
    const { fetch } = mockFetch(json({ id: 1 }));
    await new OFAuthClient({ accessToken: 'tok', linkedAccountId: 'conn_1', fetch, debug: true }).access.profile.get();
    expect(spy).toHaveBeenCalledTimes(1);

    vi.stubEnv('OFAUTH_DEBUG', '1');
    await new OFAuthClient({ accessToken: 'tok', linkedAccountId: 'conn_1', fetch }).access.profile.get();
    expect(spy).toHaveBeenCalledTimes(2);
    await new OFAuthClient({ accessToken: 'tok', linkedAccountId: 'conn_1', fetch, debug: false }).access.profile.get();
    expect(spy).toHaveBeenCalledTimes(2);
  });
});

describe('scopes', () => {
  it('maps every operation to its scope', () => {
    expect(OPERATION_SCOPES['access.chats.messages.send']).toBe('messages:write');
    expect(OPERATION_SCOPES['linkedAccounts.list']).toBeNull();
    expect(scopeFor('access.profile.get')).toBe('profile:read');
    expect(scopeFor('nope')).toBeUndefined();
  });

  it('returns sorted, de-duplicated scopes', () => {
    expect(scopesFor('access.chats.messages.send', 'access.chats.messages.list', 'access.chats.messages.send')).toEqual([
      'messages:read',
      'messages:write',
    ]);
    expect(scopesFor('linkedAccounts.list')).toEqual([]);
  });

  it('rejects unknown operation names', () => {
    expect(() => scopesFor('access.nope' as any)).toThrow(/Unknown operation "access.nope"/);
  });

  it('merges operation scopes into the authorization URL', async () => {
    const link = new OFAuthLink({ clientId: 'ofext_test_a', redirectUri: 'https://app/cb' });
    const { url } = await link.createAuthorizationUrl({
      scopes: ['messages:read'],
      operations: ['access.chats.messages.send', 'access.chats.messages.list'],
    });
    expect(new URL(url).searchParams.get('scope')).toBe('messages:read messages:write');
    await expect(link.createAuthorizationUrl({ operations: ['linkedAccounts.list'] })).rejects.toThrow(/scopes or operations/);
  });

  it('tags API errors with the operation and its scope, and reports missing scopes', async () => {
    const { fetch } = mockFetch(apiError(403, 'missing_scope', {}, 'request_additional_consent'));
    const client = new OFAuthClient({ accessToken: 'tok', linkedAccountId: 'conn_1', fetch });
    const error = (await client.access.chats.messages.send({ userId: 1, body: {} }).catch((e) => e)) as OFAuthAPIError;
    expect(error.operation).toBe('access.chats.messages.send');
    expect(error.requiredScope).toBe('messages:write');
    expect(error.message).toContain('access.chats.messages.send');
    expect(missingScopes(error)).toEqual(['messages:write']);

    const other = new OFAuthAPIError(403, { error: 'additional_consent_required' }, new Headers(), { requiredScope: 'vault:read' });
    expect(missingScopes(other)).toEqual(['vault:read']);
    expect(missingScopes(new OFAuthAPIError(404, { error: 'not_found' }, new Headers(), { requiredScope: 'vault:read' }))).toEqual([]);
    expect(missingScopes(new Error('x'))).toEqual([]);
  });

  it('leaves requiredScope unset for unscoped operations', async () => {
    const { fetch } = mockFetch(apiError(404, 'not_found'));
    const client = new OFAuthClient({ accessToken: 'tok', fetch });
    const error = (await client.linkedAccounts.get({ id: 'conn_x' }).catch((e) => e)) as OFAuthAPIError;
    expect(error.operation).toBe('linkedAccounts.get');
    expect(error.requiredScope).toBeUndefined();
  });
});

describe('error shortcuts', () => {
  const error = (status: number, action?: string) =>
    new OFAuthAPIError(status, { error: 'x', ...(action ? { recovery: { action } } : {}) }, new Headers());

  it('lists every recovery action', () => {
    expect(RECOVERY_ACTIONS).toHaveLength(19);
  });

  it('classifies recovery actions', () => {
    expect(error(400, 'retry').isRetryable).toBe(true);
    expect(error(429, 'retry_after_reset').isRetryable).toBe(true);
    expect(error(504).isRetryable).toBe(true);
    expect(error(400, 'check_request').isRetryable).toBe(false);

    expect(error(401, 'obtain_external_oauth_token').needsTokenRefresh).toBe(true);
    for (const action of ['restart_authorization', 'request_additional_consent', 'grant_linked_account']) {
      expect(error(403, action).needsReauthorization).toBe(true);
    }
    expect(error(403, 'reconnect_linked_account').needsReauthorization).toBe(false);
    expect(error(403, 'reconnect_linked_account').needsReconnect).toBe(true);
    for (const action of ['complete_integration_approval', 'update_developer_plan', 'contact_integration_owner', 'enable_vault_plus']) {
      expect(error(403, action).isIntegrationProblem).toBe(true);
    }
    expect(error(403, 'enable_linked_account_vault_plus').isIntegrationProblem).toBe(false);
    expect(error(403, 'some_future_action').recoveryAction).toBe('some_future_action');
  });

  it('parses RuntimeError bodies', () => {
    const e = new OFAuthAPIError(
      403,
      { error: 'missing_scope', message: 'needs vault:read', recovery: { action: 'request_additional_consent' }, requestId: 'req_1' },
      new Headers(),
    );
    expect(e.code).toBe('missing_scope');
    expect(e.recoveryAction).toBe('request_additional_consent');
    expect(e.requestId).toBe('req_1');
    expect(e.message).toBe('missing_scope: needs vault:read');
    expect(e.issues).toBeUndefined();
    expect(e.errorType).toBeUndefined();
    expect(e.needsReauthorization).toBe(true);
  });

  it('parses RequestValidationError bodies', () => {
    const body = {
      success: false,
      error: {
        name: 'ZodError',
        issues: [
          { code: 'too_big', path: ['limit'], message: 'Number must be less than or equal to 100' },
          { code: 'invalid_type', path: ['body', 'items', 0], message: 'Required' },
        ],
      },
    };
    const e = new OFAuthAPIError(400, body, new Headers({ 'x-request-id': 'req_2' }));
    expect(e.code).toBe('invalid_request');
    expect(e.recoveryAction).toBe('check_request');
    expect(e.message).toBe('invalid_request: limit: Number must be less than or equal to 100; body.items.0: Required');
    expect(e.issues).toEqual(body.error.issues);
    expect(e.requestId).toBe('req_2');
    expect(e.body).toBe(body);
    expect(e.isRetryable).toBe(false);
  });

  it('parses AccessHandlerError bodies', () => {
    const body = { error: 'Upload not found', type: 'RESOURCE_NOT_FOUND', requestId: 'req_3', success: false };
    const e = new OFAuthAPIError(404, body, new Headers());
    expect(e.code).toBe('resource_not_found');
    expect(e.errorType).toBe('RESOURCE_NOT_FOUND');
    expect(e.message).toBe('resource_not_found: Upload not found');
    expect(e.recoveryAction).toBeUndefined();
    expect(e.requestId).toBe('req_3');
    expect(e.issues).toBeUndefined();
    expect(new OFAuthAPIError(502, { error: 'Upstream failed', type: 'PROXY_ERROR' }, new Headers()).isRetryable).toBe(true);
  });

  it('flags invalid_grant OAuth errors for re-authorization', () => {
    expect(new OFAuthOAuthError(400, { error: 'invalid_grant' }, new Headers()).needsReauthorization).toBe(true);
    expect(new OFAuthOAuthError(401, { error: 'invalid_client' }, new Headers()).needsReauthorization).toBe(false);
  });
});
