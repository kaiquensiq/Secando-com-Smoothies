import React, { useState } from 'react';
import { UserData } from '../../App';
import PersonalInfo from './PersonalInfo';
import GoalsSettings from './GoalsSettings';
import AppSettings from './AppSettings';
import SupportHelp from './SupportHelp';

interface ProfileProps {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ userData, updateUserData, onLogout }) => {
  const [activeSection, setActiveSection] = useState<'personal' | 'goals' | 'settings' | 'support'>('personal');

  const sections = [
    { id: 'personal', label: 'Perfil', icon: '👤' },
    { id: 'goals', label: 'Metas', icon: '🎯' },
    { id: 'settings', label: 'Configurações', icon: '⚙️' },
    { id: 'support', label: 'Suporte', icon: '💬' }
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalInfo userData={userData} updateUserData={updateUserData} />;
      case 'goals':
        return <GoalsSettings userData={userData} updateUserData={updateUserData} />;
      case 'settings':
        return <AppSettings userData={userData} updateUserData={updateUserData} onLogout={onLogout} />;
      case 'support':
        return <SupportHelp />;
      default:
        return <PersonalInfo userData={userData} updateUserData={updateUserData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="px-4 py-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-20 h-20 rounded-full mx-auto overflow-hidden">
            {userData.profilePhoto ? (
              <img 
                src={userData.profilePhoto} 
                alt="Foto de perfil" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-green-400 to-pink-400 flex items-center justify-center text-2xl font-bold text-gray-900">
                {userData.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <h1 className="text-2xl font-bold text-white">
            {userData.name}
          </h1>
          <p className="text-gray-300">
            {userData.email}
          </p>
        </div>

        {/* Section Navigation */}
        <div className="grid grid-cols-2 gap-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id as any)}
              className={`
                py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200
                ${activeSection === section.id 
                  ? 'bg-green-400 text-gray-900 scale-105' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }
              `}
            >
              <div className="flex flex-col items-center space-y-1">
                <span className="text-lg">{section.icon}</span>
                <span>{section.label}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Active Section Content */}
        <div className="min-h-96">
          {renderActiveSection()}
        </div>
      </div>
    </div>
  );
};

export default Profile;