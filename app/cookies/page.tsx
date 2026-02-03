import type { Metadata } from "next";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Cookies Policy",
  description:
    "Learn how Digital Upstream uses cookies and analytics, and how to control your preference.",
};

export default function CookiesPage() {
  return (
    <main id="content" className="py-16 sm:py-20">
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col gap-10">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.35em] text-foreground/60">
              Policy
            </p>
            <h1 className="text-3xl font-semibold sm:text-4xl">
              Cookies policy
            </h1>
            <p className="text-base text-foreground/80 sm:text-lg">
              This policy explains how Digital Upstream uses cookies and similar
              technologies, and how you can manage your choices.
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold sm:text-2xl">What we use</h2>
            <p className="text-foreground/80">
              We only use analytics cookies when you choose yes in the cookie
              banner. These cookies help us understand how the site is used and
              which pages perform best.
            </p>
            <div className="space-y-2 text-foreground/80">
              <div className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-foreground/60" />
                <p>
                  Google Analytics (ID: G-YW8E57E2BS) to measure traffic and
                  usage trends.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-foreground/60" />
                <p>
                  A local preference record that remembers your consent choice.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold sm:text-2xl">
              Your choices
            </h2>
            <p className="text-foreground/80">
              You must choose yes or no before continuing to use the site. If
              you say no, we do not load analytics. If you say yes, we load
              Google Analytics so we can improve performance and content.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold sm:text-2xl">
              How to change your preference
            </h2>
            <p className="text-foreground/80">
              You can reset your choice at any time by clearing this site’s data
              in your browser. The banner will appear again on your next visit.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold sm:text-2xl">Contact</h2>
            <p className="text-foreground/80">
              Questions about this policy can be sent to{" "}
              <a
                href="mailto:contact@digital-upstream.com"
                className="link-underline-rtl text-foreground"
              >
                contact@digital-upstream.com
              </a>
              .
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
}
