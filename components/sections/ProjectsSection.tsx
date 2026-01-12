"use client";

import Link from "next/link";
import Script from "next/script";
import type { MouseEvent } from "react";
import { useEffect, useRef } from "react";
import { FolderOpen, Globe, FileText, Wind } from "lucide-react";
import Container from "@/components/Container";
import Parallax from "@/components/Parallax";
import Reveal from "@/components/Reveal";
import DGLabel from "./DGLabel";
import SectionHeading from "./SectionHeading";

const projects = [
  {
    href: "/projects/project-1",
    title: "Project One",
    desc: "Brand site and CMS",
    Icon: Globe,
  },
  {
    href: "/projects/project-2",
    title: "Project Two",
    desc: "Docs and knowledge base",
    Icon: FileText,
  },
  {
    href: "/projects/project-3",
    title: "Project Three",
    desc: "Interactive dashboard",
    Icon: Wind,
  },
  {
    href: "/projects/project-4",
    title: "Project Four",
    desc: "Component library",
    Icon: FolderOpen,
  },
];

export default function ProjectsSection() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const svgBgRef = useRef<SVGSVGElement | null>(null);
  const svgInvertRef = useRef<SVGSVGElement | null>(null);
  const pathBgRef = useRef<SVGPathElement | null>(null);
  const pathInvertRef = useRef<SVGPathElement | null>(null);
  const pointer = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const hovering = useRef<boolean>(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const resize = () => {
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      const { width, height } = wrapper.getBoundingClientRect();
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Keep SVG overlays in sync with wrapper size
      if (svgBgRef.current) {
        svgBgRef.current.setAttribute("viewBox", `0 0 ${width} ${height}`);
        svgBgRef.current.setAttribute("width", `${width}`);
        svgBgRef.current.setAttribute("height", `${height}`);
      }
      if (svgInvertRef.current) {
        svgInvertRef.current.setAttribute("viewBox", `0 0 ${width} ${height}`);
        svgInvertRef.current.setAttribute("width", `${width}`);
        svgInvertRef.current.setAttribute("height", `${height}`);
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (time: number) => {
      rafRef.current = requestAnimationFrame(draw);
      if (!hovering.current) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = pointer.current.x;
      const cy = pointer.current.y;
      if (cx < 0 || cy < 0) return;
      const baseR = 35; // px
      // Switch to sharp-edged spikes riding on the base ripple
      const a1 = reduceMotion ? 0 : 3.6; // smaller base ripple
      const a2 = reduceMotion ? 0 : 2.4;
      const speed1 = reduceMotion ? 0 : 0.0035; // ms
      const speed2 = reduceMotion ? 0 : 0.0026; // ms
      const waves = 72; // fewer segments to emphasize corners
      // No hard stroke — gradient edge is handled via blurred SVG overlays
      // No hard stroke — gradient edge is handled via blurred SVG overlays

      // Build the same path for SVG overlays so the inner area follows the ring
      const path = buildSharpPath(
        cx,
        cy,
        baseR,
        a1,
        a2,
        speed1,
        speed2,
        waves,
        time
      );
      if (pathBgRef.current) pathBgRef.current.setAttribute("d", path);
      if (pathInvertRef.current) pathInvertRef.current.setAttribute("d", path);
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <section
      id="projects"
      className="h-screen flex items-center"
      aria-labelledby="projects-title"
    >
      <Container className="max-w-8xl">
        <div className="mx-auto w-full text-left">
          <DGLabel
            Icon={FolderOpen}
            label="DU‑04"
            className="text-foreground/70"
          />

          <Reveal>
            <Parallax strength={0.1} maxTranslate={28}>
              <SectionHeading
                title="Showcase"
                subtitle="Recent collaborations."
                id="projects-title"
              />
            </Parallax>
          </Reveal>

          <Reveal delay={120}>
            <Parallax strength={0.08} maxTranslate={24}>
              <div
                className="mt-8 sm:mt-12 lg:mt-16 symbiote-card rounded-xl border border-foreground/10 p-4 sm:p-6 lg:p-8 transition-colors"
                aria-label="Projects bar"
                ref={wrapperRef}
                onMouseEnter={(e: MouseEvent<HTMLDivElement>) => {
                  hovering.current = true;
                  const rect = (
                    e.currentTarget as HTMLDivElement
                  ).getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  (e.currentTarget as HTMLDivElement).style.setProperty(
                    "--x",
                    `${x}px`
                  );
                  (e.currentTarget as HTMLDivElement).style.setProperty(
                    "--y",
                    `${y}px`
                  );
                  pointer.current = { x, y };
                }}
                onMouseMove={(e: MouseEvent<HTMLDivElement>) => {
                  const rect = (
                    e.currentTarget as HTMLDivElement
                  ).getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  (e.currentTarget as HTMLDivElement).style.setProperty(
                    "--x",
                    `${x}px`
                  );
                  (e.currentTarget as HTMLDivElement).style.setProperty(
                    "--y",
                    `${y}px`
                  );
                  pointer.current = { x, y };
                }}
                onMouseLeave={(e: MouseEvent<HTMLDivElement>) => {
                  (e.currentTarget as HTMLDivElement).style.setProperty(
                    "--x",
                    `-1000px`
                  );
                  (e.currentTarget as HTMLDivElement).style.setProperty(
                    "--y",
                    `-1000px`
                  );
                  pointer.current = { x: -1000, y: -1000 };
                  hovering.current = false;
                }}
              >
                {/* SVG lens overlays: background darkening outside the path, and foreground inversion inside the path */}
                <svg
                  ref={svgBgRef}
                  className="symbiote-lens-bg"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <defs>
                    <filter
                      id="lens-blur"
                      x="-50%"
                      y="-50%"
                      width="200%"
                      height="200%"
                      filterUnits="objectBoundingBox"
                    >
                      <feGaussianBlur in="SourceGraphic" stdDeviation="9.8" />
                    </filter>
                    <mask id="lens-hole-mask">
                      <rect
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        fill="white"
                      />
                      {/* The lens path punches a soft hole via blur */}
                      <g filter="url(#lens-blur)">
                        <path ref={pathBgRef} d="" fill="black" />
                      </g>
                    </mask>
                  </defs>
                  {/* Dark overlay outside the lens */}
                  <rect
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    fill="currentColor"
                    style={{ color: "var(--bg-dark)" }}
                    mask="url(#lens-hole-mask)"
                  />
                </svg>
                <svg
                  ref={svgInvertRef}
                  className="symbiote-lens-invert"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <defs>
                    <filter
                      id="lens-blur-invert"
                      x="-50%"
                      y="-50%"
                      width="200%"
                      height="200%"
                      filterUnits="objectBoundingBox"
                    >
                      <feGaussianBlur in="SourceGraphic" stdDeviation="9.8" />
                    </filter>
                  </defs>
                  {/* White fill inside the lens to drive mix-blend-mode:difference, feathered edge */}
                  <path
                    ref={pathInvertRef}
                    d=""
                    fill="white"
                    filter="url(#lens-blur-invert)"
                  />
                </svg>
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 z-[3] pointer-events-none opacity-0 symbiote-ring-canvas"
                ></canvas>
                <div className="symbiote-card-content grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
                  {projects.map((p, i) => (
                    <Reveal key={p.href} delay={i * 120} threshold={0.2}>
                      <Link
                        href={p.href}
                        role="listitem"
                        className="group block"
                        aria-label={`Open ${p.title} details`}
                      >
                        <div className="flex items-center gap-4">
                          <p.Icon
                            className="h-5 w-5 opacity-80"
                            aria-hidden={true}
                          />
                          <h3 className="text-lg sm:text-xl">{p.title}</h3>
                        </div>
                        <p className="mt-2 text-sm sm:text-base opacity-70">
                          {p.desc}
                        </p>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Parallax>
          </Reveal>
        </div>
        <Script id="projects-itemlist-jsonld" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: projects.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: p.title,
              url: `https://digitalupstream.com${p.href}`,
              description: p.desc,
            })),
          })}
        </Script>
      </Container>
    </section>
  );
}

