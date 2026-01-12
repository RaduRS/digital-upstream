import React from "react";
import { cn } from "@/lib/utils";

type AccentGlowProps = {
  className?: string;
  /** Base color class e.g. 'bg-indigo-500' */
  colorClass?: string;
  /** Size in pixels for width/height */
  size?: number;
  /** Opacity (0 to 1) */
  opacity?: number;
};

export default function AccentGlow({
  className,
  colorClass = "bg-indigo-500",
  size = 320,
  opacity = 0.12,
}: AccentGlowProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute -z-10 rounded-full blur-3xl motion-reduce:animate-none",
        "animate-pulse",
        colorClass,
        className
      )}
      style={{ width: size, height: size, opacity }}
    />
  );
}