import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';
export type Lang = 'pt' | 'en' | 'es';

interface Settings {
  theme: Theme;
  lang: Lang;
  setTheme: (t: Theme) => void;
  setLang: (l: Lang) => void;
}

const SettingsContext = createContext<Settings>({
  theme: 'dark', lang: 'pt',
  setTheme: () => {}, setLang: () => {},
});

export const translations: Partial<Record<Lang, Record<string, string>>> & { pt: Record<string, string> } = {
  pt: {
    inicio: 'Início', estados: 'Estados', favoritos: 'Favoritos', perfil: 'Perfil',
    venha: 'Venha', explorar: 'explorar', brasil: 'o Brasil',
    destaques: 'Estados em Destaque', monumentos: ' Monumentos em Destaque',
    comidas: ' Comidas Típicas', verTodas: 'Ver todas',
    timeline: ' Linha do Tempo do Brasil', saibaMais: 'Saiba mais →', explorarEstado: 'Explorar Estado →',
    pesquisar: 'Pesquisar estado ou monumento...', buscasRecentes: 'Buscas recentes', limpar: 'Limpar',
    modoEscuro: 'Modo Escuro', modoClaro: 'Modo Claro', idioma: 'Idioma',
    salvar: 'SALVAR', usuario: 'Usuário', nome: 'Nome', sobrenome: 'Sobrenome', email: 'E-mail', telefone: 'Telefone',
    fechar: 'Fechar', explorarEstadoBtn: 'Explorar Estado →',
    loginParaFavoritar: 'Faça login para favoritar',
    // Hero
    heroGreeting: 'Venha', heroAction: 'explorar', heroBrasil: 'o Brasil',
    // Netflix subtitles
    subRJ: 'Cristo Redentor, Carnaval, Praias',
    subBA: 'Pelourinho, Carnaval de Salvador',
    subAM: 'Teatro Amazonas, Encontro das Águas',
    subMA: 'Lençóis Maranhenses, Bumba Meu Boi',
    subMG: 'Ouro Preto, Instituto Inhotim',
    subPR: 'Cataratas do Iguaçu, Curitiba',
    subPE: 'Olinda, Recife Antigo, Frevo',
    subGO: 'Chapada dos Veadeiros, Cidade de Goiás',
    subPA: 'Alter do Chão, Ver-o-Peso, Marajó',
    subSP: 'MASP, Parque Ibirapuera, Virada Cultural',
    // Comidas
    verTodos: 'Ver\ntodas',
    c_acaraje_name: 'Acarajé', c_acaraje_region: 'Bahia', 
    c_acaraje_desc: 'História:\nO acarajé tem forte influência da culinária africana, especialmente dos povos haúça da região da África Ocidental. No Brasil, ele se desenvolveu principalmente na Bahia, dentro da culinária afro-brasileira, como resultado da adaptação de receitas tradicionais africanas aos ingredientes disponíveis no país. Tornou-se um prato muito presente em Salvador, especialmente em contextos ligados à cultura de rua e à herança gastronômica do período colonial, representando a fusão entre técnicas africanas e ingredientes brasileiros.\n\nIngredientes:\n* Feijão fradinho, \n* Cebola, \n* Azeite de dendê, \n* Vatapá, \n* Caruru, \n* Camarão seco.\n\nReceita:\n* Deixe o feijão de molho e depois retire a casca. \n* Bata no liquidificador com cebola até formar uma massa. \n* Frite colheradas da massa em azeite de dendê quente. \n* Sirva com vatapá, caruru e camarão seco.',
    c_arroz_name: 'Arroz de Hauçá', c_arroz_region: 'Bahia', 
    c_arroz_desc: 'História:\nO arroz de hauçá tem forte influência da culinária africana, especialmente dos povos haúça da região da África Ocidental. No Brasil, ele se desenvolveu principalmente na Bahia, dentro da culinária afro-brasileira, como resultado da adaptação de receitas tradicionais africanas aos ingredientes disponíveis no país. Tornou-se um prato muito presente em Salvador, especialmente em contextos ligados à cultura de rua e à herança gastronômica do período colonial, representando a fusão entre técnicas africanas e ingredientes brasileiros.\n\nIngredientes:\n* Arroz branco, \n* Carne seca, \n* Cebola, \n* Alho, \n* Leite de coco, \n* Azeite de dendê, \n* Sal.\n\nReceita:\n* Dessalgue a carne seca deixando de molho por 6 a 12 horas, trocando a água algumas vezes. \n* Cozinhe a carne até ficar macia e desfie em pedaços pequenos. \n* Em uma panela, refogue alho e cebola no azeite ou óleo até dourar. \n* Adicione a carne desfiada e misture bem para pegar sabor. \n* Acrescente o arroz cru e refogue junto com os temperos. \n* Cubra com água quente e cozinhe até o arroz ficar macio. \n* Quando quase seco, adicione o leite de coco e misture delicadamente. \n* Finalize com um fio de dendê para aroma e cor.', 
    c_baiao_name: 'Baião de Dois', c_baiao_region: 'Nordeste', 
    c_baiao_desc: 'História:\nO baião de dois é um prato típico do Nordeste brasileiro, especialmente do Ceará e do Piauí. Surgiu da necessidade de aproveitar arroz e feijão juntos como refeição completa para trabalhadores rurais. O nome foi popularizado pela cultura musical nordestina, especialmente por Luiz Gonzaga, que ajudou a consolidar o prato como símbolo da identidade sertaneja.\n\nIngredientes:\n* Arroz, \n* Feijão de corda, \n* Carne seca ou de sol, \n* Cebola, \n* Alho, \n* Queijo coalho, \n* Manteiga.\n\nReceita:\n* Cozinhe o feijão até ficar macio, mas sem desmanchar. \n* Dessalgue a carne seca e cozinhe até ficar macia, depois desfie. \n* Em uma panela grande, refogue alho, cebola e a carne. \n* Acrescente o arroz cru e misture bem com os temperos. \n* Adicione o feijão cozido e misture levemente. \n* Cubra com água quente e cozinhe até o arroz ficar pronto. \n* Quando estiver quase seco, adicione queijo coalho em cubos. \n* Tampe a panela e deixe o queijo derreter antes de servir.', 
    c_barreado_name: 'Barreado', c_barreado_region: 'Paraná', 
    c_barreado_desc: 'História:\nO barreado é um prato tradicional do litoral do Paraná, especialmente em cidades como Morretes e Antonina. Sua origem remonta ao período colonial, quando festas populares e reuniões comunitárias utilizavam o cozimento lento da carne em panelas de barro vedadas. O nome "barreado" vem justamente da técnica de vedar a panela com massa de farinha e água, mantendo o cozimento por muitas horas.\n\nIngredientes:\n* Carne bovina (acém ou paleta), \n* Cebola, \n* Alho, \n* Louro, \n* Pimenta-do-reino, \n* Farinha de mandioca, \n* Sal.\n\nReceita:\n* Corte a carne em pedaços grandes e tempere com alho, sal e pimenta. \n* Coloque a carne em uma panela de barro com cebola e louro. \n* Adicione um pouco de água e tampe a panela. \n* Vede a tampa com uma massa feita de farinha e água. \n* Cozinhe em fogo baixo por 8 a 12 horas até a carne desmanchar. \n* Abra cuidadosamente a panela após o cozimento. \n* Desfie a carne e ajuste o sal. \n* Sirva com farinha de mandioca e banana.', 
    c_bolo_name: 'Bolo de Rolo', c_bolo_region: 'Pernambuco', 
    c_bolo_desc: 'História:\nO bolo de rolo é um doce típico de Pernambuco e tem origem em adaptações de receitas portuguesas, especialmente do "colchão de noiva". No Brasil, a receita foi transformada em camadas extremamente finas de massa enroladas com goiabada, tornando-se um dos maiores símbolos da confeitaria pernambucana.\n\nIngredientes:\n* Farinha de trigo, \n* Ovos, \n* Açúcar, \n* Manteiga, \n* Goiabada.\n\nReceita:\n* Bata manteiga, açúcar e ovos até formar um creme leve. \n* Acrescente farinha aos poucos até formar massa lisa. \n* Espalhe uma camada muito fina de massa em forma untada. \n* Asse rapidamente para não dourar demais. \n* Espalhe goiabada derretida sobre a massa quente. \n* Enrole cuidadosamente em camadas finas. \n* Repita o processo até formar várias camadas. \n* Deixe esfriar e corte em fatias.', 
    c_caranguejada_name: 'Caranguejada', c_caranguejada_region: 'Nordeste', 
    c_caranguejada_desc: 'História:\nA caranguejada é um prato típico do litoral nordestino, especialmente em estados como Ceará e Maranhão. Surgiu nas comunidades pesqueiras que utilizavam o caranguejo como alimento abundante dos manguezais. Tornou-se uma refeição social, geralmente consumida em grupos e acompanhada de molhos e limão.\n\nIngredientes:\n* Caranguejos inteiros, \n* Alho, \n* Cebola, \n* Tomate, \n* Pimentão, \n* Coentro, \n* Sal e limão.\n\nReceita:\n* Lave bem os caranguejos e retire impurezas. \n* Tempere com sal, alho e limão. \n* Faça um refogado com cebola, tomate e pimentão. \n* Adicione os caranguejos ao refogado. \n* Acrescente um pouco de água e tampe a panela. \n* Cozinhe até a carne ficar macia e bem temperada. \n* Finalize com coentro fresco. Sirva com limão.', 
    c_carnesol_name: 'Carne de Sol com Macaxeira', c_carnesol_region: 'Nordeste', 
    c_carnesol_desc: 'História:\nA carne com macaxeira é uma variação muito popular da culinária nordestina, ligada à tradição da carne de sol. Surgiu como uma combinação natural entre a carne conservada pelo sal e a macaxeira, alimento abundante e energético na região. O prato representa a culinária sertaneja baseada em simplicidade e aproveitamento total dos ingredientes.\n\nIngredientes:\n* Carne de sol, \n* Macaxeira, \n* Alho, \n* Cebola, \n* Manteiga de garrafa, \n* Sal.\n\nReceita:\n* Dessalgue a carne de sol e corte em pedaços. \n* Cozinhe a macaxeira até ficar macia. \n* Grelhe a carne na manteiga de garrafa até dourar. \n* Refogue alho e cebola na mesma gordura. \n* Misture tudo na panela para incorporar sabor. \n* Ajuste o sal se necessário. \n* Sirva quente com a macaxeira.', 
    c_carneiro_name: 'Carneiro no Buraco', c_carneiro_region: 'Paraná', 
    c_carneiro_desc: 'História:\nO carneiro no buraco é um prato tradicional do interior do Paraná, especialmente em Campo Mourão. Sua origem está nas festas comunitárias rurais, onde o cozimento era feito em buracos no chão com brasas, permitindo preparo lento e uniforme da carne.\n\nIngredientes:\n* Carne de carneiro, \n* Cebola, \n* Alho, \n* Tomate, \n* Vinho ou caldo, \n* Sal e pimenta.\n\nReceita:\n* Tempere o carneiro com alho, sal e pimenta. \n* Coloque em panela grande com legumes. \n* Leve ao buraco com brasas cobertas. \n* Cozinhe lentamente por várias horas. \n* Retire quando a carne estiver desmanchando. \n* Ajuste temperos e sirva.', 
    c_chambari_name: 'Chambari', c_chambari_region: 'Goiás',
    c_chambari_desc: 'História:\nO chambari é um prato típico de Goiás feito com a parte do ossobuco do boi. Tornou-se popular na culinária goiana devido ao sabor marcante e textura macia da carne cozida lentamente.\n\nIngredientes:\n* Chambari (ossobuco), \n* Cebola, \n* Alho, \n* Tomate, \n* Vinho ou caldo, \n* Sal e pimenta.\n\nReceita:\n* Tempere o chambari. \n* Refogue com legumes e adicione líquido. \n* Cozinhe lentamente até a carne desmanchar.',
    c_galinhada_name: 'Galinhada', c_galinhada_region: 'Goiás',
    c_galinhada_desc: 'História:\nA galinhada é um prato típico de Goiás e do Centro-Oeste brasileiro. É um arroz colorido cozido junto com frango, açafrão e pequi, tornando-se um dos símbolos da culinária goiana.\n\nIngredientes:\n* Frango, \n* Arroz, \n* Açafrão, \n* Pequi, \n* Cebola, \n* Alho, \n* Sal e pimenta.\n\nReceita:\n* Cozinhe o frango temperado. \n* Refogue os temperos, adicione o arroz e o caldo do frango. \n* Cozinhe até o arroz ficar macio e finalize com pequi.',
    c_ginga_name: 'Ginja com Tapioca', c_ginga_region: 'Pernambuco',
    c_ginga_desc: 'História:\nA ginja com tapioca é um petisco típico de Pernambuco, especialmente popular nas praias. Consiste em peixinhos fritos servidos dentro de uma tapioca, combinando a influência indígena com os ingredientes locais.\n\nIngredientes:\n* Ginja (peixe pequeno), \n* Tapioca, \n* Alho, \n* Limão, \n* Sal.\n\nReceita:\n* Tempere e frite as ginjas. \n* Prepare a tapioca na chapa. \n* Recheie a tapioca com as ginjas fritas e sirva quente.',
    c_maria_name: 'Maria Isabel', c_maria_region: 'Piauí',
    c_maria_desc: 'História:\nA Maria Isabel é um prato típico do Piauí que mistura arroz com carne seca desfiada. É um prato simples da culinária sertaneja, nutritivo e saboroso, muito presente nas mesas piauienses.\n\nIngredientes:\n* Arroz, \n* Carne seca, \n* Cebola, \n* Alho, \n* Cheiro verde, \n* Sal.\n\nReceita:\n* Dessalgue e cozinhe a carne seca. \n* Desfie a carne. \n* Refogue com temperos, adicione o arroz e o caldo da carne. \n* Cozinhe até secar e finalize com cheiro verde.',
    c_pacoca_name: 'Paçoca de Carne Seca', c_pacoca_region: 'Mato Grosso',
    c_pacoca_desc: 'História:\nA paçoca de carne seca é um prato típico do Mato Grosso e de outras regiões do Centro-Oeste. Tem origem na culinária dos tropeiros e é feita com carne seca desfiada e pilada com farinha de mandioca.\n\nIngredientes:\n* Carne seca, \n* Farinha de mandioca, \n* Cebola, \n* Alho, \n* Cebolinha, \n* Sal.\n\nReceita:\n* Cozinhe e desfie a carne seca. \n* Pique bem até ficar em pedaços pequenos. \n* Misture com farinha torrada, cebola refogada e cebolinha. \n* Sirva quente.',
    c_pamonha_name: 'Pamonha de Carne Seca', c_pamonha_region: 'Centro-Oeste/Sudeste', 
    c_pamonha_desc: 'História:\nA pamonha tem origem indígena e é tradicional em várias regiões do Brasil, especialmente no Centro-Oeste e Sudeste. Seu nome vem do tupi e a técnica de cozinhar alimentos envoltos em folhas de milho já era utilizada por povos indígenas muito antes da colonização. Com o tempo, a pamonha se tornou símbolo das festas juninas e da culinária caipira, sendo encontrada tanto em versões doces quanto salgadas.\n\nIngredientes:\n* Milho verde fresco, \n* Leite, \n* Açúcar (doce) ou Sal (salgada), \n* Manteiga, \n* Palha de milho.\n\nReceita:\n* Retire os grãos de milho das espigas com uma faca. \n* Bata o milho no liquidificador com leite até formar uma massa cremosa. \n* Coe levemente se quiser textura mais fina. \n* Tempere com açúcar ou sal conforme a versão. \n* Acrescente manteiga derretida para dar sabor e maciez. \n* Lave as palhas de milho e seque bem. \n* Coloque a massa dentro das palhas dobradas e feche bem. \n* Amarre com tiras de palha ou barbante culinário. \n* Cozinhe em água fervente por cerca de 40-60 minutos. \n* Retire e deixe esfriar antes de servir.',
    c_mortadela_name: 'Pão com Mortadela', c_mortadela_region: 'São Paulo', 
    c_mortadela_desc: 'História:\nO pão com mortadela é um lanche típico das grandes cidades brasileiras, especialmente em São Paulo. Tornou-se popular em mercados municipais e lanchonetes, sendo símbolo da comida de rua urbana. O famoso sanduíche do Mercado Municipal de São Paulo ajudou a consolidar sua fama como um lanche simples, barato e muito generoso em recheio.\n\nIngredientes:\n* Pão francês, \n* Mortadela fatiada, \n* Manteiga ou margarina, \n* Opcionais: queijo, mostarda.\n\nReceita:\n* Corte o pão francês ao meio. \n* Aqueça uma chapa ou frigideira. \n* Doure levemente as fatias de mortadela até ficarem levemente crocantes. \n* Abra o pão e passe manteiga. \n* Recheie com bastante mortadela quente. \n* Adicione queijo ou molhos se desejar. \n* Sirva imediatamente, ainda quente.',
    c_paoqueijo_name: 'Pão de Queijo', c_paoqueijo_region: 'Minas Gerais', 
    c_paoqueijo_desc: 'História:\nO pão de queijo é um ícone da culinária mineira, originado nas fazendas de Minas Gerais durante o período colonial. Surgiu como uma adaptação das receitas europeias de pão, substituindo a farinha de trigo pelo polvilho de mandioca e utilizando queijo curado produzido localmente. Tornou-se um dos alimentos mais famosos do Brasil.\n\nIngredientes:\n* Polvilho doce ou azedo, \n* Leite, \n* Óleo, \n* Ovos, \n* Queijo minas curado ralado, \n* Sal.\n\nReceita:\n* Ferva o leite com o óleo e o sal. \n* Despeje essa mistura quente sobre o polvilho para escaldar. \n* Misture bem até esfriar um pouco. \n* Adicione os ovos um a um, mexendo até incorporar. \n* Acrescente o queijo ralado e misture até formar massa homogênea. \n* Modele pequenas bolinhas com as mãos untadas. \n* Coloque em assadeira sem untar. \n* Asse em forno médio até crescer e dourar levemente.',
    c_pato_name: 'Pato no Tucupi', c_pato_region: 'Pará', 
    c_pato_desc: 'História:\nO pato no tucupi é um dos pratos mais tradicionais do Pará, especialmente em Belém. Tem origem indígena e é muito associado ao Círio de Nazaré, uma das maiores festas religiosas do Brasil. O tucupi, líquido amarelo extraído da mandioca brava, é base essencial do prato, que combina influências indígenas e portuguesas.\n\nIngredientes:\n* Pato inteiro em pedaços, \n* Tucupi, \n* Jambu, \n* Alho, \n* Cebola, \n* Chicória, \n* Sal e pimenta.\n\nReceita:\n* Tempere o pato com alho, sal e pimenta. \n* Doure os pedaços em panela até selar bem. \n* Cozinhe o pato até ficar macio, adicionando água se necessário. \n* Em outra panela, ferva o tucupi por pelo menos 20 minutos. \n* Adicione alho e chicória ao tucupi fervido. \n* Coloque o pato no tucupi e cozinhe junto por mais alguns minutos. \n* Acrescente o jambu no final para manter o efeito levemente adormecedor. \n* Sirva com arroz branco.',
    c_pirarucu_name: 'Pirarucu de Casaca', c_pirarucu_region: 'Amazonas', 
    c_pirarucu_desc: 'História:\nO pirarucu de casaca é um prato típico do Amazonas, especialmente em Manaus. Ele reflete a culinária ribeirinha, baseada no pirarucu, um dos maiores peixes de água doce do mundo. O prato combina peixe seco ou fresco com camadas de farinha, banana e outros ingredientes regionais, representando a mistura de influências indígenas e caboclas.\n\nIngredientes:\n* Pirarucu salgado ou fresco, \n* Farinha de mandioca, \n* Banana da terra, \n* Cebola, \n* Tomate, \n* Azeitona, \n* Ovos cozidos, \n* Azeite.\n\nReceita:\n* Dessalgue o pirarucu se estiver seco. \n* Cozinhe e desfie o peixe. \n* Refogue cebola e tomate até formar um molho. \n* Monte camadas em um refratário: peixe, farinha temperada, banana frita e molho. \n* Repita as camadas até terminar os ingredientes. \n* Finalize com ovos cozidos e azeitonas. \n* Leve ao forno por alguns minutos para integrar os sabores. \n* Sirva quente ou morno.',
    c_sopa_name: 'Sopa Paraguaia', c_sopa_region: 'Mato Grosso do Sul', 
    c_sopa_desc: 'História:\nA sopa paraguaia é um prato tradicional do Paraguai, apesar do nome sugerir uma sopa. Na verdade, trata-se de um bolo salgado à base de milho, muito consumido também no Mato Grosso do Sul devido à influência da fronteira. Sua origem está ligada à culinária guarani e às adaptações coloniais, quando o milho se tornou base alimentar da região.\n\nIngredientes:\n* Milho verde ou fubá, \n* Cebola, \n* Leite, \n* Ovos, \n* Queijo, \n* Óleo ou manteiga, \n* Sal.\n\nReceita:\n* Refogue a cebola até ficar transparente. \n* Bata o milho com leite até formar massa cremosa. \n* Misture ovos e óleo à massa. \n* Adicione queijo e o refogado de cebola. \n* Misture até ficar homogêneo.\n*  Despeje em forma untada. \n* Asse em forno médio por 40-50 minutos. \n* Sirva dourado por cima.',
    c_sururu_name: 'Sururu de Capote', c_sururu_region: 'Alagoas', 
    c_sururu_desc: 'História:\nO sururu de capote é típico do litoral do Nordeste, especialmente em Alagoas e Sergipe. Ele é preparado com o marisco sururu, encontrado em manguezais, e faz parte da culinária tradicional de comunidades pesqueiras. O prato é conhecido pelo caldo forte e temperado, servido com arroz ou pirão.\n\nIngredientes:\n* Sururu limpo, \n* Cebola, \n* Alho, \n* Tomate, \n* Coentro, \n* Pimentão, \n* Leite de coco, \n* Sal e pimenta.\n\nReceita:\n* Lave bem o sururu para retirar impurezas. \n* Refogue alho, cebola, tomate e pimentão. \n* Adicione o sururu e mexa rapidamente. \n* Acrescente leite de coco e um pouco de água. \n* Cozinhe por poucos minutos para não endurecer o marisco. \n* Ajuste o sal e finalize com coentro. \n* Sirva com arroz ou pirão.',
    c_tacaca_name: 'Tacacá', c_tacaca_region: 'Pará', 
    c_tacaca_desc: 'História:\nO tacacá é uma das comidas mais tradicionais da Amazônia, especialmente no Pará e Amazonas. Tem origem indígena e é preparado com tucupi, goma de mandioca e jambu, uma planta que causa leve dormência na boca. É vendido por tacacazeiras em ruas de cidades como Belém, sendo consumido quente, mesmo no clima tropical.\n\nIngredientes:\n* Tucupi, \n* Goma de mandioca, \n* Jambu, \n* Camarão seco, \n* Alho, \n* Sal e pimenta.\n\nReceita:\n* Ferva o tucupi com alho e sal por pelo menos 20 minutos. \n* Hidrate o jambu em água quente até murchar. \n* Cozinhe a goma de mandioca até virar um caldo espesso. \n* Hidrate o camarão seco. \n* Monte em cuia: goma no fundo, tucupi quente, jambu e camarão. \n* Sirva bem quente.',
    c_tainha_name: 'Tainha na Brasa', c_tainha_region: 'Santa Catarina', 
    c_tainha_desc: 'História:\nA tainha é um peixe muito tradicional no sul do Brasil, especialmente em Santa Catarina. Sua pesca é uma atividade cultural importante durante o inverno, quando os cardumes se aproximam da costa. A tainha é consumida assada, frita ou recheada, sendo parte essencial da culinária litorânea.\n\nIngredientes:\n* Tainha inteira, \n* Alho, \n* Limão, \n* Sal, \n* Ervas (opcional), \n* Farofa ou legumes para recheio.\n\nReceita:\n* Limpe bem o peixe. \n* Tempere com alho, sal e limão. \n* Deixe marinar por 30 minutos. \n* Recheie com farofa ou legumes se desejar. \n* Coloque em assadeira ou churrasqueira. \n* Asse até dourar por fora e cozinhar por dentro. \n* Sirva com limão.',
    c_terere_name: 'Tereré', c_terere_region: 'Mato Grosso do Sul', 
    c_terere_desc: 'História:\nO tereré é uma bebida tradicional do Paraguai e muito popular no Mato Grosso do Sul. É uma variação do chimarrão, mas servido com água fria, sendo ideal para climas quentes. Tem origem indígena guarani e é consumido em rodas sociais, especialmente durante o dia.\n\nIngredientes:\n* Erva-mate, \n* Água gelada ou suco natural, \n* Cuia ou copo, \n* Bomba.\n\nReceita:\n* Coloque a erva-mate na cuia. \n* Incline para formar espaço vazio. \n* Adicione água gelada ou suco. \n* Insira a bomba. \n* Reabasteça várias vezes durante o consumo.',
    c_tucupi_name: 'Pirarucu ao Molho de Tucupi', c_tucupi_region: 'Pará', 
    c_tucupi_desc: 'História:\nO pirarucu ao molho de tucupi é típico da região amazônica e utiliza o pirarucu, um dos maiores peixes de água doce do mundo. O prato combina a tradição indígena do tucupi com o peixe abundante dos rios amazônicos, resultando em uma refeição forte e aromática, muito presente na culinária do Pará.\n\nIngredientes:\n* Filé de pirarucu, \n* Tucupi, \n* Alho, \n* Cebola, \n* Jambu (opcional), \n* Sal e pimenta, \n* Coentro.\n\nReceita:\n* Tempere o peixe com sal e alho. \n* Grelhe ou cozinhe levemente o pirarucu. \n* Ferva o tucupi com alho e cebola por 20 minutos. \n* Adicione o peixe ao tucupi quente. \n* Cozinhe por mais alguns minutos para absorver o sabor. \n* Acrescente jambu se desejar. \n* Finalize com coentro e sirva com arroz.',
    c_chimarrao_name: 'Chimarrão', c_chimarrao_region: 'Rio Grande do Sul',
    c_chimarrao_desc: 'História:\nO chimarrão tem origem indígena, especialmente dos povos guaranis, que já consumiam erva-mate muito antes da colonização. Tornou-se símbolo cultural do Rio Grande do Sul e representa hospitalidade e convivência social.\n\nIngredientes:\n* Erva-mate, \n* Água quente, \n* Cuia, \n* Bomba.\n\nReceita:\n* Coloque a erva na cuia inclinada. \n* Adicione água quente sem ferver. \n* Insira a bomba. \n* Reponha água várias vezes. \n* Compartilhe entre pessoas.',
    c_churrasco_name: 'Churrasco Gaúcho', c_churrasco_region: 'Rio Grande do Sul', 
    c_churrasco_desc: 'História:\nO churrasco gaúcho surgiu entre os gaúchos dos pampas, que assavam carne em fogo aberto durante longas jornadas. Tornou-se símbolo da cultura do Rio Grande do Sul.\n\nIngredientes:\n* Carne bovina, \n* Sal grosso, \n* Carvão.\n\nReceita:\n* Espete a carne, tempere com sal grosso. \n* Asse na brasa lentamente, virando até dourar. \n* Fatie e sirva.',
    c_feijoada_name: 'Feijoada', c_feijoada_region: 'Nacional', 
    c_feijoada_desc: 'História:\nA feijoada surgiu no período colonial como adaptação do feijão com diferentes cortes de carne suína, evoluindo até se tornar um dos pratos mais emblemáticos do Brasil.\n\nIngredientes:\n* Feijão preto, \n* Carnes suínas, \n* Linguiça, \n* Alho, \n* Louro, \n* Cebola.\n\nReceita:\n* Deixe o feijão de molho. \n* Cozinhe as carnes separadamente. \n* Junte tudo em uma panela grande e cozinhe lentamente até engrossar. \n* Sirva com arroz e farofa.',
    c_moqueca_name: 'Moqueca', c_moqueca_region: 'Espírito Santo/Bahia',
    c_moqueca_desc: 'História:\nA moqueca é um prato tradicional brasileiro com variações no Espírito Santo e na Bahia. Tem origem indígena e utiliza peixe cozido em panela de barro com temperos regionais.\n\nIngredientes:\n* Peixe, \n* Tomate, \n* Cebola, \n* Pimentão, \n* Coentro, \n* Leite de coco, \n* Azeite de dendê (versão baiana), \n* Urucum (versão capixaba).\n\nReceita:\n* Tempere o peixe. \n* Refogue os legumes. \n* Adicione o peixe e cozinhe em panela de barro. \n* Finalize com leite de coco e dendê ou urucum. \n* Sirva com arroz e pirão.',
  },
 
 
};

export const themes = {
  dark:  { bg: '#07172F', card: '#1E2F4A', nav: '#102646', text: '#FFFFFF', subtext: '#aaa', accent: '#FFC700', header: '#0A172A' },
  light: { bg: '#BBDEFB', card: '#E3F2FD', nav: '#90CAF9', text: '#0D2B4E', subtext: '#1565C0', accent: '#0288D1', header: '#90CAF9' },
};

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [lang, setLangState] = useState<Lang>('pt');

  useEffect(() => {
    AsyncStorage.multiGet(['@theme', '@lang']).then(pairs => {
      if (pairs[0][1]) setThemeState(pairs[0][1] as Theme);
      if (pairs[1][1]) setLangState(pairs[1][1] as Lang);
    });
  }, []);

  const setTheme = (t: Theme) => { setThemeState(t); AsyncStorage.setItem('@theme', t); };
  const setLang = (l: Lang) => { setLangState(l); AsyncStorage.setItem('@lang', l); };

  return (
    <SettingsContext.Provider value={{ theme, lang, setTheme, setLang }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);

export const comida = translations.pt;
