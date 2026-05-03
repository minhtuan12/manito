import { NextResponse } from "next/server";
import { products } from "@/data/products";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(_: Request, { params }: RouteParams) {
  const { id } = await params;
  const item = products.find((product) => product.id === id || product.slug === id);

  if (!item) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(item);
}
