import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPostDate } from "@/lib/blog/utils";
import type { BlogPostSummary } from "@/types/blog";
import { CategoryBadge } from "./category-badge";
import { CoverImage } from "./cover-image";

interface PostCardProps {
  post: BlogPostSummary;
  /** Called when a tag chip inside the card is clicked (explorer filter). */
  onTagClick?: (tag: string) => void;
  activeTags?: string[];
  className?: string;
}

export function PostCard({ post, onTagClick, activeTags = [], className }: PostCardProps) {
  const active = new Set(activeTags.map((t) => t.toLowerCase()));

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#16345F]/8 bg-white shadow-[0_1px_2px_rgba(22,52,95,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#9BB8E0] hover:shadow-[0_18px_40px_-18px_rgba(22,52,95,0.35)] dark:border-white/10 dark:bg-[#0F1E35] dark:hover:border-[#9BB8E0]/40",
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <CoverImage
          src={post.coverImage}
          alt={post.title}
          className="size-full transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute left-4 top-4">
          <CategoryBadge category={post.category} className="bg-white/95 shadow-sm backdrop-blur dark:bg-[#0A1526]/90" />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center gap-2 text-xs text-[#706F6F] dark:text-gray-400">
          <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
          <span aria-hidden>•</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" /> {post.readingTime} min read
          </span>
        </div>

        <h3 className="text-lg font-semibold leading-snug text-[#16345F] dark:text-white">
          {/* Stretched link: whole card clickable, tag buttons stay interactive via z-index. */}
          <Link
            href={`/blog/${post.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {post.title}
          </Link>
        </h3>

        <p className="line-clamp-3 text-sm leading-relaxed text-[#706F6F] dark:text-gray-300">
          {post.excerpt}
        </p>

        {post.tags.length > 0 && (
          <ul className="relative z-10 mt-1 flex flex-wrap gap-1.5" aria-label="Tags">
            {post.tags.slice(0, 4).map((tag) => (
              <li key={tag}>
                {onTagClick ? (
                  <button
                    type="button"
                    onClick={() => onTagClick(tag)}
                    aria-pressed={active.has(tag.toLowerCase())}
                    className={cn(
                      "rounded-md px-2 py-0.5 text-[11px] font-medium transition-colors",
                      active.has(tag.toLowerCase())
                        ? "bg-[#C01072] text-white"
                        : "bg-[#9BB8E0]/20 text-[#16345F] hover:bg-[#9BB8E0]/40 dark:bg-white/5 dark:text-[#9BB8E0] dark:hover:bg-white/10",
                    )}
                  >
                    #{tag}
                  </button>
                ) : (
                  <span className="rounded-md bg-[#9BB8E0]/20 px-2 py-0.5 text-[11px] font-medium text-[#16345F] dark:bg-white/5 dark:text-[#9BB8E0]">
                    #{tag}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex items-center justify-between border-t border-[#16345F]/5 pt-4 text-xs dark:border-white/5">
          <span className="font-medium text-[#16345F] dark:text-gray-200">{post.author}</span>
          <span className="inline-flex items-center gap-1 font-semibold text-[#C01072] transition-transform group-hover:translate-x-0.5 dark:text-[#F472B6]">
            Read <ArrowUpRight className="size-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
