import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { PageTransitionProvider } from "@/components/transitions/page-transition-provider";
import { FloatingContactButton } from "@/components/ui/micro-interactions";
import { BackToTop } from "@/components/ui/back-to-top";
import "./globals.css";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://capitalmlaw.com"),
  title: "Capital M Law | Colombian Legal Experts",
  description: "Visas, Real Estate, and Corporate Law in Medellín, Colombia.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} scroll-smooth`}>
      <body className="antialiased selection:bg-[#C01072]/20 selection:text-[#C01072]">
        <PageTransitionProvider>
          {children}
          <FloatingContactButton />
          <BackToTop />
        </PageTransitionProvider>
      </body>
    </html>
  );
}
