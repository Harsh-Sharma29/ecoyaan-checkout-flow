"use client";

import { useCheckout } from "@/context/CheckoutContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import OrderSummary from "@/components/OrderSummary";
import StepIndicator from "@/components/StepIndicator";
import StickyFooter from "@/components/StickyFooter";

export default function PaymentPage() {
  const {
    cart,
    shippingAddress,
    shippingAddresses,
    placeOrder,
    setCurrentStep,
    hydrated,
  } = useCheckout();
  const router = useRouter();
  const [processing, setProcessing] = useState(false);

  // Guard: redirect if data is missing — only after hydration
  useEffect(() => {
    if (!hydrated) return;
    if (!cart) {
      router.replace("/");
    } else if (!shippingAddress) {
      router.replace("/checkout");
    }
  }, [cart, shippingAddress, router, hydrated]);

  useEffect(() => {
    setCurrentStep(3);
  }, [setCurrentStep]);

  if (!hydrated || !cart || !shippingAddress) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-400 border-t-transparent" />
      </div>
    );
  }

  const handlePay = async () => {
    if (processing) return;
    setProcessing(true);
    await new Promise((res) => setTimeout(res, 2000));
    placeOrder();
    router.push("/success");
  };

  return (
    <div className="animate-fade-in-up has-sticky-footer">
      <StepIndicator currentStep={3} />

      <div className="mt-6 max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Order + Address Details */}
        <div className="space-y-5">
          <OrderSummary cart={cart} />

          {/* Shipping Address Cards */}
          {shippingAddresses.map((addr, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-gray-100 bg-white/70 backdrop-blur-md p-5"
            >
              <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                {idx === 0 ? "Shipping To" : `Address ${idx + 1}`}
              </h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p className="font-semibold text-gray-800">{addr.fullName}</p>
                <p>{addr.email}</p>
                <p>{addr.phone}</p>
                <p>
                  {addr.city}, {addr.state} – {addr.pinCode}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Payment Action */}
        <div>
          <div className="sticky top-24 rounded-2xl border border-gray-100 bg-white/70 backdrop-blur-md p-6 space-y-5">
            <h2 className="text-lg font-bold text-gray-800">Payment</h2>

            <div className="rounded-xl bg-gradient-to-br from-gray-900 to-gray-700 p-5 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">
                Payment Method
              </p>
              <p className="font-mono text-lg tracking-widest">
                •••• •••• •••• 4242
              </p>
              <div className="mt-4 flex justify-between text-xs text-gray-400">
                <span>CARD HOLDER</span>
                <span>EXPIRES</span>
              </div>
              <div className="flex justify-between text-sm font-medium mt-0.5">
                <span>{shippingAddress.fullName.toUpperCase()}</span>
                <span>12/28</span>
              </div>
            </div>

            {/* Simulated payment disclaimer */}
            <p className="text-xs text-center text-amber-600 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
              ⚠️ This is a simulated payment for demonstration purposes.
            </p>

            <div className="space-y-3 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-emerald-500 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Protected by 256-bit SSL encryption
              </div>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-emerald-500 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Money-back guarantee
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky bottom action bar */}
      <StickyFooter>
        <button
          onClick={() => router.push("/checkout")}
          className="btn-secondary"
        >
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
          id="pay-securely"
          onClick={handlePay}
          disabled={processing}
          className="btn-primary"
        >
          {processing ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Processing…
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              Pay Securely
            </>
          )}
        </button>
      </StickyFooter>
    </div>
  );
}
