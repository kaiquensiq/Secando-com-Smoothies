import React from 'react';
import { Scale, Target, TrendingDown, Zap } from 'lucide-react';
import { UserData } from '../../App';

interface QuickStatsProps {
  userData: UserData;
}

const QuickStats: React.FC<QuickStatsProps> = ({ userData }) => {
  const weightLoss = userData.initialWeight - userData.currentWeight;
  const remainingWeight = userData.currentWeight - userData.targetWeight;
  const progressPercentage = ((userData.initialWeight - userData.currentWeight) / (userData.initialWeight - userData.targetWeight)) * 100;

  const stats = [
    {
      icon: Scale,
      label: 'Peso Atual',
      value: `${userData.currentWeight}kg`,
      color: 'text-blue-400',
      bg: 'bg-blue-400/10'
    },
    {
      icon: TrendingDown,
      label: 'Peso Perdido',
      value: `${weightLoss.toFixed(1)}kg`,
      color: 'text-green-400',
      bg: 'bg-green-400/10'
    },
    {
      icon: Target,
      label: 'Faltam',
      value: `${remainingWeight.toFixed(1)}kg`,
      color: 'text-pink-400',
      bg: 'bg-pink-400/10'
    },
    {
      icon: Zap,
      label: 'Pontos',
      value: userData.totalPoints.toString(),
      color: 'text-yellow-400',
      bg: 'bg-yellow-400/10'
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-center text-white">
        Suas Conquistas
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`${stat.bg} rounded-xl p-4 text-center space-y-2 border border-gray-700/50`}>
              <Icon className={`w-6 h-6 mx-auto ${stat.color}`} />
              <div className="space-y-1">
                <div className={`text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-gray-400 text-xs">
                  {stat.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-400">
          <span>Progresso da Meta</span>
          <span>{Math.min(progressPercentage, 100).toFixed(0)}%</span>
        </div>
        <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-green-400 to-pink-400 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;