import lecheEntera from "@/assets/products/leche-entera.jpg";
import arroz from "@/assets/products/arroz-largo-fino.jpg";
import fideos from "@/assets/products/fideos-spaghetti.jpg";
import aceite from "@/assets/products/aceite-girasol.jpg";
import yerba from "@/assets/products/yerba-mate.jpg";
import cafe from "@/assets/products/cafe-molido.jpg";
import galletitas from "@/assets/products/galletitas-dulces.jpg";
import pan from "@/assets/products/pan-lactal.jpg";
import tomate from "@/assets/products/tomate-triturado.jpg";
import dulce from "@/assets/products/dulce-de-leche.jpg";
import manzanas from "@/assets/products/manzanas-rojas.jpg";
import queso from "@/assets/products/queso-cremoso.jpg";
import detergente from "@/assets/products/detergente-lavavajillas.jpg";
import lavandina from "@/assets/products/lavandina.jpg";
import jabonRopa from "@/assets/products/jabon-liquido-ropa.jpg";
import multiuso from "@/assets/products/limpiador-multiuso.jpg";
import papel from "@/assets/products/papel-higienico.jpg";
import esponjas from "@/assets/products/esponjas.jpg";
import ambientes from "@/assets/products/desodorante-ambientes.jpg";
import suavizante from "@/assets/products/suavizante.jpg";
import shampoo from "@/assets/products/shampoo.jpg";
import jabonTocador from "@/assets/products/jabon-tocador.jpg";
import pisos from "@/assets/products/limpiador-pisos.jpg";
import bolsas from "@/assets/products/bolsas-residuos.jpg";

export type Category = "comestibles" | "limpieza";

export interface Product {
  slug: string;
  name: string;
  brand: string;
  category: Category;
  type: string;
  price: number;
  oldPrice?: number;
  unit: string;
  image: string;
  description: string;
  featured?: boolean;
}

