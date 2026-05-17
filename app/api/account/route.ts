import { NextResponse } from "next/server";
import { getAuthenticatedUser, hashPassword, verifyPassword } from "@/lib/auth";
import { mapAuthenticatedUser } from "@/lib/account";

export async function GET() {
  const user = await getAuthenticatedUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ user: mapAuthenticatedUser(user) });
}

export async function PATCH(request: Request) {
  const user = await getAuthenticatedUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = (await request.json()) as {
      firstName?: string;
      lastName?: string;
      displayName?: string;
      gender?: "ms" | "mrs" | "mr" | "not";
      email?: string;
      birthday?: string;
      acceptsMarketing?: boolean;
      currentPassword?: string;
      newPassword?: string;
      confirmNewPassword?: string;
    };

    if (payload.newPassword || payload.confirmNewPassword || payload.currentPassword) {
      if (!payload.currentPassword) {
        return NextResponse.json({ message: "Current password is required" }, { status: 400 });
      }

      const valid = await verifyPassword(payload.currentPassword, user.passwordHash);
      if (!valid) {
        return NextResponse.json({ message: "Current password is incorrect" }, { status: 400 });
      }

      if (!payload.newPassword || payload.newPassword !== payload.confirmNewPassword) {
        return NextResponse.json({ message: "New passwords do not match" }, { status: 400 });
      }

      user.passwordHash = await hashPassword(payload.newPassword);
    }

    user.firstName = payload.firstName?.trim() || user.firstName;
    user.lastName = payload.lastName?.trim() || user.lastName;
    user.displayName = payload.displayName?.trim() || user.displayName;
    user.gender = payload.gender ?? user.gender;
    user.email = payload.email?.trim().toLowerCase() || user.email;
    user.birthday = payload.birthday ? new Date(payload.birthday) : null;
    user.acceptsMarketing = payload.acceptsMarketing ?? user.acceptsMarketing;

    await user.save();

    return NextResponse.json({ user: mapAuthenticatedUser(user) });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update account", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 },
    );
  }
}
