import { Link } from "@tanstack/react-router";
import { CreditCard, Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";

import { Logo } from "@/components/erre/Logo";

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-brand-deep text-brand-deep-foreground">
      <div className="container-erre grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo inverted />
          <p className="max-w-xs text-sm text-brand-deep-foreground/70">
            Tu supermercado de barrio, ahora online. Comestibles frescos y artículos de limpieza con
            entrega a domicilio.
          </p>
          <div className="flex gap-2">
            {[
              { Icon: Facebook, label: "Facebook" },
              { Icon: Instagram, label: "Instagram" },
              { Icon: Twitter, label: "X (Twitter)" },
              { Icon: Youtube, label: "YouTube" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid size-10 place-items-center rounded-full bg-brand-deep-foreground/10 transition-colors hover:bg-primary-glow hover:text-brand-deep"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-base font-bold">Comprá</h3>
          <ul className="space-y-2.5 text-sm text-brand-deep-foreground/75">
            <li><Link to="/comestibles" className="hover:text-primary-glow">Comestibles</Link></li>
            <li><Link to="/limpieza" className="hover:text-primary-glow">Limpieza</Link></li>
            <li><Link to="/carrito" className="hover:text-primary-glow">Mi carrito</Link></li>
            <li><Link to="/perfil" className="hover:text-primary-glow">Mis pedidos</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-base font-bold">Ayuda</h3>
          <ul className="space-y-2.5 text-sm text-brand-deep-foreground/75">
            <li><Link to="/servicios" className="hover:text-primary-glow">Envíos y devoluciones</Link></li>
            <li><Link to="/servicios" className="hover:text-primary-glow">Medios de pago</Link></li>
            <li><Link to="/nosotros" className="hover:text-primary-glow">Quiénes somos</Link></li>
            <li><Link to="/contacto" className="hover:text-primary-glow">Contacto</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-base font-bold">Contacto</h3>
          <ul className="space-y-3 text-sm text-brand-deep-foreground/75">
            <li className="flex gap-2"><MapPin className="size-4 shrink-0 text-primary-glow" /> Av. Corrientes 1234, CABA</li>
            <li className="flex gap-2"><Phone className="size-4 shrink-0 text-primary-glow" /> 0800-555-3773</li>
            <li className="flex gap-2"><Mail className="size-4 shrink-0 text-primary-glow" /> hola@erre.com.ar</li>
            <li className="flex gap-2"><CreditCard className="size-4 shrink-0 text-primary-glow" /> Débito, crédito y transferencia</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-brand-deep-foreground/10">
        <div className="container-erre flex flex-col items-center justify-between gap-2 py-5 text-xs text-brand-deep-foreground/60 sm:flex-row">
          <p>© {new Date().getFullYear()} ERRE Supermercado. Todos los derechos reservados.</p>
          <p>Precios válidos para compras online. Imágenes ilustrativas.</p>
        </div>
      </div>
    </footer>
  );
}
