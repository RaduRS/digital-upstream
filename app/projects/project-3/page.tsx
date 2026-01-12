import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import Parallax from "@/components/Parallax";
import Link from "next/link";

export default function ProjectThreePage() {
  return (
    <main className="min-h-screen flex items-center">
      <Container>
        <div className="max-w-4xl mx-auto w-full">
          <Reveal>
            <Parallax strength={0.08} maxTranslate={24}>
              <div>
                <h1 className="tracking-tight text-5xl sm:text-6xl lg:text-7xl font-bold">Project Three</h1>
                <p className="mt-6 text-lg sm:text-xl opacity-80">Interface design decisions and outcomes.</p>
              </div>
            </Parallax>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-12 prose prose-invert max-w-none">
              <p>
                Summarize the user journey, key flows, and accessibility considerations. Add screenshots or diagrams as
                needed to highlight the evolution.
              </p>
            </div>
          </Reveal>
          <div className="mt-12">
            <Link href="/#projects" className="underline underline-offset-4 text-foreground/80 hover:text-foreground transition-colors">
              Back to projects
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}