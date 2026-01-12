import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, MessagesSquare, Utensils, Video } from "lucide-react";
import Container from "@/components/Container";
import Parallax from "@/components/Parallax";
import Reveal from "@/components/Reveal";
import DGLabel from "@/components/sections/DGLabel";
import SectionHeading from "@/components/sections/SectionHeading";

type Project = {
  title: string;
  subtitle: string;
  overview: string;
  problemSolved?: string[];
  targetUser?: string;
  highlights?: string[];
  techStack?: string[];
  label?: string;
  Icon?: typeof Utensils;
};

const PROJECTS: Record<string, Project> = {
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
    Icon: Utensils,
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
    Icon: Video,
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
    Icon: MessagesSquare,
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
    Icon: Calendar,
  },
};

export function generateStaticParams() {
  return Object.keys(PROJECTS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS[slug];
  if (!project) return {};
  return {
    title: project.title,
    description: project.subtitle,
    alternates: { canonical: `/projects/${slug}` },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS[slug];
  if (!project) notFound();

  const Icon = project.Icon ?? Utensils;

  return (
    <main className="min-h-screen">
      <section className="py-24 sm:py-32">
        <Container>
          <div className="max-w-6xl mx-auto w-full">
            <div className="flex items-center justify-end gap-6">
              <DGLabel
                Icon={Icon}
                label={project.label ?? "CASE"}
                className="mb-0 text-foreground/70"
              />
            </div>

            <div className="mt-10 sm:mt-14">
              <Reveal>
                <Parallax strength={0.08} maxTranslate={24}>
                  <SectionHeading
                    as="h1"
                    title={project.title}
                    subtitle={project.subtitle}
                    subtitleClassName="no-offset"
                    className="w-full"
                  />
                </Parallax>
              </Reveal>
            </div>

            <Reveal delay={120}>
              <Parallax strength={0.06} maxTranslate={18}>
                <div className="mt-10 sm:mt-14 symbiote-card rounded-xl border border-foreground/10 p-5 sm:p-7 lg:p-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
                    <div className="lg:col-span-7">
                      <div className="space-y-4">
                        <h2 className="text-sm tracking-wide uppercase text-foreground/60">
                          Overview
                        </h2>
                        <p className="text-lg sm:text-xl leading-relaxed text-foreground/80">
                          {project.overview}
                        </p>
                      </div>

                      {project.problemSolved &&
                      project.problemSolved.length > 0 ? (
                        <div className="mt-10 sm:mt-12">
                          <h2 className="text-sm tracking-wide uppercase text-foreground/60">
                            Core Problem Solved
                          </h2>
                          <ul className="mt-4 space-y-2 text-base sm:text-lg text-foreground/75">
                            {project.problemSolved.map((item) => (
                              <li key={item} className="flex gap-3">
                                <span
                                  className="mt-2 h-1.5 w-1.5 rounded-full bg-foreground/40"
                                  aria-hidden="true"
                                />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}

                      {project.targetUser ? (
                        <div className="mt-10 sm:mt-12">
                          <h2 className="text-sm tracking-wide uppercase text-foreground/60">
                            Target User
                          </h2>
                          <p className="mt-4 text-base sm:text-lg text-foreground/75 leading-relaxed">
                            {project.targetUser}
                          </p>
                        </div>
                      ) : null}
                    </div>

                    <div className="lg:col-span-5">
                      <div className="rounded-lg border border-foreground/10 bg-background/40 p-4 sm:p-5">
                        <h2 className="text-sm tracking-wide uppercase text-foreground/60">
                          Key Features
                        </h2>
                        {project.highlights && project.highlights.length > 0 ? (
                          <ul className="mt-4 space-y-2 text-base text-foreground/75">
                            {project.highlights.map((item) => (
                              <li key={item} className="flex gap-3">
                                <span
                                  className="mt-2 h-1.5 w-1.5 rounded-full bg-foreground/40"
                                  aria-hidden="true"
                                />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="mt-4 text-base text-foreground/70">
                            Add feature highlights here.
                          </p>
                        )}
                      </div>

                      {project.techStack && project.techStack.length > 0 ? (
                        <div className="mt-6 rounded-lg border border-foreground/10 bg-background/40 p-4 sm:p-5">
                          <h2 className="text-sm tracking-wide uppercase text-foreground/60">
                            Tech Stack
                          </h2>
                          <ul className="mt-4 space-y-2 text-base text-foreground/75">
                            {project.techStack.map((item) => (
                              <li key={item} className="flex gap-3">
                                <span
                                  className="mt-2 h-1.5 w-1.5 rounded-full bg-foreground/40"
                                  aria-hidden="true"
                                />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </Parallax>
            </Reveal>

            <div className="mt-12 sm:mt-14">
              <Link
                href="/#projects"
                className="link-underline-hide-ltr text-lg sm:text-xl text-foreground/80 hover:text-foreground transition-colors"
              >
                Back to projects
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
