/**
 * Proxy Example
 * 
 * Demonstrates:
 * - Direct OnlyFans API calls via proxy
 * - GET requests
 * - POST requests with body
 * - Query parameters
 * 
 * Requires a connection ID via OFAUTH_CONNECTION_ID env var
 */

import 'dotenv/config';
import { createOFAuthClient } from '@ofauth/sdk';

async function main() {
  const apiKey = process.env.OFAUTH_API_KEY;
  const connectionId = process.env.OFAUTH_CONNECTION_ID;

  if (!apiKey) {
    throw new Error('OFAUTH_API_KEY environment variable is required');
  }
  if (!connectionId) {
    throw new Error('OFAUTH_CONNECTION_ID environment variable is required for proxy examples');
  }

  const client = createOFAuthClient({ apiKey, basePath: process.env.OFAUTH_BASE_URL });

  console.log('🔑 OFAuth SDK - Proxy Example\n');
  console.log(`Using connection: ${connectionId}\n`);

  // 1. GET request - Fetch user profile
  console.log('1. GET request - Fetching user profile...');
  const profile = await client.proxy({
    path: '/users/me',
    method: 'GET',
    connectionId,
  });
  
  console.log(`   ✓ Username: @${profile.username}`);
  console.log(`   ✓ Name: ${profile.name}`);
  console.log(`   ✓ Subscribers: ${profile.subscribersCount || 0}`);
  console.log();

  // 2. GET request with query parameters
  console.log('2. GET request with query params - Listing subscribers...');
  const subscribers = await client.proxy({
    path: '/subscriptions/subscribers',
    method: 'GET',
    connectionId,
    query: {
      limit: 5,
      offset: 0,
    },
  });
  
  console.log(`   ✓ Found ${subscribers.list?.length || 0} subscribers`);
  if (subscribers.list && subscribers.list.length > 0) {
    console.log(`   ✓ First subscriber: @${subscribers.list[0].username}`);
  }
  console.log();

  // 3. Example POST request structure (don't actually send)
  console.log('3. POST request example (structure only, not executed)...');
  console.log(`
   Example POST to create a post:
   
   await client.proxy({
     path: '/posts',
     method: 'POST',
     connectionId,
     body: {
       text: 'Hello from OFAuth SDK!',
       mediaIds: [],
       price: 0,
     },
   });
  `);

  console.log('✅ Example completed successfully!');
}

main().catch((error) => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});
