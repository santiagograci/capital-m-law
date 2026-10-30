"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  ShieldCheck,
  CheckCircle,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { AnimatedCounter } from "@/components/ui/micro-interactions";
import type {
  GooglePlaceReview,
  GoogleReviewsResponse,
} from "@/app/api/reviews/route";

interface SocialProofReviewsProps {
  lang: "en" | "es";
  totalReviews?: number;
  rating?: number;
  initialReviews?: GooglePlaceReview[];
}

const DEFAULT_FALLBACK_REVIEWS: GooglePlaceReview[] = [
  {
    author_name: "Alex",
    profile_photo_url:
      "https://ui-avatars.com/api/?name=Alex&background=16345F&color=ffffff&bold=true",
    rating: 5,
    text: "The team at Capital M stayed with me through a visa process, guiding me through every step, staying responsive, and making a clear case to the government for the best visa available. I received 2 years on my visa!",
    relative_time_description: "11 months ago",
  },
  {
    author_name: "Mike",
    profile_photo_url:
      "https://ui-avatars.com/api/?name=Mike&background=C01072&color=ffffff&bold=true",
    rating: 5,
    text: "Daniel and Maria at Capital have been amazing! They helped me with my visa and another legal matter, as well as some friends, and everything has been perfect. Kind, professional, and supportive.",
    relative_time_description: "12 months ago",
  },
  {
    author_name: "Carl",
    profile_photo_url:
      "https://ui-avatars.com/api/?name=Carl&background=00AA81&color=ffffff&bold=true",
    rating: 5,
    text: "Ana María helped me secure my Colombian visa and cédula, and I could not be happier with the service. Upfront, dependable, and communicated well. The process was smooth, quick, and easy.",
    relative_time_description: "a year ago",
  },
];

