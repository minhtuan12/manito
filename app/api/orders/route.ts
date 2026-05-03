import { NextResponse } from "next/server";
import { mockStore } from "@/lib/mock-store";

export async function GET() {
  return NextResponse.json({ items: mockStore.orders, total: mockStore.orders.length });
}
