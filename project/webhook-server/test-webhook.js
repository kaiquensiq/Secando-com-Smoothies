const crypto = require('crypto');
const axios = require('axios');

// Secret do webhook
const secret = 'd7befe892c75228953d9bb5ded9a360edd0b1e1ebe59c28f0a000959839fafa1';

// Payload de teste
const payload = {
  event: 'pix.paid',
  customer: {
    name: 'Teste Segurança',
    email: 'teste.seguranca@exemplo.com'
  },
  payment: {
    id: 'pay_test_security',
    amount: 4900,
    currency: 'BRL',
    method: 'pix',
    status: 'paid',
    created_at: '2024-01-15T15:00:00Z',
    completed_at: '2024-01-15T15:02:00Z'
  },
  product: {
    id: 'NfXimOHdgvd8GDqZ636a',
    name: 'Plano Smoothie Teste',
    price: 4900
  },
  webhook: {
    id: 'wh_test_security',
    created_at: '2024-01-15T15:02:05Z'
  }
};

// Converter para JSON string
const payloadString = JSON.stringify(payload);
console.log('Payload:', payloadString);
console.log('Payload length:', payloadString.length);

// Gerar assinatura
const signature = 'sha256=' + crypto
  .createHmac('sha256', secret)
  .update(payloadString, 'utf8')
  .digest('hex');

console.log('Signature:', signature);

// Fazer requisição
async function testWebhook() {
  try {
    const response = await axios.post('http://localhost:3001/webhook/payment', payload, {
      headers: {
        'Content-Type': 'application/json',
        'x-signature-256': signature
      }
    });
    
    console.log('✅ Sucesso:', response.data);
  } catch (error) {
    console.log('❌ Erro:', error.response?.data || error.message);
  }
}

// Testar sem assinatura também
async function testWithoutSignature() {
  try {
    const response = await axios.post('http://localhost:3001/webhook/payment', payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ Sucesso (sem assinatura):', response.data);
  } catch (error) {
    console.log('❌ Erro (sem assinatura):', error.response?.data || error.message);
  }
}

console.log('\n=== Testando com assinatura ===');
testWebhook().then(() => {
  console.log('\n=== Testando sem assinatura ===');
  return testWithoutSignature();
});