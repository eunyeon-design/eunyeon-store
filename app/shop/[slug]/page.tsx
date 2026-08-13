import Image from "next/image";
import { notFound } from "next/navigation";
import { bookCoverProducts } from "@/lib/products";

export function generateStaticParams() {
  return bookCoverProducts.map((product) => ({ slug: product.slug }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = bookCoverProducts.find((item) => item.slug === params.slug);

  if (!product) {
    notFound();
  }

  const priceLabel = `${product.price.currency === "KRW" ? "₩" : "$"}${product.price.amount.toLocaleString("en-US")}`;

  return (
    <main className="mx-auto max-w-[1400px] px-6 py-16 sm:px-10">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-brand-off">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div>
          <h1 className="font-serif text-3xl font-bold italic text-brand-black sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-3 font-display text-lg text-brand-black/70">{priceLabel}</p>
          <p className="mt-6 max-w-md font-display text-sm leading-relaxed text-brand-black/70">
            {product.description}
          </p>

          <dl className="mt-8 space-y-2 border-t border-brand-black/10 pt-6 font-display text-xs uppercase tracking-widest2 text-brand-black/60">
            {product.bookSize && (
              <div className="flex justify-between">
                <dt>Size</dt>
                <dd>{product.bookSize}</dd>
              </div>
            )}
            {product.material && (
              <div className="flex justify-between">
                <dt>Material</dt>
                <dd>{product.material}</dd>
              </div>
            )}
            {product.bindingType && (
              <div className="flex justify-between">
                <dt>Binding</dt>
                <dd>{product.bindingType}</dd>
              </div>
            )}
          </dl>

          <button
            type="button"
            data-cursor-hover
            className="mt-10 w-full border border-brand-black bg-brand-black py-3 font-display text-xs font-bold uppercase tracking-widest2 text-brand-off transition-colors hover:bg-brand-red hover:border-brand-red"
          >
            Add to Bag
          </button>
        </div>
      </div>
    </main>
  );
}
