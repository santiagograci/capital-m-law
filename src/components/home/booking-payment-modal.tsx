"use client";

import React, { useState } from "react";
import {
  X,
  Calendar,
  Clock,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  Lock,
  Sparkles,
  ArrowRight,
  ExternalLink,
  User,
  Mail,
  Phone,
  Globe,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
  defaultAttorney?: string;
  lang?: "en" | "es";
}

export const CALENDLY_URL = "https://calendly.com/capital-m-law-";
export const BOLD_CHECKOUT_URL = "https://checkout.bold.co/payment/LNK_JTIV4A6HM0";

const AVAILABLE_TIMES = [
  "09:00 AM COT",
  "10:30 AM COT",
  "02:00 PM COT",
  "03:30 PM COT",
  "05:00 PM COT",
];

const ATTORNEYS = [
  {
    id: "maria",
    name: "María Fernanda Duarte",
    role: "Founder & Principal Attorney",
    roleEs: "Socia Fundadora y Directora",
    bar: "CSJ #289.412",
  },
  {
    id: "ana",
    name: "Ana María Muñoz",
    role: "Associate Attorney",
    roleEs: "Abogada Asociada",
    bar: "CSJ #312.870",
  },
  {
    id: "any",
    name: "First Available Senior Attorney",
    nameEs: "Primera Abogada Senior Disponible",
    role: "Instant Assignment",
    roleEs: "Asignación Inmediata",
    bar: "Capital M Law Legal Team",
  },
];

