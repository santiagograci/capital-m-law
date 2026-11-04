import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";
import type { AttorneyBio } from "@/types/team";
import { ATTORNEYS } from "@/data/team-data";

/**
 * Local file persistence for Team Members supporting content/team/members.json
 * and /tmp + in-memory fallback without relying on Vercel Blob.
 */

const ROOT = process.cwd();
const TEAM_FILE = path.join(ROOT, "content", "team", "members.json");
const TMP_TEAM_FILE = path.join("/tmp", "capital-m-law", "content", "team", "members.json");

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
  // 1. Try reading from /tmp
  try {
    const tmpRaw = await fs.readFile(TMP_TEAM_FILE, "utf8");
    const parsed = JSON.parse(tmpRaw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      inMemoryTeam = parsed as AttorneyBio[];
      return inMemoryTeam;
    }
  } catch {}

  // 2. Try reading from bundled static file
  try {
    const raw = await fs.readFile(TEAM_FILE, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed) && parsed.length > 0) {
      inMemoryTeam = parsed as AttorneyBio[];
      return inMemoryTeam;
    }
  } catch {}

  // 3. In-memory cache
  if (inMemoryTeam !== null && inMemoryTeam.length > 0) {
    return inMemoryTeam;
  }

  // 4. Default seed
  const initial = getInitialMembers();
  inMemoryTeam = initial;
  return initial;
}

async function writeRaw(members: AttorneyBio[]): Promise<void> {
  inMemoryTeam = members;
  const serialized = JSON.stringify(members, null, 2) + "\n";

  // 1. Write to /tmp
  try {
    await fs.mkdir(path.dirname(TMP_TEAM_FILE), { recursive: true });
    const tmpFile = `${TMP_TEAM_FILE}.${process.pid}.${Date.now()}.tmp`;
    await fs.writeFile(tmpFile, serialized, "utf8");
    await fs.rename(tmpFile, TMP_TEAM_FILE);
  } catch (err) {
    console.warn("[team/store] Could not write to /tmp (retained in-memory):", err);
  }

  // 2. If local dev, also write to workspace
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
