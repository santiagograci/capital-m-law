export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link";
import { Suspense } from "react";
import { Camera, Plus, MapPin } from "lucide-react";
import { AdminLoginForm } from "@/components/blog/admin/admin-login-form";
import { LifeTable } from "@/components/life/admin/life-table";
import { isAuthenticated } from "@/lib/blog/auth";
import { getAllLifeMoments } from "@/lib/life/queries";

async function LifeAdminContent() {
  if (!(await isAuthenticated())) {
    return <AdminLoginForm />;
  }

  const moments = await getAllLifeMoments();

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#16345F]/10 dark:border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#C01072]/10 px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-[#C01072] dark:text-[#F472B6]">
              <Camera className="size-3.5" />
              Galería de Vida en la Firma
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#16345F] dark:text-white">
            Life at Capital M
          </h1>
          <p className="mt-1 text-sm text-[#706F6F] dark:text-gray-300">
            Administra las imágenes, ubicaciones en Medellín y relatos de acompañamiento a clientes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/#life"
            target="_blank"
            className="rounded-xl border border-gray-200 dark:border-white/15 px-4 py-2.5 text-xs font-semibold text-[#16345F] dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition"
          >
            Ver en la Web
          </Link>
          <Link
            href="/admin/life/new"
            className="inline-flex items-center gap-2 rounded-xl bg-[#C01072] hover:bg-[#A50E62] text-white px-5 py-2.5 text-xs font-bold shadow-md transition"
          >
            <Plus className="size-4" />
            <span>Añadir Nuevo Momento</span>
          </Link>
        </div>
      </div>

      <LifeTable moments={moments} />
    </div>
  );
}

export default function LifeAdminPage() {
  return (
    <Suspense
      fallback={
        <div className="h-96 animate-pulse rounded-3xl bg-[#16345F]/5 dark:bg-white/5" />
      }
    >
      <LifeAdminContent />
    </Suspense>
  );
}
