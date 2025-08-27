import React from 'react';
import { Camera, Scale, Droplets, Clock, CheckCircle, Plus, Minus } from 'lucide-react';
import { UserData } from '../../App';
import { useAuth } from '../../contexts/AuthContext';
import { userService } from '../../lib/supabase';

interface QuickActionsProps {
  currentDay: number;
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  setCurrentTab: (tab: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ currentDay, userData, updateUserData, setCurrentTab }) => {
  const { user } = useAuth();
  const todayCheckin = userData.checkins.find(c => c.day === currentDay);
  const hasCheckedIn = !!todayCheckin;

  // Reset hydration if it's a new day
  const today = new Date().toDateString();
  if (userData.hydration && userData.hydration.lastUpdated !== today) {
    updateUserData({
      hydration: {
        ...userData.hydration,
        currentGlasses: 0,
        lastUpdated: today
      }
    });
  }

  const handleHydrationChange = async (increment: boolean) => {
    if (!userData.hydration || !user) return;
    
    const newGlasses = increment 
      ? Math.min(userData.hydration.currentGlasses + 1, userData.hydration.dailyGoal + 5)
      : Math.max(userData.hydration.currentGlasses - 1, 0);
    
    try {
      // Atualizar hidratação no Supabase
      const { error } = await userService.updateHydration(user.id, newGlasses);
      
      if (error) {
        console.error('Erro ao atualizar hidratação:', error);
        return;
      }
      
      // Atualizar estado local
      updateUserData({
        hydration: {
          ...userData.hydration,
          currentGlasses: newGlasses,
          lastUpdated: today
        }
      });
    } catch (error) {
      console.error('Erro ao atualizar hidratação:', error);
    }
  };

  const handleActionClick = (actionType: string) => {
    switch (actionType) {
      case 'checkin':
        setCurrentTab('checkin');
        break;
      case 'weight':
        setCurrentTab('checkin');
        break;
      case 'progress':
        setCurrentTab('progress');
        break;
      default:
        break;
    }
  };

  const hydrationPercentage = userData.hydration ? (userData.hydration.currentGlasses / userData.hydration.dailyGoal) * 100 : 0;
  const isHydrationComplete = userData.hydration ? userData.hydration.currentGlasses >= userData.hydration.dailyGoal : false;

  const actions = [
    {
      icon: Camera,
      label: hasCheckedIn ? 'Check-in Feito' : 'Check-in Diário',
      description: hasCheckedIn ? 'Completo!' : 'Peso + Foto',
      color: hasCheckedIn ? 'bg-green-400' : 'bg-blue-400',
      textColor: 'text-gray-900',
      completed: hasCheckedIn,
      actionType: 'checkin'
    },
    {
      icon: Scale,
      label: 'Peso Atual',
      description: `${userData.currentWeight}kg`,
      color: 'bg-purple-400',
      textColor: 'text-gray-900',
      completed: false,
      actionType: 'weight'
    },
    {
      icon: userData.streak >= 7 ? CheckCircle : Clock,
      label: 'Sequência',
      description: `${userData.streak} dias`,
      color: userData.streak >= 7 ? 'bg-yellow-400' : 'bg-orange-400',
      textColor: 'text-gray-900',
      completed: userData.streak >= 7,
      actionType: 'progress'
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-center text-white">
        Ações Rápidas
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              onClick={() => handleActionClick(action.actionType)}
              className={`${action.color} rounded-xl p-4 text-left space-y-2 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl relative`}
            >
              {action.completed && (
                <div className="absolute top-2 right-2">
                  <CheckCircle className="w-4 h-4 text-gray-900 opacity-60" />
                </div>
              )}
              <Icon className={`w-6 h-6 ${action.textColor}`} />
              <div className="space-y-1">
                <div className={`font-bold ${action.textColor}`}>
                  {action.label}
                </div>
                <div className={`text-xs opacity-75 ${action.textColor}`}>
                  {action.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>
      
      {/* Hydration Tracker */}
      <div className={`${isHydrationComplete ? 'bg-green-400' : 'bg-cyan-400'} rounded-xl p-4 space-y-3`}>
        {userData.hydration && (
          <>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Droplets className="w-6 h-6 text-gray-900" />
                <div>
                  <div className="font-bold text-gray-900">Hidratação</div>
                  <div className="text-xs opacity-75 text-gray-900">
                    {userData.hydration.currentGlasses}/{userData.hydration.dailyGoal} copos
                  </div>
                </div>
              </div>
              {isHydrationComplete && (
                <CheckCircle className="w-5 h-5 text-gray-900 opacity-60" />
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleHydrationChange(false)}
                className="bg-white bg-opacity-20 rounded-lg p-2 hover:bg-opacity-30 transition-all"
                disabled={userData.hydration.currentGlasses === 0}
              >
                <Minus className="w-4 h-4 text-gray-900" />
              </button>
              
              <div className="flex-1 mx-3">
                <div className="bg-white bg-opacity-20 rounded-full h-2">
                  <div 
                    className="bg-white rounded-full h-2 transition-all duration-300"
                    style={{ width: `${Math.min(hydrationPercentage, 100)}%` }}
                  />
                </div>
              </div>
              
              <button
                onClick={() => handleHydrationChange(true)}
                className="bg-white bg-opacity-20 rounded-lg p-2 hover:bg-opacity-30 transition-all"
              >
                <Plus className="w-4 h-4 text-gray-900" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuickActions;