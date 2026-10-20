import { afterAll, beforeAll, expect, it } from 'vitest';
import { createServer } from 'node:http';
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createOFAuthClient } from '../src/index';

const requests: string[] = [];
const media = [
  { id: 1, type: 'photo' },
  { id: 2, type: 'video' },
  { id: 3, type: 'photo' },
  { id: 4, type: 'video' },
  { id: 5, type: 'video' },
];
const server = createServer((req, res) => {
  const url = new URL(req.url!, 'http://localhost');
  requests.push(req.url!);
  res.setHeader('content-type', 'application/json');
  if (req.method === 'GET' && url.pathname === '/v2/access/vault/media') {
    const filtered = media.filter(item => !url.searchParams.has('type') || item.type === url.searchParams.get('type'));
    const offset = Number(url.searchParams.get('offset') ?? 0);
    const limit = Number(url.searchParams.get('limit') ?? 24);
    res.end(JSON.stringify({ list: filtered.slice(offset, offset + limit), hasMore: offset + limit < filtered.length }));
    return;
  }
  if (req.method === 'GET' && url.pathname === '/v2/access/mass-messages/scheduled') {
    const offset = Number(url.searchParams.get('offset') ?? 0);
    res.end(JSON.stringify({ list: [{ id: offset + 101, scheduledDate: '2026-11-01T00:00:00Z' }], hasMore: offset === 0 }));
    return;
  }
  res.statusCode = 404;
  res.end(JSON.stringify({ code: 'ROUTE_NOT_FOUND' }));
});
let client: ReturnType<typeof createOFAuthClient>;
beforeAll(async () => {
  await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  if (!address || typeof address === 'string') throw new Error('Missing HTTP server address');
  client = createOFAuthClient({ apiKey: 'http-contract-fixture', connectionId: 'fixture-connection', basePath: `http://127.0.0.1:${address.port}` });
});
afterAll(async () => {
  await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
  const artifactDir = process.env.SDK_HTTP_ARTIFACT_DIR ?? mkdtempSync(join(tmpdir(), 'ofauth-v2-sdk-http-'));
  mkdirSync(artifactDir, { recursive: true });
  const artifact = join(artifactDir, 'requests.json');
  writeFileSync(artifact, JSON.stringify(requests, null, 2));
  console.log(`HTTP request artifact: ${artifact}`);
});

it('keeps the video filter and v2 sorting across multiple HTTP pages', async () => {
  for (const filter of [
    { mediaType: 'video' as const, sortBy: 'recent' as const, sortDirection: 'asc' as const },
    { type: 'video' as const, sort: 'oldest' as const },
    { type: 'video' as const, mediaType: 'photo' as const, sort: 'oldest' as const, sortBy: 'most-liked' as const },
  ]) {
    const videos = [];
    for await (const item of client.access.vault.iterateMedia({ ...filter, pageSize: 2 })) videos.push(item);
    expect(videos.map(item => item.id)).toEqual([2, 4, 5]);
    expect(videos.every(item => item.type === 'video')).toBe(true);
  }
  for (const request of requests.filter(path => path.startsWith('/v2/access/vault/media'))) {
    const query = new URL(request, 'http://localhost').searchParams;
    expect(query.get('type')).toBe('video');
    expect(query.get('sort')).toBe('oldest');
    expect(query.has('mediaType')).toBe(false);
  }
});

it('lists scheduled mass messages on successive pages using the supported route', async () => {
  const first = await client.access.massMessages.getScheduled({ limit: 1, offset: 0 });
  const second = await client.access.massMessages.getScheduled({ limit: 1, offset: 1 });
  expect(first).toMatchObject({ list: [{ id: 101 }], hasMore: true });
  expect(second).toMatchObject({ list: [{ id: 102 }], hasMore: false });
  expect(await client.access.listMassMessages({ type: 'unsent', limit: 1 })).toMatchObject({ list: [{ id: 101 }] });
  const scheduled = [];
  for await (const item of client.access.iterateMassMessages({ type: 'scheduled', pageSize: 1 })) scheduled.push(item);
  expect(scheduled).toMatchObject([{ id: 101 }, { id: 102 }]);
  const before = requests.length;
  await expect(client.access.listMassMessages({ type: 'sent' })).rejects.toThrow('Sent mass-message listing is unavailable');
  expect(requests).toHaveLength(before);
  expect(requests.some(path => new URL(path, 'http://localhost').pathname === '/v2/access/mass-messages')).toBe(false);
});
