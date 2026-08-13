import Image from "next/image";
import type { Product } from "@/types/product";

function formatPrice(amount: number, currency: string) {
  const symbol = currency === "KRW" ? "₩" : "$";
  return `${symbol}${amount.toLocaleString("en-US")}`;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <a href={`/shop/${product.slug}`} data-cursor-hover className="group block">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-brand-off">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>
      <p className="mt-3 font-display text-xs font-normal uppercase tracking-normal text-brand-black">
        {product.name}
      </p>
      <p className="mt-1 font-display text-xs text-brand-black">
        {formatPrice(product.price.amount, product.price.currency)}
      </p>
    </a>
  );
}