export function BookingPaymentModal({
  isOpen,
  onClose,
  defaultService = "Visas & Immigration",
  defaultAttorney = "any",
  lang = "en",
}: BookingModalProps) {
  // mode: "calendly" (embedded interactive calendar) or "manual"
  const [viewMode, setViewMode] = useState<"calendly" | "manual">("calendly");
  const [step, setStep] = useState<"details" | "payment" | "confirmed">("details");
  const [selectedAttorney, setSelectedAttorney] = useState(defaultAttorney);
  const [selectedDate, setSelectedDate] = useState("Tomorrow");
  const [selectedTime, setSelectedTime] = useState(AVAILABLE_TIMES[0]);
  const [serviceMatter, setServiceMatter] = useState(defaultService);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "wompi" | "paypal">("card");

  if (!isOpen) return null;

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handleConfirmBookingAndPay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep("confirmed");
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white dark:bg-[#0F1E35] rounded-3xl shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="p-5 sm:p-6 bg-[#16345F] text-white flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-white/10 flex items-center justify-center text-[#9BB8E0] shrink-0">
              <Calendar className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base sm:text-lg leading-tight">
                  {lang === "es" ? "Agendar Consulta Oficial · $67 USD" : "Book Official Legal Consultation · $67"}
                </h3>
                <span className="hidden sm:inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#C01072] text-white uppercase tracking-wider">
                  Calendly
                </span>
              </div>
              <p className="text-xs text-[#9BB8E0] mt-0.5">
                {lang === "es"
                  ? "Sesión de 45 min con abogada titulada · 100% abonable al honorario de tu trámite"
                  : "45-min legal session with licensed attorney · 100% credited to your retainer"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-white font-medium transition"
              title="Open Calendly in a new tab"
            >
              <span>{lang === "es" ? "Abrir pestaña" : "Open tab"}</span>
              <ExternalLink className="size-3" />
            </a>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="size-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* Tab Selector: Calendly Oficial vs Formulario Directo */}
        <div className="flex border-b border-gray-100 dark:border-white/10 bg-gray-50/70 dark:bg-white/[0.02] px-6 pt-2">
          <button
            type="button"
            onClick={() => setViewMode("calendly")}
            className={cn(
              "py-2.5 px-4 text-xs font-bold border-b-2 transition flex items-center gap-2",
              viewMode === "calendly"
                ? "border-[#C01072] text-[#C01072] dark:text-[#F472B6]"
                : "border-transparent text-gray-500 hover:text-[#16345F] dark:hover:text-white"
            )}
          >
            <Calendar className="size-3.5" />
            <span>{lang === "es" ? "Calendly Oficial (Recomendado)" : "Official Calendly (Recommended)"}</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("manual")}
            className={cn(
              "py-2.5 px-4 text-xs font-bold border-b-2 transition flex items-center gap-2",
              viewMode === "manual"
                ? "border-[#C01072] text-[#C01072] dark:text-[#F472B6]"
                : "border-transparent text-gray-500 hover:text-[#16345F] dark:hover:text-white"
            )}
          >
            <CreditCard className="size-3.5" />
            <span>{lang === "es" ? "Formulario & Pasarela Directa" : "Direct Intake & Payment"}</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto">
          {viewMode === "calendly" ? (
            <div className="flex flex-col h-full min-h-[520px]">
              {/* Calendly notice bar */}
              <div className="p-4 bg-[#9BB8E0]/15 dark:bg-[#16345F]/30 border-b border-[#16345F]/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-[#16345F] dark:text-gray-200">
                  <ShieldCheck className="size-4 text-[#C01072] shrink-0" />
                  <span>
                    {lang === "es"
                      ? "Selecciona tu fecha y hora preferida en el calendario oficial de Capital M Law:"
                      : "Pick your preferred date and time on Capital M Law's official calendar:"}
                  </span>
                </div>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#C01072] hover:underline inline-flex items-center gap-1"
                >
                  {lang === "es" ? "Ver directamente en calendly.com" : "View on calendly.com"}
                  <ExternalLink className="size-3" />
                </a>
              </div>

              {/* Calendly Iframe Container */}
              <div className="flex-1 relative w-full h-[520px] bg-white">
                <iframe
                  src="https://calendly.com/capital-m-law-?embed_domain=capitalm.law&embed_type=Inline&hide_landing_page_details=1&hide_gdpr_banner=1"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  title="Capital M Law Calendly Scheduling"
                  className="w-full h-full min-h-[520px]"
                />
              </div>

              {/* Footer notes */}
              <div className="p-4 bg-gray-50 dark:bg-white/[0.03] border-t border-gray-100 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1.5">
                  <Lock className="size-3.5 text-[#C01072]" />
                  <span>
                    {lang === "es"
                      ? "Tarifa oficial: $67 USD · Abonable al honorario total de tu caso"
                      : "Official fee: $67 USD · Fully credited toward your final legal retainer"}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  <a
                    href={BOLD_CHECKOUT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#16345F] hover:bg-[#C01072] text-white font-bold text-center transition inline-flex items-center justify-center gap-1.5"
                  >
                    <CreditCard className="size-3.5" />
                    <span>{lang === "es" ? "Pagar Consulta (Bold)" : "Pay Consultation"}</span>
                  </a>
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#C01072] hover:bg-[#A50E62] text-white font-bold text-center transition"
                  >
                    {lang === "es" ? "Abrir en pantalla completa →" : "Open in full window →"}
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 sm:p-8 space-y-6">
              {step === "details" && (
                <form onSubmit={handleProceedToPayment} className="space-y-6">
                  {/* Stepper info */}
                  <div className="flex items-center justify-between text-xs font-semibold text-[#706F6F] dark:text-gray-400 border-b border-gray-100 dark:border-white/10 pb-3">
                    <span className="text-[#C01072] dark:text-[#F472B6]">
                      1. {lang === "es" ? "Detalles del Caso y Horario" : "Case Details & Schedule"}
                    </span>
                    <span>
                      2. {lang === "es" ? "Pago Seguro ($67 USD)" : "Secure Checkout ($67 USD)"}
                    </span>
                  </div>

                  {/* Attorney Selector */}
                  <div className="space-y-2.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#16345F] dark:text-white">
                      {lang === "es" ? "Abogada Asignada" : "Select Attorney"}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {ATTORNEYS.map((att) => {
                        const isSel = selectedAttorney === att.id;
                        return (
                          <button
                            key={att.id}
                            type="button"
                            onClick={() => setSelectedAttorney(att.id)}
                            className={cn(
                              "p-3 rounded-2xl border text-left transition flex flex-col justify-between cursor-pointer",
                              isSel
                                ? "border-[#C01072] bg-[#C01072]/5 dark:bg-[#C01072]/15 ring-2 ring-[#C01072]"
                                : "border-gray-200 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/20"
                            )}
                          >
                            <div>
                              <p className="font-bold text-xs text-[#16345F] dark:text-white">
                                {lang === "es" && att.nameEs ? att.nameEs : att.name}
                              </p>
                              <p className="text-[10px] text-[#706F6F] dark:text-gray-400 mt-0.5">
                                {lang === "es" ? att.roleEs : att.role}
                              </p>
                            </div>
                            <span className="text-[9px] font-mono text-[#9BB8E0] mt-2 block">
                              {att.bar}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Service Matter Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#16345F] dark:text-white">
                      {lang === "es" ? "Motivo Legal / Trámite" : "Legal Matter"}
                    </label>
                    <input
                      type="text"
                      value={serviceMatter}
                      onChange={(e) => setServiceMatter(e.target.value)}
                      placeholder="e.g. Visa Digital Nomad, Title Search, SAS Incorporation..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-[#FAFBFD] dark:bg-white/[0.04] text-sm text-gray-900 dark:text-white focus:outline-hidden focus:border-[#C01072]"
                      required
                    />
                  </div>

                  {/* Time slot picker */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#16345F] dark:text-white">
                      {lang === "es" ? "Horario Sugerido (Medellín GMT-5)" : "Suggested Time Slot (COT)"}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {AVAILABLE_TIMES.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTime(slot)}
                          className={cn(
                            "py-2 px-1 text-center rounded-xl text-xs font-semibold border transition cursor-pointer",
                            selectedTime === slot
                              ? "bg-[#16345F] text-white border-[#16345F]"
                              : "border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
                          )}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Client Info Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                        {lang === "es" ? "Nombre Completo" : "Full Name"} *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. John Doe"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-[#FAFBFD] dark:bg-white/[0.04] text-xs text-gray-900 dark:text-white focus:outline-hidden focus:border-[#C01072]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                        {lang === "es" ? "Correo Electrónico" : "Email Address"} *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-[#FAFBFD] dark:bg-white/[0.04] text-xs text-gray-900 dark:text-white focus:outline-hidden focus:border-[#C01072]"
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 dark:border-white/10">
                    <div className="text-xs text-gray-500">
                      <span className="font-bold text-[#16345F] dark:text-white">$67 USD</span>{" "}
                      {lang === "es" ? "por sesión de 45 min" : "for 45-min session"}
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={BOLD_CHECKOUT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-xl bg-[#C01072] hover:bg-[#A50E62] text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-md"
                      >
                        <span>{lang === "es" ? "Pagar Consulta ($67)" : "Pay Consultation ($67)"}</span>
                        <ArrowRight className="size-4" />
                      </a>
                    </div>
                  </div>
                </form>
              )}

              {step === "payment" && (
                <div className="space-y-6">
                  {/* Stepper info */}
                  <div className="flex items-center justify-between text-xs font-semibold text-[#706F6F] dark:text-gray-400 border-b border-gray-100 dark:border-white/10 pb-3">
                    <button
                      type="button"
                      onClick={() => setStep("details")}
                      className="text-[#16345F] dark:text-gray-200 hover:underline"
                    >
                      ← {lang === "es" ? "Modificar Horario" : "Edit Schedule"}
                    </button>
                    <span className="text-[#C01072] dark:text-[#F472B6]">
                      2. {lang === "es" ? "Pago Seguro ($67 USD)" : "Secure Checkout ($67 USD)"}
                    </span>
                  </div>

                  {/* Order Summary Box */}
                  <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 space-y-2 text-xs">
                    <div className="flex justify-between items-center text-sm font-bold text-[#16345F] dark:text-white pb-2 border-b border-gray-200 dark:border-white/10">
                      <span>{lang === "es" ? "Consulta Legal Capital M Law" : "Capital M Law Intake"}</span>
                      <span className="text-[#C01072] dark:text-[#F472B6] font-mono">$67.00 USD</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      <strong>{lang === "es" ? "Cliente:" : "Client:"}</strong> {fullName || "Guest"} ({email})
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      <strong>{lang === "es" ? "Asunto:" : "Matter:"}</strong> {serviceMatter}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      <strong>{lang === "es" ? "Horario:" : "Time:"}</strong> {selectedDate} @ {selectedTime}
                    </p>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#16345F] dark:text-white">
                      {lang === "es" ? "Método de Pago" : "Payment Method"}
                    </label>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("card")}
                        className={cn(
                          "p-3 rounded-xl border text-center font-semibold transition cursor-pointer",
                          paymentMethod === "card"
                            ? "border-[#C01072] bg-[#C01072]/5 text-[#C01072] dark:text-[#F472B6]"
                            : "border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300"
                        )}
                      >
                        Credit Card
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("wompi")}
                        className={cn(
                          "p-3 rounded-xl border text-center font-semibold transition cursor-pointer",
                          paymentMethod === "wompi"
                            ? "border-[#C01072] bg-[#C01072]/5 text-[#C01072] dark:text-[#F472B6]"
                            : "border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300"
                        )}
                      >
                        Wompi / PSE
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("paypal")}
                        className={cn(
                          "p-3 rounded-xl border text-center font-semibold transition cursor-pointer",
                          paymentMethod === "paypal"
                            ? "border-[#C01072] bg-[#C01072]/5 text-[#C01072] dark:text-[#F472B6]"
                            : "border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300"
                        )}
                      >
                        PayPal
                      </button>
                    </div>
                  </div>

                  {/* Card form simulator */}
                  <div className="space-y-3 p-4 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.02]">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-gray-600 dark:text-gray-300">
                        {lang === "es" ? "Número de Tarjeta" : "Card Number"}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="•••• •••• •••• 4242"
                          defaultValue="•••• •••• •••• 4242"
                          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-[#FAFBFD] dark:bg-white/[0.04] text-xs font-mono"
                        />
                        <Lock className="size-3.5 text-gray-400 absolute right-3 top-3" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-gray-600 dark:text-gray-300">
                          Exp Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          defaultValue="12/28"
                          className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-white/10 bg-[#FAFBFD] dark:bg-white/[0.04] text-xs font-mono"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-gray-600 dark:text-gray-300">
                          CVC / CVV
                        </label>
                        <input
                          type="text"
                          placeholder="•••"
                          defaultValue="•••"
                          className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-white/10 bg-[#FAFBFD] dark:bg-white/[0.04] text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 256-bit SSL disclaimer */}
                  <div className="flex items-center gap-2 text-[11px] text-gray-500">
                    <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
                    <span>
                      {lang === "es"
                        ? "Transacción cifrada SSL 256-bit. Los $67 USD se descuentan 100% al contratar el servicio."
                        : "256-bit encrypted checkout. Your $67 USD is 100% credited toward full case retainer."}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 flex items-center justify-between border-t border-gray-100 dark:border-white/10">
                    <button
                      type="button"
                      onClick={() => setStep("details")}
                      className="px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                    >
                      {lang === "es" ? "Regresar" : "Back"}
                    </button>
                    <a
                      href={BOLD_CHECKOUT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-3 rounded-xl bg-[#16345F] hover:bg-[#C01072] text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      <Lock className="size-3.5" />
                      <span>{lang === "es" ? "Pagar Consulta ($67 USD)" : "Pay Consultation ($67 USD)"}</span>
                      <ExternalLink className="size-3.5" />
                    </a>
                  </div>
                </div>
              )}

              {step === "confirmed" && (
                <div className="text-center py-6 space-y-5 animate-fadeIn">
                  <div className="size-16 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-300 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="size-9" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-2xl font-black text-[#16345F] dark:text-white">
                      {lang === "es" ? "¡Consulta Confirmada con Éxito!" : "Consultation Successfully Booked!"}
                    </h3>
                    <p className="text-xs text-[#706F6F] dark:text-gray-300 max-w-md mx-auto">
                      {lang === "es"
                        ? `Hemos enviado la confirmación y el enlace de Google Meet a ${email || "tu correo"}. Tu cita quedó agendada para ${selectedDate} a las ${selectedTime}.`
                        : `We've emailed your calendar invite and Google Meet link to ${email || "your address"}. Scheduled for ${selectedDate} at ${selectedTime}.`}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAFBFD] dark:bg-white/[0.03] border border-gray-100 dark:border-white/10 max-w-sm mx-auto text-xs text-left space-y-1.5">
                    <p className="font-bold text-[#16345F] dark:text-white">
                      {lang === "es" ? "Número de Recibo:" : "Receipt Number:"} <span className="font-mono text-[#C01072]">CAPM-2026-984</span>
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {lang === "es" ? "Monto Cancelado:" : "Amount Paid:"} <strong>$67.00 USD (Acreditables)</strong>
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {lang === "es" ? "Abogada Asignada:" : "Assigned Attorney:"}{" "}
                      <strong>{ATTORNEYS.find((a) => a.id === selectedAttorney)?.name}</strong>
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    className="px-8 py-3 rounded-xl bg-[#16345F] text-white text-xs font-bold hover:bg-[#C01072] transition"
                  >
                    {lang === "es" ? "Finalizar y Regresar al Sitio" : "Done & Return to Site"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
