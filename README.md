# OnlyFans API - TypeScript SDK

[![npm](https://img.shields.io/npm/v/@ofauth/onlyfans-sdk)](https://www.npmjs.com/package/@ofauth/onlyfans-sdk)
[![JSR](https://jsr.io/badges/@ofauth-org/onlyfans-sdk)](https://jsr.io/@ofauth-org/onlyfans-sdk)
[![License](https://img.shields.io/npm/l/@ofauth/onlyfans-sdk)](LICENSE)

The official **OnlyFans API TypeScript SDK** by [OFAuth](https://ofauth.com). A type-safe, fully-typed client for integrating with the OnlyFans API. Build OnlyFans tools, dashboards, analytics, and automations with full IntelliSense support.

> **What is this?** This is an SDK for the [OnlyFans API](https://ofauth.com) via OFAuth — the only authorized way to programmatically access OnlyFans data. Use it to build OnlyFans integrations, manage creator accounts, access earnings data, automate messaging, and more.

## Installation

```bash
# npm
npm install @ofauth/onlyfans-sdk

# yarn
yarn add @ofauth/onlyfans-sdk

# pnpm
pnpm add @ofauth/onlyfans-sdk

# JSR (Deno / JSR registry)
npx jsr add @ofauth-org/onlyfans-sdk
```

## Quick Start

```typescript
import { createOFAuthClient } from '@ofauth/onlyfans-sdk';

const client = createOFAuthClient({ apiKey: 'your-api-key' });

// Get account info
const account = await client.whoami();
console.log(account.id, account.permissions);
```

## Features

- Full TypeScript support with inline types
- Nested client structure for intuitive API navigation
- Async iterators for paginated endpoints
- Proxy support for direct OnlyFans API access
- Media upload with automatic chunking
- Webhook verification and routing (Svix-compatible)

## Configuration

```typescript
import { createOFAuthClient } from '@ofauth/onlyfans-sdk';

const client = createOFAuthClient({
  apiKey: 'your-api-key',
  // Optional: Set a default connection ID for all requests
  connectionId: 'conn_xxx',
  // Optional: Custom base URL
  basePath: 'https://api-next.ofauth.com',
  // Optional: Custom fetch implementation
  fetchApi: customFetch,
});
```

## Usage Examples

### Account Operations

```typescript
// Get account info
const account = await client.whoami();

// List all connections
const connections = await client.account.connections.list();
for (const conn of connections.list) {
  console.log(conn.id, conn.status, conn.userData.username);
}

// Get connection settings
const settings = await client.account.connections.getSettings('conn_xxx');
```

### Pagination with Iterators

For endpoints that return paginated data, use the `iterate()` method:

```typescript
// Iterate over all connections (handles pagination automatically)
for await (const connection of client.account.connections.iterate()) {
  console.log(connection.id);
}

// With options
for await (const connection of client.account.connections.iterate({
  maxItems: 100,  // Stop after 100 items
  pageSize: 20,   // Items per page
})) {
  console.log(connection.id);
}
```

### Access API (OnlyFans Data)

Access endpoints require a connection ID:

```typescript
// Set connection ID for all requests
const client = createOFAuthClient({
  apiKey: 'your-api-key',
  connectionId: 'conn_xxx',
});

// Or pass it per-request
const profile = await client.access.self.get({ connectionId: 'conn_xxx' });

// Get earnings data
const earnings = await client.access.earnings.chart.get({
  startDate: '2024-01-01',
  endDate: '2024-01-31',
});

// List posts
const posts = await client.access.posts.list({ limit: 20 });

// Iterate over all posts
for await (const post of client.access.posts.iterate()) {
  console.log(post.id, post.text);
}
```

### Proxy Requests

Call any OnlyFans API endpoint directly:

```typescript
// GET request
const user = await client.proxy({
  path: '/users/me',
  method: 'GET',
  connectionId: 'conn_xxx',
});

// POST request with body
const response = await client.proxy({
  path: '/messages/queue',
  method: 'POST',
  connectionId: 'conn_xxx',
  body: {
    text: 'Hello!',
    lockedText: false,
  },
});

// With query parameters
const subscribers = await client.proxy({
  path: '/subscriptions/subscribers',
  method: 'GET',
  connectionId: 'conn_xxx',
  query: { limit: 10 },
});
```

### Media Upload

```typescript
// Upload from File object (browser)
const result = await client.access.uploads.upload(
  'conn_xxx',
  file,  // File object
  { onProgress: (uploaded, total) => console.log(`${uploaded}/${total}`) }
);

// Upload from Buffer (Node.js)
import fs from 'fs';

const buffer = fs.readFileSync('video.mp4');
const result = await client.access.uploads.upload(
  'conn_xxx',
  new Blob([buffer], { type: 'video/mp4' }),
  { filename: 'video.mp4' }
);
```

## Error Handling

```typescript
import { OFAuthAPIError } from '@ofauth/onlyfans-sdk';

try {
  const account = await client.whoami();
} catch (error) {
  if (error instanceof OFAuthAPIError) {
    console.error('API Error:', error.status, error.message);
    console.error('Error code:', error.code);
    console.error('Details:', error.details);
  } else {
    throw error;
  }
}
```

## Type Safety

All request and response types are generated from the OpenAPI spec:

```typescript
import type {
  AccountWhoamiResponse,
  AccountConnectionsListResponse,
  AccountConnectionsListItem,
  AccessSelfGetResponse,
} from '@ofauth/onlyfans-sdk';

// Response types are automatically inferred
const account = await client.whoami();
// account: AccountWhoamiResponse

// Full IntelliSense support
account.id;          // string
account.name;        // string | null
account.permissions; // string[]
```

## API Reference

The client provides access to these API namespaces:

- `client.whoami()` - Account info
- `client.account.connections` - Connection management
- `client.account.settings` - Account settings
- `client.access.self` - Creator profile
- `client.access.posts` - Posts management
- `client.access.chats` - Chat/messages
- `client.access.subscribers` - Subscriber data
- `client.access.earnings` - Earnings & analytics
- `client.access.vault` - Vault media
- `client.access.promotions` - Promotions & links
- `client.access.uploads` - Media uploads
- `client.proxy()` - Direct OnlyFans API access

## License

MIT
