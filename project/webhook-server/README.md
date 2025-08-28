# Servidor Webhook - Secando com Smoothies

Este servidor processa webhooks de pagamento e cria automaticamente usuários no Supabase quando uma compra é realizada.

## 🚀 Configuração

### 1. Instalar dependências

```bash
cd webhook-server
npm install
```

### 2. Configurar variáveis de ambiente

1. Copie o arquivo `.env.example` para `.env`:
```bash
cp .env.example .env
```

2. Edite o arquivo `.env` com suas configurações:
```env
SUPABASE_URL=https://hjkxsjpujiyeefjkdgcc.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua_chave_de_servico_aqui
PORT=3001
```

**⚠️ IMPORTANTE:** Você precisa da chave de **SERVICE ROLE** do Supabase, não a chave anon. Esta chave tem permissões administrativas.

### 3. Executar o servidor

**Desenvolvimento:**
```bash
npm run dev
```

**Produção:**
```bash
npm start
```

O servidor estará rodando em `http://localhost:3001`

## 📡 Endpoints

### Health Check
```
GET /health
```
Verifica se o servidor está funcionando.

### Webhook de Pagamento
```
POST /webhook/payment
```
Recebe webhooks de plataformas de pagamento (Stripe, Mercado Pago, etc.).

**Payload esperado:**
```json
{
  "event_type": "payment.approved",
  "data": {
    "customer_email": "usuario@email.com",
    "customer_name": "Nome do Usuario",
    "product_id": "smoothie_program_21_days",
    "amount": 97.00,
    "currency": "BRL",
    "payment_status": "approved",
    "transaction_id": "txn_123456789",
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

### Teste do Webhook
```
POST /webhook/test
```
Endpoint para testar a criação de usuários durante o desenvolvimento.

**Payload de teste:**
```json
{
  "email": "teste@exemplo.com",
  "name": "Usuario Teste"
}
```

## 🔄 Fluxo de Processamento

Quando um webhook de pagamento é recebido:

1. **Validação:** Verifica se é um evento de pagamento aprovado
2. **Criação de Usuário:** Cria o usuário no Supabase Auth (se não existir)
3. **Registro de Pagamento:** Salva os dados do pagamento na tabela `payments`
4. **Perfil do Usuário:** Cria/atualiza o perfil na tabela `user_profiles`
5. **Email de Boas-vindas:** Envia email de confirmação (opcional)

## 🔧 Integração com Plataformas de Pagamento

### Stripe
```javascript
// Configurar webhook no Stripe Dashboard
// URL: https://smoothies.programasecacomigo.site/api/webhook/payment
// Eventos: checkout.session.completed, payment_intent.succeeded
```

### Mercado Pago
```javascript
// Configurar notificação IPN
// URL: https://smoothies.programasecacomigo.site/api/webhook/payment
// Tópicos: payment
```

### Hotmart
```javascript
// Configurar Postback
// URL: https://smoothies.programasecacomigo.site/api/webhook/payment
// Eventos: PURCHASE_APPROVED
```

### Kiwify
```javascript
// Configurar Webhook
// URL: https://smoothies.programasecacomigo.site/api/webhook/payment
// Eventos: order.completed, order.approved
```

### Eduzz
```javascript
// Configurar Postback
// URL: https://smoothies.programasecacomigo.site/api/webhook/payment
// Eventos: purchase.approved
```

## 🛡️ Segurança

### Validação de Webhook (Recomendado)

Para produção, adicione validação de assinatura:

```javascript
// Exemplo para Stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/webhook/payment', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature'];
  
  try {
    const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    // Processar evento...
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
});
```

### Variáveis de Ambiente Sensíveis

- Nunca commite o arquivo `.env`
- Use chaves diferentes para desenvolvimento e produção
- Mantenha a `SUPABASE_SERVICE_ROLE_KEY` segura

## 🚀 Deploy

### Vercel
```bash
npm install -g vercel
vercel
```

### Railway
```bash
npm install -g @railway/cli
railway login
railway deploy
```

### Heroku
```bash
git init
heroku create seu-app-webhook
git add .
git commit -m "Initial commit"
git push heroku main
```

## 📝 Logs

O servidor registra todas as operações importantes:

- Webhooks recebidos
- Usuários criados
- Pagamentos processados
- Erros e exceções

## 🧪 Testando

### Teste Local
```bash
curl -X POST http://localhost:3001/webhook/test \
  -H "Content-Type: application/json" \
  -d '{"email": "teste@exemplo.com", "name": "Usuario Teste"}'
```

### Teste de Produção
Use ferramentas como ngrok para expor seu servidor local:

```bash
npm install -g ngrok
ngrok http 3001
```

Use a URL do ngrok como webhook URL nas plataformas de pagamento.

## ❓ Troubleshooting

### Erro: "SUPABASE_SERVICE_ROLE_KEY não encontrada"
- Verifique se o arquivo `.env` existe
- Confirme se a variável está definida corretamente

### Erro: "User already registered"
- Normal quando o usuário já existe
- O sistema busca o usuário existente automaticamente

### Erro: "Falha ao criar ou encontrar usuário"
- Verifique as permissões da chave de serviço
- Confirme se o Supabase Auth está habilitado

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique os logs do servidor
2. Teste com o endpoint `/webhook/test`
3. Confirme as configurações do Supabase