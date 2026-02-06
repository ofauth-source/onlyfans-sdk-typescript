# OFAuth TypeScript SDK Examples

Runnable examples demonstrating the OFAuth TypeScript SDK features.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
# Edit .env and add your API key
```

3. Run examples:
```bash
npm run basic                 # Basic account operations
npm run import-connection     # Import connection demo
npm run access-api            # Access API examples (requires connection ID)
npm run pagination            # Pagination with async iterators
npm run proxy                 # Proxy endpoint examples (requires connection ID)
npm run error-handling        # Error handling patterns
```

## Examples

### basic.ts
Demonstrates basic SDK usage:
- Client initialization
- Getting account info (`whoami()`)
- Listing connections
- Getting connection settings

**Requirements:** API key

### import-connection.ts
Shows how to import externally managed connections:
- Importing a connection with cookie + user agent
- Updating imported connection session
- Distinguishing imported vs managed connections

**Requirements:** API key, valid OnlyFans session data

### access-api.ts
Access API examples for working with OnlyFans data:
- Getting creator profile
- Listing posts
- Getting earnings data
- Listing subscribers

**Requirements:** API key, connection ID

### pagination.ts
Pagination patterns:
- Async iterators for automatic pagination
- Manual pagination with `hasMore`/`marker`
- Custom page sizes
- Limiting total items fetched

**Requirements:** API key

### proxy.ts
Direct OnlyFans API calls via proxy:
- GET requests
- POST requests with body
- Query parameters

**Requirements:** API key, connection ID

### error-handling.ts
Error handling best practices:
- Catching API errors
- Accessing error details (status, code, message)
- Handling different error types

**Requirements:** API key

## Environment Variables

Create a `.env` file with:

```env
OFAUTH_API_KEY=your_api_key_here
OFAUTH_CONNECTION_ID=conn_xxx  # Optional, for access API examples
```

## Notes

- All examples use `dotenv` to load environment variables
- Examples with "requires connection ID" need `OFAUTH_CONNECTION_ID` set
- Import connection example requires valid OnlyFans session data
- Some examples are read-only, others demonstrate write operations (commented out for safety)
