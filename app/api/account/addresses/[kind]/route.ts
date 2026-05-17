import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { mapUserAddress } from "@/lib/account";

type RouteParams = {
  params: Promise<{ kind: string }>;
};

export async function GET(_: Request, { params }: RouteParams) {
  const user = await getAuthenticatedUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { kind } = await params;
  const normalizedKind = kind === "shipping" ? "shipping" : "billing";
  const address = user.addresses.find((entry: typeof user.addresses[number]) => entry.kind === normalizedKind);

  return NextResponse.json({ address: address ? mapUserAddress(address) : null });
}

export async function PUT(request: Request, { params }: RouteParams) {
  const user = await getAuthenticatedUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { kind } = await params;
    const normalizedKind = kind === "shipping" ? "shipping" : "billing";
    const payload = (await request.json()) as {
      firstName?: string;
      lastName?: string;
      companyName?: string;
      country?: string;
      address1?: string;
      address2?: string;
      city?: string;
      state?: string;
      postalCode?: string;
      phone?: string;
    };

    if (!payload.firstName || !payload.lastName || !payload.country || !payload.address1 || !payload.city || !payload.state) {
      return NextResponse.json({ message: "Missing required address fields" }, { status: 400 });
    }

    const nextAddress = {
      kind: normalizedKind,
      firstName: payload.firstName.trim(),
      lastName: payload.lastName.trim(),
      companyName: payload.companyName?.trim() ?? "",
      country: payload.country.trim(),
      address1: payload.address1.trim(),
      address2: payload.address2?.trim() ?? "",
      city: payload.city.trim(),
      state: payload.state.trim(),
      postalCode: payload.postalCode?.trim() ?? "",
      phone: payload.phone?.trim() ?? "",
    };

    const index = user.addresses.findIndex(
      (entry: typeof user.addresses[number]) => entry.kind === normalizedKind,
    );
    if (index >= 0) {
      user.addresses[index] = nextAddress as any;
    } else {
      user.addresses.push(nextAddress as any);
    }

    await user.save();

    return NextResponse.json({ address: nextAddress });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to save address", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 },
    );
  }
}
