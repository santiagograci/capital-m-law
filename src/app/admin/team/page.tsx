export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link";
import { Suspense } from "react";
import { Users, Plus, ShieldCheck, ArrowLeft } from "lucide-react";
import { AdminLoginForm } from "@/components/blog/admin/admin-login-form";
import { TeamTable } from "@/components/team/admin/team-table";
import { isAuthenticated } from "@/lib/blog/auth";
import { getAllTeamMembers } from "@/lib/team/queries";

async function TeamAdminContent() {
  if (!(await isAuthenticated())) {
    return <AdminLoginForm />;
  }

  const members = await getAllTeamMembers();

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#16345F]/10 dark:border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#00AA81]/15 px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-[#00AA81]">
              <ShieldCheck className="size-3.5" />
              Gestión de Equipo
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#16345F] dark:text-white">
            Meet Our Team
          </h1>
          <p className="mt-1 text-sm text-[#706F6F] dark:text-gray-300">
            Añade, edita, reordena y activa los perfiles de abogadas y asesores legales de la firma.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/team"
            target="_blank"
            className="rounded-xl border border-gray-200 dark:border-white/15 px-4 py-2.5 text-xs font-semibold text-[#16345F] dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition"
          >
            Ver Página Pública
          </Link>
          <Link
            href="/admin/team/new"
            className="inline-flex items-center gap-2 rounded-xl bg-[#00AA81] hover:bg-[#008f6c] text-white px-5 py-2.5 text-xs font-bold shadow-md transition"
          >
            <Plus className="size-4" />
            <span>Añadir Abogada / Asesor</span>
          </Link>
        </div>
      </div>

      <TeamTable members={members} />
    </div>
  );
}

export default function TeamAdminPage() {
  return (
    <Suspense
      fallback={
        <div className="h-96 animate-pulse rounded-3xl bg-[#16345F]/5 dark:bg-white/5" />
      }
    >
      <TeamAdminContent />
    </Suspense>
  );
}
