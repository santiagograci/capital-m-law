import "server-only";

import { unstable_noStore as noStore } from "next/cache";
import type { LifeMoment } from "@/types/life";
import { readAllLifeMoments } from "./store";

export const LIFE_TAG = "life-moments";

export async function getAllLifeMoments(): Promise<LifeMoment[]> {
  noStore();
  const moments = await readAllLifeMoments();
  return [...moments].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export async function getActiveLifeMoments(): Promise<LifeMoment[]> {
  noStore();
  const moments = await readAllLifeMoments();
  return moments
    .filter((m) => m.active !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export async function getLifeMomentById(id: string): Promise<LifeMoment | null> {
  noStore();
  const moments = await readAllLifeMoments();
  return moments.find((m) => m.id === id) ?? null;
}
