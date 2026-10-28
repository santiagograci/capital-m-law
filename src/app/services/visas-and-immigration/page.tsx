import type { Metadata } from "next";
import { VisasImmigrationPageView } from "@/components/services/visas-immigration-page-view";

export const metadata: Metadata = {
  title: "Visas & Immigration in Colombia | Capital M Law Medellín",
  description:
    "Strategic legal counsel for your move, investment, or family visa in Colombia. Type V (Digital Nomad, Rentier, Student), Type M (Real Estate, Corporate, Spouse), and Type R residency.",
  alternates: { canonical: "/services/visas-and-immigration" },
  openGraph: {
    title: "Visas & Immigration Strategy in Colombia | Capital M Law",
    description:
      "Expert immigration lawyers in Medellín. Comprehensive defense before Migración Colombia, Cédula de Extranjería support, and fast-track translations.",
    type: "website",
  },
};

export default function VisasAndImmigrationPage() {
  return (
    <main>
      <VisasImmigrationPageView />
    </main>
  );
}
