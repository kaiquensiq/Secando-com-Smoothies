import React from 'react';

interface DayTimelineProps {
  currentDay: number;
}

const DayTimeline: React.FC<DayTimelineProps> = ({ currentDay }) => {
  const days = Array.from({ length: 21 }, (_, i) => i + 1);

  return (
    <div className="bg-gray-50 rounded-2xl p-6 space-y-4 border border-gray-200">
      <h3 className="text-lg font-bold text-center text-gray-900 mb-4">
        Timeline dos 21 Dias
      </h3>
      
      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => {
          const isCompleted = day < currentDay;
          const isCurrent = day === currentDay;
          const isPending = day > currentDay;
          
          return (
            <div
              key={day}
              className={`
                w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
                ${isCompleted ? 'bg-green-400 text-gray-900 scale-105' : ''}
                ${isCurrent ? 'bg-pink-400 text-gray-900 animate-pulse ring-4 ring-pink-400/30' : ''}
                ${isPending ? 'bg-gray-200 text-gray-700 border-2 border-gray-300' : ''}
              `}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* Week indicators */}
      <div className="flex justify-between text-xs text-gray-800 pt-2">
        <span>Semana 1: Desintox</span>
        <span>Semana 2: Acelera</span>
        <span>Semana 3: Define</span>
      </div>
    </div>
  );
};

export default DayTimeline;