import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { runSdkGetContract } from "./sdkContract";
import { createRateLimiter } from "./rateLimiter";
import type { OFAuthConfig } from "../src/runtime";

function loadEnvFile(path: string): Record<string, string> {
  const env: Record<string, string> = {};
  try {
    const content = readFileSync(path, "utf-8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx);
      let value = trimmed.slice(eqIdx + 1);
      if (
        (value.startsWith("'") && value.endsWith("'")) ||
        (value.startsWith('"') && value.endsWith('"'))
      ) {
        value = value.slice(1, -1);
      }
      env[key] = value;
    }
  } catch {
    // OK
  }
  return env;
}

function findEnvPath(filename: string) {
  for (const dir of [
    process.cwd(),
    resolve(process.cwd(), ".."),
    resolve(process.cwd(), "../.."),
    resolve(process.cwd(), "../../.."),
    resolve(process.cwd(), "../../../.."),
  ]) {
    const p = resolve(dir, filename);
    if (existsSync(p)) return p;
  }
  return resolve(process.cwd(), filename);
}

const envVars = loadEnvFile(findEnvPath(".env.e2e.local"));

const BASE_URL = (process.env.E2E_ACCESS_BASE_URL ?? envVars.E2E_ACCESS_BASE_URL ?? "");
const STRICT =
  (((process.env.E2E_CONTRACT_STRICT ?? envVars.E2E_CONTRACT_STRICT ?? "").toLowerCase() === "1") ||
    ((process.env.E2E_CONTRACT_STRICT ?? envVars.E2E_CONTRACT_STRICT ?? "").toLowerCase() === "true"));
const REQUIRED =
  (((process.env.E2E_CONTRACT_REQUIRED ?? envVars.E2E_CONTRACT_REQUIRED ?? "").toLowerCase() === "1") ||
    ((process.env.E2E_CONTRACT_REQUIRED ?? envVars.E2E_CONTRACT_REQUIRED ?? "").toLowerCase() === "true"));
const RUN_LIVE =
  (((process.env.E2E_RUN_LIVE ?? envVars.E2E_RUN_LIVE ?? "").toLowerCase() === "1") ||
    ((process.env.E2E_RUN_LIVE ?? envVars.E2E_RUN_LIVE ?? "").toLowerCase() === "true"));

function shouldRunSuite(name: string): boolean {
  const suitesRaw = (process.env.E2E_SDK_SUITES ?? envVars.E2E_SDK_SUITES ?? "");
  const suites = suitesRaw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (suites.length === 0) return true;
  return suites.includes(name);
}

type ContextSpec = {
  name: string;
  apiKey?: string;
  connectionId?: string;
  minDelayMs: number;
  fixturePrefix: string;
};

function envFixture(prefix: string, key: string): string | undefined {
  const envKey = `${prefix}_FIXTURE_${key}`.toUpperCase();
  return process.env[envKey] ?? envVars[envKey];
}

function loadFixtures(prefix: string) {
  const fixtures: Record<string, string> = {};
  for (const key of [
    "USER_ID",
    "CHAT_USER_ID",
    "POST_ID",
    "LIST_ID",
    "VAULT_LIST_ID",
    "SUBSCRIPTION_ID",
    "TRACKING_LINK_ID",
    "TRIAL_LINK_ID",
    "PROMOTION_ID",
    "BUNDLE_ID",
    "MASS_MESSAGE_ID",
  ]) {
    const v = envFixture(prefix, key);
    if (!v) continue;

    const normalized =
      key === "USER_ID"
        ? "userId"
        : key === "CHAT_USER_ID"
          ? "chatUserId"
        : key === "POST_ID"
          ? "postId"
        : key === "LIST_ID"
          ? "listId"
          : key === "VAULT_LIST_ID"
            ? "vaultListId"
          : key === "SUBSCRIPTION_ID"
            ? "subscriptionId"
          : key === "TRACKING_LINK_ID"
            ? "trackingLinkId"
                : key === "TRIAL_LINK_ID"
                  ? "trialLinkId"
                  : key === "PROMOTION_ID"
                    ? "promotionId"
                    : key === "BUNDLE_ID"
                      ? "bundleId"
                      : key === "MASS_MESSAGE_ID"
                        ? "massMessageId"
                        : key;
    fixtures[normalized] = v;
  }
  return fixtures;
}

