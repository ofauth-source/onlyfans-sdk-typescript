/**
 * Stream Realtime events for one account, and upload media then send it.
 *
 * Env: OFAUTH_ACCESS_TOKEN, OFAUTH_LINKED_ACCOUNT_ID, OFAUTH_FAN_USER_ID, IMAGE_PATH
 */
import 'dotenv/config';
import { readFile } from 'node:fs/promises';
import { basename } from 'node:path';
import { OFAuthClient } from '@ofauth/onlyfans-sdk';

const client = new OFAuthClient({
  accessToken: process.env.OFAUTH_ACCESS_TOKEN!,
  linkedAccountId: process.env.OFAUTH_LINKED_ACCOUNT_ID,
});

// Realtime over Server-Sent Events (fetch streaming; reconnects and resumes by itself).
const realtime = client.realtime();
realtime.on('realtime.chat_message.received', (event) => console.log('message', event.data));
realtime.on('realtime.inbox_counts.updated', (event) => console.log('counts', event.data));
realtime.onResync(() => console.log('missed events: refetch state'));
realtime.onClose(({ reason, willReconnect }) => console.log('closed', reason, { willReconnect }));
await realtime.connect();

// Upload, then reference the upload in a message.
if (process.env.IMAGE_PATH && process.env.OFAUTH_FAN_USER_ID) {
  const upload = await client.uploadMedia(await readFile(process.env.IMAGE_PATH), {
    filename: basename(process.env.IMAGE_PATH),
    contentType: 'image/jpeg',
    onProgress: (sent, total) => console.log(`uploaded ${sent}/${total}`),
  });
  const mediaItems = upload.status === 'uploaded' ? [upload.uploadId] : [upload.mediaId];
  await client.access.chats.messages.send({
    userId: process.env.OFAUTH_FAN_USER_ID,
    body: { text: 'New photo', mediaItems },
  });
}
