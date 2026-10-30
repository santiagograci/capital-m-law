import "server-only";

import { unstable_noStore as noStore } from "next/cache";
import type { AttorneyBio } from "@/types/team";
import { readAllTeamMembers } from "./store";

export const TEAM_TAG = "team-members";

export async function getAllTeamMembers(): Promise<AttorneyBio[]> {
  noStore();
  const members = await readAllTeamMembers();
  return [...members].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export async function getActiveTeamMembers(): Promise<AttorneyBio[]> {
  noStore();
  const all = await readAllTeamMembers();
  return all
    .filter((m) => m.active !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export async function getTeamMemberById(id: string): Promise<AttorneyBio | null> {
  noStore();
  const all = await readAllTeamMembers();
  return all.find((m) => m.id === id) ?? null;
}

export async function getTeamMemberBySlug(slug: string): Promise<AttorneyBio | null> {
  noStore();
  const all = await readAllTeamMembers();
  return all.find((m) => m.slug === slug) ?? null;
}
