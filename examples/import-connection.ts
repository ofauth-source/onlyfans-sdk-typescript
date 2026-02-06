/**
 * Import Connection Example
 * 
 * Demonstrates:
 * - Importing an externally managed connection
 * - Updating imported connection session
 * - Listing imported connections
 */

import 'dotenv/config';
import { createOFAuthClient } from '@ofauth/sdk';

async function main() {
  const apiKey = process.env.OFAUTH_API_KEY;
  if (!apiKey) {
    throw new Error('OFAUTH_API_KEY environment variable is required');
  }

  const client = createOFAuthClient({ apiKey, basePath: process.env.OFAUTH_BASE_URL });

  console.log('🔑 OFAuth SDK - Import Connection Example\n');

  // Example session data (replace with actual values)
  const exampleCookie = 'sess=your_session; auth_id=12345; auth_uid_12345=xxx; fp=yyy';
  const exampleUserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';

  console.log('⚠️  This example requires valid OnlyFans session data.');
  console.log('    Update the cookie and userAgent variables with real values.\n');

  // Uncomment and update with real values to test:
  /*
  // 1. Import a new connection
  console.log('1. Importing connection...');
  const imported = await client.account.connections.createImport({
    body: {
      cookie: exampleCookie,
      userAgent: exampleUserAgent,
      permissions: ['profile:read', 'posts:read', 'messages:read'],
    },
  });
  
  console.log(`   ✓ Connection imported: ${imported.id}`);
  console.log(`   ✓ Status: ${imported.status}`);
  console.log(`   ✓ User: ${imported.userData.username} (ID: ${imported.userData.id})`);
  console.log();

  // 2. Update the imported connection's session (e.g., after token refresh)
  console.log('2. Updating imported connection session...');
  const updated = await client.account.connections.updateImport({
    connectionId: imported.id,
    body: {
      cookie: exampleCookie, // New session cookie
      userAgent: exampleUserAgent,
    },
  });
  
  console.log(`   ✓ Session updated for: ${updated.id}`);
  console.log(`   ✓ New status: ${updated.status}`);
  console.log();
  */

  // 3. List all connections and show imported ones
  console.log('3. Listing connections (showing imported flag)...');
  const connections = await client.account.connections.list({});
  
  const imported = connections.list.filter(c => c.imported);
  const managed = connections.list.filter(c => !c.imported);
  
  console.log(`   ✓ Total: ${connections.list.length} connections`);
  console.log(`   ✓ Imported: ${imported.length}`);
  console.log(`   ✓ Managed: ${managed.length}`);
  console.log();

  if (imported.length > 0) {
    console.log('   Imported connections:');
    for (const conn of imported) {
      console.log(`   - ${conn.id} (${conn.userData.username}) - ${conn.status}`);
    }
  }

  console.log('\n✅ Example completed!');
}

main().catch((error) => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});
