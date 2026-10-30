import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";
import { put } from "@vercel/blob";

const ROOT = process.cwd();
export const UPLOADS_DIR = path.join(ROOT, "storage", "uploads");
const TMP_UPLOADS_DIR = path.join("/tmp", "capital-m-law", "storage", "uploads");

const IS_SERVERLESS = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);

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

const inMemoryMedia = new Map<string, { body: Buffer; type: string }>();

export async function saveMediaUpload(file: File): Promise<string> {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const blob = await put(file.name, file, {
        access: "public",
        addRandomSuffix: true,
        allowOverwrite: true,
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      return blob.url;
    } catch (err) {
      console.warn("[media-store] Could not upload to Vercel Blob, falling back:", err);
    }
  }

  const ext =
    Object.entries(MIME_BY_EXT).find(([, mime]) => mime === file.type)?.[0] ?? ".jpg";
  const name = `${crypto.randomUUID()}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const mimeType = file.type || "image/jpeg";

  // 1. Always retain in-memory
  inMemoryMedia.set(name, { body: buffer, type: mimeType });

  // 2. Try writing to /tmp
  try {
    await fs.mkdir(TMP_UPLOADS_DIR, { recursive: true });
    await fs.writeFile(path.join(TMP_UPLOADS_DIR, name), buffer);
  } catch (err) {
    console.warn("[media-store] Could not write upload to /tmp:", err);
  }

  // 3. Local dev write
  if (!IS_SERVERLESS) {
    try {
      await fs.mkdir(UPLOADS_DIR, { recursive: true });
      await fs.writeFile(path.join(UPLOADS_DIR, name), buffer);
    } catch (err) {
      console.warn("[media-store] Local upload write skipped:", err);
    }
  }

  return `/api/uploads/${name}`;
}

export async function readMediaUpload(name: string): Promise<{ body: Buffer; type: string } | null> {
  if (!/^[a-f0-9-]{36}\.(jpe?g|png|webp|avif|gif)$/i.test(name)) return null;

  // 1. Check in-memory store
  const cached = inMemoryMedia.get(name);
  if (cached) return cached;

  // 2. Check /tmp
  try {
    const body = await fs.readFile(path.join(TMP_UPLOADS_DIR, name));
    const type = MIME_BY_EXT[path.extname(name).toLowerCase()] ?? "application/octet-stream";
    inMemoryMedia.set(name, { body, type });
    return { body, type };
  } catch {}

  // 3. Check bundled storage uploads
  try {
    const body = await fs.readFile(path.join(UPLOADS_DIR, name));
    const type = MIME_BY_EXT[path.extname(name).toLowerCase()] ?? "application/octet-stream";
    inMemoryMedia.set(name, { body, type });
    return { body, type };
  } catch {
    return null;
  }
}

export async function deleteMediaUpload(url: string | null): Promise<void> {
  if (!url?.startsWith("/api/uploads/")) return;
  const name = url.split("/").pop() ?? "";
  if (!/^[a-f0-9-]{36}\.[a-z]+$/i.test(name)) return;

  inMemoryMedia.delete(name);

  try {
    await fs.rm(path.join(TMP_UPLOADS_DIR, name), { force: true });
  } catch {}

  if (!IS_SERVERLESS) {
    try {
      await fs.rm(path.join(UPLOADS_DIR, name), { force: true });
    } catch {}
  }
}
