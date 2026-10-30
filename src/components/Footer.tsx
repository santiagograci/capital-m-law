"use client";

import React, { type SVGProps } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, ExternalLink, Calendar, CreditCard } from "lucide-react";

type IconProps = SVGProps<SVGSVGElement>;

export const TikTokIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298 0 .591.044.87.13V9.4a6.33 6.33 0 0 0-.87-.06A6.34 6.34 0 0 0 3.1 15.68a6.34 6.34 0 0 0 9.22 5.56V11.2a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-2.5-.63 4.6 4.6 0 0 1-1.5-2z" />
  </svg>
);

export const FacebookIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z" />
  </svg>
);

export const InstagramIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

export const YoutubeIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export const SOCIAL_LINKS = [
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@capitalm.law",
    Icon: TikTokIcon,
    hoverClass: "hover:bg-[#000000] hover:text-[#00F2FE]",
    label: "Follow Capital M Law on TikTok",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/CAPITALMPI",
    Icon: FacebookIcon,
    hoverClass: "hover:bg-[#1877F2] hover:text-white",
    label: "Follow Capital M Law on Facebook",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/capitalm.law/",
    Icon: InstagramIcon,
    hoverClass: "hover:bg-[#E4405F] hover:text-white",
    label: "Follow Capital M Law on Instagram",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@capitalemelaw",
    Icon: YoutubeIcon,
    hoverClass: "hover:bg-[#FF0000] hover:text-white",
    label: "Subscribe to Capital M Law on YouTube",
  },
];

interface FooterProps {
  lang?: "en" | "es";
}

export function Footer({ lang = "en" }: FooterProps) {
  const isEs = lang === "es";

  return (
    <footer className="bg-[#16345F] dark:bg-[#070E1A] text-white pt-16 pb-12 px-4 border-t border-gray-800 transition-colors">
      <div className="max-w-[1240px] mx-auto space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand & Socials Column */}
          <div className="md:col-span-5 space-y-5">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/assets/capital-m-logo-white.svg"
                alt="Capital M Law"
                className="h-8 sm:h-9 w-auto"
              />
              <span className="text-xs font-semibold text-gray-300 ml-0.5 tracking-wider uppercase">
                Law
              </span>
            </Link>

            <p className="text-xs text-gray-300 max-w-sm leading-relaxed">
              {isEs
                ? "Firma boutique de abogados bilingües en Medellín, Colombia. Especialistas en Visas, Inversión Extranjera, Estudio de Títulos Inmobiliarios y Derecho Corporativo."
                : "Bilingual legal boutique in Medellín, Colombia. Specialists in Visas & Immigration, Real Estate Title Audits, Corporate Structuring & SAS Incorporation."}
            </p>

            {/* Social Media Links */}
            <div className="space-y-2 pt-1">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#9BB8E0]">
                {isEs ? "Síguenos en Redes Sociales" : "Follow Our Channels"}
              </p>
              <div className="flex items-center gap-2.5">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = social.Icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      title={social.name}
                      className={`size-9 rounded-xl bg-white/10 dark:bg-white/5 border border-white/10 flex items-center justify-center text-gray-200 transition-all duration-200 transform hover:-translate-y-0.5 shadow-xs ${social.hoverClass}`}
                    >
                      <Icon className="size-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3 text-xs text-gray-300">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#9BB8E0]">
              {isEs ? "Enlaces Rápidos" : "Quick Links"}
            </p>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-[#9BB8E0] transition-colors">
                  {isEs ? "Inicio" : "Home"}
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#9BB8E0] transition-colors">
                  {isEs ? "Servicios Legales" : "Legal Services"}
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-[#9BB8E0] transition-colors">
                  {isEs ? "Nuestro Equipo" : "Legal Team"}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#9BB8E0] transition-colors">
                  {isEs ? "Blog & Guías" : "Blog & Insights"}
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-[#9BB8E0] transition-colors">
                  {isEs ? "Política de Privacidad" : "Privacy Policy"}
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-[#9BB8E0] transition-colors">
                  {isEs ? "Términos y Condiciones" : "Terms & Conditions"}
                </Link>
              </li>
              <li className="pt-1">
                <a
                  href="https://calendly.com/capital-m-law-"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#C01072] hover:text-[#F472B6] font-bold transition-colors"
                >
                  <Calendar className="size-3" />
                  <span>{isEs ? "Agendar en Calendly ($67)" : "Book on Calendly ($67)"}</span>
                </a>
              </li>
              <li>
                <a
                  href="https://checkout.bold.co/payment/LNK_JTIV4A6HM0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#00AA81] hover:text-[#34D399] font-bold transition-colors"
                >
                  <CreditCard className="size-3" />
                  <span>{isEs ? "Pagar Consulta (Bold)" : "Pay Consultation"}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-3 text-xs text-gray-300">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#9BB8E0]">
              {isEs ? "Contacto Directo" : "Direct Contact"}
            </p>
            <div className="space-y-2.5">
              <p className="flex items-center gap-2">
                <Mail className="size-3.5 text-[#C01072] shrink-0" />
                <a
                  href="mailto:info@capitaleme.com"
                  className="hover:text-[#9BB8E0] underline transition-colors"
                >
                  info@capitaleme.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="size-3.5 text-[#C01072] shrink-0" />
                <span>+57 314 602 2411</span>
              </p>
              <p className="flex items-start gap-2 text-gray-300 leading-relaxed">
                <MapPin className="size-3.5 text-[#C01072] shrink-0 mt-0.5" />
                <span>Cra 66D #32B - 57, Coworking Inspira, Belén Malibú, Medellín, Colombia</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright line with legal links */}
        <div className="pt-6 border-t border-blue-950/60 text-[11px] text-gray-400 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p>© 2026 Capital M Law. All rights reserved.</p>
            <span className="hidden sm:inline text-gray-600">•</span>
            <div className="flex items-center gap-3">
              <Link
                href="/privacy-policy"
                className="hover:text-white underline-offset-2 hover:underline transition-colors"
              >
                {isEs ? "Política de Privacidad" : "Privacy Policy"}
              </Link>
              <span>•</span>
              <Link
                href="/terms-and-conditions"
                className="hover:text-white underline-offset-2 hover:underline transition-colors"
              >
                {isEs ? "Términos y Condiciones" : "Terms & Conditions"}
              </Link>
            </div>
          </div>
          <p className="text-gray-400">
            {isEs
              ? "Asesoría legal especializada para extranjeros e inversionistas en Colombia."
              : "Specialized legal counsel for international expats & investors in Colombia."}
          </p>
        </div>
      </div>
    </footer>
  );
}
