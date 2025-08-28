import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Loader } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { signInWithPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Por favor, insira seu email');
      return;
    }

    if (!password.trim()) {
      setError('Por favor, insira sua senha');
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
      const { error } = await signInWithPassword(email, password);
      
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          setError('Email ou senha incorretos. Verifique seus dados.');
        } else {
          setError('Erro ao fazer login. Tente novamente.');
        }
        console.error('Erro de login:', error);
      } else {
        setMessage('Login realizado com sucesso!');
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Welcome */}
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-2xl">
            <img 
               src="https://i.imgur.com/Bz1fya1.png" 
               alt="Secando com Smoothies Logo" 
               className="w-20 h-20 object-contain"
             />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-gray-800">
              Secando com
            </h1>
            <h2 className="text-4xl font-bold text-pink-500">
              Smoothies
            </h2>
            <p className="text-gray-600 text-lg">
              Transforme seu corpo em 21 dias
            </p>
          </div>
        </div>

          {/* Features */}
        <div className="space-y-4">
          <div className="bg-purple-100 rounded-2xl p-6 border border-purple-200">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Elimine toxinas naturalmente</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Acelere seu metabolismo</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Receitas deliciosas e práticas</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Resultados em 21 dias</span>
              </div>
            </div>
          </div>
        </div>

          {/* CTA Button */}
        <button
          onClick={() => setShowWelcome(false)}
          className="w-full bg-pink-500 text-white font-bold py-4 px-6 rounded-2xl hover:bg-pink-400 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
        >
          <span>Começar Agora</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <p className="text-center text-gray-600 text-sm">
          Junte-se a milhares de pessoas que já transformaram suas vidas
        </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg">
            <img 
               src="https://i.imgur.com/Bz1fya1.png" 
               alt="Secando com Smoothies Logo" 
               className="w-12 h-12 object-contain"
             />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-800">
              Bem-vindo de volta!
            </h1>
            <p className="text-gray-600">
              Entre com seu email e senha para continuar sua jornada
            </p>
          </div>
          
          <div className="bg-yellow-100 border border-yellow-300 rounded-xl p-4">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-sm">
                  <span className="text-orange-500 font-medium">Primeiro acesso?</span>
                  <span className="text-gray-700 ml-2">Use a senha:</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                <span className="font-mono bg-yellow-200 px-3 py-1.5 rounded-lg text-gray-800 font-semibold text-center sm:text-left">smoothie123</span>
                <span className="text-gray-700 text-xs text-center sm:text-left">⚠️ Altere após o login</span>
              </div>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white text-gray-800 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-pink-500 border border-gray-300 focus:border-pink-500 transition-all duration-300 placeholder-gray-400"
                  placeholder="seu@email.com"
                  required
                />
              </div>
              {email && !isValidEmail(email) && (
                <p className="text-red-600 text-sm">Por favor, insira um email válido</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white text-gray-800 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-pink-500 border border-gray-300 focus:border-pink-500 transition-all duration-300 placeholder-gray-400"
                  placeholder="Sua senha"
                  required
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {message && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3">
              <p className="text-green-600 text-sm">{message}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={!email.trim() || !password.trim() || !isValidEmail(email) || isLoading}
            className="w-full bg-pink-500 text-white font-bold py-4 px-6 rounded-2xl hover:bg-pink-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Entrando...</span>
              </>
            ) : (
              <>
                <span>Entrar</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center space-y-4">
          <div className="bg-pink-50 backdrop-blur-sm rounded-xl p-4 border border-pink-200">
            <p className="text-gray-600 text-sm">
              🔒 Seus dados estão seguros conosco
            </p>
          </div>
          
          <button
            onClick={() => setShowWelcome(true)}
            className="text-pink-500 hover:text-pink-600 text-sm font-medium transition-colors duration-300"
          >
            ← Voltar ao início
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;