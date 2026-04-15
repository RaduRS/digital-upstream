import { sql } from "@/lib/db";
import { NextResponse } from "next/server";
import type { BlogPost, BlogPostSummary } from "@/lib/blog";

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, title, slug, meta_description, target_keywords, content, cover_image_url, secondary_image_url, video_url, video_thumbnail_url, status, published_at } = body;

    if (!id) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    }

    let result;
    if (content !== undefined) {
      // Only update content (most common case for admin editing)
      result = await sql`
        UPDATE blog SET
          content = ${content},
          updated_at = NOW()
        WHERE id = ${id}
        RETURNING *
      `;
    } else {
      // Full update with explicit fields
      result = await sql`
        UPDATE blog SET
          title = ${title ?? null},
          slug = ${slug ?? null},
          meta_description = ${meta_description ?? null},
          target_keywords = ${target_keywords ?? null},
          content = ${content ?? null},
          cover_image_url = ${cover_image_url ?? null},
          secondary_image_url = ${secondary_image_url ? JSON.stringify(secondary_image_url) : null},
          video_url = ${video_url ?? null},
          video_thumbnail_url = ${video_thumbnail_url ?? null},
          status = ${status ?? null},
          published_at = ${published_at ?? null},
          updated_at = NOW()
        WHERE id = ${id}
        RETURNING *
      `;
    }

    if (result.length === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ post: result[0] });
  } catch (error) {
    console.error("Blog API error:", error);
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

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
