import { NextResponse } from "next/server";
import UserModel from "@/models/user";
import { connectToDatabase } from "@/lib/mongoose";
import { createUserSession, getSessionCookieOptions, SESSION_COOKIE_NAME, verifyPassword } from "@/lib/auth";
import { mapAuthenticatedUser } from "@/lib/account";

export async function POST(request: Request) {
  await connectToDatabase();

  try {
    const payload = (await request.json()) as {
      identifier?: string;
      password?: string;
    };

    const identifier = payload.identifier?.trim() ?? "";
    const password = payload.password ?? "";

    if (!identifier || !password) {
      return NextResponse.json({ message: "Identifier and password are required" }, { status: 400 });
    }

    const user = await UserModel.findOne({
      $or: [
        { email: identifier.toLowerCase() },
        { displayName: identifier },
      ],
    });

    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const { token, sessionExpiresAt } = await createUserSession(user._id.toString());
    const response = NextResponse.json({ user: mapAuthenticatedUser(user) });
    response.cookies.set(SESSION_COOKIE_NAME, token, getSessionCookieOptions(sessionExpiresAt));
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to login", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 },
    );
  }
}
