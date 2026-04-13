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
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" focusable="false" fill="currentColor">
                  <path d="M17.285 0h-3.357v14.01c0 1.67-1.372 3.03-3.06 3.03-1.687 0-3.06-1.36-3.06-3.03 0-1.67 1.373-3.03 3.06-3.03.32 0 .628.049.92.14V7.69a6.61 6.61 0 0 0-.92-.065C7.16 7.625 4 10.75 4 14.01 4 17.27 7.16 20.395 10.868 20.395c3.707 0 6.868-3.125 6.868-6.385V7.244c1.018.734 2.27 1.167 3.632 1.167V4.952c-2.237-.072-4.083-1.85-4.083-3.952Z" />
                </svg>
                TikTok
              </a>
              <a
                href="https://www.instagram.com/digital.upstream"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                aria-label="Digital Upstream on Instagram"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" focusable="false" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Instagram
              </a>
              <a
                href="https://x.com/Digi_Upstream"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                aria-label="Digital Upstream on X"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" focusable="false" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                X
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
