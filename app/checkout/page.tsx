"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

function formatPrice(amount: number, currency: string) {
  const symbol = currency === "KRW" ? "₩" : "$";
  return `${symbol}${amount.toLocaleString("en-US")}`;
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const currency = items[0]?.currency ?? "KRW";

  const handlePlaceOrder = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    const form = new FormData(event.currentTarget);
    const customer = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      address: String(form.get("address") || ""),
      phone: String(form.get("phone") || ""),
    };

    try {
      await fetch("/api/notify-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer,
          items: items.map((i) => ({ name: i.name, price: i.price, quantity: i.quantity })),
          totalPrice,
          currency,
        }),
      });
    } catch {
      // Order still completes even if the notification email fails to send.
    }

    setSubmitting(false);
    setPlaced(true);
    clearCart();
  };

  if (placed) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-[1400px] flex-col items-center justify-center px-6 py-16 text-center sm:px-10">
        <h1 className="font-serif text-3xl font-bold italic text-brand-black sm:text-4xl">
          Thank you for your order.
        </h1>
        <p className="mt-4 max-w-md font-display text-sm text-brand-black/60">
          This is a demo checkout — no payment has actually been charged, and
          eunyeon will need a real payment provider connected before going live.
        </p>
        <Link
          href="/shop"
          data-cursor-hover
          className="mt-8 font-display text-xs font-bold uppercase tracking-widest2 text-brand-black transition-colors hover:text-brand-red"
        >
          Continue Shopping →
        </Link>
      </main>
    );
  }

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

  return (
    <main className="mx-auto max-w-[1400px] px-6 py-16 sm:px-10">
      <h1 className="mb-4 font-serif text-3xl font-bold italic text-brand-black sm:text-4xl">
        Checkout
      </h1>
      <p className="mb-10 max-w-lg font-display text-xs text-brand-black/50">
        Demo checkout — shipping details below are not stored, and no real
        payment is processed yet.
      </p>

      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <form onSubmit={handlePlaceOrder} className="flex flex-col gap-5">
          <div>
            <label className="mb-1 block font-display text-[11px] font-bold uppercase tracking-widest2 text-brand-black/60">
              Full Name
            </label>
            <input
              required
              name="name"
              type="text"
              data-cursor-hover
              className="w-full border border-brand-black/20 bg-transparent px-3 py-2 font-display text-sm text-brand-black outline-none focus:border-brand-black"
            />
          </div>

          <div>
            <label className="mb-1 block font-display text-[11px] font-bold uppercase tracking-widest2 text-brand-black/60">
              Email
            </label>
            <input
              required
              name="email"
              type="email"
              data-cursor-hover
              className="w-full border border-brand-black/20 bg-transparent px-3 py-2 font-display text-sm text-brand-black outline-none focus:border-brand-black"
            />
          </div>

          <div>
            <label className="mb-1 block font-display text-[11px] font-bold uppercase tracking-widest2 text-brand-black/60">
              Shipping Address
            </label>
            <input
              required
              name="address"
              type="text"
              data-cursor-hover
              className="w-full border border-brand-black/20 bg-transparent px-3 py-2 font-display text-sm text-brand-black outline-none focus:border-brand-black"
            />
          </div>

          <div>
            <label className="mb-1 block font-display text-[11px] font-bold uppercase tracking-widest2 text-brand-black/60">
              Phone
            </label>
            <input
              required
              name="phone"
              type="tel"
              data-cursor-hover
              className="w-full border border-brand-black/20 bg-transparent px-3 py-2 font-display text-sm text-brand-black outline-none focus:border-brand-black"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            data-cursor-hover
            className="mt-4 w-full border border-brand-black bg-brand-black py-3 font-display text-xs font-bold uppercase tracking-widest2 text-brand-off transition-colors hover:bg-brand-red hover:border-brand-red disabled:opacity-60"
          >
            {submitting ? "Placing Order…" : `Place Order — ${formatPrice(totalPrice, currency)}`}
          </button>
        </form>

        <div className="h-fit border border-brand-black/10 p-6">
          <p className="mb-4 font-display text-xs font-bold uppercase tracking-widest2 text-brand-black">
            Order Summary
          </p>
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <div key={item.slug} className="flex items-center gap-3">
                <div className="relative h-16 w-12 flex-shrink-0 overflow-hidden bg-brand-off">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex flex-1 justify-between font-display text-xs text-brand-black">
                  <span className="pr-2">
                    {item.name} × {item.quantity}
                  </span>
                  <span>{formatPrice(item.price * item.quantity, item.currency)}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-between border-t border-brand-black/10 pt-4 font-display text-xs font-bold uppercase tracking-widest2 text-brand-black">
            <span>Total</span>
            <span>{formatPrice(totalPrice, currency)}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