/** Build an SVG path string that mirrors the wobbling circle */
function buildPath(
  cx: number,
  cy: number,
  baseR: number,
  a1: number,
  a2: number,
  speed1: number,
  speed2: number,
  waves: number,
  time: number
) {
  let d = "";
  for (let i = 0; i <= waves; i++) {
    const t = (i / waves) * Math.PI * 2;
    const wobble =
      a1 * Math.sin(3 * t + time * speed1) +
      a2 * Math.sin(5 * t + time * speed2);
    const r = baseR + wobble;
    const x = cx + r * Math.cos(t);
    const y = cy + r * Math.sin(t);
    if (i === 0) d += `M ${x} ${y}`;
    else d += ` L ${x} ${y}`;
  }
  d += " Z";
  return d;
}

/** Build a path with sharp, jagged edges using triangular waves for spikes */
function buildSharpPath(
  cx: number,
  cy: number,
  baseR: number,
  a1: number,
  a2: number,
  speed1: number,
  speed2: number,
  waves: number,
  time: number
) {
  const tri = (angle: number) => (2 / Math.PI) * Math.asin(Math.sin(angle));
  const spikeAmp = 6; // outward spikes
  const spikeAmpIn = 4; // inward spikes
  const k1 = 9; // spike frequency 1
  const k2 = 13; // spike frequency 2
  const s1 = 0.004; // spike speed 1
  const s2 = 0.0032; // spike speed 2
  let d = "";
  for (let i = 0; i <= waves; i++) {
    const t = (i / waves) * Math.PI * 2;
    const ripple =
      a1 * Math.sin(3 * t + time * speed1) +
      a2 * Math.sin(5 * t + time * speed2);
    const spikesOut = spikeAmp * Math.abs(tri(k1 * t + time * s1));
    const spikesIn = -spikeAmpIn * Math.abs(tri(k2 * t + time * s2));
    const r = Math.max(6, baseR + ripple + spikesOut + spikesIn);
    const x = cx + r * Math.cos(t);
    const y = cy + r * Math.sin(t);
    if (i === 0) d += `M ${x} ${y}`;
    else d += ` L ${x} ${y}`;
  }
  d += " Z";
  return d;
}
