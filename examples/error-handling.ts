/**
 * Error Handling Example
 * 
 * Demonstrates:
 * - Catching and handling API errors
 * - Accessing error details (status, code, message)
 * - Different types of errors (auth, not found, validation)
 */

import 'dotenv/config';
import { createOFAuthClient } from '@ofauth/sdk';

async function main() {
  const apiKey = process.env.OFAUTH_API_KEY;
  if (!apiKey) {
    throw new Error('OFAUTH_API_KEY environment variable is required');
  }

  const client = createOFAuthClient({ apiKey, basePath: process.env.OFAUTH_BASE_URL });

  console.log('🔑 OFAuth SDK - Error Handling Example\n');

  // 1. Invalid API key error
  console.log('1. Testing invalid API key error...');
  try {
    const badClient = createOFAuthClient({ apiKey: 'invalid_key', basePath: process.env.OFAUTH_BASE_URL });
    await badClient.account.whoami();
  } catch (error: any) {
    console.log(`   ✓ Caught error: ${error.message}`);
    if (error.status) {
      console.log(`   ✓ Status: ${error.status}`);
    }
    if (error.code) {
      console.log(`   ✓ Error code: ${error.code}`);
    }
  }
  console.log();

  // 2. Not found error
  console.log('2. Testing not found error...');
  try {
    await client.account.connections.getSettings({
      connectionId: 'conn_nonexistent',
    });
  } catch (error: any) {
    console.log(`   ✓ Caught error: ${error.message}`);
    console.log(`   ✓ Status: ${error.status || 'N/A'}`);
  }
  console.log();

  // 3. Successful request (no error)
  console.log('3. Testing successful request...');
  try {
    const account = await client.account.whoami();
    console.log(`   ✓ Success! Account ID: ${account.id}`);
  } catch (error: any) {
    console.log(`   ✗ Unexpected error: ${error.message}`);
  }
  console.log();

  // 4. Error handling best practices
  console.log('4. Error handling pattern example:');
  console.log(`
   try {
     const result = await client.someMethod();
     // Handle success
   } catch (error: any) {
     if (error.status === 401) {
       // Handle authentication error
       console.error('Invalid API key');
     } else if (error.status === 404) {
       // Handle not found
       console.error('Resource not found');
     } else if (error.status >= 500) {
       // Handle server error
       console.error('Server error, please retry');
     } else {
       // Handle other errors
       console.error('Error:', error.message);
     }
   }
  `);

  console.log('✅ Example completed successfully!');
}

main().catch((error) => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});
