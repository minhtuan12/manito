import { NextResponse } from "next/server";
import CategoryModel from "@/models/category";
import { connectToDatabase } from "@/lib/mongoose";

type RouteParams = {
  params: Promise<{ id: string }>;
};

function mapCategory(doc: any) {
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

async function findCategoryDocument(id: string) {
  return CategoryModel.findOne({
    $or: [{ _id: id }, { slug: id }],
    isDeleted: { $ne: true },
  }).lean();
}

async function findParentCategory(parentId: string) {
  return CategoryModel.findOne({
    $or: [{ _id: parentId }, { slug: parentId }],
    isDeleted: { $ne: true },
  }).lean();
}

export async function GET(_: Request, { params }: RouteParams) {
  await connectToDatabase();
  const { id } = await params;

  const item = await findCategoryDocument(id);
  if (!item) {
    return NextResponse.json({ message: "Category not found" }, { status: 404 });
  }

  return NextResponse.json(mapCategory(item));
}

export async function PUT(request: Request, { params }: RouteParams) {
  await connectToDatabase();
  const { id } = await params;

  try {
    const payload = await request.json();

    if (payload.parentId) {
      const parent = await findParentCategory(payload.parentId);
      if (!parent) {
        return NextResponse.json({ message: "Parent category not found" }, { status: 400 });
      }
    }

    const updated = await CategoryModel.findOneAndUpdate(
      { $or: [{ _id: id }, { slug: id }], isDeleted: { $ne: true } },
      payload,
      {
        new: true,
        runValidators: true,
      },
    ).lean();

    if (!updated) {
      return NextResponse.json({ message: "Category not found" }, { status: 404 });
    }

    return NextResponse.json(mapCategory(updated));
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update category", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 },
    );
  }
}

export async function DELETE(_: Request, { params }: RouteParams) {
  await connectToDatabase();
  const { id } = await params;

  const deleted = await CategoryModel.findOneAndUpdate(
    { $or: [{ _id: id }, { slug: id }], isDeleted: { $ne: true } },
    { isDeleted: true, deletedAt: new Date() },
    { new: true },
  ).lean();

  if (!deleted) {
    return NextResponse.json({ message: "Category not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Category deleted" });
}
