import { createFileRoute, Link } from "@tanstack/react-router";
import { Banknote, Check, CreditCard, Landmark, Lock, PartyPopper } from "lucide-react";
import { useState, type FormEvent } from "react";

import { OrderSummary } from "@/components/erre/OrderSummary";
import { PageHeader } from "@/components/erre/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Finalizar compra | ERRE Supermercado" },
      { name: "description", content: "Completá tus datos de envío y pago para recibir tu pedido de ERRE." },
      { property: "og:title", content: "Finalizar compra | ERRE Supermercado" },
      { property: "og:description", content: "Datos de envío y pago para tu pedido de ERRE." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

const steps = ["Datos de Envío", "Datos de Pago"];

function Field({ id, label, className, ...props }: React.ComponentProps<typeof Input> & { id: string; label: string }) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} name={id} className="h-11 rounded-xl" required {...props} />
    </div>
  );
}

function CheckoutPage() {
  const { items, total, clear } = useCart();
  const [step, setStep] = useState(0);
  const [method, setMethod] = useState("tarjeta");
  const [orderId, setOrderId] = useState<string | null>(null);
  const [paidTotal, setPaidTotal] = useState(0);

  const nextStep = (e: FormEvent) => {
    e.preventDefault();
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pay = (e: FormEvent) => {
    e.preventDefault();
    setPaidTotal(total);
    setOrderId(`ER-${Math.floor(10000 + Math.random() * 89999)}`);
    clear();
  };

  if (orderId) {
    return (
      <div className="container-erre py-20">
        <div className="mx-auto max-w-lg rounded-3xl border bg-card p-10 text-center shadow-lift">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-primary text-primary-foreground">
            <PartyPopper className="size-8" />
          </span>
          <h1 className="mt-5 text-3xl font-extrabold">¡Gracias por tu compra!</h1>
          <p className="mt-2 text-muted-foreground">
            Tu pedido <span className="font-bold text-foreground">{orderId}</span> por {formatPrice(paidTotal)} fue
            confirmado. Te avisaremos cuando salga para tu domicilio.
          </p>
          <div className="mt-7 flex justify-center gap-3">
            <Button asChild><Link to="/perfil">Ver mis pedidos</Link></Button>
            <Button variant="soft" asChild><Link to="/">Volver al inicio</Link></Button>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-erre py-24 text-center">
        <h1 className="text-3xl font-extrabold">No hay productos para pagar</h1>
        <p className="mt-2 text-muted-foreground">Agregá productos al carrito antes de finalizar la compra.</p>
        <Button className="mt-6" asChild><Link to="/comestibles">Ir a comprar</Link></Button>
      </div>
    );
  }

  return (
    <>
      <PageHeader crumb="Checkout" title="Finalizar compra">
        <ol className="mt-6 flex items-center gap-3">
          {steps.map((s, i) => (
            <li key={s} className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => i < step && setStep(i)}
                className={cn(
                  "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  i === step ? "bg-primary text-primary-foreground" : i < step ? "bg-card text-primary" : "bg-card text-muted-foreground",
                )}
              >
                <span className={cn("grid size-6 place-items-center rounded-full text-xs", i === step ? "bg-primary-foreground text-primary" : "bg-secondary")}>
                  {i < step ? <Check className="size-3.5" /> : i + 1}
                </span>
                {s}
              </button>
              {i < steps.length - 1 && <span className="h-px w-8 bg-border" />}
            </li>
          ))}
        </ol>
      </PageHeader>

      <div className="container-erre grid gap-8 py-8 lg:grid-cols-[1fr_380px]">
        <div className="rounded-3xl border bg-card p-6 shadow-card md:p-8">
          {step === 0 ? (
            <form onSubmit={nextStep} className="space-y-6">
              <h2 className="text-xl font-bold">1. ¿Dónde te lo llevamos?</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="nombre" label="Nombre" autoComplete="given-name" />
                <Field id="apellido" label="Apellido" autoComplete="family-name" />
                <Field id="email" label="Email" type="email" autoComplete="email" />
                <Field id="telefono" label="Teléfono" type="tel" autoComplete="tel" />
                <Field id="direccion" label="Calle y número" className="sm:col-span-2" autoComplete="street-address" />
                <Field id="piso" label="Piso / Depto (opcional)" required={false} />
                <Field id="cp" label="Código postal" inputMode="numeric" autoComplete="postal-code" />
                <Field id="localidad" label="Localidad" className="sm:col-span-2" autoComplete="address-level2" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="franja">Franja horaria de entrega</Label>
                <select id="franja" className="h-11 w-full rounded-xl border border-input bg-card px-3 text-sm outline-none focus:border-primary">
                  <option>Hoy · 16 a 18 h</option>
                  <option>Hoy · 18 a 20 h</option>
                  <option>Mañana · 9 a 11 h</option>
                  <option>Mañana · 11 a 13 h</option>
                </select>
              </div>
              <Button type="submit" size="xl" className="w-full sm:w-auto">Continuar al pago</Button>
            </form>
          ) : (
            <form onSubmit={pay} className="space-y-6">
              <h2 className="text-xl font-bold">2. ¿Cómo querés pagar?</h2>
              <RadioGroup value={method} onValueChange={setMethod} className="grid gap-3 sm:grid-cols-3">
                {[
                  { v: "tarjeta", label: "Tarjeta", Icon: CreditCard },
                  { v: "transferencia", label: "Transferencia", Icon: Landmark },
                  { v: "efectivo", label: "Efectivo al recibir", Icon: Banknote },
                ].map(({ v, label, Icon }) => (
                  <Label
                    key={v}
                    htmlFor={`m-${v}`}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-2xl border-2 p-4 transition-colors",
                      method === v ? "border-primary bg-secondary" : "border-border hover:border-primary/40",
                    )}
                  >
                    <RadioGroupItem value={v} id={`m-${v}`} />
                    <Icon className="size-5 text-primary" />
                    <span className="text-sm font-semibold">{label}</span>
                  </Label>
                ))}
              </RadioGroup>

              {method === "tarjeta" && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="titular" label="Nombre del titular" className="sm:col-span-2" autoComplete="cc-name" />
                  <Field id="numero" label="Número de tarjeta" className="sm:col-span-2" inputMode="numeric" placeholder="0000 0000 0000 0000" autoComplete="cc-number" />
                  <Field id="vencimiento" label="Vencimiento" placeholder="MM/AA" autoComplete="cc-exp" />
                  <Field id="cvv" label="Código de seguridad" inputMode="numeric" placeholder="123" autoComplete="cc-csc" />
                </div>
              )}
              {method === "transferencia" && (
                <div className="rounded-2xl bg-secondary/60 p-5 text-sm leading-relaxed">
                  Al confirmar te mostraremos el CBU/alias de ERRE. Tenés 24 h para enviar el comprobante.
                </div>
              )}
              {method === "efectivo" && (
                <div className="rounded-2xl bg-secondary/60 p-5 text-sm leading-relaxed">
                  Pagás al repartidor cuando recibís el pedido. Te recomendamos tener el importe justo.
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3">
                <Button type="button" variant="outline" size="lg" onClick={() => setStep(0)}>Volver</Button>
                <Button type="submit" size="xl" className="flex-1 sm:flex-none">
                  <Lock /> Confirmar y pagar {formatPrice(total)}
                </Button>
              </div>
            </form>
          )}
        </div>

        <OrderSummary showItems />
      </div>
    </>
  );
}
