import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { auth, userService, supabase } from '../lib/supabase';
import { UserData } from '../App';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userData: UserData | null;
  loading: boolean;
  signInWithEmail: (email: string) => Promise<{ data: any; error: any }>;
  signInWithPassword: (email: string, password: string) => Promise<{ data: any; error: any }>;
  signOut: () => Promise<{ error: any }>;
  updateUserData: (updates: Partial<UserData>) => Promise<void>;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  // Função para converter dados do Supabase para UserData
  const convertSupabaseToUserData = (supabaseData: any): UserData => {
    return {
      id: supabaseData.id,
      name: supabaseData.name,
      email: supabaseData.email,
      profilePhoto: supabaseData.profile_photo,
      hasCompletedOnboarding: supabaseData.has_completed_onboarding,
      currentDay: supabaseData.current_day,
      startDate: supabaseData.start_date,
      initialWeight: supabaseData.initial_weight,
      currentWeight: supabaseData.current_weight,
      targetWeight: supabaseData.target_weight,
      height: supabaseData.height,
      age: supabaseData.age,
      eatingHabits: supabaseData.eating_habits || [],
      goals: supabaseData.goals || [],
      totalPoints: supabaseData.total_points,
      badges: supabaseData.badges || [],
      checkins: [], // Será carregado separadamente se necessário
      streak: supabaseData.streak,
      hydration: {
        dailyGoal: supabaseData.hydration_daily_goal || 8,
        currentGlasses: supabaseData.hydration_current_glasses || 0,
        lastUpdated: supabaseData.hydration_last_updated || new Date().toISOString(),
      },
      favoriteRecipes: supabaseData.favorite_recipes || [],
      completedRecipes: supabaseData.completed_recipes || [],
    };
  };

  // Carregar dados do usuário
  const loadUserData = async (userId: string) => {
    try {
      const { data, error } = await userService.getUserData(userId);
      
      if (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        // Se não encontrar dados, criar dados padrão
        await createDefaultUserData(userId);
        return;
      }
      
      if (data) {
        const convertedData = convertSupabaseToUserData(data);
        setUserData(convertedData);
      } else {
        // Se não há dados, criar dados padrão
        await createDefaultUserData(userId);
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
      // Em caso de erro, criar dados padrão
      await createDefaultUserData(userId);
    }
  };

  // Criar dados padrão para usuário novo
  const createDefaultUserData = async (userId: string) => {
    try {
      if (!user?.email) return;
      
      // Criar perfil padrão no Supabase
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert({
          id: userId,
          name: user.email.split('@')[0], // Nome baseado no email
          email: user.email,
          has_completed_onboarding: false,
          current_day: 1,
          start_date: new Date().toISOString().split('T')[0],
          total_points: 0,
          streak: 0
        });
        
      if (profileError) {
        console.error('Erro ao criar perfil padrão:', profileError);
      }
      
      // Criar dados de hidratação padrão
      const { error: hydrationError } = await supabase
        .from('hydration_tracking')
        .insert({
          user_id: userId,
          daily_goal: 8,
          current_glasses: 0,
          tracking_date: new Date().toISOString().split('T')[0]
        });
        
      if (hydrationError) {
        console.error('Erro ao criar dados de hidratação:', hydrationError);
      }
      
      // Definir dados padrão localmente
      const defaultUserData: UserData = {
        id: userId,
        name: user.email.split('@')[0],
        email: user.email,
        profilePhoto: '',
        hasCompletedOnboarding: false,
        currentDay: 1,
        startDate: new Date().toISOString().split('T')[0],
        initialWeight: 0,
        currentWeight: 0,
        targetWeight: 0,
        height: 0,
        age: 0,
        totalPoints: 0,
        streak: 0,
        eatingHabits: [],
        goals: [],
        badges: [],
        checkins: [],
        favoriteRecipes: [],
        completedRecipes: [],
        hydration: {
          dailyGoal: 8,
          currentGlasses: 0,
          lastUpdated: new Date().toISOString()
        }
      };
      
      setUserData(defaultUserData);
    } catch (error) {
      console.error('Erro ao criar dados padrão:', error);
    }
  };

  // Atualizar dados do usuário
  const updateUserData = async (updates: Partial<UserData>) => {
    if (!user) return;

    try {
      // Atualizar estado local imediatamente para navegação instantânea
      setUserData(prev => prev ? { ...prev, ...updates } : {
        id: user.id,
        name: updates.name || '',
        email: user.email || '',
        profilePhoto: '',
        hasCompletedOnboarding: updates.hasCompletedOnboarding || false,
        currentDay: updates.currentDay || 1,
        startDate: updates.startDate || new Date().toISOString().split('T')[0],
        initialWeight: updates.initialWeight || 0,
        currentWeight: updates.currentWeight || 0,
        targetWeight: updates.targetWeight || 0,
        height: updates.height || 0,
        age: updates.age || 0,
        totalPoints: updates.totalPoints || 0,
        streak: updates.streak || 0,
        eatingHabits: updates.eatingHabits || [],
        goals: updates.goals || [],
        badges: [],
        checkins: [],
        favoriteRecipes: [],
        completedRecipes: [],
        hydration: {
          dailyGoal: 8,
          currentGlasses: 0,
          lastUpdated: new Date().toISOString()
        }
      });

      // Salvar no Supabase em background
      setTimeout(async () => {
        try {
          const supabaseUpdates: any = {};
          
          if (updates.name !== undefined) supabaseUpdates.name = updates.name;
          if (updates.hasCompletedOnboarding !== undefined) supabaseUpdates.has_completed_onboarding = updates.hasCompletedOnboarding;
          if (updates.currentDay !== undefined) supabaseUpdates.current_day = updates.currentDay;
          if (updates.initialWeight !== undefined) supabaseUpdates.initial_weight = updates.initialWeight;
          if (updates.currentWeight !== undefined) supabaseUpdates.current_weight = updates.currentWeight;
          if (updates.targetWeight !== undefined) supabaseUpdates.target_weight = updates.targetWeight;
          if (updates.height !== undefined) supabaseUpdates.height = updates.height;
          if (updates.age !== undefined) supabaseUpdates.age = updates.age;
          if (updates.startDate !== undefined) supabaseUpdates.start_date = updates.startDate;
          if (updates.totalPoints !== undefined) supabaseUpdates.total_points = updates.totalPoints;
          if (updates.streak !== undefined) supabaseUpdates.streak = updates.streak;
          
          const { error } = await supabase
            .from('user_profiles')
            .update(supabaseUpdates)
            .eq('id', user.id);
            
          if (error) {
            console.error('Erro ao salvar perfil:', error);
          }
          
          // Salvar eating habits e goals
          // Atualizar hidratação se fornecida
          if (updates.hydration) {
            await userService.updateHydration(user.id, updates.hydration.currentGlasses);
          }
          
          if (updates.eatingHabits && updates.eatingHabits.length > 0) {
            for (const habit of updates.eatingHabits) {
              await userService.addEatingHabit(user.id, habit);
            }
          }
          
          if (updates.goals && updates.goals.length > 0) {
            for (const goal of updates.goals) {
              await userService.addGoal(user.id, goal);
            }
          }
          
        } catch (bgError) {
          console.error('Erro no salvamento:', bgError);
        }
      }, 100);

    } catch (error) {
      console.error('Erro ao atualizar dados:', error);
    }
  };

  // Recarregar dados do usuário
  const refreshUserData = async () => {
    if (user) {
      await loadUserData(user.id);
    }
  };

  // Login com email
  const signInWithEmail = async (email: string) => {
    return await auth.signInWithEmail(email);
  };

  // Login direto com email e senha
  const signInWithPassword = async (email: string, password: string) => {
    return await auth.signInWithPassword(email, password);
  };

  // Logout
  const signOut = async () => {
    try {
      const result = await auth.signOut();
      // Sempre limpar o estado local, independente do resultado
      setUser(null);
      setSession(null);
      setUserData(null);
      return result;
    } catch (error) {
      // Em caso de erro, ainda limpar o estado local
      console.warn('Erro no logout, mas limpando estado local:', error);
      setUser(null);
      setSession(null);
      setUserData(null);
      return { error: null };
    }
  };

  // Efeito para escutar mudanças de autenticação
  useEffect(() => {
    let isMounted = true;
    
    // Timeout de segurança para garantir que o loading não trave
    const timeoutId = setTimeout(() => {
      if (isMounted) {
        setLoading(false);
      }
    }, 2000);
    
    // Verificar sessão atual
    auth.getCurrentUser().then(({ user }) => {
      if (!isMounted) return;
      
      setUser(user);
      if (user) {
        loadUserData(user.id).finally(() => {
          if (isMounted) {
            setLoading(false);
            clearTimeout(timeoutId);
          }
        });
      } else {
        setLoading(false);
        clearTimeout(timeoutId);
      }
    }).catch((error) => {
      console.error('Erro ao verificar usuário atual:', error);
      if (isMounted) {
        setLoading(false);
        clearTimeout(timeoutId);
      }
    });

    // Escutar mudanças de autenticação
    const { data: { subscription } } = auth.onAuthStateChange(async (_event, session) => {
      if (!isMounted) return;
      
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await loadUserData(session.user.id);
      } else {
        setUserData(null);
      }
      
      setLoading(false);
    });

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      subscription.unsubscribe();
    };
  }, []);

  const value: AuthContextType = {
    user,
    session,
    userData,
    loading,
    signInWithEmail,
    signInWithPassword,
    signOut,
    updateUserData,
    refreshUserData,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};