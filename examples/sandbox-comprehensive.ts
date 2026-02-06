import { createOFAuthClient } from '@ofauth/sdk';

const API_KEY = process.env.OFAUTH_API_KEY!;
const CONNECTION_ID = process.env.OFAUTH_CONNECTION_ID!;
const BASE_URL = process.env.OFAUTH_BASE_URL || 'https://api.ofauth.com';

if (!process.env.OFAUTH_API_KEY || !process.env.OFAUTH_CONNECTION_ID) {
  console.error('Missing required environment variables:');
  console.error('  OFAUTH_API_KEY - Your OFAuth API key');
  console.error('  OFAUTH_CONNECTION_ID - Your connection ID');
  console.error('  OFAUTH_BASE_URL - (optional) API base URL');
  process.exit(1);
}

interface TestResult {
  passed: number;
  failed: number;
  errors: Array<{ test: string; error: string }>;
}

const results: TestResult = { passed: 0, failed: 0, errors: [] };

function success(name: string, data?: any) {
  results.passed++;
  console.log(`  ✓ ${name}`);
  if (data) {
    if (data.id) console.log(`    → id: ${data.id}`);
    if (data.username) console.log(`    → username: ${data.username}`);
    if (data.name) console.log(`    → name: ${data.name}`);
    if (data.list) console.log(`    → list: [${data.list.length} items]`);
    if (typeof data.hasMore === 'boolean') console.log(`    → hasMore: ${data.hasMore}`);
  }
}

function fail(name: string, error: any) {
  results.failed++;
  const message = error?.message || String(error);
  results.errors.push({ test: name, error: message });
  console.log(`  ✗ ${name}: ${message}`);
}

async function testAccountAPI(client: ReturnType<typeof createOFAuthClient>) {
  console.log('\n📋 Account API');
  console.log('-'.repeat(40));

  try {
    const data = await client.account.whoami();
    success('whoami', data);
  } catch (e) { fail('whoami', e); }

  try {
    const data = await client.account.connections.list({});
    success('connections.list', data);
  } catch (e) { fail('connections.list', e); }

  try {
    const data = await client.account.connections.getSettings({ connectionId: CONNECTION_ID });
    success('connections.getSettings', data);
  } catch (e) { fail('connections.getSettings', e); }

  try {
    const data = await client.account.getSettings();
    success('getSettings (org)', data);
  } catch (e) { fail('getSettings (org)', e); }
}

async function testSelfAPI(client: ReturnType<typeof createOFAuthClient>) {
  console.log('\n👤 Self API');
  console.log('-'.repeat(40));

  try {
    const data = await client.access.self.get({ connectionId: CONNECTION_ID });
    success('self.get', data);
  } catch (e) { fail('self.get', e); }

  try {
    const data = await client.access.self.listNotifications({ connectionId: CONNECTION_ID, limit: 10 });
    success('self.listNotifications', data);
  } catch (e) { fail('self.listNotifications', e); }

  try {
    const data = await client.access.self.listReleaseForms({ connectionId: CONNECTION_ID, limit: 10 });
    success('self.listReleaseForms', data);
  } catch (e) { fail('self.listReleaseForms', e); }

  try {
    const data = await client.access.self.listTaggedFriendUsers({ connectionId: CONNECTION_ID, limit: 10 });
    success('self.listTaggedFriendUsers', data);
  } catch (e) { fail('self.listTaggedFriendUsers', e); }
}

async function testPostsAPI(client: ReturnType<typeof createOFAuthClient>) {
  console.log('\n📝 Posts API');
  console.log('-'.repeat(40));

  try {
    const data = await client.access.listPosts({ connectionId: CONNECTION_ID, limit: 10 });
    success('listPosts', data);

    if (data.list && data.list.length > 0) {
      const postId = String(data.list[0].id);
      try {
        const post = await client.access.getPosts({ connectionId: CONNECTION_ID, postId });
        success(`getPosts (id=${postId})`, post);
      } catch (e) { fail(`getPosts (id=${postId})`, e); }
    }
  } catch (e) { fail('listPosts', e); }
}

async function testMessagesAPI(client: ReturnType<typeof createOFAuthClient>) {
  console.log('\n💬 Messages API');
  console.log('-'.repeat(40));

  try {
    const data = await client.access.chats.list({ connectionId: CONNECTION_ID, limit: 10 });
    success('chats.list', data);
  } catch (e) { fail('chats.list', e); }

  try {
    const data = await client.access.listMassMessages({ connectionId: CONNECTION_ID, limit: 10 });
    success('listMassMessages', data);
  } catch (e) { fail('listMassMessages', e); }
}

