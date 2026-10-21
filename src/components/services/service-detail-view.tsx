"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  MessageCircle,
  Clock,
  ShieldCheck,
  CheckCircle2,
  FileText,
  UserCheck,
  HelpCircle,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { ServiceDetail } from "@/data/services-catalog";
import { cn } from "@/lib/utils";

interface ServiceDetailViewProps {
  service: ServiceDetail;
}

export function ServiceDetailView({ service }: ServiceDetailViewProps) {
  const [lang, setLang] = useState<"en" | "es">("en");

  return (
    <div className="space-y-16">
      {/* Top Navigation & Language switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#706F6F] hover:text-[#16345F] dark:hover:text-white transition"
        >
          <ArrowLeft className="size-4" />
          <span>{lang === "en" ? "Back to All Services Directory" : "Volver al Directorio de Servicios"}</span>
        </Link>

        <div className="flex items-center gap-2 bg-white dark:bg-[#070E1A] p-1.5 rounded-2xl border border-[#16345F]/10 dark:border-white/10 shadow-xs">
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

      {/* Hero Header */}
      <section className="legal-texture-bg relative overflow-hidden rounded-3xl bg-gradient-to-b from-white to-[#FAFBFD] dark:from-[#0F1E35] dark:to-[#0A1526] p-8 sm:p-12 lg:p-16 border border-[#16345F]/10 dark:border-white/10 shadow-sm">
        <div className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-[#9BB8E0]/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 size-72 rounded-full bg-[#C01072]/10 blur-3xl" />

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#C01072]/10 dark:bg-[#C01072]/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#C01072] dark:text-[#F472B6]">
              {service.shortBadge[lang]}
            </span>
            <span className="rounded-full bg-[#16345F]/5 dark:bg-white/10 px-3 py-1 text-xs font-semibold text-[#16345F] dark:text-gray-200">
              {lang === "en" ? "Lead Counsel: " : "Abogada Líder: "}
              {service.leadAttorney}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#16345F] dark:text-white leading-[1.1]">
            {service.heroHeadline[lang]}
          </h1>

          <p className="text-base sm:text-lg text-[#706F6F] dark:text-gray-300 leading-relaxed max-w-3xl">
            {service.heroSubtitle[lang]}
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[#16345F]/10 dark:border-white/10">
            <div className="flex items-center gap-3">
              <span className="size-10 rounded-xl bg-[#16345F]/5 dark:bg-white/5 flex items-center justify-center text-[#16345F] dark:text-[#9BB8E0]">
                <Clock className="size-5" />
              </span>
              <div>
                <p className="text-[11px] font-bold uppercase text-[#706F6F] dark:text-gray-400">
                  {lang === "en" ? "Estimated Timeline" : "Tiempo Estimado"}
                </p>
                <p className="text-sm font-bold text-[#16345F] dark:text-white">
                  {service.estimatedTimeline[lang]}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="size-10 rounded-xl bg-[#C01072]/10 flex items-center justify-center text-[#C01072]">
                <Calendar className="size-5" />
              </span>
              <div>
                <p className="text-[11px] font-bold uppercase text-[#706F6F] dark:text-gray-400">
                  {lang === "en" ? "Dedicated Assessment" : "Evaluación Inicial"}
                </p>
                <p className="text-sm font-bold text-[#C01072] dark:text-[#F472B6]">
                  {service.consultationFee} (45 min)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="size-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600">
                <ShieldCheck className="size-5" />
              </span>
              <div>
                <p className="text-[11px] font-bold uppercase text-[#706F6F] dark:text-gray-400">
                  {lang === "en" ? "Attorney-Client Privilege" : "Secreto Profesional"}
                </p>
                <p className="text-sm font-bold text-[#16345F] dark:text-white">
                  100% Confidential
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout: Requirements + Process */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Requirements & Process (8 cols) */}
        <div className="lg:col-span-8 space-y-16">
          {/* SECTION 1: REQUIREMENTS & DOCUMENTATION */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="size-10 rounded-xl bg-[#C01072]/10 text-[#C01072] flex items-center justify-center">
                <FileText className="size-5" />
              </span>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#16345F] dark:text-white">
                  {lang === "en" ? "Requirements & Required Documentation" : "Requisitos y Documentación Exigida"}
                </h2>
                <p className="text-xs sm:text-sm text-[#706F6F] dark:text-gray-400">
                  {lang === "en"
                    ? "What our legal department will audit and prepare before filing your case."
                    : "Documentos esenciales que auditamos y consolidamos previo a radicar."}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {service.requirements[lang].map((req, rIdx) => (
                <div
                  key={rIdx}
                  className="rounded-2xl border border-[#16345F]/10 dark:border-white/10 bg-white dark:bg-[#0F1E35] p-5 sm:p-6 shadow-xs flex items-start gap-4"
                >
                  <span className="size-7 rounded-full bg-[#16345F]/5 dark:bg-white/10 flex items-center justify-center text-[#16345F] dark:text-[#9BB8E0] shrink-0 font-bold text-xs mt-0.5">
                    {rIdx + 1}
                  </span>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-[#16345F] dark:text-white">
                      {req.title}
                    </h3>
                    <p className="text-sm text-[#706F6F] dark:text-gray-300 leading-relaxed">
                      {req.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 2: STEP BY STEP PROCESS */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="size-10 rounded-xl bg-[#16345F]/5 dark:bg-white/5 text-[#16345F] dark:text-[#9BB8E0] flex items-center justify-center">
                <ShieldCheck className="size-5" />
              </span>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#16345F] dark:text-white">
                  {lang === "en" ? "How We Work: Step-by-Step Legal Process" : "Cómo Trabajamos: Proceso Paso a Paso"}
                </h2>
                <p className="text-xs sm:text-sm text-[#706F6F] dark:text-gray-400">
                  {lang === "en"
                    ? "From initial document audit to final governmental approval."
                    : "Desde la auditoría inicial hasta la entrega del resultado final."}
                </p>
              </div>
            </div>

            <div className="relative pl-6 sm:pl-8 border-l-2 border-[#16345F]/10 dark:border-white/10 space-y-10">
              {service.stepByStepProcess[lang].map((step, sIdx) => (
                <div key={sIdx} className="relative space-y-3">
                  {/* Step Marker */}
                  <span className="absolute -left-[35px] sm:-left-[43px] top-0 size-8 rounded-full bg-[#16345F] dark:bg-[#9BB8E0] text-white dark:text-[#0A1526] font-bold text-xs flex items-center justify-center shadow-xs">
                    {step.stepNumber}
                  </span>

                  <h3 className="text-lg sm:text-xl font-bold text-[#16345F] dark:text-white">
                    {step.title}
                  </h3>

                  <p className="text-sm text-[#706F6F] dark:text-gray-300 leading-relaxed">
                    {step.description}
                  </p>

                  <div className="inline-flex items-center gap-2 rounded-xl bg-[#FAFBFD] dark:bg-white/[0.03] px-3.5 py-2 border border-[#16345F]/5 dark:border-white/5 text-xs">
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold text-[#16345F] dark:text-white">
                      {lang === "en" ? "Firm Deliverable: " : "Entregable de la Firma: "}
                    </span>
                    <span className="text-[#706F6F] dark:text-gray-300">{step.firmDeliverable}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 3: FAQ */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="size-10 rounded-xl bg-[#9BB8E0]/20 text-[#16345F] dark:text-[#9BB8E0] flex items-center justify-center">
                <HelpCircle className="size-5" />
              </span>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#16345F] dark:text-white">
                  {lang === "en" ? "Frequently Asked Questions" : "Preguntas Frecuentes"}
                </h2>
                <p className="text-xs sm:text-sm text-[#706F6F] dark:text-gray-400">
                  {lang === "en" ? "Key legal aspects you should know." : "Aspectos clave que debes conocer."}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {service.faq[lang].map((item, fIdx) => (
                <div
                  key={fIdx}
                  className="rounded-2xl border border-[#16345F]/10 dark:border-white/10 bg-white dark:bg-[#0F1E35] p-6 shadow-xs space-y-2"
                >
                  <h3 className="text-base font-bold text-[#16345F] dark:text-white">
                    {item.question}
                  </h3>
                  <p className="text-sm text-[#706F6F] dark:text-gray-300 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Sticky Sidebar: Contextual Booking Card (4 cols) */}
        <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
          <div className="rounded-3xl border border-[#16345F]/15 dark:border-white/15 bg-white dark:bg-[#0F1E35] p-6 sm:p-8 shadow-xl space-y-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#C01072]/10 px-3 py-1 text-xs font-bold text-[#C01072] dark:text-[#F472B6]">
                <Sparkles className="size-3.5" />
                {lang === "en" ? "Targeted Case Intake" : "Evaluación Especializada"}
              </span>
              <h3 className="text-2xl font-black text-[#16345F] dark:text-white">
                {lang === "en" ? "Book Case Assessment" : "Agendar Consulta de Caso"}
              </h3>
              <p className="text-xs text-[#706F6F] dark:text-gray-400 leading-relaxed">
                {lang === "en"
                  ? `Structured 45-minute consultation specifically focused on ${service.name.en}.`
                  : `Sesión estructurada de 45 minutos enfocada 100% en ${service.name.es}.`}
              </p>
            </div>

            <div className="rounded-2xl bg-[#FAFBFD] dark:bg-white/[0.02] p-4 border border-[#16345F]/5 dark:border-white/5 space-y-2 text-xs">
              <div className="flex justify-between items-center text-[#16345F] dark:text-gray-200">
                <span>{lang === "en" ? "Session Fee:" : "Valor de Consulta:"}</span>
                <span className="font-extrabold text-base text-[#C01072] dark:text-[#F472B6]">
                  {service.consultationFee}
                </span>
              </div>
              <div className="flex justify-between items-center text-[#16345F] dark:text-gray-200">
                <span>{lang === "en" ? "Duration:" : "Duración:"}</span>
                <span className="font-semibold">45 {lang === "en" ? "Minutes" : "Minutos"}</span>
              </div>
              <div className="flex justify-between items-center text-[#16345F] dark:text-gray-200">
                <span>{lang === "en" ? "Format:" : "Modalidad:"}</span>
                <span className="font-semibold">Google Meet / In-Office (Medellín)</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3">
              <Link
                href="/#consultation"
                className="w-full rounded-2xl bg-[#C01072] hover:bg-[#A50E62] text-white p-4 font-bold text-sm shadow-md transition flex items-center justify-center gap-2 group"
              >
                <Calendar className="size-4" />
                <span>
                  {lang === "en"
                    ? `Schedule Assessment · ${service.consultationFee}`
                    : `Agendar Asesoría · ${service.consultationFee}`}
                </span>
                <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href={`https://wa.me/573146022411?text=Hi%20Capital%20M!%20I'd%20like%20to%20inquire%20about%20your%20service:%20${encodeURIComponent(
                  service.name.en
                )}.`}
                target="_blank"
                rel="noreferrer"
                className="w-full rounded-2xl border border-[#16345F]/15 dark:border-white/15 hover:bg-[#16345F]/5 dark:hover:bg-white/5 text-[#16345F] dark:text-white p-3.5 font-semibold text-xs transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="size-4 text-emerald-600" />
                <span>{lang === "en" ? "Quick Question on WhatsApp" : "Pregunta Rápida por WhatsApp"}</span>
              </a>
            </div>

            <p className="text-[11px] text-center text-[#706F6F] dark:text-gray-400">
              {lang === "en"
                ? "Protected under Colombian Attorney-Client Privilege. 100% Bilingual counsel."
                : "Amparado bajo el Secreto Profesional. Asesoría 100% bilingüe."}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
