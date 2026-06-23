import { NextRequest, NextResponse } from "next/server";

interface CheckoutItem {
  id: number;
  nome: string;
  variedade: string | null;
  quantidade: number;
  precoUnitario: number;
  subtotal: number;
}

interface CheckoutBody {
  cliente: {
    nome: string;
    telefone: string;
    tipoEntrega: "retirada" | "entrega";
    endereco: string | null;
  };
  itens: CheckoutItem[];
  total: number;
}

interface InfinitePayItem {
  quantity: number;
  price: number;
  description: string;
}

interface InfinitePayPayload {
  handle: string;
  redirect_url: string;
  order_nsu: string;
  items: InfinitePayItem[];
}

interface InfinitePayResponse {
  url: string;
}

function validarBody(body: unknown): body is CheckoutBody {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;

  if (!b.cliente || typeof b.cliente !== "object") return false;
  const cliente = b.cliente as Record<string, unknown>;
  if (typeof cliente.nome !== "string" || !cliente.nome.trim()) return false;
  if (typeof cliente.telefone !== "string" || !cliente.telefone.trim()) return false;

  if (!Array.isArray(b.itens) || b.itens.length === 0) return false;
  for (const item of b.itens) {
    if (typeof item !== "object" || item === null) return false;
    const i = item as Record<string, unknown>;
    if (typeof i.quantidade !== "number" || i.quantidade <= 0) return false;
    if (typeof i.precoUnitario !== "number" || i.precoUnitario <= 0) return false;
  }

  if (typeof b.total !== "number" || b.total <= 0) return false;

  return true;
}

export async function POST(request: NextRequest) {
  const body: unknown = await request.json();

  if (!validarBody(body)) {
    return NextResponse.json({ erro: "Dados incompletos" }, { status: 400 });
  }

  const handle = process.env.NEXT_PUBLIC_INFINITEPAY_HANDLE;

  if (!handle) {
    return NextResponse.json(
      { erro: "Configuração de pagamento não encontrada." },
      { status: 500 }
    );
  }

  const origin = request.headers.get("origin") || request.nextUrl.origin;
  const redirectUrl = `${origin}/obrigado`;

  const orderNsu = crypto.randomUUID();

  const infinitePayItems: InfinitePayItem[] = body.itens.map((item) => ({
    quantity: item.quantidade,
    price: Math.round(item.precoUnitario * 100),
    description: item.variedade
      ? `${item.nome} (${item.variedade})`
      : item.nome,
  }));

  const payload: InfinitePayPayload = {
    handle,
    redirect_url: redirectUrl,
    order_nsu: orderNsu,
    items: infinitePayItems,
  };

  try {
    const response = await fetch("https://api.checkout.infinitepay.io/links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("InfinitePay API error:", response.status, errorBody);
      return NextResponse.json(
        { erro: "Erro ao processar pagamento." },
        { status: 502 }
      );
    }

    const data: InfinitePayResponse = await response.json();

    if (!data.url) {
      return NextResponse.json(
        { erro: "URL de pagamento não retornada." },
        { status: 502 }
      );
    }

    return NextResponse.json({ url: data.url });
  } catch (error) {
    console.error("InfinitePay request failed:", error);
    return NextResponse.json(
      { erro: "Erro ao processar pagamento." },
      { status: 502 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ erro: "Método não permitido" }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ erro: "Método não permitido" }, { status: 405 });
}

export async function PATCH() {
  return NextResponse.json({ erro: "Método não permitido" }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ erro: "Método não permitido" }, { status: 405 });
}
