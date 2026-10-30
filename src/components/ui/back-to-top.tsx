"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ChevronUp } from "lucide-react";

const SIZE = 52;
const STROKE_WIDTH = 3;
const RADIUS = (SIZE - STROKE_WIDTH * 2) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function BackToTop() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  // Map scrollYProgress [0, 1] -> stroke-dashoffset [CIRCUMFERENCE, 0]
  const strokeDashoffset = useTransform(
    smoothProgress,
    [0, 1],
    [CIRCUMFERENCE, 0]
  );

  useMotionValueEvent(scrollY, "change", (latest) => {
    const shouldShow = latest > 350;
    if (shouldShow !== isVisible) {
      setIsVisible(shouldShow);
    }
  });

  // Hide on internal admin pages
  if (pathname?.startsWith("/admin")) return null;

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          key="back-to-top-btn"
          type="button"
          onClick={handleScrollToTop}
          initial={{ opacity: 0, scale: 0.7, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 12 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Back to top"
          title="Back to top"
          className="fixed bottom-8 right-8 z-40 flex size-[52px] items-center justify-center rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 shadow-lg hover:scale-110 transition-transform cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[#C01072]"
        >
          {/* Circular SVG Progress Ring */}
          <svg
            width={SIZE}
            height={SIZE}
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -rotate-90"
          >
            {/* Subtle Background Track Circle */}
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth={STROKE_WIDTH}
            />
            {/* Dynamic Corporate Magenta Progress Circle */}
            <motion.circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="#C01072"
              strokeWidth={STROKE_WIDTH}
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              style={{ strokeDashoffset }}
            />
          </svg>

          {/* Center Upward Chevron Icon */}
          <ChevronUp className="relative z-10 size-5 text-white transition-transform duration-200 group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
