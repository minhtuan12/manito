import { NextResponse } from "next/server";
import { mockStore } from "@/lib/mock-store";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const payload = (await request.json()) as { status?: "pending" | "confirmed" | "shipped" };
  if (!payload.status) {
    return NextResponse.json({ message: "status is required" }, { status: 400 });
  }

  const target = mockStore.orders.find((order) => order.id === id);
  if (!target) {
    return NextResponse.json({ message: "Order not found" }, { status: 404 });
  }
  target.status = payload.status;
  return NextResponse.json(target);
}
