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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#0F1E35] rounded-3xl shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="p-6 bg-[#16345F] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-white/10 flex items-center justify-center text-[#9BB8E0]">
              <Calendar className="size-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">
                {lang === "es" ? "Reserva y Pago Directo de Consulta" : "Direct Consultation & Instant Booking"}
              </h3>
              <p className="text-xs text-[#9BB8E0]">
                {lang === "es"
                  ? "Sesión de 45 min con abogada titulada · $67 USD (Abonables a tu trámite)"
                  : "45-min legal intake with licensed attorney · $67 USD (Credited to your retainer)"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="size-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
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
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#16345F] dark:text-gray-200">
                  {lang === "es" ? "Selecciona Abogada:" : "Select Legal Counsel:"}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {ATTORNEYS.map((att) => (
                    <button
                      type="button"
                      key={att.id}
                      onClick={() => setSelectedAttorney(att.id)}
                      className={cn(
                        "p-3 rounded-2xl border text-left transition-all text-xs space-y-1",
                        selectedAttorney === att.id
                          ? "border-[#C01072] bg-[#C01072]/5 dark:bg-[#C01072]/20 shadow-xs"
                          : "border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 bg-[#FAFBFD] dark:bg-white/[0.02]"
                      )}
                    >
                      <p className="font-bold text-[#16345F] dark:text-white truncate">{att.name}</p>
                      <p className="text-[10px] text-[#706F6F] dark:text-gray-400">{lang === "es" ? att.roleEs : att.role}</p>
                      <p className="text-[9px] font-mono text-[#C01072] dark:text-[#F472B6]">{att.bar}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time Selector (Interactive Slots) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#16345F] dark:text-gray-200">
                    {lang === "es" ? "Día Preferido:" : "Preferred Day:"}
                  </label>
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#070E1A] text-xs font-semibold text-[#16345F] dark:text-white outline-none focus:border-[#9BB8E0]"
                  >
                    <option value="Tomorrow">{lang === "es" ? "Mañana (Prioritario)" : "Tomorrow (Priority)"}</option>
                    <option value="In 2 days">{lang === "es" ? "En 2 Días Hábiles" : "In 2 Business Days"}</option>
                    <option value="In 3 days">{lang === "es" ? "En 3 Días Hábiles" : "In 3 Business Days"}</option>
                    <option value="Next Week">{lang === "es" ? "Próxima Semana" : "Next Week"}</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#16345F] dark:text-gray-200">
                    {lang === "es" ? "Franja Horaria (Hora Colombia):" : "Time Slot (COT):"}
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#070E1A] text-xs font-semibold text-[#16345F] dark:text-white outline-none focus:border-[#9BB8E0]"
                  >
                    {AVAILABLE_TIMES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Client Info Inputs */}
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    required
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={lang === "es" ? "Tu Nombre Completo" : "Your Full Legal Name"}
                    className="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#070E1A] text-xs text-gray-800 dark:text-white outline-none focus:border-[#9BB8E0]"
                  />
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={lang === "es" ? "Correo Electrónico (Para envío de link)" : "Email (For Google Meet Link)"}
                    className="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#070E1A] text-xs text-gray-800 dark:text-white outline-none focus:border-[#9BB8E0]"
                  />
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={lang === "es" ? "WhatsApp / Teléfono Internacional (+1, +57...)" : "WhatsApp / Phone (+1, +44, +57...)"}
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#070E1A] text-xs text-gray-800 dark:text-white outline-none focus:border-[#9BB8E0]"
                />
              </div>

              {/* Submit to Step 2 */}
              <button
                type="submit"
                className="w-full h-13 rounded-2xl bg-[#C01072] hover:bg-[#A50E62] text-white font-bold text-sm shadow-lg transition flex items-center justify-center gap-2"
              >
                <span>{lang === "es" ? "Continuar al Pago Seguro · $67 USD" : "Proceed to Secure Payment · $67 USD"}</span>
                <ArrowRight className="size-4" />
              </button>
            </form>
          )}

          {step === "payment" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs font-semibold text-[#706F6F] dark:text-gray-400 border-b border-gray-100 dark:border-white/10 pb-3">
                <button
                  onClick={() => setStep("details")}
                  className="text-xs text-[#16345F] dark:text-[#9BB8E0] hover:underline"
                >
                  ← {lang === "es" ? "Modificar cita" : "Edit appointment"}
                </button>
                <span className="text-[#C01072] dark:text-[#F472B6]">
                  2. {lang === "es" ? "Pago Seguro ($67 USD)" : "Secure Checkout ($67 USD)"}
                </span>
              </div>

              {/* Order Summary Box */}
              <div className="p-4 rounded-2xl bg-[#FAFBFD] dark:bg-white/[0.03] border border-[#16345F]/10 dark:border-white/10 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-[#706F6F] dark:text-gray-400">{lang === "es" ? "Servicio:" : "Service:"}</span>
                  <span className="font-bold text-[#16345F] dark:text-white">{serviceMatter}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#706F6F] dark:text-gray-400">{lang === "es" ? "Horario:" : "Schedule:"}</span>
                  <span className="font-semibold text-[#16345F] dark:text-white">
                    {selectedDate} @ {selectedTime}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#706F6F] dark:text-gray-400">{lang === "es" ? "Cliente:" : "Client:"}</span>
                  <span className="font-semibold text-[#16345F] dark:text-white">{fullName || "Client"}</span>
                </div>
                <div className="pt-2 border-t border-gray-200 dark:border-white/10 flex justify-between items-center text-sm font-extrabold text-[#C01072] dark:text-[#F472B6]">
                  <span>{lang === "es" ? "Total a Pagar:" : "Total Amount:"}</span>
                  <span>$67.00 USD</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-[#16345F] dark:text-gray-200">
                  {lang === "es" ? "Método de Pago:" : "Payment Gateway:"}
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={cn(
                      "p-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2",
                      paymentMethod === "card"
                        ? "border-[#16345F] bg-[#16345F] text-white"
                        : "border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200"
                    )}
                  >
                    <CreditCard className="size-4" /> Credit Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("wompi")}
                    className={cn(
                      "p-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2",
                      paymentMethod === "wompi"
                        ? "border-[#16345F] bg-[#16345F] text-white"
                        : "border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200"
                    )}
                  >
                    Wompi / PSE
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("paypal")}
                    className={cn(
                      "p-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2",
                      paymentMethod === "paypal"
                        ? "border-[#16345F] bg-[#16345F] text-white"
                        : "border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200"
                    )}
                  >
                    PayPal
                  </button>
                </div>

                {/* Simulated Card Form */}
                {paymentMethod === "card" && (
                  <div className="space-y-3 pt-2">
                    <input
                      type="text"
                      placeholder="Card Number (•••• •••• •••• ••••)"
                      defaultValue="4242 •••• •••• 4242"
                      className="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#070E1A] text-xs font-mono text-gray-800 dark:text-white"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        defaultValue="12/28"
                        className="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#070E1A] text-xs font-mono text-gray-800 dark:text-white"
                      />
                      <input
                        type="text"
                        placeholder="CVC"
                        defaultValue="888"
                        className="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#070E1A] text-xs font-mono text-gray-800 dark:text-white"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
                <Lock className="size-4 shrink-0 text-emerald-600" />
                <span>
                  {lang === "es"
                    ? "Cifrado SSL de 256 bits. Los $67 USD se descuentan 100% de los honorarios de tu proceso legal."
                    : "256-bit SSL encryption. The $67 fee is 100% credited toward your full legal retainer."}
                </span>
              </div>

              {/* Confirm & Pay Button */}
              <button
                type="button"
                disabled={isProcessing}
                onClick={handleConfirmBookingAndPay}
                className="w-full h-13 rounded-2xl bg-[#C01072] hover:bg-[#A50E62] text-white font-bold text-sm shadow-xl transition flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>{lang === "es" ? "Procesando pago y agendando..." : "Processing payment & booking..."}</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="size-4" />
                    <span>{lang === "es" ? "Pagar $67 USD y Confirmar Cita" : "Pay $67 USD & Lock In Consultation"}</span>
                  </>
                )}
              </button>
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
      </div>
    </div>
  );
}
