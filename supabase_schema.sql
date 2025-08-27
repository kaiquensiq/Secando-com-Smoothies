-- =====================================================
-- ESTRUTURA DE BANCO DE DADOS SUPABASE
-- Projeto: Secando com Smoothies
-- =====================================================

-- Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- TABELA DE USUÁRIOS (AUTH)
-- =====================================================
-- Esta tabela é criada automaticamente pelo Supabase Auth
-- Mas vamos criar triggers para sincronizar com nossa tabela de perfis

-- =====================================================
-- TABELA DE PERFIS DE USUÁRIO
-- =====================================================
CREATE TABLE public.user_profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    profile_photo TEXT, -- Base64 da foto de perfil
    has_completed_onboarding BOOLEAN DEFAULT FALSE,
    current_day INTEGER DEFAULT 1,
    start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    initial_weight DECIMAL(5,2),
    current_weight DECIMAL(5,2),
    target_weight DECIMAL(5,2),
    height INTEGER, -- em centímetros
    age INTEGER,
    total_points INTEGER DEFAULT 0,
    streak INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABELA DE HÁBITOS ALIMENTARES
-- =====================================================
CREATE TABLE public.eating_habits (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    habit VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABELA DE OBJETIVOS
-- =====================================================
CREATE TABLE public.user_goals (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    goal VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABELA DE BADGES/CONQUISTAS
-- =====================================================
CREATE TABLE public.user_badges (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    badge_name VARCHAR(255) NOT NULL,
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABELA DE CHECK-INS DIÁRIOS
-- =====================================================
CREATE TABLE public.daily_checkins (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    day INTEGER NOT NULL,
    weight DECIMAL(5,2),
    points_earned INTEGER DEFAULT 0,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, day)
);

-- =====================================================
-- TABELA DE HIDRATAÇÃO
-- =====================================================
CREATE TABLE public.hydration_tracking (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    daily_goal INTEGER DEFAULT 8, -- copos por dia
    current_glasses INTEGER DEFAULT 0,
    tracking_date DATE DEFAULT CURRENT_DATE,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, tracking_date)
);

-- =====================================================
-- TABELA DE RECEITAS (MASTER)
-- =====================================================
CREATE TABLE public.recipes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    ingredients JSONB, -- Array de ingredientes
    instructions JSONB, -- Array de instruções
    nutrition_info JSONB, -- Informações nutricionais
    prep_time INTEGER, -- em minutos
    difficulty VARCHAR(50),
    category VARCHAR(100),
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABELA DE RECEITAS FAVORITAS
-- =====================================================
CREATE TABLE public.favorite_recipes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    recipe_id INTEGER REFERENCES public.recipes(id) ON DELETE CASCADE,
    favorited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, recipe_id)
);

-- =====================================================
-- TABELA DE RECEITAS COMPLETADAS
-- =====================================================
CREATE TABLE public.completed_recipes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    recipe_id INTEGER REFERENCES public.recipes(id) ON DELETE CASCADE,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, recipe_id)
);

-- =====================================================
-- TABELA DE PAGAMENTOS/CHECKOUT
-- =====================================================
CREATE TABLE public.payments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    email VARCHAR(255) NOT NULL,
    payment_id VARCHAR(255) UNIQUE, -- ID do gateway de pagamento
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'BRL',
    status VARCHAR(50) DEFAULT 'pending', -- pending, completed, failed, refunded
    payment_method VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- =====================================================
-- TRIGGERS E FUNÇÕES
-- =====================================================

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para user_profiles
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Função para criar perfil automaticamente quando usuário se registra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, name)
    VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)));
    
    -- Criar registro de hidratação inicial
    INSERT INTO public.hydration_tracking (user_id)
    VALUES (NEW.id);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para criar perfil automaticamente
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- POLÍTICAS DE SEGURANÇA (RLS)
-- =====================================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.eating_habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hydration_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorite_recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.completed_recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Políticas para user_profiles
CREATE POLICY "Users can view own profile" ON public.user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.user_profiles
    FOR UPDATE USING (auth.uid() = id);

-- Políticas para eating_habits
CREATE POLICY "Users can manage own eating habits" ON public.eating_habits
    FOR ALL USING (auth.uid() = user_id);

-- Políticas para user_goals
CREATE POLICY "Users can manage own goals" ON public.user_goals
    FOR ALL USING (auth.uid() = user_id);

