import { describe, it, expect } from "vitest";
import { request, type OFAuthConfig } from "./runtime";

describe("runtime.request JSON parsing", () => {
  it("returns text for non-JSON content-type", async () => {
    const cfg: OFAuthConfig = {
      apiKey: "k",
      basePath: "http://example.test",
      fetchApi: (async () =>
        new Response(`{"hasMore":false,"items":[{"url":"""""}]}`, {
          status: 200,
          headers: { "content-type": "text/plain" },
        })) as unknown as typeof fetch,
    };

    const res = await request<unknown>(cfg, {
      method: "GET",
      path: "/v2/access/analytics/posts/top",
    });

    expect(typeof res).toBe("string");
  });

  it("throws on invalid JSON when content-type is JSON", async () => {
    const cfg: OFAuthConfig = {
      apiKey: "k",
      basePath: "http://example.test",
      fetchApi: (async () =>
        new Response(`{"items":[{"url": """""}]}`, {
          status: 200,
          headers: { "content-type": "application/json; charset=utf-8" },
        })) as unknown as typeof fetch,
    };

    await expect(
      request<unknown>(cfg, { method: "GET", path: "/v2/access/posts" }),
    ).rejects.toThrow();
  });
});
