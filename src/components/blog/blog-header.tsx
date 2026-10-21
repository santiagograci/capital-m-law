"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

function useThemeToggle() {
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

  return { dark, toggle };
}

function NavLinks() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home", active: pathname === "/" },
    { href: "/services", label: "Services", active: pathname?.startsWith("/services") ?? false },
    { href: "/team", label: "Team", active: pathname?.startsWith("/team") ?? false },
    { href: "/blog", label: "Insights", active: pathname?.startsWith("/blog") ?? false },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <ul className="hidden items-center gap-1 md:flex">
      {links.map((l) => (
        <li key={l.href}>
          <Link
            href={l.href}
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              l.active
                ? "text-[#C01072] font-semibold dark:text-[#F472B6]"
                : "text-[#706F6F] hover:text-[#16345F] dark:text-gray-300 dark:hover:text-white",
            )}
          >
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function BlogHeader() {
  const { dark, toggle } = useThemeToggle();

  return (
    <header className="sticky top-0 z-40 border-b border-[#16345F]/5 bg-white/90 backdrop-blur-xl dark:border-white/5 dark:bg-[#0A1526]/90">
      <nav aria-label="Main" className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-10 items-center justify-center rounded-xl bg-[#16345F] text-xl font-bold tracking-tighter text-white dark:bg-white dark:text-[#16345F]">
            M
          </span>
          <span className="leading-tight">
            <span className="block text-base font-semibold text-[#16345F] dark:text-white">Capital M Law</span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.2em] text-[#706F6F] dark:text-gray-400">
              Colombian Legal Experts
            </span>
          </span>
        </Link>

        <Suspense fallback={<div className="hidden h-9 w-64 md:block" />}>
          <NavLinks />
        </Suspense>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            className="rounded-xl p-2.5 text-[#16345F] transition hover:bg-[#16345F]/5 dark:text-[#9BB8E0] dark:hover:bg-white/10"
          >
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <Link
            href="/#consultation"
            className="inline-flex items-center gap-2 rounded-xl bg-[#C01072] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_-8px_rgba(192,16,114,0.7)] transition hover:bg-[#A50E62]"
          >
            <Calendar className="size-4" />
            <span className="hidden sm:inline">Book Consultation · $67</span>
            <span className="sm:hidden">Book · $67</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
