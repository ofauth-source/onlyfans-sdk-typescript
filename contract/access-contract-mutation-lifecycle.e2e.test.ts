import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { runSdkMutationLifecycleContract } from "./sdkContract";

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

function envBool(key: string, envVars: Record<string, string>) {
  const v = (process.env[key] ?? envVars[key] ?? "").toLowerCase().trim();
  return v === "1" || v === "true" || v === "yes";
}

function splitCsv(value?: string): string[] {
  return (value || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

type ContextSpec = {
  name: string;
  apiKey?: string;
  connectionId?: string;
  minDelayMs: number;
  kind: "sandbox" | "live";
  role: "creator" | "fan";
};

function expandContexts(
  baseName: string,
  kind: ContextSpec["kind"],
  role: ContextSpec["role"],
  apiKey: string | undefined,
  connectionId: string | undefined,
  minDelayMs: number,
): ContextSpec[] {
  const keys = splitCsv(apiKey);
  const conns = splitCsv(connectionId);

  if (keys.length <= 1 && conns.length <= 1) {
    return [{ name: baseName, kind, role, apiKey, connectionId, minDelayMs }];
  }

  const n = Math.max(keys.length, conns.length);
  const out: ContextSpec[] = [];
  for (let i = 0; i < n; i++) {
    out.push({
      name: `${baseName}#${i + 1}`,
      kind,
      role,
      apiKey: keys[i] || keys[0],
      connectionId: conns[i] || conns[0],
      minDelayMs,
    });
  }
  return out;
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
const REQUIRED = envBool("E2E_CONTRACT_REQUIRED", envVars);
const RUN_LIVE = envBool("E2E_LIVE_MUTATION_LIFECYCLES", envVars); // default false

function shouldRunSuite(name: string): boolean {
  const suitesRaw = (process.env.E2E_SDK_SUITES ?? envVars.E2E_SDK_SUITES ?? "");
  const suites = suitesRaw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (suites.length === 0) return false; // opt-in: getters only by default
  return suites.includes(name);
}

const contexts: ContextSpec[] = [
  ...expandContexts(
    "sandbox-creator",
    "sandbox",
    "creator",
    process.env.E2E_SANDBOX_API_KEY_CREATOR ?? envVars.E2E_SANDBOX_API_KEY_CREATOR,
    process.env.E2E_SANDBOX_CONNECTION_ID_CREATOR ?? envVars.E2E_SANDBOX_CONNECTION_ID_CREATOR,
    0,
  ),
  ...expandContexts(
    "sandbox-fan",
    "sandbox",
    "fan",
    process.env.E2E_SANDBOX_API_KEY_FAN ?? envVars.E2E_SANDBOX_API_KEY_FAN,
    process.env.E2E_SANDBOX_CONNECTION_ID_FAN ?? envVars.E2E_SANDBOX_CONNECTION_ID_FAN,
    0,
  ),
  ...expandContexts(
    "live-creator",
    "live",
    "creator",
    process.env.E2E_LIVE_API_KEY_CREATOR ?? envVars.E2E_LIVE_API_KEY_CREATOR,
    process.env.E2E_LIVE_CONNECTION_ID_CREATOR ?? envVars.E2E_LIVE_CONNECTION_ID_CREATOR,
    2000,
  ),
  ...expandContexts(
    "live-fan",
    "live",
    "fan",
    process.env.E2E_LIVE_API_KEY_FAN ?? envVars.E2E_LIVE_API_KEY_FAN,
    process.env.E2E_LIVE_CONNECTION_ID_FAN ?? envVars.E2E_LIVE_CONNECTION_ID_FAN,
    2000,
  ),
];

describe("SDK Contract: Access API (mutation lifecycles)", () => {
  it(
    "runs create/update/delete lifecycles (lists for all roles; posts for creators) without hardcoded ids",
    async () => {
      if (!shouldRunSuite("access-mutation-lifecycle")) return;

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

        if (ctx.kind === "live" && !RUN_LIVE) continue;

        const res = await runSdkMutationLifecycleContract(
          {
            name: ctx.name,
            baseUrl: BASE_URL,
            apiKey: ctx.apiKey!,
            connectionId: ctx.connectionId!,
            minDelayMs: ctx.minDelayMs,
            strict: true,
            allowSideEffects: true,
          },
          {
            includeUserLists: true,
            includePosts: ctx.role === "creator",
          },
        );

        expect(res.attempted).toBeGreaterThan(0);
      }
    },
    30 * 60_000,
  );
});
