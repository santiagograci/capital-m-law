import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Admin | Capital M Law",
  robots: { index: false, follow: false },
};

export default function AdminBlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
