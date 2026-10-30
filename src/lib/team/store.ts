import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";
import { list, put } from "@vercel/blob";
import type { AttorneyBio } from "@/types/team";
import { ATTORNEYS } from "@/data/team-data";

/**
 * Resilient persistence for Team Members supporting both local dev,
 * Vercel Blob (shared across all Serverless instances), and /tmp fallback.
 */

const ROOT = process.cwd();
const TEAM_FILE = path.join(ROOT, "content", "team", "members.json");
const TMP_TEAM_FILE = path.join("/tmp", "capital-m-law", "content", "team", "members.json");
const BLOB_TEAM_KEY = "_db/team-members.json";

const IS_SERVERLESS = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);

let inMemoryTeam: AttorneyBio[] | null = null;
let writeQueue: Promise<unknown> = Promise.resolve();

function getInitialMembers(): AttorneyBio[] {
  return ATTORNEYS.map((attorney, idx) => ({
    ...attorney,
    order: idx + 1,
    active: true,
    specialties: {
      en:
        attorney.id === "maria-fernanda-duarte"
          ? ["Immigration & Visas", "Real Estate Due Diligence", "Foreign Investment"]
          : ["Visas & Salvoconductos", "Corporate Compliance", "Notary Transactions"],
      es:
        attorney.id === "maria-fernanda-duarte"
          ? ["Visas e Inmigración", "Estudio de Títulos Inmobiliario", "Inversión Extranjera"]
          : ["Visas y Salvoconductos", "Cumplimiento Corporativo", "Trámites Notariales"],
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
}

async function readRaw(): Promise<AttorneyBio[]> {
  // 1. Try reading from Vercel Blob (shared across all serverless function instances)
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { blobs } = await list({
        prefix: BLOB_TEAM_KEY,
        limit: 1,
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      const match = blobs.find((b) => b.pathname === BLOB_TEAM_KEY) ?? blobs[0];
      if (match?.url) {
        const res = await fetch(`${match.url}?t=${Date.now()}`, { cache: "no-store" });
        if (res.ok) {
          const parsed = await res.json();
          if (Array.isArray(parsed) && parsed.length > 0) {
            inMemoryTeam = parsed as AttorneyBio[];
            return inMemoryTeam;
          }
        }
      }
    } catch (err) {
      console.warn("[team/store] Could not read from Vercel Blob, falling back:", err);
    }
  }

  // 2. Try reading from /tmp (persisted across warm serverless calls or multi-worker local runs)
  try {
    const tmpRaw = await fs.readFile(TMP_TEAM_FILE, "utf8");
    const parsed = JSON.parse(tmpRaw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      inMemoryTeam = parsed as AttorneyBio[];
      return inMemoryTeam;
    }
  } catch {
    // /tmp not present yet
  }

  // 3. Try reading from bundled static file (/var/task or local cwd)
  try {
    const raw = await fs.readFile(TEAM_FILE, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed) && parsed.length > 0) {
      inMemoryTeam = parsed as AttorneyBio[];
      return inMemoryTeam;
    }
  } catch {
    // bundled file not found or empty
  }

  // 4. If in-memory cache exists
  if (inMemoryTeam !== null && inMemoryTeam.length > 0) {
    return inMemoryTeam;
  }

  // 5. Default seed
  const initial = getInitialMembers();
  inMemoryTeam = initial;
  return initial;
}

async function writeRaw(members: AttorneyBio[]): Promise<void> {
  inMemoryTeam = members;
  const serialized = JSON.stringify(members, null, 2) + "\n";

  // 1. Write to Vercel Blob so all serverless instances read the latest state
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      await put(BLOB_TEAM_KEY, serialized, {
        access: "public",
        addRandomSuffix: false,
        allowOverwrite: true,
        cacheControlMaxAge: 0,
        contentType: "application/json",
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
    } catch (err) {
      console.warn("[team/store] Could not write to Vercel Blob:", err);
    }
  }

  // 2. Write to /tmp (writable in Vercel Serverless)
  try {
    await fs.mkdir(path.dirname(TMP_TEAM_FILE), { recursive: true });
    const tmpFile = `${TMP_TEAM_FILE}.${process.pid}.${Date.now()}.tmp`;
    await fs.writeFile(tmpFile, serialized, "utf8");
    await fs.rename(tmpFile, TMP_TEAM_FILE);
  } catch (err) {
    console.warn("[team/store] Could not write to /tmp (retained in-memory):", err);
  }

  // 3. If local dev, also write to workspace
  if (!IS_SERVERLESS) {
    try {
      await fs.mkdir(path.dirname(TEAM_FILE), { recursive: true });
      const localTmp = `${TEAM_FILE}.${process.pid}.${Date.now()}.tmp`;
      await fs.writeFile(localTmp, serialized, "utf8");
      await fs.rename(localTmp, TEAM_FILE);
    } catch (err) {
      console.warn("[team/store] Local file write skipped:", err);
    }
  }
}

export async function readAllTeamMembers(): Promise<AttorneyBio[]> {
  return readRaw();
}

/** Runs `mutator` against the latest data under a write lock and persists the result. */
export function mutateTeamMembers<T>(
  mutator: (members: AttorneyBio[]) => { members: AttorneyBio[]; result: T } | Promise<{ members: AttorneyBio[]; result: T }>,
): Promise<T> {
  const run = writeQueue.then(async () => {
    const current = await readRaw();
    const { members, result } = await mutator(current);
    await writeRaw(members);
    return result;
  });
  writeQueue = run.catch(() => undefined);
  return run;
}
