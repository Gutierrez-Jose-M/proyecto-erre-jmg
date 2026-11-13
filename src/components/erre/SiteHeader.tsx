import { Link } from "@tanstack/react-router";
import { Menu, ShoppingCart, Truck, User, X } from "lucide-react";
import { useState } from "react";

import { Logo } from "@/components/erre/Logo";
import { SearchBar } from "@/components/erre/SearchBar";
import { FREE_SHIPPING_FROM, useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/", label: "Inicio" },
  { to: "/comestibles", label: "Comestibles" },
  { to: "/limpieza", label: "Limpieza" },
  { to: "/servicios", label: "Servicios" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function SiteHeader() {
  const { count, subtotal } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-card/95 shadow-card backdrop-blur">
      <div className="bg-brand-deep text-brand-deep-foreground">
        <div className="container-erre flex h-9 items-center justify-center gap-2 text-xs font-medium sm:text-sm">
          <Truck className="size-4 text-primary-glow" />
          Envío gratis en compras desde {formatPrice(FREE_SHIPPING_FROM)}
        </div>
      </div>

      <div className="container-erre flex items-center gap-4 py-3 md:gap-8">
        <button
          className="grid size-10 place-items-center rounded-full hover:bg-muted lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
        <Logo />
        <div className="hidden flex-1 md:block">
          <SearchBar />
        </div>
        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <Link
            to="/login"
            className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            <User className="size-5" />
            <span className="hidden sm:inline">Mi Cuenta</span>
          </Link>
          <Link
            to="/carrito"
            className="flex items-center gap-2 rounded-full bg-secondary px-3 py-2 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-accent"
          >
            <span className="relative">
              <ShoppingCart className="size-5" />
              {count > 0 && (
                <span className="absolute -right-2 -top-2 grid min-w-5 place-items-center rounded-full bg-sale px-1 text-[0.65rem] font-bold leading-5 text-sale-foreground">
                  {count}
                </span>
              )}
            </span>
            <span className="hidden sm:inline">{count > 0 ? formatPrice(subtotal) : "Carrito"}</span>
          </Link>
        </div>
      </div>

      <div className="container-erre pb-3 md:hidden">
        <SearchBar />
      </div>

      <nav className="hidden border-t lg:block" aria-label="Principal">
        <ul className="container-erre flex h-12 items-center gap-1">
          {navLinks.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="relative rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground data-[status=active]:bg-secondary data-[status=active]:text-primary"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="ml-auto">
            <span className="rounded-full bg-highlight px-3 py-1 text-xs font-bold text-highlight-foreground">
              Ofertas de la semana
            </span>
          </li>
        </ul>
      </nav>

      <nav
        className={cn("border-t lg:hidden", mobileOpen ? "block" : "hidden")}
        aria-label="Principal móvil"
      >
        <ul className="container-erre grid gap-1 py-3">
          {navLinks.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                onClick={() => setMobileOpen(false)}
                activeOptions={{ exact: l.to === "/" }}
                className="block rounded-xl px-4 py-3 font-semibold hover:bg-secondary data-[status=active]:bg-secondary data-[status=active]:text-primary"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
