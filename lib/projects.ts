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
      "Reduces food waste by tracking pantry inventory and expiry dates",
      "Promotes healthy eating through practical, ingredient-aware suggestions",
      "Makes shopping smarter by surfacing missing ingredients",
    ],
    targetUser:
      "Single user (personal use), health-conscious, wants practical tools that fit naturally into daily cooking routines.",
    highlights: [
      "Barcode scanning and photo capture to add pantry items",
      "Pantry inventory with quantities and expiry tracking",
      "Recipe suggestions driven by available ingredients",
      "Filters: meal type, servings, dietary preferences",
      "Shopping list built from missing ingredients",
    ],
    techStack: ["PWA", "Mobile-first UI", "AI-assisted recommendations"],
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
    label: "CASE‑02",
    iconName: "video",
    featured: true,
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
    label: "CASE‑03",
    iconName: "messages",
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
    label: "CASE‑05",
    iconName: "folder",
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
    label: "CASE‑06",
    iconName: "globe",
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
    label: "CASE‑07",
    iconName: "filetext",
  },
};

export const PROJECTS_ALL: ProjectListItem[] = Object.entries(
  PROJECT_DETAILS
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
  (p) => PROJECT_DETAILS[p.slug]?.featured
);
