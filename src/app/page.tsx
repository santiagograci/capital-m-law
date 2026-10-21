"use client";

import React, { useState, useEffect } from "react";
import {
  CONTENT,
  FIGMA_SERVICES,
  FIGMA_STEPS,
  FIGMA_REVIEWS,
  Language,
} from "@/data/home-data";
import {
  Calendar,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Heart,
  Camera,
  ShieldCheck,
  Languages,
  Lock,
  Star,
  ExternalLink,
  Sparkles,
  Sun,
  Moon,
  Globe,
} from "lucide-react";
import { HomeBlogSection } from "@/components/home/home-blog-section";
import { BookingPaymentModal, CALENDLY_URL } from "@/components/home/booking-payment-modal";
import { SocialProofReviews } from "@/components/home/social-proof-reviews";
import { Footer } from "@/components/Footer";

export default function CapitalMLawApp() {
  const [lang, setLang] = useState<Language>("en");
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingService, setBookingService] = useState("Visas & Immigration");
  const [activeService, setActiveService] = useState(FIGMA_SERVICES[0]);
  const [selectedIntent, setSelectedIntent] = useState("visa");
  const [selectedServiceForm, setSelectedServiceForm] = useState(CONTENT.en.form.matters[0]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Estados de carruseles
  const [lifeIndex, setLifeIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);

  const t = CONTENT[lang];

  // Sincronizar tema con html y localStorage
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("capm-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const nextDark = !darkMode;
    setDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("capm-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("capm-theme", "light");
    }
  };

  const toggleLanguage = () => {
    const nextLang = lang === "en" ? "es" : "en";
    setLang(nextLang);
    setSelectedServiceForm(CONTENT[nextLang].form.matters[0]);
  };

  const teamMembers = [
    {
      name: "María Fernanda Duarte",
      role: lang === "en" ? "Founder & Principal Attorney" : "Socia Fundadora y Directora",
      languages: lang === "en" ? "English & Spanish (Fluent)" : "Inglés y Español (Bilingüe)",
      credentials: lang === "en" ? "Law Degree (Colombia) · Board Certified #CSJ-Col" : "Abogada Titulada · Tarjeta Profesional #CSJ-Col",
      specialties: lang === "en" 
        ? ["Immigration & Visas", "Real Estate Due Diligence", "Foreign Investment"] 
        : ["Visas e Inmigración", "Estudio de Títulos Inmobiliario", "Inversión Extranjera"],
      bio: lang === "en"
        ? "Licensed Colombian attorney with over 8 years of experience advising international clients, digital nomads, and foreign investors relocating to Medellín. Known for transparent execution, strategic clarity, and client-first advocacy."
        : "Abogada colombiana con más de 8 años de experiencia guiando a clientes extranjeros, fundadores y jubilados en Colombia. Reconocida por su claridad técnica, acompañamiento cercano y defensa rigurosa.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=85",
    },
    {
      name: "Ana María Muñoz",
      role: lang === "en" ? "Associate Attorney" : "Abogada Asociada",
      languages: lang === "en" ? "English & Spanish (Fluent)" : "Inglés y Español (Bilingüe)",
      credentials: lang === "en" ? "Law Degree (Colombia) · Board Certified #CSJ-Col" : "Abogada Titulada · Tarjeta Profesional #CSJ-Col",
      specialties: lang === "en"
        ? ["Visas & Salvoconductos", "Corporate Compliance", "Notary Transactions"]
        : ["Visas y Salvoconductos", "Cumplimiento Corporativo", "Trámites Notariales"],
      bio: lang === "en"
        ? "Bilingual attorney specialized in Colombian immigration pathways, regulatory compliance, and civil law. Dedicated to meticulous case preparation before Cancillería and Migración Colombia, delivering swift resolutions for expats."
        : "Abogada bilingüe especializada en trámites migratorios ante Cancillería y Migración Colombia, derecho corporativo y notarial. Reconocida por su precisión documental y agilidad de respuesta.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=85",
    },
  ];

  const lifeMoments = [
    {
      title: lang === "en" ? "Visa Celebration at Provenza" : "Celebración de Visa en Provenza",
      location: "El Poblado, Medellín",
      client: "Alex & María Fernanda",
      caption: lang === "en" 
        ? "Celebrating a 2-year digital nomad visa approval over fresh Colombian coffee."
        : "Celebrando la aprobación de 2 años de visa con café especial de origen.",
      image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=700&q=80",
      tag: lang === "en" ? "Community" : "Comunidad",
    },
    {
      title: lang === "en" ? "Real Estate Closing at Notary 15" : "Cierre Inmobiliario en Notaría 15",
      location: "Laureles, Medellín",
      client: "Carl & Ana María",
      caption: lang === "en"
        ? "Handing over the keys and finalized public deed after a complete 20-year title audit."
        : "Entrega de llaves y firma de escritura pública tras un estudio de títulos sin riesgos.",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=700&q=80",
      tag: lang === "en" ? "Milestone" : "Hito Legal",
    },
    {
      title: lang === "en" ? "Strategy Session at Belén Malibú HQ" : "Sesión Estratégica en Sede Belén Malibú",
      location: "Medellín HQ",
      client: "Founders & Legal Team",
      caption: lang === "en"
        ? "Mapping out a new tech company incorporation and bilingual employment contracts."
        : "Estructurando la constitución de una nueva SAS y contratos laborales bilingües.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=700&q=80",
      tag: lang === "en" ? "Everyday Life" : "Día a Día",
    },
    {
      title: lang === "en" ? "Cédula Extranjería Delivery Day" : "Entrega de Cédula de Extranjería",
      location: "Migración Colombia",
      client: "Jay & The Team",
      caption: lang === "en"
        ? "From initial consultation to holding the physical Colombian ID card in record time."
        : "Acompañamiento presencial para reclamar el documento físico en tiempo récord.",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=700&q=80",
      tag: lang === "en" ? "Success Story" : "Caso de Éxito",
    },
  ];

  const nextLife = () => {
    setLifeIndex((prev) => (prev + 1 >= lifeMoments.length - 1 ? 0 : prev + 1));
  };
  const prevLife = () => {
    setLifeIndex((prev) => (prev === 0 ? lifeMoments.length - 2 : prev - 1));
  };

  const nextReview = () => {
    setReviewIndex((prev) => (prev + 1 >= FIGMA_REVIEWS.length ? 0 : prev + 1));
  };
  const prevReview = () => {
    setReviewIndex((prev) => (prev === 0 ? FIGMA_REVIEWS.length - 1 : prev - 1));
  };

  const currentIntent = t.hero.intents.find((i) => i.id === selectedIntent) || t.hero.intents[0];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A1526] text-[#16345F] dark:text-[#E2E8F0] legal-texture-bg pb-20 sm:pb-0 transition-colors duration-300">
      
      {/* 1. TOP UTILITY BAR (Bilingüe + Modo Noche + Contacto) */}
      <div className="border-b border-gray-200 dark:border-white/10 bg-white/95 dark:bg-[#0A1526]/95 backdrop-blur-sm py-2 px-4 text-xs">
        <div className="max-w-[1240px] mx-auto flex flex-wrap items-center justify-between gap-3 text-[#16345F] dark:text-[#9BB8E0]">
          
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              onClick={() => {
                setBookingService("General Legal Consultation");
                setBookingModalOpen(true);
              }}
              className="flex items-center gap-1.5 hover:underline font-bold text-[#C01072] dark:text-[#F472B6] cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" /> {t.topBar.book}
            </button>
            <a href="mailto:info@capitaleme.com" className="hidden md:flex items-center gap-1.5 hover:underline text-gray-700 dark:text-gray-200">
              <Mail className="w-3.5 h-3.5 text-[#C01072]" /> {t.topBar.email}
            </a>
            <a
              href="https://wa.me/573146022411"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-[#706F6F] dark:text-gray-300 hover:text-[#C01072] font-semibold"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" /> {t.topBar.whatsapp}
            </a>
            <button
              onClick={() => {
                setBookingService("Direct Retainer Payment");
                setBookingModalOpen(true);
              }}
              className="flex items-center gap-1.5 hover:underline font-bold text-[#16345F] dark:text-white cursor-pointer"
            >
              <Lock className="w-3 h-3 text-[#C01072]" />
              {t.topBar.payNow}
            </button>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden lg:flex items-center gap-1 text-gray-500 dark:text-gray-400">
              <MapPin className="w-3.5 h-3.5 text-[#C01072]" /> {t.topBar.location}
            </span>
            <span className="hidden lg:flex items-center gap-1 text-gray-500 dark:text-gray-400">
              <Clock className="w-3.5 h-3.5 text-[#C01072]" /> {t.topBar.hours}
            </span>

            {/* Selector de Idioma (EN / ES) */}
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-[#C01072] hover:text-white dark:hover:bg-[#C01072] text-[#16345F] dark:text-white text-[11px] font-bold transition-all cursor-pointer"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === "en" ? "ES" : "EN"}</span>
            </button>

            {/* Toggle de Modo Claro / Noche */}
            {mounted && (
              <button
                onClick={toggleDarkMode}
                className="p-1.5 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-[#16345F] dark:text-amber-300 transition cursor-pointer"
                aria-label="Toggle Dark Mode"
              >
                {darkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>

        </div>
      </div>

      {/* 2. NAVBAR */}
      <nav className="py-4 px-4 sticky top-0 z-40 bg-white/95 dark:bg-[#0A1526]/95 backdrop-blur border-b border-gray-100 dark:border-white/10 shadow-xs">
        <div className="max-w-[1240px] mx-auto grid grid-cols-2 md:grid-cols-3 items-center">
          
          <div className="flex items-center gap-2 justify-self-start">
            <a href="#" className="flex items-center gap-2 group">
              <span className="text-2xl font-extrabold tracking-tight text-[#16345F] dark:text-white lowercase">
                capital
              </span>
              <div className="w-8 h-8 rounded-full border-2 border-[#16345F] dark:border-white p-[2px] flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-[#16345F] dark:bg-white text-white dark:text-[#0A1526] flex items-center justify-center text-sm font-black">
                  M
                </div>
              </div>
              <span className="text-xs font-semibold text-[#706F6F] dark:text-gray-400 ml-1 tracking-wider uppercase">
                Law
              </span>
            </a>
          </div>

          <div className="col-span-2 md:col-span-1 justify-self-center mt-3 md:mt-0">
            <div className="flex items-center gap-4 sm:gap-6 bg-[#C01072] text-white px-6 sm:px-8 py-2.5 rounded-full font-medium text-xs sm:text-sm shadow-md">
              <a href="#about" className="hover:text-white/80 transition-colors">{t.nav.about}</a>
              <a href="/services" className="hover:text-white/80 transition-colors">{t.nav.services}</a>
              <a href="/team" className="hover:text-white/80 transition-colors">{t.nav.team}</a>
              <a href="#life" className="hover:text-white/80 transition-colors">{t.nav.life}</a>
              <a href="#forum" className="hover:text-white/80 transition-colors">{t.nav.forum}</a>
              <a href="/blog" className="hover:text-white/80 font-bold transition-colors">Blog</a>
              <a href="#contact" className="hover:text-white/80 transition-colors">{t.nav.contact}</a>
            </div>
          </div>

          <div className="hidden md:flex justify-self-end items-center gap-2">
            <button
              onClick={() => {
                setBookingService("Initial Consultation");
                setBookingModalOpen(true);
              }}
              className="bg-[#16345F] hover:bg-[#C01072] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-xs cursor-pointer"
            >
              {t.nav.bookBtn}
            </button>
          </div>

        </div>
      </nav>

      {/* 3. HERO & FORMULARIO (Dos Columnas + Apertura Suspendida) */}
      <section className="pt-8 pb-16 px-4 relative z-10 max-w-[1240px] mx-auto animate-suspended-hero">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C01072]/10 border border-[#C01072]/20 text-[#C01072] dark:text-[#F472B6] text-xs font-bold shadow-xs">
              <div className="flex items-center text-amber-500">
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
              </div>
              <span>{t.hero.badge}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.12] text-[#16345F] dark:text-white">
              {t.hero.titleMain} <br />
              <span className="relative inline-block text-[#9BB8E0] pb-2">
                {t.hero.titleHighlight}
                <span className="absolute left-0 bottom-0 w-full h-[5px] bg-[#9BB8E0] rounded-full"></span>
              </span>
            </h1>

            <p className="text-lg italic text-[#706F6F] dark:text-gray-300 font-medium">
              {t.hero.subtitle}
            </p>

            <div className="space-y-2 pt-1">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                {t.hero.intentLabel}
              </p>
              <div className="flex flex-wrap gap-2">
                {t.hero.intents.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedIntent(item.id)}
                    className={`text-xs font-bold px-3.5 py-2 rounded-xl transition cursor-pointer border ${
                      selectedIntent === item.id
                        ? "bg-[#16345F] dark:bg-[#C01072] text-white border-transparent shadow-sm"
                        : "bg-white dark:bg-white/5 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-white/10 hover:border-gray-400"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setBookingService(currentIntent.label.replace(/[^\w\s/]/g, "").trim());
                  setBookingModalOpen(true);
                }}
                className="inline-flex items-center justify-center gap-2 bg-[#C01072] hover:bg-[#A50E62] text-white font-bold text-base px-8 py-4 rounded-2xl shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Calendar className="w-5 h-5" />
                <span>{currentIntent.cta}</span>
                <ChevronRight className="w-5 h-5" />
              </button>

              <a
                href="https://wa.me/573146022411?text=Hi%20Capital%20M!%20I'm%20interested%20in%20legal%20counsel%20for%20Medell%C3%ADn."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-[#25D366] dark:hover:border-[#25D366] text-gray-700 dark:text-gray-200 font-semibold text-sm transition"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>{lang === "es" ? "WhatsApp Rápido" : "WhatsApp Quick Chat"}</span>
              </a>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium flex items-center gap-1.5 pt-1">
              <Sparkles className="w-3.5 h-3.5 text-[#C01072]" />
              <span>{t.hero.feeCredit}</span>
            </p>
          </div>

          <div id="contact" className="lg:col-span-5 animate-soft-levitate">
            <div className="rounded-3xl p-6 sm:p-8 shadow-2xl bg-gradient-to-br from-[#16345F] to-[#244c80] dark:from-[#0F223D] dark:to-[#173053] text-white space-y-5 border border-white/15 backdrop-blur-sm">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold">{t.form.title}</h2>
                <p className="text-xs text-gray-200">{t.form.subtitle}</p>
              </div>

              {formSubmitted ? (
                <div className="p-6 bg-white/20 rounded-2xl text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 mx-auto text-[#9BB8E0]" />
                  <h3 className="font-bold text-lg">{t.form.successTitle}</h3>
                  <p className="text-xs text-white/90">{t.form.successDesc}</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      required
                      type="text"
                      placeholder={t.form.namePlaceholder}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/90 text-gray-800 placeholder-gray-400 text-xs focus:outline-none focus:ring-2 focus:ring-[#9BB8E0]"
                    />
                    <input
                      required
                      type="email"
                      placeholder={t.form.emailPlaceholder}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/90 text-gray-800 placeholder-gray-400 text-xs focus:outline-none focus:ring-2 focus:ring-[#9BB8E0]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-white/80 mb-1">
                      {t.form.matterLabel}
                    </label>
                    <select
                      value={selectedServiceForm}
                      onChange={(e) => setSelectedServiceForm(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/90 text-gray-800 text-xs focus:outline-none focus:ring-2 focus:ring-[#9BB8E0]"
                    >
                      {t.form.matters.map((m, idx) => (
                        <option key={idx} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>

                  <textarea
                    required
                    rows={3}
                    placeholder={t.form.msgPlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/90 text-gray-800 placeholder-gray-400 text-xs focus:outline-none focus:ring-2 focus:ring-[#9BB8E0]"
                  />

                  <div className="p-2.5 rounded-xl bg-white/10 text-[11px] text-white/90 flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-[#9BB8E0] shrink-0" />
                    <span>{t.form.privacyBadge}</span>
                  </div>

                  <label className="flex items-center gap-2 text-xs text-white/90 cursor-pointer">
                    <input type="checkbox" required className="w-4 h-4 rounded text-[#C01072]" />
                    <span>{t.form.termsLabel}</span>
                  </label>

                  <button
                    type="submit"
                    className="w-full bg-white text-[#16345F] hover:bg-[#C01072] hover:text-white font-bold py-3.5 rounded-xl text-xs shadow-md transition cursor-pointer"
                  >
                    {t.form.submitBtn}
                  </button>

                  <div className="text-center text-[10px] text-white/70 font-semibold uppercase tracking-wider">{t.form.orText}</div>

                  <a
                    href={`https://wa.me/573146022411?text=Hi%20Capital%20M!%20I'm%20contacting%20you%20regarding%20${encodeURIComponent(selectedServiceForm)}.`}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-center w-full bg-[#C01072] hover:bg-[#16345F] text-white font-bold py-3.5 rounded-xl text-xs shadow-md transition"
                  >
                    {t.form.whatsappBtn}
                  </a>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* 4. SERVICIOS INTERACTIVOS */}
      <section id="services" className="py-20 px-4 max-w-[1240px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-5 divide-y divide-gray-200 dark:divide-white/10">
            {FIGMA_SERVICES.map((s) => {
              const active = activeService.id === s.id;
              const displayName = lang === "es" ? s.nameEs : s.name;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveService(s)}
                  className={`w-full py-5 px-3 flex items-center justify-between text-left transition cursor-pointer group ${
                    active 
                      ? "bg-gray-50/80 dark:bg-white/5 font-bold" 
                      : "hover:bg-gray-50/40 dark:hover:bg-white/5 font-medium"
                  }`}
                >
                  <span className="text-lg sm:text-xl text-[#16345F] dark:text-white">{displayName}</span>
                  <ChevronRight
                    className="w-6 h-6 transition-transform group-hover:translate-x-1"
                    style={{ color: active ? "#C01072" : s.arrowColor }}
                  />
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-7 bg-white dark:bg-[#0F223D] rounded-3xl p-8 sm:p-10 border border-gray-200 dark:border-white/10 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 dark:border-white/10 pb-4">
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#16345F] dark:text-white">
                  {lang === "es" ? activeService.titleEs : activeService.title}
                </h3>
                <p className="text-sm font-semibold text-[#C01072] dark:text-[#F472B6] mt-0.5">
                  {lang === "es" ? activeService.badgeEs : activeService.badge}
                </p>
              </div>
              <div className="text-xs font-bold text-[#706F6F] dark:text-gray-300 bg-gray-100 dark:bg-white/10 px-3 py-1.5 rounded-full">
                {t.servicesHeading.timelineBadge}
              </div>
            </div>

            <div className="space-y-3 text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
              <p className="font-semibold text-gray-900 dark:text-white">
                {lang === "es" ? activeService.introEs : activeService.intro}
              </p>
              <p>{lang === "es" ? activeService.bodyEs : activeService.body}</p>
            </div>

            <div className="p-3 rounded-2xl bg-[#C01072]/10 border border-[#C01072]/20 text-xs font-medium text-[#16345F] dark:text-gray-200 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C01072] shrink-0" />
              <span>{t.servicesHeading.representationBadge}</span>
            </div>

            <ul className="space-y-2.5 pt-1">
              {(lang === "es" ? activeService.bulletsEs : activeService.bullets).map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300">
                  <span className="text-[#C01072] font-bold">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setBookingService(lang === "es" ? activeService.nameEs : activeService.name);
                  setBookingModalOpen(true);
                }}
                className="inline-flex items-center gap-2 bg-[#16345F] hover:bg-[#C01072] text-white font-bold text-sm px-6 py-3 rounded-xl transition shadow-md hover:shadow-lg cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#9BB8E0]" />
                {lang === "es" ? activeService.ctaTextEs : activeService.ctaText} · $67
                <ChevronRight className="w-4 h-4" />
              </button>
              <a
                href={`/services/${activeService.id === "visas" ? "visas-and-immigration" : activeService.id === "real-estate" ? "real-estate-transactions" : activeService.id === "marriage" ? "marriage-and-prenuptial-agreements" : "sas-company-incorporation"}`}
                className="inline-flex items-center gap-2 border border-[#16345F]/20 dark:border-white/20 hover:border-[#C01072] hover:text-[#C01072] dark:hover:text-[#F472B6] text-[#16345F] dark:text-white font-semibold text-sm px-5 py-3 rounded-xl transition"
              >
                {lang === "es" ? "Ver requisitos y proceso completo →" : "View requirements & full process →"}
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 5. HOW WE WORK */}
      <section id="consultation" className="py-20 px-4 bg-gray-50/60 dark:bg-white/[0.02] border-y border-gray-100 dark:border-white/10 relative z-10">
        <div className="max-w-[1000px] mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-4xl sm:text-5xl font-black text-[#C01072] dark:text-[#F472B6]">{t.howWeWork.title}</h2>
            <p className="text-base text-[#706F6F] dark:text-gray-300 max-w-2xl mx-auto">
              {t.howWeWork.subtitle}
            </p>
          </div>

          <div className="space-y-8">
            {FIGMA_STEPS.map((step) => (
              <div key={step.number} className="bg-white dark:bg-[#0F223D] rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-white/10 shadow-xs space-y-4">
                <div className="inline-flex items-center gap-4 bg-[#9BB8E0]/30 text-[#16345F] dark:text-white px-6 py-3 rounded-full font-black text-xl">
                  <span className="text-3xl text-[#C01072] leading-none">{step.number}</span>
                  <span>{lang === "es" ? step.titleEs : step.titleEn}</span>
                </div>

                <div className="space-y-2 text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed pl-2 sm:pl-4">
                  <p>{lang === "es" ? step.body1Es : step.body1En}</p>
                  <p>{lang === "es" ? step.body2Es : step.body2En}</p>
                  {step.fee && (
                    <div className="pt-2">
                      <span className="inline-block px-3 py-1 bg-pink-100 dark:bg-pink-950 text-[#C01072] dark:text-pink-300 rounded-lg text-xs font-bold mr-2">
                        {t.howWeWork.badgeText}
                      </span>
                      <span className="font-bold text-[#16345F] dark:text-white text-lg">{step.fee}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ABOUT US */}
      <section id="about" className="py-20 px-4 max-w-[1000px] mx-auto space-y-12 relative z-10">
        <h2 className="text-4xl font-black text-center text-[#16345F] dark:text-white">{t.aboutUs.mainTitle}</h2>

        <div className="space-y-10">
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-[#C01072] dark:text-[#F472B6]">{t.aboutUs.whoTitle}</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
              {t.aboutUs.whoBody}
            </p>
          </div>

          <div className="space-y-3 border-t border-gray-100 dark:border-white/10 pt-8">
            <h3 className="text-2xl font-bold text-[#16345F] dark:text-white">{t.aboutUs.whatTitle}</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
              {t.aboutUs.whatIntro}
            </p>
            <ul className="space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 pl-4 list-disc">
              <li>{t.aboutUs.whatExpats}</li>
              <li>{t.aboutUs.whatLocal}</li>
            </ul>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 pt-2">
              {t.aboutUs.whatOutro}
            </p>
          </div>
        </div>
      </section>

      {/* 7. EQUIPO */}
      <section id="team" className="py-20 px-4 bg-gray-50/60 dark:bg-white/[0.02] border-t border-gray-100 dark:border-white/10 relative z-10">
        <div className="max-w-[1100px] mx-auto text-center space-y-12">
          <div className="space-y-2">
            <h2 className="text-4xl font-black text-[#C01072] dark:text-[#F472B6]">{t.teamHeading.title}</h2>
            <p className="text-sm sm:text-base text-[#706F6F] dark:text-gray-300 max-w-xl mx-auto">
              {t.teamHeading.subtitle}
            </p>
            <div className="pt-2">
              <a
                href="/team"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#16345F] dark:text-[#9BB8E0] hover:text-[#C01072] dark:hover:text-[#F472B6] transition-colors underline underline-offset-4"
              >
                <span>{lang === "es" ? "Conoce la trayectoria y credenciales completas del equipo →" : "Explore full attorney executive bios & practice credentials →"}</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="bg-white dark:bg-[#0F223D] rounded-3xl p-8 border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6"
              >
                <div className="space-y-5">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                    <div className="w-32 h-32 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shadow-inner shrink-0 bg-gray-100">
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center sm:text-left space-y-1 pt-1">
                      <h3 className="text-2xl font-bold text-[#16345F] dark:text-white">{member.name}</h3>
                      <p className="text-sm font-semibold text-[#C01072] dark:text-[#F472B6]">{member.role}</p>
                      <p className="text-xs text-[#16345F] dark:text-gray-300 font-semibold flex items-center justify-center sm:justify-start gap-1 pt-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#C01072]" />
                        <span>{member.credentials}</span>
                      </p>
                      <p className="text-xs text-[#706F6F] dark:text-gray-400 flex items-center justify-center sm:justify-start gap-1">
                        <Languages className="w-3.5 h-3.5 text-[#C01072]" />
                        <span>{member.languages}</span>
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-white/10 pt-4">
                    {member.bio}
                  </p>

                  <div className="space-y-2 pt-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">{t.teamHeading.coreExpertise}</span>
                    <div className="flex flex-wrap gap-1.5">
                      {member.specialties.map((spec, i) => (
                        <span
                          key={i}
                          className="text-xs font-medium px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-white/10 text-[#16345F] dark:text-gray-200"
                        >
                          ✓ {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-white/10 flex items-center justify-between text-xs text-[#16345F] dark:text-gray-200 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#C01072]" /> {t.teamHeading.activeCounsel}
                  </span>
                  <a
                    href="https://wa.me/573146022411"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#C01072] dark:text-[#F472B6] hover:underline flex items-center gap-1 font-bold"
                  >
                    {t.teamHeading.directInquiry} {member.name.split(" ")[0]} <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CARRUSEL: LIFE AT CAPITAL M */}
      <section id="life" className="py-20 px-4 max-w-[1240px] mx-auto relative z-10 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C01072]/10 text-[#C01072] dark:text-[#F472B6] text-xs font-semibold uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5 fill-current text-[#C01072]" />
              <span>{t.lifeHeading.tag}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-[#16345F] dark:text-white">{t.lifeHeading.title}</h2>
            <p className="text-sm sm:text-base text-[#706F6F] dark:text-gray-300 max-w-xl">
              {t.lifeHeading.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={prevLife}
              aria-label="Previous slide"
              className="w-12 h-12 rounded-full border border-gray-200 dark:border-white/15 bg-white dark:bg-[#0F223D] hover:bg-[#16345F] hover:text-white text-[#16345F] dark:text-white flex items-center justify-center shadow-sm transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextLife}
              aria-label="Next slide"
              className="w-12 h-12 rounded-full border border-gray-200 dark:border-white/15 bg-white dark:bg-[#0F223D] hover:bg-[#C01072] hover:text-white text-[#16345F] dark:text-white flex items-center justify-center shadow-sm transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${lifeIndex * (100 / 2)}%)` }}
          >
            {lifeMoments.map((item, idx) => (
              <div
                key={idx}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 bg-white dark:bg-[#0F223D] rounded-3xl p-5 border border-gray-200 dark:border-white/10 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden relative bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-white/95 dark:bg-black/80 backdrop-blur-md text-[#16345F] dark:text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                      {item.tag}
                    </span>
                  </div>

                  <div className="space-y-1.5 px-1">
                    <p className="text-xs font-bold text-[#C01072] dark:text-[#F472B6] flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>{item.location}</span>
                    </p>
                    <h3 className="font-bold text-[#16345F] dark:text-white text-lg leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed pt-1">
                      {item.caption}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100 dark:border-white/10 px-1 flex items-center justify-between text-[11px] font-medium text-gray-400">
                  <span>{t.lifeHeading.withClient} {item.client}</span>
                  <Camera className="w-3.5 h-3.5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. PRUEBA SOCIAL, CALIFICACIÓN GOOGLE & TARJETAS PROFESIONALES */}
      <section id="forum">
        <SocialProofReviews lang={lang} />
      </section>

      {/* 10. BLOG & REDES SOCIALES */}
      <HomeBlogSection
        lang={lang}
        title={t.blogHeading.title}
        youtubeCardText={t.blogHeading.youtubeCard}
        instagramCardText={t.blogHeading.instagramCard}
      />

      {/* 11. FOOTER (CON REDES SOCIALES TIKTOK, FACEBOOK, INSTAGRAM, YOUTUBE) */}
      <Footer lang={lang} />

      {/* 12. BARRA FIJA MÓVIL */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 p-2.5 bg-white/95 dark:bg-[#0A1526]/95 backdrop-blur-md border-t border-gray-200 dark:border-white/10 flex items-center gap-2 shadow-2xl">
        <a
          href="https://wa.me/573146022411"
          target="_blank"
          rel="noreferrer"
          className="flex-1 py-3 px-3 rounded-xl bg-[#C01072] hover:bg-[#16345F] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </a>
        <button
          type="button"
          onClick={() => {
            setBookingService("General Legal Consultation");
            setBookingModalOpen(true);
          }}
          className="flex-[1.4] py-3 px-3 rounded-xl bg-[#16345F] dark:bg-[#C01072] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
        >
          <Calendar className="w-4 h-4" />
          {lang === "en" ? "Book · $67" : "Agendar · $67"}
        </button>
      </div>

      {/* MODAL DE RESERVA DIRECTA Y PASARELA DE PAGO ($67 USD) */}
      <BookingPaymentModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        defaultService={bookingService}
        lang={lang}
      />

    </div>
  );
}
