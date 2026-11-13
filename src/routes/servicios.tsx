import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Banknote,
  CalendarClock,
  CreditCard,
  Landmark,
  MapPinned,
  PackageCheck,
  RotateCcw,
  ShieldCheck,
  Smartphone,
  Truck,
  Undo2,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { PageHeader } from "@/components/erre/PageHeader";
import { Button } from "@/components/ui/button";
import { FREE_SHIPPING_FROM, SHIPPING_COST } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

export const Route = createFileRoute("/servicios")({
  head: () => ({
    meta: [
      { title: "Servicios: envíos, pagos y devoluciones | ERRE" },
      { name: "description", content: "Conocé las políticas de envío a domicilio, los medios de pago aceptados y cómo hacer cambios y devoluciones en ERRE." },
      { property: "og:title", content: "Servicios: envíos, pagos y devoluciones | ERRE" },
      { property: "og:description", content: "Envío a domicilio, medios de pago y devoluciones en ERRE Supermercado." },
    ],
  }),
  component: ServiciosPage,
});

interface Item { Icon: LucideIcon; title: string; text: string }

const shipping: Item[] = [
  { Icon: Truck, title: "Envío a domicilio", text: `Costo fijo de ${formatPrice(SHIPPING_COST)} y gratis en compras desde ${formatPrice(FREE_SHIPPING_FROM)}.` },
  { Icon: MapPinned, title: "Zonas de cobertura", text: "CABA y principales localidades de GBA Norte, Oeste y Sur." },
  { Icon: CalendarClock, title: "Franjas horarias", text: "Elegí una franja de 2 horas, de lunes a sábado de 9 a 21 h." },
  { Icon: PackageCheck, title: "Entrega en el día", text: "Los pedidos confirmados antes de las 13 h llegan ese mismo día." },
];

const payments: Item[] = [
  { Icon: CreditCard, title: "Tarjetas de crédito", text: "Visa, Mastercard y American Express. Hasta 3 cuotas sin interés." },
  { Icon: Wallet, title: "Tarjetas de débito", text: "Todas las tarjetas de débito de bancos argentinos." },
  { Icon: Landmark, title: "Transferencia", text: "Transferí a nuestro CBU y enviá el comprobante dentro de las 24 h." },
  { Icon: Smartphone, title: "Billeteras virtuales", text: "Pagá con QR desde tu billetera favorita." },
  { Icon: Banknote, title: "Efectivo", text: "Abonás al recibir el pedido en tu domicilio." },
];

const returns: Item[] = [
  { Icon: RotateCcw, title: "48 horas para devolver", text: "Si un producto llegó dañado o vencido, te lo cambiamos sin costo." },
  { Icon: Undo2, title: "Reintegro rápido", text: "Devolvemos el dinero al mismo medio de pago en hasta 5 días hábiles." },
  { Icon: ShieldCheck, title: "Garantía de frescura", text: "Si una fruta o verdura no te convence, la reponemos en tu próxima compra." },
];

function Section({ title, kicker, items }: { title: string; kicker: string; items: Item[] }) {
  return (
    <section className="py-10">
      <p className="text-sm font-bold uppercase tracking-wider text-primary">{kicker}</p>
      <h2 className="mt-1 text-3xl font-extrabold">{title}</h2>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ Icon, title: t, text }) => (
          <li key={t} className="rounded-2xl border bg-card p-6 shadow-card transition-transform hover:-translate-y-1">
            <span className="grid size-12 place-items-center rounded-xl bg-secondary text-primary">
              <Icon className="size-6" />
            </span>
            <h3 className="mt-4 font-bold">{t}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ServiciosPage() {
  return (
    <>
      <PageHeader crumb="Servicios" title="Servicios" subtitle="Todo lo que necesitás saber sobre envíos, medios de pago y devoluciones." />
      <div className="container-erre">
        <Section kicker="Llegamos a tu casa" title="Envíos a domicilio" items={shipping} />
        <Section kicker="Pagá como quieras" title="Métodos de pago" items={payments} />
        <Section kicker="Comprá tranquilo" title="Cambios y devoluciones" items={returns} />

        <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-3xl bg-promo p-8 text-primary-foreground md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-extrabold">¿Tenés otra consulta?</h2>
            <p className="opacity-90">Nuestro equipo te responde en menos de 24 horas.</p>
          </div>
          <Button variant="highlight" size="lg" asChild>
            <Link to="/contacto">Escribinos</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
