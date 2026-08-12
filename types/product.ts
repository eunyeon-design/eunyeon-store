/**
 * Extensible product model.
 * Book covers ship first; accessories and apparel plug into the same
 * union without touching existing product/category code.
 */

export type ProductCategory = "book-cover" | "accessories" | "apparel";

export type Season =
  | "2026AW_VIDEO"
  | "26AW"
  | "26SS"
  | "2026SS_VIDEO"
  | "25AW"
  | "25SS"
  | "24AW"
  | "24SS";

export interface SeasonOption {
  id: Season;
  label: string;
  href: string;
  isVideo?: boolean;
}

export interface Money {
  amount: number;
  currency: "KRW" | "USD";
}

interface BaseProduct {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: Money;
  images: string[];
  category: ProductCategory;
  season?: Season;
  tags?: string[];
  inStock: boolean;
  createdAt: string;
}

export interface BookCoverProduct extends BaseProduct {
  category: "book-cover";
  bookSize?: "A5" | "B6" | "Pocket" | "Custom";
  material?: string;
  bindingType?: "Wrap" | "Snap" | "Elastic";
}

export interface AccessoryProduct extends BaseProduct {
  category: "accessories";
  material?: string;
  variant?: string;
}

export interface ApparelProduct extends BaseProduct {
  category: "apparel";
  sizes?: string[];
  fit?: "Oversized" | "Regular" | "Slim";
}

export type Product = BookCoverProduct | AccessoryProduct | ApparelProduct;

export function isBookCover(product: Product): product is BookCoverProduct {
  return product.category === "book-cover";
}

export function isAccessory(product: Product): product is AccessoryProduct {
  return product.category === "accessories";
}

export function isApparel(product: Product): product is ApparelProduct {
  return product.category === "apparel";
}
