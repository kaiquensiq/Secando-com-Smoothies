// Webhook handler para processar pagamentos e criar usuários
// Este arquivo seria usado em um backend (Node.js/Express)

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hjkxsjpujiyeefjkdgcc.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Chave de serviço (não a anon key)

const supabase = createClient(supabaseUrl, supabaseServiceKey!);

interface WebhookPayload {
  event_type: string;
  data: {
    customer_email: string;
    customer_name?: string;
    product_id: string;
    amount: number;
    currency: string;
    payment_status: string;
    transaction_id: string;
    created_at: string;
  };
}

// Função para processar webhook de pagamento
export async function handlePaymentWebhook(payload: WebhookPayload) {
  try {
    const { event_type, data } = payload;
    
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

        if (authError && authError.message !== 'User already registered') {
          throw authError;
        }

        user = authData?.user;
      } catch (error: any) {
        // Se o usuário já existe, buscar pelo email
        if (error.message.includes('already registered')) {
          const { data: existingUsers } = await supabase.auth.admin.listUsers();
          user = existingUsers.users.find(u => u.email === customer_email);
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
          created_at
        });

      if (paymentError) {
        console.error('Erro ao registrar pagamento:', paymentError);
        throw paymentError;
      }

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

      // 4. Enviar email de boas-vindas (opcional)
      await sendWelcomeEmail(customer_email, customer_name);

      console.log(`Usuário criado com sucesso: ${customer_email}`);
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

  } catch (error: any) {
    console.error('Erro no webhook de pagamento:', error);
    return {
      success: false,
      message: error.message || 'Erro interno do servidor'
    };
  }
}

// Função para enviar email de boas-vindas
async function sendWelcomeEmail(email: string, name?: string) {
  try {
    // Aqui você pode integrar com um serviço de email como:
    // - Resend
    // - SendGrid
    // - Mailgun
    // - Ou usar o próprio Supabase Edge Functions
    
    console.log(`Email de boas-vindas enviado para: ${email}`);
  } catch (error) {
    console.error('Erro ao enviar email de boas-vindas:', error);
  }
}

// Exemplo de uso em Express.js:
/*
app.post('/webhook/payment', async (req, res) => {
  try {
    const result = await handlePaymentWebhook(req.body);
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});
*/

export default handlePaymentWebhook;