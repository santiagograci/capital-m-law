import Link from "next/link";
import { Pencil, Star, Trash, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { deletePostAction, toggleFeaturedAction } from "@/lib/blog/actions";
import { formatPostDate } from "@/lib/blog/utils";
import type { BlogPostSummary } from "@/types/blog";
import { CategoryBadge } from "../category-badge";
import { ConfirmSubmitButton } from "./confirm-submit-button";

/** Server-rendered management table. Mutations are progressive-enhancement forms. */
export function AdminPostsTable({ posts }: { posts: BlogPostSummary[] }) {
  if (posts.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-[#9BB8E0] p-10 text-center text-sm text-[#706F6F]">
        No posts yet — create your first one.
      </p>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#16345F]/10 bg-white dark:border-white/10 dark:bg-[#0F1E35]">
      <ul className="divide-y divide-[#16345F]/5 dark:divide-white/5">
        {posts.map((post) => (
          <li key={post.id} className="flex flex-wrap items-center gap-4 px-5 py-4">
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <CategoryBadge category={post.category} />
                {post.featured && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-[#C01072]">
                    <Star className="size-3 fill-current" /> Featured
                  </span>
                )}
              </div>
              <p className="truncate font-semibold text-[#16345F] dark:text-white">{post.title}</p>
              <p className="text-xs text-[#706F6F] dark:text-gray-400">
                {post.author} · {formatPostDate(post.publishedAt)} · {post.readingTime} min
              </p>
            </div>

            <div className="flex items-center gap-1">
              <form action={toggleFeaturedAction}>
                <input type="hidden" name="id" value={post.id} />
                <button
                  type="submit"
                  title={post.featured ? "Remove from featured" : "Mark as featured"}
                  aria-label={post.featured ? "Remove from featured" : "Mark as featured"}
                  className={cn(iconBtn, post.featured && "text-[#C01072]")}
                >
                  <Star className={cn("size-4", post.featured && "fill-current")} />
                </button>
              </form>
              <Link href={`/blog/${post.slug}`} title="View" aria-label="View post" className={iconBtn}>
                <ExternalLink className="size-4" />
              </Link>
              <Link href={`/admin/blog/edit/${post.id}`} title="Edit" aria-label="Edit post" className={iconBtn}>
                <Pencil className="size-4" />
              </Link>
              <form action={deletePostAction}>
                <input type="hidden" name="id" value={post.id} />
                <ConfirmSubmitButton
                  message={`Delete “${post.title}”? This cannot be undone.`}
                  className={cn(iconBtn, "hover:bg-[#C01072]/10 hover:text-[#C01072]")}
                  aria-label="Delete post"
                  title="Delete"
                >
                  <Trash className="size-4" />
                </ConfirmSubmitButton>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const iconBtn =
  "inline-flex size-9 items-center justify-center rounded-lg text-[#706F6F] transition hover:bg-[#16345F]/5 hover:text-[#16345F] dark:hover:bg-white/10 dark:hover:text-white";
