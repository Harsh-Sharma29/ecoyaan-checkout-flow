"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CartData, useCheckout } from "@/context/CheckoutContext";
import CartItem from "@/components/CartItem";
import OrderSummary from "@/components/OrderSummary";
import StepIndicator from "@/components/StepIndicator";
import StickyFooter from "@/components/StickyFooter";

interface Props {
  initialCart: CartData;
}

export default function CartPageClient({ initialCart }: Props) {
  const router = useRouter();
  const { cart, setCart, setCurrentStep } = useCheckout();

  // Hydrate context with SSR data on mount
  useEffect(() => {
    if (!cart) setCart(initialCart);
  }, [cart, setCart, initialCart]);

  useEffect(() => {
    setCurrentStep(1);
  }, [setCurrentStep]);

  const currentCart = cart ?? initialCart;

  return (
    <div className="animate-fade-in-up has-sticky-footer">
      {/* Step indicator */}
      <StepIndicator currentStep={1} />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
            Your Cart
            <span className="ml-2 text-base font-medium text-gray-400">
              ({currentCart.cartItems.length} items)
            </span>
          </h1>

          <div className="space-y-3">
            {currentCart.cartItems.map((item, i) => (
              <div
                key={item.product_id}
                className={`animate-fade-in-up stagger-${i + 1}`}
              >
                <CartItem item={item} />
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-4">
            <OrderSummary cart={currentCart} />

            <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Secure
              </span>
              <span className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h3.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1v-3a1 1 0 00-.293-.707l-3-3A1 1 0 0016 6h-2V5a1 1 0 00-1-1H3z" />
                </svg>
                Free Returns
              </span>
              <span className="flex items-center gap-1">🌿 Eco Friendly</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky bottom action bar */}
      <StickyFooter>
        <div>{/* No back button on car page */}</div>
        <button
          onClick={() => router.push("/checkout")}
          id="proceed-to-checkout"
          className="btn-primary ml-auto"
        >
          Proceed to Checkout
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </StickyFooter>
    </div>
  );
}
