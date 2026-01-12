import HeroSection from "@/components/sections/HeroSection";
import BlackSection from "@/components/sections/BlackSection";
import HowWeWorkSection from "@/components/sections/HowWeWorkSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";

// Sections are modularized; section content lives within each component.

export default function Home() {
  return (
    <main id="content">
      <HeroSection />
      <BlackSection />
      <HowWeWorkSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
