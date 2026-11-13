import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LogOut, Package, UserRound } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { PageHeader } from "@/components/erre/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/perfil")({
  head: () => ({
    meta: [
      { title: "Mi Perfil | ERRE Supermercado" },
      { name: "description", content: "Consultá tus datos personales y el historial de pedidos de tu cuenta ERRE." },
      { property: "og:title", content: "Mi Perfil | ERRE Supermercado" },
      { property: "og:description", content: "Tus datos y pedidos en ERRE." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PerfilPage,
});

type Status = "Entregado" | "En camino" | "Preparando" | "Cancelado";

const orders: { id: string; date: string; status: Status; items: number; total: number }[] = [
  { id: "ER-48213", date: "10/11/2026", status: "En camino", items: 14, total: 38450 },
  { id: "ER-47790", date: "02/11/2026", status: "Entregado", items: 9, total: 21980 },
  { id: "ER-46521", date: "24/10/2026", status: "Entregado", items: 22, total: 54320 },
  { id: "ER-45108", date: "15/10/2026", status: "Cancelado", items: 3, total: 6870 },
  { id: "ER-44377", date: "03/10/2026", status: "Entregado", items: 17, total: 41290 },
  { id: "ER-43012", date: "21/09/2026", status: "Entregado", items: 11, total: 27650 },
];

const statusVariant: Record<Status, "soft" | "highlight" | "sale" | "outline"> = {
  Entregado: "soft",
  "En camino": "highlight",
  Preparando: "outline",
  Cancelado: "sale",
};

type Tab = "pedidos" | "datos";

function PerfilPage() {
  const [tab, setTab] = useState<Tab>("pedidos");
  const navigate = useNavigate();

  const menu = [
    { key: "datos" as const, label: "Mis Datos", Icon: UserRound },
    { key: "pedidos" as const, label: "Mis Pedidos", Icon: Package },
  ];

  return (
    <>
      <PageHeader crumb="Mi Perfil" title="Hola, Lucía 👋" subtitle="Gestioná tu cuenta y revisá tus compras." />
      <div className="container-erre grid gap-8 py-8 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit rounded-3xl border bg-card p-4 shadow-card">
          <div className="mb-4 flex items-center gap-3 border-b px-2 pb-4">
            <span className="grid size-12 place-items-center rounded-full bg-primary font-display text-lg font-bold text-primary-foreground">LG</span>
            <div>
              <p className="font-bold leading-tight">Lucía Gómez</p>
              <p className="text-xs text-muted-foreground">lucia.gomez@email.com</p>
            </div>
          </div>
          <nav className="grid gap-1">
            {menu.map(({ key, label, Icon }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition-colors",
                  tab === key ? "bg-secondary text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Icon className="size-4" /> {label}
              </button>
            ))}
            <button
              onClick={() => {
                toast("Cerraste sesión", { description: "¡Te esperamos pronto!" });
                navigate({ to: "/login" });
              }}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-destructive transition-colors hover:bg-destructive/10"
            >
              <LogOut className="size-4" /> Cerrar Sesión
            </button>
          </nav>
        </aside>

        {tab === "pedidos" ? (
          <section className="rounded-3xl border bg-card shadow-card">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b p-6">
              <div>
                <h2 className="text-xl font-bold">Historial de compras</h2>
                <p className="text-sm text-muted-foreground">{orders.length} pedidos en los últimos 3 meses</p>
              </div>
            </div>
            <div className="p-2 md:p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>N° de Pedido</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead className="hidden sm:table-cell">Productos</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((o) => (
                    <TableRow key={o.id}>
                      <TableCell className="font-semibold">{o.id}</TableCell>
                      <TableCell className="text-muted-foreground">{o.date}</TableCell>
                      <TableCell className="hidden text-muted-foreground sm:table-cell">{o.items}</TableCell>
                      <TableCell>
                        <Badge variant={statusVariant[o.status]} className="rounded-full">{o.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-bold">{formatPrice(o.total)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>
        ) : (
          <section className="rounded-3xl border bg-card p-6 shadow-card md:p-8">
            <h2 className="text-xl font-bold">Mis datos</h2>
            <form
              className="mt-6 grid gap-4 sm:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Datos actualizados");
              }}
            >
              {[
                { id: "p-nombre", label: "Nombre", value: "Lucía" },
                { id: "p-apellido", label: "Apellido", value: "Gómez" },
                { id: "p-email", label: "Email", value: "lucia.gomez@email.com", type: "email" },
                { id: "p-tel", label: "Teléfono", value: "11 4567-8910", type: "tel" },
              ].map((f) => (
                <div key={f.id} className="space-y-1.5">
                  <Label htmlFor={f.id}>{f.label}</Label>
                  <Input id={f.id} type={f.type ?? "text"} defaultValue={f.value} className="h-11 rounded-xl" />
                </div>
              ))}
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="p-dir">Dirección de entrega</Label>
                <Input id="p-dir" defaultValue="Av. Rivadavia 4520, 3° B, CABA" className="h-11 rounded-xl" />
              </div>
              <div className="sm:col-span-2">
                <Button type="submit">Guardar cambios</Button>
              </div>
            </form>
          </section>
        )}
      </div>
    </>
  );
}
