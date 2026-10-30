"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import type { ActionResult, LifeMoment } from "@/types/life";
import { requireStaff } from "@/lib/blog/auth";
import { mutateLifeMoments } from "./store";
import { LIFE_TAG } from "./queries";
import { saveMediaUpload, ALLOWED_IMAGE_TYPES, MAX_UPLOAD_BYTES } from "@/lib/media-store";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function createLifeMomentAction(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  await requireStaff();

  const titleEn = String(formData.get("titleEn") ?? "").trim();
  const titleEs = String(formData.get("titleEs") ?? "").trim();
  if (!titleEn || !titleEs) {
    return { ok: false, message: "El título en español e inglés es obligatorio." };
  }

  const location = String(formData.get("location") ?? "").trim();
  if (!location) {
    return { ok: false, message: "La ubicación es obligatoria (ej. Provenza, Notaría 15, Belén Malibú)." };
  }

  const client = String(formData.get("client") ?? "Our Clients").trim();
  const tagEn = String(formData.get("tagEn") ?? "Community").trim();
  const tagEs = String(formData.get("tagEs") ?? "Comunidad").trim();

  const captionEn = String(formData.get("captionEn") ?? "").trim();
  const captionEs = String(formData.get("captionEs") ?? "").trim();
  if (!captionEn || !captionEs) {
    return { ok: false, message: "La descripción en inglés y español es requerida." };
  }

  let imageUrl = String(formData.get("imageUrl") ?? "").trim();
  const imageFile = formData.get("imageFile");

  if (imageFile instanceof File && imageFile.size > 0) {
    if (imageFile.size > MAX_UPLOAD_BYTES) {
      return { ok: false, message: "La imagen excede el límite máximo de 10 MB." };
    }
    if (!ALLOWED_IMAGE_TYPES.has(imageFile.type)) {
      return { ok: false, message: "Formato de imagen inválido (Use JPEG, PNG, WebP o AVIF)." };
    }
    try {
      imageUrl = await saveMediaUpload(imageFile);
    } catch {
      return { ok: false, message: "Error al guardar la imagen en el servidor." };
    }
  }

  if (!imageUrl) {
    return { ok: false, message: "Por favor proporciona una imagen (subir archivo o ingresar URL)." };
  }

  const active = formData.get("active") === "on" || formData.get("active") === "true";
  const date = String(formData.get("date") ?? "").trim();
  const now = new Date().toISOString();
  const id = `${slugify(titleEn)}-${Date.now().toString(36)}`;

  const newMoment: LifeMoment = {
    id,
    title: { en: titleEn, es: titleEs },
    location,
    client,
    caption: { en: captionEn, es: captionEs },
    image: imageUrl,
    tag: { en: tagEn, es: tagEs },
    order: 99,
    active,
    date: date || undefined,
    createdAt: now,
    updatedAt: now,
  };

  try {
    await mutateLifeMoments((moments) => {
      const maxOrder = moments.reduce((m, item) => Math.max(m, item.order ?? 0), 0);
      newMoment.order = maxOrder + 1;
      return {
        moments: [...moments, newMoment],
        result: newMoment,
      };
    });
    updateTag(LIFE_TAG);
  } catch (err) {
    console.error("[life/actions] Error creating life moment:", err);
    return { ok: false, message: "Error al guardar el momento en el servidor." };
  }

  redirect("/admin/life");
}

