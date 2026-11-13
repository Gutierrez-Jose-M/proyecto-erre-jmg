import { createFileRoute } from "@tanstack/react-router";

import { CatalogView } from "@/components/erre/CatalogView";
import { PageHeader } from "@/components/erre/PageHeader";
import { getProductsByCategory } from "@/data/products";

export const Route = createFileRoute("/comestibles")({
  head: () => ({
    meta: [
      { title: "Comestibles | ERRE Supermercado" },
      { name: "description", content: "Almacén, lácteos, frutas, panadería e infusiones al mejor precio. Filtrá por marca, precio y tipo de alimento." },
      { property: "og:title", content: "Comestibles | ERRE Supermercado" },
      { property: "og:description", content: "Almacén, lácteos, frutas, panadería e infusiones con envío a domicilio." },
    ],
  }),
  component: ComestiblesPage,
});

function ComestiblesPage() {
  return (
    <>
      <PageHeader
        crumb="Comestibles"
        title="Catálogo de Comestibles"
        subtitle="Almacén, lácteos, frutas y todo lo que necesitás para tu cocina."
      />
      <CatalogView items={getProductsByCategory("comestibles")} typeLabel="Tipo de alimento" />
    </>
  );
}
