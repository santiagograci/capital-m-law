import type { Metadata } from "next";
import { ContactPageView } from "@/components/contact/contact-page-view";

export const metadata: Metadata = {
  title: "Service Promises & Direct Contact | Capital M Law Medellín",
  description:
    "Contact Capital M Law in Medellín, Colombia. 24h response guarantee, transparent fixed fees, bilingual legal counsel in English & Spanish, and strict confidentiality.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactPageView />;
}
