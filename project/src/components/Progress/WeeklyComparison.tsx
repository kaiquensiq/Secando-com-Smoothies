import React from 'react';
import { TrendingUp, TrendingDown, Calendar, Target } from 'lucide-react';
import { UserData } from '../../App';

interface WeeklyComparisonProps {
  userData: UserData;
}

const WeeklyComparison: React.FC<WeeklyComparisonProps> = ({ userData }) => {
  // Simulated weekly data for demonstration
  const weeklyData = [
    {
      week: 1,
      title: 'Desintoxicação',
      startWeight: userData.initialWeight,
      endWeight: userData.initialWeight - 1.4,
      avgEnergy: 7.2,
      smoothiesCompleted: 7,
      challenges: 15,
      phase: 'Limpeza do organismo',
      color: 'green'
    },
    {
      week: 2,
      title: 'Aceleração',
      startWeight: userData.initialWeight - 1.4,
      endWeight: userData.currentWeight,
      avgEnergy: 8.1,
      smoothiesCompleted: userData.currentDay >= 14 ? 7 : Math.max(0, userData.currentDay - 7),
      challenges: userData.currentDay >= 14 ? 18 : Math.max(0, (userData.currentDay - 7) * 2.5),
      phase: 'Acelerar metabolismo',
      color: 'orange'
    },
    {
      week: 3,
      title: 'Definição',
      startWeight: userData.currentWeight,
      endWeight: userData.targetWeight,
      avgEnergy: userData.currentDay >= 21 ? 8.7 : 0,
      smoothiesCompleted: Math.max(0, userData.currentDay - 14),
      challenges: Math.max(0, (userData.currentDay - 14) * 3),
      phase: 'Definir resultados',
      color: 'purple'
    }
  ];

  const getCurrentWeek = () => Math.ceil(userData.currentDay / 7);
  const currentWeek = getCurrentWeek();

  const colorClasses = {
    green: {
      bg: 'bg-green-400/10 border-green-400/30',
      text: 'text-green-400',
      accent: 'bg-green-400'
    },
    orange: {
      bg: 'bg-orange-400/10 border-orange-400/30',
      text: 'text-orange-400',
      accent: 'bg-orange-400'
    },
    purple: {
      bg: 'bg-purple-400/10 border-purple-400/30',
      text: 'text-purple-400',
      accent: 'bg-purple-400'
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Week Highlight */}
      <div className="text-center space-y-2">
        <div className="text-sm text-gray-400">Você está na</div>
        <div className="text-2xl font-bold text-gray-900">
          Semana {currentWeek} - {weeklyData[currentWeek - 1]?.title}
        </div>
        <div className="text-gray-800 text-sm">
          {weeklyData[currentWeek - 1]?.phase}
        </div>
      </div>

      {/* Weekly Cards */}
      <div className="space-y-4">
        {weeklyData.map((week) => {
          const isCompleted = userData.currentDay > week.week * 7;
          const isCurrent = currentWeek === week.week;
          const isPending = userData.currentDay < (week.week - 1) * 7 + 1;
          const colorClass = colorClasses[week.color as keyof typeof colorClasses];
          const weightLoss = week.startWeight - week.endWeight;

          return (
            <div 
              key={week.week}
              className={`
                border rounded-2xl p-6 space-y-4 transition-all duration-200
                ${isCurrent 
                  ? `${colorClass.bg} ring-2 ring-green-400/20 scale-105` 
                  : isCompleted 
                    ? `${colorClass.bg} opacity-90` 
                    : 'bg-gray-50 border-gray-200 opacity-60'
                }
              `}
            >
              {/* Week Header */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Calendar className={`w-5 h-5 ${isCompleted || isCurrent ? colorClass.text : 'text-gray-500'}`} />
                    <h3 className={`text-lg font-bold ${isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-400'}`}>
                      Semana {week.week}
                    </h3>
                  </div>
                  <p className={`text-sm ${isCompleted || isCurrent ? colorClass.text : 'text-gray-500'}`}>
                    {week.title}
                  </p>
                </div>

                <div className="text-right space-y-1">
                  {isCompleted && (
                    <div className="text-green-400 text-sm font-bold">
                      ✅ Completa
                    </div>
                  )}
                  {isCurrent && (
                    <div className="text-yellow-400 text-sm font-bold animate-pulse">
                      🔥 Atual
                    </div>
                  )}
                  {isPending && (
                    <div className="text-gray-500 text-sm">
                      🔒 Bloqueada
                    </div>
                  )}
                </div>
              </div>

              {/* Week Stats */}
              {!isPending && (
                <div className="grid grid-cols-2 gap-4">
                  {/* Weight Loss */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      {weightLoss > 0 ? (
                        <TrendingDown className="w-4 h-4 text-green-400" />
                      ) : (
                        <TrendingUp className="w-4 h-4 text-red-400" />
                      )}
                      <span className="text-sm text-gray-400">Perda de Peso</span>
                    </div>
                    <div className="text-xl font-bold text-gray-900">
                      {Math.abs(weightLoss).toFixed(1)}kg
                    </div>
                  </div>

                  {/* Average Energy */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-gray-400">Energia Média</span>
                    </div>
                    <div className="text-xl font-bold text-gray-900">
                      {week.avgEnergy > 0 ? `${week.avgEnergy}/10` : '-'}
                    </div>
                  </div>

                  {/* Smoothies Completed */}
                  <div className="space-y-2">
                    <div className="text-sm text-gray-400">Smoothies</div>
                    <div className="text-lg font-bold text-gray-900">
                      {week.smoothiesCompleted}/7
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${colorClass.accent} rounded-full transition-all duration-500`}
                        style={{ width: `${(week.smoothiesCompleted / 7) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Challenges */}
                  <div className="space-y-2">
                    <div className="text-sm text-gray-400">Desafios</div>
                    <div className="text-lg font-bold text-gray-900">
                      {Math.round(week.challenges)}
                    </div>
                    <div className="text-xs text-gray-800">
                      pontos conquistados
                    </div>
                  </div>
                </div>
              )}

              {/* Week Description */}
              <div className="bg-gray-100 rounded-xl p-3">
                <p className="text-gray-800 text-sm leading-relaxed">
                  <strong className={colorClass.text}>{week.phase}:</strong>{' '}
                  {week.week === 1 && "Foco na eliminação de toxinas e redução do inchaço através de smoothies detox ricos em antioxidantes."}
                  {week.week === 2 && "Receitas termogênicas para acelerar o metabolismo e potencializar a queima de gordura."}
                  {week.week === 3 && "Consolidação dos resultados e preparação para manter os hábitos saudáveis conquistados."}
                </p>
              </div>

              {/* Progress Bar */}
              {isCurrent && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Progresso da Semana</span>
                    <span>{Math.round(((userData.currentDay - (week.week - 1) * 7) / 7) * 100)}%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${colorClass.accent} rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${((userData.currentDay - (week.week - 1) * 7) / 7) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Overall Comparison */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-gray-900 text-center">
          Resumo Geral
        </h3>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-green-400">
              {weeklyData.filter((_, i) => userData.currentDay > (i + 1) * 7).length}
            </div>
            <div className="text-gray-400 text-sm">
              Semanas Completas
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="text-2xl font-bold text-orange-400">
              {(userData.initialWeight - userData.currentWeight).toFixed(1)}kg
            </div>
            <div className="text-gray-400 text-sm">
              Total Perdido
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="text-2xl font-bold text-purple-400">
              {Math.max(userData.currentWeight - userData.targetWeight, 0).toFixed(1)}kg
            </div>
            <div className="text-gray-400 text-sm">
              Para a Meta
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyComparison;