"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, CreditCard, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { CorporateNavLink } from "@/components/transitions/page-transition-provider";

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
    { href: "/#about", label: "About", useCorporateTransition: false },
    {
      href: "/services",
      label: "Services",
      active: pathname?.startsWith("/services") ?? false,
      useCorporateTransition: true,
    },
    {
      href: "/blog",
      label: "Blog",
      active: pathname?.startsWith("/blog") ?? false,
      useCorporateTransition: true,
    },
    {
      href: "/contact",
      label: "Contact",
      active: pathname?.startsWith("/contact") ?? false,
      useCorporateTransition: false,
    },
  ];

  return (
    <ul className="flex items-center gap-0.5 sm:gap-1">
      {links.map((l) => {
        const linkClasses = cn(
          "rounded-lg px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium transition-colors",
          l.active
            ? "text-[#C01072] font-semibold dark:text-[#F472B6]"
            : "text-[#706F6F] hover:text-[#16345F] dark:text-gray-300 dark:hover:text-white"
        );

        return (
          <li key={l.href}>
            {l.useCorporateTransition ? (
              <CorporateNavLink
                href={l.href}
                label={l.label}
                className={linkClasses}
              >
                {l.label}
              </CorporateNavLink>
            ) : (
              <Link href={l.href} className={linkClasses}>
                {l.label}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function BlogHeader() {
  const { dark, toggle } = useThemeToggle();

  return (
    <header className="sticky top-0 z-40 border-b border-[#16345F]/5 bg-white/90 backdrop-blur-xl dark:border-white/5 dark:bg-[#0A1526]/90">
      <nav aria-label="Main" className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
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
          <span className="text-xs font-semibold text-[#706F6F] dark:text-gray-400 tracking-wider uppercase ml-0.5">
            Law
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
          <a
            href="https://checkout.bold.co/payment/LNK_JTIV4A6HM0"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-[#16345F]/20 dark:border-white/20 px-3.5 py-2.5 text-xs font-semibold text-[#16345F] dark:text-white transition hover:border-[#C01072] hover:bg-[#C01072] hover:text-white"
          >
            <CreditCard className="size-3.5" />
            <span>Pay Consultation</span>
          </a>
          <a
            href="https://calendly.com/capital-m-law-"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-[#C01072] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_-8px_rgba(192,16,114,0.7)] transition hover:bg-[#A50E62]"
          >
            <Calendar className="size-4" />
            <span className="hidden sm:inline">Book Consultation · $67</span>
            <span className="sm:hidden">Book · $67</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
