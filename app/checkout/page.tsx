"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

const formatarPreco = (valor: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);

interface ErrosFormulario {
  nome?: string;
  telefone?: string;
  endereco?: string;
}

function formatarTelefone(valor: string): string {
  const numeros = valor.replace(/\D/g, "").slice(0, 11);
  if (numeros.length <= 2) {
    return numeros.length ? `(${numeros}` : "";
  }
  if (numeros.length <= 7) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
  }
  return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { itens, total } = useCart();

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [tipoEntrega, setTipoEntrega] = useState<"retirada" | "entrega">("retirada");
  const [endereco, setEndereco] = useState("");
  const [erros, setErros] = useState<ErrosFormulario>({});
  const [processando, setProcessando] = useState(false);

  useEffect(() => {
    if (itens.length === 0) {
      router.replace("/");
    }
  }, [itens.length, router]);

  const validar = (): boolean => {
    const novosErros: ErrosFormulario = {};
    if (!nome.trim()) {
      novosErros.nome = "Informe seu nome completo.";
    }
    const telefoneLimpo = telefone.replace(/\D/g, "");
    if (telefoneLimpo.length < 10) {
      novosErros.telefone = "Informe um telefone válido com DDD.";
    }
    if (tipoEntrega === "entrega" && !endereco.trim()) {
      novosErros.endereco = "Informe o endereço de entrega.";
    }
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleCheckout = async () => {
    if (!validar()) return;

    setProcessando(true);

    const pedido = {
      cliente: {
        nome: nome.trim(),
        telefone: telefone.trim(),
        tipoEntrega,
        endereco: tipoEntrega === "entrega" ? endereco.trim() : null,
      },
      itens: itens.map((item) => ({
        id: item.produto.id,
        nome: item.produto.nome,
        variedade: item.variedade,
        quantidade: item.quantidade,
        precoUnitario: item.produto.preco,
        subtotal: item.produto.preco * item.quantidade,
      })),
      total,
    };

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedido),
      });

      if (!res.ok) {
        throw new Error("Erro ao processar pagamento.");
      }

      const data = await res.json();
      if (data.url) {
        router.push(data.url);
      } else {
        throw new Error("URL de pagamento não retornada.");
      }
    } catch {
      setProcessando(false);
      alert("Não foi possível gerar o pagamento. Tente novamente.");
    }
  };

  if (itens.length === 0) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#003049] mb-8">
        Finalizar Pedido
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Coluna esquerda — Dados do cliente */}
        <div className="bg-[#FFF9EE] rounded-2xl border border-[#FDF0D5] shadow-sm p-6">
          <h2 className="font-serif text-xl font-bold text-[#003049] mb-6">
            Dados do Cliente
          </h2>

          <div className="flex flex-col gap-5">
            {/* Nome */}
            <div>
              <label
                htmlFor="nome"
                className="block text-sm font-semibold text-[#003049] mb-1.5"
              >
                Nome completo <span className="text-[#FF3669]">*</span>
              </label>
              <input
                id="nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu nome completo"
                className={`w-full px-4 py-2.5 rounded-xl bg-white border text-[#003049] text-sm placeholder:text-[#669BBC]/70 focus:outline-none focus:ring-2 transition-colors ${
                  erros.nome
                    ? "border-[#FF3669] focus:ring-[#FF3669]/20"
                    : "border-[#E5E7EB] focus:border-[#003049] focus:ring-[#003049]/10"
                }`}
              />
              {erros.nome && (
                <p className="mt-1.5 text-sm text-[#FF3669]">{erros.nome}</p>
              )}
            </div>

            {/* Telefone */}
            <div>
              <label
                htmlFor="telefone"
                className="block text-sm font-semibold text-[#003049] mb-1.5"
              >
                WhatsApp / Telefone <span className="text-[#FF3669]">*</span>
              </label>
              <input
                id="telefone"
                type="text"
                value={telefone}
                onChange={(e) => setTelefone(formatarTelefone(e.target.value))}
                placeholder="(11) 99999-9999"
                className={`w-full px-4 py-2.5 rounded-xl bg-white border text-[#003049] text-sm placeholder:text-[#669BBC]/70 focus:outline-none focus:ring-2 transition-colors ${
                  erros.telefone
                    ? "border-[#FF3669] focus:ring-[#FF3669]/20"
                    : "border-[#E5E7EB] focus:border-[#003049] focus:ring-[#003049]/10"
                }`}
              />
              {erros.telefone && (
                <p className="mt-1.5 text-sm text-[#FF3669]">{erros.telefone}</p>
              )}
            </div>

            {/* Tipo de entrega */}
            <div>
              <span className="block text-sm font-semibold text-[#003049] mb-2">
                Tipo de entrega
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setTipoEntrega("retirada")}
                  className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-colors ${
                    tipoEntrega === "retirada"
                      ? "bg-[#003049] text-white border-[#003049]"
                      : "bg-white text-[#003049] border-[#E5E7EB] hover:border-[#003049]"
                  }`}
                >
                  Retirar na loja
                </button>
                <button
                  type="button"
                  onClick={() => setTipoEntrega("entrega")}
                  className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-colors ${
                    tipoEntrega === "entrega"
                      ? "bg-[#003049] text-white border-[#003049]"
                      : "bg-white text-[#003049] border-[#E5E7EB] hover:border-[#003049]"
                  }`}
                >
                  Entrega
                </button>
              </div>
            </div>

            {/* Endereço (condicional) */}
            {tipoEntrega === "entrega" && (
              <div>
                <label
                  htmlFor="endereco"
                  className="block text-sm font-semibold text-[#003049] mb-1.5"
                >
                  Endereço completo <span className="text-[#FF3669]">*</span>
                </label>
                <textarea
                  id="endereco"
                  rows={3}
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                  placeholder="Rua, número, bairro, complemento..."
                  className={`w-full px-4 py-2.5 rounded-xl bg-white border text-[#003049] text-sm placeholder:text-[#669BBC]/70 focus:outline-none focus:ring-2 resize-none transition-colors ${
                    erros.endereco
                      ? "border-[#FF3669] focus:ring-[#FF3669]/20"
                      : "border-[#E5E7EB] focus:border-[#003049] focus:ring-[#003049]/10"
                  }`}
                />
                {erros.endereco && (
                  <p className="mt-1.5 text-sm text-[#FF3669]">{erros.endereco}</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Coluna direita — Resumo do pedido */}
        <div className="flex flex-col gap-6">
          <div className="bg-[#FFF9EE] rounded-2xl border border-[#FDF0D5] shadow-sm p-6">
            <h2 className="font-serif text-xl font-bold text-[#003049] mb-4">
              Resumo do Pedido
            </h2>

            <div className="flex flex-col gap-3 mb-6">
              {itens.map((item) => (
                <div
                  key={`${item.produto.id}-${item.variedade ?? "sem-variedade"}`}
                  className="flex justify-between items-start gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[#003049] text-sm truncate">
                      {item.produto.nome}
                    </p>
                    {item.variedade && (
                      <p className="text-xs text-[#669BBC]">{item.variedade}</p>
                    )}
                    <p className="text-xs text-[#669BBC]">
                      {item.quantidade}x {formatarPreco(item.produto.preco)}
                    </p>
                  </div>
                  <p className="font-semibold text-[#003049] text-sm whitespace-nowrap">
                    {formatarPreco(item.produto.preco * item.quantidade)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-[#FDF0D5] pt-4 flex justify-between items-center">
              <span className="font-serif text-lg font-bold text-[#003049]">Total</span>
              <span className="font-serif text-2xl font-bold text-[#003049]">
                {formatarPreco(total)}
              </span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            disabled={processando}
            className="w-full px-6 py-3.5 rounded-xl bg-[#E8A4B8] text-[#003049] font-bold text-base hover:bg-[#d994a8] active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {processando ? "Processando..." : "Gerar Pagamento"}
          </button>

          <Link
            href="/carrinho"
            className="text-center text-sm text-[#669BBC] hover:text-[#003049] transition-colors"
          >
            ← Voltar ao carrinho
          </Link>
        </div>
      </div>
    </div>
  );
}
