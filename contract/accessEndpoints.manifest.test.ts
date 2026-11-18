import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { OFAuthClient } from '../src/client';
import { resolveSdkMethod, type AccessEndpointSpec } from './sdkResolve';

const manifest = JSON.parse(
  readFileSync(resolve(__dirname, 'accessEndpoints.manifest.json'), 'utf8'),
) as AccessEndpointSpec[];

describe('access endpoints manifest', () => {
  it('lists V3 Access routes', () => {
    expect(manifest.length).toBeGreaterThan(200);
    expect(manifest).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ method: 'get', route: '/profile', sdk: 'access.profile.get' }),
        expect.objectContaining({ method: 'post', route: '/chats/{userId}/messages', sdk: 'access.chats.messages.send' }),
      ]),
    );
  });

  it('maps every route to an SDK method', () => {
    const client = new OFAuthClient({ accessToken: 'unused' });
    const missing = manifest.filter((entry) => !resolveSdkMethod(client, entry.sdk)).map((e) => e.sdk);
    expect(missing).toEqual([]);
  });
});
