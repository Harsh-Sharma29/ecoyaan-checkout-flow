"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

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
  shippingAddresses: ShippingAddress[];
  setShippingAddresses: (addrs: ShippingAddress[]) => void;
  // Keep backward compatibility — alias for the first address
  shippingAddress: ShippingAddress | null;
  setShippingAddress: (addr: ShippingAddress) => void;
  orderPlaced: boolean;
  placeOrder: () => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  clearPersistedState: () => void;
  hydrated: boolean;
}

// ---------- localStorage helpers ----------
const STORAGE_KEY = "ecoyaan_checkout_state";

interface PersistedState {
  cart: CartData | null;
  shippingAddresses: ShippingAddress[];
  orderPlaced: boolean;
  currentStep: number;
}

function loadState(): PersistedState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PersistedState;
  } catch {
    return null;
  }
}

function saveState(state: PersistedState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage full or unavailable — silently ignore
  }
}

function clearStorage() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore
  }
}

// ---------- Context ----------
const CheckoutContext = createContext<CheckoutContextValue | undefined>(
  undefined
);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  // Start with default values (matching SSR) to avoid hydration mismatch
  const [cart, setCartRaw] = useState<CartData | null>(null);
  const [shippingAddresses, setShippingAddressesRaw] = useState<
    ShippingAddress[]
  >([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [currentStep, setCurrentStepRaw] = useState(1);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage AFTER mount (client-only) to avoid SSR mismatch
  useEffect(() => {
    const persisted = loadState();
    if (persisted) {
      if (persisted.cart) setCartRaw(persisted.cart);
      if (persisted.shippingAddresses?.length > 0) {
        setShippingAddressesRaw(persisted.shippingAddresses);
      }
      if (persisted.orderPlaced) setOrderPlaced(persisted.orderPlaced);
      if (persisted.currentStep) setCurrentStepRaw(persisted.currentStep);
    }
    setHydrated(true);
  }, []);

  // Persist state on every change — but only after initial hydration
  useEffect(() => {
    if (!hydrated) return;
    saveState({ cart, shippingAddresses, orderPlaced, currentStep });
  }, [cart, shippingAddresses, orderPlaced, currentStep, hydrated]);

  const setCart = useCallback((data: CartData) => setCartRaw(data), []);

  const setShippingAddresses = useCallback(
    (addrs: ShippingAddress[]) => setShippingAddressesRaw(addrs),
    []
  );

  // Backward-compat single-address setter — sets first address
  const setShippingAddress = useCallback(
    (addr: ShippingAddress) =>
      setShippingAddressesRaw((prev) => {
        const next = [...prev];
        next[0] = addr;
        return next;
      }),
    []
  );

  const shippingAddress =
    shippingAddresses.length > 0 ? shippingAddresses[0] : null;

  const placeOrder = useCallback(() => setOrderPlaced(true), []);

  const setCurrentStep = useCallback(
    (step: number) => setCurrentStepRaw(step),
    []
  );

  const clearPersistedState = useCallback(() => {
    clearStorage();
  }, []);

  return (
    <CheckoutContext.Provider
      value={{
        cart,
        setCart,
        shippingAddresses,
        setShippingAddresses,
        shippingAddress,
        setShippingAddress,
        orderPlaced,
        placeOrder,
        currentStep,
        setCurrentStep,
        clearPersistedState,
        hydrated,
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
