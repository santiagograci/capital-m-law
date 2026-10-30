export const dynamic = "force-dynamic";
export const revalidate = 0;

import { TeamExecutiveView } from "@/components/team/team-executive-view";
import { getActiveTeamMembers } from "@/lib/team/queries";

export default async function TeamPage() {
  const members = await getActiveTeamMembers();

  return (
    <main>
      <TeamExecutiveView initialMembers={members} />
    </main>
  );
}
