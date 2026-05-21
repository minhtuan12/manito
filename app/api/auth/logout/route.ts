import { NextResponse } from "next/server";
import { clearUserSession } from "@/lib/auth";

export async function POST() {
  await clearUserSession();
  return NextResponse.json({ success: true });
}

export async function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
