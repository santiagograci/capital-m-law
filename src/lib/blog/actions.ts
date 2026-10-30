"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { BLOG_CATEGORIES, type ActionResult, type BlogCategory, type BlogPost } from "@/types/blog";
import { createSession, destroySession, requireStaff, verifyPassword } from "./auth";
import { BLOG_TAG } from "./queries";
import {
  ALLOWED_IMAGE_TYPES,
  MAX_UPLOAD_BYTES,
  deleteUpload,
  mutatePosts,
  saveUpload,
} from "./store";
import { computeReadingTime, parseTags, slugify } from "./utils";

function revalidateBlogRoutes(slug?: string) {
  updateTag(BLOG_TAG);
  if (slug) updateTag(`blog-post:${slug}`);
  revalidatePath("/", "layout");
  revalidatePath("/");
  revalidatePath("/blog");
  if (slug) revalidatePath(`/blog/${slug}`);
  revalidatePath("/admin");
  revalidatePath("/admin/blog");
  revalidatePath("/api/blog/recent");
}

/* -------------------------------------------------------------------------- */
/*                                   Auth                                     */
/* -------------------------------------------------------------------------- */

export async function loginAction(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const password = String(formData.get("password") ?? "");
  // Small constant delay to blunt brute force attempts.
  await new Promise((r) => setTimeout(r, 400));
  if (!verifyPassword(password)) {
    return { ok: false, message: "Invalid staff password." };
  }
  await createSession();
  redirect("/admin/blog");
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/admin/blog");
}

/* -------------------------------------------------------------------------- */
/*                                Validation                                  */
/* -------------------------------------------------------------------------- */

type Field = "title" | "author" | "category" | "excerpt" | "content" | "cover" | "slug";

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function isValidCoverUrl(url: string): boolean {
  if (url.startsWith("/")) return !url.startsWith("//");
  try {
    const u = new URL(url);
    return u.protocol === "https:";
  } catch {
    return false;
  }
}

/* -------------------------------------------------------------------------- */
/*                              Create / Update                               */
/* -------------------------------------------------------------------------- */

export async function savePostAction(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  await requireStaff();

  const id = str(formData, "id") || null;
  const title = str(formData, "title");
  const author = str(formData, "author");
  const category = str(formData, "category") as BlogCategory;
  const excerpt = str(formData, "excerpt");
  const content = String(formData.get("content") ?? "").trim();
  const tags = parseTags(str(formData, "tags"));
  const featured = formData.get("featured") === "on";
  const coverMode = str(formData, "coverMode"); // "url" | "upload" | "none"
  const coverUrl = str(formData, "coverUrl");
  const coverFile = formData.get("coverFile");
  const customSlug = slugify(str(formData, "slug"));

  const errors: Partial<Record<Field, string>> = {};
  if (title.length < 5 || title.length > 140) errors.title = "Title must be 5–140 characters.";
  if (author.length < 2 || author.length > 80) errors.author = "Author is required.";
  if (!BLOG_CATEGORIES.includes(category)) errors.category = "Choose a valid category.";
  if (excerpt.length < 20 || excerpt.length > 320) errors.excerpt = "Excerpt must be 20–320 characters.";
  if (content.length < 50) errors.content = "Content must be at least 50 characters.";

  let uploadFile: File | null = null;
  if (coverMode === "url" && coverUrl && !isValidCoverUrl(coverUrl)) {
    errors.cover = "Use an https:// URL or a site-relative path (/images/...).";
  }
  if (coverMode === "upload" && coverFile instanceof File && coverFile.size > 0) {
    if (!ALLOWED_IMAGE_TYPES.has(coverFile.type)) errors.cover = "Allowed: JPG, PNG, WEBP, AVIF, GIF.";
    else if (coverFile.size > MAX_UPLOAD_BYTES) errors.cover = "Image must be 5 MB or less.";
    else uploadFile = coverFile;
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, message: "Please review the highlighted fields.", fieldErrors: errors };
  }

  const uploadedUrl = uploadFile ? await saveUpload(uploadFile) : null;

  try {
    const saved = await mutatePosts<BlogPost | { error: string }>((posts) => {
      const existing = id ? posts.find((p) => p.id === id) : undefined;
      if (id && !existing) return { posts, result: { error: "Post not found." } };

      // Unique slug: custom → existing → from title, suffixed on collision.
      const base = customSlug || existing?.slug || slugify(title) || "post";
      let slug = base;
      for (let i = 2; posts.some((p) => p.slug === slug && p.id !== id); i++) slug = `${base}-${i}`;

      let coverImage: string | null = existing?.coverImage ?? null;
      if (coverMode === "none") coverImage = null;
      else if (coverMode === "url" && coverUrl) coverImage = coverUrl;
      else if (coverMode === "upload" && uploadedUrl) coverImage = uploadedUrl;

      const now = new Date().toISOString();
      const post: BlogPost = {
        id: existing?.id ?? crypto.randomUUID(),
        slug,
        title,
        author,
        category,
        tags,
        coverImage,
        excerpt,
        content,
        featured,
        publishedAt: existing?.publishedAt ?? now,
        updatedAt: now,
        readingTime: computeReadingTime(content),
      };

      const next = existing ? posts.map((p) => (p.id === id ? post : p)) : [post, ...posts];
      return { posts: next, result: post };
    });

    if ("error" in saved) return { ok: false, message: saved.error };

    revalidateBlogRoutes(saved.slug);
    return {
      ok: true,
      message: id ? "Post updated successfully." : "Post published successfully.",
      slug: saved.slug,
    };
  } catch (err) {
    if (uploadedUrl) await deleteUpload(uploadedUrl);
    console.error("[blog] savePostAction failed", err);
    return { ok: false, message: "Could not save the post. Please try again." };
  }
}

/* -------------------------------------------------------------------------- */
/*                           Quick admin operations                           */
/* -------------------------------------------------------------------------- */

export async function toggleFeaturedAction(formData: FormData): Promise<void> {
  await requireStaff();
  const id = str(formData, "id");
  try {
    await mutatePosts((posts) => ({
      posts: posts.map((p) =>
        p.id === id ? { ...p, featured: !p.featured, updatedAt: new Date().toISOString() } : p,
      ),
      result: null,
    }));
    revalidateBlogRoutes();
  } catch (err) {
    console.error("[blog/actions] Error toggling featured:", err);
  }
}

export async function deletePostAction(formData: FormData): Promise<void> {
  await requireStaff();
  const id = str(formData, "id");
  try {
    const removed = await mutatePosts((posts) => ({
      posts: posts.filter((p) => p.id !== id),
      result: posts.find((p) => p.id === id) ?? null,
    }));
    if (removed) await deleteUpload(removed.coverImage);
    revalidateBlogRoutes(removed?.slug);
  } catch (err) {
    console.error("[blog/actions] Error deleting post:", err);
  }
}
