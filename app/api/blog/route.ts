import { sql } from "@/lib/db";
import { NextResponse } from "next/server";
import type { BlogPost, BlogPostSummary } from "@/lib/blog";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit") ?? "10";
  const offset = searchParams.get("offset") ?? "0";
  const slug = searchParams.get("slug");

  try {
    // Single post by slug
    if (slug) {
      const posts = await sql`
        SELECT
          id, title, slug, meta_description, target_keywords,
          content, cover_image_url, secondary_image_url, source,
          original_url, published_at, created_at, updated_at
        FROM blog
        WHERE slug = ${slug}
      `;

      if (posts.length === 0) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
      }

      return NextResponse.json(posts[0] as BlogPost);
    }

    // List posts
    const posts = await sql`
      SELECT
        id, title, slug, meta_description, target_keywords,
        cover_image_url, source, original_url, published_at,
        created_at, updated_at
      FROM blog
      WHERE source = 'digital-upstream'
      ORDER BY published_at DESC NULLS LAST
      LIMIT ${Number(limit)}
      OFFSET ${Number(offset)}
    `;

    const countResult = await sql`
      SELECT COUNT(*) as total FROM blog WHERE source = 'digital-upstream'
    `;

    return NextResponse.json({
      posts: posts as BlogPostSummary[],
      total: Number(countResult[0].total),
      limit: Number(limit),
      offset: Number(offset),
    });
  } catch (error) {
    console.error("Blog API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
