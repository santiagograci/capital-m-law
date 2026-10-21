import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Renders post Markdown with brand typography.
 * react-markdown does NOT render raw HTML by default → safe against XSS
 * even though content is authored in the admin panel.
 */
const components: Components = {
  h2: ({ children }) => (
    <h2 className="mb-4 mt-12 scroll-mt-28 text-2xl font-bold text-[#16345F] dark:text-white">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-3 mt-8 text-xl font-semibold text-[#16345F] dark:text-white">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="mb-2 mt-6 text-lg font-semibold text-[#16345F] dark:text-white">{children}</h4>
  ),
  p: ({ children }) => <p className="mb-5 leading-[1.85]">{children}</p>,
  a: ({ href = "", children }) => {
    const internal = href.startsWith("/") || href.startsWith("#");
    const cls =
      "font-medium text-[#C01072] underline decoration-[#C01072]/30 underline-offset-4 transition hover:decoration-[#C01072] dark:text-[#F472B6]";
    return internal ? (
      <Link href={href} className={cls}>
        {children}
      </Link>
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  },
  ul: ({ children }) => (
    <ul className="mb-6 ml-1 space-y-2 [&>li]:relative [&>li]:pl-6 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-[0.7em] [&>li]:before:size-1.5 [&>li]:before:rounded-full [&>li]:before:bg-[#C01072]">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-6 ml-5 list-decimal space-y-2 marker:font-semibold marker:text-[#16345F] dark:marker:text-[#9BB8E0]">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-[1.75]">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-8 rounded-r-2xl border-l-4 border-[#C01072] bg-[#9BB8E0]/10 py-4 pl-6 pr-4 text-[#16345F] italic dark:bg-white/5 dark:text-gray-200 [&>p]:mb-0">
      {children}
    </blockquote>
  ),
  strong: ({ children }) => <strong className="font-semibold text-[#16345F] dark:text-white">{children}</strong>,
  hr: () => <hr className="my-10 border-[#9BB8E0]/40" />,
  code: ({ children, className }) =>
    className ? (
      <code className={className}>{children}</code>
    ) : (
      <code className="rounded-md bg-[#16345F]/5 px-1.5 py-0.5 text-[0.9em] text-[#16345F] dark:bg-white/10 dark:text-[#9BB8E0]">
        {children}
      </code>
    ),
  pre: ({ children }) => (
    <pre className="my-6 overflow-x-auto rounded-2xl bg-[#0B1C36] p-5 text-sm leading-relaxed text-[#E2E8F0]">{children}</pre>
  ),
  img: ({ src, alt }) => (
    <span className="my-8 block overflow-hidden rounded-2xl">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={typeof src === "string" ? src : ""} alt={alt ?? ""} loading="lazy" className="w-full" />
      {alt && <span className="mt-2 block text-center text-xs text-[#706F6F]">{alt}</span>}
    </span>
  ),
  table: ({ children }) => (
    <div className="my-8 overflow-x-auto rounded-2xl border border-[#16345F]/10 dark:border-white/10">
      <table className="w-full text-left text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-[#16345F] text-white">{children}</thead>,
  th: ({ children }) => <th className="px-4 py-3 font-semibold">{children}</th>,
  td: ({ children }) => <td className="border-t border-[#16345F]/5 px-4 py-3 dark:border-white/5">{children}</td>,
};

export function PostContent({ markdown }: { markdown: string }) {
  return (
    <div className="text-[17px] text-[#3D4A5C] dark:text-gray-300">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
