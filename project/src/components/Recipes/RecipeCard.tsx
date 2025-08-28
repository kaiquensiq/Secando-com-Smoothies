import React, { useState } from 'react';
import { Clock, Flame, Star, CheckCircle, ChevronUp, Zap, RefreshCw, Heart } from 'lucide-react';
import { Recipe, recipesData } from './recipesData';

interface RecipeCardProps {
  recipe: Recipe;
  isToday: boolean;
  isCompleted: boolean;
  onMarkAsCompleted?: (recipeDay: number) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (recipeDay: number) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ 
  recipe, 
  isToday, 
  isCompleted, 
  onMarkAsCompleted, 
  isFavorite = false, 
  onToggleFavorite 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSubstitutions, setShowSubstitutions] = useState(false);

  const handleMakeNow = () => {
    // Scroll to the recipe details
    setIsExpanded(true);
    // Small delay to ensure the content is rendered before scrolling
    setTimeout(() => {
      const element = document.getElementById(`recipe-${recipe.day}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const handleViewRecipe = () => {
    setIsExpanded(!isExpanded);
  };

  const handleShowSubstitutions = () => {
    setShowSubstitutions(!showSubstitutions);
  };

  const handleMarkAsCompleted = () => {
    if (onMarkAsCompleted && !isCompleted) {
      onMarkAsCompleted(recipe.day);
    }
  };

  const handleToggleFavorite = () => {
    if (onToggleFavorite) {
      onToggleFavorite(recipe.day);
    }
  };

  const getSubstitutionRecipes = () => {
    // Find recipes with similar tags or same phase
    return recipesData.filter(r => 
      r.day !== recipe.day && (
        r.phase === recipe.phase ||
        r.tags.some(tag => recipe.tags.includes(tag))
      )
    ).slice(0, 3); // Limit to 3 substitutions
  };
  const difficultyColors = {
    'Fácil': 'text-green-400',
    'Médio': 'text-yellow-400',
    'Difícil': 'text-red-400'
  };

  const phaseColors = {
    'Desintoxicação': 'bg-green-400/20 text-green-400',
    'Aceleração': 'bg-orange-400/20 text-orange-400',
    'Definição': 'bg-purple-400/20 text-purple-400',
    'Extra': 'bg-blue-400/20 text-blue-400'
  };

  const substitutionRecipes = getSubstitutionRecipes();

  return (
    <div 
      id={`recipe-${recipe.day}`}
      className={`
        relative bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 transition-all duration-200
        ${isToday 
          ? 'border-green-400/50 ring-2 ring-green-400/20 scale-[1.02]' 
          : 'border-gray-700 hover:border-gray-600 hover:scale-[1.01]'
        }
        ${isCompleted ? 'opacity-75' : ''}
      `}>
      {/* Day Badge */}
      <div className="absolute top-3 left-3 z-10">
        <div className={`
          w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold
          ${isCompleted 
            ? 'bg-green-400 text-gray-900' 
            : isToday 
              ? 'bg-pink-400 text-gray-900 animate-pulse' 
              : 'bg-gray-700 text-gray-800'
          }
        `}>
          {isCompleted ? <CheckCircle className="w-5 h-5" /> : recipe.day}
        </div>
      </div>

      {/* Phase Badge */}
      <div className="absolute top-3 right-3 z-10">
        <div className={`px-3 py-1 rounded-full text-xs font-bold ${phaseColors[recipe.phase as keyof typeof phaseColors]}`}>
          {recipe.phase}
        </div>
      </div>

      {/* Today Badge */}
      {isToday && (
        <div className="absolute top-14 left-3 z-10">
          <div className="bg-green-400 text-gray-900 px-2 py-1 rounded-full text-xs font-bold animate-pulse">
            HOJE
          </div>
        </div>
      )}

      {/* Image */}
      <div className="relative h-32 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
        <div className="text-6xl opacity-20">🥤</div>
        {isCompleted && (
          <div className="absolute inset-0 bg-green-400/20 flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-400" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-gray-900">
            {recipe.name}
          </h3>
          <p className="text-gray-800 text-sm leading-relaxed">
            {recipe.description}
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1 text-blue-400">
            <Clock className="w-4 h-4" />
            <span>{recipe.prepTime}min</span>
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
        <div className="flex flex-wrap gap-1">
          {recipe.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-gray-200 text-gray-800 rounded-full text-xs border border-gray-300"
            >
              #{tag}
            </span>
          ))}
          {recipe.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-200 text-gray-800 rounded-full text-xs border border-gray-300">
              +{recipe.tags.length - 3}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <div className="flex gap-2">
            <button 
              onClick={isCompleted ? undefined : isToday ? handleMakeNow : handleViewRecipe}
              className={`
                flex-1 py-3 rounded-xl font-medium transition-all duration-200
                ${isCompleted 
                  ? 'bg-green-400/20 text-green-400 cursor-default' 
                  : isToday 
                    ? 'bg-green-400 text-gray-900 hover:bg-green-300 active:scale-95' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300 border border-gray-300'
                }
              `}>
              {isCompleted ? '✅ Concluído' : isToday ? '🥤 Fazer Agora' : '📋 Ver Receita'}
            </button>
            
            {/* Favorite Button */}
            <button
              onClick={handleToggleFavorite}
              className={`
                px-3 py-3 rounded-xl transition-all duration-200
                ${isFavorite 
                  ? 'bg-pink-400/20 text-pink-400 hover:bg-pink-400/30' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300 hover:text-pink-400 border border-gray-300'
                }
              `}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>
          
          {/* Mark as Completed Button - Only show if not completed and expanded */}
          {!isCompleted && isExpanded && (
            <button
              onClick={handleMarkAsCompleted}
              className="w-full py-2 rounded-lg font-medium transition-all duration-200 bg-green-400/20 text-green-400 hover:bg-green-400/30 text-sm flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Marcar como Feito (+10 pontos)
            </button>
          )}
          
          {/* Substitutions Button */}
          {substitutionRecipes.length > 0 && (
            <button 
              onClick={handleShowSubstitutions}
              className="w-full py-2 rounded-lg font-medium transition-all duration-200 bg-gray-200 text-gray-800 hover:bg-gray-300 border border-gray-300 text-sm flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Substituições ({substitutionRecipes.length})
            </button>
          )}
        </div>
      </div>

      {/* Expanded Recipe Details */}
      {isExpanded && (
        <div className="border-t border-gray-200 bg-gray-100/50">
          <div className="p-6 space-y-6">
            {/* Ingredients */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                Ingredientes
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 bg-gray-700/50 rounded-lg">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-800">{ingredient}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5 text-pink-400" />
                Modo de Preparo
              </h3>
              <div className="space-y-3">
                {recipe.instructions.map((instruction, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-700/50 rounded-lg">
                    <div className="w-6 h-6 bg-pink-400 text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-gray-800">{instruction}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-xl p-4">
              <div className="text-yellow-400 font-bold mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Dica Especial
              </div>
              <div className="text-gray-800 text-sm">
                {recipe.tips}
              </div>
            </div>

            {/* Collapse Button */}
            <button
              onClick={() => setIsExpanded(false)}
              className="w-full flex items-center justify-center space-x-2 py-3 bg-gray-200 hover:bg-gray-300 rounded-xl transition-all duration-200 border border-gray-300"
            >
              <span className="text-gray-800 font-medium">Fechar Receita</span>
              <ChevronUp className="w-5 h-5 text-gray-800" />
            </button>
          </div>
        </div>
      )}

      {/* Substitutions Panel */}
      {showSubstitutions && (
        <div className="border-t border-gray-200 bg-gray-100/30">
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-blue-400" />
                Substituições Disponíveis
              </h3>
              <button
                onClick={() => setShowSubstitutions(false)}
                className="text-gray-800 hover:text-gray-800"
              >
                <ChevronUp className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-3">
              {substitutionRecipes.map((subRecipe) => (
                <div key={subRecipe.day} className="bg-gray-700/30 rounded-lg p-3 border border-gray-600/50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{subRecipe.name}</h4>
                      <p className="text-gray-800 text-xs mt-1">{subRecipe.description}</p>
                      <div className="flex items-center space-x-3 mt-2 text-xs">
                        <span className="flex items-center gap-1 text-blue-400">
                          <Clock className="w-3 h-3" />
                          {subRecipe.prepTime}min
                        </span>
                        <span className="flex items-center gap-1 text-orange-400">
                          <Flame className="w-3 h-3" />
                          {subRecipe.calories} kcal
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${phaseColors[subRecipe.phase as keyof typeof phaseColors]}`}>
                          {subRecipe.phase}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {subRecipe.tags.slice(0, 2).map((tag, index) => (
                      <span key={index} className="px-1.5 py-0.5 bg-gray-600 text-gray-800 rounded text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center text-xs text-gray-500 mt-3">
              💡 Estas receitas têm características similares e podem ser feitas no lugar desta
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeCard;