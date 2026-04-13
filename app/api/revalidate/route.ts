import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST() {
  try {
    revalidatePath("/");
    revalidatePath("/blog/[slug]", "page");
    revalidatePath("/sitemap.xml");
    // Also notify Google via sitemap ping
    const sitemapUrl = "https://digital-upstream.com/sitemap.xml";
    try {
      await fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`, {
        cache: "no-store",
      });
    } catch {
      // Google ping failed, but cache was revalidated
    }
    return NextResponse.json({ revalidated: true });
  } catch {
    return NextResponse.json({ error: "Failed to revalidate" }, { status: 500 });
  }
}