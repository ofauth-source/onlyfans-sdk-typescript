import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { runSdkNonGetContract } from "./sdkContract";

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
  if (suites.length === 0) return false; // opt-in: getters only by default
  return suites.includes(name);
}

type ContextSpec = {
  name: string;
  apiKey?: string;
  connectionId?: string;
  minDelayMs: number;
};

function splitCsv(value?: string): string[] {
  return (value || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function expandContexts(baseName: string, apiKey?: string, connectionId?: string, minDelayMs = 0): ContextSpec[] {
  const keys = splitCsv(apiKey);
  const conns = splitCsv(connectionId);

  if (keys.length <= 1 && conns.length <= 1) {
    return [
      {
        name: baseName,
        apiKey,
        connectionId,
        minDelayMs,
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
  ),
  ...expandContexts(
    "sandbox-fan",
    process.env.E2E_SANDBOX_API_KEY_FAN ?? envVars.E2E_SANDBOX_API_KEY_FAN,
    process.env.E2E_SANDBOX_CONNECTION_ID_FAN ?? envVars.E2E_SANDBOX_CONNECTION_ID_FAN,
    0,
  ),
  ...(RUN_LIVE
    ? [
        ...expandContexts(
          "live-creator",
          process.env.E2E_LIVE_API_KEY_CREATOR ?? envVars.E2E_LIVE_API_KEY_CREATOR,
          process.env.E2E_LIVE_CONNECTION_ID_CREATOR ?? envVars.E2E_LIVE_CONNECTION_ID_CREATOR,
          2000,
        ),
        ...expandContexts(
          "live-fan",
          process.env.E2E_LIVE_API_KEY_FAN ?? envVars.E2E_LIVE_API_KEY_FAN,
          process.env.E2E_LIVE_CONNECTION_ID_FAN ?? envVars.E2E_LIVE_CONNECTION_ID_FAN,
          2000,
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

describe("SDK Contract: Access API (non-GET endpoints)", () => {
  it(
    "never returns raw strings for non-GET endpoints (even on errors)",
    async () => {
      if (!shouldRunSuite("access-nonget")) return;

      const endpoints = loadManifest();
      expect(endpoints.length).toBeGreaterThan(20);

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

        // Intentionally pass no fixtures: runner uses safe fake IDs for route params to avoid side effects.
        const result = await runSdkNonGetContract(
          {
            name: ctx.name,
            baseUrl: BASE_URL,
            apiKey: ctx.apiKey!,
            connectionId: ctx.connectionId!,
            minDelayMs: ctx.minDelayMs,
            strict: STRICT,
          },
          endpoints,
        );

        if (STRICT) {
          expect(result.skipped).toBe(0);
        }
      }
    },
    30 * 60_000,
  );
});
