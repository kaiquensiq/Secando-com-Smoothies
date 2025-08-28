import React from 'react';

interface WeekSelectorProps {
  selectedWeek: number;
  setSelectedWeek: (week: number) => void;
  currentDay: number;
}

const WeekSelector: React.FC<WeekSelectorProps> = ({ selectedWeek, setSelectedWeek, currentDay }) => {
  const weeks = [
    { number: 1, title: "Desintoxicação", days: "1-7", color: "green" },
    { number: 2, title: "Aceleração", days: "8-14", color: "orange" },
    { number: 3, title: "Definição", days: "15-21", color: "purple" }
  ];

  const colorClasses = {
    green: {
      active: 'bg-green-400 text-gray-900',
      inactive: 'bg-green-400/20 text-green-400 hover:bg-green-400/30'
    },
    orange: {
      active: 'bg-orange-400 text-gray-900',
      inactive: 'bg-orange-400/20 text-orange-400 hover:bg-orange-400/30'
    },
    purple: {
      active: 'bg-purple-400 text-gray-900',
      inactive: 'bg-purple-400/20 text-purple-400 hover:bg-purple-400/30'
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-center text-gray-900">
        Selecione a Semana
      </h3>
      
      <div className="flex space-x-2">
        {weeks.map((week) => {
          const isActive = selectedWeek === week.number;
          const isUnlocked = currentDay >= (week.number - 1) * 7 + 1;
          const colors = colorClasses[week.color as keyof typeof colorClasses];
          
          return (
            <button
              key={week.number}
              onClick={() => isUnlocked && setSelectedWeek(week.number)}
              disabled={!isUnlocked}
              className={`
                flex-1 p-4 rounded-xl transition-all duration-200 text-center space-y-1
                ${isActive 
                  ? colors.active 
                  : isUnlocked 
                    ? colors.inactive 
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }
                ${isUnlocked && !isActive ? 'hover:scale-105' : ''}
              `}
            >
              <div className="font-bold text-sm">
                Semana {week.number}
              </div>
              <div className={`text-xs ${isActive ? 'opacity-75' : ''}`}>
                {week.title}
              </div>
              <div className={`text-xs ${isActive ? 'opacity-75' : ''}`}>
                Dias {week.days}
              </div>
              {!isUnlocked && (
                <div className="text-xs opacity-50">🔒 Bloqueada</div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default WeekSelector;