import { Produto } from "@/lib/produtos";

export interface Temporada {
  chave: string;
  nome: string;
}

function calcularPascoa(ano: number): Date {
  const a = ano % 19;
  const b = Math.floor(ano / 100);
  const c = ano % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mes = Math.floor((h + l - 7 * m + 114) / 31);
  const dia = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(ano, mes - 1, dia);
}

function calcularDiaDasMaes(ano: number): Date {
  const primeiroDeMaio = new Date(ano, 4, 1);
  const diaDaSemana = primeiroDeMaio.getDay();
  const diasAtePrimeiroDomingo = diaDaSemana === 0 ? 0 : 7 - diaDaSemana;
  const segundoDomingo = 1 + diasAtePrimeiroDomingo + 7;
  return new Date(ano, 4, segundoDomingo);
}

function dataEstaNoIntervalo(data: Date, inicio: Date, fim: Date): boolean {
  return data >= inicio && data <= fim;
}

export function obterTemporadasAtivas(dataReferencia: Date = new Date()): string[] {
  const ano = dataReferencia.getFullYear();
  const ativas: string[] = [];

  const pascoa = calcularPascoa(ano);
  const inicioPascoa = new Date(pascoa);
  inicioPascoa.setDate(pascoa.getDate() - 7);
  const fimPascoa = new Date(pascoa);
  fimPascoa.setDate(pascoa.getDate() + 7);

  const diaDasMaes = calcularDiaDasMaes(ano);
  const inicioDiaDasMaes = new Date(diaDasMaes);
  inicioDiaDasMaes.setDate(diaDasMaes.getDate() - 14);
  const fimDiaDasMaes = new Date(diaDasMaes);
  fimDiaDasMaes.setHours(23, 59, 59, 999);

  const inicioNatal = new Date(ano, 10, 15);
  const fimNatal = new Date(ano, 11, 25, 23, 59, 59, 999);

  const inicioInverno = new Date(ano, 5, 21);
  const fimInverno = new Date(ano, 8, 22, 23, 59, 59, 999);

  const inicioNamorados = new Date(ano, 5, 1);
  const fimNamorados = new Date(ano, 5, 12, 23, 59, 59, 999);

  const inicioFestaJunina = new Date(ano, 5, 1);
  const fimFestaJunina = new Date(ano, 5, 30, 23, 59, 59, 999);

  if (dataEstaNoIntervalo(dataReferencia, inicioNatal, fimNatal)) {
    ativas.push("natal");
  }
  if (dataEstaNoIntervalo(dataReferencia, inicioPascoa, fimPascoa)) {
    ativas.push("pascoa");
  }
  if (dataEstaNoIntervalo(dataReferencia, inicioInverno, fimInverno)) {
    ativas.push("inverno");
  }
  if (dataEstaNoIntervalo(dataReferencia, inicioDiaDasMaes, fimDiaDasMaes)) {
    ativas.push("dia-das-maes");
  }
  if (dataEstaNoIntervalo(dataReferencia, inicioNamorados, fimNamorados)) {
    ativas.push("dia-dos-namorados");
  }
  if (dataEstaNoIntervalo(dataReferencia, inicioFestaJunina, fimFestaJunina)) {
    ativas.push("festa-junina");
  }

  return ativas;
}

export function filtrarProdutosSazonais(
  produtos: Produto[],
  temporadas: string[]
): Produto[] {
  if (temporadas.length === 0) return [];
  return produtos.filter(
    (produto) =>
      produto.sazonal &&
      produto.sazonal.some((tag) => temporadas.includes(tag))
  );
}

export const TEMPORADAS: Record<string, Temporada> = {
  natal: { chave: "natal", nome: "🎄 Natal" },
  pascoa: { chave: "pascoa", nome: "🐰 Páscoa" },
  inverno: { chave: "inverno", nome: "☕ Inverno" },
  "dia-das-maes": { chave: "dia-das-maes", nome: "🌸 Dia das Mães" },
  "dia-dos-namorados": {
    chave: "dia-dos-namorados",
    nome: "💘 Dia dos Namorados",
  },
  "festa-junina": { chave: "festa-junina", nome: "🌽 Festa Junina" },
};

export function obterNomeTemporadaAtiva(dataReferencia: Date = new Date()): string {
  const ativas = obterTemporadasAtivas(dataReferencia);
  if (ativas.length === 0) return "";
  const nomes = ativas.map((chave) => TEMPORADAS[chave]?.nome ?? chave);
  return nomes.join(" & ");
}
