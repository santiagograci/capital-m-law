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
  Building2,
  KeyRound,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Check,
  Scale,
  Sparkles,
  Layers,
  Landmark,
  FileCheck2,
  AlertCircle,
  UserCheck,
  Coins,
  BadgeAlert,
  Home,
  ShieldAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const CALENDLY_URL = "https://calendly.com/capital-m-law-";
export const WHATSAPP_URL = "https://wa.me/573146022411";

interface RoadmapStep {
  step: string;
  name: { en: string; es: string };
  subtitle: { en: string; es: string };
  description: { en: string; es: string };
  deliverables: { en: string[]; es: string[] };
}

const ROADMAP_STEPS: RoadmapStep[] = [
  {
    step: "01",
    name: {
      en: "Due Diligence & Title Search",
      es: "Due Diligence & Estudio de Títulos",
    },
    subtitle: {
      en: "Title & Seller Background Audit",
      es: "Estudio de Títulos y Antecedentes",
    },
    description: {
      en: "Comprehensive legal assessment of the property and background verification of sellers, agents, power-of-attorney holders, and entities. We ensure the property is free of mortgages, liens, lawsuits, or ownership disputes.",
      es: "Evaluación legal completa del inmueble y verificación de antecedentes de vendedores, apoderados y agentes inmobiliarios. Garantizamos que la propiedad esté libre de embargos, hipotecas, pleitos judiciales o limitaciones al dominio.",
    },
    deliverables: {
      en: [
        "10-to-20-year chain of title written audit",
        "Screening of sellers & agents against international/Colombian restrictive lists",
        "Verification of active mortgages, liens, and municipal tax solvency",
      ],
      es: [
        "Concepto jurídico escrito sobre el estudio de títulos de los últimos 10 a 20 años",
        "Verificación en listas restrictivas y antecedentes de vendedores y apoderados",
        "Constatación de gravámenes, hipotecas, embargos y paz y salvo municipal",
      ],
    },
  },
  {
    step: "02",
    name: {
      en: "Promissory Purchase Agreement",
      es: "Redacción y Representación en la Promesa de Compraventa",
    },
    subtitle: {
      en: "Drafting & Terms Protection",
      es: "Contrato e Intereses Protegidos",
    },
    description: {
      en: "Drafting, reviewing, and negotiating the contractual terms to protect your deposit, set clear payment milestones, define penalty clauses, and establish firm delivery dates.",
      es: "Elaboración y revisión detallada de la promesa de compraventa para proteger tus intereses, pactar condiciones de pago claras, establecer cláusulas penales justas y fijar fechas de entrega seguras.",
    },
    deliverables: {
      en: [
        "Tailored Promissory Agreement protecting foreign buyer capital",
        "Staggered payment terms tied to verified milestones",
        "Fair breach penalty clauses & inventory handover protocol",
      ],
      es: [
        "Contrato de promesa de compraventa blindado con condiciones a favor del comprador",
        "Hitos de desembolso escalonados vinculados a entregables y paz y salvos",
        "Cláusulas penales equilibradas y protocolo detallado de entrega física",
      ],
    },
  },
  {
    step: "03",
    name: {
      en: "Monetization & Foreign Exchange Registration",
      es: "Monetización y Registro Cambiario de Fondos",
    },
    subtitle: {
      en: "Banco de la República Monetization Report",
      es: "Registro cambiario Banco de la República",
    },
    description: {
      en: "Guidance on international wire transfers to Colombia in full compliance with central bank regulations (Banco de la República), ensuring your investment is properly registered for tax and future investor visa purposes.",
      es: "Asesoría en el giro internacional de recursos y cumplimiento estricto de la regulación cambiaria mediante los formularios y reportes requeridos ante el Banco de la República (fundamental si buscas calificar a una visa de inversión).",
    },
    deliverables: {
      en: [
        "Central Bank Form 4 (Foreign Direct Investment) registration filing",
        "Bank intermediary coordination for optimal exchange rate monetization",
        "Official certification of FDI for immigration and tax authorities",
      ],
      es: [
        "Radicación y legalización del Formulario cambiario (Declaración de Cambio / IED)",
        "Coordinación con mesa de dinero bancaria para giro y monetización eficiente",
        "Certificación oficial de inversión extranjera para Cancillería y DIAN",
      ],
    },
  },
  {
    step: "04",
    name: {
      en: "Deed Signing & Closing Support",
      es: "Firma de Escritura y Asistencia en el Cierre",
    },
    subtitle: {
      en: "Notary Signing & Registration",
      es: "Firma en Notaría y Tradición",
    },
    description: {
      en: "In-person accompaniment or power-of-attorney representation at the notary public for the execution of the Public Deed (Escritura Pública), final tax clearance verification, and confirmation of registration with the Public Registry Office.",
      es: "Acompañamiento presencial o mediante apoderamiento para la firma de la Escritura Pública en notaría, revisión final del paz y salvo municipal, y verificación de la inscripción final en la Oficina de Registro de Instrumentos Públicos.",
    },
    deliverables: {
      en: [
        "In-person notary accompaniment or special power-of-attorney closing representation",
        "Final verification of municipal tax clearance (Paz y Salvo Predial / Valorización)",
        "Post-closing monitoring until official Title Deed registration is complete",
      ],
      es: [
        "Acompañamiento físico en notaría o representación mediante poder especial",
        "Revisión y retención de paz y salvo de predial, valorización y administración",
        "Seguimiento hasta la inscripción definitiva en la Oficina de Registro de Instrumentos Públicos",
      ],
    },
  },
];

