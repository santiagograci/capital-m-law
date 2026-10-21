import type { Metadata } from "next";
import { BlogHeader } from "@/components/blog/blog-header";
import { Footer } from "@/components/Footer";

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
      <Footer />
    </div>
  );
}
