import Link from "next/link";
import { FolderOpen } from "lucide-react";
import Container from "@/components/Container";
import Parallax from "@/components/Parallax";
import Reveal from "@/components/Reveal";
import DGLabel from "@/components/sections/DGLabel";
import SectionHeading from "@/components/sections/SectionHeading";
import { PROJECT_ICON, PROJECTS_ALL } from "@/lib/projects";

export const metadata = {
  title: "Projects",
  description: "All projects by Digital Upstream.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const featured = PROJECTS_ALL.filter((p) => p.featured);
  const more = PROJECTS_ALL.filter((p) => !p.featured);

  return (
    <main className="min-h-screen">
      <section className="py-24 sm:py-32">
        <Container>
          <div className="max-w-6xl mx-auto w-full">
            <DGLabel
              Icon={FolderOpen}
              label="DU‑PROJECTS"
              className="text-foreground/70"
            />

            <Reveal>
              <Parallax strength={0.1} maxTranslate={28}>
                <div className="max-w-2xl">
                  <SectionHeading
                    as="h1"
                    title="Projects"
                    subtitle="Featured work and additional concepts."
                    subtitleClassName="no-offset"
                  />
                </div>
              </Parallax>
            </Reveal>

            <Reveal delay={120}>
              <Parallax strength={0.08} maxTranslate={24}>
                <div className="mt-10 sm:mt-14">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
                    <div className="lg:col-span-7">
                      <h2 className="text-sm tracking-wide uppercase text-foreground/60">
                        Featured
                      </h2>
                      <div className="mt-5 grid gap-6">
                        {featured.map((p) => {
                          const Icon = PROJECT_ICON[p.iconName];
                          return (
                            <Link
                              key={p.href}
                              href={p.href}
                              className="group rounded-lg border border-foreground/10 bg-background/40 p-4 sm:p-5 transition-colors hover:bg-background/60"
                              aria-label={`Open ${p.title} details`}
                            >
                              <div className="flex items-start justify-between gap-6">
                                <div>
                                  <div className="flex items-center gap-3">
                                    <Icon
                                      className="h-5 w-5 opacity-80"
                                      aria-hidden={true}
                                    />
                                    <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">
                                      {p.title}
                                    </h3>
                                  </div>
                                  <p className="mt-2 text-sm sm:text-base text-foreground/70">
                                    {p.desc}
                                  </p>
                                </div>
                                <span className="text-foreground/50 group-hover:text-foreground/80 transition-colors">
                                  →
                                </span>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>

                    <div className="lg:col-span-5">
                      <h2 className="text-sm tracking-wide uppercase text-foreground/60">
                        More
                      </h2>
                      <div className="mt-5 grid gap-3">
                        {more.map((p) => {
                          const Icon = PROJECT_ICON[p.iconName];
                          return (
                            <Link
                              key={p.href}
                              href={p.href}
                              className="group flex items-center justify-between gap-4 rounded-lg border border-foreground/10 bg-background/40 px-4 py-3 transition-colors hover:bg-background/60"
                              aria-label={`Open ${p.title} details`}
                            >
                              <div className="flex items-center gap-3">
                                <Icon
                                  className="h-4 w-4 opacity-80"
                                  aria-hidden={true}
                                />
                                <div>
                                  <p className="text-base font-medium leading-none">
                                    {p.title}
                                  </p>
                                  <p className="mt-1 text-sm text-foreground/65">
                                    {p.comingSoon ? "Coming soon" : p.desc}
                                  </p>
                                </div>
                              </div>
                              <span className="text-foreground/50 group-hover:text-foreground/80 transition-colors">
                                →
                              </span>
                            </Link>
                          );
                        })}
                      </div>
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
                Back to home projects
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
