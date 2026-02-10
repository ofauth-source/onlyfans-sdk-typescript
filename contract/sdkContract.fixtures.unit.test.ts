import { describe, it, expect, vi } from "vitest";
import { runSdkGetContract, type RequestFn } from "./sdkContract";

describe("sdk contract runner (fixtures)", () => {
  it("throws in strict mode when a route param fixture is missing", async () => {
    type Req = Parameters<RequestFn>[1];
    const calls: Req[] = [];
    const requestFn = vi.fn(async (_cfg, req: Req) => {
      calls.push(req);
      // Return object so parsing assertion passes.
      return { ok: true };
    });

    await expect(
      runSdkGetContract(
        {
          name: "unit",
          baseUrl: "http://example.test",
          apiKey: "k",
          connectionId: "c",
          minDelayMs: 0,
          strict: true,
          fixtures: {},
        },
        [{ method: "get", route: "/posts/:unknownId" }],
        { requestFn },
      ),
    ).rejects.toThrow(/Missing fixture/);

    expect(calls.length).toBe(0);
  });

  it("skips in non-strict mode when a route param fixture is missing", async () => {
    type Req = Parameters<RequestFn>[1];
    const calls: Req[] = [];
    const requestFn = vi.fn(async (_cfg, req: Req) => {
      calls.push(req);
      return { ok: true };
    });

    const res = await runSdkGetContract(
      {
        name: "unit",
        baseUrl: "http://example.test",
        apiKey: "k",
        connectionId: "c",
        minDelayMs: 0,
        strict: false,
        fixtures: {},
      },
      [{ method: "get", route: "/posts/:unknownId" }],
      { requestFn },
    );

    expect(res.attempted).toBe(0);
    expect(res.skipped).toBe(1);
    expect(calls.length).toBe(0);
  });
});
