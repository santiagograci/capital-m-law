export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link";
import { Suspense } from "react";
import { FileText, LogOut, Plus, Star } from "lucide-react";
import { AdminLoginForm } from "@/components/blog/admin/admin-login-form";
import { AdminPostsTable } from "@/components/blog/admin/admin-posts-table";
import { logoutAction } from "@/lib/blog/actions";
import { isAuthenticated } from "@/lib/blog/auth";
import { getPostSummaries } from "@/lib/blog/queries";

async function Dashboard() {
  if (!(await isAuthenticated())) return <AdminLoginForm />;

  const posts = await getPostSummaries();
  const featured = posts.filter((p) => p.featured).length;

  return (
    <>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#C01072]">Staff panel</p>
          <h1 className="mt-1 text-3xl font-bold text-[#16345F] dark:text-white">Blog management</h1>
        </div>
        <div className="flex items-center gap-2">
          <form action={logoutAction}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-[#706F6F] transition hover:bg-[#16345F]/5 hover:text-[#16345F] dark:hover:bg-white/10 dark:hover:text-white"
            >
              <LogOut className="size-4" /> Sign out
            </button>
          </form>
          <Link
            href="/admin/blog/new"
            className="inline-flex items-center gap-2 rounded-xl bg-[#C01072] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_-10px_rgba(192,16,114,0.7)] transition hover:bg-[#A50E62]"
          >
            <Plus className="size-4" /> New post
          </Link>
        </div>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <Stat Icon={FileText} label="Published posts" value={posts.length} />
        <Stat Icon={Star} label="Featured" value={featured} accent />
      </div>

      <AdminPostsTable posts={posts} />
    </>
  );
}

function Stat({ Icon, label, value, accent }: { Icon: typeof FileText; label: string; value: number; accent?: boolean }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-[#16345F]/10 bg-white p-5 dark:border-white/10 dark:bg-[#0F1E35]">
      <span className={accent ? "rounded-xl bg-[#C01072]/10 p-3 text-[#C01072]" : "rounded-xl bg-[#9BB8E0]/20 p-3 text-[#16345F] dark:text-[#9BB8E0]"}>
        <Icon className="size-5" />
      </span>
      <div>
        <p className="text-2xl font-bold text-[#16345F] dark:text-white">{value}</p>
        <p className="text-xs text-[#706F6F] dark:text-gray-400">{label}</p>
      </div>
    </div>
  );
}

export default function AdminBlogPage() {
  return (
    <Suspense fallback={<div className="h-96 animate-pulse rounded-3xl bg-[#16345F]/5" />}>
      <Dashboard />
    </Suspense>
  );
}
