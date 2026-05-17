"use client";

import type { ReactNode } from "react";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/types/domain";

export type CurrencyCode = "USD" | "VND";

export type CartItem = {
  product: Product;
  quantity: number;
  selectedOptions?: Record<string, string>;
};

type StorefrontContextValue = {
  cartItems: CartItem[];
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  addToCart: (product: Product, selectedOptions?: Record<string, string>) => void;
  updateQuantity: (productSlug: string, quantity: number) => void;
  removeFromCart: (productSlug: string) => void;
  subtotal: number;
  formatPrice: (amount: number) => string;
};

const StorefrontContext = createContext<StorefrontContextValue | null>(null);
const STORAGE_KEY = "manito-storefront-state";
const VND_PER_USD = 26354;

function loadStoredState() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) as { cartItems?: CartItem[]; currency?: CurrencyCode } : null;
  } catch {
    return null;
  }
}

export function StorefrontProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const stored = loadStoredState();
    if (stored?.cartItems) {
      setCartItems(stored.cartItems);
    }
    if (stored?.currency === "USD" || stored?.currency === "VND") {
      setCurrency(stored.currency);
    }
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (!hasLoaded) {
      return;
    }

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ cartItems, currency }),
    );
  }, [cartItems, currency, hasLoaded]);

  const addToCart = useCallback((product: Product, selectedOptions?: Record<string, string>) => {
    setCartItems((current) => {
      const existing = current.find((item) => item.product.slug === product.slug);

      if (existing) {
        return current.map((item) =>
          item.product.slug === product.slug
            ? { ...item, quantity: Math.min(product.stock || item.quantity + 1, item.quantity + 1) }
            : item,
        );
      }

      return [...current, { product, quantity: 1, selectedOptions }];
    });
  }, []);

  const updateQuantity = useCallback((productSlug: string, quantity: number) => {
    setCartItems((current) =>
      current
        .map((item) =>
          item.product.slug === productSlug
            ? { ...item, quantity: Math.max(1, Math.min(item.product.stock || quantity, quantity)) }
            : item,
        ),
    );
  }, []);

  const removeFromCart = useCallback((productSlug: string) => {
    setCartItems((current) => current.filter((item) => item.product.slug !== productSlug));
  }, []);

  const subtotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.product.priceUsd * item.quantity, 0),
    [cartItems],
  );

  const formatPrice = useCallback((amount: number) => {
    if (currency === "VND") {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        maximumFractionDigits: 0,
      }).format(amount);
    }

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(amount / VND_PER_USD);
  }, [currency]);

  const value = useMemo<StorefrontContextValue>(
    () => ({
      cartItems,
      currency,
      setCurrency,
      addToCart,
      updateQuantity,
      removeFromCart,
      subtotal,
      formatPrice,
    }),
    [addToCart, cartItems, currency, formatPrice, removeFromCart, subtotal, updateQuantity],
  );

  return (
    <StorefrontContext.Provider value={value}>
      {children}
    </StorefrontContext.Provider>
  );
}

export function useStorefront() {
  const context = useContext(StorefrontContext);

  if (!context) {
    throw new Error("useStorefront must be used inside StorefrontProvider");
  }

  return context;
}
