import React, { useState } from 'react';
import { HelpCircle, Search, ChevronDown, ChevronRight, Mail } from 'lucide-react';

const SupportHelp: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqData = [
    {
      id: 1,
      category: 'Ingredientes',
      question: 'Posso usar adoçante nos smoothies?',
      answer: 'Prefira adoçantes naturais como stevia, tâmaras ou mel. Evite adoçantes artificiais que podem causar desejos por doces e interferir na microbiota intestinal.'
    },
    {
      id: 2,
      category: 'Ingredientes',
      question: 'E se eu não gostar do sabor de algum smoothie?',
      answer: 'Você pode fazer pequenos ajustes: adicione mais fruta doce (banana, maçã), um pouco de mel, ou substitua ingredientes amargos por similares mais suaves.'
    },
    {
      id: 3,
      category: 'Preparo',
      question: 'Posso preparar o smoothie na noite anterior?',
      answer: 'Não é recomendado. Os smoothies perdem vitaminas e mudam de sabor. Prepare sempre na hora do consumo para obter todos os benefícios nutricionais.'
    },
    {
      id: 4,
      category: 'Preparo',
      question: 'Qual a melhor hora para tomar o smoothie?',
      answer: 'Depende do seu objetivo: pela manhã para energia, pré-treino com proteína, ou entre refeições como lanche saudável. Evite próximo ao horário de dormir.'
    },
    {
      id: 5,
      category: 'Resultados',
      question: 'Quanto peso vou perder em 21 dias?',
      answer: 'A perda varia de pessoa para pessoa, mas a média é 2-5kg. Fatores como metabolismo, atividade física e aderência ao programa influenciam os resultados.'
    },
    {
      id: 6,
      category: 'Resultados',
      question: 'E se eu parar de perder peso no meio do programa?',
      answer: 'Platôs são normais! Seu corpo está se adaptando. Continue seguindo o programa, beba mais água, durma bem e considere variar a atividade física.'
    },
    {
      id: 7,
      category: 'Técnico',
      question: 'Como faço backup dos meus dados?',
      answer: 'Vá em Perfil > Configurações > Dados e clique em "Exportar meus dados". Você receberá um arquivo com todo seu progresso e histórico.'
    },
    {
      id: 8,
      category: 'Técnico',
      question: 'Posso usar o app offline?',
      answer: 'Sim! As receitas ficam salvas no seu dispositivo. Apenas funcionalidades como sincronização e backup precisam de internet.'
    }
  ];

  const categories = ['Todos', 'Ingredientes', 'Preparo', 'Resultados', 'Técnico'];
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const filteredFaqs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar nas perguntas frequentes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-gray-800 text-white rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      {/* Categories */}
      <div className="flex space-x-2 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`
              px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200
              ${selectedCategory === category 
                ? 'bg-green-400 text-gray-900' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>

      {/* FAQ List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="bg-gray-800 rounded-xl p-8 text-center">
            <HelpCircle className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">
              Nenhuma pergunta encontrada para "{searchTerm}"
            </p>
          </div>
        ) : (
          filteredFaqs.map((faq) => (
            <div key={faq.id} className="bg-gray-800 rounded-xl overflow-hidden">
              <button
                onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-700/50 transition-all duration-200"
              >
                <div className="flex-1 space-y-1">
                  <div className="text-white font-medium">
                    {faq.question}
                  </div>
                  <div className="text-xs text-gray-400">
                    {faq.category}
                  </div>
                </div>
                {expandedFaq === faq.id ? (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
              </button>
              
              {expandedFaq === faq.id && (
                <div className="px-4 pb-4 border-t border-gray-700">
                  <p className="text-gray-300 text-sm leading-relaxed mt-4">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Contact Support */}
      <div className="bg-gradient-to-r from-green-400/10 to-blue-400/10 border border-green-400/30 rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-white text-center">
          Ainda precisa de ajuda?
        </h3>
        <p className="text-gray-300 text-sm text-center">
          Nossa equipe está pronta para te ajudar a alcançar seus objetivos!
        </p>
        
        <div className="grid grid-cols-1 gap-3">
          <button 
            onClick={() => {
              const subject = encodeURIComponent('Suporte - Secando com Smoothies');
              const body = encodeURIComponent('Olá equipe de suporte!\n\nPreciso de ajuda com:\n\n[Descreva sua dúvida ou problema aqui]\n\nObrigado!');
              window.open(`mailto:suporte@secandocomsmoothies.com?subject=${subject}&body=${body}`);
            }}
            className="bg-green-400/10 border border-green-400/30 text-green-400 py-4 rounded-xl font-medium hover:bg-green-400/20 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Mail className="w-5 h-5" />
            <span>Enviar E-mail</span>
          </button>
        </div>

        <div className="text-xs text-gray-400 text-center">
          Tempo de resposta: até 24 horas
        </div>
      </div>


    </div>
  );
};

export default SupportHelp;