import { NextResponse } from "next/server";
import { mockStore } from "@/lib/mock-store";

export async function GET() {
  return NextResponse.json({ items: mockStore.wishlist });
}

export async function POST(request: Request) {
  const payload = (await request.json()) as { productId?: string };
  if (!payload.productId) {
    return NextResponse.json({ message: "productId is required" }, { status: 400 });
  }
  if (!mockStore.wishlist.includes(payload.productId)) {
    mockStore.wishlist.push(payload.productId);
  }
  return NextResponse.json({ items: mockStore.wishlist }, { status: 201 });
}
