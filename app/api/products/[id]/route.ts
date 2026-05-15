import { NextResponse } from "next/server";
import ProductModel from "@/models/product";
import CategoryModel from "@/models/category";
import { connectToDatabase } from "@/lib/mongoose";

type RouteParams = {
  params: Promise<{ id: string }>;
};

function mapProduct(doc: any) {
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

export async function GET(_: Request, { params }: RouteParams) {
  await connectToDatabase();
  const { id } = await params;
  const item = await ProductModel.findOne({
    $or: [{ _id: id }, { slug: id }],
    isDeleted: { $ne: true },
  }).lean();

  if (!item) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(mapProduct(item));
}

export async function PUT(request: Request, { params }: RouteParams) {
  await connectToDatabase();
  const { id } = await params;

  try {
    const payload = await request.json();

    if (payload.categorySlug) {
      const category = await CategoryModel.findOne({ slug: payload.categorySlug }).lean();
      if (!category) {
        return NextResponse.json({ message: "Category not found" }, { status: 400 });
      }
    }

    const item = await ProductModel.findOneAndUpdate(
      { $or: [{ _id: id }, { slug: id }], isDeleted: { $ne: true } },
      payload,
      {
        new: true,
        runValidators: true,
      },
    ).lean();

    if (!item) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(mapProduct(item));
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update product", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 },
    );
  }
}

export async function DELETE(_: Request, { params }: RouteParams) {
  await connectToDatabase();
  const { id } = await params;

  const deleted = await ProductModel.findOneAndUpdate(
    { $or: [{ _id: id }, { slug: id }], isDeleted: { $ne: true } },
    { isDeleted: true, deletedAt: new Date() },
    { new: true },
  ).lean();

  if (!deleted) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Product deleted" });
}
