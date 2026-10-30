import { Suspense } from "react";
import { notFound } from "next/navigation";
import { AdminLoginForm } from "@/components/blog/admin/admin-login-form";
import { TeamEditorForm } from "@/components/team/admin/team-editor-form";
import { isAuthenticated } from "@/lib/blog/auth";
import { getTeamMemberById } from "@/lib/team/queries";

interface EditTeamMemberPageProps {
  params: Promise<{ id: string }>;
}

async function EditTeamMemberContent({ params }: EditTeamMemberPageProps) {
  if (!(await isAuthenticated())) {
    return <AdminLoginForm />;
  }

  const { id } = await params;
  const member = await getTeamMemberById(id);

  if (!member) {
    notFound();
  }

  return <TeamEditorForm member={member} />;
}

export default function EditTeamMemberPage({ params }: EditTeamMemberPageProps) {
  return (
    <Suspense
      fallback={
        <div className="h-96 animate-pulse rounded-3xl bg-[#16345F]/5 dark:bg-white/5" />
      }
    >
      <EditTeamMemberContent params={params} />
    </Suspense>
  );
}
