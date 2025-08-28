import React from 'react';
import { UserData } from '../../App';

interface ProgressCircleProps {
  userData: UserData;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ userData }) => {
  const progress = (userData.currentDay / 21) * 100;
  const remainingDays = 21 - userData.currentDay;
  const circumference = 2 * Math.PI * 80;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center space-y-4">
      {/* Progress Circle */}
      <div className="relative w-48 h-48">
        <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 200 200">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="transparent"
            stroke="rgb(55, 65, 81)"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="transparent"
            stroke="url(#gradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4ADE80" />
              <stop offset="100%" stopColor="#F472B6" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="text-4xl font-bold text-green-400">
            Dia {userData.currentDay}
          </div>
          <div className="text-gray-800 text-sm">de 21</div>
          <div className="text-2xl font-bold text-pink-400 mt-2">
            {Math.round(progress)}%
          </div>
        </div>
      </div>

      {/* Remaining days */}
      <div className="text-center space-y-1">
        <div className="text-3xl font-bold text-yellow-400">
          {remainingDays}
        </div>
        <div className="text-gray-800 text-sm uppercase tracking-wider">
          Dias Restantes
        </div>
      </div>

      {/* Milestone message */}
      {userData.currentDay === 7 && (
        <div className="bg-green-400/10 border border-green-400/30 rounded-xl p-4 text-center animate-pulse">
          <div className="text-green-400 font-bold mb-1">🎉 Primeira semana completa!</div>
          <div className="text-gray-800 text-sm">Continue assim, você está indo muito bem!</div>
        </div>
      )}
    </div>
  );
};

export default ProgressCircle;