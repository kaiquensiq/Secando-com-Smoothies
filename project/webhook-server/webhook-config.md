# Configuração de Webhook - Secando com Smoothies

## 🔗 URL do Webhook Atualizada

**URL Principal:** `https://smoothies.programasecacomigo.site/api/webhook/payment`

## 🔒 Segurança do Webhook

### Secret do Webhook
O webhook utiliza uma secret para validar a autenticidade das requisições através de assinatura HMAC SHA-256.

**Secret atual:**
```
d7befe892c75228953d9bb5ded9a360edd0b1e1ebe59c28f0a000959839fafa1
```

### 👤 Criação Automática de Usuários
Quando um pagamento é aprovado, o webhook cria automaticamente uma conta de usuário no Supabase com:

- **Email:** Email do cliente que fez a compra
- **Senha padrão:** `smoothie123`
- **Status:** Email confirmado automaticamente
- **Metadata:** Informações sobre a compra e origem

**⚠️ Importante:** Os usuários devem alterar a senha padrão após o primeiro login por questões de segurança.

### Validação de Assinatura
O servidor valida automaticamente a assinatura se a variável `WEBHOOK_SECRET` estiver configurada.

**Headers necessários:**
- `x-signature-256`: Assinatura HMAC SHA-256 do payload
- `x-hub-signature-256`: Formato alternativo (compatível com GitHub)

**Formato da assinatura:**
```
sha256=<hash_hmac_sha256>
```

**Como gerar a assinatura (exemplo em Node.js):**
```javascript
const crypto = require('crypto');
const secret = 'd7befe892c75228953d9bb5ded9a360edd0b1e1ebe59c28f0a000959839fafa1';
const payload = JSON.stringify(webhookData);
const signature = 'sha256=' + crypto
  .createHmac('sha256', secret)
  .update(payload, 'utf8')
  .digest('hex');
```

## 📋 Configuração por Plataforma

### 🟦 Stripe
- **URL do Webhook:** `https://smoothies.programasecacomigo.site/api/webhook/payment`
- **Eventos para escutar:**
  - `checkout.session.completed`
  - `payment_intent.succeeded`
- **Método:** POST
- **Formato:** JSON

### 🟨 Mercado Pago
- **URL de Notificação IPN:** `https://smoothies.programasecacomigo.site/api/webhook/payment`
- **Tópicos:**
  - `payment`
- **Método:** POST
- **Formato:** JSON

### 🟧 Hotmart
- **URL de Postback:** `https://smoothies.programasecacomigo.site/api/webhook/payment`
- **Eventos:**
  - `PURCHASE_APPROVED`
  - `PURCHASE_COMPLETE`
- **Método:** POST
- **Formato:** JSON

### 🟩 Kiwify
- **URL do Webhook:** `https://smoothies.programasecacomigo.site/api/webhook/payment`
- **Eventos:**
  - `order.completed`
  - `order.approved`
- **Método:** POST
- **Formato:** JSON

### 🟪 Eduzz
- **URL de Postback:** `https://smoothies.programasecacomigo.site/api/webhook/payment`
- **Eventos:**
  - `purchase.approved`
  - `purchase.completed`
- **Método:** POST
- **Formato:** JSON

### 🔵 PagSeguro
- **URL de Notificação:** `https://smoothies.programasecacomigo.site/api/webhook/payment`
- **Eventos:**
  - Transação aprovada (status 3)
  - Transação disponível (status 4)
- **Método:** POST
- **Formato:** XML/JSON

## 🧪 URL de Teste

**URL de Teste:** `https://smoothies.programasecacomigo.site/api/webhook/test`

### Payload de Teste
```json
{
  "email": "teste@exemplo.com",
  "name": "Usuario Teste",
  "amount": 97,
  "product": {
    "id": "NfXimOHdgvd8GDqZ636a"
  }
}
```

### Comando cURL para Teste
```bash
curl -X POST https://smoothies.programasecacomigo.site/api/webhook/test \
  -H "Content-Type: application/json" \
  -d '{"email": "teste@exemplo.com", "name": "Usuario Teste", "amount": 97, "product": {"id": "NfXimOHdgvd8GDqZ636a"}}'
```

