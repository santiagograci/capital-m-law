export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { getActiveTeamMembers, getAllTeamMembers } from "@/lib/team/queries";
import { isAuthenticated } from "@/lib/blog/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const includeAll = searchParams.get("all") === "true";

  if (includeAll && (await isAuthenticated())) {
    const all = await getAllTeamMembers();
    return NextResponse.json(all, {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  }

  const active = await getActiveTeamMembers();
  return NextResponse.json(active, {
    headers: { "Cache-Control": "no-store, max-age=0" },
  });
}