async function testSubscribersAPI(client: ReturnType<typeof createOFAuthClient>) {
  console.log('\n👥 Subscribers API');
  console.log('-'.repeat(40));

  try {
    const data = await client.access.subscribers.list({ connectionId: CONNECTION_ID, type: 'all', limit: 10 });
    success('subscribers.list (all)', data);
  } catch (e) { fail('subscribers.list (all)', e); }

  try {
    const data = await client.access.subscribers.list({ connectionId: CONNECTION_ID, type: 'active', limit: 10 });
    success('subscribers.list (active)', data);
  } catch (e) { fail('subscribers.list (active)', e); }
}

async function testSubscriptionsAPI(client: ReturnType<typeof createOFAuthClient>) {
  console.log('\n📊 Subscriptions API');
  console.log('-'.repeat(40));

  try {
    const data = await client.access.subscriptions.getCount({ connectionId: CONNECTION_ID });
    success('subscriptions.getCount', data);
  } catch (e) { fail('subscriptions.getCount', e); }

  try {
    const data = await client.access.subscriptions.list({ connectionId: CONNECTION_ID, limit: 10 });
    success('subscriptions.list', data);
  } catch (e) { fail('subscriptions.list', e); }
}

async function testUsersAPI(client: ReturnType<typeof createOFAuthClient>) {
  console.log('\n🔍 Users API');
  console.log('-'.repeat(40));

  try {
    const data = await client.access.users.getBlocked({ connectionId: CONNECTION_ID, limit: 10 });
    success('users.getBlocked', data);
  } catch (e) { fail('users.getBlocked', e); }

  try {
    const data = await client.access.users.getRestrict({ connectionId: CONNECTION_ID, limit: 10 });
    success('users.getRestrict', data);
  } catch (e) { fail('users.getRestrict', e); }

  try {
    const data = await client.access.users.search({ connectionId: CONNECTION_ID, query: 'test', limit: 10 });
    success('users.search', data);
  } catch (e) { fail('users.search', e); }
}

async function testUserListsAPI(client: ReturnType<typeof createOFAuthClient>) {
  console.log('\n📁 User Lists API');
  console.log('-'.repeat(40));

  try {
    const data = await client.access.users.lists.list({ connectionId: CONNECTION_ID, limit: 10 });
    success('users.lists.list', data);
  } catch (e) { fail('users.lists.list', e); }
}

async function testVaultAPI(client: ReturnType<typeof createOFAuthClient>) {
  console.log('\n🗄️ Vault API');
  console.log('-'.repeat(40));

  try {
    const data = await client.access.vault.listMedia({ connectionId: CONNECTION_ID, limit: 10 });
    success('vault.listMedia', data);
  } catch (e) { fail('vault.listMedia', e); }

  try {
    const data = await client.access.vault.lists.list({ connectionId: CONNECTION_ID, limit: 10 });
    success('vault.lists.list', data);
  } catch (e) { fail('vault.lists.list', e); }
}

async function testEarningsAPI(client: ReturnType<typeof createOFAuthClient>) {
  console.log('\n💰 Earnings API');
  console.log('-'.repeat(40));

  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const startDate = thirtyDaysAgo.toISOString().split('T')[0];
  const endDate = now.toISOString().split('T')[0];

  try {
    const data = await client.access.earnings.getChart({ connectionId: CONNECTION_ID, startDate, endDate });
    success('earnings.getChart', data);
  } catch (e) { fail('earnings.getChart', e); }

  try {
    const data = await client.access.earnings.listTransactions({ connectionId: CONNECTION_ID, startDate });
    success('earnings.listTransactions', data);
  } catch (e) { fail('earnings.listTransactions', e); }

  try {
    const data = await client.access.earnings.listChargebacks({ connectionId: CONNECTION_ID, startDate, endDate, limit: 10 });
    success('earnings.listChargebacks', data);
  } catch (e) { fail('earnings.listChargebacks', e); }
}

async function testAnalyticsAPI(client: ReturnType<typeof createOFAuthClient>) {
  console.log('\n📈 Analytics API');
  console.log('-'.repeat(40));

  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const startDate = thirtyDaysAgo.toISOString().split('T')[0];
  const endDate = now.toISOString().split('T')[0];

  try {
    const data = await client.access.analytics.posts.getChart({ connectionId: CONNECTION_ID, startDate, endDate });
    success('analytics.posts.getChart', data);
  } catch (e) { fail('analytics.posts.getChart', e); }

  try {
    const data = await client.access.analytics.posts.getTop({ connectionId: CONNECTION_ID, startDate, endDate, limit: 10 });
    success('analytics.posts.getTop', data);
  } catch (e) { fail('analytics.posts.getTop', e); }

  try {
    const data = await client.access.analytics.stories.getChart({ connectionId: CONNECTION_ID, startDate, endDate });
    success('analytics.stories.getChart', data);
  } catch (e) { fail('analytics.stories.getChart', e); }
}

