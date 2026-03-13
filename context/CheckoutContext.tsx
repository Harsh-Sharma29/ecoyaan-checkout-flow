"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// ---------- Types ----------
export interface CartItem {
  product_id: number;
  product_name: string;
  product_price: number;
  quantity: number;
  image: string;
}

export interface CartData {
  cartItems: CartItem[];
  shipping_fee: number;
  discount_applied: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  pinCode: string;
  city: string;
  state: string;
}

interface CheckoutContextValue {
  cart: CartData | null;
  setCart: (data: CartData) => void;
  shippingAddress: ShippingAddress | null;
  setShippingAddress: (addr: ShippingAddress) => void;
  orderPlaced: boolean;
  placeOrder: () => void;
}

// ---------- Context ----------
const CheckoutContext = createContext<CheckoutContextValue | undefined>(
  undefined
);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartData | null>(null);
  const [shippingAddress, setShippingAddress] =
    useState<ShippingAddress | null>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const placeOrder = () => setOrderPlaced(true);

  return (
    <CheckoutContext.Provider
      value={{
        cart,
        setCart,
        shippingAddress,
        setShippingAddress,
        orderPlaced,
        placeOrder,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error("useCheckout must be used within CheckoutProvider");
  return ctx;
}
