import { model, models, Schema, type InferSchemaType, type Types } from "mongoose";

const orderItemSchema = new Schema(
  {
    productSlug: { type: String, required: true, trim: true },
    productTitle: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, min: 1 },
    unitPriceUsd: { type: Number, required: true, min: 0 },
  },
  { _id: false },
);

const orderAddressSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true },
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

const orderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    orderNumber: { type: String, required: true, unique: true, trim: true, index: true },
    status: {
      type: String,
      enum: ["pending", "processing", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    items: { type: [orderItemSchema], default: [] },
    subtotalUsd: { type: Number, required: true, min: 0 },
    shippingUsd: { type: Number, default: 0, min: 0 },
    totalUsd: { type: Number, required: true, min: 0 },
    billingAddress: { type: orderAddressSchema, required: true },
    shippingAddress: { type: orderAddressSchema, required: true },
    placedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export type OrderDocument = InferSchemaType<typeof orderSchema> & { _id: Types.ObjectId };

const OrderModel = models.Order || model("Order", orderSchema);

export default OrderModel;
