import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Check, Target, Heart, Scale, User, AlertTriangle, Zap } from 'lucide-react';
import { UserData } from '../../App';

interface OnboardingProps {
  userData: UserData | null;
  updateUserData: (data: Partial<UserData>) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ userData, updateUserData }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: userData?.name || '',
    age: userData?.age || '',
    height: userData?.height || '',
    initialWeight: userData?.initialWeight || '',
    targetWeight: userData?.targetWeight || '',
    eatingHabits: userData?.eatingHabits || [],
    goals: userData?.goals || []
  });

  const steps = [
    'welcome',
    'phases',
    'personal-info',
    'goals',
    'habits',
    'disclaimer',
    'tutorial'
  ];

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      const initialWeight = Number(formData.initialWeight) || undefined;
      await updateUserData({
        hasCompletedOnboarding: true,
        currentDay: 1,
        startDate: new Date().toISOString().split('T')[0],
        name: formData.name,
        age: Number(formData.age) || undefined,
        height: Number(formData.height) || undefined,
        initialWeight: initialWeight,
        currentWeight: initialWeight, // Define peso atual igual ao peso inicial
        targetWeight: Number(formData.targetWeight) || undefined,
        eatingHabits: formData.eatingHabits,
        goals: formData.goals
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderStep = () => {
    switch (steps[currentStep]) {
      case 'welcome':
        return <WelcomeStep />;
      case 'phases':
        return <PhasesStep />;
      case 'personal-info':
        return <PersonalInfoStep formData={formData} updateFormData={updateFormData} />;
      case 'goals':
        return <GoalsStep formData={formData} updateFormData={updateFormData} />;
      case 'habits':
        return <HabitsStep formData={formData} updateFormData={updateFormData} />;
      case 'disclaimer':
        return <DisclaimerStep />;
      case 'tutorial':
        return <TutorialStep />;
      default:
        return <WelcomeStep />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="max-w-md mx-auto min-h-screen flex flex-col">
        {/* Progress Bar */}
        <div className="p-4">
          <div className="flex justify-between text-xs text-gray-800 mb-2">
            <span>Passo {currentStep + 1} de {steps.length}</span>
            <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-pink-500 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        <div className="flex-1 px-4 py-6">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="p-4 flex justify-between space-x-4">
          {currentStep > 0 && (
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 px-6 py-3 bg-purple-100 hover:bg-purple-200 text-purple-500 rounded-xl transition-all duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Voltar</span>
            </button>
          )}
          
          <button
            onClick={handleNext}
            className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-all duration-200 font-bold"
          >
            <span>{currentStep === steps.length - 1 ? 'Começar Desafio!' : 'Continuar'}</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Welcome Step Component
const WelcomeStep: React.FC = () => (
  <div className="text-center">
    <img 
          src="https://i.imgur.com/Bz1fya1.png" 
          alt="Secando com Smoothies Logo" 
          className="w-[300px] h-[300px] object-contain mx-auto"
        />
    <p className="text-xl text-gray-800">
      Secar e Desinchar com Smoothies
    </p>

    <div className="bg-purple-100 rounded-2xl p-6 space-y-4">
      <h2 className="text-xl font-bold text-purple-500">
        Transforme seu corpo em 21 dias!
      </h2>
      <div className="space-y-3 text-gray-800">
        <div className="flex items-center space-x-3">
          <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
          <span>Elimine toxinas e reduza o inchaço</span>
        </div>
        <div className="flex items-center space-x-3">
          <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
          <span>Acelere seu metabolismo naturalmente</span>
        </div>
        <div className="flex items-center space-x-3">
          <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
          <span>Crie hábitos saudáveis duradouros</span>
        </div>
        <div className="flex items-center space-x-3">
          <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
          <span>Receitas deliciosas e nutritivas</span>
        </div>
      </div>
    </div>

    <p className="text-gray-800 text-sm leading-relaxed">
      Vamos começar sua jornada de transformação com um método comprovado 
      que combina nutrição, praticidade e resultados reais.
    </p>
  </div>
);

// Phases Step Component
const PhasesStep: React.FC = () => (
  <div className="space-y-6">
    <div className="text-center space-y-2">
      <h2 className="text-2xl font-bold text-gray-800">
        As 3 Fases do Desafio
      </h2>
      <p className="text-gray-800">
        Cada fase foi cuidadosamente planejada para maximizar seus resultados
      </p>
    </div>

    <div className="space-y-4">
      {/* Phase 1 */}
      <div className="bg-green-100 border border-green-300 rounded-2xl p-6 space-y-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
            1
          </div>
          <div>
            <h3 className="text-lg font-bold text-green-500">Desinchar</h3>
            <p className="text-sm text-gray-800">Dias 1-7</p>
          </div>
        </div>
        <p className="text-gray-800 text-sm leading-relaxed">
          Smoothies detox + refeições leves para eliminar toxinas, 
          reduzir o inchaço e preparar seu corpo para a transformação.
        </p>
      </div>

      {/* Phase 2 */}
      <div className="bg-orange-100 border border-orange-300 rounded-2xl p-6 space-y-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
            2
          </div>
          <div>
            <h3 className="text-lg font-bold text-orange-500">Queima</h3>
            <p className="text-sm text-gray-800">Dias 8-14</p>
          </div>
        </div>
        <p className="text-gray-800 text-sm leading-relaxed">
          Smoothies mais proteicos + refeições equilibradas para 
          acelerar o metabolismo e potencializar a queima de gordura.
        </p>
      </div>

      {/* Phase 3 */}
      <div className="bg-purple-100 border border-purple-300 rounded-2xl p-6 space-y-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
            3
          </div>
          <div>
            <h3 className="text-lg font-bold text-purple-500">Definição</h3>
            <p className="text-sm text-gray-800">Dias 15-21</p>
          </div>
        </div>
        <p className="text-gray-800 text-sm leading-relaxed">
          Smoothies estratégicos + refeições completas para 
          consolidar os resultados e criar hábitos duradouros.
        </p>
      </div>
    </div>
  </div>
);

// Personal Info Step Component
const PersonalInfoStep: React.FC<{
  formData: any;
  updateFormData: (field: string, value: any) => void;
}> = ({ formData, updateFormData }) => (
  <div className="space-y-6">
    <div className="text-center space-y-2">
      <User className="w-12 h-12 text-green-500 mx-auto" />
      <h2 className="text-2xl font-bold text-gray-800">
        Vamos nos conhecer!
      </h2>
      <p className="text-gray-800">
        Essas informações nos ajudam a personalizar sua experiência
      </p>
    </div>

    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-800">Nome</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => updateFormData('name', e.target.value)}
          className="w-full bg-white border border-gray-300 text-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          placeholder="Seu nome completo"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-800">Idade</label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => updateFormData('age', e.target.value ? parseInt(e.target.value) : '')}
            className="w-full bg-white border border-gray-300 text-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Anos"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-800">Altura (cm)</label>
          <input
            type="number"
            value={formData.height}
            onChange={(e) => updateFormData('height', e.target.value ? parseInt(e.target.value) : '')}
            className="w-full bg-white border border-gray-300 text-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="165"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-800">Peso Atual (kg)</label>
          <input
            type="number"
            step="0.1"
            value={formData.initialWeight}
            onChange={(e) => updateFormData('initialWeight', e.target.value ? parseFloat(e.target.value) : '')}
            className="w-full bg-white border border-gray-300 text-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="70.0"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-800">Meta (kg) - Opcional</label>
          <input
            type="number"
            step="0.1"
            value={formData.targetWeight}
            onChange={(e) => updateFormData('targetWeight', e.target.value ? parseFloat(e.target.value) : '')}
            className="w-full bg-white border border-gray-300 text-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="65.0"
          />
        </div>
      </div>
    </div>
  </div>
);

// Goals Step Component
const GoalsStep: React.FC<{
  formData: any;
  updateFormData: (field: string, value: any) => void;
}> = ({ formData, updateFormData }) => {
  const goals = [
    { id: 'perder-peso', label: 'Perder peso', icon: Scale },
    { id: 'mais-energia', label: 'Ter mais energia', icon: Zap },
    { id: 'desinchar', label: 'Reduzir inchaço', icon: Heart },
    { id: 'habitos-saudaveis', label: 'Criar hábitos saudáveis', icon: Target }
  ];

  const toggleGoal = (goalId: string) => {
    const currentGoals = formData.goals || [];
    const newGoals = currentGoals.includes(goalId)
      ? currentGoals.filter((g: string) => g !== goalId)
      : [...currentGoals, goalId];
    updateFormData('goals', newGoals);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <Target className="w-12 h-12 text-green-400 mx-auto" />
        <h2 className="text-2xl font-bold text-gray-800">
        Quais são seus objetivos?
      </h2>
      <p className="text-gray-800">
        Selecione todos que se aplicam a você
      </p>
      </div>

      <div className="space-y-3">
        {goals.map((goal) => {
          const Icon = goal.icon;
          const isSelected = formData.goals?.includes(goal.id);
          
          return (
            <button
              key={goal.id}
              onClick={() => toggleGoal(goal.id)}
              className={`
                w-full p-4 rounded-xl border transition-all duration-200 text-left
                ${isSelected 
                  ? 'bg-green-100 border-green-300 text-green-600' 
                  : 'bg-white border-gray-300 text-gray-800 hover:bg-gray-50'
                }
              `}
            >
              <div className="flex items-center space-x-3">
                <Icon className="w-6 h-6" />
                <span className="font-medium">{goal.label}</span>
                {isSelected && <Check className="w-5 h-5 ml-auto" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Habits Step Component
const HabitsStep: React.FC<{
  formData: any;
  updateFormData: (field: string, value: any) => void;
}> = ({ formData, updateFormData }) => {
  const habits = [
    { id: 'vegetariana', label: 'Vegetariana' },
    { id: 'vegana', label: 'Vegana' },
    { id: 'sem-lactose', label: 'Sem lactose' },
    { id: 'sem-gluten', label: 'Sem glúten' },
    { id: 'low-carb', label: 'Low carb' },
    { id: 'nenhuma', label: 'Nenhuma restrição' }
  ];

  const toggleHabit = (habitId: string) => {
    const currentHabits = formData.eatingHabits || [];
    const newHabits = currentHabits.includes(habitId)
      ? currentHabits.filter((h: string) => h !== habitId)
      : [...currentHabits, habitId];
    updateFormData('eatingHabits', newHabits);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <Heart className="w-12 h-12 text-green-400 mx-auto" />
        <h2 className="text-2xl font-bold text-gray-800">
        Hábitos alimentares
      </h2>
      <p className="text-gray-800">
        Isso nos ajuda a sugerir as melhores receitas para você
      </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {habits.map((habit) => {
          const isSelected = formData.eatingHabits?.includes(habit.id);
          
          return (
            <button
              key={habit.id}
              onClick={() => toggleHabit(habit.id)}
              className={`
                p-4 rounded-xl border transition-all duration-200 text-center
                ${isSelected 
                  ? 'bg-green-100 border-green-300 text-green-600' 
                  : 'bg-white border-gray-300 text-gray-800 hover:bg-gray-50'
                }
              `}
            >
              <div className="space-y-2">
                <span className="font-medium text-sm">{habit.label}</span>
                {isSelected && <Check className="w-4 h-4 mx-auto" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Disclaimer Step Component
const DisclaimerStep: React.FC = () => (
  <div className="space-y-6">
    <div className="text-center space-y-2">
      <AlertTriangle className="w-12 h-12 text-yellow-400 mx-auto" />
      <h2 className="text-2xl font-bold text-gray-800">
        Importante!
      </h2>
    </div>

    <div className="bg-yellow-100 border border-yellow-300 rounded-2xl p-6 space-y-4">
      <div className="space-y-3 text-gray-800 text-sm leading-relaxed">
        <p>
          <strong className="text-yellow-600">Este programa não substitui</strong> o acompanhamento 
          médico ou nutricional profissional.
        </p>
        <p>
          Se você tem alguma condição de saúde, está grávida, amamentando ou 
          toma medicamentos, consulte seu médico antes de iniciar.
        </p>
        <p>
          Os resultados podem variar de pessoa para pessoa. Este é um programa 
          educativo focado em hábitos saudáveis.
        </p>
      </div>
    </div>

    <div className="bg-green-100 border border-green-300 rounded-2xl p-6 space-y-3">
      <h3 className="text-lg font-bold text-green-600">
        Nosso compromisso com você:
      </h3>
      <div className="space-y-2 text-gray-800 text-sm">
        <div className="flex items-center space-x-2">
          <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
          <span>Receitas balanceadas e nutritivas</span>
        </div>
        <div className="flex items-center space-x-2">
          <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
          <span>Orientações baseadas em evidências</span>
        </div>
        <div className="flex items-center space-x-2">
          <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
          <span>Suporte durante toda a jornada</span>
        </div>
      </div>
    </div>
  </div>
);

// Tutorial Step Component
const TutorialStep: React.FC = () => (
  <div className="space-y-6">
    <div className="text-center space-y-2">
      <Zap className="w-12 h-12 text-green-400 mx-auto" />
      <h2 className="text-2xl font-bold text-gray-800">
        Como usar o app
      </h2>
      <p className="text-gray-800">
        Tutorial rápido para você aproveitar ao máximo
      </p>
    </div>

    <div className="space-y-4">
      <div className="bg-white border border-gray-300 rounded-2xl p-4 flex items-center space-x-4">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
          1
        </div>
        <div>
          <h3 className="font-bold text-gray-800">Dashboard</h3>
          <p className="text-gray-800 text-sm">Veja seu progresso e o smoothie do dia</p>
        </div>
      </div>

      <div className="bg-white border border-gray-300 rounded-2xl p-4 flex items-center space-x-4">
        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
          2
        </div>
        <div>
          <h3 className="font-bold text-gray-800">Check-in Diário</h3>
          <p className="text-gray-800 text-sm">Registre peso, foto e como se sente</p>
        </div>
      </div>

      <div className="bg-white border border-gray-300 rounded-2xl p-4 flex items-center space-x-4">
        <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
          3
        </div>
        <div>
          <h3 className="font-bold text-gray-800">Receitas</h3>
          <p className="text-gray-800 text-sm">Acesse todas as receitas organizadas por fase</p>
        </div>
      </div>

      <div className="bg-white border border-gray-300 rounded-2xl p-4 flex items-center space-x-4">
        <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
          4
        </div>
        <div>
          <h3 className="font-bold text-gray-800">Lista de Compras</h3>
          <p className="text-gray-800 text-sm">Lista automática dos ingredientes da semana</p>
        </div>
      </div>
    </div>

    <div className="bg-gradient-to-r from-green-100 to-pink-100 border border-green-300 rounded-2xl p-6 text-center">
      <h3 className="text-lg font-bold text-gray-800 mb-2">
        Pronto para começar? 🚀
      </h3>
      <p className="text-gray-800 text-sm">
        Sua jornada de transformação está prestes a começar!
      </p>
    </div>
  </div>
);

export default Onboarding;