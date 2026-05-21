import { NextResponse } from "next/server";
import UserModel from "@/models/user";
import { connectToDatabase } from "@/lib/mongoose";
import { createWelcomeRewardCoupon, mapAuthenticatedUser } from "@/lib/account";
import { createUserSession, getSessionCookieOptions, hashPassword, SESSION_COOKIE_NAME } from "@/lib/auth";

export async function POST(request: Request) {
  await connectToDatabase();

  try {
    const payload = (await request.json()) as {
      firstName?: string;
      lastName?: string;
      email?: string;
      password?: string;
      gender?: "ms" | "mrs" | "mr" | "not";
      birthday?: string;
      acceptsMarketing?: boolean;
    };

    const firstName = payload.firstName?.trim() ?? "";
    const lastName = payload.lastName?.trim() ?? "";
    const email = payload.email?.trim().toLowerCase() ?? "";
    const password = payload.password ?? "";

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const existing = await UserModel.findOne({ email }).lean();
    if (existing) {
      return NextResponse.json({ message: "An account with this email already exists" }, { status: 409 });
    }

    const displayName = email.split("@")[0] || `${firstName}${lastName}`;
    const created = await UserModel.create({
      firstName,
      lastName,
      email,
      passwordHash: await hashPassword(password),
      displayName,
      gender: payload.gender ?? "not",
      birthday: payload.birthday ? new Date(payload.birthday) : null,
      acceptsMarketing: payload.acceptsMarketing ?? false,
      reward: {
        availablePoints: 0,
        redeemedPoints: 0,
        usedRewards: 0,
        rewardsValueUsd: 0,
        currentLevelLabel: "YAMOPAD Loyalty Member",
        nextLevelLabel: "YAMOPAD Silver Member",
        nextLevelThreshold: 301,
        coupons: [createWelcomeRewardCoupon(email)],
      },
    });

    const { token, sessionExpiresAt } = await createUserSession(created._id.toString());
    const response = NextResponse.json({ user: mapAuthenticatedUser(created) }, { status: 201 });
    response.cookies.set(SESSION_COOKIE_NAME, token, getSessionCookieOptions(sessionExpiresAt));
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to register", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 },
    );
  }
}
