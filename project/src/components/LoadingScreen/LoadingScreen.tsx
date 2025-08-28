import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-pink-50 flex items-center justify-center">
      <div className="text-center space-y-6 px-6">
        <div className="relative">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto animate-pulse shadow-lg">
            <img 
              src="https://i.imgur.com/Bz1fya1.png" 
              alt="Secando com Smoothies Logo" 
              className="w-16 h-16 object-contain"
            />
          </div>
          <div className="absolute inset-0 w-20 h-20 bg-green-400 rounded-full mx-auto animate-ping opacity-20"></div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-green-400">
            Secando com Smoothies
          </h1>
          <p className="text-gray-700 text-lg">
            Transforme seu corpo em 21 dias
          </p>
        </div>

        <div className="space-y-3">
          <div className="w-64 h-2 bg-gray-300 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-400 to-pink-400 rounded-full animate-pulse"></div>
          </div>
          <p className="text-gray-600 text-sm animate-pulse">
            Preparando sua jornada...
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;