export const dynamic = "force-dynamic";
export const revalidate = 0;

import { Suspense } from "react";
import { AdminLoginForm } from "@/components/blog/admin/admin-login-form";
import { TeamEditorForm } from "@/components/team/admin/team-editor-form";
import { isAuthenticated } from "@/lib/blog/auth";

async function NewTeamMemberContent() {
  if (!(await isAuthenticated())) {
    return <AdminLoginForm />;
  }

  return <TeamEditorForm />;
}

export default function NewTeamMemberPage() {
  return (
    <Suspense
      fallback={
        <div className="h-96 animate-pulse rounded-3xl bg-[#16345F]/5 dark:bg-white/5" />
      }
    >
      <NewTeamMemberContent />
    </Suspense>
  );
}
