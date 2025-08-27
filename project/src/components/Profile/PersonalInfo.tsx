import React, { useState } from 'react';
import { Edit, Save, X, User, Mail, Calendar, Ruler, Scale, Camera, Upload } from 'lucide-react';
import { UserData } from '../../App';
import { useAuth } from '../../contexts/AuthContext';
import { userService } from '../../lib/supabase';

interface PersonalInfoProps {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ userData, updateUserData }) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: userData.name,
    email: userData.email,
    age: userData.age,
    height: userData.height
  });
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  const handleSave = async () => {
    if (!user) return;
    
    try {
      // Atualizar no Supabase
      const { error } = await userService.updateProfile(user.id, {
        name: editData.name,
        email: editData.email,
        age: editData.age,
        height: editData.height
      });
      
      if (error) {
        console.error('Erro ao atualizar perfil:', error);
        return;
      }
      
      // Atualizar estado local
      updateUserData({
        name: editData.name,
        email: editData.email,
        age: editData.age,
        height: editData.height
      });
      
      setIsEditing(false);
    } catch (error) {
      console.error('Erro ao salvar informações pessoais:', error);
    }
  };

  const handleCancel = () => {
    setEditData({
      name: userData.name,
      email: userData.email,
      age: userData.age,
      height: userData.height
    });
    setIsEditing(false);
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploadingPhoto(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        updateUserData({ profilePhoto: result });
        setIsUploadingPhoto(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    updateUserData({ profilePhoto: undefined });
  };

  const calculateIMC = () => {
    const heightInMeters = userData.height / 100;
    return (userData.currentWeight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const getIMCCategory = (imc: number) => {
    if (imc < 18.5) return { label: 'Abaixo do peso', color: 'text-blue-400' };
    if (imc < 25) return { label: 'Peso normal', color: 'text-green-400' };
    if (imc < 30) return { label: 'Sobrepeso', color: 'text-yellow-400' };
    return { label: 'Obesidade', color: 'text-red-400' };
  };

  const imc = parseFloat(calculateIMC());
  const imcCategory = getIMCCategory(imc);

  return (
    <div className="space-y-6">
      {/* Edit Button */}
      <div className="flex justify-end">
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 bg-green-400 text-gray-900 px-4 py-2 rounded-xl font-medium hover:bg-green-300 transition-all duration-200"
          >
            <Edit className="w-4 h-4" />
            <span>Editar</span>
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 bg-green-400 text-gray-900 px-4 py-2 rounded-xl font-medium hover:bg-green-300 transition-all duration-200"
            >
              <Save className="w-4 h-4" />
              <span>Salvar</span>
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-gray-500 transition-all duration-200"
            >
              <X className="w-4 h-4" />
              <span>Cancelar</span>
            </button>
          </div>
        )}
      </div>

      {/* Profile Photo Section */}
      <div className="bg-gray-800 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Camera className="w-5 h-5 mr-2 text-green-400" />
          Foto de Perfil
        </h3>
        
        <div className="flex items-center space-x-4">
          {/* Current Photo */}
          <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
            {userData.profilePhoto ? (
              <img 
                src={userData.profilePhoto} 
                alt="Foto de perfil" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-green-400 to-pink-400 flex items-center justify-center text-lg font-bold text-gray-900">
                {userData.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          
          {/* Upload Controls */}
          <div className="flex-1 space-y-2">
            <div className="flex space-x-2">
              <label className="flex items-center space-x-2 bg-green-400 text-gray-900 px-4 py-2 rounded-xl font-medium hover:bg-green-300 transition-all duration-200 cursor-pointer">
                <Upload className="w-4 h-4" />
                <span>{isUploadingPhoto ? 'Carregando...' : 'Alterar Foto'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  disabled={isUploadingPhoto}
                />
              </label>
              
              {userData.profilePhoto && (
                <button
                  onClick={handleRemovePhoto}
                  className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-xl font-medium hover:bg-red-400 transition-all duration-200"
                >
                  <X className="w-4 h-4" />
                  <span>Remover</span>
                </button>
              )}
            </div>
            <p className="text-gray-400 text-sm">
              Formatos aceitos: JPG, PNG, GIF (máx. 5MB)
            </p>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-gray-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center space-x-2">
          <User className="w-5 h-5 text-green-400" />
          <span>Informações Pessoais</span>
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {/* Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400 flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Nome Completo</span>
            </label>
            {isEditing ? (
              <input
                type="text"
                value={editData.name}
                onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            ) : (
              <div className="bg-gray-700 rounded-xl px-4 py-3 text-white">
                {userData.name}
              </div>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400 flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>E-mail</span>
            </label>
            {isEditing ? (
              <input
                type="email"
                value={editData.email}
                onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            ) : (
              <div className="bg-gray-700 rounded-xl px-4 py-3 text-white">
                {userData.email}
              </div>
            )}
          </div>

          {/* Age */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400 flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Idade</span>
            </label>
            {isEditing ? (
              <input
                type="number"
                value={editData.age}
                onChange={(e) => setEditData(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            ) : (
              <div className="bg-gray-700 rounded-xl px-4 py-3 text-white">
                {userData.age} anos
              </div>
            )}
          </div>

          {/* Height */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400 flex items-center space-x-2">
              <Ruler className="w-4 h-4" />
              <span>Altura</span>
            </label>
            {isEditing ? (
              <input
                type="number"
                value={editData.height}
                onChange={(e) => setEditData(prev => ({ ...prev, height: parseInt(e.target.value) }))}
                className="w-full bg-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            ) : (
              <div className="bg-gray-700 rounded-xl px-4 py-3 text-white">
                {userData.height} cm
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Health Metrics */}
      <div className="bg-gray-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center space-x-2">
          <Scale className="w-5 h-5 text-pink-400" />
          <span>Métricas de Saúde</span>
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-700 rounded-xl p-4 text-center space-y-2">
            <div className="text-sm text-gray-400">Peso Atual</div>
            <div className="text-2xl font-bold text-blue-400">
              {userData.currentWeight}kg
            </div>
          </div>

          <div className="bg-gray-700 rounded-xl p-4 text-center space-y-2">
            <div className="text-sm text-gray-400">IMC</div>
            <div className={`text-2xl font-bold ${imcCategory.color}`}>
              {calculateIMC()}
            </div>
            <div className={`text-xs ${imcCategory.color}`}>
              {imcCategory.label}
            </div>
          </div>

          <div className="bg-gray-700 rounded-xl p-4 text-center space-y-2">
            <div className="text-sm text-gray-400">Peso Perdido</div>
            <div className="text-2xl font-bold text-green-400">
              {(userData.initialWeight - userData.currentWeight).toFixed(1)}kg
            </div>
          </div>

          <div className="bg-gray-700 rounded-xl p-4 text-center space-y-2">
            <div className="text-sm text-gray-400">Para a Meta</div>
            <div className="text-2xl font-bold text-pink-400">
              {Math.max(userData.currentWeight - userData.targetWeight, 0).toFixed(1)}kg
            </div>
          </div>
        </div>
      </div>

      {/* Program Stats */}
      <div className="bg-gray-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-yellow-400" />
          <span>Estatísticas do Programa</span>
        </h3>

        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-700">
            <span className="text-gray-400">Dia do programa</span>
            <span className="text-white font-bold">{userData.currentDay}/21</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-gray-700">
            <span className="text-gray-400">Data de início</span>
            <span className="text-white font-bold">
              {new Date(userData.startDate).toLocaleDateString('pt-BR')}
            </span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-gray-700">
            <span className="text-gray-400">Total de pontos</span>
            <span className="text-white font-bold">{userData.totalPoints} pts</span>
          </div>

          <div className="flex justify-between items-center py-2">
            <span className="text-gray-400">Badges conquistadas</span>
            <span className="text-white font-bold">{userData.badges.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;