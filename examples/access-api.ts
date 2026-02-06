/**
 * Access API Example
 * 
 * Demonstrates:
 * - Getting creator profile
 * - Listing posts
 * - Getting earnings data
 * - Listing subscribers
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
    throw new Error('OFAUTH_CONNECTION_ID environment variable is required for access API examples');
  }

  // Initialize client with default connection ID
  const client = createOFAuthClient({ 
    apiKey,
    connectionId,
    basePath: process.env.OFAUTH_BASE_URL,
  });

  console.log('🔑 OFAuth SDK - Access API Example\n');
  console.log(`Using connection: ${connectionId}\n`);

  // 1. Get creator profile
  console.log('1. Getting creator profile...');
  const profile = await client.access.self.get({ connectionId });
  
  // Handle both response types (full profile vs auth status only)
  if ('username' in profile) {
    console.log(`   ✓ Username: @${profile.username}`);
    console.log(`   ✓ Name: ${profile.name || 'N/A'}`);
    console.log(`   ✓ User ID: ${profile.id}`);
  } else {
    console.log(`   ✓ Auth status: ${profile.isAuth ? 'Authenticated' : 'Not authenticated'}`);
  }
  console.log();

  // 2. List posts
  console.log('2. Listing recent posts...');
  const posts = await client.access.listPosts({ connectionId, limit: 5 });
  console.log(`   ✓ Found ${posts.list.length} posts`);
  
  for (const post of posts.list) {
    const preview = post.text ? post.text.substring(0, 50) : '[No text]';
    console.log(`   - Post ${post.id}: ${preview}${post.text && post.text.length > 50 ? '...' : ''}`);
  }
  console.log();

  // 3. Get earnings data (last 30 days)
  console.log('3. Getting earnings data...');
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  
  const earnings = await client.access.earnings.getChart({
    connectionId,
    startDate: thirtyDaysAgo.toISOString().split('T')[0],
    endDate: now.toISOString().split('T')[0],
  });
  
  console.log(`   ✓ Chart data points: ${earnings.chart?.length ?? 0}`);
  console.log(`   ✓ Total: $${((earnings.total ?? 0) / 100).toFixed(2)}`);
  if (earnings.gross) {
    console.log(`   ✓ Gross: $${(earnings.gross / 100).toFixed(2)}`);
  }
  console.log();

  // 4. List subscribers (first page)
  console.log('4. Listing subscribers...');
  const subscribers = await client.access.subscribers.list({ 
    connectionId,
    limit: 10,
    type: 'active',
  });
  console.log(`   ✓ Found ${subscribers.list.length} active subscribers (showing first page)`);
  console.log(`   ✓ Has more: ${subscribers.hasMore ? 'Yes' : 'No'}`);
  console.log();

  // 5. Get subscription counts
  console.log('5. Getting subscription counts...');
  const counts = await client.access.subscriptions.getCount({ connectionId });
  console.log(`   ✓ Active subscriptions: ${counts.subscriptions?.active || 0}`);
  console.log(`   ✓ Active subscribers: ${counts.subscribers?.active || 0}`);
  console.log();

  console.log('✅ Example completed successfully!');
}

main().catch((error) => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});
