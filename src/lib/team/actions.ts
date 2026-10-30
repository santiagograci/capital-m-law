"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import type { ActionResult, AttorneyBio } from "@/types/team";
import { requireStaff } from "@/lib/blog/auth";
import { mutateTeamMembers } from "./store";
import { TEAM_TAG } from "./queries";
import { saveMediaUpload, ALLOWED_IMAGE_TYPES, MAX_UPLOAD_BYTES } from "@/lib/media-store";

function revalidateTeamRoutes(memberId?: string) {
  updateTag(TEAM_TAG);
  if (memberId) updateTag(`team-member:${memberId}`);
  revalidatePath("/", "layout");
  revalidatePath("/");
  revalidatePath("/team");
  revalidatePath("/admin");
  revalidatePath("/admin/team");
  revalidatePath("/api/team");
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function parseLines(text: string): string[] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function parsePillars(titles: string[], descs: string[]): { title: string; desc: string }[] {
  const result: { title: string; desc: string }[] = [];
  const max = Math.max(titles.length, descs.length);
  for (let i = 0; i < max; i++) {
    const title = titles[i]?.trim();
    const desc = descs[i]?.trim();
    if (title || desc) {
      result.push({ title: title || "Pillar", desc: desc || "" });
    }
  }
  return result;
}

export async function createTeamMemberAction(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  await requireStaff();

  const name = String(formData.get("name") ?? "").trim();
  if (!name) {
    return { ok: false, message: "El nombre es obligatorio / Name is required." };
  }

  const roleEn = String(formData.get("roleEn") ?? "").trim();
  const roleEs = String(formData.get("roleEs") ?? "").trim();
  if (!roleEn || !roleEs) {
    return { ok: false, message: "El rol en inglés y español es obligatorio." };
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
    imageUrl = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=85";
  }

  const barRegistration = String(formData.get("barRegistration") ?? "").trim();
  const experienceYears = Number(formData.get("experienceYears") ?? 5);
  const consultationFee = String(formData.get("consultationFee") ?? "$67 USD").trim();
  const active = formData.get("active") === "on" || formData.get("active") === "true";

  const memberId = slugify(name);
  const now = new Date().toISOString();

  const newMember: AttorneyBio = {
    id: memberId,
    name,
    slug: memberId,
    role: { en: roleEn, es: roleEs },
    titleTag: {
      en: String(formData.get("titleTagEn") ?? roleEn).trim(),
      es: String(formData.get("titleTagEs") ?? roleEs).trim(),
    },
    image: imageUrl,
    credentials: {
      en: String(formData.get("credentialsEn") ?? "Attorney at Law — Board Certified (CSJ Colombia)").trim(),
      es: String(formData.get("credentialsEs") ?? "Abogada Titulada — Tarjeta Profesional Vigente CSJ").trim(),
    },
    barRegistration: barRegistration || "CSJ-Col #000.000",
    languages: {
      en: String(formData.get("languagesEn") ?? "English & Spanish (Fluent)").trim(),
      es: String(formData.get("languagesEs") ?? "Inglés y Español (Bilingüe)").trim(),
    },
    experienceYears: Number.isFinite(experienceYears) ? experienceYears : 5,
    consultationFee: consultationFee || "$67 USD",
    summary: {
      en: String(formData.get("summaryEn") ?? "").trim(),
      es: String(formData.get("summaryEs") ?? "").trim(),
    },
    specialties: {
      en: parseLines(String(formData.get("specialtiesEn") ?? "")),
      es: parseLines(String(formData.get("specialtiesEs") ?? "")),
    },
    fullBio: {
      en: parseLines(String(formData.get("fullBioEn") ?? "")),
      es: parseLines(String(formData.get("fullBioEs") ?? "")),
    },
    pillars: {
      en: parsePillars(
        formData.getAll("pillarTitleEn") as string[],
        formData.getAll("pillarDescEn") as string[],
      ),
      es: parsePillars(
        formData.getAll("pillarTitleEs") as string[],
        formData.getAll("pillarDescEs") as string[],
      ),
    },
    practiceAreas: {
      en: [
        {
          title: "Primary Practice Areas",
          items: parseLines(String(formData.get("practiceItemsEn") ?? "")),
        },
      ],
      es: [
        {
          title: "Áreas Principales de Práctica",
          items: parseLines(String(formData.get("practiceItemsEs") ?? "")),
        },
      ],
    },
    education: {
      en: parseLines(String(formData.get("educationEn") ?? "")),
      es: parseLines(String(formData.get("educationEs") ?? "")),
    },
    quote: {
      en: String(formData.get("quoteEn") ?? "").trim(),
      es: String(formData.get("quoteEs") ?? "").trim(),
    },
    order: 99,
    active,
    createdAt: now,
    updatedAt: now,
  };

  try {
    await mutateTeamMembers((members) => {
      const maxOrder = members.reduce((m, item) => Math.max(m, item.order ?? 0), 0);
      newMember.order = maxOrder + 1;
      return {
        members: [...members, newMember],
        result: newMember,
      };
    });
    revalidateTeamRoutes(newMember.id);
  } catch (err) {
    console.error("[team/actions] Error creating team member:", err);
    return { ok: false, message: "Error al guardar el perfil en el servidor." };
  }

  redirect("/admin/team");
}

export async function updateTeamMemberAction(
  memberId: string,
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  await requireStaff();

  const name = String(formData.get("name") ?? "").trim();
  if (!name) {
    return { ok: false, message: "El nombre es obligatorio / Name is required." };
  }

  const roleEn = String(formData.get("roleEn") ?? "").trim();
  const roleEs = String(formData.get("roleEs") ?? "").trim();
  if (!roleEn || !roleEs) {
    return { ok: false, message: "El rol en inglés y español es obligatorio." };
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

  const barRegistration = String(formData.get("barRegistration") ?? "").trim();
  const experienceYears = Number(formData.get("experienceYears") ?? 5);
  const consultationFee = String(formData.get("consultationFee") ?? "$67 USD").trim();
  const active = formData.get("active") === "on" || formData.get("active") === "true";
  const order = Number(formData.get("order") ?? 1);
  const now = new Date().toISOString();

  try {
    await mutateTeamMembers((members) => {
      const existing = members.find((m) => m.id === memberId);
      if (!existing) {
        throw new Error(`Miembro no encontrado: ${memberId}`);
      }

      const updated: AttorneyBio = {
        ...existing,
        name,
        role: { en: roleEn, es: roleEs },
        titleTag: {
          en: String(formData.get("titleTagEn") ?? roleEn).trim(),
          es: String(formData.get("titleTagEs") ?? roleEs).trim(),
        },
        image: imageUrl || existing.image,
        credentials: {
          en: String(formData.get("credentialsEn") ?? existing.credentials.en).trim(),
          es: String(formData.get("credentialsEs") ?? existing.credentials.es).trim(),
        },
        barRegistration: barRegistration || existing.barRegistration,
        languages: {
          en: String(formData.get("languagesEn") ?? existing.languages.en).trim(),
          es: String(formData.get("languagesEs") ?? existing.languages.es).trim(),
        },
        experienceYears: Number.isFinite(experienceYears) ? experienceYears : existing.experienceYears,
        consultationFee: consultationFee || existing.consultationFee,
        summary: {
          en: String(formData.get("summaryEn") ?? "").trim(),
          es: String(formData.get("summaryEs") ?? "").trim(),
        },
        specialties: {
          en: parseLines(String(formData.get("specialtiesEn") ?? "")),
          es: parseLines(String(formData.get("specialtiesEs") ?? "")),
        },
        fullBio: {
          en: parseLines(String(formData.get("fullBioEn") ?? "")),
          es: parseLines(String(formData.get("fullBioEs") ?? "")),
        },
        pillars: {
          en: parsePillars(
            formData.getAll("pillarTitleEn") as string[],
            formData.getAll("pillarDescEn") as string[],
          ),
          es: parsePillars(
            formData.getAll("pillarTitleEs") as string[],
            formData.getAll("pillarDescEs") as string[],
          ),
        },
        practiceAreas: {
          en: [
            {
              title: "Primary Practice Areas",
              items: parseLines(String(formData.get("practiceItemsEn") ?? "")),
            },
          ],
          es: [
            {
              title: "Áreas Principales de Práctica",
              items: parseLines(String(formData.get("practiceItemsEs") ?? "")),
            },
          ],
        },
        education: {
          en: parseLines(String(formData.get("educationEn") ?? "")),
          es: parseLines(String(formData.get("educationEs") ?? "")),
        },
        quote: {
          en: String(formData.get("quoteEn") ?? "").trim(),
          es: String(formData.get("quoteEs") ?? "").trim(),
        },
        order: Number.isFinite(order) ? order : existing.order,
        active,
        updatedAt: now,
      };

      return {
        members: members.map((m) => (m.id === memberId ? updated : m)),
        result: updated,
      };
    });

    revalidateTeamRoutes(memberId);
  } catch (err) {
    console.error("[team/actions] Error updating team member:", err);
    return { ok: false, message: "Error al actualizar el perfil en el servidor." };
  }

  redirect("/admin/team");
}

export async function deleteTeamMemberAction(memberId: string): Promise<ActionResult> {
  await requireStaff();

  try {
    await mutateTeamMembers((members) => {
      return {
        members: members.filter((m) => m.id !== memberId),
        result: true,
      };
    });
    revalidateTeamRoutes(memberId);
    return { ok: true, message: "Miembro eliminado con éxito." };
  } catch (err) {
    console.error("[team/actions] Error deleting team member:", err);
    return { ok: false, message: "No se pudo eliminar el miembro." };
  }
}

export async function toggleTeamMemberActiveAction(memberId: string): Promise<ActionResult> {
  await requireStaff();

  try {
    await mutateTeamMembers((members) => {
      return {
        members: members.map((m) =>
          m.id === memberId ? { ...m, active: !m.active, updatedAt: new Date().toISOString() } : m,
        ),
        result: true,
      };
    });
    revalidateTeamRoutes(memberId);
    return { ok: true };
  } catch (err) {
    console.error("[team/actions] Error toggling team active:", err);
    return { ok: false, message: "Error al cambiar el estado." };
  }
}

export async function reorderTeamMemberAction(
  memberId: string,
  direction: "up" | "down",
): Promise<ActionResult> {
  await requireStaff();

  try {
    await mutateTeamMembers((members) => {
      const sorted = [...members].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      const idx = sorted.findIndex((m) => m.id === memberId);
      if (idx < 0) return { members, result: false };

      const targetIdx = direction === "up" ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= sorted.length) return { members, result: false };

      // Swap orders
      const currentOrder = sorted[idx].order ?? idx + 1;
      const targetOrder = sorted[targetIdx].order ?? targetIdx + 1;

      sorted[idx].order = targetOrder;
      sorted[targetIdx].order = currentOrder;

      return {
        members: sorted,
        result: true,
      };
    });
    revalidateTeamRoutes(memberId);
    return { ok: true };
  } catch (err) {
    console.error("[team/actions] Error reordering team member:", err);
    return { ok: false, message: "Error al reordenar." };
  }
}
