type CartLine = {
  productId: string;
  quantity: number;
};

type Order = {
  id: string;
  status: "pending" | "confirmed" | "shipped";
  totalUsd: number;
};

export const mockStore = {
  cart: [] as CartLine[],
  wishlist: [] as string[],
  orders: [
    { id: "ORD-1001", status: "pending", totalUsd: 189 },
    { id: "ORD-1002", status: "confirmed", totalUsd: 438 }
  ] as Order[]
};
