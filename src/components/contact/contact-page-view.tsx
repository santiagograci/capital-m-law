"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Clock,
  ShieldCheck,
  Languages,
  Lock,
  Mail,
  MessageCircle,
  Calendar,
  MapPin,
  Copy,
  Check,
  ExternalLink,
  Paperclip,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Info,
  FileText,
  X,
} from "lucide-react";
import { BlogHeader } from "@/components/blog/blog-header";
import { Footer, SOCIAL_LINKS } from "@/components/Footer";
import { WEB3FORMS_ACCESS_KEY } from "@/lib/web3forms";

const SERVICE_PROMISES = [
  {
    title: "24h Response Guarantee",
    description: "We review and reply to every inquiry within 24 business hours.",
    icon: Clock,
    accent: "text-[#C01072] dark:text-[#F472B6]",
    bgAccent: "bg-[#C01072]/10 border-[#C01072]/25",
  },
  {
    title: "Transparent Fixed Fees",
    description: "Predefined scopes, zero hidden costs, clear roadmaps.",
    icon: ShieldCheck,
    accent: "text-[#00AA81] dark:text-[#34D399]",
    bgAccent: "bg-[#00AA81]/10 border-[#00AA81]/25",
  },
  {
    title: "Bilingual Fluency",
    description: "Clear, empathetic counsel in English & Spanish.",
    icon: Languages,
    accent: "text-[#9BB8E0]",
    bgAccent: "bg-[#9BB8E0]/15 border-[#9BB8E0]/30",
  },
  {
    title: "Strict Confidentiality",
    description: "Your documents and corporate records remain 100% confidential.",
    icon: Lock,
    accent: "text-amber-400",
    bgAccent: "bg-amber-400/10 border-amber-400/25",
  },
];

const SERVICE_OPTIONS = [
  "Visas & Immigration",
  "Real Estate Transactions & Title Study",
  "SAS Company Incorporation",
  "Marriage & Prenuptial Agreements",
  "Wills, Trusts & Estate Planning",
  "Labour Law & Employment Compliance",
  "General Legal Inquiry",
];

export function ContactPageView() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(SERVICE_OPTIONS[0]);
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("info@capitaleme.com");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      window.location.href = "mailto:info@capitaleme.com";
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Nueva Consulta Web: ${service || "General"} - ${name}`,
          from_name: "Web Capital M Law",
          name,
          email,
          phone,
          service,
          message,
          attachment_name: attachment ? `${attachment.name} (${Math.round(attachment.size / 1024)} KB)` : "None",
        }),
      });

      const data = await response.json();

      if (response.ok && data?.success === true) {
        setSubmitted(true);
        setName("");
        setEmail("");
        setPhone("");
        setService(SERVICE_OPTIONS[0]);
        setMessage("");
        setAttachment(null);
        setTermsAccepted(false);
      } else {
        setError(
          "No se pudo enviar el mensaje. Por favor intenta contactarnos directamente por WhatsApp."
        );
      }
    } catch {
      setError(
        "No se pudo enviar el mensaje. Por favor intenta contactarnos directamente por WhatsApp."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0A1526] text-white flex flex-col justify-between overflow-hidden">
      {/* Subtle Inverted Legal Background Texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url('/assets/legal-pattern.svg')] bg-[length:130px_130px] bg-repeat opacity-[0.04] invert mix-blend-screen pointer-events-none z-0"
      />

      {/* Ambient Glow Accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/4 size-[480px] rounded-full bg-[#C01072]/10 blur-3xl z-0"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -right-32 size-[440px] rounded-full bg-[#9BB8E0]/10 blur-3xl z-0"
      />

      <BlogHeader />

      <main className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-14">
        {/* 1. HERO & SERVICE PROMISES */}
        <section className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#C01072]/30 bg-[#C01072]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#F472B6]">
              <ShieldCheck className="size-4" />
              Direct Attorney-Client Channel
            </span>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Service Promises &amp; Direct Contact
            </h1>

            {/* Stylized Information Banner */}
            <div className="mt-4 inline-flex items-start sm:items-center gap-3 rounded-2xl bg-[#0F223D]/90 border border-[#9BB8E0]/25 px-5 py-3.5 text-left sm:text-center shadow-lg">
              <Info className="size-5 text-[#9BB8E0] shrink-0 mt-0.5 sm:mt-0" />
              <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                Please note: Our primary contact methods are email, WhatsApp, and Calendly. We do not accept direct phone calls.
              </p>
            </div>
          </div>

          {/* 4 Service Promises Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-2">
            {SERVICE_PROMISES.map((promise) => {
              const Icon = promise.icon;
              return (
                <div
                  key={promise.title}
                  className="rounded-2xl bg-[#0F223D]/80 backdrop-blur-md border border-white/10 p-6 shadow-xl hover:border-white/25 transition-all duration-300 flex flex-col justify-between space-y-4"
                >
                  <div
                    className={`size-11 rounded-xl border flex items-center justify-center ${promise.bgAccent}`}
                  >
                    <Icon className={`size-5 ${promise.accent}`} />
                  </div>
                  <div className="space-y-1.5">
                    <h2 className="text-base sm:text-lg font-bold text-white">
                      {promise.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {promise.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 2. CONTACT INFORMATION & INQUIRY FORM (2 COLUMNS ON DESKTOP) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Contact Information */}
          <div className="lg:col-span-5 rounded-3xl bg-[#0F223D]/90 backdrop-blur-md border border-white/10 p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="space-y-1.5">
              <h2 className="text-2xl font-bold text-white">Contact information</h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Reach out to our bilingual legal team in Medellín through any of our verified channels below.
              </p>
            </div>

            <div className="space-y-4">
              {/* Email Card (Click to Copy) */}
              <div className="rounded-2xl bg-slate-900/60 border border-white/10 p-4 hover:border-[#C01072]/50 transition-all">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3.5 min-w-0">
                    <div className="size-10 rounded-xl bg-[#C01072]/15 border border-[#C01072]/30 flex items-center justify-center text-[#F472B6] shrink-0">
                      <Mail className="size-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Official Email
                      </p>
                      <a
                        href="mailto:info@capitaleme.com"
                        className="text-sm sm:text-base font-bold text-white hover:text-[#F472B6] transition-colors truncate block"
                      >
                        info@capitaleme.com
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 hover:bg-[#C01072] px-3 py-2 text-xs font-semibold text-white transition cursor-pointer shrink-0"
                    title="Copy email address"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="size-3.5 text-[#10B981]" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* WhatsApp Card */}
              <a
                href="https://api.whatsapp.com/send?phone=573146022411&text=Hello%20Capital%20M%20Law%2C%20I%20would%20like%20to%20inquire%20about%20legal%20services%20in%20Colombia."
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-2xl bg-slate-900/60 border border-white/10 p-4 hover:border-[#25D366]/60 transition-all"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div className="size-10 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] shrink-0">
                      <MessageCircle className="size-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        WhatsApp Business
                      </p>
                      <p className="text-sm sm:text-base font-bold text-white group-hover:text-[#25D366] transition-colors">
                        +57 314 602 2411
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#25D366] bg-[#25D366]/10 px-3 py-1.5 rounded-xl group-hover:bg-[#25D366] group-hover:text-slate-950 transition-colors">
                    Chat <ExternalLink className="size-3.5" />
                  </span>
                </div>
              </a>

              {/* Calendly Card */}
              <div className="rounded-2xl bg-slate-900/60 border border-white/10 p-4 hover:border-[#9BB8E0]/50 transition-all space-y-3">
                <div className="flex items-center gap-3.5">
                  <div className="size-10 rounded-xl bg-[#9BB8E0]/15 border border-[#9BB8E0]/30 flex items-center justify-center text-[#9BB8E0] shrink-0">
                    <Calendar className="size-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Calendly Video Call
                    </p>
                    <p className="text-sm font-bold text-white">
                      1-on-1 Legal Strategy Session ($67 USD)
                    </p>
                  </div>
                </div>
                <a
                  href="https://calendly.com/capital-m-law-"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#C01072] hover:bg-[#A50E62] px-4 py-2.5 text-xs font-bold text-white shadow-md transition"
                >
                  <Calendar className="size-4" />
                  <span>Schedule Direct Video Call on Calendly</span>
                  <ExternalLink className="size-3.5" />
                </a>
              </div>

              {/* Main Office Card */}
              <div className="rounded-2xl bg-slate-900/60 border border-white/10 p-4">
                <div className="flex items-start gap-3.5">
                  <div className="size-10 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-300 shrink-0">
                    <MapPin className="size-5" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Main Office
                    </p>
                    <p className="text-sm sm:text-base font-bold text-white">
                      Cra 66D #32B-57, Belén Malibú, Medellín.
                    </p>
                    <p className="text-xs text-slate-400">
                      Coworking Inspira · Mon – Fri, 8:00 AM – 6:00 PM COT
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Official Social Media Channels */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-[#9BB8E0]">
                Official Social Channels
              </p>
              <div className="flex flex-wrap items-center gap-2.5">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = social.Icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className={`inline-flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3.5 py-2 text-xs font-semibold text-slate-200 transition-all duration-200 hover:-translate-y-0.5 ${social.hoverClass}`}
                    >
                      <Icon className="size-4" />
                      <span>{social.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Send us your inquiry (Web3Forms) */}
          <div className="lg:col-span-7 rounded-3xl bg-gradient-to-br from-[#16345F] to-[#0F223D] border border-white/15 p-6 sm:p-10 shadow-2xl space-y-6">
            <div className="space-y-1.5">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Send us your inquiry
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Complete the form below and our attorneys María Fernanda Duarte &amp; Ana María Muñoz will respond within 24 business hours.
              </p>
            </div>

            {submitted ? (
              <div className="rounded-2xl bg-white/10 border border-[#10B981]/40 p-8 text-center space-y-4">
                <CheckCircle2 className="size-12 mx-auto text-[#10B981]" />
                <h3 className="text-xl font-bold text-white">
                  ¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Thank you for contacting Capital M Law. Our legal team has received your inquiry and will get back to you within 24 business hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="inline-flex items-center justify-center rounded-xl bg-[#C01072] hover:bg-[#A50E62] px-6 py-2.5 text-xs font-bold text-white transition cursor-pointer"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold text-slate-200"
                    >
                      Full Name <span className="text-[#F472B6]">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full rounded-xl bg-slate-950/60 border border-white/15 px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C01072]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold text-slate-200"
                    >
                      Email Address <span className="text-[#F472B6]">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-xl bg-slate-950/60 border border-white/15 px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C01072]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-phone"
                      className="block text-xs font-semibold text-slate-200"
                    >
                      Phone / WhatsApp <span className="text-[#F472B6]">*</span>
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 234-5678"
                      className="w-full rounded-xl bg-slate-950/60 border border-white/15 px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C01072]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-service"
                      className="block text-xs font-semibold text-slate-200"
                    >
                      Service of Interest <span className="text-[#F472B6]">*</span>
                    </label>
                    <select
                      id="contact-service"
                      name="service"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full rounded-xl bg-slate-950/80 border border-white/15 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#C01072]"
                    >
                      {SERVICE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#0F223D] text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold text-slate-200"
                  >
                    Case Details / Message <span className="text-[#F472B6]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Briefly describe your legal needs, goals, or timeline in Colombia..."
                    className="w-full rounded-xl bg-slate-950/60 border border-white/15 px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C01072]"
                  />
                </div>

                {/* Supporting Document Attachment */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-attachment"
                    className="block text-xs font-semibold text-slate-200"
                  >
                    Supporting Document / Attachment (Optional)
                  </label>
                  <div className="flex items-center gap-3">
                    <label
                      htmlFor="contact-attachment"
                      className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/15 border border-dashed border-white/25 px-4 py-2.5 text-xs font-semibold text-slate-200 cursor-pointer transition"
                    >
                      <Paperclip className="size-4 text-[#9BB8E0]" />
                      <span>{attachment ? "Change file" : "Attach PDF, JPG or DOCX"}</span>
                    </label>
                    <input
                      id="contact-attachment"
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={(e) => setAttachment(e.target.files?.[0] ?? null)}
                      className="sr-only"
                    />
                    {attachment && (
                      <div className="inline-flex items-center gap-2 rounded-xl bg-slate-900/80 border border-white/10 px-3 py-2 text-xs text-slate-200 max-w-xs">
                        <FileText className="size-3.5 text-[#10B981] shrink-0" />
                        <span className="truncate">{attachment.name}</span>
                        <button
                          type="button"
                          onClick={() => setAttachment(null)}
                          className="text-slate-400 hover:text-white cursor-pointer"
                          aria-label="Remove attachment"
                        >
                          <X className="size-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {error && (
                  <div
                    role="alert"
                    className="rounded-xl bg-red-500/20 border border-red-400/40 p-3.5 text-xs text-white flex items-start gap-2.5"
                  >
                    <AlertCircle className="size-4 text-red-300 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Terms Acceptance */}
                <label className="flex items-start gap-2.5 text-xs text-slate-300 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    required
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-0.5 size-4 rounded accent-[#C01072]"
                  />
                  <span>
                    I accept the{" "}
                    <Link
                      href="/privacy-policy"
                      className="text-white underline hover:text-[#F472B6]"
                    >
                      Privacy Policy
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/terms-and-conditions"
                      className="text-white underline hover:text-[#F472B6]"
                    >
                      Terms &amp; Conditions
                    </Link>
                    , and authorize Capital M Law to process my inquiry under Colombian Attorney-Client Privilege.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-xl bg-[#C01072] hover:bg-[#A50E62] disabled:opacity-60 disabled:cursor-not-allowed py-3.5 px-6 text-sm font-bold text-white shadow-lg transition inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      <span>Sending inquiry...</span>
                    </>
                  ) : (
                    <span>Send Inquiry to Capital M Law</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer lang="en" />
    </div>
  );
}
