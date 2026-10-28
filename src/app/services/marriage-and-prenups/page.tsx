import type { Metadata } from "next";
import { MarriagePrenupsPageView } from "@/components/services/marriage-prenups-page-view";

export const metadata: Metadata = {
  title: "Marriage & Prenuptial Agreements in Colombia | Capital M Law",
  description:
    "Empathetic, rigorous, and clear family legal counsel in Colombia. Civil marriages, enforceable Capitulaciones, divorce proceedings, child custody, and spouse visas.",
  alternates: { canonical: "/services/marriage-and-prenups" },
  openGraph: {
    title: "Marriage, Prenups & Family Law in Colombia | Capital M Law",
    description:
      "Civil marriage logistics, prenuptial agreements (Capitulaciones), mutual divorce, and child custody in Medellín, Colombia.",
    type: "website",
  },
};

export default function MarriageAndPrenupsPage() {
  return (
    <main>
      <MarriagePrenupsPageView />
    </main>
  );
}