-- Políticas para user_badges
CREATE POLICY "Users can view own badges" ON public.user_badges
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can insert badges" ON public.user_badges
    FOR INSERT WITH CHECK (true);

-- Políticas para daily_checkins
CREATE POLICY "Users can manage own checkins" ON public.daily_checkins
    FOR ALL USING (auth.uid() = user_id);

-- Políticas para hydration_tracking
CREATE POLICY "Users can manage own hydration" ON public.hydration_tracking
    FOR ALL USING (auth.uid() = user_id);

-- Políticas para recipes (público para leitura)
CREATE POLICY "Anyone can view recipes" ON public.recipes
    FOR SELECT USING (true);

-- Políticas para favorite_recipes
CREATE POLICY "Users can manage own favorites" ON public.favorite_recipes
    FOR ALL USING (auth.uid() = user_id);

-- Políticas para completed_recipes
CREATE POLICY "Users can manage own completed recipes" ON public.completed_recipes
    FOR ALL USING (auth.uid() = user_id);

-- Políticas para payments
CREATE POLICY "Users can view own payments" ON public.payments
    FOR SELECT USING (auth.uid() = user_id);

-- =====================================================
-- ÍNDICES PARA PERFORMANCE
-- =====================================================

CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_eating_habits_user_id ON public.eating_habits(user_id);
CREATE INDEX idx_user_goals_user_id ON public.user_goals(user_id);
CREATE INDEX idx_user_badges_user_id ON public.user_badges(user_id);
CREATE INDEX idx_daily_checkins_user_id ON public.daily_checkins(user_id);
CREATE INDEX idx_daily_checkins_day ON public.daily_checkins(day);
CREATE INDEX idx_hydration_tracking_user_date ON public.hydration_tracking(user_id, tracking_date);
CREATE INDEX idx_favorite_recipes_user_id ON public.favorite_recipes(user_id);
CREATE INDEX idx_completed_recipes_user_id ON public.completed_recipes(user_id);
CREATE INDEX idx_payments_email ON public.payments(email);
CREATE INDEX idx_payments_status ON public.payments(status);

-- =====================================================
-- DADOS INICIAIS - RECEITAS EXEMPLO
-- =====================================================

INSERT INTO public.recipes (name, description, ingredients, instructions, nutrition_info, prep_time, difficulty, category, image_url) VALUES
('Smoothie Verde Detox', 'Smoothie refrescante e nutritivo para começar o dia', 
 '["1 maçã verde", "1 punhado de espinafre", "1/2 pepino", "1 limão (suco)", "1 colher de gengibre", "200ml água de coco"]',
 '["Lave bem todos os ingredientes", "Corte a maçã e o pepino em pedaços", "Adicione todos os ingredientes no liquidificador", "Bata até ficar homogêneo", "Sirva imediatamente"]',
 '{"calorias": 120, "proteinas": 3, "carboidratos": 28, "gorduras": 1}',
 10, 'Fácil', 'Detox', null),

('Smoothie de Frutas Vermelhas', 'Rico em antioxidantes e delicioso',
 '["1 xícara de morangos", "1/2 xícara de mirtilos", "1 banana", "1 iogurte natural", "1 colher de mel", "150ml leite vegetal"]',
 '["Lave as frutas vermelhas", "Corte a banana em rodelas", "Adicione todos os ingredientes no liquidificador", "Bata até obter consistência cremosa", "Sirva gelado"]',
 '{"calorias": 180, "proteinas": 8, "carboidratos": 35, "gorduras": 2}',
 8, 'Fácil', 'Antioxidante', null),

('Smoothie Proteico de Chocolate', 'Perfeito para pós-treino',
 '["1 banana", "1 scoop whey protein chocolate", "1 colher de cacau em pó", "1 colher de pasta de amendoim", "250ml leite vegetal", "Gelo a gosto"]',
 '["Descasque a banana", "Adicione todos os ingredientes no liquidificador", "Bata por 1-2 minutos", "Ajuste a consistência com mais leite se necessário", "Sirva imediatamente"]',
 '{"calorias": 320, "proteinas": 25, "carboidratos": 30, "gorduras": 8}',
 5, 'Fácil', 'Proteico', null);

-- =====================================================
-- WEBHOOK FUNCTION PARA CHECKOUT
-- =====================================================

-- Função para processar webhook de pagamento
CREATE OR REPLACE FUNCTION public.handle_payment_webhook()
RETURNS TRIGGER AS $$
DECLARE
    user_uuid UUID;
