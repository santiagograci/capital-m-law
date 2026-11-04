import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";
import type { BlogPost } from "@/types/blog";

/**
 * Local file persistence for the blog supporting local content/blog/posts.json
 * and /tmp + in-memory fallback without relying on Vercel Blob.
 */

const ROOT = process.cwd();
const POSTS_FILE = path.join(ROOT, "content", "blog", "posts.json");
const TMP_POSTS_FILE = path.join("/tmp", "capital-m-law", "content", "blog", "posts.json");

export const PUBLIC_UPLOADS_DIR = path.join(ROOT, "public", "blog", "uploads");
export const UPLOADS_DIR = path.join(ROOT, "storage", "blog-uploads");
const TMP_UPLOADS_DIR = path.join("/tmp", "capital-m-law", "storage", "blog-uploads");

const IS_SERVERLESS = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);

let inMemoryPosts: BlogPost[] | null = null;
const inMemoryUploads = new Map<string, { body: Buffer; type: string }>();

let writeQueue: Promise<unknown> = Promise.resolve();

async function readRaw(): Promise<BlogPost[]> {
  // 1. Check /tmp working file
  try {
    const tmpRaw = await fs.readFile(TMP_POSTS_FILE, "utf8");
    const parsed = JSON.parse(tmpRaw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      inMemoryPosts = parsed as BlogPost[];
      return inMemoryPosts;
    }
  } catch {}

  // 2. Bundled static file in repository
  try {
    const raw = await fs.readFile(POSTS_FILE, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed) && parsed.length > 0) {
      inMemoryPosts = parsed as BlogPost[];
      return inMemoryPosts;
    }
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== "ENOENT") {
      console.warn("[blog/store] Error reading bundled posts file:", err);
    }
  }

  // 3. In-memory fallback
  if (inMemoryPosts !== null) {
    return inMemoryPosts;
  }

  inMemoryPosts = [];
  return [];
}

async function writeRaw(posts: BlogPost[]): Promise<void> {
  inMemoryPosts = posts;
  const serialized = JSON.stringify(posts, null, 2) + "\n";

  // 1. Write to /tmp
  try {
    await fs.mkdir(path.dirname(TMP_POSTS_FILE), { recursive: true });
    const tmpFile = `${TMP_POSTS_FILE}.${process.pid}.${Date.now()}.tmp`;
    await fs.writeFile(tmpFile, serialized, "utf8");
    await fs.rename(tmpFile, TMP_POSTS_FILE);
  } catch (err) {
    console.warn("[blog/store] Failed to write to /tmp (persisted in-memory):", err);
  }

  // 2. Write to local project directory when not in read-only serverless
  if (!IS_SERVERLESS) {
    try {
      await fs.mkdir(path.dirname(POSTS_FILE), { recursive: true });
      const localTmp = `${POSTS_FILE}.${process.pid}.${Date.now()}.tmp`;
      await fs.writeFile(localTmp, serialized, "utf8");
      await fs.rename(localTmp, POSTS_FILE);
    } catch (err) {
      console.warn("[blog/store] Local file write skipped or read-only:", err);
    }
  }
}

export async function readAllPosts(): Promise<BlogPost[]> {
  return readRaw();
}

export function mutatePosts<T>(
  mutator: (posts: BlogPost[]) => { posts: BlogPost[]; result: T } | Promise<{ posts: BlogPost[]; result: T }>,
): Promise<T> {
  const run = writeQueue.then(async () => {
    const current = await readRaw();
    const { posts, result } = await mutator(current);
    await writeRaw(posts);
    return result;
  });
  writeQueue = run.catch(() => undefined);
  return run;
}

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

export async function saveUpload(file: File): Promise<string> {
  const ext =
    Object.entries(MIME_BY_EXT).find(([, mime]) => mime === file.type)?.[0] ?? ".jpg";
  const name = `${crypto.randomUUID()}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const mimeType = file.type || "image/jpeg";

  inMemoryUploads.set(name, { body: buffer, type: mimeType });

  if (!IS_SERVERLESS) {
    try {
      await fs.mkdir(PUBLIC_UPLOADS_DIR, { recursive: true });
      await fs.writeFile(path.join(PUBLIC_UPLOADS_DIR, name), buffer);
      return `/blog/uploads/${name}`;
    } catch (err) {
      console.warn("[blog/store] public/blog/uploads write skipped:", err);
    }
  }

  try {
    await fs.mkdir(TMP_UPLOADS_DIR, { recursive: true });
    await fs.writeFile(path.join(TMP_UPLOADS_DIR, name), buffer);
  } catch (err) {
    console.warn("[blog/store] Could not write upload to /tmp:", err);
  }

  return `/api/blog/uploads/${name}`;
}

export async function readUpload(name: string): Promise<{ body: Buffer; type: string } | null> {
  if (!/^[a-f0-9-]{36}\.(jpe?g|png|webp|avif|gif)$/i.test(name)) return null;

  const cached = inMemoryUploads.get(name);
  if (cached) return cached;

  const type = MIME_BY_EXT[path.extname(name).toLowerCase()] ?? "application/octet-stream";

  try {
    const body = await fs.readFile(path.join(PUBLIC_UPLOADS_DIR, name));
    inMemoryUploads.set(name, { body, type });
    return { body, type };
  } catch {}

  try {
    const body = await fs.readFile(path.join(TMP_UPLOADS_DIR, name));
    inMemoryUploads.set(name, { body, type });
    return { body, type };
  } catch {}

  try {
    const body = await fs.readFile(path.join(UPLOADS_DIR, name));
    inMemoryUploads.set(name, { body, type });
    return { body, type };
  } catch {
    return null;
  }
}

export async function deleteUpload(url: string | null): Promise<void> {
  if (!url?.startsWith("/api/blog/uploads/") && !url?.startsWith("/blog/uploads/")) return;
  const name = url.split("/").pop() ?? "";
  if (!/^[a-f0-9-]{36}\.[a-z]+$/i.test(name)) return;

  inMemoryUploads.delete(name);

  try {
    await fs.rm(path.join(TMP_UPLOADS_DIR, name), { force: true });
  } catch {}

  if (!IS_SERVERLESS) {
    try {
      await fs.rm(path.join(PUBLIC_UPLOADS_DIR, name), { force: true });
    } catch {}
    try {
      await fs.rm(path.join(UPLOADS_DIR, name), { force: true });
    } catch {}
  }
}