async function testPromotionsAPI(client: ReturnType<typeof createOFAuthClient>) {
  console.log('\n🎁 Promotions API');
  console.log('-'.repeat(40));

  try {
    const data = await client.access.promotions.list({ connectionId: CONNECTION_ID, limit: 10 });
    success('promotions.list', data);
  } catch (e) { fail('promotions.list', e); }

  try {
    const data = await client.access.promotions.trackingLinks.list({ connectionId: CONNECTION_ID, limit: 10 });
    success('promotions.trackingLinks.list', data);
  } catch (e) { fail('promotions.trackingLinks.list', e); }

  try {
    const data = await client.access.promotions.trialLinks.list({ connectionId: CONNECTION_ID, limit: 10 });
    success('promotions.trialLinks.list', data);
  } catch (e) { fail('promotions.trialLinks.list', e); }

  try {
    const data = await client.access.promotions.listBundles({ connectionId: CONNECTION_ID, limit: 10 });
    success('promotions.listBundles', data);
  } catch (e) { fail('promotions.listBundles', e); }
}

async function testProxyAPI(client: ReturnType<typeof createOFAuthClient>) {
  console.log('\n🔀 Proxy API');
  console.log('-'.repeat(40));

  try {
    const data = await client.proxy({ path: '/users/me', method: 'GET', connectionId: CONNECTION_ID });
    success('proxy /users/me', data);
  } catch (e) { fail('proxy /users/me', e); }
}

async function testMutationAPIs(client: ReturnType<typeof createOFAuthClient>) {
  console.log('\n✏️ Mutation APIs (CRUD Operations)');
  console.log('-'.repeat(40));

  let createdVaultListId: number | null = null;

  try {
    const created = await client.access.vault.lists.create({
      connectionId: CONNECTION_ID,
      body: { name: `SDK Test List ${Date.now()}` }
    });
    createdVaultListId = created.id;
    success('vault.lists.create', { id: createdVaultListId });
  } catch (e) { fail('vault.lists.create', e); }

  if (createdVaultListId) {
    try {
      const updated = await client.access.vault.lists.update({
        connectionId: CONNECTION_ID,
        listId: createdVaultListId,
        body: { name: `SDK Test List Updated ${Date.now()}` }
      });
      success('vault.lists.update', updated);
    } catch (e) { fail('vault.lists.update', e); }

    try {
      await client.access.vault.lists.delete({
        connectionId: CONNECTION_ID,
        listId: createdVaultListId
      });
      success('vault.lists.delete');
    } catch (e) { fail('vault.lists.delete', e); }
  }

  try {
    const settings = await client.account.connections.updateSettings({
      connectionId: CONNECTION_ID,
      body: {
        vaultCache: {
          enabled: true,
          settings: {}
        }
      }
    });
    success('account.connections.updateSettings', settings);
  } catch (e) { fail('account.connections.updateSettings', e); }

  const testUserId = '12345';
  try {
    await client.access.users.restrict({ connectionId: CONNECTION_ID, userId: testUserId });
    success('users.restrict');
  } catch (e) { fail('users.restrict', e); }

  try {
    await client.access.users.restrict2({ connectionId: CONNECTION_ID, userId: testUserId });
    success('users.restrict2 (unrestrict)');
  } catch (e) { fail('users.restrict2 (unrestrict)', e); }
}

async function main() {
  console.log('='.repeat(60));
  console.log('OFAuth TypeScript SDK - Comprehensive Sandbox Test');
  console.log('='.repeat(60));
  console.log(`\nBase URL: ${BASE_URL}`);
  console.log(`Connection ID: ${CONNECTION_ID}`);
  console.log(`API Key: ${API_KEY.substring(0, 20)}...`);

  const client = createOFAuthClient({
    apiKey: API_KEY,
    basePath: BASE_URL,
    connectionId: CONNECTION_ID,
  });

  await testAccountAPI(client);
  await testSelfAPI(client);
  await testPostsAPI(client);
  await testMessagesAPI(client);
  await testSubscribersAPI(client);
  await testSubscriptionsAPI(client);
  await testUsersAPI(client);
  await testUserListsAPI(client);
  await testVaultAPI(client);
  await testEarningsAPI(client);
  await testAnalyticsAPI(client);
  await testPromotionsAPI(client);
  await testProxyAPI(client);
  await testMutationAPIs(client);

  const total = results.passed + results.failed;
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Results: ${results.passed}/${total} passed`);
  if (results.failed > 0) {
    console.log('\nFailed tests:');
    for (const err of results.errors) {
      console.log(`  - ${err.test}: ${err.error}`);
    }
  }

  process.exit(results.failed === 0 ? 0 : 1);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
