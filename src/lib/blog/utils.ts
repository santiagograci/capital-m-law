import type {
  BlogCategory,
  BlogLanguage,
  BlogPost,
  BlogPostSummary,
  LocalizedText,
} from "@/types/blog";

/** Brand palette — single source of truth for blog components. */
export const BRAND = {
  blue: "#16345F",
  pink: "#C01072",
  gray: "#706F6F",
  lightBlue: "#9BB8E0",
} as const;

/** Visual accent per category (badge + card hover ring). */
export const CATEGORY_STYLES: Record<BlogCategory, { badge: string; dot: string }> = {
  Visas: {
    badge: "bg-[#C01072]/10 text-[#C01072] dark:bg-[#C01072]/20 dark:text-[#F472B6]",
    dot: "bg-[#C01072]",
  },
  "Real Estate": {
    badge: "bg-[#16345F]/10 text-[#16345F] dark:bg-[#9BB8E0]/15 dark:text-[#9BB8E0]",
    dot: "bg-[#16345F] dark:bg-[#9BB8E0]",
  },
  "Corporate & SAS": {
    badge: "bg-[#9BB8E0]/25 text-[#16345F] dark:bg-[#9BB8E0]/15 dark:text-[#C9DAF0]",
    dot: "bg-[#9BB8E0]",
  },
  "Legal Tips": {
    badge: "bg-[#706F6F]/10 text-[#4A4949] dark:bg-white/10 dark:text-gray-200",
    dot: "bg-[#706F6F]",
  },
  "Tax & Compliance": {
    badge: "bg-[#16345F]/5 text-[#16345F] ring-1 ring-[#16345F]/15 dark:text-[#9BB8E0] dark:ring-[#9BB8E0]/25",
    dot: "bg-[#16345F]",
  },
  "Family Law": {
    badge: "bg-[#C01072]/5 text-[#9A0D5B] ring-1 ring-[#C01072]/20 dark:text-[#F472B6]",
    dot: "bg-[#C01072]/70",
  },
};

export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

/** ~220 wpm average for legal/explanatory content. */
export function computeReadingTime(markdown: string): number {
  const words = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*_`~\-[\]()!]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "America/Bogota", // deterministic on server + client → no hydration mismatch
});

export function formatPostDate(iso: string): string {
  return dateFormatter.format(new Date(iso));
}

export function parseTags(raw: string): string[] {
  const seen = new Set<string>();
  return raw
    .split(",")
    .map((t) => t.trim().replace(/\s+/g, " "))
    .filter((t) => t.length > 0 && t.length <= 32)
    .filter((t) => {
      const key = t.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 8);
}

export function toLocalizedText(
  val: unknown,
  primaryLang: BlogLanguage = "en",
): LocalizedText {
  if (val && typeof val === "object" && !Array.isArray(val)) {
    const obj = val as Record<string, unknown>;
    const en = typeof obj.en === "string" ? obj.en : "";
    const es = typeof obj.es === "string" ? obj.es : "";
    return {
      en: en || es,
      es: es || "",
    };
  }
  if (typeof val === "string") {
    return primaryLang === "es"
      ? { en: val, es: val }
      : { en: val, es: "" };
  }
  return { en: "", es: "" };
}

/**
 * Resolves a localized field (`{ en, es }` or legacy plain string) for `lang`,
 * falling back to English (`en`) when the requested translation is empty.
 */
export function getLocalizedField(
  field: LocalizedText | string | undefined | null,
  lang: BlogLanguage = "en",
): string {
  if (!field) return "";
  if (typeof field === "string") return field;
  if (lang === "es") {
    return field.es?.trim() ? field.es : field.en || "";
  }
  return field.en?.trim() ? field.en : field.es || "";
}

export function hasLanguageTranslation(
  field: LocalizedText | string | undefined | null,
  lang: BlogLanguage,
): boolean {
  if (!field) return false;
  if (typeof field === "string") return lang === "en" && field.trim().length > 0;
  return Boolean(field[lang]?.trim());
}

export function toSummary({ content: _content, ...rest }: BlogPost): BlogPostSummary {
  void _content;
  return rest;
}

export function sortByNewest<T extends { publishedAt: string }>(posts: T[]): T[] {
  return [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
