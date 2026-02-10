import { describe, it, expect, vi } from "vitest";
import { runSdkGetContract, type RequestFn } from "./sdkContract";

describe("sdk contract runner", () => {
  it("uses the provided request function and fails if it returns a string", async () => {
    expect(typeof runSdkGetContract).toBe("function");

    type Req = Parameters<RequestFn>[1];
    const calls: Req[] = [];
    const requestFn = vi.fn(async (_cfg, req: Req) => {
      calls.push(req);
      return "not-json";
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
          fixtures: { postId: "123" },
        },
        [{ method: "get", route: "/analytics/posts/top" }],
        { requestFn },
      ),
    ).rejects.toThrow(/string/i);

    expect(calls[0]).toMatchObject({
      method: "GET",
      path: "/v2/access/analytics/posts/top",
    });
  });
});
