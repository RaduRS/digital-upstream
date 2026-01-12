import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import Parallax from "@/components/Parallax";
import Link from "next/link";

export default function ProjectFourPage() {
  return (
    <main className="min-h-screen flex items-center">
      <Container>
        <div className="max-w-4xl mx-auto w-full">
          <Reveal>
            <Parallax strength={0.08} maxTranslate={24}>
              <div>
                <h1 className="tracking-tight text-5xl sm:text-6xl lg:text-7xl font-bold">Project Four</h1>
                <p className="mt-6 text-lg sm:text-xl opacity-80">Systems, architecture, and maintainability.</p>
              </div>
            </Parallax>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-12 prose prose-invert max-w-none">
              <p>
                Outline how the system scales, the trade-offs made, and how you ensured performance, accessibility, and
                developer experience.
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