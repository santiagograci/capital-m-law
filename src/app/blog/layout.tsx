import { BlogHeader } from "@/components/blog/blog-header";
import { Footer } from "@/components/Footer";

export default function BlogLayout({ children }: LayoutProps<"/blog">) {
  return (
    <div className="min-h-screen bg-[#FAFBFD] dark:bg-[#0A1526]">
      <BlogHeader />
      {children}
      <Footer />
    </div>
  );
}
