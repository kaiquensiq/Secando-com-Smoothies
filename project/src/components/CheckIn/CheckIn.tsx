import React, { useState } from 'react';
import { Camera, Scale, Heart, Check, Upload, Smile, Meh, Frown, Trophy, Gift } from 'lucide-react';
import { UserData } from '../../App';
import { useAuth } from '../../contexts/AuthContext';
import { userService } from '../../lib/supabase';

interface CheckInProps {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
}

const CheckIn: React.FC<CheckInProps> = ({ userData, updateUserData }) => {
  const { user } = useAuth();
  const [weight, setWeight] = useState(userData.currentWeight);
  const [mood, setMood] = useState<'happy' | 'neutral' | 'sad'>('happy');
  const [smoothieCompleted, setSmoothieCompleted] = useState(false);
  const [mealsCompleted, setMealsCompleted] = useState(0);
  const [photo, setPhoto] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successData, setSuccessData] = useState({ points: 0, nextDay: 0, isComplete: false });

  const moods = [
    { id: 'happy', icon: Smile, label: 'Ótimo', color: 'text-green-400' },
    { id: 'neutral', icon: Meh, label: 'Normal', color: 'text-yellow-400' },
    { id: 'sad', icon: Frown, label: 'Difícil', color: 'text-red-400' }
  ];

  const meals = [
    'Smoothie da manhã',
    'Almoço',
    'Smoothie da tarde',
    'Jantar'
  ];

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!user || !userData) return;
    
    setIsSubmitting(true);
    
    try {
      const points = calculatePoints();
      
      // Salvar check-in no Supabase
      const { error: checkinError } = await userService.addCheckin(
        user.id,
        userData.currentDay,
        weight,
        points
      );
      
      if (checkinError) {
        console.error('Erro ao salvar check-in:', checkinError);
        setIsSubmitting(false);
        return;
      }
      
      // Atualizar perfil do usuário
      const nextDay = userData.currentDay < 21 ? userData.currentDay + 1 : userData.currentDay;
      const { error: profileError } = await userService.updateProfile(user.id, {
        current_weight: weight,
        total_points: userData.totalPoints + points,
        streak: userData.streak + 1,
        current_day: nextDay
      });
      
      if (profileError) {
        console.error('Erro ao atualizar perfil:', profileError);
      }
      
      // Atualizar estado local
      const newCheckin = {
        id: Date.now().toString(),
        day: userData.currentDay,
        date: new Date().toISOString().split('T')[0],
        weight,
        energyLevel: mood === 'happy' ? 8 : mood === 'neutral' ? 6 : 4,
        feeling: mood,
        photoUrl: photo || undefined,
        smoothieCompleted,
        mealsCompleted,
        completed: true
      };
      
      updateUserData({
        currentWeight: weight,
        checkins: [...userData.checkins, newCheckin],
        totalPoints: userData.totalPoints + points,
        streak: userData.streak + 1,
        currentDay: nextDay
      });
      
      // Show success popup
      setSuccessData({
        points,
        nextDay,
        isComplete: userData.currentDay >= 21
      });
      setShowSuccessPopup(true);
      
      // Auto close popup after 4 seconds
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 4000);
      
    } catch (error) {
      console.error('Erro no check-in:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculatePoints = () => {
    let points = 10; // Base points for check-in
    if (photo) points += 5;
    if (smoothieCompleted) points += 10;
    points += mealsCompleted * 5;
    return points;
  };

  const todayCheckin = userData.checkins.find(c => c.day === userData.currentDay);
  
  if (todayCheckin) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4">
        <div className="max-w-md mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-gray-900" />
            </div>
            <h1 className="text-2xl font-bold text-green-400">
              Check-in Completo!
            </h1>
            <p className="text-gray-300">
              Você já fez seu check-in hoje. Volte amanhã!
            </p>
          </div>

          <div className="bg-gray-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">Resumo de Hoje</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{todayCheckin.weight}kg</div>
                <div className="text-gray-400 text-sm">Peso</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {todayCheckin.smoothieCompleted ? '✅' : '❌'}
                </div>
                <div className="text-gray-400 text-sm">Smoothie</div>
              </div>
            </div>

            {todayCheckin.photoUrl && (
              <div className="space-y-2">
                <div className="text-sm text-gray-400">Sua foto de hoje:</div>
                <img 
                  src={todayCheckin.photoUrl} 
                  alt="Check-in" 
                  className="w-full h-32 object-cover rounded-xl"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-green-400">
            Check-in Diário
          </h1>
          <p className="text-gray-300">
            Dia {userData.currentDay} de 21
          </p>
        </div>

        {/* Weight */}
        <div className="bg-gray-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center space-x-2">
            <Scale className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-bold text-white">Peso de Hoje</h3>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setWeight(prev => Math.max(prev - 0.1, 30))}
              className="w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-xl flex items-center justify-center text-white font-bold text-xl"
            >
              -
            </button>
            
            <div className="flex-1 text-center">
              <input
                type="number"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value ? parseFloat(e.target.value) : 0)}
                className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 text-center text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <div className="text-gray-400 text-sm mt-1">kg</div>
            </div>
            
            <button
              onClick={() => setWeight(prev => prev + 0.1)}
              className="w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-xl flex items-center justify-center text-white font-bold text-xl"
            >
              +
            </button>
          </div>

          {weight !== userData.currentWeight && (
            <div className="text-center">
              <div className={`text-sm font-medium ${
                weight < userData.currentWeight ? 'text-green-400' : 'text-red-400'
              }`}>
                {weight < userData.currentWeight ? '📉' : '📈'} 
                {' '}{Math.abs(weight - userData.currentWeight).toFixed(1)}kg
              </div>
            </div>
          )}
        </div>

        {/* Mood */}
        <div className="bg-gray-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-pink-400" />
            <h3 className="text-lg font-bold text-white">Como você se sente?</h3>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {moods.map((moodOption) => {
              const Icon = moodOption.icon;
              const isSelected = mood === moodOption.id;
              
              return (
                <button
                  key={moodOption.id}
                  onClick={() => setMood(moodOption.id as any)}
                  className={`
                    p-4 rounded-xl border transition-all duration-200
                    ${isSelected 
                      ? 'bg-green-400/10 border-green-400/30 scale-105' 
                      : 'bg-gray-700 border-gray-600 hover:bg-gray-600'
                    }
                  `}
                >
                  <Icon className={`w-8 h-8 mx-auto mb-2 ${isSelected ? 'text-green-400' : moodOption.color}`} />
                  <div className={`text-sm font-medium ${isSelected ? 'text-green-400' : 'text-gray-300'}`}>
                    {moodOption.label}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Meals Completed */}
        <div className="bg-gray-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-white">Refeições de Hoje</h3>
          
          <div className="space-y-3">
            {meals.map((meal, index) => {
              const isCompleted = index === 0 ? smoothieCompleted : index < mealsCompleted + 1;
              
              return (
                <button
                  key={index}
                  onClick={() => {
                    if (index === 0) {
                      setSmoothieCompleted(!smoothieCompleted);
                    } else {
                      setMealsCompleted(isCompleted ? index - 1 : index);
                    }
                  }}
                  className={`
                    w-full p-3 rounded-xl border transition-all duration-200 flex items-center space-x-3
                    ${isCompleted 
                      ? 'bg-green-400/10 border-green-400/30 text-green-400' 
                      : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                    }
                  `}
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    isCompleted ? 'border-green-400 bg-green-400' : 'border-gray-500'
                  }`}>
                    {isCompleted && <Check className="w-4 h-4 text-gray-900" />}
                  </div>
                  <span className="font-medium">{meal}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Photo Upload */}
        <div className="bg-gray-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center space-x-2">
            <Camera className="w-5 h-5 text-green-400" />
            <h3 className="text-lg font-bold text-white">Foto do Smoothie</h3>
            <span className="text-xs text-gray-400">(+5 pontos)</span>
          </div>
          
          {photo ? (
            <div className="space-y-3">
              <img src={photo} alt="Smoothie" className="w-full h-32 object-cover rounded-xl" />
              <button
                onClick={() => setPhoto(null)}
                className="w-full py-2 text-red-400 hover:text-red-300 transition-colors"
              >
                Remover foto
              </button>
            </div>
          ) : (
            <label className="block">
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-green-400 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <div className="text-gray-400">Toque para adicionar foto</div>
              </div>
            </label>
          )}
        </div>

        {/* Points Preview */}
        <div className="bg-gradient-to-r from-yellow-400/10 to-orange-400/10 border border-yellow-400/30 rounded-2xl p-4">
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-yellow-400">
              +{calculatePoints()} pontos
            </div>
            <div className="text-gray-300 text-sm">
              Você ganhará estes pontos com este check-in
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-green-400 text-gray-900 py-4 rounded-xl font-bold hover:bg-green-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Salvando...' : 'Finalizar Check-in'}
        </button>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-sm w-full text-center animate-pulse">
            <div className="mb-6">
              {successData.isComplete ? (
                <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              ) : (
                <Gift className="w-16 h-16 text-green-400 mx-auto mb-4" />
              )}
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-4">
              {successData.isComplete ? '🎉 Parabéns!' : '✅ Check-in Realizado!'}
            </h3>
            
            <div className="text-green-400 text-xl font-bold mb-4">
              +{successData.points} pontos ganhos!
            </div>
            
            <div className="text-gray-300 mb-6">
              {successData.isComplete ? (
                'Você completou todos os 21 dias do desafio! 🏆'
              ) : (
                `Avançando para o Dia ${successData.nextDay}! 🚀`
              )}
            </div>
            
            <button
              onClick={() => setShowSuccessPopup(false)}
              className="bg-green-400 text-gray-900 px-6 py-2 rounded-xl font-bold hover:bg-green-300 transition-colors"
            >
              Continuar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckIn;