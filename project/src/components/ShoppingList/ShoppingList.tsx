import React, { useState } from 'react';
import { ShoppingCart, Check, RefreshCw, Apple, Carrot, Beef, Package } from 'lucide-react';

interface ShoppingListProps {
  currentDay: number;
}

const ShoppingList: React.FC<ShoppingListProps> = ({ currentDay }) => {
  const [selectedWeek, setSelectedWeek] = useState(Math.ceil(currentDay / 7));
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const getWeekData = (week: number) => {
    const weekData = {
      1: {
        title: 'Semana 1 - Desintoxicação (Dias 1-7)',
        color: 'green',
        items: {
          frutas: [
            { id: 'maca-verde', name: 'Maçã verde', quantity: '4 unidades', substitute: 'Pêra' },
            { id: 'abacaxi', name: 'Abacaxi', quantity: '1 unidade', substitute: 'Manga' },
            { id: 'limao', name: 'Limão', quantity: '8 unidades', substitute: 'Lima' },
            { id: 'banana', name: 'Banana', quantity: '7 unidades', substitute: 'Banana da terra' },
            { id: 'blueberries', name: 'Blueberries', quantity: '200g', substitute: 'Amora' },
            { id: 'morangos', name: 'Morangos', quantity: '300g', substitute: 'Framboesa' },
            { id: 'mamao', name: 'Mamão papaya', quantity: '1 unidade', substitute: 'Manga' },
            { id: 'melancia', name: 'Melancia', quantity: '1 fatia grande', substitute: 'Melão' },
            { id: 'uvas', name: 'Uvas verdes', quantity: '300g', substitute: 'Uvas roxas' }
          ],
          vegetais: [
            { id: 'couve', name: 'Couve', quantity: '1 maço', substitute: 'Espinafre' },
            { id: 'espinafre', name: 'Espinafre', quantity: '400g', substitute: 'Rúcula' },
            { id: 'gengibre', name: 'Gengibre', quantity: '1 pedaço (8cm)', substitute: 'Cúrcuma' },
            { id: 'hortela', name: 'Hortelã', quantity: '1 maço', substitute: 'Manjericão' },
            { id: 'pepino', name: 'Pepino', quantity: '3 unidades', substitute: 'Abobrinha' },
            { id: 'aipo-1', name: 'Aipo', quantity: '1 maço', substitute: 'Pepino' }
          ],
          outros: [
            { id: 'chia', name: 'Chia', quantity: '200g', substitute: 'Linhaça' },
            { id: 'agua-coco', name: 'Água de coco', quantity: '2L', substitute: 'Água comum' },
            { id: 'leite-amendoas', name: 'Leite de amêndoas', quantity: '1L', substitute: 'Leite de aveia' },
            { id: 'mel', name: 'Mel', quantity: '1 pote pequeno', substitute: 'Stevia' },
            { id: 'aveia', name: 'Aveia', quantity: '500g', substitute: 'Quinoa em flocos' },
            { id: 'canela', name: 'Canela em pó', quantity: '1 pote', substitute: 'Noz moscada' },
            { id: 'cacau', name: 'Cacau em pó', quantity: '200g', substitute: 'Alfarroba' },
            { id: 'leite-coco-1', name: 'Leite de coco', quantity: '400ml', substitute: 'Leite de amêndoas' }
          ]
        }
      },
      2: {
        title: 'Semana 2 - Aceleração (Dias 8-14)',
        color: 'orange',
        items: {
          frutas: [
            { id: 'banana-2', name: 'Banana', quantity: '8 unidades', substitute: 'Banana da terra' },
            { id: 'pera', name: 'Pêra', quantity: '2 unidades', substitute: 'Maçã' },
            { id: 'abacate', name: 'Abacate', quantity: '2 unidades', substitute: 'Manga' },
            { id: 'frutas-vermelhas', name: 'Mix frutas vermelhas', quantity: '400g', substitute: 'Açaí' },
            { id: 'laranja', name: 'Laranja', quantity: '2 unidades', substitute: 'Tangerina' },
            { id: 'toranja', name: 'Toranja', quantity: '1 unidade', substitute: 'Pomelo' },
            { id: 'mirtilo', name: 'Mirtilo', quantity: '200g', substitute: 'Amora' },
            { id: 'framboesa', name: 'Framboesa', quantity: '200g', substitute: 'Morango' },
            { id: 'acai-2', name: 'Açaí', quantity: '300g', substitute: 'Frutas vermelhas' }
          ],
          vegetais: [
            { id: 'espinafre-2', name: 'Espinafre', quantity: '600g', substitute: 'Couve' },
            { id: 'gengibre-2', name: 'Gengibre', quantity: '1 pedaço (8cm)', substitute: 'Cúrcuma' },
            { id: 'pepino-2', name: 'Pepino', quantity: '2 unidades', substitute: 'Abobrinha' },
            { id: 'curcuma', name: 'Cúrcuma', quantity: '50g', substitute: 'Gengibre' }
          ],
          proteinas: [
            { id: 'whey-protein', name: 'Whey protein (chocolate)', quantity: '1 pote', substitute: 'Proteína vegetal' },
            { id: 'pasta-amendoim', name: 'Pasta de amendoim', quantity: '1 pote', substitute: 'Tahine' }
          ],
          outros: [
            { id: 'matcha', name: 'Matcha em pó', quantity: '100g', substitute: 'Chá verde em pó' },
            { id: 'agua-coco-2', name: 'Água de coco', quantity: '1.5L', substitute: 'Água comum' },
            { id: 'leite-amendoas-2', name: 'Leite de amêndoas', quantity: '1L', substitute: 'Leite de aveia' },
            { id: 'aveia-2', name: 'Aveia', quantity: '200g', substitute: 'Quinoa em flocos' },
            { id: 'sal-marinho', name: 'Sal marinho', quantity: '1 pote', substitute: 'Sal comum' },
            { id: 'chia-2', name: 'Chia', quantity: '200g', substitute: 'Linhaça' },
            { id: 'leite-coco-2', name: 'Leite de coco', quantity: '400ml', substitute: 'Leite de amêndoas' },
            { id: 'spirulina-2', name: 'Spirulina', quantity: '100g', substitute: 'Chlorella' }
          ]
        }
      },
      3: {
        title: 'Semana 3 - Definição (Dias 15-21)',
        color: 'purple',
        items: {
          frutas: [
            { id: 'banana-3', name: 'Banana', quantity: '8 unidades', substitute: 'Banana da terra' },
            { id: 'frutas-vermelhas-3', name: 'Frutas vermelhas', quantity: '300g', substitute: 'Açaí' },
            { id: 'manga', name: 'Manga', quantity: '1 unidade', substitute: 'Abacaxi' },
            { id: 'kiwi', name: 'Kiwi', quantity: '2 unidades', substitute: 'Abacaxi' },
            { id: 'acai-3', name: 'Açaí', quantity: '400g', substitute: 'Frutas vermelhas' },
            { id: 'maca-3', name: 'Maçã', quantity: '2 unidades', substitute: 'Pêra' },
            { id: 'beterraba-fruta', name: 'Beterraba pequena', quantity: '2 unidades', substitute: 'Cenoura' },
            { id: 'cenoura', name: 'Cenoura', quantity: '2 unidades', substitute: 'Beterraba' },
            { id: 'tamaras', name: 'Tâmaras', quantity: '200g', substitute: 'Mel' }
          ],
          vegetais: [
            { id: 'couve-3', name: 'Couve', quantity: '2 maços', substitute: 'Espinafre' },
            { id: 'pepino-3', name: 'Pepino', quantity: '2 unidades', substitute: 'Abobrinha' },
            { id: 'aipo', name: 'Aipo', quantity: '1 maço', substitute: 'Pepino' },
            { id: 'gengibre-3', name: 'Gengibre', quantity: '1 pedaço (5cm)', substitute: 'Cúrcuma' }
          ],
          proteinas: [
            { id: 'proteina-vegetal', name: 'Proteína vegetal', quantity: '1 pote', substitute: 'Whey protein' },
            { id: 'proteina-baunilha', name: 'Proteína (baunilha)', quantity: '1 pote', substitute: 'Whey protein' },
            { id: 'proteina-chocolate', name: 'Proteína (chocolate)', quantity: '1 pote', substitute: 'Whey protein' },
            { id: 'whey-protein-3', name: 'Whey protein', quantity: '1 pote', substitute: 'Proteína vegetal' },
            { id: 'iogurte-grego', name: 'Iogurte grego', quantity: '500g', substitute: 'Cottage' },
            { id: 'quinoa-flocos', name: 'Quinoa em flocos', quantity: '300g', substitute: 'Aveia' },
            { id: 'pasta-amendoim-3', name: 'Pasta de amendoim', quantity: '1 pote', substitute: 'Tahine' }
          ],
          outros: [
            { id: 'mel-3', name: 'Mel', quantity: '1 pote', substitute: 'Stevia' },
            { id: 'linhaça', name: 'Linhaça', quantity: '200g', substitute: 'Chia' },
            { id: 'leite-amendoas-3', name: 'Leite de amêndoas', quantity: '1.5L', substitute: 'Leite de aveia' },
            { id: 'leite-coco-3', name: 'Leite de coco', quantity: '800ml', substitute: 'Leite de amêndoas' },
            { id: 'coco-ralado', name: 'Coco ralado', quantity: '200g', substitute: 'Coco fresco' },
            { id: 'agua-coco-3', name: 'Água de coco', quantity: '1L', substitute: 'Água comum' },
            { id: 'granola', name: 'Granola', quantity: '300g', substitute: 'Aveia' },
            { id: 'cacau-3', name: 'Cacau em pó', quantity: '200g', substitute: 'Alfarroba' },
            { id: 'baunilha', name: 'Extrato de baunilha', quantity: '1 frasco', substitute: 'Essência de baunilha' },
            { id: 'leite-desnatado', name: 'Leite desnatado', quantity: '500ml', substitute: 'Leite de amêndoas' },
            { id: 'aveia-3', name: 'Aveia', quantity: '200g', substitute: 'Quinoa em flocos' },
            { id: 'agua-3', name: 'Água', quantity: '2L', substitute: 'Água de coco' }
          ]
        }
      }
    };

    return weekData[week as keyof typeof weekData] || weekData[1];
  };

  const weekData = getWeekData(selectedWeek);
  const categories = [
    { key: 'frutas', label: 'Frutas', icon: Apple, color: 'text-green-400' },
    { key: 'vegetais', label: 'Vegetais', icon: Carrot, color: 'text-orange-400' },
    { key: 'proteinas', label: 'Proteínas', icon: Beef, color: 'text-red-400' },
    { key: 'outros', label: 'Outros', icon: Package, color: 'text-blue-400' }
  ];

  const toggleItem = (itemId: string) => {
    setCheckedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const getTotalItems = () => {
    return Object.values(weekData.items).reduce((total, items) => total + items.length, 0);
  };

  const getCheckedCount = () => {
    const allItems = Object.values(weekData.items).flat();
    return allItems.filter(item => checkedItems.includes(item.id)).length;
  };

  const colorClasses = {
    green: 'bg-green-400/10 border-green-400/30 text-green-400',
    orange: 'bg-orange-400/10 border-orange-400/30 text-orange-400',
    purple: 'bg-purple-400/10 border-purple-400/30 text-purple-400'
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="px-4 py-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <ShoppingCart className="w-12 h-12 text-green-400 mx-auto" />
          <h1 className="text-2xl font-bold text-green-400">
            Lista de Compras
          </h1>
          <p className="text-gray-300">
            Ingredientes organizados por semana
          </p>
        </div>

        {/* Week Selector */}
        <div className="flex space-x-2">
          {[1, 2, 3].map((week) => {
            const isActive = selectedWeek === week;
            const isUnlocked = currentDay >= (week - 1) * 7 + 1;
            const colors = ['green', 'orange', 'purple'];
            const colorClass = colorClasses[colors[week - 1] as keyof typeof colorClasses];
            
            return (
              <button
                key={week}
                onClick={() => isUnlocked && setSelectedWeek(week)}
                disabled={!isUnlocked}
                className={`
                  flex-1 p-4 rounded-xl transition-all duration-200 text-center
                  ${isActive 
                    ? colorClass.replace('/10', '/20').replace('/30', '/50')
                    : isUnlocked 
                      ? colorClass + ' hover:opacity-80' 
                      : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                <div className="font-bold">Semana {week}</div>
                <div className="text-xs opacity-75">
                  {week === 1 ? 'Desintox' : week === 2 ? 'Acelera' : 'Define'}
                </div>
                {!isUnlocked && (
                  <div className="text-xs mt-1">🔒</div>
                )}
              </button>
            );
          })}
        </div>

        {/* Progress */}
        <div className={`border rounded-2xl p-4 ${colorClasses[weekData.color as keyof typeof colorClasses]}`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold">{weekData.title}</h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm">{getCheckedCount()}/{getTotalItems()}</span>
              <button
                onClick={() => setCheckedItems([])}
                className="p-1 hover:bg-white/10 rounded"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-current rounded-full transition-all duration-500"
              style={{ width: `${(getCheckedCount() / getTotalItems()) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Shopping Categories */}
        <div className="space-y-6">
          {categories.map((category) => {
            const items = weekData.items[category.key as keyof typeof weekData.items] || [];
            if (items.length === 0) return null;

            const Icon = category.icon;
            const categoryChecked = items.filter(item => checkedItems.includes(item.id)).length;
            
            return (
              <div key={category.key} className="bg-gray-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon className={`w-5 h-5 ${category.color}`} />
                    <h3 className="text-lg font-bold text-white">
                      {category.label}
                    </h3>
                  </div>
                  <div className="text-sm text-gray-400">
                    {categoryChecked}/{items.length}
                  </div>
                </div>

                <div className="space-y-2">
                  {items.map((item) => {
                    const isChecked = checkedItems.includes(item.id);
                    
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleItem(item.id)}
                        className={`
                          p-3 rounded-xl border transition-all duration-200 cursor-pointer
                          ${isChecked 
                            ? 'bg-green-400/10 border-green-400/30 opacity-60' 
                            : 'bg-gray-700 border-gray-600 hover:bg-gray-600'
                          }
                        `}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                            isChecked ? 'border-green-400 bg-green-400' : 'border-gray-500'
                          }`}>
                            {isChecked && <Check className="w-3 h-3 text-gray-900" />}
                          </div>
                          
                          <div className="flex-1">
                            <div className={`font-medium ${isChecked ? 'line-through text-gray-400' : 'text-white'}`}>
                              {item.name}
                            </div>
                            <div className="text-gray-400 text-sm">
                              {item.quantity}
                            </div>
                          </div>

                          <div className="text-xs text-gray-500">
                            Alt: {item.substitute}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tips */}
        <div className="bg-gradient-to-r from-blue-400/10 to-purple-400/10 border border-blue-400/30 rounded-2xl p-6 space-y-3">
          <h3 className="text-lg font-bold text-blue-400">💡 Dicas de Compras</h3>
          <div className="space-y-2 text-sm text-gray-300">
            <p>• Compre frutas em diferentes estágios de maturação</p>
            <p>• Congele frutas maduras para smoothies mais cremosos</p>
            <p>• As substituições mantêm valor nutricional similar</p>
            <p>• Prefira orgânicos quando possível</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingList;