import { createClient } from '@supabase/supabase-js';

// Configurações do Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Variáveis de ambiente do Supabase não encontradas. Verifique se VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY estão definidas no arquivo .env');
}

// Criar cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos para o banco de dados
export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          name: string;
          email: string;
          profile_photo: string | null;
          has_completed_onboarding: boolean;
          current_day: number;
          start_date: string;
          initial_weight: number | null;
          current_weight: number | null;
          target_weight: number | null;
          height: number | null;
          age: number | null;
          total_points: number;
          streak: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          email: string;
          profile_photo?: string | null;
          has_completed_onboarding?: boolean;
          current_day?: number;
          start_date?: string;
          initial_weight?: number | null;
          current_weight?: number | null;
          target_weight?: number | null;
          height?: number | null;
          age?: number | null;
          total_points?: number;
          streak?: number;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          profile_photo?: string | null;
          has_completed_onboarding?: boolean;
          current_day?: number;
          start_date?: string;
          initial_weight?: number | null;
          current_weight?: number | null;
          target_weight?: number | null;
          height?: number | null;
          age?: number | null;
          total_points?: number;
          streak?: number;
        };
      };
      eating_habits: {
        Row: {
          id: string;
          user_id: string;
          habit: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          habit: string;
        };
        Update: {
          habit?: string;
        };
      };
      user_goals: {
        Row: {
          id: string;
          user_id: string;
          goal: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          goal: string;
        };
        Update: {
          goal?: string;
        };
      };
      user_badges: {
        Row: {
          id: string;
          user_id: string;
          badge_name: string;
          earned_at: string;
        };
        Insert: {
          user_id: string;
          badge_name: string;
        };
        Update: {
          badge_name?: string;
        };
      };
      daily_checkins: {
        Row: {
          id: string;
          user_id: string;
          day: number;
          weight: number | null;
          points_earned: number;
          completed_at: string;
        };
        Insert: {
          user_id: string;
          day: number;
          weight?: number | null;
          points_earned?: number;
        };
        Update: {
          weight?: number | null;
          points_earned?: number;
        };
      };
      hydration_tracking: {
        Row: {
          id: string;
          user_id: string;
          daily_goal: number;
          current_glasses: number;
          tracking_date: string;
          last_updated: string;
        };
        Insert: {
          user_id: string;
          daily_goal?: number;
          current_glasses?: number;
          tracking_date?: string;
        };
        Update: {
          daily_goal?: number;
          current_glasses?: number;
          tracking_date?: string;
        };
      };
      recipes: {
        Row: {
          id: number;
          name: string;
          description: string | null;
          ingredients: any;
          instructions: any;
          nutrition_info: any;
          prep_time: number | null;
          difficulty: string | null;
          category: string | null;
          image_url: string | null;
          created_at: string;
        };
        Insert: {
          name: string;
          description?: string | null;
          ingredients?: any;
          instructions?: any;
          nutrition_info?: any;
          prep_time?: number | null;
          difficulty?: string | null;
          category?: string | null;
          image_url?: string | null;
        };
        Update: {
          name?: string;
          description?: string | null;
          ingredients?: any;
          instructions?: any;
          nutrition_info?: any;
          prep_time?: number | null;
          difficulty?: string | null;
          category?: string | null;
          image_url?: string | null;
        };
      };
      favorite_recipes: {
        Row: {
          id: string;
          user_id: string;
          recipe_id: number;
          favorited_at: string;
        };
        Insert: {
          user_id: string;
          recipe_id: number;
        };
        Update: {
          recipe_id?: number;
        };
      };
      completed_recipes: {
        Row: {
          id: string;
          user_id: string;
          recipe_id: number;
          completed_at: string;
        };
        Insert: {
          user_id: string;
          recipe_id: number;
        };
        Update: {
          recipe_id?: number;
        };
      };
      payments: {
        Row: {
          id: string;
          user_id: string | null;
          email: string;
          payment_id: string | null;
          amount: number;
          currency: string;
          status: string;
          payment_method: string | null;
          created_at: string;
          completed_at: string | null;
        };
        Insert: {
          email: string;
          payment_id?: string | null;
          amount: number;
          currency?: string;
          status?: string;
          payment_method?: string | null;
        };
        Update: {
          user_id?: string | null;
          payment_id?: string | null;
          amount?: number;
          currency?: string;
          status?: string;
          payment_method?: string | null;
          completed_at?: string | null;
        };
      };
    };
    Views: {
      user_complete_data: {
        Row: {
          id: string;
          name: string;
          email: string;
          profile_photo: string | null;
          has_completed_onboarding: boolean;
          current_day: number;
          start_date: string;
          initial_weight: number | null;
          current_weight: number | null;
          target_weight: number | null;
          height: number | null;
          age: number | null;
          total_points: number;
          streak: number;
          created_at: string;
          updated_at: string;
          eating_habits: string[];
          goals: string[];
          badges: string[];
          favorite_recipes: number[];
          completed_recipes: number[];
          hydration_daily_goal: number;
          hydration_current_glasses: number;
          hydration_last_updated: string;
        };
      };
    };
  };
}

