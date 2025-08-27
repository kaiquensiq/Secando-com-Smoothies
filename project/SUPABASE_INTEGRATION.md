# Integração Supabase - Secando com Smoothies

## 📋 Resumo da Implementação

Este documento descreve a integração completa do Supabase no projeto "Secando com Smoothies", incluindo autenticação, banco de dados e webhook para criação automática de usuários via checkout.

## 🗄️ Estrutura do Banco de Dados

### Tabelas Criadas

1. **user_profiles** - Perfis dos usuários
2. **eating_habits** - Hábitos alimentares
3. **user_goals** - Objetivos dos usuários
4. **user_badges** - Badges conquistadas
5. **daily_checkins** - Check-ins diários
6. **hydration_tracking** - Controle de hidratação
7. **recipes** - Receitas de smoothies
8. **favorite_recipes** - Receitas favoritas
9. **completed_recipes** - Receitas completadas
10. **payments** - Registro de pagamentos

### Arquivo SQL

O arquivo `supabase_schema.sql` contém:
- Estrutura completa das tabelas
- Triggers automáticos (criação de perfil, webhook de pagamento)
- Políticas de segurança (RLS)
- Índices para performance
- Dados iniciais de receitas

## 🔐 Autenticação

### Configuração

**Arquivo:** `src/lib/supabase.ts`
- Cliente Supabase configurado
- Interfaces TypeScript para todas as tabelas
- Funções de autenticação e serviços

**Arquivo:** `src/contexts/AuthContext.tsx`
- Context React para gerenciar estado de autenticação
- Hook `useAuth()` para usar em componentes
- Conversão automática de dados Supabase para formato local

### Login Simplificado

**Arquivo:** `src/components/Auth/Login.tsx`
- Login apenas com email (magic link)
- Interface moderna e responsiva
- Integração com AuthContext
- Mensagens de erro e sucesso

### Como Funciona

1. Usuário insere email
2. Supabase envia magic link por email
3. Usuário clica no link
4. Automaticamente logado no app
5. Perfil criado automaticamente via trigger

## 🔗 Webhook para Checkout

### Servidor Webhook

**Diretório:** `webhook-server/`
- Servidor Express.js independente
- Processa webhooks de plataformas de pagamento
- Cria usuários automaticamente no Supabase

### Fluxo do Webhook

1. **Pagamento Aprovado** → Plataforma envia webhook
2. **Recebimento** → Servidor webhook recebe dados
3. **Criação de Usuário** → Cria no Supabase Auth
4. **Registro de Pagamento** → Salva na tabela `payments`
5. **Perfil** → Cria perfil inicial na tabela `user_profiles`
6. **Email** → Envia boas-vindas (opcional)

### Configuração do Webhook

```bash
cd webhook-server
npm install
cp .env.example .env
# Editar .env com suas chaves
npm run dev
```

**URL do Webhook:** `http://seu-dominio.com/webhook/payment`

## 🚀 Configuração Inicial

### 1. Configurar Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Execute o SQL do arquivo `supabase_schema.sql`
4. Configure as variáveis de ambiente

### 2. Variáveis de Ambiente

**Frontend (.env):**
```env
VITE_SUPABASE_URL=https://hjkxsjpujiyeefjkdgcc.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_anon_aqui
```

**Webhook Server (.env):**
```env
SUPABASE_URL=https://hjkxsjpujiyeefjkdgcc.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua_chave_de_servico_aqui
PORT=3001
```

### 3. Executar o Projeto

**Frontend:**
```bash
npm run dev
```

**Webhook Server:**
```bash
cd webhook-server
npm run dev
```

## 🔧 Integração com Plataformas de Pagamento

### Stripe
```javascript
// Webhook URL: https://seu-dominio.com/webhook/payment
// Eventos: checkout.session.completed
```

### Mercado Pago
```javascript
// IPN URL: https://seu-dominio.com/webhook/payment
// Tópicos: payment
```

### Hotmart
```javascript
// Postback URL: https://seu-dominio.com/webhook/payment
// Eventos: PURCHASE_APPROVED
```

## 📱 Uso no Frontend

### Hook de Autenticação

```tsx
import { useAuth } from './contexts/AuthContext';

function MeuComponente() {
  const { user, userData, signInWithEmail, signOut, loading } = useAuth();
  
  if (loading) return <div>Carregando...</div>;
  
  if (!user) {
    return <Login />;
  }
  
  return <Dashboard userData={userData} />;
}
```

### Serviços Disponíveis

```tsx
import { 
  getUserProfile,
  updateUserProfile,
  addUserGoal,
  addDailyCheckin,
  updateHydration,
  getRecipes,
  addFavoriteRecipe
} from './lib/supabase';
```

## 🛡️ Segurança

### Row Level Security (RLS)

Todas as tabelas têm políticas de segurança:
- Usuários só acessam seus próprios dados
- Receitas são públicas para leitura
- Pagamentos só visíveis para o próprio usuário

### Chaves de API

- **Anon Key:** Usada no frontend (segura para exposição)
- **Service Role Key:** Usada no webhook (NUNCA expor no frontend)

## 📊 Monitoramento

### Logs do Supabase
- Dashboard do Supabase → Logs
- Monitore autenticações, queries e erros

### Logs do Webhook
- Console do servidor webhook
- Registra todos os webhooks recebidos
- Erros e sucessos detalhados

## 🧪 Testes

### Testar Autenticação
1. Acesse o app
2. Insira um email válido
3. Verifique a caixa de entrada
4. Clique no magic link

### Testar Webhook
```bash
curl -X POST http://localhost:3001/webhook/test \
  -H "Content-Type: application/json" \
  -d '{"email": "teste@exemplo.com", "name": "Usuario Teste"}'
```

## 🚀 Deploy

### Frontend
- Vercel, Netlify ou similar
- Configure as variáveis de ambiente

### Webhook Server
- Railway, Heroku ou VPS
- Configure as variáveis de ambiente
- Use HTTPS em produção

## ❓ Troubleshooting

### Problemas Comuns

**Erro: "Invalid API key"**
- Verifique se as chaves estão corretas
- Confirme se está usando a chave certa (anon vs service)

**Magic link não funciona**
- Verifique configurações de email no Supabase
- Confirme se o domínio está autorizado

**Webhook não recebe dados**
- Verifique se a URL está correta
- Confirme se o servidor está rodando
- Use ngrok para testes locais

### Logs Úteis

```bash
# Frontend
console.log('Auth state:', user, userData);

# Webhook
console.log('Webhook received:', req.body);
```

## 📞 Suporte

Para dúvidas:
1. Verifique este documento
2. Consulte a [documentação do Supabase](https://supabase.com/docs)
3. Verifique os logs de erro
4. Teste com dados de exemplo

---

**Status da Integração:** ✅ Completa
**Última Atualização:** Janeiro 2024