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
  Briefcase,
  FileText,
  UserCheck,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Layers,
  Scale,
  Building2,
  Check,
  AlertTriangle,
  BadgeAlert,
  ArrowRight,
  FileX2,
  FileCheck2,
  Users2,
  ShieldAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const CALENDLY_URL = "https://calendly.com/capital-m-law-";
export const WHATSAPP_URL = "https://wa.me/573146022411";

export function LabourLawPageView() {
  const [lang, setLang] = useState<"en" | "es">("es");
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const CORE_SERVICES = [
    {
      id: "contracts",
      title: {
        en: "Employment Contract Drafting & Structuring",
        es: "Diseño y Redacción de Contratos Laborales",
      },
      tag: { en: "Fixed, Indefinite, Remote", es: "Término Fijo, Indefinido, Remoto" },
      desc: {
        en: "Tailored drafting for fixed-term, indefinite, work-or-service, and remote/telework agreements under the Colombian Substantive Labor Code (CST).",
        es: "Elaboración a medida de contratos a término fijo, indefinido, obra o labor y modalidades de teletrabajo o trabajo remoto conforme al Código Sustantivo del Trabajo.",
      },
      bullets: {
        en: [
          "Trial period clauses & non-compete stipulations",
          "Intellectual property and confidentiality protections",
          "Bilingual versions for foreign tech & remote teams",
        ],
        es: [
          "Períodos de prueba válidos y cláusulas de confidencialidad",
          "Cesión de propiedad intelectual y no divulgación",
          "Versiones bilingües para equipos remotos y empresas extranjeras",
        ],
      },
    },
    {
      id: "contractors",
      title: {
        en: "Independent Contractor Agreements (Mitigating 'Contrato Realidad')",
        es: "Contratos de Prestación de Servicios (CPS) sin Riesgo Laboral",
      },
      tag: { en: "Risk Mitigation", es: "Blindaje Preventivo" },
      desc: {
        en: "Structuring true service contractor relationships to prevent costly labor reclassification claims (Principle of Primacy of Reality over Formalities).",
        es: "Estructuración técnica de contratos de prestación de servicios para prevenir demandas por 'contrato realidad' y cobros retroactivos de prestaciones sociales.",
      },
      bullets: {
        en: [
          "Autonomy protocols and lack of subordination guidelines",
          "Verification of mandatory monthly social security payments (Planilla PILA)",
          "Protection against retroactive severance and penalty claims",
        ],
        es: [
          "Protocolos de autonomía técnica y ausencia de subordinación",
          "Verificación mensual de aportes a seguridad social (Planilla PILA)",
          "Blindaje frente a sanciones moratorias y prestaciones retroactivas",
        ],
      },
    },
    {
      id: "rit-policies",
      title: {
        en: "Internal Work Regulations (RIT) & Workplace Policies",
        es: "Reglamento Interno de Trabajo (RIT) y Políticas",
      },
      tag: { en: "Statutory Compliance", es: "Cumplimiento Legal" },
      desc: {
        en: "Mandatory corporate policies under Colombian law, including telework protocols, digital disconnection, and anti-workplace harassment policies (Law 1010).",
        es: "Estructuración y radicación del RIT exigido por ley, políticas de desconexión laboral, teletrabajo y protocolos contra el acoso laboral (Ley 1010 de 2006).",
      },
      bullets: {
        en: [
          "Custom RIT drafting according to your workforce size",
          "Digital disconnection and working hours tracking policies",
          "Disciplinary committee protocols & employee handbook",
        ],
        es: [
          "Diseño del RIT adaptado al número de colaboradores de tu empresa",
          "Política formal de desconexión laboral y registro de jornada",
          "Protocolos del Comité de Convivencia y manual del empleado",
        ],
      },
    },
    {
      id: "terminations",
      title: {
        en: "Due Process in Terminations & Disciplinary Proceedings",
        es: "Debido Proceso en Despidos y Procesos Disciplinarios",
      },
      tag: { en: "Disciplinary Due Process", es: "Garantías y Descargos" },
      desc: {
        en: "Strict observance of constitutional due process for just-cause terminations, disciplinary summons (diligencias de descargos), and statutory severance calculations.",
        es: "Acompañamiento estricto al debido proceso constitucional en llamados a descargos, cartas de terminación con justa causa y liquidaciones laborales definitivas.",
      },
      bullets: {
        en: [
          "Summons to disciplinary hearings with proper evidentiary support",
          "Termination notices complying with supreme court precedents",
          "Accurate statutory severance & settlement agreements (Liquidación final)",
        ],
        es: [
          "Citación a diligencia de descargos con plenas garantías probatorias",
          "Cartas de despido blindadas conforme a la jurisprudencia de la CSJ",
          "Cálculo exacto de liquidación final de cesantías, primas y vacaciones",
        ],
      },
    },
    {
      id: "audit-ugpp",
      title: {
        en: "Labor Audit & Payroll/UGPP Compliance",
        es: "Auditoría Laboral y Seguridad Social (UGPP)",
      },
      tag: { en: "Fiscal Audit", es: "Auditoría UGPP" },
      desc: {
        en: "Exhaustive review of payroll classifications, non-salary bonuses, and social security payments to eliminate fines from the UGPP pension and paratax authority.",
        es: "Auditoría integral de pagos laborales, pactos de desalarización y aportes al sistema de seguridad social para evitar requerimientos y sanciones de la UGPP.",
      },
      bullets: {
        en: [
          "Review of the 40% non-salary bonus cap under Art. 128 CST",
          "Audit of ARL occupational risk classifications",
          "Preventive responses to UGPP inspection notices",
        ],
        es: [
          "Revisión del límite del 40% en pactos de exclusión salarial (Art. 128 CST)",
          "Auditoría de nivel de riesgo ARL y aportes parafiscales",
          "Defensa y respuestas jurídicas ante requerimientos de información UGPP",
        ],
      },
    },
  ];

  const ROADMAP_STEPS = [
    {
      step: "01",
      title: {
        en: "Initial Assessment",
        es: "Diagnóstico de Necesidades",
      },
      desc: {
        en: "We assess your organizational structure, current team contracts, operational risks, and business model.",
        es: "Analizamos tu estructura organizacional, contratos existentes, riesgos de vinculación y modelo operativo.",
      },
    },
    {
      step: "02",
      title: {
        en: "Contractual Structuring",
        es: "Estructuración Contractual",
      },
      desc: {
        en: "We draft and standardize employment contracts, independent contractor terms, and confidentiality agreements.",
        es: "Redactamos y estandarizamos contratos laborales, contratos de prestación de servicios y acuerdos de confidencialidad.",
      },
    },
    {
      step: "03",
      title: {
        en: "Policy & Regulations Setup (RIT)",
        es: "Implementación de Políticas (RIT)",
      },
      desc: {
        en: "We build and publish Internal Work Regulations, disciplinary manuals, and statutory workplace committees.",
        es: "Implementamos el Reglamento Interno de Trabajo, políticas de desconexión laboral y conformación de comités legales.",
      },
    },
    {
      step: "04",
      title: {
        en: "Ongoing Employment Support",
        es: "Acompañamiento Continuo",
      },
      desc: {
        en: "Permanent counsel for disciplinary hearings, performance management, severance negotiations, and payroll inquiries.",
        es: "Asesoría permanente para descargos, terminaciones laborales, liquidación de prestaciones y consultas del día a día.",
      },
    },
  ];

  const activeStep = ROADMAP_STEPS[activeStepIndex];

  return (
    <div className="space-y-16">
      {/* 1. TOP UTILITY: BREADCRUMB & LANGUAGE SWITCHER */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#706F6F] hover:text-[#16345F] dark:hover:text-white transition"
        >
          <ArrowLeft className="size-4" />
          <span>
            {lang === "en"
              ? "Back to All Services Directory"
              : "Volver al Directorio de Servicios"}
          </span>
        </Link>

        <div className="flex items-center gap-2 bg-white dark:bg-[#070E1A] p-1.5 rounded-2xl border border-[#16345F]/10 dark:border-white/10 shadow-xs">
          <button
            onClick={() => setLang("en")}
            className={cn(
              "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
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
              "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
              lang === "es"
                ? "bg-[#16345F] text-white shadow-xs dark:bg-[#9BB8E0] dark:text-[#0A1526]"
                : "text-[#706F6F] hover:text-[#16345F] dark:hover:text-white"
            )}
          >
            Español
          </button>
        </div>
      </div>

      {/* 2. HERO SECTION */}
      <section className="legal-texture-bg relative overflow-hidden rounded-3xl bg-gradient-to-b from-white to-[#FAFBFD] dark:from-[#0F1E35] dark:to-[#0A1526] p-8 sm:p-12 lg:p-16 border border-[#16345F]/10 dark:border-white/10 shadow-sm">
        <div className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-[#16345F]/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 size-72 rounded-full bg-[#C01072]/10 blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6 text-center flex flex-col items-center">
          <div className="flex flex-wrap justify-center items-center gap-2">
            <span className="rounded-full bg-[#16345F]/10 dark:bg-white/10 text-[#16345F] dark:text-[#9BB8E0] px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
              Labour Law & Employment
            </span>
            <span className="rounded-full bg-[#C01072]/10 dark:bg-[#C01072]/20 px-3 py-1 text-xs font-semibold text-[#C01072] dark:text-[#F472B6]">
              {lang === "en"
                ? "Lead Counsel: Ana María Muñoz & María Fernanda Duarte"
                : "Abogadas Líderes: Ana María Muñoz y María Fernanda Duarte"}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#16345F] dark:text-white leading-[1.1] text-center">
            {lang === "en"
              ? "Strategic Employment Law: Hire Talent in Colombia with Total Legal Confidence"
              : "Gestión laboral estratégica: Contrata talento en Colombia con seguridad jurídica"}
          </h1>

          <p className="text-base sm:text-lg text-[#706F6F] dark:text-gray-300 leading-relaxed max-w-3xl mx-auto text-center">
            {lang === "en"
              ? "Balancing business agility and local labor compliance. Customized employment contracts, RIT, terminations, and statutory severance under Colombian law."
              : "Contratación equilibrada y cumplimiento riguroso de la legislación local. Redacción de contratos blindados, Reglamentos Internos de Trabajo (RIT), liquidaciones y debido proceso disciplinario."}
          </p>

          <div className="pt-4 flex justify-center items-center gap-4 flex-wrap w-full">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#C01072] hover:bg-[#A50E62] text-white font-bold text-sm px-7 py-3.5 rounded-2xl transition shadow-md hover:shadow-lg"
            >
              <Calendar className="size-4" />
              <span>
                {lang === "en"
                  ? "Book Employment Consultation · $67 USD"
                  : "Agendar Asesoría Laboral · $67 USD"}
              </span>
              <ChevronRight className="size-4" />
            </a>

            <a
              href={`${WHATSAPP_URL}?text=${encodeURIComponent(
                lang === "en"
                  ? "Hello Capital M Law, I would like to consult with an employment attorney regarding hiring talent in Colombia."
                  : "Hola Capital M Law, deseo consultar con una abogada sobre contratación de personal y derecho laboral en Colombia."
              )}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-[#16345F]/20 dark:border-white/20 hover:bg-[#16345F]/5 dark:hover:bg-white/5 text-[#16345F] dark:text-white font-semibold text-sm px-5 py-3.5 rounded-2xl transition"
            >
              <MessageCircle className="size-4 text-emerald-600" />
              <span>{lang === "en" ? "Direct WhatsApp Question" : "Consulta Rápida por WhatsApp"}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 3. MAPEO DE SERVICIOS / CORE SERVICES (5 Blocks) */}
      <section className="space-y-8" id="core-services">
        <div className="space-y-2 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#16345F]/5 dark:bg-white/10 px-3 py-1 text-xs font-bold text-[#16345F] dark:text-[#9BB8E0]">
            <Briefcase className="size-3.5" />
            {lang === "en" ? "Practice Areas" : "Mapeo de Servicios"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#16345F] dark:text-white">
            {lang === "en"
              ? "Comprehensive Employment Legal Support"
              : "Servicios Especializados de Derecho Laboral"}
          </h2>
          <p className="text-sm text-[#706F6F] dark:text-gray-300">
            {lang === "en"
              ? "From drafting your first bilingual employment contracts to navigating UGPP payroll audits."
              : "Desde la estructuración de tus primeros contratos bilingües hasta la defensa preventiva ante requerimientos de la UGPP."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CORE_SERVICES.map((srv, idx) => (
            <div
              key={srv.id}
              className={cn(
                "rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0F1E35] p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-4",
                idx === 0 && "lg:col-span-2"
              )}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="size-10 rounded-xl bg-[#16345F]/5 dark:bg-white/10 text-[#16345F] dark:text-[#9BB8E0] flex items-center justify-center font-bold text-xs">
                    0{idx + 1}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#C01072]/10 text-[#C01072] dark:text-[#F472B6] px-2.5 py-1 rounded-full">
                    {srv.tag[lang]}
                  </span>
                </div>

                <h3 className="text-xl font-black text-[#16345F] dark:text-white">
                  {srv.title[lang]}
                </h3>

                <p className="text-xs sm:text-sm text-[#706F6F] dark:text-gray-300 leading-relaxed">
                  {srv.desc[lang]}
                </p>

                <ul className="space-y-1.5 pt-2 border-t border-gray-100 dark:border-white/5 text-xs text-gray-700 dark:text-gray-300">
                  {srv.bullets[lang].map((b, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2">
                      <Check className="size-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#16345F] dark:text-[#9BB8E0] hover:text-[#C01072] transition"
                >
                  <span>{lang === "en" ? "Consult this service" : "Consultar este servicio"}</span>
                  <ChevronRight className="size-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. ROADMAP (4 PASOS) */}
      <section className="space-y-8" id="roadmap">
        <div className="space-y-2 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#16345F]/5 dark:bg-white/10 px-3 py-1 text-xs font-bold text-[#16345F] dark:text-[#9BB8E0]">
            <Clock className="size-3.5" />
            {lang === "en" ? "Workflow Protocol" : "Flujo de Implementación"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#16345F] dark:text-white">
            {lang === "en" ? "Roadmap: 4 Structured Steps" : "Roadmap: 4 Pasos de Blindaje Laboral"}
          </h2>
          <p className="text-sm text-[#706F6F] dark:text-gray-300">
            {lang === "en"
              ? "How Capital M Law aligns your Colombian workforce with zero regulatory friction."
              : "Cómo aseguramos la contratación y gestión de tu talento en Colombia sin contingencias legales."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ROADMAP_STEPS.map((st) => (
            <div
              key={st.step}
              className="rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0F1E35] p-6 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <span className="text-3xl font-black font-mono text-[#16345F] dark:text-[#9BB8E0]">
                  {st.step}
                </span>
                <h3 className="text-lg font-black text-[#16345F] dark:text-white leading-snug">
                  {st.title[lang]}
                </h3>
                <p className="text-xs sm:text-sm text-[#706F6F] dark:text-gray-300 leading-relaxed">
                  {st.desc[lang]}
                </p>
              </div>

              <div className="pt-2 flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="size-3.5" />
                <span>{lang === "en" ? "Executed by Senior Counsel" : "Supervisado por Abogadas"}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. MÓDULO ADICIONAL: DISOLUCIÓN Y LIQUIDACIÓN DE SAS */}
      <section className="rounded-3xl border border-amber-300/40 dark:border-amber-500/20 bg-gradient-to-br from-amber-50/50 via-white to-amber-50/20 dark:from-[#1A1813] dark:via-[#0F1E35] dark:to-[#14120D] p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="pointer-events-none absolute -right-20 -bottom-20 size-72 rounded-full bg-amber-500/10 blur-3xl" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
              <FileX2 className="size-3.5" />
              {lang === "en" ? "Special Corporate Module" : "Módulo Especial Societario"}
            </span>

            <h3 className="text-2xl sm:text-3xl font-black text-[#16345F] dark:text-white">
              {lang === "en"
                ? "Company Dissolution & Liquidation (Closing Inactive SAS)"
                : "Disolución y Liquidación de SAS Inactivas"}
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {lang === "en" ? (
                <>
                  <p>
                    Leaving an inactive Colombian SAS open creates accumulating liabilities: annual commercial registry renewals (Cámara de Comercio), periodic tax filings (DIAN), municipal industry and commerce taxes (ICA), and substantial automatic penalties.
                  </p>
                  <p>
                    We manage the entire voluntary dissolution and liquidation process: drafting shareholder meeting minutes (Acta de Disolución), publishing notices to creditors in official newspapers, settling tax clearances with DIAN, and securing final RUT cancellation.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Dejar una sociedad SAS inactiva en Colombia genera pasivos invisibles: renovación anual de matrícula mercantil en Cámara de Comercio, declaraciones tributarias periódicas ante la DIAN, impuesto de Industria y Comercio (ICA) y severas sanciones automáticas por extemporaneidad.
                  </p>
                  <p>
                    Gestionamos el proceso formal de disolución y liquidación voluntaria: redacción del acta de asamblea de accionistas, avisos públicos a acreedores en prensa, paz y salvos tributarios ante la DIAN y cancelación definitiva del RUT y personería jurídica.
                  </p>
                </>
              )}
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 dark:text-amber-300">
                <Check className="size-3.5" />
                {lang === "en" ? "Zero Future Tax Liability" : "Cero Contingencias Fiscales Futuras"}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 dark:text-amber-300">
                <Check className="size-3.5" />
                {lang === "en" ? "Complete DIAN RUT Deregistration" : "Cancelación Definitiva del RUT"}
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#16345F] hover:bg-[#C01072] text-white font-bold text-xs sm:text-sm py-4 px-6 rounded-2xl transition shadow-md"
            >
              <Calendar className="size-4" />
              <span>
                {lang === "en"
                  ? "Liquidate Inactive SAS Safely · $67 USD"
                  : "Liquida tu SAS inactiva sin multas · $67 USD"}
              </span>
            </a>

            <a
              href={`${WHATSAPP_URL}?text=${encodeURIComponent(
                lang === "en"
                  ? "Hello Capital M Law, I need assistance liquidating and closing an inactive Colombian SAS."
                  : "Hola Capital M Law, necesito asesoría para disolver y liquidar una empresa SAS inactiva en Colombia."
              )}`}
              target="_blank"
              rel="noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-white dark:bg-white/10 hover:bg-gray-100 dark:hover:bg-white/20 text-[#16345F] dark:text-white font-semibold text-xs sm:text-sm py-3 px-6 rounded-2xl transition border border-gray-200 dark:border-white/10"
            >
              <MessageCircle className="size-4 text-emerald-600" />
              <span>{lang === "en" ? "Inquire on WhatsApp" : "Preguntar por WhatsApp"}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 6. CLOSING BANNER */}
      <section className="rounded-3xl bg-gradient-to-r from-[#16345F] via-[#1A3D6E] to-[#16345F] text-white p-8 sm:p-12 lg:p-16 shadow-xl relative overflow-hidden">
        <div className="pointer-events-none absolute -right-20 -bottom-20 size-80 rounded-full bg-[#C01072]/20 blur-3xl" />
        <div className="pointer-events-none absolute left-10 top-0 size-60 rounded-full bg-[#9BB8E0]/10 blur-2xl" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold text-[#9BB8E0]">
            <Sparkles className="size-3.5 text-[#F472B6]" />
            {lang === "en" ? "Corporate Employment Shield" : "Blindaje Laboral Corporativo"}
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            {lang === "en"
              ? "Hire top Colombian talent and operate your business with zero legal surprises."
              : "Contrata el mejor talento en Colombia y opera tu negocio con total seguridad jurídica."}
          </h2>

          <p className="text-sm sm:text-base text-gray-200 leading-relaxed max-w-2xl">
            {lang === "en"
              ? "Book an initial consultation to audit your employment contracts, RIT policies, or contractor agreements with our senior attorneys."
              : "Agenda una sesión estratégica para auditar tus contratos de trabajo, políticas RIT o contratos de prestación de servicios con nuestras abogadas."}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#C01072] hover:bg-[#A50E62] text-white font-bold text-sm px-8 py-4 rounded-2xl transition shadow-lg hover:shadow-xl"
            >
              <Calendar className="size-4" />
              <span>
                {lang === "en"
                  ? "Schedule Strategy Session · $67 USD"
                  : "Reservar Llamada Estratégica · $67 USD"}
              </span>
              <ArrowRight className="size-4" />
            </a>

            <a
              href={`${WHATSAPP_URL}?text=${encodeURIComponent(
                lang === "en"
                  ? "Hello Capital M Law, I would like to schedule a strategy call regarding Colombian labor law."
                  : "Hola Capital M Law, deseo programar una llamada sobre derecho laboral y contratación en Colombia."
              )}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-6 py-4 rounded-2xl transition border border-white/15"
            >
              <MessageCircle className="size-4 text-emerald-400" />
              <span>{lang === "en" ? "WhatsApp Direct" : "WhatsApp Directo"}</span>
            </a>
          </div>

          <p className="text-xs text-[#9BB8E0] pt-2">
            {lang === "en"
              ? "Confidential & Protected under Colombian Attorney-Client Privilege. 100% Bilingual counsel."
              : "Confidencial y amparado bajo el Secreto Profesional del Derecho Colombiano. Asesoría 100% bilingüe."}
          </p>
        </div>
      </section>
    </div>
  );
}
