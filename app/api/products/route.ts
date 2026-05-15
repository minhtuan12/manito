import { NextResponse } from "next/server";
import ProductModel from "@/models/product";
import CategoryModel from "@/models/category";
import { connectToDatabase } from "@/lib/mongoose";
import {
  findCategoryByPath,
  getDescendantCategorySlugs,
  enrichProductsWithCategoryPath,
} from "@/lib/catalog";
import type { Category, Product } from "@/types/domain";

function slugify(input: string) {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function mapCategory(doc: any): Category {
  return {
    _id: doc._id.toString(),
    parentId: doc.parentId ?? null,
    slug: doc.slug,
    title: {
      en: doc.title?.en ?? "",
      vi: doc.title?.vi ?? "",
    },
    description: {
      en: doc.description?.en ?? "",
      vi: doc.description?.vi ?? "",
    },
    coverImage: doc.coverImage,
    banner: doc.banner,
  };
}

function mapProduct(doc: any): Product {
  return {
    _id: doc._id.toString(),
    slug: doc.slug,
    title: {
      en: doc.title?.en ?? "",
      vi: doc.title?.vi ?? "",
    },
    description: {
      en: doc.description?.en ?? "",
      vi: doc.description?.vi ?? "",
    },
    details: {
      en: doc.details?.en ?? "",
      vi: doc.details?.vi ?? "",
    },
    materialsAndCare: {
      en: doc.materialsAndCare?.en ?? "",
      vi: doc.materialsAndCare?.vi ?? "",
    },
    shipping: {
      en: doc.shipping?.en ?? "",
      vi: doc.shipping?.vi ?? "",
    },
    returns: {
      en: doc.returns?.en ?? "",
      vi: doc.returns?.vi ?? "",
    },
    giftPackaging: {
      en: doc.giftPackaging?.en ?? "",
      vi: doc.giftPackaging?.vi ?? "",
    },
    categorySlug: doc.categorySlug,
    priceUsd: doc.priceUsd,
    stock: doc.stock,
    images: doc.images ?? [],
    colors: doc.colors ?? [],
    properties: doc.properties ?? [],
    isNew: doc.isNew ?? false,
    salePercent: doc.salePercent ?? 0,
    isDeleted: doc.isDeleted ?? false,
    deletedAt: doc.deletedAt?.toISOString?.(),
    createdAt: doc.createdAt?.toISOString?.(),
    updatedAt: doc.updatedAt?.toISOString?.(),
  };
}

async function buildUniqueProductSlug(baseTitle: string) {
  const base = slugify(baseTitle) || `product-${Date.now()}`;
  let candidate = base;
  let index = 1;

  while (await ProductModel.exists({ slug: candidate })) {
    index += 1;
    candidate = `${base}-${index}`;
  }

  return candidate;
}

export async function GET(request: Request) {
  await connectToDatabase();

  const { searchParams } = new URL(request.url);
  const categorySlug = searchParams.get("categorySlug");
  const categoryPath = searchParams.get("categoryPath");
  const includeDescendants = searchParams.get("includeDescendants") !== "false";

  const categoryDocs = (await CategoryModel.find({ isDeleted: { $ne: true } }).lean()) as any[];
  const categories = categoryDocs.map(mapCategory);

  let query: Record<string, unknown> = { isDeleted: { $ne: true } };

  if (categorySlug) {
    query.categorySlug = includeDescendants
      ? { $in: getDescendantCategorySlugs(categorySlug, categories) }
      : categorySlug;
  } else if (categoryPath) {
    const target = findCategoryByPath(categories, categoryPath.split("/").filter(Boolean));
    if (!target) {
      return NextResponse.json({ items: [], total: 0 });
    }

    query.categorySlug = includeDescendants
      ? { $in: getDescendantCategorySlugs(target.slug, categories) }
      : target.slug;
  }

  const items = (await ProductModel.find(query).sort({ createdAt: -1 }).lean()) as any[];
  const mapped = enrichProductsWithCategoryPath(items.map(mapProduct), categories);

  return NextResponse.json({ items: mapped, total: mapped.length });
}

export async function POST(request: Request) {
  await connectToDatabase();

  try {
    const payload = await request.json();
    const rawTitle = payload?.title?.vi || payload?.title?.en || "";
    const slug = await buildUniqueProductSlug(rawTitle);
    const category = await CategoryModel.findOne({ slug: payload.categorySlug }).lean();

    if (!category) {
      return NextResponse.json({ message: "Category not found" }, { status: 400 });
    }

    const created = await ProductModel.create({ ...payload, slug });
    return NextResponse.json(mapProduct(created), { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create product", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 },
    );
  }
}
