"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Plane,
  Building2,
  Heart,
  Landmark,
  ArrowRight,
  ShieldCheck,
  Clock,
  UserCheck,
  ChevronRight,
  Sparkles,
  Calendar,
  MessageCircle,
} from "lucide-react";
import { SERVICES_CATALOG, ServiceDetail } from "@/data/services-catalog";
import { cn } from "@/lib/utils";

const ICONS = {
  visas: Plane,
  "real-estate": Building2,
  marriage: Heart,
  sas: Landmark,
};

export function ServicesDirectoryView() {
  const [lang, setLang] = useState<"en" | "es">("en");

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="legal-texture-bg relative overflow-hidden rounded-3xl bg-gradient-to-b from-white to-[#FAFBFD] dark:from-[#0F1E35] dark:to-[#0A1526] p-8 sm:p-12 lg:p-16 border border-[#16345F]/10 dark:border-white/10 shadow-sm">
        <div className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-[#9BB8E0]/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 size-72 rounded-full bg-[#C01072]/10 blur-3xl" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#C01072]/20 bg-[#C01072]/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#C01072] dark:border-[#F472B6]/30 dark:bg-white/5 dark:text-[#F472B6]">
              <ShieldCheck className="size-4" />
              {lang === "en" ? "Boutique Legal Practice in Medellín" : "Práctica Legal Especializada en Medellín"}
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#16345F] dark:text-white leading-[1.1]">
              {lang === "en" ? (
                <>
                  Clear Legal Solutions for{" "}
                  <span className="text-[#C01072] dark:text-[#F472B6]">Every Milestone</span> in Colombia.
                </>
              ) : (
                <>
                  Seguridad Jurídica para{" "}
                  <span className="text-[#C01072] dark:text-[#F472B6]">Cada Etapa</span> en Colombia.
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-[#706F6F] dark:text-gray-300 leading-relaxed max-w-2xl">
              {lang === "en"
                ? "Explore our complete practice directory. Each service includes upfront legal roadmaps, transparent pricing, verified checklists, and direct attorney representation."
                : "Explora nuestro directorio completo de servicios. Cada área cuenta con procesos paso a paso, requisitos claros, tarifas definidas y representación directa de nuestras abogadas."}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto bg-white dark:bg-[#070E1A] p-1.5 rounded-2xl border border-[#16345F]/10 dark:border-white/10 shadow-xs">
            <button
              onClick={() => setLang("en")}
              className={cn(
                "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all",
                lang === "en"
                  ? "bg-[#16345F] text-white shadow-xs dark:bg-[#9BB8E0] dark:text-[#0A1526]"
                  : "text-[#706F6F] hover:text-[#16345F] dark:hover:text-white"
              )}
            >
              English
            </button>
            <button
              onClick={() => setLang("es")}
              className={cn(
                "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all",
                lang === "es"
                  ? "bg-[#16345F] text-white shadow-xs dark:bg-[#9BB8E0] dark:text-[#0A1526]"
                  : "text-[#706F6F] hover:text-[#16345F] dark:hover:text-white"
              )}
            >
              Español
            </button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SERVICES_CATALOG.map((service) => {
          const Icon = ICONS[service.category] || ShieldCheck;

          return (
            <article
              key={service.id}
              className="group bg-white dark:bg-[#0F1E35] rounded-3xl border border-[#16345F]/10 dark:border-white/10 shadow-sm hover:shadow-xl hover:border-[#9BB8E0] dark:hover:border-[#9BB8E0]/40 transition-all duration-300 flex flex-col justify-between p-8 sm:p-10 space-y-8"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="size-14 rounded-2xl bg-[#16345F]/5 dark:bg-white/5 flex items-center justify-center text-[#16345F] dark:text-[#9BB8E0] group-hover:bg-[#C01072] group-hover:text-white transition-colors duration-300">
                    <Icon className="size-7" />
                  </div>
                  <span className="rounded-full bg-[#16345F]/5 dark:bg-white/10 px-3 py-1 text-xs font-semibold text-[#16345F] dark:text-[#9BB8E0]">
                    {service.shortBadge[lang]}
                  </span>
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#16345F] dark:text-white group-hover:text-[#C01072] dark:group-hover:text-[#F472B6] transition-colors">
                    <Link href={`/services/${service.slug}`} className="after:absolute after:inset-0 after:content-['']">
                      {service.name[lang]}
                    </Link>
                  </h2>
                  <p className="text-sm font-medium text-[#706F6F] dark:text-gray-300 leading-relaxed">
                    {service.heroSubtitle[lang]}
                  </p>
                </div>

                {/* Key Highlights list */}
                <ul className="space-y-2 pt-2 border-t border-[#16345F]/5 dark:border-white/5">
                  {service.keyHighlights[lang].slice(0, 3).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-[#706F6F] dark:text-gray-300">
                      <span className="text-[#C01072] font-bold mt-0.5">•</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Metadata */}
                <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-[#16345F] dark:text-gray-300">
                  <div className="rounded-xl bg-[#FAFBFD] dark:bg-white/[0.02] p-3 border border-[#16345F]/5 dark:border-white/5">
                    <span className="block text-[10px] uppercase font-bold text-[#706F6F] dark:text-gray-400">
                      {lang === "en" ? "Est. Timeline" : "Tiempo Estimado"}
                    </span>
                    <span className="font-semibold text-[#16345F] dark:text-white flex items-center gap-1 mt-0.5">
                      <Clock className="size-3 text-[#9BB8E0]" />
                      {service.estimatedTimeline[lang]}
                    </span>
                  </div>

                  <div className="rounded-xl bg-[#FAFBFD] dark:bg-white/[0.02] p-3 border border-[#16345F]/5 dark:border-white/5">
                    <span className="block text-[10px] uppercase font-bold text-[#706F6F] dark:text-gray-400">
                      {lang === "en" ? "Intake Session" : "Sesión de Consulta"}
                    </span>
                    <span className="font-bold text-[#C01072] dark:text-[#F472B6] flex items-center gap-1 mt-0.5">
                      <Calendar className="size-3" />
                      {service.consultationFee}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons (relocate z-index so links work) */}
              <div className="relative z-10 pt-4 border-t border-[#16345F]/10 dark:border-white/10 flex items-center justify-between gap-4">
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-bold text-[#16345F] dark:text-white group-hover:text-[#C01072] dark:group-hover:text-[#F472B6] transition-colors"
                >
                  <span>{lang === "en" ? "View Full Requirements & Process" : "Ver Requisitos y Proceso Paso a Paso"}</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <a
                  href="https://calendly.com/capital-m-law-"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-[#C01072] hover:bg-[#A50E62] text-white px-4 py-2 text-xs font-bold transition shadow-xs"
                >
                  {lang === "en" ? "Book · $67" : "Agendar · $67"}
                </a>
              </div>
            </article>
          );
        })}
      </div>

      {/* Global Consultation Banner */}
      <section className="legal-texture-bg relative overflow-hidden rounded-3xl bg-[#16345F] p-8 sm:p-12 text-white">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-xl space-y-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-[#9BB8E0]">
              <Sparkles className="size-3.5" />
              {lang === "en" ? "Confidential Legal Advice" : "Asesoría Legal Personalizada"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
              {lang === "en"
                ? "Need tailored guidance on multiple legal matters?"
                : "¿Necesitas asesoría combinada en varias áreas legales?"}
            </h2>
            <p className="text-sm text-[#9BB8E0] leading-relaxed">
              {lang === "en"
                ? "We regularly assist clients structuring real estate investments coupled with investor visa pathways, or forming SAS companies with employment compliance."
                : "Estructuramos de forma integrada compras inmobiliarias con visas de inversionista, o creación de empresas SAS con blindaje laboral."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://calendly.com/capital-m-law-"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-[#C01072] px-6 py-3.5 text-sm font-bold text-white shadow-lg hover:bg-[#A50E62] transition inline-flex items-center gap-2"
            >
              <Calendar className="size-4" />
              <span>{lang === "en" ? "Book Comprehensive Consultation · $67" : "Agendar Consulta Integral · $67"}</span>
            </a>

            <a
              href="https://wa.me/573146022411?text=Hello%20Capital%20M%20Law!%20I'd%20like%20to%20inquire%20about%20your%20legal%20services."
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-white/20 px-5 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition inline-flex items-center gap-2"
            >
              <MessageCircle className="size-4" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
