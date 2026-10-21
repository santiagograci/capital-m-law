import Link from "next/link";
import { BlogHeader } from "@/components/blog/blog-header";

export default function BlogLayout({ children }: LayoutProps<"/blog">) {
  return (
    <div className="min-h-screen bg-[#FAFBFD] dark:bg-[#0A1526]">
      <BlogHeader />
      {children}
      <footer className="mt-24 bg-[#16345F] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="text-lg font-semibold">Capital M Law</p>
            <p className="mt-1 max-w-md text-sm text-[#9BB8E0]">
              Visas, Real Estate and Corporate Law in Medellín, Colombia. The information in this blog is general
              and does not constitute legal advice.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link href="/" className="rounded-xl border border-white/20 px-4 py-2.5 transition hover:bg-white/10">
              Back to site
            </Link>
            <Link href="/#consultation" className="rounded-xl bg-[#C01072] px-4 py-2.5 font-semibold transition hover:bg-[#A50E62]">
              Book a consultation
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
