/**
 * Calls every V3 Access GET operation through the SDK against a real
 * authorization. Skipped unless E2E_ACCESS_TOKEN and E2E_LINKED_ACCOUNT_ID are set.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { OFAuthClient } from '../src/client';
import { OFAuthAPIError } from '../src/runtime';
import { OFAuthLink } from '../src/link';
import { createRateLimiter } from './rateLimiter';
import { resolveSdkMethod, routeParams, type AccessEndpointSpec } from './sdkResolve';

const env = process.env;
const flag = (name: string) => ['1', 'true'].includes((env[name] ?? '').toLowerCase());

const BASE_URL = env.E2E_ACCESS_BASE_URL || 'https://api.ofauth.com';
const ACCESS_TOKEN = env.E2E_ACCESS_TOKEN ?? '';
const LINKED_ACCOUNT_ID = env.E2E_LINKED_ACCOUNT_ID ?? '';
const REQUIRED = flag('E2E_CONTRACT_REQUIRED');
const STRICT = flag('E2E_CONTRACT_STRICT');
const MIN_DELAY_MS = Number(env.E2E_MIN_DELAY_MS ?? 250);

// Errors that mean "this authorization cannot exercise the operation", not "the SDK is broken".
const SKIPPABLE = new Set([
  'missing_scope',
  'additional_consent_required',
  'provider_resource_not_found',
  'provider_request_rejected',
  'subscription_required',
  'vault_plus_disabled',
  'linked_account_vault_plus_disabled',
]);

const manifest = JSON.parse(
  readFileSync(resolve(__dirname, 'accessEndpoints.manifest.json'), 'utf8'),
) as AccessEndpointSpec[];

/** Path params come from E2E_FIXTURE_<PARAM_NAME>, e.g. E2E_FIXTURE_USER_ID. */
function fixture(param: string): string | undefined {
  return env[`E2E_FIXTURE_${param.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase()}`];
}

const configured = Boolean(ACCESS_TOKEN && LINKED_ACCOUNT_ID);

describe.skipIf(!configured && !REQUIRED)('V3 Access GET contract', () => {
  it('has credentials', () => {
    expect(configured, 'set E2E_LINKED_ACCOUNT_ID and E2E_ACCESS_TOKEN').toBe(true);
  });

  it.runIf(configured)(
    'every GET operation succeeds or is explicitly skippable',
    async () => {
      const client = new OFAuthClient({ accessToken: ACCESS_TOKEN, linkedAccountId: LINKED_ACCOUNT_ID, baseUrl: BASE_URL });
      const limiter = createRateLimiter({ minDelayMs: MIN_DELAY_MS });
      const failures: string[] = [];
      const skipped: string[] = [];

      for (const entry of manifest.filter((e) => e.method === 'get')) {
        const method = resolveSdkMethod(client, entry.sdk);
        if (!method) {
          failures.push(`${entry.route}: SDK method ${entry.sdk} missing`);
          continue;
        }
        const params: Record<string, unknown> = {};
        const missing = routeParams(entry.route).filter((name) => {
          const value = fixture(name);
          if (value !== undefined) params[name] = value;
          return value === undefined;
        });
        if (missing.length) {
          skipped.push(`${entry.route}: no fixture for ${missing.join(', ')}`);
          continue;
        }

        try {
          const result = await limiter.schedule(() => method(params));
          if (typeof result === 'string') failures.push(`${entry.route}: returned a raw string, expected JSON`);
        } catch (error) {
          if (error instanceof OFAuthAPIError && SKIPPABLE.has(error.code)) {
            skipped.push(`${entry.route}: ${error.code}`);
          } else {
            failures.push(`${entry.route}: ${error instanceof Error ? error.message : String(error)}`);
          }
        }
      }

      if (skipped.length) console.warn(`Skipped ${skipped.length} operations:\n  ${skipped.join('\n  ')}`);
      expect(failures).toEqual([]);
      if (STRICT) expect(skipped).toEqual([]);
    },
    30 * 60 * 1000,
  );
});
