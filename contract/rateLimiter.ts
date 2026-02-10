export type RateLimiter = {
  schedule<T>(fn: () => Promise<T>): Promise<T>;
};

/**
 * Simple sequential limiter: enforces a minimum delay between *starts* of tasks.
 * Used to avoid rate limits on live connections (2s between requests).
 */
export function createRateLimiter(opts: { minDelayMs: number }): RateLimiter {
  const minDelayMs = Math.max(0, Math.floor(opts.minDelayMs));
  let lastStartAt = 0;
  let chain = Promise.resolve();

  async function sleep(ms: number) {
    if (ms <= 0) return;
    await new Promise((r) => setTimeout(r, ms));
  }

  return {
    schedule<T>(fn: () => Promise<T>): Promise<T> {
      chain = chain.then(async () => {
        const now = Date.now();
        const waitMs = Math.max(0, lastStartAt + minDelayMs - now);
        await sleep(waitMs);
        lastStartAt = Date.now();
        return fn();
      });
      return chain as Promise<T>;
    },
  };
}

