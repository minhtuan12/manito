import { model, models, Schema, type InferSchemaType, type Types } from "mongoose";

const userAddressSchema = new Schema(
  {
    kind: {
      type: String,
      enum: ["billing", "shipping"],
      required: true,
    },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    companyName: { type: String, default: "", trim: true },
    country: { type: String, required: true, trim: true },
    address1: { type: String, required: true, trim: true },
    address2: { type: String, default: "", trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    postalCode: { type: String, default: "", trim: true },
    phone: { type: String, default: "", trim: true },
  },
  { _id: false },
);

const userPaymentMethodSchema = new Schema(
  {
    id: { type: String, required: true, trim: true },
    cardholderName: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    last4: { type: String, required: true, trim: true },
    expiryMonth: { type: String, required: true, trim: true },
    expiryYear: { type: String, required: true, trim: true },
    isDefault: { type: Boolean, default: false },
  },
  { _id: false },
);

const userRewardCouponSchema = new Schema(
  {
    code: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    discountLabel: { type: String, required: true, trim: true },
    expiresAt: { type: Date, required: true },
  },
  { _id: false },
);

const userRewardSchema = new Schema(
  {
    availablePoints: { type: Number, default: 0, min: 0 },
    redeemedPoints: { type: Number, default: 0, min: 0 },
    usedRewards: { type: Number, default: 0, min: 0 },
    rewardsValueUsd: { type: Number, default: 0, min: 0 },
    currentLevelLabel: { type: String, default: "YAMOPAD Loyalty Member", trim: true },
    nextLevelLabel: { type: String, default: "YAMOPAD Silver Member", trim: true },
    nextLevelThreshold: { type: Number, default: 301, min: 0 },
    coupons: { type: [userRewardCouponSchema], default: [] },
  },
  { _id: false },
);

const userSchema = new Schema(
  {
    email: { type: String, required: true, trim: true, unique: true, lowercase: true, index: true },
    passwordHash: { type: String, required: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    displayName: { type: String, required: true, trim: true },
    gender: {
      type: String,
      enum: ["ms", "mrs", "mr", "not"],
      default: "not",
    },
    birthday: { type: Date, default: null },
    acceptsMarketing: { type: Boolean, default: false },
    addresses: { type: [userAddressSchema], default: [] },
    paymentMethods: { type: [userPaymentMethodSchema], default: [] },
    wishlistProductSlugs: { type: [String], default: [] },
    reward: {
      type: userRewardSchema,
      default: () => ({
        availablePoints: 0,
        redeemedPoints: 0,
        usedRewards: 0,
        rewardsValueUsd: 0,
        currentLevelLabel: "YAMOPAD Loyalty Member",
        nextLevelLabel: "YAMOPAD Silver Member",
        nextLevelThreshold: 301,
        coupons: [],
      }),
    },
    sessionToken: { type: String, default: null, index: true },
    sessionExpiresAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export type UserDocument = InferSchemaType<typeof userSchema> & { _id: Types.ObjectId };
export type UserAddressDocument = InferSchemaType<typeof userAddressSchema>;
export type UserPaymentMethodDocument = InferSchemaType<typeof userPaymentMethodSchema>;
export type UserRewardDocument = InferSchemaType<typeof userRewardSchema>;

const UserModel = models.User || model("User", userSchema);

export default UserModel;
