"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Clock, BookOpen, Sparkles } from "lucide-react";
import type { BlogPostSummary } from "@/types/blog";
import { CategoryBadge } from "@/components/blog/category-badge";
import { CoverImage } from "@/components/blog/cover-image";
import { formatPostDate } from "@/lib/blog/utils";

interface HomeBlogSectionProps {
  lang: "en" | "es";
  title: string;
  youtubeCardText: string;
  instagramCardText: string;
}

export function HomeBlogSection({
  lang,
  title,
  youtubeCardText,
  instagramCardText,
}: HomeBlogSectionProps) {
  const [posts, setPosts] = useState<BlogPostSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadRecentPosts() {
      try {
        const res = await fetch("/api/blog/recent");
        if (res.ok) {
          const data = await res.json();
          if (isMounted && Array.isArray(data)) {
            setPosts(data);
          }
        }
      } catch (err) {
        console.error("Error loading blog posts for home:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadRecentPosts();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      id="blog"
      className="py-20 px-4 bg-gray-50/60 dark:bg-white/[0.02] border-t border-gray-100 dark:border-white/10 relative z-10 space-y-12"
    >
      <div className="max-w-[1240px] mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C01072]/20 bg-[#C01072]/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#C01072] dark:border-[#F472B6]/30 dark:bg-white/5 dark:text-[#F472B6] mb-3">
              <BookOpen className="size-3.5" />
              <span>{lang === "es" ? "Artículos y Noticias" : "Legal Insights"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#16345F] dark:text-white">
              {title}
            </h2>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#C01072] dark:text-[#F472B6] hover:underline self-start md:self-auto group"
          >
            <span>{lang === "es" ? "Ver todos los artículos" : "View all articles"}</span>
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* 3 Dinamic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-[#0F223D] rounded-3xl p-6 border border-gray-200 dark:border-white/10 shadow-xs space-y-4 animate-pulse"
              >
                <div className="aspect-[16/10] rounded-2xl bg-gray-200 dark:bg-white/10" />
                <div className="h-4 w-20 rounded-full bg-gray-200 dark:bg-white/10" />
                <div className="h-6 w-3/4 rounded bg-gray-200 dark:bg-white/10" />
                <div className="h-14 w-full rounded bg-gray-200 dark:bg-white/10" />
              </div>
            ))
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <article
                key={post.id}
                className="group relative bg-white dark:bg-[#0F223D] rounded-3xl p-6 border border-gray-200 dark:border-white/10 shadow-xs hover:shadow-xl hover:border-[#9BB8E0] dark:hover:border-[#9BB8E0]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="aspect-[16/10] rounded-2xl bg-gray-100 dark:bg-gray-800 overflow-hidden relative">
                    <CoverImage
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <CategoryBadge
                        category={post.category}
                        className="bg-white/95 dark:bg-[#0A1526]/90 backdrop-blur shadow-xs text-[10px]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[#706F6F] dark:text-gray-400">
                    <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3" /> {post.readingTime} min
                    </span>
                  </div>

                  <h3 className="font-bold text-[#16345F] dark:text-white text-lg leading-snug group-hover:text-[#C01072] dark:group-hover:text-[#F472B6] transition-colors line-clamp-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="after:absolute after:inset-0 after:content-['']"
                    >
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between text-xs">
                  <span className="font-medium text-[#16345F] dark:text-gray-300 truncate max-w-[65%]">
                    {post.author}
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-[#C01072] dark:text-[#F472B6] group-hover:translate-x-0.5 transition-transform">
                    {lang === "es" ? "Leer artículo" : "Read article"}
                    <ArrowUpRight className="size-3.5" />
                  </span>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full p-8 text-center bg-white dark:bg-[#0F223D] rounded-3xl border border-dashed border-[#9BB8E0] text-sm text-[#706F6F]">
              {lang === "es"
                ? "No hay artículos publicados todavía."
                : "No articles published yet."}
            </div>
          )}
        </div>

        {/* Redes Sociales: YouTube & Instagram */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          <a
            href="https://www.youtube.com/@CapitalMLaw"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white dark:bg-[#0F223D] rounded-3xl p-6 border border-gray-200 dark:border-white/10 text-center space-y-4 hover:shadow-lg transition-all hover:border-red-300 dark:hover:border-red-900/50 block"
          >
            <div className="flex items-center justify-center gap-2">
              <h3 className="text-2xl font-black text-red-600">YouTube</h3>
              <ArrowUpRight className="size-4 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="aspect-video bg-red-100 dark:bg-red-950/40 rounded-2xl flex items-center justify-center font-bold text-red-600 dark:text-red-300 shadow-inner group-hover:scale-[1.01] transition-transform">
              {youtubeCardText}
            </div>
          </a>

          <a
            href="https://www.instagram.com/capitalm.law"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white dark:bg-[#0F223D] rounded-3xl p-6 border border-gray-200 dark:border-white/10 text-center space-y-4 hover:shadow-lg transition-all hover:border-[#C01072]/40 dark:hover:border-[#C01072]/30 block"
          >
            <div className="flex items-center justify-center gap-2">
              <h3 className="text-2xl font-black text-[#C01072] dark:text-[#F472B6]">Instagram</h3>
              <ArrowUpRight className="size-4 text-[#C01072] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="aspect-video bg-pink-50 dark:bg-pink-950/30 rounded-2xl flex items-center justify-center font-bold text-[#C01072] dark:text-pink-300 shadow-inner group-hover:scale-[1.01] transition-transform">
              {instagramCardText}
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
