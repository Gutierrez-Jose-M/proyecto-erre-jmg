import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShoppingBasket, Trash2 } from "lucide-react";

import { OrderSummary } from "@/components/erre/OrderSummary";
import { PageHeader } from "@/components/erre/PageHeader";
import { QuantityStepper } from "@/components/erre/QuantityStepper";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

export const Route = createFileRoute("/carrito")({
  head: () => ({
    meta: [
      { title: "Mi Carrito | ERRE Supermercado" },
      { name: "description", content: "Revisá los productos de tu carrito, ajustá cantidades y finalizá tu compra en ERRE." },
      { property: "og:title", content: "Mi Carrito | ERRE Supermercado" },
      { property: "og:description", content: "Revisá tu carrito y finalizá tu compra en ERRE." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove, clear } = useCart();

  return (
    <>
      <PageHeader crumb="Carrito" title="Carrito de compras" />
      <div className="container-erre py-8">
        {items.length === 0 ? (
          <div className="mx-auto max-w-md rounded-3xl border border-dashed bg-card p-12 text-center">
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-secondary text-primary">
              <ShoppingBasket className="size-8" />
            </span>
            <h2 className="mt-5 text-xl font-bold">Tu carrito está vacío</h2>
            <p className="mt-2 text-sm text-muted-foreground">Sumá productos de nuestros catálogos para empezar.</p>
            <div className="mt-6 flex justify-center gap-3">
              <Button asChild><Link to="/comestibles">Comestibles</Link></Button>
              <Button variant="soft" asChild><Link to="/limpieza">Limpieza</Link></Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="overflow-hidden rounded-3xl border bg-card shadow-card">
              <div className="hidden grid-cols-[1fr_120px_140px_110px_40px] gap-4 border-b bg-muted px-6 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground md:grid">
                <span>Producto</span>
                <span className="text-right">Precio unit.</span>
                <span className="text-center">Cantidad</span>
                <span className="text-right">Subtotal</span>
                <span />
              </div>
              <ul className="divide-y">
                {items.map((i) => (
                  <li key={i.slug} className="grid grid-cols-[64px_1fr] items-center gap-4 px-4 py-4 md:grid-cols-[1fr_120px_140px_110px_40px] md:px-6">
                    <div className="contents md:flex md:items-center md:gap-4">
                      <img src={i.product.image} alt="" className="size-16 rounded-xl border bg-card object-contain p-1" />
                      <div>
                        <Link to="/producto/$slug" params={{ slug: i.slug }} className="font-semibold leading-tight hover:text-primary">
                          {i.product.name}
                        </Link>
                        <p className="text-xs text-muted-foreground">{i.product.brand} · {i.product.unit}</p>
                        <p className="mt-1 text-xs text-muted-foreground md:hidden">{formatPrice(i.product.price)} c/u</p>
                      </div>
                    </div>
                    <span className="hidden text-right text-sm md:block">{formatPrice(i.product.price)}</span>
                    <div className="col-span-2 flex items-center justify-between gap-3 md:col-span-1 md:justify-center">
                      <QuantityStepper size="sm" value={i.qty} min={0} onChange={(v) => setQty(i.slug, v)} />
                      <span className="font-bold md:hidden">{formatPrice(i.subtotal)}</span>
                      <button onClick={() => remove(i.slug)} className="text-muted-foreground hover:text-destructive md:hidden" aria-label={`Quitar ${i.product.name}`}>
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                    <span className="hidden text-right font-bold md:block">{formatPrice(i.subtotal)}</span>
                    <button onClick={() => remove(i.slug)} className="hidden size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive md:grid" aria-label={`Quitar ${i.product.name}`}>
                      <Trash2 className="size-4" />
                    </button>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t px-6 py-4">
                <Link to="/comestibles" className="text-sm font-semibold text-primary hover:underline">← Seguir comprando</Link>
                <button onClick={clear} className="text-sm font-medium text-muted-foreground hover:text-destructive">Vaciar carrito</button>
              </div>
            </div>

            <OrderSummary>
              <Button size="xl" className="w-full" asChild>
                <Link to="/checkout">Ir a Pagar <ArrowRight /></Link>
              </Button>
            </OrderSummary>
          </div>
        )}
      </div>
    </>
  );
}
