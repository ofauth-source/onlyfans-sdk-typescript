import type { OFAuthClient } from '../src/client';

export type AccessEndpointSpec = {
  method: string;
  route: string;
  tag?: string;
  summary?: string;
  scope?: string;
  /** Canonical SDK path, e.g. `access.chats.messages.list`. */
  sdk: string;
};

/** The bound SDK method for a manifest entry, or undefined when it does not exist. */
export function resolveSdkMethod(
  client: OFAuthClient,
  sdkPath: string,
): ((params?: Record<string, unknown>) => Promise<unknown>) | undefined {
  const parts = sdkPath.split('.');
  const name = parts.pop()!;
  let target: any = client;
  for (const part of parts) {
    target = target?.[part];
    if (target === undefined) return undefined;
  }
  const fn = target?.[name];
  return typeof fn === 'function' ? fn.bind(target) : undefined;
}

/** Path parameter names in a manifest route, e.g. `/chats/{userId}/messages` -> `['userId']`. */
export function routeParams(route: string): string[] {
  return [...route.matchAll(/\{([A-Za-z0-9_]+)\}/g)].map((m) => m[1]!);
}
