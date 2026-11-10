export const revalidate = 86400; // 24 horas (ISR)

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BilingualArticleView } from "@/components/blog/bilingual-article-view";
import { ReadingProgressBar } from "@/components/ui/micro-interactions";
import { getPostBySlug, getPostSummaries, getRelatedPosts } from "@/lib/blog/queries";
import { getLocalizedField } from "@/lib/blog/utils";

export async function generateStaticParams() {
  const posts = await getPostSummaries();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Article not found | Capital M Law" };

  const titleEn = getLocalizedField(post.title, "en");
  const excerptEn = getLocalizedField(post.excerpt, "en");

  return {
    title: `${titleEn} | Capital M Law`,
    description: excerptEn,
    authors: [{ name: post.author }],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: titleEn,
      description: excerptEn,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: post.tags,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
    twitter: { card: "summary_large_image", title: titleEn, description: excerptEn },
  };
}

async function Article({ params }: Pick<PageProps<"/blog/[slug]">, "params">) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(post);
  const titleEn = getLocalizedField(post.title, "en");
  const excerptEn = getLocalizedField(post.excerpt, "en");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: titleEn,
    description: excerptEn,
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
      <BilingualArticleView post={post} related={related} />
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
      <ReadingProgressBar />
      <Suspense fallback={<ArticleSkeleton />}>
        <Article params={params} />
      </Suspense>
    </main>
  );
}
