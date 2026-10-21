/**
 * Capital M Law — Blog domain types.
 * Shared between server (storage, actions) and client (explorer, filters).
 */

export const BLOG_CATEGORIES = [
  "Visas",
  "Real Estate",
  "Corporate & SAS",
  "Legal Tips",
  "Tax & Compliance",
  "Family Law",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  author: string;
  category: BlogCategory;
  /** Free-form tags used by the public tag filter (e.g. "Digital Nomad", "M Visa"). */
  tags: string[];
  coverImage: string | null;
  excerpt: string;
  /** Full body in Markdown (GFM supported). */
  content: string;
  featured: boolean;
  /** ISO 8601 */
  publishedAt: string;
  /** ISO 8601 */
  updatedAt: string;
  /** Minutes, computed from `content` on save. */
  readingTime: number;
}

/** Lightweight shape sent to the client explorer (no full body → smaller payload). */
export type BlogPostSummary = Omit<BlogPost, "content">;

export type BlogSort = "newest" | "oldest" | "quick";

export interface BlogFilterState {
  query: string;
  category: BlogCategory | null;
  tags: string[];
  sort: BlogSort;
}

/** Result returned by admin Server Actions to `useActionState`. */
export interface ActionResult {
  ok: boolean;
  message: string;
  fieldErrors?: Partial<Record<string, string>>;
  slug?: string;
}
