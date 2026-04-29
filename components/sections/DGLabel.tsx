import { cn } from "@/lib/utils";
import type { ComponentType } from "react";

type DGLabelProps = {
  Icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  label: string;
  className?: string;
};

export default function DGLabel({ Icon, label, className }: DGLabelProps) {
  return (
    <div
      aria-hidden={true}
      className={cn(
        "mb-12 sm:mb-16 w-full flex items-center justify-end gap-3 small-caps text-foreground/55",
        className,
      )}
    >
      <span className="hairline max-w-[3rem] text-foreground/40" />
      <Icon className="h-3.5 w-3.5" aria-hidden={true} />
      <span>{label}</span>
    </div>
  );
}
