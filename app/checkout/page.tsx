"use client";

import { useCheckout } from "@/context/CheckoutContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AddressForm from "@/components/AddressForm";
import StepIndicator from "@/components/StepIndicator";

export default function CheckoutPage() {
  const { cart } = useCheckout();
  const router = useRouter();

  // Redirect to cart if no cart data
  useEffect(() => {
    if (!cart) router.replace("/");
  }, [cart, router]);

  if (!cart) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-400 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up">
      <StepIndicator currentStep={2} />

      <div className="mt-6 max-w-2xl mx-auto">
        <div className="rounded-2xl border border-gray-100 bg-white/70 backdrop-blur-md p-6 sm:p-8 shadow-sm">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-1">
            Shipping Address
          </h1>
          <p className="text-sm text-gray-400 mb-6">
            Where should we deliver your eco-friendly goodies?
          </p>

          <AddressForm />
        </div>

        {/* Back link */}
        <button
          onClick={() => router.push("/")}
          className="mt-4 flex items-center gap-1 text-sm text-gray-400 hover:text-emerald-600 transition-colors mx-auto cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"/>
          </svg>
          Back to Cart
        </button>
      </div>
    </div>
  );
}
