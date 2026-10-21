"use client";

import { useEffect, useRef } from "react";
import { LoaderCircle as Loader2, Search, X } from "lucide-react";

interface BlogSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  pending?: boolean;
}

/** Keyword search. Press "/" anywhere on the page to focus it. */
export function BlogSearchBar({ value, onChange, pending }: BlogSearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      if (e.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="relative">
      <label htmlFor="blog-search" className="sr-only">
        Search articles
      </label>
      <Search className="pointer-events-none absolute left-5 top-1/2 size-5 -translate-y-1/2 text-[#706F6F] dark:text-gray-400" />
      <input
        ref={inputRef}
        id="blog-search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Escape" && onChange("")}
        placeholder="Search guides: visas, SAS, property purchase, taxes…"
        autoComplete="off"
        className="h-14 w-full rounded-2xl border border-[#16345F]/10 bg-white pl-14 pr-24 text-[15px] text-[#16345F] shadow-[0_8px_30px_-12px_rgba(22,52,95,0.18)] outline-none transition placeholder:text-[#706F6F]/70 focus:border-[#9BB8E0] focus:ring-4 focus:ring-[#9BB8E0]/25 dark:border-white/10 dark:bg-[#0F1E35] dark:text-white dark:placeholder:text-gray-500 [&::-webkit-search-cancel-button]:hidden"
      />
      <div className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-2">
        {pending && <Loader2 className="size-4 animate-spin text-[#9BB8E0]" aria-hidden />}
        {value ? (
          <button
            type="button"
            onClick={() => {
              onChange("");
              inputRef.current?.focus();
            }}
            className="rounded-full p-1.5 text-[#706F6F] transition hover:bg-[#16345F]/5 hover:text-[#16345F] dark:hover:bg-white/10 dark:hover:text-white"
            aria-label="Clear search"
          >
            <X className="size-4" />
          </button>
        ) : (
          <kbd className="hidden rounded-md border border-[#16345F]/10 px-2 py-0.5 font-sans text-xs text-[#706F6F] sm:inline dark:border-white/10">
            /
          </kbd>
        )}
      </div>
    </div>
  );
}
