import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";
import type { AttorneyBio } from "@/types/team";
import { ATTORNEYS } from "@/data/team-data";

const ROOT = process.cwd();
const TEAM_FILE = path.join(ROOT, "content", "team", "members.json");

// Serialize writes within this process to avoid lost updates.
let writeQueue: Promise<unknown> = Promise.resolve();

function getInitialMembers(): AttorneyBio[] {
  return ATTORNEYS.map((attorney, idx) => ({
    ...attorney,
    order: idx + 1,
    active: true,
    specialties: {
      en: attorney.id === "maria-fernanda-duarte"
        ? ["Immigration & Visas", "Real Estate Due Diligence", "Foreign Investment"]
        : ["Visas & Salvoconductos", "Corporate Compliance", "Notary Transactions"],
      es: attorney.id === "maria-fernanda-duarte"
        ? ["Visas e Inmigración", "Estudio de Títulos Inmobiliario", "Inversión Extranjera"]
        : ["Visas y Salvoconductos", "Cumplimiento Corporativo", "Trámites Notariales"],
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
}

async function readRaw(): Promise<AttorneyBio[]> {
  try {
    const raw = await fs.readFile(TEAM_FILE, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed as AttorneyBio[];
    }
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== "ENOENT") {
      console.error("Error reading team file:", err);
    }
  }

  // Seed default members if file does not exist
  const initial = getInitialMembers();
  await writeRaw(initial);
  return initial;
}

async function writeRaw(members: AttorneyBio[]): Promise<void> {
  await fs.mkdir(path.dirname(TEAM_FILE), { recursive: true });
  const tmp = `${TEAM_FILE}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(members, null, 2) + "\n", "utf8");
  await fs.rename(tmp, TEAM_FILE); // atomic replace
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
