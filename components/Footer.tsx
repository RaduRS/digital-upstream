import Container from "@/components/Container";

export default function Footer() {
  return (
    <footer className="bg-(--bg-dark) text-primary-foreground">
      <Container className="py-8 text-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Digital Upstream. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href="mailto:contact@digital-upstream.com"
              className="link-underline-hide-ltr link-underline-tight text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              aria-label="Email Digital Upstream"
            >
              contact@digital-upstream.com
            </a>
            <a
              href="https://www.tiktok.com/@digitalupstream"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline-hide-ltr link-underline-tight text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              aria-label="Digital Upstream on TikTok"
            >
              TikTok
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
