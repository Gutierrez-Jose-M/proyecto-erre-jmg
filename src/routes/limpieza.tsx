import { createFileRoute } from "@tanstack/react-router";

import { CatalogView } from "@/components/erre/CatalogView";
import { PageHeader } from "@/components/erre/PageHeader";
import { getProductsByCategory } from "@/data/products";

export const Route = createFileRoute("/limpieza")({
  head: () => ({
    meta: [
      { title: "Limpieza e Higiene | ERRE Supermercado" },
      { name: "description", content: "Detergentes, lavandinas, jabones, papel higiénico y más artículos de limpieza e higiene personal." },
      { property: "og:title", content: "Limpieza e Higiene | ERRE Supermercado" },
      { property: "og:description", content: "Artículos de limpieza del hogar e higiene personal con envío a domicilio." },
    ],
  }),
  component: LimpiezaPage,
});

function LimpiezaPage() {
  return (
    <>
      <PageHeader
        crumb="Limpieza"
        title="Catálogo de Limpieza"
        subtitle="Productos de higiene y limpieza para dejar tu casa impecable."
      />
      <CatalogView items={getProductsByCategory("limpieza")} typeLabel="Tipo de producto" />
    </>
  );
}
