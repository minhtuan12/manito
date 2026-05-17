import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { mapPaymentMethod } from "@/lib/account";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, { params }: RouteParams) {
  const user = await getAuthenticatedUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const target = user.paymentMethods.find(
    (method: typeof user.paymentMethods[number]) => method.id === id,
  );

  if (!target) {
    return NextResponse.json({ message: "Payment method not found" }, { status: 404 });
  }

  const payload = (await request.json()) as { isDefault?: boolean };
  if (payload.isDefault) {
    user.paymentMethods.forEach((method: typeof user.paymentMethods[number]) => {
      method.isDefault = method.id === id;
    });
    await user.save();
  }

  return NextResponse.json({ paymentMethod: mapPaymentMethod(target) });
}

export async function DELETE(_: Request, { params }: RouteParams) {
  const user = await getAuthenticatedUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const nextMethods = user.paymentMethods.filter(
    (method: typeof user.paymentMethods[number]) => method.id !== id,
  );

  if (nextMethods.length === user.paymentMethods.length) {
    return NextResponse.json({ message: "Payment method not found" }, { status: 404 });
  }

  user.paymentMethods = nextMethods as any;
  if (
    user.paymentMethods.length > 0 &&
    !user.paymentMethods.some((method: typeof user.paymentMethods[number]) => method.isDefault)
  ) {
    user.paymentMethods[0].isDefault = true;
  }
  await user.save();

  return NextResponse.json({ items: user.paymentMethods.map(mapPaymentMethod) });
}
