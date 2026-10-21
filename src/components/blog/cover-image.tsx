import { Scale } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Cover image with a branded fallback.
 * Uses a plain <img> because covers can be any external https URL entered by
 * staff (next/image would require whitelisting every host in remotePatterns).
 */
export function CoverImage({
  src,
  alt,
  className,
  priority = false,
}: {
  src: string | null;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  if (!src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "legal-texture-bg relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#16345F] via-[#1E4479] to-[#C01072]/80",
          className,
        )}
      >
        <Scale className="relative z-10 size-12 text-white/70" strokeWidth={1.25} />
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={cn("object-cover", className)}
    />
  );
}
