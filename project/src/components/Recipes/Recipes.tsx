import React, { useState } from 'react';
import RecipeCard from './RecipeCard';
import WeekSelector from './WeekSelector';
import TodayRecipe from './TodayRecipe';
import { recipesData } from './recipesData';
import { useAuth } from '../../contexts/AuthContext';
import { userService } from '../../lib/supabase';

interface RecipesProps {
  currentDay: number;
  userData?: any;
  updateUserData?: (data: any) => void;
}

const Recipes: React.FC<RecipesProps> = ({ currentDay, userData, updateUserData }) => {
  const { user } = useAuth();
  const [selectedWeek, setSelectedWeek] = useState(Math.ceil(currentDay / 7));
  const [completedRecipes, setCompletedRecipes] = useState<number[]>(userData?.completedRecipes || []);
  const [showExtras, setShowExtras] = useState(false);

  const handleMarkAsCompleted = async (recipeDay: number): Promise<void> => {
    if (!user) return;
    
    try {
      // Salvar receita completada no Supabase
      const { error } = await userService.markRecipeCompleted(user.id, recipeDay);
      
      if (error) {
        console.error('Erro ao salvar receita completada:', error);
        return;
      }
      
      // Atualizar estado local
      const newCompletedRecipes = [...completedRecipes, recipeDay];
      setCompletedRecipes(newCompletedRecipes);
      
      if (updateUserData) {
        updateUserData({
          completedRecipes: newCompletedRecipes,
          totalPoints: (userData?.totalPoints || 0) + 10
        });
      }
    } catch (error) {
      console.error('Erro ao marcar receita como completada:', error);
    }
  };

  const handleToggleFavorite = (recipeDay: number): void => {
    const currentFavorites = userData?.favoriteRecipes || [];
    const newFavorites = currentFavorites.includes(recipeDay)
      ? currentFavorites.filter((id: number) => id !== recipeDay)
      : [...currentFavorites, recipeDay];
    
    if (updateUserData) {
      updateUserData({
        favoriteRecipes: newFavorites
      });
    }
  };

  const isRecipeCompleted = (recipeDay: number): boolean => {
    return completedRecipes.includes(recipeDay);
  };

  const isRecipeFavorite = (recipeDay: number): boolean => {
    return (userData?.favoriteRecipes || []).includes(recipeDay);
  };

  const getWeekRecipes = (week: number) => {
    const startDay = (week - 1) * 7 + 1;
    const endDay = Math.min(week * 7, 21);
    return recipesData.filter(recipe => recipe.day >= startDay && recipe.day <= endDay && recipe.phase !== 'Extra');
  };

  const getExtraRecipes = () => {
    return recipesData.filter(recipe => recipe.phase === 'Extra');
  };

  const todayRecipe = recipesData.find(recipe => recipe.day === currentDay);
  const weekRecipes = getWeekRecipes(selectedWeek);
  const extraRecipes = getExtraRecipes();

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="px-4 py-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-green-400">
            Receitas de Smoothies
          </h1>
          <p className="text-gray-800">
            21 dias de sabores incríveis
          </p>
        </div>

        {/* Today's Recipe */}
        {todayRecipe && (
          <TodayRecipe recipe={todayRecipe} currentDay={currentDay} />
        )}

        {/* Navigation Tabs */}
        <div className="flex space-x-4 justify-center">
          <button
            onClick={() => setShowExtras(false)}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              !showExtras
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            Programa Principal
          </button>
          <button
            onClick={() => setShowExtras(true)}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              showExtras 
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            Extras ({extraRecipes.length})
          </button>
        </div>

        {!showExtras ? (
          <>
            {/* Week Selector */}
            <WeekSelector 
              selectedWeek={selectedWeek} 
              setSelectedWeek={setSelectedWeek}
              currentDay={currentDay}
            />

            {/* Recipes Grid */}
            <div className="space-y-4">
              {weekRecipes.map((recipe) => (
                <RecipeCard 
                  key={recipe.day} 
                  recipe={recipe} 
                  isToday={recipe.day === currentDay}
                  isCompleted={isRecipeCompleted(recipe.day)}
                  onMarkAsCompleted={handleMarkAsCompleted}
                  isFavorite={isRecipeFavorite(recipe.day)}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Extras Header */}
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold text-green-400">
                Smoothies Extras
              </h2>
              <p className="text-gray-800">
                Receitas adicionais para variar seu cardápio
              </p>
            </div>

            {/* Extras Grid */}
            <div className="space-y-4">
              {extraRecipes.map((recipe) => (
                <RecipeCard 
                  key={recipe.day} 
                  recipe={recipe} 
                  isToday={false}
                  isCompleted={isRecipeCompleted(recipe.day)}
                  onMarkAsCompleted={handleMarkAsCompleted}
                  isFavorite={isRecipeFavorite(recipe.day)}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Recipes;