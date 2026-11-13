import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { discountPercent, type Product } from "@/data/products";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const off = discountPercent(product);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift">
      {off > 0 && (
        <Badge variant="sale" className="absolute left-3 top-3 z-10 rounded-full">
          -{off}%
        </Badge>
      )}
      <Link
        to="/producto/$slug"
        params={{ slug: product.slug }}
        className="block aspect-square overflow-hidden bg-card p-4"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={512}
          height={512}
          className="size-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-1 border-t px-4 pb-4 pt-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {product.brand}
        </span>
        <Link
          to="/producto/$slug"
          params={{ slug: product.slug }}
          className="line-clamp-2 min-h-10 text-sm font-semibold leading-snug hover:text-primary"
        >
          {product.name}
        </Link>
        <span className="text-xs text-muted-foreground">{product.unit}</span>
        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <div className="flex min-h-12 flex-col justify-end">
            {product.oldPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
            <span className="font-display text-xl font-bold text-foreground">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>
        <Button
          className="mt-3 w-full"
          onClick={() => {
            add(product.slug);
            toast.success("Agregado al carrito", { description: product.name });
          }}
        >
          <Plus /> Agregar al carrito
        </Button>
      </div>
    </article>
  );
}
