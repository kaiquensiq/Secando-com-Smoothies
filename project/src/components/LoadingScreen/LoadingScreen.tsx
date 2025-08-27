import React from 'react';
import { Zap } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 flex items-center justify-center">
      <div className="text-center space-y-6 px-6">
        <div className="relative">
          <div className="w-20 h-20 bg-green-400 rounded-full flex items-center justify-center mx-auto animate-pulse">
            <Zap className="w-10 h-10 text-gray-900" />
          </div>
          <div className="absolute inset-0 w-20 h-20 bg-green-400 rounded-full mx-auto animate-ping opacity-20"></div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-green-400">
            Secando com Smoothies
          </h1>
          <p className="text-gray-300 text-lg">
            Transforme seu corpo em 21 dias
          </p>
        </div>

        <div className="space-y-3">
          <div className="w-64 h-2 bg-gray-700 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-400 to-pink-400 rounded-full animate-pulse"></div>
          </div>
          <p className="text-gray-400 text-sm animate-pulse">
            Preparando sua jornada...
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;