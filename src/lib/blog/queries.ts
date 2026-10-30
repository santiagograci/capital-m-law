import "server-only";

import { unstable_cache } from "next/cache";
import type { BlogPost, BlogPostSummary } from "@/types/blog";
import { readAllPosts } from "./store";
import { sortByNewest, toSummary } from "./utils";

/** Cache tag invalidated by every admin mutation (see actions.ts). */
export const BLOG_TAG = "blog-posts";

export const getAllPosts = unstable_cache(
  async (): Promise<BlogPost[]> => {
    return sortByNewest(await readAllPosts());
  },
  ["all-posts"],
  { tags: [BLOG_TAG], revalidate: 86400 }
);

export const getPostSummaries = unstable_cache(
  async (): Promise<BlogPostSummary[]> => {
    const posts = sortByNewest(await readAllPosts());
    return posts.map(toSummary);
  },
  ["post-summaries"],
  { tags: [BLOG_TAG], revalidate: 86400 }
);

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const getCached = unstable_cache(
    async (s: string) => {
      const posts = await readAllPosts();
      return posts.find((p) => p.slug === s) ?? null;
    },
    [`post-by-slug-${slug}`],
    { tags: [BLOG_TAG, `blog-post:${slug}`], revalidate: 86400 }
  );
  return getCached(slug);
}

/** Same category first, then shared tags; excludes the current post. */
export async function getRelatedPosts(post: BlogPost, limit = 3): Promise<BlogPostSummary[]> {
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
