import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { mapPaymentMethod } from "@/lib/account";

export async function GET() {
  const user = await getAuthenticatedUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ items: user.paymentMethods.map(mapPaymentMethod) });
}

export async function POST(request: Request) {
  const user = await getAuthenticatedUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = (await request.json()) as {
      cardholderName?: string;
      brand?: string;
      cardNumber?: string;
      expiryMonth?: string;
      expiryYear?: string;
      isDefault?: boolean;
    };

    if (!payload.cardholderName || !payload.brand || !payload.cardNumber || !payload.expiryMonth || !payload.expiryYear) {
      return NextResponse.json({ message: "Missing required payment fields" }, { status: 400 });
    }

    const normalizedCardNumber = payload.cardNumber.replace(/\s+/g, "");
    if (normalizedCardNumber.length < 4) {
      return NextResponse.json({ message: "Card number is invalid" }, { status: 400 });
    }

    if (payload.isDefault) {
      user.paymentMethods.forEach((method: typeof user.paymentMethods[number]) => {
        method.isDefault = false;
      });
    }

    const created = {
      id: randomUUID(),
      cardholderName: payload.cardholderName.trim(),
      brand: payload.brand.trim(),
      last4: normalizedCardNumber.slice(-4),
      expiryMonth: payload.expiryMonth.trim(),
      expiryYear: payload.expiryYear.trim(),
      isDefault: payload.isDefault ?? user.paymentMethods.length === 0,
    };

    user.paymentMethods.push(created as any);
    await user.save();

    return NextResponse.json({ paymentMethod: created }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to add payment method", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 },
    );
  }
}
