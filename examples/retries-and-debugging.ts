/**
 * Retries, timeouts, request hooks, debug logging, and scope helpers.
 *
 * Env: OFAUTH_ACCESS_TOKEN, OFAUTH_LINKED_ACCOUNT_ID (set OFAUTH_DEBUG=1 to log every attempt)
 */
import 'dotenv/config';
import { OFAuthAPIError, OFAuthClient, OFAuthTimeoutError, missingScopes, scopesFor } from '@ofauth/onlyfans-sdk';

// The scopes to request for the operations this app calls.
console.log('request scopes:', scopesFor('access.profile.get', 'access.chats.messages.send'));

const client = new OFAuthClient({
  accessToken: process.env.OFAUTH_ACCESS_TOKEN!,
  linkedAccountId: process.env.OFAUTH_LINKED_ACCOUNT_ID,
  maxRetries: 3, // 429, 503 authorization_temporarily_unavailable, and 502/503/504 or network errors on GET/PUT/DELETE
  timeout: 20_000, // per attempt
  maxRetryDelay: 30_000, // longer Retry-After (e.g. quota_exhausted) throws instead of waiting
  onRequest: ({ method, url, attempt }) => console.log(`-> ${method} ${url} (attempt ${attempt})`),
  onResponse: ({ status, durationMs, requestId }) => console.log(`<- ${status} in ${durationMs}ms (${requestId})`),
  debug: (line) => console.log(line),
});

try {
  console.log(await client.access.profile.get());
  // Per-call overrides: no retries and a shorter timeout for this call.
  await client.access.chats.messages.list({ userId: 1, limit: 1 }, { maxRetries: 0, timeout: 5_000 });
} catch (error) {
  if (error instanceof OFAuthTimeoutError) {
    console.log(`timed out after ${error.attempts} attempts`);
  } else if (error instanceof OFAuthAPIError) {
    console.log(`${error.operation} failed with ${error.code} after ${error.attempts} attempts`);
    if (missingScopes(error).length) console.log('authorize again with', missingScopes(error));
    else if (error.needsReconnect) console.log('ask the owner to reconnect the account');
    else if (error.isRetryable) console.log(`retry after ${error.retryAfter ?? 'a moment'}s`);
    else if (error.isIntegrationProblem) console.log('fix the integration in the OFAuth dashboard');
  } else {
    throw error;
  }
}
