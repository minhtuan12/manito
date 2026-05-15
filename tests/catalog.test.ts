import test from "node:test";
import assert from "node:assert/strict";
import {
  buildCategoryGraph,
  enrichProductsWithCategoryPath,
  findCategoryByPath,
  getCategoryAncestors,
  getProductsForCategory,
} from "../lib/catalog.ts";
import type { Category, Product } from "../types/domain";

const categories: Category[] = [
  {
    _id: "women",
    parentId: null,
    slug: "women",
    title: { en: "Women", vi: "Nu" },
    description: { en: "", vi: "" },
    coverImage: "/women.jpg",
    banner: "/women-banner.jpg",
  },
  {
    _id: "women-new",
    parentId: "women",
    slug: "new",
    title: { en: "New", vi: "Moi" },
    description: { en: "", vi: "" },
    coverImage: "/women-new.jpg",
    banner: "/women-new-banner.jpg",
  },
  {
    _id: "kids",
    parentId: null,
    slug: "kids",
    title: { en: "Kids", vi: "Tre em" },
    description: { en: "", vi: "" },
    coverImage: "/kids.jpg",
    banner: "/kids-banner.jpg",
  },
];

const products: Product[] = [
  {
    _id: "p-root",
    slug: "silk-robe",
    title: { en: "Silk Robe", vi: "Ao choang lua" },
    description: { en: "Robe", vi: "Ao choang" },
    categorySlug: "women",
    priceUsd: 100,
    stock: 2,
    images: ["/robe.jpg"],
    colors: [],
    properties: [],
    isNew: false,
    salePercent: 0,
  },
  {
    _id: "p-child",
    slug: "fresh-drop",
    title: { en: "Fresh Drop", vi: "Moi" },
    description: { en: "New", vi: "Moi" },
    categorySlug: "new",
    priceUsd: 120,
    stock: 3,
    images: ["/fresh.jpg"],
    colors: [],
    properties: [],
    isNew: true,
    salePercent: 0,
  },
];

test("buildCategoryGraph derives nested paths from parent relationships", () => {
  const graph = buildCategoryGraph(categories);
  const women = graph.byId.get("women");
  const womenNew = graph.byId.get("women-new");

  assert.ok(women);
  assert.ok(womenNew);
  assert.deepEqual(women.pathSegments, ["women"]);
  assert.equal(women.path, "women");
  assert.deepEqual(womenNew.pathSegments, ["women", "new"]);
  assert.equal(womenNew.path, "women/new");
});

test("findCategoryByPath matches full slug ancestry instead of only leaf slug", () => {
  const match = findCategoryByPath(categories, ["women", "new"]);

  assert.ok(match);
  assert.equal(match._id, "women-new");
});

test("getCategoryAncestors returns breadcrumb lineage in route order", () => {
  const ancestors = getCategoryAncestors("new", categories);

  assert.deepEqual(
    ancestors.map((category) => category.slug),
    ["women", "new"],
  );
});

test("enrichProductsWithCategoryPath attaches canonical category path to products", () => {
  const enriched = enrichProductsWithCategoryPath(products, categories);

  assert.equal(enriched[1].categoryPath, "women/new");
  assert.deepEqual(enriched[1].categoryPathSegments, ["women", "new"]);
  assert.equal(enriched[1].primaryImage, "/fresh.jpg");
});

test("getProductsForCategory includes direct and descendant products for parent pages", () => {
  const scopedProducts = getProductsForCategory("women", categories, products);

  assert.deepEqual(
    scopedProducts.map((product) => product._id).sort(),
    ["p-child", "p-root"],
  );
});

test("buildCategoryGraph nests children when parentId stores parent slug", () => {
  const slugLinkedCategories: Category[] = [
    categories[0],
    {
      ...categories[1],
      parentId: "women",
    },
  ];

  const graph = buildCategoryGraph(slugLinkedCategories);
  const women = graph.byId.get("women");

  assert.ok(women);
  assert.equal(women.children.length, 1);
  assert.equal(women.children[0].slug, "new");
});
