# OFAuth TypeScript SDK

Install `@ofauth/onlyfans-sdk` for Node.js 20 or later. The package provides typed Access, Vault+, linked-account and authorization operations, pagination, errors, uploads, webhook verification, and server Realtime.

```typescript
import { OFAuthClient, OFAuthLink } from '@ofauth/onlyfans-sdk';

const client = new OFAuthClient({
  accessToken: async () => currentAccessToken(),
  linkedAccountId: selectedAccountId,
});
const profile = await client.access.profile.get();

const link = new OFAuthLink({ clientId, clientSecret, redirectUri });
const pending = await link.createAuthorizationUrl({ scopes: ['profile:read'] });
// Save pending under your trusted user and session before redirecting to pending.url.
const callback = link.parseCallback(callbackUrl, pending.state);
const tokens = await link.exchangeCode({ code: callback.code, codeVerifier: pending.codeVerifier });
const renewed = await link.refresh({ refreshToken: tokens.refresh_token });
await link.revoke({ token: tokens.refresh_token, tokenTypeHint: 'refresh_token' });
```

For Better Auth, use stock Generic OAuth and obtain the access token through Better Auth's supported token API. The getter above delegates to that API. Webhook test helpers are exported from `@ofauth/onlyfans-sdk/testing`.

## Access tokens stay on your server

An access token lets anyone who holds it act as the linked account, so it must never reach client-side code. `new OFAuthClient(...)` (and `createOFAuthClient`, `request`, `uploadMedia`) throws an `OFAuthError` when it is given an access token, token function, or token provider in a browser: a page with `window` and `document`, or a web worker (`self` and `importScripts`). Node.js, Bun, Deno, Cloudflare Workers, Vercel Edge, and Next.js server code (server components, route handlers, server actions) are not browsers and are unaffected.

Instead:

