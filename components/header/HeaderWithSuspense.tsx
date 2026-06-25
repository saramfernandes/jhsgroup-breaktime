"use client";

import { Suspense } from "react";
import { CupSoda, ShoppingCart } from "lucide-react";
import Header from "./Header";
import "./header.styles.css";

export default function HeaderWithSuspense() {
  return (
    <Suspense fallback={<HeaderFallback />}>
      <Header />
    </Suspense>
  );
}

function HeaderFallback() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <div className="header-logo">
            <CupSoda className="header-logo-icon" />
            <span className="header-logo-text">BreakTime</span>
          </div>
        </div>
        <div className="header-cart-btn">
          <ShoppingCart className="header-cart-icon" />
        </div>
      </div>
    </header>
  );
}
