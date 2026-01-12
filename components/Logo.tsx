import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  alt?: string;
  priority?: boolean;
}

export default function Logo({ className, alt = "Digital Upstream logo", priority = false }: LogoProps) {
  return (
    <Image
      src="/digital-upstream-logo.png"
      alt={alt}
      width={814}
      height={279}
      priority={priority}
      sizes="100vw"
      className={cn("w-full h-auto select-none", className)}
      draggable={false}
    />
  );
}