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
  Heart,
  FileText,
  UserCheck,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Layers,
  Scale,
  Users,
  Baby,
  Building2,
  Check,
  Send,
  Video,
  ExternalLink,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const CALENDLY_URL = "https://calendly.com/capital-m-law-";
export const WHATSAPP_URL = "https://wa.me/573146022411";
export const YOUTUBE_URL = "https://www.youtube.com/@capitalemelaw";

export function MarriagePrenupsPageView() {
  const [lang, setLang] = useState<"en" | "es">("es");
  const [activeDiagnostic, setActiveDiagnostic] = useState<number>(0);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  // Form state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    service: "marriage",
    situation: "",
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const DIAGNOSTIC_CARDS = [
    {
      id: "marriage",
      badge: { en: "Civil Marriage", es: "Matrimonio Civil" },
      title: {
        en: "Planning to Get Married in Colombia?",
        es: "¿Planeas casarte por lo civil en Colombia?",
      },
      desc: {
        en: "Full notary assistance, civil registry expediting, foreign document eligibility, certified translations, and apostilles verification.",
        es: "Acompañamiento integral ante Notaría, revisión de certificados de nacimiento extranjeros, traducciones oficiales y radicación ágil del expediente.",
      },
      ctaText: {
        en: "Plan Marriage Requirements",
        es: "Organizar mi Matrimonio",
      },
      deliverables: {
        en: [
          "Notary dossier audit & legal scheduling in Medellín",
          "Apostille & certified translation chain validation",
          "In-person wedding ceremony accompaniment & official registration",
        ],
        es: [
          "Auditoría y radicación del expediente matrimonial ante Notaría",
          "Validación de apostillas y traducción oficial de partidas de nacimiento",
          "Acompañamiento presencial a la ceremonia y expedición del Registro Civil",
        ],
      },
    },
    {
      id: "prenups",
      badge: { en: "Capitulaciones", es: "Capitulaciones Matrimoniales" },
      title: {
        en: "Protect Pre-Existing Assets (Prenups)",
        es: "Capitulaciones y Protección de Patrimonio",
      },
      desc: {
        en: "Under Colombian Civil Law, an automatic conjugal partnership forms upon marriage. We draft custom Capitulaciones before the wedding to protect your assets.",
        es: "En Colombia, la sociedad conyugal nace automáticamente con el matrimonio civil. Redactamos capitulaciones previas para blindar tu patrimonio previo.",
      },
      ctaText: {
        en: "Draft Prenuptial Agreement",
        es: "Estructurar Capitulaciones",
      },
      deliverables: {
        en: [
          "Pre-marital balance sheet & assets inventory audit",
          "Bilingual draft excluding real estate, companies, and investments",
          "Public Deed protocolization before a Colombian Notary Public",
        ],
        es: [
          "Inventario y balance patrimonial previo al matrimonio",
          "Minuta bilingüe de capitulaciones excluyendo bienes, sociedades y rendimientos",
          "Firma y protocolización por Escritura Pública en Notaría",
        ],
      },
    },
    {
      id: "divorce",
      badge: { en: "Divorce & Dissolution", es: "Divorcio y Liquidación" },
      title: {
        en: "Divorce Proceedings (Express or Contested)",
        es: "Proceso de Divorcio (Express o Litigio)",
      },
      desc: {
        en: "Expedited mutual agreement divorce before a notary, or assertive court representation in contentious property and custody dissolution.",
        es: "Divorcio express notarial de mutuo acuerdo o representación judicial litigiosa para la disolución y liquidación de la sociedad conyugal.",
      },
      ctaText: {
        en: "Start Divorce Process",
        es: "Iniciar Proceso de Divorcio",
      },
      deliverables: {
        en: [
          "Mutual agreement regulatory settlement (convenio regulador)",
          "Dissolution and liquidation of the conjugal partnership",
          "Judicial representation in contested divorce lawsuits",
        ],
        es: [
          "Elaboración de acuerdo regulador de alimentos, visitas y bienes",
          "Escritura notarial de cesación de efectos civiles y liquidación conyugal",
          "Representación judicial en demandas de divorcio contencioso",
        ],
      },
    },
    {
      id: "custody",
      badge: { en: "Custody & Support", es: "Custodia y Alimentos" },
      title: {
        en: "Child Support, Custody & Guardianship",
        es: "Cuota de Alimentos, Custodia y Patria Potestad",
      },
      desc: {
        en: "Child support calculation, parenting schedules, international travel authorizations, and legal representation before Family Defensorías (ICBF).",
        es: "Fijación o modificación de cuota de alimentos, régimen de visitas, permisos de salida del país y defensa ante el ICBF o Comisarías de Familia.",
      },
      ctaText: {
        en: "Schedule Custody Session",
        es: "Agendar Asesoría de Custodia",
      },
      deliverables: {
        en: [
          "Legal conciliation for child support and visitation terms",
          "Permanent and temporary international travel permissions",
          "Defense of parental rights and custody rights before Colombian courts",
        ],
        es: [
          "Acta de conciliación formal de cuota alimentaria y régimen de visitas",
          "Estructuración de permisos notariales de salida del país para menores",
          "Procesos judiciales de fijación, aumento, disminución o custodia",
        ],
      },
    },
  ];

  const ROADMAP_STEPS = [
    {
      step: "01",
      title: {
        en: "Initial Diagnosis & Profiling",
        es: "Diagnóstico Inicial y Perfilamiento",
      },
      desc: {
        en: "We evaluate your civil status, nationality constraints, assets inventory, and family goals with complete confidentiality.",
        es: "Evaluamos tu estado civil actual, nacionalidad, inventario de bienes y metas familiares con total reserva y empatía.",
      },
    },
    {
      step: "02",
      title: {
        en: "Strategy & Drafting",
        es: "Estrategia & Redacción Jurídica",
      },
      desc: {
        en: "We draft tailored prenuptial agreements, marriage filings, or divorce accords aligned strictly with Colombian Civil Code.",
        es: "Elaboramos la minuta de capitulaciones, solicitud de matrimonio o convenio de divorcio con estricto apego al Código Civil.",
      },
    },
    {
      step: "03",
      title: {
        en: "Conciliation or Representation",
        es: "Conciliación o Representación",
      },
      desc: {
        en: "We mediate fair terms between parties or represent your family interests before notaries, family centers, or judges.",
        es: "Facilitamos acuerdos justos de mutuo acuerdo o representamos tus intereses con firmeza técnica ante notarios y jueces.",
      },
    },
    {
      step: "04",
      title: {
        en: "Final Execution & Legal Effects",
        es: "Protocolización y Efectos Jurídicos",
      },
      desc: {
        en: "Execution of the Public Deed at the Notary, civil registry inscription, and issuance of official apostilled certificates.",
        es: "Firma de Escritura Pública en Notaría, inscripción en el Registro Civil de las Personas y entrega de copias auténticas.",
      },
    },
  ];

  const activeDiagCard = DIAGNOSTIC_CARDS[activeDiagnostic];

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
        <div className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-[#00AA81]/15 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 size-72 rounded-full bg-[#C01072]/10 blur-3xl" />

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            {/* Mint Green #00AA81 over Navy #16345F badge */}
            <span className="rounded-full bg-[#16345F] text-[#00AA81] border border-[#00AA81]/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider shadow-xs">
              Family Law & Prenuptial Strategies
            </span>
            <span className="rounded-full bg-[#16345F]/5 dark:bg-white/10 px-3 py-1 text-xs font-semibold text-[#16345F] dark:text-gray-200">
              {lang === "en"
                ? "Lead Counsel: María Fernanda Duarte & Family Law Department"
                : "Abogada Líder: María Fernanda Duarte y Departamento de Familia"}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#16345F] dark:text-white leading-[1.1]">
            {lang === "en"
              ? "Protecting Your Family and Assets at Every Stage of Life"
              : "Protege a tu familia y tu patrimonio en cada etapa de la vida"}
          </h1>

          <p className="text-base sm:text-lg text-[#706F6F] dark:text-gray-300 leading-relaxed max-w-3xl">
            {lang === "en"
              ? "Empathetic, rigorous, and clear legal counsel for local and international families in Colombia."
              : "Acompañamiento legal empático, riguroso y transparente para parejas y familias locales e internacionales en Colombia."}
          </p>

          {/* Service Overview Description */}
          <div className="space-y-4 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed border-t border-[#16345F]/10 dark:border-white/10 pt-4">
            {lang === "en" ? (
              <>
                <p className="font-semibold text-[#16345F] dark:text-white">
                  Family matters are never just legal paperwork—they are pivotal life transitions. At Capital M Law, we approach every union, separation, and estate with deep empathy, tactical clarity, and unwavering technical rigor.
                </p>
                <p>
                  Our specialized department handles civil marriage logistics, tailored prenuptial agreements (Capitulaciones), formal recognition of De Facto Marital Unions (Unión Marital de Hecho), marital property dissolution, divorce proceedings (both uncontested and contentious), and child custody and support agreements.
                </p>
              </>
            ) : (
              <>
                <p className="font-semibold text-[#16345F] dark:text-white">
                  Los asuntos de familia no son simples trámites: son momentos trascendentales de vida. En Capital M Law entendemos que cada unión, separación o acuerdo patrimonial requiere un acompañamiento cercano, empático y con absoluta firmeza técnica.
                </p>
                <p>
                  Acompañamos matrimonios civiles en Colombia, capitulaciones matrimoniales (prenups), formalización de Unión Marital de Hecho por escritura pública o conciliación, disolución y liquidación de sociedades conyugales, divorcios de mutuo acuerdo o contenciosos, y acuerdos de custodia y cuota de alimentos.
                </p>
              </>
            )}
          </div>

          {/* Quick CTAs in Hero */}
          <div className="pt-4 flex flex-wrap items-center gap-3">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#C01072] hover:bg-[#A50E62] text-white font-bold text-sm px-7 py-3.5 rounded-2xl transition shadow-md hover:shadow-lg"
            >
              <Calendar className="size-4" />
              <span>
                {lang === "en"
                  ? "Book Your Initial Consultation · $67 USD"
                  : "Agenda tu Consultoría Inicial · $67 USD"}
              </span>
              <ChevronRight className="size-4" />
            </a>

            <a
              href={`${WHATSAPP_URL}?text=${encodeURIComponent(
                lang === "en"
                  ? "Hello Capital M Law, I would like to inquire about Family Law and Prenuptial services."
                  : "Hola Capital M Law, me gustaría consultar sobre servicios de derecho de familia y capitulaciones."
              )}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-[#16345F]/20 dark:border-white/20 hover:bg-[#16345F]/5 dark:hover:bg-white/5 text-[#16345F] dark:text-white font-semibold text-sm px-5 py-3.5 rounded-2xl transition"
            >
              <MessageCircle className="size-4 text-emerald-600" />
              <span>{lang === "en" ? "Quick Question on WhatsApp" : "Pregunta Rápida por WhatsApp"}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 3. SECCIÓN INTERACTIVA: ¿POR DÓNDE EMPEZAR? / INTERACTIVE DIAGNOSTIC */}
      <section className="space-y-8" id="where-to-start">
        <div className="space-y-2 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#00AA81]/10 text-[#00AA81] px-3 py-1 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="size-3.5" />
            {lang === "en" ? "Tailored Guidance" : "Rutas de Acompañamiento"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#16345F] dark:text-white">
            {lang === "en"
              ? "Where Would You Like to Start?"
              : "¿Por dónde empezar?"}
          </h2>
          <p className="text-sm text-[#706F6F] dark:text-gray-300">
            {lang === "en"
              ? "Select your current life situation to explore our tailored legal checklist, timeline, and actions."
              : "Selecciona tu situación actual para ver la ruta jurídica, requisitos y entregables de nuestra firma."}
          </p>
        </div>

        {/* 4 Cards Grid / Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DIAGNOSTIC_CARDS.map((card, idx) => {
            const isSelected = idx === activeDiagnostic;
            return (
              <button
                key={card.id}
                onClick={() => setActiveDiagnostic(idx)}
                className={cn(
                  "p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer relative overflow-hidden flex flex-col justify-between space-y-4",
                  isSelected
                    ? "bg-[#16345F] text-white border-[#16345F] shadow-lg dark:bg-[#0F1E35] dark:border-[#00AA81]"
                    : "bg-white dark:bg-[#0F1E35]/60 border-gray-200 dark:border-white/10 hover:border-[#16345F]/30 text-[#16345F] dark:text-white"
                )}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        "text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full",
                        isSelected
                          ? "bg-white/15 text-[#00AA81]"
                          : "bg-gray-100 dark:bg-white/10 text-[#C01072] dark:text-[#F472B6]"
                      )}
                    >
                      {card.badge[lang]}
                    </span>
                    {isSelected && <span className="size-2 rounded-full bg-[#00AA81] animate-pulse" />}
                  </div>

                  <h3 className="text-base font-extrabold leading-snug">
                    {card.title[lang]}
                  </h3>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs font-bold">
                  <span className={isSelected ? "text-[#9BB8E0]" : "text-[#706F6F] dark:text-gray-400"}>
                    {lang === "en" ? "Explore path" : "Ver ruta legal"}
                  </span>
                  <ChevronRight
                    className={cn(
                      "size-4 transition-transform",
                      isSelected ? "translate-x-1 text-[#00AA81]" : "text-gray-400"
                    )}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Diagnostic Detail Panel */}
        <div className="rounded-3xl border border-[#16345F]/10 dark:border-white/10 bg-white dark:bg-[#0F1E35] p-6 sm:p-10 shadow-lg space-y-6 relative overflow-hidden">
          <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-[#00AA81]/10 blur-3xl" />

          <div className="relative z-10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-white/10 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#00AA81]">
                  {activeDiagCard.badge[lang]}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#16345F] dark:text-white">
                  {activeDiagCard.title[lang]}
                </h3>
              </div>

              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 bg-[#16345F] hover:bg-[#C01072] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition shadow-xs"
              >
                <Calendar className="size-4 text-[#00AA81]" />
                <span>{activeDiagCard.ctaText[lang]} · $67 USD</span>
                <ChevronRight className="size-4" />
              </a>
            </div>

            <p className="text-base text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
              {activeDiagCard.desc[lang]}
            </p>

            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#706F6F] dark:text-gray-400">
                {lang === "en" ? "What Capital M Law Delivers:" : "Entregables de la Firma en este Proceso:"}
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {activeDiagCard.deliverables[lang].map((d, dIdx) => (
                  <div
                    key={dIdx}
                    className="rounded-2xl border border-gray-200/80 dark:border-white/10 bg-[#FAFBFD] dark:bg-white/[0.02] p-4 flex items-start gap-3 shadow-2xs"
                  >
                    <span className="size-5 rounded-full bg-[#00AA81]/15 text-[#00AA81] flex items-center justify-center shrink-0 mt-0.5">
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
      </section>

      {/* 4. ROADMAP (4 PASOS) */}
      <section className="space-y-8" id="roadmap">
        <div className="space-y-2 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#16345F]/5 dark:bg-white/10 px-3 py-1 text-xs font-bold text-[#16345F] dark:text-[#9BB8E0]">
            <Clock className="size-3.5" />
            {lang === "en" ? "Step-by-Step Legal Architecture" : "Metodología Paso a Paso"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#16345F] dark:text-white">
            {lang === "en"
              ? "How We Structure Your Family Case"
              : "Roadmap: 4 Pasos Hacia tu Tranquilidad"}
          </h2>
          <p className="text-sm text-[#706F6F] dark:text-gray-300">
            {lang === "en"
              ? "From initial profiling to notarization and full civil registry effects."
              : "Desde el diagnóstico de compatibilidad legal hasta la protocolización notarial definitiva."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ROADMAP_STEPS.map((st, sIdx) => (
            <div
              key={st.step}
              className="rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0F1E35] p-6 shadow-xs flex flex-col justify-between space-y-4 relative"
            >
              <div className="space-y-3">
                <span className="text-3xl font-black font-mono text-[#00AA81]">
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
                <span>{lang === "en" ? "Bilingual Counsel" : "Asesoría Bilingüe"}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PAQUETES COMBINADOS / BUNDLED SOLUTIONS */}
      <section className="space-y-8" id="bundles">
        <div className="space-y-2 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#C01072]/10 dark:bg-[#C01072]/20 px-3 py-1 text-xs font-bold text-[#C01072] dark:text-[#F472B6]">
            <Layers className="size-3.5" />
            {lang === "en" ? "Integrated Value" : "Paquetes Legales Combinados"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#16345F] dark:text-white">
            {lang === "en" ? "Bundled Solutions" : "Paquetes Combinados"}
          </h2>
          <p className="text-sm text-[#706F6F] dark:text-gray-300">
            {lang === "en"
              ? "Synchronized family law solutions linked directly with Colombian residency and real estate protection."
              : "Soluciones jurídicas unificadas que combinan matrimonio civil con tu visa o capitulaciones con inversiones."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bundle 1 */}
          <div className="rounded-3xl border border-[#16345F]/10 dark:border-white/10 bg-white dark:bg-[#0F1E35] p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="size-12 rounded-2xl bg-[#00AA81]/15 text-[#00AA81] flex items-center justify-center">
                <Heart className="size-6" />
              </span>

              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00AA81]">
                  {lang === "en" ? "Immigration + Civil Union" : "Inmigración + Unión Civil"}
                </span>
                <h3 className="text-2xl font-black text-[#16345F] dark:text-white mt-1">
                  {lang === "en" ? "Marriage + Spouse Visa" : "Matrimonio + Visa de Cónyuge"}
                </h3>
                <p className="text-xs sm:text-sm text-[#706F6F] dark:text-gray-300 mt-2 leading-relaxed">
                  {lang === "en"
                    ? "Full legal assistance for the civil marriage in Notary, followed immediately by structuring and filing the Colombian Spouse Visa (Type M) with the Ministry of Foreign Affairs."
                    : "Acompañamiento integral en el matrimonio civil en Notaría y posterior armado, auditoría y radicación de la Visa de Cónyuge (Tipo M) ante la Cancillería."}
                </p>
              </div>

              <ul className="space-y-1.5 text-xs text-gray-700 dark:text-gray-300 pt-2 border-t border-gray-100 dark:border-white/5">
                <li>• {lang === "en" ? "Notary dossier audit & foreign birth certificate translation" : "Auditoría de registro civil foráneo y traducción oficial"}</li>
                <li>• {lang === "en" ? "Marriage registration & apostille issuance" : "Registro civil de matrimonio y apostilla para Cancillería"}</li>
                <li>• {lang === "en" ? "Type M Spouse Visa filing and Cédula guidance" : "Radicación de Visa M Cónyuge y expedición de Cédula"}</li>
              </ul>
            </div>

            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#16345F] hover:bg-[#C01072] text-white font-bold text-xs sm:text-sm py-3.5 px-4 rounded-xl transition shadow-xs"
            >
              <Calendar className="size-4" />
              <span>{lang === "en" ? "Book Marriage + Visa Consultation" : "Agendar Matrimonio + Visa · $67 USD"}</span>
            </a>
          </div>

          {/* Bundle 2 */}
          <div className="rounded-3xl border border-[#16345F]/10 dark:border-white/10 bg-white dark:bg-[#0F1E35] p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="size-12 rounded-2xl bg-[#C01072]/10 text-[#C01072] flex items-center justify-center">
                <Building2 className="size-6" />
              </span>

              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C01072] dark:text-[#F472B6]">
                  {lang === "en" ? "Asset Shielding + Real Estate" : "Blindaje Patrimonial + Inmuebles"}
                </span>
                <h3 className="text-2xl font-black text-[#16345F] dark:text-white mt-1">
                  {lang === "en" ? "Prenups + Investment Protection" : "Capitulaciones + Inversión / Real Estate"}
                </h3>
                <p className="text-xs sm:text-sm text-[#706F6F] dark:text-gray-300 mt-2 leading-relaxed">
                  {lang === "en"
                    ? "Safeguard high-value real estate purchases, commercial company shares, and foreign earnings by combining tailored Capitulaciones with property due diligence."
                    : "Protege la compra de propiedades de alto valor, participaciones societarias o ingresos extranjeros combinando capitulaciones con el estudio de títulos inmobiliario."}
                </p>
              </div>

              <ul className="space-y-1.5 text-xs text-gray-700 dark:text-gray-300 pt-2 border-t border-gray-100 dark:border-white/5">
                <li>• {lang === "en" ? "Strict exclusion of property titles from the marital estate" : "Exclusión estricta de inmuebles de la sociedad conyugal"}</li>
                <li>• {lang === "en" ? "FDI & Central Bank fund monetization alignment" : "Armonización de giros cambiarios y registro de inversión"}</li>
                <li>• {lang === "en" ? "Bilingual deed protocolization before notary closing" : "Escritura pública bilingüe previa a la firma de compraventa"}</li>
              </ul>
            </div>

            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#16345F] hover:bg-[#C01072] text-white font-bold text-xs sm:text-sm py-3.5 px-4 rounded-xl transition shadow-xs"
            >
              <Calendar className="size-4" />
              <span>{lang === "en" ? "Book Prenups + Investment Consultation" : "Agendar Capitulaciones + Inversión · $67 USD"}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 6. FORMULARIO DE INTAKE & CANALES DIRECTOS (YOUTUBE + WHATSAPP) */}
      <section className="rounded-3xl border border-[#16345F]/15 dark:border-white/10 bg-white dark:bg-[#0F1E35] p-6 sm:p-10 lg:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Context & Direct Channels (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#00AA81]/10 text-[#00AA81] px-3 py-1 text-xs font-bold uppercase tracking-wider">
              <UserCheck className="size-3.5" />
              {lang === "en" ? "Direct Case Intake" : "Evaluación de Caso"}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#16345F] dark:text-white">
              {lang === "en"
                ? "Confidential Family Intake"
                : "Formulario de Evaluación de Caso"}
            </h3>
            <p className="text-xs sm:text-sm text-[#706F6F] dark:text-gray-300 leading-relaxed">
              {lang === "en"
                ? "Share your initial situation with our principal attorneys. Every inquiry is protected under Colombian Attorney-Client Privilege."
                : "Cuéntanos brevemente tu caso. Toda la información suministrada se encuentra amparada bajo el Secreto Profesional del Derecho Colombiano."}
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 text-[#16345F] dark:text-emerald-300 hover:bg-emerald-100 transition group"
            >
              <div className="flex items-center gap-3">
                <span className="size-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
                  <MessageCircle className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-bold text-gray-500 dark:text-gray-400">
                    {lang === "en" ? "Need Immediate Guidance?" : "¿Necesitas respuesta urgente?"}
                  </p>
                  <p className="text-sm font-extrabold text-[#16345F] dark:text-white">
                    Direct WhatsApp: +57 314 602 2411
                  </p>
                </div>
              </div>
              <ChevronRight className="size-5 text-emerald-600 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/40 text-[#16345F] dark:text-red-300 hover:bg-red-100 transition group"
            >
              <div className="flex items-center gap-3">
                <span className="size-10 rounded-xl bg-red-600 text-white flex items-center justify-center">
                  <Video className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-bold text-gray-500 dark:text-gray-400">
                    {lang === "en" ? "Watch Legal Explainers" : "Canal Oficial de YouTube"}
                  </p>
                  <p className="text-sm font-extrabold text-[#16345F] dark:text-white">
                    @capitalemelaw Video Guides
                  </p>
                </div>
              </div>
              <ExternalLink className="size-4 text-red-600 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Right Column: 4-Field Intake Form (7 cols) */}
        <div className="lg:col-span-7 bg-[#FAFBFD] dark:bg-white/[0.02] p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-white/10">
          {formSubmitted ? (
            <div className="text-center py-10 space-y-4">
              <span className="size-16 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="size-8" />
              </span>
              <h4 className="text-2xl font-black text-[#16345F] dark:text-white">
                {lang === "en" ? "Message Received" : "Solicitud Recibida"}
              </h4>
              <p className="text-xs sm:text-sm text-[#706F6F] dark:text-gray-300 max-w-md mx-auto">
                {lang === "en"
                  ? "Thank you. Our family law department will review your details and reach out within 24 business hours. You can also book directly on Calendly."
                  : "Gracias. Nuestro departamento de derecho de familia revisará tu caso y se pondrá en contacto en un plazo máximo de 24 horas hábiles."}
              </p>
              <div className="pt-2">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#C01072] text-white font-bold text-xs px-5 py-3 rounded-xl shadow-xs"
                >
                  <Calendar className="size-4" />
                  <span>{lang === "en" ? "Fast-Track via Calendly" : "Agendar Directamente en Calendly"}</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Field 1: Name */}
              <div>
                <label className="block text-xs font-bold text-[#16345F] dark:text-gray-200 mb-1">
                  {lang === "en" ? "Full Legal Name *" : "Nombre Completo *"}
                </label>
                <input
                  required
                  type="text"
                  placeholder={lang === "en" ? "e.g. John Doe or María Fernanda" : "Ej. Juan Pérez o María Gómez"}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#0F1E35] border border-gray-200 dark:border-white/10 text-xs sm:text-sm text-[#16345F] dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00AA81]"
                />
              </div>

              {/* Field 2: Email / WhatsApp */}
              <div>
                <label className="block text-xs font-bold text-[#16345F] dark:text-gray-200 mb-1">
                  {lang === "en" ? "Email Address or WhatsApp Number *" : "Correo Electrónico o WhatsApp *"}
                </label>
                <input
                  required
                  type="text"
                  placeholder={lang === "en" ? "e.g. contact@email.com or +1 555-0192" : "Ej. contacto@correo.com o +57 300 123 4567"}
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#0F1E35] border border-gray-200 dark:border-white/10 text-xs sm:text-sm text-[#16345F] dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00AA81]"
                />
              </div>

              {/* Field 3: Service of Interest */}
              <div>
                <label className="block text-xs font-bold text-[#16345F] dark:text-gray-200 mb-1">
                  {lang === "en" ? "Matter of Interest *" : "Servicio de Interés *"}
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#0F1E35] border border-gray-200 dark:border-white/10 text-xs sm:text-sm text-[#16345F] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00AA81]"
                >
                  <option value="marriage">
                    {lang === "en" ? "Civil Marriage in Colombia" : "Matrimonio Civil en Notaría"}
                  </option>
                  <option value="prenups">
                    {lang === "en" ? "Capitulaciones Matrimoniales (Prenups)" : "Capitulaciones Matrimoniales"}
                  </option>
                  <option value="divorce">
                    {lang === "en" ? "Divorce & Conjugal Dissolution" : "Divorcio y Liquidación Conyugal"}
                  </option>
                  <option value="custody">
                    {lang === "en" ? "Child Support & Custody (Alimentos)" : "Custodia y Cuota de Alimentos"}
                  </option>
                  <option value="bundle">
                    {lang === "en" ? "Bundled Package (Marriage + Visa / Prenups + Real Estate)" : "Paquete Combinado (Matrimonio + Visa / Capitulaciones + Inmuebles)"}
                  </option>
                </select>
              </div>

              {/* Field 4: Summary of Situation */}
              <div>
                <label className="block text-xs font-bold text-[#16345F] dark:text-gray-200 mb-1">
                  {lang === "en" ? "Brief Summary of Your Situation *" : "Resumen de tu Situación *"}
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder={
                    lang === "en"
                      ? "Briefly describe your timeline, nationalities, or specific questions..."
                      : "Describe brevemente tus tiempos previstos, nacionalidades o dudas específicas..."
                  }
                  value={formData.situation}
                  onChange={(e) => setFormData({ ...formData, situation: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#0F1E35] border border-gray-200 dark:border-white/10 text-xs sm:text-sm text-[#16345F] dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00AA81]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#16345F] hover:bg-[#C01072] text-white font-bold text-xs sm:text-sm py-3.5 rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="size-4" />
                <span>{lang === "en" ? "Submit Confidential Inquiry" : "Enviar Consulta Confidencial"}</span>
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
