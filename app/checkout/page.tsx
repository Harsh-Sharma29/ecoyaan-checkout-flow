"use client";

import { useCheckout } from "@/context/CheckoutContext";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import AddressForm from "@/components/AddressForm";
import StepIndicator from "@/components/StepIndicator";
import StickyFooter from "@/components/StickyFooter";

export default function CheckoutPage() {
  const { cart, shippingAddresses, setCurrentStep, hydrated } = useCheckout();
  const router = useRouter();

  // Redirect to cart if no cart data — only after hydration
  useEffect(() => {
    if (hydrated && !cart) router.replace("/");
  }, [cart, router, hydrated]);

  useEffect(() => {
    setCurrentStep(2);
  }, [setCurrentStep]);

  const isFormValid = useMemo(() => {
    if (shippingAddresses.length === 0) return false;
    return shippingAddresses.every((a) => {
      return (
        a.fullName.trim() !== "" &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a.email) &&
        /^\d{10}$/.test(a.phone) &&
        /^\d{6}$/.test(a.pinCode) &&
        a.city.trim() !== "" &&
        a.state.trim() !== ""
      );
    });
  }, [shippingAddresses]);

  if (!hydrated || !cart) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-400 border-t-transparent" />
      </div>
    );
  }

  const handleNext = () => {
    // Programmatically submit the form to trigger validation
    const submitBtn = document.getElementById("address-form-submit");
    if (submitBtn) submitBtn.click();
  };

  return (
    <div className="animate-fade-in-up has-sticky-footer">
      <StepIndicator currentStep={2} />

      <div className="mt-6 max-w-2xl mx-auto">
        <div className="rounded-2xl border border-gray-100 bg-white/70 backdrop-blur-md p-6 sm:p-8 shadow-sm">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-1">
            Shipping Address
          </h1>
          <p className="text-sm text-gray-400 mb-6">
            Where should we deliver your eco-friendly goodies?
          </p>

          <AddressForm onSubmit={() => router.push("/payment")} />
        </div>
      </div>

      {/* Sticky bottom action bar */}
      <StickyFooter>
        <button onClick={() => router.push("/")} className="btn-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!isFormValid}
          className="btn-primary"
        >
          Next Step
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
