import type { Metadata } from "next";
import { WillsTrustsPageView } from "@/components/services/wills-trusts-page-view";

export const metadata: Metadata = {
  title: "Wills, Trusts & Estate Planning in Colombia | Capital M Law",
  description:
    "Prepare your legacy and protect what matters most. Formal solemn wills, civil trusts (Fiducia Civil), usufruct rights, and cross-border expat estate planning in Colombia.",
  alternates: { canonical: "/services/wills-and-trusts" },
  openGraph: {
    title: "Wills, Trusts & Estate Planning in Colombia | Capital M Law",
    description:
      "Cross-border wills, notarial protocolization, civil trusts, and advance healthcare directives in Medellín, Colombia.",
    type: "website",
  },
};

export default function WillsAndTrustsPage() {
  return (
    <main>
      <WillsTrustsPageView />
    </main>
  );
}
