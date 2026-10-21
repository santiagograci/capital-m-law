import type { Metadata } from "next";
import { Suspense } from "react";
import { BookOpen, Building2, Landmark, Plane } from "lucide-react";
import { BlogExplorer, BlogExplorerSkeleton } from "@/components/blog/blog-explorer";
import { getPostSummaries } from "@/lib/blog/queries";

export const metadata: Metadata = {
  title: "Legal Insights & Guides | Capital M Law",
  description:
    "Practical legal guides for expats and investors in Colombia: visas, real estate, SAS companies, taxes and more — written by the Capital M Law team in Medellín.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Legal Insights & Guides | Capital M Law",
    description: "Visas, Real Estate, SAS and legal tips for expats & investors in Colombia.",
    type: "website",
  },
};

async function PostsExplorer() {
  const posts = await getPostSummaries(); // cached + tagged → part of the static shell
  return <BlogExplorer posts={posts} />;
}

export default function BlogPage() {
  return (
    <main>
      {/* Hero */}
      <section className="legal-texture-bg relative overflow-hidden bg-gradient-to-b from-white to-[#FAFBFD] dark:from-[#0D1B30] dark:to-[#0A1526]">
        <div className="pointer-events-none absolute -right-32 -top-32 size-[480px] rounded-full bg-[#9BB8E0]/25 blur-3xl dark:bg-[#9BB8E0]/10" />
        <div className="pointer-events-none absolute -left-24 top-40 size-72 rounded-full bg-[#C01072]/10 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-14 pt-16 sm:px-6 sm:pt-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#C01072]/20 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#C01072] dark:border-[#F472B6]/30 dark:bg-white/5 dark:text-[#F472B6]">
            <BookOpen className="size-3.5" /> Capital M Insights
          </span>
          <h1 className="animate-suspended-hero mt-5 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-[#16345F] dark:text-white sm:text-5xl lg:text-6xl">
            Legal clarity for your <span className="text-[#C01072] dark:text-[#F472B6]">life in Colombia</span>.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#706F6F] dark:text-gray-300 sm:text-lg">
            Guides, checklists and updates from our lawyers in Medellín — for expats, digital nomads and
            international investors.
          </p>
          <ul className="mt-8 flex flex-wrap gap-3 text-sm text-[#16345F] dark:text-gray-200">
            {[
              { Icon: Plane, label: "Visas & Residency" },
              { Icon: Building2, label: "Real Estate" },
              { Icon: Landmark, label: "SAS & Corporate" },
            ].map(({ Icon, label }) => (
              <li key={label} className="inline-flex items-center gap-2 rounded-xl bg-white px-3.5 py-2 shadow-sm ring-1 ring-[#16345F]/5 dark:bg-white/5 dark:ring-white/10">
                <Icon className="size-4 text-[#9BB8E0]" /> {label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Suspense required: the explorer reads `useSearchParams()` for shareable filter URLs. */}
        <Suspense fallback={<BlogExplorerSkeleton />}>
          <PostsExplorer />
        </Suspense>
      </div>
    </main>
  );
}
