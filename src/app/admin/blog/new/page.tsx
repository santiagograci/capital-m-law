export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import { PostEditorForm } from "@/components/blog/admin/post-editor-form";
import { isAuthenticated } from "@/lib/blog/auth";

async function NewPost() {
  if (!(await isAuthenticated())) redirect("/admin/blog");
  return <PostEditorForm />;
}

export default function NewPostPage() {
  return (
    <>
      <Link href="/admin/blog" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#706F6F] hover:text-[#16345F] dark:hover:text-white">
        <ArrowLeft className="size-4" /> Back to posts
      </Link>
      <h1 className="mb-8 text-3xl font-bold text-[#16345F] dark:text-white">New post</h1>
      <Suspense fallback={<div className="h-[600px] animate-pulse rounded-3xl bg-[#16345F]/5" />}>
        <NewPost />
      </Suspense>
    </>
  );
}
