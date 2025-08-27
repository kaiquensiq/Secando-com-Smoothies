import React, { useState } from 'react';
import { Target, Scale, Calendar, TrendingDown, Save } from 'lucide-react';
import { UserData } from '../../App';

interface GoalsSettingsProps {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
}

const GoalsSettings: React.FC<GoalsSettingsProps> = ({ userData, updateUserData }) => {
  const [targetWeight, setTargetWeight] = useState(userData.targetWeight);
  const [showSaved, setShowSaved] = useState(false);

  const handleSave = () => {
    updateUserData({ targetWeight });
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  const calculateGoalProgress = () => {
    const totalGoal = userData.initialWeight - userData.targetWeight;
    const currentProgress = userData.initialWeight - userData.currentWeight;
    return Math.min((currentProgress / totalGoal) * 100, 100);
  };

  const estimateDaysToGoal = () => {
    const remainingWeight = userData.currentWeight - userData.targetWeight;
    if (remainingWeight <= 0) return 0;
    
    const averageLossPerDay = (userData.initialWeight - userData.currentWeight) / userData.currentDay;
    if (averageLossPerDay <= 0) return 999;
    
    return Math.ceil(remainingWeight / averageLossPerDay);
  };

  const goalProgress = calculateGoalProgress();
  const daysToGoal = estimateDaysToGoal();

  return (
    <div className="space-y-6">
      {/* Current Goal Overview */}
      <div className="bg-gradient-to-r from-pink-400/10 to-purple-400/10 border border-pink-400/30 rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center space-x-2">
          <Target className="w-5 h-5 text-pink-400" />
          <span>Sua Meta Atual</span>
        </h3>

        <div className="text-center space-y-2">
          <div className="text-4xl font-bold text-pink-400">
            {userData.targetWeight}kg
          </div>
          <p className="text-gray-300">
            Peso desejado
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-400">
            <span>Progresso da meta</span>
            <span>{goalProgress.toFixed(0)}%</span>
          </div>
          <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-pink-400 to-purple-400 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${goalProgress}%` }}
            ></div>
          </div>
        </div>

        {userData.currentWeight <= userData.targetWeight ? (
          <div className="bg-green-400/10 border border-green-400/30 rounded-xl p-4 text-center">
            <div className="text-green-400 font-bold text-lg">
              🎉 Meta atingida!
            </div>
            <div className="text-gray-300 text-sm mt-1">
              Parabéns! Você conseguiu chegar ao seu peso desejado
            </div>
          </div>
        ) : (
          <div className="bg-blue-400/10 border border-blue-400/30 rounded-xl p-4 text-center">
            <div className="text-blue-400 font-bold">
              {(userData.currentWeight - userData.targetWeight).toFixed(1)}kg para a meta
            </div>
            <div className="text-gray-300 text-sm mt-1">
              {daysToGoal < 999 ? `Estimativa: ${daysToGoal} dias` : 'Continue no ritmo atual'}
            </div>
          </div>
        )}
      </div>

      {/* Adjust Target Weight */}
      <div className="bg-gray-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center space-x-2">
          <Scale className="w-5 h-5 text-green-400" />
          <span>Ajustar Meta</span>
        </h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">
              Nova meta de peso (kg)
            </label>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setTargetWeight(prev => Math.max(prev - 0.5, 40))}
                className="w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-xl flex items-center justify-center text-white font-bold text-xl transition-all duration-200"
              >
                -
              </button>
              
              <input
                type="number"
                step="0.1"
                value={targetWeight}
                onChange={(e) => setTargetWeight(parseFloat(e.target.value))}
                className="flex-1 bg-gray-700 text-white rounded-xl px-4 py-3 text-center text-xl font-bold focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              
              <button
                onClick={() => setTargetWeight(prev => Math.min(prev + 0.5, userData.initialWeight - 0.5))}
                className="w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-xl flex items-center justify-center text-white font-bold text-xl transition-all duration-200"
              >
                +
              </button>
            </div>
          </div>

          {targetWeight !== userData.targetWeight && (
            <div className="space-y-3">
              <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-xl p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Meta atual:</span>
                  <span className="text-white font-bold">{userData.targetWeight}kg</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Nova meta:</span>
                  <span className="text-yellow-400 font-bold">{targetWeight}kg</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Diferença:</span>
                  <span className={`font-bold ${targetWeight > userData.targetWeight ? 'text-red-400' : 'text-green-400'}`}>
                    {targetWeight > userData.targetWeight ? '+' : ''}{(targetWeight - userData.targetWeight).toFixed(1)}kg
                  </span>
                </div>
              </div>

              <button
                onClick={handleSave}
                className="w-full bg-green-400 text-gray-900 py-3 rounded-xl font-bold hover:bg-green-300 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>Salvar Nova Meta</span>
              </button>
            </div>
          )}

          {showSaved && (
            <div className="bg-green-400/10 border border-green-400/30 rounded-xl p-4 text-center animate-pulse">
              <div className="text-green-400 font-bold">
                ✅ Meta atualizada com sucesso!
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Goal History and Stats */}
      <div className="bg-gray-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center space-x-2">
          <TrendingDown className="w-5 h-5 text-blue-400" />
          <span>Progresso Detalhado</span>
        </h3>

        <div className="space-y-3">
          <div className="flex justify-between items-center py-3 border-b border-gray-700">
            <span className="text-gray-400">Peso inicial</span>
            <span className="text-white font-bold">{userData.initialWeight}kg</span>
          </div>
          
          <div className="flex justify-between items-center py-3 border-b border-gray-700">
            <span className="text-gray-400">Peso atual</span>
            <span className="text-white font-bold">{userData.currentWeight}kg</span>
          </div>
          
          <div className="flex justify-between items-center py-3 border-b border-gray-700">
            <span className="text-gray-400">Peso perdido</span>
            <span className="text-green-400 font-bold">
              {(userData.initialWeight - userData.currentWeight).toFixed(1)}kg
            </span>
          </div>
          
          <div className="flex justify-between items-center py-3 border-b border-gray-700">
            <span className="text-gray-400">Meta de perda total</span>
            <span className="text-pink-400 font-bold">
              {(userData.initialWeight - userData.targetWeight).toFixed(1)}kg
            </span>
          </div>
          
          <div className="flex justify-between items-center py-3">
            <span className="text-gray-400">Média por dia</span>
            <span className="text-blue-400 font-bold">
              {((userData.initialWeight - userData.currentWeight) / userData.currentDay).toFixed(2)}kg
            </span>
          </div>
        </div>
      </div>

      {/* Goal Tips */}
      <div className="bg-gradient-to-r from-green-400/10 to-blue-400/10 border border-green-400/30 rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-green-400" />
          <span>Dicas para Sua Meta</span>
        </h3>

        <div className="space-y-3 text-sm">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-gray-300 leading-relaxed">
              <strong className="text-green-400">Meta realista:</strong> A perda ideal é de 0,5 a 1kg por semana para manter a saúde.
            </p>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-gray-300 leading-relaxed">
              <strong className="text-blue-400">Consistência:</strong> Manter os hábitos após os 21 dias é fundamental para não recuperar o peso.
            </p>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-gray-300 leading-relaxed">
              <strong className="text-pink-400">Foco na saúde:</strong> Priorize como se sente, sua energia e disposição, não apenas o número na balança.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalsSettings;