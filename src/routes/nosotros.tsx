import { createFileRoute } from "@tanstack/react-router";
import { HeartHandshake, Leaf, Store, Users } from "lucide-react";

import storeImg from "@/assets/nosotros-tienda.jpg";
import { PageHeader } from "@/components/erre/PageHeader";

export const Route = createFileRoute("/nosotros")({
  head: () => ({
    meta: [
      { title: "Nosotros | La historia de ERRE Supermercado" },
      { name: "description", content: "Desde 1998 ERRE acompaña a las familias del barrio. Conocé nuestra historia, nuestros valores y cómo llegamos a tu casa." },
      { property: "og:title", content: "Nosotros | La historia de ERRE Supermercado" },
      { property: "og:description", content: "Conocé la historia y los valores del supermercado ERRE." },
    ],
  }),
  component: NosotrosPage,
});

const milestones = [
  { year: "1998", text: "Abrimos nuestro primer almacén de barrio en Almagro, con 4 góndolas y mucha ilusión." },
  { year: "2008", text: "Nos convertimos en supermercado y sumamos frutas, verduras y panadería propia." },
  { year: "2016", text: "Inauguramos dos sucursales más y el primer servicio de envío telefónico." },
  { year: "2024", text: "Lanzamos la tienda online de ERRE para llegar a toda la ciudad." },
];

const values = [
  { Icon: Leaf, title: "Frescura", text: "Trabajamos con productores locales y reponemos todos los días." },
  { Icon: HeartHandshake, title: "Confianza", text: "Precios claros, sin letra chica y atención cercana." },
  { Icon: Users, title: "Comunidad", text: "Más de 80 vecinos forman parte de nuestro equipo." },
  { Icon: Store, title: "Cercanía", text: "El trato del almacén de siempre, con la comodidad de lo online." },
];

function NosotrosPage() {
  return (
    <>
      <PageHeader crumb="Nosotros" title="Somos ERRE" subtitle="Un supermercado de barrio que creció junto a sus vecinos." />

      <section className="container-erre grid items-center gap-10 py-12 lg:grid-cols-2">
        <img
          src={storeImg}
          alt="Interior del supermercado ERRE con frutas y verduras frescas"
          loading="lazy"
          width={1600}
          height={1008}
          className="aspect-[4/3] w-full rounded-3xl object-cover shadow-lift"
        />
        <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
          <h2 className="text-3xl font-extrabold text-foreground">Nuestra historia</h2>
          <p>
            ERRE nació en 1998 como un pequeño almacén familiar en el corazón de Almagro. El nombre viene de la
            inicial de sus fundadores, Roberto y Rosa, que soñaban con un lugar donde los vecinos encontraran todo
            lo necesario para su casa, con precios justos y una sonrisa.
          </p>
          <p>
            Hoy somos un supermercado moderno con tres sucursales y una tienda online, pero seguimos eligiendo cada
            producto como si fuera para nuestra propia mesa.
          </p>
        </div>
      </section>

      <section className="bg-secondary/60 py-14">
        <div className="container-erre">
          <h2 className="mb-8 text-3xl font-extrabold">Nuestro recorrido</h2>
          <ol className="grid gap-6 md:grid-cols-4">
            {milestones.map((m) => (
              <li key={m.year} className="relative rounded-2xl bg-card p-6 shadow-card">
                <span className="font-display text-4xl font-extrabold text-primary">{m.year}</span>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-erre py-14">
        <h2 className="mb-8 text-3xl font-extrabold">Lo que nos mueve</h2>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ Icon, title, text }) => (
            <li key={title} className="rounded-2xl border bg-card p-6">
              <span className="grid size-12 place-items-center rounded-xl bg-primary text-primary-foreground">
                <Icon className="size-6" />
              </span>
              <h3 className="mt-4 text-lg font-bold">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{text}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
