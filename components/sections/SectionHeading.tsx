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
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "right" ? "items-end text-right" : "items-start text-left",
        className,
      )}
    >
      <HeadingTag
        id={id}
        className={cn(
          "display text-foreground",
          align === "right" ? "text-right" : "text-left",
        )}
        style={{ fontSize: "clamp(2.5rem, 6.4vw, 5.5rem)" }}
      >
        {title}
      </HeadingTag>
      {subtitle ? (
        <p
          className={cn(
            "lede max-w-2xl",
            subtitleAlign === "right" ? "text-right ml-auto" : "text-left",
            subtitleClassName,
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
