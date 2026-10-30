import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminHeader } from "@/components/admin/admin-header";

export const metadata: Metadata = {
  title: "Admin Panel | Capital M Law",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F5F7FB] dark:bg-[#0A1526] text-[#16345F] dark:text-gray-100">
      <Suspense fallback={<div className="h-[72px] border-b border-[#16345F]/10 bg-white/95 dark:bg-[#0A1526]/95" />}>
        <AdminHeader />
      </Suspense>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">{children}</div>
    </div>
  );
}
