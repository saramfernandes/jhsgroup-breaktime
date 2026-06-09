import { Produto } from "@/lib/produtos";

export interface ItemCarrinho {
  produto: Produto;
  variedade: string | null;
  quantidade: number;
}

export interface CartContextType {
  itens: ItemCarrinho[];
  adicionar: (produto: Produto, variedade?: string, quantidade?: number) => void;
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
