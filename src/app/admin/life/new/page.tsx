import { Suspense } from "react";
import { AdminLoginForm } from "@/components/blog/admin/admin-login-form";
import { LifeEditorForm } from "@/components/life/admin/life-editor-form";
import { isAuthenticated } from "@/lib/blog/auth";

async function NewLifeMomentContent() {
  if (!(await isAuthenticated())) {
    return <AdminLoginForm />;
  }

  return <LifeEditorForm />;
}

export default function NewLifeMomentPage() {
  return (
    <Suspense
      fallback={
        <div className="h-96 animate-pulse rounded-3xl bg-[#16345F]/5 dark:bg-white/5" />
      }
    >
      <NewLifeMomentContent />
    </Suspense>
  );
}
