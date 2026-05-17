import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { cookies } from "next/headers";
import UserModel from "@/models/user";
import { connectToDatabase } from "@/lib/mongoose";

const scrypt = promisify(scryptCallback);

export const SESSION_COOKIE_NAME = "yamopad_session";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 14;

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derived = (await scrypt(password, salt, 64)) as Buffer;
  return `${salt}:${derived.toString("hex")}`;
}

export async function verifyPassword(password: string, passwordHash: string) {
  const [salt, expectedHash] = passwordHash.split(":");

  if (!salt || !expectedHash) {
    return false;
  }

  const actual = (await scrypt(password, salt, 64)) as Buffer;
  const expected = Buffer.from(expectedHash, "hex");

  if (actual.length !== expected.length) {
    return false;
  }

  return timingSafeEqual(actual, expected);
}

export async function createUserSession(userId: string) {
  await connectToDatabase();

  const token = randomBytes(32).toString("hex");
  const sessionExpiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  await UserModel.findByIdAndUpdate(userId, {
    sessionToken: token,
    sessionExpiresAt,
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: sessionExpiresAt,
    path: "/",
  });

  return token;
}

export async function clearUserSession(token?: string | null) {
  await connectToDatabase();

  const cookieStore = await cookies();
  const resolvedToken = token ?? cookieStore.get(SESSION_COOKIE_NAME)?.value ?? null;

  if (resolvedToken) {
    await UserModel.updateOne(
      { sessionToken: resolvedToken },
      { $set: { sessionToken: null, sessionExpiresAt: null } },
    );
  }

  cookieStore.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0),
    path: "/",
  });
}

export async function getAuthenticatedUser() {
  await connectToDatabase();

  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  const user = await UserModel.findOne({
    sessionToken: token,
    sessionExpiresAt: { $gt: new Date() },
  });

  if (!user) {
    return null;
  }

  return user;
}
