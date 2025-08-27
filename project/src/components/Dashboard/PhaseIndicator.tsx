import React from 'react';
import { Droplets, Zap, Target } from 'lucide-react';

interface PhaseIndicatorProps {
  currentDay: number;
}

const PhaseIndicator: React.FC<PhaseIndicatorProps> = ({ currentDay }) => {
  const getPhase = (day: number) => {
    if (day <= 7) return {
      phase: 1,
      title: 'Desintoxicação',
      description: 'Eliminando toxinas e reduzindo inchaço',
      icon: Droplets,
      color: 'green',
      progress: (day / 7) * 100
    };
    if (day <= 14) return {
      phase: 2,
      title: 'Aceleração',
      description: 'Acelerando metabolismo e queimando gordura',
      icon: Zap,
      color: 'orange',
      progress: ((day - 7) / 7) * 100
    };
    return {
      phase: 3,
      title: 'Definição',
      description: 'Consolidando resultados e criando hábitos',
      icon: Target,
      color: 'purple',
      progress: ((day - 14) / 7) * 100
    };
  };

  const phaseData = getPhase(currentDay);
  const Icon = phaseData.icon;

  const colorClasses = {
    green: 'bg-green-400/10 border-green-400/30 text-green-400',
    orange: 'bg-orange-400/10 border-orange-400/30 text-orange-400',
    purple: 'bg-purple-400/10 border-purple-400/30 text-purple-400'
  };

  return (
    <div className={`border rounded-2xl p-6 ${colorClasses[phaseData.color as keyof typeof colorClasses]}`}>
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 bg-current/20 rounded-full flex items-center justify-center">
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-bold text-white">
              Fase {phaseData.phase}: {phaseData.title}
            </h3>
          </div>
          <p className="text-gray-300 text-sm">
            {phaseData.description}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Progresso da fase</span>
          <span>{Math.round(phaseData.progress)}%</span>
        </div>
        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-current rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${phaseData.progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default PhaseIndicator;