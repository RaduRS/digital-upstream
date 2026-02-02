import {
  Calendar,
  FileText,
  FolderOpen,
  Globe,
  MessagesSquare,
  Utensils,
  Video,
  Wind,
} from "lucide-react";

export type ProjectDetail = {
  title: string;
  subtitle: string;
  overview: string;
  problemSolved?: string[];
  targetUser?: string;
  highlights?: string[];
  techStack?: string[];
  media?: ProjectMediaItem[];
  label?: string;
  iconName:
    | "utensils"
    | "calendar"
    | "video"
    | "messages"
    | "globe"
    | "filetext"
    | "wind"
    | "folder";
  featured?: boolean;
  comingSoon?: boolean;
};

export type ProjectMediaItem = {
  kind: "image" | "video";
  src: `/${string}` | `https://${string}` | `http://${string}`;
  alt: string;
  label?: string;
};

export const PROJECT_ICON = {
  utensils: Utensils,
  calendar: Calendar,
  video: Video,
  messages: MessagesSquare,
  globe: Globe,
  filetext: FileText,
  wind: Wind,
  folder: FolderOpen,
} as const;

export type ProjectListItem = {
  href: `/projects/${string}`;
  slug: string;
  title: string;
  desc: string;
  iconName: ProjectDetail["iconName"];
  featured?: boolean;
  comingSoon?: boolean;
};

