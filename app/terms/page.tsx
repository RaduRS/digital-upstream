import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of service for Digital Upstream's blog and portfolio website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main id="content" className="py-16 sm:py-20">
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col gap-10">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.35em] text-foreground/60">
              Legal
            </p>
            <h1 className="text-3xl font-semibold sm:text-4xl">
              Terms of Service
            </h1>
            <p className="text-base text-foreground/80 sm:text-lg">
              These terms govern your use of this website.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-foreground/70">
              <Link
                href="/privacy"
                className="link-underline-rtl text-foreground"
              >
                Privacy policy
              </Link>
              <Link
                href="/cookies"
                className="link-underline-rtl text-foreground"
              >
                Cookies policy
              </Link>
              <Link
                href="/work#contact"
                className="link-underline-rtl text-foreground"
              >
                Contact
              </Link>
            </div>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold sm:text-2xl">Disclaimer</h2>
            <p className="text-foreground/80">
              The information on this website is provided for general informational
              purposes only. Where we publish affiliate links or sponsored
              content, this will be clearly disclosed in accordance with applicable
              advertising standards.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold sm:text-2xl">
              Affiliate Links
            </h2>
            <p className="text-foreground/80">
              Some links on this site may be affiliate links. This means we may
              earn a commission if you click through and make a purchase, at no
              additional cost to you. We only recommend products or services
              that we believe provide value to our readers.
            </p>
            <p className="text-foreground/80">
              All affiliate relationships will be clearly disclosed within the
              relevant content.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold sm:text-2xl">
              Intellectual Property
            </h2>
            <p className="text-foreground/80">
              All content on this site—including articles, graphics, logos, and
              design—is the property of Digital Upstream and protected by
              copyright law. You may not reproduce, distribute, or create
              derivative works without our permission.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold sm:text-2xl">Content</h2>
            <p className="text-foreground/80">
              The views expressed in our blog posts are our own and do not
              necessarily reflect the views of any third party. We reserve the
              right to update, modify, or remove content at any time without
              notice.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold sm:text-2xl">External Links</h2>
            <p className="text-foreground/80">
              This website may contain links to external sites. We are not
              responsible for the content, accuracy, or practices of any
              third-party websites.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold sm:text-2xl">Contact</h2>
            <p className="text-foreground/80">
              Questions about these terms can be sent to{" "}
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
      <Script id="terms-webpage-jsonld" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Terms of Service",
          url: "https://digital-upstream.com/terms",
          description:
            "Terms of service for Digital Upstream's blog and portfolio website.",
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
