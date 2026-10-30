"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Plane,
  Building2,
  Heart,
  Landmark,
  FileText,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  Scale,
  KeyRound,
  Stamp,
  Sparkles,
} from "lucide-react";

export type ServiceThemeKey =
  | "visas"
  | "real-estate"
  | "marriage"
  | "sas"
  | "wills-trusts"
  | "labour-law";

type ActiveTransitionState =
  | {
      mode: "corporate";
      href: string;
      label?: string;
    }
  | {
      mode: "service";
      theme: ServiceThemeKey;
      href: string;
      serviceTitle?: string;
    }
  | null;

interface PageTransitionContextValue {
  navigateWithCorporateLogo: (href: string, label?: string) => void;
  navigateToService: (
    serviceKeyOrSlug: string,
    href: string,
    serviceTitle?: string
  ) => void;
  isTransitioning: boolean;
}

const PageTransitionContext = createContext<PageTransitionContextValue | null>(
  null
);

export function usePageTransition() {
  const ctx = useContext(PageTransitionContext);
  if (!ctx) {
    throw new Error(
      "usePageTransition must be used within a PageTransitionProvider"
    );
  }
  return ctx;
}

export function resolveServiceTheme(slugOrCategory: string): ServiceThemeKey {
  const key = slugOrCategory.toLowerCase();
  if (key.includes("real-estate")) return "real-estate";
  if (key.includes("visa") || key.includes("immigration")) return "visas";
  if (key.includes("marriage") || key.includes("prenup")) return "marriage";
  if (key.includes("sas") || key.includes("company") || key.includes("incorporation"))
    return "sas";
  if (key.includes("will") || key.includes("trust") || key.includes("estate"))
    return "wills-trusts";
  if (key.includes("labour") || key.includes("labor") || key.includes("employment"))
    return "labour-law";
  return "visas";
}

export function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [transition, setTransition] = useState<ActiveTransitionState>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  }, []);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  const executeNavigation = useCallback(
    (href: string, pushDelayMs: number, totalDurationMs: number) => {
      clearTimers();

      const isHashOnly = href.startsWith("#");
      const isRootHash = href.startsWith("/#");
      const hashId = isHashOnly
        ? href.slice(1)
        : isRootHash
        ? href.slice(2)
        : null;

      const navTimer = setTimeout(() => {
        if (hashId && pathname === "/") {
          const targetEl = document.getElementById(hashId);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
          }
          window.history.pushState(null, "", `/#${hashId}`);
        } else if (hashId && pathname !== "/") {
          router.push(`/#${hashId}`);
          const scrollTimer = setTimeout(() => {
            const targetEl = document.getElementById(hashId);
            if (targetEl) {
              targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }, 350);
          timersRef.current.push(scrollTimer);
        } else {
          if (pathname === href) {
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            router.push(href);
          }
        }
      }, pushDelayMs);

      const closeTimer = setTimeout(() => {
        setTransition(null);
      }, totalDurationMs);

      timersRef.current.push(navTimer, closeTimer);
    },
    [clearTimers, pathname, router]
  );

  const navigateWithCorporateLogo = useCallback(
    (href: string, label?: string) => {
      setTransition({
        mode: "corporate",
        href,
        label,
      });
      executeNavigation(href, 520, 1050);
    },
    [executeNavigation]
  );

  const navigateToService = useCallback(
    (serviceKeyOrSlug: string, href: string, serviceTitle?: string) => {
      const theme = resolveServiceTheme(serviceKeyOrSlug);
      setTransition({
        mode: "service",
        theme,
        href,
        serviceTitle,
      });
      executeNavigation(href, 680, 1280);
    },
    [executeNavigation]
  );

  return (
    <PageTransitionContext.Provider
      value={{
        navigateWithCorporateLogo,
        navigateToService,
        isTransitioning: transition !== null,
      }}
    >
      {children}

      <AnimatePresence mode="wait">
        {transition?.mode === "corporate" && (
          <CorporateLogoOverlay
            key="corporate-transition"
            label={transition.label}
          />
        )}

        {transition?.mode === "service" && (
          <ServiceThematicOverlay
            key={`service-transition-${transition.theme}`}
            theme={transition.theme}
            serviceTitle={transition.serviceTitle}
          />
        )}
      </AnimatePresence>
    </PageTransitionContext.Provider>
  );
}

