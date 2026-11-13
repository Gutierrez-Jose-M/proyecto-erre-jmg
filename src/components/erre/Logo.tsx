import { Link } from "@tanstack/react-router";

import { cn } from "@/lib/utils";

export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <Link to="/" className={cn("group inline-flex items-center gap-2", className)} aria-label="ERRE, ir al inicio">
      <span
        className={cn(
          "grid size-10 place-items-center rounded-2xl font-display text-2xl font-extrabold transition-transform group-hover:-rotate-6",
          inverted ? "bg-primary-glow text-brand-deep" : "bg-primary text-primary-foreground",
        )}
      >
        R
      </span>
      <span
        className={cn(
          "font-display text-2xl font-extrabold tracking-tight",
          inverted ? "text-brand-deep-foreground" : "text-foreground",
        )}
      >
        ERRE
      </span>
    </Link>
  );
}
