import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import type { FormEvent } from "react";
import { toast } from "sonner";

import { AuthShell } from "@/components/erre/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Iniciar sesión | ERRE Supermercado" },
      { name: "description", content: "Ingresá a tu cuenta de ERRE para ver tus pedidos y comprar más rápido." },
      { property: "og:title", content: "Iniciar sesión | ERRE Supermercado" },
      { property: "og:description", content: "Ingresá a tu cuenta de ERRE." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const submit = (e: FormEvent) => {
    e.preventDefault();
    toast.success("¡Hola de nuevo!");
    navigate({ to: "/perfil" });
  };

  return (
    <AuthShell title="Iniciá sesión" subtitle="Ingresá con tu email y contraseña">
      <form onSubmit={submit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="l-email">Email</Label>
          <Input id="l-email" type="email" required autoComplete="email" placeholder="tu@email.com" className="h-11 rounded-xl" />
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="l-pass">Contraseña</Label>
            <button
              type="button"
              onClick={() => toast("Te enviaremos un enlace para restablecerla", { description: "Revisá tu bandeja de entrada." })}
              className="text-xs font-semibold text-primary hover:underline"
            >
              Olvidé mi contraseña
            </button>
          </div>
          <Input id="l-pass" type="password" required autoComplete="current-password" className="h-11 rounded-xl" />
        </div>
        <Button type="submit" size="lg" className="w-full">Ingresar</Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        ¿No tenés cuenta?{" "}
        <Link to="/registro" className="font-semibold text-primary hover:underline">Registrate</Link>
      </p>
    </AuthShell>
  );
}
