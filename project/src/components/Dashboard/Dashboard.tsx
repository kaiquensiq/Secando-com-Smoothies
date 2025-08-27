import React from 'react';
import { UserData } from '../../App';
// Removed unused import
import PhaseIndicator from './PhaseIndicator';
import DayTimeline from './DayTimeline';
import QuickStats from './QuickStats';
import TodayChallenge from './TodayChallenge';
import MotivationalMessage from './MotivationalMessage';
import QuickActions from './QuickActions';
import TodayMenu from './TodayMenu';

interface DashboardProps {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  setCurrentTab: (tab: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userData, updateUserData, setCurrentTab }) => {
  const remainingDays = 21 - userData.currentDay;
  const progressPercentage = (userData.currentDay / 21) * 100;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="px-4 py-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-green-400">
            Olá, {userData.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-gray-300">
            Dia {userData.currentDay} de 21 • {remainingDays} dias restantes
          </p>
          
          {/* Progress Bar */}
          <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden mt-4">
            <div 
              className="h-full bg-gradient-to-r from-green-400 to-pink-400 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="text-sm text-gray-400">
            {Math.round(progressPercentage)}% concluído
          </div>
        </div>

        {/* Phase Indicator */}
        <PhaseIndicator currentDay={userData.currentDay} />

        {/* Remaining Days Counter */}
        <div className={`
          text-center py-6 rounded-2xl border
          ${remainingDays <= 3 
            ? 'bg-red-400/10 border-red-400/30 text-red-400' 
            : remainingDays <= 7 
              ? 'bg-yellow-400/10 border-yellow-400/30 text-yellow-400'
              : 'bg-green-400/10 border-green-400/30 text-green-400'
          }
        `}>
          <div className="text-4xl font-bold">
            {remainingDays}
          </div>
          <div className="text-sm uppercase tracking-wider opacity-75">
            DIAS RESTANTES
          </div>
        </div>

        {/* Today's Menu */}
        <TodayMenu currentDay={userData.currentDay} />

        {/* Progress Circle */}
        {/* <ProgressCircle userData={userData} /> */}

        {/* Day Timeline */}
        <DayTimeline currentDay={userData.currentDay} />

        {/* Quick Stats */}
        <QuickStats userData={userData} />

        {/* Motivational Message */}
        <MotivationalMessage currentDay={userData.currentDay} />

        {/* Today's Challenge */}
        <TodayChallenge currentDay={userData.currentDay} />

        {/* Quick Actions */}
        <QuickActions 
          currentDay={userData.currentDay} 
          userData={userData} 
          updateUserData={updateUserData}
          setCurrentTab={setCurrentTab}
        />
      </div>
    </div>
  );
};

export default Dashboard;