const PROPERTY_CHECKLIST = [
  {
    title: {
      en: "Certificate of Title & Freedom",
      es: "Certificado de Libertad y Tradición",
    },
    badge: {
      en: "Issued < 30 Days",
      es: "Vigencia < 30 Días",
    },
    desc: {
      en: "Issued within the last 30 days to verify current legal ownership, liens, mortgages, or active lawsuits.",
      es: "Con fecha de expedición reciente (no mayor a 30 días) para verificar propietarios actuales, gravámenes, hipotecas o embargos.",
    },
  },
  {
    title: {
      en: "Prior Public Deeds (10–20 Years)",
      es: "Escrituras Públicas de Adquisición",
    },
    badge: {
      en: "Chain of Title",
      es: "Cadena de Títulos",
    },
    desc: {
      en: "Audit of the 10-to-20-year chain of title to ensure past transactions were executed lawfully without missing heirs or fraudulent transfers.",
      es: "Revisa la cadena de títulos de los últimos 10 o 20 años para confirmar la validez legal de las ventas anteriores.",
    },
  },
  {
    title: {
      en: "Tax & HOA Clearances",
      es: "Recibos de Pago y Paz y Salvo",
    },
    badge: {
      en: "Predial & HOA",
      es: "Predial y Administración",
    },
    desc: {
      en: "Official receipts proving unified property taxes (impuesto predial), valorización, and HOA/maintenance fees are fully paid to date.",
      es: "Verificación de no adeudar impuesto predial unificado ni cuotas de administración si la propiedad pertenece a propiedad horizontal.",
    },
  },
  {
    title: {
      en: "Identity & Representation Documentation",
      es: "Identificación Completa de las Partes",
    },
    badge: {
      en: "Legal Standing",
      es: "Capacidad Legal",
    },
    desc: {
      en: "Copies of seller IDs/passports, notarized/consular powers of attorney, background screenings against restrictive lists, and corporate legal standing certificates if a company is selling.",
      es: "Cédulas o pasaportes de los vendedores, poderes otorgados ante notario/consulado (si actúa un apoderado), verificación en listas restrictivas y representación legal si vende una sociedad.",
    },
  },
];

const LEASING_SERVICES = [
  {
    id: "drafting",
    title: {
      en: "Lease Agreement Drafting & Review",
      es: "Elaboración y Revisión de Contratos de Arrendamiento",
    },
    desc: {
      en: "Legal structuring under Law 820 of 2003 for residential properties and commercial leases, protecting landlords and tenants from unilateral loopholes.",
      es: "Estructuración jurídica bajo la Ley 820 de 2003 para inmuebles de vivienda urbana y locales comerciales, blindando condiciones y garantías.",
    },
  },
  {
    id: "disputes",
    title: {
      en: "Lease Dispute Representation",
      es: "Representación en Conflictos de Arrendamiento",
    },
    desc: {
      en: "Legal mediation and formal representation regarding unpaid rent, utility bills, or HOA maintenance fees before conciliation centers or courts.",
      es: "Mediación legal y representación formal por cánones de arrendamiento adeudados, servicios públicos impagos o cuotas de administración.",
    },
  },
  {
    id: "deposits-handover",
    title: {
      en: "Deposits, Maintenance & Property Handover Support",
      es: "Depósitos, Mantenimiento y Entrega del Inmueble",
    },
    desc: {
      en: "Formal inventory inspections, legal claims over necessary vs. cosmetic repairs, and security deposit recovery or retention defense.",
      es: "Inspección formal de inventarios, reclamación sobre reparaciones necesarias vs. locativas, y defensa o retención del depósito de garantía.",
    },
  },
  {
    id: "restitution",
    title: {
      en: "Property Repossession (Restitución de Inmueble)",
      es: "Restitución de Inmueble Arrendado",
    },
    desc: {
      en: "Expedited legal proceedings to regain physical possession of leased property due to breach of contract, non-payment, or lease expiration.",
      es: "Procesos judiciales expeditos de restitución para recuperar la tenencia material del inmueble por incumplimiento contractual o vencimiento del término.",
    },
  },
];

