import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

export default function Statement() {
  return (
    <section
      id="statement"
      aria-labelledby="statement-title"
      className="relative min-h-screen flex items-center py-32 sm:py-40"
    >
      <Container>
        <div className="grid grid-cols-12 gap-x-6 items-end">
          <div className="col-span-12 lg:col-span-3 mb-12 lg:mb-0">
            <p className="cat-label">DU/02 — Statement</p>
            <p className="mt-6 small-caps text-foreground/40">
              On the work
            </p>
            <div className="mt-8 hairline-strong text-foreground/40 max-w-[3rem]" />
          </div>

          <div className="col-span-12 lg:col-span-9">
            <Reveal threshold={0.18}>
              <h2
                id="statement-title"
                className="display text-foreground"
                style={{ fontSize: "clamp(3rem, 9vw, 9rem)" }}
              >
                <span className="block">Less,</span>
                <span className="block">
                  but{" "}
                  <span
                    className="display-italic"
                    style={{ color: "var(--accent)" }}
                  >
                    better.
                  </span>
                </span>
              </h2>
            </Reveal>

            <Reveal threshold={0.2} delay={120}>
              <div className="mt-12 sm:mt-16 grid grid-cols-12 gap-x-6">
                <p className="col-span-12 md:col-span-7 lede">
                  I make products people use without thinking about. Quiet
                  surfaces, careful type, motion that earns its keep — and the
                  invisible engineering work that lets it all hold up.
                </p>
                <p className="col-span-12 md:col-start-8 md:col-span-5 body-copy mt-6 md:mt-0">
                  Every design choice is a position. The position here is
                  restraint: fewer ideas, executed at a level that makes the
                  decision feel inevitable. Personal, precise, unmistakably
                  yours.
                </p>
              </div>
            </Reveal>

            <Reveal threshold={0.2} delay={220}>
              <div className="mt-16 sm:mt-20 flex flex-wrap items-center gap-x-10 gap-y-4">
                <p className="display-italic text-2xl sm:text-3xl text-foreground/80">
                  &ldquo;Strip noise. Amplify signal.&rdquo;
                </p>
                <span className="small-caps text-foreground/50">— House rule</span>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
