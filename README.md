# BreakTime | Cafeteria & Confeitaria

Projeto desenvolvido na aula de IA do SENAI. Um site de cardápio digital para uma cafeteria e confeitaria, apresentando bolos, doces, brownies, muffins e bebidas especiais.

---

## Stack Tecnológica

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Lucide React** (ícones)
- **Google Fonts** — Playfair Display & Inter

## Estrutura do Projeto

| Caminho | Descrição |
|---------|-----------|
| `app/page.tsx` | Página inicial com o cardápio de produtos |
| `app/layout.tsx` | Layout raiz com fontes, metadata, Header e Footer |
| `components/Header.tsx` | Cabeçalho fixo com logo "BreakTime" |
| `components/Footer.tsx` | Rodapé |
| `components/ProductCard.tsx` | Card de produto com imagem, preço, variedade e botão de carrinho |
| `lib/produtos.ts` | Dados e tipagem dos produtos |

## Produtos Cadastrados

| Produto | Categoria | Preço |
|---------|-----------|-------|
| Bolo (Chocolate / Morango) | Confeitaria | R$ 45,00 |
| Doces Gourmet (Brigadeiro / Beijinho / Casadinho) | Confeitaria | R$ 12,00 |
| Muffin | Confeitaria | R$ 8,50 |
| Brownie | Confeitaria | R$ 10,00 |
| Cuca de Doce de Leite | Confeitaria | R$ 18,00 |
| Capuccino | Bebidas | R$ 14,00 |
| Chocolate Quente | Bebidas | R$ 16,00 |
| Mocaccino | Bebidas | R$ 15,00 |
| Café Expresso | Bebidas | R$ 7,00 |

## Funcionalidades Atuais

- Exibição de cardápio em grid responsivo (1 a 4 colunas)
- Cards com imagem, categoria, nome, preço formatado em BRL e botão "Adicionar ao Carrinho"
- Seletor de variedade para produtos com opções (ex: Bolo Chocolate/Morango)
- Troca dinâmica de imagem conforme a variedade selecionada
- Header fixo e Footer com identidade visual
- Paleta de cores personalizada (tons de azul marinho, creme e rosa)

## Como Executar

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

---

*Feito com ❤ na aula de IA do SENAI*
