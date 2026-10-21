import type { Metadata } from "next";
import Link from "next/link";
import { BlogHeader } from "@/components/blog/blog-header";

export const metadata: Metadata = {
  title: "Legal Team & Attorneys | Capital M Law Medellín",
  description:
    "Meet María Fernanda Duarte and Ana María Muñoz, licensed bilingual Colombian attorneys specializing in Visas, Real Estate Due Diligence, and Corporate SAS law in Medellín.",
  alternates: { canonical: "/team" },
  openGraph: {
    title: "Legal Team & Attorneys | Capital M Law Medellín",
    description:
      "Executive profiles and background of our bilingual legal team in Medellín, Colombia.",
    type: "profile",
  },
};

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FAFBFD] dark:bg-[#0A1526]">
      <BlogHeader />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">{children}</div>
      <footer className="mt-20 bg-[#16345F] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="text-lg font-bold">Capital M Law</p>
            <p className="mt-1 max-w-md text-sm text-[#9BB8E0]">
              Cra 66D #32B-57, Belén Malibú, Medellín, Colombia. Board Certified Attorneys at Law.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link href="/" className="rounded-xl border border-white/20 px-4 py-2.5 transition hover:bg-white/10">
              Back to Home
            </Link>
            <Link href="/blog" className="rounded-xl border border-white/20 px-4 py-2.5 transition hover:bg-white/10">
              Blog Insights
            </Link>
            <Link
              href="/#consultation"
              className="rounded-xl bg-[#C01072] px-4 py-2.5 font-semibold transition hover:bg-[#A50E62]"
            >
              Book a consultation · $67
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
