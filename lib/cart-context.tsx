"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Produto } from "@/lib/produtos";

interface ItemCarrinho {
  produto: Produto;
  variedade: string | null;
  quantidade: number;
}

interface CartContextType {
  itens: ItemCarrinho[];
  adicionar: (produto: Produto, variedade?: string) => void;
  remover: (produtoId: number, variedade?: string | null) => void;
  atualizarQuantidade: (
    produtoId: number,
    variedade: string | null,
    quantidade: number
  ) => void;
  limpar: () => void;
  total: number;
  totalItens: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);

  const adicionar = (produto: Produto, variedade?: string) => {
    const variedadeNorm = variedade ?? null;
    setItens((prev) => {
      const existente = prev.find(
        (item) =>
          item.produto.id === produto.id && item.variedade === variedadeNorm
      );
      if (existente) {
        return prev.map((item) =>
          item.produto.id === produto.id && item.variedade === variedadeNorm
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      return [...prev, { produto, variedade: variedadeNorm, quantidade: 1 }];
    });
  };

  const remover = (produtoId: number, variedade?: string | null) => {
    const variedadeNorm = variedade ?? null;
    setItens((prev) =>
      prev.filter(
        (item) =>
          !(item.produto.id === produtoId && item.variedade === variedadeNorm)
      )
    );
  };

  const atualizarQuantidade = (
    produtoId: number,
    variedade: string | null,
    quantidade: number
  ) => {
    if (quantidade <= 0) {
      remover(produtoId, variedade);
      return;
    }
    setItens((prev) =>
      prev.map((item) =>
        item.produto.id === produtoId && item.variedade === variedade
          ? { ...item, quantidade }
          : item
      )
    );
  };

  const limpar = () => setItens([]);

  const total = itens.reduce(
    (acc, item) => acc + item.produto.preco * item.quantidade,
    0
  );

  const totalItens = itens.reduce((acc, item) => acc + item.quantidade, 0);

  return (
    <CartContext.Provider
      value={{
        itens,
        adicionar,
        remover,
        atualizarQuantidade,
        limpar,
        total,
        totalItens,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
}
