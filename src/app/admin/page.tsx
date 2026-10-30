import Link from "next/link";
import { Suspense } from "react";
import {
  FileText,
  Users,
  Camera,
  Plus,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { AdminLoginForm } from "@/components/blog/admin/admin-login-form";
import { isAuthenticated } from "@/lib/blog/auth";
import { getAllPosts } from "@/lib/blog/queries";
import { getAllTeamMembers } from "@/lib/team/queries";
import { getAllLifeMoments } from "@/lib/life/queries";

async function DashboardOverview() {
  if (!(await isAuthenticated())) {
    return <AdminLoginForm />;
  }

  const [posts, team, life] = await Promise.all([
    getAllPosts(),
    getAllTeamMembers(),
    getAllLifeMoments(),
  ]);

  const activeTeam = team.filter((t) => t.active !== false).length;
  const activeLife = life.filter((l) => l.active !== false).length;

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#16345F]/10 dark:border-white/10 pb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#C01072]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#C01072] dark:text-[#F472B6]">
            <Sparkles className="size-3.5" />
            Panel de Control Central
          </span>
          <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#16345F] dark:text-white">
            Administración Dinámica
          </h1>
          <p className="mt-1 text-sm text-[#706F6F] dark:text-gray-300">
            Gestiona en tiempo real los artículos del blog, los perfiles de abogadas y los momentos de la firma.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-xl bg-white dark:bg-[#0F1E35] border border-[#16345F]/15 dark:border-white/15 px-4 py-2.5 text-xs font-semibold text-[#16345F] dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition"
          >
            <span>Ver Sitio en Vivo</span>
            <ExternalLink className="size-3.5" />
          </Link>
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid gap-6 sm:grid-cols-3">
        {/* Blog Card */}
        <div className="group rounded-3xl border border-[#16345F]/10 dark:border-white/10 bg-white dark:bg-[#0F1E35] p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="size-12 rounded-2xl bg-[#C01072]/10 text-[#C01072] flex items-center justify-center">
                <FileText className="size-6" />
              </span>
              <span className="text-2xl font-black text-[#16345F] dark:text-white">
                {posts.length}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#16345F] dark:text-white">
                Blog & Insights
              </h2>
              <p className="text-xs text-[#706F6F] dark:text-gray-400 mt-1 leading-relaxed">
                Artículos jurídicos, guías de visado y análisis de inversión en Colombia.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#16345F]/5 dark:border-white/5 flex items-center justify-between">
            <Link
              href="/admin/blog"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C01072] dark:text-[#F472B6] hover:underline"
            >
              <span>Gestionar Blog</span>
              <ArrowRight className="size-3.5" />
            </Link>
            <Link
              href="/admin/blog/new"
              className="size-8 rounded-xl bg-[#16345F]/5 dark:bg-white/5 flex items-center justify-center text-[#16345F] dark:text-white hover:bg-[#C01072] hover:text-white transition"
              title="Crear nuevo post"
            >
              <Plus className="size-4" />
            </Link>
          </div>
        </div>

        {/* Team Card */}
        <div className="group rounded-3xl border border-[#16345F]/10 dark:border-white/10 bg-white dark:bg-[#0F1E35] p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="size-12 rounded-2xl bg-[#00AA81]/15 text-[#00AA81] flex items-center justify-center">
                <Users className="size-6" />
              </span>
              <div className="text-right">
                <span className="text-2xl font-black text-[#16345F] dark:text-white">
                  {team.length}
                </span>
                <span className="block text-[10px] text-emerald-600 font-bold uppercase">
                  {activeTeam} Activos
                </span>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#16345F] dark:text-white">
                Meet Our Team
              </h2>
              <p className="text-xs text-[#706F6F] dark:text-gray-400 mt-1 leading-relaxed">
                Perfiles de abogadas, credenciales CSJ, biografías y tarjetas profesionales.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#16345F]/5 dark:border-white/5 flex items-center justify-between">
            <Link
              href="/admin/team"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00AA81] hover:underline"
            >
              <span>Gestionar Equipo</span>
              <ArrowRight className="size-3.5" />
            </Link>
            <Link
              href="/admin/team/new"
              className="size-8 rounded-xl bg-[#16345F]/5 dark:bg-white/5 flex items-center justify-center text-[#16345F] dark:text-white hover:bg-[#00AA81] hover:text-white transition"
              title="Añadir miembro del equipo"
            >
              <Plus className="size-4" />
            </Link>
          </div>
        </div>

        {/* Life at Capital M Card */}
        <div className="group rounded-3xl border border-[#16345F]/10 dark:border-white/10 bg-white dark:bg-[#0F1E35] p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="size-12 rounded-2xl bg-[#16345F]/10 dark:bg-white/10 text-[#16345F] dark:text-[#9BB8E0] flex items-center justify-center">
                <Camera className="size-6" />
              </span>
              <div className="text-right">
                <span className="text-2xl font-black text-[#16345F] dark:text-white">
                  {life.length}
                </span>
                <span className="block text-[10px] text-[#16345F] dark:text-[#9BB8E0] font-bold uppercase">
                  {activeLife} Activos
                </span>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#16345F] dark:text-white">
                Life at Capital M
              </h2>
              <p className="text-xs text-[#706F6F] dark:text-gray-400 mt-1 leading-relaxed">
                Galería de momentos, notarías, celebraciones en Provenza y cierres de compra.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#16345F]/5 dark:border-white/5 flex items-center justify-between">
            <Link
              href="/admin/life"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#16345F] dark:text-[#9BB8E0] hover:underline"
            >
              <span>Gestionar Galería</span>
              <ArrowRight className="size-3.5" />
            </Link>
            <Link
              href="/admin/life/new"
              className="size-8 rounded-xl bg-[#16345F]/5 dark:bg-white/5 flex items-center justify-center text-[#16345F] dark:text-white hover:bg-[#16345F] hover:text-white transition"
              title="Añadir momento de galería"
            >
              <Plus className="size-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Fast Help & Direct Links */}
      <div className="rounded-3xl bg-[#16345F] p-8 text-white relative overflow-hidden">
        <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-[#C01072]/20 blur-2xl" />
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-[#9BB8E0]">
            <ShieldCheck className="size-3.5" />
            Seguridad & Arquitectura
          </span>
          <h3 className="text-2xl font-bold">
            Sincronización en tiempo real sin latencia
          </h3>
          <p className="text-sm text-gray-200 leading-relaxed">
            Cualquier cambio realizado en los perfiles del equipo o en la galería fotográfica se guarda de manera atómica en el backend y se actualiza instantáneamente en el sitio público mediante revalidación de caché en Next.js.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <div className="h-96 animate-pulse rounded-3xl bg-[#16345F]/5 dark:bg-white/5" />
      }
    >
      <DashboardOverview />
    </Suspense>
  );
}
