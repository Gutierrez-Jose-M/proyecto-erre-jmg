import { describe, expect, it } from "vitest";

import { FREE_SHIPPING_FROM, SHIPPING_COST, shippingFor } from "@/lib/cart";

describe("Costo de envío", () => {
  it("cobra el envío fijo por debajo del mínimo", () => {
    expect(shippingFor(FREE_SHIPPING_FROM - 1)).toBe(SHIPPING_COST);
  });

  it("es gratis desde el monto mínimo", () => {
    expect(shippingFor(FREE_SHIPPING_FROM)).toBe(0);
  });

  it("no cobra envío con el carrito vacío", () => {
    expect(shippingFor(0)).toBe(0);
  });
});
