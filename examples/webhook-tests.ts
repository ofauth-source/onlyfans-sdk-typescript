/**
 * Test webhook handlers without OFAuth: build typed events from the spec examples, sign them,
 * and run them through your router. Works the same inside vitest/jest.
 *
 * No env needed: `npm run webhook-tests`
 */
import assert from 'node:assert/strict';
import { WebhookRouter, createFetchWebhookHandler } from '@ofauth/onlyfans-sdk';
import {
  createTestEvent,
  generateWebhookSecret,
  sendTestWebhook,
  signWebhook,
  signWebhookRequest,
} from '@ofauth/onlyfans-sdk/testing';

const secret = generateWebhookSecret();
const revoked: string[] = [];
const router = new WebhookRouter({ secret }).on('authorization.revoked', (event) => {
  revoked.push(event.authorizationId);
});

// 1. One call: create, sign, and dispatch.
await sendTestWebhook(router, secret, 'authorization.revoked', { authorizationId: 'authz_1' });

// 2. Or step by step, with full control over the event and signature.
const event = createTestEvent('authorization.revoked', { authorizationId: 'authz_2', data: { reason: 'owner_revoked' } });
await router.handle(...(await signWebhook(event, secret)));

// 3. Fetch-style handlers (Workers, Next.js) take a signed Request.
const handler = createFetchWebhookHandler(router);
const ok = await handler(await signWebhookRequest(createTestEvent('authorization.revoked', { authorizationId: 'authz_3' }), secret));
const forged = await handler(await signWebhookRequest(createTestEvent('authorization.revoked'), generateWebhookSecret()));

assert.deepEqual(revoked, ['authz_1', 'authz_2', 'authz_3']);
assert.equal(ok.status, 200);
assert.equal(forged.status, 401);
console.log('webhook handler tests passed');
