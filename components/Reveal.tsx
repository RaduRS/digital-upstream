"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Delay in ms to stagger animations */
  delay?: number;
  /** Trigger only once when element first becomes visible */
  once?: boolean;
  /** IntersectionObserver threshold */
  threshold?: number;
  /** Transition duration in ms */
  duration?: number;
  /** Transition timing function (CSS easing) */
  easing?: string;
  /** Multiply incoming delay to emphasize staggering */
  staggerFactor?: number;
};

export default function Reveal({
  children,
  className,
  delay = 0,
  once = true,
  threshold = 0.35,
  duration = 1100,
  easing = "cubic-bezier(0.16, 1, 0.3, 1)",
  staggerFactor = 1.6,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, threshold]);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${Math.round(delay * staggerFactor)}ms`,
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: easing,
      }}
      className={cn(
        "will-change-transform transition-opacity transition-transform motion-reduce:transition-none",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12 sm:translate-y-16",
        // Prefer reduced motion: show content immediately without transforms
        "motion-reduce:opacity-100 motion-reduce:translate-y-0",
        className
      )}
    >
      {children}
    </div>
  );
}