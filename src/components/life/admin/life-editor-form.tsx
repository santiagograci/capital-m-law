"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import {
  Camera,
  Upload,
  Image as ImageIcon,
  Save,
  ArrowLeft,
  LoaderCircle,
  MapPin,
  Sparkles,
  Tag,
  User,
} from "lucide-react";
import type { ActionResult, LifeMoment } from "@/types/life";
import { createLifeMomentAction, updateLifeMomentAction } from "@/lib/life/actions";
import { cn } from "@/lib/utils";

interface LifeEditorFormProps {
  moment?: LifeMoment;
}

export function LifeEditorForm({ moment }: LifeEditorFormProps) {
  const isEditing = Boolean(moment);
  const actionFn = isEditing && moment
    ? updateLifeMomentAction.bind(null, moment.id)
    : createLifeMomentAction;

  const [state, action, pending] = useActionState(actionFn, null);

  const [imageUrl, setImageUrl] = useState<string>(
    moment?.image ||
      "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80"
  );
  const [previewFileUrl, setPreviewFileUrl] = useState<string | null>(null);
  const [locationValue, setLocationValue] = useState<string>(
    moment?.location || "El Poblado, Medellín (Provenza)"
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewFileUrl(objectUrl);
    }
  };

  const quickLocations = [
    "Provenza, El Poblado",
    "Notaría 15, Laureles",
    "Medellín HQ (Belén Malibú)",
    "Migración Colombia, Medellín",
    "Oriente Antioqueño (Llanogrande)",
  ];

  return (
    <form action={action} className="space-y-8">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#16345F]/10 dark:border-white/10 pb-6">
        <div>
          <Link
            href="/admin/life"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#706F6F] hover:text-[#16345F] dark:hover:text-white transition mb-2"
          >
            <ArrowLeft className="size-3.5" />
            <span>Volver a la galería</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-[#16345F] dark:text-white">
            {isEditing ? `Editar Momento: ${moment?.title.es}` : "Añadir Nuevo Momento de la Firma"}
          </h1>
          <p className="text-xs sm:text-sm text-[#706F6F] dark:text-gray-400 mt-1">
            Se mostrará dinámicamente en la sección "Life at Capital M" de la página principal.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/life"
            className="rounded-xl border border-gray-200 dark:border-white/15 px-4 py-2.5 text-xs font-semibold text-[#16345F] dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center gap-2 rounded-xl bg-[#C01072] hover:bg-[#A50E62] text-white px-5 py-2.5 text-xs font-bold shadow-md transition disabled:opacity-60 cursor-pointer"
          >
            {pending ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : (
              <Save className="size-4" />
            )}
            <span>{isEditing ? "Guardar Cambios" : "Publicar Momento"}</span>
          </button>
        </div>
      </div>

      {state && !state.ok && (
        <div className="rounded-2xl bg-rose-50 border border-rose-200 p-4 text-xs font-semibold text-rose-700 dark:bg-rose-950/40 dark:border-rose-900 dark:text-rose-300">
          ⚠️ {state.message}
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Photo & Media (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl border border-[#16345F]/10 dark:border-white/10 bg-white dark:bg-[#0F1E35] p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#16345F] dark:text-white flex items-center gap-2">
              <Camera className="size-4 text-[#C01072]" />
              Fotografía del Momento
            </h3>

            {/* Live Preview */}
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 relative">
              <img
                src={previewFileUrl || imageUrl}
                alt="Vista previa"
                className="size-full object-cover"
              />
            </div>

            {/* File Upload Button */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#16345F] dark:text-gray-300">
                Subir Fotografía (PC):
              </label>
              <label className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-[#16345F]/20 dark:border-white/20 p-3 text-xs font-semibold text-[#16345F] dark:text-gray-200 hover:bg-[#16345F]/5 dark:hover:bg-white/5 cursor-pointer transition">
                <Upload className="size-4 text-[#C01072]" />
                <span>Seleccionar Imagen local...</span>
                <input
                  type="file"
                  name="imageFile"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* URL input */}
            <div className="space-y-1.5 pt-2 border-t border-gray-100 dark:border-white/5">
              <label className="block text-xs font-bold text-[#706F6F] dark:text-gray-400">
                O URL de imagen externa:
              </label>
              <input
                type="url"
                name="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0A1526] px-3.5 py-2 text-xs text-[#16345F] dark:text-white outline-none focus:border-[#C01072]"
              />
            </div>
          </div>

          {/* Visibility and Ordering */}
          <div className="rounded-3xl border border-[#16345F]/10 dark:border-white/10 bg-white dark:bg-[#0F1E35] p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#16345F] dark:text-white flex items-center gap-2">
              <Sparkles className="size-4 text-[#00AA81]" />
              Estado y Orden en el Carrusel
            </h3>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-[#FAFBFD] dark:bg-white/[0.02] border border-[#16345F]/5 dark:border-white/5">
              <div>
                <p className="text-xs font-bold text-[#16345F] dark:text-white">Momento Activo</p>
                <p className="text-[11px] text-[#706F6F] dark:text-gray-400">Visible en la web pública</p>
              </div>
              <input
                type="checkbox"
                name="active"
                defaultChecked={moment ? moment.active : true}
                className="size-5 rounded border-gray-300 text-[#C01072] focus:ring-[#C01072] cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#16345F] dark:text-gray-300">
                Orden en la Galería:
              </label>
              <input
                type="number"
                name="order"
                defaultValue={moment?.order ?? 1}
                min={1}
                max={99}
                className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0A1526] px-3.5 py-2 text-xs text-[#16345F] dark:text-white outline-none focus:border-[#C01072]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#16345F] dark:text-gray-300">
                Fecha del Momento (Opcional):
              </label>
              <input
                type="text"
                name="date"
                defaultValue={moment?.date ?? "2026-03"}
                placeholder="Ej. 2026-03 o Marzo 2026"
                className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0A1526] px-3.5 py-2 text-xs text-[#16345F] dark:text-white outline-none focus:border-[#C01072]"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Narrative & Location (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl border border-[#16345F]/10 dark:border-white/10 bg-white dark:bg-[#0F1E35] p-6 sm:p-8 shadow-sm space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#16345F] dark:text-white flex items-center gap-2">
              <MapPin className="size-4 text-[#C01072]" />
              Ubicación y Contexto
            </h3>

            {/* Location with Quick Chips */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#16345F] dark:text-gray-300">
                Ubicación / Lugar de Medellín *
              </label>
              <input
                type="text"
                name="location"
                required
                value={locationValue}
                onChange={(e) => setLocationValue(e.target.value)}
                placeholder="Ej. Provenza, El Poblado; Notaría 15, Laureles; etc."
                className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0A1526] px-4 py-2.5 text-sm font-semibold text-[#16345F] dark:text-white outline-none focus:border-[#C01072]"
              />
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-[11px] text-[#706F6F] dark:text-gray-400 mr-1 self-center">
                  Sugerencias:
                </span>
                {quickLocations.map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setLocationValue(loc)}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-[#16345F]/10 dark:bg-white/10 dark:hover:bg-white/20 text-[#16345F] dark:text-gray-200 transition cursor-pointer"
                  >
                    + {loc}
                  </button>
                ))}
              </div>
            </div>

            {/* Client / Context */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#16345F] dark:text-gray-300 flex items-center gap-1.5">
                <User className="size-3.5 text-[#00AA81]" />
                Cliente o Equipo Involucrado
              </label>
              <input
                type="text"
                name="client"
                defaultValue={moment?.client ?? "Alex & María Fernanda"}
                placeholder="Ej. Carl & Ana María / Fundadores SAS / Jay & The Team"
                className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0A1526] px-4 py-2.5 text-sm font-semibold text-[#16345F] dark:text-white outline-none focus:border-[#C01072]"
              />
            </div>

            {/* Tags (ES & EN) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#16345F] dark:text-gray-300">
                  Etiqueta / Badge (Español)
                </label>
                <input
                  type="text"
                  name="tagEs"
                  defaultValue={moment?.tag?.es ?? "Comunidad"}
                  placeholder="Ej. Comunidad / Hito Legal / Día a Día / Caso de Éxito"
                  className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0A1526] px-3.5 py-2 text-xs text-[#16345F] dark:text-white outline-none focus:border-[#C01072]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#16345F] dark:text-gray-300">
                  Etiqueta / Badge (Inglés)
                </label>
                <input
                  type="text"
                  name="tagEn"
                  defaultValue={moment?.tag?.en ?? "Community"}
                  placeholder="Ej. Community / Milestone / Everyday Life / Success Story"
                  className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0A1526] px-3.5 py-2 text-xs text-[#16345F] dark:text-white outline-none focus:border-[#C01072]"
                />
              </div>
            </div>
          </div>

          {/* Titles & Storytelling Captions */}
          <div className="rounded-3xl border border-[#16345F]/10 dark:border-white/10 bg-white dark:bg-[#0F1E35] p-6 sm:p-8 shadow-sm space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#16345F] dark:text-white flex items-center gap-2">
              <Sparkles className="size-4 text-[#00AA81]" />
              Título y Relato Contextual
            </h3>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#16345F] dark:text-gray-300">
                  Título (Español) *
                </label>
                <input
                  type="text"
                  name="titleEs"
                  required
                  defaultValue={moment?.title?.es ?? "Celebración de Visa en Provenza"}
                  placeholder="Ej. Cierre Inmobiliario en Notaría 15"
                  className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0A1526] px-4 py-2.5 text-sm font-semibold text-[#16345F] dark:text-white outline-none focus:border-[#C01072]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#16345F] dark:text-gray-300">
                  Título (Inglés) *
                </label>
                <input
                  type="text"
                  name="titleEn"
                  required
                  defaultValue={moment?.title?.en ?? "Visa Celebration at Provenza"}
                  placeholder="Ej. Real Estate Closing at Notary 15"
                  className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0A1526] px-4 py-2.5 text-sm font-semibold text-[#16345F] dark:text-white outline-none focus:border-[#C01072]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#16345F] dark:text-gray-300">
                  Relato / Descripción del Momento (Español) *
                </label>
                <textarea
                  name="captionEs"
                  required
                  rows={3}
                  defaultValue={
                    moment?.caption?.es ??
                    "Celebrando la aprobación de 2 años de visa con café especial de origen."
                  }
                  placeholder="Describe la experiencia y el logro para el cliente..."
                  className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0A1526] p-3.5 text-xs text-[#16345F] dark:text-white outline-none focus:border-[#C01072]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#16345F] dark:text-gray-300">
                  Relato / Descripción del Momento (Inglés) *
                </label>
                <textarea
                  name="captionEn"
                  required
                  rows={3}
                  defaultValue={
                    moment?.caption?.en ??
                    "Celebrating a 2-year digital nomad visa approval over fresh Colombian coffee."
                  }
                  placeholder="Describe the experience and legal milestone..."
                  className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0A1526] p-3.5 text-xs text-[#16345F] dark:text-white outline-none focus:border-[#C01072]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
