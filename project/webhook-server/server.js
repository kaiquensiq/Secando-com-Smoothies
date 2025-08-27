// Servidor Express.js para webhook de pagamentos
// Este é um exemplo de como implementar o webhook em um servidor backend

const express = require('express');
const cors = require('cors');
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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Função para processar webhook de pagamento
async function handlePaymentWebhook(payload) {
  try {
    const { event_type, data } = payload;
    
    console.log('Processando webhook:', { event_type, email: data.customer_email });
    
    // Verificar se é um evento de pagamento aprovado
    if (event_type === 'payment.approved' || event_type === 'checkout.completed') {
      const {
        customer_email,
        customer_name,
        product_id,
        amount,
        currency,
        payment_status,
        transaction_id,
        created_at
      } = data;

      // 1. Criar usuário no Supabase Auth (se não existir)
      let user;
      try {
        // Tentar criar o usuário
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
          email: customer_email,
          email_confirm: true, // Confirmar email automaticamente
          user_metadata: {
            name: customer_name || customer_email.split('@')[0],
            created_via: 'checkout_webhook',
            product_purchased: product_id
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
          transaction_id,
          amount,
          currency,
          status: payment_status,
          product_id,
          payment_method: 'checkout',
          created_at: created_at || new Date().toISOString()
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
          user_id: user.id,
          name: customer_name || customer_email.split('@')[0],
          email: customer_email,
          has_completed_onboarding: false,
          current_day: 1,
          start_date: new Date().toISOString(),
          total_points: 0,
          streak: 0,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
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
    console.log('Webhook recebido:', req.body);
    
    const result = await handlePaymentWebhook(req.body);
    
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
    event_type: 'payment.approved',
    data: {
      customer_email: req.body.email || 'teste@exemplo.com',
      customer_name: req.body.name || 'Usuário Teste',
      product_id: 'smoothie_program_21_days',
      amount: 97.00,
      currency: 'BRL',
      payment_status: 'approved',
      transaction_id: `test_${Date.now()}`,
      created_at: new Date().toISOString()
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