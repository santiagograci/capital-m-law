"use client";

import { startTransition, useActionState, useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  Bold,
  CheckCircle2,
  Eye,
  Heading2,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  LoaderCircle,
  PenLine,
  Quote,
  Star,
  TriangleAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { savePostAction } from "@/lib/blog/actions";
import { computeReadingTime, slugify, toLocalizedText } from "@/lib/blog/utils";
import {
  BLOG_CATEGORIES,
  type BlogCategory,
  type BlogLanguage,
  type BlogPost,
} from "@/types/blog";
import { PostContent } from "../post-content";
import { CategoryBadge } from "../category-badge";

const TEAM_AUTHORS = ["María Fernanda Duarte", "Capital M Law Team", "Legal Research Desk"];

type CoverMode = "url" | "upload" | "none";

interface FormValues {
  titleEn: string;
  titleEs: string;
  excerptEn: string;
  excerptEs: string;
  contentEn: string;
  contentEs: string;
  slug: string;
  author: string;
  category: BlogCategory;
  language: BlogLanguage;
  tags: string;
  featured: boolean;
  coverMode: CoverMode;
  coverUrl: string;
}

const EMPTY: FormValues = {
  titleEn: "",
  titleEs: "",
  excerptEn: "",
  excerptEs: "",
  contentEn: "",
  contentEs: "",
  slug: "",
  author: TEAM_AUTHORS[0],
  category: "Visas",
  language: "en",
  tags: "",
  featured: false,
  coverMode: "url",
  coverUrl: "",
};

function fromPost(post: BlogPost): FormValues {
  const isUpload = post.coverImage?.startsWith("/api/blog/uploads/") ?? false;
  const primaryLang: BlogLanguage = post.language === "es" ? "es" : "en";
  const titleObj = toLocalizedText(post.title, primaryLang);
  const excerptObj = toLocalizedText(post.excerpt, primaryLang);
  const contentObj = toLocalizedText(post.content, primaryLang);

  return {
    titleEn: titleObj.en,
    titleEs: titleObj.es,
    excerptEn: excerptObj.en,
    excerptEs: excerptObj.es,
    contentEn: contentObj.en,
    contentEs: contentObj.es,
    slug: post.slug,
    author: post.author,
    category: post.category,
    language: primaryLang,
    tags: post.tags.join(", "),
    featured: post.featured,
    coverMode: post.coverImage ? (isUpload ? "upload" : "url") : "none",
    coverUrl: isUpload ? "" : (post.coverImage ?? ""),
  };
}

export function PostEditorForm({ post }: { post?: BlogPost }) {
  const isEditing = Boolean(post);
  const [state, formAction, pending] = useActionState(savePostAction, null);
  const [values, setValues] = useState<FormValues>(() => (post ? fromPost(post) : EMPTY));
  const [activeLang, setActiveLang] = useState<BlogLanguage>("en");
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [handledState, setHandledState] = useState(state);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadCoverError, setUploadCoverError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleCoverFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFilePreview(URL.createObjectURL(file));
    setUploadingCover(true);
    setUploadCoverError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.error || `Upload error (${res.status})`);
      }

      const data = (await res.json()) as { url: string };
      if (data?.url) {
        set("coverUrl", data.url);
        set("coverMode", "url");
        setFilePreview(data.url);
      }
    } catch (err) {
      console.error("[post-editor-form] Error al subir cover:", err);
      setUploadCoverError(err instanceof Error ? err.message : "Error al subir la imagen.");
    } finally {
      setUploadingCover(false);
    }
  };

  // Reset after a successful *create* (React "adjust state on prop change" pattern).
  if (state !== handledState) {
    setHandledState(state);
    if (state?.ok && !isEditing) {
      setValues(EMPTY);
      setFilePreview(null);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  // Revoke blob URLs to avoid memory leaks.
  useEffect(() => () => { if (filePreview) URL.revokeObjectURL(filePreview); }, [filePreview]);

  const set = <K extends keyof FormValues>(key: K, value: FormValues[K]) =>
    setValues((v) => ({ ...v, [key]: value }));

  const errors = state?.ok === false ? (state.fieldErrors ?? {}) : {};

  // Submit via transition (instead of `action=`) so React does not auto-reset
  // the form — keeps the chosen file and all inputs if validation fails.
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(() => formAction(fd));
  }

  const currentTitle = activeLang === "es" ? values.titleEs : values.titleEn;
  const currentExcerpt = activeLang === "es" ? values.excerptEs : values.excerptEn;
  const currentContent = activeLang === "es" ? values.contentEs : values.contentEn;

  const setCurrentTitle = (val: string) =>
    set(activeLang === "es" ? "titleEs" : "titleEn", val);
  const setCurrentExcerpt = (val: string) =>
    set(activeLang === "es" ? "excerptEs" : "excerptEn", val);
  const setCurrentContent = (val: string) =>
    set(activeLang === "es" ? "contentEs" : "contentEn", val);

  const hasEnContent = Boolean(values.titleEn.trim() || values.contentEn.trim());
  const hasEsContent = Boolean(values.titleEs.trim() || values.contentEs.trim());

  /** Wraps the current selection in the textarea with Markdown syntax. */
  function applyFormat(before: string, after = "", placeholder = "text") {
    const el = contentRef.current;
    if (!el) return;
    const { selectionStart: s, selectionEnd: e, value } = el;
    const selected = value.slice(s, e) || placeholder;
    const next = value.slice(0, s) + before + selected + after + value.slice(e);
    setCurrentContent(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(s + before.length, s + before.length + selected.length);
    });
  }

  const currentCover =
    values.coverMode === "url"
      ? values.coverUrl || null
      : values.coverMode === "upload"
        ? filePreview ??
          (post?.coverImage?.startsWith("/api/") ||
          post?.coverImage?.startsWith("/blog/uploads/") ||
          post?.coverImage?.startsWith("/uploads/")
            ? post.coverImage
            : null)
        : null;

  const slugPreview = values.slug
    ? slugify(values.slug)
    : slugify(values.titleEn || values.titleEs);

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_340px]" noValidate>
      {post && <input type="hidden" name="id" value={post.id} />}
      <input type="hidden" name="titleEn" value={values.titleEn} />
      <input type="hidden" name="titleEs" value={values.titleEs} />
      <input type="hidden" name="excerptEn" value={values.excerptEn} />
      <input type="hidden" name="excerptEs" value={values.excerptEs} />
      <input type="hidden" name="contentEn" value={values.contentEn} />
      <input type="hidden" name="contentEs" value={values.contentEs} />
      <input type="hidden" name="language" value={values.language} />

      {/* ------------------------------ Main column ----------------------------- */}
      <div className="space-y-6">
        {state && (
          <div
            role={state.ok ? "status" : "alert"}
            className={cn(
              "flex flex-wrap items-center gap-3 rounded-2xl px-5 py-4 text-sm font-medium",
              state.ok
                ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-300"
                : "bg-[#C01072]/10 text-[#C01072]",
            )}
          >
            {state.ok ? <CheckCircle2 className="size-5" /> : <TriangleAlert className="size-5" />}
            <span>{state.message}</span>
            {state.ok && state.slug && (
              <Link href={`/blog/${state.slug}`} className="ml-auto font-semibold underline underline-offset-4">
                View post →
              </Link>
            )}
          </div>
        )}

        {/* Bilingual Tab Switcher Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#16345F]/10 bg-white p-3 shadow-xs dark:border-white/10 dark:bg-[#0F1E35]">
          <div className="space-y-0.5 pl-1">
            <p className="text-xs font-bold uppercase tracking-wider text-[#16345F] dark:text-white">
              Article Language Version
            </p>
            <p className="text-xs text-[#706F6F] dark:text-gray-400">
              Switch tabs to write the English and Spanish versions of this article independently.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Article translation language"
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#16345F]/5 p-1.5 dark:bg-white/5"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeLang === "en"}
              onClick={() => setActiveLang("en")}
              className={cn(
                "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all cursor-pointer",
                activeLang === "en"
                  ? "bg-[#16345F] text-white shadow-sm dark:bg-[#9BB8E0] dark:text-[#0A1526]"
                  : "text-[#706F6F] hover:text-[#16345F] dark:text-gray-300 dark:hover:text-white",
              )}
            >
              <span>🇺🇸 English (EN)</span>
              <span
                className={cn(
                  "size-2 rounded-full",
                  hasEnContent ? "bg-emerald-400" : "bg-gray-300 dark:bg-gray-600",
                )}
                title={hasEnContent ? "English content added" : "Empty"}
              />
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeLang === "es"}
              onClick={() => setActiveLang("es")}
              className={cn(
                "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all cursor-pointer",
                activeLang === "es"
                  ? "bg-[#C01072] text-white shadow-sm"
                  : "text-[#706F6F] hover:text-[#16345F] dark:text-gray-300 dark:hover:text-white",
              )}
            >
              <span>🇪🇸 Español (ES)</span>
              <span
                className={cn(
                  "size-2 rounded-full",
                  hasEsContent ? "bg-emerald-400" : "bg-gray-300 dark:bg-gray-600",
                )}
                title={hasEsContent ? "Spanish content added" : "Empty"}
              />
            </button>
          </div>
        </div>

        <Field
          label={activeLang === "es" ? "Title (Español)" : "Title (English)"}
          error={errors.title}
          htmlFor="title-input"
        >
          <input
            id="title-input"
            value={currentTitle}
            onChange={(e) => setCurrentTitle(e.target.value)}
            placeholder={
              activeLang === "es"
                ? "ej. Cómo obtener tu Visa de Nómada Digital en Colombia en 2026"
                : "e.g. How to get your Colombian Digital Nomad Visa in 2026"
            }
            maxLength={140}
            className={cn(inputCls, "h-14 text-lg font-semibold")}
          />
          <p className="mt-1.5 text-xs text-[#706F6F]">
            URL: <span className="font-mono text-[#16345F] dark:text-[#9BB8E0]">/blog/{slugPreview || "…"}</span>
          </p>
        </Field>

        <Field
          label={activeLang === "es" ? "Excerpt (Español)" : "Excerpt (English)"}
          hint={`${currentExcerpt.length}/320 · shown on cards & SEO`}
          error={errors.excerpt}
          htmlFor="excerpt-input"
        >
          <textarea
            id="excerpt-input"
            rows={3}
            maxLength={320}
            value={currentExcerpt}
            onChange={(e) => setCurrentExcerpt(e.target.value)}
            placeholder={
              activeLang === "es"
                ? "Un resumen de 1 a 2 frases en español para las tarjetas del blog y SEO."
                : "A 1–2 sentence summary that makes expats and investors want to read more."
            }
            className={cn(inputCls, "resize-none py-3")}
          />
        </Field>

        {/* Markdown editor */}
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label htmlFor="content-input" className="text-sm font-medium text-[#16345F] dark:text-gray-200">
              {activeLang === "es" ? "Content — Español " : "Content — English "}
              <span className="font-normal text-[#706F6F]">(Markdown)</span>
            </label>
            <span className="text-xs text-[#706F6F]">
              ~{computeReadingTime(currentContent || " ")} min read
            </span>
          </div>
          <div
            className={cn(
              "overflow-hidden rounded-2xl border bg-white dark:bg-[#0A1526]",
              errors.content ? "border-[#C01072]" : "border-[#16345F]/15 dark:border-white/10",
            )}
          >
            <div className="flex flex-wrap items-center gap-1 border-b border-[#16345F]/10 bg-[#16345F]/[0.02] px-2 py-1.5 dark:border-white/10">
              <TabButton active={tab === "write"} onClick={() => setTab("write")}>
                <PenLine className="size-3.5" /> Write
              </TabButton>
              <TabButton active={tab === "preview"} onClick={() => setTab("preview")}>
                <Eye className="size-3.5" /> Preview
              </TabButton>

              <div className="ml-2 inline-flex items-center gap-1 rounded-lg bg-[#16345F]/5 p-0.5 text-[11px] font-bold dark:bg-white/5">
                <button
                  type="button"
                  onClick={() => setActiveLang("en")}
                  className={cn(
                    "rounded-md px-2 py-1 transition cursor-pointer",
                    activeLang === "en"
                      ? "bg-[#16345F] text-white dark:bg-[#9BB8E0] dark:text-[#0A1526]"
                      : "text-[#706F6F] hover:text-[#16345F] dark:hover:text-white",
                  )}
                >
                  🇺🇸 EN
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLang("es")}
                  className={cn(
                    "rounded-md px-2 py-1 transition cursor-pointer",
                    activeLang === "es"
                      ? "bg-[#C01072] text-white"
                      : "text-[#706F6F] hover:text-[#16345F] dark:hover:text-white",
                  )}
                >
                  🇪🇸 ES
                </button>
              </div>

              {tab === "write" && (
                <div className="ml-auto flex items-center gap-0.5">
                  <ToolButton label="Heading" onClick={() => applyFormat("\n## ", "\n", "Section title")}><Heading2 /></ToolButton>
                  <ToolButton label="Bold" onClick={() => applyFormat("**", "**")}><Bold /></ToolButton>
                  <ToolButton label="Italic" onClick={() => applyFormat("_", "_")}><Italic /></ToolButton>
                  <ToolButton label="Bullet list" onClick={() => applyFormat("\n- ", "", "List item")}><List /></ToolButton>
                  <ToolButton label="Numbered list" onClick={() => applyFormat("\n1. ", "", "Step")}><ListOrdered /></ToolButton>
                  <ToolButton label="Quote" onClick={() => applyFormat("\n> ", "\n", "Key takeaway")}><Quote /></ToolButton>
                  <ToolButton label="Link" onClick={() => applyFormat("[", "](https://)", "link text")}><Link2 /></ToolButton>
                </div>
              )}
            </div>
            <textarea
              ref={contentRef}
              id="content-input"
              value={currentContent}
              onChange={(e) => setCurrentContent(e.target.value)}
              rows={22}
              placeholder={
                activeLang === "es"
                  ? "## ¿Quiénes califican?\n\nEscribe la versión en **Español** del artículo en Markdown…"
                  : "## Who qualifies?\n\nWrite the **English** version of your article in Markdown…"
              }
              className={cn(
                "block w-full resize-y bg-transparent p-5 font-mono text-sm leading-relaxed text-[#16345F] outline-none dark:text-gray-200",
                tab === "preview" && "hidden",
              )}
            />
            {tab === "preview" && (
              <div className="min-h-[520px] p-6 sm:p-8">
                {currentContent.trim() ? (
                  <PostContent markdown={currentContent} />
                ) : (
                  <p className="text-sm text-[#706F6F]">Nothing to preview yet.</p>
                )}
              </div>
            )}
          </div>
          {errors.content && <p className="mt-1.5 text-xs font-medium text-[#C01072]">{errors.content}</p>}
        </div>
      </div>

      {/* ------------------------------ Side column ----------------------------- */}
      <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
        <Panel title="Publish">
          <label
            className={cn(
              "flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition",
              values.featured
                ? "border-[#C01072] bg-[#C01072]/5"
                : "border-[#16345F]/10 hover:border-[#9BB8E0] dark:border-white/10",
            )}
          >
            <input
              type="checkbox"
              name="featured"
              checked={values.featured}
              onChange={(e) => set("featured", e.target.checked)}
              className="mt-0.5 size-4 accent-[#C01072]"
            />
            <span>
              <span className="flex items-center gap-1.5 text-sm font-semibold text-[#16345F] dark:text-white">
                <Star className={cn("size-4", values.featured && "fill-[#C01072] text-[#C01072]")} /> Featured post
              </span>
              <span className="mt-0.5 block text-xs text-[#706F6F] dark:text-gray-400">
                Shown in the large “Featured Insights” block at the top of the blog.
              </span>
            </span>
          </label>

          <button
            type="submit"
            disabled={pending}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#C01072] font-semibold text-white shadow-[0_10px_24px_-10px_rgba(192,16,114,0.7)] transition hover:bg-[#A50E62] disabled:opacity-60"
          >
            {pending && <LoaderCircle className="size-4 animate-spin" />}
            {isEditing ? "Save changes" : "Publish post"}
          </button>
        </Panel>

        <Panel title="Details">
          <Field label="Language / Idioma" htmlFor="language">
            <select
              id="language"
              name="language"
              value={values.language}
              onChange={(e) => set("language", e.target.value as BlogLanguage)}
              className={cn(inputCls, "h-11 font-medium")}
            >
              <option value="en">English (EN)</option>
              <option value="es">Español (ES)</option>
            </select>
            <div className="mt-2 grid grid-cols-2 gap-1.5 rounded-xl bg-[#16345F]/5 p-1 text-xs font-semibold dark:bg-white/5">
              {(
                [
                  { code: "en", label: "English" },
                  { code: "es", label: "Español" },
                ] as const
              ).map((langOpt) => (
                <button
                  key={langOpt.code}
                  type="button"
                  onClick={() => set("language", langOpt.code)}
                  className={cn(
                    "rounded-lg py-1.5 transition",
                    values.language === langOpt.code
                      ? "bg-[#16345F] text-white shadow-xs dark:bg-[#9BB8E0] dark:text-[#0A1526]"
                      : "text-[#706F6F] hover:text-[#16345F] dark:hover:text-white",
                  )}
                >
                  {langOpt.code.toUpperCase()} · {langOpt.label}
                </button>
              ))}
            </div>
          </Field>

          <Field label="Author" error={errors.author} htmlFor="author">
            <input
              id="author"
              name="author"
              list="team-authors"
              value={values.author}
              onChange={(e) => set("author", e.target.value)}
              className={cn(inputCls, "h-11")}
            />
            <datalist id="team-authors">
              {TEAM_AUTHORS.map((a) => <option key={a} value={a} />)}
            </datalist>
          </Field>

          <Field label="Category" error={errors.category} htmlFor="category">
            <select
              id="category"
              name="category"
              value={values.category}
              onChange={(e) => set("category", e.target.value as BlogCategory)}
              className={cn(inputCls, "h-11")}
            >
              {BLOG_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <CategoryBadge category={values.category} className="mt-2" />
          </Field>

          <Field label="Tags" hint="Comma separated · max 8" htmlFor="tags">
            <input
              id="tags"
              name="tags"
              value={values.tags}
              onChange={(e) => set("tags", e.target.value)}
              placeholder="Digital Nomad, M Visa, Expats"
              className={cn(inputCls, "h-11")}
            />
          </Field>

          <Field label="Custom slug" hint="Optional" error={errors.slug} htmlFor="slug">
            <input
              id="slug"
              name="slug"
              value={values.slug}
              onChange={(e) => set("slug", e.target.value)}
              placeholder={slugify(values.titleEn || values.titleEs) || "auto-from-title"}
              className={cn(inputCls, "h-11 font-mono text-xs")}
            />
          </Field>
        </Panel>

        <Panel title="Cover image">
          <input type="hidden" name="coverMode" value={values.coverMode} />
          <div className="grid grid-cols-3 gap-1 rounded-xl bg-[#16345F]/5 p-1 text-xs font-semibold dark:bg-white/5">
            {(["url", "upload", "none"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => set("coverMode", m)}
                className={cn(
                  "rounded-lg py-2 capitalize transition",
                  values.coverMode === m
                    ? "bg-white text-[#16345F] shadow-sm dark:bg-[#16345F] dark:text-white"
                    : "text-[#706F6F] hover:text-[#16345F] dark:hover:text-white",
                )}
              >
                {m === "url" ? "URL" : m}
              </button>
            ))}
          </div>

          {values.coverMode === "url" && (
            <input
              name="coverUrl"
              type="text"
              value={values.coverUrl}
              onChange={(e) => set("coverUrl", e.target.value)}
              placeholder="https://images.unsplash.com/… o /images/…"
              className={cn(inputCls, "h-11 text-xs")}
            />
          )}

          {/* File input stays mounted so a chosen file survives tab switches. */}
          <label
            className={cn(
              "flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-[#9BB8E0] p-5 text-center text-xs text-[#706F6F] transition hover:bg-[#9BB8E0]/10",
              values.coverMode !== "upload" && "hidden",
              uploadingCover && "opacity-60 pointer-events-none"
            )}
          >
            {uploadingCover ? (
              <LoaderCircle className="size-6 animate-spin text-[#C01072]" />
            ) : (
              <ImagePlus className="size-6 text-[#16345F] dark:text-[#9BB8E0]" />
            )}
            <span>
              {uploadingCover ? (
                <span className="font-semibold text-[#C01072]">Subiendo imagen...</span>
              ) : (
                <>
                  <span className="font-semibold text-[#16345F] dark:text-white">Choose image</span> · JPG, PNG, WEBP · max 10 MB
                </>
              )}
            </span>
            <input
              ref={fileRef}
              type="file"
              disabled={uploadingCover}
              accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
              className="sr-only"
              onChange={handleCoverFileChange}
            />
          </label>

          {uploadCoverError && <p className="text-xs font-medium text-[#C01072]">⚠️ {uploadCoverError}</p>}
          {errors.cover && <p className="text-xs font-medium text-[#C01072]">{errors.cover}</p>}

          {currentCover && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={currentCover} alt="Cover preview" className="aspect-[16/10] w-full rounded-xl object-cover" />
          )}
        </Panel>
      </aside>
    </form>
  );
}

