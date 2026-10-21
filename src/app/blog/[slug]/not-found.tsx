import Link from "next/link";
import { FileQuestion } from "lucide-react";

export default function PostNotFound() {
  return (
    <main className="mx-auto flex max-w-xl flex-col items-center px-4 py-28 text-center">
      <span className="flex size-16 items-center justify-center rounded-2xl bg-[#9BB8E0]/20 text-[#16345F] dark:text-[#9BB8E0]">
        <FileQuestion className="size-7" />
      </span>
      <h1 className="mt-6 text-3xl font-bold text-[#16345F] dark:text-white">Article not found</h1>
      <p className="mt-3 text-[#706F6F] dark:text-gray-400">
        This article may have been moved or unpublished. Explore our latest legal guides instead.
      </p>
      <Link href="/blog" className="mt-8 rounded-xl bg-[#16345F] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1E4479]">
        Browse all articles
      </Link>
    </main>
  );
}
