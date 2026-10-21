"use client";

import React, { useEffect, useState, type SVGProps } from "react";
import Link from "next/link";
import { ArrowUpRight, Clock, BookOpen, Sparkles, Play } from "lucide-react";
import type { BlogPostSummary } from "@/types/blog";
import { CategoryBadge } from "@/components/blog/category-badge";
import { CoverImage } from "@/components/blog/cover-image";
import { formatPostDate } from "@/lib/blog/utils";

type IconProps = SVGProps<SVGSVGElement>;

const YoutubeIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const InstagramIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

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

        {/* Redes Sociales: YouTube & Instagram con Miniaturas Reales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          {/* Card YouTube */}
          <a
            href="https://www.youtube.com/@capitalemelaw"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white dark:bg-[#0F223D] rounded-3xl p-6 border border-gray-200 dark:border-white/10 shadow-xs hover:shadow-xl transition-all duration-300 hover:border-red-300 dark:hover:border-red-900/50 flex flex-col justify-between space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="size-10 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-xs">
                  <YoutubeIcon className="size-5" />
                </div>
                <div className="text-left">
                  <h3 className="text-base font-extrabold text-[#16345F] dark:text-white leading-tight">
                    YouTube Channel
                  </h3>
                  <p className="text-xs text-red-600 font-semibold">@capitalemelaw</p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 dark:bg-red-950/40 px-3 py-1.5 rounded-xl group-hover:bg-red-600 group-hover:text-white transition-colors">
                <span>{lang === "es" ? "Ver videos" : "Watch videos"}</span>
                <ArrowUpRight className="size-3.5" />
              </span>
            </div>

            {/* Video Thumbnail Preview */}
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-inner group/thumb">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/social/youtube-thumb.jpg"
                alt="Capital M Law YouTube Video Thumbnail"
                className="w-full h-full object-cover transition-transform duration-500 group-hover/thumb:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover/thumb:scale-110">
                  <Play className="size-6 fill-current translate-x-0.5" />
                </div>
              </div>

              {/* Title Overlay */}
              <div className="absolute bottom-3 left-4 right-4 text-left">
                <span className="inline-block bg-black/75 backdrop-blur text-white font-mono text-[10px] px-2 py-0.5 rounded-md font-semibold mb-1">
                  12:45
                </span>
                <p className="text-white text-xs sm:text-sm font-bold line-clamp-1 drop-shadow-md">
                  {youtubeCardText}
                </p>
              </div>
            </div>
          </a>

          {/* Card Instagram Feed */}
          <a
            href="https://www.instagram.com/capitalm.law/"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white dark:bg-[#0F223D] rounded-3xl p-6 border border-gray-200 dark:border-white/10 shadow-xs hover:shadow-xl transition-all duration-300 hover:border-[#C01072]/40 dark:hover:border-[#C01072]/30 flex flex-col justify-between space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="size-10 rounded-xl bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white flex items-center justify-center shadow-xs">
                  <InstagramIcon className="size-5" />
                </div>
                <div className="text-left">
                  <h3 className="text-base font-extrabold text-[#16345F] dark:text-white leading-tight">
                    Instagram Community
                  </h3>
                  <p className="text-xs text-[#C01072] dark:text-[#F472B6] font-semibold">@capitalm.law</p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#C01072] dark:text-[#F472B6] bg-pink-50 dark:bg-pink-950/40 px-3 py-1.5 rounded-xl group-hover:bg-[#C01072] group-hover:text-white transition-colors">
                <span>{lang === "es" ? "Seguir" : "Follow"}</span>
                <ArrowUpRight className="size-3.5" />
              </span>
            </div>

            {/* Instagram Multi-Photo Feed Grid */}
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-inner bg-gray-100 dark:bg-gray-800 p-2">
              <div className="grid grid-cols-3 gap-2 h-full">
                <div className="relative rounded-xl overflow-hidden group/item h-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/social/instagram-post-1.jpg"
                    alt="Instagram Post 1"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>
                <div className="relative rounded-xl overflow-hidden group/item h-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/social/instagram-post-2.jpg"
                    alt="Instagram Post 2"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>
                <div className="relative rounded-xl overflow-hidden group/item h-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/social/instagram-post-3.jpg"
                    alt="Instagram Post 3"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>
              </div>

              {/* Bottom Badge Bar */}
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-left">
                <span className="bg-black/75 backdrop-blur text-white text-[11px] font-semibold px-3 py-1 rounded-xl shadow-xs">
                  {instagramCardText}
                </span>
                <span className="bg-[#C01072] text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-xs">
                  Reels & Tips
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
