/**
 * Receive webhook deliveries (lifecycle and Realtime events).
 *
 * Env: OFAUTH_WEBHOOK_SECRET (the destination's whsec_ secret)
 */
import 'dotenv/config';
import { createServer } from 'node:http';
import { WebhookRouter, isWebhookVerificationError } from '@ofauth/onlyfans-sdk';

const router = new WebhookRouter({ secret: process.env.OFAUTH_WEBHOOK_SECRET! })
  .on('authorization.granted', (event) => {
    console.log('new authorization', event.authorizationId, event.data);
  })
  .on('authorization.revoked', (event) => {
    console.log('delete stored refresh tokens for', event.authorizationId, event.data.reason);
  })
  .on('linked_account.expired', (event) => {
    console.log('pause operations for', event.linkedAccountId);
  })
  .on('realtime.chat_message.received', (event) => {
    console.log('message for', event.linkedAccountId, event.data);
  })
  .onDefault((event) => console.log('unhandled', event.type));

createServer(async (req, res) => {
  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(chunk as Buffer);
  try {
    // Verify the raw body before parsing it.
    const event = await router.handle(Buffer.concat(chunks), req.headers as Record<string, string>);
    if (event.test) console.log('(test delivery)');
    res.writeHead(200).end();
  } catch (error) {
    res.writeHead(isWebhookVerificationError(error) ? 401 : 500).end();
  }
}).listen(3001, () => console.log('Listening on :3001'));
