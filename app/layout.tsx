import type { Metadata } from "next";
import { Playfair_Display, Archivo } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import SeasonBar from "@/components/SeasonBar";
import Header from "@/components/Header";
import { CartProvider } from "@/lib/cart-context";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic", "normal"],
  weight: ["400", "700", "900"],
  variable: "--font-playfair",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  style: ["italic", "normal"],
  weight: ["500", "700", "900"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "eunyeon — Editorial Archive",
  description:
    "eunyeon: premium analog book covers, with accessories and apparel collections joining the archive soon.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className={`${playfair.variable} ${archivo.variable}`}>
        <CartProvider>
          <CustomCursor />
          <SeasonBar />
          <Header />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
