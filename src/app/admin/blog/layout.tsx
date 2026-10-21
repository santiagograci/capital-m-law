import type { Metadata } from "next";
import { BlogHeader } from "@/components/blog/blog-header";

export const metadata: Metadata = {
  title: "Blog Admin | Capital M Law",
  robots: { index: false, follow: false },
};

export default function AdminBlogLayout({ children }: LayoutProps<"/admin/blog">) {
  return (
    <div className="min-h-screen bg-[#F5F7FB] dark:bg-[#0A1526]">
      <BlogHeader />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">{children}</div>
    </div>
  );
}
