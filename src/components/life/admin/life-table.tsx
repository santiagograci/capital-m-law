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
  MapPin,
  Camera,
  Calendar,
  LoaderCircle,
  ExternalLink,
} from "lucide-react";
import type { LifeMoment } from "@/types/life";
import {
  deleteLifeMomentAction,
  toggleLifeMomentActiveAction,
  reorderLifeMomentAction,
} from "@/lib/life/actions";
import { cn } from "@/lib/utils";

interface LifeTableProps {
  moments: LifeMoment[];
}

export function LifeTable({ moments }: LifeTableProps) {
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = (id: string, title: string) => {
    if (!confirm(`¿Eliminar "${title}" de la galería?`)) {
      return;
    }
    setDeletingId(id);
    startTransition(async () => {
      await deleteLifeMomentAction(id);
      setDeletingId(null);
    });
  };

  const handleToggle = (id: string) => {
    startTransition(async () => {
      await toggleLifeMomentActiveAction(id);
    });
  };

  const handleReorder = (id: string, direction: "up" | "down") => {
    startTransition(async () => {
      await reorderLifeMomentAction(id, direction);
    });
  };

  if (moments.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-[#16345F]/20 bg-white p-12 text-center dark:border-white/20 dark:bg-[#0F1E35]">
        <Camera className="size-10 text-[#C01072] mx-auto mb-3" />
        <p className="text-base font-semibold text-[#16345F] dark:text-white">
          No hay momentos registrados en la galería.
        </p>
        <p className="text-xs text-[#706F6F] dark:text-gray-400 mt-1">
          Añade fotos de celebraciones de visa, firmas en notarías o sesiones en la sede.
        </p>
        <Link
          href="/admin/life/new"
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#C01072] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#A50E62] transition"
        >
          Añadir Primer Momento
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {moments.map((item, idx) => {
        const isFirst = idx === 0;
        const isLast = idx === moments.length - 1;

        return (
          <div
            key={item.id}
            className={cn(
              "group rounded-3xl border border-[#16345F]/10 dark:border-white/10 bg-white dark:bg-[#0F1E35] p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4",
              !item.active && "opacity-60 bg-gray-50/70 dark:bg-white/[0.01]"
            )}
          >
            <div className="space-y-4">
              {/* Photo & Tag */}
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative bg-gray-100 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                <img
                  src={item.image}
                  alt={item.title.es}
                  className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-white/95 dark:bg-black/85 backdrop-blur-md text-[#16345F] dark:text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                  {item.tag.es}
                </span>

                <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-md rounded-xl p-1 text-white">
                  <button
                    type="button"
                    disabled={isFirst || isPending}
                    onClick={() => handleReorder(item.id, "up")}
                    className="size-6 rounded-md flex items-center justify-center hover:bg-white/20 disabled:opacity-30 cursor-pointer"
                    title="Mover arriba"
                  >
                    <ArrowUp className="size-3.5" />
                  </button>
                  <span className="text-[11px] font-bold px-1">
                    #{item.order ?? idx + 1}
                  </span>
                  <button
                    type="button"
                    disabled={isLast || isPending}
                    onClick={() => handleReorder(item.id, "down")}
                    className="size-6 rounded-md flex items-center justify-center hover:bg-white/20 disabled:opacity-30 cursor-pointer"
                    title="Mover abajo"
                  >
                    <ArrowDown className="size-3.5" />
                  </button>
                </div>
              </div>

              {/* Location & Title */}
              <div className="space-y-1.5 px-1">
                <p className="text-xs font-bold text-[#C01072] dark:text-[#F472B6] flex items-center gap-1">
                  <MapPin className="size-3.5 shrink-0" />
                  <span>{item.location}</span>
                </p>
                <h3 className="font-bold text-[#16345F] dark:text-white text-base leading-snug line-clamp-1">
                  {item.title.es}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
                  {item.caption.es}
                </p>
              </div>

              {/* Context / Client */}
              <div className="text-[11px] font-medium text-gray-500 dark:text-gray-400 px-1 pt-1 flex items-center justify-between">
                <span>Cliente: {item.client}</span>
                {item.date && (
                  <span className="flex items-center gap-1">
                    <Calendar className="size-3" />
                    {item.date}
                  </span>
                )}
              </div>
            </div>

            {/* Bottom Bar: Status Toggle & Actions */}
            <div className="pt-3 border-t border-gray-100 dark:border-white/10 px-1 flex items-center justify-between">
              <button
                type="button"
                disabled={isPending}
                onClick={() => handleToggle(item.id)}
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold transition cursor-pointer",
                  item.active
                    ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-white/10 dark:text-gray-400"
                )}
                title={item.active ? "Desactivar de la web" : "Activar en la web"}
              >
                {item.active ? (
                  <>
                    <Eye className="size-3" />
                    <span>Activo</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="size-3" />
                    <span>Oculto</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-1.5">
                <Link
                  href={`/admin/life/edit/${item.id}`}
                  className="size-8 rounded-xl bg-[#16345F]/5 dark:bg-white/5 text-[#16345F] dark:text-white hover:bg-[#16345F] hover:text-white transition flex items-center justify-center"
                  title="Editar momento"
                >
                  <Edit3 className="size-3.5" />
                </Link>
                <button
                  type="button"
                  disabled={isPending || deletingId === item.id}
                  onClick={() => handleDelete(item.id, item.title.es)}
                  className="size-8 rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400 hover:bg-rose-600 hover:text-white transition flex items-center justify-center cursor-pointer"
                  title="Eliminar de la galería"
                >
                  {deletingId === item.id ? (
                    <LoaderCircle className="size-3.5 animate-spin" />
                  ) : (
                    <Trash2 className="size-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
