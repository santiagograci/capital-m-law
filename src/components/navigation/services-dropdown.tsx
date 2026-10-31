"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Scale,
  Plane,
  Building2,
  Heart,
  Landmark,
  Briefcase,
  Calculator,
  ArrowUpRight,
  Menu,
  X,
  Calendar,
  CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface DropdownServiceItem {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const NAVBAR_SERVICES_LIST: DropdownServiceItem[] = [
  {
    id: "general-legal-advice",
    title: "General Legal Advice",
    description: "Comprehensive legal guidance for your business and personal needs.",
    href: "/services#general-legal-advice",
    icon: Scale,
  },
  {
    id: "visas-immigration",
    title: "Visas & Immigration",
    description: "Colombian visa services and immigration assistance.",
    href: "/services#visas-immigration",
    icon: Plane,
  },
  {
    id: "real-estate",
    title: "Real Estate",
    description: "Property purchase assistance and real estate legal services.",
    href: "/services#real-estate",
    icon: Building2,
  },
  {
    id: "family-law",
    title: "Family Law",
    description: "Family law services and legal assistance.",
    href: "/services#family-law",
    icon: Heart,
  },
  {
    id: "commercial-law",
    title: "Commercial Law & Business Investment",
    description: "Contracts, IP protection, and business investment opportunities.",
    href: "/services#commercial-law",
    icon: Landmark,
  },
  {
    id: "labour-law",
    title: "Labour Law",
    description: "Hiring, firing, and managing employees in Colombia.",
    href: "/services#labour-law",
    icon: Briefcase,
  },
  {
    id: "tax-planning",
    title: "Tax Planning",
    description: "Individual income tax planning and optimization.",
    href: "/services#tax-planning",
    icon: Calculator,
  },
];

interface ServicesDropdownProps {
  label?: string;
  triggerClassName?: string;
  align?: "center" | "left";
}

export function ServicesDropdown({
  label = "Services",
  triggerClassName,
  align = "center",
}: ServicesDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleMouseEnter = () => {
    clearCloseTimer();
    setOpen(true);
  };

  const handleMouseLeave = () => {
    clearCloseTimer();
    closeTimeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 150);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      clearCloseTimer();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative inline-block text-left"
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="true"
        className={cn(
          "inline-flex items-center gap-1 cursor-pointer transition-colors focus:outline-none",
          triggerClassName
        )}
      >
        <span>{label}</span>
        <ChevronDown
          className={cn(
            "size-3.5 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Legal Services"
          className={cn(
            "absolute top-full mt-3 w-[92vw] max-w-[640px] z-50 backdrop-blur-xl bg-slate-950/90 border border-slate-800 shadow-2xl rounded-2xl p-6 transition-all duration-200 animate-in fade-in slide-in-from-top-2",
            align === "center"
              ? "left-1/2 -translate-x-1/2"
              : "left-0"
          )}
        >
          {/* 2-Column Compact Service Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {NAVBAR_SERVICES_LIST.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.id}
                  href={service.href}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="group/item flex items-start gap-3.5 rounded-xl p-3 border border-transparent hover:border-white/10 hover:bg-white/[0.06] transition-all duration-200"
                >
                  <div className="size-9 rounded-lg bg-[#C01072]/15 border border-[#C01072]/30 text-[#F472B6] group-hover/item:bg-[#C01072] group-hover/item:text-white flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                    <Icon className="size-4" />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-white group-hover/item:text-[#F472B6] transition-colors leading-snug">
                      {service.title}
                    </p>
                    <p className="text-[11px] text-slate-400 group-hover/item:text-slate-300 leading-relaxed line-clamp-2">
                      {service.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Bottom Separator & Highlighted All Services CTA */}
          <div className="mt-4 pt-4 border-t border-slate-800">
            <a
              href="https://capital-m-law.vercel.app/services"
              onClick={() => setOpen(false)}
              className="group/all flex items-center justify-between gap-3 rounded-xl bg-white/[0.04] hover:bg-[#C01072]/15 border border-white/10 hover:border-[#C01072]/40 px-4 py-3 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white transition-all"
            >
              <span>
                Looking for something else?{" "}
                <strong className="text-[#F472B6] group-hover/all:underline">
                  View all legal services
                </strong>
              </span>
              <ArrowUpRight className="size-4 text-[#F472B6] shrink-0 transition-transform duration-200 group-hover/all:translate-x-0.5 group-hover/all:-translate-y-0.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

interface MobileNavMenuProps {
  aboutHref?: string;
  aboutLabel?: string;
  servicesLabel?: string;
  contactLabel?: string;
}

export function MobileNavMenu({
  aboutHref = "/#about",
  aboutLabel = "About",
  servicesLabel = "Services",
  contactLabel = "Contact",
}: MobileNavMenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesExpanded, setServicesExpanded] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-expanded={menuOpen}
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        className="inline-flex items-center justify-center rounded-xl p-2.5 text-[#16345F] dark:text-white bg-gray-100 dark:bg-white/10 hover:bg-[#C01072] hover:text-white transition cursor-pointer"
      >
        {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {menuOpen && (
        <div className="fixed inset-x-4 top-[76px] z-50 max-h-[82vh] overflow-y-auto backdrop-blur-xl bg-slate-950/95 border border-slate-800 shadow-2xl rounded-2xl p-5 text-white space-y-3">
          <div className="space-y-1">
            <Link
              href={aboutHref}
              onClick={() => setMenuOpen(false)}
              className="block rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-200 hover:bg-white/10 hover:text-white transition"
            >
              {aboutLabel}
            </Link>

            {/* Mobile Services Accordion */}
            <div className="rounded-xl border border-slate-800/80 bg-white/[0.02] overflow-hidden">
              <button
                type="button"
                onClick={() => setServicesExpanded((prev) => !prev)}
                aria-expanded={servicesExpanded}
                className="w-full flex items-center justify-between px-3.5 py-2.5 text-sm font-bold text-white hover:bg-white/5 transition cursor-pointer"
              >
                <span>{servicesLabel}</span>
                <ChevronDown
                  className={cn(
                    "size-4 text-[#F472B6] transition-transform duration-200",
                    servicesExpanded && "rotate-180"
                  )}
                />
              </button>

              {servicesExpanded && (
                <div className="px-3 pb-3 pt-1 space-y-2 border-t border-slate-800/80">
                  {NAVBAR_SERVICES_LIST.map((service) => {
                    const Icon = service.icon;
                    return (
                      <Link
                        key={service.id}
                        href={service.href}
                        onClick={() => {
                          setServicesExpanded(false);
                          setMenuOpen(false);
                        }}
                        className="flex items-start gap-3 rounded-xl p-2.5 hover:bg-white/10 transition"
                      >
                        <div className="size-8 rounded-lg bg-[#C01072]/20 border border-[#C01072]/30 text-[#F472B6] flex items-center justify-center shrink-0 mt-0.5">
                          <Icon className="size-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-white leading-snug">
                            {service.title}
                          </p>
                          <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
                            {service.description}
                          </p>
                        </div>
                      </Link>
                    );
                  })}

                  <a
                    href="https://capital-m-law.vercel.app/services"
                    onClick={() => {
                      setServicesExpanded(false);
                      setMenuOpen(false);
                    }}
                    className="mt-2 flex items-center justify-between gap-2 rounded-xl bg-[#C01072]/15 border border-[#C01072]/40 px-3.5 py-2.5 text-xs font-semibold text-[#F472B6] hover:bg-[#C01072] hover:text-white transition"
                  >
                    <span>Looking for something else? View all legal services ↗</span>
                  </a>
                </div>
              )}
            </div>

            <Link
              href="/blog"
              onClick={() => setMenuOpen(false)}
              className="block rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-200 hover:bg-white/10 hover:text-white transition"
            >
              Blog
            </Link>

            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="block rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-200 hover:bg-white/10 hover:text-white transition"
            >
              {contactLabel}
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-800 grid grid-cols-1 gap-2">
            <a
              href="https://checkout.bold.co/payment/LNK_JTIV4A6HM0"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/20 px-4 py-2.5 text-xs font-bold text-white hover:bg-white/10 transition"
            >
              <CreditCard className="size-3.5 text-[#F472B6]" />
              <span>Pay Consultation</span>
            </a>
            <a
              href="https://calendly.com/capital-m-law-"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#C01072] hover:bg-[#A50E62] px-4 py-2.5 text-xs font-bold text-white shadow-md transition"
            >
              <Calendar className="size-3.5" />
              <span>Book Consultation · $67</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
