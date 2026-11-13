import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

export function PageHeader({
  title,
  subtitle,
  crumb,
  children,
}: {
  title: string;
  subtitle?: string;
  crumb: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b bg-secondary/60">
      <div className="container-erre py-8 md:py-10">
        <nav aria-label="Ruta" className="mb-3 flex items-center gap-1 text-xs font-medium text-muted-foreground">
          <Link to="/" className="hover:text-primary">Inicio</Link>
          <ChevronRight className="size-3" />
          <span className="text-foreground">{crumb}</span>
        </nav>
        <h1 className="text-3xl font-extrabold md:text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 max-w-2xl text-muted-foreground">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
