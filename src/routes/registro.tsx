import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import type { FormEvent } from "react";
import { toast } from "sonner";

import { AuthShell } from "@/components/erre/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/registro")({
  head: () => ({
    meta: [
      { title: "Crear cuenta | ERRE Supermercado" },
      { name: "description", content: "Registrate en ERRE y accedé a ofertas exclusivas, historial de pedidos y compras más rápidas." },
      { property: "og:title", content: "Crear cuenta | ERRE Supermercado" },
      { property: "og:description", content: "Creá tu cuenta en ERRE Supermercado." },
    ],
  }),
  component: RegistroPage,
});

function RegistroPage() {
  const navigate = useNavigate();
  const submit = (e: FormEvent) => {
    e.preventDefault();
    toast.success("¡Cuenta creada!", { description: "Bienvenido/a a ERRE." });
    navigate({ to: "/perfil" });
  };

  return (
    <AuthShell title="Creá tu cuenta" subtitle="Tardás menos de un minuto">
      <form onSubmit={submit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="r-nombre">Nombre</Label>
            <Input id="r-nombre" required autoComplete="given-name" className="h-11 rounded-xl" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="r-apellido">Apellido</Label>
            <Input id="r-apellido" required autoComplete="family-name" className="h-11 rounded-xl" />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="r-email">Email</Label>
          <Input id="r-email" type="email" required autoComplete="email" className="h-11 rounded-xl" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="r-tel">Teléfono</Label>
          <Input id="r-tel" type="tel" required autoComplete="tel" placeholder="11 1234-5678" className="h-11 rounded-xl" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="r-pass">Contraseña</Label>
          <Input id="r-pass" type="password" required minLength={8} autoComplete="new-password" className="h-11 rounded-xl" />
          <p className="text-xs text-muted-foreground">Mínimo 8 caracteres.</p>
        </div>
        <Button type="submit" size="lg" className="w-full">Crear cuenta</Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        ¿Ya tenés cuenta?{" "}
        <Link to="/login" className="font-semibold text-primary hover:underline">Iniciá sesión</Link>
      </p>
    </AuthShell>
  );
}
