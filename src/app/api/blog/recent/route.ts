import { NextResponse } from "next/server";
import { getPostSummaries } from "@/lib/blog/queries";

export async function GET() {
  try {
    const posts = await getPostSummaries();
    return NextResponse.json(posts.slice(0, 3));
  } catch (error) {
    console.error("Failed to fetch recent blog posts:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}
