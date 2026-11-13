import { SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";

import { ProductCard } from "@/components/erre/ProductCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

type Sort = "relevancia" | "menor" | "mayor" | "ofertas";

function FilterGroup({
  title,
  options,
  selected,
  onToggle,
  idPrefix,
}: {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
  idPrefix: string;
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold">{title}</h3>
      <ul className="space-y-2.5">
        {options.map((opt) => {
          const id = `${idPrefix}-${opt}`;
          return (
            <li key={opt} className="flex items-center gap-2.5">
              <Checkbox id={id} checked={selected.includes(opt)} onCheckedChange={() => onToggle(opt)} />
              <Label htmlFor={id} className="cursor-pointer text-sm font-normal">
                {opt}
              </Label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function CatalogView({ items, typeLabel }: { items: Product[]; typeLabel: string }) {
  const brands = useMemo(() => [...new Set(items.map((p) => p.brand))].sort(), [items]);
  const types = useMemo(() => [...new Set(items.map((p) => p.type))].sort(), [items]);
  const maxPrice = useMemo(() => Math.ceil(Math.max(...items.map((p) => p.price)) / 500) * 500, [items]);

  const [selBrands, setSelBrands] = useState<string[]>([]);
  const [selTypes, setSelTypes] = useState<string[]>([]);
  const [price, setPrice] = useState<number>(maxPrice);
  const [onlyDeals, setOnlyDeals] = useState(false);
  const [sort, setSort] = useState<Sort>("relevancia");
  const [showFilters, setShowFilters] = useState(false);

  const toggle = (list: string[], set: (v: string[]) => void) => (value: string) =>
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  const filtered = useMemo(() => {
    const out = items.filter(
      (p) =>
        (selBrands.length === 0 || selBrands.includes(p.brand)) &&
        (selTypes.length === 0 || selTypes.includes(p.type)) &&
        p.price <= price &&
        (!onlyDeals || !!p.oldPrice),
    );
    if (sort === "menor") out.sort((a, b) => a.price - b.price);
    if (sort === "mayor") out.sort((a, b) => b.price - a.price);
    if (sort === "ofertas") out.sort((a, b) => Number(!!b.oldPrice) - Number(!!a.oldPrice));
    return out;
  }, [items, selBrands, selTypes, price, onlyDeals, sort]);

  const activeCount = selBrands.length + selTypes.length + (price < maxPrice ? 1 : 0) + (onlyDeals ? 1 : 0);
  const reset = () => {
    setSelBrands([]);
    setSelTypes([]);
    setPrice(maxPrice);
    setOnlyDeals(false);
  };

  return (
    <div className="container-erre grid gap-8 py-8 lg:grid-cols-[260px_1fr]">
      <aside className={cn("space-y-6 lg:block", showFilters ? "block" : "hidden")}>
        <div className="sticky top-44 space-y-7 rounded-2xl border bg-card p-5 shadow-card">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Filtros</h2>
            {activeCount > 0 && (
              <button onClick={reset} className="text-xs font-semibold text-primary hover:underline">
                Limpiar ({activeCount})
              </button>
            )}
          </div>

          <FilterGroup title={typeLabel} options={types} selected={selTypes} onToggle={toggle(selTypes, setSelTypes)} idPrefix="tipo" />

          <div className="space-y-3">
            <h3 className="text-sm font-bold">Precio máximo</h3>
            <Slider min={500} max={maxPrice} step={100} value={[price]} onValueChange={(v) => setPrice(v[0] ?? maxPrice)} />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatPrice(500)}</span>
              <span className="font-semibold text-foreground">{formatPrice(price)}</span>
            </div>
          </div>

          <FilterGroup title="Marca" options={brands} selected={selBrands} onToggle={toggle(selBrands, setSelBrands)} idPrefix="marca" />

          <div className="flex items-center gap-2.5 rounded-xl bg-highlight/40 p-3">
            <Checkbox id="solo-ofertas" checked={onlyDeals} onCheckedChange={(v) => setOnlyDeals(v === true)} />
            <Label htmlFor="solo-ofertas" className="cursor-pointer text-sm font-semibold">
              Solo ofertas
            </Label>
          </div>
        </div>
      </aside>

      <div>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{filtered.length}</span> productos
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="lg:hidden" onClick={() => setShowFilters((v) => !v)}>
              <SlidersHorizontal /> Filtros {activeCount > 0 && `(${activeCount})`}
            </Button>
            <label className="flex items-center gap-2 text-sm">
              <span className="hidden text-muted-foreground sm:inline">Ordenar por</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="h-9 rounded-full border bg-card px-3 text-sm font-medium outline-none focus:border-primary"
              >
                <option value="relevancia">Relevancia</option>
                <option value="menor">Menor precio</option>
                <option value="mayor">Mayor precio</option>
                <option value="ofertas">Ofertas primero</option>
              </select>
            </label>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed bg-card p-12 text-center">
            <p className="font-semibold">No hay productos con esos filtros.</p>
            <Button variant="soft" className="mt-4" onClick={reset}>
              Limpiar filtros
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
