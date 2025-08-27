import React, { useState } from 'react';
import { UserData } from '../../App';
import WeightChart from './WeightChart';
import AchievementsList from './AchievementsList';
import StatsOverview from './StatsOverview';
import WeeklyComparison from './WeeklyComparison';

interface ProgressProps {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
}

const Progress: React.FC<ProgressProps> = ({ userData, updateUserData }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'chart' | 'achievements' | 'weekly'>('overview');

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: '📊' },
    { id: 'chart', label: 'Gráfico', icon: '📈' },
    { id: 'achievements', label: 'Conquistas', icon: '🏆' },
    { id: 'weekly', label: 'Semanal', icon: '📅' }
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return <StatsOverview userData={userData} />;
      case 'chart':
        return <WeightChart userData={userData} />;
      case 'achievements':
        return <AchievementsList userData={userData} />;
      case 'weekly':
        return <WeeklyComparison userData={userData} />;
      default:
        return <StatsOverview userData={userData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="px-4 py-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-green-400">
            Seu Progresso
          </h1>
          <p className="text-gray-300">
            Acompanhe sua evolução dia a dia
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-800 p-1 rounded-xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`
                flex-1 py-3 px-2 rounded-lg text-sm font-medium transition-all duration-200
                ${activeTab === tab.id 
                  ? 'bg-green-400 text-gray-900 scale-105' 
                  : 'text-gray-400 hover:text-green-300 hover:bg-gray-700'
                }
              `}
            >
              <div className="flex flex-col items-center space-y-1">
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Active Tab Content */}
        <div className="min-h-96">
          {renderActiveTab()}
        </div>
      </div>
    </div>
  );
};

export default Progress;