/* ------------------------------- UI helpers -------------------------------- */

const inputCls =
  "w-full rounded-xl border border-[#16345F]/15 bg-white px-4 text-sm text-[#16345F] outline-none transition placeholder:text-[#706F6F]/60 focus:border-[#9BB8E0] focus:ring-4 focus:ring-[#9BB8E0]/25 dark:border-white/10 dark:bg-[#0A1526] dark:text-white";

function Field({
  label,
  hint,
  error,
  htmlFor,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <label htmlFor={htmlFor} className="text-sm font-medium text-[#16345F] dark:text-gray-200">
          {label}
        </label>
        {hint && <span className="text-xs text-[#706F6F]">{hint}</span>}
      </div>
      <div className={cn(error && "[&_input]:border-[#C01072] [&_select]:border-[#C01072] [&_textarea]:border-[#C01072]")}>
        {children}
      </div>
      {error && <p className="mt-1.5 text-xs font-medium text-[#C01072]">{error}</p>}
    </div>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-4 rounded-2xl border border-[#16345F]/10 bg-white p-5 dark:border-white/10 dark:bg-[#0F1E35]">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-[#706F6F] dark:text-gray-400">{title}</h2>
      {children}
    </section>
  );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition",
        active ? "bg-white text-[#16345F] shadow-sm dark:bg-[#16345F] dark:text-white" : "text-[#706F6F] hover:text-[#16345F]",
      )}
    >
      {children}
    </button>
  );
}

function ToolButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className="rounded-md p-1.5 text-[#706F6F] transition hover:bg-[#16345F]/10 hover:text-[#16345F] dark:hover:bg-white/10 dark:hover:text-white [&_svg]:size-4"
    >
      {children}
    </button>
  );
}
