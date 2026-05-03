import { NextResponse } from "next/server";
import { siteContent } from "@/data/site-content";

export async function GET() {
  return NextResponse.json(siteContent);
}