function splitCsv(value?: string): string[] {
  return (value || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function expandContexts(
  baseName: string,
  apiKey: string | undefined,
  connectionId: string | undefined,
  minDelayMs: number,
  fixturePrefix: string,
): ContextSpec[] {
  const keys = splitCsv(apiKey);
  const conns = splitCsv(connectionId);

  if (keys.length <= 1 && conns.length <= 1) {
    return [
      {
        name: baseName,
        apiKey,
        connectionId,
        minDelayMs,
        fixturePrefix,
      },
    ];
  }

  const n = Math.max(keys.length, conns.length);
  const out: ContextSpec[] = [];
  for (let i = 0; i < n; i++) {
    out.push({
      name: `${baseName}#${i + 1}`,
      apiKey: keys[i] || keys[0],
      connectionId: conns[i] || conns[0],
      minDelayMs,
      fixturePrefix,
    });
  }
  return out;
}

const contexts: ContextSpec[] = [
  ...expandContexts(
    "sandbox-creator",
    process.env.E2E_SANDBOX_API_KEY_CREATOR ?? envVars.E2E_SANDBOX_API_KEY_CREATOR,
    process.env.E2E_SANDBOX_CONNECTION_ID_CREATOR ?? envVars.E2E_SANDBOX_CONNECTION_ID_CREATOR,
    0,
    "E2E_SANDBOX_CREATOR",
  ),
  ...expandContexts(
    "sandbox-fan",
    process.env.E2E_SANDBOX_API_KEY_FAN ?? envVars.E2E_SANDBOX_API_KEY_FAN,
    process.env.E2E_SANDBOX_CONNECTION_ID_FAN ?? envVars.E2E_SANDBOX_CONNECTION_ID_FAN,
    0,
    "E2E_SANDBOX_FAN",
  ),
  ...(RUN_LIVE
    ? [
        ...expandContexts(
          "live-creator",
          process.env.E2E_LIVE_API_KEY_CREATOR ?? envVars.E2E_LIVE_API_KEY_CREATOR,
          process.env.E2E_LIVE_CONNECTION_ID_CREATOR ?? envVars.E2E_LIVE_CONNECTION_ID_CREATOR,
          2000,
          "E2E_LIVE_CREATOR",
        ),
        ...expandContexts(
          "live-fan",
          process.env.E2E_LIVE_API_KEY_FAN ?? envVars.E2E_LIVE_API_KEY_FAN,
          process.env.E2E_LIVE_CONNECTION_ID_FAN ?? envVars.E2E_LIVE_CONNECTION_ID_FAN,
          2000,
          "E2E_LIVE_FAN",
        ),
      ]
    : []),
];

function loadManifest() {
  const manifestPath = resolve(__dirname, "./accessEndpoints.manifest.json");
  return JSON.parse(readFileSync(manifestPath, "utf-8")) as Array<{
    method: string;
    route: string;
    tag?: string;
    summary?: string;
  }>;
}

describe("SDK Contract: Access API (GET endpoints)", () => {
  it(
    "returns parsed objects (never raw strings) across sandbox/live and fan/creator connections",
    async () => {
      if (!shouldRunSuite("access-get")) return;

      const endpoints = loadManifest();
      expect(endpoints.length).toBeGreaterThan(20);
      const getEndpoints = endpoints.filter((e) => (e.method || "").toLowerCase() === "get");
      const remaining = new Set(getEndpoints.map((e) => e.route));

      for (const ctx of contexts) {
        const hasCreds = Boolean(BASE_URL && ctx.apiKey && ctx.connectionId);
        if (!hasCreds) {
          if (REQUIRED) {
            throw new Error(
              `Missing env for context ${ctx.name}. Need E2E_ACCESS_BASE_URL + api key + connectionId`,
            );
          }
          continue;
        }

        const fixtures = loadFixtures(ctx.fixturePrefix);
        const limiter = createRateLimiter({ minDelayMs: ctx.minDelayMs });

        // Preflight required-success calls so we actually exercise JSON parsing on 2xx responses.
        const { request } = await import("../src/runtime");
        const cfg: OFAuthConfig = { apiKey: ctx.apiKey!, basePath: BASE_URL, connectionId: ctx.connectionId! };

        const self = await limiter.schedule(() =>
          request<unknown>(cfg, { method: "GET", path: "/v2/access/self" }),
        );
        expect(typeof self).not.toBe("string");

        if (ctx.name.includes("creator")) {
          const top = await limiter.schedule(() =>
            request<unknown>(cfg, {
              method: "GET",
              path: "/v2/access/analytics/posts/top",
              query: {
                startDate: "2024-01-01",
                endDate: "2024-01-31",
                limit: 1,
                offset: 0,
              },
            }),
          );
          expect(typeof top).not.toBe("string");

          const { createOFAuthClient } = await import("../src/client");
          const client = createOFAuthClient(cfg);
          const topViaMethod = await limiter.schedule(() =>
            client.access.analytics.posts.getTop({
              startDate: "2024-01-01",
              endDate: "2024-01-31",
              limit: 1,
              offset: 0,
            }),
          );
          expect(typeof topViaMethod).not.toBe("string");
        }

        const result = await runSdkGetContract(
          {
            name: ctx.name,
            baseUrl: BASE_URL,
            apiKey: ctx.apiKey!,
            connectionId: ctx.connectionId!,
            minDelayMs: ctx.minDelayMs,
            // Allow per-context skipping (missing resources), but require that the union across
            // contexts covers every endpoint without 4xx/5xx.
            strict: false,
            fixtures,
          },
          endpoints,
        );

        for (const r of result.attemptedRoutes) remaining.delete(r);
      }

      if (STRICT && remaining.size > 0) {
        const missing = [...remaining].sort();
        throw new Error(
          `Missing happy-path coverage for ${missing.length}/${getEndpoints.length} GET access endpoints.\n` +
            `Provide additional connection ids (comma-separated in E2E_LIVE_CONNECTION_ID_CREATOR / E2E_LIVE_CONNECTION_ID_FAN) ` +
            `or fixtures (E2E_*_FIXTURE_*) so every endpoint can return 2xx.\n` +
            `Missing routes:\n- ${missing.join("\n- ")}`,
        );
      }
    },
    30 * 60_000,
  );
});
