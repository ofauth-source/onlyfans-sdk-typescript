# Access contract checks

Supply a standard OAuth Bearer access token with `E2E_ACCESS_TOKEN`, the API origin with `E2E_ACCESS_BASE_URL`, and an explicitly selected account with `E2E_LINKED_ACCOUNT_ID`. The suite maps the generated Access catalog to SDK methods and exercises available GET operations. Set `E2E_CONTRACT_REQUIRED=1` to fail if credentials are absent, and `E2E_CONTRACT_STRICT=1` to fail on missing fixtures.

A missing credential skips the live suite. Offline manifest checks do not certify the issuer. For standard refresh, install a packed SDK in a clean consumer and run `e2e/standard-oauth-consumer.mjs` as described in the generator README.
