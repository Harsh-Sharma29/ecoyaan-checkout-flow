"use client";

import Image from "next/image";
import { CartItem as CartItemType } from "@/context/CheckoutContext";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const lineTotal = item.product_price * item.quantity;

  return (
    <div className="group flex items-center gap-4 sm:gap-6 rounded-2xl bg-white/60 backdrop-blur-md border border-gray-100 p-4 sm:p-5 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/5 hover:border-emerald-200">
      {/* Product Image */}
      <div className="relative h-20 w-20 sm:h-24 sm:w-24 flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50">
        <Image
          src={item.image}
          alt={item.product_name}
          fill
          sizes="96px"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
            {item.product_name}
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            ID: #{item.product_id}
          </p>
        </div>

        <div className="flex items-center gap-4 sm:gap-8">
          {/* Price per unit */}
          <div className="text-right">
            <p className="text-xs text-gray-400 uppercase tracking-wider">Price</p>
            <p className="text-sm font-medium text-gray-700">₹{item.product_price}</p>
          </div>

          {/* Quantity */}
          <div className="text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wider">Qty</p>
            <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-emerald-50 text-emerald-700 font-semibold text-sm">
              {item.quantity}
            </span>
          </div>

          {/* Line Total */}
          <div className="text-right min-w-[70px]">
            <p className="text-xs text-gray-400 uppercase tracking-wider">Total</p>
            <p className="text-base font-bold text-emerald-600">₹{lineTotal}</p>
          </div>
        </div>
      </div>
    </div>
  );
}