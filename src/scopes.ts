/* eslint-disable */
/**
 * Scope helpers: which OAuth scopes an integration needs for the operations it calls.
 */

import { OFAuthAPIError, OFAuthError } from './runtime';
import { OPERATION_SCOPES } from './operations';
import type { OperationName } from './operations';
import type { Scope } from './models';

/**
 * The sorted, de-duplicated scopes needed to call the given operations.
 * Operations without a scope (linked accounts, Vault+) add nothing.
 * Throws {@link OFAuthError} for an unknown operation name.
 *
 * @example
 * ```ts
 * scopesFor('access.chats.messages.send', 'access.chats.list')
 * // ['messages:read', 'messages:write']
 * ```
 */
export function scopesFor(...operations: OperationName[]): Scope[] {
  const scopes = new Set<Scope>();
  for (const operation of operations) {
    if (!Object.prototype.hasOwnProperty.call(OPERATION_SCOPES, operation)) {
      throw new OFAuthError(`Unknown operation "${operation}". Use the canonical name, e.g. "access.chats.messages.send".`);
    }
    const scope = OPERATION_SCOPES[operation as OperationName];
    if (scope) scopes.add(scope);
  }
  return [...scopes].sort();
}

/** The scope an operation needs, or undefined when it has none or the name is unknown. */
export function scopeFor(operation: OperationName | (string & {})): Scope | undefined {
  return (OPERATION_SCOPES as Record<string, Scope | null>)[operation] ?? undefined;
}

/**
 * The scopes to request again after a `missing_scope` or `additional_consent_required` error:
 * `[error.requiredScope]`. Empty for any other error.
 *
 * @example
 * ```ts
 * const missing = missingScopes(error)
 * if (missing.length) redirect((await link.createAuthorizationUrl({ scopes: [...granted, ...missing] })).url)
 * ```
 */
export function missingScopes(error: unknown): Scope[] {
  if (!(error instanceof OFAuthAPIError) || !error.requiredScope) return [];
  if (error.code !== 'missing_scope' && error.code !== 'additional_consent_required') return [];
  return [error.requiredScope as Scope];
}
