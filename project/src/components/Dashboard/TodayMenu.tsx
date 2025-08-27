import React from 'react';
import { Coffee, Sun, Sunset, Moon, Clock, Utensils, Zap } from 'lucide-react';
import { getDayMealPlan, getTotalCaloriesForDay } from '../Recipes/mealPlanData';

interface TodayMenuProps {
  currentDay: number;
}

const TodayMenu: React.FC<TodayMenuProps> = ({ currentDay }) => {
  const dayPlan = getDayMealPlan(currentDay);
  const totalCalories = getTotalCaloriesForDay(currentDay);

  if (!dayPlan) {
    return (
      <div className="bg-gray-800 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Utensils className="w-5 h-5 text-green-400" />
          Menu do Dia {currentDay}
        </h3>
        <p className="text-gray-400">Plano alimentar não disponível para este dia.</p>
      </div>
    );
  }

  const getMealIcon = (mealType: string) => {
    switch (mealType) {
      case 'Café da manhã':
        return { icon: Coffee, color: 'text-yellow-400', bg: 'bg-yellow-400/10', time: '7:00' };
      case 'Lanche da manhã':
        return { icon: Sun, color: 'text-orange-400', bg: 'bg-orange-400/10', time: '10:00' };
      case 'Almoço':
        return { icon: Utensils, color: 'text-blue-400', bg: 'bg-blue-400/10', time: '12:00' };
      case 'Lanche da tarde':
        return { icon: Sunset, color: 'text-pink-400', bg: 'bg-pink-400/10', time: '15:00' };
      case 'Jantar':
        return { icon: Moon, color: 'text-purple-400', bg: 'bg-purple-400/10', time: '19:00' };
      case 'Ceia':
        return { icon: Moon, color: 'text-indigo-400', bg: 'bg-indigo-400/10', time: '21:00' };
      default:
        return { icon: Utensils, color: 'text-gray-400', bg: 'bg-gray-400/10', time: '--:--' };
    }
  };

  return (
    <div className="bg-gray-800 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Utensils className="w-5 h-5 text-green-400" />
          Menu do Dia {currentDay}
        </h3>
        <div className="flex items-center gap-2 text-sm">
          <Zap className="w-4 h-4 text-yellow-400" />
          <span className="text-yellow-400 font-medium">{totalCalories} kcal</span>
        </div>
      </div>

      <div className="mb-4 p-3 bg-green-400/10 rounded-lg border border-green-400/20">
        <h4 className="text-green-400 font-medium text-sm mb-1">{dayPlan.phase}</h4>
        <p className="text-gray-300 text-xs">{dayPlan.objective}</p>
      </div>

      <div className="space-y-4">
        {dayPlan.meals.map((meal, index) => {
          const mealConfig = getMealIcon(meal.type);
          const IconComponent = mealConfig.icon;
          
          return (
            <div key={index} className="flex items-start gap-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700/70 transition-colors">
              <div className={`p-2 rounded-lg ${mealConfig.bg} flex-shrink-0`}>
                <IconComponent className={`w-4 h-4 ${mealConfig.color}`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-white font-medium text-sm">{meal.name}</h4>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>{mealConfig.time}</span>
                    {meal.calories && (
                      <span className="text-yellow-400 ml-2">{meal.calories} kcal</span>
                    )}
                  </div>
                </div>
                
                <div className="space-y-1">
                  {meal.items.map((item, itemIndex) => (
                    <p key={itemIndex} className="text-gray-300 text-xs leading-relaxed">
                      • {item}
                    </p>
                  ))}
                </div>
                
                {meal.isSmootie && (
                  <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 bg-green-400/20 text-green-400 text-xs rounded-full">
                    <Zap className="w-3 h-3" />
                    <span>Smoothie</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-3 bg-blue-400/10 rounded-lg border border-blue-400/20">
        <h4 className="text-blue-400 font-medium text-sm mb-1">Estratégia do Dia</h4>
        <p className="text-gray-300 text-xs">{dayPlan.strategy}</p>
      </div>
    </div>
  );
};

export default TodayMenu;