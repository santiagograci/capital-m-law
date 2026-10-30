import "server-only";

import { unstable_cache } from "next/cache";
import type { LifeMoment } from "@/types/life";
import { readAllLifeMoments } from "./store";

export const LIFE_TAG = "life-moments";

export const getAllLifeMoments = unstable_cache(
  async (): Promise<LifeMoment[]> => {
    const moments = await readAllLifeMoments();
    return moments.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  },
  ["all-life-moments"],
  { tags: [LIFE_TAG], revalidate: 86400 }
);

export const getActiveLifeMoments = unstable_cache(
  async (): Promise<LifeMoment[]> => {
    const moments = await readAllLifeMoments();
    return moments
      .filter((m) => m.active !== false)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  },
  ["active-life-moments"],
  { tags: [LIFE_TAG], revalidate: 86400 }
);

export async function getLifeMomentById(id: string): Promise<LifeMoment | null> {
  const getCached = unstable_cache(
    async (momentId: string) => {
      const moments = await readAllLifeMoments();
      return moments.find((m) => m.id === momentId) ?? null;
    },
    [`life-moment-${id}`],
    { tags: [LIFE_TAG, `life-moment:${id}`], revalidate: 86400 }
  );
  return getCached(id);
}
