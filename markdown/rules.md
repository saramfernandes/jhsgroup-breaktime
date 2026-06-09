# Regras do Projeto (Rules)

Este documento estabelece as regras de arquitetura, linguagens, ferramentas, padrões de código e diretrizes de design que devem ser seguidas estritamente durante o desenvolvimento do projeto **BreakTime**.

---

## 🏗️ 1. Arquitetura

O projeto utiliza a estrutura do **Next.js 14 (App Router)**:
- **Camada de Visualização/Rotas (`app/`)**: Define as páginas e layouts da aplicação.
  - Usar React Server Components por padrão.
  - Usar `'use client'` somente quando necessário (uso de Hooks, manipulação de estado ou eventos do navegador).
- **Componentes (`components/`)**: Elementos visuais modulares e reutilizáveis da interface.
- **Estrutura de Componentes (.tsx)**: Para cada `.tsx`, crie uma pasta. Nela, crie 3 arquivos para separação de lógica:
  - Um arquivo `.ts` para as interfaces/tipagem (`nome-componente.types.ts`).
  - Um arquivo `.css` para estilização (`nome-componente.styles.css`).
  - Um arquivo `.tsx` (`nome-componente.tsx`) que usa os outros dois.
- **Camada de Serviços e Contexto (`lib/`)**: Centraliza as lógicas de negócio, dados estáticos (ex: catálogo de produtos) e gerenciamento de estado global via React Context API.

---

## 💻 2. Linguagens e Ferramentas

- **Linguagens**: TypeScript (tipagem estrita) e HTML5 semântico.
- **Estilização**: Tailwind CSS integrado com classes customizadas em arquivos CSS globais.
- **Ferramentas de UI/Ícones**: Lucide React.
- **Fontes**: Playfair Display (para títulos/font-serif) e Inter (para textos de corpo/font-sans).

---

## 🗄️ 3. Banco de Dados

- Atualmente, o projeto **não utiliza banco de dados persistente**.
- Todo o estado da aplicação (como itens no carrinho) é gerenciado **em memória no lado do cliente** através do Contexto do React (`lib/cart-context.tsx`).

---

## 🎨 4. Identidade Visual e Design

- **Paleta de Cores**: Mantenha a paleta de cores personalizada do projeto:
  - Azul Marinho Escuro: `#003049`
  - Azul Claro/Médio: `#669BBC`
  - Fundo Creme: `#FDF0D5` (com variações como `#FFF9EE`)
  - Rosa/Coral/Destaque
- **Responsividade**: Implemente designs responsivos (mobile-first), limpos e adaptáveis para diferentes tamanhos de tela.
- **Interatividade**: Sempre forneça transições suaves (hover, transições de estado) e feedbacks táteis ou visuais interativos (ex: alerta de item adicionado ao carrinho, animação leve ao clicar).

---

## ✍️ 5. Padrões de Código

### O que Fazer (Recomendado)
- **Nomes de variáveis e funções claros**: Priorize **clareza sobre tamanho curto**. O nome deve expressar com precisão o propósito da variável ou função (ex: `adicionarProdutoAoCarrinho` em vez de `addProd` ou `add`).
- **TypeScript Estrito**: Declare tipos explícitos para todas as propriedades de componentes, parâmetros de funções e retornos. Evite o uso de `any`.
- **Componentização**: Crie componentes reutilizáveis para evitar duplicação de lógica e visual.
- **Semântica HTML5**: Utilize tags semânticas apropriadas (`<header>`, `<main>`, `<footer\>`, `<section>`, `<article>`, `<button>`).
- **Dont overthink**: Não faça código complicado demais para a tarefa, buscando simplificar a codebase mas mantendo a funcionalidade.

### O que NÃO Fazer (Proibido)
- **Nunca fazer CSS direto no className**:
  - **🚫 Proibido**: Escrever extensas cadeias de classes utilitárias do Tailwind CSS ou estilos inline diretamente na propriedade `className` do componente.
  - **✅ Permitido/Obrigatório**: Definir uma classe CSS com um nome claro e descritivo (ex: `.card-produto`, `.btn-adicionar-carrinho`) em um arquivo CSS (como [globals.css](file:///c:/Users/joao_griebner/Documents/MAINFRAME/jhsgroup-breaktime/app/globals.css)) e utilizar a diretiva `@apply` do Tailwind para estilizar essa classe, ou utilizar CSS Modules. Mantenha o JSX limpo e legível.
- **Lógica pesada nos Componentes Visuais**: Não misture lógica complexa de manipulação de carrinho ou requisições diretamente dentro de componentes visuais simples; delegue para contextos ou funções auxiliares na pasta `lib/`.
