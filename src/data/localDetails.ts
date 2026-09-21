export interface Secao {
  titulo: string;
  texto: string;
  lista?: string[];
  subsecoes?: { titulo: string; texto: string }[];
}

export interface LocalDetail {
  secoes: Secao[];
}

export const localDetails: Record<string, LocalDetail> = {
  'Teatro Amazonas': {
    secoes: [
      {
        titulo: 'Um Palácio Erguido na Selva',
        texto: 'O Teatro Amazonas foi construído entre 1884 e 1896, no auge do ciclo da borracha, quando a Amazônia era o centro do mundo. Seus materiais vieram da Europa: mármore de Carrara, ferro da Escócia, cerâmica de Lisboa.',
        lista: ['Construção: Entre 1884 e 1896, durante o ciclo da borracha.', 'Cúpula: Revestida com 36.000 telhas nas cores da bandeira do Brasil.', 'Materiais: Importados da Europa — mármore, ferro, cerâmica e cristal.'],
      },
      {
        titulo: 'Detalhes que Contam uma Época',
        texto: 'A cúpula, revestida com 36.000 telhas de cerâmica nas cores verde, ouro e azul da bandeira brasileira, domina o horizonte de Manaus. O interior revela um salão nobre com capacidade para 701 pessoas, decorado com pinturas alegóricas ao teto, lustres de cristal Murano e cadeiras de madeira nobre.',
        subsecoes: [
          { titulo: 'A Cúpula Icônica', texto: 'Suas 36.000 telhas de cerâmica portuguesa formam um mosaico nas cores da bandeira brasileira, visível de vários pontos da cidade.' },
          { titulo: 'O Salão Nobre', texto: 'Decorado com pinturas do artista italiano Domenico De Angelis. O teto retrata a lenda de Iara, a sereia amazônica, em uma fusão única entre a cultura europeia e a mitologia local.' },
          { titulo: 'O Piso Flutuante', texto: 'O piso da plateia é construído com madeira de lei sobre uma estrutura que permite uma leve flutuação, garantindo uma acústica excepcional.' },
        ],
      },
      {
        titulo: 'Viva a Experiência',
        texto: 'As visitas guiadas acontecem de terça a domingo, das 9h às 17h. Com duração de aproximadamente 45 minutos. O ingresso custa R$ 50 (inteira) e R$ 25 (meia). O Festival Amazonas de Ópera, realizado anualmente em abril e maio, é o maior evento de ópera da América Latina.',
      },
    ],
  },
  'Encontro das Águas': {
    secoes: [
      {
        titulo: 'Um Balé de Águas no Coração do Mundo',
        texto: 'De um lado, o Rio Negro, com suas águas escuras e quentes. Do outro, o Rio Solimões, barrento e frio. Por mais de seis quilômetros, eles correm juntos, mas se recusam a misturar, criando uma linha divisória que desafia a lógica.',
        lista: ['Rio Negro: Quente (~28°C), lento (~2 km/h) e misteriosamente escuro.', 'Rio Solimões: Frio (~22°C), rápido (~6 km/h) e imponentemente barrento.'],
      },
      {
        titulo: 'Sinta a Magia com Suas Próprias Mãos',
        texto: 'Navegue sobre a linha divisória e sinta a mudança abrupta de temperatura ao tocar as águas. Veja botos cor-de-rosa e tucuxis dançando ao redor do seu barco.',
        subsecoes: [
          { titulo: 'Como Chegar', texto: 'O fenômeno está a apenas 10 km de Manaus. Agências de turismo locais oferecem passeios de lancha ou em barcos regionais.' },
          { titulo: 'Custo', texto: 'Com opções que variam de R$ 90 a R$ 300 por pessoa. A maioria dos barcos parte pela manhã (9h), retornando no fim da tarde.' },
          { titulo: 'O Que Levar', texto: 'Protetor solar, chapéu, óculos de sol e repelente. Roupas leves e câmera para capturar tudo.' },
        ],
      },
    ],
  },
  'Arquipélago de Anavilhanas': {
    secoes: [
      {
        titulo: 'O Maior Arquipélago Fluvial do Mundo',
        texto: 'Formado por mais de 400 ilhas, lagos e igarapés no Rio Negro, a cerca de 60 km de Manaus. Declarado Parque Nacional em 2008, é um santuário de biodiversidade amazônica.',
        lista: ['Localização: Rio Negro, a 60 km de Manaus.', 'Área: Mais de 350.000 hectares de floresta e rios.', 'Destaque: Mais de 400 ilhas, lagos e igarapés.'],
      },
      {
        titulo: 'Um Santuário da Vida Amazônica',
        texto: 'O Rio Negro abriga mais de 700 espécies de peixes. Os botos cor-de-rosa e os tucuxis são presença constante nas águas do arquipélago.',
        subsecoes: [
          { titulo: 'Fauna Aquática', texto: 'Mais de 700 espécies de peixes, incluindo o tucunaré, o tambaqui e o pirarucu.' },
          { titulo: 'Floresta de Igapó', texto: 'Durante a cheia do Rio Negro, a floresta fica completamente submersa, criando um cenário surreal onde é possível navegar de canoa entre as copas das árvores.' },
          { titulo: 'Como Chegar', texto: 'De Manaus, siga pela AM-352 até Novo Airão (180 km, aprox. 3h). De Novo Airão, operadoras locais organizam passeios pelo arquipélago.' },
        ],
      },
    ],
  },
  'Amazônico Peixaria Regional': {
    secoes: [
      {
        titulo: 'Uma Experiência Gastronômica Singular',
        texto: 'Localizado no coração do Largo de São Sebastião, em frente ao Teatro Amazonas. Com um menu repleto de pratos tradicionais e ingredientes frescos da Amazônia.',
        lista: ['Localização: Largo de São Sebastião, em frente ao Teatro Amazonas.', 'Especialidade: Peixes frescos dos rios amazônicos.', 'Destaque: Ingredientes nativos e temperos da floresta.'],
      },
      {
        titulo: 'Os Sabores da Floresta',
        texto: 'Cada prato é preparado com ingredientes frescos e técnicas tradicionais que preservam a essência da culinária regional.',
        subsecoes: [
          { titulo: 'Peixes da Amazônia', texto: 'Tambaqui assado na brasa, pirarucu de casaca, tucunaré ao molho de tucumã e filhote grelhado.' },
          { titulo: 'Entradas e Petiscos', texto: 'Caldeirado de peixe, ceviche amazônico, bolinho de tambaqui e tacacá servido em cuia.' },
          { titulo: 'Sobremesas Regionais', texto: 'Mousse de cupuaçu, sorvete de tucumã, pudim de açaí e torta de bacuri.' },
        ],
      },
    ],
  },
  'Bumbódromo': {
    secoes: [
      {
        titulo: 'A Arena do Maior Espetáculo da Amazônia',
        texto: 'Inaugurado em 1988, o estádio a céu aberto foi projetado em formato de cabeça de boi e tem capacidade para mais de 35 mil pessoas.',
        lista: ['Inauguração: 1988.', 'Capacidade: Mais de 35.000 espectadores por noite.', 'Formato: Projetado em forma de cabeça de boi.', 'Localização: Ilha de Parintins, no Rio Amazonas.'],
      },
      {
        titulo: 'Garantido x Caprichoso: Uma Guerra de Cores',
        texto: 'Durante três noites na última semana de junho, o Bumbódromo se divide ao meio: um lado vermelho e branco do Boi Garantido, o outro azul e branco do Boi Caprichoso.',
        subsecoes: [
          { titulo: 'Boi Garantido', texto: 'Fundado em 1913, tem o coração como símbolo e o vermelho como cor. Famoso por suas toadas emocionantes.' },
          { titulo: 'Boi Caprichoso', texto: 'Fundado em 1913, tem a estrela como símbolo e o azul como cor. Conhecido pela criatividade de suas alegorias.' },
          { titulo: 'Como Chegar', texto: 'De Manaus, é possível chegar a Parintins de avião (~1h) ou de barco (18 a 24 horas pelo Rio Amazonas).' },
        ],
      },
    ],
  },
  'Cachoeira do Santuário': {
    secoes: [
      {
        titulo: 'A Joia Escondida da Amazônia',
        texto: 'Localizada em Presidente Figueiredo, município conhecido como a "Terra das Cachoeiras". Com piscinas naturais de águas cristalinas a apenas 107 km de Manaus.',
        lista: ['Localização: Presidente Figueiredo, a 107 km de Manaus.', 'Acesso: Trilha de aproximadamente 1,5 km pela floresta.', 'Destaque: Piscinas naturais ideais para banho.'],
      },
      {
        titulo: 'Um Espetáculo de Água e Floresta',
        texto: 'Presidente Figueiredo abriga mais de 100 cachoeiras catalogadas. O percurso é uma imersão completa na biodiversidade da floresta.',
        subsecoes: [
          { titulo: 'As Piscinas Naturais', texto: 'As piscinas têm águas transparentes e temperatura agradável, ideais para banho.' },
          { titulo: 'A Trilha', texto: 'Trilha de aproximadamente 1,5 km em meio à floresta amazônica, de dificuldade moderada.' },
          { titulo: 'Como Chegar', texto: 'De Manaus, siga pela AM-010 por aproximadamente 107 km até Presidente Figueiredo (cerca de 1h30 de carro).' },
        ],
      },
    ],
  },
  'Coreto Peixaria & Café Regional': {
    secoes: [
      {
        titulo: 'Sabores Amazônicos com Alma de Café',
        texto: 'Um dos restaurantes mais charmosos de Manaus, unindo a tradição da peixaria amazônica com o aconchego de um café regional.',
        lista: ['Localização: Manaus — AM.', 'Especialidade: Peixes frescos e café regional.', 'Diferencial: Fusão entre peixaria tradicional e café amazônico.'],
      },
      {
        titulo: 'Da Floresta para a Mesa',
        texto: 'Cada prato é preparado com ingredientes frescos e técnicas tradicionais que preservam a essência da culinária regional.',
        subsecoes: [
          { titulo: 'Peixes da Amazônia', texto: 'Tambaqui assado na brasa, pirarucu de casaca, tucunaré ao molho de tucumã.' },
          { titulo: 'Café e Bebidas Regionais', texto: 'Café preparado com grãos selecionados da região amazônica, suco de cupuaçu e o famoso café coado na cuia.' },
          { titulo: 'Horários', texto: 'Terça a domingo, das 11h30 às 15h (almoço) e das 18h às 23h (jantar).' },
        ],
      },
    ],
  },
  'Ponte Rio Negro': {
    secoes: [
      {
        titulo: 'A Ponte que Une o Amazonas',
        texto: 'Com 3,5 km de extensão, a ponte estaiada conecta Manaus a Iranduba, cruzando o majestoso Rio Negro. Inaugurada em 2011.',
        lista: ['Extensão: 3,5 km sobre o Rio Negro.', 'Inauguração: 24 de outubro de 2011.', 'Tipo: Ponte estaiada — a maior da América Latina em seu tipo.'],
      },
      {
        titulo: 'Uma Obra Monumental',
        texto: 'Seu projeto desafiou as condições extremas da Amazônia — variação de até 14 metros no nível do rio, ventos intensos e solo instável.',
        subsecoes: [
          { titulo: 'Estrutura Estaiada', texto: 'As duas torres principais têm 80 metros de altura e são visíveis de vários pontos de Manaus.' },
          { titulo: 'Impacto Regional', texto: 'Antes da ponte, a travessia entre Manaus e Iranduba era feita apenas por balsa, levando até 40 minutos. Com a ponte, o trajeto é feito em menos de 5 minutos.' },
          { titulo: 'Melhor Horário', texto: 'O pôr do sol é o momento mais fotogênico — a luz dourada reflete nas águas escuras do Rio Negro.' },
        ],
      },
    ],
  },
  'Cristo Redentor': {
    secoes: [
      {
        titulo: 'Uma das Sete Maravilhas do Mundo Moderno',
        texto: 'O Cristo Redentor, com 38 metros de altura no topo do Corcovado (710m), é o símbolo máximo do Rio de Janeiro e um dos monumentos mais visitados do mundo. Inaugurado em 1931, foi eleito uma das Sete Maravilhas do Mundo Moderno em 2007.',
        lista: ['Altura: 38 metros (30m estátua + 8m pedestal).', 'Inauguração: 12 de outubro de 1931.', 'Localização: Topo do Corcovado, 710m de altitude.', 'Reconhecimento: Uma das Sete Maravilhas do Mundo Moderno (2007).'],
      },
      {
        titulo: 'Como Visitar',
        texto: 'O acesso ao Cristo Redentor é feito pelo Trem do Corcovado, que parte do bairro do Cosme Velho, ou por van pela Estrada das Paineiras. A vista panorâmica do Rio de Janeiro do topo é inesquecível.',
        subsecoes: [
          { titulo: 'Trem do Corcovado', texto: 'O trem parte da Rua Cosme Velho, 513. Funciona das 8h às 19h. Ingresso: R$ 87 (adulto). Recomenda-se comprar online com antecedência.' },
          { titulo: 'Melhor Horário', texto: 'Chegue cedo (antes das 9h) para evitar filas e aproveitar a vista sem neblina. Dias nublados podem encobrir a estátua.' },
          { titulo: 'Dicas', texto: 'Leve protetor solar e água. O topo pode ser ventoso. A vista abrange Pão de Açúcar, Lagoa Rodrigo de Freitas, Maracanã e as praias.' },
        ],
      },
    ],
  },
  'Pão de Açúcar': {
    secoes: [
      {
        titulo: 'O Cartão-Postal do Rio',
        texto: 'O Pão de Açúcar, com 396 metros de altura, é um dos pontos turísticos mais famosos do Brasil. O acesso é feito por dois bondinhos aéreos que partem da Praia Vermelha.',
        lista: ['Altura: 396 metros.', 'Acesso: Bondinho aéreo em dois trechos.', 'Localização: Urca, Rio de Janeiro.'],
      },
      {
        titulo: 'A Vista que Para o Tempo',
        texto: 'Do topo, a vista abrange a Baía de Guanabara, o Cristo Redentor, as praias de Copacabana e Ipanema e o centro do Rio.',
        subsecoes: [
          { titulo: 'O Bondinho', texto: 'O primeiro trecho vai até o Morro da Urca (232m). O segundo sobe ao Pão de Açúcar (396m). Funciona das 8h às 21h. Ingresso: R$ 150 (adulto).' },
          { titulo: 'Melhor Horário', texto: 'O pôr do sol e o início da noite são os momentos mais mágicos — a cidade iluminada vista do alto é espetacular.' },
          { titulo: 'Trilha', texto: 'Para os aventureiros, há uma trilha de escalada até o topo do Pão de Açúcar, com guias especializados.' },
        ],
      },
    ],
  },
  'Praia de Copacabana': {
    secoes: [
      {
        titulo: 'A Praia Mais Famosa do Mundo',
        texto: 'Com 4 km de extensão, Copacabana é um dos símbolos do Rio de Janeiro e do Brasil. O calçadão com o famoso mosaico de ondas em preto e branco é um ícone do design urbano carioca.',
        lista: ['Extensão: 4 km de areia.', 'Localização: Zona Sul do Rio de Janeiro.', 'Destaque: Calçadão com mosaico de ondas de Burle Marx.'],
      },
      {
        titulo: 'Muito Além da Praia',
        texto: 'Copacabana é um bairro vibrante, com hotéis históricos como o Copacabana Palace, restaurantes, bares e a famosa Feira de Artesanato.',
        subsecoes: [
          { titulo: 'Réveillon', texto: 'A festa de Ano Novo de Copacabana reúne mais de 2 milhões de pessoas na praia para assistir aos fogos de artifício.' },
          { titulo: 'Forte de Copacabana', texto: 'O Forte de Copacabana, na ponta da praia, abriga um museu histórico e um café com vista privilegiada para o mar.' },
          { titulo: 'Como Chegar', texto: 'Metrô linha 1 (estação Cardeal Arcoverde, Siqueira Campos ou Cantagalo). Ônibus de várias linhas.' },
        ],
      },
    ],
  },
  'Praia de Ipanema': {
    secoes: [
      {
        titulo: 'A Garota de Ipanema e o Mar',
        texto: 'Ipanema é considerada uma das praias mais bonitas do mundo. Imortalizada pela bossa nova de Tom Jobim e Vinícius de Moraes, a praia é símbolo de estilo e beleza carioca.',
        lista: ['Extensão: 2,5 km de areia.', 'Localização: Zona Sul do Rio de Janeiro.', 'Destaque: Pôr do sol visto do Arpoador.'],
      },
      {
        titulo: 'O Melhor do Rio em Uma Praia',
        texto: 'Ipanema tem uma das melhores cenas de praia do mundo, com quiosques, esportes aquáticos e o famoso Arpoador para surfistas.',
        subsecoes: [
          { titulo: 'Arpoador', texto: 'A pedra do Arpoador, entre Ipanema e Copacabana, é o melhor lugar do Rio para assistir ao pôr do sol. Centenas de pessoas aplaudem o sol se pondo no mar.' },
          { titulo: 'Feira Hippie', texto: 'Aos domingos, a Praça General Osório recebe a famosa Feira Hippie de Ipanema, com artesanato, roupas e gastronomia.' },
          { titulo: 'Como Chegar', texto: 'Metrô linha 1 (estação General Osório). Ônibus de várias linhas pela Zona Sul.' },
        ],
      },
    ],
  },
  'Jericoacoara': {
    secoes: [
      {
        titulo: 'O Paraíso Escondido do Brasil',
        texto: 'Considerada uma das praias mais bonitas do mundo pela revista Condé Nast Traveler, Jericoacoara encanta pela combinação única de paisagens selvagens, ventos constantes e um pôr do sol que para o tempo.',
        lista: ['Localização: Jijoca de Jericoacoara, a 300 km de Fortaleza.', 'Destaque: Pôr do sol na Pedra Furada.', 'Esportes: Kitesurf e windsurf entre os melhores do planeta.'],
      },
      {
        titulo: 'Viva Jeri ao Máximo',
        texto: 'Das lagoas de água doce às dunas que parecem desertos, cada canto guarda uma surpresa.',
        subsecoes: [
          { titulo: 'Lagoa do Paraíso e Lagoa Azul', texto: 'As lagoas de água doce cristalina são o cartão-postal de Jeri. Perfeitas para um mergulho refrescante.' },
          { titulo: 'Kitesurf e Windsurf', texto: 'Os ventos constantes tornaram Jeri um dos melhores destinos do mundo para kitesurf e windsurf.' },
          { titulo: 'Como Chegar', texto: 'De Fortaleza, pegue um ônibus ou van até Jijoca (aprox. 4h). De lá, 4x4s fazem o trajeto pelas dunas até a vila (30 min).' },
        ],
      },
    ],
  },
  'Ouro Preto': {
    secoes: [
      {
        titulo: 'A Capital do Ouro e da Inconfidência',
        texto: 'Ouro Preto foi a capital de Minas Gerais durante o ciclo do ouro no século XVIII e o epicentro da Inconfidência Mineira. Tombada como Patrimônio Mundial da UNESCO em 1980.',
        lista: ['UNESCO: Patrimônio Mundial desde 1980.', 'Altitude: 1.179 metros acima do nível do mar.', 'Destaque: Igreja de São Francisco de Assis, obra-prima de Aleijadinho.'],
      },
      {
        titulo: 'O Que Explorar em Ouro Preto',
        texto: 'Ouro Preto é um museu a céu aberto. Cada rua de paralelepípedo, cada igreja e cada mirante conta uma história fascinante.',
        subsecoes: [
          { titulo: 'Igrejas Barrocas', texto: 'As 13 igrejas de Ouro Preto são obras-primas do barroco. A Igreja Nossa Senhora do Pilar tem 400 kg de ouro em seu interior.' },
          { titulo: 'Museu da Inconfidência', texto: 'Preserva documentos, objetos e a história da Inconfidência Mineira de 1789, incluindo os restos mortais de Tiradentes.' },
          { titulo: 'Como Chegar', texto: 'De Belo Horizonte, há ônibus regulares (2h) e excursões diárias. De carro, siga pela BR-356.' },
        ],
      },
    ],
  },
  'Monte Roraima': {
    secoes: [
      {
        titulo: 'O Ponto Mais Alto do Brasil',
        texto: 'O Monte Roraima, com 2.875 metros de altitude, é o ponto mais alto do Brasil e uma das formações geológicas mais antigas do planeta, com mais de 1,8 bilhão de anos. Localizado na tríplice fronteira entre Brasil, Venezuela e Guiana.',
        lista: ['Altitude: 2.875 metros — ponto mais alto do Brasil.', 'Idade: Mais de 1,8 bilhão de anos.', 'Fronteira: Brasil, Venezuela e Guiana.'],
      },
      {
        titulo: 'O Trekking Mais Épico do Brasil',
        texto: 'O trekking ao Monte Roraima é considerado uma das aventuras mais épicas da América do Sul, com paisagens de outro mundo.',
        subsecoes: [
          { titulo: 'Trekking ao Topo', texto: 'O trekking completo dura de 8 a 12 dias, partindo da aldeia Paraitepui. O topo plano é coberto por plantas carnívoras, cristais de quartzo e piscinas naturais.' },
          { titulo: 'Flora e Fauna Únicas', texto: 'O topo abriga espécies endêmicas que não existem em nenhum outro lugar do planeta.' },
          { titulo: 'Como Chegar', texto: 'De Boa Vista, pegue um ônibus ou carro até Pacaraima (215 km). De lá, siga até a aldeia Paraitepui. Guia indígena é obrigatório.' },
        ],
      },
    ],
  },
  'Parque Estadual do Jalapão': {
    secoes: [
      {
        titulo: 'O Deserto Dourado do Cerrado',
        texto: 'Com dunas de areia dourada que chegam a 40 metros de altura, fervedouros de água cristalina, cachoeiras e serras. O capim dourado, fibra exclusiva da região, é a matéria-prima do artesanato mais famoso do Tocantins.',
        lista: ['Área: 158.885 hectares de Cerrado preservado.', 'Destaque: Fervedouros — nascentes de água cristalina.', 'Artesanato: Capim dourado, fibra exclusiva do Jalapão.'],
      },
      {
        titulo: 'Aventura no Coração do Cerrado',
        texto: 'O Jalapão oferece experiências únicas para os amantes da natureza e do ecoturismo.',
        subsecoes: [
          { titulo: 'Fervedouros', texto: 'Nascentes de água subterrânea que emergem com tanta pressão que parecem "ferver". A pressão natural cria uma sensação única de flutuação.' },
          { titulo: 'Dunas de Areia', texto: 'As dunas douradas chegam a 40 metros de altura. Subir ao entardecer e contemplar o pôr do sol sobre o Cerrado é um dos momentos mais mágicos.' },
          { titulo: 'Como Chegar', texto: 'De Palmas, siga pela TO-010 até Mateiros (320 km, sendo 200 km de estrada de terra). Veículo 4x4 é obrigatório.' },
        ],
      },
    ],
  },
  'Fortaleza de São José de Macapá': {
    secoes: [
      {
        titulo: 'Defesa da Amazônia Portuguesa',
        texto: 'Construída entre 1764 e 1782 por ordem da Coroa Portuguesa para proteger a região amazônica contra possíveis invasões estrangeiras. Considerada uma das maiores fortificações militares coloniais do Brasil.',
        lista: ['Construção: Entre 1764 e 1782.', 'Objetivo: Defesa da Amazônia contra invasões estrangeiras.', 'Status: Patrimônio histórico e cultural nacional.'],
      },
      {
        titulo: 'Patrimônio Histórico Nacional',
        texto: 'A fortaleza é um importante marco da ocupação portuguesa na Amazônia, preservando parte significativa da história da formação territorial do país.',
        subsecoes: [
          { titulo: 'Arquitetura', texto: 'A fortaleza tem formato estrelado típico das fortificações europeias do século XVIII, com muralhas, fosso e canhões originais.' },
          { titulo: 'Localização', texto: 'Situada às margens do Rio Amazonas, no centro de Macapá, com vista privilegiada para o rio.' },
          { titulo: 'Visitas', texto: 'Aberta ao público de terça a domingo. A entrada é gratuita. Guias locais oferecem visitas guiadas pelo complexo histórico.' },
        ],
      },
    ],
  },
};
