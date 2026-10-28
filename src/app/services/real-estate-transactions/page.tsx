import type { Metadata } from "next";
import { RealEstatePageView } from "@/components/services/real-estate-page-view";

export const metadata: Metadata = {
  title: "Real Estate Transactions & Landlord Law in Colombia | Capital M Law",
  description:
    "Secure your property purchase and urban lease contracts in Colombia. 10-to-20-year title due diligence, promissory agreements, and Banco de la República foreign investment registration.",
  alternates: { canonical: "/services/real-estate-transactions" },
  openGraph: {
    title: "Purchase Legal Assistance & Real Estate Law | Capital M Law",
    description:
      "Expert property lawyers in Medellín. Title searches, closing notary representation, and landlord & tenant dispute defense in Colombia.",
    type: "website",
  },
};

export default function RealEstateTransactionsPage() {
  return (
    <main>
      <RealEstatePageView />
    </main>
  );
}
