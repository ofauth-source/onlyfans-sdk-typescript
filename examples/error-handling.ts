/**
 * Branch on `recoveryAction` from the V3 error envelope.
 *
 * Env: OFAUTH_ACCESS_TOKEN, OFAUTH_LINKED_ACCOUNT_ID
 */
import 'dotenv/config';
import { OFAuthAPIError, OFAuthClient, OFAuthOAuthError } from '@ofauth/onlyfans-sdk';

const client = new OFAuthClient({
  accessToken: process.env.OFAUTH_ACCESS_TOKEN!,
  linkedAccountId: process.env.OFAUTH_LINKED_ACCOUNT_ID,
});

async function withRecovery<T>(call: () => Promise<T>): Promise<T | undefined> {
  try {
    return await call();
  } catch (error) {
    if (error instanceof OFAuthOAuthError && error.code === 'invalid_grant') {
      console.log('Refresh token expired, revoked, or replayed: send the user through authorization again');
      return undefined;
    }
    if (!(error instanceof OFAuthAPIError)) throw error;

    console.log(`${error.status} ${error.code} (request ${error.requestId})`);
    switch (error.recoveryAction) {
      case 'obtain_external_oauth_token':
        console.log('Refresh the access token and retry through your auth system');
        break;
      case 'reconnect_linked_account':
        console.log('Ask the owner to reconnect the account in OFAuth');
        break;
      case 'request_additional_consent':
      case 'grant_linked_account':
      case 'restart_authorization':
        console.log('Run the authorization flow again');
        break;
      case 'retry':
      case 'retry_after_reset':
        console.log(`Retry after ${error.retryAfter ?? 1}s`);
        break;
      default:
        console.log('Not recoverable in code:', error.recoveryAction);
    }
    return undefined;
  }
}

console.log(await withRecovery(() => client.access.profile.get()));
