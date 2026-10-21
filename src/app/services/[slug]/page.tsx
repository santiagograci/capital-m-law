import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES_CATALOG } from "@/data/services-catalog";
import { ServiceDetailView } from "@/components/services/service-detail-view";

export async function generateStaticParams() {
  return SERVICES_CATALOG.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES_CATALOG.find((s) => s.slug === slug);
  if (!service) return { title: "Service Not Found | Capital M Law" };

  return {
    title: `${service.name.en} | Capital M Law Medellín`,
    description: service.heroSubtitle.en,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.name.en} | Capital M Law`,
      description: service.heroSubtitle.en,
      type: "website",
    },
  };
}

export default async function ServicePage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = SERVICES_CATALOG.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <main>
      <ServiceDetailView service={service} />
    </main>
  );
}
