import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

const movements = [
  {
    no: "I",
    title: "Strategy",
    italic: "Define intent",
    body:
      "Before pixels, alignment. Audience, position, the smallest path to the outcome — written down so design has a brief, not a guess.",
  },
  {
    no: "II",
    title: "Design",
    italic: "Strip the noise",
    body:
      "Type, system, motion. One idea per surface, tuned until removing anything else would weaken it. Quiet by default, loud when it matters.",
  },
  {
    no: "III",
    title: "Build",
    italic: "Hold up under load",
    body:
      "Production-grade Next.js, accessible by construction, fast on the slowest device that matters. Shipped, not handed off as a deck.",
  },
];

export default function Method() {
  return (
    <section
      id="method"
      aria-labelledby="method-title"
      className="relative py-32 sm:py-40"
    >
      <Container>
        <div className="grid grid-cols-12 gap-x-6">
          {/* Sticky column header */}
          <header className="col-span-12 lg:col-span-4 lg:sticky lg:top-24 lg:self-start mb-16 lg:mb-0">
            <p className="cat-label">DU/03 — Method</p>
            <h2
              id="method-title"
              className="mt-8 display text-foreground"
              style={{ fontSize: "clamp(2.75rem, 6.4vw, 5.5rem)" }}
            >
              <span className="block">Three</span>
              <span className="block">
                <span
                  className="display-italic"
                  style={{ color: "var(--accent)" }}
                >
                  movements,
                </span>
              </span>
              <span className="block">one outcome.</span>
            </h2>
            <p className="mt-8 lede max-w-md">
              The same arc on every project — the rigour scales to the budget,
              never the other way round.
            </p>
          </header>

          {/* Movements column */}
          <ol className="col-span-12 lg:col-span-8 lg:pl-8 lg:border-l border-foreground/10 list-none p-0 m-0 space-y-16 sm:space-y-20">
            {movements.map((m, i) => (
              <li key={m.no}>
                <Reveal threshold={0.25} delay={i * 80}>
                  <article className="grid grid-cols-12 gap-x-4 items-baseline">
                    <div className="col-span-2 sm:col-span-1">
                      <span
                        className="display text-foreground/30"
                        style={{ fontSize: "clamp(1.75rem, 3.4vw, 2.5rem)" }}
                      >
                        {m.no}
                      </span>
                    </div>
                    <div className="col-span-10 sm:col-span-11">
                      <h3
                        className="display text-foreground"
                        style={{ fontSize: "clamp(2rem, 4.6vw, 3.5rem)" }}
                      >
                        {m.title}{" "}
                        <span
                          className="display-italic text-foreground/55"
                          style={{ fontSize: "0.6em" }}
                        >
                          / {m.italic}
                        </span>
                      </h3>
                      <p className="mt-4 sm:mt-5 body-copy max-w-xl">{m.body}</p>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
