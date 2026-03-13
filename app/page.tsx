import { Suspense } from "react";
import { CartData } from "@/context/CheckoutContext";
import CartPageClient from "./CartPageClient";
import CartSkeleton from "@/components/CartSkeleton";


async function getCartData(): Promise<CartData> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const data: CartData = {
    cartItems: [
      {
        product_id: 101,
        product_name: "Bamboo Toothbrush (Pack of 4)",
        product_price: 299,
        quantity: 2,
        image: "https://via.placeholder.com/150",
      },
      {
        product_id: 102,
        product_name: "Reusable Cotton Produce Bags",
        product_price: 450,
        quantity: 1,
        image: "https://via.placeholder.com/150",
      },
    ],
    shipping_fee: 50,
    discount_applied: 0,
  };

  return data;
}

async function CartContent() {
  const cartData = await getCartData();
  return <CartPageClient initialCart={cartData} />;
}

export default function CartPage() {
  return (
    <Suspense fallback={<CartSkeleton />}>
      <CartContent />
    </Suspense>
  );
}
