import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";
import type { BlogPost } from "@/types/blog";

/**
 * File-based persistence for the blog.
 *
 * - Posts live in `content/blog/posts.json` (versionable, zero infra).
 * - Uploaded covers live in `storage/blog-uploads/` and are served by
 *   `app/api/blog/uploads/[file]/route.ts` (files added to `public/` after
 *   build are NOT served in production, so we never write there).
 *
 * Swap this module for a DB adapter (Prisma, Supabase, Sanity…) later —
 * the rest of the module only depends on these exported functions.
 */

const ROOT = process.cwd();
const POSTS_FILE = path.join(ROOT, "content", "blog", "posts.json");
export const UPLOADS_DIR = path.join(ROOT, "storage", "blog-uploads");

// Serialize writes within this process to avoid lost updates.
let writeQueue: Promise<unknown> = Promise.resolve();

async function readRaw(): Promise<BlogPost[]> {
  try {
    const raw = await fs.readFile(POSTS_FILE, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as BlogPost[]) : [];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

async function writeRaw(posts: BlogPost[]): Promise<void> {
  await fs.mkdir(path.dirname(POSTS_FILE), { recursive: true });
  const tmp = `${POSTS_FILE}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(posts, null, 2) + "\n", "utf8");
  await fs.rename(tmp, POSTS_FILE); // atomic replace
}

export async function readAllPosts(): Promise<BlogPost[]> {
  return readRaw();
}

/** Runs `mutator` against the latest data under a write lock and persists the result. */
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
export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5 MB

export async function saveUpload(file: File): Promise<string> {
  const ext =
    Object.entries(MIME_BY_EXT).find(([, mime]) => mime === file.type)?.[0] ?? ".jpg";
  const name = `${crypto.randomUUID()}${ext}`;
  await fs.mkdir(UPLOADS_DIR, { recursive: true });
  await fs.writeFile(path.join(UPLOADS_DIR, name), Buffer.from(await file.arrayBuffer()));
  return `/api/blog/uploads/${name}`;
}

export async function readUpload(name: string): Promise<{ body: Buffer; type: string } | null> {
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

export async function deleteUpload(url: string | null): Promise<void> {
  if (!url?.startsWith("/api/blog/uploads/")) return;
  const name = url.split("/").pop() ?? "";
  if (!/^[a-f0-9-]{36}\.[a-z]+$/i.test(name)) return;
  await fs.rm(path.join(UPLOADS_DIR, name), { force: true });
}
