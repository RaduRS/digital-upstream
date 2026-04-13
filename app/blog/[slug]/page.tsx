import { sql } from "@/lib/db";
import { notFound } from "next/navigation";
import type { BlogPost } from "@/lib/blog";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Container from "@/components/Container";
import { marked } from "marked";
import ReadingProgress from "@/components/ReadingProgress";
import FloatingShare from "@/components/FloatingShare";
import ShareButtons from "@/components/ShareButtons";


type Props = {
  params: Promise<{ slug: string }>;
};

async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const posts = await sql`
      SELECT
        id, title, slug, meta_description, target_keywords,
        content, cover_image_url, secondary_image_url,
        video_url, video_thumbnail_url,
        source, original_url, published_at,
        created_at, updated_at
      FROM blog
      WHERE slug = ${slug} AND status = 'published'
    `;
    return (posts[0] as BlogPost) ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  const title = `${post.title} | Digital Upstream`;
  const description = post.meta_description ?? post.title;
  const canonical = `https://digital-upstream.com/blog/${slug}`;
  const ogImage = post.cover_image_url ?? "https://digital-upstream.com/digital-upstream-logo.png";

  return {
    title,
    description,
    keywords: post.target_keywords ?? undefined,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      publishedTime: post.published_at?.toString(),
      modifiedTime: post.updated_at.toString(),
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

function formatDate(date: Date | string | null): string {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function estimateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  marked.setOptions({
    gfm: true,
    breaks: false,
  });

  // Remove the first image from content to avoid duplicate with cover image
  const cleanContent = post.content.replace(/^!\[[^\]]*\]\([^)]+\)\n?/, "");

  const contentHtml = await marked(cleanContent);
  const readTime = estimateReadTime(post.content);

  return (
    <>
      <ReadingProgress />
      <FloatingShare title={post.title} slug={post.slug} />
      <main id="content" className="min-h-screen">
        {/* Article header */}
        <header className="pt-12 sm:pt-16 pb-8 sm:pb-12">
          <Container>
            <div className="max-w-3xl mx-auto">
              {/* Back link */}
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground transition-colors mb-10 sm:mb-14 group"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                <span className="font-sans">All Articles</span>
              </Link>

              {/* Meta line */}
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                  <time
                    dateTime={post.published_at?.toString()}
                    className="text-xs uppercase tracking-[0.15em] text-foreground/40 font-sans"
                  >
                    {formatDate(post.published_at)}
                  </time>
                  <span className="w-1 h-1 rounded-full bg-foreground/20" />
                  <span className="text-xs text-foreground/40 font-sans">
                    {readTime} min read
                  </span>
                </div>
                <span className="text-xs uppercase tracking-[0.15em] text-foreground/40 font-sans">
                  Author: Radu
                </span>
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium leading-[1.05] tracking-tight text-foreground mb-6">
                {post.title}
              </h1>

              {/* Meta description / subtitle */}
              {post.meta_description && (
                <p className="text-lg sm:text-xl text-foreground/55 leading-relaxed font-sans max-w-2xl mb-10">
                  {post.meta_description}
                </p>
              )}
              <hr className="border-t border-foreground/10 mb-0" />
            </div>
          </Container>
        </header>

        {/* Cover image */}
        {post.cover_image_url && (
          <Container>
            <div className="max-w-3xl mx-auto mb-10 sm:mb-12">
              <div className="aspect-[16/9] w-full overflow-hidden rounded-lg sm:rounded-xl bg-foreground/5">
                <img
                  src={post.cover_image_url}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </Container>
        )}

        {/* Article content */}
        <article className="pb-20 sm:pb-28 lg:pb-36">
          <Container>
            <div className="max-w-3xl mx-auto">
              <div
                className="prose-custom"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />
            </div>
          </Container>
        </article>

        {/* Video */}
        {post.video_url && (
          <Container>
            <div className="max-w-3xl mx-auto mb-12 sm:mb-16">
            {post.video_thumbnail_url ? (
              <div className="relative aspect-video overflow-hidden rounded-lg sm:rounded-xl bg-foreground/5">
                <video
                  src={post.video_url}
                  poster={post.video_thumbnail_url}
                  controls
                  preload="metadata"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="aspect-video overflow-hidden rounded-lg sm:rounded-xl bg-foreground/5">
                <video
                  src={post.video_url}
                  controls
                  preload="metadata"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
          </Container>
        )}

        {/* Secondary images */}
        {post.secondary_image_url && (() => {
          // Handle both array format ["url1","url2"] and object format {"key": "url"}
          const urls: string[] = [];
          if (Array.isArray(post.secondary_image_url)) {
            urls.push(...post.secondary_image_url.filter(u => typeof u === "string"));
          } else if (typeof post.secondary_image_url === "object") {
            Object.values(post.secondary_image_url).forEach(v => {
              if (typeof v === "string") urls.push(v);
            });
          }
          if (urls.length === 0) return null;
          return (
            <section className="py-10 sm:py-14 border-t border-foreground/10">
              <Container>
                <div className="max-w-5xl mx-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {urls.map((url, i) => (
                      <div key={i} className="aspect-[16/9] overflow-hidden rounded-lg bg-foreground/5">
                        <img src={url} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              </Container>
            </section>
          );
        })()}

        {/* Article footer */}
        <footer className="border-t border-foreground/10 py-12 sm:py-16">
          <Container>
            <div className="max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors group"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                <span className="font-sans text-sm">Back to all articles</span>
              </Link>
              <ShareButtons title={post.title} slug={post.slug} />
            </div>
          </Container>
        </footer>

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: post.title,
              description: post.meta_description ?? post.title,
              image: post.cover_image_url,
              datePublished: post.published_at?.toString(),
              dateModified: post.updated_at.toString(),
              url: `https://digital-upstream.com/blog/${post.slug}`,
              author: {
                "@type": "Organization",
                name: "Digital Upstream",
                url: "https://digital-upstream.com",
              },
              publisher: {
                "@type": "Organization",
                name: "Digital Upstream",
                url: "https://digital-upstream.com",
                logo: {
                  "@type": "ImageObject",
                  url: "https://digital-upstream.com/digital-upstream-logo.png",
                },
              },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `https://digital-upstream.com/blog/${post.slug}`,
              },
            }),
          }}
        />
      </main>
    </>
  );
}
