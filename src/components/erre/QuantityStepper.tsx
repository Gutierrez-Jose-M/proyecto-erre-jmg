import { Minus, Plus } from "lucide-react";

import { cn } from "@/lib/utils";

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  size = "md",
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  size?: "sm" | "md";
}) {
  const btn = cn(
    "grid place-items-center rounded-full transition-colors hover:bg-accent disabled:opacity-40",
    size === "sm" ? "size-8" : "size-11",
  );
  return (
    <div className={cn("inline-flex items-center rounded-full border bg-card", size === "sm" ? "p-0.5" : "p-1")}>
      <button type="button" className={btn} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label="Restar uno">
        <Minus className="size-4" />
      </button>
      <span className={cn("text-center font-bold tabular-nums", size === "sm" ? "w-8 text-sm" : "w-12 text-lg")} aria-live="polite">
        {value}
      </span>
      <button type="button" className={btn} onClick={() => onChange(value + 1)} aria-label="Sumar uno">
        <Plus className="size-4" />
      </button>
    </div>
  );
}
