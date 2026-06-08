"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingCart, ChevronDown } from "lucide-react";
import { Produto } from "@/lib/produtos";
import { useCart } from "@/lib/cart-context";

interface ProductCardProps {
  produto: Produto;
}

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
    <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
      <div className="relative w-full aspect-[4/3] bg-white rounded-t-2xl overflow-hidden">
        <Image
          src={imagemAtual}
          alt={produto.nome}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="mb-2">
          <span className="text-xs font-medium text-[#669BBC] uppercase tracking-wide">
            {produto.categoria}
          </span>
        </div>

        <h3 className="font-serif text-lg font-bold text-[#003049] mb-1">
          {produto.nome}
        </h3>

        <p className="text-[#003049] font-semibold text-xl mb-4">
          {precoFormatado}
        </p>

        {produto.variedade && produto.variedade.length > 0 && (
          <div className="mb-4 relative">
            <label className="sr-only" htmlFor={`variedade-${produto.id}`}>
              Selecionar variedade
            </label>
            <div className="relative">
              <select
                id={`variedade-${produto.id}`}
                value={variedadeSelecionada}
                onChange={(e) => setVariedadeSelecionada(e.target.value)}
                className="w-full appearance-none px-4 py-2.5 pr-10 rounded-xl bg-white border border-[#E5E7EB] text-[#003049] text-sm font-medium hover:border-[#669BBC] focus:border-[#669BBC] focus:outline-none focus:ring-2 focus:ring-[#669BBC]/20 transition-colors cursor-pointer"
              >
                {produto.variedade.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#669BBC]" />
            </div>
          </div>
        )}

        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-[#669BBC] uppercase tracking-wide">Quantidade</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQuantidade((q) => Math.max(1, q - 1))}
              className="w-7 h-7 rounded-full bg-gray-100 text-[#003049] font-bold hover:bg-[#E8A4B8] transition-colors flex items-center justify-center text-base leading-none"
              aria-label="Diminuir quantidade"
            >
              −
            </button>
            <span className="w-6 text-center font-semibold text-[#003049] text-sm">
              {quantidade}
            </span>
            <button
              onClick={() => setQuantidade((q) => q + 1)}
              className="w-7 h-7 rounded-full bg-gray-100 text-[#003049] font-bold hover:bg-[#E8A4B8] transition-colors flex items-center justify-center text-base leading-none"
              aria-label="Aumentar quantidade"
            >
              +
            </button>
          </div>
        </div>

        <button
          onClick={handleAdicionar}
          className="mt-auto w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#E8A4B8] text-[#003049] font-semibold text-sm hover:bg-[#d994a8] active:scale-[0.98] transition-all"
        >
          <ShoppingCart className="h-4 w-4" />
          {adicionado ? "Adicionado ✓" : "Adicionar ao Carrinho"}
        </button>
      </div>
    </div>
  );
}
