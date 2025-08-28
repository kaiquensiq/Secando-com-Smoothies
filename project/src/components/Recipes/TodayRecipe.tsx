import React, { useState } from 'react';
import { Clock, Flame, Star, ChevronDown, ChevronUp, Zap } from 'lucide-react';
import { Recipe } from './recipesData';
import { getSmoothiesForDay, getDayMealPlan } from './mealPlanData';

interface TodayRecipeProps {
  recipe?: Recipe;
  currentDay: number;
}

const TodayRecipe: React.FC<TodayRecipeProps> = ({ recipe, currentDay }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Get smoothies from meal plan data
  const smoothiesFromMealPlan = getSmoothiesForDay(currentDay);
  const dayPlan = getDayMealPlan(currentDay);
  
  // Use meal plan smoothie if available, otherwise fallback to recipe prop
  const todaySmoothie = smoothiesFromMealPlan.length > 0 ? smoothiesFromMealPlan[0] : null;
  const recipeToShow = recipe;

  const difficultyColors = {
    'Fácil': 'text-green-400',
    'Médio': 'text-yellow-400',
    'Difícil': 'text-red-400'
  };

  const phaseColors = {
    'Desintoxicação': 'bg-green-400/20 text-green-400',
    'Aceleração': 'bg-orange-400/20 text-orange-400',
    'Definição': 'bg-purple-400/20 text-purple-400'
  };
  
  // If we have a smoothie from meal plan, show that instead
  if (todaySmoothie && dayPlan) {
    return (
      <div className="bg-gradient-to-r from-green-400/10 to-pink-400/10 rounded-2xl border border-green-400/30 overflow-hidden">
        {/* Header */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-bold text-sm uppercase tracking-wider">
                Smoothie de Hoje
              </span>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-bold ${phaseColors[dayPlan.phase]}`}>
              {dayPlan.phase}
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">
              {todaySmoothie.name}
            </h2>
            <p className="text-gray-800 leading-relaxed">
              Smoothie especialmente selecionado para o dia {currentDay} da sua jornada
            </p>
          </div>

          {/* Recipe Stats */}
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span className="text-gray-800">5-10 min</span>
            </div>
            <div className="flex items-center space-x-2">
              <Flame className="w-4 h-4 text-orange-400" />
              <span className="text-gray-800">{todaySmoothie.calories || 'N/A'} kcal</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-green-400" />
              <span className="text-green-400">Fácil</span>
            </div>
          </div>
        </div>

        {/* Expandable Content */}
        <div className="border-t border-gray-700">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full p-4 flex items-center justify-between text-gray-900 hover:bg-gray-100/50 transition-colors"
          >
            <span className="font-medium">Ver Ingredientes e Preparo</span>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-green-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-green-400" />
            )}
          </button>

          {isExpanded && (
            <div className="p-6 bg-gray-100/30 space-y-6">
              {/* Ingredients */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  Ingredientes
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {todaySmoothie.items.map((ingredient, index) => (
                    <div key={index} className="flex items-center space-x-3 p-2 bg-gray-700/50 rounded-lg">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-gray-800">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructions */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Modo de Preparo</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-gray-700/50 rounded-lg">
                    <div className="w-6 h-6 bg-green-400 text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <span className="text-gray-800">Adicione todos os ingredientes no liquidificador</span>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-gray-700/50 rounded-lg">
                    <div className="w-6 h-6 bg-green-400 text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <span className="text-gray-800">Bata por 1-2 minutos até ficar homogêneo</span>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-gray-700/50 rounded-lg">
                    <div className="w-6 h-6 bg-green-400 text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <span className="text-gray-800">Sirva imediatamente e aproveite!</span>
                  </div>
                </div>
              </div>

              {/* Tip */}
              <div className="bg-green-400/10 border border-green-400/30 rounded-xl p-4">
                <div className="text-green-400 font-bold mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Dica Especial
                </div>
                <div className="text-gray-800 text-sm">
                  Este smoothie foi especialmente selecionado para o dia {currentDay} da Fase 1. 
                  Consuma conforme indicado no seu plano alimentar para melhores resultados!
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  // Fallback to original recipe display if no meal plan smoothie
  if (!recipeToShow) {
    return (
      <div className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-200">
          <h3 className="text-gray-900 text-lg font-semibold mb-2">Nenhum smoothie disponível</h3>
        <p className="text-gray-400">Não há smoothie programado para hoje.</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-green-400/10 to-pink-400/10 rounded-2xl border border-green-400/30 overflow-hidden">
      {/* Header */}
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 font-bold text-sm uppercase tracking-wider">
              Smoothie de Hoje
            </span>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-bold ${recipe.phase in phaseColors ? phaseColors[recipe.phase as keyof typeof phaseColors] : 'bg-gray-400/20 text-gray-400'}`}>
            {recipe.phase}
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">
            {recipe.name}
          </h2>
          <p className="text-gray-800 leading-relaxed">
            {recipe.description}
          </p>
        </div>

        {/* Recipe Stats */}
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1 text-blue-400">
            <Clock className="w-4 h-4" />
            <span>{recipe.prepTime} min</span>
          </div>
          <div className="flex items-center space-x-1 text-orange-400">
            <Flame className="w-4 h-4" />
            <span>{recipe.calories} kcal</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className={`w-4 h-4 ${difficultyColors[recipe.difficulty]}`} />
            <span className={difficultyColors[recipe.difficulty]}>
              {recipe.difficulty}
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {recipe.tags.map((tag, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-xs border border-gray-300"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Expand Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-center space-x-2 py-3 bg-green-400/10 hover:bg-green-400/20 rounded-xl transition-all duration-200 border border-green-400/30"
        >
          <span className="text-green-400 font-medium">
            {isExpanded ? 'Ver Menos' : 'Ver Receita Completa'}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-green-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-green-400" />
          )}
        </button>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-gray-200 bg-gray-100/50 p-6 space-y-6">
          {/* Ingredients */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Ingredientes</span>
            </h3>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center space-x-3 text-gray-800">
                  <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
              <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
              <span>Modo de Preparo</span>
            </h3>
            <ol className="space-y-3">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex space-x-3 text-gray-800">
                  <div className="flex-shrink-0 w-6 h-6 bg-pink-400 text-gray-900 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <span className="leading-relaxed">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Tips */}
          <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-xl p-4 space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <h4 className="font-bold text-yellow-400">Dica Especial</h4>
            </div>
            <p className="text-gray-800 text-sm leading-relaxed">
              {recipe.tips}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodayRecipe;