import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";
import { list, put } from "@vercel/blob";
import type { LifeMoment } from "@/types/life";

/**
 * Resilient persistence for Life at Capital M supporting both local dev,
 * Vercel Blob (shared across all Serverless instances), and /tmp fallback.
 */

const ROOT = process.cwd();
const LIFE_FILE = path.join(ROOT, "content", "life", "moments.json");
const TMP_LIFE_FILE = path.join("/tmp", "capital-m-law", "content", "life", "moments.json");
const BLOB_LIFE_KEY = "_db/life-moments.json";

const IS_SERVERLESS = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);

let inMemoryMoments: LifeMoment[] | null = null;
let writeQueue: Promise<unknown> = Promise.resolve();

function getInitialMoments(): LifeMoment[] {
  const now = new Date().toISOString();
  return [
    {
      id: "visa-celebration-provenza",
      title: {
        en: "Visa Celebration at Provenza",
        es: "Celebración de Visa en Provenza",
      },
      location: "El Poblado, Medellín (Provenza)",
      client: "Alex & María Fernanda",
      caption: {
        en: "Celebrating a 2-year digital nomad visa approval over fresh Colombian single-origin coffee.",
        es: "Celebrando la aprobación de 2 años de visa con café especial de origen.",
      },
      image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80",
      tag: {
        en: "Community",
        es: "Comunidad",
      },
      order: 1,
      active: true,
      date: "2026-02",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "real-estate-closing-notary-15",
      title: {
        en: "Real Estate Closing at Notary 15",
        es: "Cierre Inmobiliario en Notaría 15",
      },
      location: "Laureles, Medellín (Notaría 15)",
      client: "Carl & Ana María",
      caption: {
        en: "Handing over the keys and finalized public deed after a complete 20-year title audit.",
        es: "Entrega de llaves y firma de escritura pública tras un estudio de títulos sin riesgos.",
      },
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80",
      tag: {
        en: "Milestone",
        es: "Hito Legal",
      },
      order: 2,
      active: true,
      date: "2026-02",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "strategy-session-belen-malibu",
      title: {
        en: "Strategy Session at Belén Malibú HQ",
        es: "Sesión Estratégica en Sede Belén Malibú",
      },
      location: "Medellín HQ (Belén Malibú)",
      client: "Founders & Legal Team",
      caption: {
        en: "Mapping out a new tech company incorporation and bilingual employment contracts.",
        es: "Estructurando la constitución de una nueva SAS y contratos laborales bilingües.",
      },
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
      tag: {
        en: "Everyday Life",
        es: "Día a Día",
      },
      order: 3,
      active: true,
      date: "2026-03",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "cedula-extranjeria-delivery-day",
      title: {
        en: "Cédula Extranjería Delivery Day",
        es: "Entrega de Cédula de Extranjería",
      },
      location: "Migración Colombia, Medellín",
      client: "Jay & The Team",
      caption: {
        en: "From initial consultation to holding the physical Colombian ID card in record time.",
        es: "Acompañamiento presencial para reclamar el documento físico en tiempo récord.",
      },
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
      tag: {
        en: "Success Story",
        es: "Caso de Éxito",
      },
      order: 4,
      active: true,
      date: "2026-03",
      createdAt: now,
      updatedAt: now,
    },
  ];
}

async function readRaw(): Promise<LifeMoment[]> {
  // 1. Try reading from Vercel Blob (shared across all serverless function instances)
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { blobs } = await list({
        prefix: BLOB_LIFE_KEY,
        limit: 1,
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      const match = blobs.find((b) => b.pathname === BLOB_LIFE_KEY) ?? blobs[0];
      if (match?.url) {
        const res = await fetch(`${match.url}?t=${Date.now()}`, { cache: "no-store" });
        if (res.ok) {
          const parsed = await res.json();
          if (Array.isArray(parsed) && parsed.length > 0) {
            inMemoryMoments = parsed as LifeMoment[];
            return inMemoryMoments;
          }
        }
      }
    } catch (err) {
      console.warn("[life/store] Could not read from Vercel Blob, falling back:", err);
    }
  }

  // 2. /tmp (persisted across warm serverless calls or multi-worker local runs)
  try {
    const tmpRaw = await fs.readFile(TMP_LIFE_FILE, "utf8");
    const parsed = JSON.parse(tmpRaw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      inMemoryMoments = parsed as LifeMoment[];
      return inMemoryMoments;
    }
  } catch {}

  // 3. Bundled static
  try {
    const raw = await fs.readFile(LIFE_FILE, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed) && parsed.length > 0) {
      inMemoryMoments = parsed as LifeMoment[];
      return inMemoryMoments;
    }
  } catch {}

  // 4. In-memory
  if (inMemoryMoments !== null && inMemoryMoments.length > 0) {
    return inMemoryMoments;
  }

  // 5. Default seed
  const initial = getInitialMoments();
  inMemoryMoments = initial;
  return initial;
}

async function writeRaw(moments: LifeMoment[]): Promise<void> {
  inMemoryMoments = moments;
  const serialized = JSON.stringify(moments, null, 2) + "\n";

  // 1. Write to Vercel Blob so all serverless instances read the latest state
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      await put(BLOB_LIFE_KEY, serialized, {
        access: "public",
        addRandomSuffix: false,
        allowOverwrite: true,
        cacheControlMaxAge: 0,
        contentType: "application/json",
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
    } catch (err) {
      console.warn("[life/store] Could not write to Vercel Blob:", err);
    }
  }

  // 2. /tmp
  try {
    await fs.mkdir(path.dirname(TMP_LIFE_FILE), { recursive: true });
    const tmpFile = `${TMP_LIFE_FILE}.${process.pid}.${Date.now()}.tmp`;
    await fs.writeFile(tmpFile, serialized, "utf8");
    await fs.rename(tmpFile, TMP_LIFE_FILE);
  } catch (err) {
    console.warn("[life/store] Could not write to /tmp (retained in-memory):", err);
  }

  // 3. Local dev
  if (!IS_SERVERLESS) {
    try {
      await fs.mkdir(path.dirname(LIFE_FILE), { recursive: true });
      const localTmp = `${LIFE_FILE}.${process.pid}.${Date.now()}.tmp`;
      await fs.writeFile(localTmp, serialized, "utf8");
      await fs.rename(localTmp, LIFE_FILE);
    } catch (err) {
      console.warn("[life/store] Local file write skipped:", err);
    }
  }
}

export async function readAllLifeMoments(): Promise<LifeMoment[]> {
  return readRaw();
}

export function mutateLifeMoments<T>(
  mutator: (moments: LifeMoment[]) => { moments: LifeMoment[]; result: T } | Promise<{ moments: LifeMoment[]; result: T }>,
): Promise<T> {
  const run = writeQueue.then(async () => {
    const current = await readRaw();
    const { moments, result } = await mutator(current);
    await writeRaw(moments);
    return result;
  });
  writeQueue = run.catch(() => undefined);
  return run;
}
