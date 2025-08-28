// Servidor Express.js para webhook de pagamentos
// Este é um exemplo de como implementar o webhook em um servidor backend

const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configuração do Supabase
const supabaseUrl = 'https://hjkxsjpujiyeefjkdgcc.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Chave de serviço

if (!supabaseServiceKey) {
  console.error('SUPABASE_SERVICE_ROLE_KEY não encontrada nas variáveis de ambiente');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Middlewares
app.use(cors());
// Middleware para capturar raw body (necessário para validação de assinatura)
app.use('/webhook', express.raw({ type: 'application/json' }));
// Middleware para parsing de JSON (para outras rotas)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Função para validar assinatura do webhook
function validateWebhookSignature(payload, signature, secret) {
  if (!signature || !secret) {
    console.log('❌ Assinatura ou secret não fornecidos');
    return false;
  }

  // Remove o prefixo 'sha256=' se presente
  const cleanSignature = signature.replace('sha256=', '');
  
  // Calcula a assinatura esperada
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload, 'utf8')
    .digest('hex');

  console.log('🔍 Debug da assinatura:');
  console.log('  Payload length:', payload.length);
  console.log('  Signature recebida:', cleanSignature);
  console.log('  Signature esperada:', expectedSignature);
  console.log('  Secret usado:', secret.substring(0, 10) + '...');

  // Compara as assinaturas de forma segura
  try {
    const isValid = crypto.timingSafeEqual(
      Buffer.from(cleanSignature, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    );
    console.log('  Resultado:', isValid ? '✅ Válida' : '❌ Inválida');
    return isValid;
  } catch (error) {
    console.log('  Erro na comparação:', error.message);
    return false;
  }
}

// Função para processar webhook de pagamento
async function handlePaymentWebhook(payload) {
  try {
    // Detectar formato do payload
    let event_type, customer_email, customer_name, product_id, amount, currency, payment_status, transaction_id, created_at;
    
    // Formato do seu checkout específico
    if (payload.event && payload.customer && payload.payment) {
      event_type = payload.event;
      customer_email = payload.customer.email;
      customer_name = payload.customer.name;
      product_id = payload.product.id;
      amount = payload.payment.amount;
      currency = 'BRL'; // Assumindo BRL baseado no contexto
      payment_status = payload.payment.status;
      transaction_id = payload.payment.id;
      created_at = payload.createdAt ? new Date(payload.createdAt._seconds * 1000).toISOString() : new Date().toISOString();
    } 
    // Formato padrão (compatibilidade)
    else if (payload.event_type && payload.data) {
      event_type = payload.event_type;
      const data = payload.data;
      customer_email = data.customer_email;
      customer_name = data.customer_name;
      product_id = data.product_id;
      amount = data.amount;
      currency = data.currency;
      payment_status = data.payment_status;
      transaction_id = data.transaction_id;
      created_at = data.created_at;
    }
    else {
      throw new Error('Formato de payload não reconhecido');
    }
    
    console.log('Processando webhook:', { event_type, email: customer_email, status: payment_status });
    
    // Verificar se é um evento de pagamento aprovado
    if (event_type === 'pix.paid' || event_type === 'card.paid' || event_type === 'payment.approved' || event_type === 'checkout.completed' || payment_status === 'paid' || payment_status === 'approved') {

      // 1. Criar usuário no Supabase Auth (se não existir)
      let user;
      try {
        // Tentar criar o usuário com senha padrão
        const defaultPassword = 'smoothie123'; // Senha padrão que o usuário pode alterar depois
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
          email: customer_email,
          password: defaultPassword,
          email_confirm: true, // Confirmar email automaticamente
          user_metadata: {
            name: customer_name || customer_email.split('@')[0],
            created_via: 'checkout_webhook',
            product_purchased: product_id,
            default_password: true // Indicar que está usando senha padrão
          }
        });

        if (authError && !authError.message.includes('already registered')) {
          throw authError;
        }

        user = authData?.user;
        console.log('Usuário criado:', user?.id);
      } catch (error) {
        // Se o usuário já existe, buscar pelo email
        if (error.message.includes('already registered')) {
          const { data: existingUsers } = await supabase.auth.admin.listUsers();
          user = existingUsers.users.find(u => u.email === customer_email);
          console.log('Usuário existente encontrado:', user?.id);
        } else {
          throw error;
        }
      }

      if (!user) {
        throw new Error('Falha ao criar ou encontrar usuário');
      }

      // 2. Registrar o pagamento na tabela payments
      const { error: paymentError } = await supabase
        .from('payments')
        .insert({
          user_id: user.id,
          email: customer_email,
          payment_id: transaction_id,
          amount,
          currency: currency || 'BRL',
          status: payment_status === 'paid' ? 'completed' : payment_status,
          payment_method: event_type.includes('pix') ? 'pix' : event_type.includes('card') ? 'card' : 'checkout',
          created_at: created_at || new Date().toISOString(),
          completed_at: (payment_status === 'paid' || payment_status === 'approved') ? new Date().toISOString() : null
        });

      if (paymentError) {
        console.error('Erro ao registrar pagamento:', paymentError);
        throw paymentError;
      }

      console.log('Pagamento registrado com sucesso');

      // 3. Atualizar perfil do usuário (se necessário)
      const { error: profileError } = await supabase
        .from('user_profiles')
        .upsert({
          id: user.id,
          name: customer_name || customer_email.split('@')[0],
          email: customer_email,
          has_completed_onboarding: false,
          current_day: 1,
          start_date: new Date().toISOString(),
          total_points: 0,
          streak: 0,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'id'
        });

      if (profileError) {
        console.error('Erro ao atualizar perfil:', profileError);
        throw profileError;
      }

      console.log('Perfil atualizado com sucesso');

      // 4. Enviar email de boas-vindas (opcional)
      await sendWelcomeEmail(customer_email, customer_name);

      console.log(`Usuário processado com sucesso: ${customer_email}`);
      return {
        success: true,
        message: 'Usuário criado e pagamento processado com sucesso',
        user_id: user.id
      };
    }

    return {
      success: true,
      message: 'Evento não processado (não é um pagamento aprovado)'
    };

  } catch (error) {
    console.error('Erro no webhook de pagamento:', error);
    return {
      success: false,
      message: error.message || 'Erro interno do servidor'
    };
  }
}

