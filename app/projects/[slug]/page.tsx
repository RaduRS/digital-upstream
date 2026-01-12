import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Utensils } from "lucide-react";
import Container from "@/components/Container";
import Parallax from "@/components/Parallax";
import Reveal from "@/components/Reveal";
import DGLabel from "@/components/sections/DGLabel";
import SectionHeading from "@/components/sections/SectionHeading";
import ProjectMediaPanel from "@/components/ProjectMediaPanel";
import { PROJECT_DETAILS, PROJECT_ICON } from "@/lib/projects";

export function generateStaticParams() {
  return Object.keys(PROJECT_DETAILS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECT_DETAILS[slug];
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
  const project = PROJECT_DETAILS[slug];
  if (!project) notFound();

  const Icon = PROJECT_ICON[project.iconName] ?? Utensils;
  const media = project.media ?? [];
  const hero = media.find((m) => m.kind === "video") ?? media[0];
  const gallery = hero ? media.filter((m) => m !== hero) : media;

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
                <div className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
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
                    {hero ? (
                      <ProjectMediaPanel hero={hero} gallery={gallery} />
                    ) : null}

                    <div
                      className={`${
                        hero ? "mt-6" : ""
                      } rounded-lg border border-foreground/10 bg-background/40 p-4 sm:p-5`}
                    >
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
