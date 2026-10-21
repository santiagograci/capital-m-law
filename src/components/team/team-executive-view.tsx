"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Languages,
  Calendar,
  MessageCircle,
  Award,
  BookOpen,
  Briefcase,
  ChevronDown,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Quote,
  CheckCircle2,
} from "lucide-react";
import { ATTORNEYS, AttorneyBio } from "@/data/team-data";
import { cn } from "@/lib/utils";

export function TeamExecutiveView() {
  const [lang, setLang] = useState<"en" | "es">("en");
  const [expandedAttorney, setExpandedAttorney] = useState<string | null>(
    ATTORNEYS[0].id
  );

  return (
    <div className="space-y-16">
      {/* Header & Language Switcher */}
      <section className="legal-texture-bg relative overflow-hidden rounded-3xl bg-gradient-to-b from-white to-[#FAFBFD] dark:from-[#0F1E35] dark:to-[#0A1526] p-8 sm:p-12 lg:p-16 border border-[#16345F]/10 dark:border-white/10 shadow-sm">
        <div className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-[#9BB8E0]/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 size-72 rounded-full bg-[#C01072]/10 blur-3xl" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#C01072]/20 bg-[#C01072]/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#C01072] dark:border-[#F472B6]/30 dark:bg-white/5 dark:text-[#F472B6]">
              <ShieldCheck className="size-4" />
              {lang === "en" ? "Licensed Colombian Legal Counsel" : "Abogadas Tituladas en Colombia"}
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#16345F] dark:text-white leading-[1.1]">
              {lang === "en" ? (
                <>
                  Meet Our Legal Team in{" "}
                  <span className="text-[#C01072] dark:text-[#F472B6]">Medellín</span>.
                </>
              ) : (
                <>
                  Conoce a Nuestro Equipo en{" "}
                  <span className="text-[#C01072] dark:text-[#F472B6]">Medellín</span>.
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-[#706F6F] dark:text-gray-300 leading-relaxed max-w-2xl">
              {lang === "en"
                ? "Dedicated bilingual attorneys combining technical rigor before Colombian ministries with transparent, client-first advocacy for expats, foreign founders, and global families."
                : "Abogadas bilingües con amplia experiencia técnica ante ministerios, notarías y consulados colombianos. Comunicación transparente, rigurosa y directa."}
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

      {/* Attorney Profiles */}
      <div className="space-y-12">
        {ATTORNEYS.map((attorney, idx) => {
          const isExpanded = expandedAttorney === attorney.id;

          return (
            <article
              key={attorney.id}
              id={attorney.slug}
              className="bg-white dark:bg-[#0F1E35] rounded-3xl border border-[#16345F]/10 dark:border-white/10 shadow-sm overflow-hidden transition-all duration-300"
            >
              {/* Executive Bio Card */}
              <div className="p-8 sm:p-10 lg:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  {/* Portrait Column */}
                  <div className="lg:col-span-4 space-y-6">
                    <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden shadow-md group">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={attorney.image}
                        alt={attorney.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#16345F]/80 via-transparent to-transparent opacity-60" />

                      <div className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-[#0A1526]/90 backdrop-blur rounded-2xl p-3 shadow-xs border border-white/20">
                        <p className="text-xs font-bold text-[#16345F] dark:text-white flex items-center gap-1.5">
                          <Award className="size-3.5 text-[#C01072]" />
                          {attorney.barRegistration}
                        </p>
                        <p className="text-[11px] text-[#706F6F] dark:text-gray-400">
                          {attorney.credentials[lang]}
                        </p>
                      </div>
                    </div>

                    {/* Quick Metadata Card */}
                    <div className="rounded-2xl bg-[#FAFBFD] dark:bg-white/[0.03] p-5 border border-[#16345F]/5 dark:border-white/5 space-y-3">
                      <div className="flex items-center gap-2.5 text-xs text-[#16345F] dark:text-gray-200">
                        <Languages className="size-4 text-[#C01072] shrink-0" />
                        <span className="font-semibold">{attorney.languages[lang]}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs text-[#16345F] dark:text-gray-200">
                        <Briefcase className="size-4 text-[#9BB8E0] shrink-0" />
                        <span>
                          {attorney.experienceYears}+{" "}
                          {lang === "en" ? "Years Private Legal Practice" : "Años de Ejercicio Profesional"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs text-[#16345F] dark:text-gray-200">
                        <Calendar className="size-4 text-[#C01072] shrink-0" />
                        <span>
                          {lang === "en" ? "Initial Assessment:" : "Consulta Inicial:"}{" "}
                          <strong className="text-[#C01072] dark:text-[#F472B6]">
                            {attorney.consultationFee}
                          </strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Biography & Strategic Pillars Column */}
                  <div className="lg:col-span-8 space-y-6">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="rounded-full bg-[#16345F]/5 dark:bg-white/10 px-3 py-1 text-xs font-semibold text-[#16345F] dark:text-[#9BB8E0]">
                          {attorney.role[lang]}
                        </span>
                        <span className="rounded-full bg-[#C01072]/10 dark:bg-[#C01072]/20 px-3 py-1 text-xs font-semibold text-[#C01072] dark:text-[#F472B6]">
                          {attorney.titleTag[lang]}
                        </span>
                      </div>

                      <h2 className="text-3xl sm:text-4xl font-extrabold text-[#16345F] dark:text-white">
                        {attorney.name}
                      </h2>
                      <p className="mt-2 text-base font-medium text-[#706F6F] dark:text-gray-300">
                        {attorney.summary[lang]}
                      </p>
                    </div>

                    {/* Quote */}
                    <div className="rounded-2xl border-l-4 border-[#C01072] bg-[#FAFBFD] dark:bg-white/[0.02] p-5 text-sm sm:text-base italic text-[#16345F] dark:text-gray-200 flex gap-3">
                      <Quote className="size-6 text-[#C01072]/40 shrink-0" />
                      <p className="leading-relaxed">{attorney.quote[lang]}</p>
                    </div>

                    {/* Extended Paragraphs */}
                    <div className="space-y-4 text-sm sm:text-[15px] leading-relaxed text-[#706F6F] dark:text-gray-300">
                      {attorney.fullBio[lang].map((paragraph, pIdx) => (
                        <p key={pIdx}>{paragraph}</p>
                      ))}
                    </div>

                    {/* Core Pillars Grid */}
                    <div className="pt-2">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#16345F] dark:text-white mb-3">
                        {lang === "en" ? "Core Strategic Pillars" : "Pilares Estratégicos"}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                        {attorney.pillars[lang].map((pillar, pilIdx) => (
                          <div
                            key={pilIdx}
                            className="rounded-2xl border border-[#16345F]/8 dark:border-white/10 p-4 bg-[#FAFBFD]/60 dark:bg-white/[0.01]"
                          >
                            <p className="text-sm font-bold text-[#16345F] dark:text-white">
                              {pillar.title}
                            </p>
                            <p className="text-xs text-[#706F6F] dark:text-gray-400 mt-1 leading-snug">
                              {pillar.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Education */}
                    <div className="pt-2">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#16345F] dark:text-white mb-2 flex items-center gap-1.5">
                        <GraduationCap className="size-4 text-[#16345F] dark:text-[#9BB8E0]" />
                        {lang === "en" ? "Academic Credentials" : "Formación Académica"}
                      </h3>
                      <ul className="space-y-1.5 text-xs text-[#706F6F] dark:text-gray-300">
                        {attorney.education[lang].map((edu, eIdx) => (
                          <li key={eIdx} className="flex items-center gap-2">
                            <span className="size-1.5 rounded-full bg-[#C01072]" />
                            {edu}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Practice Areas Collapsible Toggle */}
                <div className="mt-8 pt-6 border-t border-[#16345F]/10 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedAttorney(isExpanded ? null : attorney.id)
                    }
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#16345F] dark:text-white hover:text-[#C01072] dark:hover:text-[#F472B6] transition-colors"
                  >
                    <span>
                      {isExpanded
                        ? lang === "en"
                          ? "Hide Detailed Practice Areas"
                          : "Ocultar Áreas de Práctica Detalladas"
                        : lang === "en"
                        ? "View Detailed Practice Areas & Services"
                        : "Ver Áreas de Práctica y Servicios Detallados"}
                    </span>
                    <ChevronDown
                      className={cn(
                        "size-4 transition-transform duration-200",
                        isExpanded && "rotate-180"
                      )}
                    />
                  </button>

                  {/* Contextual CTA for this attorney */}
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={`https://wa.me/573146022411?text=Hi%20Capital%20M!%20I'd%20like%20to%20schedule%20a%20consultation%20with%20${encodeURIComponent(
                        attorney.name
                      )}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-[#16345F]/15 dark:border-white/15 px-4 py-2.5 text-xs font-semibold text-[#16345F] dark:text-white hover:bg-[#16345F]/5 dark:hover:bg-white/5 transition"
                    >
                      <MessageCircle className="size-3.5 text-emerald-600" />
                      <span>WhatsApp Direct</span>
                    </a>

                    <Link
                      href={`/#consultation`}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#C01072] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#A50E62] transition"
                    >
                      <Calendar className="size-3.5" />
                      <span>
                        {lang === "en"
                          ? `Book Consultation with ${attorney.name.split(" ")[0]} · $67`
                          : `Agendar Consulta con ${attorney.name.split(" ")[0]} · $67`}
                      </span>
                    </Link>
                  </div>
                </div>

                {/* Expanded Practice Areas Grid */}
                {isExpanded && (
                  <div className="mt-8 pt-8 border-t border-dashed border-[#9BB8E0]/40 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
                    {attorney.practiceAreas[lang].map((area, aIdx) => (
                      <div
                        key={aIdx}
                        className="rounded-2xl bg-[#FAFBFD] dark:bg-white/[0.02] p-5 border border-[#16345F]/5 dark:border-white/5 space-y-3"
                      >
                        <h4 className="text-sm font-bold text-[#16345F] dark:text-white flex items-center gap-2">
                          <CheckCircle2 className="size-4 text-[#C01072] shrink-0" />
                          {area.title}
                        </h4>
                        <ul className="space-y-2 text-xs text-[#706F6F] dark:text-gray-300">
                          {area.items.map((item, iIdx) => (
                            <li key={iIdx} className="leading-snug">
                              • {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Global Bottom CTA */}
      <section className="legal-texture-bg relative overflow-hidden rounded-3xl bg-[#16345F] p-8 sm:p-12 text-white">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-xl space-y-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-[#9BB8E0]">
              <Sparkles className="size-3.5" />
              {lang === "en" ? "Straightforward Legal Roadmap" : "Claridad Jurídica Inmediata"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
              {lang === "en"
                ? "Not sure which pathway is right for your case in Colombia?"
                : "¿No estás seguro de cuál es el camino jurídico idóneo para tu caso?"}
            </h2>
            <p className="text-sm text-[#9BB8E0] leading-relaxed">
              {lang === "en"
                ? "In our 45-minute structured intake consultation, we evaluate your timeline, review your documents, and define a precise action plan."
                : "En nuestra consulta estructurada de 45 minutos analizamos tus documentos, evaluamos antecedentes y te entregamos una hoja de ruta con costos y plazos exactos."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/#consultation"
              className="rounded-2xl bg-[#C01072] px-6 py-3.5 text-sm font-bold text-white shadow-lg hover:bg-[#A50E62] transition inline-flex items-center gap-2"
            >
              <Calendar className="size-4" />
              <span>{lang === "en" ? "Schedule Consultation · $67 USD" : "Agendar Consulta · $67 USD"}</span>
            </Link>

            <Link
              href="/blog"
              className="rounded-2xl border border-white/20 px-5 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition inline-flex items-center gap-2"
            >
              <BookOpen className="size-4" />
              <span>{lang === "en" ? "Read Legal Insights" : "Leer Artículos del Blog"}</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
