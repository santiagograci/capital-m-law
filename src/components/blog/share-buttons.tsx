"use client";

import { useState, type SVGProps } from "react";
import { Check, Link2, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

/* lucide v1 removed brand icons → minimal inline SVGs (currentColor). */
type IconProps = SVGProps<SVGSVGElement>;
const Linkedin = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
);
const XLogo = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z" />
  </svg>
);
const Facebook = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z" />
  </svg>
);
const WhatsApp = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35ZM12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88Zm8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.48-8.41Z" />
  </svg>
);

interface ShareButtonsProps {
  title: string;
  excerpt: string;
  /** "row" for header/footer, "column" for the sticky side rail. */
  layout?: "row" | "column";
}

type Network = "linkedin" | "x" | "facebook" | "whatsapp";

const NETWORKS: { id: Network; label: string; Icon: (p: IconProps) => React.JSX.Element }[] = [
  { id: "linkedin", label: "Share on LinkedIn", Icon: Linkedin },
  { id: "x", label: "Share on X", Icon: XLogo },
  { id: "facebook", label: "Share on Facebook", Icon: Facebook },
  { id: "whatsapp", label: "Share on WhatsApp", Icon: WhatsApp },
];

function shareUrl(network: Network, url: string, title: string): string {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  switch (network) {
    case "linkedin":
      return `https://www.linkedin.com/sharing/share-offsite/?url=${u}`;
    case "x":
      return `https://twitter.com/intent/tweet?url=${u}&text=${t}`;
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${u}`;
    case "whatsapp":
      return `https://wa.me/?text=${t}%20${u}`;
  }
}

export function ShareButtons({ title, excerpt, layout = "row" }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  // URL is read at click time → no hydration mismatch and works on any domain.
  const currentUrl = () => window.location.href.split("?")[0];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(currentUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — ignore */
    }
  }

  async function nativeShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: excerpt, url: currentUrl() });
      } catch {
        /* user cancelled */
      }
    } else {
      await copyLink();
    }
  }

  const btn =
    "inline-flex size-10 items-center justify-center rounded-xl border border-[#16345F]/10 text-[#16345F] transition hover:-translate-y-0.5 hover:border-[#C01072] hover:bg-[#C01072] hover:text-white dark:border-white/10 dark:text-[#9BB8E0]";

  return (
    <div className={cn("flex items-center gap-2", layout === "column" && "flex-col")}>
      <span
        className={cn(
          "text-xs font-semibold uppercase tracking-wider text-[#706F6F] dark:text-gray-400",
          layout === "column" ? "mb-1 [writing-mode:vertical-rl] rotate-180" : "mr-1",
        )}
      >
        Share
      </span>
      {NETWORKS.map(({ id, label, Icon }) => (
        <button
          key={id}
          type="button"
          aria-label={label}
          title={label}
          className={btn}
          onClick={() =>
            window.open(shareUrl(id, currentUrl(), title), "_blank", "noopener,noreferrer,width=640,height=600")
          }
        >
          <Icon className="size-4" />
        </button>
      ))}
      <button type="button" aria-label="Copy link" title="Copy link" onClick={copyLink} className={btn}>
        {copied ? <Check className="size-4" /> : <Link2 className="size-4" />}
      </button>
      <button
        type="button"
        aria-label="More sharing options"
        title="More"
        onClick={nativeShare}
        className={cn(btn, "sm:hidden")}
      >
        <Share2 className="size-4" />
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Link copied to clipboard" : ""}
      </span>
    </div>
  );
}
