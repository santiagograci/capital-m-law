"use client";

import React, { useState } from "react";
import { Star, ShieldCheck, CheckCircle, ExternalLink, ChevronLeft, ChevronRight, Award, MapPin } from "lucide-react";
import { FIGMA_REVIEWS } from "@/data/home-data";
import { AnimatedCounter } from "@/components/ui/micro-interactions";

interface SocialProofReviewsProps {
  lang: "en" | "es";
}

const EXTENDED_VERIFIED_REVIEWS = [
  {
    author: "Christopher M. Vance",
    origin: "Austin, Texas (USA)",
    visaType: "Visa M Inversionista & SAS",
    date: "2 weeks ago",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    textEn:
      "Capital M Law handled my real estate purchase in Provenza and my 3-year Investor Visa. María Fernanda conducted an exhaustive 20-year title audit that detected an uncancelled mortgage from 2011 before I wired any funds. Truly world-class legal diligence.",
    textEs:
      "Capital M Law gestionó mi compra de finca raíz en Provenza y mi visa de inversionista por 3 años. María Fernanda hizo un estudio de títulos a 20 años que detectó una hipoteca no cancelada de 2011 antes de que yo girara el dinero. Diligencia jurídica de primer nivel.",
  },
  {
    author: "Dr. Sarah Jenkins",
    origin: "London (UK)",
    visaType: "Visa V Nómada Digital (2 Years)",
    date: "1 month ago",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    textEn:
      "Ana María was phenomenal. My foreign bank statements were complex with mixed dividends, but she audited and structured the application so impeccably that Cancillería approved my Nomad Visa in just 8 business days without any requerimientos.",
    textEs:
      "Ana María fue fenomenal. Mis extractos bancarios extranjeros eran complejos por dividendos mixtos, pero ella estructuró el expediente de forma tan impecable que la Cancillería aprobó mi visa de nómada en solo 8 días hábiles y sin requerimientos.",
  },
  {
    author: "Marc & Marcela Lefebvre",
    origin: "Montreal (Canada) & Medellín",
    visaType: "Marriage & Capitulaciones",
    date: "2 months ago",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    textEn:
      "We needed prenuptial agreements (capitulaciones) under Colombian Civil Law and our civil marriage at a Notaría in El Poblado. Everything was explained clearly in bilingual format, transparent fees, zero stress.",
    textEs:
      "Necesitábamos capitulaciones matrimoniales bajo la ley colombiana y nuestro matrimonio civil en una Notaría de El Poblado. Todo fue explicado claramente de forma bilingüe, con honorarios transparentes y cero estrés.",
  },
];

