import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import { PostEditorForm } from "@/components/blog/admin/post-editor-form";
import { isAuthenticated } from "@/lib/blog/auth";
import { getAllPosts } from "@/lib/blog/queries";

// No generateStaticParams: admin pages are always rendered at request time
// (params + cookies are read inside <Suspense>).

async function EditPost({ params }: Pick<PageProps<"/admin/blog/edit/[id]">, "params">) {
  if (!(await isAuthenticated())) redirect("/admin/blog");
  const { id } = await params;
  const post = (await getAllPosts()).find((p) => p.id === id);
  if (!post) notFound();
  return <PostEditorForm key={post.updatedAt} post={post} />;
}

export default function EditPostPage({ params }: PageProps<"/admin/blog/edit/[id]">) {
  return (
    <>
      <Link href="/admin/blog" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#706F6F] hover:text-[#16345F] dark:hover:text-white">
        <ArrowLeft className="size-4" /> Back to posts
      </Link>
      <h1 className="mb-8 text-3xl font-bold text-[#16345F] dark:text-white">Edit post</h1>
      <Suspense fallback={<div className="h-[600px] animate-pulse rounded-3xl bg-[#16345F]/5" />}>
        <EditPost params={params} />
      </Suspense>
    </>
  );
}
