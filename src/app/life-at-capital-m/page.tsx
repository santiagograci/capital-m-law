export const dynamic = "force-dynamic";
export const revalidate = 0;

import type { Metadata } from "next";
import { Camera, MapPin, User } from "lucide-react";
import { BlogHeader } from "@/components/blog/blog-header";
import { Footer } from "@/components/Footer";
import { getActiveLifeMoments } from "@/lib/life/queries";

export const metadata: Metadata = {
  title: "Life at Capital M | Capital M Law Medellín",
  description:
    "Explore real moments, closings, and celebrations with our international clients and legal team across Medellín, Colombia.",
  alternates: { canonical: "/life-at-capital-m" },
};

export default async function LifeAtCapitalMPage() {
  const moments = await getActiveLifeMoments();

  return (
    <div className="min-h-screen bg-[#FAFBFD] dark:bg-[#0A1526]">
      <BlogHeader />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 space-y-12">
        <section className="legal-texture-bg relative overflow-hidden rounded-3xl bg-gradient-to-b from-white to-[#FAFBFD] dark:from-[#0F1E35] dark:to-[#0A1526] p-8 sm:p-12 lg:p-16 border border-[#16345F]/10 dark:border-white/10 shadow-sm">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#C01072]/20 bg-[#C01072]/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#C01072] dark:border-[#F472B6]/30 dark:bg-white/5 dark:text-[#F472B6]">
              <Camera className="size-4" />
              Life at Capital M
            </span>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#16345F] dark:text-white leading-[1.1]">
              Real Milestones with Our Clients in{" "}
              <span className="text-[#C01072] dark:text-[#F472B6]">Medellín</span>
            </h1>
            <p className="text-base sm:text-lg text-[#706F6F] dark:text-gray-300 leading-relaxed">
              Every visa approval, real estate closing, and company incorporation is a personal milestone.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {moments.map((moment) => (
            <article
              key={moment.id}
              className="group overflow-hidden rounded-3xl border border-[#16345F]/10 dark:border-white/10 bg-white dark:bg-[#0F1E35] shadow-sm transition hover:shadow-md"
            >
              <div className="aspect-[16/10] w-full overflow-hidden bg-gray-100 dark:bg-white/5 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={moment.image}
                  alt={moment.title.en}
                  className="size-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 rounded-full bg-[#16345F]/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-white">
                  {moment.tag.en} · {moment.tag.es}
                </span>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#00AA81]">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="size-3.5" />
                    {moment.location}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[#706F6F] dark:text-gray-400">
                    <User className="size-3.5" />
                    {moment.client}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-[#16345F] dark:text-white">
                  {moment.title.en}
                </h2>
                <p className="text-xs font-semibold text-[#C01072] dark:text-[#F472B6]">
                  {moment.title.es}
                </p>
                <p className="text-sm text-[#706F6F] dark:text-gray-300 leading-relaxed">
                  {moment.caption.en}
                </p>
                <p className="text-xs text-[#706F6F]/80 dark:text-gray-400 italic">
                  {moment.caption.es}
                </p>
              </div>
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