export const products: Product[] = [
  // Comestibles
  { slug: "leche-entera", name: "Leche Entera Larga Vida", brand: "La Pradera", category: "comestibles", type: "Lácteos", price: 1290, oldPrice: 1490, unit: "1 L", image: lecheEntera, featured: true, description: "Leche entera ultrapasteurizada, fuente natural de calcio y proteínas. Ideal para el desayuno, licuados y recetas de todos los días. Una vez abierta, conservar en heladera y consumir dentro de los 3 días." },
  { slug: "arroz-largo-fino", name: "Arroz Largo Fino", brand: "Don Grano", category: "comestibles", type: "Almacén", price: 1850, unit: "1 kg", image: arroz, featured: true, description: "Arroz largo fino tipo 00000, de granos sueltos y cocción pareja en 18 minutos. Perfecto para guarniciones, ensaladas y risottos caseros." },
  { slug: "fideos-spaghetti", name: "Fideos Spaghetti", brand: "Nonna Bella", category: "comestibles", type: "Almacén", price: 990, unit: "500 g", image: fideos, description: "Spaghetti de sémola de trigo candeal, secado lento para una textura al dente. Cocción: 9 a 11 minutos en abundante agua con sal." },
  { slug: "aceite-girasol", name: "Aceite de Girasol", brand: "Campo Dorado", category: "comestibles", type: "Almacén", price: 2690, oldPrice: 3150, unit: "1,5 L", image: aceite, featured: true, description: "Aceite puro de girasol, liviano y de sabor neutro. Rico en vitamina E, ideal para frituras, horneados y aderezos." },
  { slug: "yerba-mate", name: "Yerba Mate Tradicional", brand: "Monte Verde", category: "comestibles", type: "Infusiones", price: 3990, unit: "1 kg", image: yerba, description: "Yerba mate con palo, elaborada con estacionamiento natural de 12 meses. Sabor intenso y duradero, de rendimiento excepcional." },
  { slug: "cafe-molido", name: "Café Molido Intenso", brand: "Tostadero Sur", category: "comestibles", type: "Infusiones", price: 4590, oldPrice: 5100, unit: "250 g", image: cafe, description: "Blend de granos arábica y robusta tostados en el día. Molienda media apta para cafetera de filtro, italiana y prensa francesa." },
  { slug: "galletitas-dulces", name: "Galletitas Dulces de Vainilla", brand: "Doña Clara", category: "comestibles", type: "Desayuno", price: 1150, unit: "200 g", image: galletitas, description: "Galletitas crocantes con suave sabor a vainilla. El acompañamiento perfecto para el mate o el café con leche." },
  { slug: "pan-lactal", name: "Pan Lactal Blanco", brand: "Horno Feliz", category: "comestibles", type: "Panadería", price: 2350, unit: "550 g", image: pan, description: "Pan de molde tierno y esponjoso, rebanado. Sin grasas trans. Ideal para tostadas y sándwiches." },
  { slug: "tomate-triturado", name: "Tomate Triturado", brand: "Huerta Real", category: "comestibles", type: "Almacén", price: 890, unit: "520 g", image: tomate, description: "Tomates seleccionados y triturados, listos para salsas, guisos y pizzas. Sin conservantes agregados." },
  { slug: "dulce-de-leche", name: "Dulce de Leche Clásico", brand: "La Pradera", category: "comestibles", type: "Desayuno", price: 2190, unit: "400 g", image: dulce, description: "Dulce de leche tradicional, cremoso y de color dorado intenso. Para untar, rellenar y disfrutar a cucharadas." },
  { slug: "manzanas-rojas", name: "Manzanas Rojas", brand: "Valle Frutal", category: "comestibles", type: "Frutas y Verduras", price: 1690, unit: "1 kg", image: manzanas, featured: true, description: "Manzanas rojas frescas del Alto Valle de Río Negro. Crocantes, dulces y jugosas. Se venden por kilo." },
  { slug: "queso-cremoso", name: "Queso Cremoso", brand: "Tambo Viejo", category: "comestibles", type: "Lácteos", price: 6890, oldPrice: 7650, unit: "500 g", image: queso, description: "Queso cremoso de pasta blanda y sabor suave. Excelente para fundir en pizzas, tartas y sándwiches calientes." },
  // Limpieza
  { slug: "detergente-lavavajillas", name: "Detergente Lavavajillas Limón", brand: "Brillo", category: "limpieza", type: "Cocina", price: 1490, oldPrice: 1790, unit: "750 ml", image: detergente, featured: true, description: "Detergente concentrado con aroma a limón. Remueve la grasa más difícil y cuida tus manos. Rinde hasta 3 veces más." },
  { slug: "lavandina", name: "Lavandina Concentrada", brand: "Blancura", category: "limpieza", type: "Desinfección", price: 1290, unit: "2 L", image: lavandina, featured: true, description: "Lavandina de uso general que elimina el 99,9% de gérmenes y bacterias. Diluir según indicaciones. Mantener fuera del alcance de los niños." },
  { slug: "jabon-liquido-ropa", name: "Jabón Líquido para Ropa", brand: "Nube", category: "limpieza", type: "Lavado", price: 7990, oldPrice: 9200, unit: "3 L", image: jabonRopa, featured: true, description: "Jabón líquido para lavarropas automático y a mano. Fórmula con enzimas que remueve manchas desde el primer lavado." },
  { slug: "limpiador-multiuso", name: "Limpiador Multiuso Gatillo", brand: "Brillo", category: "limpieza", type: "Superficies", price: 1890, unit: "500 ml", image: multiuso, description: "Limpiador multisuperficie en spray para vidrios, mesadas y azulejos. No deja marcas ni residuos." },
  { slug: "papel-higienico", name: "Papel Higiénico Doble Hoja", brand: "Suavecito", category: "limpieza", type: "Higiene", price: 2490, unit: "4 rollos x 30 m", image: papel, featured: true, description: "Papel higiénico de doble hoja, suave y resistente. Pack de 4 rollos de 30 metros cada uno." },
  { slug: "esponjas", name: "Esponjas Doble Uso", brand: "Brillo", category: "limpieza", type: "Cocina", price: 990, unit: "Pack x 3", image: esponjas, description: "Esponjas con cara abrasiva verde para ollas y cara suave para vajilla delicada. Pack x 3 unidades." },
  { slug: "desodorante-ambientes", name: "Desodorante de Ambientes Lavanda", brand: "Aroma Hogar", category: "limpieza", type: "Ambientes", price: 1690, unit: "360 ml", image: ambientes, description: "Aerosol con fragancia de lavanda que neutraliza olores y deja una sensación de frescura duradera." },
  { slug: "suavizante", name: "Suavizante para Ropa", brand: "Nube", category: "limpieza", type: "Lavado", price: 2290, unit: "1 L", image: suavizante, description: "Suavizante concentrado con aroma floral. Deja la ropa suave, perfumada y fácil de planchar." },
  { slug: "shampoo", name: "Shampoo Nutrición", brand: "Natura Fresh", category: "limpieza", type: "Higiene", price: 3290, oldPrice: 3790, unit: "400 ml", image: shampoo, description: "Shampoo con extractos naturales para todo tipo de cabello. Limpia suavemente y aporta brillo." },
  { slug: "jabon-tocador", name: "Jabón de Tocador Neutro", brand: "Natura Fresh", category: "limpieza", type: "Higiene", price: 1590, unit: "3 x 90 g", image: jabonTocador, description: "Jabón de tocador neutro, hipoalergénico y con glicerina. Pack de 3 unidades de 90 g." },
  { slug: "limpiador-pisos", name: "Limpiador de Pisos Lavanda", brand: "Aroma Hogar", category: "limpieza", type: "Superficies", price: 1990, unit: "1,8 L", image: pisos, description: "Limpiador líquido para todo tipo de pisos. Perfuma por horas y no requiere enjuague." },
  { slug: "bolsas-residuos", name: "Bolsas de Residuos Reforzadas", brand: "Fuerte", category: "limpieza", type: "Hogar", price: 1390, unit: "Rollo x 30", image: bolsas, description: "Bolsas de residuos de 50 x 70 cm, reforzadas y resistentes a desgarros. Rollo de 30 unidades." },
];

export function getProductsByCategory(category: Category) {
  return products.filter((p) => p.category === category);
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getFeatured() {
  const featured = products.filter((p) => p.featured);
  return [
    ...featured.filter((p) => p.category === "comestibles").slice(0, 4),
    ...featured.filter((p) => p.category === "limpieza").slice(0, 4),
  ];
}

export function discountPercent(p: Product) {
  if (!p.oldPrice) return 0;
  return Math.round((1 - p.price / p.oldPrice) * 100);
}