/* ============================================================================
 * 1. GLOBAL CORPORATE LOGO TRANSITION (Services, Blog, Contact)
 * ============================================================================ */
function CorporateLogoOverlay({ label }: { label?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-[#16345F] text-white select-none"
      aria-live="polite"
      aria-label="Loading Capital M Law"
    >
      {/* Ambient Brand Glows */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1.15, opacity: 0.35 }}
        exit={{ scale: 1.3, opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="pointer-events-none absolute -top-28 -right-28 h-96 w-96 rounded-full bg-[#C01072] blur-3xl"
      />
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1.15, opacity: 0.25 }}
        exit={{ scale: 1.3, opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.05 }}
        className="pointer-events-none absolute -bottom-28 -left-28 h-96 w-96 rounded-full bg-[#00AA81] blur-3xl"
      />

      {/* Center Corporate Emblem & Logo */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <div className="relative flex items-center justify-center">
          {/* Outer Rotating Ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.75, rotate: -30 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 1.15, rotate: 15 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -inset-6 rounded-3xl border border-white/15 bg-white/[0.04] backdrop-blur-md shadow-2xl"
          />

          {/* Pulse Halo */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0.5 }}
            animate={{ scale: [0.95, 1.08, 0.98], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -inset-3 rounded-2xl border border-[#00AA81]/40"
          />

          {/* Corporate Logo Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.84, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.06, y: -10 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex items-center gap-3 px-8 py-5"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/capital-m-logo-white.svg"
              alt="Capital M Law"
              className="h-12 sm:h-14 w-auto drop-shadow-[0_10px_25px_rgba(0,0,0,0.35)]"
            />
            <span className="text-sm sm:text-base font-bold tracking-[0.28em] uppercase text-[#9BB8E0] border-l border-white/20 pl-3">
              Law
            </span>
          </motion.div>
        </div>

        {/* Destination Label */}
        {label && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.35, delay: 0.12 }}
            className="mt-9 text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#00AA81]"
          >
            {label}
          </motion.p>
        )}

        {/* Animated Progress Bar */}
        <div className="mt-4 h-1 w-48 sm:w-56 overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-full rounded-full bg-gradient-to-r from-[#C01072] via-[#00AA81] to-[#9BB8E0]"
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================================
 * 2. THEMATIC SERVICE-SPECIFIC TRANSITIONS (Exclusively on "Learn More")
 * ============================================================================ */
function ServiceThematicOverlay({
  theme,
  serviceTitle,
}: {
  theme: ServiceThemeKey;
  serviceTitle?: string;
}) {
  if (theme === "real-estate") {
    return <RealEstateDoorOverlay serviceTitle={serviceTitle} />;
  }
  if (theme === "visas") {
    return <VisasPassportOverlay serviceTitle={serviceTitle} />;
  }
  if (theme === "marriage") {
    return <MarriageRingsOverlay serviceTitle={serviceTitle} />;
  }
  if (theme === "sas") {
    return <SasCorporateOverlay serviceTitle={serviceTitle} />;
  }
  if (theme === "wills-trusts") {
    return <WillsTrustsDocumentOverlay serviceTitle={serviceTitle} />;
  }
  return <LabourLawBriefcaseOverlay serviceTitle={serviceTitle} />;
}

/**
 * REAL ESTATE: Architectural Double-Door Opening ("Apertura de Puertas")
 */
function RealEstateDoorOverlay({ serviceTitle }: { serviceTitle?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden select-none"
      style={{ perspective: "1400px" }}
    >
      {/* Left Architectural Door Panel */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: ["0%", "0%", "-102%"] }}
        transition={{
          duration: 1.2,
          times: [0, 0.58, 1],
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute inset-y-0 left-0 w-1/2 bg-[#16345F] border-r-2 border-[#00AA81]/60 flex items-center justify-end pr-6 sm:pr-10 shadow-2xl"
      >
        {/* Architectural Door Molding */}
        <div className="pointer-events-none absolute inset-6 rounded-2xl border border-white/10" />
        <div className="pointer-events-none absolute inset-12 rounded-xl border border-[#9BB8E0]/15 hidden sm:block" />
        {/* Left Brass/Mint Door Handle */}
        <div className="h-20 w-2.5 rounded-full bg-gradient-to-b from-[#00AA81] to-[#9BB8E0] shadow-[0_0_20px_rgba(0,170,129,0.6)]" />
      </motion.div>

      {/* Right Architectural Door Panel */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: ["0%", "0%", "102%"] }}
        transition={{
          duration: 1.2,
          times: [0, 0.58, 1],
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute inset-y-0 right-0 w-1/2 bg-[#16345F] border-l-2 border-[#00AA81]/60 flex items-center justify-start pl-6 sm:pl-10 shadow-2xl"
      >
        {/* Architectural Door Molding */}
        <div className="pointer-events-none absolute inset-6 rounded-2xl border border-white/10" />
        <div className="pointer-events-none absolute inset-12 rounded-xl border border-[#9BB8E0]/15 hidden sm:block" />
        {/* Right Brass/Mint Door Handle */}
        <div className="h-20 w-2.5 rounded-full bg-gradient-to-b from-[#00AA81] to-[#9BB8E0] shadow-[0_0_20px_rgba(0,170,129,0.6)]" />
      </motion.div>

      {/* Center Key & Property Crest Badge */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{
          scale: [0.85, 1.05, 0.9],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 1.05,
          times: [0, 0.45, 1],
          ease: "easeInOut",
        }}
        className="relative z-20 flex flex-col items-center gap-3 rounded-3xl border border-[#00AA81]/50 bg-[#0A1526]/95 px-8 py-6 text-white shadow-[0_20px_60px_rgba(0,0,0,0.65)] backdrop-blur-md"
      >
        <div className="flex size-16 items-center justify-center rounded-2xl bg-[#00AA81]/20 border border-[#00AA81]/40 text-[#00AA81]">
          <Building2 className="size-8" />
        </div>
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#00AA81]">
          <KeyRound className="size-3.5" />
          <span>Real Estate & Landlord Law</span>
        </div>
        <p className="text-sm sm:text-base font-extrabold text-white text-center">
          {serviceTitle || "Property & Title Due Diligence"}
        </p>
      </motion.div>
    </motion.div>
  );
}

/**
 * VISAS & IMMIGRATION: Passport Document, Flight Trajectory & Official Visa Stamp
 */
function VisasPassportOverlay({ serviceTitle }: { serviceTitle?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#16345F] text-white select-none"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,170,129,0.18),transparent_65%)]" />

      <div className="relative z-10 flex flex-col items-center gap-5 px-6">
        {/* Animated Passport / Visa Document Card */}
        <motion.div
          initial={{ y: 30, scale: 0.85, opacity: 0, rotate: -4 }}
          animate={{ y: 0, scale: 1, opacity: 1, rotate: 0 }}
          exit={{ y: -20, scale: 1.05, opacity: 0 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-72 sm:w-80 rounded-3xl border border-white/20 bg-[#0F223D] p-6 shadow-2xl overflow-hidden"
        >
          {/* Passport Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#9BB8E0]">
              República de Colombia
            </span>
            <Plane className="size-4 text-[#00AA81]" />
          </div>

          {/* Document Lines */}
          <div className="mt-4 space-y-2.5">
            <div className="h-2.5 w-2/3 rounded-full bg-white/20" />
            <div className="h-2 w-1/2 rounded-full bg-white/10" />
            <div className="h-2 w-5/6 rounded-full bg-white/10" />
          </div>

          {/* Official Visa Stamp Impact */}
          <motion.div
            initial={{ scale: 2.2, opacity: 0, rotate: -18 }}
            animate={{ scale: 1, opacity: 1, rotate: -8 }}
            transition={{
              delay: 0.22,
              type: "spring",
              stiffness: 320,
              damping: 18,
            }}
            className="mt-5 inline-flex items-center gap-2 rounded-xl border-2 border-[#00AA81] bg-[#00AA81]/15 px-3.5 py-1.5 text-[#00AA81] shadow-lg"
          >
            <Stamp className="size-4" />
            <span className="text-xs font-black uppercase tracking-widest">
              VISA STRATEGY · V / M / R
            </span>
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-sm sm:text-base font-extrabold tracking-wide text-white text-center"
        >
          {serviceTitle || "Visas & Immigration Strategy"}
        </motion.p>
      </div>
    </motion.div>
  );
}

/**
 * MARRIAGE & PRENUPS: Interlocking Rings & Notarial Family Deed
 */
function MarriageRingsOverlay({ serviceTitle }: { serviceTitle?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#16345F] text-white select-none"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(192,16,114,0.22),transparent_65%)]" />

      <div className="relative z-10 flex flex-col items-center gap-6 px-6">
        {/* Interlocking Rings Animation */}
        <div className="relative flex h-28 w-44 items-center justify-center">
          <motion.div
            initial={{ x: -38, scale: 0.8, opacity: 0 }}
            animate={{ x: -14, scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="size-20 rounded-full border-4 border-[#C01072] bg-[#C01072]/10 shadow-[0_0_30px_rgba(192,16,114,0.5)]"
          />
          <motion.div
            initial={{ x: 38, scale: 0.8, opacity: 0 }}
            animate={{ x: 14, scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="size-20 rounded-full border-4 border-[#00AA81] bg-[#00AA81]/10 shadow-[0_0_30px_rgba(0,170,129,0.5)]"
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.28, type: "spring", stiffness: 260 }}
            className="absolute z-10 flex size-10 items-center justify-center rounded-full bg-white text-[#C01072] shadow-xl"
          >
            <Heart className="size-5 fill-current" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-center space-y-1.5"
        >
          <span className="inline-block rounded-full bg-[#00AA81]/20 border border-[#00AA81]/40 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#00AA81]">
            Family Law & Prenuptial Strategies
          </span>
          <p className="text-base sm:text-lg font-extrabold text-white">
            {serviceTitle || "Marriage, Prenups & Family Protection"}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

/**
 * SAS INCORPORATION: Corporate Charter Documents & Seal
 */
function SasCorporateOverlay({ serviceTitle }: { serviceTitle?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#16345F] text-white select-none"
    >
      <div className="relative z-10 flex flex-col items-center gap-5 px-6">
        {/* Stacked Corporate Bylaws & Charter */}
        <div className="relative flex items-center justify-center">
          <motion.div
            initial={{ y: 20, rotate: -6, opacity: 0 }}
            animate={{ y: 4, rotate: -4, opacity: 0.5 }}
            transition={{ duration: 0.35 }}
            className="absolute h-40 w-64 rounded-2xl border border-white/15 bg-white/5"
          />
          <motion.div
            initial={{ y: 25, scale: 0.9, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-68 sm:w-72 rounded-2xl border border-white/20 bg-[#0F223D] p-5 shadow-2xl space-y-3"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <div className="flex items-center gap-2">
                <Landmark className="size-5 text-[#C01072]" />
                <span className="text-xs font-extrabold uppercase tracking-wider text-white">
                  S.A.S. Incorporation
                </span>
              </div>
              <span className="rounded bg-[#00AA81]/20 px-2 py-0.5 text-[10px] font-bold text-[#00AA81]">
                DIAN · NIT
              </span>
            </div>
            <div className="space-y-2">
              <div className="h-2 w-4/5 rounded-full bg-white/20" />
              <div className="h-2 w-3/5 rounded-full bg-white/15" />
              <div className="h-2 w-2/3 rounded-full bg-white/10" />
            </div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.22 }}
              className="flex items-center gap-1.5 pt-1 text-xs font-bold text-[#00AA81]"
            >
              <CheckCircle2 className="size-4" />
              <span>Cámara de Comercio Verified</span>
            </motion.div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-base sm:text-lg font-extrabold text-white text-center"
        >
          {serviceTitle || "SAS Company Formation & Corporate Law"}
        </motion.p>
      </div>
    </motion.div>
  );
}

/**
 * WILLS & TRUSTS: Solemn Estate Document Unfolding & Heritage Shield
 */
function WillsTrustsDocumentOverlay({
  serviceTitle,
}: {
  serviceTitle?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#16345F] text-white select-none"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,170,129,0.2),transparent_65%)]" />

      <div className="relative z-10 flex flex-col items-center gap-5 px-6">
        <motion.div
          initial={{ scaleY: 0.25, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
          className="w-72 sm:w-80 origin-top rounded-3xl border border-[#00AA81]/40 bg-[#0F223D] p-6 shadow-2xl space-y-4"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <FileText className="size-5 text-[#00AA81]" />
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#9BB8E0]">
                Testamento & Fiducia Civil
              </span>
            </div>
            <ShieldCheck className="size-5 text-[#00AA81]" />
          </div>

          <div className="space-y-2">
            <div className="h-2 w-full rounded-full bg-white/20" />
            <div className="h-2 w-5/6 rounded-full bg-white/15" />
            <div className="h-2 w-3/4 rounded-full bg-white/10" />
          </div>

          {/* Animated Signature Line */}
          <div className="pt-2 flex items-center justify-between border-t border-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "65%" }}
              transition={{ delay: 0.22, duration: 0.4 }}
              className="h-1 rounded-full bg-gradient-to-r from-[#00AA81] to-[#C01072]"
            />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#00AA81]">
              Notaría Pública
            </span>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-base sm:text-lg font-extrabold text-white text-center"
        >
          {serviceTitle || "Wills, Trusts & Estate Planning"}
        </motion.p>
      </div>
    </motion.div>
  );
}

/**
 * LABOUR LAW: Executive Briefcase, Employment Contract & Scales
 */
function LabourLawBriefcaseOverlay({
  serviceTitle,
}: {
  serviceTitle?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#16345F] text-white select-none"
    >
      <div className="relative z-10 flex flex-col items-center gap-5 px-6">
        <motion.div
          initial={{ scale: 0.82, y: 18, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="w-72 sm:w-80 rounded-3xl border border-white/20 bg-[#0F223D] p-6 shadow-2xl space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-[#C01072]/20 border border-[#C01072]/40 text-[#F472B6]">
              <Briefcase className="size-6" />
            </div>
            <div className="flex size-12 items-center justify-center rounded-2xl bg-[#00AA81]/20 border border-[#00AA81]/40 text-[#00AA81]">
              <Scale className="size-6" />
            </div>
          </div>

          <div className="space-y-2 pt-1">
            <div className="h-2.5 w-3/4 rounded-full bg-white/20" />
            <div className="h-2 w-1/2 rounded-full bg-white/10" />
          </div>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 rounded-xl bg-[#00AA81]/15 border border-[#00AA81]/30 px-3 py-2 text-xs font-bold text-[#00AA81]"
          >
            <ShieldCheck className="size-4 shrink-0" />
            <span>CST & UGPP Compliance Shield</span>
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-base sm:text-lg font-extrabold text-white text-center"
        >
          {serviceTitle || "Labour Law & Employment Compliance"}
        </motion.p>
      </div>
    </motion.div>
  );
}

/* ============================================================================
 * 3. HELPER INTERACTIVE COMPONENTS
 * ============================================================================ */

function isModifiedClick(e: React.MouseEvent<HTMLAnchorElement>) {
  return (
    e.metaKey ||
    e.ctrlKey ||
    e.shiftKey ||
    e.altKey ||
    e.button !== 0
  );
}

/**
 * Global navigation link that triggers the Capital M Corporate Logo Transition
 * (Used on main navbar links: Services, Blog, Contact)
 */
export function CorporateNavLink({
  href,
  label,
  className,
  children,
  onClick,
}: {
  href: string;
  label?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const { navigateWithCorporateLogo } = usePageTransition();

  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        if (isModifiedClick(e)) return;
        e.preventDefault();
        onClick?.();
        navigateWithCorporateLogo(href, label);
      }}
    >
      {children}
    </a>
  );
}

/**
 * Thematic service link that triggers the service-specific transition
 * (Used exclusively on "Learn More" buttons for individual services)
 */
export function ServiceLearnMoreLink({
  href,
  serviceKey,
  serviceTitle,
  className,
  children,
}: {
  href: string;
  serviceKey: string;
  serviceTitle?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const { navigateToService } = usePageTransition();

  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        if (isModifiedClick(e)) return;
        e.preventDefault();
        navigateToService(serviceKey, href, serviceTitle);
      }}
    >
      {children}
    </a>
  );
}
