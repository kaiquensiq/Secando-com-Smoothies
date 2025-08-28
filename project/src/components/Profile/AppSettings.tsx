import React, { useState } from 'react';
import { Bell, Moon, Sun, Smartphone, Download, Share2, LogOut } from 'lucide-react';
import { UserData } from '../../App';

interface AppSettingsProps {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  onLogout: () => void;
}

const AppSettings: React.FC<AppSettingsProps> = ({ userData, onLogout }) => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [reminderTime, setReminderTime] = useState('08:00');

  const handleRateApp = () => {
    // Simula abertura da loja de aplicativos para avaliação
    alert('Redirecionando para a loja de aplicativos para avaliar o app! ⭐');
  };

  const handleSendFeedback = () => {
    // Simula abertura do cliente de email para feedback
    const subject = encodeURIComponent('Feedback - Secando com Smoothies');
    const body = encodeURIComponent('Olá! Gostaria de compartilhar meu feedback sobre o app:\n\n');
    window.open(`mailto:contato@secandocomsmoothies.com?subject=${subject}&body=${body}`);
  };

  const handleExportData = () => {
    try {
      // Coleta todos os dados do usuário atual
      const exportData = {
        userData: userData,
        completedRecipes: userData.completedRecipes || [],
        favoriteRecipes: userData.favoriteRecipes || [],
        checkinHistory: userData.checkins || [],
        exportDate: new Date().toISOString(),
        appVersion: '1.0.0'
      };
      
      // Cria o arquivo para download
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      // Cria link temporário para download
      const link = document.createElement('a');
      link.href = url;
      link.download = `secando-smoothies-dados-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Limpa a URL temporária
      URL.revokeObjectURL(url);
      
      alert('Dados exportados com sucesso! 📁\n\nO arquivo foi baixado para sua pasta de Downloads.');
    } catch (error) {
      alert('Erro ao exportar dados. Tente novamente.');
    }
  };

  const handleShareProgress = () => {
    try {
      const currentWeight = userData.currentWeight || userData.initialWeight;
      const weightLoss = userData.initialWeight ? (userData.initialWeight - currentWeight).toFixed(1) : 0;
      const completedCount = userData.completedRecipes?.length || 0;
      const currentDay = userData.currentDay || 1;
      
      const shareText = `🥤 Meu progresso no Secando com Smoothies:\n\n` +
        `📅 Dia ${currentDay}/21\n` +
        `⚖️ Perdi ${weightLoss}kg\n` +
        `🍹 ${completedCount} receitas concluídas\n` +
        `⭐ ${userData.totalPoints || 0} pontos conquistados\n\n` +
        `#SecandoComSmoothies #Transformação #VidaSaudável`;
      
      if (navigator.share) {
        navigator.share({
          title: 'Meu Progresso - Secando com Smoothies',
          text: shareText
        });
      } else {
        // Fallback para copiar para clipboard
        navigator.clipboard.writeText(shareText).then(() => {
          alert('Progresso copiado para a área de transferência! 📋\n\nCole em suas redes sociais para compartilhar sua evolução!');
        }).catch(() => {
          // Fallback final - mostrar o texto para copiar manualmente
          prompt('Copie o texto abaixo para compartilhar seu progresso:', shareText);
        });
      }
    } catch (error) {
      alert('Erro ao compartilhar progresso. Tente novamente.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Notifications */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
          <Bell className="w-5 h-5 text-blue-400" />
          <span>Notificações</span>
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-gray-900 font-medium">
                Lembretes diários
              </div>
              <div className="text-gray-400 text-sm">
                Receba notificações para fazer seu check-in
              </div>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`
                relative w-12 h-6 rounded-full transition-all duration-200
                ${notifications ? 'bg-green-400' : 'bg-gray-600'}
              `}
            >
              <div className={`
                absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-200
                ${notifications ? 'left-7' : 'left-1'}
              `}></div>
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">
              Horário do lembrete
            </label>
            <input
              type="time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              className="bg-white border border-gray-300 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-gray-900 font-medium">
                Sons de celebração
              </div>
              <div className="text-gray-400 text-sm">
                Sons quando você completa desafios
              </div>
            </div>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`
                relative w-12 h-6 rounded-full transition-all duration-200
                ${soundEnabled ? 'bg-green-400' : 'bg-gray-600'}
              `}
            >
              <div className={`
                absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-200
                ${soundEnabled ? 'left-7' : 'left-1'}
              `}></div>
            </button>
          </div>
        </div>
      </div>

      {/* Display */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
          <Smartphone className="w-5 h-5 text-purple-400" />
          <span>Aparência</span>
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-gray-900 font-medium flex items-center space-x-2">
                {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                <span>Modo escuro</span>
              </div>
              <div className="text-gray-400 text-sm">
                Interface otimizada para economia de bateria
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`
                relative w-12 h-6 rounded-full transition-all duration-200
                ${darkMode ? 'bg-green-400' : 'bg-gray-600'}
              `}
            >
              <div className={`
                absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-200
                ${darkMode ? 'left-7' : 'left-1'}
              `}></div>
            </button>
          </div>
        </div>
      </div>

      {/* Data & Privacy */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
          <Download className="w-5 h-5 text-green-400" />
          <span>Dados</span>
        </h3>

        <div className="space-y-3">
          <button 
            onClick={handleExportData}
            className="w-full bg-green-400/10 border border-green-400/30 text-green-400 py-3 rounded-xl font-medium hover:bg-green-400/20 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Exportar meus dados</span>
          </button>

          <button 
            onClick={handleShareProgress}
            className="w-full bg-blue-400/10 border border-blue-400/30 text-blue-400 py-3 rounded-xl font-medium hover:bg-blue-400/20 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Share2 className="w-4 h-4" />
            <span>Compartilhar progresso</span>
          </button>
        </div>

        <div className="text-xs text-gray-800 leading-relaxed">
          Seus dados são criptografados e nunca compartilhados com terceiros. 
          Você pode exportar ou excluir suas informações a qualquer momento.
        </div>
      </div>

      {/* About App */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-gray-900">
          Sobre o App
        </h3>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Versão</span>
            <span className="text-gray-900 font-medium">1.0.0</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-400">Última atualização</span>
            <span className="text-gray-900 font-medium">Janeiro 2025</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Desenvolvedor</span>
            <span className="text-gray-900 font-medium">Secando com Smoothies</span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-800 leading-relaxed">
            Feito com 💚 para transformar sua relação com a alimentação e 
            ajudar você a conquistar seus objetivos de saúde de forma 
            sustentável e prazerosa.
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={handleRateApp}
          className="bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 py-4 rounded-xl font-medium hover:bg-yellow-400/20 transition-all duration-200 text-center"
        >
          <div className="space-y-1">
            <div className="text-lg">⭐</div>
            <div className="text-sm">Avaliar App</div>
          </div>
        </button>

        <button 
          onClick={handleSendFeedback}
          className="bg-pink-400/10 border border-pink-400/30 text-pink-400 py-4 rounded-xl font-medium hover:bg-pink-400/20 transition-all duration-200 text-center"
        >
          <div className="space-y-1">
            <div className="text-lg">📧</div>
            <div className="text-sm">Feedback</div>
          </div>
        </button>
      </div>

      {/* Logout Section */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <button 
          onClick={onLogout}
          className="w-full bg-red-400/10 border border-red-400/30 text-red-400 py-4 rounded-xl font-medium hover:bg-red-400/20 transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <LogOut className="w-5 h-5" />
          <span>Sair da conta</span>
        </button>
        <p className="text-xs text-gray-800 text-center mt-3">
          Você será redirecionado para a tela de login
        </p>
      </div>
    </div>
  );
};

export default AppSettings;