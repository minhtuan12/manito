import { NextResponse } from "next/server";
import OrderModel from "@/models/order";
import { getAuthenticatedUser } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongoose";
import { mapOrder } from "@/lib/account";

export async function GET() {
  const user = await getAuthenticatedUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();
  const orders = await OrderModel.find({ userId: user._id }).sort({ placedAt: -1 });

  return NextResponse.json({ items: orders.map(mapOrder), total: orders.length });
}
