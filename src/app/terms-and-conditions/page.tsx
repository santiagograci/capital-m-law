import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  Scale,
  Calendar,
  ShieldAlert,
  CreditCard,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { BlogHeader } from "@/components/blog/blog-header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms and Conditions | Capital M Law Medellín",
  description:
    "Official Terms and Conditions for Capital M Law website usage and the initial $67 USD legal consultation intake session in Medellín, Colombia.",
  alternates: { canonical: "/terms-and-conditions" },
  openGraph: {
    title: "Terms and Conditions | Capital M Law",
    description:
      "Terms of website usage, non-engagement disclaimer, and $67 USD legal consultation conditions for Capital M Law.",
    type: "website",
  },
};

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-[#FAFBFD] dark:bg-[#0A1526] text-[#16345F] dark:text-[#E2E8F0] transition-colors">
      <BlogHeader />

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <Link href="/" className="hover:text-[#C01072] transition-colors">
            Home
          </Link>
          <ChevronRight className="size-3 text-gray-400" />
          <span className="font-semibold text-[#16345F] dark:text-white">Terms and Conditions</span>
        </nav>

        {/* Header Hero Banner */}
        <header className="legal-texture-bg relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#16345F] to-[#1E467D] p-8 sm:p-12 text-white shadow-xl border border-white/10 mb-12">
          <div className="relative z-10 space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#9BB8E0] backdrop-blur-sm border border-white/15">
              <Scale className="size-4 text-[#9BB8E0]" />
              Capital M Law · Legal Engagement Terms
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Terms & Conditions of Service
            </h1>
            <p className="text-sm sm:text-base text-[#9BB8E0] max-w-2xl leading-relaxed">
              General conditions of website use and operating terms for the initial $67 USD legal consultation and professional retainers in Medellín, Colombia.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-gray-300">
              <span><strong>Effective Date:</strong> January 2026</span>
              <span>•</span>
              <span><strong>Governing Law:</strong> Republic of Colombia</span>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <article className="prose prose-slate dark:prose-invert max-w-none space-y-10 text-sm sm:text-base leading-relaxed text-gray-700 dark:text-gray-300">
          
          {/* Section 1: Informational Nature & Disclaimer */}
          <section className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0F1E35] p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-[#16345F] dark:text-white flex items-center gap-2.5 m-0">
              <ShieldAlert className="size-5 text-[#C01072] shrink-0" />
              1. Informational Nature of Website Content & Legal Disclaimer
            </h2>
            <p>
              Welcome to <strong>Capital M Law</strong> (accessible at <code>capitalm.law</code>). All articles, blog guides, fee charts, infographics, and general information published on this website are intended solely for general informational and educational purposes.
            </p>
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <AlertCircle className="size-4 text-amber-600 dark:text-amber-400 shrink-0" />
                No Attorney-Client Relationship Formed Solely by Website Access:
              </p>
              <p>
                Browsing this website, reading our legal guides, submitting a contact form, initiating a WhatsApp conversation, or emailing our office does <strong>NOT</strong> create an attorney-client relationship (<em>relación profesional de mandato</em>) between you and Capital M Law or its individual attorneys.
              </p>
            </div>
            <p>
              An attorney-client relationship is formally established <strong>only</strong> when: (i) an individual legal assessment has been conducted, (ii) a written Legal Services Agreement (<em>Contrato de Prestación de Servicios Profesionales</em>) or Special Power of Attorney (<em>Poder Especial</em>) has been signed by both parties, and (iii) the agreed retainer has been paid.
            </p>
          </section>

          {/* Section 2: The Initial Consultation ($67 USD) */}
          <section className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0F1E35] p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-[#16345F] dark:text-white flex items-center gap-2.5 m-0">
              <CreditCard className="size-5 text-[#C01072] shrink-0" />
              2. Terms of the Initial Structured Consultation ($67 USD)
            </h2>
            <p>
              To offer expatriates, founders, and international investors immediate clarity regarding Colombian law, we offer a structured preliminary assessment:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 space-y-2">
                <p className="font-bold text-sm text-[#16345F] dark:text-white flex items-center gap-2">
                  <Clock className="size-4 text-[#C01072]" />
                  Duration & Format
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  The consultation is a focused <strong>45-minute intake session</strong> conducted via high-definition Google Meet video conference or in-person at our office in Belén Malibú, Medellín.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 space-y-2">
                <p className="font-bold text-sm text-[#16345F] dark:text-white flex items-center gap-2">
                  <FileText className="size-4 text-[#C01072]" />
                  Document Pre-Audit
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Clients may provide up to 5 relevant documents (e.g. passport, visa rejection letters, property folio, corporate draft) in advance for the assigned attorney to review prior to the call.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 space-y-2 md:col-span-2">
                <p className="font-bold text-sm text-[#16345F] dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400" />
                  100% Fee Credit Toward Legal Retainer (Abono Completo)
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  The <strong>$67.00 USD</strong> consultation fee is <strong>100% credited</strong> toward your comprehensive case retainer (e.g., full Visa filing, Real Estate 20-year title audit, or SAS company formation) if you onboard with Capital M Law within <strong>30 calendar days</strong> following the consultation.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Scheduling, Rescheduling & Cancellation */}
          <section className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0F1E35] p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-[#16345F] dark:text-white flex items-center gap-2.5 m-0">
              <Calendar className="size-5 text-[#C01072] shrink-0" />
              3. Scheduling, Rescheduling & Refund Policy
            </h2>
            <p>
              All consultations are scheduled through our official Calendly scheduling portal (<code>https://calendly.com/capital-m-law-</code>). To ensure fairness and respect for attorney calendars:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Punctuality:</strong> Sessions begin promptly at the scheduled time. If a client is late, the session will still conclude at the scheduled finish time to respect the next appointment.
              </li>
              <li>
                <strong>Free Rescheduling (12+ Hours):</strong> You may reschedule your session at no cost with at least <strong>12 hours&apos; advance notice</strong> using the link in your Calendly confirmation email or by emailing <code>info@capitaleme.com</code>.
              </li>
              <li>
                <strong>Cancellations & Refunds (24+ Hours):</strong> Cancellations requested with more than 24 hours&apos; notice are eligible for a 100% refund or an indefinite scheduling credit.
              </li>
              <li>
                <strong>No-Shows & Late Cancellations:</strong> Cancellations made less than 12 hours before the session or no-shows without prior notice are non-refundable, as attorney time has been reserved.
              </li>
            </ul>
          </section>

          {/* Section 4: Professional Responsibility & Ethics */}
          <section className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0F1E35] p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-[#16345F] dark:text-white flex items-center gap-2.5 m-0">
              <Scale className="size-5 text-[#C01072] shrink-0" />
              4. Professional Standards & Nature of Legal Obligations
            </h2>
            <p>
              Capital M Law attorneys are fully certified by the <strong>Consejo Superior de la Judicatura (CSJ)</strong> of Colombia:
            </p>
            <div className="flex flex-wrap gap-3 text-xs">
              <span className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/5 font-semibold text-[#16345F] dark:text-white border border-gray-200 dark:border-white/10">
                María Fernanda Duarte · T.P. #289.412 CSJ
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/5 font-semibold text-[#16345F] dark:text-white border border-gray-200 dark:border-white/10">
                Ana María Muñoz · T.P. #312.870 CSJ
              </span>
            </div>
            <p>
              In accordance with Colombian law and international ethical guidelines:
            </p>
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 text-xs text-gray-600 dark:text-gray-300 space-y-2">
              <p className="font-bold text-[#16345F] dark:text-white">Obligation of Means, Not Discretionary Results (Obligación de Medio, no de Resultado):</p>
              <p>
                Colombian legal advocacy constitutes an obligation of diligent means, technical excellence, and rigorous compliance with procedural requirements. No attorney or law firm can legally guarantee a discretionary administrative result (such as visa approvals issued by Cancillería visa officers, or tax assessments issued by the DIAN), as these decisions reside within the sovereign authority of the state. Capital M Law commits to the highest standard of procedural diligence and error-free execution.
              </p>
            </div>
          </section>

          {/* Section 5: Intellectual Property */}
          <section className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0F1E35] p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-[#16345F] dark:text-white flex items-center gap-2.5 m-0">
              <BookOpen className="size-5 text-[#C01072] shrink-0" />
              5. Intellectual Property
            </h2>
            <p>
              All trademarks, trade names, logos, original legal articles, guides, checklists, and software code on <code>capitalm.law</code> are the exclusive property of Capital M Law and are protected under Andean Community Decision 486 and Colombian Law 23 of 1982.
            </p>
            <p>
              You may read, download, or print excerpts of our articles for your personal, non-commercial use, provided that full attribution to <strong>Capital M Law</strong> and a direct hyperlink to the original source are maintained.
            </p>
          </section>

          {/* Section 6: Jurisdiction & Disputes */}
          <section className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0F1E35] p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-[#16345F] dark:text-white flex items-center gap-2.5 m-0">
              <Scale className="size-5 text-[#C01072] shrink-0" />
              6. Applicable Law & Dispute Resolution
            </h2>
            <p>
              These Terms and Conditions and any professional engagement undertaken shall be governed by and construed in accordance with the laws of the <strong>Republic of Colombia</strong>.
            </p>
            <p>
              Any controversy arising from website use or professional services that cannot be amicably resolved shall be submitted to the <strong>Centro de Conciliación y Arbitraje de la Cámara de Comercio de Medellín para Antioquia</strong> or the competent civil courts of Medellín, Colombia.
            </p>
          </section>
        </article>

        {/* Bottom CTA Banner */}
        <section className="mt-12 rounded-3xl bg-gradient-to-r from-[#16345F] to-[#204982] p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <p className="text-xs font-bold uppercase tracking-wider text-[#9BB8E0]">Ready to consult your case?</p>
            <h3 className="text-xl sm:text-2xl font-black">Schedule Your 45-Min Legal Session</h3>
            <p className="text-xs text-gray-300 max-w-md">
              Official Calendly appointment with bilingual attorneys. $67 fee credited 100% to your retainer.
            </p>
          </div>
          <a
            href="https://calendly.com/capital-m-law-"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl bg-[#C01072] hover:bg-[#A50E62] px-6 py-3.5 text-xs font-bold text-white shadow-lg transition-all transform hover:-translate-y-0.5 shrink-0"
          >
            <Calendar className="size-4" />
            <span>Book on Calendly ($67)</span>
            <ExternalLink className="size-3.5" />
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}
