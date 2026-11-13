import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import type { FormEvent } from "react";
import { toast } from "sonner";

import { PageHeader } from "@/components/erre/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto | ERRE Supermercado" },
      { name: "description", content: "Escribinos tu consulta, llamanos o visitanos en Av. Corrientes 1234, CABA. Atención de lunes a sábado." },
      { property: "og:title", content: "Contacto | ERRE Supermercado" },
      { property: "og:description", content: "Consultas, teléfono y dirección de ERRE Supermercado." },
    ],
  }),
  component: ContactoPage,
});

const info = [
  { Icon: MapPin, label: "Dirección", value: "Av. Corrientes 1234, CABA" },
  { Icon: Phone, label: "Teléfono", value: "0800-555-3773" },
  { Icon: Mail, label: "Email", value: "hola@erre.com.ar" },
  { Icon: Clock, label: "Horario", value: "Lun a Sáb de 8 a 21 h" },
];

function ContactoPage() {
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("¡Mensaje enviado!", { description: "Te responderemos dentro de las 24 horas." });
    e.currentTarget.reset();
  };

  return (
    <>
      <PageHeader crumb="Contacto" title="Contacto" subtitle="¿Dudas sobre un pedido o sugerencias? Escribinos, nos encanta leerte." />
      <div className="container-erre grid gap-8 py-10 lg:grid-cols-[1.2fr_1fr]">
        <form onSubmit={submit} className="space-y-5 rounded-3xl border bg-card p-6 shadow-card md:p-8">
          <h2 className="text-xl font-bold">Envianos tu consulta</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="c-nombre">Nombre</Label>
              <Input id="c-nombre" required className="h-11 rounded-xl" autoComplete="name" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="c-email">Email</Label>
              <Input id="c-email" type="email" required className="h-11 rounded-xl" autoComplete="email" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="c-asunto">Asunto</Label>
            <Input id="c-asunto" required className="h-11 rounded-xl" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="c-mensaje">Mensaje</Label>
            <Textarea id="c-mensaje" required rows={6} className="rounded-xl" />
          </div>
          <Button type="submit" size="lg"><Send /> Enviar mensaje</Button>
        </form>

        <div className="space-y-5">
          <ul className="grid gap-3 sm:grid-cols-2">
            {info.map(({ Icon, label, value }) => (
              <li key={label} className="rounded-2xl border bg-card p-4">
                <Icon className="size-5 text-primary" />
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
                <p className="text-sm font-semibold">{value}</p>
              </li>
            ))}
          </ul>
          <div className="overflow-hidden rounded-3xl border shadow-card">
            <iframe
              title="Mapa de ERRE Supermercado"
              src="https://www.google.com/maps?q=Av.+Corrientes+1234,+Buenos+Aires&output=embed"
              className="h-80 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </>
  );
}
