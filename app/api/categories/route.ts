import { NextResponse } from "next/server";
import { categories } from "@/data/categories";

export async function GET() {
  return NextResponse.json({
    items: categories,
    total: categories.length
  });
}
