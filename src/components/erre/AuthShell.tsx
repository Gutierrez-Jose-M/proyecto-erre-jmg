import type { ReactNode } from "react";

import { Logo } from "@/components/erre/Logo";

export function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <div className="relative flex min-h-[calc(100vh-12rem)] items-center justify-center overflow-hidden bg-secondary/50 px-4 py-14">
      <div className="pointer-events-none absolute -left-24 -top-24 size-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 size-80 rounded-full bg-highlight/40 blur-3xl" />
      <div className="relative w-full max-w-md animate-fade-up rounded-3xl border bg-card p-8 shadow-lift">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>
        <h1 className="text-center text-2xl font-extrabold">{title}</h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">{subtitle}</p>
        <div className="mt-7">{children}</div>
      </div>
    </div>
  );
}
