import { readUpload } from "@/lib/blog/store";

/**
 * Serves staff-uploaded cover images from `storage/blog-uploads`.
 * Filenames are random UUIDs → content is immutable → cache forever.
 */
export async function GET(_req: Request, ctx: RouteContext<"/api/blog/uploads/[file]">) {
  const { file } = await ctx.params;
  const upload = await readUpload(file);
  if (!upload) return new Response("Not found", { status: 404 });

  return new Response(new Uint8Array(upload.body), {
    headers: {
      "Content-Type": upload.type,
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
