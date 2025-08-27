import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { auth, userService } from '../lib/supabase';
import { UserData } from '../App';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userData: UserData | null;
  loading: boolean;
  signInWithEmail: (email: string) => Promise<{ data: any; error: any }>;
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
        return;
      }
      if (data) {
        const convertedData = convertSupabaseToUserData(data);
        setUserData(convertedData);
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
    }
  };

  // Atualizar dados do usuário
  const updateUserData = async (updates: Partial<UserData>) => {
    if (!user || !userData) return;

    try {
      // Converter updates para formato do Supabase
      const supabaseUpdates: any = {};
      
      if (updates.name !== undefined) supabaseUpdates.name = updates.name;
      if (updates.email !== undefined) supabaseUpdates.email = updates.email;
      if (updates.profilePhoto !== undefined) supabaseUpdates.profile_photo = updates.profilePhoto;
      if (updates.hasCompletedOnboarding !== undefined) supabaseUpdates.has_completed_onboarding = updates.hasCompletedOnboarding;
      if (updates.currentDay !== undefined) supabaseUpdates.current_day = updates.currentDay;
      if (updates.initialWeight !== undefined) supabaseUpdates.initial_weight = updates.initialWeight;
      if (updates.currentWeight !== undefined) supabaseUpdates.current_weight = updates.currentWeight;
      if (updates.targetWeight !== undefined) supabaseUpdates.target_weight = updates.targetWeight;
      if (updates.height !== undefined) supabaseUpdates.height = updates.height;
      if (updates.age !== undefined) supabaseUpdates.age = updates.age;
      if (updates.totalPoints !== undefined) supabaseUpdates.total_points = updates.totalPoints;
      if (updates.streak !== undefined) supabaseUpdates.streak = updates.streak;

      // Atualizar no Supabase
      const { error } = await userService.updateProfile(user.id, supabaseUpdates);
      if (error) {
        console.error('Erro ao atualizar perfil:', error);
        return;
      }

      // Atualizar hidratação se necessário
      if (updates.hydration?.currentGlasses !== undefined) {
        await userService.updateHydration(user.id, updates.hydration.currentGlasses);
      }

      // Atualizar estado local
      setUserData(prev => prev ? { ...prev, ...updates } : null);
    } catch (error) {
      console.error('Erro ao atualizar dados do usuário:', error);
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

  // Logout
  const signOut = async () => {
    const result = await auth.signOut();
    setUser(null);
    setSession(null);
    setUserData(null);
    return result;
  };

  // Efeito para escutar mudanças de autenticação
  useEffect(() => {
    // Verificar sessão atual
    auth.getCurrentUser().then(({ user }) => {
      setUser(user);
      if (user) {
        loadUserData(user.id);
      }
      setLoading(false);
    });

    // Escutar mudanças de autenticação
    const { data: { subscription } } = auth.onAuthStateChange(async (event, session) => {
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
      subscription.unsubscribe();
    };
  }, []);

  const value: AuthContextType = {
    user,
    session,
    userData,
    loading,
    signInWithEmail,
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