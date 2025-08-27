import React, { useState } from 'react';
import { CheckCircle2, Droplets, Camera, Clock, Apple } from 'lucide-react';

interface TodayChallengeProps {
  currentDay: number;
}

const TodayChallenge: React.FC<TodayChallengeProps> = ({ currentDay }) => {
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);

  const getDailyChallenges = (day: number) => {
    const baseChallenges = [
      {
        id: 'water',
        icon: Droplets,
        title: 'Hidratação Total',
        description: 'Beba 2L de água hoje',
        points: 15,
        color: 'text-blue-400'
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

  const toggleChallenge = (challengeId: string) => {
    setCompletedChallenges(prev => 
      prev.includes(challengeId) 
        ? prev.filter(id => id !== challengeId)
        : [...prev, challengeId]
    );
  };

  const completedCount = completedChallenges.length;
  const totalChallenges = challenges.length;

  return (
    <div className="bg-gray-800 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white">
          Desafios de Hoje
        </h3>
        <div className="text-sm text-gray-400">
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
                  : 'bg-gray-700/50 border-gray-600/50 hover:bg-gray-700 hover:scale-[1.02]'
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
                    <h4 className={`font-semibold ${isCompleted ? 'text-green-400' : 'text-white'}`}>
                      {challenge.title}
                    </h4>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">
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
          <div className="text-gray-300 text-sm">
            Você ganhou {challenges.reduce((sum, c) => sum + c.points, 0)} pontos hoje!
          </div>
        </div>
      )}
    </div>
  );
};

export default TodayChallenge;