export async function updateLifeMomentAction(
  momentId: string,
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  await requireStaff();

  const titleEn = String(formData.get("titleEn") ?? "").trim();
  const titleEs = String(formData.get("titleEs") ?? "").trim();
  if (!titleEn || !titleEs) {
    return { ok: false, message: "El título en español e inglés es obligatorio." };
  }

  const location = String(formData.get("location") ?? "").trim();
  const client = String(formData.get("client") ?? "Our Clients").trim();
  const tagEn = String(formData.get("tagEn") ?? "Community").trim();
  const tagEs = String(formData.get("tagEs") ?? "Comunidad").trim();
  const captionEn = String(formData.get("captionEn") ?? "").trim();
  const captionEs = String(formData.get("captionEs") ?? "").trim();

  let imageUrl = String(formData.get("imageUrl") ?? "").trim();
  const imageFile = formData.get("imageFile");

  if (imageFile instanceof File && imageFile.size > 0) {
    if (imageFile.size > MAX_UPLOAD_BYTES) {
      return { ok: false, message: "La imagen excede el límite máximo de 10 MB." };
    }
    if (!ALLOWED_IMAGE_TYPES.has(imageFile.type)) {
      return { ok: false, message: "Formato de imagen inválido (Use JPEG, PNG, WebP o AVIF)." };
    }
    try {
      imageUrl = await saveMediaUpload(imageFile);
    } catch {
      return { ok: false, message: "Error al guardar la imagen en el servidor." };
    }
  }

  const active = formData.get("active") === "on" || formData.get("active") === "true";
  const date = String(formData.get("date") ?? "").trim();
  const order = Number(formData.get("order") ?? 1);
  const now = new Date().toISOString();

  try {
    await mutateLifeMoments((moments) => {
      const existing = moments.find((m) => m.id === momentId);
      if (!existing) {
        throw new Error(`Momento no encontrado: ${momentId}`);
      }

      const updated: LifeMoment = {
        ...existing,
        title: { en: titleEn, es: titleEs },
        location: location || existing.location,
        client: client || existing.client,
        caption: { en: captionEn, es: captionEs },
        image: imageUrl || existing.image,
        tag: { en: tagEn, es: tagEs },
        order: Number.isFinite(order) ? order : existing.order,
        active,
        date: date || existing.date,
        updatedAt: now,
      };

      return {
        moments: moments.map((m) => (m.id === momentId ? updated : m)),
        result: updated,
      };
    });

    updateTag(LIFE_TAG);
    updateTag(`life-moment:${momentId}`);
  } catch (err) {
    console.error("[life/actions] Error updating life moment:", err);
    return { ok: false, message: "Error al actualizar el momento en el servidor." };
  }

  redirect("/admin/life");
}

export async function deleteLifeMomentAction(momentId: string): Promise<ActionResult> {
  await requireStaff();

  try {
    await mutateLifeMoments((moments) => {
      return {
        moments: moments.filter((m) => m.id !== momentId),
        result: true,
      };
    });
    updateTag(LIFE_TAG);
    return { ok: true, message: "Elemento eliminado de la galería." };
  } catch (err) {
    console.error("[life/actions] Error deleting life moment:", err);
    return { ok: false, message: "Error al eliminar el elemento de la galería." };
  }
}

export async function toggleLifeMomentActiveAction(momentId: string): Promise<ActionResult> {
  await requireStaff();

  try {
    await mutateLifeMoments((moments) => {
      return {
        moments: moments.map((m) =>
          m.id === momentId ? { ...m, active: !m.active, updatedAt: new Date().toISOString() } : m,
        ),
        result: true,
      };
    });
    updateTag(LIFE_TAG);
    return { ok: true };
  } catch (err) {
    console.error("[life/actions] Error toggling life moment:", err);
    return { ok: false, message: "Error al cambiar el estado." };
  }
}

export async function reorderLifeMomentAction(
  momentId: string,
  direction: "up" | "down",
): Promise<ActionResult> {
  await requireStaff();

  try {
    await mutateLifeMoments((moments) => {
      const sorted = [...moments].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      const idx = sorted.findIndex((m) => m.id === momentId);
      if (idx < 0) return { moments, result: false };

      const targetIdx = direction === "up" ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= sorted.length) return { moments, result: false };

      const currentOrder = sorted[idx].order ?? idx + 1;
      const targetOrder = sorted[targetIdx].order ?? targetIdx + 1;

      sorted[idx].order = targetOrder;
      sorted[targetIdx].order = currentOrder;

      return {
        moments: sorted,
        result: true,
      };
    });
    updateTag(LIFE_TAG);
    return { ok: true };
  } catch (err) {
    console.error("[life/actions] Error reordering life moment:", err);
    return { ok: false, message: "Error al reordenar." };
  }
}
