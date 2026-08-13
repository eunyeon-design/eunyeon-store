"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";

interface AddToCartButtonsProps {
  slug: string;
  name: string;
  price: number;
  currency: string;
  image: string;
}

export default function AddToCartButtons({
  slug,
  name,
  price,
  currency,
  image,
}: AddToCartButtonsProps) {
  const { addItem } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);

  const item = { slug, name, price, currency, image };

  const handleAddToCart = () => {
    addItem(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleBuyNow = () => {
    addItem(item);
    router.push("/checkout");
  };

  return (
    <div className="mt-10 space-y-3">
      <button
        type="button"
        data-cursor-hover
        onClick={handleAddToCart}
        className="w-full border border-brand-black bg-brand-black py-3 font-display text-xs font-bold uppercase tracking-widest2 text-brand-off transition-colors hover:bg-brand-red hover:border-brand-red"
      >
        {added ? "Added to Cart" : "Add to Cart"}
      </button>

      <button
        type="button"
        data-cursor-hover
        onClick={handleBuyNow}
        className="w-full border border-brand-black py-3 font-display text-xs font-bold uppercase tracking-widest2 text-brand-black transition-colors hover:border-brand-red hover:text-brand-red"
      >
        Buy Now
      </button>
    </div>
  );
}
