import { createRateLimiter } from './rateLimiter';
import { fillRouteParams } from './routes';

export type AccessEndpointSpec = {
  method: string;
  route: string;
  tag?: string;
  summary?: string;
};

export type SdkContractContext = {
  name: string;
  baseUrl: string;
  apiKey: string;
  connectionId: string;
  minDelayMs: number;
  strict: boolean;
  fixtures?: Record<string, string>;
  /**
   * When true, the mutation contract runner may fetch real IDs using GET calls
   * to build valid routes. Keep this false in CI unless you are okay with side effects.
   */
  allowSideEffects?: boolean;
};

type RequestConfig = {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  query?: Record<string, any>;
  body?: any;
  headers?: Record<string, string>;
  connectionId?: string;
};

export type RequestFn = (config: any, req: RequestConfig) => Promise<any>;

export type RunOptions = {
  requestFn?: RequestFn;
};

export type MutationLifecycleOptions = {
  requestFn?: RequestFn;
  includePosts?: boolean;
  includeUserLists?: boolean;
};

function ensureAccessPath(route: string): string {
  // Accept either `/analytics/...` (manifest style) or full `/v2/access/...`.
  const normalized = route.startsWith('/') ? route : `/${route}`;
  if (normalized.startsWith('/v2/access/')) return normalized;
  if (normalized === '/v2/access') return normalized;
  if (normalized.startsWith('/access/')) return `/v2${normalized}`;
  return `/v2/access${normalized}`;
}

function routeParamNames(routeTemplate: string): string[] {
  const names: string[] = [];
  const re = /:([A-Za-z0-9_]+)/g;
  for (;;) {
    const m = re.exec(routeTemplate);
    if (!m) break;
    names.push(m[1]!);
  }
  return names;
}

function isLikelyMalformedJson(text: string) {
  // Matches the production bug report: `"url":""""` (3+ quotes).
  return /"url"\s*:\s*"{3,}/.test(text);
}

function assertNotRawString(value: unknown) {
  if (typeof value !== 'string') return;
  if (isLikelyMalformedJson(value)) {
    throw new Error('SDK returned raw string containing malformed JSON (e.g. "url": """" )');
  }
  throw new Error('SDK returned a raw string response (expected parsed JSON object)');
}

function isOFAuthApiError(err: any): err is { status: number; response: Response } {
  return Boolean(err && typeof err === 'object' && typeof err.status === 'number' && err.response);
}

function defaultQueryForGetRoute(route: string, fixtures?: Record<string, string>): Record<string, any> | undefined {
  // Keep conservative: exercise JSON parsing on likely-200 routes.
  if (route === '/users/search') return { query: 'test' };

  if (route === '/users/list') {
    const userId = fixtures?.userId;
    if (!userId) return undefined;
    return { userIds: userId };
  }

  if (route.endsWith('/chart')) {
    return {
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      withTotal: true,
    };
  }

  if (route.endsWith('/top')) {
    return {
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      limit: 1,
      offset: 0,
    };
  }

  // Common list endpoints accept `limit` (and often `offset`).
  if (
    route === '/posts' ||
    route === '/subscribers' ||
    route === '/subscriptions' ||
    route === '/chats' ||
    route === '/analytics/mass-messages/sent' ||
    route === '/analytics/mass-messages/purchased' ||
    route === '/earnings/transactions' ||
    route === '/earnings/chargebacks' ||
    route === '/promotions' ||
    route === '/promotions/bundles' ||
    route === '/promotions/tracking-links' ||
    route === '/promotions/trial-links' ||
    route === '/users/blocked' ||
    route === '/users/restrict' ||
    route === '/users/lists' ||
    route === '/vault/media' ||
    route === '/vault/lists' ||
    route.endsWith('/notifications') ||
    route.endsWith('/release-forms') ||
    route.endsWith('/tagged-friend-users') ||
    route.endsWith('/users') ||
    route.endsWith('/buyers')
  ) {
    return { limit: 1 };
  }

  return undefined;
}

