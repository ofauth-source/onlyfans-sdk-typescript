# SDK Contract Tests (Access API)

These tests run against real OFAuth connections (sandbox + live) to catch end-of-funnel regressions:
permissions, endpoint breakage, schema/response changes, and SDK parsing issues.

## Environment Variables

- `E2E_ACCESS_BASE_URL`: base URL for the Access API (e.g. `https://api.ofauth.com`)
- `E2E_CONTRACT_REQUIRED`: when `true`, missing creds fail the test run
- `E2E_CONTRACT_STRICT`: when `true`, the runner asserts `skipped === 0`
- `E2E_LIVE_MUTATION_LIFECYCLES`: when `true`, run create/update/delete lifecycle tests against live connections (default: off)

Per-context credentials:

- `E2E_SANDBOX_API_KEY_CREATOR`, `E2E_SANDBOX_CONNECTION_ID_CREATOR`
- `E2E_SANDBOX_API_KEY_FAN`, `E2E_SANDBOX_CONNECTION_ID_FAN`
- `E2E_LIVE_API_KEY_CREATOR`, `E2E_LIVE_CONNECTION_ID_CREATOR`
- `E2E_LIVE_API_KEY_FAN`, `E2E_LIVE_CONNECTION_ID_FAN`

Multi-account support:

- You can provide comma-separated values for `*_API_KEY_*` and `*_CONNECTION_ID_*` to run against multiple accounts per context.
  - Example: `E2E_LIVE_API_KEY_CREATOR="k1,k2"` and `E2E_LIVE_CONNECTION_ID_CREATOR="c1,c2"`

Optional fixtures (rarely needed for GET; non-GET tests intentionally avoid fixtures to reduce side-effects):

- `E2E_<CONTEXT>_FIXTURE_POST_ID`, `..._USER_ID`, `..._LIST_ID`, `..._SUBSCRIPTION_ID`, `..._TRACKING_LINK_ID`, `..._TRIAL_LINK_ID`, `..._PROMOTION_ID`, `..._BUNDLE_ID`, `..._MASS_MESSAGE_ID`

`<CONTEXT>` is one of:

- `SANDBOX_CREATOR`
- `SANDBOX_FAN`
- `LIVE_CREATOR`
- `LIVE_FAN`

## Rate Limiting

Live contexts enforce a minimum `2000ms` delay between requests in-code.
