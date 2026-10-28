import type { Metadata } from "next";
import { LabourLawPageView } from "@/components/services/labour-law-page-view";

export const metadata: Metadata = {
  title: "Labour Law & Employment Compliance in Colombia | Capital M Law",
  description:
    "Hire talent in Colombia with complete legal confidence. Employment contracts, RIT policies, UGPP compliance, and voluntary SAS liquidation.",
  alternates: { canonical: "/services/labour-law" },
  openGraph: {
    title: "Labour Law & Employment Compliance | Capital M Law",
    description:
      "Strategic employment agreements, independent contractor defense, terminations, and SAS liquidation in Colombia.",
    type: "website",
  },
};

export default function LabourLawPage() {
  return (
    <main>
      <LabourLawPageView />
    </main>
  );
}
