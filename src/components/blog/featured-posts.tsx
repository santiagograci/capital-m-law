import Link from "next/link";
import { ArrowRight, Clock, Star } from "lucide-react";
import { formatPostDate } from "@/lib/blog/utils";
import type { BlogPostSummary } from "@/types/blog";
import { CategoryBadge } from "./category-badge";
import { CoverImage } from "./cover-image";

/**
 * "Featured Posts" — editorial layout: one large hero card + up to two
 * stacked secondary cards. Rendered only when no filter is active.
 */
export function FeaturedPosts({ posts }: { posts: BlogPostSummary[] }) {
  if (posts.length === 0) return null;
  const [main, ...rest] = posts;

  return (
    <section aria-labelledby="featured-heading" className="mb-16">
      <div className="mb-6 flex items-center gap-3">
        <span className="inline-flex size-8 items-center justify-center rounded-lg bg-[#C01072]/10 text-[#C01072]">
          <Star className="size-4 fill-current" />
        </span>
        <h2 id="featured-heading" className="text-xl font-semibold text-[#16345F] dark:text-white">
          Featured Insights
        </h2>
        <span className="h-px flex-1 bg-gradient-to-r from-[#9BB8E0]/60 to-transparent" />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Main featured */}
        <article className="group relative overflow-hidden rounded-3xl bg-[#16345F] lg:col-span-3 lg:row-span-2">
          <CoverImage
            src={main.coverImage}
            alt={main.title}
            priority
            className="absolute inset-0 size-full opacity-70 transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1C36] via-[#16345F]/70 to-transparent" />
          <div className="relative flex min-h-[420px] flex-col justify-end gap-4 p-8 sm:p-10 lg:min-h-[520px]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-[#C01072] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                <Star className="size-3 fill-current" /> Featured
              </span>
              <CategoryBadge category={main.category} className="bg-white/90 text-[#16345F]" />
            </div>
            <h3 className="max-w-2xl text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
              <Link href={`/blog/${main.slug}`} className="after:absolute after:inset-0 after:content-['']">
                {main.title}
              </Link>
            </h3>
            <p className="line-clamp-2 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
              {main.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#9BB8E0]">
              <span className="font-medium text-white">{main.author}</span>
              <time dateTime={main.publishedAt}>{formatPostDate(main.publishedAt)}</time>
              <span className="inline-flex items-center gap-1">
                <Clock className="size-3.5" /> {main.readingTime} min read
              </span>
            </div>
          </div>
        </article>

        {/* Secondary featured */}
        {rest.slice(0, 2).map((post) => (
          <article
            key={post.id}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-[#16345F]/8 bg-white transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-20px_rgba(22,52,95,0.4)] dark:border-white/10 dark:bg-[#0F1E35] sm:flex-row lg:col-span-2"
          >
            <div className="relative aspect-[16/9] shrink-0 overflow-hidden sm:aspect-auto sm:w-2/5">
              <CoverImage src={post.coverImage} alt={post.title} className="size-full transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="flex flex-1 flex-col gap-2.5 p-6">
              <CategoryBadge category={post.category} className="self-start" />
              <h3 className="line-clamp-3 text-base font-semibold leading-snug text-[#16345F] dark:text-white">
                <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 after:content-['']">
                  {post.title}
                </Link>
              </h3>
              <p className="line-clamp-2 text-xs leading-relaxed text-[#706F6F] dark:text-gray-400">
                {post.excerpt}
              </p>
              <span className="mt-auto inline-flex items-center gap-1 pt-2 text-xs font-semibold text-[#C01072] dark:text-[#F472B6]">
                Read article <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
