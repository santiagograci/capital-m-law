import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
export const UPLOADS_DIR = path.join(ROOT, "storage", "uploads");

const MIME_BY_EXT: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
};

export const ALLOWED_IMAGE_TYPES = new Set(Object.values(MIME_BY_EXT));
export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024; // 10 MB

export async function saveMediaUpload(file: File): Promise<string> {
  const ext =
    Object.entries(MIME_BY_EXT).find(([, mime]) => mime === file.type)?.[0] ?? ".jpg";
  const name = `${crypto.randomUUID()}${ext}`;
  await fs.mkdir(UPLOADS_DIR, { recursive: true });
  await fs.writeFile(path.join(UPLOADS_DIR, name), Buffer.from(await file.arrayBuffer()));
  return `/api/uploads/${name}`;
}

export async function readMediaUpload(name: string): Promise<{ body: Buffer; type: string } | null> {
  // Strict whitelist: uuid + known extension → no path traversal possible.
  if (!/^[a-f0-9-]{36}\.(jpe?g|png|webp|avif|gif)$/i.test(name)) return null;
  try {
    const body = await fs.readFile(path.join(UPLOADS_DIR, name));
    const type = MIME_BY_EXT[path.extname(name).toLowerCase()] ?? "application/octet-stream";
    return { body, type };
  } catch {
    return null;
  }
}

export async function deleteMediaUpload(url: string | null): Promise<void> {
  if (!url?.startsWith("/api/uploads/")) return;
  const name = url.split("/").pop() ?? "";
  if (!/^[a-f0-9-]{36}\.[a-z]+$/i.test(name)) return;
  await fs.rm(path.join(UPLOADS_DIR, name), { force: true });
}