### Teste com Assinatura
```bash
# Gerar assinatura (Node.js)
node -e "
const crypto = require('crypto');
const secret = 'd7befe892c75228953d9bb5ded9a360edd0b1e1ebe59c28f0a000959839fafa1';
const payload = JSON.stringify({
  email: 'teste@exemplo.com',
  name: 'Usuario Teste',
  amount: 97,
  product: { id: 'NfXimOHdgvd8GDqZ636a' }
});
const signature = 'sha256=' + crypto.createHmac('sha256', secret).update(payload, 'utf8').digest('hex');
console.log('Signature:', signature);
"

# Fazer requisição com assinatura
curl -X POST https://smoothies.programasecacomigo.site/api/webhook/test \
  -H "Content-Type: application/json" \
  -H "x-signature-256: sha256=<signature_gerada_acima>" \
  -d '{"email": "teste@exemplo.com", "name": "Usuario Teste", "amount": 97, "product": {"id": "NfXimOHdgvd8GDqZ636a"}}'
```

### Teste com Payload Completo
```bash
curl -X POST https://smoothies.programasecacomigo.site/api/webhook/payment \
  -H "Content-Type: application/json" \
  -d '{
    "event": "pix.paid",
    "createdAt": { "_seconds": 1754393130, "_nanoseconds": 0 },
    "customer": {
      "name": "Teste Usuario",
      "email": "teste@exemplo.com",
      "document": null,
      "phone": null,
      "ip": "::1"
    },
    "payment": {
      "id": "test-payment-123",
      "method": "pix.paid",
      "status": "paid",
      "amount": 97
    },
    "product": {
      "id": "smoothie_program_21_days",
      "type": "main"
    }
  }'
```

## 📝 Formatos de Payload Suportados

### Formato do Seu Checkout (Atual)
```json
{
  "event": "pix.paid",
  "createdAt": { "_seconds": 1754393130, "_nanoseconds": 582000000 },
  "customer": {
    "name": "Comprador",
    "email": "teste@teste.com",
    "document": null,
    "phone": null,
    "ip": "::1"
  },
  "payment": {
    "id": "9f8fa5ee-b346-43ec-a032-ca2e504f6485",
    "method": "pix.paid",
    "status": "paid",
    "amount": 97
  },
  "product": {
    "id": "smoothie_program_21_days",
    "type": "main"
  },
  "webhook": {
    "id": "ivKsQqxetJc1q8d2hfKt",
    "businessId": "MYLKdEN3ppZ1GIrLZTns4PNSvc21",
    "events": ["pix.paid", "pix.generated", "card.paid"]
  }
}
```

### Formato Padrão (Compatibilidade)
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

### Eventos Processados
- `pix.paid` - Pagamento PIX aprovado
- `card.paid` - Pagamento com cartão aprovado
- `payment.approved` - Pagamento aprovado (formato padrão)
- `checkout.completed` - Checkout concluído

## ⚙️ Configuração no Checkout

Para adicionar o webhook no seu checkout, use a URL:

```
https://smoothies.programasecacomigo.site/api/webhook/payment
```

### Exemplo de Configuração

**Para Stripe Checkout:**
```javascript
const session = await stripe.checkout.sessions.create({
  // ... outras configurações
  success_url: 'https://smoothies.programasecacomigo.site/sucesso',
  cancel_url: 'https://smoothies.programasecacomigo.site/cancelado',
  metadata: {
    webhook_url: 'https://smoothies.programasecacomigo.site/api/webhook/payment'
  }
});
```

**Para Mercado Pago:**
```javascript
const preference = {
  // ... outras configurações
  notification_url: 'https://smoothies.programasecacomigo.site/api/webhook/payment',
  back_urls: {
    success: 'https://smoothies.programasecacomigo.site/sucesso',
    failure: 'https://smoothies.programasecacomigo.site/erro',
    pending: 'https://smoothies.programasecacomigo.site/pendente'
  }
};
```

## 🔒 Segurança

- O webhook está configurado para aceitar apenas requisições POST
- Validação de payload é feita automaticamente
- Validação de assinatura HMAC SHA-256 para autenticidade
- Logs de todas as transações são mantidos
- Proteção contra CORS configurada
- Secret configurada para validação de webhooks

## 📞 Suporte

Se você encontrar problemas:
1. Verifique se a URL está correta
2. Confirme se o método é POST
3. Verifique o formato do payload
4. Teste com a URL de teste primeiro

---

**Última atualização:** Janeiro 2025
**Domínio:** smoothies.programasecacomigo.site