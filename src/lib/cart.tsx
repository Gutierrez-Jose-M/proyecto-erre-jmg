import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { getProduct, type Product } from "@/data/products";

export const FREE_SHIPPING_FROM = 30000;
export const SHIPPING_COST = 2500;

interface CartLine {
  slug: string;
  qty: number;
}

export interface CartItem extends CartLine {
  product: Product;
  subtotal: number;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "erre-cart";

export function shippingFor(subtotal: number) {
  if (subtotal === 0 || subtotal >= FREE_SHIPPING_FROM) return 0;
  return SHIPPING_COST;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, loaded]);

  const value = useMemo<CartContextValue>(() => {
    const items: CartItem[] = lines.flatMap((l) => {
      const product = getProduct(l.slug);
      return product ? [{ ...l, product, subtotal: product.price * l.qty }] : [];
    });
    const subtotal = items.reduce((s, i) => s + i.subtotal, 0);
    const shipping = shippingFor(subtotal);
    return {
      items,
      count: items.reduce((s, i) => s + i.qty, 0),
      subtotal,
      shipping,
      total: subtotal + shipping,
      add: (slug, qty = 1) =>
        setLines((prev) => {
          const found = prev.find((l) => l.slug === slug);
          if (found) return prev.map((l) => (l.slug === slug ? { ...l, qty: l.qty + qty } : l));
          return [...prev, { slug, qty }];
        }),
      setQty: (slug, qty) =>
        setLines((prev) =>
          qty <= 0 ? prev.filter((l) => l.slug !== slug) : prev.map((l) => (l.slug === slug ? { ...l, qty } : l)),
        ),
      remove: (slug) => setLines((prev) => prev.filter((l) => l.slug !== slug)),
      clear: () => setLines([]),
    };
  }, [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
