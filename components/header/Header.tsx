"use client";

import Link from "next/link";
import { CupSoda, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart-context/CartContext";
import { HeaderProps } from "./header.types";
import "./header.styles.css";

export default function Header({}: HeaderProps) {
  const { totalItens } = useCart();

  return (
    <header className="header">
      <div className="header-container">
        <Link href="/" className="header-logo">
          <CupSoda className="header-logo-icon" />
          <span className="header-logo-text">
            BreakTime
          </span>
        </Link>

        <Link
          href="/carrinho"
          className="header-cart-btn"
          aria-label="Carrinho de compras"
        >
          <ShoppingCart className="header-cart-icon" />
          {totalItens > 0 && (
            <span className="header-cart-badge">
              {totalItens}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
