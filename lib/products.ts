import type { BookCoverProduct } from "@/types/product";

/**
 * Book cover catalogue shown on /shop.
 *
 * To change a product photo: drop the new image in /public/marquee (or
 * anywhere under /public) and update the matching `images` path below.
 * To add a product: copy one of the objects below and give it a unique
 * `id`/`slug`.
 */
export const bookCoverProducts: BookCoverProduct[] = [
  {
    id: "bc-001",
    slug: "archive-wrap-cover-01",
    name: "Archive Wrap Cover — Sky Bloom",
    description: "A wrap-style book cover cut from an archival lookbook print.",
    price: { amount: 78000, currency: "KRW" },
    images: ["/marquee/lookbook-01.jpg"],
    category: "book-cover",
    bookSize: "A5",
    material: "Cotton twill",
    bindingType: "Wrap",
    inStock: true,
    createdAt: "2026-01-01",
  },
  {
    id: "bc-002",
    slug: "archive-wrap-cover-02",
    name: "Archive Wrap Cover — Moss Garden",
    description: "A wrap-style book cover cut from an archival lookbook print.",
    price: { amount: 78000, currency: "KRW" },
    images: ["/marquee/lookbook-02.jpg"],
    category: "book-cover",
    bookSize: "A5",
    material: "Cotton twill",
    bindingType: "Wrap",
    inStock: true,
    createdAt: "2026-01-01",
  },
  {
    id: "bc-003",
    slug: "snap-cover-03",
    name: "Snap Cover — Meadow Rabbit",
    description: "A snap-closure book cover with a padded spine.",
    price: { amount: 92000, currency: "KRW" },
    images: ["/marquee/lookbook-03.jpg"],
    category: "book-cover",
    bookSize: "B6",
    material: "Cotton twill",
    bindingType: "Snap",
    inStock: true,
    createdAt: "2026-01-01",
  },
  {
    id: "bc-004",
    slug: "snap-cover-04",
    name: "Snap Cover — Halo Rabbit",
    description: "A snap-closure book cover with a padded spine.",
    price: { amount: 92000, currency: "KRW" },
    images: ["/marquee/lookbook-04.jpg"],
    category: "book-cover",
    bookSize: "B6",
    material: "Cotton twill",
    bindingType: "Snap",
    inStock: true,
    createdAt: "2026-01-01",
  },
  {
    id: "bc-005",
    slug: "elastic-cover-05",
    name: "Elastic Cover — Sleeping Unicorn",
    description: "A pocket-size elastic-band book cover.",
    price: { amount: 68000, currency: "KRW" },
    images: ["/marquee/lookbook-05.jpg"],
    category: "book-cover",
    bookSize: "Pocket",
    material: "Cotton twill",
    bindingType: "Elastic",
    inStock: true,
    createdAt: "2026-01-01",
  },
];
