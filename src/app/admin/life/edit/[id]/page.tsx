export const dynamic = "force-dynamic";
export const revalidate = 0;

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { AdminLoginForm } from "@/components/blog/admin/admin-login-form";
import { LifeEditorForm } from "@/components/life/admin/life-editor-form";
import { isAuthenticated } from "@/lib/blog/auth";
import { getLifeMomentById } from "@/lib/life/queries";

interface EditLifeMomentPageProps {
  params: Promise<{ id: string }>;
}

async function EditLifeMomentContent({ params }: EditLifeMomentPageProps) {
  if (!(await isAuthenticated())) {
    return <AdminLoginForm />;
  }

  const { id } = await params;
  const moment = await getLifeMomentById(id);

  if (!moment) {
    notFound();
  }

  return <LifeEditorForm moment={moment} />;
}

export default function EditLifeMomentPage({ params }: EditLifeMomentPageProps) {
  return (
    <Suspense
      fallback={
        <div className="h-96 animate-pulse rounded-3xl bg-[#16345F]/5 dark:bg-white/5" />
      }
    >
      <EditLifeMomentContent params={params} />
    </Suspense>
  );
}
