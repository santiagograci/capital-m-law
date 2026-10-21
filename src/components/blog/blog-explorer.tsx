"use client";

import { SearchX, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBlogFilters } from "@/hooks/use-blog-filters";
import type { BlogPostSummary, BlogSort } from "@/types/blog";
import { BlogSearchBar } from "./blog-search-bar";
import { BlogTagFilter } from "./blog-tag-filter";
import { FeaturedPosts } from "./featured-posts";
import { PostCard } from "./post-card";

const SORT_LABELS: Record<BlogSort, string> = {
  newest: "Newest first",
  oldest: "Oldest first",
  quick: "Quick reads",
};

/**
 * Client-side explorer: receives all post summaries once (cached on the
 * server) and filters instantly in the browser — no network per keystroke.
 */
export function BlogExplorer({ posts }: { posts: BlogPostSummary[] }) {
  const {
    state,
    filtered,
    isStale,
    hasActiveFilters,
    availableTags,
    categoryCounts,
    setQuery,
    setCategory,
    toggleTag,
    setSort,
    reset,
  } = useBlogFilters(posts);

  const featured = posts.filter((p) => p.featured).slice(0, 3);
  const featuredIds = new Set(featured.map((p) => p.id));
  // Avoid duplicates: when the featured block is visible, the grid shows the rest.
  const gridPosts = hasActiveFilters ? filtered : filtered.filter((p) => !featuredIds.has(p.id));

  return (
    <>
      {/* Sticky filter panel */}
      <div className="sticky top-[72px] z-30 -mx-4 mb-10 border-b border-[#16345F]/5 bg-white/85 px-4 pb-5 pt-4 backdrop-blur-xl dark:border-white/5 dark:bg-[#0A1526]/85 sm:mx-0 sm:rounded-3xl sm:border sm:p-6 sm:shadow-[0_20px_50px_-30px_rgba(22,52,95,0.35)]">
        <div className="space-y-5">
          <BlogSearchBar value={state.query} onChange={setQuery} pending={isStale} />
          <BlogTagFilter
            activeCategory={state.category}
            categoryCounts={categoryCounts}
            totalCount={posts.length}
            onCategoryChange={setCategory}
            tags={availableTags}
            activeTags={state.tags}
            onTagToggle={toggleTag}
          />
        </div>
      </div>

      {!hasActiveFilters && <FeaturedPosts posts={featured} />}

      {/* Results header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-xl font-semibold text-[#16345F] dark:text-white">
            {hasActiveFilters ? "Results" : "Latest Articles"}
          </h2>
          <span className="text-sm text-[#706F6F] dark:text-gray-400" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? "article" : "articles"}
          </span>
          {hasActiveFilters && (
            <ActiveFilterChips
              query={state.query}
              category={state.category}
              tags={state.tags}
              onClearQuery={() => setQuery("")}
              onClearCategory={() => setCategory(null)}
              onRemoveTag={toggleTag}
              onReset={reset}
            />
          )}
        </div>

        <label className="inline-flex items-center gap-2 text-sm text-[#706F6F] dark:text-gray-400">
          <SlidersHorizontal className="size-4" />
          <span className="sr-only">Sort by</span>
          <select
            value={state.sort}
            onChange={(e) => setSort(e.target.value as BlogSort)}
            className="rounded-lg border border-[#16345F]/10 bg-white py-1.5 pl-2 pr-8 text-sm font-medium text-[#16345F] outline-none focus:border-[#9BB8E0] dark:border-white/10 dark:bg-[#0F1E35] dark:text-white"
          >
            {Object.entries(SORT_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {gridPosts.length > 0 ? (
        <div
          className={cn(
            "grid gap-6 transition-opacity duration-200 sm:grid-cols-2 lg:grid-cols-3",
            isStale && "opacity-60",
          )}
        >
          {gridPosts.map((post) => (
            <PostCard key={post.id} post={post} onTagClick={toggleTag} activeTags={state.tags} />
          ))}
        </div>
      ) : hasActiveFilters ? (
        <EmptyState onReset={reset} />
      ) : posts.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-[#9BB8E0] p-12 text-center text-[#706F6F]">
          No articles published yet. Check back soon.
        </p>
      ) : null}
    </>
  );
}

function ActiveFilterChips(props: {
  query: string;
  category: string | null;
  tags: string[];
  onClearQuery: () => void;
  onClearCategory: () => void;
  onRemoveTag: (tag: string) => void;
  onReset: () => void;
}) {
  const chip =
    "inline-flex items-center gap-1 rounded-full bg-[#9BB8E0]/20 py-1 pl-3 pr-1.5 text-xs font-medium text-[#16345F] dark:bg-white/10 dark:text-gray-200";
  const x = "rounded-full p-0.5 hover:bg-[#16345F]/10 dark:hover:bg-white/10";
  return (
    <div className="flex flex-wrap items-center gap-1.5 sm:ml-2">
      {props.query.trim() && (
        <span className={chip}>
          “{props.query.trim()}”
          <button type="button" className={x} onClick={props.onClearQuery} aria-label="Clear search">
            <X className="size-3" />
          </button>
        </span>
      )}
      {props.category && (
        <span className={chip}>
          {props.category}
          <button type="button" className={x} onClick={props.onClearCategory} aria-label={`Remove ${props.category}`}>
            <X className="size-3" />
          </button>
        </span>
      )}
      {props.tags.map((t) => (
        <span key={t} className={chip}>
          #{t}
          <button type="button" className={x} onClick={() => props.onRemoveTag(t)} aria-label={`Remove tag ${t}`}>
            <X className="size-3" />
          </button>
        </span>
      ))}
      <button type="button" onClick={props.onReset} className="ml-1 text-xs font-semibold text-[#C01072] hover:underline dark:text-[#F472B6]">
        Clear all
      </button>
    </div>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-[#9BB8E0] bg-[#9BB8E0]/5 px-6 py-16 text-center">
      <span className="flex size-14 items-center justify-center rounded-2xl bg-white text-[#16345F] shadow-sm dark:bg-white/10 dark:text-[#9BB8E0]">
        <SearchX className="size-6" />
      </span>
      <div>
        <p className="text-lg font-semibold text-[#16345F] dark:text-white">No articles match your filters</p>
        <p className="mt-1 text-sm text-[#706F6F] dark:text-gray-400">
          Try different keywords or remove a topic. Can’t find your answer? Ask our lawyers directly.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={onReset}
          className="rounded-xl bg-[#16345F] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1E4479]"
        >
          Clear filters
        </button>
        <a
          href="/#consultation"
          className="rounded-xl border border-[#C01072] px-5 py-2.5 text-sm font-semibold text-[#C01072] transition hover:bg-[#C01072] hover:text-white"
        >
          Book a consultation
        </a>
      </div>
    </div>
  );
}

/** Skeleton shown while the explorer hydrates search params. */
export function BlogExplorerSkeleton() {
  return (
    <div aria-hidden className="animate-pulse">
      <div className="mb-10 space-y-5 rounded-3xl border border-[#16345F]/5 p-6 dark:border-white/5">
        <div className="h-14 rounded-2xl bg-[#16345F]/5 dark:bg-white/5" />
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-9 w-28 rounded-full bg-[#16345F]/5 dark:bg-white/5" />
          ))}
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-96 rounded-2xl bg-[#16345F]/5 dark:bg-white/5" />
        ))}
      </div>
    </div>
  );
}
