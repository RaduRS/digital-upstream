import { cn } from "@/lib/utils";
import type { ComponentType } from "react";

type DGLabelProps = {
  Icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  label: string;
  className?: string;
};

export default function DGLabel({ Icon, label, className }: DGLabelProps) {
  return (
    <div aria-hidden={true} className={cn("mb-24 w-full flex items-center justify-end gap-2", className)}>
      <Icon className="h-5 w-5" aria-hidden={true} />
      <span className="text-sm tracking-wide">{label}</span>
    </div>
  );
}