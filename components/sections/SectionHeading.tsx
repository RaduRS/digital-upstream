import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SectionHeadingProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "right";
  subtitleAlign?: "left" | "right";
  subtitleClassName?: string;
  className?: string;
  id?: string;
  as?: "h1" | "h2" | "h3";
};

export default function SectionHeading({
  title,
  subtitle,
  align = "left",
  subtitleAlign = "left",
  subtitleClassName,
  className,
  id,
  as = "h2",
}: SectionHeadingProps) {
  const HeadingTag = as;
  return (
    <div className={cn("heading-stack", align === "right" ? "heading-right" : "heading-left", className)}>
      <HeadingTag
        id={id}
        className={cn(
          "heading-title tracking-tight text-6xl sm:text-7xl lg:text-8xl font-bold",
          align === "right" ? "text-right" : "text-left"
        )}
      >
        {title}
      </HeadingTag>
      {subtitle ? (
        <p
          className={cn(
            "heading-subtitle text-xl sm:text-2xl opacity-80",
            subtitleAlign === "right" ? "text-right" : "text-left",
            subtitleClassName
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}