import React from 'react';
import { Scale, TrendingDown, Target, Calendar, Award, Zap } from 'lucide-react';
import { UserData } from '../../App';

interface StatsOverviewProps {
  userData: UserData;
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ userData }) => {
  const weightLoss = (userData.initialWeight || 0) - (userData.currentWeight || 0);
  const remainingWeight = (userData.currentWeight || 0) - (userData.targetWeight || 0);
  const progressPercentage = userData.initialWeight && userData.targetWeight ? 
    (((userData.initialWeight - userData.currentWeight) / (userData.initialWeight - userData.targetWeight)) * 100) : 0;
  const averageWeightLossPerDay = userData.currentDay ? weightLoss / userData.currentDay : 0;
  const estimatedDaysToGoal = remainingWeight > 0 && averageWeightLossPerDay > 0 ? Math.ceil(remainingWeight / averageWeightLossPerDay) : 0;

  const stats = [
    {
      icon: Scale,
      title: 'Peso Atual',
      value: `${userData.currentWeight || 0}kg`,
      change: `-${weightLoss.toFixed(1)}kg`,
      color: 'blue',
      positive: true
    },
    {
      icon: TrendingDown,
      title: 'Perdido Total',
      value: `${weightLoss.toFixed(1)}kg`,
      change: `${averageWeightLossPerDay.toFixed(1)}kg/dia`,
      color: 'green',
      positive: true
    },
    {
      icon: Target,
      title: 'Meta Restante',
      value: `${Math.max(remainingWeight, 0).toFixed(1)}kg`,
      change: remainingWeight <= 0 ? 'Meta atingida! 🎉' : `~${estimatedDaysToGoal} dias`,
      color: 'pink',
      positive: remainingWeight <= 0
    },
    {
      icon: Calendar,
      title: 'Dias Ativos',
      value: `${userData.currentDay || 0}/21`,
      change: `${21 - (userData.currentDay || 0)} restantes`,
      color: 'purple',
      positive: true
    },
    {
      icon: Award,
      title: 'Badges Ganhas',
      value: (userData.badges?.length || 0).toString(),
      change: 'conquistas',
      color: 'yellow',
      positive: true
    },
    {
      icon: Zap,
      title: 'Total de Pontos',
      value: (userData.totalPoints || 0).toString(),
      change: userData.currentDay ? `${Math.round((userData.totalPoints || 0) / userData.currentDay)} pts/dia` : '0 pts/dia',
      color: 'orange',
      positive: true
    }
  ];

  const colorClasses = {
    blue: 'bg-blue-100 border-blue-300 text-blue-600',
    green: 'bg-green-100 border-green-300 text-green-600',
    pink: 'bg-pink-100 border-pink-300 text-pink-600',
    purple: 'bg-purple-100 border-purple-300 text-purple-600',
    yellow: 'bg-yellow-100 border-yellow-300 text-yellow-600',
    orange: 'bg-orange-100 border-orange-300 text-orange-600'
  };

  return (
    <div className="space-y-6">
      {/* Progress Summary */}
      <div className="bg-gradient-to-r from-green-400/10 to-pink-400/10 border border-green-400/30 rounded-2xl p-6 text-center space-y-4">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-gray-900">
            {Math.round(progressPercentage)}% da Meta
          </h3>
          <p className="text-gray-800">
            Você está indo muito bem!
          </p>
        </div>
        
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-green-400 to-pink-400 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          ></div>
        </div>

        {remainingWeight <= 0 && (
          <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-xl p-4">
            <div className="text-yellow-400 font-bold text-lg">
              🎉 Parabéns! Meta atingida!
            </div>
            <div className="text-gray-800 text-sm mt-1">
              Continue seguindo o programa para manter os resultados
            </div>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClass = colorClasses[stat.color as keyof typeof colorClasses];
          
          return (
            <div key={index} className={`border rounded-xl p-4 space-y-3 ${colorClass}`}>
              <div className="flex items-center justify-between">
                <Icon className="w-6 h-6" />
                <span className="text-2xl font-bold">
                  {stat.value}
                </span>
              </div>
              
              <div className="space-y-1">
                <div className="text-gray-900 text-sm font-medium">
                  {stat.title}
                </div>
                <div className={`text-xs ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.change}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Weekly Breakdown */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-gray-900 text-center">
          Progresso por Semana
        </h3>
        
        <div className="space-y-3">
          {[1, 2, 3].map((week) => {
            const startDay = (week - 1) * 7 + 1;
            const endDay = week * 7;
            const isCurrentWeek = userData.currentDay >= startDay && userData.currentDay <= endDay;
            const isCompleted = userData.currentDay > endDay;
            const weekProgress = isCompleted ? 100 : isCurrentWeek ? ((userData.currentDay - startDay + 1) / 7) * 100 : 0;
            

            
            const weekTitles = {
              1: 'Desintoxicação',
              2: 'Aceleração',
              3: 'Definição'
            };
            
            return (
              <div key={week} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-800">
                    Semana {week}: {weekTitles[week as keyof typeof weekTitles]}
                  </span>
                  <span className="text-gray-800">
                    {Math.round(weekProgress)}%
                  </span>
                </div>
                
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ease-out
                      ${week === 1 ? 'bg-green-400' : 
                        week === 2 ? 'bg-orange-400' : 'bg-purple-400'}
                    `}
                    style={{ width: `${weekProgress}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;