import { useState, useEffect } from 'react';
import Login from './components/Auth/Login';
import Onboarding from './components/Onboarding/Onboarding';
import Dashboard from './components/Dashboard/Dashboard';
import Recipes from './components/Recipes/Recipes';
import Progress from './components/Progress/Progress';
import Profile from './components/Profile/Profile';
import CheckIn from './components/CheckIn/CheckIn';
import ShoppingList from './components/ShoppingList/ShoppingList';
import Navigation from './components/Navigation/Navigation';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import { AuthProvider, useAuth } from './contexts/AuthContext';

export interface UserData {
  id: string;
  name: string;
  email: string;
  profilePhoto?: string;
  hasCompletedOnboarding: boolean;
  currentDay: number;
  startDate: string;
  initialWeight: number;
  currentWeight: number;
  targetWeight: number;
  height: number;
  age: number;
  eatingHabits: string[];
  goals: string[];
  totalPoints: number;
  badges: string[];
  checkins: CheckinData[];
  streak: number;
  hydration: {
    dailyGoal: number;
    currentGlasses: number;
    lastUpdated: string;
  };
  favoriteRecipes: number[];
  completedRecipes: number[];
}

export interface CheckinData {
  id: string;
  day: number;
  date: string;
  weight: number;
  energyLevel: number;
  feeling: string;
  photoUrl?: string;
  smoothieCompleted: boolean;
  mealsCompleted: number;
  completed: boolean;
}

function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const { user, userData, loading, updateUserData, signOut } = useAuth();

  // Loading screen enquanto verifica autenticação
  if (loading) {
    return <LoadingScreen />;
  }

  const handleLogout = async () => {
    await signOut();
  };

  // Show login first - before everything else
  if (!user) {
    return <Login />;
  }

  // Show onboarding only after login if user hasn't completed it
  if (!userData || !userData.hasCompletedOnboarding) {
    return <Onboarding userData={userData} updateUserData={updateUserData} />;
  }
  const renderCurrentTab = () => {
    switch (currentTab) {
      case 'dashboard':
        return <Dashboard userData={userData} updateUserData={updateUserData} setCurrentTab={setCurrentTab} />;
      case 'recipes':
        return <Recipes currentDay={userData.currentDay} userData={userData} updateUserData={updateUserData} />;
      case 'checkin':
        return <CheckIn userData={userData} updateUserData={updateUserData} />;
      case 'shopping':
        return <ShoppingList currentDay={userData.currentDay} />;
      case 'progress':
        return <Progress userData={userData} updateUserData={updateUserData} />;
      case 'profile':
        return <Profile userData={userData} updateUserData={updateUserData} onLogout={handleLogout} />;
      default:
        return <Dashboard userData={userData} updateUserData={updateUserData} setCurrentTab={setCurrentTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-md mx-auto bg-gray-900 min-h-screen">
        <main className="pb-20">
          {renderCurrentTab()}
        </main>
        <Navigation currentTab={currentTab} setCurrentTab={setCurrentTab} />
      </div>
    </div>
  );
}

// Componente principal envolvido com AuthProvider
function AppWithAuth() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default AppWithAuth;