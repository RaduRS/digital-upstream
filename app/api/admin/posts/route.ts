import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sql } from "@/lib/db";

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session")?.value === "ok";
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const posts = await sql`
      SELECT
        id, title, slug, meta_description, target_keywords,
        content, cover_image_url, secondary_image_url,
        video_url, video_thumbnail_url,
        source, original_url, published_at, status, created_at, updated_at
      FROM blog
      ORDER BY published_at DESC NULLS LAST
    `;
    return NextResponse.json({ posts });
  } catch {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}