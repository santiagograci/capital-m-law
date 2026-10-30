import "server-only";

import { unstable_noStore as noStore } from "next/cache";
import type { BlogPost, BlogPostSummary } from "@/types/blog";
import { readAllPosts } from "./store";
import { sortByNewest, toSummary } from "./utils";

/** Cache tag invalidated by every admin mutation (see actions.ts). */
export const BLOG_TAG = "blog-posts";

export async function getAllPosts(): Promise<BlogPost[]> {
  noStore();
  return sortByNewest(await readAllPosts());
}

export async function getPostSummaries(): Promise<BlogPostSummary[]> {
  noStore();
  const posts = sortByNewest(await readAllPosts());
  return posts.map(toSummary);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  noStore();
  const posts = await readAllPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

/** Same category first, then shared tags; excludes the current post. */
export async function getRelatedPosts(post: BlogPost, limit = 3): Promise<BlogPostSummary[]> {
  noStore();
  const all = sortByNewest(await readAllPosts()).filter((p) => p.id !== post.id);
  const tagSet = new Set(post.tags.map((t) => t.toLowerCase()));
  return all
    .map((p) => ({
      p,
      score:
        (p.category === post.category ? 3 : 0) +
        p.tags.filter((t) => tagSet.has(t.toLowerCase())).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ p }) => toSummary(p));
}
