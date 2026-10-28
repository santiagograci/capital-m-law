import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES_CATALOG } from "@/data/services-catalog";
import { ServiceDetailView } from "@/components/services/service-detail-view";
import { VisasImmigrationPageView } from "@/components/services/visas-immigration-page-view";
import { RealEstatePageView } from "@/components/services/real-estate-page-view";
import { MarriagePrenupsPageView } from "@/components/services/marriage-prenups-page-view";
import { LabourLawPageView } from "@/components/services/labour-law-page-view";
import { WillsTrustsPageView } from "@/components/services/wills-trusts-page-view";

const DEDICATED_SLUGS = [
  "visas-and-immigration",
  "real-estate-transactions",
  "marriage-and-prenups",
  "marriage-and-prenuptial-agreements",
  "labour-law",
  "wills-and-trusts",
];

export async function generateStaticParams() {
  return SERVICES_CATALOG
    .filter((service) => !DEDICATED_SLUGS.includes(service.slug))
    .map((service) => ({
      slug: service.slug,
    }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "visas-and-immigration") {
    return {
      title: "Visas & Immigration in Colombia | Capital M Law Medellín",
      description:
        "Strategic legal counsel for your move, investment, or family visa in Colombia. Type V, Type M, and Type R residency.",
      alternates: { canonical: "/services/visas-and-immigration" },
    };
  }

  if (slug === "real-estate-transactions") {
    return {
      title: "Real Estate Transactions & Landlord Law in Colombia | Capital M Law",
      description:
        "Secure your property purchase and urban lease contracts in Colombia. 10-to-20-year title due diligence, promissory agreements, and Banco de la República foreign investment registration.",
      alternates: { canonical: "/services/real-estate-transactions" },
    };
  }

  if (slug === "marriage-and-prenups" || slug === "marriage-and-prenuptial-agreements") {
    return {
      title: "Marriage & Prenuptial Agreements in Colombia | Capital M Law",
      description:
        "Empathetic, rigorous, and clear family legal counsel in Colombia. Civil marriages, enforceable Capitulaciones, divorce proceedings, child custody, and spouse visas.",
      alternates: { canonical: "/services/marriage-and-prenups" },
    };
  }

  if (slug === "labour-law") {
    return {
      title: "Labour Law & Employment Compliance in Colombia | Capital M Law",
      description:
        "Hire talent in Colombia with complete legal confidence. Employment contracts, RIT policies, UGPP compliance, and voluntary SAS liquidation.",
      alternates: { canonical: "/services/labour-law" },
    };
  }

  if (slug === "wills-and-trusts") {
    return {
      title: "Wills, Trusts & Estate Planning in Colombia | Capital M Law",
      description:
        "Prepare your legacy and protect what matters most. Formal solemn wills, civil trusts (Fiducia Civil), usufruct rights, and cross-border expat estate planning in Colombia.",
      alternates: { canonical: "/services/wills-and-trusts" },
    };
  }

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

  if (slug === "visas-and-immigration") {
    return (
      <main>
        <VisasImmigrationPageView />
      </main>
    );
  }

  if (slug === "real-estate-transactions") {
    return (
      <main>
        <RealEstatePageView />
      </main>
    );
  }

  if (slug === "marriage-and-prenups" || slug === "marriage-and-prenuptial-agreements") {
    return (
      <main>
        <MarriagePrenupsPageView />
      </main>
    );
  }

  if (slug === "labour-law") {
    return (
      <main>
        <LabourLawPageView />
      </main>
    );
  }

  if (slug === "wills-and-trusts") {
    return (
      <main>
        <WillsTrustsPageView />
      </main>
    );
  }

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
