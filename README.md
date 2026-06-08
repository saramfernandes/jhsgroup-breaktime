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
| `app/carrinho/page.tsx` | Página do carrinho com itens, controles de quantidade e checkout |
| `app/layout.tsx` | Layout raiz com fontes, metadata, Header, Footer e CartProvider |
| `components/Header.tsx` | Cabeçalho fixo com logo "BreakTime" e ícone de carrinho com badge |
| `components/Footer.tsx` | Rodapé |
| `components/ProductCard.tsx` | Card de produto com imagem, preço, variedade, seletor de quantidade e botão "Adicionar ao Carrinho" |
| `lib/produtos.ts` | Dados e tipagem dos produtos |
| `lib/cart-context.tsx` | Contexto global do carrinho (React Context + useState) |

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

### Cardápio
- Exibição de cardápio em grid responsivo (1 a 4 colunas)
- Cards com imagem, categoria, nome, preço formatado em BRL, seletor de quantidade e botão "Adicionar ao Carrinho"
- Seletor de variedade para produtos com opções (ex: Bolo Chocolate/Morango)
- Troca dinâmica de imagem conforme a variedade selecionada
- Header fixo e Footer com identidade visual
- Paleta de cores personalizada (tons de azul marinho, creme e rosa)

### Carrinho de Compras
- **Contexto global** (`lib/cart-context.tsx`) gerenciando o estado do carrinho via React Context
- **Adicionar ao carrinho**: botão no card com feedback visual breve ("Adicionado ✓")
- **Seletor de quantidade** no card: usuário pode escolher quantos itens adicionar de uma vez
- **Incremento inteligente**: se o mesmo produto + variedade já existe, soma a quantidade escolhida
- **Badge no Header**: ícone de carrinho com contador vermelho no canto superior direito, link para `/carrinho`
- **Página do carrinho** (`/carrinho`):
  - Lista todos os itens com nome, variedade (se houver), preço unitário e subtotal
  - Controles de quantidade (+/−) por item
  - Botão "×" para remover item individualmente
  - **Total geral** formatado em BRL
  - Botão "Limpar carrinho" (secundário)
  - Botão "Finalizar Compra" (rosa, destaque) — exibe alerta e esvazia o carrinho
  - Mensagem simpática e link "Ver Cardápio" quando o carrinho está vazio
- Estilização consistente com a paleta do projeto (fundo creme, cards com borda sutil, títulos em Playfair Display)

## Como Executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)
- npm (vem junto com o Node.js)

### Passo a passo

1. **Clone o repositório**

   ```bash
   git clone https://github.com/saramfernandes/jhsgroup-breaktime.git
   cd jhsgroup-breaktime
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**

   ```bash
   npm run dev
   ```

4. **Acesse no navegador**

   Abra [http://localhost:3000](http://localhost:3000) para visualizar o cardápio.

   A página do carrinho está disponível em [http://localhost:3000/carrinho](http://localhost:3000/carrinho).

> **Dica:** O Next.js utiliza hot reload — qualquer alteração no código será refletida automaticamente no navegador, sem precisar reiniciar o servidor.