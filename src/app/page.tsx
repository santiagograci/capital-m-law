import { HomePageView } from "@/components/home/home-page-view";
import { getActiveTeamMembers } from "@/lib/team/queries";
import { getActiveLifeMoments } from "@/lib/life/queries";
import { getPostSummaries } from "@/lib/blog/queries";
import { getGalleryPhotos } from "@/data/gallery";

export const revalidate = 86400; // 24 horas (ISR)

export default async function HomePage() {
  const [team, life, galleryPhotos, posts] = await Promise.all([
    getActiveTeamMembers(),
    getActiveLifeMoments(),
    getGalleryPhotos(),
    getPostSummaries(),
  ]);

  return (
    <HomePageView
      initialTeam={team}
      initialLife={life}
      initialGallery={galleryPhotos}
      initialPosts={posts}
    />
  );
}
