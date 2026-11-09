import type { Metadata } from "next";
import Image from "next/image";
import { Camera, MapPin, User } from "lucide-react";
import { BlogHeader } from "@/components/blog/blog-header";
import { Footer } from "@/components/Footer";
import { getGalleryPhotos } from "@/data/gallery";
import { getActiveLifeMoments } from "@/lib/life/queries";

export const revalidate = 86400; // 24 horas (ISR)

export const metadata: Metadata = {
  title: "Life at Capital M | Capital M Law Medellín",
  description:
    "Explore real moments, closings, and celebrations with our international clients and legal team across Medellín, Colombia.",
  alternates: { canonical: "/life-at-capital-m" },
};

export default async function LifeAtCapitalMPage() {
  const [activeMoments, galleryItems] = await Promise.all([
    getActiveLifeMoments(),
    getGalleryPhotos(),
  ]);

  const itemsToRender =
    activeMoments.length > 0
      ? activeMoments.map((moment) => {
          const fileName = moment.image.split("/").pop()?.toLowerCase() ?? "";
          const baseName = fileName.replace(/\.[^.]+$/, "");
          const matchedBlob =
            moment.image.startsWith("/gallery/") && baseName
              ? galleryItems.find((b) => {
                  const blobName = b.pathname.split("/").pop()?.toLowerCase() ?? "";
                  return (
                    b.url.startsWith("http") &&
                    (blobName === fileName || blobName.startsWith(baseName))
                  );
                })
              : undefined;
          const resolvedUrl = matchedBlob?.url || moment.image;

          return {
            id: moment.id,
            url: resolvedUrl,
            pathname: matchedBlob?.pathname || moment.image,
            alt: `${moment.title.en} - Capital M Law`,
            title: moment.title,
            location: moment.location,
            client: moment.client,
            caption: moment.caption,
            tag: moment.tag,
          };
        })
      : galleryItems.map((blob, index) => ({
          id: blob.pathname || `gallery-${index}`,
          url: blob.url,
          pathname: blob.pathname,
          alt: blob.alt,
          title: blob.title,
          location: blob.location,
          client: blob.client,
          caption: blob.caption,
          tag: blob.tag,
        }));

  return (
    <div className="min-h-screen bg-[#FAFBFD] dark:bg-[#0A1526]">
      <BlogHeader />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 space-y-12">
        <section className="legal-texture-bg relative overflow-hidden rounded-3xl bg-gradient-to-b from-white to-[#FAFBFD] dark:from-[#0F1E35] dark:to-[#0A1526] p-8 sm:p-12 lg:p-16 border border-[#16345F]/10 dark:border-white/10 shadow-sm">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#C01072]/20 bg-[#C01072]/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#C01072] dark:border-[#F472B6]/30 dark:bg-white/5 dark:text-[#F472B6]">
              <Camera className="size-4" />
              Life at Capital M
            </span>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#16345F] dark:text-white leading-[1.1]">
              Real Milestones with Our Clients in{" "}
              <span className="text-[#C01072] dark:text-[#F472B6]">Medellín</span>
            </h1>
            <p className="text-base sm:text-lg text-[#706F6F] dark:text-gray-300 leading-relaxed">
              Every visa approval, real estate closing, and company incorporation is a personal milestone.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {itemsToRender.map((blob) => (
            <article
              key={blob.id || blob.pathname || blob.url}
              className="group overflow-hidden rounded-3xl border border-[#16345F]/10 dark:border-white/10 bg-white dark:bg-[#0F1E35] shadow-sm transition hover:shadow-md flex flex-col justify-between"
            >
              <div className="aspect-[16/10] w-full overflow-hidden bg-gray-100 dark:bg-white/5 relative">
                <Image
                  src={blob.url}
                  alt={blob.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 rounded-full bg-[#16345F]/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-white">
                  {blob.tag.en} · {blob.tag.es}
                </span>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#00AA81]">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="size-3.5" />
                    {blob.location}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[#706F6F] dark:text-gray-400">
                    <User className="size-3.5" />
                    {blob.client}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-[#16345F] dark:text-white">
                  {blob.title.en}
                </h2>
                <p className="text-xs font-semibold text-[#C01072] dark:text-[#F472B6]">
                  {blob.title.es}
                </p>
                <p className="text-sm text-[#706F6F] dark:text-gray-300 leading-relaxed">
                  {blob.caption.en}
                </p>
                <p className="text-xs text-[#706F6F]/80 dark:text-gray-400 italic">
                  {blob.caption.es}
                </p>
              </div>
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
