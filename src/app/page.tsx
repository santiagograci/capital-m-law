export const dynamic = "force-dynamic";
export const revalidate = 0;

import { HomePageView } from "@/components/home/home-page-view";
import { getActiveTeamMembers } from "@/lib/team/queries";
import { getActiveLifeMoments } from "@/lib/life/queries";

export default async function HomePage() {
  const [team, life] = await Promise.all([
    getActiveTeamMembers(),
    getActiveLifeMoments(),
  ]);

  return <HomePageView initialTeam={team} initialLife={life} />;
}
