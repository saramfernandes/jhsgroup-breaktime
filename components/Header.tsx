"use client";

import Link from "next/link";
import { CupSoda, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export default function Header() {
  const { totalItens } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FFF9EE] border-b border-[#FDF0D5] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <CupSoda className="h-7 w-7 text-[#FF3669]" />
          <span className="font-serif text-2xl font-bold text-[#003049] tracking-tight">
            BreakTime
          </span>
        </Link>

        <Link
          href="/carrinho"
          className="relative p-2 rounded-full hover:bg-[#FDF0D5] transition-colors"
          aria-label="Carrinho de compras"
        >
          <ShoppingCart className="h-6 w-6 text-[#003049]" />
          {totalItens > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-[#FF3669] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center leading-none">
              {totalItens}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
