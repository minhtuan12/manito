import { NextResponse } from "next/server";
import { mockStore } from "@/lib/mock-store";

export async function GET() {
  return NextResponse.json({ items: mockStore.cart });
}

export async function POST(request: Request) {
  const payload = (await request.json()) as { productId?: string; quantity?: number };
  if (!payload.productId || !payload.quantity) {
    return NextResponse.json({ message: "productId and quantity are required" }, { status: 400 });
  }
  mockStore.cart.push({ productId: payload.productId, quantity: payload.quantity });
  return NextResponse.json({ items: mockStore.cart }, { status: 201 });
}
