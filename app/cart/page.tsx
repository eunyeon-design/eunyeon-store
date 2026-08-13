"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";

function formatPrice(amount: number, currency: string) {
  const symbol = currency === "KRW" ? "₩" : "$";
  return `${symbol}${amount.toLocaleString("en-US")}`;
}

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <main className="mx-auto flex min-h-[50vh] max-w-[1400px] flex-col items-center justify-center px-6 py-16 text-center sm:px-10">
        <h1 className="font-serif text-3xl font-bold italic text-brand-black">
          Your cart is empty
        </h1>
        <Link
          href="/shop"
          data-cursor-hover
          className="mt-6 font-display text-xs font-bold uppercase tracking-widest2 text-brand-black transition-colors hover:text-brand-red"
        >
          Continue Shopping →
        </Link>
      </main>
    );
  }

  const currency = items[0]?.currency ?? "KRW";

  return (
    <main className="mx-auto max-w-[1400px] px-6 py-16 sm:px-10">
      <h1 className="mb-10 border-b border-brand-black/10 pb-6 font-serif text-3xl font-bold italic text-brand-black sm:text-4xl">
        Your Cart
      </h1>

      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-8">
          {items.map((item) => (
            <div key={item.slug} className="flex gap-5 border-b border-brand-black/10 pb-8">
              <div className="relative h-32 w-24 flex-shrink-0 overflow-hidden bg-brand-off">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-4">
                  <p className="font-display text-xs font-normal uppercase tracking-normal text-brand-black">
                    {item.name}
                  </p>
                  <button
                    type="button"
                    data-cursor-hover
                    aria-label="Remove"
                    onClick={() => removeItem(item.slug)}
                    className="text-brand-black/40 transition-colors hover:text-brand-red"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 border border-brand-black/15 px-2 py-1">
                    <button
                      type="button"
                      data-cursor-hover
                      aria-label="Decrease quantity"
                      disabled={item.quantity <= 1}
                      onClick={() => {
                        if (item.quantity > 1) updateQuantity(item.slug, item.quantity - 1);
                      }}
                      className="text-brand-black/60 hover:text-brand-red disabled:cursor-not-allowed disabled:text-brand-black/20 disabled:hover:text-brand-black/20"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-display text-xs text-brand-black">{item.quantity}</span>
                    <button
                      type="button"
                      data-cursor-hover
                      aria-label="Increase quantity"
                      onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                      className="text-brand-black/60 hover:text-brand-red"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <p className="font-display text-xs text-brand-black">
                    {formatPrice(item.price * item.quantity, item.currency)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-fit border border-brand-black/10 p-6">
          <div className="flex justify-between border-b border-brand-black/10 pb-4 font-display text-xs font-bold uppercase tracking-widest2 text-brand-black">
            <span>Subtotal</span>
            <span>{formatPrice(totalPrice, currency)}</span>
          </div>
          <p className="mt-4 font-display text-[11px] text-brand-black/50">
            Shipping and taxes calculated at checkout.
          </p>
          <Link
            href="/checkout"
            data-cursor-hover
            className="mt-6 block w-full border border-brand-black bg-brand-black py-3 text-center font-display text-xs font-bold uppercase tracking-widest2 text-brand-off transition-colors hover:bg-brand-red hover:border-brand-red"
          >
            Checkout
          </Link>
        </div>
      </div>
    </main>
  );
}
