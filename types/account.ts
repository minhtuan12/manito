export type AccountAddress = {
  kind: "billing" | "shipping";
  firstName: string;
  lastName: string;
  companyName: string;
  country: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
};

export type PaymentMethod = {
  id: string;
  cardholderName: string;
  brand: string;
  last4: string;
  expiryMonth: string;
  expiryYear: string;
  isDefault: boolean;
};

export type RewardCoupon = {
  code: string;
  title: string;
  description: string;
  discountLabel: string;
  expiresAt: string;
};

export type RewardSummary = {
  availablePoints: number;
  redeemedPoints: number;
  usedRewards: number;
  rewardsValueUsd: number;
  currentLevelLabel: string;
  nextLevelLabel: string;
  nextLevelThreshold: number;
  coupons: RewardCoupon[];
};

export type AuthenticatedUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  gender: "ms" | "mrs" | "mr" | "not";
  birthday: string;
  acceptsMarketing: boolean;
  addresses: AccountAddress[];
  paymentMethods: PaymentMethod[];
  reward: RewardSummary;
  wishlistProductSlugs: string[];
  createdAt: string;
};

export type AccountOrder = {
  id: string;
  orderNumber: string;
  status: "pending" | "processing" | "confirmed" | "shipped" | "delivered" | "cancelled";
  subtotalUsd: number;
  shippingUsd: number;
  totalUsd: number;
  placedAt: string;
  items: Array<{
    productSlug: string;
    productTitle: string;
    image: string;
    quantity: number;
    unitPriceUsd: number;
  }>;
};