// Funções de autenticação
export const auth = {
  // Login com email (magic link)
  signInWithEmail: async (email: string) => {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });
    return { data, error };
  },

  // Login direto com email e senha
  signInWithPassword: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  // Logout
  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      return { error };
    } catch (networkError) {
      // Se houver erro de rede, ainda retornamos sucesso
      // pois o importante é limpar o estado local
      console.warn('Erro de rede no logout, mas continuando:', networkError);
      return { error: null };
    }
  },

  // Obter usuário atual
  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },

  // Escutar mudanças de autenticação
  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback);
  },
};

// Funções para dados do usuário
export const userService = {
  // Obter dados completos do usuário
  getUserData: async (userId: string) => {
    const { data, error } = await supabase
      .from('user_complete_data')
      .select('*')
      .eq('id', userId)
      .single();
    return { data, error };
  },

  // Atualizar perfil do usuário
  updateProfile: async (userId: string, updates: Database['public']['Tables']['user_profiles']['Update']) => {
    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', userId)
      .select();
    return { data, error };
  },

  // Adicionar hábito alimentar
  addEatingHabit: async (userId: string, habit: string) => {
    const { data, error } = await supabase
      .from('eating_habits')
      .insert({ user_id: userId, habit })
      .select()
      .single();
    return { data, error };
  },

  // Adicionar objetivo
  addGoal: async (userId: string, goal: string) => {
    const { data, error } = await supabase
      .from('user_goals')
      .insert({ user_id: userId, goal })
      .select()
      .single();
    return { data, error };
  },

  // Registrar check-in
  addCheckin: async (userId: string, day: number, weight?: number, pointsEarned?: number) => {
    const { data, error } = await supabase
      .from('daily_checkins')
      .insert({
        user_id: userId,
        day,
        weight,
        points_earned: pointsEarned || 0,
      })
      .select()
      .single();
    return { data, error };
  },

  // Atualizar hidratação
  updateHydration: async (userId: string, currentGlasses: number) => {
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('hydration_tracking')
      .upsert({
        user_id: userId,
        current_glasses: currentGlasses,
        tracking_date: today,
        last_updated: new Date().toISOString(),
      })
      .select()
      .single();
    return { data, error };
  },

  // Adicionar receita aos favoritos
  addFavoriteRecipe: async (userId: string, recipeId: number) => {
    const { data, error } = await supabase
      .from('favorite_recipes')
      .insert({ user_id: userId, recipe_id: recipeId })
      .select()
      .single();
    return { data, error };
  },

  // Remover receita dos favoritos
  removeFavoriteRecipe: async (userId: string, recipeId: number) => {
    const { error } = await supabase
      .from('favorite_recipes')
      .delete()
      .eq('user_id', userId)
      .eq('recipe_id', recipeId);
    return { error };
  },

  // Marcar receita como completada
  markRecipeCompleted: async (userId: string, recipeId: number) => {
    const { data, error } = await supabase
      .from('completed_recipes')
      .insert({ user_id: userId, recipe_id: recipeId })
      .select()
      .single();
    return { data, error };
  },
};

// Funções para receitas
export const recipeService = {
  // Obter todas as receitas
  getAllRecipes: async () => {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .order('created_at', { ascending: false });
    return { data, error };
  },

  // Obter receita por ID
  getRecipeById: async (id: number) => {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .eq('id', id)
      .single();
    return { data, error };
  },
};

// Funções para pagamentos
export const paymentService = {
  // Criar registro de pagamento
  createPayment: async (email: string, amount: number, paymentId?: string) => {
    const { data, error } = await supabase
      .from('payments')
      .insert({
        email,
        amount,
        payment_id: paymentId,
        status: 'pending',
      })
      .select()
      .single();
    return { data, error };
  },

  // Atualizar status do pagamento
  updatePaymentStatus: async (paymentId: string, status: string) => {
    const { data, error } = await supabase
      .from('payments')
      .update({ status })
      .eq('payment_id', paymentId)
      .select()
      .single();
    return { data, error };
  },
};