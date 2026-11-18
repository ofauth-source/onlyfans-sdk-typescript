import { describe, expect, it } from 'vitest';
import { createRateLimiter } from './rateLimiter';

describe('createRateLimiter', () => {
  it('keeps running scheduled tasks after one rejects', async () => {
    const limiter = createRateLimiter({ minDelayMs: 0 });
    const first = limiter.schedule(() => Promise.reject(new Error('boom')));
    const second = limiter.schedule(() => Promise.resolve('ok'));

    await expect(first).rejects.toThrow('boom');
    await expect(second).resolves.toBe('ok');
  });

  it('runs tasks in order with the minimum delay between starts', async () => {
    const limiter = createRateLimiter({ minDelayMs: 20 });
    const starts: number[] = [];
    await Promise.all([1, 2, 3].map(() => limiter.schedule(async () => starts.push(Date.now()))));

    expect(starts).toHaveLength(3);
    for (let i = 1; i < starts.length; i++) expect(starts[i] - starts[i - 1]).toBeGreaterThanOrEqual(19);
  });
});