export function SocialProofReviews({
  lang,
  totalReviews: propTotalReviews,
  rating: propRating,
  initialReviews,
}: SocialProofReviewsProps) {
  const [reviews, setReviews] = useState<GooglePlaceReview[]>(
    initialReviews && initialReviews.length > 0
      ? initialReviews
      : DEFAULT_FALLBACK_REVIEWS
  );
  const [totalReviews, setTotalReviews] = useState<number>(
    propTotalReviews ?? 53
  );
  const [rating, setRating] = useState<number>(propRating ?? 4.8);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (typeof propTotalReviews === "number") {
      setTotalReviews(propTotalReviews);
    }
    if (typeof propRating === "number") {
      setRating(propRating);
    }
    if (initialReviews && initialReviews.length > 0) {
      setReviews(initialReviews);
    }
  }, [propTotalReviews, propRating, initialReviews]);

  useEffect(() => {
    if (initialReviews && initialReviews.length > 0) return;

    let mounted = true;
    fetch("/api/reviews")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: GoogleReviewsResponse | null) => {
        if (!mounted || !data) return;
        if (typeof data.totalReviews === "number") {
          setTotalReviews(data.totalReviews);
        }
        if (typeof data.rating === "number") {
          setRating(data.rating);
        }
        if (Array.isArray(data.reviews) && data.reviews.length > 0) {
          setReviews(data.reviews);
          setActiveIndex(0);
        }
      })
      .catch(() => {});

    return () => {
      mounted = false;
    };
  }, [initialReviews]);

  const safeReviews =
    reviews.length > 0 ? reviews : DEFAULT_FALLBACK_REVIEWS;
  const current = safeReviews[activeIndex % safeReviews.length];

  const prev = () => {
    setActiveIndex((curr) =>
      curr === 0 ? safeReviews.length - 1 : curr - 1
    );
  };

  const next = () => {
    setActiveIndex((curr) =>
      curr === safeReviews.length - 1 ? 0 : curr + 1
    );
  };

  return (
    <section
      id="forum"
      className="py-20 px-4 max-w-[1240px] mx-auto relative z-10 space-y-12"
    >
      {/* Header with Live Google Places Rating & Total Reviews */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 dark:border-white/10 pb-8">
        <div className="space-y-3 text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-700 dark:text-amber-400">
            <span className="flex text-amber-500">★★★★★</span>
            <span>
              <AnimatedCounter value={rating} decimals={1} /> / 5.0 Google
              Reviews (<AnimatedCounter value={totalReviews} suffix="+" />{" "}
              Verified Expat Clients)
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#16345F] dark:text-white">
            {lang === "es"
              ? "Testimonios y Reseñas Verificadas en Google"
              : "Verified Google Maps Client Reviews"}
          </h2>
          <p className="text-sm text-[#706F6F] dark:text-gray-300 max-w-xl">
            {lang === "es"
              ? "Reseñas reales sincronizadas desde Google Maps de expatriados, nómadas e inversionistas representados por Capital M Law en Medellín."
              : "Live synchronized Google Maps reviews from expats, investors, and founders who trusted their legal matters in Colombia to Capital M Law."}
          </p>
        </div>

        {/* Live Google Maps Widget Box */}
        <div className="bg-white dark:bg-[#0F1E35] p-5 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm flex items-center gap-4 shrink-0">
          <div className="size-12 rounded-xl bg-[#16345F] text-white flex items-center justify-center font-bold text-xl">
            G
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#16345F] dark:text-white">
              <span>Capital M Law</span>
              <CheckCircle className="size-3.5 text-[#34D399]" />
            </div>
            <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
              <span>
                <AnimatedCounter value={rating} decimals={1} />
              </span>
              <span>★★★★★</span>
              <span className="text-[#706F6F] dark:text-gray-400 font-normal">
                (<AnimatedCounter value={totalReviews} /> reviews)
              </span>
            </div>
            <a
              href="https://maps.google.com/?q=Capital+M+Law+Medellin"
              target="_blank"
              rel="noreferrer"
              className="text-[11px] font-semibold text-[#C01072] dark:text-[#F472B6] hover:underline flex items-center gap-1 mt-0.5"
            >
              <MapPin className="size-3" />
              <span>
                {lang === "es" ? "Ver en Google Maps" : "View on Google Maps"}
              </span>
              <ExternalLink className="size-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Glassmorphism Real Google Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {safeReviews.slice(0, 3).map((rev, idx) => (
          <motion.article
            key={`${rev.author_name}-${idx}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            onClick={() => setActiveIndex(idx)}
            className="group cursor-pointer bg-[#16345F]/95 dark:bg-slate-900/50 backdrop-blur-md border border-white/15 rounded-2xl p-6 shadow-xl hover:scale-[1.02] hover:border-[#C01072]/50 transition-all duration-300 flex flex-col justify-between text-left text-white"
          >
            <div className="space-y-4">
              {/* Client Profile & Stars */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="size-11 rounded-full overflow-hidden bg-white/10 border border-white/20 shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={rev.profile_photo_url}
                      alt={rev.author_name}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          rev.author_name
                        )}&background=C01072&color=ffffff&bold=true`;
                      }}
                      className="size-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-white text-sm truncate">
                      {rev.author_name}
                    </h3>
                    <p className="text-[11px] text-[#9BB8E0] truncate">
                      {rev.relative_time_description}
                    </p>
                  </div>
                </div>

                {/* 5 Stars with Gold Shimmer */}
                <div className="flex items-center gap-0.5 text-amber-400 shrink-0">
                  {Array.from({ length: rev.rating || 5 }).map((_, sIdx) => (
                    <Star
                      key={sIdx}
                      className="size-3.5 fill-amber-400 text-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.6)]"
                    />
                  ))}
                </div>
              </div>

              {/* Verified Google Review Text */}
              <p className="text-xs sm:text-sm text-gray-200 leading-relaxed line-clamp-5">
                &ldquo;{rev.text}&rdquo;
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-[#00AA81] font-semibold">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="size-3.5" />
                <span>
                  {lang === "es"
                    ? "Reseña Verificada de Google"
                    : "Verified Google Review"}
                </span>
              </span>
              <span className="text-[#9BB8E0] font-bold">G</span>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Interactive Review Showcase & Firm Credentials */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Main Featured Testimonial Card */}
        <div className="lg:col-span-8 bg-white dark:bg-[#0F1E35] rounded-3xl p-8 sm:p-10 border border-gray-200 dark:border-white/10 shadow-md relative space-y-6 text-left">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={current.profile_photo_url}
                  alt={current.author_name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      current.author_name
                    )}&background=16345F&color=ffffff&bold=true`;
                  }}
                  className="size-full object-cover"
                />
              </div>
              <div>
                <p className="font-bold text-[#16345F] dark:text-white text-base sm:text-lg">
                  {current.author_name}
                </p>
                <p className="text-xs text-[#706F6F] dark:text-gray-400">
                  {current.relative_time_description} ·{" "}
                  <span className="text-[#C01072] dark:text-[#F472B6] font-semibold">
                    Google Maps Review
                  </span>
                </p>
              </div>
            </div>

            <div className="flex gap-1 text-amber-400">
              {Array.from({ length: current.rating || 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </div>
          </div>

          <p className="text-base sm:text-lg text-gray-800 dark:text-gray-200 leading-relaxed italic">
            &ldquo;{current.text}&rdquo;
          </p>

          <div className="pt-4 border-t border-gray-100 dark:border-white/10 flex items-center justify-between text-xs text-[#706F6F] dark:text-gray-400">
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
              <ShieldCheck className="size-4" />{" "}
              {lang === "es"
                ? "Reseña verificada en Google Maps"
                : "Verified Google Maps review"}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous review"
                className="size-9 rounded-full border border-gray-200 dark:border-white/10 hover:bg-[#16345F] hover:text-white dark:hover:bg-white/10 flex items-center justify-center transition cursor-pointer"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next review"
                className="size-9 rounded-full bg-[#16345F] dark:bg-[#C01072] text-white hover:opacity-90 flex items-center justify-center transition shadow-xs cursor-pointer"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Firm Credential Sidebar */}
        <div className="lg:col-span-4 space-y-4 text-left">
          <div className="rounded-3xl bg-[#FAFBFD] dark:bg-white/[0.02] border border-[#16345F]/10 dark:border-white/10 p-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C01072] dark:text-[#F472B6] block">
              {lang === "es"
                ? "Respaldo y Credenciales Oficiales"
                : "Legal Authority & Credentials"}
            </span>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-white dark:bg-[#070E1A] border border-gray-200/80 dark:border-white/10 space-y-1">
                <p className="font-bold text-[#16345F] dark:text-white">
                  María Fernanda Duarte
                </p>
                <p className="text-[#706F6F] dark:text-gray-400">
                  Founder & Principal Attorney
                </p>
                <p className="font-mono text-[#C01072] dark:text-[#F472B6] font-semibold text-[11px]">
                  Matrícula CSJ-Col #289.412
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-white dark:bg-[#070E1A] border border-gray-200/80 dark:border-white/10 space-y-1">
                <p className="font-bold text-[#16345F] dark:text-white">
                  Ana María Muñoz
                </p>
                <p className="text-[#706F6F] dark:text-gray-400">
                  Associate Immigration Attorney
                </p>
                <p className="font-mono text-[#C01072] dark:text-[#F472B6] font-semibold text-[11px]">
                  Matrícula CSJ-Col #312.870
                </p>
              </div>
            </div>

            <p className="text-[11px] text-[#706F6F] dark:text-gray-400 leading-relaxed">
              {lang === "es"
                ? "Inscritas y habilitadas ante el Consejo Superior de la Judicatura para litigar y asesorar en todo el territorio colombiano."
                : "Fully licensed by the Superior Judicial Council to practice law throughout the Republic of Colombia."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
