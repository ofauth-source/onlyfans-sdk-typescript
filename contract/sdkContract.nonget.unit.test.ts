import { describe, it, expect, vi } from "vitest";
import { runSdkNonGetContract, type RequestFn } from "./sdkContract";

describe("sdk contract runner (non-GET)", () => {
  it("does not require fixtures for route params and uses safe fake IDs", async () => {
    expect(typeof runSdkNonGetContract).toBe("function");

    type Req = Parameters<RequestFn>[1];
    const calls: Req[] = [];
    const requestFn = vi.fn(async (_cfg, req: Req) => {
      calls.push(req);
      // mimic API error so runner continues
      const err = Object.assign(new Error("nope"), { status: 404, response: {} });
      throw err;
    });

    await runSdkNonGetContract(
      {
        name: "unit",
        baseUrl: "http://example.test",
        apiKey: "k",
        connectionId: "c",
        minDelayMs: 0,
        strict: true,
        fixtures: {},
      },
      [{ method: "delete", route: "/posts/:postId" }],
      { requestFn },
    );

    expect(calls[0]).toMatchObject({
      method: "DELETE",
      path: "/v2/access/posts/-1",
    });
  });

  it("can resolve ids dynamically for route params using GET requests when side effects are allowed", async () => {
    type Req = Parameters<RequestFn>[1];
    const calls: Req[] = [];
    const requestFn = vi.fn(async (_cfg, req: Req) => {
      calls.push(req);

      if (req.method === "GET" && req.path === "/v2/access/posts") {
        return { list: [{ id: "p123" }], hasMore: false };
      }

      // mimic API error so runner continues
      const err = Object.assign(new Error("nope"), { status: 404, response: {} });
      throw err;
    });

    await runSdkNonGetContract(
      {
        name: "unit",
        baseUrl: "http://example.test",
        apiKey: "k",
        connectionId: "c",
        minDelayMs: 0,
        strict: true,
        fixtures: {},
        allowSideEffects: true,
      },
      [{ method: "delete", route: "/posts/:postId" }],
      { requestFn },
    );

    expect(calls[0]).toMatchObject({
      method: "GET",
      path: "/v2/access/posts",
    });
    expect(calls[1]).toMatchObject({
      method: "DELETE",
      path: "/v2/access/posts/p123",
    });
  });
});
