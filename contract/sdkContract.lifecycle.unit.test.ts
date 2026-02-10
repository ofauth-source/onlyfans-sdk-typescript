import { describe, it, expect, vi } from "vitest";
import { runSdkMutationLifecycleContract, type RequestFn } from "./sdkContract";

describe("sdk contract runner (mutation lifecycles)", () => {
  it("runs create -> update -> delete for posts using returned postId", async () => {
    expect(typeof runSdkMutationLifecycleContract).toBe("function");

    type Req = Parameters<RequestFn>[1];
    const calls: Req[] = [];
    const requestFn = vi.fn(async (_cfg, req: Req) => {
      calls.push(req);

      if (req.method === "POST" && req.path === "/v2/access/posts") {
        return { id: "p123" };
      }

      // For this unit test we don't care about response bodies beyond parseability.
      return { ok: true };
    });

    await runSdkMutationLifecycleContract(
      {
        name: "unit",
        baseUrl: "http://example.test",
        apiKey: "k",
        connectionId: "c",
        minDelayMs: 0,
        strict: true,
        allowSideEffects: true,
      },
      { requestFn, includePosts: true, includeUserLists: false },
    );

    expect(calls.map((c) => `${c.method} ${c.path}`)).toEqual([
      "POST /v2/access/posts",
      "PUT /v2/access/posts/p123",
      "DELETE /v2/access/posts/p123",
    ]);
  });

  it("runs create -> update -> delete for user lists using returned listId", async () => {
    expect(typeof runSdkMutationLifecycleContract).toBe("function");

    type Req = Parameters<RequestFn>[1];
    const calls: Req[] = [];
    const requestFn = vi.fn(async (_cfg, req: Req) => {
      calls.push(req);

      if (req.method === "POST" && req.path === "/v2/access/users/lists") {
        return { id: "l123" };
      }
      return { ok: true };
    });

    await runSdkMutationLifecycleContract(
      {
        name: "unit",
        baseUrl: "http://example.test",
        apiKey: "k",
        connectionId: "c",
        minDelayMs: 0,
        strict: true,
        allowSideEffects: true,
      },
      { requestFn, includePosts: false, includeUserLists: true },
    );

    expect(calls.map((c) => `${c.method} ${c.path}`)).toEqual([
      "POST /v2/access/users/lists",
      "PATCH /v2/access/users/lists/l123",
      "DELETE /v2/access/users/lists/l123",
    ]);
  });
});
