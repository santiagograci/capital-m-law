import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, CalendarDays, Clock, MessageCircle, UserRound } from "lucide-react";
import { CategoryBadge } from "@/components/blog/category-badge";
import { CoverImage } from "@/components/blog/cover-image";
import { PostCard } from "@/components/blog/post-card";
import { PostContent } from "@/components/blog/post-content";
import { ShareButtons } from "@/components/blog/share-buttons";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog/queries";
import { formatPostDate } from "@/lib/blog/utils";

/**
 * Cache Components requires ≥1 param. Existing posts are prerendered at build;
 * new posts render on first visit and are then stored (ISR-style).
 */
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.length > 0 ? posts.map((p) => ({ slug: p.slug })) : [{ slug: "welcome" }];
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Article not found | Capital M Law" };
  return {
    title: `${post.title} | Capital M Law`,
    description: post.excerpt,
    authors: [{ name: post.author }],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: post.tags,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt },
  };
}

async function Article({ params }: Pick<PageProps<"/blog/[slug]">, "params">) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(post);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage ?? undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "LegalService", name: "Capital M Law" },
    keywords: post.tags.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // JSON.stringify output with "<" escaped → safe inline script.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <article>
        {/* Header */}
        <header className="mx-auto max-w-3xl px-4 pt-10 sm:px-6 sm:pt-14">
          <Link
            href="/blog"
            className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#706F6F] transition hover:text-[#16345F] dark:text-gray-400 dark:hover:text-white"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" /> All articles
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <CategoryBadge category={post.category} />
            {post.featured && (
              <span className="rounded-full bg-[#C01072] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                Featured
              </span>
            )}
          </div>
          <h1 className="mt-5 text-3xl font-bold leading-[1.15] tracking-tight text-[#16345F] dark:text-white sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[#706F6F] dark:text-gray-300">{post.excerpt}</p>

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
                <dd>{post.readingTime} min read</dd>
              </div>
            </dl>
            <ShareButtons title={post.title} excerpt={post.excerpt} />
          </div>
        </header>

        {post.coverImage && (
          <div className="mx-auto mt-10 max-w-5xl px-4 sm:px-6">
            <CoverImage
              src={post.coverImage}
              alt={post.title}
              priority
              className="aspect-[2/1] w-full rounded-3xl shadow-[0_30px_60px_-30px_rgba(22,52,95,0.45)]"
            />
          </div>
        )}

        {/* Body */}
        <div className="mx-auto mt-12 max-w-3xl px-4 sm:px-6">
          <PostContent markdown={post.content} />

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

          {/* CTA */}
          <aside className="legal-texture-bg relative mt-14 overflow-hidden rounded-3xl bg-[#16345F] p-8 text-white sm:p-10">
            <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xl font-semibold">Have a question about your case?</p>
                <p className="mt-1 text-sm text-[#9BB8E0]">Get personalised advice from our bilingual legal team.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/#consultation" className="rounded-xl bg-[#C01072] px-5 py-3 text-sm font-semibold transition hover:bg-[#A50E62]">
                  Book consultation
                </Link>
                <a
                  href="https://wa.me/573146022411"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/25 px-5 py-3 text-sm font-semibold transition hover:bg-white/10"
                >
                  <MessageCircle className="size-4" /> WhatsApp
                </a>
              </div>
            </div>
          </aside>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#16345F]/10 pt-8 dark:border-white/10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-xl border border-[#16345F]/15 px-4 py-2.5 text-sm font-semibold text-[#16345F] transition hover:border-[#16345F] dark:border-white/15 dark:text-white"
            >
              <ArrowLeft className="size-4" /> Back to all articles
            </Link>
            <ShareButtons title={post.title} excerpt={post.excerpt} />
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="mx-auto mt-20 max-w-7xl px-4 sm:px-6">
          <h2 id="related-heading" className="mb-6 text-2xl font-semibold text-[#16345F] dark:text-white">
            Related articles
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

function ArticleSkeleton() {
  return (
    <div aria-hidden className="mx-auto max-w-3xl animate-pulse px-4 pt-14 sm:px-6">
      <div className="h-4 w-32 rounded bg-[#16345F]/10" />
      <div className="mt-8 h-6 w-24 rounded-full bg-[#16345F]/10" />
      <div className="mt-5 h-12 w-full rounded bg-[#16345F]/10" />
      <div className="mt-3 h-12 w-2/3 rounded bg-[#16345F]/10" />
      <div className="mt-10 aspect-[2/1] rounded-3xl bg-[#16345F]/5" />
      <div className="mt-10 space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-4 rounded bg-[#16345F]/5" />
        ))}
      </div>
    </div>
  );
}

export default function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  return (
    <main className="pb-8">
      <Suspense fallback={<ArticleSkeleton />}>
        <Article params={params} />
      </Suspense>
    </main>
  );
}