- Call OFAuth from your server (an API route or server action your frontend calls) and send the browser only the data it needs.
- For Realtime in the browser, mint a stream URL on your server (`client.realtime.createStreamUrl()`) and open it with `connectRealtimeStream` from `@ofauth/onlyfans-sdk/realtime-browser` (see [Realtime](#realtime)).

If you understand the risk (for example, a test page run with jsdom or happy-dom, or a token you deliberately hand to that user), opt in explicitly:

```ts
const client = new OFAuthClient({ accessToken, linkedAccountId, dangerouslyAllowBrowser: true })
```

Everything that holds no access token keeps working in a browser: type imports, `OFAuthLink.createAuthorizationUrl` / `parseCallback`, `generatePkce`, `scopesFor`, webhook signature helpers, and the `/testing` helpers. Code exchange, refresh, and revoke need the client secret, so keep those on your server too.

## OAuth contract

Register a confidential backend client and an exact callback URL. Sandbox, Test, and Live use the same authorization code flow with S256 PKCE.

- Browser authorization: `https://link.ofauth.com/v3/authorize`.
- Token exchange and refresh: `POST https://api.ofauth.com/v3/link/token` with a form body.
- Revocation: `POST https://api.ofauth.com/v3/link/revoke` with form `token` and optional `token_type_hint`.
- Metadata: `https://api.ofauth.com/.well-known/oauth-authorization-server/v3/link`.
- Profile: `GET https://api.ofauth.com/v3/link/userinfo` with `identity:read`.

Code exchange always returns a refresh token. Access tokens are opaque Bearer secrets with a 900-second lifetime. Use the returned `expires_in`. Refresh echoes the same client-bound refresh token and extends its 90-day inactivity window. Independent processes can refresh concurrently and retry after a lost response.

The helper uses `client_secret_basic` by default and also supports `client_secret_post`. Each request uses one method. Keep client secrets and refresh tokens on your backend and send them only to OAuth endpoints.

Bind fresh state and the PKCE verifier to the initiating application user and session. Persist pending state in your application, expire it, and consume it once after validating the session. Callback helpers validate the expected state and issuer and reject duplicate parameters. A lost initial code response requires a new authorization attempt.

Your auth framework owns token persistence and renewal. Supply its current access token or token getter to the resource client. The SDK does not provide a second credential manager or database schema. Without a framework, store the standard token response in your database and call the small OAuth helper near expiry. Condition writes on a registration revision so an in-flight refresh cannot overwrite a replacement or recreate a deleted registration. Refresh concurrency does not require a distributed lock.

Discover accounts through `GET /v3/linked-accounts`, then select one explicitly. Token responses do not contain account lists. Client construction sends no requests. An account ID selects a resource; it does not grant authority.

Refresh-token revocation ends that credential and its access tokens. Access-token revocation ends only that bearer. `DELETE /v3/authorization` disconnects the entire authorization. Provider reconnect repairs one selected provider session through `POST /v3/linked-accounts/{id}/reconnect`; it does not renew OAuth or replay writes.

Resource errors distinguish invalid bearer, insufficient permission, account selection, provider reconnect, quota, and transient failure. Follow the error's recovery action. Authenticated requests reject redirects. When injecting a custom transport, preserve this redirect policy; in C#, configure `HttpClientHandler.AllowAutoRedirect = false`.

Developer calls use the application's Developer entitlement. Owners grant account access and do not need an Operator subscription. Operator uses its holder's allowance and cannot access Realtime or Vault+.

See [the public documentation](https://docs.ofauth.com) for consent, grants, guest connection, account linking, and release availability. This branch is coordinated with [OAuth foundation #1274](https://github.com/seb-lewis/ofauth-mono/issues/1274) and requires the matching issuer release.

## Linked accounts

Every Access and Vault+ call targets one linked account, sent as `x-linked-account-id`. Set a default on the client, override it per call, or bind a copy of the client:

```ts
await client.access.profile.get({ linkedAccountId: 'conn_other' })
const other = client.withLinkedAccount('conn_other')

for await (const account of client.linkedAccounts.iterate()) {
  console.log(account.id, account.username, account.status, account.scopes)
}
await client.linkedAccounts.settings.update({ id: 'conn_1', body: { vault_plus: { enabled: true } } })
await client.linkedAccounts.remove({ id: 'conn_1' })
```
## Operations

Operations are grouped by path: `client.access.<area>...<method>(params)`. Path and query parameters are fields of `params`, the JSON body is `params.body`, and each method's doc comment names its scope.

```ts
await client.access.posts.create({ body: { text: 'New post' } })
await client.access.users.search({ query: 'creator' })
await client.access.finances.earnings.transactions.list({ limit: 20 })
await client.vaultPlus.lists.sync({ listId: '123' })
```

Cursor-paginated operations have an `iterate*` companion that fetches pages as you go:

```ts
for await (const chat of client.access.chats.iterate({ limit: 20 }, { maxItems: 100 })) {
  console.log(chat.user.id)
}
```

Every operation also takes `{ signal, headers, maxRetries, timeout }` as a last argument.
## Hooks and debug logging

```ts
const client = new OFAuthClient({
  accessToken,
  onRequest: ({ method, url, headers, attempt, operation }) => {}, // credentials are redacted
  onResponse: ({ method, url, status, requestId, durationMs, attempt, error }) => {},
  debug: true, // or (line) => logger.debug(line)
})
// [ofauth] GET /v3/access/profile -> 200 (123ms, req_abc)
// [ofauth] retrying GET /v3/access/profile in 0.8s (retry 1/2, 503 transient_provider_failure)
```

Setting `OFAUTH_DEBUG=1` in the environment turns on `debug` (`debug: false` overrides it). Logs never include tokens, secrets, or bodies. Exceptions thrown by hooks are ignored.

Hooks never see credentials, so they are safe to log. Header names are lowercase, and `authorization`, `cookie`, `x-api-key`, `cf-access-client-secret`, and any header whose name contains `token`, `secret`, or `password` read `[redacted]`. `url` has the values of credential-like query parameters (`X-Amz-Signature` and other `X-Amz-*`, `token`, `sig`, `key`, ...) replaced by `REDACTED`; the request itself is sent unchanged.

Extra `headers` (client or per call) are merged case-insensitively and cannot set `authorization`: the SDK sends the bearer token from `accessToken`, and a request with a caller `Authorization` header throws `OFAuthError` before anything is sent.
## Errors

Access, Vault+, and linked-account failures throw `OFAuthAPIError`. Branch on `recoveryAction`, not on the HTTP status alone:

```ts
import { OFAuthAPIError } from '@ofauth/onlyfans-sdk'

try {
  await client.access.profile.get()
} catch (error) {
  if (!(error instanceof OFAuthAPIError)) throw error
  switch (error.recoveryAction) {
    case 'reconnect_linked_account': // the owner must reconnect the account
    case 'request_additional_consent': // authorize again with the missing scope
    case 'restart_authorization':
    case 'retry':
    case 'retry_after_reset': // wait error.retryAfter seconds
  }
  console.log(error.status, error.code, error.requestId)
}
```

Shortcuts on `OFAuthAPIError`:

| Property | True when |
| --- | --- |
| `isRetryable` | action `retry` / `retry_after_reset`, or status 429, 502, 503, 504 |
| `needsTokenRefresh` | action `obtain_external_oauth_token` |
| `needsReauthorization` | action `restart_authorization`, `request_additional_consent`, or `grant_linked_account` |
| `needsReconnect` | action `reconnect_linked_account` |
| `isIntegrationProblem` | action `complete_integration_approval`, `update_developer_plan`, `contact_integration_owner`, or `enable_vault_plus` |

Error bodies come in three documented shapes, all normalized onto `code`:

- `RuntimeError` (`{ error, recovery, requestId }`): `code` is `error`, `recoveryAction` is `recovery.action`.
- `RequestValidationError` (a query, path, or body parameter failed validation): `code` is `invalid_request`, `recoveryAction` is `check_request`, `issues` lists `{ code, path, message }`, and the message reads like `limit: Number must be less than or equal to 100`.
- `AccessHandlerError` (`{ error: "<message>", type: "RESOURCE_NOT_FOUND" }`, from some Access handlers such as uploads): `code` is the lower-cased `type` (`resource_not_found`), `errorType` keeps the raw class, the message is the `error` text, and `recoveryAction` is unset (the shortcuts fall back to the status).

The raw body is always on `error.body`.

Each error also has `operation` (e.g. `access.chats.messages.send`) and `requiredScope` (e.g. `messages:write`). `missingScopes(error)` returns `[error.requiredScope]` for `missing_scope` and `additional_consent_required`, so you can authorize again with exactly what is missing. `RecoveryAction` is the union of documented actions (unknown future actions stay plain strings). `OFAuthOAuthError` has `needsReauthorization` too (`invalid_grant`).

See [Errors](https://docs.ofauth.com/v3/errors) for every code and action.
## Webhooks

Deliveries use [Standard Webhooks](https://www.standardwebhooks.com) signatures. Verify the raw body, then route by `type`; handlers receive typed events.

```ts
import { WebhookRouter, createFetchWebhookHandler } from '@ofauth/onlyfans-sdk'

const router = new WebhookRouter({ secret: process.env.OFAUTH_WEBHOOK_SECRET! })
  .on('authorization.revoked', (event) => db.deleteTokens(event.authorizationId))
  .on('linked_account.expired', (event) => pause(event.linkedAccountId))
  .on('realtime.chat_message.received', (event) => handleMessage(event.data))

export default { fetch: createFetchWebhookHandler(router) } // Workers / Bun / Deno
```

Express: `app.post('/webhooks', express.raw({ type: 'application/json' }), createExpressWebhookMiddleware(router))`.
Or verify directly: `const event = await verifyWebhook(rawBody, headers, secret)`.

Deduplicate on `eventId` and apply events per `linkedAccountId` in `order`.

### Testing webhook handlers

`@ofauth/onlyfans-sdk/testing` builds valid events for all 17 types (from the API reference examples) and signs them like OFAuth does:

```ts
import { createTestEvent, generateWebhookSecret, sendTestWebhook, signWebhook, signWebhookRequest } from '@ofauth/onlyfans-sdk/testing'

const secret = generateWebhookSecret()
const router = new WebhookRouter({ secret }).on('authorization.revoked', onRevoked)

// One call: create, sign, dispatch
await sendTestWebhook(router, secret, 'authorization.revoked', { authorizationId: 'authz_1' })

// Or step by step. Overrides are deep-merged; eventId is fresh unless you set it.
const event = createTestEvent('linked_account.expired', { linkedAccountId: 'conn_1' })
await router.handle(...(await signWebhook(event, secret))) // [body, headers]
await createFetchWebhookHandler(router)(await signWebhookRequest(event, secret)) // fetch-style
```

`signWebhook(payload, secret, { id?, timestamp? })` returns `[body, headers]` with `webhook-id`, `webhook-timestamp`, and `webhook-signature: v1,...`.
## Realtime

Realtime events for one linked account arrive as Server-Sent Events from `GET /v3/realtime/events`. Event types and payloads are the `realtime.*` webhook events (`RealtimeEvent`, `RealtimeEventOf<'realtime.chat_message.received'>`), with `receivedAt` instead of `occurredAt` and without `authorizationId` / `externalOauthClientId`. Delivery is at least once; the SDK drops repeated `eventId`s.

### On your server

```ts
const realtime = client.realtime({ linkedAccountId: 'conn_1' })
realtime.on('realtime.chat_message.received', (event) => console.log(event.data))
realtime.onResync(() => refetchState()) // events were missed: reload what you show
realtime.onClose(({ reason, willReconnect }) => console.log(reason, willReconnect))
await realtime.connect()
```

`client.realtime()` streams over `fetch` with the client's access token (token function or provider included), `fetch`, extra `headers`, hooks, and `debug` setting. It parses the stream itself (no dependency), works in Node.js 20+, Bun, Deno, and Workers, and:

- reconnects with jittered exponential backoff (from the server's `retry:`, at least `Retry-After`, at most `maxReconnectDelayMs`, 30 s by default) and resumes with `Last-Event-ID` from the last event (start elsewhere with `lastEventId`);
- treats about 45 s without a byte, the 15 s heartbeat included, as a dead connection and reconnects (`heartbeatTimeoutMs`);
- on `reauth` or a 401, gets a fresh token (`forceRefresh: true`) and retries once, then stops;
- stops on `replaced` / 409 and on other refusals (400, 403, 406); reconnects after `unavailable`, 503, and 429.

`connect()` resolves when the stream opens and rejects when the first attempt fails (an `OFAuthAPIError` with `status` and `retryAfter`). `client.realtime()` is the only way to get a `RealtimeConnection`, and it always streams from the client's `baseUrl` origin, so a staging client never sends its token to production. Each attempt goes through `onRequest` / `onResponse` (status 200 when the stream opened; no status and an `error` when no response arrived; the `x-realtime-session-id` as `requestId`) and `debug`:

```
[ofauth] SSE /v3/realtime/events -> 200 (85ms, 6f1c…)
```

### In the browser

Your server mints a stream URL; the page opens it. The page never sees the access token: the URL carries a 10-minute stream credential that can only read this account's events.

```ts
// Server route, e.g. GET /api/realtime-url, for the signed-in user:
const { url, expiresAt } = await client.realtime.createStreamUrl({ linkedAccountId }) // POST /v3/realtime
```

```ts
import { connectRealtimeStream } from '@ofauth/onlyfans-sdk/realtime-browser'

const stream = connectRealtimeStream({ getStreamUrl: () => fetch('/api/realtime-url').then((r) => r.json()) })
stream.on('realtime.chat_message.received', (event) => showMessage(event.data))
```

`getStreamUrl` returns the URL or the whole `{ url, expiresAt }`. The client calls it on start, after `reauth` or a 401 (once; a second refusal stops), on `resume()`, and before reusing a URL that is about to expire. Reconnects after a drop, `unavailable`, 503, or 429 reuse the current URL: each URL allows one open stream, and its reconnect only replaces itself. It uses the native `EventSource` (a small fetch-based reader where there is none), sends no cookies, and refuses an access token in its options or in the URL; it never needs `dangerouslyAllowBrowser`.

**One stream per browser.** Tabs elect a leader with a Web Lock (`navigator.locks`); the leader holds the stream and `BroadcastChannel` fans events out, so every tab gets `on` / `onEvent` / `onResync` / `onOpen` / `onClose`. When the leader tab closes, another tab takes over with a new URL and resumes after the last event it saw. Without those APIs (or with `shareAcrossTabs: false`) each tab gets its own URL and stream. Pass `linkedAccountId` when a page streams more than one account. `stream.isLeader` and `stream.state` (`connecting`, `open`, `replaced`, `closed`) show where things are.

**Close reasons** (`onClose(({ reason, willReconnect }) => ...)`, on the server and in the browser):

| Reason | Cause | What the SDK does |
| --- | --- | --- |
| `reauth` | The URL expired (10 min), the token or authorization no longer holds, or a 401 | New token or URL, retried once; then stops |
| `replaced` | More than 10 streams for this account: the oldest is replaced, or 409 `stream_replaced` | Stops. Browser: `onReplaced`, in every tab |
| `unavailable` | A transient outage, 503 or 429 | Backs off and resumes |
| `dropped` / `heartbeat_timeout` | The connection ended or went silent | Resumes (the browser's `EventSource` does this itself) |
| `rejected` | 400, 403, 404, 406, or not an event stream | Stops |
| `client_closed` | You called `close()` | Stops |

`replaced` means another browser or device took the slot, so nothing reconnects by itself (that would only take the slot back and forth). Show something like "Realtime is open in another window" with a button:

```ts
stream.onReplaced(() => showBanner('Realtime is open in another window', { action: 'Use here', onClick: () => stream.resume() }))
```

## Uploads

```ts
const upload = await client.uploadMedia(fileBytes, { filename: 'photo.jpg', contentType: 'image/jpeg' })
const mediaItems = upload.status === 'uploaded' ? [upload.uploadId] : [upload.mediaId]
await client.access.posts.create({ body: { text: 'New photo', mediaItems } })
```

`uploadMedia` starts the upload, PUTs each part, and finalizes it. Files already in the vault are returned without uploading (`media` is the typed vault `MediaAsset`, `mediaId` its id). Pass `vaultUpload: { userId }` to save the upload to the vault: `finalize` is the typed `access.uploads.finalize` response and `vaultMediaIds` lists the vault media created, for example to hide them later:

```ts
const saved = await client.uploadMedia(fileBytes, { filename: 'photo.jpg', contentType: 'image/jpeg', vaultUpload: { userId: 'u1' } })
if (saved.status === 'uploaded') await client.access.vault.media.hide({ body: { mediaIds: saved.vaultMediaIds ?? [] } })
```
## API reference

Every export has doc comments, and each operation has a usage example. Build the HTML reference with `npm run docs` (TypeDoc, output in `docs/`).
