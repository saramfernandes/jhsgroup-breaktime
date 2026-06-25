import ProductCard from "@/components/product-card/ProductCard";
import { produtos } from "@/lib/produtos";
import {
  obterTemporadasAtivas,
  filtrarProdutosSazonais,
  obterNomeTemporadaAtiva,
  TEMPORADAS,
} from "@/lib/sazonalidade";

interface HomeProps {
  searchParams: { sazonal?: string };
}

export default function Home({ searchParams }: HomeProps) {
  const override = searchParams.sazonal;
  const temporadasAtivas =
    override && override in TEMPORADAS
      ? [override]
      : obterTemporadasAtivas();
  const produtosSazonais = filtrarProdutosSazonais(produtos, temporadasAtivas);
  const nomeTemporada =
    override && override in TEMPORADAS
      ? TEMPORADAS[override].nome
      : obterNomeTemporadaAtiva();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {produtosSazonais.length > 0 && (
        <section className="mb-12">
          <div className="text-center mb-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#003049] mb-2">
              Diamantes da Temporada
            </h2>
            <p className="text-[#669BBC] text-base sm:text-lg">
              {nomeTemporada}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {produtosSazonais.map((produto) => (
              <ProductCard key={produto.id} produto={produto} />
            ))}
          </div>
        </section>
      )}

      <section className="mb-8 text-center">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#003049] mb-2">
          Nosso Cardápio
        </h1>
        <p className="text-[#669BBC] text-base sm:text-lg max-w-xl mx-auto">
          Delícias preparadas com carinho para tornar seu break ainda mais especial.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {produtos.map((produto) => (
          <ProductCard key={produto.id} produto={produto} />
        ))}
      </section>
    </div>
  );
}
