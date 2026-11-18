/**
 * Call Access operations for a stored authorization.
 *
 * Env: OFAUTH_CLIENT_ID, OFAUTH_CLIENT_SECRET, OFAUTH_REFRESH_TOKEN
 */
import 'dotenv/config';
import { OFAuthAPIError, OFAuthClient } from '@ofauth/onlyfans-sdk';

const client = new OFAuthClient({
  accessToken: process.env.OFAUTH_ACCESS_TOKEN!,
  linkedAccountId: process.env.OFAUTH_LINKED_ACCOUNT_ID!,
});
const profile = await client.access.profile.get();
console.log(profile);
