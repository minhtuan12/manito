import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { getStorefrontProducts } from "@/lib/storefront-data";

export async function GET() {
  const user = await getAuthenticatedUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const products = await getStorefrontProducts();
  const items = products.filter((product) => user.wishlistProductSlugs.includes(product.slug));

  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const user = await getAuthenticatedUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const payload = (await request.json()) as { productSlug?: string };
  if (!payload.productSlug) {
    return NextResponse.json({ message: "productSlug is required" }, { status: 400 });
  }

  if (!user.wishlistProductSlugs.includes(payload.productSlug)) {
    user.wishlistProductSlugs.push(payload.productSlug);
    await user.save();
  }

  const products = await getStorefrontProducts();
  const items = products.filter((product) => user.wishlistProductSlugs.includes(product.slug));

  return NextResponse.json({ items }, { status: 201 });
}

export async function DELETE(request: Request) {
  const user = await getAuthenticatedUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const productSlug = searchParams.get("productSlug");

  if (!productSlug) {
    return NextResponse.json({ message: "productSlug is required" }, { status: 400 });
  }

  user.wishlistProductSlugs = user.wishlistProductSlugs.filter(
    (slug: string) => slug !== productSlug,
  );
  await user.save();

  return NextResponse.json({ items: user.wishlistProductSlugs });
}
