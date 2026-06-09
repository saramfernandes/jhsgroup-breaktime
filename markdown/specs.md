# Especificações do Projeto (Specs)

Este documento descreve as especificações técnicas e de negócios para o projeto **BreakTime**. Ele mapeia o comportamento esperado de cada funcionalidade e o fluxo do usuário na aplicação.

---

## 📋 1. Catálogo de Produtos (Página Inicial)

### Exibição de Itens
- **Layout**: Grade (grid) de produtos totalmente responsiva, variando de 1 coluna (dispositivos móveis) até 4 colunas (telas grandes).
- **Cards de Produto (`ProductCard`)**: Cada item deve apresentar de forma clara:
  - Imagem do produto correspondente à sua variedade atual.
  - Categoria do produto (ex: Confeitaria, Bebidas).
  - Nome do produto.
  - Preço formatado em Reais (BRL).
  - Seletor de quantidade (permite ao usuário escolher quantos itens deseja adicionar de uma só vez).
  - Botão de "Adicionar ao Carrinho".

### Variedades de Produto
- Produtos com múltiplas opções (ex: Bolo de Chocolate / Bolo de Morango) devem exibir um seletor de variedade (ex: dropdown ou rádio).
- Ao alterar a variedade selecionada, a imagem exibida no card do produto deve ser atualizada dinamicamente para corresponder à opção escolhida.

---

## 🛒 2. Fluxo do Carrinho de Compras

### Adição de Itens
- Ao clicar em "Adicionar ao Carrinho" no `ProductCard`:
  - O produto com a variedade selecionada e a quantidade escolhida é adicionado ao contexto global do carrinho (`lib/cart-context.tsx`).
  - O botão deve fornecer feedback visual instantâneo (ex: mudar temporariamente o texto para "Adicionado ✓").
  - **Soma inteligente**: Caso o mesmo produto com a *mesma variedade* já esteja no carrinho, a nova quantidade selecionada deve ser adicionada à quantidade existente, em vez de criar uma nova linha. Se a variedade for diferente, deve ser inserido como um novo item.

### Indicador no Header
- O cabeçalho fixo (`Header`) exibe um ícone de carrinho com um marcador vermelho (badge).
- O badge deve mostrar em tempo real o **número total de itens** no carrinho (soma das quantidades de todos os itens).
- Clicar no ícone do carrinho deve redirecionar o usuário para a página de finalização (`/carrinho`).

---

## 💳 3. Página do Carrinho (`/carrinho`)

### Visualização e Gerenciamento
- **Carrinho Vazio**: Caso não existam itens, deve exibir uma mensagem informando que o carrinho está vazio e um botão amigável de redirecionamento de volta para o cardápio.
- **Listagem de Itens**: Exibe todos os produtos adicionados em formato de lista ou tabela contendo:
  - Nome do produto e variedade correspondente (se houver).
  - Preço unitário e subtotal do item (preço unitário multiplicado pela quantidade).
  - Controles de quantidade (`+` e `-`) para ajustar o volume diretamente na página. Se o usuário clicar em `-` quando a quantidade for 1, o item permanece em 1 ou pode ser excluído caso haja ação de confirmação.
  - Botão de remoção rápida (`×` ou ícone de lixeira) para excluir o item do carrinho imediatamente.
- **Resumo Financeiro**: Exibe o valor **Total Geral** da compra calculado dinamicamente e formatado no padrão BRL.

// TODO: Integração com InfinitePay
### Ações Globais
- **Limpar Carrinho**: Botão secundário que remove todos os itens do carrinho de uma só vez, após confirmação.
- **Finalizar Compra**: Botão de destaque (rosa/coral). Ao ser clicado:
  - Exibe uma mensagem de confirmação (ex: via `alert` ou modal) agradecendo a preferência.
  - Limpa completamente o carrinho.
  - O usuário deve ser guiado de volta para a experiência principal ou obter confirmação do pedido.
