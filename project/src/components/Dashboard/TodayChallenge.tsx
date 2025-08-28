import React, { useState, useEffect } from 'react';
import { CheckCircle2, Droplets, Camera, Clock, Apple } from 'lucide-react';
import { userService } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

interface TodayChallengeProps {
  currentDay: number;
}

const TodayChallenge: React.FC<TodayChallengeProps> = ({ currentDay }) => {
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Carregar desafios salvos do banco de dados
  useEffect(() => {
    const loadCompletedChallenges = async () => {
      if (!user?.id) return;
      
      try {
        const savedChallenges = await userService.getDailyChallenges(user.id, currentDay);
        setCompletedChallenges(savedChallenges);
      } catch (error) {
        console.error('Erro ao carregar desafios:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCompletedChallenges();
  }, [user?.id, currentDay]);

  const getDailyChallenges = (day: number) => {
    const baseChallenges = [
      {
        id: 'water',
        icon: Droplets,
        title: 'Hidratação Total',
        description: 'Beba 2L de água hoje',
        points: 15,
        color: 'text-blue-600'
      },
      {
        id: 'photo',
        icon: Camera,
        title: 'Registro Motivacional',
        description: 'Tire foto do seu smoothie',
        points: 5,
        color: 'text-green-400'
      }
    ];

    if (day <= 7) {
      baseChallenges.push({
        id: 'detox',
        icon: Apple,
        title: 'Foco Detox',
        description: 'Complete o smoothie detox de hoje',
        points: 20,
        color: 'text-green-400'
      });
    } else if (day <= 14) {
      baseChallenges.push({
        id: 'metabolism',
        icon: Clock,
        title: 'Acelera Metabolismo',
        description: 'Tome o smoothie termogênico',
        points: 25,
        color: 'text-orange-400'
      });
    } else {
      baseChallenges.push({
        id: 'maintenance',
        icon: Apple,
        title: 'Definição Final',
        description: 'Smoothie de manutenção perfeito',
        points: 30,
        color: 'text-purple-400'
      });
    }

    return baseChallenges;
  };

  const challenges = getDailyChallenges(currentDay);

  const toggleChallenge = async (challengeId: string) => {
    if (!user?.id) return;

    const isCompleted = completedChallenges.includes(challengeId);
    const challenge = challenges.find(c => c.id === challengeId);
    
    try {
      if (isCompleted) {
        // Remover desafio
        await userService.removeDailyChallenge(user.id, currentDay, challengeId);
        setCompletedChallenges(prev => prev.filter(id => id !== challengeId));
      } else {
        // Adicionar desafio
        await userService.saveDailyChallenge(user.id, currentDay, challengeId, challenge?.points || 0);
        setCompletedChallenges(prev => [...prev, challengeId]);
      }
    } catch (error) {
      console.error('Erro ao salvar desafio:', error);
    }
  };

  const completedCount = completedChallenges.length;
  const totalChallenges = challenges.length;

  if (loading) {
    return (
      <div className="bg-gray-50 rounded-2xl p-6 space-y-4 border border-gray-200">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-2xl p-6 space-y-4 border border-gray-200">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">
          Desafios de Hoje
        </h3>
        <div className="text-sm text-gray-800">
          {completedCount}/{totalChallenges}
        </div>
      </div>

      <div className="space-y-3">
        {challenges.map((challenge) => {
          const Icon = challenge.icon;
          const isCompleted = completedChallenges.includes(challenge.id);
          
          return (
            <div
              key={challenge.id}
              onClick={() => toggleChallenge(challenge.id)}
              className={`
                p-4 rounded-xl border transition-all duration-200 cursor-pointer
                ${isCompleted 
                  ? 'bg-green-400/10 border-green-400/30 scale-[0.98]' 
                  : 'bg-white border-gray-200 hover:bg-gray-50 hover:scale-[1.02]'
                }
              `}
            >
              <div className="flex items-center space-x-4">
                <div className={`relative ${isCompleted ? 'scale-110' : ''} transition-transform duration-200`}>
                  {isCompleted ? (
                    <CheckCircle2 className="w-8 h-8 text-green-400" />
                  ) : (
                    <div className="w-8 h-8 rounded-full border-2 border-gray-500"></div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <Icon className={`w-5 h-5 ${challenge.color}`} />
                    <h4 className={`font-semibold ${isCompleted ? 'text-green-600' : 'text-gray-900'}`}>
                      {challenge.title}
                    </h4>
                  </div>
                  <p className="text-gray-800 text-sm mt-1">
                    {challenge.description}
                  </p>
                </div>
                
                <div className={`text-sm font-bold ${challenge.color}`}>
                  +{challenge.points}pts
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {completedCount === totalChallenges && (
        <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-xl p-4 text-center animate-bounce">
          <div className="text-yellow-400 font-bold mb-1">
            🎉 Todos os desafios concluídos!
          </div>
          <div className="text-gray-800 text-sm">
            Você ganhou {challenges.reduce((sum, c) => sum + c.points, 0)} pontos hoje!
          </div>
        </div>
      )}
    </div>
  );
};

export default TodayChallenge;