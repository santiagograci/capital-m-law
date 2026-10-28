import React from "react";
import Link from "next/link";
import { Calendar, ShieldCheck, ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { BlogCategory } from "@/types/blog";

interface ContextualBlogCtaProps {
  category: BlogCategory;
  tags?: string[];
}

const CATEGORY_MAPPINGS: Record<
  BlogCategory,
  {
    badge: string;
    headline: string;
    description: string;
    serviceLink: string;
    ctaButton: string;
  }
> = {
  Visas: {
    badge: "Immigration Assessment · $67 USD",
    headline: "Applying for a Colombian Visa or Residency?",
    description:
      "Avoid consular rejection or costly delays. Our bilingual attorneys audit your bank statements, verify apostilles, and define your exact visa strategy in a 45-minute intake session.",
    serviceLink: "/services/visas-and-immigration",
    ctaButton: "Book Visa Consultation · $67",
  },
  "Real Estate": {
    badge: "Property Due Diligence · $67 USD",
    headline: "Buying Real Estate in Medellín or Antioquia?",
    description:
      "Never transfer earnest money before an attorney reviews the title. We conduct full 20-year forensic title audits, draft protective bilingual promises, and handle closing notarization.",
    serviceLink: "/services/real-estate-transactions",
    ctaButton: "Book Title Due Diligence · $67",
  },
  "Corporate & SAS": {
    badge: "Corporate Structuring · $67 USD",
    headline: "Incorporating a SAS or Starting a Business in Colombia?",
    description:
      "Set up your company with 100% foreign ownership, bilingual bylaws, DIAN tax ID (RUT), and Central Bank exchange registry for seamless future repatriation.",
    serviceLink: "/services/sas-company-incorporation",
    ctaButton: "Book Corporate Intake · $67",
  },
  "Legal Tips": {
    badge: "Direct Legal Roadmap · $67 USD",
    headline: "Need Tailored Legal Advice for Your Case in Colombia?",
    description:
      "Get direct answers from licensed Colombian attorneys. The $67 USD consultation fee is 100% credited toward your full case retainer upon onboarding.",
    serviceLink: "/services",
    ctaButton: "Schedule 45-Min Legal Session · $67",
  },
  "Tax & Compliance": {
    badge: "Tax & Exchange Compliance · $67 USD",
    headline: "Questions About 183-Day Tax Residency or Assets in Colombia?",
    description:
      "Protect your worldwide assets and understand double taxation treaties before DIAN assessments. Schedule an intake session with our corporate tax team.",
    serviceLink: "/services",
    ctaButton: "Book Tax Assessment · $67",
  },
  "Family Law": {
    badge: "Family & Asset Protection · $67 USD",
    headline: "Getting Married in Colombia or Need Prenuptial Agreements?",
    description:
      "Protect your pre-marital assets with enforceable Capitulaciones drafted prior to your civil marriage before a Colombian Public Notary.",
    serviceLink: "/services/marriage-and-prenups",
    ctaButton: "Book Family Law Intake · $67",
  },
};

export function ContextualBlogCta({ category }: ContextualBlogCtaProps) {
  const cta = CATEGORY_MAPPINGS[category] || CATEGORY_MAPPINGS["Legal Tips"];

  return (
    <aside className="legal-texture-bg relative my-14 overflow-hidden rounded-3xl bg-gradient-to-br from-[#16345F] to-[#1e467d] p-8 sm:p-10 text-white shadow-xl border border-white/10">
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="max-w-xl space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#C01072] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-xs">
            <Sparkles className="size-3.5" />
            {cta.badge}
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight">
            {cta.headline}
          </h3>
          <p className="text-sm text-[#9BB8E0] leading-relaxed">
            {cta.description}
          </p>

          <p className="text-xs text-emerald-300 font-medium flex items-center gap-1.5 pt-1">
            <ShieldCheck className="size-4" />
            <span>Consultation fee ($67) is 100% credited towards your case retainer.</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
          <a
            href="https://calendly.com/capital-m-law-"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl bg-[#C01072] hover:bg-[#A50E62] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition flex items-center justify-center gap-2 group"
          >
            <Calendar className="size-4" />
            <span>{cta.ctaButton}</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>

          <Link
            href={cta.serviceLink}
            className="rounded-2xl border border-white/20 hover:bg-white/10 px-5 py-3 text-xs font-semibold text-white transition flex items-center justify-center gap-2"
          >
            <span>Explore Practice Details</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
