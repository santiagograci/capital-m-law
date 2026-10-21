import type { Metadata } from "next";
import { BlogHeader } from "@/components/blog/blog-header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Legal Services & Practice Directory | Capital M Law",
  description:
    "Comprehensive legal services in Medellín, Colombia: Visas & Immigration, Real Estate Title Due Diligence, Marriage & Prenups, and SAS Company Incorporation.",
  alternates: { canonical: "/services" },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FAFBFD] dark:bg-[#0A1526]">
      <BlogHeader />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">{children}</div>
      <Footer />
    </div>
  );
}
