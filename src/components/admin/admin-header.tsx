"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import {
  FileText,
  Users,
  Camera,
  LayoutDashboard,
  ExternalLink,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/lib/blog/actions";

const NAV_CONFIG = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/blog", label: "Blog", icon: FileText, exact: false },
  { href: "/admin/team", label: "Equipo Legal", icon: Users, exact: false },
  { href: "/admin/life", label: "Life at Capital M", icon: Camera, exact: false },
];

function DesktopNavLinks() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center gap-1">
      {NAV_CONFIG.map((item) => {
        const Icon = item.icon;
        const active = item.exact ? pathname === item.href : pathname?.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all",
              active
                ? "bg-[#16345F] text-white shadow-xs dark:bg-[#9BB8E0] dark:text-[#0A1526]"
                : "text-[#706F6F] hover:bg-[#16345F]/5 hover:text-[#16345F] dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white"
            )}
          >
            <Icon className="size-3.5" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function MobileNavLinks() {
  const pathname = usePathname();

  return (
    <div className="flex md:hidden border-t border-[#16345F]/5 dark:border-white/5 px-4 py-2 overflow-x-auto gap-1">
      {NAV_CONFIG.map((item) => {
        const Icon = item.icon;
        const active = item.exact ? pathname === item.href : pathname?.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "inline-flex items-center gap-1.5 shrink-0 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all",
              active
                ? "bg-[#16345F] text-white dark:bg-[#9BB8E0] dark:text-[#0A1526]"
                : "text-[#706F6F] hover:bg-[#16345F]/5 dark:text-gray-300"
            )}
          >
            <Icon className="size-3.5" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}

export function AdminHeader() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("capm-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = saved === "dark" || (!saved && prefersDark);
    document.documentElement.classList.toggle("dark", isDark);
    setDark(isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("capm-theme", next ? "dark" : "light");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#16345F]/10 bg-white/95 backdrop-blur-xl dark:border-white/10 dark:bg-[#0A1526]/95">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <Link href="/admin" className="flex items-center gap-2.5">
            <img
              src="/assets/capital-m-logo.svg"
              alt="Capital M Law"
              className="h-8 w-auto dark:hidden"
            />
            <img
              src="/assets/capital-m-logo-white.svg"
              alt="Capital M Law"
              className="h-8 w-auto hidden dark:block"
            />
            <span className="rounded-md bg-[#16345F]/10 dark:bg-white/10 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#16345F] dark:text-[#9BB8E0]">
              Staff
            </span>
          </Link>

          <Suspense fallback={<div className="hidden h-9 w-64 md:block" />}>
            <DesktopNavLinks />
          </Suspense>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-[#16345F]/15 dark:border-white/15 px-3 py-1.5 text-xs font-semibold text-[#16345F] dark:text-white transition hover:bg-[#16345F]/5 dark:hover:bg-white/5"
          >
            <span>Ver Sitio Web</span>
            <ExternalLink className="size-3 text-[#706F6F] dark:text-gray-400" />
          </Link>

          <button
            type="button"
            onClick={toggle}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            className="rounded-xl p-2 text-[#16345F] transition hover:bg-[#16345F]/5 dark:text-[#9BB8E0] dark:hover:bg-white/10"
          >
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>

          <form action={logoutAction}>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium text-[#706F6F] transition hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/30 dark:hover:text-rose-400 cursor-pointer"
              title="Cerrar sesión"
            >
              <LogOut className="size-3.5" />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </form>
        </div>
      </div>

      <Suspense fallback={<div className="h-9 md:hidden" />}>
        <MobileNavLinks />
      </Suspense>
    </header>
  );
}
