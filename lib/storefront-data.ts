import { connectToDatabase } from "@/lib/mongoose";
import {
  buildCategoryGraph,
  enrichProductsWithCategoryPath,
  findCategoryByPath,
  getCategoryAncestors,
  getProductsForCategory,
  type StorefrontCategory,
  type StorefrontProduct,
} from "@/lib/catalog";
import CategoryModel from "@/models/category";
import ProductModel from "@/models/product";
import type { Category, Product } from "@/types/domain";

type MaybeLocalized = { en?: string; vi?: string } | undefined;

function toLocalized(value: MaybeLocalized) {
  return {
    en: value?.en ?? "",
    vi: value?.vi ?? "",
  };
}

function mapCategory(doc: any): Category {
  return {
    _id: doc._id.toString(),
    parentId: doc.parentId ?? null,
    slug: doc.slug,
    title: toLocalized(doc.title),
    description: toLocalized(doc.description),
    coverImage: doc.coverImage,
    banner: doc.banner,
    isDeleted: doc.isDeleted ?? false,
    deletedAt: doc.deletedAt?.toISOString?.() ?? undefined,
    createdAt: doc.createdAt?.toISOString?.() ?? undefined,
    updatedAt: doc.updatedAt?.toISOString?.() ?? undefined,
  };
}

function mapProduct(doc: any): Product {
  return {
    _id: doc._id.toString(),
    slug: doc.slug,
    title: toLocalized(doc.title),
    description: toLocalized(doc.description),
    details: toLocalized(doc.details),
    materialsAndCare: toLocalized(doc.materialsAndCare),
    shipping: toLocalized(doc.shipping),
    returns: toLocalized(doc.returns),
    giftPackaging: toLocalized(doc.giftPackaging),
    categorySlug: doc.categorySlug,
    priceUsd: doc.priceUsd,
    stock: doc.stock,
    images: doc.images ?? [],
    colors: doc.colors ?? [],
    properties: doc.properties ?? [],
    isNew: doc.isNew ?? false,
    salePercent: doc.salePercent ?? 0,
    isDeleted: doc.isDeleted ?? false,
    deletedAt: doc.deletedAt?.toISOString?.() ?? undefined,
    createdAt: doc.createdAt?.toISOString?.() ?? undefined,
    updatedAt: doc.updatedAt?.toISOString?.() ?? undefined,
  };
}

async function loadCategories() {
  await connectToDatabase();
  const docs = (await CategoryModel.find({ isDeleted: { $ne: true } })
    .sort({ createdAt: 1 })
    .lean()) as any[];

  return docs.map(mapCategory);
}

async function loadProducts() {
  await connectToDatabase();
  const docs = (await ProductModel.find({ isDeleted: { $ne: true } })
    .sort({ createdAt: -1 })
    .lean()) as any[];

  return docs.map(mapProduct);
}

export async function getStorefrontCategoryTree(): Promise<StorefrontCategory[]> {
  const categories = await loadCategories();
  return buildCategoryGraph(categories).roots;
}

export async function getStorefrontCategories(): Promise<StorefrontCategory[]> {
  return getStorefrontCategoryTree();
}

export async function getAllStorefrontCategories(): Promise<Category[]> {
  return loadCategories();
}

export async function getStorefrontCategoryByPath(
  slugSegments: string[],
): Promise<StorefrontCategory | null> {
  const categories = await loadCategories();
  return findCategoryByPath(categories, slugSegments);
}

export async function getStorefrontCategoryAncestorsBySlug(categorySlug: string) {
  const categories = await loadCategories();
  return getCategoryAncestors(categorySlug, categories);
}

export async function getStorefrontProducts(): Promise<StorefrontProduct[]> {
  const [categories, products] = await Promise.all([loadCategories(), loadProducts()]);
  return enrichProductsWithCategoryPath(products, categories);
}

export async function getStorefrontProductsForCategoryPath(
  slugSegments: string[],
) {
  const [categories, products] = await Promise.all([loadCategories(), loadProducts()]);
  const category = findCategoryByPath(categories, slugSegments);

  if (!category) {
    return { category: null, products: [] as StorefrontProduct[] };
  }

  return {
    category,
    products: getProductsForCategory(category.slug, categories, products),
  };
}

export async function getStorefrontProductBySlug(
  slug: string,
): Promise<StorefrontProduct | null> {
  await connectToDatabase();
  const doc = (await ProductModel.findOne({
    slug,
    isDeleted: { $ne: true },
  }).lean()) as any | null;

  if (!doc) {
    return null;
  }

  const categories = await loadCategories();
  const [product] = enrichProductsWithCategoryPath([mapProduct(doc)], categories);
  return product ?? null;
}
