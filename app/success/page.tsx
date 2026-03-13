"use client";

import { useCheckout } from "@/context/CheckoutContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import StepIndicator from "@/components/StepIndicator";

export default function SuccessPage() {
  const { orderPlaced, cart, shippingAddress } = useCheckout();
  const router = useRouter();

  useEffect(() => {
    if (!orderPlaced) router.replace("/");
  }, [orderPlaced, router]);

  if (!orderPlaced || !cart || !shippingAddress) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-400 border-t-transparent" />
      </div>
    );
  }

  const total =
    cart.cartItems.reduce((s, i) => s + i.product_price * i.quantity, 0) +
    cart.shipping_fee -
    cart.discount_applied;

  return (
    <div className="animate-fade-in-up">
      <StepIndicator currentStep={4} />

      <div className="mt-10 max-w-lg mx-auto text-center">
        {/* Success Icon */}
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 shadow-2xl shadow-emerald-500/30 animate-pulse-glow">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
          </svg>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-2">
          Order Successful! 🎉
        </h1>
        <p className="text-gray-400 mb-8 text-sm sm:text-base">
          Thank you for choosing eco-friendly products.
          <br />
          Your order has been placed and will be delivered soon.
        </p>

        {/* Order Details Card */}
        <div className="rounded-2xl border border-gray-100 bg-white/70 backdrop-blur-md p-6 text-left space-y-4 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Order ID</span>
            <span className="font-mono font-bold text-gray-800">
              #ECO-{Date.now().toString().slice(-8)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Amount Paid</span>
            <span className="font-bold text-emerald-600">₹{total}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Items</span>
            <span className="font-medium text-gray-800">
              {cart.cartItems.length} product{cart.cartItems.length > 1 ? "s" : ""}
            </span>
          </div>
          <div className="border-t border-dashed border-gray-200 pt-3">
            <p className="text-xs text-gray-400 mb-1">Delivering to</p>
            <p className="text-sm font-semibold text-gray-800">
              {shippingAddress.fullName}
            </p>
            <p className="text-sm text-gray-500">
              {shippingAddress.city}, {shippingAddress.state} – {shippingAddress.pinCode}
            </p>
          </div>
        </div>

        {/* Eco impact note */}
        <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4 mb-6">
          <p className="text-sm font-medium text-emerald-700 flex items-center justify-center gap-2">
            🌱 You saved ~120g of plastic waste with this order
          </p>
        </div>

        {/* Continue Shopping button — prominent CTA */}
        <button
          onClick={() => router.push("/")}
          id="continue-shopping"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/30 hover:from-emerald-600 hover:to-teal-600 active:scale-[0.98] cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
          </svg>
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
