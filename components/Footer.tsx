import Container from "@/components/Container";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-dark)] text-primary-foreground">
      <Container className="py-8 text-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Digital Upstream. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href="mailto:contact@digital-upstream.com"
              className="link-underline-hide-ltr link-underline-tight text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              aria-label="Email Digital Upstream"
            >
              contact@digital-upstream.com
            </a>
            <Link
              href="/projects"
              className="link-underline-hide-ltr link-underline-tight text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              Projects
            </Link>
            <Link
              href="/cookies"
              className="link-underline-hide-ltr link-underline-tight text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              Cookies policy
            </Link>
            <Link
              href="/privacy"
              className="link-underline-hide-ltr link-underline-tight text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              Privacy policy
            </Link>
            <a
              href="https://www.tiktok.com/@digitalupstream"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              aria-label="Digital Upstream on TikTok"
            >
              <span className="sr-only">TikTok</span>
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                aria-hidden="true"
                focusable="false"
                fill="currentColor"
              >
                <path d="M17.285 0h-3.357v14.01c0 1.67-1.372 3.03-3.06 3.03-1.687 0-3.06-1.36-3.06-3.03 0-1.67 1.373-3.03 3.06-3.03.32 0 .628.049.92.14V7.69a6.61 6.61 0 0 0-.92-.065C7.16 7.625 4 10.75 4 14.01 4 17.27 7.16 20.395 10.868 20.395c3.707 0 6.868-3.125 6.868-6.385V7.244c1.018.734 2.27 1.167 3.632 1.167V4.952c-2.237-.072-4.083-1.85-4.083-3.952Z" />
              </svg>
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
