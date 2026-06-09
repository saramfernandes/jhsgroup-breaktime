-- INICIO RASCUNHO --
Implemente o backend de checkout e a página de confirmação do BreakTime com integração real com a InfinitePay.
O projeto usa Next.js 14 (App Router) e TypeScript.
A página /checkout já existe e faz POST para /api/checkout com:
{ cliente: { nome, telefone, tipoEntrega, endereco }, itens, total }
e redireciona para a URL retornada pela API.

Siga exatamente estas etapas:

1. CONFIGURAÇÃO DE AMBIENTE — modifique ou crie .env.local:
Defina as seguintes chaves de configuração:
- NEXT_PUBLIC_INFINITEPAY_HANDLE (deixe vazio para o usuário preencher)
- INFINITEPAY_API_KEY (deixe vazio para o usuário preencher)

2. ROTA DE API — crie ou modifique app/api/checkout/route.ts:
A rota deve:
- Aceitar apenas POST; retornar 405 para outros métodos.
- Ler e validar o body: verificar se cliente, itens (com quantidade e preço) e total estão presentes. Se não, retornar 400 com { erro: "Dados incompletos" }.
- Formatar a payload para a API da InfinitePay (POST https://api.checkout.infinitepay.io/links):
  - "handle": valor obtido de process.env.NEXT_PUBLIC_INFINITEPAY_HANDLE.
  - "redirect_url": URL absoluta apontando para a página /obrigado (use a origem da requisição, por exemplo, a partir do header Host/Origin ou baseUrl).
  - "webhook_url": URL para webhooks (opcional/pode ser vazio ou omitido por enquanto).
  - "order_nsu": ID único do pedido (gerado dinamicamente via uuid ou timestamp).
  - "items": Array de itens mapeando:
    - "quantity": item.quantidade (número inteiro)
    - "price": preço unitário do item convertido para centavos e arredondado (item.precoUnitario * 100)
    - "description": nome do item (se houver variedade, concatenar no formato "Nome (Variedade)")
- Fazer a chamada HTTP usando fetch para a API da InfinitePay com autenticação Bearer no header Authorization usando a chave INFINITEPAY_API_KEY.
- Tratar erros da API e em caso de sucesso retornar JSON contendo a URL de redirecionamento: { url: resposta.url }.
- Tipar o body e as respostas corretamente com interfaces locais (evite o tipo 'any').

3. PÁGINA DE CONFIRMAÇÃO — crie app/obrigado/page.tsx:
- Ao renderizar (on mount, via useEffect), chame useCart().limpar() para esvaziar o carrinho.
- Apresente um visual condizente com a paleta do BreakTime (fundo creme, fontes Playfair Display e Inter).
- Card central contendo:
  - Ícone de check (Lucide React: CheckCircle2) em verde.
  - Título em Playfair Display: "Pedido Confirmado!"
  - Mensagem de sucesso: "Obrigado pela preferência! Em breve entraremos em contato pelo WhatsApp para confirmar seu pedido!☕"
  - Botão "Voltar ao Cardápio" que redireciona o usuário para a página inicial (/).

Não altere nenhum arquivo existente além do que for estritamente necessário.

Observações:
- TypeScript estrito, sem usar 'any'.
- Mantenha o Header e o Footer em todas as novas páginas.