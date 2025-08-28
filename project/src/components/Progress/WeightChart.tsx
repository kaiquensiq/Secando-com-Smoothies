import React from 'react';
import { UserData } from '../../App';

interface WeightChartProps {
  userData: UserData;
}

const WeightChart: React.FC<WeightChartProps> = ({ userData }) => {
  // Simulated weight data for demonstration
  const weightData = [
    { day: 1, weight: userData.initialWeight },
    { day: 2, weight: userData.initialWeight - 0.1 },
    { day: 3, weight: userData.initialWeight - 0.3 },
    { day: 4, weight: userData.initialWeight - 0.5 },
    { day: 5, weight: userData.initialWeight - 0.8 },
    { day: 6, weight: userData.initialWeight - 1.1 },
    { day: 7, weight: userData.initialWeight - 1.4 },
    { day: 8, weight: userData.currentWeight }
  ].slice(0, userData.currentDay);

  const maxWeight = Math.max(...weightData.map(d => d.weight));
  const minWeight = Math.min(...weightData.map(d => d.weight), userData.targetWeight);
  const weightRange = maxWeight - minWeight;
  const chartHeight = 200;
  const chartWidth = 300;
  const padding = 40;

  const getY = (weight: number) => {
    return chartHeight - ((weight - minWeight) / weightRange) * (chartHeight - padding);
  };

  const getX = (day: number) => {
    return ((day - 1) / 20) * (chartWidth - padding) + padding/2;
  };

  const pathData = weightData.map((point, index) => {
    const x = getX(point.day);
    const y = getY(point.weight);
    return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
  }).join(' ');

  return (
    <div className="space-y-6">
      {/* Chart Container */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-gray-900 text-center">
          Evolução do Peso
        </h3>

        <div className="relative overflow-x-auto">
          <svg viewBox={`0 0 ${chartWidth} ${chartHeight + 40}`} className="w-full h-64">
            {/* Grid lines */}
            {[0, 1, 2, 3, 4].map((i) => {
              const y = (i / 4) * chartHeight + padding/2;
              const weight = maxWeight - (i / 4) * weightRange;
              return (
                <g key={i}>
                  <line 
                    x1={padding/2} 
                    y1={y} 
                    x2={chartWidth - padding/2} 
                    y2={y} 
                    stroke="rgb(55, 65, 81)" 
                    strokeWidth="1"
                  />
                  <text 
                    x={padding/2 - 5} 
                    y={y + 4} 
                    fill="rgb(156, 163, 175)" 
                    fontSize="10" 
                    textAnchor="end"
                  >
                    {weight.toFixed(1)}
                  </text>
                </g>
              );
            })}

            {/* Target weight line */}
            <line 
              x1={padding/2} 
              y1={getY(userData.targetWeight)} 
              x2={chartWidth - padding/2} 
              y2={getY(userData.targetWeight)} 
              stroke="#F472B6" 
              strokeWidth="2" 
              strokeDasharray="5,5"
              opacity="0.7"
            />
            <text 
              x={chartWidth - padding/2} 
              y={getY(userData.targetWeight) - 5} 
              fill="#F472B6" 
              fontSize="10" 
              textAnchor="end"
            >
              Meta: {userData.targetWeight}kg
            </text>

            {/* Weight line */}
            <path 
              d={pathData} 
              fill="none" 
              stroke="url(#weightGradient)" 
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data points */}
            {weightData.map((point, index) => (
              <g key={index}>
                <circle 
                  cx={getX(point.day)} 
                  cy={getY(point.weight)} 
                  r="4" 
                  fill="#4ADE80"
                  stroke="white"
                  strokeWidth="2"
                />
                {index === weightData.length - 1 && (
                  <circle 
                    cx={getX(point.day)} 
                    cy={getY(point.weight)} 
                    r="6" 
                    fill="#4ADE80"
                    opacity="0.5"
                    className="animate-pulse"
                  />
                )}
              </g>
            ))}

            {/* X-axis labels */}
            {weightData.map((point) => (
              <text 
                key={point.day}
                x={getX(point.day)} 
                y={chartHeight + 20} 
                fill="rgb(156, 163, 175)" 
                fontSize="10" 
                textAnchor="middle"
              >
                {point.day}
              </text>
            ))}

            {/* Gradients */}
            <defs>
              <linearGradient id="weightGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4ADE80" />
                <stop offset="100%" stopColor="#F472B6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="text-center text-sm text-gray-800">
          Dias do programa
        </div>
      </div>

      {/* Weight Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-400/10 border border-green-400/30 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-400">
            {(userData.initialWeight - userData.currentWeight).toFixed(1)}kg
          </div>
          <div className="text-gray-800 text-sm">
            Peso Perdido
          </div>
        </div>

        <div className="bg-pink-400/10 border border-pink-400/30 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-pink-400">
            {Math.max(userData.currentWeight - userData.targetWeight, 0).toFixed(1)}kg
          </div>
          <div className="text-gray-800 text-sm">
            Para a Meta
          </div>
        </div>
      </div>

      {/* Predictions */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
        <h4 className="text-lg font-bold text-gray-900 text-center">
          Projeções
        </h4>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-800">Média de perda/dia:</span>
            <span className="text-green-400 font-bold">
              {((userData.initialWeight - userData.currentWeight) / userData.currentDay).toFixed(2)}kg
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-800">Previsão no dia 21:</span>
            <span className="text-blue-400 font-bold">
              {(userData.currentWeight - ((userData.initialWeight - userData.currentWeight) / userData.currentDay) * (21 - userData.currentDay)).toFixed(1)}kg
            </span>
          </div>
          
          {userData.currentWeight > userData.targetWeight && (
            <div className="flex justify-between items-center">
              <span className="text-gray-800">Meta estimada em:</span>
              <span className="text-pink-400 font-bold">
                {Math.ceil((userData.currentWeight - userData.targetWeight) / ((userData.initialWeight - userData.currentWeight) / userData.currentDay))} dias
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeightChart;