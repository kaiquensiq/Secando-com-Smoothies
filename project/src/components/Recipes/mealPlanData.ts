export interface Meal {
  type: 'Café da manhã' | 'Lanche da manhã' | 'Almoço' | 'Lanche da tarde' | 'Jantar' | 'Ceia';
  name: string;
  items: string[];
  calories?: number;
  isSmoothie?: boolean;
}

export interface DayMealPlan {
  day: number;
  phase: 'Desintoxicação' | 'Aceleração' | 'Definição';
  objective: string;
  strategy: string;
  meals: Meal[];
}

export const mealPlan: DayMealPlan[] = [
  {
    day: 1,
    phase: 'Desintoxicação',
    objective: 'Adaptar o corpo ao déficit calórico de forma gradual, reduzir inflamação e aumentar energia.',
    strategy: 'Refeições simples, porções controladas, foco em proteínas magras + carboidratos de baixo índice glicêmico + gorduras boas.',
    meals: [
      {
        type: 'Café da manhã',
        name: 'Omelete Nutritivo',
        items: [
          'Omelete de 2 claras + 1 gema com espinafre e tomate',
          '1 fatia de pão integral'
        ],
        calories: 250
      },
      {
        type: 'Lanche da manhã',
        name: 'Smoothie Detox Verde',
        items: [
          '1 maçã',
          '1 folha de couve',
          '200 ml de água',
          '1 colher de chia'
        ],
        calories: 85,
        isSmoothie: true
      },
      {
        type: 'Almoço',
        name: 'Frango com Arroz Integral',
        items: [
          '100g de peito de frango grelhado',
          '3 colheres (sopa) de arroz integral',
          'Brócolis cozido no vapor'
        ],
        calories: 350
      },
      {
        type: 'Lanche da tarde',
        name: 'Iogurte com Linhaça',
        items: [
          'Iogurte natural sem açúcar',
          '1 colher de linhaça'
        ],
        calories: 120
      },
      {
        type: 'Jantar',
        name: 'Peixe Grelhado',
        items: [
          '120g de peixe grelhado (tilápia/salmão)',
          'Salada de alface, rúcula e cenoura ralada'
        ],
        calories: 280
      },
      {
        type: 'Ceia',
        name: 'Chá Relaxante',
        items: ['Chá de camomila'],
        calories: 0
      }
    ]
  },
  {
    day: 2,
    phase: 'Desintoxicação',
    objective: 'Adaptar o corpo ao déficit calórico de forma gradual, reduzir inflamação e aumentar energia.',
    strategy: 'Refeições simples, porções controladas, foco em proteínas magras + carboidratos de baixo índice glicêmico + gorduras boas.',
    meals: [
      {
        type: 'Café da manhã',
        name: 'Smoothie Energético de Frutas Vermelhas',
        items: [
          '150 ml de leite vegetal',
          '1/2 banana',
          '1/2 xícara de morangos',
          '1 colher de aveia'
        ],
        calories: 180,
        isSmoothie: true
      },
      {
        type: 'Lanche da manhã',
        name: 'Castanhas',
        items: ['5 castanhas-do-pará'],
        calories: 100
      },
      {
        type: 'Almoço',
        name: 'Frango com Quinoa',
        items: [
          '100g de frango desfiado',
          'Quinoa cozida (3 colheres)',
          'Abobrinha e berinjela grelhadas'
        ],
        calories: 380
      },
      {
        type: 'Lanche da tarde',
        name: 'Maçã com Canela',
        items: [
          '1 maçã',
          'canela em pó'
        ],
        calories: 80
      },
      {
        type: 'Jantar',
        name: 'Ovos com Salada',
        items: [
          '2 ovos cozidos',
          'Mix de folhas verdes com azeite de oliva'
        ],
        calories: 220
      },
      {
        type: 'Ceia',
        name: 'Água com Limão',
        items: ['1 copo de água morna com limão'],
        calories: 5
      }
    ]
  },
  {
    day: 3,
    phase: 'Desintoxicação',
    objective: 'Adaptar o corpo ao déficit calórico de forma gradual, reduzir inflamação e aumentar energia.',
    strategy: 'Refeições simples, porções controladas, foco em proteínas magras + carboidratos de baixo índice glicêmico + gorduras boas.',
    meals: [
      {
        type: 'Café da manhã',
        name: 'Panqueca de Aveia',
        items: [
          'Panqueca de aveia (1 ovo + 2 colheres de aveia + 1/2 banana amassada)'
        ],
        calories: 200
      },
      {
        type: 'Lanche da manhã',
        name: 'Smoothie Tropical',
        items: [
          '1 fatia de abacaxi',
          '200 ml de água de coco',
          'hortelã',
          '1 colher de linhaça'
        ],
        calories: 95,
        isSmoothie: true
      },
      {
        type: 'Almoço',
        name: 'Frango com Batata-doce',
        items: [
          '100g de peito de frango grelhado',
          '2 colheres (sopa) de batata-doce cozida',
          'Mix de legumes no vapor'
        ],
        calories: 320
      },
      {
        type: 'Lanche da tarde',
        name: 'Iogurte Grego',
        items: ['1 iogurte grego sem açúcar'],
        calories: 100
      },
      {
        type: 'Jantar',
        name: 'Carne Magra Refogada',
        items: [
          '100g de carne magra (patinho moído refogado com cebola e tomate)',
          'Salada de pepino e rúcula'
        ],
        calories: 250
      },
      {
        type: 'Ceia',
        name: 'Chá de Hortelã',
        items: ['Chá de hortelã'],
        calories: 0
      }
    ]
  },
  {
    day: 4,
    phase: 'Desintoxicação',
    objective: 'Adaptar o corpo ao déficit calórico de forma gradual, reduzir inflamação e aumentar energia.',
    strategy: 'Refeições simples, porções controladas, foco em proteínas magras + carboidratos de baixo índice glicêmico + gorduras boas.',
    meals: [
      {
        type: 'Café da manhã',
        name: 'Smoothie Verde Energizante',
        items: [
          '1 fatia de manga',
          '1 folha de couve',
          'gengibre ralado',
          '200 ml de água'
        ],
        calories: 90,
        isSmoothie: true
      },
      {
        type: 'Lanche da manhã',
        name: 'Amêndoas',
        items: ['1 punhado de amêndoas (30g)'],
        calories: 170
      },
      {
        type: 'Almoço',
        name: 'Frango com Arroz e Salada',
        items: [
          '100g de peito de frango grelhado',
          '3 colheres (sopa) de arroz integral',
          'Salada de tomate, pepino e alface'
        ],
        calories: 350
      },
      {
        type: 'Lanche da tarde',
        name: 'Pera com Chia',
        items: [
          '1 pera',
          '1 colher de semente de chia'
        ],
        calories: 100
      },
      {
        type: 'Jantar',
        name: 'Omelete de Vegetais',
        items: [
          'Omelete com 2 ovos, espinafre e cogumelos'
        ],
        calories: 180
      },
      {
        type: 'Ceia',
        name: 'Chá de Camomila',
        items: ['Chá de camomila'],
        calories: 0
      }
    ]
  },
  {
    day: 5,
    phase: 'Desintoxicação',
    objective: 'Adaptar o corpo ao déficit calórico de forma gradual, reduzir inflamação e aumentar energia.',
    strategy: 'Refeições simples, porções controladas, foco em proteínas magras + carboidratos de baixo índice glicêmico + gorduras boas.',
    meals: [
      {
        type: 'Café da manhã',
        name: 'Ovos Mexidos',
        items: [
          '2 ovos mexidos',
          '1 fatia de pão integral'
        ],
        calories: 280
      },
      {
        type: 'Lanche da manhã',
        name: 'Smoothie de Cacau Energético',
        items: [
          '200 ml de leite vegetal',
          '1 banana',
          '1 colher de cacau em pó 100%',
          '1 colher de chia'
        ],
        calories: 150,
        isSmoothie: true
      },
      {
        type: 'Almoço',
        name: 'Peixe com Batata-doce',
        items: [
          '120g de peixe assado com limão',
          'Purê de batata-doce (3 colheres)',
          'Couve refogada'
        ],
        calories: 380
      },
      {
        type: 'Lanche da tarde',
        name: 'Iogurte com Mel',
        items: [
          '1 iogurte natural',
          '1 colher de mel'
        ],
        calories: 140
      },
      {
        type: 'Jantar',
        name: 'Frango Desfiado',
        items: [
          '120g de frango desfiado',
          'Salada verde variada'
        ],
        calories: 200
      },
      {
        type: 'Ceia',
        name: 'Chá de Camomila',
        items: ['1 xícara de chá de camomila'],
        calories: 0
      }
    ]
  },
  {
    day: 6,
    phase: 'Desintoxicação',
    objective: 'Adaptar o corpo ao déficit calórico de forma gradual, reduzir inflamação e aumentar energia.',
    strategy: 'Refeições simples, porções controladas, foco em proteínas magras + carboidratos de baixo índice glicêmico + gorduras boas.',
    meals: [
      {
        type: 'Café da manhã',
        name: 'Panqueca de Banana',
        items: [
          'Panqueca de banana',
          '1 colher de pasta de amendoim integral'
        ],
        calories: 250
      },
      {
        type: 'Lanche da manhã',
        name: 'Smoothie Detox de Limão e Pepino',
        items: [
          '1/2 pepino',
          '1 limão espremido',
          '200 ml de água',
          'hortelã'
        ],
        calories: 25,
        isSmoothie: true
      },
      {
        type: 'Almoço',
        name: 'Frango com Quinoa',
        items: [
          '100g de peito de frango grelhado',
          '3 colheres (sopa) de quinoa',
          'Legumes no vapor'
        ],
        calories: 380
      },
      {
        type: 'Lanche da tarde',
        name: 'Maçã',
        items: ['1 maçã'],
        calories: 80
      },
      {
        type: 'Jantar',
        name: 'Peixe Grelhado',
        items: [
          '120g de peixe grelhado',
          'Salada de rúcula com tomate'
        ],
        calories: 250
      },
      {
        type: 'Ceia',
        name: 'Água com Gengibre',
        items: ['1 copo de água morna com gengibre'],
        calories: 5
      }
    ]
  },
  {
    day: 7,
    phase: 'Desintoxicação',
    objective: 'Adaptar o corpo ao déficit calórico de forma gradual, reduzir inflamação e aumentar energia.',
    strategy: 'Refeições simples, porções controladas, foco em proteínas magras + carboidratos de baixo índice glicêmico + gorduras boas.',
    meals: [
      {
        type: 'Café da manhã',
        name: 'Smoothie Energético de Aveia',
        items: [
          '1 banana',
          '1 colher de aveia',
          '200 ml de leite vegetal',
          '1 colher de pasta de amendoim'
        ],
        calories: 220,
        isSmoothie: true
      },
      {
        type: 'Lanche da manhã',
        name: 'Nozes',
        items: ['1 punhado de nozes (30g)'],
        calories: 200
      },
      {
        type: 'Almoço',
        name: 'Carne Magra Grelhada',
        items: [
          '120g de carne magra grelhada',
          '2 colheres (sopa) de arroz integral',
          'Brócolis cozido no vapor'
        ],
        calories: 400
      },
      {
        type: 'Lanche da tarde',
        name: 'Iogurte com Chia',
        items: [
          '1 iogurte natural',
          '1 colher de chia'
        ],
        calories: 120
      },
      {
        type: 'Jantar',
        name: 'Omelete de Claras',
        items: [
          'Omelete de claras (3 claras + espinafre + cebola)',
          'Salada verde com azeite'
        ],
        calories: 150
      },
      {
        type: 'Ceia',
        name: 'Chá de Camomila',
        items: ['Chá de camomila'],
        calories: 0
      }
    ]
  },
  {
    day: 8,
    phase: 'Aceleração',
    objective: 'Queima de gordura e estabilização.',
    strategy: 'Smoothies mais proteicos com fibras e termogênicos. Refeições sólidas equilibradas, mantendo baixo índice glicêmico.',
    meals: [
      {
        type: 'Café da manhã',
        name: 'Smoothie Proteico Vermelho',
        items: [
          '200 ml de leite vegetal',
          '1/2 xícara de morangos',
          '1 scoop de proteína (whey ou vegetal)',
          '1 colher de chia'
        ],
        calories: 280,
        isSmoothie: true
      },
      {
        type: 'Lanche da manhã',
        name: 'Maçã com Castanhas',
        items: [
          '1 maçã',
          '5 castanhas de caju'
        ],
        calories: 150
      },
      {
        type: 'Almoço',
        name: 'Frango com Arroz Integral',
        items: [
          '120g de peito de frango grelhado',
          '3 colheres (sopa) de arroz integral',
          'Brócolis e cenoura cozidos'
        ],
        calories: 380
      },
      {
        type: 'Lanche da tarde',
        name: 'Smoothie Verde Termogênico',
        items: [
          '1 folha de couve',
          '1/2 limão espremido',
          '1/2 pepino',
          'gengibre ralado',
          '200 ml de água'
        ],
        calories: 45,
        isSmoothie: true
      },
      {
        type: 'Jantar',
        name: 'Peixe com Salada',
        items: [
          '120g de peixe assado',
          'Salada de folhas verdes com azeite'
        ],
        calories: 250
      },
      {
        type: 'Ceia',
        name: 'Chá de Camomila',
        items: ['Chá de camomila'],
        calories: 5
      }
    ]
  },
  {
    day: 9,
    phase: 'Aceleração',
    objective: 'Queima de gordura e estabilização.',
    strategy: 'Smoothies mais proteicos com fibras e termogênicos. Refeições sólidas equilibradas, mantendo baixo índice glicêmico.',
    meals: [
      {
        type: 'Café da manhã',
        name: 'Omelete Integral',
        items: [
          'Omelete de 2 ovos + 1 clara, espinafre e tomate',
          '1 fatia de pão integral'
        ],
        calories: 320
      },
      {
        type: 'Lanche da manhã',
        name: 'Smoothie Tropical Proteico',
        items: [
          '1/2 banana',
          '1/2 manga',
          '200 ml de leite vegetal',
          '1 scoop proteína'
        ],
        calories: 290,
        isSmoothie: true
      },
      {
        type: 'Almoço',
        name: 'Frango com Quinoa',
        items: [
          '120g de peito de frango ou frango desfiado',
          'Quinoa (3 colheres)',
          'Abobrinha grelhada'
        ],
        calories: 400
      },
      {
        type: 'Lanche da tarde',
        name: 'Iogurte com Linhaça',
        items: [
          '1 iogurte natural sem açúcar',
          '1 colher de linhaça'
        ],
        calories: 120
      },
      {
        type: 'Jantar',
        name: 'Carne Magra com Salada',
        items: [
          '120g de carne magra (patinho) grelhada',
          'Salada de rúcula, tomate e cenoura'
        ],
        calories: 280
      },
      {
        type: 'Ceia',
        name: 'Chá de Hortelã',
        items: ['Chá de hortelã'],
        calories: 5
      }
    ]
  },
  {
    day: 10,
    phase: 'Aceleração',
    objective: 'Queima de gordura e estabilização.',
    strategy: 'Smoothies mais proteicos com fibras e termogênicos. Refeições sólidas equilibradas, mantendo baixo índice glicêmico.',
    meals: [
      {
        type: 'Café da manhã',
        name: 'Smoothie Energético de Aveia e Banana',
        items: [
          '1 banana',
          '1 colher de aveia',
          '200 ml de leite vegetal',
          '1 colher de pasta de amendoim'
        ],
        calories: 350,
        isSmoothie: true
      },
      {
        type: 'Lanche da manhã',
        name: 'Amêndoas',
        items: ['1 punhado de amêndoas (30g)'],
        calories: 170
      },
      {
        type: 'Almoço',
        name: 'Frango com Arroz e Legumes',
        items: [
          '120g de peito de frango grelhado',
          '3 colheres (sopa) de arroz integral',
          'Brócolis e couve-flor no vapor'
        ],
        calories: 380
      },
      {
        type: 'Lanche da tarde',
        name: 'Smoothie Verde Detox',
        items: [
          '1 folha de couve',
          '1 fatia de abacaxi',
          'hortelã',
          '200 ml de água'
        ],
        calories: 60,
        isSmoothie: true
      },
      {
        type: 'Jantar',
        name: 'Omelete de Cogumelos',
        items: ['Omelete de 2 ovos + cogumelos + espinafre'],
        calories: 220
      },
      {
        type: 'Ceia',
        name: 'Água com Limão',
        items: ['1 copo de água morna com limão'],
        calories: 10
      }
    ]
  },
  {
    day: 11,
    phase: 'Aceleração',
    objective: 'Queima de gordura e estabilização.',
    strategy: 'Smoothies mais proteicos com fibras e termogênicos. Refeições sólidas equilibradas, mantendo baixo índice glicêmico.',
    meals: [
      {
        type: 'Café da manhã',
        name: 'Panqueca de Aveia',
        items: ['Panqueca de aveia (1 ovo + 2 colheres de aveia + 1/2 banana)'],
        calories: 280
      },
      {
        type: 'Lanche da manhã',
        name: 'Smoothie Proteico Vermelho',
        items: [
          '1/2 xícara de morangos',
          '1 scoop de proteína',
          '200 ml leite vegetal',
          '1 colher de chia'
        ],
        calories: 280,
        isSmoothie: true
      },
      {
        type: 'Almoço',
        name: 'Peixe com Batata-doce',
        items: [
          '120g de peixe grelhado',
          '2 colheres (sopa) de batata-doce',
          'Legumes no vapor'
        ],
        calories: 350
      },
      {
        type: 'Lanche da tarde',
        name: 'Iogurte Natural',
        items: ['1 iogurte natural sem açúcar'],
        calories: 80
      },
      {
        type: 'Jantar',
        name: 'Frango Desfiado com Salada',
        items: [
          '120g de peito de frango desfiado',
          'Salada de folhas verdes'
        ],
        calories: 200
      },
      {
        type: 'Ceia',
        name: 'Chá de Camomila',
        items: ['Chá de camomila'],
        calories: 5
      }
    ]
  },
  {
    day: 12,
    phase: 'Aceleração',
    objective: 'Queima de gordura e estabilização.',
    strategy: 'Smoothies mais proteicos com fibras e termogênicos. Refeições sólidas equilibradas, mantendo baixo índice glicêmico.',
    meals: [
      {
        type: 'Café da manhã',
        name: 'Smoothie Verde Termogênico',
        items: [
          '1 folha de couve',
          '1/2 pepino',
          '1/2 limão',
          'gengibre',
          '200 ml água'
        ],
        calories: 45,
        isSmoothie: true
      },
      {
        type: 'Lanche da manhã',
        name: 'Nozes',
        items: ['1 punhado de nozes (30g)'],
        calories: 200
      },
      {
        type: 'Almoço',
        name: 'Proteína com Quinoa',
        items: [
          '120g de frango ou carne magra grelhada',
          '3 colheres (sopa) de quinoa',
          'Mix de legumes cozidos'
        ],
        calories: 420
      },
      {
        type: 'Lanche da tarde',
        name: 'Smoothie Tropical Proteico',
        items: [
          '1/2 banana',
          '1/2 manga',
          '1 scoop proteína',
          '200 ml leite vegetal'
        ],
        calories: 290,
        isSmoothie: true
      },
      {
        type: 'Jantar',
        name: 'Omelete de Claras',
        items: ['Omelete de claras (3 claras + espinafre + cogumelos)'],
        calories: 120
      },
      {
        type: 'Ceia',
        name: 'Chá de Hortelã',
        items: ['Chá de hortelã'],
        calories: 5
      }
    ]
  },
  {
    day: 13,
    phase: 'Aceleração',
    objective: 'Queima de gordura e estabilização.',
    strategy: 'Smoothies mais proteicos com fibras e termogênicos. Refeições sólidas equilibradas, mantendo baixo índice glicêmico.',
    meals: [
      {
        type: 'Café da manhã',
        name: 'Ovos Mexidos',
        items: [
          '2 ovos mexidos',
          '1 fatia de pão integral'
        ],
        calories: 300
      },
      {
        type: 'Lanche da manhã',
        name: 'Smoothie Energético de Aveia',
        items: [
          '1 banana',
          '1 colher de aveia',
          '1 colher de pasta de amendoim',
          '200 ml leite vegetal'
        ],
        calories: 350,
        isSmoothie: true
      },
      {
        type: 'Almoço',
        name: 'Frango com Arroz e Brócolis',
        items: [
          '120g de peito de frango grelhado',
          '3 colheres (sopa) de arroz integral',
          'Brócolis cozido no vapor'
        ],
        calories: 380
      },
      {
        type: 'Lanche da tarde',
        name: 'Maçã com Canela',
        items: [
          '1 maçã',
          'canela em pó'
        ],
        calories: 80
      },
      {
        type: 'Jantar',
        name: 'Peixe com Salada',
        items: [
          '120g de peixe assado',
          'Salada de folhas verdes'
        ],
        calories: 250
      },
      {
        type: 'Ceia',
        name: 'Chá de Camomila',
        items: ['Chá de camomila'],
        calories: 5
      }
    ]
  },
  {
    day: 14,
    phase: 'Aceleração',
    objective: 'Queima de gordura e estabilização.',
    strategy: 'Smoothies mais proteicos com fibras e termogênicos. Refeições sólidas equilibradas, mantendo baixo índice glicêmico.',
    meals: [
      {
        type: 'Café da manhã',
        name: 'Smoothie Proteico Vermelho',
        items: [
          '1/2 xícara de morangos',
          '1/2 banana',
          '1 scoop de proteína',
          '200 ml leite vegetal'
        ],
        calories: 300,
        isSmoothie: true
      },
      {
        type: 'Lanche da manhã',
        name: 'Castanhas',
        items: ['1 punhado de castanhas (30g)'],
        calories: 180
      },
      {
        type: 'Almoço',
        name: 'Carne com Batata-doce',
        items: [
          '120g de carne magra grelhada',
          '2 colheres (sopa) de batata-doce',
          'Legumes variados'
        ],
        calories: 380
      },
      {
        type: 'Lanche da tarde',
        name: 'Smoothie Verde Detox',
        items: [
          '1 folha de couve',
          '1 fatia de abacaxi',
          'hortelã',
          '200 ml de água'
        ],
        calories: 60,
        isSmoothie: true
      },
      {
        type: 'Jantar',
        name: 'Omelete com Vegetais',
        items: ['Omelete de 2 ovos + espinafre + cogumelos'],
        calories: 220
      },
      {
        type: 'Ceia',
        name: 'Chá de Camomila',
        items: ['Chá de camomila'],
        calories: 5
      }
    ]
  },
  {
    day: 15,
    phase: 'Definição',
    objective: 'Definição corporal, manutenção de energia, hábitos duradouros.',
    strategy: 'Smoothies funcionais para recuperação e saciedade. Refeições sólidas balanceadas, priorizando proteínas magras, vegetais e carboidratos de baixo índice glicêmico.',
    meals: [
      {
        type: 'Café da manhã',
        name: 'Smoothie Proteico Energético',
        items: [
          '1 banana',
          '1 scoop de proteína',
          '200 ml de leite vegetal',
          '1 colher de aveia'
        ],
        calories: 320,
        isSmoothie: true
      },
      {
        type: 'Lanche da manhã',
        name: 'Castanhas',
        items: ['1 punhado de castanhas (30g)'],
        calories: 180
      },
      {
        type: 'Almoço',
        name: 'Frango com Arroz e Legumes',
        items: [
          '120g de peito de frango grelhado',
          '3 colheres (sopa) de arroz integral',
          'Brócolis e cenoura no vapor'
        ],
        calories: 380
      },
      {
        type: 'Lanche da tarde',
        name: 'Smoothie Verde Detox',
        items: [
          '1 folha de couve',
          '1/2 pepino',
          '1/2 limão',
          'hortelã',
          '200 ml de água'
        ],
        calories: 45,
        isSmoothie: true
      },
      {
        type: 'Jantar',
        name: 'Omelete de Claras',
        items: ['Omelete de claras (3 claras + espinafre + cogumelos)'],
        calories: 120
      },
      {
        type: 'Ceia',
        name: 'Chá de Camomila',
        items: ['Chá de camomila'],
        calories: 5
      }
    ]
  },
  {
    day: 16,
    phase: 'Definição',
    objective: 'Definição corporal, manutenção de energia, hábitos duradouros.',
    strategy: 'Smoothies funcionais para recuperação e saciedade. Refeições sólidas balanceadas, priorizando proteínas magras, vegetais e carboidratos de baixo índice glicêmico.',
    meals: [
      {
        type: 'Café da manhã',
        name: 'Ovos Mexidos',
        items: [
          '2 ovos mexidos',
          '1 fatia de pão integral'
        ],
        calories: 300
      },
      {
        type: 'Lanche da manhã',
        name: 'Smoothie Tropical Proteico',
        items: [
          '1/2 banana',
          '1/2 manga',
          '1 scoop de proteína',
          '200 ml de leite vegetal'
        ],
        calories: 290,
        isSmoothie: true
      },
      {
        type: 'Almoço',
        name: 'Peixe com Batata-doce',
        items: [
          '120g de peixe assado',
          '2 colheres (sopa) de batata-doce',
          'Mix de legumes cozidos'
        ],
        calories: 350
      },
      {
        type: 'Lanche da tarde',
        name: 'Iogurte com Linhaça',
        items: [
          '1 iogurte natural',
          '1 colher de linhaça'
        ],
        calories: 120
      },
      {
        type: 'Jantar',
        name: 'Frango com Salada',
        items: [
          '120g de peito de frango grelhado',
          'Salada de folhas verdes'
        ],
        calories: 200
      },
      {
        type: 'Ceia',
        name: 'Chá de Hortelã',
        items: ['Chá de hortelã'],
        calories: 5
      }
    ]
  },
  {
    day: 17,
    phase: 'Definição',
    objective: 'Definição corporal, manutenção de energia, hábitos duradouros.',
    strategy: 'Smoothies funcionais para recuperação e saciedade. Refeições sólidas balanceadas, priorizando proteínas magras, vegetais e carboidratos de baixo índice glicêmico.',
    meals: [
      {
        type: 'Café da manhã',
        name: 'Smoothie Energético de Frutas Vermelhas',
        items: [
          '1/2 xícara de morangos',
          '1/2 banana',
          '1 scoop de proteína',
          '200 ml de leite vegetal'
        ],
        calories: 300,
        isSmoothie: true
      },
      {
        type: 'Lanche da manhã',
        name: 'Amêndoas',
        items: ['1 punhado de amêndoas (30g)'],
        calories: 170
      },
      {
        type: 'Almoço',
        name: 'Carne com Quinoa',
        items: [
          '120g de carne magra grelhada',
          '3 colheres (sopa) de quinoa',
          'Legumes no vapor'
        ],
        calories: 400
      },
      {
        type: 'Lanche da tarde',
        name: 'Smoothie Verde Termogênico',
        items: [
          '1 folha de couve',
          '1/2 limão',
          '1 fatia de abacaxi',
          'gengibre',
          '200 ml de água'
        ],
        calories: 60,
        isSmoothie: true
      },
      {
        type: 'Jantar',
        name: 'Omelete com Vegetais',
        items: ['Omelete de 2 ovos + espinafre + cogumelos'],
        calories: 220
      },
      {
        type: 'Ceia',
        name: 'Chá de Camomila',
        items: ['Chá de camomila'],
        calories: 5
      }
    ]
  },
  {
    day: 18,
    phase: 'Definição',
    objective: 'Definição corporal, manutenção de energia, hábitos duradouros.',
    strategy: 'Smoothies funcionais para recuperação e saciedade. Refeições sólidas balanceadas, priorizando proteínas magras, vegetais e carboidratos de baixo índice glicêmico.',
    meals: [
      {
        type: 'Café da manhã',
        name: 'Panqueca de Aveia',
        items: ['Panqueca de aveia (1 ovo + 2 colheres de aveia + 1/2 banana)'],
        calories: 280
      },
      {
        type: 'Lanche da manhã',
        name: 'Smoothie Proteico de Cacau',
        items: [
          '1 banana',
          '1 colher de cacau em pó 100%',
          '1 scoop de proteína',
          '200 ml de leite vegetal'
        ],
        calories: 310,
        isSmoothie: true
      },
      {
        type: 'Almoço',
        name: 'Frango com Arroz e Legumes',
        items: [
          '120g de peito de frango grelhado',
          '3 colheres (sopa) de arroz integral',
          'Brócolis e cenoura no vapor'
        ],
        calories: 380
      },
      {
        type: 'Lanche da tarde',
        name: 'Iogurte com Chia',
        items: [
          '1 iogurte natural',
          '1 colher de semente de chia'
        ],
        calories: 120
      },
      {
        type: 'Jantar',
        name: 'Peixe com Salada',
        items: [
          '120g de peixe grelhado',
          'Salada de folhas verdes'
        ],
        calories: 250
      },
      {
        type: 'Ceia',
        name: 'Chá de Camomila',
        items: ['Chá de camomila'],
        calories: 5
      }
    ]
  },
  {
    day: 19,
    phase: 'Definição',
    objective: 'Definição corporal, manutenção de energia, hábitos duradouros.',
    strategy: 'Smoothies funcionais para recuperação e saciedade. Refeições sólidas balanceadas, priorizando proteínas magras, vegetais e carboidratos de baixo índice glicêmico.',
    meals: [
      {
        type: 'Café da manhã',
        name: 'Smoothie Verde Detox',
        items: [
          '1 folha de couve',
          '1/2 pepino',
          '1/2 limão',
          'hortelã',
          '200 ml de água'
        ],
        calories: 45,
        isSmoothie: true
      },
      {
        type: 'Lanche da manhã',
        name: 'Nozes',
        items: ['1 punhado de nozes (30g)'],
        calories: 200
      },
      {
        type: 'Almoço',
        name: 'Frango com Batata-doce',
        items: [
          '120g de peito de frango grelhado',
          '2 colheres (sopa) de batata-doce',
          'Legumes cozidos'
        ],
        calories: 350
      },
      {
        type: 'Lanche da tarde',
        name: 'Smoothie Tropical Proteico',
        items: [
          '1/2 banana',
          '1/2 manga',
          '1 scoop de proteína',
          '200 ml de leite vegetal'
        ],
        calories: 290,
        isSmoothie: true
      },
      {
        type: 'Jantar',
        name: 'Omelete de Claras',
        items: ['Omelete de claras (3 claras + espinafre + cogumelos)'],
        calories: 120
      },
      {
        type: 'Ceia',
        name: 'Chá de Hortelã',
        items: ['Chá de hortelã'],
        calories: 5
      }
    ]
  },
  {
    day: 20,
    phase: 'Definição',
    objective: 'Definição corporal, manutenção de energia, hábitos duradouros.',
    strategy: 'Smoothies funcionais para recuperação e saciedade. Refeições sólidas balanceadas, priorizando proteínas magras, vegetais e carboidratos de baixo índice glicêmico.',
    meals: [
      {
        type: 'Café da manhã',
        name: 'Ovos Mexidos',
        items: [
          '2 ovos mexidos',
          '1 fatia de pão integral'
        ],
        calories: 300
      },
      {
        type: 'Lanche da manhã',
        name: 'Smoothie Energético de Aveia',
        items: [
          '1 banana',
          '1 colher de aveia',
          '1 colher de pasta de amendoim',
          '200 ml de leite vegetal'
        ],
        calories: 350,
        isSmoothie: true
      },
      {
        type: 'Almoço',
        name: 'Peixe com Quinoa',
        items: [
          '120g de peixe assado',
          '3 colheres (sopa) de quinoa',
          'Mix de legumes'
        ],
        calories: 370
      },
      {
        type: 'Lanche da tarde',
        name: 'Iogurte com Linhaça',
        items: [
          '1 iogurte natural',
          '1 colher de linhaça'
        ],
        calories: 120
      },
      {
        type: 'Jantar',
        name: 'Frango Desfiado com Salada',
        items: [
          '120g de frango desfiado',
          'Salada de folhas verdes'
        ],
        calories: 200
      },
      {
        type: 'Ceia',
        name: 'Chá de Camomila',
        items: ['Chá de camomila'],
        calories: 5
      }
    ]
  },
  {
    day: 21,
    phase: 'Definição',
    objective: 'Definição corporal, manutenção de energia, hábitos duradouros.',
    strategy: 'Smoothies funcionais para recuperação e saciedade. Refeições sólidas balanceadas, priorizando proteínas magras, vegetais e carboidratos de baixo índice glicêmico.',
    meals: [
      {
        type: 'Café da manhã',
        name: 'Smoothie Proteico Vermelho',
        items: [
          '1/2 xícara de morangos',
          '1/2 banana',
          '1 scoop de proteína',
          '200 ml de leite vegetal'
        ],
        calories: 300,
        isSmoothie: true
      },
      {
        type: 'Lanche da manhã',
        name: 'Castanhas',
        items: ['1 punhado de castanhas (30g)'],
        calories: 180
      },
      {
        type: 'Almoço',
        name: 'Carne com Arroz e Legumes',
        items: [
          '120g de carne magra grelhada',
          '2 colheres (sopa) de arroz integral',
          'Brócolis e cenoura no vapor'
        ],
        calories: 360
      },
      {
        type: 'Lanche da tarde',
        name: 'Smoothie Verde Detox',
        items: [
          '1 folha de couve',
          '1/2 limão',
          '1/2 pepino',
          'hortelã',
          '200 ml de água'
        ],
        calories: 45,
        isSmoothie: true
      },
      {
        type: 'Jantar',
        name: 'Omelete com Vegetais',
        items: ['Omelete de 2 ovos + espinafre + cogumelos'],
        calories: 220
      },
      {
        type: 'Ceia',
        name: 'Chá de Camomila',
        items: ['Chá de camomila'],
        calories: 5
      }
    ]
  }
];

