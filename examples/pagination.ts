/**
 * Pagination Example
 * 
 * Demonstrates:
 * - Using async iterators for automatic pagination
 * - Manual pagination with hasMore/marker
 * - Limiting total items fetched
 */

import 'dotenv/config';
import { createOFAuthClient } from '@ofauth/sdk';

async function main() {
  const apiKey = process.env.OFAUTH_API_KEY;
  if (!apiKey) {
    throw new Error('OFAUTH_API_KEY environment variable is required');
  }

  const client = createOFAuthClient({ apiKey, basePath: process.env.OFAUTH_BASE_URL });

  console.log('🔑 OFAuth SDK - Pagination Example\n');

  // 1. Automatic pagination with async iterator
  console.log('1. Using async iterator (automatic pagination)...');
  console.log('   Fetching first 25 connections...\n');
  
  let count = 0;
  for await (const connection of client.account.connections.iterate({ maxItems: 25 })) {
    count++;
    console.log(`   ${count}. ${connection.id} - ${connection.userData.username} (${connection.status})`);
  }
  console.log(`\n   ✓ Fetched ${count} connections total\n`);

  // 2. Manual pagination
  console.log('2. Manual pagination with offset...');
  
  let page = 1;
  let hasMore = true;
  let offset = 0;
  let totalFetched = 0;

  while (hasMore && page <= 3) {
    console.log(`\n   Fetching page ${page}...`);
    
    const result = await client.account.connections.list({
      limit: 10,
      offset,
    });
    
    console.log(`   ✓ Got ${result.list.length} connections`);
    totalFetched += result.list.length;
    
    hasMore = result.hasMore;
    offset = result.hasMore ? offset + 10 : undefined;
    page++;
  }
  
  console.log(`\n   ✓ Total fetched across ${page - 1} pages: ${totalFetched} connections\n`);

  // 3. Using pageSize option with iterator
  console.log('3. Custom page size with iterator...');
  console.log('   Using pageSize=5, maxItems=15\n');
  
  count = 0;
  let pagesFetched = 0;
  
  for await (const connection of client.account.connections.iterate({ 
    maxItems: 15,
    pageSize: 5,
  })) {
    count++;
    if (count % 5 === 1) {
      pagesFetched++;
      console.log(`   Page ${pagesFetched}:`);
    }
    console.log(`     - ${connection.userData.username}`);
  }
  
  console.log(`\n   ✓ Fetched ${count} items across ~${pagesFetched} pages\n`);

  console.log('✅ Example completed successfully!');
}

main().catch((error) => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});
