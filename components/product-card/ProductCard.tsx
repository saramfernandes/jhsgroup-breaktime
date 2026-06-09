"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingCart, ChevronDown } from "lucide-react";
import { useCart } from "@/lib/cart-context/CartContext";
import { ProductCardProps } from "./product-card.types";
import "./product-card.styles.css";

export default function ProductCard({ produto }: ProductCardProps) {
  const { adicionar } = useCart();
  const [variedadeSelecionada, setVariedadeSelecionada] = useState(
    produto.variedade ? produto.variedade[0] : undefined
  );
  const [adicionado, setAdicionado] = useState(false);
  const [quantidade, setQuantidade] = useState(1);

  const handleAdicionar = () => {
    adicionar(produto, variedadeSelecionada, quantidade);
    setAdicionado(true);
    setQuantidade(1);
    setTimeout(() => setAdicionado(false), 1000);
  };

  const precoFormatado = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(produto.preco);

  const imagemAtual =
    produto.imagensVariedade && variedadeSelecionada
      ? produto.imagensVariedade[variedadeSelecionada] || produto.imagem
      : produto.imagem;

  return (
    <div className="product-card">
      <div className="product-card-image-container">
        <Image
          src={imagemAtual}
          alt={produto.nome}
          fill
          className="product-card-image"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>

      <div className="product-card-body">
        <div className="product-card-category-container">
          <span className="product-card-category">
            {produto.categoria}
          </span>
        </div>

        <h3 className="product-card-title">
          {produto.nome}
        </h3>

        <p className="product-card-price">
          {precoFormatado}
        </p>

        {produto.variedade && produto.variedade.length > 0 && (
          <div className="product-card-variedade-container">
            <label className="sr-only" htmlFor={`variedade-${produto.id}`}>
              Selecionar variedade
            </label>
            <div className="product-card-select-wrapper">
              <select
                id={`variedade-${produto.id}`}
                value={variedadeSelecionada}
                onChange={(e) => setVariedadeSelecionada(e.target.value)}
                className="product-card-select"
              >
                {produto.variedade.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
              <ChevronDown className="product-card-select-icon" />
            </div>
          </div>
        )}

        <div className="product-card-quantity-container">
          <span className="product-card-quantity-label">Quantidade</span>
          <div className="product-card-quantity-controls">
            <button
              onClick={() => setQuantidade((q) => Math.max(1, q - 1))}
              className="product-card-btn-quantity"
              aria-label="Diminuir quantidade"
            >
              −
            </button>
            <span className="product-card-quantity-value">
              {quantidade}
            </span>
            <button
              onClick={() => setQuantidade((q) => q + 1)}
              className="product-card-btn-quantity"
              aria-label="Aumentar quantidade"
            >
              +
            </button>
          </div>
        </div>

        <button
          onClick={handleAdicionar}
          className="product-card-btn-add"
        >
          <ShoppingCart className="product-card-btn-add-icon" />
          {adicionado ? "Adicionado ✓" : "Adicionar ao Carrinho"}
        </button>
      </div>
    </div>
  );
}
