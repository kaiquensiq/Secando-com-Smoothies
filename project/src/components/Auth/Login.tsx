import React, { useState } from 'react';
import { Mail, Zap, ArrowRight, Loader } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { signInWithEmail } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Por favor, insira seu email');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Por favor, insira um email válido');
      return;
    }

    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      const { data, error } = await signInWithEmail(email);
      
      if (error) {
        setError('Erro ao enviar link de login. Tente novamente.');
        console.error('Erro de login:', error);
      } else {
        setMessage('Link de login enviado para seu email! Verifique sua caixa de entrada.');
      }
    } catch (error) {
      setError('Erro inesperado. Tente novamente.');
      console.error('Erro de login:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  if (showWelcome) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          {/* Logo and Welcome */}
          <div className="text-center space-y-6">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
              <Zap className="w-12 h-12 text-gray-900" />
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-white">
                Secando com
              </h1>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
                Smoothies
              </h2>
              <p className="text-gray-300 text-lg">
                Transforme seu corpo em 21 dias
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Elimine toxinas naturalmente</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Acelere seu metabolismo</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Receitas deliciosas e práticas</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Resultados em 21 dias</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => setShowWelcome(false)}
            className="w-full bg-gradient-to-r from-green-400 to-green-500 text-gray-900 font-bold py-4 px-6 rounded-2xl hover:from-green-500 hover:to-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
          >
            <span>Começar Agora</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <p className="text-center text-gray-400 text-sm">
            Junte-se a milhares de pessoas que já transformaram suas vidas
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto">
            <Zap className="w-8 h-8 text-gray-900" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">
              Bem-vindo de volta!
            </h1>
            <p className="text-gray-300">
              Entre com seu email para continuar sua jornada
            </p>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-300">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-800/50 backdrop-blur-sm text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-green-400 border border-gray-700 focus:border-green-400 transition-all duration-300"
                  placeholder="seu@email.com"
                  required
                />
              </div>
              {email && !isValidEmail(email) && (
                <p className="text-red-400 text-sm">Por favor, insira um email válido</p>
              )}
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {message && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3">
              <p className="text-green-400 text-sm">{message}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={!email.trim() || !isValidEmail(email) || isLoading}
            className="w-full bg-gradient-to-r from-green-400 to-green-500 text-gray-900 font-bold py-4 px-6 rounded-2xl hover:from-green-500 hover:to-green-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Enviando...</span>
              </>
            ) : (
              <>
                <span>Enviar Link de Login</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center space-y-4">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
            <p className="text-gray-400 text-sm">
              🔒 Seus dados estão seguros conosco
            </p>
          </div>
          
          <button
            onClick={() => setShowWelcome(true)}
            className="text-green-400 hover:text-green-300 text-sm font-medium transition-colors duration-300"
          >
            ← Voltar ao início
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;