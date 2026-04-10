import Container from "@/components/Container";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-dark)] text-primary-foreground">
      <Container className="py-10 sm:py-12">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8 sm:gap-12">
          {/* Brand + copyright */}
          <div className="flex flex-col gap-3">
            <p className="text-base font-medium tracking-tight">
              Digital Upstream
            </p>
            <p className="text-sm text-primary-foreground/60">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          {/* Links grouped */}
          <div className="flex flex-wrap gap-x-8 gap-y-4 sm:gap-x-10">
            {/* Navigation */}
            <div className="flex flex-col gap-3">
              <p className="text-xs uppercase tracking-widest text-primary-foreground/40">
                Navigate
              </p>
              <nav className="flex flex-col gap-2">
                <Link
                  href="/work"
                  className="link-underline-hide-ltr link-underline-tight text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Work
                </Link>
                <Link
                  href="/projects"
                  className="link-underline-hide-ltr link-underline-tight text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Projects
                </Link>
                <Link
                  href="/work#contact"
                  className="link-underline-hide-ltr link-underline-tight text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Contact
                </Link>
              </nav>
            </div>

            {/* Legal */}
            <div className="flex flex-col gap-3">
              <p className="text-xs uppercase tracking-widest text-primary-foreground/40">
                Legal
              </p>
              <nav className="flex flex-col gap-2">
                <Link
                  href="/terms"
                  className="link-underline-hide-ltr link-underline-tight text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Terms of service
                </Link>
                <Link
                  href="/cookies"
                  className="link-underline-hide-ltr link-underline-tight text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Cookies policy
                </Link>
                <Link
                  href="/privacy"
                  className="link-underline-hide-ltr link-underline-tight text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Privacy policy
                </Link>
              </nav>
            </div>

            {/* Social */}
            <div className="flex flex-col gap-3">
              <p className="text-xs uppercase tracking-widest text-primary-foreground/40">
                Social
              </p>
              <a
                href="https://www.tiktok.com/@digitalupstream"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                aria-label="Digital Upstream on TikTok"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  aria-hidden="true"
                  focusable="false"
                  fill="currentColor"
                >
                  <path d="M17.285 0h-3.357v14.01c0 1.67-1.372 3.03-3.06 3.03-1.687 0-3.06-1.36-3.06-3.03 0-1.67 1.373-3.03 3.06-3.03.32 0 .628.049.92.14V7.69a6.61 6.61 0 0 0-.92-.065C7.16 7.625 4 10.75 4 14.01 4 17.27 7.16 20.395 10.868 20.395c3.707 0 6.868-3.125 6.868-6.385V7.244c1.018.734 2.27 1.167 3.632 1.167V4.952c-2.237-.072-4.083-1.85-4.083-3.952Z" />
                </svg>
                TikTok
              </a>
            </div>
          </div>
        </div>

        {/* Affiliate disclosure */}
        <div className="mt-8 pt-6 border-t border-primary-foreground/10">
          <p className="text-xs text-primary-foreground/50">
            This site contains affiliate links. If you click an affiliate link
            and make a purchase, we may earn a commission at no extra cost to
            you. We only recommend products and services we believe in. See our{" "}
            <Link
              href="/terms"
              className="link-underline-hide-ltr text-primary-foreground/60 hover:text-primary-foreground/80 transition-colors"
            >
              terms of service
            </Link>{" "}
            for details.
          </p>
        </div>
      </Container>
    </footer>
  );
}