BEGIN
    -- Se o pagamento foi completado e ainda não tem usuário associado
    IF NEW.status = 'completed' AND NEW.user_id IS NULL THEN
        -- Procurar usuário existente pelo email
        SELECT id INTO user_uuid 
        FROM public.user_profiles 
        WHERE email = NEW.email;
        
        -- Se não encontrou usuário, criar um novo
        IF user_uuid IS NULL THEN
            -- Criar usuário no auth (isso vai disparar o trigger de criação de perfil)
            INSERT INTO auth.users (email, email_confirmed_at, created_at, updated_at)
            VALUES (NEW.email, NOW(), NOW(), NOW())
            RETURNING id INTO user_uuid;
        END IF;
        
        -- Associar o pagamento ao usuário
        NEW.user_id = user_uuid;
        NEW.completed_at = NOW();
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para processar pagamentos
CREATE TRIGGER on_payment_update
    BEFORE UPDATE ON public.payments
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_payment_webhook();

-- =====================================================
-- VIEWS ÚTEIS
-- =====================================================

-- View para dados completos do usuário com security_invoker
CREATE VIEW public.user_complete_data WITH (security_invoker = on) AS
SELECT 
    up.id,
    up.name,
    up.email,
    up.profile_photo,
    up.has_completed_onboarding,
    up.current_day,
    up.start_date,
    up.initial_weight,
    up.current_weight,
    up.target_weight,
    up.height,
    up.age,
    up.total_points,
    up.streak,
    up.created_at,
    up.updated_at,
    COALESCE(array_agg(DISTINCT eh.habit) FILTER (WHERE eh.habit IS NOT NULL), '{}'::character varying[]) AS eating_habits,
    COALESCE(array_agg(DISTINCT ug.goal) FILTER (WHERE ug.goal IS NOT NULL), '{}'::character varying[]) AS goals,
    COALESCE(array_agg(DISTINCT ub.badge_name) FILTER (WHERE ub.badge_name IS NOT NULL), '{}'::character varying[]) AS badges,
    COALESCE(array_agg(DISTINCT fr.recipe_id) FILTER (WHERE fr.recipe_id IS NOT NULL), '{}'::integer[]) AS favorite_recipes,
    COALESCE(array_agg(DISTINCT cr.recipe_id) FILTER (WHERE cr.recipe_id IS NOT NULL), '{}'::integer[]) AS completed_recipes,
    ht.daily_goal AS hydration_daily_goal,
    ht.current_glasses AS hydration_current_glasses,
    ht.last_updated AS hydration_last_updated
FROM public.user_profiles up
LEFT JOIN public.eating_habits eh ON up.id = eh.user_id
LEFT JOIN public.user_goals ug ON up.id = ug.user_id
LEFT JOIN public.user_badges ub ON up.id = ub.user_id
LEFT JOIN public.favorite_recipes fr ON up.id = fr.user_id
LEFT JOIN public.completed_recipes cr ON up.id = cr.user_id
LEFT JOIN public.hydration_tracking ht ON up.id = ht.user_id AND ht.tracking_date = CURRENT_DATE
GROUP BY up.id, ht.daily_goal, ht.current_glasses, ht.last_updated;

-- =====================================================
-- COMENTÁRIOS E DOCUMENTAÇÃO
-- =====================================================

COMMENT ON TABLE public.user_profiles IS 'Perfis de usuário com dados pessoais e progresso';
COMMENT ON TABLE public.eating_habits IS 'Hábitos alimentares dos usuários';
COMMENT ON TABLE public.user_goals IS 'Objetivos definidos pelos usuários';
COMMENT ON TABLE public.user_badges IS 'Conquistas e badges dos usuários';
COMMENT ON TABLE public.daily_checkins IS 'Check-ins diários dos usuários';
COMMENT ON TABLE public.hydration_tracking IS 'Controle de hidratação diária';
COMMENT ON TABLE public.recipes IS 'Receitas disponíveis no aplicativo';
COMMENT ON TABLE public.favorite_recipes IS 'Receitas favoritas dos usuários';
COMMENT ON TABLE public.completed_recipes IS 'Receitas já preparadas pelos usuários';
COMMENT ON TABLE public.payments IS 'Registro de pagamentos e checkout';

-- =====================================================
-- FIM DO SCRIPT
-- =====================================================