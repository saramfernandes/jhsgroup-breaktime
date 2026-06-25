# Destaque Sazonal – Task

Implementar detecção de temporada por data e exibição de produtos sazonais em seção destacada na home, com tagging interna (não visível) nos produtos.

---

## 1. Catálogo e Mapeamento Sazonal

Cada produto recebe uma tag interna `sazonal` (array de strings) que **não é exibida no front**. A detecção da temporada ativa é feita unicamente pela data atual.

### Produtos e suas temporadas

| # | Produto | Temporadas |
|---|---------|------------|
| 1 | Bolo (Chocolate, Morango) | natal, páscoa, dia-das-maes |
| 2 | Doces Gourmet | natal, páscoa, dia-das-maes, festa-junina |
| 3 | Muffin | — |
| 4 | Brownie | natal, páscoa |
| 5 | Capuccino | inverno |
| 6 | Chocolate Quente | inverno, natal |
| 7 | Cuca de Doce de Leite | inverno, natal, festa-junina |
| 8 | Mocaccino | inverno |
| 9 | Café Expresso | inverno |

### Temporadas e períodos

| Chave | Nome | Período |
|-------|------|---------|
| `natal` | 🎄 Natal | 15/Nov – 25/Dez |
| `pascoa` | 🐰 Páscoa | Domingo de Páscoa −7d até +7d |
| `inverno` | ☕ Inverno | 21/Jun – 22/Set |
| `dia-das-maes` | 🌸 Dia das Mães | 2º domingo de Maio −14d até o dia |
| `dia-dos-namorados` | 💘 Dia dos Namorados | 01/Jun – 12/Jun |
| `festa-junina` | 🌽 Festa Junina | 01/Jun – 30/Jun |

---

## 2. Arquivos Modificados/Criados

### `lib/produtos.ts` (editado)
- Campo `sazonal?: string[]` adicionado à interface `Produto`.
- Tags preenchidas nos 9 produtos conforme tabela acima.

### `lib/sazonalidade.ts` (criado)
- `calcularPascoa(ano)` — algoritmo de Gauss para data da Páscoa.
- `calcularDiaDasMaes(ano)` — segundo domingo de maio.
- `obterTemporadasAtivas(data?)` — retorna array de chaves das temporadas vigentes.
- `filtrarProdutosSazonais(produtos, temporadas)` — filtra produtos cujo `sazonal` intersecta com as temporadas ativas.
- `obterNomeTemporadaAtiva(data?)` — retorna nome formatado para exibição (ex: "☕ Inverno & 🌽 Festa Junina").
- `TEMPORADAS` — constante com metadados de todas as temporadas.

### `app/page.tsx` (editado)
- Agora renderiza **duas seções**:
  1. **"Destaques da Temporada"** — grid com produtos sazonais. Só aparece se houver ao menos 1 produto na temporada ativa.
  2. **"Nosso Cardápio"** — grid com todos os produtos (incluindo os sazonais).

---

## 3. Regras de Comportamento

- A página inicial é um **Server Component** — a lógica de data é pura, sem `'use client'`.
- Se nenhuma temporada estiver ativa, a seção "Destaques da Temporada" **não é renderizada**.
- Se uma temporada estiver ativa mas nenhum produto tiver a tag correspondente, a seção também **não aparece**.
- Produtos sazonais aparecem **em ambas as seções** (destaque + cardápio completo).
- Nenhuma tag sazonal é exibida como badge/texto nos cards.
- Múltiplas temporadas podem estar ativas simultaneamente (ex: junho = inverno + festa-junina + dia-dos-namorados).
