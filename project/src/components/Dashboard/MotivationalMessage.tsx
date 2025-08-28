import React from 'react';
import { Heart, Star, Trophy } from 'lucide-react';

interface MotivationalMessageProps {
  currentDay: number;
}

const MotivationalMessage: React.FC<MotivationalMessageProps> = ({ currentDay }) => {
  const getMotivationalMessage = (day: number) => {
    if (day <= 3) return {
      icon: Star,
      title: "Você começou! 🌟",
      message: "Os primeiros dias são os mais importantes. Seu corpo está se adaptando às mudanças positivas!",
      color: "green"
    };
    if (day <= 7) return {
      icon: Trophy,
      title: "Primeira semana! 🏆",
      message: "Incrível! Você já está desintoxicando e seu metabolismo está acelerando.",
      color: "yellow"
    };
    if (day <= 14) return {
      icon: Heart,
      title: "Na metade! 💪",
      message: "Você está no meio da jornada e os resultados já começaram a aparecer. Continue firme!",
      color: "pink"
    };
    return {
      icon: Trophy,
      title: "Reta final! 🔥",
      message: "Faltam poucos dias! Você está definindo seu corpo e criando hábitos saudáveis para a vida.",
      color: "green"
    };
  };

  const { icon: Icon, title, message, color } = getMotivationalMessage(currentDay);
  
  const colorClasses = {
    green: 'border-green-400/30 bg-green-400/10 text-green-400',
    yellow: 'border-yellow-400/30 bg-yellow-400/10 text-yellow-400',
    pink: 'border-pink-400/30 bg-pink-400/10 text-pink-400'
  };

  return (
    <div className={`rounded-2xl border p-6 text-center space-y-3 ${colorClasses[color as keyof typeof colorClasses]}`}>
      <Icon className="w-8 h-8 mx-auto" />
      <h3 className="text-lg font-bold">
        {title}
      </h3>
      <p className="text-gray-800 text-sm leading-relaxed">
        {message}
      </p>
    </div>
  );
};

export default MotivationalMessage;