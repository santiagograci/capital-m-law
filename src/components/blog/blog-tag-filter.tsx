"use client";

import { useState } from "react";
import { Hash } from "lucide-react";
import { cn } from "@/lib/utils";
import { BLOG_CATEGORIES, type BlogCategory } from "@/types/blog";

interface BlogTagFilterProps {
  activeCategory: BlogCategory | null;
  categoryCounts: Record<BlogCategory, number>;
  totalCount: number;
  onCategoryChange: (category: BlogCategory | null) => void;
  tags: { label: string; count: number }[];
  activeTags: string[];
  onTagToggle: (tag: string) => void;
}

const VISIBLE_TAGS = 10;

export function BlogTagFilter({
  activeCategory,
  categoryCounts,
  totalCount,
  onCategoryChange,
  tags,
  activeTags,
  onTagToggle,
}: BlogTagFilterProps) {
  const [showAllTags, setShowAllTags] = useState(false);
  const active = new Set(activeTags.map((t) => t.toLowerCase()));
  // Always keep selected tags visible even when collapsed.
  const visibleTags = showAllTags
    ? tags
    : tags.filter((t, i) => i < VISIBLE_TAGS || active.has(t.label.toLowerCase()));

  return (
    <div className="space-y-4">
      {/* Categories — single select */}
      <div role="group" aria-label="Filter by category" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0 [scrollbar-width:none]">
        <CategoryPill label="All" count={totalCount} active={activeCategory === null} onClick={() => onCategoryChange(null)} />
        {BLOG_CATEGORIES.filter((c) => categoryCounts[c] > 0).map((category) => (
          <CategoryPill
            key={category}
            label={category}
            count={categoryCounts[category]}
            active={activeCategory === category}
            onClick={() => onCategoryChange(category)}
          />
        ))}
      </div>

      {/* Tags — multi select */}
      {tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by tag">
          <span className="mr-1 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-[#706F6F] dark:text-gray-400">
            <Hash className="size-3.5" /> Topics
          </span>
          {visibleTags.map(({ label, count }) => {
            const isActive = active.has(label.toLowerCase());
            return (
              <button
                key={label}
                type="button"
                aria-pressed={isActive}
                onClick={() => onTagToggle(label)}
                className={cn(
                  "rounded-lg border px-3 py-1 text-xs font-medium transition-all",
                  isActive
                    ? "border-[#C01072] bg-[#C01072] text-white shadow-[0_6px_16px_-6px_rgba(192,16,114,0.6)]"
                    : "border-[#9BB8E0]/50 bg-white text-[#16345F] hover:border-[#9BB8E0] hover:bg-[#9BB8E0]/15 dark:border-white/10 dark:bg-transparent dark:text-[#9BB8E0] dark:hover:bg-white/5",
                )}
              >
                {label}
                <span className={cn("ml-1.5 tabular-nums", isActive ? "text-white/80" : "text-[#706F6F] dark:text-gray-500")}>
                  {count}
                </span>
              </button>
            );
          })}
          {tags.length > VISIBLE_TAGS && (
            <button
              type="button"
              onClick={() => setShowAllTags((v) => !v)}
              className="px-2 text-xs font-semibold text-[#C01072] hover:underline dark:text-[#F472B6]"
            >
              {showAllTags ? "Show less" : `+${tags.length - VISIBLE_TAGS} more`}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function CategoryPill({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all",
        active
          ? "bg-[#16345F] text-white shadow-[0_8px_20px_-8px_rgba(22,52,95,0.6)] dark:bg-[#9BB8E0] dark:text-[#0A1526]"
          : "bg-[#16345F]/5 text-[#16345F] hover:bg-[#16345F]/10 dark:bg-white/5 dark:text-gray-200 dark:hover:bg-white/10",
      )}
    >
      {label}
      <span
        className={cn(
          "rounded-full px-1.5 text-[11px] tabular-nums",
          active ? "bg-white/20" : "bg-white text-[#706F6F] dark:bg-white/10 dark:text-gray-400",
        )}
      >
        {count}
      </span>
    </button>
  );
}
