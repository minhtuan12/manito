import type { Product } from "@/types/domain";

export type ProductSortKey =
  | "popular"
  | "newest"
  | "priceAsc"
  | "priceDesc"
  | "nameAsc"
  | "nameDesc";

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function isSizeProperty(property: Product["properties"][number]) {
  const slug = normalize(property.slug);
  const name = normalize(property.name);
  return slug === "size" || slug === "kich-co" || name === "size";
}

export function getProductSizeValues(product: Product) {
  const sizeProperty = product.properties.find(isSizeProperty);
  return sizeProperty?.values ?? [];
}

export function getAvailableSizes(products: Product[]) {
  const sizes = new Set<string>();

  for (const product of products) {
    for (const value of getProductSizeValues(product)) {
      if (value.trim()) {
        sizes.add(value.trim());
      }
    }
  }

  return Array.from(sizes).sort((left, right) =>
    left.localeCompare(right, undefined, { numeric: true }),
  );
}

export function filterProductsBySize<T extends Product>(
  products: T[],
  selectedSizes: string[],
) {
  const normalizedSizes = new Set(selectedSizes.map(normalize).filter(Boolean));

  if (normalizedSizes.size === 0) {
    return products;
  }

  return products.filter((product) =>
    getProductSizeValues(product).some((size) => normalizedSizes.has(normalize(size))),
  );
}

export function sortProducts<T extends Product>(
  products: T[],
  sortKey: ProductSortKey | string | null | undefined,
) {
  const items = [...products];

  switch (sortKey) {
    case "priceAsc":
      return items.sort((left, right) => left.priceUsd - right.priceUsd);
    case "priceDesc":
      return items.sort((left, right) => right.priceUsd - left.priceUsd);
    case "nameAsc":
      return items.sort((left, right) => left.title.en.localeCompare(right.title.en));
    case "nameDesc":
      return items.sort((left, right) => right.title.en.localeCompare(left.title.en));
    case "popular":
      return items.sort((left, right) => right.salePercent - left.salePercent);
    case "newest":
    default:
      return items.sort((left, right) =>
        (right.createdAt ?? "").localeCompare(left.createdAt ?? ""),
      );
  }
}
