"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

const formatarPreco = (valor: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);

export default function CarrinhoPage() {
  const { itens, remover, atualizarQuantidade, limpar, total } = useCart();

  const handleFinalizar = () => {
    alert("Em breve! ☕");
    limpar();
  };

  if (itens.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-6xl mb-6">🛒</p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#003049] mb-4">
          Seu Carrinho
        </h1>
        <p className="text-[#669BBC] text-lg mb-8">
          Seu carrinho está vazio. Que tal dar uma olhada no nosso cardápio?
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-xl bg-[#E8A4B8] text-[#003049] font-semibold hover:bg-[#d994a8] transition-colors"
        >
          Ver Cardápio
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#003049] mb-8">
        Seu Carrinho
      </h1>

      <div className="flex flex-col gap-4 mb-8">
        {itens.map((item) => (
          <div
            key={`${item.produto.id}-${item.variedade ?? "sem-variedade"}`}
            className="bg-[#FFF9EE] rounded-2xl border border-[#FDF0D5] shadow-sm p-4 flex flex-wrap sm:flex-nowrap items-center gap-4"
          >
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[#003049] truncate">{item.produto.nome}</p>
              {item.variedade && (
                <p className="text-sm text-[#669BBC]">{item.variedade}</p>
              )}
              <p className="text-sm text-[#669BBC] mt-0.5">
                {formatarPreco(item.produto.preco)} cada
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  atualizarQuantidade(item.produto.id, item.variedade, item.quantidade - 1)
                }
                className="w-8 h-8 rounded-full bg-[#FDF0D5] text-[#003049] font-bold hover:bg-[#E8A4B8] transition-colors flex items-center justify-center text-lg leading-none"
                aria-label="Diminuir quantidade"
              >
                −
              </button>
              <span className="w-6 text-center font-semibold text-[#003049]">
                {item.quantidade}
              </span>
              <button
                onClick={() =>
                  atualizarQuantidade(item.produto.id, item.variedade, item.quantidade + 1)
                }
                className="w-8 h-8 rounded-full bg-[#FDF0D5] text-[#003049] font-bold hover:bg-[#E8A4B8] transition-colors flex items-center justify-center text-lg leading-none"
                aria-label="Aumentar quantidade"
              >
                +
              </button>
            </div>

            <div className="text-right min-w-[80px]">
              <p className="font-bold text-[#003049]">
                {formatarPreco(item.produto.preco * item.quantidade)}
              </p>
            </div>

            <button
              onClick={() => remover(item.produto.id, item.variedade)}
              className="text-[#669BBC] hover:text-[#FF3669] transition-colors font-bold text-xl leading-none"
              aria-label={`Remover ${item.produto.nome}`}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="bg-[#FFF9EE] rounded-2xl border border-[#FDF0D5] shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center">
          <span className="font-serif text-xl font-bold text-[#003049]">Total</span>
          <span className="font-serif text-2xl font-bold text-[#003049]">
            {formatarPreco(total)}
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <button
          onClick={limpar}
          className="px-5 py-2.5 rounded-xl border border-[#669BBC] text-[#669BBC] font-medium hover:bg-[#FDF0D5] transition-colors text-sm"
        >
          Limpar carrinho
        </button>
        <button
          onClick={handleFinalizar}
          className="px-6 py-3 rounded-xl bg-[#E8A4B8] text-[#003049] font-bold hover:bg-[#d994a8] active:scale-[0.98] transition-all"
        >
          Finalizar Compra
        </button>
      </div>
    </div>
  );
}
