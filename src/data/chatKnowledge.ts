// Base de conhecimento e motor de respostas do Chat Guia Turístico.
// 100% local (não depende de API externa) — reaproveita o conteúdo do próprio app.

export interface ChatState {
    code: string;
    name: string;
    page: string; // usado para montar a rota /Estados/{page}
    region: string;
    capital: string;
    aliases: string[]; // formas alternativas de citar o estado no chat
    highlights: string;
  }
  
  export interface ChatChip {
    label: string;
    route?: string;   // se presente, navega ao ser tocado
    prompt?: string;  // se presente, reenvia esse texto como nova pergunta
    action?: 'create-itinerary';
  }
  
  export interface BotAnswer {
    text: string;
    chips?: ChatChip[];
    itinerary?: Itinerary;
  }
  
  export interface ItineraryStop {
    day: number;
    title: string;
    description: string;
  }
  
  export interface Itinerary {
    state: ChatState;
    stops: ItineraryStop[];
  }
  
  /* ---------------- Normalização ---------------- */
  
  export function normalize(str: string): string {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }
  
  /* ---------------- Estados ---------------- */
  
  export const CHAT_STATES: ChatState[] = [
    { code: 'AC', name: 'Acre', page: 'Acre', region: 'Norte', capital: 'Rio Branco', aliases: ['acre'], highlights: 'a floresta amazônica preservada, a herança do ciclo da borracha e a história de Chico Mendes.' },
    { code: 'AL', name: 'Alagoas', page: 'Alagoas', region: 'Nordeste', capital: 'Maceió', aliases: ['alagoas', 'maceio'], highlights: 'as piscinas naturais de Maragogi e praias de água cristalina como Praia do Francês.' },
    { code: 'AP', name: 'Amapá', page: 'Amapa', region: 'Norte', capital: 'Macapá', aliases: ['amapa', 'macapa'], highlights: 'o Marco Zero do Equador e cachoeiras em meio à floresta amazônica.' },
    { code: 'AM', name: 'Amazonas', page: 'Amazonas', region: 'Norte', capital: 'Manaus', aliases: ['amazonas', 'manaus'], highlights: 'o Teatro Amazonas e o Encontro das Águas, onde os rios Negro e Solimões correm lado a lado sem se misturar.' },
    { code: 'BA', name: 'Bahia', page: 'Bahia', region: 'Nordeste', capital: 'Salvador', aliases: ['bahia', 'salvador'], highlights: 'o Pelourinho, o Elevador Lacerda, a Chapada Diamantina e o maior Carnaval de rua do mundo.' },
    { code: 'CE', name: 'Ceará', page: 'Ceara', region: 'Nordeste', capital: 'Fortaleza', aliases: ['ceara', 'fortaleza', 'jericoacoara'], highlights: 'as dunas de Jericoacoara e praias como Canoa Quebrada.' },
    { code: 'DF', name: 'Distrito Federal', page: 'DistritoFederal', region: 'Centro-Oeste', capital: 'Brasília', aliases: ['distrito federal', 'brasilia', 'df'], highlights: 'a arquitetura modernista de Oscar Niemeyer e o Congresso Nacional.' },
    { code: 'ES', name: 'Espírito Santo', page: 'EspiritoSanto', region: 'Sudeste', capital: 'Vitória', aliases: ['espirito santo', 'vitoria'], highlights: 'praias tranquilas e a tradicional moqueca capixaba.' },
    { code: 'GO', name: 'Goiás', page: 'Goias', region: 'Centro-Oeste', capital: 'Goiânia', aliases: ['goias', 'goiania', 'chapada dos veadeiros'], highlights: 'a Chapada dos Veadeiros, com cachoeiras e trilhas, e a cidade histórica de Goiás Velho.' },
    { code: 'MA', name: 'Maranhão', page: 'Maranhao', region: 'Nordeste', capital: 'São Luís', aliases: ['maranhao', 'sao luis', 'lencois maranhenses'], highlights: 'os Lençóis Maranhenses, com suas dunas e lagoas cristalinas, e o centro histórico colonial de São Luís.' },
    { code: 'MT', name: 'Mato Grosso', page: 'MatoGrosso', region: 'Centro-Oeste', capital: 'Cuiabá', aliases: ['mato grosso', 'cuiaba', 'pantanal'], highlights: 'o Pantanal, com uma das maiores concentrações de vida selvagem das Américas, e a Chapada dos Guimarães.' },
    { code: 'MS', name: 'Mato Grosso do Sul', page: 'MatoGrossoDoSul', region: 'Centro-Oeste', capital: 'Campo Grande', aliases: ['mato grosso do sul', 'campo grande', 'bonito'], highlights: 'Bonito, famosa pelos rios de água cristalina para flutuação, e o Pantanal sul-mato-grossense.' },
    { code: 'MG', name: 'Minas Gerais', page: 'MinasGerais', region: 'Sudeste', capital: 'Belo Horizonte', aliases: ['minas gerais', 'belo horizonte', 'ouro preto'], highlights: 'as cidades históricas como Ouro Preto e Tiradentes, além do Instituto Inhotim.' },
    { code: 'PA', name: 'Pará', page: 'Para', region: 'Norte', capital: 'Belém', aliases: ['para', 'belem', 'ver-o-peso', 'ver o peso'], highlights: 'o Mercado Ver-o-Peso, o Círio de Nazaré e a Ilha de Marajó.' },
    { code: 'PB', name: 'Paraíba', page: 'Paraiba', region: 'Nordeste', capital: 'João Pessoa', aliases: ['paraiba', 'joao pessoa'], highlights: 'a Ponta do Seixas, ponto mais oriental das Américas, e praias como Tambaú.' },
    { code: 'PR', name: 'Paraná', page: 'Parana', region: 'Sul', capital: 'Curitiba', aliases: ['parana', 'curitiba', 'cataratas', 'iguacu'], highlights: 'as Cataratas do Iguaçu, uma das maravilhas naturais do mundo, e o urbanismo de Curitiba.' },
    { code: 'PE', name: 'Pernambuco', page: 'Pernambuco', region: 'Nordeste', capital: 'Recife', aliases: ['pernambuco', 'recife', 'olinda', 'fernando de noronha'], highlights: 'o centro histórico de Olinda, o Recife Antigo e o arquipélago de Fernando de Noronha.' },
    { code: 'PI', name: 'Piauí', page: 'Piaui', region: 'Nordeste', capital: 'Teresina', aliases: ['piaui', 'teresina', 'serra da capivara'], highlights: 'o Parque Nacional Serra da Capivara, com sítios arqueológicos e pinturas rupestres milenares.' },
    { code: 'RJ', name: 'Rio de Janeiro', page: 'RioDeJaneiro', region: 'Sudeste', capital: 'Rio de Janeiro', aliases: ['rio de janeiro', 'rio', 'cristo redentor'], highlights: 'o Cristo Redentor, o Pão de Açúcar, as praias de Copacabana e Ipanema e o Carnaval carioca.' },
    { code: 'RN', name: 'Rio Grande do Norte', page: 'RioGrandeDoNorte', region: 'Nordeste', capital: 'Natal', aliases: ['rio grande do norte', 'natal', 'ponta negra', 'genipabu'], highlights: 'as dunas de Genipabu e a Praia de Pipa.' },
    { code: 'RS', name: 'Rio Grande do Sul', page: 'RioGrandeDoSul', region: 'Sul', capital: 'Porto Alegre', aliases: ['rio grande do sul', 'porto alegre', 'gramado', 'gaucho'], highlights: 'a Serra Gaúcha, com Gramado e Canela, e a tradição do chimarrão e do churrasco.' },
    { code: 'RO', name: 'Rondônia', page: 'Rondonia', region: 'Norte', capital: 'Porto Velho', aliases: ['rondonia', 'porto velho'], highlights: 'o Rio Madeira e a histórica Estrada de Ferro Madeira-Mamoré.' },
    { code: 'RR', name: 'Roraima', page: 'Roraima', region: 'Norte', capital: 'Boa Vista', aliases: ['roraima', 'boa vista', 'monte roraima'], highlights: 'o Monte Roraima, um dos platôs mais antigos da Terra, e o Monte Caburaí.' },
    { code: 'SC', name: 'Santa Catarina', page: 'SantaCatarina', region: 'Sul', capital: 'Florianópolis', aliases: ['santa catarina', 'florianopolis', 'floripa', 'balneario camboriu'], highlights: 'as praias de Florianópolis e Balneário Camboriú.' },
    { code: 'SP', name: 'São Paulo', page: 'SaoPaulo', region: 'Sudeste', capital: 'São Paulo', aliases: ['sao paulo', 'avenida paulista', 'masp'], highlights: 'o MASP, a Avenida Paulista, o Parque Ibirapuera e o litoral norte paulista.' },
    { code: 'SE', name: 'Sergipe', page: 'Sergipe', region: 'Nordeste', capital: 'Aracaju', aliases: ['sergipe', 'aracaju'], highlights: 'as praias urbanas de Aracaju e o centro histórico de São Cristóvão.' },
    { code: 'TO', name: 'Tocantins', page: 'Tocantins', region: 'Norte', capital: 'Palmas', aliases: ['tocantins', 'palmas', 'jalapao'], highlights: 'o Jalapão, com dunas douradas, cachoeiras e fervedouros.' },
  ];
  
  export function findStateMatch(normMsg: string): ChatState | undefined {
    // ordena por tamanho de alias (desc) para casar nomes compostos antes dos curtos
    const candidates = CHAT_STATES
      .flatMap(s => s.aliases.map(a => ({ state: s, alias: a })))
      .sort((a, b) => b.alias.length - a.alias.length);
    const found = candidates.find(({ alias }) => new RegExp(`\\b${alias}\\b`).test(normMsg));
    return found?.state;
  }
  
  /* ---------------- Comidas típicas ---------------- */
  // As chaves batem com as usadas em SettingsContext (c_<key>_name/_region/_desc) e em comidas.tsx
  
  export interface ChatFood {
    key: string;
    aliases: string[];
  }
  
  export const CHAT_FOODS: ChatFood[] = [
    { key: 'acaraje', aliases: ['acaraje'] },
    { key: 'arroz', aliases: ['arroz de hausa'] },
    { key: 'baiao', aliases: ['baiao de dois', 'baiao'] },
    { key: 'barreado', aliases: ['barreado'] },
    { key: 'bolo', aliases: ['bolo de rolo'] },
    { key: 'caranguejada', aliases: ['caranguejada'] },
    { key: 'carnesol', aliases: ['carne de sol com macaxeira', 'carne de sol'] },
    { key: 'carneiro', aliases: ['carneiro no buraco'] },
    { key: 'chambari', aliases: ['chambari'] },
    { key: 'chimarrao', aliases: ['chimarrao'] },
    { key: 'churrasco', aliases: ['churrasco gaucho', 'churrasco'] },
    { key: 'feijoada', aliases: ['feijoada'] },
    { key: 'galinhada', aliases: ['galinhada'] },
    { key: 'ginga', aliases: ['ginga com tapioca'] },
    { key: 'maria', aliases: ['maria isabel'] },
    { key: 'moqueca', aliases: ['moqueca'] },
    { key: 'mortadela', aliases: ['pao com mortadela'] },
    { key: 'pacoca', aliases: ['pacoca de carne seca', 'pacoca'] },
    { key: 'pamonha', aliases: ['pamonha'] },
    { key: 'paoqueijo', aliases: ['pao de queijo'] },
    { key: 'pato', aliases: ['pato no tucupi'] },
    { key: 'pirarucu', aliases: ['pirarucu de casaca', 'pirarucu'] },
    { key: 'sopa', aliases: ['sopa'] },
    { key: 'sururu', aliases: ['sururu'] },
    { key: 'tacaca', aliases: ['tacaca'] },
    { key: 'tainha', aliases: ['tainha'] },
    { key: 'terere', aliases: ['terere'] },
    { key: 'tucupi', aliases: ['tucupi'] },
  ];
  
  export function findFoodMatch(normMsg: string): ChatFood | undefined {
    const candidates = CHAT_FOODS
      .flatMap(f => f.aliases.map(a => ({ food: f, alias: a })))
      .sort((a, b) => b.alias.length - a.alias.length);
    const found = candidates.find(({ alias }) => normMsg.includes(alias));
    return found?.food;
  }
  
  /* ---------------- Categorias gerais ---------------- */
  
  interface Category {
    keywords: string[];
    answer: (t: Record<string, string>) => BotAnswer;
  }
  
  const CATEGORIES: Category[] = [
    {
      keywords: ['praia', 'praias', 'litoral', 'orla'],
      answer: () => ({
        text: 'O Brasil tem mais de 8 mil km de litoral! Algumas praias imperdíveis: Copacabana e Ipanema (RJ), Jericoacoara (CE), Maragogi (AL), Fernando de Noronha (PE), Praia de Pipa (RN) e as praias de Florianópolis (SC). Quer que eu te mostre alguma dessas?',
        chips: [
          { label: 'Rio de Janeiro', route: '/Estados/RioDeJaneiro' },
          { label: 'Fernando de Noronha', route: '/Estados/Pernambuco' },
          { label: 'Jericoacoara', route: '/Estados/Ceara' },
        ],
      }),
    },
    {
      keywords: ['natureza', 'cachoeira', 'cachoeiras', 'trilha', 'ecoturismo', 'montanha', 'serra', 'floresta'],
      answer: () => ({
        text: 'Para quem ama natureza, o Brasil é generoso: Chapada dos Veadeiros (GO), Jalapão (TO), Pantanal (MT/MS), Chapada Diamantina (BA) e a própria Floresta Amazônica. São destinos ótimos para trilhas, cachoeiras e observação de vida selvagem.',
        chips: [
          { label: 'Goiás', route: '/Estados/Goias' },
          { label: 'Tocantins', route: '/Estados/Tocantins' },
          { label: 'Mato Grosso', route: '/Estados/MatoGrosso' },
        ],
      }),
    },
    {
      keywords: ['carnaval', 'trio eletrico', 'bloco', 'blocos'],
      answer: () => ({
        text: 'O Carnaval brasileiro tem versões bem diferentes entre si: os trios elétricos e a energia do axé em Salvador, os desfiles de samba no Rio de Janeiro e o frevo animado de Recife e Olinda. Cada um vale a viagem por um motivo diferente!',
        chips: [
          { label: 'Bahia', route: '/Estados/Bahia' },
          { label: 'Rio de Janeiro', route: '/Estados/RioDeJaneiro' },
          { label: 'Pernambuco', route: '/Estados/Pernambuco' },
        ],
      }),
    },
    {
      keywords: ['historia', 'colonial', 'patrimonio', 'centro historico'],
      answer: () => ({
        text: 'Se você curte história, vale conhecer o Pelourinho em Salvador, Ouro Preto em Minas Gerais, o centro histórico de São Luís no Maranhão e Olinda em Pernambuco — todos com rica arquitetura do período colonial.',
        chips: [
          { label: 'Bahia', route: '/Estados/Bahia' },
          { label: 'Minas Gerais', route: '/Estados/MinasGerais' },
          { label: 'Maranhão', route: '/Estados/Maranhao' },
        ],
      }),
    },
    {
      keywords: ['comida', 'gastronomia', 'prato tipico', 'pratos tipicos', 'o que comer', 'culinaria', 'comidas'],
      answer: () => ({
        text: 'A culinária brasileira varia muito de região para região! Alguns clássicos: feijoada (nacional), acarajé e moqueca (Bahia), pão de queijo (Minas Gerais), churrasco gaúcho (Rio Grande do Sul) e pato no tucupi (Pará). Quer saber mais sobre algum prato específico?',
        chips: [
          { label: 'Ver comidas típicas', route: '/comidas' },
        ],
      }),
    },
    {
      keywords: ['clima', 'epoca', 'quando ir', 'melhor epoca', 'temperatura', 'chuva', 'estacao'],
      answer: () => ({
        text: 'O Brasil é enorme, então o clima varia bastante por região. De modo geral: no litoral nordestino faz calor o ano todo (ótimo em qualquer época); no Sul e Sudeste, o verão (dez–mar) é quente e o inverno (jun–ago) pode ficar bem frio na serra; na Amazônia, evite o período mais chuvoso (dez–mai) se quiser trilhas mais secas. Para qual região você está planejando ir?',
      }),
    },
    {
      keywords: ['moeda', 'dinheiro', 'cambio', 'real', 'reais', 'dolar'],
      answer: () => ({
        text: 'A moeda oficial do Brasil é o Real (R$). Cartões e Pix (sistema de pagamento instantâneo) são amplamente aceitos nas cidades, mas vale levar algum dinheiro em espécie para áreas mais afastadas.',
      }),
    },
    {
      keywords: ['idioma', 'lingua', 'falam', 'fala portugues'],
      answer: () => ({
        text: 'O idioma oficial é o português. Em áreas turísticas mais movimentadas costuma haver alguém que fale inglês ou espanhol, mas fora dos grandes centros o português predomina — aprender algumas frases básicas ajuda bastante.',
      }),
    },
    {
      keywords: ['seguranca', 'perigoso', 'roubo', 'assalto', 'seguro'],
      answer: () => ({
        text: 'Como em qualquer grande destino turístico, vale tomar cuidados básicos: evite exibir objetos de valor, prefira transporte por aplicativo à noite, fique atento em locais muito movimentados e informe-se sobre os bairros antes de se hospedar. No geral, seguindo o bom senso, a experiência costuma ser tranquila.',
      }),
    },
    {
      keywords: ['visto', 'passaporte', 'documento', 'documentos', 'entrada no pais'],
      answer: () => ({
        text: 'As regras de visto para o Brasil variam conforme o país de origem e mudam com frequência, então o ideal é confirmar direto no site do Ministério das Relações Exteriores ou de um consulado brasileiro antes da viagem.',
      }),
    },
    {
      keywords: ['transporte', 'onibus', 'aviao', 'carro', 'como chegar', 'deslocamento', 'voo'],
      answer: () => ({
        text: 'Por causa das distâncias continentais, voos domésticos costumam ser a forma mais prática de ir entre regiões distantes (ex.: Sul ao Norte). Para trajetos mais curtos, ônibus interestaduais são confortáveis e baratos, e alugar um carro é ótimo para explorar o interior com liberdade.',
      }),
    },
  ];
  
  /* ---------------- Saudações e ajuda ---------------- */
  
  const GREETINGS = ['oi', 'ola', 'eae', 'e ai', 'bom dia', 'boa tarde', 'boa noite', 'hey', 'hello', 'salve'];
  const THANKS = ['obrigado', 'obrigada', 'valeu', 'vlw', 'gracas', 'thanks'];
  const HELP = ['ajuda', 'o que voce faz', 'o que voce pode fazer', 'comandos', 'menu', 'como funciona'];
  
  const WELCOME_CHIPS: ChatChip[] = [
    { label: 'Criar roteiro', action: 'create-itinerary' },
    { label: 'Praias', prompt: 'Quais praias eu deveria visitar?' },
    { label: 'Comida típica', prompt: 'Quais são as comidas típicas do Brasil?' },
    { label: 'Natureza', prompt: 'Quais destinos de natureza vale a pena conhecer?' },
    { label: 'Carnaval', prompt: 'Onde é o melhor Carnaval do Brasil?' },
  ];
  
  export function createItinerary(state: ChatState, days: number): BotAnswer {
    const stops: ItineraryStop[] = [
      { day: 1, title: `Chegada em ${state.capital}`, description: 'Faça o check-in com calma e reserve o fim do dia para conhecer o centro e a culinária local.' },
      { day: 2, title: 'Destaques do destino', description: `Priorize ${state.highlights}` },
      { day: 3, title: 'Ritmo leve', description: 'Escolha uma experiência que tenha ficado de fora, deixe espaço para deslocamentos e aproveite sem pressa.' },
    ];
  
    for (let day = 4; day <= days; day += 1) {
      stops.push({ day, title: 'Dia extra', description: 'Aprofunde o que mais combinou com você, com uma atividade ao ar livre, um passeio cultural ou tempo livre.' });
    }
  
    return {
      text: `Roteiro de ${days} ${days === 1 ? 'dia' : 'dias'} em ${state.name} ✨\n\nToque nos dias abaixo para explorar cada etapa.`,
      itinerary: { state, stops: stops.slice(0, days) },
      chips: [
        { label: 'Criar outro roteiro', action: 'create-itinerary' },
      ],
    };
  }
  
  export function getWelcomeMessage(userName?: string): BotAnswer {
    const greeting = userName ? `Oi, ${userName}! 👋` : 'Oi! 👋';
    return {
      text: `${greeting} Eu sou o assistente de viagem da Gadys. Posso te contar sobre qualquer estado brasileiro, comidas típicas, praias, roteiros de natureza e dicas práticas de viagem. O que você quer descobrir hoje?`,
      chips: WELCOME_CHIPS,
    };
  }
  
  /* ---------------- Motor principal ---------------- */
  
  export function answerQuery(rawMessage: string, t: Record<string, string>): BotAnswer {
    const msg = normalize(rawMessage);
  
    if (!msg) {
      return { text: 'Pode me perguntar sobre algum estado, comida típica ou dica de viagem — estou aqui para ajudar! 🧭' };
    }
  
    // 1) Estado específico
    const state = findStateMatch(msg);
    if (state) {
      return {
        text: `${state.name} fica na região ${state.region} do Brasil, e sua capital é ${state.capital}. Por lá, destaque para ${state.highlights}`,
        chips: [{ label: `Explorar ${state.name} →`, route: `/Estados/${state.page}` }],
      };
    }
  
    // 2) Comida específica
    const food = findFoodMatch(msg);
    if (food) {
      const name = t[`c_${food.key}_name`];
      const region = t[`c_${food.key}_region`];
      const desc = t[`c_${food.key}_desc`] || '';
      const firstParagraph = desc.split('\n\n')[0]?.replace('História:\n', '') ?? '';
      const trimmed = firstParagraph.length > 280 ? firstParagraph.slice(0, 280).trim() + '…' : firstParagraph;
      return {
        text: `${name} é um prato típico de ${region}. ${trimmed}`,
        chips: [{ label: 'Ver receita completa →', route: `/comidas?open=${food.key}` }],
      };
    }
  
    // 3) Saudações / agradecimentos / ajuda
    if (GREETINGS.some(g => msg.includes(g))) {
      return getWelcomeMessage();
    }
    if (THANKS.some(g => msg.includes(g))) {
      return { text: 'De nada! Se quiser, posso sugerir mais destinos ou comidas típicas. É só perguntar. 😊' };
    }
    if (HELP.some(g => msg.includes(g))) {
      return {
        text: 'Você pode me perguntar coisas como "o que fazer na Bahia", "comidas típicas de Minas Gerais", "melhores praias" ou "quando é a melhor época para viajar". Também posso montar um roteiro personalizado por dias para um estado brasileiro.',
        chips: WELCOME_CHIPS,
      };
    }
  
    // 4) Categorias temáticas
    for (const cat of CATEGORIES) {
      if (cat.keywords.some(k => msg.includes(k))) {
        return cat.answer(t);
      }
    }
  
    // 5) Fallback
    return {
      text: 'Ainda não tenho uma resposta certeira para isso, mas posso te contar sobre qualquer estado brasileiro, comida típica, praias, natureza ou dicas práticas de viagem. Tenta perguntar de outro jeito?',
      chips: WELCOME_CHIPS,
    };
  }
  