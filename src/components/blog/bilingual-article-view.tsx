"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import { CategoryBadge } from "@/components/blog/category-badge";
import { CoverImage } from "@/components/blog/cover-image";
import { PostCard } from "@/components/blog/post-card";
import { PostContent } from "@/components/blog/post-content";
import { ShareButtons } from "@/components/blog/share-buttons";
import { ContextualBlogCta } from "@/components/blog/contextual-blog-cta";
import { formatPostDate, getLocalizedField } from "@/lib/blog/utils";
import type { BlogLanguage, BlogPost, BlogPostSummary } from "@/types/blog";

interface BilingualArticleViewProps {
  post: BlogPost;
  related: BlogPostSummary[];
}

export function BilingualArticleView({ post, related }: BilingualArticleViewProps) {
  const [lang, setLang] = useState<BlogLanguage>("en");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("capm-lang");
      if (saved === "en" || saved === "es") {
        setLang(saved);
      }
    } catch {
      // Fallback to 'en'
    }
  }, []);

  const handleLanguageChange = (nextLang: BlogLanguage) => {
    setLang(nextLang);
    try {
      window.localStorage.setItem("capm-lang", nextLang);
    } catch {
      // ignore storage errors
    }
  };

  const displayTitle = getLocalizedField(post.title, lang);
  const displayExcerpt = getLocalizedField(post.excerpt, lang);
  const displayContent = getLocalizedField(post.content, lang);

  return (
    <>
      <article>
        {/* Header */}
        <header className="mx-auto max-w-3xl px-4 pt-10 sm:px-6 sm:pt-14">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-sm font-medium text-[#706F6F] transition hover:text-[#16345F] dark:text-gray-400 dark:hover:text-white"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              <span>{lang === "es" ? "Todos los artículos" : "All articles"}</span>
            </Link>

            <div className="flex items-center gap-1.5 rounded-2xl border border-[#16345F]/10 bg-white p-1.5 shadow-xs dark:border-white/10 dark:bg-[#070E1A]">
              <button
                type="button"
                onClick={() => handleLanguageChange("en")}
                className={cn(
                  "rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer",
                  lang === "en"
                    ? "bg-[#16345F] text-white shadow-xs dark:bg-[#9BB8E0] dark:text-[#0A1526]"
                    : "text-[#706F6F] hover:text-[#16345F] dark:hover:text-white",
                )}
              >
                🇺🇸 English
              </button>
              <button
                type="button"
                onClick={() => handleLanguageChange("es")}
                className={cn(
                  "rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer",
                  lang === "es"
                    ? "bg-[#C01072] text-white shadow-xs"
                    : "text-[#706F6F] hover:text-[#16345F] dark:hover:text-white",
                )}
              >
                🇪🇸 Español
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <CategoryBadge category={post.category} />
            {post.featured && (
              <span className="rounded-full bg-[#C01072] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                {lang === "es" ? "Destacado" : "Featured"}
              </span>
            )}
          </div>

          <h1 className="mt-5 text-3xl font-bold leading-[1.15] tracking-tight text-[#16345F] dark:text-white sm:text-4xl lg:text-5xl">
            {displayTitle}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[#706F6F] dark:text-gray-300">
            {displayExcerpt}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-[#16345F]/10 py-5 dark:border-white/10">
            <dl className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#706F6F] dark:text-gray-400">
              <div className="flex items-center gap-2">
                <dt className="sr-only">Author</dt>
                <span className="flex size-9 items-center justify-center rounded-full bg-[#16345F] text-white dark:bg-[#9BB8E0] dark:text-[#0A1526]">
                  <UserRound className="size-4" />
                </span>
                <dd className="font-semibold text-[#16345F] dark:text-white">{post.author}</dd>
              </div>
              <div className="flex items-center gap-1.5">
                <dt className="sr-only">Published</dt>
                <CalendarDays className="size-4" />
                <dd>
                  <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
                </dd>
              </div>
              <div className="flex items-center gap-1.5">
                <dt className="sr-only">Reading time</dt>
                <Clock className="size-4" />
                <dd>
                  {post.readingTime} {lang === "es" ? "min de lectura" : "min read"}
                </dd>
              </div>
            </dl>
            <ShareButtons title={displayTitle} excerpt={displayExcerpt} />
          </div>
        </header>

        {post.coverImage && (
          <div className="mx-auto mt-10 max-w-5xl px-4 sm:px-6">
            <CoverImage
              src={post.coverImage}
              alt={displayTitle}
              priority
              className="aspect-[2/1] w-full rounded-3xl shadow-[0_30px_60px_-30px_rgba(22,52,95,0.45)]"
            />
          </div>
        )}

        {/* Body */}
        <div className="mx-auto mt-12 max-w-3xl px-4 sm:px-6">
          <PostContent markdown={displayContent} />

          {post.tags.length > 0 && (
            <ul className="mt-12 flex flex-wrap gap-2" aria-label="Tags">
              {post.tags.map((tag) => (
                <li key={tag}>
                  <Link
                    href={`/blog?tags=${encodeURIComponent(tag)}`}
                    className="rounded-lg bg-[#9BB8E0]/20 px-3 py-1.5 text-xs font-medium text-[#16345F] transition hover:bg-[#9BB8E0]/40 dark:bg-white/5 dark:text-[#9BB8E0]"
                  >
                    #{tag}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* Contextual Monetization CTA */}
          <ContextualBlogCta category={post.category} tags={post.tags} />

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#16345F]/10 pt-8 dark:border-white/10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-xl border border-[#16345F]/15 px-4 py-2.5 text-sm font-semibold text-[#16345F] transition hover:border-[#16345F] dark:border-white/15 dark:text-white"
            >
              <ArrowLeft className="size-4" />
              <span>{lang === "es" ? "Volver a todos los artículos" : "Back to all articles"}</span>
            </Link>
            <ShareButtons title={displayTitle} excerpt={displayExcerpt} />
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="mx-auto mt-20 max-w-7xl px-4 sm:px-6">
          <h2 id="related-heading" className="mb-6 text-2xl font-semibold text-[#16345F] dark:text-white">
            {lang === "es" ? "Artículos relacionados" : "Related articles"}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.id} post={p} lang={lang} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