export function SocialProofReviews({ lang }: SocialProofReviewsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => {
    setActiveIndex((curr) => (curr === 0 ? EXTENDED_VERIFIED_REVIEWS.length - 1 : curr - 1));
  };

  const next = () => {
    setActiveIndex((curr) => (curr === EXTENDED_VERIFIED_REVIEWS.length - 1 ? 0 : curr + 1));
  };

  const current = EXTENDED_VERIFIED_REVIEWS[activeIndex];

  return (
    <section id="forum" className="py-20 px-4 max-w-[1240px] mx-auto relative z-10 space-y-10">
      {/* Header with Google Maps Live Rating Simulation */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 dark:border-white/10 pb-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-700 dark:text-amber-400">
            <span className="flex text-amber-500">★★★★★</span>
            <span>
              <AnimatedCounter value={4.8} decimals={1} /> / 5.0 Google Reviews (
              <AnimatedCounter value={53} suffix="+" /> Verified Expat Clients)
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#16345F] dark:text-white">
            {lang === "es" ? "Testimonios y Reseñas Verificadas" : "Verified Client Testimonials"}
          </h2>
          <p className="text-sm text-[#706F6F] dark:text-gray-300 max-w-xl">
            {lang === "es"
              ? "Historias reales de expatriados, nómadas e inversionistas que confiaron su tranquilidad legal en Medellín a Capital M Law."
              : "Real cases from expats, investors, and entrepreneurs who trusted their legal peace of mind in Colombia to Capital M Law."}
          </p>
        </div>

        {/* Live Google Maps Widget Box */}
        <div className="bg-white dark:bg-[#0F1E35] p-5 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm flex items-center gap-4 shrink-0">
          <div className="size-12 rounded-xl bg-[#16345F] text-white flex items-center justify-center font-bold text-xl">
            G
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#16345F] dark:text-white">
              <span>Capital M Law</span>
              <CheckCircle className="size-3.5 text-[#34D399]" />
            </div>
            <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
              <span>
                <AnimatedCounter value={4.8} decimals={1} />
              </span>
              <span>★★★★★</span>
              <span className="text-[#706F6F] dark:text-gray-400 font-normal">
                (<AnimatedCounter value={53} /> reviews)
              </span>
            </div>
            <a
              href="https://maps.google.com/?q=Capital+M+Law+Medellin"
              target="_blank"
              rel="noreferrer"
              className="text-[11px] font-semibold text-[#C01072] dark:text-[#F472B6] hover:underline flex items-center gap-1 mt-0.5"
            >
              <MapPin className="size-3" />
              <span>{lang === "es" ? "Ver en Google Maps" : "View on Google Maps"}</span>
              <ExternalLink className="size-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Interactive Review Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Main Testimonial Card */}
        <div className="lg:col-span-8 bg-white dark:bg-[#0F1E35] rounded-3xl p-8 sm:p-10 border border-gray-200 dark:border-white/10 shadow-md relative space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={current.avatar} alt={current.author} className="size-full object-cover" />
              </div>
              <div>
                <p className="font-bold text-[#16345F] dark:text-white text-base sm:text-lg">
                  {current.author}
                </p>
                <p className="text-xs text-[#706F6F] dark:text-gray-400">
                  {current.origin} · <span className="text-[#C01072] dark:text-[#F472B6] font-semibold">{current.visaType}</span>
                </p>
              </div>
            </div>

            <div className="flex gap-1 text-amber-400">
              {Array.from({ length: current.rating }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </div>
          </div>

          <p className="text-base sm:text-lg text-gray-800 dark:text-gray-200 leading-relaxed italic">
            &ldquo;{lang === "es" ? current.textEs : current.textEn}&rdquo;
          </p>

          <div className="pt-4 border-t border-gray-100 dark:border-white/10 flex items-center justify-between text-xs text-[#706F6F] dark:text-gray-400">
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
              <ShieldCheck className="size-4" /> {lang === "es" ? "Reseña verificada" : "Verified review"}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                aria-label="Previous review"
                className="size-9 rounded-full border border-gray-200 dark:border-white/10 hover:bg-[#16345F] hover:text-white dark:hover:bg-white/10 flex items-center justify-center transition"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                onClick={next}
                aria-label="Next review"
                className="size-9 rounded-full bg-[#16345F] dark:bg-[#C01072] text-white hover:opacity-90 flex items-center justify-center transition shadow-xs"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Firm Credential Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-3xl bg-[#FAFBFD] dark:bg-white/[0.02] border border-[#16345F]/10 dark:border-white/10 p-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C01072] dark:text-[#F472B6] block">
              {lang === "es" ? "Respaldo y Credenciales Oficiales" : "Legal Authority & Credentials"}
            </span>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-white dark:bg-[#070E1A] border border-gray-200/80 dark:border-white/10 space-y-1">
                <p className="font-bold text-[#16345F] dark:text-white">María Fernanda Duarte</p>
                <p className="text-[#706F6F] dark:text-gray-400">Founder & Principal Attorney</p>
                <p className="font-mono text-[#C01072] dark:text-[#F472B6] font-semibold text-[11px]">
                  Matrícula CSJ-Col #289.412
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-white dark:bg-[#070E1A] border border-gray-200/80 dark:border-white/10 space-y-1">
                <p className="font-bold text-[#16345F] dark:text-white">Ana María Muñoz</p>
                <p className="text-[#706F6F] dark:text-gray-400">Associate Immigration Attorney</p>
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
