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
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Layers,
  Scale,
  Building2,
  Check,
  Send,
  Video,
  ExternalLink,
  ShieldAlert,
  ArrowRight,
  Landmark,
  Home,
  FileCheck2,
  FileKey2,
  FileHeart,
  Globe2,
  Coins,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const CALENDLY_URL = "https://calendly.com/capital-m-law-";
export const WHATSAPP_URL = "https://wa.me/573146022411";
export const YOUTUBE_URL = "https://www.youtube.com/@capitalemelaw";

export function WillsTrustsPageView() {
  const [lang, setLang] = useState<"en" | "es">("es");
  const [activeDiagnostic, setActiveDiagnostic] = useState<number>(0);

  // Form state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    vehicle: "will",
    goals: "",
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const CORE_SERVICES = [
    {
      id: "wills",
      icon: FileKey2,
      title: {
        en: "Formal Wills (Open & Closed Testamentos)",
        es: "Testamentos Solemnes (Abiertos y Cerrados)",
      },
      tag: { en: "Civil Code Compliance", es: "Código Civil Colombiano" },
      desc: {
        en: "Drafted and protocolized before a Colombian Notary Public in strict compliance with statutory forced-heirship rules (legítimas rigurosas) and free-disposition portions.",
        es: "Elaborados y protocolizados ante Notaría pública con estricto apego a las legítimas rigurosas y la porción de libre disposición para blindar tu última voluntad contra impugnaciones.",
      },
      bullets: {
        en: [
          "Open wills executed with 3 witnesses or closed sealed testaments with 5 witnesses",
          "Precise allocation of the 50% free-disposition quota to protect chosen beneficiaries",
          "Designation of testamentary executors (albaceas) and guardian appointments",
        ],
        es: [
          "Testamento público abierto (3 testigos) o testamento cerrado en sobre sellado (5 testigos)",
          "Asignación estratégica del 50% de libre disposición en favor de familiares o terceros",
          "Designación formal de albacea fiduciario o ejecutor testamentario",
        ],
      },
    },
    {
      id: "trusts",
      icon: Landmark,
      title: {
        en: "Civil Trusts & Autonomous Estates (Fiducia Civil)",
        es: "Fideicomisos y Patrimonios Autónomos (Fiducia Civil)",
      },
      tag: { en: "Probate Bypass", es: "Sin Sucesión Judicial" },
      desc: {
        en: "Structuring civil trusts under Article 794 of the Civil Code. Assets pass automatically to beneficiaries upon death or condition without lengthy court probate.",
        es: "Constitución de Fiducias Civiles (Art. 794 Código Civil). Los bienes se transfieren automáticamente a los fideicomisarios designados sin necesidad de iniciar una sucesión judicial o notarial.",
      },
      bullets: {
        en: [
          "Asset protection against third-party commercial claims and lawsuits",
          "Automatic transfer of real estate and corporate shares upon condition",
          "Zero probate court fees and avoidance of lengthy inheritance disputes",
        ],
        es: [
          "Blindaje de bienes patrimoniales frente a contingencias comerciales",
          "Transferencia automática de inmuebles y participaciones sociales al fallecimiento",
          "Ahorro de gastos sucesorios notariales y prevención total de litigios entre herederos",
        ],
      },
    },
    {
      id: "usufruct",
      icon: Home,
      title: {
        en: "Usufruct Rights & Bare Ownership (Nuda Propiedad)",
        es: "Derechos de Usufructo y Nuda Propiedad",
      },
      tag: { en: "Lifetime Income Retention", es: "Rentas y Uso Vitalicio" },
      desc: {
        en: "Transfer legal property title to your heirs today while legally retaining 100% lifetime rights to live in, enjoy, and collect rental income from the property.",
        es: "Transfiere la propiedad jurídica (nuda propiedad) a tus herederos hoy mismo, reservándote de por vida el derecho exclusivo a habitar, arrendar y cobrar las rentas del inmueble.",
      },
      bullets: {
        en: [
          "Immediate generational transfer with zero post-mortem court filings",
          "Complete guarantee of lifetime rental revenues and possession",
          "Extinction of usufruct upon death consolidates 100% full title in heirs",
        ],
        es: [
          "Anticipación de la herencia en vida sin perder el control ni los ingresos",
          "Garantía notarial de goce vitalicio inscrita en el Certificado de Tradición",
          "Consolidación automática del dominio pleno al fallecimiento sin abrir sucesión",
        ],
      },
    },
    {
      id: "healthcare-directives",
      icon: FileHeart,
      title: {
        en: "Advance Healthcare Directives (Living Wills)",
        es: "Directivas Anticipadas (Voluntades Previas)",
      },
      tag: { en: "Medical & Financial Autonomy", es: "Autonomía Médica y Patrimonial" },
      desc: {
        en: "Binding legal declarations regarding medical procedures, palliative care, and emergency asset stewardship in the event of future physical or mental incapacity.",
        es: "Declaraciones de voluntad formalizadas ante Notario sobre tratamientos médicos, cuidados paliativos y administración de bienes ante una eventual incapacidad física o mental.",
      },
      bullets: {
        en: [
          "Statutory advance healthcare declarations binding on Colombian hospitals",
          "Appointment of health proxies and durable financial power of attorney",
          "Clear guidance to relieve loved ones from agonizing emergency decisions",
        ],
        es: [
          "Documento formal de voluntades anticipadas con validez ante clínicas y EPS",
          "Designación de apoderado de salud y administración patrimonial urgente",
          "Protección de tu dignidad y tranquilidad absoluta para tu familia",
        ],
      },
    },
    {
      id: "cross-border",
      icon: Globe2,
      title: {
        en: "Cross-Border Estate Planning (Expats & Foreign Investors)",
        es: "Planeación Trasnacional para Extranjeros (Expats)",
      },
      tag: { en: "International Alignment", es: "Armonización Internacional" },
      desc: {
        en: "Harmonizing foreign wills, US/European revocable living trusts, and offshore corporate structures with mandatory Colombian real estate succession laws.",
        es: "Armonización de testamentos otorgados en el exterior, trusts foráneos y sociedades extranjeras con la legislación inmobiliaria y sucesoral obligatoria de Colombia.",
      },
      bullets: {
        en: [
          "Elimination of slow 2-year Supreme Court exequátur recognition procedures",
          "Direct Colombian notarial will drafting complementing foreign estate plans",
          "Tax optimization and capital repatriation strategies for international heirs",
        ],
        es: [
          "Evita engorrosos trámites de exequátur ante la Corte Suprema de Justicia",
          "Testamento local complementario que rige exclusivamente sobre bienes en Colombia",
          "Optimización cambiaria y fiscal para la repatriación de recursos a herederos extranjeros",
        ],
      },
    },
  ];

  const DIAGNOSTIC_CARDS = [
    {
      id: "diag-will",
      badge: { en: "Property Owner Will", es: "Testamento Notarial" },
      title: {
        en: "Own Property in Colombia & Want a Clear Will?",
        es: "¿Tienes propiedades en Colombia y deseas un testamento formal?",
      },
      desc: {
        en: "Drafting an open public will before a Notary to allocate your 50% free-disposition estate, designate trusted executors, and prevent family succession disputes.",
        es: "Estructuración de testamento abierto ante Notaría pública para asignar la porción de libre disposición, nombrar albaceas y evitar discrepancias entre herederos.",
      },
      ctaText: {
        en: "Structure My Will",
        es: "Estructurar mi Testamento",
      },
      deliverables: {
        en: [
          "Asset & forced-heirship statutory quota computation",
          "Bilingual draft of open or closed solemn will",
          "In-person Notary protocolization with 3 registered witnesses",
        ],
        es: [
          "Cálculo matemático de legítimas y porción de libre disposición",
          "Minuta de testamento solemne adaptada a la ley colombiana",
          "Protocolización presencial en Notaría con presencia de 3 testigos",
        ],
      },
    },
    {
      id: "diag-usufruct",
      badge: { en: "Usufruct & Retained Income", es: "Reserva de Usufructo" },
      title: {
        en: "Transfer Property While Retaining Rental Income?",
        es: "¿Transferir un inmueble reservando el uso y rentas vitalicias?",
      },
      desc: {
        en: "Deed transfer of bare ownership (nuda propiedad) to your children while legally preserving 100% of rental payments and lifetime possession.",
        es: "Transferencia de la nuda propiedad a tus hijos en vida, conservando por escritura pública el derecho a arrendar y recibir los cánones hasta el fallecimiento.",
      },
      ctaText: {
        en: "Usufruct Consultation",
        es: "Asesoría en Usufructo",
      },
      deliverables: {
        en: [
          "Deed of title transfer with lifetime usufruct reservation clause",
          "Registration at the Public Registry Office (ORIP)",
          "Updated title certificate proving lifetime possession protection",
        ],
        es: [
          "Escritura pública de enajenación con reserva formal de usufructo",
          "Radicación e inscripción en la Oficina de Registro de Instrumentos Públicos",
          "Certificado de Tradición con la anotación de protección vitalicia",
        ],
      },
    },
    {
      id: "diag-expat",
      badge: { en: "Expat Asset Shield", es: "Protección Expat" },
      title: {
        en: "Expat with Colombian Assets Seeking Protection?",
        es: "¿Extranjero con activos buscando protección en Colombia?",
      },
      desc: {
        en: "Align your foreign wills and living trusts with Colombian real estate. Avoid 1-to-2 year Supreme Court exequátur delays through direct Colombian structures.",
        es: "Armoniza tus testamentos foráneos o trusts de EE.UU./Canadá con tus propiedades en Colombia para evitar juicios de homologación (exequátur) de años.",
      },
      ctaText: {
        en: "Protect Assets in Colombia",
        es: "Proteger Mi Patrimonio en Colombia",
      },
      deliverables: {
        en: [
          "Cross-border legal audit of foreign vs. Colombian succession rules",
          "Civil Trust (Fiducia Civil) or dedicated local will drafting",
          "Official sworn translations and apostilles coordination",
        ],
        es: [
          "Diagnóstico cruzado de normas sucesorales de tu país de origen y Colombia",
          "Constitución de Fiducia Civil o testamento local para bienes colombianos",
          "Coordinación de traducciones oficiales certificadas y apostillas",
        ],
      },
    },
    {
      id: "diag-directives",
      badge: { en: "Advance Directives", es: "Voluntades Previas" },
      title: {
        en: "Medical & Healthcare Decision Directives?",
        es: "¿Directivas anticipadas y decisiones de salud futuras?",
      },
      desc: {
        en: "Formal legal directives instructing doctors and family regarding palliative care, refusal of extraordinary treatments, and emergency asset powers.",
        es: "Documento legal de voluntades anticipadas protocolizado ante Notario para instrucciones médicas, cuidados paliativos y apoderamiento patrimonial urgente.",
      },
      ctaText: {
        en: "Register Advance Directives",
        es: "Registrar Directivas Anticipadas",
      },
      deliverables: {
        en: [
          "Statutory Advance Directive document under Colombian Ministry of Health regulations",
          "Designation of medical proxy and emergency durable attorney",
          "Protocolization before a Medellín Notary Public with authenticated copies",
        ],
        es: [
          "Minuta formal de documento de voluntad anticipada según normativa del MinSalud",
          "Designación formal de apoderado para decisiones de salud y cuidado",
          "Escritura notarial y entrega de copias auténticas para entidades médicas",
        ],
      },
    },
  ];

  const ROADMAP_STEPS = [
    {
      step: "01",
      title: {
        en: "Asset & Family Assessment",
        es: "Diagnóstico Patrimonial y Familiar",
      },
      desc: {
        en: "We review your properties, corporate shares, bank accounts, family tree, and succession objectives with strict confidentiality.",
        es: "Revisamos tu inventario de bienes inmuebles, participaciones societarias, cuentas, árbol genealógico y metas familiares con absoluta confidencialidad.",
      },
    },
    {
      step: "02",
      title: {
        en: "Legal Strategy Design",
        es: "Diseño de la Estrategia Legal",
      },
      desc: {
        en: "We select the optimal legal vehicle: formal will, civil trust (Fiducia Civil), or usufruct transfer, calculating statutory forced shares.",
        es: "Elegimos el vehículo óptimo: testamento solemne, fiducia civil o reserva de usufructo, calculando con rigor las legítimas y porciones de libre disposición.",
      },
    },
    {
      step: "03",
      title: {
        en: "Drafting & Compliance Audit",
        es: "Redacción y Auditoría de Documentos",
      },
      desc: {
        en: "We draft bilingual contractual and notarial deeds ensuring 100% enforceability and zero ambiguity under the Colombian Civil Code.",
        es: "Elaboramos las minutas notariales y contratos fiduciarios bilingües asegurando total blindaje contra futuras impugnaciones judiciales.",
      },
    },
    {
      step: "04",
      title: {
        en: "Notary Execution & Registration",
        es: "Firma Notarial y Registro",
      },
      desc: {
        en: "We accompany you to the Notary Public for execution, coordinate witnesses, and ensure proper registration in public title records.",
        es: "Te acompañamos presencialmente a la firma en Notaría, coordinamos los testigos requeridos y gestionamos la inscripción en la Oficina de Registro.",
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
        <div className="pointer-events-none absolute -left-20 bottom-0 size-72 rounded-full bg-[#16345F]/10 blur-3xl" />

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            {/* Mint Green #00AA81 over Navy #16345F badge */}
            <span className="rounded-full bg-[#16345F] text-[#00AA81] border border-[#00AA81]/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider shadow-xs">
              Estate Planning & Asset Protection
            </span>
            <span className="rounded-full bg-[#16345F]/5 dark:bg-white/10 px-3 py-1 text-xs font-semibold text-[#16345F] dark:text-gray-200">
              {lang === "en"
                ? "Lead Counsel: María Fernanda Duarte & Ana María Muñoz"
                : "Abogadas Líderes: María Fernanda Duarte y Ana María Muñoz"}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#16345F] dark:text-white leading-[1.1]">
            {lang === "en"
              ? "Prepare Your Legacy for the Future and Protect What Matters Most"
              : "Prepara tu patrimonio para el futuro y protege a quienes más amas"}
          </h1>

          <p className="text-base sm:text-lg text-[#706F6F] dark:text-gray-300 leading-relaxed max-w-3xl">
            {lang === "en"
              ? "Transparent, forward-thinking estate planning in Colombia to safeguard your assets and ensure your exact wishes are honored."
              : "Estructuración legal anticipada, transparente y sin burocracia para proteger tus activos en Colombia y garantizar que tu voluntad se cumpla punto por punto."}
          </p>

          {/* Service Overview Description */}
          <div className="space-y-4 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed border-t border-[#16345F]/10 dark:border-white/10 pt-4 max-w-3xl">
            {lang === "en" ? (
              <>
                <p className="font-semibold text-[#16345F] dark:text-white">
                  Putting your legal affairs in order is not about the end of life—it is a responsible, forward-thinking strategic decision to protect hard-earned assets and prevent painful probate disputes among loved ones.
                </p>
                <p>
                  Under Colombian civil law, succession is strictly structured around statutory forced-heirship rules (legítimas rigurosas) and free-disposition quotas. We design comprehensive estate plans incorporating formal solemn wills (open and closed), civil trusts (Fiducias Civiles / patrimonios autónomos), lifetime usufruct rights (Nuda Propiedad), and advance healthcare directives. Our firm handles the entire notary coordination and registry process.
                </p>
              </>
            ) : (
              <>
                <p className="font-semibold text-[#16345F] dark:text-white">
                  La planeación patrimonial no es una decisión para el final de la vida, sino un acto responsable y estratégico para blindar los bienes que tanto esfuerzo costaron construir y evitar dolorosos litigios sucesorios entre seres queridos.
                </p>
                <p>
                  En Colombia, las herencias se rigen por las reglas estrictas de orden sucesoral del Código Civil, dividiendo el patrimonio entre legítimas rigurosas y la porción de libre disposición. En Capital M Law diseñamos estrategias integrales mediante testamentos solemnes (abiertos y cerrados), fideicomisos (patrimonios autónomos y fiducias civiles), transferencias con reserva de usufructo vitalicio y directivas anticipadas de salud, acompañando toda la gestión notarial y registral.
                </p>
              </>
            )}
          </div>

          {/* Quick CTAs in Hero */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#C01072] hover:bg-[#A50E62] text-white font-bold text-sm px-7 py-3.5 rounded-2xl transition shadow-md hover:shadow-lg"
            >
              <Calendar className="size-4" />
              <span>
                {lang === "en"
                  ? "Book Your Estate Planning Consultation · $67 USD"
                  : "Agenda tu Consultoría de Planeación Patrimonial · $67 USD"}
              </span>
              <ChevronRight className="size-4" />
            </a>

            <a
              href={`${WHATSAPP_URL}?text=${encodeURIComponent(
                lang === "en"
                  ? "Hello Capital M Law, I would like to inquire about estate planning and wills in Colombia."
                  : "Hola Capital M Law, me gustaría consultar sobre planeación patrimonial y testamentos en Colombia."
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

      {/* 3. SERVICIOS ESPECÍFICOS & FIGURAS LEGALES (5 Cards) */}
      <section className="space-y-8" id="core-services">
        <div className="space-y-2 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#16345F]/5 dark:bg-white/10 px-3 py-1 text-xs font-bold text-[#16345F] dark:text-[#9BB8E0]">
            <Layers className="size-3.5" />
            {lang === "en" ? "Estate Structuring Vehicles" : "Servicios Específicos & Figuras Legales"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#16345F] dark:text-white">
            {lang === "en"
              ? "Core Estate Planning Services & Instruments"
              : "Figuras Jurídicas de Protección Patrimonial"}
          </h2>
          <p className="text-sm text-[#706F6F] dark:text-gray-300">
            {lang === "en"
              ? "Tailored civil mechanisms under Colombian law to secure your properties, investments, and healthcare autonomy."
              : "Instrumentos jurídicos del derecho civil colombiano para blindar tus inmuebles, inversiones y voluntades personales."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CORE_SERVICES.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.id}
                className={cn(
                  "rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0F1E35] p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-4",
                  idx === 0 && "lg:col-span-2"
                )}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="size-10 rounded-xl bg-[#00AA81]/15 text-[#00AA81] flex items-center justify-center">
                      <Icon className="size-5" />
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 dark:bg-white/10 text-[#C01072] dark:text-[#F472B6] px-2.5 py-1 rounded-full">
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
                    <span>{lang === "en" ? "Consult on this instrument" : "Consultar esta figura"}</span>
                    <ChevronRight className="size-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. SECCIÓN INTERACTIVA: ¿POR DÓNDE EMPEZAR? / INTERACTIVE DIAGNOSTIC */}
      <section className="space-y-8" id="where-to-start">
        <div className="space-y-2 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#00AA81]/10 text-[#00AA81] px-3 py-1 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="size-3.5" />
            {lang === "en" ? "Personalized Guidance" : "Ruta Personalizada"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#16345F] dark:text-white">
            {lang === "en" ? "Where Would You Like to Start?" : "¿Por dónde empezar?"}
          </h2>
          <p className="text-sm text-[#706F6F] dark:text-gray-300">
            {lang === "en"
              ? "Select your current estate priority to see our tailored legal deliverables, timeline, and actions."
              : "Selecciona tu prioridad patrimonial actual para conocer la ruta notarial, entregables y tiempos."}
          </p>
        </div>

        {/* 4 Cards Selector Grid */}
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
                    {lang === "en" ? "Explore path" : "Ver detalles"}
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
                {lang === "en" ? "Capital M Law Key Deliverables:" : "Entregables Clave de Capital M Law:"}
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

      {/* 5. ROADMAP (4 PASOS) */}
      <section className="space-y-8" id="roadmap">
        <div className="space-y-2 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#16345F]/5 dark:bg-white/10 px-3 py-1 text-xs font-bold text-[#16345F] dark:text-[#9BB8E0]">
            <Clock className="size-3.5" />
            {lang === "en" ? "Step-by-Step Execution" : "Cronograma de Ejecución"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#16345F] dark:text-white">
            {lang === "en"
              ? "Roadmap: 4 Steps to Secure Your Legacy"
              : "Roadmap: 4 Pasos Hacia tu Legado Blindado"}
          </h2>
          <p className="text-sm text-[#706F6F] dark:text-gray-300">
            {lang === "en"
              ? "From initial family profiling to the final execution of deeds before the Public Notary."
              : "Desde el diagnóstico de bienes hasta la protocolización definitiva ante Notaría pública."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ROADMAP_STEPS.map((st) => (
            <div
              key={st.step}
              className="rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0F1E35] p-6 shadow-xs flex flex-col justify-between space-y-4"
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
                <span>{lang === "en" ? "Guaranteed Compliance" : "Blindaje Notarial"}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FORMULARIO DE INTAKE & CANALES DIRECTOS (YOUTUBE + WHATSAPP) */}
      <section className="rounded-3xl border border-[#16345F]/15 dark:border-white/10 bg-white dark:bg-[#0F1E35] p-6 sm:p-10 lg:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Context & Direct Channels (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#00AA81]/10 text-[#00AA81] px-3 py-1 text-xs font-bold uppercase tracking-wider">
              <UserCheck className="size-3.5" />
              {lang === "en" ? "Confidential Intake" : "Evaluación Patrimonial"}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#16345F] dark:text-white">
              {lang === "en"
                ? "Structure Your Legacy with Peace of Mind & Full Control"
                : "Estructura tu legado con tranquilidad y control"}
            </h3>
            <p className="text-xs sm:text-sm text-[#706F6F] dark:text-gray-300 leading-relaxed">
              {lang === "en"
                ? "Share your estate goals confidentially. Every inquiry is reviewed by our founding attorneys under Colombian Attorney-Client Privilege."
                : "Comparte tus metas patrimoniales de forma confidencial. Toda la información es revisada directamente por nuestras abogadas bajo el Secreto Profesional."}
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
                    {lang === "en" ? "Direct Legal Consultation" : "Atención Inmediata por WhatsApp"}
                  </p>
                  <p className="text-sm font-extrabold text-[#16345F] dark:text-white">
                    +57 314 602 2411
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
                    {lang === "en" ? "Official YouTube Legal Guides" : "Canal Oficial de YouTube"}
                  </p>
                  <p className="text-sm font-extrabold text-[#16345F] dark:text-white">
                    @capitalemelaw Guides
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
                {lang === "en" ? "Inquiry Received" : "Solicitud Recibida con Éxito"}
              </h4>
              <p className="text-xs sm:text-sm text-[#706F6F] dark:text-gray-300 max-w-md mx-auto">
                {lang === "en"
                  ? "Thank you. Our estate planning department will review your details and reach out within 24 business hours. You can also book immediately on Calendly."
                  : "Gracias. Nuestro departamento de planeación patrimonial revisará la información y se comunicará en un plazo máximo de 24 horas hábiles."}
              </p>
              <div className="pt-2">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#C01072] text-white font-bold text-xs px-5 py-3 rounded-xl shadow-xs"
                >
                  <Calendar className="size-4" />
                  <span>{lang === "en" ? "Fast-Track via Calendly" : "Agendar en Calendly"}</span>
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
                  placeholder={lang === "en" ? "e.g. Robert Smith or Clara Restrepo" : "Ej. Roberto Silva o Clara Restrepo"}
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

              {/* Field 3: Estate Planning Vehicle of Interest */}
              <div>
                <label className="block text-xs font-bold text-[#16345F] dark:text-gray-200 mb-1">
                  {lang === "en" ? "Estate Vehicle of Interest *" : "Figura Jurídica de Interés *"}
                </label>
                <select
                  value={formData.vehicle}
                  onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#0F1E35] border border-gray-200 dark:border-white/10 text-xs sm:text-sm text-[#16345F] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00AA81]"
                >
                  <option value="will">
                    {lang === "en" ? "Formal Solemn Will (Testamento Notarial)" : "Testamento Solemne Notarial (Abierto/Cerrado)"}
                  </option>
                  <option value="trust">
                    {lang === "en" ? "Civil Trust (Fiducia Civil - Avoid Probate)" : "Fideicomiso / Fiducia Civil (Sin Sucesión)"}
                  </option>
                  <option value="usufruct">
                    {lang === "en" ? "Usufruct Rights & Bare Ownership Transfer" : "Reserva de Usufructo y Nuda Propiedad"}
                  </option>
                  <option value="directives">
                    {lang === "en" ? "Advance Healthcare Directives (Living Will)" : "Directivas Anticipadas (Voluntades Médicas)"}
                  </option>
                  <option value="cross-border">
                    {lang === "en" ? "Cross-Border Expat Estate Harmonization" : "Planeación Patrimonial Transfronteriza (Expats)"}
                  </option>
                </select>
              </div>

              {/* Field 4: Estate Planning Goals */}
              <div>
                <label className="block text-xs font-bold text-[#16345F] dark:text-gray-200 mb-1">
                  {lang === "en" ? "Estate Planning Goals *" : "Objetivo Patrimonial *"}
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder={
                    lang === "en"
                      ? "Briefly describe your Colombian assets (real estate, accounts) and your family protection goals..."
                      : "Describe brevemente tus bienes en Colombia (inmuebles, cuentas) y qué deseas proteger..."
                  }
                  value={formData.goals}
                  onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#0F1E35] border border-gray-200 dark:border-white/10 text-xs sm:text-sm text-[#16345F] dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00AA81]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#16345F] hover:bg-[#C01072] text-white font-bold text-xs sm:text-sm py-3.5 rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="size-4" />
                <span>{lang === "en" ? "Submit Confidential Inquiry" : "Enviar Solicitud Confidencial"}</span>
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
