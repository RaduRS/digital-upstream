export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  meta_description: string | null;
  target_keywords: string | null;
  content: string;
  cover_image_url: string | null;
  secondary_image_url: Record<string, string> | null;
  video_url: string | null;
  video_thumbnail_url: string | null;
  source: string;
  original_url: string | null;
  published_at: Date | null;
  status: "published" | "draft" | "review";
  created_at: Date;
  updated_at: Date;
};

export type BlogPostSummary = Omit<
  BlogPost,
  "content" | "secondary_image_url"
>;