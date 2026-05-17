import test from "node:test";
import assert from "node:assert/strict";
import {
  filterProductsBySize,
  sortProducts,
  getProductSizeValues,
} from "../lib/product-filters.ts";
import type { Product } from "../types/domain";

const products: Product[] = [
  {
    _id: "p-1",
    slug: "beta",
    title: { en: "Beta Cami", vi: "Beta" },
    description: { en: "", vi: "" },
    categorySlug: "women",
    priceUsd: 200,
    stock: 1,
    images: [],
    colors: [],
    properties: [{ slug: "size", name: "Size", values: ["S", "M"] }],
    isNew: false,
    salePercent: 0,
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    _id: "p-2",
    slug: "alpha",
    title: { en: "Alpha Dress", vi: "Alpha" },
    description: { en: "", vi: "" },
    categorySlug: "women",
    priceUsd: 100,
    stock: 1,
    images: [],
    colors: [],
    properties: [{ slug: "fit", name: "SIZE", values: ["L"] }],
    isNew: true,
    salePercent: 0,
    createdAt: "2026-02-01T00:00:00.000Z",
  },
];

test("getProductSizeValues reads values from the Size property", () => {
  assert.deepEqual(getProductSizeValues(products[0]), ["S", "M"]);
  assert.deepEqual(getProductSizeValues(products[1]), ["L"]);
});

test("filterProductsBySize keeps products with matching size values", () => {
  assert.deepEqual(
    filterProductsBySize(products, ["L"]).map((product) => product._id),
    ["p-2"],
  );
});

test("sortProducts supports storefront sort criteria", () => {
  assert.deepEqual(
    sortProducts(products, "priceAsc").map((product) => product._id),
    ["p-2", "p-1"],
  );
  assert.deepEqual(
    sortProducts(products, "nameAsc").map((product) => product._id),
    ["p-2", "p-1"],
  );
  assert.deepEqual(
    sortProducts(products, "newest").map((product) => product._id),
    ["p-2", "p-1"],
  );
});
