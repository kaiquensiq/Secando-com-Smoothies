import React, { useState } from 'react';
import { Camera, Upload, Scale, Heart, Smile, Meh, Frown, Check, Trophy, Gift } from 'lucide-react';
import Confetti from 'react-confetti';
import { UserData } from '../../App';
import { useAuth } from '../../contexts/AuthContext';
import { userService } from '../../lib/supabase';

interface CheckInProps {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
}

const CheckIn: React.FC<CheckInProps> = ({ userData, updateUserData }) => {
  const { user } = useAuth();
  const [weight, setWeight] = useState(userData.currentWeight || 70);
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
    console.log('🚀 Iniciando handleSubmit');
    
    if (!user || !userData) {
      console.error('❌ Usuário ou dados não encontrados:', { user: !!user, userData: !!userData });
      return;
    }
    
    console.log('📊 Dados do usuário:', { userId: user.id, currentDay: userData.currentDay, weight });
    setIsSubmitting(true);
    
    try {
      const points = calculatePoints();
      console.log('🎯 Pontos calculados:', points);
      
      // Salvar check-in no Supabase
      console.log('💾 Salvando check-in...');
      const { error: checkinError } = await userService.addCheckin(
        user.id,
        userData.currentDay,
        weight,
        points
      );
      
      if (checkinError) {
        console.error('❌ Erro ao salvar check-in:', checkinError);
        alert('Erro ao salvar check-in. Tente novamente.');
        return;
      }
      console.log('✅ Check-in salvo com sucesso');
      
      // Atualizar perfil do usuário
      const nextDay = userData.currentDay < 21 ? userData.currentDay + 1 : userData.currentDay;
      console.log('👤 Atualizando perfil...', { nextDay, totalPoints: userData.totalPoints + points });
      
      const { error: profileError } = await userService.updateProfile(user.id, {
        current_weight: weight,
        total_points: userData.totalPoints + points,
        streak: userData.streak + 1,
        current_day: nextDay
      });
      
      if (profileError) {
        console.error('❌ Erro ao atualizar perfil:', profileError);
        alert('Erro ao atualizar perfil. Tente novamente.');
        return;
      }
      console.log('✅ Perfil atualizado com sucesso');
      
      // Atualizar estado local
      console.log('🔄 Atualizando estado local...');
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
      console.log('📝 Novo check-in criado:', newCheckin);

      console.log('🔄 Chamando updateUserData...');
      updateUserData({
        currentWeight: weight,
        checkins: [...userData.checkins, newCheckin],
        totalPoints: userData.totalPoints + points,
        streak: userData.streak + 1,
        currentDay: nextDay
      });
      console.log('✅ Estado local atualizado');

      // Show success popup
      console.log('🎉 Exibindo popup de sucesso...');
      setSuccessData({
        points,
        nextDay,
        isComplete: userData.currentDay >= 21
      });
      setShowSuccessPopup(true);
      console.log('✅ Popup de sucesso exibido');

      // Auto close popup after 5 seconds and redirect
      console.log('⏰ Configurando timer para fechar popup...');
      setTimeout(() => {
        console.log('⏰ Timer executado, fechando popup...');
        handleCloseSuccessPopup();
      }, 5000);
      console.log('✅ handleSubmit concluído com sucesso');
      
    } catch (error) {
      console.error('❌ Erro inesperado no check-in:', error);
      console.error('❌ Stack trace:', error.stack);
      alert('Erro inesperado. Tente novamente.');
    } finally {
      console.log('🔄 Resetando estado isSubmitting...');
      setIsSubmitting(false);
      console.log('✅ Estado resetado, botão deve estar habilitado novamente');
    }
  };

  const calculatePoints = () => {
    let points = 10; // Base points for check-in
    if (photo) points += 5;
    if (smoothieCompleted) points += 10;
    points += mealsCompleted * 5;
    return points;
  };

  const areAllMealsCompleted = () => {
    // Verifica se o smoothie está completo e se todas as 3 outras refeições estão completas
    return smoothieCompleted && mealsCompleted >= 3;
  };

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
    
    // Se não completou todos os 21 dias, redireciona para o dashboard/home
    // O redirecionamento será automático pois o currentDay já foi atualizado
    // e o componente será re-renderizado mostrando o novo dia
    if (!successData.isComplete) {
      // Força uma atualização do estado para garantir que a interface reflita o novo dia
      window.location.reload();
    }
  };

  const todayCheckin = userData.checkins.find(c => c.day === userData.currentDay);
  
  if (todayCheckin) {
    return (
      <div className="min-h-screen bg-white text-gray-900 p-4">
        <div className="max-w-md mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-gray-900" />
            </div>
            <h1 className="text-2xl font-bold text-green-400">
              Check-in Completo!
            </h1>
            <p className="text-gray-800">
              Você já fez seu check-in hoje. Volte amanhã!
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 space-y-4 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">Resumo de Hoje</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{todayCheckin.weight}kg</div>
        <div className="text-gray-800 text-sm">Peso</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {todayCheckin.smoothieCompleted ? '✅' : '❌'}
                </div>
                <div className="text-gray-800 text-sm">Smoothie</div>
              </div>
            </div>

            {todayCheckin.photoUrl && (
              <div className="space-y-2">
                <div className="text-sm text-gray-800">Sua foto de hoje:</div>
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
    <div className="min-h-screen bg-white text-gray-900 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-green-400">
            Check-in Diário
          </h1>
          <p className="text-gray-800">
            Dia {userData.currentDay} de 21
          </p>
        </div>

        {/* Weight */}
        <div className="bg-gray-50 rounded-2xl p-6 space-y-4 border border-gray-200">
          <div className="flex items-center space-x-2">
            <Scale className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-bold text-gray-900">Peso de Hoje</h3>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setWeight(prev => Math.max(prev - 0.1, 30))}
              className="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-xl flex items-center justify-center text-gray-900 font-bold text-xl"
            >
              -
            </button>
            
            <div className="flex-1 text-center">
              <input
                type="number"
                step="0.1"
                value={weight || ''}
                onChange={(e) => setWeight(e.target.value ? parseFloat(e.target.value) : 0)}
                className="w-full bg-white border border-gray-300 text-gray-900 rounded-xl px-4 py-3 text-center text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="text-gray-800 text-sm mt-1">kg</div>
            </div>
            
            <button
              onClick={() => setWeight(prev => prev + 0.1)}
              className="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-xl flex items-center justify-center text-gray-900 font-bold text-xl"
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
        <div className="bg-gray-50 rounded-2xl p-6 space-y-4 border border-gray-200">
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-pink-500" />
            <h3 className="text-lg font-bold text-gray-900">Como você se sente?</h3>
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
                      ? 'bg-green-100 border-green-300 scale-105' 
                      : 'bg-white border-gray-300 hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon className={`w-8 h-8 mx-auto mb-2 ${isSelected ? 'text-green-400' : moodOption.color}`} />
                  <div className={`text-sm font-medium ${isSelected ? 'text-green-600' : 'text-gray-800'}`}>
                    {moodOption.label}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Meals Completed */}
        <div className="bg-gray-50 rounded-2xl p-6 space-y-4 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Refeições de Hoje</h3>
          
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
                      ? 'bg-green-100 border-green-300 text-green-600' 
                      : 'bg-white border-gray-300 text-gray-800 hover:bg-gray-50'
                    }
                  `}
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    isCompleted ? 'border-green-500 bg-green-500' : 'border-gray-400'
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
        <div className="bg-gray-50 rounded-2xl p-6 space-y-4 border border-gray-200">
          <div className="flex items-center space-x-2">
            <Camera className="w-5 h-5 text-green-500" />
            <h3 className="text-lg font-bold text-gray-900">Foto do Smoothie</h3>
            <span className="text-xs text-gray-800">(+5 pontos)</span>
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
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-500 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                <div className="text-gray-800">Toque para adicionar foto</div>
              </div>
            </label>
          )}
        </div>

        {/* Points Preview */}
        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-300 rounded-2xl p-4">
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-yellow-600">
              +{calculatePoints()} pontos
            </div>
            <div className="text-gray-800 text-sm">
              Você ganhará estes pontos com este check-in
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="space-y-3">
          {!areAllMealsCompleted() && (
            <div className="bg-yellow-100 border border-yellow-300 rounded-xl p-4 text-center">
              <div className="text-yellow-600 text-sm font-medium">
                ⚠️ Complete todas as refeições para finalizar o check-in
              </div>
            </div>
          )}
          
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !areAllMealsCompleted()}
            className={`w-full py-4 rounded-xl font-bold transition-all duration-200 ${
              areAllMealsCompleted() && !isSubmitting
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? 'Salvando...' : areAllMealsCompleted() ? 'Finalizar Check-in' : 'Complete todas as refeições'}
          </button>
        </div>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <>
          {/* Confetti Effect */}
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={200}
            gravity={0.3}
          />
          
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center animate-bounce border border-gray-200 shadow-2xl">
              <div className="mb-6">
                {successData.isComplete ? (
                  <div className="relative">
                    <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4 animate-pulse" />
                    <div className="absolute -top-2 -right-2 text-2xl animate-bounce">🎉</div>
                  </div>
                ) : (
                  <div className="relative">
                    <Gift className="w-20 h-20 text-green-500 mx-auto mb-4 animate-pulse" />
                    <div className="absolute -top-2 -right-2 text-2xl animate-bounce">✨</div>
                  </div>
                )}
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                {successData.isComplete ? '🎉 PARABÉNS! 🎉' : '✅ INCRÍVEL!'}
              </h3>
              
              <div className="text-green-600 text-2xl font-bold mb-4 animate-pulse">
                +{successData.points} pontos ganhos!
              </div>
              
              <div className="text-gray-800 mb-6 text-lg">
                {successData.isComplete ? (
                  <div className="space-y-2">
                    <div>🏆 Você completou todos os 21 dias!</div>
                    <div className="text-sm text-gray-600">Sua transformação foi incrível!</div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div>🚀 Check-in do Dia {userData.currentDay} completo!</div>
                    <div className="text-sm text-gray-600">Avançando para o Dia {successData.nextDay}</div>
                  </div>
                )}
              </div>
              
              <button
                 onClick={handleCloseSuccessPopup}
                 className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-xl font-bold hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
               >
                 {successData.isComplete ? '🎊 Finalizar Desafio' : '🌟 Continuar Jornada'}
               </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckIn;