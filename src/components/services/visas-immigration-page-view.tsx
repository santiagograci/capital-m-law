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
  Laptop,
  TrendingUp,
  GraduationCap,
  Briefcase,
  Building2,
  Landmark,
  Heart,
  Baby,
  Globe2,
  ShieldAlert,
  AlertTriangle,
  Scale,
  Award,
  Layers,
  ArrowRight,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const CALENDLY_URL = "https://calendly.com/capital-m-law-";
export const WHATSAPP_URL = "https://wa.me/573146022411";

interface VisaItem {
  id: string;
  name: { en: string; es: string };
  tag: { en: string; es: string };
  icon: React.ComponentType<{ className?: string }>;
  description: { en: string; es: string };
  requirements: { en: string[]; es: string[] };
}

interface VisaCategory {
  id: "v" | "m" | "r";
  name: { en: string; es: string };
  badge: { en: string; es: string };
  description: { en: string; es: string };
  items: VisaItem[];
}

const VISA_CATEGORIES: VisaCategory[] = [
  {
    id: "v",
    name: {
      en: "Visitor Visas (Type V)",
      es: "Visas de Visitante (Tipo V)",
    },
    badge: {
      en: "Short & Medium Term Stays",
      es: "Estancias Cortas y Medianas",
    },
    description: {
      en: "Designed for foreign nationals visiting Colombia for remote work, passive income, accredited study, or short-term business ventures without direct Colombian employment.",
      es: "Diseñadas para extranjeros que ingresan al país por trabajo remoto, rentas pasivas, estudios académicos o gestiones comerciales breves sin vinculación laboral directa en Colombia.",
    },
    items: [
      {
        id: "digital-nomad",
        name: { en: "Digital Nomad", es: "Nómada Digital" },
        tag: { en: "Remote Work", es: "Trabajo Remoto" },
        icon: Laptop,
        description: {
          en: "Designed for remote workers and freelancers employed by or providing digital services to companies strictly outside Colombia.",
          es: "Diseñada para remotos que trabajan para empresas o clientes ubicados fuera de Colombia.",
        },
        requirements: {
          en: [
            "Valid passport (minimum 6 months validity)",
            "Bank statements showing required minimum monthly income threshold",
            "Employer confirmation letter or remote service contract proving foreign employment",
          ],
          es: [
            "Pasaporte vigente con al menos 6 meses de validez",
            "Extractos bancarios que demuestren los ingresos mínimos requeridos",
            "Carta de la empresa o contrato de servicios remoto que acredite la actividad laboral en el exterior",
          ],
        },
      },
      {
        id: "rentier-pensioner",
        name: { en: "Rentier / Pensioner", es: "Rentista / Pensionado" },
        tag: { en: "Passive Income", es: "Ingresos Pasivos" },
        icon: TrendingUp,
        description: {
          en: "For foreign nationals receiving verifiable passive income (dividends, real estate leases abroad, royalties) or an official retirement pension.",
          es: "Para quienes reciben ingresos pasivos o pensión formal en el exterior.",
        },
        requirements: {
          en: [
            "Valid passport and civil status documents",
            "Official certification of pension or verified passive income meeting the minimum monthly legal threshold",
            "Apostilled and officially translated income verification certificates",
          ],
          es: [
            "Pasaporte vigente y documentos de identidad",
            "Certificación oficial de pensión o ingresos por rentas probadas que cumplan el monto mínimo mensual",
            "Documentos de sustento financiero debidamente apostillados y traducidos",
          ],
        },
      },
      {
        id: "student",
        name: { en: "Student", es: "Estudiante" },
        tag: { en: "Academic & Language", es: "Académico y Español" },
        icon: GraduationCap,
        description: {
          en: "For formal undergraduate, postgraduate academic programs, or accredited Spanish language immersion courses in Colombia.",
          es: "Para programas académicos formales o cursos de español en instituciones acreditadas.",
        },
        requirements: {
          en: [
            "Valid passport",
            "Certificate of admission or enrollment in an accredited Colombian institution",
            "School credentials & certification of legal constitution",
            "Demonstration of financial means (self-funded or sponsored)",
          ],
          es: [
            "Pasaporte vigente",
            "Certificado de admisión expedido por la institución educativa colombiana",
            "Certificación de la institución y personería jurídica",
            "Demostración de solvencia económica propia o mediante patrocinador",
          ],
        },
      },
      {
        id: "business",
        name: { en: "Business / Commercial", es: "Negocios / Trámites Comerciales" },
        tag: { en: "Corporate Visits", es: "Gestión Corporativa" },
        icon: Briefcase,
        description: {
          en: "For short-term corporate visits, business meetings, trade exploration, or pre-investment market research.",
          es: "Para gestiones corporativas breves o prospección de mercado.",
        },
        requirements: {
          en: [
            "Valid passport",
            "Formal invitation letter from an established Colombian entity",
            "Letter from the home company confirming corporate backing and trip purpose",
          ],
          es: [
            "Pasaporte vigente",
            "Carta de la empresa de origen o invitación formal de una sociedad colombiana",
            "Justificación comercial y respaldo económico del viaje",
          ],
        },
      },
    ],
  },
  {
    id: "m",
    name: {
      en: "Migrant Visas (Type M)",
      es: "Visas de Migrante (Tipo M)",
    },
    badge: {
      en: "Residency & Long-Term Pathway",
      es: "Residencia y Largo Plazo",
    },
    description: {
      en: "Issued for up to 3 years. These visas allow foreign nationals to settle, invest, work, or build a family in Colombia, paving the way toward permanent residency.",
      es: "Vigencia de hasta 3 años. Permiten asentarse, invertir, trabajar formalmente o formar una familia en Colombia, constituyendo el camino directo a la residencia permanente.",
    },
    items: [
      {
        id: "real-estate-investment",
        name: { en: "Real Estate Investment", es: "Inversión Inmobiliaria" },
        tag: { en: "Property Ownership", es: "Propiedad Raíz" },
        icon: Building2,
        description: {
          en: "Granted upon purchasing residential or commercial real estate in Colombia in your personal name.",
          es: "Otorgada por la compra de bienes inmuebles a título personal en Colombia.",
        },
        requirements: {
          en: [
            "Title certificate (Certificado de Libertad y Tradición) issued within 30 days",
            "Official Foreign Direct Investment (FDI) registration with Banco de la República (Form 4)",
            "Public deed (Escritura Pública) proving property acquisition value exceeds minimum wage thresholds",
          ],
          es: [
            "Certificado de Libertad y Tradición vigente que acredite la propiedad",
            "Registro del canal de inversión extranjera directa ante el Banco de la República (Formulario cambiario)",
            "Escritura pública de compraventa que cumpla con los montos mínimos legales en salarios mínimos",
          ],
        },
      },
      {
        id: "corporate-investment",
        name: { en: "Corporate Investment", es: "Inversión en Sociedad" },
        tag: { en: "Business Incorporation", es: "Empresas & Acciones" },
        icon: Landmark,
        description: {
          en: "For foreign entrepreneurs and investors incorporating a company (SAS) or purchasing shares in a Colombian corporation.",
          es: "Para quienes constituyen o compran acciones en una empresa colombiana.",
        },
        requirements: {
          en: [
            "Incorporation documents and updated Cámara de Comercio certificate",
            "Official shareholding structure certified by CPA (Contador Público)",
            "Foreign Direct Investment (FDI) registration with Banco de la República",
          ],
          es: [
            "Documentos constitutivos de la empresa y Certificado de Cámara de Comercio",
            "Certificación de composición accionaria y capital suscrito firmada por contador público",
            "Registro de la inversión extranjera directa ante el Banco de la República",
          ],
        },
      },
      {
        id: "spouse-partner",
        name: {
          en: "Marriage / Marriage-like Union",
          es: "Cónyuge o Compañero Permanente",
        },
        tag: { en: "Family Reunification", es: "Familia con Colombiano" },
        icon: Heart,
        description: {
          en: "For foreign nationals legally married to or in a registered common-law marriage (Unión Marital de Hecho) with a Colombian citizen.",
          es: "Para extranjeros casados o en unión marital de hecho reconocida legalmente con un nacional colombiano.",
        },
        requirements: {
          en: [
            "Valid Colombian marriage certificate or registered cohabitation deed (Escritura Pública de Unión Marital de Hecho)",
            "Notarized copy of Colombian spouse’s Cédula de Ciudadanía",
            "Comprehensive proof of genuine partnership and ongoing cohabitation",
          ],
          es: [
            "Registro civil de matrimonio o escritura pública de unión marital de hecho",
            "Fotocopia de la cédula del cónyuge colombiano",
            "Prueba fehaciente de convivencia real y proyecto de vida compartido",
          ],
        },
      },
      {
        id: "work-visa",
        name: { en: "Work Visa", es: "Trabajador" },
        tag: { en: "Direct Employment", es: "Vinculación Laboral" },
        icon: UserCheck,
        description: {
          en: "For direct employment with a registered Colombian company or institution under a formal labor contract.",
          es: "Vinculación laboral directa con un empleador o empresa colombiana.",
        },
        requirements: {
          en: [
            "Formal employment contract signed by employer and employee",
            "Proof of professional candidate qualification, diplomas, or experience",
            "Corporate financial records and tax compliance justifications of the hiring company",
          ],
          es: [
            "Contrato de trabajo formal firmado por ambas partes",
            "Idoneidad profesional del candidato (títulos convalidados o experiencia comprobable)",
            "Justificación de estados financieros y capacidad económica de la empresa contratante",
          ],
        },
      },
      {
        id: "parent-colombian",
        name: { en: "Parent of a Colombian National", es: "Padre/Madre de Nacional Colombiano" },
        tag: { en: "Paternity / Maternity", es: "Paternidad / Maternidad" },
        icon: Baby,
        description: {
          en: "For foreign parents whose children were born in Colombia or hold Colombian nationality.",
          es: "Para padres extranjeros con hijos de nacionalidad colombiana.",
        },
        requirements: {
          en: [
            "Official birth certificate (Registro Civil de Nacimiento) of the Colombian child proving parentage",
            "Valid passport of the foreign parent",
            "Declaration of fulfillment of parental support obligations",
          ],
          es: [
            "Registro civil de nacimiento del hijo(a) colombiano(a) que acredite la paternidad/maternidad",
            "Pasaporte vigente del progenitor solicitante",
            "Constancia de cumplimiento de obligaciones alimentarias y cuidado",
          ],
        },
      },
      {
        id: "mercosur",
        name: { en: "Mercosur", es: "Mercosur" },
        tag: { en: "Regional Agreement", es: "Tratado Regional" },
        icon: Globe2,
        description: {
          en: "Available for citizens of Mercosur member and associate states (Argentina, Brazil, Paraguay, Uruguay, Chile, Bolivia, Peru, Ecuador).",
          es: "Para ciudadanos de los países miembros o asociados del bloque Mercosur.",
        },
        requirements: {
          en: [
            "Valid passport from a qualifying Mercosur member or associate country",
            "Apostilled criminal background check from the country of origin or residency",
            "Proof of legal entry into Colombia",
          ],
          es: [
            "Pasaporte vigente de un país miembro o asociado de Mercosur",
            "Certificado de antecedentes penales debidamente apostillado del país de origen",
            "Sello o prueba de ingreso regular al territorio nacional",
          ],
        },
      },
    ],
  },
  {
    id: "r",
    name: {
      en: "Resident Visas (Type R)",
      es: "Visas de Residente (Tipo R)",
    },
    badge: {
      en: "Permanent Residency Status",
      es: "Residencia Permanente",
    },
    description: {
      en: "The highest permanent immigration category in Colombia, providing indefinite residency, full work authorization, and a direct path to citizenship.",
      es: "La máxima categoría migratoria permanente en Colombia. Concede residencia indefinida, permiso abierto de trabajo y el camino directo a la nacionalidad por adopción.",
    },
    items: [
      {
        id: "accumulated-time",
        name: { en: "Accumulated Time", es: "Por Tiempo Acumulado" },
        tag: { en: "Continuous Tenure", es: "Permanencia Continua" },
        icon: Award,
        description: {
          en: "For holders of Type M visas who have completed the continuous statutory residency period (usually 2 to 5 years depending on the category) without extensive absences.",
          es: "Para titulares de visas M que hayan completado el tiempo de permanencia requerido sin interrupciones prolongadas.",
        },
        requirements: {
          en: [
            "Proof of continuous, uninterrupted holding of prior Type M visa(s)",
            "Valid salvoconductos and immigration movement certificate (Certificado de Movimientos Migratorios)",
            "Updated financial documentation demonstrating sustained economic solvency",
          ],
          es: [
            "Demostración del tiempo de permanencia continuo con la visa anterior de Tipo M",
            "Salvoconductos al día y Certificado de Movimientos Migratorios expedido por Migración Colombia",
            "Cumplimiento de requisitos económicos actualizados según la categoría de origen",
          ],
        },
      },
    ],
  },
];

export function VisasImmigrationPageView() {
  const [lang, setLang] = useState<"en" | "es">("es");
  const [activeCategoryId, setActiveCategoryId] = useState<"v" | "m" | "r">("v");
  const [activeVisaIndex, setActiveVisaIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<"interactive" | "grid">("interactive");

  const activeCategory =
    VISA_CATEGORIES.find((c) => c.id === activeCategoryId) || VISA_CATEGORIES[0];
  const activeVisa = activeCategory.items[activeVisaIndex] || activeCategory.items[0];

  const handleSelectCategory = (catId: "v" | "m" | "r") => {
    setActiveCategoryId(catId);
    setActiveVisaIndex(0);
  };

  const handlePrevVisa = () => {
    setActiveVisaIndex((prev) =>
      prev === 0 ? activeCategory.items.length - 1 : prev - 1
    );
  };

  const handleNextVisa = () => {
    setActiveVisaIndex((prev) =>
      prev === activeCategory.items.length - 1 ? 0 : prev + 1
    );
  };

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
        <div className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-[#9BB8E0]/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 size-72 rounded-full bg-[#C01072]/10 blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6 text-center flex flex-col items-center">
          <div className="flex flex-wrap justify-center items-center gap-2">
            <span className="rounded-full bg-[#C01072]/10 dark:bg-[#C01072]/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#C01072] dark:text-[#F472B6]">
              {lang === "en"
                ? "Visas & Immigration Practice"
                : "Visas e Inmigración"}
            </span>
            <span className="rounded-full bg-[#16345F]/5 dark:bg-white/10 px-3 py-1 text-xs font-semibold text-[#16345F] dark:text-gray-200">
              {lang === "en"
                ? "Lead Attorneys: María Fernanda Duarte & Ana María Muñoz"
                : "Abogadas Líderes: María Fernanda Duarte y Ana María Muñoz"}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#16345F] dark:text-white leading-[1.1] text-center">
            {lang === "en"
              ? "Strategic Immigration Counsel for Your Move or Investment in Colombia"
              : "Estrategia legal para tu nueva vida o inversión en Colombia"}
          </h1>

          {/* 4 Official Overview Paragraphs */}
          <div className="space-y-4 text-base sm:text-lg text-[#706F6F] dark:text-gray-300 leading-relaxed max-w-3xl mx-auto text-center pt-2">
            {lang === "en" ? (
              <>
                <p className="font-semibold text-[#16345F] dark:text-white">
                  At Capital M, we do more than fill out forms on a portal. We design comprehensive immigration strategies for individuals, families, and businesses looking to settle or invest in Colombia.
                </p>
                <p>
                  Whether you plan to live in Colombia as a digital nomad, student, or retiree, or build a home with a Colombian spouse, we structure every detail of your application to maximize approval chances right from the start.
                </p>
                <p>
                  We analyze your current immigration status to set clear timelines, secure salvoconductos, expedite your Cédula de Extranjería, or craft a roadmap toward permanent residency. We thoroughly audit your documents and immigration history, keeping you informed and representing you before the Ministry of Foreign Affairs whenever additional requirements arise.
                </p>
                <p>
                  To ensure a seamless experience, we partner with trusted, fast-turnaround providers for translations, apostilles, and notarizations. We anticipate potential roadblocks and provide in-person support at Migración Colombia whenever necessary. You will never have to navigate this process alone or unprepared.
                </p>
              </>
            ) : (
              <>
                <p className="font-semibold text-[#16345F] dark:text-white">
                  En Capital M no nos limitamos a llenar formularios en una plataforma. Diseñamos estrategias migratorias integrales para personas, familias y empresas que buscan establecerse o hacer negocios en Colombia.
                </p>
                <p>
                  Tanto si tu plan incluye vivir en el país como nómada digital, estudiante o rentista, o si estás formando un hogar con tu pareja colombiana, estructuramos cada paso de tu solicitud para maximizar la posibilidad de aprobación desde el primer momento.
                </p>
                <p>
                  Analizamos a fondo tu estatus legal actual para anticipar tiempos, gestionar salvoconductos, tramitar tu Cédula de Extranjería o trazar el camino más claro hacia la residencia permanente. Revisamos meticulosamente cada documento de tu historial y perfil migratorio, acompañándote y respondiendo ante la Cancillería en cada requerimiento.
                </p>
                <p>
                  Para asegurar un proceso ágil y sin contratiempos, trabajamos con una red de aliados estratégicos (traducción, apostillas y notariado) de rápida entrega. Además, nos anticipamos a cualquier eventualidad y te acompañamos presencialmente a tus citas en Migración Colombia cuando sea necesario. Nunca vas a atravesar este proceso a ciegas o en soledad.
                </p>
              </>
            )}
          </div>

          {/* Quick Metrics & Trust Badges */}
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[#16345F]/10 dark:border-white/10 w-full max-w-3xl mx-auto text-left">
            <div className="flex items-center gap-3">
              <span className="size-10 rounded-xl bg-[#16345F]/5 dark:bg-white/5 flex items-center justify-center text-[#16345F] dark:text-[#9BB8E0]">
                <Clock className="size-5" />
              </span>
              <div>
                <p className="text-[11px] font-bold uppercase text-[#706F6F] dark:text-gray-400">
                  {lang === "en" ? "Cancillería Processing" : "Trámite Cancillería"}
                </p>
                <p className="text-sm font-bold text-[#16345F] dark:text-white">
                  {lang === "en" ? "15 to 30 Business Days" : "15 a 30 Días Hábiles"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="size-10 rounded-xl bg-[#C01072]/10 flex items-center justify-center text-[#C01072]">
                <Calendar className="size-5" />
              </span>
              <div>
                <p className="text-[11px] font-bold uppercase text-[#706F6F] dark:text-gray-400">
                  {lang === "en" ? "Case Evaluation" : "Evaluación de Perfil"}
                </p>
                <p className="text-sm font-bold text-[#C01072] dark:text-[#F472B6]">
                  $67 USD · 45 min
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="size-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600">
                <ShieldCheck className="size-5" />
              </span>
              <div>
                <p className="text-[11px] font-bold uppercase text-[#706F6F] dark:text-gray-400">
                  {lang === "en" ? "In-Person Support" : "Acompañamiento"}
                </p>
                <p className="text-sm font-bold text-[#16345F] dark:text-white">
                  Migración Colombia
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
                  ? "Book Initial Consultation · $67 USD"
                  : "Agenda una consultoría inicial para evaluar tu caso"}
              </span>
              <ChevronRight className="size-4" />
            </a>

            <a
              href={`${WHATSAPP_URL}?text=${encodeURIComponent(
                lang === "en"
                  ? "Hello Capital M Law, I would like to inquire about visa and immigration options for Colombia."
                  : "Hola Capital M Law, quiero consultar sobre las opciones de visa e inmigración para Colombia."
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

      {/* 3. INTERACTIVE VISA CATEGORIES COMPONENT (Tabs / Carousel / Accordion) */}
      <section className="space-y-8" id="visa-categories">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#16345F]/5 dark:bg-white/10 px-3 py-1 text-xs font-bold text-[#16345F] dark:text-[#9BB8E0]">
              <Layers className="size-3.5" />
              {lang === "en" ? "Explore By Category" : "Explora por Categoría"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#16345F] dark:text-white">
              {lang === "en"
                ? "Visa Categories & Key Requirements"
                : "Tipos y Categorías de Visas"}
            </h2>
            <p className="text-sm text-[#706F6F] dark:text-gray-300">
              {lang === "en"
                ? "Browse Visitor (Type V), Migrant (Type M), and Resident (Type R) visa routes with their core statutory requirements."
                : "Conoce las rutas de Visitante (Tipo V), Migrante (Tipo M) y Residente (Tipo R) con sus requisitos clave ante Cancillería."}
            </p>
          </div>

          {/* View mode toggle: Carousel / Grid */}
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-white/5 p-1 rounded-xl self-start md:self-auto text-xs font-semibold">
            <button
              onClick={() => setViewMode("interactive")}
              className={cn(
                "px-3 py-1.5 rounded-lg transition-all cursor-pointer",
                viewMode === "interactive"
                  ? "bg-white dark:bg-[#16345F] text-[#16345F] dark:text-white shadow-xs font-bold"
                  : "text-[#706F6F] dark:text-gray-400 hover:text-[#16345F]"
              )}
            >
              {lang === "en" ? "Interactive Focus" : "Visor Interactivo"}
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "px-3 py-1.5 rounded-lg transition-all cursor-pointer",
                viewMode === "grid"
                  ? "bg-white dark:bg-[#16345F] text-[#16345F] dark:text-white shadow-xs font-bold"
                  : "text-[#706F6F] dark:text-gray-400 hover:text-[#16345F]"
              )}
            >
              {lang === "en" ? "Show All (Grid)" : "Ver Todas (Cuadrícula)"}
            </button>
          </div>
        </div>

        {/* Level 1: Category Selector Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {VISA_CATEGORIES.map((cat) => {
            const isSelected = cat.id === activeCategoryId;
            return (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(cat.id)}
                className={cn(
                  "p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer relative overflow-hidden",
                  isSelected
                    ? "bg-[#16345F] text-white border-[#16345F] shadow-lg dark:bg-[#0F1E35] dark:border-[#C01072]"
                    : "bg-white dark:bg-[#0F1E35]/60 border-gray-200 dark:border-white/10 hover:border-[#16345F]/30 dark:hover:border-white/20 text-[#16345F] dark:text-white"
                )}
              >
                {isSelected && (
                  <span className="absolute top-0 right-0 w-24 h-24 bg-[#C01072]/20 rounded-full blur-2xl" />
                )}
                <div className="relative z-10 space-y-1">
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        "text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full",
                        isSelected
                          ? "bg-white/20 text-white"
                          : "bg-[#16345F]/10 dark:bg-white/10 text-[#C01072] dark:text-[#F472B6]"
                      )}
                    >
                      {cat.items.length}{" "}
                      {lang === "en" ? "Options" : "Opciones"}
                    </span>
                    <span
                      className={cn(
                        "text-xs font-semibold",
                        isSelected ? "text-[#9BB8E0]" : "text-[#706F6F] dark:text-gray-400"
                      )}
                    >
                      {cat.badge[lang]}
                    </span>
                  </div>
                  <h3 className="text-lg font-black tracking-tight">{cat.name[lang]}</h3>
                </div>
              </button>
            );
          })}
        </div>

        {/* Level 2: Interactive Display or Grid Display */}
        {viewMode === "interactive" ? (
          <div className="space-y-6">
            {/* Quick visa item selector bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
              {activeCategory.items.map((item, idx) => {
                const Icon = item.icon;
                const isItemActive = idx === activeVisaIndex;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveVisaIndex(idx)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer border",
                      isItemActive
                        ? "bg-[#C01072] text-white border-[#C01072] shadow-md"
                        : "bg-white dark:bg-[#0F1E35] text-[#16345F] dark:text-gray-300 border-gray-200 dark:border-white/10 hover:border-[#C01072]/50"
                    )}
                  >
                    <Icon className="size-4 shrink-0" />
                    <span>{item.name[lang]}</span>
                  </button>
                );
              })}
            </div>

            {/* Focused Visa Card with Navigation Controls */}
            <div className="relative rounded-3xl border border-[#16345F]/10 dark:border-white/10 bg-white dark:bg-[#0F1E35] p-6 sm:p-10 shadow-lg overflow-hidden">
              <div className="pointer-events-none absolute -top-20 -right-20 size-80 rounded-full bg-[#C01072]/5 dark:bg-[#C01072]/10 blur-3xl" />

              <div className="relative z-10 space-y-8">
                {/* Header of Active Visa */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-white/10 pb-6">
                  <div className="flex items-center gap-4">
                    <span className="size-14 rounded-2xl bg-[#16345F]/5 dark:bg-white/10 flex items-center justify-center text-[#16345F] dark:text-[#9BB8E0] shrink-0 shadow-xs">
                      {React.createElement(activeVisa.icon, { className: "size-7 text-[#C01072] dark:text-[#F472B6]" })}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#C01072] dark:text-[#F472B6]">
                          {activeCategory.name[lang]} · {activeVisa.tag[lang]}
                        </span>
                        <span className="text-xs text-[#706F6F] dark:text-gray-400">
                          ({activeVisaIndex + 1} / {activeCategory.items.length})
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black text-[#16345F] dark:text-white">
                        {activeVisa.name[lang]}
                      </h3>
                    </div>
                  </div>

                  {/* Prev / Next controls */}
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={handlePrevVisa}
                      aria-label="Previous Visa"
                      className="size-10 rounded-xl border border-gray-200 dark:border-white/10 flex items-center justify-center text-[#16345F] dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition cursor-pointer"
                    >
                      <ChevronLeft className="size-5" />
                    </button>
                    <button
                      onClick={handleNextVisa}
                      aria-label="Next Visa"
                      className="size-10 rounded-xl border border-gray-200 dark:border-white/10 flex items-center justify-center text-[#16345F] dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition cursor-pointer"
                    >
                      <ChevronRight className="size-5" />
                    </button>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#706F6F] dark:text-gray-400">
                    {lang === "en" ? "Category Overview & Scope" : "Descripción General del Trámite"}
                  </h4>
                  <p className="text-base sm:text-lg text-[#16345F] dark:text-gray-200 leading-relaxed font-medium">
                    {activeVisa.description[lang]}
                  </p>
                </div>

                {/* Key Requirements Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <FileText className="size-4 text-[#C01072]" />
                    <h4 className="text-sm font-extrabold uppercase tracking-wider text-[#16345F] dark:text-white">
                      {lang === "en" ? "Key Statutory Requirements" : "Requisitos Clave"}
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {activeVisa.requirements[lang].map((req, rIdx) => (
                      <div
                        key={rIdx}
                        className="rounded-2xl border border-gray-200/80 dark:border-white/10 bg-[#FAFBFD] dark:bg-white/[0.02] p-4 flex items-start gap-3 shadow-2xs"
                      >
                        <span className="size-6 rounded-full bg-[#C01072]/10 dark:bg-[#C01072]/20 flex items-center justify-center text-[#C01072] dark:text-[#F472B6] shrink-0 mt-0.5">
                          <Check className="size-3.5" />
                        </span>
                        <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 leading-snug">
                          {req}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contextual Action for this visa */}
                <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 dark:border-white/10">
                  <div className="flex items-center gap-2 text-xs text-[#706F6F] dark:text-gray-400">
                    <ShieldCheck className="size-4 text-[#16345F] dark:text-[#9BB8E0]" />
                    <span>
                      {lang === "en"
                        ? "Full document audit & translation chain verification included."
                        : "Incluye auditoría documental y coordinación de cadena de traducción y apostilla."}
                    </span>
                  </div>

                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#16345F] hover:bg-[#C01072] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition shadow-xs"
                  >
                    <Calendar className="size-4" />
                    <span>
                      {lang === "en"
                        ? `Evaluate ${activeVisa.name.en} Eligibility · $67 USD`
                        : `Evaluar Elegibilidad para ${activeVisa.name.es} · $67 USD`}
                    </span>
                    <ChevronRight className="size-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Grid View Mode */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeCategory.items.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0F1E35] p-6 shadow-sm flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="size-11 rounded-2xl bg-[#C01072]/10 text-[#C01072] flex items-center justify-center">
                        <Icon className="size-5" />
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#706F6F] dark:text-gray-400 bg-gray-100 dark:bg-white/10 px-2.5 py-1 rounded-full">
                        {item.tag[lang]}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-[#16345F] dark:text-white">
                        {item.name[lang]}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#706F6F] dark:text-gray-300 mt-2 leading-relaxed">
                        {item.description[lang]}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-white/5">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#16345F] dark:text-gray-200">
                        {lang === "en" ? "Key Requirements:" : "Requisitos Clave:"}
                      </p>
                      <ul className="space-y-1.5 text-xs text-gray-700 dark:text-gray-300">
                        {item.requirements[lang].map((req, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#C01072] font-bold">•</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-bold py-2.5 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-[#C01072] hover:text-white dark:hover:bg-[#C01072] text-[#16345F] dark:text-white transition"
                  >
                    <span>{lang === "en" ? "Consult on this visa" : "Consultar este trámite"}</span>
                    <ChevronRight className="size-3.5" />
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 4. COMPLEMENTARY SERVICES & IMMIGRATION DEFENSE */}
      <section className="space-y-8" id="defense-and-bundles">
        <div className="max-w-2xl space-y-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#C01072]/10 dark:bg-[#C01072]/20 px-3 py-1 text-xs font-bold text-[#C01072] dark:text-[#F472B6]">
            <ShieldAlert className="size-3.5" />
            {lang === "en"
              ? "Comprehensive Legal Protection"
              : "Protección Legal Integral"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#16345F] dark:text-white">
            {lang === "en"
              ? "Complementary Legal Services & Immigration Defense"
              : "Servicios Complementarios y Defensa Migratoria"}
          </h2>
          <p className="text-sm text-[#706F6F] dark:text-gray-300">
            {lang === "en"
              ? "Robust defense before Migración Colombia and synchronized legal packages for high-stakes investments and family life."
              : "Defensa jurídica ante Migración Colombia y paquetes combinados para inversiones patrimoniales y trámites de familia."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Card 1: Sanction & Fine Defense (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl border border-amber-300/40 dark:border-amber-500/20 bg-gradient-to-br from-amber-50/50 via-white to-amber-50/20 dark:from-[#1A1813] dark:via-[#0F1E35] dark:to-[#14120D] p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="size-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <ShieldAlert className="size-6" />
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-amber-500/10 text-amber-700 dark:text-amber-300 px-3 py-1 rounded-full">
                  {lang === "en" ? "Urgent Defense" : "Defensa Urgente"}
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-[#16345F] dark:text-white">
                  {lang === "en"
                    ? "Sanction & Fine Defense"
                    : "Representación en Procesos Sancionatorios"}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-3 leading-relaxed">
                  {lang === "en"
                    ? "If you face a fine, an open inquiry, or need to regularize your stay, we provide strong legal defense before Migración Colombia to protect your interests."
                    : "Si enfrentas una multa, un requerimiento o necesitas regularizar tu situación migratoria, defendemos tus intereses ante Migración Colombia con respuestas legales firmes."}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-white/5 border border-amber-200 dark:border-amber-900/30 text-xs space-y-2">
                <p className="font-bold text-[#16345F] dark:text-white flex items-center gap-1.5">
                  <Scale className="size-4 text-amber-600" />
                  {lang === "en" ? "What we handle:" : "Casos que atendemos:"}
                </p>
                <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                  <li>• {lang === "en" ? "Tourist overstay and fine negotiations" : "Exceso de permanencia de turista y reducción de multas"}</li>
                  <li>• {lang === "en" ? "Emergency salvoconductos (SC-1 & SC-2)" : "Salvoconductos de urgencia (SC-1 y SC-2)"}</li>
                  <li>• {lang === "en" ? "Formal appeals and legal briefs" : "Recursos de reposición y apelación formales"}</li>
                </ul>
              </div>
            </div>

            {/* Secondary CTA specifically for defense */}
            <div className="pt-2">
              <a
                href={`${WHATSAPP_URL}?text=${encodeURIComponent(
                  lang === "en"
                    ? "URGENT: I need legal defense for a fine or sanction process with Migración Colombia."
                    : "URGENTE: Necesito defensa legal por una multa o proceso sancionatorio ante Migración Colombia."
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm py-3.5 px-4 rounded-2xl shadow-sm transition"
              >
                <AlertTriangle className="size-4" />
                <span>
                  {lang === "en"
                    ? "Facing a sanction or fine from Migración Colombia? Talk to a lawyer today."
                    : "¿Tienes un proceso sancionatorio o multa en Migración? Habla hoy con un abogado."}
                </span>
              </a>
            </div>
          </div>

          {/* Card 2: Bundled Legal Packages (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl border border-[#16345F]/10 dark:border-white/10 bg-white dark:bg-[#0F1E35] p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="size-12 rounded-2xl bg-[#16345F]/5 dark:bg-white/10 text-[#16345F] dark:text-[#9BB8E0] flex items-center justify-center">
                  <Layers className="size-6 text-[#C01072]" />
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-[#C01072]/10 text-[#C01072] dark:text-[#F472B6] px-3 py-1 rounded-full">
                  {lang === "en" ? "All-In-One Value" : "Paquetes Llave en Mano"}
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-[#16345F] dark:text-white">
                  {lang === "en" ? "Bundled Legal Services" : "Paquetes Legales Integrados"}
                </h3>
                <p className="text-sm text-[#706F6F] dark:text-gray-300 mt-2 leading-relaxed">
                  {lang === "en"
                    ? "Synchronized legal coordination combining transactional corporate and family law with your immigration goals."
                    : "Coordinación legal conjunta que unifica tus negocios inmobiliarios o matrimonio con tu trámite de visa."}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Bundle Item 1 */}
                <div className="rounded-2xl border border-gray-100 dark:border-white/5 bg-[#FAFBFD] dark:bg-white/[0.02] p-5 space-y-2">
                  <div className="flex items-center gap-2 text-[#C01072] font-bold text-sm">
                    <Building2 className="size-4" />
                    <h4>
                      {lang === "en"
                        ? "Real Estate Investment + Visa"
                        : "Inversión + Visa"}
                    </h4>
                  </div>
                  <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                    {lang === "en"
                      ? "Property buying support with pre-purchase due diligence aligned with investor visa requirements."
                      : "Asesoría en compra de propiedad raíz o apertura de empresa con due diligence preventivo incluido."}
                  </p>
                </div>

                {/* Bundle Item 2 */}
                <div className="rounded-2xl border border-gray-100 dark:border-white/5 bg-[#FAFBFD] dark:bg-white/[0.02] p-5 space-y-2">
                  <div className="flex items-center gap-2 text-[#C01072] font-bold text-sm">
                    <Heart className="size-4" />
                    <h4>
                      {lang === "en"
                        ? "Marriage + Spouse Visa"
                        : "Matrimonio + Visa"}
                    </h4>
                  </div>
                  <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                    {lang === "en"
                      ? "Prenuptial agreements, civil marriage representation, and the subsequent spouse visa application."
                      : "Acompañamiento en capitulaciones, matrimonio en notaría y posterior solicitud de visa de cónyuge."}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#16345F] hover:bg-[#C01072] text-white font-bold text-xs sm:text-sm py-3.5 px-4 rounded-2xl transition shadow-xs"
              >
                <Calendar className="size-4" />
                <span>
                  {lang === "en"
                    ? "Book Consultation for Bundled Services · $67 USD"
                    : "Agendar Asesoría para Paquetes Integrados · $67 USD"}
                </span>
                <ChevronRight className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. OUR PROMISE / NUESTRA GARANTÍA */}
      <section className="rounded-3xl border border-[#16345F]/15 dark:border-white/10 bg-[#FAFBFD] dark:bg-[#0F1E35] p-8 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="pointer-events-none absolute -left-12 -bottom-12 size-56 rounded-full bg-[#16345F]/5 dark:bg-white/5 blur-2xl" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="size-16 rounded-2xl bg-[#16345F] text-white flex items-center justify-center shrink-0 shadow-md">
            <ShieldCheck className="size-8 text-[#9BB8E0]" />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-black text-[#16345F] dark:text-white uppercase tracking-wider">
              {lang === "en" ? "Our Professional Promise" : "Nuestra Garantía Profesional"}
            </h3>
            <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200 leading-relaxed italic">
              {lang === "en"
                ? "Our Promise: While no legal firm can guarantee an approval—as final decisions rest with the Colombian government—we guarantee a rigorous audit of your profile, a risk-mitigated strategy, and direct guidance from your legal team every step of the way."
                : "Nuestra garantía: Aunque ninguna firma legal puede prometer una aprobación que depende exclusivamente del gobierno colombiano, sí garantizamos un análisis riguroso de tu perfil, una estrategia clara para mitigar riesgos y el acompañamiento constante de tus abogados en cada etapa."}
            </p>
          </div>
        </div>
      </section>

      {/* 6. HOW WE WORK (4 Steps) */}
      <section className="space-y-8" id="how-we-work">
        <div className="max-w-2xl space-y-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#16345F]/5 dark:bg-white/10 px-3 py-1 text-xs font-bold text-[#16345F] dark:text-[#9BB8E0]">
            <Clock className="size-3.5" />
            {lang === "en" ? "Structured Workflow" : "Flujo Metodológico"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#16345F] dark:text-white">
            {lang === "en" ? "How We Work" : "Cómo Trabajar con Nosotros"}
          </h2>
          <p className="text-sm text-[#706F6F] dark:text-gray-300">
            {lang === "en"
              ? "From initial profiling to your final Cédula de Extranjería in hand."
              : "Desde el perfilamiento estratégico inicial hasta tu Cédula de Extranjería en mano."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: {
                en: "Initial Assessment & Profiling",
                es: "Consultoría Inicial de Perfilamiento",
              },
              desc: {
                en: "We evaluate your current status, immigration history, and short/long-term goals in Colombia.",
                es: "Evaluamos tu situación actual, historial migratorio y metas a corto/largo plazo en Colombia.",
              },
            },
            {
              step: "02",
              title: {
                en: "Strategy & Document Gathering",
                es: "Estrategia y Recolección Documental",
              },
              desc: {
                en: "We establish a precise timeline, issue a customized document checklist, and manage translations and legalizations.",
                es: "Trazamos un cronograma claro, detallamos la lista de documentos requeridos y coordinamos traducciones y legalizaciones.",
              },
            },
            {
              step: "03",
              title: {
                en: "Audit & File Preparation",
                es: "Auditoría y Armado de Expediente",
              },
              desc: {
                en: "We review every document against strict ministry standards to minimize risk of delays or requests.",
                es: "Revisamos que cada documento cumpla estrictamente con los estándares y exigencias de la Cancillería para evitar requerimientos o rechazos.",
              },
            },
            {
              step: "04",
              title: {
                en: "Filing & In-Person Representation",
                es: "Radicación y Acompañamiento",
              },
              desc: {
                en: "We monitor your application status, handle official queries, and accompany you to mandatory appointments at local notaries or Migración Colombia.",
                es: "Monitoreamos el estado de tu trámite, respondemos observaciones oficiales e incluimos acompañamiento presencial para trámites notariales o de Migración Colombia.",
              },
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0F1E35] p-6 shadow-xs flex flex-col justify-between space-y-4 relative"
            >
              <div className="space-y-3">
                <span className="text-3xl font-black text-[#C01072] dark:text-[#F472B6]">
                  {item.step}
                </span>
                <h3 className="text-lg font-bold text-[#16345F] dark:text-white leading-snug">
                  {item.title[lang]}
                </h3>
                <p className="text-xs sm:text-sm text-[#706F6F] dark:text-gray-300 leading-relaxed">
                  {item.desc[lang]}
                </p>
              </div>

              <div className="pt-2 flex items-center gap-1.5 text-[11px] font-bold text-[#16345F] dark:text-[#9BB8E0]">
                <CheckCircle2 className="size-3.5 text-emerald-600" />
                <span>
                  {lang === "en" ? "Guaranteed Oversight" : "Supervisión Jurídica"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CLOSING STRATEGIC CTA BANNER */}
      <section className="rounded-3xl bg-gradient-to-r from-[#16345F] via-[#1A3D6E] to-[#16345F] text-white p-8 sm:p-12 lg:p-16 shadow-xl relative overflow-hidden">
        <div className="pointer-events-none absolute -right-20 -bottom-20 size-80 rounded-full bg-[#C01072]/20 blur-3xl" />
        <div className="pointer-events-none absolute left-10 top-0 size-60 rounded-full bg-[#9BB8E0]/10 blur-2xl" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold text-[#9BB8E0]">
            <Sparkles className="size-3.5 text-[#F472B6]" />
            {lang === "en" ? "Boutique Legal Advice" : "Asesoría Legal Boutique"}
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            {lang === "en"
              ? "Schedule a legal strategy call with our team and plan your move with confidence."
              : "Reserva una llamada estratégica con nuestro equipo legal y planea tu trámite con seguridad."}
          </h2>

          <p className="text-sm sm:text-base text-gray-200 leading-relaxed max-w-2xl">
            {lang === "en"
              ? "Our initial $67 USD assessment covers full profiling, timing estimation, and risk mitigation. 100% credited toward your full visa package when you hire us."
              : "Nuestra consulta inicial de $67 USD cubre el perfilamiento integral, estimación de tiempos y mitigación de riesgos. El 100% se abona al paquete si decides contratar el trámite con nosotras."}
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
                  ? "Hello Capital M Law, I would like to schedule a strategy call regarding my Colombia visa."
                  : "Hola Capital M Law, me gustaría programar una llamada estratégica sobre mi visa en Colombia."
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
              ? "Confidential & Protected under Colombian Attorney-Client Privilege."
              : "Confidencial y protegido bajo el Secreto Profesional del Derecho Colombiano."}
          </p>
        </div>
      </section>
    </div>
  );
}
