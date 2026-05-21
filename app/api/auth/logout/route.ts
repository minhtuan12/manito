import { NextResponse } from "next/server";
import { clearUserSession } from "@/lib/auth";

export async function POST() {
  await clearUserSession();
  return NextResponse.json({ success: true });
}

export async function GET(request: Request) {
  await clearUserSession();
  const url = new URL(request.url);
  const redirectTo = url.searchParams.get("redirect") ?? "/";
  return new NextResponse(null, {
    status: 302,
    headers: {
      Location: redirectTo,
    },
  });
}
