"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Plane,
  Building2,
  Heart,
  Landmark,
  FileText,
  Briefcase,
  ArrowUpRight,
  Menu,
  X,
  Calendar,
  CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_SERVICES, type NavServiceItem } from "@/data/navServices";
import { usePageTransition } from "@/components/transitions/page-transition-provider";

const SERVICE_ICONS: Record<
  NavServiceItem["iconKey"],
  React.ComponentType<{ className?: string }>
> = {
  visas: Plane,
  "real-estate": Building2,
  marriage: Heart,
  sas: Landmark,
  "wills-trusts": FileText,
  "labour-law": Briefcase,
};

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
  const pathname = usePathname();
  const { navigateWithCorporateLogo } = usePageTransition();
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

  const handleSelectService = (
    e: React.MouseEvent<HTMLAnchorElement>,
    service: NavServiceItem
  ) => {
    e.preventDefault();
    setOpen(false);

    if (pathname === "/services") {
      window.history.pushState(null, "", service.href);
      const targetEl = document.getElementById(service.anchorId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      window.dispatchEvent(
        new CustomEvent("capm-highlight-service", {
          detail: { anchorId: service.anchorId },
        })
      );
    } else {
      navigateWithCorporateLogo(service.href, service.title);
    }
  };

  const handleViewAll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setOpen(false);
    if (pathname === "/services") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigateWithCorporateLogo("/services", "Services");
    }
  };

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

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            aria-label="Legal Services"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={cn(
              "absolute top-full mt-3 w-[92vw] max-w-[640px] z-50 backdrop-blur-xl bg-slate-950/90 border border-slate-800 shadow-2xl rounded-2xl p-6",
              align === "center" ? "left-1/2 -translate-x-1/2" : "left-0"
            )}
          >
            {/* 2-Column Homologated Service Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {NAV_SERVICES.map((service) => {
                const Icon = SERVICE_ICONS[service.iconKey] || Plane;
                return (
                  <a
                    key={service.id}
                    href={service.href}
                    role="menuitem"
                    onClick={(e) => handleSelectService(e, service)}
                    className="group flex items-start gap-3.5 rounded-xl p-3 border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-pink-500/40 transform hover:scale-[1.02] transition-all duration-200"
                  >
                    <div className="size-9 rounded-lg bg-pink-500/15 border border-pink-500/30 text-pink-400 group-hover:bg-pink-500 group-hover:text-white flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-200">
                      <Icon className="size-4" />
                    </div>
                    <div className="space-y-0.5 min-w-0">
                      <p className="text-xs sm:text-sm font-bold text-white group-hover:text-pink-400 transition-colors leading-snug">
                        {service.title}
                      </p>
                      <p className="text-[11px] text-slate-400 group-hover:text-slate-300 leading-relaxed line-clamp-2">
                        {service.subtitle}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Bottom Separator & Highlighted All Services CTA */}
            <div className="mt-4 pt-4 border-t border-slate-800">
              <Link
                href="/services"
                onClick={handleViewAll}
                className="group/all flex items-center justify-between gap-3 rounded-xl bg-white/[0.04] hover:bg-pink-500/15 border border-white/10 hover:border-pink-500/40 px-4 py-3 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white transition-all"
              >
                <span>
                  Looking for something else?{" "}
                  <strong className="text-pink-400 group-hover/all:underline">
                    View all legal services ↗
                  </strong>
                </span>
                <ArrowUpRight className="size-4 text-pink-400 shrink-0 transition-transform duration-200 group-hover/all:translate-x-0.5 group-hover/all:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
  const pathname = usePathname();
  const { navigateWithCorporateLogo } = usePageTransition();

  const handleMobileSelectService = (
    e: React.MouseEvent<HTMLAnchorElement>,
    service: NavServiceItem
  ) => {
    e.preventDefault();
    setServicesExpanded(false);
    setMenuOpen(false);

    if (pathname === "/services") {
      window.history.pushState(null, "", service.href);
      const targetEl = document.getElementById(service.anchorId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      window.dispatchEvent(
        new CustomEvent("capm-highlight-service", {
          detail: { anchorId: service.anchorId },
        })
      );
    } else {
      navigateWithCorporateLogo(service.href, service.title);
    }
  };

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

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed inset-x-4 top-[76px] z-50 max-h-[82vh] overflow-y-auto backdrop-blur-xl bg-slate-950/95 border border-slate-800 shadow-2xl rounded-2xl p-5 text-white space-y-3"
          >
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
                      "size-4 text-pink-400 transition-transform duration-200",
                      servicesExpanded && "rotate-180"
                    )}
                  />
                </button>

                <AnimatePresence>
                  {servicesExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-3 pb-3 pt-1 space-y-2 border-t border-slate-800/80">
                        {NAV_SERVICES.map((service) => {
                          const Icon = SERVICE_ICONS[service.iconKey] || Plane;
                          return (
                            <a
                              key={service.id}
                              href={service.href}
                              onClick={(e) =>
                                handleMobileSelectService(e, service)
                              }
                              className="group flex items-start gap-3 rounded-xl p-2.5 border border-transparent hover:border-pink-500/40 hover:bg-white/5 transition"
                            >
                              <div className="size-8 rounded-lg bg-pink-500/15 border border-pink-500/30 text-pink-400 group-hover:bg-pink-500 group-hover:text-white flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                                <Icon className="size-4" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-bold text-white leading-snug">
                                  {service.title}
                                </p>
                                <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
                                  {service.subtitle}
                                </p>
                              </div>
                            </a>
                          );
                        })}

                        <Link
                          href="/services"
                          onClick={(e) => {
                            e.preventDefault();
                            setServicesExpanded(false);
                            setMenuOpen(false);
                            if (pathname !== "/services") {
                              navigateWithCorporateLogo("/services", "Services");
                            }
                          }}
                          className="mt-2 flex items-center justify-between gap-2 rounded-xl bg-pink-500/15 border border-pink-500/40 px-3.5 py-2.5 text-xs font-semibold text-pink-400 hover:bg-pink-500 hover:text-white transition"
                        >
                          <span>
                            Looking for something else? View all legal services ↗
                          </span>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
                <CreditCard className="size-3.5 text-pink-400" />
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
