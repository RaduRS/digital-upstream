import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import Parallax from "@/components/Parallax";
import Reveal from "@/components/Reveal";

const PROJECTS: Record<
  string,
  { title: string; subtitle: string; body: string }
> = {
  "project-1": {
    title: "Project One",
    subtitle: "A short overview of the goals, approach, and outcome.",
    body: "This page can cover the problem statement, constraints, the process we followed, and the result. Replace this placeholder with your case study content, images, and metrics.",
  },
  "project-2": {
    title: "Project Two",
    subtitle: "Overview of content strategy, architecture, and delivery.",
    body: "Replace this with your narrative and supporting visuals. Consider structuring into problem, process, and impact sections for clarity and scannability.",
  },
  "project-3": {
    title: "Project Three",
    subtitle: "Interface design decisions and outcomes.",
    body: "Summarize the user journey, key flows, and accessibility considerations. Add screenshots or diagrams as needed to highlight the evolution.",
  },
  "project-4": {
    title: "Project Four",
    subtitle: "Systems, architecture, and maintainability.",
    body: "Outline how the system scales, the trade-offs made, and how you ensured performance, accessibility, and developer experience.",
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

  return (
    <main className="min-h-screen flex items-center">
      <Container>
        <div className="max-w-4xl mx-auto w-full">
          <Reveal>
            <Parallax strength={0.08} maxTranslate={24}>
              <div>
                <h1 className="tracking-tight text-5xl sm:text-6xl lg:text-7xl font-bold">
                  {project.title}
                </h1>
                <p className="mt-6 text-lg sm:text-xl opacity-80">
                  {project.subtitle}
                </p>
              </div>
            </Parallax>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-12 prose prose-invert max-w-none">
              <p>{project.body}</p>
            </div>
          </Reveal>
          <div className="mt-12">
            <Link
              href="/#projects"
              className="underline underline-offset-4 text-foreground/80 hover:text-foreground transition-colors"
            >
              Back to projects
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
