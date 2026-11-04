import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";
import { list, put } from "@vercel/blob";
import { unstable_cache } from "next/cache";
import type { BlogPost } from "@/types/blog";

/**
 * Resilient persistence for the blog supporting Vercel Blob (shared across all
 * Serverless instances with 1-hour ISR caching), /tmp fallback, and local dev.
 */

const ROOT = process.cwd();
const POSTS_FILE = path.join(ROOT, "content", "blog", "posts.json");
const TMP_POSTS_FILE = path.join("/tmp", "capital-m-law", "content", "blog", "posts.json");
const BLOB_POSTS_KEY = "_db/blog-posts.json";

export const UPLOADS_DIR = path.join(ROOT, "public", "blog", "uploads");
const TMP_UPLOADS_DIR = path.join("/tmp", "capital-m-law", "storage", "blog-uploads");

const IS_SERVERLESS = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
const CACHE_TTL_MS = 86400 * 1000; // 24 hours (ISR)

// In-memory layers to ensure state consistency & protect Vercel Blob operations
let inMemoryPosts: BlogPost[] | null = null;
let inMemoryPostsAt = 0;
const inMemoryUploads = new Map<string, { body: Buffer; type: string }>();

// Serialize writes within this process to avoid lost updates.
let writeQueue: Promise<unknown> = Promise.resolve();

async function readRaw(bypassCache = false): Promise<BlogPost[]> {
  if (
    !bypassCache &&
    inMemoryPosts !== null &&
    Date.now() - inMemoryPostsAt < CACHE_TTL_MS
  ) {
    return inMemoryPosts;
  }

  // 1. Read from Vercel Blob (shared across all serverless function instances)
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { blobs } = await list({
        prefix: BLOB_POSTS_KEY,
        limit: 1,
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      const match = blobs.find((b) => b.pathname === BLOB_POSTS_KEY) ?? blobs[0];
      if (match?.url) {
        const res = await fetch(
          bypassCache ? `${match.url}?t=${Date.now()}` : match.url,
          bypassCache
            ? { cache: "no-store" }
            : { next: { revalidate: 86400, tags: ["blog-posts"] } }
        );
        if (res.ok) {
          const parsed = await res.json();
          if (Array.isArray(parsed) && parsed.length > 0) {
            inMemoryPosts = parsed as BlogPost[];
            inMemoryPostsAt = Date.now();
            return inMemoryPosts;
          }
        }
      }
    } catch (err) {
      console.warn("[blog/store] Could not read from Vercel Blob, falling back:", err);
    }
  }

  // 2. Check /tmp working file
  try {
    const tmpRaw = await fs.readFile(TMP_POSTS_FILE, "utf8");
    const parsed = JSON.parse(tmpRaw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      inMemoryPosts = parsed as BlogPost[];
      inMemoryPostsAt = Date.now();
      return inMemoryPosts;
    }
  } catch {
    // /tmp file not present yet, continue
  }

  // 3. Fallback to bundled static file in repository
  try {
    const raw = await fs.readFile(POSTS_FILE, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed) && parsed.length > 0) {
      inMemoryPosts = parsed as BlogPost[];
      inMemoryPostsAt = Date.now();
      return inMemoryPosts;
    }
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== "ENOENT") {
      console.warn("[blog/store] Error reading bundled posts file:", err);
    }
  }

  // 4. In-memory fallback
  if (inMemoryPosts !== null) {
    return inMemoryPosts;
  }

  inMemoryPosts = [];
  return [];
}

async function writeRaw(posts: BlogPost[]): Promise<void> {
  inMemoryPosts = posts;
  inMemoryPostsAt = Date.now();
  const serialized = JSON.stringify(posts, null, 2) + "\n";

  // 1. Write to Vercel Blob so all serverless instances read the latest state
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      await put(BLOB_POSTS_KEY, serialized, {
        access: "public",
        addRandomSuffix: false,
        allowOverwrite: true,
        cacheControlMaxAge: 0,
        contentType: "application/json",
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
    } catch (err) {
      console.warn("[blog/store] Could not write to Vercel Blob:", err);
    }
  }

  // 2. Try to write to /tmp
  try {
    await fs.mkdir(path.dirname(TMP_POSTS_FILE), { recursive: true });
    const tmpFile = `${TMP_POSTS_FILE}.${process.pid}.${Date.now()}.tmp`;
    await fs.writeFile(tmpFile, serialized, "utf8");
    await fs.rename(tmpFile, TMP_POSTS_FILE);
  } catch (err) {
    console.warn("[blog/store] Failed to write to /tmp (persisted in-memory):", err);
  }

  // 3. If running locally, also write to project directory
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

const readCachedPosts = unstable_cache(
  async (): Promise<BlogPost[]> => readRaw(false),
  ["vercel-blob-blog-posts"],
  { revalidate: 86400, tags: ["blog-posts"] }
);

export async function readAllPosts(): Promise<BlogPost[]> {
  return readCachedPosts();
}

/** Runs `mutator` against the latest data under a write lock and persists the result. */
export function mutatePosts<T>(
  mutator: (posts: BlogPost[]) => { posts: BlogPost[]; result: T } | Promise<{ posts: BlogPost[]; result: T }>,
): Promise<T> {
  const run = writeQueue.then(async () => {
    const current = await readRaw(true);
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
      console.warn("[blog/store] Could not upload to Vercel Blob, falling back:", err);
    }
  }

  const ext =
    Object.entries(MIME_BY_EXT).find(([, mime]) => mime === file.type)?.[0] ?? ".jpg";
  const name = `${crypto.randomUUID()}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const mimeType = file.type || "image/jpeg";

  inMemoryUploads.set(name, { body: buffer, type: mimeType });

  try {
    await fs.mkdir(TMP_UPLOADS_DIR, { recursive: true });
    await fs.writeFile(path.join(TMP_UPLOADS_DIR, name), buffer);
  } catch (err) {
    console.warn("[blog/store] Could not write upload to /tmp:", err);
  }

  if (!IS_SERVERLESS) {
    try {
      await fs.mkdir(UPLOADS_DIR, { recursive: true });
      await fs.writeFile(path.join(UPLOADS_DIR, name), buffer);
      return `/blog/uploads/${name}`;
    } catch (err) {
      console.warn("[blog/store] Local upload write skipped:", err);
    }
  }

  return `/api/blog/uploads/${name}`;
}

export async function readUpload(name: string): Promise<{ body: Buffer; type: string } | null> {
  if (!/^[a-f0-9-]{36}\.(jpe?g|png|webp|avif|gif)$/i.test(name)) return null;

  const cached = inMemoryUploads.get(name);
  if (cached) return cached;

  try {
    const body = await fs.readFile(path.join(TMP_UPLOADS_DIR, name));
    const type = MIME_BY_EXT[path.extname(name).toLowerCase()] ?? "application/octet-stream";
    inMemoryUploads.set(name, { body, type });
    return { body, type };
  } catch {
    // Continue
  }

  try {
    const body = await fs.readFile(path.join(UPLOADS_DIR, name));
    const type = MIME_BY_EXT[path.extname(name).toLowerCase()] ?? "application/octet-stream";
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
      await fs.rm(path.join(UPLOADS_DIR, name), { force: true });
    } catch {}
  }
}
