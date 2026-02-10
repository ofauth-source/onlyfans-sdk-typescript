import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("accessEndpoints.manifest.json", () => {
  it("exists and contains a non-trivial set of Access API endpoints", () => {
    const manifestPath = resolve(__dirname, "./accessEndpoints.manifest.json");
    const raw = readFileSync(manifestPath, "utf8");
    const manifest = JSON.parse(raw) as Array<{ method: string; route: string }>;

    expect(Array.isArray(manifest)).toBe(true);
    expect(manifest.length).toBeGreaterThan(20);

    // Spot-check some known endpoints.
    expect(manifest).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ method: "get", route: "/self" }),
        expect.objectContaining({ method: "get", route: "/analytics/posts/top" }),
      ]),
    );
  });
});

