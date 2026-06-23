"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { useCart } from "@/lib/cart-context/CartContext";

export default function ObrigadoPage() {
  const { limpar } = useCart();

  useEffect(() => {
    limpar();
  }, [limpar]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="bg-[#FFF9EE] rounded-2xl border border-[#FDF0D5] shadow-sm p-8 sm:p-10 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle2 className="w-16 h-16 text-green-500" />
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#003049] mb-4">
          Pedido Confirmado!
        </h1>

        <p className="text-[#669BBC] text-base leading-relaxed mb-8">
          Obrigado pela preferência! Em breve entraremos em contato pelo
          WhatsApp para confirmar seu pedido! ☕
        </p>

        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-xl bg-[#E8A4B8] text-[#003049] font-bold hover:bg-[#d994a8] active:scale-[0.98] transition-all"
        >
          Voltar ao Cardápio
        </Link>
      </div>
    </div>
  );
}
