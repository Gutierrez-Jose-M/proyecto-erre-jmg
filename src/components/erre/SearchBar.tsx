import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useRef, useState } from "react";

import { products } from "@/data/products";
import { formatPrice } from "@/lib/format";

function normalize(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = normalize(query.trim());
    if (q.length < 2) return [];
    return products
      .filter((p) => normalize(`${p.name} ${p.brand} ${p.type}`).includes(q))
      .slice(0, 6);
  }, [query]);

  const goTo = (slug: string) => {
    setQuery("");
    setOpen(false);
    inputRef.current?.blur();
    navigate({ to: "/producto/$slug", params: { slug } });
  };

  return (
    <form
      role="search"
      className="relative w-full"
      onSubmit={(e) => {
        e.preventDefault();
        if (results[0]) goTo(results[0].slug);
      }}
    >
      <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
      <input
        ref={inputRef}
        type="search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        placeholder="¿Qué estás buscando hoy? Leche, yerba, detergente…"
        aria-label="Buscar productos"
        className="h-12 w-full rounded-full border-2 border-transparent bg-muted pl-12 pr-28 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:bg-card"
      />
      <button
        type="submit"
        className="absolute right-1.5 top-1/2 h-9 -translate-y-1/2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Buscar
      </button>

      {open && query.trim().length >= 2 && (
        <div className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border bg-popover shadow-lift">
          {results.length === 0 ? (
            <p className="px-5 py-4 text-sm text-muted-foreground">
              No encontramos productos para “{query}”.
            </p>
          ) : (
            <ul>
              {results.map((p) => (
                <li key={p.slug}>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => goTo(p.slug)}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-secondary"
                  >
                    <img src={p.image} alt="" className="size-11 rounded-lg bg-card object-contain" />
                    <span className="flex-1">
                      <span className="block text-sm font-medium">{p.name}</span>
                      <span className="block text-xs text-muted-foreground">
                        {p.brand} · {p.unit}
                      </span>
                    </span>
                    <span className="text-sm font-bold text-primary">{formatPrice(p.price)}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </form>
  );
}