export const getPhase1Info = () => {
  return {
    title: 'Fase 1 - Desintoxicação',
    duration: 'Dias 1 a 7',
    objective: 'Adaptar o corpo ao déficit calórico de forma gradual, reduzir inflamação e aumentar energia.',
    strategy: 'Refeições simples, porções controladas, foco em proteínas magras + carboidratos de baixo índice glicêmico + gorduras boas.',
    extras: '1 smoothie por dia (manhã ou tarde, conforme indicado).'
  };
};

export const getPhase2Info = () => {
  return {
    title: 'Fase 2 - Aceleração',
    duration: 'Dias 8 a 14',
    objective: 'Queima de gordura e estabilização.',
    strategy: 'Smoothies mais proteicos com fibras e termogênicos. Refeições sólidas equilibradas, mantendo baixo índice glicêmico.',
    extras: '2 smoothies por dia (manhã e tarde, conforme indicado).'
  };
};

export const getPhase3Info = () => {
  return {
    title: 'Fase 3 - Definição',
    duration: 'Dias 15 a 21',
    objective: 'Definição corporal, manutenção de energia, hábitos duradouros.',
    strategy: 'Smoothies funcionais para recuperação e saciedade. Refeições sólidas balanceadas, priorizando proteínas magras, vegetais e carboidratos de baixo índice glicêmico.',
    extras: '2 smoothies por dia (manhã e tarde, conforme indicado).'
  };
};

export const getDayMealPlan = (day: number): DayMealPlan | undefined => {
  return mealPlan.find(plan => plan.day === day);
};

export const getTotalCaloriesForDay = (day: number): number => {
  const dayPlan = getDayMealPlan(day);
  if (!dayPlan) return 0;
  
  return dayPlan.meals.reduce((total, meal) => total + (meal.calories || 0), 0);
};

export const getSmoothiesForDay = (day: number): Meal[] => {
  const dayPlan = getDayMealPlan(day);
  if (!dayPlan) return [];
  
  return dayPlan.meals.filter(meal => meal.isSmoothie);
};

// Get all available days in the meal plan
export const getAvailableDays = (): number[] => {
  return mealPlan.map(plan => plan.day).sort((a, b) => a - b);
};

// Check if a day is available in the meal plan
export const isDayAvailable = (day: number): boolean => {
  return day >= 1 && day <= 21;
};

export const getPhaseInfo = (day: number) => {
  if (day >= 1 && day <= 7) {
    return getPhase1Info();
  } else if (day >= 8 && day <= 14) {
    return getPhase2Info();
  } else if (day >= 15 && day <= 21) {
    return getPhase3Info();
  }
  return null;
};
