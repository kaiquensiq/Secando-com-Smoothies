export interface Recipe {
  day: number;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number;
  calories: number;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  tags: string[];
  tips: string;
  phase: 'Desintoxicação' | 'Aceleração' | 'Definição' | 'Extra';
  image: string;
}

export const recipesData: Recipe[] = [
  // Fase 1 - Desintoxicação
  {
    day: 1,
    name: "Smoothie Detox Verde",
    description: "Desintoxicação com sabor refrescante",
    ingredients: [
      "1 folha de couve",
      "1/2 pepino",
      "1/2 limão",
      "5 folhas de hortelã",
      "200 ml água"
    ],
    instructions: [
      "Lave bem a couve e retire os talos",
      "Corte o pepino em pedaços",
      "Esprema o limão",
      "Bata todos os ingredientes até homogeneizar",
      "Sirva imediatamente"
    ],
    prepTime: 3,
    calories: 45,
    difficulty: 'Fácil',
    tags: ['Detox', 'Low Sugar'],
    tips: "Substitua couve por espinafre ou pepino por abobrinha se preferir",
    phase: 'Desintoxicação',
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
  },
  {
    day: 2,
    name: "Smoothie Proteico Vermelho",
    description: "Saciedade e proteína com frutas vermelhas",
    ingredients: [
      "1/2 xícara morangos",
      "1/2 banana",
      "1 scoop proteína",
      "200 ml leite vegetal",
      "1 c.s. chia"
    ],
    instructions: [
      "Deixe a chia de molho por 10 minutos",
      "Bata todos os ingredientes até homogeneizar",
      "Ajuste consistência se necessário",
      "Sirva gelado"
    ],
    prepTime: 5,
    calories: 180,
    difficulty: 'Fácil',
    tags: ['Proteico', 'Antioxidante'],
    tips: "Substitua morangos por framboesa ou banana por maçã",
    phase: 'Desintoxicação',
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
  },
  {
    day: 3,
    name: "Smoothie Tropical",
    description: "Energético leve com sabor tropical",
    ingredients: [
      "1 fatia abacaxi",
      "1/2 banana",
      "200 ml água de coco",
      "5 folhas hortelã",
      "1 c.s. linhaça"
    ],
    instructions: [
      "Corte o abacaxi em pedaços",
      "Bata todos os ingredientes",
      "Adicione gelo se desejar",
      "Decore com hortelã"
    ],
    prepTime: 4,
    calories: 120,
    difficulty: 'Fácil',
    tags: ['Energético', 'Hidratante'],
    tips: "Substitua abacaxi por manga ou banana por mamão",
    phase: 'Desintoxicação',
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
  },

  // Fase 2 - Aceleração
  {
    day: 4,
    name: "Smoothie Energético de Frutas Vermelhas",
    description: "Energia rápida com antioxidantes",
    ingredients: [
      "1/2 xícara morangos",
      "1/2 banana",
      "1 scoop proteína",
      "200 ml leite vegetal"
    ],
    instructions: [
      "Congele as frutas previamente",
      "Bata até homogeneizar",
      "Ajuste consistência com mais leite",
      "Sirva imediatamente"
    ],
    prepTime: 5,
    calories: 160,
    difficulty: 'Fácil',
    tags: ['Energético', 'Proteico'],
    tips: "Substitua morangos por framboesa ou banana por maçã",
    phase: 'Aceleração',
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
  },
  {
    day: 5,
    name: "Smoothie Verde Termogênico",
    description: "Termogênico para queima de gordura",
    ingredients: [
      "1 folha couve",
      "1/2 limão",
      "1 fatia abacaxi",
      "1 cm gengibre",
      "200 ml água"
    ],
    instructions: [
      "Lave bem a couve",
      "Descasque o gengibre",
      "Bata todos os ingredientes",
      "Coe se preferir"
    ],
    prepTime: 4,
    calories: 50,
    difficulty: 'Fácil',
    tags: ['Termogênico', 'Detox'],
    tips: "Substitua couve por espinafre ou abacaxi por manga",
    phase: 'Aceleração',
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
  },
  {
    day: 6,
    name: "Smoothie Energético de Aveia",
    description: "Energia sustentada com saciedade",
    ingredients: [
      "1 banana",
      "1 c.s. aveia",
      "200 ml leite vegetal",
      "1 c.s. pasta amendoim"
    ],
    instructions: [
      "Deixe a aveia de molho por 5 minutos",
      "Bata até homogeneizar",
      "Ajuste consistência",
      "Decore com aveia"
    ],
    prepTime: 5,
    calories: 210,
    difficulty: 'Fácil',
    tags: ['Energético', 'Saciedade'],
    tips: "Substitua banana por mamão ou aveia por quinoa em flocos",
    phase: 'Aceleração',
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
  },

  // Fase 3 - Definição
  {
    day: 7,
    name: "Smoothie Tropical Proteico",
    description: "Proteico com sabor tropical para saciedade",
    ingredients: [
      "1/2 banana",
      "1/2 manga",
      "1 scoop proteína",
      "200 ml leite vegetal"
    ],
    instructions: [
      "Corte as frutas em pedaços",
      "Bata até homogeneizar",
      "Adicione gelo se desejar",
      "Sirva imediatamente"
    ],
    prepTime: 5,
    calories: 170,
    difficulty: 'Fácil',
    tags: ['Proteico', 'Energético'],
    tips: "Substitua manga por pêssego ou banana por maçã",
    phase: 'Definição',
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
  },
  {
    day: 8,
    name: "Smoothie Proteico de Cacau",
    description: "Proteico com antioxidantes do cacau",
    ingredients: [
      "1 banana",
      "1 c.s. cacau 100%",
      "1 scoop proteína",
      "200 ml leite vegetal"
    ],
    instructions: [
      "Congele a banana previamente",
      "Bata até homogeneizar",
      "Ajuste doçura se necessário",
      "Decore com cacau em pó"
    ],
    prepTime: 5,
    calories: 180,
    difficulty: 'Fácil',
    tags: ['Proteico', 'Energético'],
    tips: "Substitua banana por mamão ou cacau por cacau em pó cru",
    phase: 'Definição',
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
  },
  {
    day: 9,
    name: "Smoothie Detox Limão e Pepino",
    description: "Detox refrescante para desinchaço",
    ingredients: [
      "1/2 pepino",
      "suco 1 limão",
      "5 folhas hortelã",
      "200 ml água"
    ],
    instructions: [
      "Descasque o pepino",
      "Esprema o limão",
      "Bata todos os ingredientes",
      "Sirva bem gelado"
    ],
    prepTime: 3,
    calories: 40,
    difficulty: 'Fácil',
    tags: ['Detox', 'Low Sugar'],
    tips: "Substitua pepino por abobrinha ou limão por lima",
    phase: 'Definição',
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
  },
  // Fase Extra
  {
    day: 10,
    name: "Smoothie Frutas Vermelhas com Linhaça",
    description: "Antioxidante com saciedade",
    ingredients: [
      "1/2 xícara morangos",
      "1/4 xícara mirtilos",
      "1 c.s. linhaça",
      "200 ml leite vegetal"
    ],
    instructions: [
      "Lave bem as frutas vermelhas",
      "Bata todos os ingredientes até homogeneizar",
      "Ajuste consistência se necessário",
      "Sirva imediatamente"
    ],
    prepTime: 5,
    calories: 150,
    difficulty: 'Fácil',
    tags: ['Antioxidante', 'Proteico'],
    tips: "Substitua morangos por framboesa ou leite vegetal por água",
    phase: 'Extra',
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
  },
  {
    day: 11,
    name: "Smoothie Abacaxi com Hortelã",
    description: "Detox hidratante",
    ingredients: [
      "1 fatia abacaxi",
      "5 folhas hortelã",
      "200 ml água"
    ],
    instructions: [
      "Corte o abacaxi em pedaços",
      "Lave bem as folhas de hortelã",
      "Bata até homogeneizar",
      "Sirva bem gelado"
    ],
    prepTime: 3,
    calories: 60,
    difficulty: 'Fácil',
    tags: ['Detox', 'Hidratante'],
    tips: "Substitua abacaxi por manga",
    phase: 'Extra',
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
  },
  {
    day: 12,
    name: "Smoothie Manga e Gengibre",
    description: "Termogênico energizante",
    ingredients: [
      "1/2 manga",
      "1 cm gengibre",
      "200 ml água"
    ],
    instructions: [
      "Descasque a manga e corte em pedaços",
      "Descasque o gengibre",
      "Bata todos os ingredientes até homogeneizar",
      "Sirva imediatamente"
    ],
    prepTime: 4,
    calories: 80,
    difficulty: 'Fácil',
    tags: ['Termogênico', 'Detox'],
    tips: "Substitua manga por abacaxi",
    phase: 'Extra',
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
  },
  {
    day: 13,
    name: "Smoothie Papaia com Limão",
    description: "Digestivo detox",
    ingredients: [
      "1/2 papaia",
      "suco 1 limão",
      "200 ml água"
    ],
    instructions: [
      "Descasque a papaia e retire as sementes",
      "Esprema o limão",
      "Bata até homogeneizar",
      "Sirva gelado"
    ],
    prepTime: 3,
    calories: 70,
    difficulty: 'Fácil',
    tags: ['Detox', 'Digestivo'],
    tips: "Substitua papaia por mamão",
    phase: 'Extra',
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
  },
  {
    day: 14,
    name: "Smoothie Energético de Banana e Café",
    description: "Energia rápida para o dia",
    ingredients: [
      "1 banana",
      "1 c.s. café solúvel",
      "200 ml leite vegetal"
    ],
    instructions: [
      "Dissolva o café em pouca água morna",
      "Corte a banana em pedaços",
      "Bata todos os ingredientes até homogeneizar",
      "Sirva imediatamente"
    ],
    prepTime: 5,
    calories: 120,
    difficulty: 'Fácil',
    tags: ['Energético', 'Proteico'],
    tips: "Substitua café por cacau",
    phase: 'Extra',
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
  },
  {
    day: 15,
    name: "Smoothie Proteico de Amendoim",
    description: "Proteico com saciedade",
    ingredients: [
      "1 banana",
      "1 c.s. pasta de amendoim integral",
      "1 scoop proteína",
      "200 ml leite vegetal"
    ],
    instructions: [
      "Corte a banana em pedaços",
      "Adicione a pasta de amendoim",
      "Bata até homogeneizar completamente",
      "Ajuste consistência se necessário"
    ],
    prepTime: 5,
    calories: 220,
    difficulty: 'Fácil',
    tags: ['Proteico', 'Energético'],
    tips: "Substitua amendoim por pasta de castanha",
    phase: 'Extra',
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
  },
  {
    day: 16,
    name: "Smoothie Morango e Coco",
    description: "Energético leve tropical",
    ingredients: [
      "1/2 xícara morangos",
      "50 ml leite de coco",
      "200 ml água"
    ],
    instructions: [
      "Lave bem os morangos",
      "Bata todos os ingredientes até homogeneizar",
      "Adicione gelo se desejar",
      "Sirva imediatamente"
    ],
    prepTime: 4,
    calories: 100,
    difficulty: 'Fácil',
    tags: ['Energético', 'Hidratante'],
    tips: "Substitua morangos por framboesa",
    phase: 'Extra',
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
  },
  {
    day: 17,
    name: "Smoothie Verde com Maçã",
    description: "Detox rico em fibras",
    ingredients: [
      "1 folha couve",
      "1 maçã",
      "1/2 pepino",
      "200 ml água"
    ],
    instructions: [
      "Lave bem a couve e retire os talos",
      "Corte a maçã em pedaços",
      "Descasque o pepino",
      "Bata até homogeneizar completamente"
    ],
    prepTime: 4,
    calories: 60,
    difficulty: 'Fácil',
    tags: ['Detox', 'Low Sugar'],
    tips: "Substitua couve por espinafre",
    phase: 'Extra',
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
  },
  {
    day: 18,
    name: "Smoothie Proteico Chocolate e Banana",
    description: "Proteico energético com sabor chocolate",
    ingredients: [
      "1 banana",
      "1 c.s. cacau 100%",
      "1 scoop proteína",
      "200 ml leite vegetal"
    ],
    instructions: [
      "Congele a banana previamente",
      "Bata todos os ingredientes até homogeneizar",
      "Ajuste doçura se necessário",
      "Decore com cacau em pó"
    ],
    prepTime: 5,
    calories: 180,
    difficulty: 'Fácil',
    tags: ['Proteico', 'Energético'],
    tips: "Substitua cacau por cacau cru",
    phase: 'Extra',
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
  },
  {
    day: 19,
    name: "Smoothie Detox Cenoura e Laranja",
    description: "Detox antioxidante",
    ingredients: [
      "1 cenoura pequena",
      "suco 1 laranja",
      "200 ml água"
    ],
    instructions: [
      "Descasque e corte a cenoura",
      "Esprema a laranja",
      "Bata até homogeneizar completamente",
      "Coe se preferir textura mais lisa"
    ],
    prepTime: 4,
    calories: 70,
    difficulty: 'Fácil',
    tags: ['Detox', 'Antioxidante'],
    tips: "Substitua laranja por tangerina",
    phase: 'Extra',
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
  },
  {
    day: 20,
    name: "Smoothie Mirtilo e Aveia",
    description: "Saciedade / Antioxidante",
    ingredients: [
      "1/2 xícara mirtilos",
      "1 c.s. aveia",
      "1/2 banana",
      "200 ml leite vegetal"
    ],
    instructions: [
      "Bata todos os ingredientes"
    ],
    prepTime: 5,
    calories: 150,
    difficulty: 'Fácil',
    tags: ['Proteico', 'Antioxidante'],
    tips: "Substitua mirtilo por framboesa",
    phase: 'Extra',
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
  },
  {
    day: 21,
    name: "Smoothie Detox Pepino e Gengibre",
    description: "Detox / Termogênico",
    ingredients: [
      "1/2 pepino",
      "1 cm gengibre",
      "suco 1/2 limão",
      "200 ml água"
    ],
    instructions: [
      "Bata até homogeneizar"
    ],
    prepTime: 3,
    calories: 50,
    difficulty: 'Fácil',
    tags: ['Detox', 'Termogênico'],
    tips: "Substitua pepino por abobrinha",
    phase: 'Extra',
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
  },
  {
    day: 22,
    name: "Smoothie Proteico Frutas Vermelhas",
    description: "Proteico / Saciedade",
    ingredients: [
      "1/4 xícara morangos",
      "1/4 xícara mirtilos",
      "1 scoop proteína",
      "200 ml leite vegetal"
    ],
    instructions: [
      "Bata todos os ingredientes"
    ],
    prepTime: 5,
    calories: 160,
    difficulty: 'Fácil',
    tags: ['Proteico', 'Antioxidante'],
    tips: "Substitua morangos por framboesa",
    phase: 'Extra',
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
  },
  {
    day: 23,
    name: "Smoothie Energético Manga e Cenoura",
    description: "Energético",
    ingredients: [
      "1/2 manga",
      "1/2 cenoura",
      "200 ml água"
    ],
    instructions: [
      "Bata todos os ingredientes"
    ],
    prepTime: 4,
    calories: 80,
    difficulty: 'Fácil',
    tags: ['Energético', 'Detox'],
    tips: "Substitua manga por abacaxi",
    phase: 'Extra',
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
  },
  {
    day: 24,
    name: "Smoothie Proteico Abacate",
    description: "Proteico / Saciedade",
    ingredients: [
      "1/2 abacate",
      "1 scoop proteína",
      "200 ml leite vegetal"
    ],
    instructions: [
      "Bata até homogeneizar"
    ],
    prepTime: 5,
    calories: 200,
    difficulty: 'Fácil',
    tags: ['Proteico', 'Energético'],
    tips: "Substitua abacate por banana",
    phase: 'Extra',
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
  },
  {
    day: 25,
    name: "Smoothie Detox Espinafre e Limão",
    description: "Detox / Redução de inchaço",
    ingredients: [
      "1 folha espinafre",
      "1/2 limão",
      "200 ml água"
    ],
    instructions: [
      "Bata todos os ingredientes"
    ],
    prepTime: 3,
    calories: 45,
    difficulty: 'Fácil',
    tags: ['Detox', 'Low Sugar'],
    tips: "Substitua espinafre por couve",
    phase: 'Extra',
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
  },
  {
    day: 26,
    name: "Smoothie Energético Papaia e Banana",
    description: "Energia / Digestivo",
    ingredients: [
      "1/2 papaia",
      "1/2 banana",
      "200 ml água"
    ],
    instructions: [
      "Bata até homogeneizar"
    ],
    prepTime: 4,
    calories: 90,
    difficulty: 'Fácil',
    tags: ['Energético', 'Digestivo'],
    tips: "Substitua papaia por mamão",
    phase: 'Extra',
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
  },
  {
    day: 27,
    name: "Smoothie Proteico Morango e Aveia",
    description: "Proteico / Saciedade",
    ingredients: [
      "1/2 xícara morangos",
      "1 c.s. aveia",
      "1 scoop proteína",
      "200 ml leite vegetal"
    ],
    instructions: [
      "Bata todos os ingredientes"
    ],
    prepTime: 5,
    calories: 180,
    difficulty: 'Fácil',
    tags: ['Proteico', 'Antioxidante'],
    tips: "Substitua morangos por framboesa",
    phase: 'Extra',
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
  },
  {
    day: 28,
    name: "Smoothie Termogênico Abacaxi e Gengibre",
    description: "Termogênico / Queima de gordura",
    ingredients: [
      "1 fatia abacaxi",
      "1 cm gengibre",
      "200 ml água"
    ],
    instructions: [
      "Bata até homogeneizar"
    ],
    prepTime: 4,
    calories: 50,
    difficulty: 'Fácil',
    tags: ['Termogênico', 'Detox'],
    tips: "Substitua abacaxi por manga",
    phase: 'Extra',
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
  },
  {
    day: 29,
    name: "Smoothie Verde Energético",
    description: "Energético / Detox",
    ingredients: [
      "1 folha couve",
      "1/2 maçã",
      "1/2 pepino",
      "200 ml água"
    ],
    instructions: [
      "Bata todos os ingredientes"
    ],
    prepTime: 4,
    calories: 60,
    difficulty: 'Fácil',
    tags: ['Detox', 'Energético'],
    tips: "Substitua couve por espinafre, maçã por pera",
    phase: 'Extra',
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
  },
  {
    day: 30,
    name: "Smoothie Tropical Abacaxi e Laranja",
    description: "Energético / Hidratante",
    ingredients: [
      "1 fatia abacaxi",
      "suco 1 laranja",
      "200 ml água"
    ],
    instructions: [
      "Bata todos os ingredientes"
    ],
    prepTime: 3,
    calories: 70,
    difficulty: 'Fácil',
    tags: ['Energético', 'Hidratante'],
    tips: "Substitua abacaxi por manga, laranja por tangerina",
    phase: 'Extra',
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
  },
  {
    day: 31,
    name: "Smoothie Proteico Banana e Aveia",
    description: "Proteico / Saciedade",
    ingredients: [
      "1 banana",
      "1 c.s. aveia",
      "1 scoop proteína",
      "200 ml leite vegetal"
    ],
    instructions: [
      "Bata até homogeneizar"
    ],
    prepTime: 5,
    calories: 200,
    difficulty: 'Fácil',
    tags: ['Proteico', 'Saciedade'],
    tips: "Substitua banana por mamão",
    phase: 'Extra',
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
  },
  {
    day: 32,
    name: "Smoothie Detox Maçã e Pepino",
    description: "Detox / Fibra",
    ingredients: [
      "1 maçã",
      "1/2 pepino",
      "200 ml água"
    ],
    instructions: [
      "Bata todos os ingredientes"
    ],
    prepTime: 4,
    calories: 55,
    difficulty: 'Fácil',
    tags: ['Detox', 'Low Sugar'],
    tips: "Substitua maçã por pera, pepino por abobrinha",
    phase: 'Extra',
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
  },
  {
    day: 33,
    name: "Smoothie Energético Frutas Vermelhas",
    description: "Energético / Antioxidante",
    ingredients: [
      "1/4 xícara morangos",
      "1/4 xícara mirtilos",
      "1/2 banana",
      "200 ml água"
    ],
    instructions: [
      "Bata até homogeneizar"
    ],
    prepTime: 4,
    calories: 90,
    difficulty: 'Fácil',
    tags: ['Energético', 'Antioxidante'],
    tips: "Substitua morangos por framboesa",
    phase: 'Extra',
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
  },
  {
    day: 34,
    name: "Smoothie Proteico Abacaxi e Coco",
    description: "Proteico / Energia",
    ingredients: [
      "1 fatia abacaxi",
      "50 ml leite de coco",
      "1 scoop proteína",
      "200 ml leite vegetal"
    ],
    instructions: [
      "Bata todos os ingredientes"
    ],
    prepTime: 5,
    calories: 180,
    difficulty: 'Fácil',
    tags: ['Proteico', 'Energético'],
    tips: "Substitua abacaxi por manga",
    phase: 'Extra',
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
  },
  {
    day: 35,
    name: "Smoothie Termogênico Limão e Gengibre",
    description: "Termogênico / Detox",
    ingredients: [
      "suco 1 limão",
      "1 cm gengibre",
      "200 ml água"
    ],
    instructions: [
      "Bata até homogeneizar"
    ],
    prepTime: 3,
    calories: 45,
    difficulty: 'Fácil',
    tags: ['Termogênico', 'Detox'],
    tips: "Substitua limão por lima",
    phase: 'Extra',
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
  },
  {
    day: 36,
    name: "Smoothie Verde Saciedade",
    description: "Detox / Saciedade",
    ingredients: [
      "1 folha couve",
      "1/2 maçã",
      "1/2 pepino",
      "1 c.s. linhaça",
      "200 ml água"
    ],
    instructions: [
      "Bata todos os ingredientes"
    ],
    prepTime: 4,
    calories: 65,
    difficulty: 'Fácil',
    tags: ['Detox', 'Low Sugar'],
    tips: "Substitua couve por espinafre, maçã por pera",
    phase: 'Extra',
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
  },
  {
    day: 37,
    name: "Smoothie Energético Papaia e Coco",
    description: "Energia / Digestivo",
    ingredients: [
      "1/2 papaia",
      "50 ml leite de coco",
      "200 ml água"
    ],
    instructions: [
      "Bata até homogeneizar"
    ],
    prepTime: 4,
    calories: 90,
    difficulty: 'Fácil',
    tags: ['Energético', 'Digestivo'],
    tips: "Substitua papaia por mamão",
    phase: 'Extra',
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
  },
  {
    day: 38,
    name: "Smoothie Proteico Chocolate e Amendoim",
    description: "Proteico / Saciedade",
    ingredients: [
      "1 banana",
      "1 c.s. cacau 100%",
      "1 c.s. pasta de amendoim integral",
      "1 scoop proteína",
      "200 ml leite vegetal"
    ],
    instructions: [
      "Bata até homogeneizar"
    ],
    prepTime: 5,
    calories: 220,
    difficulty: 'Fácil',
    tags: ['Proteico', 'Energético'],
    tips: "Substitua pasta de amendoim por castanha",
    phase: 'Extra',
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
  },
  {
    day: 39,
    name: "Smoothie Detox Cenoura e Gengibre",
    description: "Detox / Antioxidante",
    ingredients: [
      "1 cenoura pequena",
      "1 cm gengibre",
      "200 ml água"
    ],
    instructions: [
      "Bata até homogeneizar"
    ],
    prepTime: 4,
    calories: 70,
    difficulty: 'Fácil',
    tags: ['Detox', 'Antioxidante'],
    tips: "Substitua cenoura por abóbora",
    phase: 'Extra',
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
  },
  {
    day: 40,
    name: "Smoothie Verde Limão e Hortelã",
    description: "Detox / Refrescante",
    ingredients: [
      "1 folha couve",
      "suco 1/2 limão",
      "5 folhas hortelã",
      "200 ml água"
    ],
    instructions: [
      "Bata todos os ingredientes"
    ],
    prepTime: 3,
    calories: 50,
    difficulty: 'Fácil',
    tags: ['Detox', 'Low Sugar'],
    tips: "Substitua couve por espinafre",
    phase: 'Extra',
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
  },
  {
    day: 41,
    name: "Smoothie Proteico Morango e Cacau",
    description: "Proteico / Antioxidante",
    ingredients: [
      "1/2 xícara morangos",
      "1 c.s. cacau 100%",
      "1 scoop proteína",
      "200 ml leite vegetal"
    ],
    instructions: [
      "Bata até homogeneizar"
    ],
    prepTime: 5,
    calories: 180,
    difficulty: 'Fácil',
    tags: ['Proteico', 'Antioxidante'],
    tips: "Substitua morangos por framboesa",
    phase: 'Extra',
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
  },
  {
    day: 42,
    name: "Smoothie Energético Manga e Laranja",
    description: "Energético / Hidratante",
    ingredients: [
      "1/2 manga",
      "suco 1 laranja",
      "200 ml água"
    ],
    instructions: [
      "Bata todos os ingredientes"
    ],
    prepTime: 3,
    calories: 70,
    difficulty: 'Fácil',
    tags: ['Energético', 'Hidratante'],
    tips: "Substitua manga por abacaxi",
    phase: 'Extra',
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
  },
  {
    day: 43,
    name: "Smoothie Proteico Aveia e Banana",
    description: "Proteico / Saciedade",
    ingredients: [
      "1 banana",
      "1 c.s. aveia",
      "1 scoop proteína",
      "200 ml leite vegetal"
    ],
    instructions: [
      "Bata até homogeneizar"
    ],
    prepTime: 5,
    calories: 200,
    difficulty: 'Fácil',
    tags: ['Proteico', 'Saciedade'],
    tips: "Substitua banana por mamão",
    phase: 'Extra',
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
  },
  {
    day: 44,
    name: "Smoothie Detox Pepino e Limão",
    description: "Detox / Desinchaço",
    ingredients: [
      "1/2 pepino",
      "suco 1/2 limão",
      "200 ml água"
    ],
    instructions: [
      "Bata todos os ingredientes"
    ],
    prepTime: 3,
    calories: 45,
    difficulty: 'Fácil',
    tags: ['Detox', 'Low Sugar'],
    tips: "Substitua pepino por abobrinha",
    phase: 'Extra',
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
  },
  {
    day: 45,
    name: "Smoothie Energético Frutas Tropicais",
    description: "Energia / Hidratante",
    ingredients: [
      "1/2 manga",
      "1/2 abacaxi",
      "200 ml água de coco"
    ],
    instructions: [
      "Bata até homogeneizar"
    ],
    prepTime: 4,
    calories: 90,
    difficulty: 'Fácil',
    tags: ['Energético', 'Hidratante'],
    tips: "Substitua manga por mamão",
    phase: 'Extra',
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
  },
  {
    day: 46,
    name: "Smoothie Proteico Abacate e Banana",
    description: "Proteico / Saciedade",
    ingredients: [
      "1/2 abacate",
      "1/2 banana",
      "1 scoop proteína",
      "200 ml leite vegetal"
    ],
    instructions: [
      "Bata até homogeneizar"
    ],
    prepTime: 5,
    calories: 220,
    difficulty: 'Fácil',
    tags: ['Proteico', 'Energético'],
    tips: "Substitua abacate por manteiga de castanha",
    phase: 'Extra',
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
  },
  {
    day: 47,
    name: "Smoothie Termogênico Limão e Pimenta",
    description: "Termogênico / Queima de gordura",
    ingredients: [
      "suco 1 limão",
      "pitada pimenta caiena",
      "200 ml água"
    ],
    instructions: [
      "Bata todos os ingredientes"
    ],
    prepTime: 3,
    calories: 45,
    difficulty: 'Fácil',
    tags: ['Termogênico', 'Detox'],
    tips: "Substitua limão por lima",
    phase: 'Extra',
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
  },
  {
    day: 48,
    name: "Smoothie Verde Espinafre e Abacaxi",
    description: "Detox / Energético",
    ingredients: [
      "1 folha espinafre",
      "1 fatia abacaxi",
      "200 ml água"
    ],
    instructions: [
      "Bata todos os ingredientes"
    ],
    prepTime: 4,
    calories: 60,
    difficulty: 'Fácil',
    tags: ['Detox', 'Energético'],
    tips: "Substitua espinafre por couve",
    phase: 'Extra',
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
  },
  {
    day: 49,
    name: "Smoothie Energético Banana e Café",
    description: "Energia rápida",
    ingredients: [
      "1 banana",
      "1 c.s. café solúvel",
      "200 ml leite vegetal"
    ],
    instructions: [
      "Bata até homogeneizar"
    ],
    prepTime: 5,
    calories: 120,
    difficulty: 'Fácil',
    tags: ['Energético', 'Proteico'],
    tips: "Substitua café por cacau",
    phase: 'Extra',
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg"
  }
];