export const PROJECT_DETAILS: Record<string, ProjectDetail> = {
  freshmeal: {
    title: "FreshMeal",
    subtitle: "Smart pantry + recipe suggestions (mobile-first PWA).",
    overview:
      "FreshMeal helps you discover healthy recipes based on ingredients you already have. Build a pantry by scanning barcodes or taking photos, then get AI-assisted recipe suggestions you can filter by meal type, servings, and dietary preferences.",
    problemSolved: [
      "Eliminates the friction of “what can I cook right now?”",
      "Reduces food waste by tracking pantry inventory",
      "Promotes healthy eating through practical, ingredient-aware suggestions",
      "Makes shopping smarter by surfacing missing ingredients",
    ],
    targetUser:
      "Users that are health-conscious, wants practical tools that fit naturally into daily cooking routines.",
    highlights: [
      "Barcode scanning and photo capture to add pantry items",
      "Pantry inventory with quantities",
      "Recipe suggestions driven by available ingredients",
      "Filters: meal type, servings, dietary preferences",
      "Shopping list built from missing ingredients",
    ],
    techStack: ["PWA", "Mobile-first UI", "AI-assisted recommendations"],
    media: [
      {
        kind: "video",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/fresh%20meal/Fresh%20meal.mp4",
        alt: "FreshMeal demo video",
        label: "Demo",
      },
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/fresh+meal/fresh-meal-logo.png",
        alt: "FreshMeal logo",
        label: "Logo",
      },
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/fresh%20meal/Freash%20meal%20-%20scan%20mode.jpeg",
        alt: "FreshMeal scan mode screen",
        label: "Scan mode",
      },
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/fresh+meal/Freash+meal+-++scan+items.jpeg",
        alt: "FreshMeal scan items screen",
        label: "Scan items",
      },
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/fresh%20meal/Freash%20meal%20-%20photo%20mode.jpeg",
        alt: "FreshMeal photo mode screen",
        label: "Photo mode",
      },
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/fresh%20meal/Freash%20meal%20-%20photo%20items.jpeg",
        alt: "FreshMeal photo items screen",
        label: "Photo items",
      },
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/fresh%20meal/Freash%20meal%20-%20ingredients%20list.jpeg",
        alt: "FreshMeal ingredients list screen",
        label: "Ingredients list",
      },
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/fresh%20meal/Freash%20meal%20-%20recipes%20list.jpeg",
        alt: "FreshMeal recipes list screen",
        label: "Recipes list",
      },
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/fresh%20meal/Freash%20meal%20-%20recipes%20list%202.jpeg",
        alt: "FreshMeal recipes list screen (variant)",
        label: "Recipes list 2",
      },
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/fresh%20meal/Freash%20meal%20-%20recipes%20view.jpeg",
        alt: "FreshMeal recipes view screen",
        label: "Recipes view",
      },
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/fresh%20meal/Freash%20meal%20-%20cooked%20modal.jpeg",
        alt: "FreshMeal cooked modal screen",
        label: "Cooked modal",
      },
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/fresh%20meal/Freash%20meal%20-%20manual%20mode.jpeg",
        alt: "FreshMeal manual mode screen",
        label: "Manual mode",
      },
    ],
    label: "CASE‑01",
    iconName: "utensils",
    featured: true,
  },
  vocalenda: {
    title: "Vocalenda",
    subtitle: "Multi-tenant voice booking with Google Calendar + SMS.",
    overview:
      "Vocalenda gives each business a dedicated Twilio phone number where callers speak naturally with an AI agent. The agent answers business questions from stored configuration and books/reschedules/cancels on the business’s Google Calendar, then sends SMS confirmations from the same number.",
    highlights: [
      "Dedicated Twilio number per business (multi-tenant)",
      "AI voice agent with real-time audio streaming",
      "Google Calendar booking/reschedule/cancel",
      "SMS confirmations and reminders",
      "Business config + knowledge for Q&A",
    ],
    techStack: [
      "Next.js (App Router) for UI + APIs",
      "Clerk (auth)",
      "Supabase (Postgres + Storage + RLS)",
      "Twilio (Voice + Messaging)",
      "Google Calendar OAuth per business",
      "OpenAI (tool-calling dialog)",
      "Deepgram (real-time ASR)",
      "Stripe (subscriptions)",
    ],
    media: [
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/vocalenda/hero.jpg",
        alt: "Vocalenda hero screen",
        label: "Hero",
      },
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/vocalenda/landing%20page.jpg",
        alt: "Vocalenda landing page screen",
        label: "Landing page",
      },
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/vocalenda/dashboard.jpg",
        alt: "Vocalenda dashboard screen",
        label: "Dashboard",
      },
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/vocalenda/customers.jpg",
        alt: "Vocalenda customers screen",
        label: "Customers",
      },
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/vocalenda/call%20history.jpg",
        alt: "Vocalenda call history screen",
        label: "Call history",
      },
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/vocalenda/appointments.jpg",
        alt: "Vocalenda appointments screen",
        label: "Appointments",
      },
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/vocalenda/calendar.jpg",
        alt: "Vocalenda calendar screen",
        label: "Calendar",
      },
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/vocalenda/integration.jpg",
        alt: "Vocalenda integrations screen",
        label: "Integrations",
      },
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/vocalenda/1.jpg",
        alt: "Vocalenda settings screen 1",
        label: "Settings 1",
      },
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/vocalenda/2.jpg",
        alt: "Vocalenda settings screen 2",
        label: "Settings 2",
      },
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/vocalenda/3.jpg",
        alt: "Vocalenda settings screen 3",
        label: "Settings 3",
      },
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/vocalenda/4.jpg",
        alt: "Vocalenda settings screen 4",
        label: "Settings 4",
      },
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/vocalenda/6.jpg",
        alt: "Vocalenda settings screen 6",
        label: "Settings 6",
      },
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/vocalenda/7.jpg",
        alt: "Vocalenda settings screen 7",
        label: "Settings 7",
      },
    ],
    label: "CASE‑04",
    iconName: "calendar",
    featured: true,
  },
  automan: {
    title: "Automan",
    subtitle: "Automated content pipeline: URL → new video → publish.",
    overview:
      "Automan automates the process of taking a TikTok URL (and optionally additional URLs), extracting audio, generating a new avatar video via AI, and publishing it to multiple social platforms using SocialBee.",
    highlights: [
      "Accepts 1–3 TikTok URLs per job",
      "Audio extraction and transcription",
      "AI script generation and scene breakdown",
      "Avatar video generation",
      "Scheduling and publishing to multiple platforms",
    ],
    techStack: [
      "Next.js (App Router) + TypeScript",
      "Supabase (jobs, state, metadata)",
      "Cloudinary (storage + transformations)",
      "Deepgram (speech-to-text)",
      "OpenAI API (script + structure)",
      "HeyGen (avatar video generation)",
      "SocialBee (publishing)",
    ],
    media: [
      {
        kind: "video",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/automan/Discipline-The-Daily-Mental-Game-You-Must-Win.mp4",
        alt: "Automan demo video: Discipline",
        label: "Discipline demo",
      },
      {
        kind: "video",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/automan/goals.mp4",
        alt: "Automan demo video: Goals",
        label: "Goals demo",
      },
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/automan/hero.jpg",
        alt: "Automan hero screen",
        label: "Hero",
      },
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/automan/generate%20video%20from%20ANY%20tiktok.jpg",
        alt: "Automan generate video from TikTok screen",
        label: "Generate from TikTok",
      },
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/automan/generate%20video%20from%20text.jpg",
        alt: "Automan generate video from text screen",
        label: "Generate from text",
      },
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/automan/scene%20manager%20with%20images%20audio%20and%20video%20preview.jpg",
        alt: "Automan scene manager with images, audio, and preview",
        label: "Scene manager",
      },
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/automan/change%20images%20per%20each%20scene.jpg",
        alt: "Automan change images per scene screen",
        label: "Per-scene images",
      },
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/automan/image%20generator%20with%20enhanced%20ai%20support.jpg",
        alt: "Automan image generator screen",
        label: "Image generator",
      },
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/automan/platform%20optimizer%20generating%20content.jpg",
        alt: "Automan platform optimizer screen",
        label: "Platform optimizer",
      },
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/automan/content%20specific%20for%205%20different%20social%20media.jpg",
        alt: "Automan content tailored for multiple social platforms screen",
        label: "Multi-platform content",
      },
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/automan/content%20calendar%20to%20keep%20track%20of%20dowloaded%20and%20posted.jpg",
        alt: "Automan content calendar screen",
        label: "Content calendar",
      },
    ],
    label: "CASE‑02",
    iconName: "video",
    featured: true,
  },
  "valid-spark": {
    title: "Valid Spark",
    subtitle: "Market research and SaaS idea validation for founders.",
    overview:
      "Valid Spark helps founders validate SaaS ideas by turning real-world conversations into a structured market research report. You enter a topic (and optional context), choose data sources, and the app collects evidence, extracts recurring pain points, and synthesizes a report with frequency and TAM-style estimates. Today the product focuses on Reddit + Quora analysis, with an extensible model for additional platforms.",
    problemSolved: [
      "Replaces guesswork with evidence from real user discussions",
      "Surfaces repeatable pain points, not isolated anecdotes",
      "Quantifies signals (frequency scoring) to prioritize what matters",
      "Converts messy raw posts into actionable problem statements + sources",
      "Adds competitive context to guide positioning",
    ],
    targetUser:
      "Indie hackers, early-stage founders, and product teams validating what to build next.",
    highlights: [
      "Multi-source research runs (Reddit + Quora)",
      "AI synthesis into problems with summary, frequency, and TAM estimates",
      "Evidence-first outputs with sources/links + snippets",
      "Competitive analysis: competitors, market gaps, entry barriers, differentiation",
      "Dashboard for reports, problems, and visualizations",
      "PDF generation + downloads with stored report links",
      "File uploads attached to reports with signed download URLs",
      "Subscription + usage credits via Stripe billing",
    ],
    techStack: [
      "Next.js (App Router) + React + TypeScript",
      "Tailwind CSS + Radix UI primitives",
      "Clerk",
      "PostgreSQL + Prisma",
      "Stripe (checkout + webhooks)",
      "OpenAI API (analysis + synthesis)",
      "AWS S3 (uploads + signed URLs)",
      "Reddit API + Quora via search results",
      "Recharts + Chart.js",
    ],
    media: [
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/valid%20spark/hero.jpg",
        alt: "Valid Spark hero screen",
        label: "Hero",
      },
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/valid%20spark/landing%20page.jpg",
        alt: "Valid Spark landing page screen",
        label: "Landing page",
      },
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/valid%20spark/reports%20dashboard.jpg",
        alt: "Valid Spark reports dashboard screen",
        label: "Reports dashboard",
      },
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/valid%20spark/dashboard.jpg",
        alt: "Valid Spark dashboard screen",
        label: "Dashboard",
      },
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/valid%20spark/dashboard%20insights.jpg",
        alt: "Valid Spark dashboard insights screen",
        label: "Dashboard insights",
      },
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/valid%20spark/dashboard%20-recent%20activity.jpg",
        alt: "Valid Spark recent activity screen",
        label: "Recent activity",
      },
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/valid%20spark/creating%20the%20report.jpg",
        alt: "Valid Spark creating the report screen",
        label: "Creating the report",
      },
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/valid%20spark/report%20%20overview.jpg",
        alt: "Valid Spark report overview screen",
        label: "Report overview",
      },
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/valid%20spark/report%20problem%20analysis.jpg",
        alt: "Valid Spark report problem analysis screen",
        label: "Problem analysis",
      },
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/valid%20spark/report%20problem%20analysis%202.jpg",
        alt: "Valid Spark report problem analysis screen (2)",
        label: "Problem analysis (2)",
      },
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/valid%20spark/report-%20competitors.jpg",
        alt: "Valid Spark competitors screen",
        label: "Competitors",
      },
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/valid%20spark/report%20-%20competitive%20analysis.jpg",
        alt: "Valid Spark competitive analysis screen",
        label: "Competitive analysis",
      },
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/valid%20spark/report%20-%20strategic%20insights.jpg",
        alt: "Valid Spark strategic insights screen",
        label: "Strategic insights",
      },
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/valid%20spark/pdr%20export.jpg",
        alt: "Valid Spark export screen",
        label: "Export",
      },
    ],
    label: "CASE‑03",
    iconName: "globe",
    featured: true,
  },
  famlymemo: {
    title: "FamlyMemo",
    subtitle:
      "Securely capture and organize your child’s life story—one day at a time.",
    overview:
      "FamlyMemo is a private, parent-focused memory vault that helps you store photos, videos, and audio recordings alongside a daily story entry for each date in your child’s life. Instead of losing meaningful moments across camera rolls, chat apps, and random cloud folders, FamlyMemo organizes everything by date so you can always find “that day” again—and eventually gift your child a complete timeline of their journey.",
    problemSolved: [
      "Scattered memories across multiple apps and devices, with no single timeline.",
      "“I can’t find it” searching: filenames are inconsistent and context gets lost.",
      "Media without meaning: photos/videos lose their story, details, and metadata.",
      "Privacy and access control: sharing should be intentional and time-limited.",
      "Longevity: preserving a complete history from birth through adulthood.",
      "Legacy gifting: turning daily moments into a meaningful, lifelong keepsake.",
    ],
    targetUser:
      "Parents and guardians who want a private, structured memory archive and safe sharing.",
    highlights: [
      "Daily timeline organized by date with fast navigation",
      "Rich story editor for each day",
      "Media vault for photos, videos, and audio (large files supported)",
      "Grid, list, and lightbox views with download/delete actions",
      "Descriptions, tags, and advanced search across media + story text",
      "Storage-aware plans with usage indicators",
      "Secure sharing via expiring signed URLs",
      "Child read-only “legacy” access pattern for gifting later",
    ],
    techStack: [
      "Next.js (App Router) + TypeScript + Tailwind CSS",
      "Clerk",
      "GraphQL (Apollo Server + Apollo Client)",
      "MongoDB (Mongoose)",
      "AWS S3 + CloudFront signed URLs",
      "Stripe subscriptions + webhooks",
    ],
    media: [
      {
        kind: "image",
        src: "/projects/placeholder-hero.svg",
        alt: "FamlyMemo hero image placeholder",
        label: "Hero",
      },
      {
        kind: "image",
        src: "/projects/placeholder-01.svg",
        alt: "FamlyMemo screenshot placeholder 1",
        label: "Daily timeline",
      },
      {
        kind: "image",
        src: "/projects/placeholder-02.svg",
        alt: "FamlyMemo screenshot placeholder 2",
        label: "Story editor",
      },
      {
        kind: "image",
        src: "/projects/placeholder-03.svg",
        alt: "FamlyMemo screenshot placeholder 3",
        label: "Media vault",
      },
    ],
    label: "CASE‑05",
    iconName: "folder",
  },
  "chat-smith": {
    title: "Chat-Smith",
    subtitle: "Multi-tenant RAG chatbot platform for client websites.",
    overview:
      "Chat-Smith is a multi-tenant SaaS platform for creating and managing AI-powered RAG chatbots across multiple clients. Clients upload documents, customize the bot, and embed it on their site. Admin manages tenants, usage, and templates.",
    highlights: [
      "Two dashboards: admin (/admin) and client (/dashboard)",
      "Per-tenant document upload and knowledge base isolation",
      "Embeddable chatbot widget with customization",
      "RAG pipeline for grounded answers from client documents",
      "Tenant-level analytics and management controls",
    ],
    techStack: [
      "Next.js (App Router) + TypeScript",
      "Multi-tenant auth + tenant isolation",
      "Vector search + RAG pipeline",
      "Embeddable widget",
    ],
    media: [
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/chat-smith/landing+page.jpg",
        alt: "Chat-Smith landing page screen",
        label: "Landing page",
      },
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/chat-smith/dashboarad.jpg",
        alt: "Chat-Smith dashboard screen",
        label: "Dashboard",
      },
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/chat-smith/Clients.jpg",
        alt: "Chat-Smith clients screen",
        label: "Clients",
      },
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/chat-smith/chatbots.jpg",
        alt: "Chat-Smith chatbots screen",
        label: "Chatbots",
      },
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/chat-smith/Chatbot+config.jpg",
        alt: "Chat-Smith chatbot config screen",
        label: "Chatbot config",
      },
      {
        kind: "image",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/chat-smith/Documents.jpg",
        alt: "Chat-Smith documents screen",
        label: "Documents",
      },
    ],
    label: "CASE‑06",
    iconName: "messages",
    featured: false,
  },
  summaraize: {
    title: "Summaraize",
    subtitle:
      "Speech-to-text, document conversion, summarization, and text-to-speech with credits.",
    overview:
      "Summaraize is a Next.js application that turns messy, time-consuming inputs (meeting audio, lecture recordings, PDFs, scanned images, long documents) into structured outputs: transcripts, summaries, and natural-sounding audio. It supports voice and document workflows and enforces a credit-based usage model with cost estimation and deduction at API boundaries.",
    problemSolved: [
      "Manual transcription is slow and error-prone",
      "Information overload in long documents",
      "Paper/scanned content is hard to search",
      "Accessibility and learning preferences via text-to-speech",
      "Unpredictable cost and abuse risk in AI apps via credits",
    ],
    targetUser:
      "Students, educators, professionals, creators, and teams needing fast transcription and summaries.",
    highlights: [
      "Voice Assistant: record/upload audio → transcribe → summarize → generate AI voice",
      "Document Converter: PDF/image/text → extract (including OCR) → summarize → generate AI voice",
      "Provider fallback for summarization (DeepSeek → OpenAI)",
      "Credit estimation and enforcement at API boundaries",
      "Stripe checkout + webhooks for credits/subscriptions",
      "SEO blog with Open Graph, JSON-LD, and sitemap generation",
      "Analytics integrations gated behind cookie consent where applicable",
    ],
    techStack: [
      "Next.js (App Router) + React + TypeScript",
      "Tailwind CSS + shadcn/ui (Radix UI primitives)",
      "Supabase (Auth, Postgres, Storage)",
      "Stripe (Checkout + Webhooks)",
      "Deepgram (speech-to-text)",
      "DeepSeek + OpenAI (summarization + extraction)",
      "Google Cloud Text-to-Speech",
    ],
    media: [
      {
        kind: "video",
        src: "https://digital-upstream.s3.eu-central-003.backblazeb2.com/video2.mp4",
        alt: "Summaraize demo video placeholder",
        label: "Workflow demo (placeholder)",
      },
      {
        kind: "image",
        src: "/projects/placeholder-01.svg",
        alt: "Summaraize screenshot placeholder 1",
        label: "Voice assistant",
      },
      {
        kind: "image",
        src: "/projects/placeholder-02.svg",
        alt: "Summaraize screenshot placeholder 2",
        label: "Document converter",
      },
      {
        kind: "image",
        src: "/projects/placeholder-03.svg",
        alt: "Summaraize screenshot placeholder 3",
        label: "Summary + audio",
      },
    ],
    label: "CASE‑07",
    iconName: "filetext",
  },
};

export const PROJECTS_ALL: ProjectListItem[] = Object.entries(
  PROJECT_DETAILS,
).map(([slug, p]) => ({
  href: `/projects/${slug}`,
  slug,
  title: p.title,
  desc: p.subtitle,
  iconName: p.iconName,
  featured: p.featured,
  comingSoon: p.comingSoon,
}));

export const PROJECTS_FEATURED: ProjectListItem[] = PROJECTS_ALL.filter(
  (p) => PROJECT_DETAILS[p.slug]?.featured,
);
