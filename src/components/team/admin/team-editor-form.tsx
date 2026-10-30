"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import {
  Users,
  Upload,
  Image as ImageIcon,
  Save,
  ArrowLeft,
  LoaderCircle,
  ShieldCheck,
  Languages,
  BookOpen,
  Award,
  Sparkles,
} from "lucide-react";
import type { ActionResult, AttorneyBio } from "@/types/team";
import { createTeamMemberAction, updateTeamMemberAction } from "@/lib/team/actions";
import { cn } from "@/lib/utils";

interface TeamEditorFormProps {
  member?: AttorneyBio;
}

export function TeamEditorForm({ member }: TeamEditorFormProps) {
  const isEditing = Boolean(member);
  const actionFn = isEditing && member
    ? updateTeamMemberAction.bind(null, member.id)
    : createTeamMemberAction;

  const [state, action, pending] = useActionState(actionFn, null);

  const [imageUrl, setImageUrl] = useState<string>(
    member?.image ||
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=85"
  );
  const [previewFileUrl, setPreviewFileUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setPreviewFileUrl(objectUrl);
    setUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.error || `Error en la subida (${res.status})`);
      }

      const data = (await res.json()) as { url: string };
      if (data?.url) {
        setImageUrl(data.url);
        setPreviewFileUrl(data.url);
      }
    } catch (err) {
      console.error("[team-editor-form] Error al subir imagen:", err);
      setUploadError(err instanceof Error ? err.message : "Error al subir la imagen.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form action={action} className="space-y-8">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#16345F]/10 dark:border-white/10 pb-6">
        <div>
          <Link
            href="/admin/team"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#706F6F] hover:text-[#16345F] dark:hover:text-white transition mb-2"
          >
            <ArrowLeft className="size-3.5" />
            <span>Volver a la lista de equipo</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-[#16345F] dark:text-white">
            {isEditing ? `Editar perfil: ${member?.name}` : "Añadir Nuevo Miembro al Equipo"}
          </h1>
          <p className="text-xs sm:text-sm text-[#706F6F] dark:text-gray-400 mt-1">
            Los datos se sincronizan directamente con la página de presentación del equipo y el home.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/team"
            className="rounded-xl border border-gray-200 dark:border-white/15 px-4 py-2.5 text-xs font-semibold text-[#16345F] dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center gap-2 rounded-xl bg-[#00AA81] hover:bg-[#008f6c] text-white px-5 py-2.5 text-xs font-bold shadow-md transition disabled:opacity-60 cursor-pointer"
          >
            {pending ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : (
              <Save className="size-4" />
            )}
            <span>{isEditing ? "Guardar Cambios" : "Crear Perfil"}</span>
          </button>
        </div>
      </div>

      {state && !state.ok && (
        <div className="rounded-2xl bg-rose-50 border border-rose-200 p-4 text-xs font-semibold text-rose-700 dark:bg-rose-950/40 dark:border-rose-900 dark:text-rose-300">
          ⚠️ {state.message}
        </div>
      )}

      {/* Main Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Photo & Core Metadata (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Photo upload card */}
          <div className="rounded-3xl border border-[#16345F]/10 dark:border-white/10 bg-white dark:bg-[#0F1E35] p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#16345F] dark:text-white flex items-center gap-2">
              <ImageIcon className="size-4 text-[#C01072]" />
              Fotografía Oficial
            </h3>

            {/* Preview */}
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 relative">
              <img
                src={previewFileUrl || imageUrl}
                alt="Vista previa"
                className="size-full object-cover"
              />
            </div>

            {/* Upload File */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#16345F] dark:text-gray-300">
                Subir Archivo de Imagen (PC):
              </label>
              <label
                className={cn(
                  "flex items-center justify-center gap-2 rounded-xl border border-dashed border-[#16345F]/20 dark:border-white/20 p-3 text-xs font-semibold text-[#16345F] dark:text-gray-200 hover:bg-[#16345F]/5 dark:hover:bg-white/5 cursor-pointer transition",
                  uploading && "opacity-60 pointer-events-none"
                )}
              >
                {uploading ? (
                  <>
                    <LoaderCircle className="size-4 animate-spin text-[#C01072]" />
                    <span className="text-[#C01072]">Subiendo imagen...</span>
                  </>
                ) : (
                  <>
                    <Upload className="size-4 text-[#C01072]" />
                    <span>Seleccionar Imagen local...</span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  disabled={uploading}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              {uploadError && (
                <p className="text-[11px] font-semibold text-rose-600 dark:text-rose-400">
                  ⚠️ {uploadError}
                </p>
              )}
            </div>

            {/* Or URL */}
            <div className="space-y-1.5 pt-2 border-t border-gray-100 dark:border-white/5">
              <label className="block text-xs font-bold text-[#706F6F] dark:text-gray-400">
                O URL de imagen externa:
              </label>
              <input
                type="text"
                name="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://... o /images/..."
                className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0A1526] px-3.5 py-2 text-xs text-[#16345F] dark:text-white outline-none focus:border-[#C01072]"
              />
            </div>
          </div>

          {/* Publishing & Ordering settings */}
          <div className="rounded-3xl border border-[#16345F]/10 dark:border-white/10 bg-white dark:bg-[#0F1E35] p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#16345F] dark:text-white flex items-center gap-2">
              <Sparkles className="size-4 text-[#00AA81]" />
              Configuración de Publicación
            </h3>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-[#FAFBFD] dark:bg-white/[0.02] border border-[#16345F]/5 dark:border-white/5">
              <div>
                <p className="text-xs font-bold text-[#16345F] dark:text-white">Perfil Activo</p>
                <p className="text-[11px] text-[#706F6F] dark:text-gray-400">Visible en la web pública</p>
              </div>
              <input
                type="checkbox"
                name="active"
                defaultChecked={member ? member.active : true}
                className="size-5 rounded border-gray-300 text-[#00AA81] focus:ring-[#00AA81] cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#16345F] dark:text-gray-300">
                Posición / Orden de despliegue:
              </label>
              <input
                type="number"
                name="order"
                defaultValue={member?.order ?? 1}
                min={1}
                max={99}
                className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0A1526] px-3.5 py-2 text-xs text-[#16345F] dark:text-white outline-none focus:border-[#00AA81]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#16345F] dark:text-gray-300">
                Años de Experiencia:
              </label>
              <input
                type="number"
                name="experienceYears"
                defaultValue={member?.experienceYears ?? 8}
                min={1}
                max={50}
                className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0A1526] px-3.5 py-2 text-xs text-[#16345F] dark:text-white outline-none focus:border-[#00AA81]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#16345F] dark:text-gray-300">
                Tarifa de Consulta Inicial:
              </label>
              <input
                type="text"
                name="consultationFee"
                defaultValue={member?.consultationFee ?? "$67 USD"}
                className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0A1526] px-3.5 py-2 text-xs text-[#16345F] dark:text-white outline-none focus:border-[#00AA81]"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Bilingual Profiles & Biographies (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Section 1: Identification & Bar registration */}
          <div className="rounded-3xl border border-[#16345F]/10 dark:border-white/10 bg-white dark:bg-[#0F1E35] p-6 sm:p-8 shadow-sm space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#16345F] dark:text-white flex items-center gap-2">
              <ShieldCheck className="size-4 text-[#00AA81]" />
              Identificación y Matrícula Profesional
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 sm:col-span-2">
                <label className="block text-xs font-bold text-[#16345F] dark:text-gray-300">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  defaultValue={member?.name ?? ""}
                  placeholder="Ej. María Fernanda Duarte"
                  className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0A1526] px-4 py-2.5 text-sm font-semibold text-[#16345F] dark:text-white outline-none focus:border-[#00AA81]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#16345F] dark:text-gray-300">
                  Rol Oficial (Español) *
                </label>
                <input
                  type="text"
                  name="roleEs"
                  required
                  defaultValue={member?.role?.es ?? "Socia Fundadora y Directora"}
                  className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0A1526] px-3.5 py-2 text-xs text-[#16345F] dark:text-white outline-none focus:border-[#00AA81]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#16345F] dark:text-gray-300">
                  Rol Oficial (Inglés) *
                </label>
                <input
                  type="text"
                  name="roleEn"
                  required
                  defaultValue={member?.role?.en ?? "Founder & Principal Attorney"}
                  className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0A1526] px-3.5 py-2 text-xs text-[#16345F] dark:text-white outline-none focus:border-[#00AA81]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#16345F] dark:text-gray-300">
                  Tarjeta Profesional CSJ *
                </label>
                <input
                  type="text"
                  name="barRegistration"
                  required
                  defaultValue={member?.barRegistration ?? "CSJ-Col #289.412"}
                  placeholder="CSJ-Col #..."
                  className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0A1526] px-3.5 py-2 text-xs text-[#16345F] dark:text-white outline-none focus:border-[#00AA81]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#16345F] dark:text-gray-300">
                  Idiomas de Práctica
                </label>
                <input
                  type="text"
                  name="languagesEs"
                  defaultValue={member?.languages?.es ?? "Inglés y Español (Práctica 100% Bilingüe)"}
                  className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0A1526] px-3.5 py-2 text-xs text-[#16345F] dark:text-white outline-none focus:border-[#00AA81]"
                />
                <input
                  type="hidden"
                  name="languagesEn"
                  defaultValue={member?.languages?.en ?? "English & Spanish (100% Bilingual Practice)"}
                />
              </div>
            </div>
          </div>

          {/* Section 2: Biographies & Summaries */}
          <div className="rounded-3xl border border-[#16345F]/10 dark:border-white/10 bg-white dark:bg-[#0F1E35] p-6 sm:p-8 shadow-sm space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#16345F] dark:text-white flex items-center gap-2">
              <BookOpen className="size-4 text-[#C01072]" />
              Resumen y Biografía Ejecutiva
            </h3>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#16345F] dark:text-gray-300">
                  Resumen Breve (Español)
                </label>
                <textarea
                  name="summaryEs"
                  rows={2}
                  defaultValue={member?.summary?.es ?? ""}
                  placeholder="Descripción concisa para tarjetas de inicio..."
                  className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0A1526] p-3 text-xs text-[#16345F] dark:text-white outline-none focus:border-[#C01072]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#16345F] dark:text-gray-300">
                  Resumen Breve (Inglés)
                </label>
                <textarea
                  name="summaryEn"
                  rows={2}
                  defaultValue={member?.summary?.en ?? ""}
                  placeholder="Concise summary for home cards..."
                  className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0A1526] p-3 text-xs text-[#16345F] dark:text-white outline-none focus:border-[#C01072]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#16345F] dark:text-gray-300">
                  Biografía Completa (Español — Un párrafo por línea)
                </label>
                <textarea
                  name="fullBioEs"
                  rows={4}
                  defaultValue={member?.fullBio?.es?.join("\n\n") ?? ""}
                  placeholder="Párrafos detallados de la trayectoria..."
                  className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0A1526] p-3 text-xs text-[#16345F] dark:text-white outline-none focus:border-[#C01072]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#16345F] dark:text-gray-300">
                  Biografía Completa (Inglés — Un párrafo por línea)
                </label>
                <textarea
                  name="fullBioEn"
                  rows={4}
                  defaultValue={member?.fullBio?.en?.join("\n\n") ?? ""}
                  placeholder="Detailed paragraphs of legal experience..."
                  className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0A1526] p-3 text-xs text-[#16345F] dark:text-white outline-none focus:border-[#C01072]"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Specialties & Education */}
          <div className="rounded-3xl border border-[#16345F]/10 dark:border-white/10 bg-white dark:bg-[#0F1E35] p-6 sm:p-8 shadow-sm space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#16345F] dark:text-white flex items-center gap-2">
              <Award className="size-4 text-[#00AA81]" />
              Especialidades y Educación
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#16345F] dark:text-gray-300">
                  Especialidades Clave (Español — 1 por línea)
                </label>
                <textarea
                  name="specialtiesEs"
                  rows={3}
                  defaultValue={
                    member?.specialties?.es?.join("\n") ||
                    "Visas e Inmigración\nEstudio de Títulos Inmobiliario\nInversión Extranjera"
                  }
                  className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0A1526] p-3 text-xs text-[#16345F] dark:text-white outline-none focus:border-[#00AA81]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#16345F] dark:text-gray-300">
                  Especialidades Clave (Inglés — 1 por línea)
                </label>
                <textarea
                  name="specialtiesEn"
                  rows={3}
                  defaultValue={
                    member?.specialties?.en?.join("\n") ||
                    "Immigration & Visas\nReal Estate Due Diligence\nForeign Investment"
                  }
                  className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0A1526] p-3 text-xs text-[#16345F] dark:text-white outline-none focus:border-[#00AA81]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#16345F] dark:text-gray-300">
                  Educación y Grados (Español — 1 por línea)
                </label>
                <textarea
                  name="educationEs"
                  rows={3}
                  defaultValue={member?.education?.es?.join("\n") ?? ""}
                  placeholder="Abogada Titulada — Universidad..."
                  className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0A1526] p-3 text-xs text-[#16345F] dark:text-white outline-none focus:border-[#00AA81]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#16345F] dark:text-gray-300">
                  Educación y Grados (Inglés — 1 por línea)
                </label>
                <textarea
                  name="educationEn"
                  rows={3}
                  defaultValue={member?.education?.en?.join("\n") ?? ""}
                  placeholder="LL.B. Law Degree — ..."
                  className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0A1526] p-3 text-xs text-[#16345F] dark:text-white outline-none focus:border-[#00AA81]"
                />
              </div>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-gray-100 dark:border-white/5">
              <label className="block text-xs font-bold text-[#16345F] dark:text-gray-300">
                Frase / Cita de la Abogada (Español)
              </label>
              <input
                type="text"
                name="quoteEs"
                defaultValue={member?.quote?.es ?? ""}
                placeholder="Nuestra prioridad es blindar el patrimonio..."
                className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0A1526] px-3.5 py-2 text-xs text-[#16345F] dark:text-white outline-none focus:border-[#00AA81]"
              />
              <input
                type="hidden"
                name="quoteEn"
                defaultValue={member?.quote?.en ?? member?.quote?.es ?? ""}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
