"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Globe,
  ArrowUpRight,
  Moon,
  Sun,
  Menu,
  X,
  MessageCircle,
  Calendar,
} from "lucide-react";

interface NavbarGlassProps {
  onOpenBooking: () => void;
}

export function NavbarGlass({ onOpenBooking }: NavbarGlassProps) {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState<"EN" | "ES">("EN");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <>
      <div className="bg-[#0F2537] text-[#F8F7F4] text-xs py-2 px-4 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-mono">
            <span className="inline-block w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
            <span>Medellín Office Open (Mon–Fri 9AM–6PM COT)</span>
            <span className="hidden sm:inline text-white/40">|</span>
            <span className="hidden sm:inline text-white/80">
              Cra 66D #32B-57, Belén Malibú
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/573146022411"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#34D399] transition-colors flex items-center gap-1 font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Direct WhatsApp: +57 314 602 2411
            </a>
            <a
              href="https://checkout.bold.co/payment/LNK_JTIV4A6HM0"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1 text-white/80 hover:text-white transition-colors"
            >
              Pay Consultation / Make a Payment
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 px-4 py-3">
        <nav
          aria-label="Main Navigation"
          className="max-w-[1320px] mx-auto glass-panel rounded-2xl px-4 sm:px-6 py-3.5 shadow-sm transition-all"
        >
          <div className="flex items-center justify-between gap-4">
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-[#0F2537] dark:bg-[#E2E8F0] text-[#F8F7F4] dark:text-[#0B0F17] flex items-center justify-center font-display font-semibold text-xl tracking-tighter">
                M
              </div>
              <div>
                <span className="font-display text-lg font-semibold tracking-tight block leading-none">
                  Capital M Law
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#1B4D3E] dark:text-[#34D399] block mt-1">
                  Medellín · Legal Concierge
                </span>
              </div>
            </a>

            <div className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#475569] dark:text-[#94A3B8]">
              <a
                href="#services"
                className="hover:text-[#0F2537] dark:hover:text-white transition-colors"
              >
                Practice Areas
              </a>
              <a
                href="#how-we-work"
                className="hover:text-[#0F2537] dark:hover:text-white transition-colors"
              >
                How We Work
              </a>
              <a
                href="#team-reviews"
                className="hover:text-[#0F2537] dark:hover:text-white transition-colors"
              >
                Team & 4.8★ Reviews
              </a>
              <a
                href="#case-evaluation"
                className="hover:text-[#0F2537] dark:hover:text-white transition-colors"
              >
                Free Case Inquiry
              </a>
            </div>

            <div className="hidden sm:flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setLang(lang === "EN" ? "ES" : "EN")}
                aria-label="Toggle Language"
                className="px-2.5 py-2 rounded-lg text-xs font-mono border border-current/15 hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-1.5 transition"
              >
                <Globe className="w-3.5 h-3.5 text-[#1B4D3E] dark:text-[#34D399]" />
                {lang}
              </button>

              <button
                type="button"
                onClick={() => setIsDark(!isDark)}
                aria-label="Toggle Smart Dark Mode"
                className="p-2 rounded-lg border border-current/15 hover:bg-black/5 dark:hover:bg-white/5 transition"
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-[#F07148]" />
                ) : (
                  <Moon className="w-4 h-4 text-[#0F2537]" />
                )}
              </button>

              <Button
                onClick={onOpenBooking}
                className="bg-[#D95D39] hover:bg-[#c04e2c] dark:bg-[#F07148] dark:hover:bg-[#d95d39] text-white font-medium rounded-xl px-4 py-2.5 h-auto shadow-sm cursor-pointer"
              >
                <Calendar className="w-4 h-4 mr-2" />
                <span>Book Consultation</span>
                <span className="ml-2 font-mono text-xs bg-black/20 px-1.5 py-0.5 rounded">
                  $55
                </span>
              </Button>
            </div>

            <div className="flex sm:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => setIsDark(!isDark)}
                aria-label="Toggle theme"
                className="p-2 rounded-lg border border-current/15"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Open Navigation Menu"
                className="p-2 rounded-lg border border-current/15"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="lg:hidden pt-4 mt-4 border-t border-current/10 flex flex-col gap-3">
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-sm font-medium"
              >
                Practice Areas (Bento)
              </a>
              <a
                href="#how-we-work"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-sm font-medium"
              >
                How We Work & Pricing Models
              </a>
              <a
                href="#team-reviews"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-sm font-medium"
              >
                Meet the Team & Client Reviews
              </a>
              <a
                href="#case-evaluation"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-sm font-medium"
              >
                Send Documents / Free Evaluation
              </a>
              <Button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full bg-[#D95D39] text-white rounded-xl py-3 mt-2"
              >
                Lock In 45-Min Session · $55 USD
              </Button>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}
