import { NextResponse } from "next/server";
import OrderModel from "@/models/order";
import { getAuthenticatedUser } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongoose";
import { mapOrder } from "@/lib/account";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, { params }: RouteParams) {
  const user = await getAuthenticatedUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();
  const { id } = await params;
  const payload = (await request.json()) as {
    status?: "pending" | "processing" | "confirmed" | "shipped" | "delivered" | "cancelled";
  };
  if (!payload.status) {
    return NextResponse.json({ message: "status is required" }, { status: 400 });
  }

  const target = await OrderModel.findOne({
    userId: user._id,
    $or: [{ _id: id }, { orderNumber: id }],
  });
  if (!target) {
    return NextResponse.json({ message: "Order not found" }, { status: 404 });
  }
  target.status = payload.status;
  await target.save();
  return NextResponse.json(mapOrder(target));
}
