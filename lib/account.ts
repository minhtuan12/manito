import type { Locale } from "@/types/domain";
import type {
  UserAddressDocument,
  UserDocument,
  UserPaymentMethodDocument,
  UserRewardDocument,
} from "@/models/user";
import type { OrderDocument } from "@/models/order";

export const ACCOUNT_SECTIONS = [
  "dashboard",
  "orders",
  "addresses",
  "payment-methods",
  "account-details",
  "points-and-rewards",
  "wishlist",
  "logout",
] as const;

export type AccountSection = (typeof ACCOUNT_SECTIONS)[number];
export type AccountNavigableSection = Exclude<AccountSection, "logout">;

const accountSectionPath: Record<AccountNavigableSection, string> = {
  dashboard: "",
  orders: "/orders",
  addresses: "/addresses",
  "payment-methods": "/payment-methods",
  "account-details": "/account-details",
  "points-and-rewards": "/points-and-rewards",
  wishlist: "/wishlist",
};

export function getAccountSectionHref(locale: Locale, section: AccountNavigableSection) {
  return `/${locale}/my-account${accountSectionPath[section]}`;
}

export function getAccountSectionLabel(locale: Locale, section: AccountSection) {
  const labels: Record<AccountSection, { en: string; vi: string }> = {
    dashboard: { en: "Dashboard", vi: "Bảng điều khiển" },
    orders: { en: "Orders", vi: "Đơn hàng" },
    addresses: { en: "Addresses", vi: "Địa chỉ" },
    "payment-methods": { en: "Payment methods", vi: "Phương thức thanh toán" },
    "account-details": { en: "Account details", vi: "Chi tiết tài khoản" },
    "points-and-rewards": { en: "Points & Rewards", vi: "Điểm & Ưu đãi" },
    wishlist: { en: "Wishlist", vi: "Yêu thích" },
    logout: { en: "Logout", vi: "Đăng xuất" },
  };

  return labels[section][locale];
}

export function createWelcomeRewardCoupon(email: string) {
  const prefix = email.split("@")[0]?.slice(0, 8).toUpperCase() || "MEMBER";
  return {
    code: `YAMOPAD-${prefix}-5OFF`,
    title: "5% Off YAMOPAD'S Choices",
    description: "Welcome reward for your first qualifying order.",
    discountLabel: "Percentage discount - 5%",
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  };
}

export function mapUserAddress(address: UserAddressDocument) {
  return {
    kind: address.kind,
    firstName: address.firstName,
    lastName: address.lastName,
    companyName: address.companyName ?? "",
    country: address.country,
    address1: address.address1,
    address2: address.address2 ?? "",
    city: address.city,
    state: address.state,
    postalCode: address.postalCode ?? "",
    phone: address.phone ?? "",
  };
}

export function mapPaymentMethod(paymentMethod: UserPaymentMethodDocument) {
  return {
    id: paymentMethod.id,
    cardholderName: paymentMethod.cardholderName,
    brand: paymentMethod.brand,
    last4: paymentMethod.last4,
    expiryMonth: paymentMethod.expiryMonth,
    expiryYear: paymentMethod.expiryYear,
    isDefault: paymentMethod.isDefault ?? false,
  };
}

export function mapReward(reward: UserRewardDocument | undefined) {
  return {
    availablePoints: reward?.availablePoints ?? 0,
    redeemedPoints: reward?.redeemedPoints ?? 0,
    usedRewards: reward?.usedRewards ?? 0,
    rewardsValueUsd: reward?.rewardsValueUsd ?? 0,
    currentLevelLabel: reward?.currentLevelLabel ?? "YAMOPAD Loyalty Member",
    nextLevelLabel: reward?.nextLevelLabel ?? "YAMOPAD Silver Member",
    nextLevelThreshold: reward?.nextLevelThreshold ?? 301,
    coupons: (reward?.coupons ?? []).map((coupon) => ({
      code: coupon.code,
      title: coupon.title,
      description: coupon.description,
      discountLabel: coupon.discountLabel,
      expiresAt: coupon.expiresAt?.toISOString?.() ?? coupon.expiresAt,
    })),
  };
}

export function mapAuthenticatedUser(user: UserDocument) {
  return {
    id: user._id.toString(),
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    displayName: user.displayName,
    gender: user.gender,
    birthday: user.birthday?.toISOString?.().slice(0, 10) ?? "",
    acceptsMarketing: user.acceptsMarketing ?? false,
    addresses: (user.addresses ?? []).map(mapUserAddress),
    paymentMethods: (user.paymentMethods ?? []).map(mapPaymentMethod),
    reward: mapReward(user.reward),
    wishlistProductSlugs: user.wishlistProductSlugs ?? [],
    createdAt: user.createdAt?.toISOString?.() ?? "",
  };
}

export function mapOrder(order: OrderDocument) {
  return {
    id: order._id.toString(),
    orderNumber: order.orderNumber,
    status: order.status,
    subtotalUsd: order.subtotalUsd,
    shippingUsd: order.shippingUsd,
    totalUsd: order.totalUsd,
    placedAt: order.placedAt?.toISOString?.() ?? "",
    items: (order.items ?? []).map((item) => ({
      productSlug: item.productSlug,
      productTitle: item.productTitle,
      image: item.image,
      quantity: item.quantity,
      unitPriceUsd: item.unitPriceUsd,
    })),
  };
}

export function formatAddressLines(address: ReturnType<typeof mapUserAddress>) {
  return [
    `${address.firstName} ${address.lastName}`.trim(),
    address.companyName,
    address.address1,
    address.address2,
    [address.city, address.state, address.postalCode].filter(Boolean).join(", "),
    address.country,
    address.phone,
  ].filter(Boolean);
}
