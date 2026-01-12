import { Calendar, FileText, FolderOpen, Globe, MessagesSquare, Utensils, Video, Wind } from "lucide-react";

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
  "placeholder-1": {
    title: "Project Five",
    subtitle: "Placeholder project (coming soon).",
    overview: "Details coming soon.",
    label: "CASE‑05",
    iconName: "globe",
    comingSoon: true,
  },
  "placeholder-2": {
    title: "Project Six",
    subtitle: "Placeholder project (coming soon).",
    overview: "Details coming soon.",
    label: "CASE‑06",
    iconName: "filetext",
    comingSoon: true,
  },
  "placeholder-3": {
    title: "Project Seven",
    subtitle: "Placeholder project (coming soon).",
    overview: "Details coming soon.",
    label: "CASE‑07",
    iconName: "wind",
    comingSoon: true,
  },
  "placeholder-4": {
    title: "Project Eight",
    subtitle: "Placeholder project (coming soon).",
    overview: "Details coming soon.",
    label: "CASE‑08",
    iconName: "folder",
    comingSoon: true,
  },
};

export const PROJECTS_ALL: ProjectListItem[] = Object.entries(PROJECT_DETAILS).map(
  ([slug, p]) => ({
    href: `/projects/${slug}`,
    slug,
    title: p.title,
    desc: p.subtitle,
    iconName: p.iconName,
    featured: p.featured,
    comingSoon: p.comingSoon,
  })
);

export const PROJECTS_FEATURED: ProjectListItem[] = PROJECTS_ALL.filter(
  (p) => PROJECT_DETAILS[p.slug]?.featured
);

