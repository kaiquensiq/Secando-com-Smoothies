import React from 'react';
import { Trophy, Star, Droplets, Camera, Clock, Target, Zap, Award } from 'lucide-react';
import { UserData } from '../../App';

interface AchievementsListProps {
  userData: UserData;
}

const AchievementsList: React.FC<AchievementsListProps> = ({ userData }) => {
  const allAchievements = [
    {
      id: 'primeira-semana',
      icon: Trophy,
      title: 'Primeira Semana Completa',
      description: '7 dias consecutivos de dedicação',
      points: 50,
      condition: 'Complete 7 dias do programa',
      color: 'yellow'
    },
    {
      id: 'hidratacao-master',
      icon: Droplets,
      title: 'Hidratação Master',
      description: '7 dias bebendo 2L+ de água',
      points: 30,
      condition: 'Cumpra a meta de água por 7 dias',
      color: 'blue'
    },
    {
      id: 'smoothie-lover',
      icon: Star,
      title: 'Smoothie Lover',
      description: 'Experimentou 10 receitas diferentes',
      points: 40,
      condition: 'Faça 10 receitas diferentes',
      color: 'green'
    },
    {
      id: 'foco-total',
      icon: Target,
      title: 'Foco Total',
      description: '21 dias sem falhas no programa',
      points: 100,
      condition: 'Complete todo o programa',
      color: 'purple'
    },
    {
      id: 'queimador-gordura',
      icon: Zap,
      title: 'Queimador de Gordura',
      description: 'Perdeu 3kg ou mais',
      points: 75,
      condition: 'Perca pelo menos 3kg',
      color: 'orange'
    },
    {
      id: 'influencer-healthy',
      icon: Camera,
      title: 'Influencer Healthy',
      description: '10 fotos de smoothies compartilhadas',
      points: 25,
      condition: 'Compartilhe 10 fotos',
      color: 'pink'
    },
    {
      id: 'jejum-master',
      icon: Clock,
      title: 'Jejum Master',
      description: '7 dias de jejum intermitente',
      points: 35,
      condition: 'Complete jejum por 7 dias',
      color: 'indigo'
    },
    {
      id: 'meta-atingida',
      icon: Award,
      title: 'Meta Atingida',
      description: 'Chegou ao peso desejado',
      points: 150,
      condition: 'Atinja seu peso meta',
      color: 'gold'
    }
  ];

  const colorClasses = {
    yellow: 'bg-yellow-400/10 border-yellow-400/30 text-yellow-400',
    blue: 'bg-blue-400/10 border-blue-400/30 text-blue-400',
    green: 'bg-green-400/10 border-green-400/30 text-green-400',
    purple: 'bg-purple-400/10 border-purple-400/30 text-purple-400',
    orange: 'bg-orange-400/10 border-orange-400/30 text-orange-400',
    pink: 'bg-pink-400/10 border-pink-400/30 text-pink-400',
    indigo: 'bg-indigo-400/10 border-indigo-400/30 text-indigo-400',
    gold: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500'
  };

  const checkAchievementCondition = (achievement: any): boolean => {
    switch (achievement.id) {
      case 'primeira-semana':
        return (userData.currentDay || 0) >= 7;
      case 'hidratacao-master':
        return userData.badges?.includes('hidratacao-master') || false;
      case 'smoothie-lover':
        return (userData.currentDay || 0) >= 10;
      case 'foco-total':
        return (userData.currentDay || 0) >= 21;
      case 'queimador-gordura':
        return ((userData.initialWeight || 0) - (userData.currentWeight || 0)) >= 3;
      case 'influencer-healthy':
        return userData.badges?.includes('influencer-healthy') || false;
      case 'jejum-master':
        return userData.badges?.includes('jejum-master') || false;
      case 'meta-atingida':
        return (userData.currentWeight || 0) <= (userData.targetWeight || 0);
      default:
        return userData.badges?.includes(achievement.id) || false;
    }
  };

  const earnedAchievements = allAchievements.filter(achievement => 
    checkAchievementCondition(achievement)
  );

  const availableAchievements = allAchievements.filter(achievement => 
    !checkAchievementCondition(achievement)
  );

  const totalPossiblePoints = allAchievements.reduce((sum, achievement) => sum + achievement.points, 0);
  const earnedPoints = earnedAchievements.reduce((sum, achievement) => sum + achievement.points, 0);

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="bg-gradient-to-r from-yellow-400/10 to-orange-400/10 border border-yellow-400/30 rounded-2xl p-6 text-center space-y-4">
        <Trophy className="w-12 h-12 mx-auto text-yellow-400" />
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-gray-900">
            {earnedAchievements.length} / {allAchievements.length}
          </h3>
          <p className="text-gray-800">
            Conquistas Desbloqueadas
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-800">
            <span>Pontos de Conquistas</span>
            <span>{earnedPoints} / {totalPossiblePoints}</span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${(earnedPoints / totalPossiblePoints) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Earned Achievements */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-yellow-400" />
          <span>Conquistas Desbloqueadas ({earnedAchievements.length})</span>
        </h3>
        
        {earnedAchievements.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
            <div className="text-gray-400 mb-2">🏆</div>
            <p className="text-gray-400 text-sm">
              Continue no programa para desbloquear suas primeiras conquistas!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {earnedAchievements.map((achievement) => {
              const Icon = achievement.icon;
              const colorClass = colorClasses[achievement.color as keyof typeof colorClasses];
              
              return (
                <div 
                  key={achievement.id} 
                  className={`border rounded-xl p-4 ${colorClass} relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/5 opacity-50"></div>
                  <div className="relative flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Icon className="w-10 h-10" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-gray-900">
                          {achievement.title}
                        </h4>
                        <div className="flex items-center space-x-1 text-sm font-bold">
                          <Zap className="w-4 h-4" />
                          <span>+{achievement.points}pts</span>
                        </div>
                      </div>
                      <p className="text-gray-800 text-sm">
                        {achievement.description}
                      </p>
                      <div className="flex items-center space-x-2 text-xs">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-green-400">Conquistado!</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Available Achievements */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
          <Star className="w-5 h-5 text-gray-400" />
          <span>Próximas Conquistas ({availableAchievements.length})</span>
        </h3>
        
        <div className="space-y-3">
          {availableAchievements.map((achievement) => {
            const Icon = achievement.icon;
            
            return (
              <div 
                key={achievement.id} 
                className="bg-gray-50 border border-gray-200 rounded-xl p-4 opacity-75"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Icon className="w-10 h-10 text-gray-500" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-gray-800">
                        {achievement.title}
                      </h4>
                      <div className="flex items-center space-x-1 text-sm font-bold text-gray-500">
                        <Zap className="w-4 h-4" />
                        <span>+{achievement.points}pts</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm">
                      {achievement.description}
                    </p>
                    <div className="flex items-center space-x-2 text-xs">
                      <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                      <span className="text-gray-800">{achievement.condition}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AchievementsList;