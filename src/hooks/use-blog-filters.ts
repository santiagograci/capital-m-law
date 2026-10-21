"use client";

import { useCallback, useDeferredValue, useEffect, useMemo, useReducer, useRef } from "react";
import { useSearchParams } from "next/navigation";
import {
  BLOG_CATEGORIES,
  type BlogCategory,
  type BlogFilterState,
  type BlogPostSummary,
  type BlogSort,
} from "@/types/blog";

/* -------------------------------------------------------------------------- */
/*                                  Reducer                                   */
/* -------------------------------------------------------------------------- */

type Action =
  | { type: "setQuery"; query: string }
  | { type: "setCategory"; category: BlogCategory | null }
  | { type: "toggleTag"; tag: string }
  | { type: "setSort"; sort: BlogSort }
  | { type: "reset" };

export const INITIAL_FILTERS: BlogFilterState = {
  query: "",
  category: null,
  tags: [],
  sort: "newest",
};

function reducer(state: BlogFilterState, action: Action): BlogFilterState {
  switch (action.type) {
    case "setQuery":
      return { ...state, query: action.query };
    case "setCategory":
      // Clicking the active category toggles it off.
      return { ...state, category: state.category === action.category ? null : action.category };
    case "toggleTag": {
      const has = state.tags.some((t) => t.toLowerCase() === action.tag.toLowerCase());
      return {
        ...state,
        tags: has
          ? state.tags.filter((t) => t.toLowerCase() !== action.tag.toLowerCase())
          : [...state.tags, action.tag],
      };
    }
    case "setSort":
      return { ...state, sort: action.sort };
    case "reset":
      return INITIAL_FILTERS;
  }
}

/* -------------------------------------------------------------------------- */
/*                              URL <-> state                                 */
/* -------------------------------------------------------------------------- */

const SORTS: BlogSort[] = ["newest", "oldest", "quick"];

function fromSearchParams(params: URLSearchParams): BlogFilterState {
  const category = params.get("category");
  const sort = params.get("sort") as BlogSort | null;
  return {
    query: params.get("q") ?? "",
    category: BLOG_CATEGORIES.includes(category as BlogCategory) ? (category as BlogCategory) : null,
    tags: (params.get("tags") ?? "").split(",").map((t) => t.trim()).filter(Boolean),
    sort: sort && SORTS.includes(sort) ? sort : "newest",
  };
}

function toQueryString(state: BlogFilterState): string {
  const p = new URLSearchParams();
  if (state.query.trim()) p.set("q", state.query.trim());
  if (state.category) p.set("category", state.category);
  if (state.tags.length) p.set("tags", state.tags.join(","));
  if (state.sort !== "newest") p.set("sort", state.sort);
  const qs = p.toString();
  return qs ? `?${qs}` : "";
}

/* -------------------------------------------------------------------------- */
/*                                 Filtering                                  */
/* -------------------------------------------------------------------------- */

function normalize(s: string): string {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export function filterPosts(posts: BlogPostSummary[], f: BlogFilterState): BlogPostSummary[] {
  const terms = normalize(f.query).split(/\s+/).filter(Boolean);
  const wantedTags = f.tags.map((t) => t.toLowerCase());

  const result = posts.filter((post) => {
    if (f.category && post.category !== f.category) return false;

    // Tags: AND semantics — every selected tag must be on the post.
    if (wantedTags.length) {
      const postTags = post.tags.map((t) => t.toLowerCase());
      if (!wantedTags.every((t) => postTags.includes(t))) return false;
    }

    // Keywords: every term must appear somewhere in the searchable text.
    if (terms.length) {
      const haystack = normalize(
        [post.title, post.excerpt, post.author, post.category, ...post.tags].join(" "),
      );
      if (!terms.every((t) => haystack.includes(t))) return false;
    }
    return true;
  });

  return result.sort((a, b) => {
    if (f.sort === "oldest") return a.publishedAt.localeCompare(b.publishedAt);
    if (f.sort === "quick") return a.readingTime - b.readingTime || b.publishedAt.localeCompare(a.publishedAt);
    return b.publishedAt.localeCompare(a.publishedAt);
  });
}

/* -------------------------------------------------------------------------- */
/*                                   Hook                                     */
/* -------------------------------------------------------------------------- */

/**
 * Owns all blog filter state.
 *
 * - `useReducer` keeps transitions explicit and testable.
 * - `useDeferredValue` keeps typing in the search box responsive.
 * - State is mirrored to the URL (`?q=&category=&tags=&sort=`) with
 *   `history.replaceState`, so filtered views are shareable / bookmarkable
 *   and survive reloads, without triggering server round-trips.
 */
export function useBlogFilters(posts: BlogPostSummary[]) {
  const searchParams = useSearchParams();
  const [state, dispatch] = useReducer(reducer, searchParams, (sp) =>
    fromSearchParams(new URLSearchParams(sp.toString())),
  );

  const deferredState = useDeferredValue(state);
  const isStale = deferredState !== state;

  // Mirror to URL (skip first render to avoid a no-op replace).
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const qs = toQueryString(state);
    if (qs !== window.location.search && !(qs === "" && window.location.search === "")) {
      window.history.replaceState(null, "", `${window.location.pathname}${qs}`);
    }
  }, [state]);

  const filtered = useMemo(() => filterPosts(posts, deferredState), [posts, deferredState]);

  /** Tags ranked by frequency → most useful chips first. */
  const availableTags = useMemo(() => {
    const counts = new Map<string, { label: string; count: number }>();
    for (const p of posts) {
      for (const t of p.tags) {
        const key = t.toLowerCase();
        const entry = counts.get(key);
        if (entry) entry.count++;
        else counts.set(key, { label: t, count: 1 });
      }
    }
    return [...counts.values()].sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
  }, [posts]);

  const categoryCounts = useMemo(() => {
    const counts = Object.fromEntries(BLOG_CATEGORIES.map((c) => [c, 0])) as Record<BlogCategory, number>;
    for (const p of posts) counts[p.category]++;
    return counts;
  }, [posts]);

  const hasActiveFilters =
    state.query.trim() !== "" || state.category !== null || state.tags.length > 0;

  return {
    state,
    filtered,
    isStale,
    hasActiveFilters,
    availableTags,
    categoryCounts,
    setQuery: useCallback((query: string) => dispatch({ type: "setQuery", query }), []),
    setCategory: useCallback((category: BlogCategory | null) => dispatch({ type: "setCategory", category }), []),
    toggleTag: useCallback((tag: string) => dispatch({ type: "toggleTag", tag }), []),
    setSort: useCallback((sort: BlogSort) => dispatch({ type: "setSort", sort }), []),
    reset: useCallback(() => dispatch({ type: "reset" }), []),
  };
}
