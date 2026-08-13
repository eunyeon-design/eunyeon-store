import ProductCard from "@/components/ProductCard";
import { bookCoverProducts } from "@/lib/products";

export const metadata = {
  title: "Shop — eunyeon",
};

export default function ShopPage() {
  return (
    <main className="mx-auto max-w-[1400px] px-6 py-16 sm:px-10">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-brand-black/10 pb-6">
        <h1 className="font-serif text-3xl font-bold italic text-brand-black sm:text-4xl">
          Book Cover
        </h1>
        <p className="font-display text-xs font-bold uppercase tracking-widest2 text-brand-black/50">
          {bookCoverProducts.length} Items
        </p>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
        {bookCoverProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
