import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronRight, RotateCcw, ShieldCheck, ShoppingCart, Truck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { ProductCard } from "@/components/erre/ProductCard";
import { QuantityStepper } from "@/components/erre/QuantityStepper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { discountPercent, getProduct, products } from "@/data/products";
import { FREE_SHIPPING_FROM, useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

export const Route = createFileRoute("/producto/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Producto no disponible | ERRE" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.product;
    const title = `${p.name} ${p.unit} – ${p.brand} | ERRE`;
    const desc = `${p.name} ${p.brand} a ${formatPrice(p.price)}. ${p.description.slice(0, 110)}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-erre py-24 text-center">
      <h1 className="text-3xl font-extrabold">Producto no encontrado</h1>
      <p className="mt-2 text-muted-foreground">Puede que ya no esté disponible.</p>
      <Button className="mt-6" asChild>
        <Link to="/">Volver al inicio</Link>
      </Button>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const off = discountPercent(product);
  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4);
  const catalogTo = product.category === "comestibles" ? "/comestibles" : "/limpieza";
  const catalogLabel = product.category === "comestibles" ? "Comestibles" : "Limpieza";

  return (
    <div className="container-erre py-8">
      <nav aria-label="Ruta" className="mb-6 flex flex-wrap items-center gap-1 text-xs font-medium text-muted-foreground">
        <Link to="/" className="hover:text-primary">Inicio</Link>
        <ChevronRight className="size-3" />
        <Link to={catalogTo} className="hover:text-primary">{catalogLabel}</Link>
        <ChevronRight className="size-3" />
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-3xl border bg-card p-8 shadow-card">
          {off > 0 && (
            <Badge variant="sale" className="absolute left-5 top-5 rounded-full px-3 py-1 text-sm">
              -{off}% OFF
            </Badge>
          )}
          <img src={product.image} alt={product.name} width={512} height={512} className="mx-auto aspect-square w-full max-w-lg object-contain" />
        </div>

        <div className="flex flex-col">
          <Badge variant="soft" className="self-start rounded-full">{product.type}</Badge>
          <h1 className="mt-3 text-3xl font-extrabold md:text-4xl">{product.name}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Marca: <span className="font-semibold text-foreground">{product.brand}</span> · {product.unit}
          </p>

          <div className="mt-6 flex items-end gap-3">
            <span className="font-display text-4xl font-extrabold text-primary">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="pb-1 text-lg text-muted-foreground line-through">{formatPrice(product.oldPrice)}</span>
            )}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Precio final con IVA incluido.</p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <QuantityStepper value={qty} onChange={setQty} />
            <Button
              size="xl"
              className="flex-1 basis-60"
              onClick={() => {
                add(product.slug, qty);
                toast.success(`${qty} × ${product.name}`, { description: "Agregado al carrito" });
                setQty(1);
              }}
            >
              <ShoppingCart /> Agregar al carrito · {formatPrice(product.price * qty)}
            </Button>
          </div>

          <ul className="mt-8 grid gap-3 rounded-2xl bg-secondary/60 p-5 text-sm">
            <li className="flex items-center gap-3"><Truck className="size-5 text-primary" /> Envío gratis desde {formatPrice(FREE_SHIPPING_FROM)}</li>
            <li className="flex items-center gap-3"><RotateCcw className="size-5 text-primary" /> Devolución sin cargo dentro de las 48 h</li>
            <li className="flex items-center gap-3"><ShieldCheck className="size-5 text-primary" /> Compra 100% protegida</li>
          </ul>

          <Tabs defaultValue="descripcion" className="mt-8">
            <TabsList>
              <TabsTrigger value="descripcion">Descripción</TabsTrigger>
              <TabsTrigger value="detalles">Detalles</TabsTrigger>
              <TabsTrigger value="envio">Envío</TabsTrigger>
            </TabsList>
            <TabsContent value="descripcion" className="pt-3 leading-relaxed text-muted-foreground">
              {product.description}
            </TabsContent>
            <TabsContent value="detalles" className="pt-3">
              <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
                <dt className="text-muted-foreground">Marca</dt><dd className="font-medium">{product.brand}</dd>
                <dt className="text-muted-foreground">Contenido</dt><dd className="font-medium">{product.unit}</dd>
                <dt className="text-muted-foreground">Categoría</dt><dd className="font-medium">{catalogLabel} › {product.type}</dd>
                <dt className="text-muted-foreground">Código</dt><dd className="font-medium uppercase">ERRE-{product.slug.slice(0, 6)}</dd>
              </dl>
            </TabsContent>
            <TabsContent value="envio" className="pt-3 text-sm leading-relaxed text-muted-foreground">
              Entregamos en CABA y GBA en franjas horarias de 2 horas. Pedidos confirmados antes de las 13 h
              llegan en el día. <Link to="/servicios" className="font-semibold text-primary hover:underline">Ver políticas de envío</Link>.
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="mb-6 text-2xl font-extrabold">También te puede interesar</h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
