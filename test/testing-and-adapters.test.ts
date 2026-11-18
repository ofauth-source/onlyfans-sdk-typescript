import { describe, expect, it, vi } from 'vitest';
import { WebhookRouter, createFetchWebhookHandler, verifyWebhook } from '../src/index';
import { TEST_EVENT_TYPES, createTestEvent, generateWebhookSecret, sendTestWebhook, signWebhook, signWebhookRequest } from '../src/testing';
import { json, mockFetch } from './helpers';

describe('webhook testing helpers', () => {
  const secret = generateWebhookSecret();

  it('signs payloads that verify', async () => {
    const event = createTestEvent('authorization.revoked');
    const signed = await signWebhook(event, secret, { id: 'msg_1', timestamp: new Date() });
    const [body, headers] = signed;
    expect(body).toBe(JSON.stringify(event));
    expect(headers['webhook-id']).toBe('msg_1');
    expect(headers['webhook-signature']).toMatch(/^v1,[A-Za-z0-9+/]+=*$/);
    await expect(verifyWebhook(...signed, secret)).resolves.toEqual(event);
    await expect(verifyWebhook(...signed, generateWebhookSecret())).rejects.toMatchObject({ code: 'SIGNATURE_MISMATCH' });
  });

  it('signs with a custom timestamp', async () => {
    const [body, headers] = await signWebhook('{"x":1}', secret, { timestamp: Date.now() - 3600_000 });
    await expect(verifyWebhook(body, headers, secret)).rejects.toMatchObject({ code: 'TIMESTAMP_OUT_OF_TOLERANCE' });
  });

  it('builds a valid event for every type from the spec examples', () => {
    expect(TEST_EVENT_TYPES).toHaveLength(17);
    for (const type of TEST_EVENT_TYPES) {
      const event = createTestEvent(type);
      expect(event.type).toBe(type);
      expect(event.schemaVersion).toBe('1');
      expect(event.eventId).toMatch(/^evt_test_/);
      expect(event.data).toBeTypeOf('object');
    }
    expect(createTestEvent('realtime.chat_message.received').eventId).not.toBe(
      createTestEvent('realtime.chat_message.received').eventId,
    );
  });

  it('deep-merges overrides', () => {
    const base = createTestEvent('authorization.revoked');
    const event = createTestEvent('authorization.revoked', {
      eventId: 'evt_fixed',
      authorizationId: 'authz_1',
      data: { linked_account_ids: ['conn_a', 'conn_b'] },
    });
    expect(event.eventId).toBe('evt_fixed');
    expect(event.authorizationId).toBe('authz_1');
    expect((event.data as { linked_account_ids?: string[] }).linked_account_ids).toEqual(['conn_a', 'conn_b']);
    expect(event.data.reason).toBe(base.data.reason);
    expect(event.integrationId).toBe(base.integrationId);
  });

  it('runs a test event through a router in one call', async () => {
    const handler = vi.fn();
    const router = new WebhookRouter({ secret }).on('linked_account.expired', handler);
    const event = await sendTestWebhook(router, secret, 'linked_account.expired', { linkedAccountId: 'conn_9' });
    expect(handler).toHaveBeenCalledWith(event);
    expect(handler.mock.calls[0][0].linkedAccountId).toBe('conn_9');

    const handled = await router.handle(...(await signWebhook(createTestEvent('linked_account.expired'), secret)));
    expect(handled.type).toBe('linked_account.expired');
  });

  it('builds signed Requests for fetch handlers', async () => {
    const router = new WebhookRouter({ secret });
    const response = await createFetchWebhookHandler(router)(await signWebhookRequest(createTestEvent('realtime.post.published'), secret));
    expect(response.status).toBe(200);
  });
});