export function RealEstatePageView() {
  const [lang, setLang] = useState<"en" | "es">("es");
  const [activeTab, setActiveTab] = useState<"purchase" | "leasing">("purchase");
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

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

      {/* 2. HERO HEADER */}
      <section className="legal-texture-bg relative overflow-hidden rounded-3xl bg-gradient-to-b from-white to-[#FAFBFD] dark:from-[#0F1E35] dark:to-[#0A1526] p-8 sm:p-12 lg:p-16 border border-[#16345F]/10 dark:border-white/10 shadow-sm">
        <div className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-[#9BB8E0]/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 size-72 rounded-full bg-[#C01072]/10 blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6 text-center flex flex-col items-center">
          <div className="flex flex-wrap justify-center items-center gap-2">
            <span className="rounded-full bg-[#C01072]/10 dark:bg-[#C01072]/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#C01072] dark:text-[#F472B6]">
              {lang === "en"
                ? "Purchase Legal Assistance Service"
                : "Asistencia Legal en Compra de Propiedad e Inversión"}
            </span>
            <span className="rounded-full bg-[#16345F]/5 dark:bg-white/10 px-3 py-1 text-xs font-semibold text-[#16345F] dark:text-gray-200">
              {lang === "en"
                ? "Lead Counsel: María Fernanda Duarte & Real Estate Department"
                : "Abogada Líder: María Fernanda Duarte y Departamento Inmobiliario"}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#16345F] dark:text-white leading-[1.1] text-center">
            {lang === "en"
              ? "Secure Your Real Estate Investment in Colombia with Full Legal Protection"
              : "Protege tu inversión inmobiliaria en Colombia con total tranquilidad legal"}
          </h1>

          {/* 3 Overview Paragraphs */}
          <div className="space-y-4 text-base sm:text-lg text-[#706F6F] dark:text-gray-300 leading-relaxed max-w-3xl mx-auto text-center pt-2">
            {lang === "en" ? (
              <>
                <p className="font-semibold text-[#16345F] dark:text-white">
                  We offer an end-to-end legal service designed to safeguard your capital in Colombia. Whether you are purchasing property to qualify for a future Colombian Investor Visa or simply acquiring a home, rental asset, or vacation spot, our priority is to identify and eliminate legal risks long before you sign a contract or wire funds.
                </p>
                <p>
                  We manage every step of the transaction: international fund transfers and foreign exchange compliance, comprehensive property due diligence, seller background checks, drafting and negotiating the Promissory Purchase Agreement (Promesa de Compraventa), and in-person representation at the notary’s office for title closing.
                </p>
                <p>
                  We also provide a detailed cost itemization outlining all upcoming fees—notary expenses, registration taxes, and withholdings—so you know your exact financial roadmap at every stage.
                </p>
              </>
            ) : (
              <>
                <p className="font-semibold text-[#16345F] dark:text-white">
                  Manejamos un servicio integral diseñado para blindar tu patrimonio en Colombia. Tanto si planeas adquirir un inmueble para aplicar en el futuro a una visa de inversionista, como si buscas rentabilizar tu dinero o comprar una propiedad de descanso, nuestro objetivo es prevenir y neutralizar cualquier riesgo legal antes de que firmes o trasfieras un solo dólar.
                </p>
                <p>
                  Nos encargamos de todo el ciclo de la transacción: desde la planificación para la monetización y el giro de recursos internacionales cumpliendo con la regulación cambiaria, hasta la verificación exhaustiva de la propiedad y sus vendedores. Elaboramos y negociamos la promesa de compraventa, estructuramos el negocio jurídico en tu representación y te acompañamos personalmente a la firma de la escritura pública en notaría.
                </p>
                <p>
                  Además, te entregamos un presupuesto detallado de todos los costos asociados (gastos notariales, de registro, impuestos y retenciones) para que sepas con precisión matemática cuánto vas a pagar en cada paso del proceso, sin sorpresas ni costos ocultos.
                </p>
              </>
            )}
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[#16345F]/10 dark:border-white/10 w-full max-w-3xl mx-auto text-left">
            <div className="flex items-center gap-3">
              <span className="size-10 rounded-xl bg-[#16345F]/5 dark:bg-white/5 flex items-center justify-center text-[#16345F] dark:text-[#9BB8E0]">
                <FileCheck2 className="size-5" />
              </span>
              <div>
                <p className="text-[11px] font-bold uppercase text-[#706F6F] dark:text-gray-400">
                  {lang === "en" ? "Title Audit Scope" : "Alcance Estudio"}
                </p>
                <p className="text-sm font-bold text-[#16345F] dark:text-white">
                  {lang === "en" ? "10–20 Year Title Chain" : "Cadena 10 a 20 Años"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="size-10 rounded-xl bg-[#C01072]/10 flex items-center justify-center text-[#C01072]">
                <Calendar className="size-5" />
              </span>
              <div>
                <p className="text-[11px] font-bold uppercase text-[#706F6F] dark:text-gray-400">
                  {lang === "en" ? "Initial Assessment" : "Consulta Inicial"}
                </p>
                <p className="text-sm font-bold text-[#C01072] dark:text-[#F472B6]">
                  $67 USD (45 min)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="size-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600">
                <Landmark className="size-5" />
              </span>
              <div>
                <p className="text-[11px] font-bold uppercase text-[#706F6F] dark:text-gray-400">
                  {lang === "en" ? "Central Bank Compliance" : "Registro Cambiario"}
                </p>
                <p className="text-sm font-bold text-[#16345F] dark:text-white">
                  Banco de la República (IED)
                </p>
              </div>
            </div>
          </div>

          {/* Quick CTA Actions in Hero */}
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
                  ? "Book Real Estate Consultation · $67 USD"
                  : "Agendar Asesoría Inmobiliaria · $67 USD"}
              </span>
              <ChevronRight className="size-4" />
            </a>

            <a
              href={`${WHATSAPP_URL}?text=${encodeURIComponent(
                lang === "en"
                  ? "Hello Capital M Law, I am planning to buy a property in Colombia and would like legal guidance."
                  : "Hola Capital M Law, tengo planes de comprar un inmueble en Colombia y deseo asesoría legal."
              )}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-[#16345F]/20 dark:border-white/20 hover:bg-[#16345F]/5 dark:hover:bg-white/5 text-[#16345F] dark:text-white font-semibold text-sm px-5 py-3.5 rounded-2xl transition"
            >
              <MessageCircle className="size-4 text-emerald-600" />
              <span>{lang === "en" ? "Direct WhatsApp Inquiry" : "Consulta Rápida por WhatsApp"}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 3. MASTER TABS: COMPRA E INVERSIÓN vs ARRENDAMIENTO URBANO */}
      <section className="space-y-8" id="real-estate-divisions">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 bg-gray-100/80 dark:bg-white/5 p-2 rounded-2xl max-w-2xl mx-auto border border-gray-200 dark:border-white/10">
          <button
            onClick={() => setActiveTab("purchase")}
            className={cn(
              "w-full sm:w-1/2 flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer",
              activeTab === "purchase"
                ? "bg-[#16345F] text-white shadow-md dark:bg-[#C01072]"
                : "text-[#706F6F] dark:text-gray-300 hover:text-[#16345F] dark:hover:text-white"
            )}
          >
            <Building2 className="size-4 shrink-0" />
            <span>
              {lang === "en"
                ? "Purchase & Investment Legal Assistance"
                : "Compra e Inversión Inmobiliaria"}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("leasing")}
            className={cn(
              "w-full sm:w-1/2 flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer",
              activeTab === "leasing"
                ? "bg-[#16345F] text-white shadow-md dark:bg-[#C01072]"
                : "text-[#706F6F] dark:text-gray-300 hover:text-[#16345F] dark:hover:text-white"
            )}
          >
            <KeyRound className="size-4 shrink-0" />
            <span>
              {lang === "en"
                ? "Landlord & Tenant Law (Arrendamiento)"
                : "Arrendamiento Urbano (Landlord & Tenant)"}
            </span>
          </button>
        </div>

        {/* TAB 1: PURCHASE & INVESTMENT */}
        {activeTab === "purchase" && (
          <div className="space-y-16 animate-in fade-in duration-300">
            {/* 3.1 ROADMAP INTERACTIVO DE LA TRANSACCIÓN */}
            <div className="space-y-8">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#16345F]/5 dark:bg-white/10 px-3 py-1 text-xs font-bold text-[#16345F] dark:text-[#9BB8E0]">
                  <Layers className="size-3.5" />
                  {lang === "en" ? "Structured Execution" : "Cronograma de la Transacción"}
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-[#16345F] dark:text-white">
                  {lang === "en"
                    ? "Transaction Roadmap & Next Steps"
                    : "Mapa del Proceso / Roadmap de la Compra"}
                </h2>
                <p className="text-sm text-[#706F6F] dark:text-gray-300">
                  {lang === "en"
                    ? "Click on any stage to see our legal auditing checkpoints, protections, and deliverables."
                    : "Haz clic en cada fase para ver las acciones preventivas, cláusulas de blindaje y entregables de la firma."}
                </p>
              </div>

              {/* Connected 4 Steps Horizontal Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
                {ROADMAP_STEPS.map((s, idx) => {
                  const isCurrent = idx === activeStepIndex;
                  return (
                    <button
                      key={s.step}
                      onClick={() => setActiveStepIndex(idx)}
                      className={cn(
                        "rounded-2xl border p-5 text-left transition-all duration-200 cursor-pointer relative overflow-hidden group",
                        isCurrent
                          ? "bg-[#16345F] text-white border-[#16345F] shadow-lg dark:bg-[#0F1E35] dark:border-[#C01072]"
                          : "bg-white dark:bg-[#0F1E35]/60 border-gray-200 dark:border-white/10 hover:border-[#16345F]/40 text-[#16345F] dark:text-white"
                      )}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={cn(
                            "text-2xl font-black font-mono",
                            isCurrent
                              ? "text-[#C01072] dark:text-[#F472B6]"
                              : "text-gray-400 dark:text-gray-500"
                          )}
                        >
                          {s.step}
                        </span>
                        {isCurrent ? (
                          <span className="size-2 rounded-full bg-[#34D399] animate-pulse" />
                        ) : (
                          <ChevronRight className="size-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                        )}
                      </div>

                      <p
                        className={cn(
                          "text-xs font-bold uppercase tracking-wider mb-1",
                          isCurrent
                            ? "text-[#9BB8E0]"
                            : "text-[#706F6F] dark:text-gray-400"
                        )}
                      >
                        {s.subtitle[lang]}
                      </p>

                      <h3 className="text-sm sm:text-base font-extrabold leading-tight">
                        {s.name[lang]}
                      </h3>
                    </button>
                  );
                })}
              </div>

              {/* Active Step Detailed Card */}
              <div className="rounded-3xl border border-[#16345F]/10 dark:border-white/10 bg-white dark:bg-[#0F1E35] p-6 sm:p-10 shadow-lg relative overflow-hidden">
                <div className="pointer-events-none absolute -top-20 -right-20 size-72 rounded-full bg-[#C01072]/5 blur-3xl" />

                <div className="relative z-10 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <span className="size-12 rounded-2xl bg-[#16345F] text-white flex items-center justify-center font-mono font-black text-xl">
                        {activeStep.step}
                      </span>
                      <div>
                        <span className="text-xs font-bold uppercase text-[#C01072] dark:text-[#F472B6]">
                          {activeStep.subtitle[lang]}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black text-[#16345F] dark:text-white">
                          {activeStep.name[lang]}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        onClick={() =>
                          setActiveStepIndex((prev) =>
                            prev === 0 ? ROADMAP_STEPS.length - 1 : prev - 1
                          )
                        }
                        className="size-9 rounded-xl border border-gray-200 dark:border-white/10 flex items-center justify-center text-[#16345F] dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition cursor-pointer"
                        aria-label="Previous Step"
                      >
                        <ChevronLeft className="size-4" />
                      </button>
                      <button
                        onClick={() =>
                          setActiveStepIndex((prev) =>
                            prev === ROADMAP_STEPS.length - 1 ? 0 : prev + 1
                          )
                        }
                        className="size-9 rounded-xl border border-gray-200 dark:border-white/10 flex items-center justify-center text-[#16345F] dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition cursor-pointer"
                        aria-label="Next Step"
                      >
                        <ChevronRight className="size-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-base sm:text-lg text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
                    {activeStep.description[lang]}
                  </p>

                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#706F6F] dark:text-gray-400">
                      {lang === "en" ? "Firm Deliverables in this Step:" : "Entregables Clave de la Firma en esta Etapa:"}
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {activeStep.deliverables[lang].map((d, dIdx) => (
                        <div
                          key={dIdx}
                          className="rounded-2xl border border-gray-200/80 dark:border-white/10 bg-[#FAFBFD] dark:bg-white/[0.02] p-4 flex items-start gap-3 shadow-2xs"
                        >
                          <span className="size-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="size-3 font-bold" />
                          </span>
                          <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-snug">
                            {d}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3.2 MID-PAGE DIRECT CTA */}
            <div className="rounded-3xl border border-[#C01072]/20 bg-gradient-to-r from-[#C01072]/5 via-white to-[#16345F]/5 dark:from-[#C01072]/15 dark:via-[#0F1E35] dark:to-[#16345F]/15 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
              <div className="space-y-1.5 text-center md:text-left">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#C01072] dark:text-[#F472B6]">
                  {lang === "en" ? "Ready to Secure Your Purchase?" : "¿Listo para Comprar con Seguridad?"}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#16345F] dark:text-white">
                  {lang === "en"
                    ? "Found the property you want to buy and ready to secure expert legal support?"
                    : "¿Ya tienes la propiedad que vas a comprar y quieres contratar el servicio de asistencia?"}
                </h3>
                <p className="text-xs sm:text-sm text-[#706F6F] dark:text-gray-300">
                  {lang === "en"
                    ? "Schedule an initial due diligence assessment with our real estate attorneys."
                    : "Agenda tu consulta inicial de estudio y blindaje con nuestras abogadas de propiedad raíz."}
                </p>
              </div>

              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 bg-[#C01072] hover:bg-[#A50E62] text-white font-bold text-xs sm:text-sm px-7 py-4 rounded-2xl transition shadow-md hover:shadow-lg"
              >
                <Calendar className="size-4" />
                <span>
                  {lang === "en"
                    ? "Book Purchase Assistance Consultation · $67 USD"
                    : "Agenda tu consultoría inicial aquí · $67 USD"}
                </span>
                <ChevronRight className="size-4" />
              </a>
            </div>

            {/* 3.3 CHECKLIST: DOCUMENTOS CLAVE A AUDITAR */}
            <div className="space-y-8">
              <div className="space-y-2 max-w-2xl">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#16345F]/5 dark:bg-white/10 px-3 py-1 text-xs font-bold text-[#16345F] dark:text-[#9BB8E0]">
                  <FileCheck2 className="size-3.5" />
                  {lang === "en" ? "Legal Due Diligence Checkpoints" : "Auditoría Documental Preventiva"}
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-[#16345F] dark:text-white">
                  {lang === "en"
                    ? "Checklist: Essential Property Documents We Audit"
                    : "Checklist: Documentos Clave a Verificar en una Propiedad"}
                </h2>
                <p className="text-sm text-[#706F6F] dark:text-gray-300">
                  {lang === "en"
                    ? "Every real estate transaction requires examining these 4 core pillars to ensure flawless title ownership."
                    : "Cada compraventa debe superar la revisión estricta de estos 4 pilares para garantizar que el título sea jurídicamente inatacable."}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PROPERTY_CHECKLIST.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0F1E35] p-6 sm:p-7 shadow-xs space-y-3 relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between">
                      <span className="size-10 rounded-xl bg-[#16345F]/5 dark:bg-white/5 text-[#16345F] dark:text-[#9BB8E0] flex items-center justify-center font-bold text-sm">
                        0{idx + 1}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-[#C01072]/10 text-[#C01072] dark:text-[#F472B6] px-3 py-1 rounded-full">
                        {item.badge[lang]}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-[#16345F] dark:text-white">
                      {item.title[lang]}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#706F6F] dark:text-gray-300 leading-relaxed">
                      {item.desc[lang]}
                    </p>

                    <div className="pt-2 flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="size-3.5" />
                      <span>{lang === "en" ? "Verified by Capital M Law" : "Auditado por Capital M Law"}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SPECIALIZED DIVISION: LANDLORD & TENANT LAW */}
        {activeTab === "leasing" && (
          <div className="space-y-16 animate-in fade-in duration-300">
            {/* Header of Landlord & Tenant */}
            <div className="rounded-3xl border border-[#16345F]/10 dark:border-white/10 bg-white dark:bg-[#0F1E35] p-8 sm:p-12 shadow-sm space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#16345F]/5 dark:bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#16345F] dark:text-[#9BB8E0]">
                <KeyRound className="size-3.5 text-[#C01072]" />
                {lang === "en"
                  ? "Specialized Division: Landlord & Tenant Law"
                  : "División Especializada: Derecho de Arrendamiento Urbano"}
              </span>

              <h2 className="text-3xl sm:text-4xl font-black text-[#16345F] dark:text-white">
                {lang === "en"
                  ? "Tailored Legal Representation for Landlords, Investors & Tenants in Colombia"
                  : "Representación Legal a Medida para Propietarios, Inversionistas e Inquilinos en Colombia"}
              </h2>

              <p className="text-base text-[#706F6F] dark:text-gray-300 max-w-3xl leading-relaxed">
                {lang === "en"
                  ? "Navigating Colombian urban leasing rules (Law 820 of 2003) requires robust contracts, clear deposit terms, and proactive dispute resolution. We represent foreign property owners, expat renters, and real estate managers."
                  : "El régimen de arrendamiento urbano en Colombia (Ley 820 de 2003) exige contratos blindados, reglas de depósito claras y resolución oportuna de controversias. Asesoramos a propietarios extranjeros, arrendatarios y gestores inmobiliarios."}
              </p>
            </div>

            {/* 4 Specialized Leasing Practice Areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {LEASING_SERVICES.map((srv, idx) => (
                <div
                  key={srv.id}
                  className="rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0F1E35] p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <span className="size-11 rounded-2xl bg-[#C01072]/10 text-[#C01072] flex items-center justify-center font-bold text-sm">
                      {idx === 0 && <FileText className="size-5" />}
                      {idx === 1 && <Scale className="size-5" />}
                      {idx === 2 && <Home className="size-5" />}
                      {idx === 3 && <ShieldAlert className="size-5" />}
                    </span>

                    <h3 className="text-xl font-black text-[#16345F] dark:text-white">
                      {srv.title[lang]}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#706F6F] dark:text-gray-300 leading-relaxed">
                      {srv.desc[lang]}
                    </p>
                  </div>

                  <div className="pt-2">
                    <a
                      href={CALENDLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#16345F] dark:text-[#9BB8E0] hover:text-[#C01072] transition"
                    >
                      <span>{lang === "en" ? "Consult on this matter" : "Consultar este trámite"}</span>
                      <ChevronRight className="size-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Specific Landlord & Tenant Disputes CTA */}
            <div className="rounded-3xl border border-amber-300/40 dark:border-amber-500/20 bg-gradient-to-r from-amber-50/60 via-white to-amber-50/30 dark:from-[#1A1813] dark:via-[#0F1E35] dark:to-[#14120D] p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-bold">
                  <BadgeAlert className="size-3.5" />
                  {lang === "en" ? "Immediate Conflict Resolution" : "Resolución Inmediata de Conflictos"}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#16345F] dark:text-white">
                  {lang === "en"
                    ? "Facing a dispute over a lease contract, security deposit, or property repairs?"
                    : "¿Enfrentas un conflicto por contrato de arrendamiento, depósito de garantía o reparaciones del inmueble?"}
                </h3>
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  {lang === "en"
                    ? "Speak with a specialized Landlord & Tenant attorney to defend your rights and recover funds or property."
                    : "Habla hoy con un abogado especialista en arrendamientos para defender tus derechos y recuperar fondos o el inmueble."}
                </p>
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#16345F] hover:bg-[#C01072] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl transition shadow-sm"
                >
                  <Calendar className="size-4" />
                  <span>
                    {lang === "en"
                      ? "Speak with an Attorney · $67 USD"
                      : "Habla con una Abogada · $67 USD"}
                  </span>
                </a>

                <a
                  href={`${WHATSAPP_URL}?text=${encodeURIComponent(
                    lang === "en"
                      ? "URGENT: I need legal assistance regarding a Colombian lease dispute or security deposit issue."
                      : "URGENTE: Necesito asesoría legal por un conflicto de arrendamiento o depósito en Colombia."
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white dark:bg-white/10 hover:bg-gray-100 dark:hover:bg-white/20 text-[#16345F] dark:text-white font-semibold text-xs sm:text-sm px-5 py-3.5 rounded-2xl transition border border-gray-200 dark:border-white/10"
                >
                  <MessageCircle className="size-4 text-emerald-600" />
                  <span>{lang === "en" ? "WhatsApp Urgent Chat" : "Chat Urgente WhatsApp"}</span>
                </a>
              </div>
            </div>

            {/* Checklist for Landlord & Tenant */}
            <div className="space-y-6">
              <div className="space-y-2 max-w-2xl">
                <h3 className="text-2xl font-black text-[#16345F] dark:text-white">
                  {lang === "en"
                    ? "Checklist: Essential Documents We Audit (Landlord & Tenant)"
                    : "Checklist: Documentos Clave a Auditar en Arrendamientos"}
                </h3>
                <p className="text-xs sm:text-sm text-[#706F6F] dark:text-gray-300">
                  {lang === "en"
                    ? "Verified cross-checks applied to lease agreements, property ownership, and co-debtor solvency."
                    : "Cotejo documental aplicado a contratos de arrendamiento, titularidad del inmueble y solvencia de fiadores."}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: {
                      en: "Certificate of Title & Freedom",
                      es: "Certificado de Libertad y Tradición",
                    },
                    desc: {
                      en: "Issued within 30 days to confirm legal ownership, liens, mortgages, or active lawsuits.",
                      es: "Expedido en los últimos 30 días para confirmar titularidad, gravámenes o embargos.",
                    },
                  },
                  {
                    title: {
                      en: "Prior Public Deeds",
                      es: "Escrituras Públicas de Propiedad",
                    },
                    desc: {
                      en: "Full 10-to-20-year chain-of-title audit ensuring the landlord is legally empowered to lease.",
                      es: "Auditoría completa de títulos que asegura que quien arrienda tiene facultades legítimas.",
                    },
                  },
                  {
                    title: {
                      en: "Tax & HOA Clearances",
                      es: "Paz y Salvo Predial y Administración",
                    },
                    desc: {
                      en: "Official receipts verifying property taxes and HOA maintenance fees are fully paid to date.",
                      es: "Recibos oficiales que acrediten pago al día de impuesto predial y expensas comunes.",
                    },
                  },
                  {
                    title: {
                      en: "Identity & Background Documentation",
                      es: "Identificación y Documentación de Antecedentes",
                    },
                    desc: {
                      en: "Valid IDs/passports of sellers, buyers, landlords, tenants, guarantors (fiadores), real estate agents, or corporate legal standing certificates.",
                      es: "Cédulas o pasaportes de arrendadores, arrendatarios, fiadores (codeudores), inmobiliarias o representación legal.",
                    },
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0F1E35] p-5 space-y-1.5"
                  >
                    <div className="flex items-center gap-2 font-bold text-sm text-[#16345F] dark:text-white">
                      <Check className="size-4 text-[#C01072]" />
                      <h4>{item.title[lang]}</h4>
                    </div>
                    <p className="text-xs text-[#706F6F] dark:text-gray-300 leading-relaxed pl-6">
                      {item.desc[lang]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 4. CLOSING STRATEGIC BANNER */}
      <section className="rounded-3xl bg-gradient-to-r from-[#16345F] via-[#1A3D6E] to-[#16345F] text-white p-8 sm:p-12 lg:p-16 shadow-xl relative overflow-hidden">
        <div className="pointer-events-none absolute -right-20 -bottom-20 size-80 rounded-full bg-[#C01072]/20 blur-3xl" />
        <div className="pointer-events-none absolute left-10 top-0 size-60 rounded-full bg-[#9BB8E0]/10 blur-2xl" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold text-[#9BB8E0]">
            <Sparkles className="size-3.5 text-[#F472B6]" />
            {lang === "en" ? "Real Estate Concierge Legal Counsel" : "Blindaje Legal Inmobiliario Integral"}
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            {lang === "en"
              ? "Protecting your real estate investment and lease contracts is seamless with Capital M Law."
              : "Proteger tu inversión inmobiliaria y contratos de arrendamiento es posible con Capital M Law."}
          </h2>

          <p className="text-sm sm:text-base text-gray-200 leading-relaxed max-w-2xl">
            {lang === "en"
              ? "Questions about fund transfers, title searches, or lease terms? Connect with our legal team on WhatsApp or book your strategy call today."
              : "¿Tienes dudas sobre el proceso, la moneda de giro o los términos de arrendamiento? Escríbenos por WhatsApp o agenda tu llamada estratégica hoy."}
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
                  ? "Book Strategy Session · $67 USD"
                  : "Reservar Llamada Estratégica · $67 USD"}
              </span>
              <ArrowRight className="size-4" />
            </a>

            <a
              href={`${WHATSAPP_URL}?text=${encodeURIComponent(
                lang === "en"
                  ? "Hello Capital M Law, I would like to speak to an attorney regarding Colombian real estate."
                  : "Hola Capital M Law, deseo consultar con una abogada sobre derecho inmobiliario en Colombia."
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
              ? "Confidential & Protected under Colombian Attorney-Client Privilege. 100% Bilingual legal practice."
              : "Confidencial y amparado bajo el Secreto Profesional del Derecho Colombiano. Práctica legal 100% bilingüe."}
          </p>
        </div>
      </section>
    </div>
  );
}
