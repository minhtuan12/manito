import { NextResponse } from "next/server";
import CategoryModel from "@/models/category";
import { connectToDatabase } from "@/lib/mongoose";
import { buildCategoryGraph } from "@/lib/catalog";
import type { Category } from "@/types/domain";

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
    isDeleted: doc.isDeleted ?? false,
    deletedAt: doc.deletedAt?.toISOString?.(),
    createdAt: doc.createdAt?.toISOString?.(),
    updatedAt: doc.updatedAt?.toISOString?.(),
  };
}

async function buildUniqueCategorySlug(baseTitle: string) {
  const base = slugify(baseTitle) || `category-${Date.now()}`;
  let candidate = base;
  let index = 1;

  while (await CategoryModel.exists({ slug: candidate })) {
    index += 1;
    candidate = `${base}-${index}`;
  }

  return candidate;
}

async function findParentCategory(parentId: string) {
  return CategoryModel.findOne({
    $or: [{ _id: parentId }, { slug: parentId }],
    isDeleted: { $ne: true },
  }).lean();
}

export async function GET(request: Request) {
  await connectToDatabase();
  const { searchParams } = new URL(request.url);
  const tree = searchParams.get("tree") === "true";
  const docs = (await CategoryModel.find({ isDeleted: { $ne: true } })
    .sort({ createdAt: 1 })
    .lean()) as any[];
  const items = docs.map(mapCategory);

  if (tree) {
    const roots = buildCategoryGraph(items).roots;
    return NextResponse.json({ items: roots, total: items.length });
  }

  return NextResponse.json({ items, total: items.length });
}

export async function POST(request: Request) {
  await connectToDatabase();

  try {
    const payload = await request.json();
    const rawTitle = payload?.title?.vi || payload?.title?.en || "";
    const slug = await buildUniqueCategorySlug(rawTitle);

    if (payload.parentId) {
      const parent = await findParentCategory(payload.parentId);
      if (!parent) {
        return NextResponse.json({ message: "Parent category not found" }, { status: 400 });
      }
    }

    const created = await CategoryModel.create({
      ...payload,
      parentId: payload.parentId ?? null,
      slug,
    });

    return NextResponse.json(mapCategory(created), { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create category", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 },
    );
  }
}
