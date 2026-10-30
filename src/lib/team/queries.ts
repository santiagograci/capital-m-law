import "server-only";

import { unstable_cache } from "next/cache";
import type { AttorneyBio } from "@/types/team";
import { readAllTeamMembers } from "./store";

export const TEAM_TAG = "team-members";

export const getAllTeamMembers = unstable_cache(
  async (): Promise<AttorneyBio[]> => {
    const members = await readAllTeamMembers();
    return members.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  },
  ["all-team-members"],
  { tags: [TEAM_TAG], revalidate: 86400 }
);

export const getActiveTeamMembers = unstable_cache(
  async (): Promise<AttorneyBio[]> => {
    const all = await readAllTeamMembers();
    return all
      .filter((m) => m.active !== false)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  },
  ["active-team-members"],
  { tags: [TEAM_TAG], revalidate: 86400 }
);

export async function getTeamMemberById(id: string): Promise<AttorneyBio | null> {
  const getCached = unstable_cache(
    async (memberId: string) => {
      const all = await readAllTeamMembers();
      return all.find((m) => m.id === memberId) ?? null;
    },
    [`team-member-${id}`],
    { tags: [TEAM_TAG, `team-member:${id}`], revalidate: 86400 }
  );
  return getCached(id);
}

export async function getTeamMemberBySlug(slug: string): Promise<AttorneyBio | null> {
  const getCached = unstable_cache(
    async (s: string) => {
      const all = await readAllTeamMembers();
      return all.find((m) => m.slug === s) ?? null;
    },
    [`team-member-slug-${slug}`],
    { tags: [TEAM_TAG, `team-member-slug:${slug}`], revalidate: 86400 }
  );
  return getCached(slug);
}
