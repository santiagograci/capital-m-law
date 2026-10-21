import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  FileText,
  Mail,
  MapPin,
  Calendar,
  ChevronRight,
  ExternalLink,
  Scale,
  CheckCircle2,
} from "lucide-react";
import { BlogHeader } from "@/components/blog/blog-header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy & Habeas Data | Capital M Law Medellín",
  description:
    "Official Data Protection Policy of Capital M Law in accordance with Colombian Statutory Law 1581 of 2012 (Habeas Data) for foreign expats, investors, and clients.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: "Privacy Policy & Habeas Data | Capital M Law",
    description:
      "Data handling policy under Colombian Law 1581 of 2012 for international expats and investors in Medellín, Colombia.",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
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
          <span className="font-semibold text-[#16345F] dark:text-white">Privacy Policy</span>
        </nav>

        {/* Header Hero Banner */}
        <header className="legal-texture-bg relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#16345F] to-[#1E467D] p-8 sm:p-12 text-white shadow-xl border border-white/10 mb-12">
          <div className="relative z-10 space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#9BB8E0] backdrop-blur-sm border border-white/15">
              <ShieldCheck className="size-4 text-[#9BB8E0]" />
              Colombian Law 1581 of 2012 · Habeas Data
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Privacy Policy & Personal Data Treatment
            </h1>
            <p className="text-sm sm:text-base text-[#9BB8E0] max-w-2xl leading-relaxed">
              Official data protection practices governing international clients, expats, and foreign investors represented by Capital M Law in Medellín, Colombia.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-gray-300">
              <span><strong>Last Updated:</strong> January 2026</span>
              <span>•</span>
              <span><strong>Jurisdiction:</strong> Republic of Colombia (SIC)</span>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <article className="prose prose-slate dark:prose-invert max-w-none space-y-10 text-sm sm:text-base leading-relaxed text-gray-700 dark:text-gray-300">
          
          {/* Section 1: Data Controller */}
          <section className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0F1E35] p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-[#16345F] dark:text-white flex items-center gap-2.5 m-0">
              <Scale className="size-5 text-[#C01072] shrink-0" />
              1. Data Controller Identification (Responsable del Tratamiento)
            </h2>
            <p>
              In compliance with <strong>Statutory Law 1581 of 2012</strong>, Regulatory Decree 1377 of 2013, and Circulars issued by the <em>Superintendencia de Industria y Comercio (SIC)</em> of Colombia, <strong>Capital M Law</strong> is the entity responsible for the collection, storage, and processing of personal data gathered through our website, digital intake forms, legal consultation bookings, and formal client representation.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-gray-50 dark:bg-white/[0.03] p-4 rounded-xl border border-gray-100 dark:border-white/5">
              <div>
                <p className="font-bold text-[#16345F] dark:text-white">Legal Boutique:</p>
                <p>Capital M Law</p>
              </div>
              <div>
                <p className="font-bold text-[#16345F] dark:text-white">Principal Office:</p>
                <p>Cra 66D #32B - 57, Coworking Inspira, Belén Malibú, Medellín, Colombia</p>
              </div>
              <div>
                <p className="font-bold text-[#16345F] dark:text-white">Official Contact Email:</p>
                <p><a href="mailto:info@capitaleme.com" className="text-[#C01072] hover:underline">info@capitaleme.com</a></p>
              </div>
              <div>
                <p className="font-bold text-[#16345F] dark:text-white">Data Protection Officer:</p>
                <p>Legal Compliance & Records Unit</p>
              </div>
            </div>
          </section>

          {/* Section 2: Personal Data Collected */}
          <section className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0F1E35] p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-[#16345F] dark:text-white flex items-center gap-2.5 m-0">
              <FileText className="size-5 text-[#C01072] shrink-0" />
              2. Categories of Information Collected from International Clients
            </h2>
            <p>
              Due to the rigorous nature of Colombian immigration proceedings before the <strong>Ministry of Foreign Affairs (Cancillería)</strong>, real estate registries at <strong>Oficinas de Registro de Instrumentos Públicos</strong>, and corporate filings with the <strong>Cámara de Comercio de Medellín</strong>, we may collect and process:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Identification & Civil Records:</strong> Full legal name, date of birth, nationality, passport copy, Cédula de Extranjería, marriage certificates, birth certificates, and apostilles.
              </li>
              <li>
                <strong>Contact Information:</strong> Residential address (abroad and in Colombia), email address, telephone number, WhatsApp number, and emergency contacts.
              </li>
              <li>
                <strong>Financial & Transactional Records:</strong> Foreign and Colombian bank statements, proof of income, foreign direct investment wire receipts, Central Bank exchange declarations (Formularios cambiarios del Banco de la República), and DIAN tax declarations.
              </li>
              <li>
                <strong>Judicial & Criminal Background Clearances:</strong> FBI background checks, police certificates, Interpol records, and certifications legally required by Cancillería for visa eligibility.
              </li>
              <li>
                <strong>Consultation & Payment Metadata:</strong> Payment confirmation records generated via our scheduling partner Calendly, Stripe, Wompi, or PayPal. <em>Note: Capital M Law does not store unencrypted credit card numbers or raw CVV codes.</em>
              </li>
            </ul>
          </section>

          {/* Section 3: Legal Basis & Purposes */}
          <section className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0F1E35] p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-[#16345F] dark:text-white flex items-center gap-2.5 m-0">
              <Lock className="size-5 text-[#C01072] shrink-0" />
              3. Purpose of Processing & Professional Privilege (Secreto Profesional)
            </h2>
            <p>
              Your personal information is handled under strict legal professional secrecy, protected by <strong>Article 74 of the Political Constitution of Colombia</strong> and the <em>Código Disciplinario del Abogado (Ley 1123 de 2007)</em>. Personal data is used exclusively to:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 space-y-1.5">
                <p className="font-bold text-sm text-[#16345F] dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-[#C01072]" />
                  Visa & Immigration Filing
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Preparing, auditing, and submitting visa petitions before Cancillería (Digital Nomad, Investor, Retirement, Marriage/Companion, Student).
                </p>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 space-y-1.5">
                <p className="font-bold text-sm text-[#16345F] dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-[#C01072]" />
                  Real Estate Due Diligence
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Conducting 20-year chain of title audits, lien verification, tax peace-and-saved certs, and notarial deed closings.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 space-y-1.5">
                <p className="font-bold text-sm text-[#16345F] dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-[#C01072]" />
                  Corporate SAS Incorporation
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Drafting bylaws, registering foreign shareholders before the Chamber of Commerce, obtaining RUT from DIAN, and Banco de la República reporting.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 space-y-1.5">
                <p className="font-bold text-sm text-[#16345F] dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-[#C01072]" />
                  Scheduling & Retainer Credits
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Managing appointment slots, sending calendar invites, issuing invoices, and crediting the $67 USD consultation fee toward legal retainers.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Habeas Data Rights */}
          <section className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0F1E35] p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-[#16345F] dark:text-white flex items-center gap-2.5 m-0">
              <Scale className="size-5 text-[#C01072] shrink-0" />
              4. Client Rights under Colombian Law (Derechos ARCO)
            </h2>
            <p>
              As the titleholder of personal data under Law 1581 of 2012, whether you reside in Colombia or abroad, you possess the right to:
            </p>
            <ol className="list-decimal pl-5 space-y-2">
              <li><strong>Conocer (Access):</strong> Request confirmation and access to all personal data held in our systems free of charge.</li>
              <li><strong>Actualizar y Rectificar (Update & Rectify):</strong> Correct inaccurate, incomplete, or misleading records.</li>
              <li><strong>Suprimir (Deletion):</strong> Request data erasure when processing does not respect constitutional and legal principles (subject to mandatory legal retention periods under Colombian law).</li>
              <li><strong>Revocar Autorización (Revoke Consent):</strong> Withdraw authorization at any time where no contractual or statutory obligation requires maintenance of records.</li>
            </ol>
            <div className="p-4 rounded-xl bg-[#9BB8E0]/15 dark:bg-[#16345F]/30 border border-[#16345F]/15 dark:border-white/10 text-xs">
              <p className="font-bold text-[#16345F] dark:text-white">How to Exercise Your Habeas Data Rights:</p>
              <p className="mt-1 text-gray-700 dark:text-gray-300">
                Send an email with the subject line <strong>&ldquo;Habeas Data Request - [Your Full Name]&rdquo;</strong> to <a href="mailto:info@capitaleme.com" className="text-[#C01072] font-semibold underline">info@capitaleme.com</a>. By law, inquiries will be addressed within ten (10) business days, and formal claims within fifteen (15) business days.
              </p>
            </div>
          </section>

          {/* Section 5: Third-Party Tools & Security */}
          <section className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0F1E35] p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-[#16345F] dark:text-white flex items-center gap-2.5 m-0">
              <ShieldCheck className="size-5 text-[#C01072] shrink-0" />
              5. International Transfers & Technical Security Safeguards
            </h2>
            <p>
              To provide modern legal representation, we utilize cloud infrastructure and booking partners compliant with high international security standards:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Calendly LLC:</strong> Automated appointment management and calendar synchronization (<a href="https://calendly.com" target="_blank" rel="noopener noreferrer" className="text-[#C01072] underline">Calendly Privacy</a>).</li>
              <li><strong>Google Workspace:</strong> Secure cloud storage, encrypted email, and Google Meet video conferencing.</li>
              <li><strong>Payment Processors:</strong> Stripe and Wompi utilizing 256-bit SSL transport layer encryption and PCI-DSS compliance.</li>
            </ul>
            <p>
              Data is retained strictly for the duration of the attorney-client representation and the mandatory statutory limitation periods established by the Colombian Commercial Code and Tax Code (Estatuto Tributario).
            </p>
          </section>

          {/* Section 6: Inquiries & Contact */}
          <section className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0F1E35] p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-[#16345F] dark:text-white flex items-center gap-2.5 m-0">
              <Mail className="size-5 text-[#C01072] shrink-0" />
              6. Questions & Data Protection Officer Contact
            </h2>
            <p>
              If you have any questions regarding this Privacy Policy or wish to review your records, please contact our team:
            </p>
            <div className="text-xs space-y-1 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-white/[0.02] p-4 rounded-xl border border-gray-100 dark:border-white/5">
              <p><strong>Capital M Law – Privacy & Compliance Office</strong></p>
              <p>Email: <a href="mailto:info@capitaleme.com" className="text-[#C01072] underline">info@capitaleme.com</a></p>
              <p>Phone / WhatsApp: +57 314 602 2411</p>
              <p>Medellín, Antioquia, Colombia</p>
            </div>
          </section>
        </article>

        {/* Bottom CTA Banner */}
        <section className="mt-12 rounded-3xl bg-gradient-to-r from-[#16345F] to-[#204982] p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <p className="text-xs font-bold uppercase tracking-wider text-[#9BB8E0]">Ready to consult your case?</p>
            <h3 className="text-xl sm:text-2xl font-black">Book Your 45-Min Legal Assessment</h3>
            <p className="text-xs text-gray-300 max-w-md">
              $67 USD structured consultation with a licensed attorney, 100% credited toward your legal retainer.
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
