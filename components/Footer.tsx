import Container from "@/components/Container";

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-dark)] text-primary-foreground">
      <Container className="py-8 text-sm">
        <p>© {new Date().getFullYear()} Digital Upstream. All rights reserved.</p>
      </Container>
    </footer>
  );
}