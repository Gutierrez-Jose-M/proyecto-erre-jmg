import type { ReactNode } from "react";

import { FREE_SHIPPING_FROM, useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

export function OrderSummary({ children, showItems = false }: { children?: ReactNode; showItems?: boolean }) {
  const { items, subtotal, shipping, total, count } = useCart();
  const missing = FREE_SHIPPING_FROM - subtotal;

  return (
    <aside className="h-fit rounded-3xl border bg-card p-6 shadow-card lg:sticky lg:top-44">
      <h2 className="text-xl font-bold">Resumen de la orden</h2>

      {showItems && (
        <ul className="mt-5 max-h-72 space-y-3 overflow-auto pr-1">
          {items.map((i) => (
            <li key={i.slug} className="flex items-center gap-3">
              <span className="relative">
                <img src={i.product.image} alt="" className="size-14 rounded-xl border bg-card object-contain p-1" />
                <span className="absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-primary text-[0.65rem] font-bold text-primary-foreground">
                  {i.qty}
                </span>
              </span>
              <span className="flex-1 text-sm font-medium leading-tight">{i.product.name}</span>
              <span className="text-sm font-semibold">{formatPrice(i.subtotal)}</span>
            </li>
          ))}
        </ul>
      )}

      <dl className="mt-5 space-y-3 border-t pt-5 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Subtotal ({count} {count === 1 ? "producto" : "productos"})</dt>
          <dd className="font-semibold">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Envío</dt>
          <dd className="font-semibold">{shipping === 0 ? <span className="text-primary">Gratis</span> : formatPrice(shipping)}</dd>
        </div>
        {subtotal > 0 && missing > 0 && (
          <p className="rounded-xl bg-highlight/40 px-3 py-2 text-xs font-medium text-highlight-foreground">
            Te faltan {formatPrice(missing)} para tener envío gratis.
          </p>
        )}
        <div className="flex items-end justify-between border-t pt-4">
          <dt className="text-base font-bold">Total</dt>
          <dd className="font-display text-3xl font-extrabold text-primary">{formatPrice(total)}</dd>
        </div>
      </dl>
      {children && <div className="mt-6">{children}</div>}
    </aside>
  );
}
