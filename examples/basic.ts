/**
 * Basic Example - Account Operations
 * 
 * Demonstrates:
 * - Client initialization
 * - Whoami (account info)
 * - List connections
 * - Get connection settings
 */

import 'dotenv/config';
import { createOFAuthClient } from '@ofauth/sdk';

async function main() {
  // Get API key from environment
  const apiKey = process.env.OFAUTH_API_KEY;
  if (!apiKey) {
    throw new Error('OFAUTH_API_KEY environment variable is required');
  }

  // Initialize client
  const client = createOFAuthClient({ 
    apiKey,
    basePath: process.env.OFAUTH_BASE_URL,
  });

  console.log('🔑 OFAuth SDK - Basic Example\n');

  // 1. Get account information
  console.log('1. Getting account information...');
  const account = await client.account.whoami();
  console.log(`   ✓ Account ID: ${account.id}`);
  console.log(`   ✓ Organization: ${account.name || 'N/A'}`);
  console.log(`   ✓ Permissions: ${account.permissions.join(', ')}`);
  console.log();

  // 2. List all connections
  console.log('2. Listing connections...');
  const connections = await client.account.connections.list({});
  console.log(`   ✓ Found ${connections.list.length} connection(s)`);
  
  for (const conn of connections.list) {
    console.log(`   - ${conn.id}`);
    console.log(`     Status: ${conn.status}`);
    console.log(`     User: ${conn.userData.username} (ID: ${conn.userData.id})`);
    console.log(`     Imported: ${conn.imported ? 'Yes' : 'No'}`);
  }
  console.log();

  // 3. Get connection settings (if we have any connections)
  if (connections.list.length > 0) {
    const firstConnection = connections.list[0];
    console.log(`3. Getting settings for connection ${firstConnection.id}...`);
    
    const settings = await client.account.connections.getSettings({
      connectionId: firstConnection.id,
    });
    
    console.log(`   ✓ Vault cache enabled: ${settings.vaultCache?.enabled ? 'Yes' : 'No'}`);
    if (settings.vaultCache?.settingsOverrides) {
      console.log(`   ✓ Auto-cache vault: ${settings.vaultCache.settingsOverrides.autoCacheVault ? 'Yes' : 'No'}`);
    }
  }

  console.log('\n✅ Example completed successfully!');
}

main().catch((error) => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});
