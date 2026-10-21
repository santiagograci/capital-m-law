import { cn } from "@/lib/utils";
import { CATEGORY_STYLES } from "@/lib/blog/utils";
import type { BlogCategory } from "@/types/blog";

export function CategoryBadge({
  category,
  className,
}: {
  category: BlogCategory;
  className?: string;
}) {
  const style = CATEGORY_STYLES[category];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider",
        style.badge,
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", style.dot)} aria-hidden />
      {category}
    </span>
  );
}
