"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CupSoda, ShoppingCart, X } from "lucide-react";
import { useCart } from "@/lib/cart-context/CartContext";
import { TEMPORADAS } from "@/lib/sazonalidade";
import { HeaderProps } from "./header.types";
import "./header.styles.css";

export default function Header({}: HeaderProps) {
  const { totalItens } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [modalAberto, setModalAberto] = useState(false);

  const sazonalAtual = searchParams.get("sazonal") ?? "";

  const handleSelecionar = (chave: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (chave) {
      params.set("sazonal", chave);
    } else {
      params.delete("sazonal");
    }
    router.push(`/?${params.toString()}`);
    setModalAberto(false);
  };

  const handleReset = () => {
    router.push("/");
    setModalAberto(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <Link href="/" className="header-logo">
            <CupSoda className="header-logo-icon" />
            <span className="header-logo-text">
              BreakTime
            </span>
          </Link>

          <button
            onClick={() => setModalAberto(true)}
            className="header-sazonal-btn"
            aria-label="Sobrescrever sazonalidade"
            title="Sobrescrever sazonalidade"
          />
        </div>

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

      {modalAberto && (
        <div className="header-sazonal-overlay" onClick={() => setModalAberto(false)}>
          <div
            className="header-sazonal-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="header-sazonal-modal-header">
              <h3 className="header-sazonal-modal-title">
                Sobrescrever Sazonalidade
              </h3>
              <button
                onClick={() => setModalAberto(false)}
                className="header-sazonal-modal-close"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="header-sazonal-modal-body">
              <label
                htmlFor="sazonal-select"
                className="header-sazonal-modal-label"
              >
                Temporada
              </label>
              <select
                id="sazonal-select"
                value={sazonalAtual}
                onChange={(e) => handleSelecionar(e.target.value)}
                className="header-sazonal-modal-select"
              >
                <option value="">Nenhuma (usar data real)</option>
                {Object.values(TEMPORADAS).map((t) => (
                  <option key={t.chave} value={t.chave}>
                    {t.nome}
                  </option>
                ))}
              </select>

              <button
                onClick={handleReset}
                className="header-sazonal-modal-reset"
              >
                Resetar
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