function fixtureKeyForRouteParam(route: string, paramName: string): string {
  if (paramName === 'userId' && route.startsWith('/chats/')) return 'chatUserId';
  if (paramName === 'listId' && route.startsWith('/vault/lists/')) return 'vaultListId';
  return paramName;
}

export async function runSdkGetContract(
  context: SdkContractContext,
  endpoints: AccessEndpointSpec[],
  options: RunOptions = {},
): Promise<{ attempted: number; skipped: number; attemptedRoutes: string[] }> {
  const limiter = createRateLimiter({ minDelayMs: context.minDelayMs });
  const fixtures: Record<string, string> = { ...(context.fixtures ?? {}) };

  const requestFn: RequestFn =
    options.requestFn ??
    (async (cfg, req) => {
      const sdk = await import('../src/runtime');
      return sdk.request(cfg, req);
    });

  const sdkConfig = {
    apiKey: context.apiKey,
    basePath: context.baseUrl,
    connectionId: context.connectionId,
  };

  async function sdkGet(path: string, query?: Record<string, any>) {
    return limiter.schedule(() =>
      requestFn(sdkConfig, {
        path,
        method: 'GET',
        query,
      }),
    );
  }

  async function ensureFixture(name: string): Promise<string | undefined> {
    if (fixtures[name]) return fixtures[name];

    if (name === 'userId') {
      const self: any = await sdkGet('/v2/access/self');
      assertNotRawString(self);
      const id = self?.id ?? self?.user?.id ?? self?.data?.id;
      if (id) fixtures[name] = String(id);
      return fixtures[name];
    }

    if (name === 'chatUserId') {
      const chats: any = await sdkGet('/v2/access/chats', { limit: 1 });
      assertNotRawString(chats);
      const first = chats?.list?.[0] ?? chats?.items?.[0];
      const id =
        first?.withUser?.id ??
        first?.user?.id ??
        first?.userId ??
        first?.withUserId ??
        first?.id;
      if (id) fixtures[name] = String(id);
      return fixtures[name];
    }

    if (name === 'postId') {
      const posts: any = await sdkGet('/v2/access/posts', { limit: 1 });
      assertNotRawString(posts);
      const first = posts?.list?.[0] ?? posts?.items?.[0];
      const id = first?.id ?? first?.postId;
      if (id) fixtures[name] = String(id);
      return fixtures[name];
    }

    if (name === 'subscriptionId') {
      const subs: any = await sdkGet('/v2/access/subscriptions', { limit: 1 });
      assertNotRawString(subs);
      const first = subs?.list?.[0] ?? subs?.items?.[0];
      const id = first?.id ?? first?.subscriptionId;
      if (id) fixtures[name] = String(id);
      return fixtures[name];
    }

    if (name === 'listId') {
      const lists: any = await sdkGet('/v2/access/users/lists', { limit: 1 });
      assertNotRawString(lists);
      const first = lists?.list?.[0] ?? lists?.items?.[0];
      const id = first?.id ?? first?.listId;
      if (id) fixtures[name] = String(id);
      return fixtures[name];
    }

    if (name === 'vaultListId') {
      const lists: any = await sdkGet('/v2/access/vault/lists', { limit: 1 });
      assertNotRawString(lists);
      const first = lists?.list?.[0] ?? lists?.items?.[0];
      const id = first?.id ?? first?.listId;
      if (id) fixtures[name] = String(id);
      return fixtures[name];
    }

    if (name === 'trackingLinkId') {
      const links: any = await sdkGet('/v2/access/promotions/tracking-links', { limit: 1 });
      assertNotRawString(links);
      const first = links?.list?.[0] ?? links?.items?.[0];
      const id = first?.id ?? first?.trackingLinkId;
      if (id) fixtures[name] = String(id);
      return fixtures[name];
    }

    if (name === 'trialLinkId') {
      const links: any = await sdkGet('/v2/access/promotions/trial-links', { limit: 1 });
      assertNotRawString(links);
      const first = links?.list?.[0] ?? links?.items?.[0];
      const id = first?.id ?? first?.trialLinkId;
      if (id) fixtures[name] = String(id);
      return fixtures[name];
    }

    if (name === 'promotionId') {
      const promos: any = await sdkGet('/v2/access/promotions', { limit: 1 });
      assertNotRawString(promos);
      const first = promos?.list?.[0] ?? promos?.items?.[0];
      const id = first?.id ?? first?.promotionId;
      if (id) fixtures[name] = String(id);
      return fixtures[name];
    }

    if (name === 'bundleId') {
      const bundles: any = await sdkGet('/v2/access/promotions/bundles', { limit: 1 });
      assertNotRawString(bundles);
      const first = bundles?.list?.[0] ?? bundles?.items?.[0];
      const id = first?.id ?? first?.bundleId;
      if (id) fixtures[name] = String(id);
      return fixtures[name];
    }

    if (name === 'massMessageId') {
      const msgs: any = await sdkGet('/v2/access/analytics/mass-messages/sent', { limit: 1 });
      assertNotRawString(msgs);
      const first = msgs?.list?.[0] ?? msgs?.items?.[0];
      const id = first?.id ?? first?.massMessageId;
      if (id) fixtures[name] = String(id);
      return fixtures[name];
    }

    return undefined;
  }

  let attempted = 0;
  let skipped = 0;
  const attemptedRoutes: string[] = [];

  for (const ep of endpoints) {
    if (ep.method.toLowerCase() !== 'get') continue;

    const paramsNeeded = routeParamNames(ep.route);
    const params: Record<string, string> = {};
    let canRun = true;

    for (const p of paramsNeeded) {
      const fixtureKey = fixtureKeyForRouteParam(ep.route, p);
      const v = await ensureFixture(fixtureKey);
      if (!v) {
        if (context.strict) {
          throw new Error(
            `[${context.name}] Missing fixture for route param :${p} (fixture=${fixtureKey}, route=${ep.route})`,
          );
        }
        canRun = false;
        break;
      }
      params[p] = v;
    }

    if (!canRun) {
      skipped++;
      continue;
    }

    const route = paramsNeeded.length ? fillRouteParams(ep.route, params) : ep.route;
    attempted++;
    attemptedRoutes.push(ep.route);

    try {
      const value = await sdkGet(ensureAccessPath(route), defaultQueryForGetRoute(ep.route, fixtures));
      assertNotRawString(value);
    } catch (e: unknown) {
      if (e instanceof SyntaxError) throw e;
      if (isOFAuthApiError(e)) {
        throw new Error(
          `[${context.name}] GET ${ensureAccessPath(route)} failed with HTTP ${e.status}`,
        );
      }
      throw e;
    }
  }

  return { attempted, skipped, attemptedRoutes };
}

