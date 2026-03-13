"use client";

import { CartData } from "@/context/CheckoutContext";

interface OrderSummaryProps {
  cart: CartData;
  compact?: boolean;
}

export default function OrderSummary({ cart, compact = false }: OrderSummaryProps) {
  const subtotal = cart.cartItems.reduce(
    (sum, item) => sum + item.product_price * item.quantity,
    0
  );
  const total = subtotal + cart.shipping_fee - cart.discount_applied;

  return (
    <div
      className={`rounded-2xl border border-gray-100 bg-white/70 backdrop-blur-md ${
        compact ? "p-4 sm:p-5" : "p-5 sm:p-7"
      }`}
    >
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-3-1a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z" clipRule="evenodd"/>
          </svg>
        </span>
        Order Summary
      </h3>

      {!compact && (
        <div className="space-y-2 mb-4">
          {cart.cartItems.map((item) => (
            <div
              key={item.product_id}
              className="flex justify-between text-sm text-gray-600"
            >
              <span className="truncate mr-2">
                {item.product_name} × {item.quantity}
              </span>
              <span className="font-medium text-gray-800 flex-shrink-0">
                ₹{item.product_price * item.quantity}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="border-t border-dashed border-gray-200 pt-3 space-y-2">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Subtotal</span>
          <span className="font-medium text-gray-700">₹{subtotal}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>Shipping</span>
          <span className="font-medium text-gray-700">₹{cart.shipping_fee}</span>
        </div>
        {cart.discount_applied > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Discount</span>
            <span className="font-medium">−₹{cart.discount_applied}</span>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 mt-3 pt-3">
        <div className="flex justify-between items-center">
          <span className="text-base font-bold text-gray-800">Total</span>
          <span className="text-xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
            ₹{total}
          </span>
        </div>
      </div>
    </div>
  );
}