// Função para enviar email de boas-vindas
async function sendWelcomeEmail(email, name) {
  try {
    // Aqui você pode integrar com um serviço de email
    console.log(`Email de boas-vindas enviado para: ${email}`);
    
    // Exemplo com Resend (descomente se usar):
    /*
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: 'noreply@secandocomsmoothies.com',
      to: email,
      subject: 'Bem-vindo ao Secando com Smoothies! 🥤',
      html: `
        <h1>Olá ${name || 'amigo(a)'}!</h1>
        <p>Bem-vindo ao programa Secando com Smoothies!</p>
        <p>Sua jornada de transformação começa agora. Acesse o app e complete seu perfil para começar.</p>
        <p>Em 21 dias você verá resultados incríveis!</p>
        <p>Equipe Secando com Smoothies 💚</p>
      `
    });
    */
  } catch (error) {
    console.error('Erro ao enviar email de boas-vindas:', error);
  }
}

// Rotas

// Rota de health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Rota principal do webhook
app.post('/webhook/payment', async (req, res) => {
  try {
    // Validar assinatura se WEBHOOK_SECRET estiver configurado
    if (process.env.WEBHOOK_SECRET) {
      const signature = req.headers['x-signature-256'] || req.headers['x-hub-signature-256'];
      const rawBody = req.body.toString('utf8');
      
      if (!validateWebhookSignature(rawBody, signature, process.env.WEBHOOK_SECRET)) {
        console.error('Assinatura do webhook inválida');
        return res.status(401).json({
          success: false,
          message: 'Assinatura inválida'
        });
      }
      
      console.log('Assinatura do webhook validada com sucesso');
    }
    
    // Parse do JSON após validação
    const payload = JSON.parse(req.body.toString('utf8'));
    console.log('Webhook recebido:', payload);
    
    const result = await handlePaymentWebhook(payload);
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.error('Erro no endpoint webhook:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Rota para testar o webhook (apenas para desenvolvimento)
app.post('/webhook/test', async (req, res) => {
  const testPayload = {
    event: 'pix.paid',
    createdAt: { _seconds: Math.floor(Date.now() / 1000), _nanoseconds: 0 },
    customer: {
      name: req.body.name || 'Usuário Teste',
      email: req.body.email || 'teste@exemplo.com',
      document: null,
      phone: null,
      ip: '::1'
    },
    payment: {
      id: `test_${Date.now()}`,
      method: 'pix.paid',
      status: 'paid',
      amount: req.body.amount || 97
    },
    product: {
      id: 'NfXimOHdgvd8GDqZ636a',
      type: 'main'
    },
    webhook: {
      id: 'test_webhook',
      businessId: 'test_business',
      events: ['pix.paid', 'card.paid']
    }
  };

  try {
    const result = await handlePaymentWebhook(testPayload);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Middleware de tratamento de erros
app.use((error, req, res, next) => {
  console.error('Erro não tratado:', error);
  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor webhook rodando na porta ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 Webhook URL: http://localhost:${PORT}/webhook/payment`);
  console.log(`🧪 Test URL: http://localhost:${PORT}/webhook/test`);
});

module.exports = app;