export async function runSdkNonGetContract(
  context: SdkContractContext,
  endpoints: AccessEndpointSpec[],
  options: RunOptions = {},
): Promise<{ attempted: number; skipped: number }> {
  const limiter = createRateLimiter({ minDelayMs: context.minDelayMs });
  const fixtures: Record<string, string> = { ...(context.fixtures ?? {}) };

  const requestFn: RequestFn =
    options.requestFn ??
    (async (cfg, req) => {
      const sdk = await import('../src/runtime');
      return sdk.request(cfg, req);
    });

  const sdkConfig = {
    apiKey: context.apiKey,
    basePath: context.baseUrl,
    connectionId: context.connectionId,
  };

  async function sdkGet(path: string, query?: Record<string, any>) {
    return limiter.schedule(() =>
      requestFn(sdkConfig, {
        path,
        method: 'GET',
        query,
      }),
    );
  }

  async function sdkCall(method: RequestConfig['method'], path: string) {
    return limiter.schedule(() =>
      requestFn(sdkConfig, {
        path,
        method,
        body: {}, // intentionally minimal
      }),
    );
  }

  async function ensureFixture(name: string): Promise<string | undefined> {
    if (fixtures[name]) return fixtures[name];
    if (!context.allowSideEffects) return undefined;

    if (name === 'userId') {
      const self: any = await sdkGet('/v2/access/self');
      assertNotRawString(self);
      const id = self?.id ?? self?.user?.id ?? self?.data?.id;
      if (id) fixtures[name] = String(id);
      return fixtures[name];
    }

    if (name === 'postId') {
      const posts: any = await sdkGet('/v2/access/posts', { limit: 1 });
      assertNotRawString(posts);
      const first = posts?.list?.[0] ?? posts?.items?.[0];
      const id = first?.id ?? first?.postId;
      if (id) fixtures[name] = String(id);
      return fixtures[name];
    }

    if (name === 'massMessageId') {
      const msgs: any = await sdkGet('/v2/access/analytics/mass-messages/sent', { limit: 1 });
      assertNotRawString(msgs);
      const first = msgs?.list?.[0] ?? msgs?.items?.[0];
      const id = first?.id ?? first?.massMessageId;
      if (id) fixtures[name] = String(id);
      return fixtures[name];
    }

    if (name === 'subscriptionId') {
      const subs: any = await sdkGet('/v2/access/subscriptions', { limit: 1 });
      assertNotRawString(subs);
      const first = subs?.list?.[0] ?? subs?.items?.[0];
      const id = first?.id ?? first?.subscriptionId;
      if (id) fixtures[name] = String(id);
      return fixtures[name];
    }

    if (name === 'listId') {
      const lists: any = await sdkGet('/v2/access/users/lists', { limit: 1 });
      assertNotRawString(lists);
      const first = lists?.list?.[0] ?? lists?.items?.[0];
      const id = first?.id ?? first?.listId;
      if (id) fixtures[name] = String(id);
      return fixtures[name];
    }

    if (name === 'trackingLinkId') {
      const links: any = await sdkGet('/v2/access/promotions/tracking-links', { limit: 1 });
      assertNotRawString(links);
      const first = links?.list?.[0] ?? links?.items?.[0];
      const id = first?.id ?? first?.trackingLinkId;
      if (id) fixtures[name] = String(id);
      return fixtures[name];
    }

    if (name === 'trialLinkId') {
      const links: any = await sdkGet('/v2/access/promotions/trial-links', { limit: 1 });
      assertNotRawString(links);
      const first = links?.list?.[0] ?? links?.items?.[0];
      const id = first?.id ?? first?.trialLinkId;
      if (id) fixtures[name] = String(id);
      return fixtures[name];
    }

    if (name === 'promotionId') {
      const promos: any = await sdkGet('/v2/access/promotions', { limit: 1 });
      assertNotRawString(promos);
      const first = promos?.list?.[0] ?? promos?.items?.[0];
      const id = first?.id ?? first?.promotionId;
      if (id) fixtures[name] = String(id);
      return fixtures[name];
    }

    if (name === 'bundleId') {
      const bundles: any = await sdkGet('/v2/access/promotions/bundles', { limit: 1 });
      assertNotRawString(bundles);
      const first = bundles?.list?.[0] ?? bundles?.items?.[0];
      const id = first?.id ?? first?.bundleId;
      if (id) fixtures[name] = String(id);
      return fixtures[name];
    }

    // Remaining fixtures (messageId/mediaUploadId/partNumber etc.) are not safely derivable.
    return undefined;
  }

  async function routeParamValue(name: string): Promise<string> {
    // Prefer fetched/explicit fixtures; fall back to fake IDs to avoid side-effects.
    const v = await ensureFixture(name);
    if (v) return v;
    if (fixtures[name]) return fixtures[name];
    if (name === 'partNumber') return '1';
    return '-1';
  }

  let attempted = 0;
  let skipped = 0;

  for (const ep of endpoints) {
    const methodLower = ep.method.toLowerCase();
    if (methodLower === 'get') continue;

    const method = methodLower.toUpperCase() as RequestConfig['method'];
    const paramsNeeded = routeParamNames(ep.route);
    const params: Record<string, string> = {};
    for (const p of paramsNeeded) params[p] = await routeParamValue(p);

    const route = paramsNeeded.length ? fillRouteParams(ep.route, params) : ep.route;
    attempted++;

    try {
      const value = await sdkCall(method, ensureAccessPath(route));
      assertNotRawString(value);
    } catch (e: any) {
      if (e instanceof SyntaxError) throw e;
      if (isOFAuthApiError(e)) continue; // acceptable for coverage: permissions/validation/etc.
      throw e;
    }
  }

  return { attempted, skipped };
}

