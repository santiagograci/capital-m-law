"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
} from "framer-motion";
import { MessageCircle, Sparkles, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/* ============================================================================
 * 1. MAGNETIC BUTTON / WRAPPER (Elastic Magnetic Pull)
 * ============================================================================ */
export function MagneticWrapper({
  children,
  className,
  strength = 0.28,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 240, damping: 15, mass: 0.45 });
  const springY = useSpring(y, { stiffness: 240, damping: 15, mass: 0.45 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}

/* ============================================================================
 * 3. 3D TILT & GLASS SHEEN CARD / ROW
 * ============================================================================ */
export function TiltGlassCard({
  children,
  className,
  maxTilt = 5,
  sheenSize = 380,
}: {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  sheenSize?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const sheenOpacity = useMotionValue(0);

  const springRotateX = useSpring(rotateX, {
    stiffness: 260,
    damping: 22,
    mass: 0.5,
  });
  const springRotateY = useSpring(rotateY, {
    stiffness: 260,
    damping: 22,
    mass: 0.5,
  });
  const springSheenOpacity = useSpring(sheenOpacity, {
    stiffness: 220,
    damping: 25,
  });

  const sheenBackground = useMotionTemplate`radial-gradient(${sheenSize}px circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.26), rgba(192, 16, 114, 0.10) 42%, transparent 80%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;

    const pctX = localX / rect.width - 0.5;
    const pctY = localY / rect.height - 0.5;

    rotateX.set(-pctY * maxTilt * 2);
    rotateY.set(pctX * maxTilt * 2);
    mouseX.set(localX);
    mouseY.set(localY);
    sheenOpacity.set(1);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    sheenOpacity.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 1100,
      }}
      className={cn("relative overflow-hidden will-change-transform", className)}
    >
      {/* Radial Glass Sheen Reflection */}
      <motion.div
        aria-hidden="true"
        style={{
          background: sheenBackground,
          opacity: springSheenOpacity,
        }}
        className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] mix-blend-soft-light dark:mix-blend-screen"
      />
      {children}
    </motion.div>
  );
}

/* ============================================================================
 * 4. READING PROGRESS BAR (Individual Blog Article View)
 * ============================================================================ */
export function ReadingProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="pointer-events-none fixed top-0 left-0 right-0 z-[70] h-[3.5px] origin-left bg-gradient-to-r from-[#C01072] via-[#F472B6] to-[#00AA81] shadow-[0_0_12px_rgba(192,16,114,0.85)]"
    />
  );
}

/* ============================================================================
 * 5. FLOATING CONTACT / WHATSAPP BUTTON WITH SOFT PULSE & MICRO-CARD
 * ============================================================================ */
export function FloatingContactButton() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState(false);

  // Hide on admin routes
  if (pathname?.startsWith("/admin")) return null;

  return (
    <div
      className="fixed bottom-36 sm:bottom-24 right-7 z-50 flex flex-col items-end"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mb-3 w-68 rounded-2xl border border-[#16345F]/15 dark:border-white/15 bg-white/95 dark:bg-[#0F223D]/95 p-4 shadow-2xl backdrop-blur-md text-left"
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#00AA81]">
                <span className="size-2 rounded-full bg-[#00AA81] animate-ping" />
                <span>Medellín Counsel Online</span>
              </span>
              <Sparkles className="size-3.5 text-[#C01072]" />
            </div>
            <p className="text-xs font-extrabold text-[#16345F] dark:text-white leading-snug">
              Speak directly with our bilingual legal team
            </p>
            <p className="mt-1 text-[11px] text-[#706F6F] dark:text-gray-300 leading-relaxed">
              Visas, Real Estate Due Diligence, Prenups & SAS Incorporation.
            </p>
            <a
              href="https://wa.me/573146022411?text=Hello%20Capital%20M%20Law!%20I%20would%20like%20to%20inquire%20about%20legal%20representation."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#C01072] hover:bg-[#16345F] px-3 py-2 text-xs font-bold text-white transition-colors"
            >
              <span>Start WhatsApp Chat</span>
              <ArrowUpRight className="size-3.5" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button with Soft Ripple Pulse */}
      <MagneticWrapper strength={0.3}>
        <a
          href="https://wa.me/573146022411?text=Hello%20Capital%20M%20Law!%20I%20would%20like%20to%20inquire%20about%20legal%20representation."
          target="_blank"
          rel="noopener noreferrer"
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
          aria-label="Contact Capital M Law on WhatsApp"
          className="relative flex size-14 items-center justify-center rounded-full bg-gradient-to-tr from-[#16345F] to-[#C01072] text-white shadow-[0_10px_30px_rgba(192,16,114,0.45)] transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#C01072] focus:ring-offset-2"
        >
          {/* Ripple Wave 1 */}
          <motion.span
            aria-hidden="true"
            animate={{
              scale: [1, 1.55],
              opacity: [0.45, 0],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeOut",
            }}
            className="pointer-events-none absolute inset-0 rounded-full border-2 border-[#C01072]"
          />
          {/* Ripple Wave 2 */}
          <motion.span
            aria-hidden="true"
            animate={{
              scale: [1, 1.85],
              opacity: [0.3, 0],
            }}
            transition={{
              duration: 2.2,
              delay: 0.75,
              repeat: Infinity,
              ease: "easeOut",
            }}
            className="pointer-events-none absolute inset-0 rounded-full border border-[#00AA81]"
          />

          <MessageCircle className="size-6 fill-white/15" />
          <span className="absolute top-0.5 right-0.5 size-3 rounded-full border-2 border-white bg-[#00AA81]" />
        </a>
      </MagneticWrapper>
    </div>
  );
}

/* ============================================================================
 * 6. ANIMATED NUMBER COUNTER (Viewport-Triggered Count-Up)
 * ============================================================================ */
export function AnimatedCounter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.6,
  className,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const motionVal = useMotionValue(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(motionVal, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        if (ref.current) {
          ref.current.textContent = `${prefix}${latest.toFixed(decimals)}${suffix}`;
        }
      },
    });
    return () => controls.stop();
  }, [isInView, value, decimals, prefix, suffix, duration, motionVal]);

  return (
    <span ref={ref} className={className}>
      {`${prefix}${(0).toFixed(decimals)}${suffix}`}
    </span>
  );
}
