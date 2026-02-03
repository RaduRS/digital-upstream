import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Cookies Policy",
  description:
    "Learn how Digital Upstream uses cookies and analytics, and how to control your preference.",
  alternates: { canonical: "/cookies" },
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
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-foreground/70">
              <Link
                href="/privacy"
                className="link-underline-rtl text-foreground"
              >
                Privacy policy
              </Link>
              <Link
                href="/#contact"
                className="link-underline-rtl text-foreground"
              >
                Contact
              </Link>
            </div>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold sm:text-2xl">What we use</h2>
            <p className="text-foreground/80">
              We only use analytics when you accept in the cookie banner. This
              helps us understand aggregated usage (for example which pages are
              visited) so we can improve the site.
            </p>
            <div className="space-y-2 text-foreground/80">
              <div className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-foreground/60" />
                <p>
                  Google Analytics (provided by Google) to measure traffic and
                  usage trends.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-foreground/60" />
                <p>A preference record that remembers your consent choice.</p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold sm:text-2xl">Your choices</h2>
            <p className="text-foreground/80">
              You must accept or decline before continuing to use the site. If
              you decline, we do not load Google Analytics. If you accept, we
              load Google Analytics so we can improve performance and content.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold sm:text-2xl">
              Third-party processing
            </h2>
            <p className="text-foreground/80">
              When enabled, Google Analytics may process data on our behalf. The
              data collected via analytics may include information about your
              device and how you interact with the site. Google may process data
              in different countries. For details, review Google’s documentation
              and policies.
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
      <Script id="cookies-webpage-jsonld" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Cookies Policy",
          url: "https://digital-upstream.com/cookies",
          description:
            "Learn how Digital Upstream uses cookies and analytics, and how to control your preference.",
          isPartOf: {
            "@type": "WebSite",
            name: "Digital Upstream",
            url: "https://digital-upstream.com",
          },
        })}
      </Script>
    </main>
  );
}
