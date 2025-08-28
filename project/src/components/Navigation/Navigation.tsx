import React from 'react';
import { Home, Book, TrendingUp, User, Camera, ShoppingCart } from 'lucide-react';

interface NavigationProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentTab, setCurrentTab }) => {
  const tabs = [
    { id: 'dashboard', icon: Home, label: 'Início' },
    { id: 'checkin', icon: Camera, label: 'Check-in' },
    { id: 'recipes', icon: Book, label: 'Receitas' },
    { id: 'shopping', icon: ShoppingCart, label: 'Compras' },
    { id: 'progress', icon: TrendingUp, label: 'Progresso' },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white/95 backdrop-blur-lg border-t border-purple-200 overflow-x-auto shadow-lg">
      <div className="flex items-center py-2 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`flex flex-col items-center p-2 rounded-xl transition-all duration-200 min-w-0 flex-1 ${
                isActive 
                  ? 'text-pink-500 bg-pink-100 scale-105'
            : 'text-gray-800 hover:text-pink-500 hover:bg-purple-50'
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 ${isActive ? 'animate-pulse' : ''}`} />
              <span className="text-xs font-medium truncate">{tab.label}</span>
            </button>
          );
        })}
        
        {/* Profile button - separate */}
        <button
          onClick={() => setCurrentTab('profile')}
          className={`flex flex-col items-center p-2 rounded-xl transition-all duration-200 min-w-0 ${
            currentTab === 'profile'
              ? 'text-orange-500 bg-orange-100 scale-105' 
            : 'text-gray-800 hover:text-orange-500 hover:bg-purple-50'
          }`}
        >
          <User className={`w-5 h-5 mb-1 ${currentTab === 'profile' ? 'animate-pulse' : ''}`} />
          <span className="text-xs font-medium">Perfil</span>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;