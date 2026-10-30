"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUp,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle2,
  Languages,
  LoaderCircle,
  ExternalLink,
} from "lucide-react";
import type { AttorneyBio } from "@/types/team";
import {
  deleteTeamMemberAction,
  toggleTeamMemberActiveAction,
  reorderTeamMemberAction,
} from "@/lib/team/actions";
import { cn } from "@/lib/utils";

interface TeamTableProps {
  members: AttorneyBio[];
}

export function TeamTable({ members }: TeamTableProps) {
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = (id: string, name: string) => {
    if (!confirm(`¿Estás seguro de que deseas eliminar el perfil de ${name}?`)) {
      return;
    }
    setDeletingId(id);
    startTransition(async () => {
      await deleteTeamMemberAction(id);
      setDeletingId(null);
    });
  };

  const handleToggle = (id: string) => {
    startTransition(async () => {
      await toggleTeamMemberActiveAction(id);
    });
  };

  const handleReorder = (id: string, direction: "up" | "down") => {
    startTransition(async () => {
      await reorderTeamMemberAction(id, direction);
    });
  };

  if (members.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-[#16345F]/20 bg-white p-12 text-center dark:border-white/20 dark:bg-[#0F1E35]">
        <p className="text-base font-semibold text-[#16345F] dark:text-white">
          No hay miembros del equipo registrados.
        </p>
        <p className="text-xs text-[#706F6F] dark:text-gray-400 mt-1">
          Añade el primer perfil para mostrarlo en la sección de equipo.
        </p>
        <Link
          href="/admin/team/new"
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#00AA81] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#008f6c] transition"
        >
          Añadir Miembro
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-[#16345F]/10 dark:border-white/10 bg-white dark:bg-[#0F1E35] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[#16345F]/10 dark:border-white/10 bg-[#FAFBFD] dark:bg-white/[0.02] text-xs uppercase tracking-wider text-[#706F6F] dark:text-gray-400 font-bold">
              <tr>
                <th className="py-4 px-6 text-center w-16">Orden</th>
                <th className="py-4 px-6">Abogada / Profesional</th>
                <th className="py-4 px-6">Rol & Tarjeta CSJ</th>
                <th className="py-4 px-6">Idiomas & Exp.</th>
                <th className="py-4 px-6 text-center">Estado</th>
                <th className="py-4 px-6 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#16345F]/5 dark:divide-white/5">
              {members.map((member, idx) => {
                const isFirst = idx === 0;
                const isLast = idx === members.length - 1;

                return (
                  <tr
                    key={member.id}
                    className={cn(
                      "transition-colors hover:bg-[#FAFBFD]/60 dark:hover:bg-white/[0.02]",
                      !member.active && "opacity-60 bg-gray-50/50 dark:bg-white/[0.01]"
                    )}
                  >
                    {/* Order column with Up/Down buttons */}
                    <td className="py-4 px-6 text-center">
                      <div className="flex flex-col items-center justify-center gap-1">
                        <button
                          type="button"
                          disabled={isFirst || isPending}
                          onClick={() => handleReorder(member.id, "up")}
                          className="size-6 rounded-md flex items-center justify-center text-gray-500 hover:text-[#16345F] hover:bg-gray-100 dark:hover:bg-white/10 disabled:opacity-20 cursor-pointer"
                          title="Subir posición"
                        >
                          <ArrowUp className="size-3.5" />
                        </button>
                        <span className="text-xs font-bold text-[#16345F] dark:text-white">
                          #{member.order ?? idx + 1}
                        </span>
                        <button
                          type="button"
                          disabled={isLast || isPending}
                          onClick={() => handleReorder(member.id, "down")}
                          className="size-6 rounded-md flex items-center justify-center text-gray-500 hover:text-[#16345F] hover:bg-gray-100 dark:hover:bg-white/10 disabled:opacity-20 cursor-pointer"
                          title="Bajar posición"
                        >
                          <ArrowDown className="size-3.5" />
                        </button>
                      </div>
                    </td>

                    {/* Member photo and name */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="size-14 rounded-2xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200 dark:border-white/10">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="size-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-[#16345F] dark:text-white text-base">
                            {member.name}
                          </p>
                          <p className="text-xs text-[#C01072] dark:text-[#F472B6] font-semibold">
                            {member.role.es}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Role & CSJ credentials */}
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-[#16345F] dark:text-gray-200 flex items-center gap-1.5">
                          <ShieldCheck className="size-3.5 text-[#00AA81] shrink-0" />
                          <span>{member.barRegistration}</span>
                        </p>
                        <p className="text-[11px] text-[#706F6F] dark:text-gray-400 line-clamp-1">
                          {member.credentials.es}
                        </p>
                      </div>
                    </td>

                    {/* Languages & Experience */}
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <p className="text-xs text-[#16345F] dark:text-gray-200 flex items-center gap-1.5">
                          <Languages className="size-3.5 text-[#C01072] shrink-0" />
                          <span>{member.languages.es}</span>
                        </p>
                        <span className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#16345F]/5 dark:bg-white/5 text-[#16345F] dark:text-gray-300">
                          {member.experienceYears} años de experiencia
                        </span>
                      </div>
                    </td>

                    {/* Active toggle */}
                    <td className="py-4 px-6 text-center">
                      <button
                        type="button"
                        disabled={isPending}
                        onClick={() => handleToggle(member.id)}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition cursor-pointer",
                          member.active
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300"
                            : "bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-white/10 dark:text-gray-400"
                        )}
                        title={member.active ? "Desactivar perfil" : "Activar perfil"}
                      >
                        {member.active ? (
                          <>
                            <Eye className="size-3.5" />
                            <span>Público</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="size-3.5" />
                            <span>Oculto</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/team/edit/${member.id}`}
                          className="size-8 rounded-xl bg-[#16345F]/5 dark:bg-white/5 text-[#16345F] dark:text-white hover:bg-[#16345F] hover:text-white transition flex items-center justify-center"
                          title="Editar perfil"
                        >
                          <Edit3 className="size-4" />
                        </Link>
                        <button
                          type="button"
                          disabled={isPending || deletingId === member.id}
                          onClick={() => handleDelete(member.id, member.name)}
                          className="size-8 rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400 hover:bg-rose-600 hover:text-white transition flex items-center justify-center cursor-pointer"
                          title="Eliminar perfil"
                        >
                          {deletingId === member.id ? (
                            <LoaderCircle className="size-4 animate-spin" />
                          ) : (
                            <Trash2 className="size-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