function extractId(value: any): string | undefined {
  if (!value || typeof value !== 'object') return undefined;
  return (
    (typeof value.id === 'string' ? value.id : undefined) ??
    (typeof value.postId === 'string' ? value.postId : undefined) ??
    (typeof value.listId === 'string' ? value.listId : undefined) ??
    (typeof value.data?.id === 'string' ? value.data.id : undefined) ??
    (typeof value.data?.postId === 'string' ? value.data.postId : undefined) ??
    (typeof value.data?.listId === 'string' ? value.data.listId : undefined)
  );
}

/**
 * Mutation lifecycle tests for side-effectful endpoints.
 *
 * This is intentionally opt-in via `context.allowSideEffects` because it can create/delete resources.
 */
export async function runSdkMutationLifecycleContract(
  context: SdkContractContext,
  options: MutationLifecycleOptions = {},
): Promise<{ attempted: number }> {
  if (!context.allowSideEffects) {
    if (context.strict) {
      throw new Error(`[${context.name}] Mutation lifecycles require allowSideEffects=true`);
    }
    return { attempted: 0 };
  }

  const limiter = createRateLimiter({ minDelayMs: context.minDelayMs });

  const requestFn: RequestFn =
    options.requestFn ??
    (async (cfg, req) => {
      const sdk = await import('../src/runtime');
      return sdk.request(cfg, req);
    });

  const sdkConfig = {
    apiKey: context.apiKey,
    basePath: context.baseUrl,
    connectionId: context.connectionId,
  };

  async function call<T = any>(req: RequestConfig): Promise<T> {
    return limiter.schedule(() => requestFn(sdkConfig, req));
  }

  const includePosts = options.includePosts ?? true;
  const includeUserLists = options.includeUserLists ?? true;

  let attempted = 0;

  // User lists lifecycle: create -> patch -> delete (safe-ish and works for fan + creator).
  if (includeUserLists) {
    const name = `sdk-contract-${Date.now()}`;

    const created = await call<any>({
      method: 'POST',
      path: '/v2/access/users/lists',
      body: { name },
    });
    assertNotRawString(created);
    const listId = extractId(created);
    if (!listId) throw new Error(`[${context.name}] Failed to extract listId from users/lists create response`);
    attempted++;

    const updated = await call<any>({
      method: 'PATCH',
      path: `/v2/access/users/lists/${encodeURIComponent(listId)}`,
      body: { name: `${name}-updated` },
    });
    assertNotRawString(updated);
    attempted++;

    const deleted = await call<any>({
      method: 'DELETE',
      path: `/v2/access/users/lists/${encodeURIComponent(listId)}`,
      body: {},
    });
    assertNotRawString(deleted);
    attempted++;
  }

  // Posts lifecycle: create -> update -> delete (creator-only in practice).
  if (includePosts) {
    const text = `sdk-contract-${Date.now()}`;

    const created = await call<any>({
      method: 'POST',
      path: '/v2/access/posts',
      body: { text },
    });
    assertNotRawString(created);
    const postId = extractId(created);
    if (!postId) throw new Error(`[${context.name}] Failed to extract postId from posts create response`);
    attempted++;

    const updated = await call<any>({
      method: 'PUT',
      path: `/v2/access/posts/${encodeURIComponent(postId)}`,
      body: { text: `${text}-updated` },
    });
    assertNotRawString(updated);
    attempted++;

    const deleted = await call<any>({
      method: 'DELETE',
      path: `/v2/access/posts/${encodeURIComponent(postId)}`,
      body: {},
    });
    assertNotRawString(deleted);
    attempted++;
  }

  return { attempted };
}
