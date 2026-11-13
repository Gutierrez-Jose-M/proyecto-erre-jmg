import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Coffee,
  ShieldCheck,
  Shirt,
  SprayCan,
  Truck,
  Wheat,
  Clock,
  BadgePercent,
  Sparkles,
} from "lucide-react";

import heroImg from "@/assets/hero-erre.jpg";
import { ProductCard } from "@/components/erre/ProductCard";
import { Button } from "@/components/ui/button";
import { getFeatured } from "@/data/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ERRE Supermercado | Comestibles y limpieza a domicilio" },
      { name: "description", content: "Ofertas semanales en almacén, lácteos, frutas y artículos de limpieza. Comprá online en ERRE y recibí en tu casa." },
      { property: "og:title", content: "ERRE Supermercado | Comestibles y limpieza a domicilio" },
      { property: "og:description", content: "Ofertas semanales en almacén, lácteos, frutas y artículos de limpieza con envío a domicilio." },
    ],
  }),
  component: Index,
});

const categories = [
  { label: "Almacén", Icon: Wheat, to: "/comestibles" },
  { label: "Desayuno", Icon: Coffee, to: "/comestibles" },
  { label: "Limpieza", Icon: SprayCan, to: "/limpieza" },
  { label: "Lavado", Icon: Shirt, to: "/limpieza" },
  { label: "Higiene", Icon: Sparkles, to: "/limpieza" },
] as const;

const perks = [
  { Icon: Truck, title: "Envío en el día", text: "Pedí antes de las 13 h" },
  { Icon: BadgePercent, title: "Ofertas semanales", text: "Hasta 20% off" },
  { Icon: ShieldCheck, title: "Compra segura", text: "Pagos protegidos" },
  { Icon: Clock, title: "Elegí tu horario", text: "Franjas de 2 horas" },
];

function Index() {
  const featured = getFeatured();
  const food = featured.filter((p) => p.category === "comestibles");
  const cleaning = featured.filter((p) => p.category === "limpieza");

  return (
    <>
      {/* Hero de ofertas */}
      <section className="container-erre pt-6">
        <div className="relative overflow-hidden rounded-3xl bg-secondary">
          <img
            src={heroImg}
            alt="Canasta con frutas, verduras, pan, leche y productos de limpieza"
            width={1920}
            height={800}
            className="absolute inset-0 size-full object-cover object-right"
          />
          <div className="absolute inset-0 bg-hero-fade" />
          <div className="relative max-w-xl px-6 py-14 sm:px-12 md:py-24">
            <span className="animate-fade-up inline-flex items-center gap-2 rounded-full bg-highlight px-3 py-1 text-xs font-bold uppercase tracking-wider text-highlight-foreground">
              <BadgePercent className="size-3.5" /> Semana del ahorro
            </span>
            <h1 className="animate-fade-up mt-4 text-4xl font-extrabold leading-[1.05] text-brand-deep sm:text-5xl md:text-6xl [animation-delay:80ms]">
              Lo fresco de siempre, <span className="text-primary">hasta 20% off</span>
            </h1>
            <p className="animate-fade-up mt-4 max-w-md text-base text-brand-deep/80 sm:text-lg [animation-delay:160ms]">
              Llenamos tu heladera y tu alacena sin que salgas de casa. Envío gratis desde $30.000.
            </p>
            <div className="animate-fade-up mt-7 flex flex-wrap gap-3 [animation-delay:240ms]">
              <Button size="lg" asChild>
                <Link to="/comestibles">
                  Ver comestibles <ArrowRight />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/limpieza">Ofertas en limpieza</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="container-erre mt-6">
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {perks.map(({ Icon, title, text }) => (
            <li key={title} className="flex items-center gap-3 rounded-2xl border bg-card p-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
                <Icon className="size-5" />
              </span>
              <span>
                <span className="block text-sm font-bold">{title}</span>
                <span className="block text-xs text-muted-foreground">{text}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Categorías destacadas */}
      <section className="container-erre mt-14">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-extrabold md:text-3xl">Categorías destacadas</h2>
        </div>
        <ul className="flex flex-wrap justify-center gap-3">
          {categories.map(({ label, Icon, to }) => (
            <li key={label} className="w-[calc(25%-0.5625rem)] md:w-[calc(20%-0.6rem)]">
              <Link
                to={to}
                className="group flex flex-col items-center gap-2 rounded-2xl p-2 text-center transition-colors hover:bg-secondary"
              >
                <span className="grid size-16 place-items-center rounded-full bg-secondary text-primary transition-all group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground md:size-20">
                  <Icon className="size-7 md:size-8" />
                </span>
                <span className="text-xs font-semibold leading-tight md:text-sm">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Productos destacados */}
      <section className="container-erre mt-14">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-primary">Almacén y frescos</p>
            <h2 className="text-2xl font-extrabold md:text-3xl">Comestibles destacados</h2>
          </div>
          <Link to="/comestibles" className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
            Ver todos <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {food.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* Banner promo intermedio */}
      <section className="container-erre mt-14">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col justify-between gap-6 rounded-3xl bg-promo p-8 text-primary-foreground">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider opacity-80">Solo online</p>
              <h3 className="mt-2 text-3xl font-extrabold">2x1 en lácteos seleccionados</h3>
              <p className="mt-2 opacity-90">Todos los miércoles, en leches, yogures y quesos.</p>
            </div>
            <Button variant="highlight" className="self-start" asChild>
              <Link to="/comestibles">Aprovechar</Link>
            </Button>
          </div>
          <div className="flex flex-col justify-between gap-6 rounded-3xl bg-deal p-8 text-highlight-foreground">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider opacity-80">Hogar impecable</p>
              <h3 className="mt-2 text-3xl font-extrabold">3x2 en limpieza de la casa</h3>
              <p className="mt-2 opacity-90">Detergentes, lavandinas y limpiadores de pisos.</p>
            </div>
            <Button variant="deep" className="self-start" asChild>
              <Link to="/limpieza">Ver productos</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container-erre mt-14">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-primary">Hogar y cuidado</p>
            <h2 className="text-2xl font-extrabold md:text-3xl">Limpieza destacada</h2>
          </div>
          <Link to="/limpieza" className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
            Ver todos <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {cleaning.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
