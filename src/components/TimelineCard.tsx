import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions, Image, Modal, ScrollView,
  StatusBar, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themes, useSettings } from '../context/SettingsContext';

const { width: W } = Dimensions.get('window');

const timeline = [
  {
    year: '1500', title: 'Descobrimento do Brasil',
    highlights: ['Os Principais Fatos de 1500:'],
    description: `O 'descobrimento' do Brasil ocorreu em 22 de abril de 1500, quando a frota portuguesa comandada por Pedro Álvares Cabral chegou ao litoral do atual estado da Bahia, na região de Porto Seguro. Embora o termo 'descobrimento' seja consagrado historicamente, hoje os historiadores preferem falar em achamento ou chegada, já que o território já era habitado por milhões de indígenas muito antes da frota europeia despontar no horizonte.\n\nOs Principais Fatos de 1500:\n* A Expedição: Cabral partiu de Lisboa em março de 1500 com uma frota imponente de 13 embarcações. O objetivo oficial era contornar a África para chegar às Índias (onde o comércio de especiarias era altamente lucrativo), mas a rota fez um desvio intencional para o Ocidente.\n\n* O Primeiro Sinal: No dia 21 de abril, os marinheiros avistaram plantas marinhas. No dia seguinte, 22 de abril, viram terra firme e avistaram um monte arredondado, batizado de Monte Pascoal (pois era semana de Páscoa).\n\n* Os Primeiros Nomes: Inicialmente, os portugueses pensaram tratar-se de uma ilha e deram o nome de Ilha de Vera Cruz. Mais tarde, ao perceberem a imensidão da costa, mudaram para Terra de Santa Cruz. O nome Brasil só pegou anos depois, devido à abundância de pau-brasil, madeira cuja resina vermelha era usada para tingir tecidos na Europa.\n\n* O primeiro encontro entre os portugueses e os povos indígenas (da etnia Tupinambá) foi pacífico, marcado pela troca de objetos (escambo) e pela estranheza mútua de vestimentas, idiomas e costumes.\n\n* A Primeira Missa: No dia 26 de abril, foi celebrada a primeira missa no solo brasileiro pelo frei Henrique de Coimbra, simbolizando a posse da terra pela Coroa Portuguesa e pela Igreja Católica.\n\n* Casualidade ou Intencionalidade? Há um grande debate se Cabral chegou aqui por acidente ('desvio de rota devido às correntes marinhas') ou de propósito. A maioria dos historiadores modernos defende que Portugal já sabia da existência de terras ao sul desde o Tratado de Tordesilhas (1494) e que a viagem de Cabral serviu para oficializar e tomar posse desse território.`,
    route: '/Estados/Bahia', local: 'Bahia',
    photos: [
      require('../../assets/images/descobrimento/1.png'),
      require('../../assets/images/descobrimento/2.png'),
      require('../../assets/images/descobrimento/3.png'),
      require('../../assets/images/descobrimento/4.png'),
      require('../../assets/images/descobrimento/5.png'),
    ],
  },
  {
    year: '1549', title: 'Fundação de Salvador',
    highlights: ['Como foi a fundação?', 'A Divisão Geográfica (Cidade Alta vs. Cidade Baixa)'],
    description: `A fundação de Salvador, em 29 de março de 1549, foi um dos marcos mais importantes da colonização portuguesa, pois ela nasceu com uma grande responsabilidade: ser a primeira capital do Brasil.\n\nComo foi a fundação?\n* O Fundador: A missão foi entregue a Tomé de Sousa, o primeiro Governador-Geral do Brasil. Ele chegou à Baía de Todos os Santos liderando uma frota que trazia mais de mil pessoas, incluindo soldados, funcionários públicos, jesuítas (liderados por Manuel da Nóbrega) e operários.\n\n* A Localização Estratégica: A cidade foi construída no alto de um grande penhasco (onde hoje fica o Centro Histórico e a Cidade Alta). Essa escolha foi puramente defensiva: do alto, os portugueses tinham uma visão privilegiada de toda a baía, facilitando a defesa contra navios inimigos. Além disso, a muralha de terra e paliçadas protegia a cidade por terra.\n\n* Caramuru, o Mediador: Quando os portugueses chegaram, foram recebidos por Diogo Álvares Correia, o Caramuru — um náufrago português que vivia com os indígenas locais (os Tupinambás) há décadas. Casado com a indígena Paraguaçu, Caramuru foi peça-chave para garantir que a fundação da cidade ocorresse em relativa paz no início, mediando o contato entre Tomé de Sousa e os nativos.\n\nA Divisão Geográfica (Cidade Alta vs. Cidade Baixa)\nO relevo de Salvador moldou a sua estrutura urbana, criando uma divisão que persiste até os dias de hoje:\n\n* Cidade Alta: Era o centro administrativo, político e religioso. Lá ficavam a Casa da Câmara e Cadeia, o Palácio do Governador, o colégio dos jesuítas e as moradias das autoridades.\n\n* Cidade Baixa: Era a zona portuária, voltada para o comércio, armazenamento de mercadorias e o cais, por onde entravam e saíam as riquezas da colônia.\n\nPrimeira Capital: Salvador manteve o título de capital do Brasil por 214 anos. Em 1763, devido ao boom da extração de ouro e diamantes no Sudeste, a Coroa Portuguesa transferiu a capital para o Rio de Janeiro.\n\nDiferente de outras vilas que cresceram espontaneamente, Salvador foi uma cidade planejada por ordem do rei de Portugal, Dom João III, para centralizar a administração da colônia, que estava sofrendo com o fracasso das Capitanias Hereditárias e os ataques de piratas franceses.`,
    route: '/Estados/Bahia', local: 'Bahia',
    photos: [
      require('../../assets/images/fundacao/1.png'),
      require('../../assets/images/fundacao/2.png'),
      require('../../assets/images/fundacao/3.png'),
      require('../../assets/images/fundacao/4.png'),
      require('../../assets/images/fundacao/5.png'),
      
    ],
  },
  {
    year: '1808', title: 'Chegada da Família Real',
    highlights: ['Por que a Família Real fugiu para o Brasil?', 'A Escala na Bahia e a Abertura dos Portos', 'A Chegada ao Rio de Janeiro e as Transformações'],
    description: `A transferência da corte portuguesa para o Brasil, em 1808, foi um acontecimento sem precedentes na história: foi a única vez em que um monarca europeu cruzou o oceano para governar seu império a partir de uma colônia.\n\nEsse evento mudou os rumos do Brasil para sempre, acelerando o processo que levaria à nossa independência.\n\nPor que a Família Real fugiu para o Brasil?\nA vinda da corte foi uma fuga estratégica. No final de 1807, o imperador francês Napoleão Bonaparte dominava a Europa e havia decretado o Bloqueio Continental, proibindo todos os países de comercializarem com a Inglaterra.\n\nPortugal se viu em um beco sem saída:\n\n* Se obedecesse a Napoleão, seria invadido pela Inglaterra (sua maior parceira comercial e protetora militar).\n\n* Se mantivesse o comércio com a Inglaterra, seria invadido pela França.\n\nDiante da invasão iminente das tropas francesas, o príncipe regente Dom João tomou uma decisão drástica: escoltada pela marinha britânica, toda a corte portuguesa (entre 10 mil e 15 mil pessoas, incluindo nobres, funcionários públicos, juízes e tesouros do reino) embarcou em navios rumo ao Brasil em novembro de 1807.\n\nA Escala na Bahia e a Abertura dos Portos\nA frota enfrentou tempestades violentas no Atlântico, e a primeira parada em solo brasileiro ocorreu em Salvador, em 22 de janeiro de 1808.\n\nFoi ali que Dom João assinou o decreto mais importante do período: a Abertura dos Portos às Nações Amigas (28 de janeiro de 1808). Na prática, isso acabou com o "pacto colonial", permitindo que o Brasil comercializasse diretamente com outros países — principalmente com a Inglaterra. Esse foi o primeiro passo real para a emancipação econômica do país.\n\nA Chegada ao Rio de Janeiro e as Transformações\nEm março de 1808, a corte finalmente se estabeleceu no Rio de Janeiro, que passou a funcionar como a sede do Império Português. Como a cidade era essencialmente colonial e pacata, ela precisou ser virada do avesso para abrigar a nobreza:\n\n* O "P.R.": Centenas de casas foram confiscadas dos moradores locais para abrigar os nobres. As portas dessas casas eram marcadas com as letras P.R. (Príncipe Regente), o que fez o povo ironizar o termo chamando-o de "Prédio Roubado" ou "Ponha-se na Rua".\n\n* Modernização Cultural e Científica: Para que o Estado funcionasse, Dom João fundou instituições essenciais: a Imprensa Régia, o Banco do Brasil, a Academia Real Militar, a Biblioteca Real (atual Biblioteca Nacional), o Jardim Botânico e as primeiras faculdades de Medicina (na Bahia e no Rio).\n\nEm 1815, o Brasil deixou oficialmente de ser uma colônia e foi elevado à categoria de Reino Unido a Portugal e Algarves, ganhando igualdade política com a metrópole.`,
    route: '/Estados/RioDeJaneiro', local: 'Rio de Janeiro',
    photos: [
      require('../../assets/images/chegada/1.png'),
      require('../../assets/images/chegada/2.png'),
      require('../../assets/images/chegada/3.png'),
      require('../../assets/images/chegada/4.png'),
      require('../../assets/images/chegada/5.png'),
    ],
  },
  {
    year: '1822', title: 'Independência do Brasil',
    highlights: ['O Caminho Até o Grito do Ipiranga', 'O 7 de Setembro e o Pós-Independência'],
    description: `A Independência do Brasil, proclamada em 7 de setembro de 1822, foi o resultado de um processo de desgaste político entre a elite brasileira, o príncipe regente Dom Pedro e as Cortes de Lisboa (o parlamento português).\n\nAo contrário das colônias espanholas na América, a independência do Brasil não fragmentou o território em várias repúblicas; o país manteve-se unificado sob um sistema monárquico (um Império).\n\nO Caminho Até o Grito do Ipiranga\nO estopim para a separação foi a Revolução Liberal do Porto (1820) em Portugal. Os políticos portugueses exigiam o retorno de Dom João VI para Lisboa e, pior do que isso, queriam que o Brasil voltasse ao status de colônia subordinada, revogando a autonomia conquistada desde 1808.\n\nDom João VI retornou a Portugal em 1821, mas deixou seu filho, o jovem Dom Pedro, como príncipe regente do Brasil. A partir daí, a pressão de Lisboa aumentou:\n\n* O Dia do Fico (9 de janeiro de 1822): As Cortes portuguesas ordenaram o retorno imediato de Dom Pedro. Apoiado por uma petição com milhares de assinaturas da elite brasileira, o príncipe desobedeceu as ordens e declarou: "Se é para o bem de todos e felicidade geral da Nação, estou pronto! Digam ao povo que fico".\n\n* O Papel de Leopoldina e José Bonifácio: Enquanto Dom Pedro viajava a São Paulo para acalmar tensões políticas, novas ordens agressivas chegaram de Portugal, anulando todos os atos do príncipe. No dia 2 de setembro de 1822, a princesa Maria Leopoldina, atuando como regente interina no Rio de Janeiro, convocou o Conselho de Estado e, junto ao ministro José Bonifácio (o "Patriarca da Independência"), assinou a declaração formal de que o Brasil deveria se separar de Portugal.\n\nO 7 de Setembro e o Pós-Independência\nAs cartas de Leopoldina e José Bonifácio alcançaram Dom Pedro nas margens do Riacho do Ipiranga, em São Paulo, no dia 7 de setembro. Ao ler as exigências de Portugal e os conselhos de sua esposa e ministros, o príncipe rompeu oficialmente os laços com a metrópole com o famoso brado "Independência ou Morte!".\n\n* Aclamação: Em 12 de outubro de 1822, ele foi aclamado Dom Pedro I, Imperador Constitucional do Brasil. Sua coroação ocorreu em dezembro do mesmo ano.\n\n* A Guerra da Independência: Embora o "grito" tenha sido pacífico, a separação não foi imediata em todo o território. Províncias como Bahia, Piauí, Maranhão e Grão-Pará tinham fortes tropas fiéis a Portugal. Houve sangrentos combates armados nessas regiões, e a expulsão definitiva dos portugueses só se consolidou em 1823 (com destaque para o 2 de Julho na Bahia).\n\n* O Reconhecimento: O primeiro país a reconhecer a nossa independência foram os Estados Unidos (1824). Portugal só aceitou o fato em 1825, após o Brasil concordar em pagar uma pesada indenização de 2 milhões de libras esterlinas à antiga metrópole.`,
    route: '/Estados/MinasGerais', local: 'Minas Gerais',
    photos: [
      require('../../assets/images/independencia/1.png'),
      require('../../assets/images/independencia/2.png'),
      require('../../assets/images/independencia/3.png'),
      require('../../assets/images/independencia/4.png'),
      require('../../assets/images/independencia/5.png'),
    ],
  },
  {
    year: '1889', title: 'Proclamação da República',
    highlights: ['Por que o Império ruiu? (As Causas)', 'O Dia 15 de Novembro', 'O "Povo Bestializado" e o Destino da Família Real'],
    description: `A Proclamação da República, em 15 de novembro de 1889, foi o evento que pôs fim ao Império do Brasil (governado por Dom Pedro II) e deu início à era republicana presidencialista.\n\nDiferente da Independência, a República não nasceu de uma revolta popular, mas sim de um golpe político-militar articulado por elites descontentes e pelo Exército brasileiro.\n\nPor que o Império ruiu? (As Causas)\nNas últimas décadas do século XIX, a monarquia brasileira perdeu suas três principais bases de sustentação, em um processo que os historiadores chamam de Crise do Império:\n\n* A Questão Abolicionista: Com a assinatura da Lei Áurea em 1888, que libertou os escravizados sem pagar indenização aos donos de terras, os grandes fazendeiros de café (conhecidos como "barões do café") abandonaram o apoio a Dom Pedro II. Eles se aliaram à causa republicana e ficaram conhecidos como republicanos de última hora.\n\n* A Questão Militar: Após a Guerra do Paraguai (1864–1870), o Exército brasileiro voltou fortalecido, com grande prestígio e influenciado pelo Positivismo (corrente filosófica que defendia o progresso científico e a ordem social). Os militares exigiam mais participação política e melhorias na carreira, o que era negado pelo governo imperial.\n\n* A Questão Religiosa: A Igreja Católica se afastou do imperador após Dom Pedro II prender dois bispos que haviam desafiado ordens imperiais para seguir diretrizes vindas diretamente do Papa.\n\nO Dia 15 de Novembro\nO movimento decisivo aconteceu no Rio de Janeiro (então capital do país) e foi liderado pelo marechal Deodoro da Fonseca, uma figura de imenso prestígio no Exército.\n\nCuriosamente, Deodoro era amigo do imperador e inicialmente não pretendia derrubar a monarquia; o plano original era apenas derrubar o gabinete de ministros (o Visconde de Ouro Preto). No entanto, boatos falsos espalhados por republicanos — afirmando que o governo imperial havia decretado a prisão de Deodoro e nomeado um de seus grandes inimigos políticos para o ministério — mudaram o rumo das coisas.\n\nSentindo-se provocado, Deodoro marchou com as tropas até o Ministério da Guerra na Praça da Aclamação (atual Praça da República). Ali, o governo imperial se rendeu. A República foi consolidada politicamente poucas horas depois, liderada pelo jornalista e propagandista republicano Aristides Lobo e pelo político Benjamin Constant.\n\nO "Povo Bestializado" e o Destino da Família Real\nA transição foi cirúrgica e praticamente sem sangue. A participação popular foi nula, o que rendeu uma das frases mais famosas da história brasileira, dita por Aristides Lobo:\n\n"O povo assistiu àquilo bestializado, atônito, surpreso, sem conhecer o que significava. Muitos acreditavam sinceramente estar vendo uma parada militar."\n\nDom Pedro II e a família imperial receberam um prazo de 48 horas para deixar o país na calada da noite, partindo rumo ao exílio na Europa em 17 de novembro, evitando manifestações de simpatia pública que o imperador ainda guardava. Deodoro da Fonseca assumiu como o primeiro presidente do Brasil, chefiando um governo provisório.`,
    route: '/Estados/DistritoFederal', local: 'Distrito Federal',
    photos: [
      require('../../assets/images/proclamacao/1.png'),
      require('../../assets/images/proclamacao/2.png'),
      require('../../assets/images/proclamacao/3.png'),
      require('../../assets/images/proclamacao/4.png'),
      require('../../assets/images/proclamacao/5.png'),
    ],
  },
  {
    year: 'Hoje', title: 'Brasil Atual',
    highlights: ['1. A Consolidação da Democracia', '2. Estabilização Econômica: O Fim da Hiperinflação', '3. Inclusão Social e a Nova Matriz Econômica', '4. Os Desafios Contemporâneos (Século XXI)'],
    description: `Pensando no Brasil Atual dentro do contexto da História Geral, nós estamos vivendo o período conhecido como Nova República (ou Sexta República), que começou em 1985 com o fim da Ditadura Militar e se estende até o presente.\n\nPanorama de como o Brasil se consolidou historicamente nas últimas décadas:\n\n1. A Consolidação da Democracia\nApós 21 anos de regime militar, o Brasil passou por uma transição complexa para a democracia, marcada por três grandes pilares:\n\n* A Constituição de 1988: Conhecida como a "Constituição Cidadã", é o documento jurídico mais democrático da nossa história. Ela garantiu direitos civis fundamentais, o voto universal (incluindo analfabetos e jovens de 16 e 17 anos), a liberdade de expressão e a demarcação de terras indígenas.\n\n* Eleições Diretas: O retorno do voto direto para presidente em 1989 consolidou a alternância de poder, sobrevivendo a crises profundas, como os impeachments de Fernando Collor (1992) e Dilma Rousseff (2016).\n\n2. Estabilização Econômica: O Fim da Hiperinflação\nAté o início dos anos 1990, a grande assombração do brasileiro era a inflação, que chegava a passar de 80% ao mês. Os preços subiam nos supermercados várias vezes ao dia.\n\n* O Plano Real (1994): Capitaneado pela equipe econômica do governo de Itamar Franco (e liderado por Fernando Henrique Cardoso), o plano introduziu a nossa moeda atual, o Real, controlou a inflação e permitiu que o país planejasse seu crescimento a longo prazo, abrindo a economia para o mercado global.\n\n3. Inclusão Social e a Nova Matriz Econômica\nNos anos 2000 (especialmente nos governos de Luiz Inácio Lula da Silva), o Brasil viveu um período de forte crescimento impulsionado pelo boom das commodities (exportação de soja, minério de ferro e petróleo).\n\n* Políticas de Combate à Pobreza: Programas de transferência de renda (como o Bolsa Família) e o aumento real do salário mínimo tiraram milhões de pessoas da extrema pobreza e criaram uma nova classe consumidora.\n\n* O Brasil no Palco Global: O país se consolidou como uma das 10 maiores economias do mundo, liderou a criação do bloco dos BRICS (Brasil, Rússia, Índia, China e África do Sul) e sediou eventos globais de enorme prestígio, como a Copa do Mundo de 2014 e as Olimpíadas de 2016.\n\n4. Os Desafios Contemporâneos (Século XXI)\nApesar dos avanços na linha do tempo da história recente, o Brasil de hoje ainda luta contra problemas estruturais históricos:\n\n* Desigualdade e Violência: A distribuição de renda avançou, mas o Brasil continua sendo um dos países mais desiguais do planeta, com profundos abismos sociais e altos índices de violência urbana.\n\n* Polarização Política: A partir das manifestações de 2013 e da Operação Lava Jato, o país entrou em um ciclo de forte polarização ideológica entre a esquerda e a direita, moldando o debate público contemporâneo.\n\n* O Desafio Ambiental: Como detentor da maior parte da Floresta Amazônica, o Brasil ocupa o centro das atenções mundiais na luta contra as mudanças climáticas, equilibrando a potência do seu agronegócio com a necessidade urgente de preservação ambiental.\n\nO Brasil atual é, historicamente, uma democracia jovem que conseguiu estabilizar sua moeda e suas instituições, mas que ainda busca conciliar seu imenso potencial econômico com a justiça social para toda a sua população.`,
    route: '/Estados/Goias', local: 'Brasil',
    photos: [
      require('../../assets/images/atual/1.png'),
      require('../../assets/images/atual/2.png'),
      require('../../assets/images/atual/3.png'),
      require('../../assets/images/atual/4.png'),
      require('../../assets/images/atual/5.png'),
    ],
  },
];

function PhotoCarousel({ photos }: { photos: any[] }) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const photoRef = useRef<ScrollView>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentIndex = useRef(0);

  const startAuto = () => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      const next = (currentIndex.current + 1) % photos.length;
      currentIndex.current = next;
      photoRef.current?.scrollTo({ x: next * W, animated: true });
      setPhotoIndex(next);
    }, 2500);
  };

  useEffect(() => {
    startAuto();
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, []);

  const goTo = (index: number) => {
    currentIndex.current = index;
    setPhotoIndex(index);
    photoRef.current?.scrollTo({ x: index * W, animated: true });
    startAuto();
  };

  return (
    <View style={photo.wrapper}>
      <ScrollView
        ref={photoRef}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
      >
        {photos.map((src, i) => (
          <Image key={i} source={src} style={photo.img} />
        ))}
      </ScrollView>

      {/* Seta esquerda */}
      <TouchableOpacity
        style={[photo.arrow, photo.arrowLeft]}
        onPress={() => goTo((photoIndex - 1 + photos.length) % photos.length)}
      >
        <Text style={photo.arrowText}>‹</Text>
      </TouchableOpacity>

      {/* Seta direita */}
      <TouchableOpacity
        style={[photo.arrow, photo.arrowRight]}
        onPress={() => goTo((photoIndex + 1) % photos.length)}
      >
        <Text style={photo.arrowText}>›</Text>
      </TouchableOpacity>

      <View style={photo.dotsRow}>
        {photos.map((_, i) => (
          <View key={i} style={[photo.dot, photoIndex === i && photo.dotActive]} />
        ))}
      </View>
    </View>
  );
}

export default function TimelineCard() {
  const router = useRouter();
  const { theme } = useSettings();
  const c = themes[theme];
  const [selected, setSelected] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const slideRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (fullscreen) {
      setTimeout(() => {
        slideRef.current?.scrollTo({ x: selected * W, animated: false });
      }, 50);
    }
  }, [fullscreen]);

  const scrollToSlide = (index: number) => {
    slideRef.current?.scrollTo({ x: index * W, animated: true });
  };

  const onSlideEnd = (e: any) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / W);
    setSelected(index);
  };

  return (
    <>
      {/* CARD RESUMO */}
      <View style={styles.card}>
        <View style={styles.timelineRow}>
          <View style={[styles.line, { backgroundColor: c.accent }]} />
          {timeline.map((item, index) => (
            <TouchableOpacity key={index} style={styles.pointContainer} onPress={() => setSelected(index)}>
              <View style={[styles.dot, { backgroundColor: selected === index ? c.accent : c.bg, borderColor: c.accent }, selected === index && styles.activeDot]} />
              <Text style={[styles.year, { color: selected === index ? c.accent : c.subtext }, selected === index && styles.activeYear]}>{item.year}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.content}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.eventTitle, { color: c.text }]}>{timeline[selected].title}</Text>
            <Text style={[styles.description, { color: c.subtext }]} numberOfLines={3}>{timeline[selected].description}</Text>
            <TouchableOpacity style={[styles.button, { backgroundColor: c.accent }]} onPress={() => setFullscreen(true)}>
              <Text style={[styles.buttonText, { color: theme === 'light' ? '#fff' : '#07172F' }]}>Saiba mais →</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => setFullscreen(true)}>
            <Image source={timeline[selected].photos[0]} style={styles.thumb} />
          </TouchableOpacity>
        </View>
      </View>

      {/* MODAL TELA CHEIA */}
      <Modal visible={fullscreen} animationType="slide" statusBarTranslucent onRequestClose={() => setFullscreen(false)}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        <SafeAreaView style={[styles.modal, { backgroundColor: c.bg }]}>

          <TouchableOpacity style={styles.closeBtn} onPress={() => setFullscreen(false)}>
            <Text style={styles.closeBtnText}>✕</Text>
          </TouchableOpacity>

          {/* Slides por fase */}
          <ScrollView
            ref={slideRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={onSlideEnd}
          >
            {timeline.map((item, i) => (
              <View key={i} style={[styles.slide, { backgroundColor: c.bg }]}>
                <PhotoCarousel photos={item.photos} />
                <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.slideContent} showsVerticalScrollIndicator={false}>
                  <Text style={[styles.modalYear, { color: c.accent }]}>{item.year}</Text>
                  <Text style={[styles.modalTitle, { color: c.text }]}>{item.title}</Text>
                  <Text style={[styles.modalLocal, { color: c.subtext }]}>📍 {item.local}</Text>
                  {(() => {
                    const hl = item.highlights ?? [];
                    if (!hl.length) return <Text style={[styles.modalDesc, { color: '#fff' }]}>{item.description}</Text>;
                    const regex = new RegExp(`(${hl.map((h: string) => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`);
                    const parts = item.description.split(regex);
                    return parts.map((part: string, idx: number) =>
                      hl.includes(part)
                        ? <Text key={idx} style={[styles.modalDesc, { color: '#FFD700', fontWeight: 'bold', fontSize: 18, marginTop: 10, marginBottom: 4 }]}>{part}</Text>
                        : <Text key={idx} style={[styles.modalDesc, { color: '#fff' }]}>{part}</Text>
                    );
                  })()}

                </ScrollView>
              </View>
            ))}
          </ScrollView>

          <View style={styles.dotsRow}>
            {timeline.map((item, i) => (
              <TouchableOpacity key={i} onPress={() => { scrollToSlide(i); setSelected(i); }}>
                <View style={styles.dotWrapper}>
                  <View style={[styles.navDot, { backgroundColor: selected === i ? c.accent : c.card }, selected === i && styles.navDotActive]} />
                  {selected === i && <Text style={[styles.dotYear, { color: c.accent }]}>{item.year}</Text>}
                </View>
              </TouchableOpacity>
            ))}
          </View>

        </SafeAreaView>
      </Modal>
    </>
  );
}

const photo = StyleSheet.create({
  wrapper: { width: W, height: W * 0.6, backgroundColor: '#000' },
  img: { width: W, height: W * 0.6, resizeMode: 'cover' },
  arrow: {
    position: 'absolute', top: '50%', marginTop: -24,
    width: 40, height: 48, justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(5, 1, 1, 0)', borderRadius: 8, zIndex: 10,
  },
  arrowLeft: { left: 10 },
  arrowRight: { right: 10 },
  arrowText: { color: '#FFF', fontSize: 34, fontWeight: '300', lineHeight: 40 },
  dotsRow: { position: 'absolute', bottom: 10, left: 0, right: 0, flexDirection: 'row', justifyContent: 'center', gap: 6 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.4)' },
  dotActive: { backgroundColor: '#FFF', width: 16, borderRadius: 3 },
});

const styles = StyleSheet.create({
  card: { marginHorizontal: -20, marginBottom: 30 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 20, paddingHorizontal: 20 },
  timelineRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, position: 'relative', paddingHorizontal: 20 },
  line: { position: 'absolute', top: 8, left: 15, right: 15, height: 3 },
  pointContainer: { alignItems: 'center', zIndex: 2 },
  dot: { width: 18, height: 18, borderRadius: 9, borderWidth: 3 },
  activeDot: { transform: [{ scale: 1.3 }] },
  year: { marginTop: 8, fontSize: 11 },
  activeYear: { fontWeight: '700' },
  content: { flexDirection: 'row', marginTop: 10, paddingHorizontal: 20 },
  eventTitle: { fontSize: 20, fontWeight: '700', marginBottom: 10 },
  description: { fontSize: 13, lineHeight: 20, marginBottom: 16, paddingRight: 10 },
  thumb: { width: 110, height: 120, borderRadius: 16, marginLeft: 12 },
  button: { alignSelf: 'flex-start', paddingHorizontal: 18, paddingVertical: 10, borderRadius: 30 },
  buttonText: { fontWeight: '700', fontSize: 13 },

  modal: { flex: 1 },
  closeBtn: {
    position: 'absolute', top: 50, right: 20, zIndex: 20,
    backgroundColor: 'rgba(0,0,0,0.6)', width: 40, height: 40,
    borderRadius: 20, justifyContent: 'center', alignItems: 'center',
  },
  closeBtnText: { color: 'white', fontSize: 18, fontWeight: 'bold' },

  slide: { width: W, flex: 1 },
  slideContent: { padding: 24, paddingBottom: 100 },
  modalYear: { fontSize: 13, fontWeight: '700', marginBottom: 6, letterSpacing: 1 },
  modalTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 6 },
  modalLocal: { fontSize: 13, marginBottom: 14 },
  modalDesc: { fontSize: 14, lineHeight: 22, marginBottom: 24 },
  modalBtn: { borderRadius: 30, paddingVertical: 14, alignItems: 'center' },
  modalBtnText: { fontWeight: 'bold', fontSize: 15 },

  dotsRow: { position: 'absolute', bottom: 16, left: 0, right: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 },
  dotWrapper: { alignItems: 'center' },
  navDot: { width: 8, height: 8, borderRadius: 4 },
  navDotActive: { width: 20, borderRadius: 4 },
  dotYear: { fontSize: 9, marginTop: 3, fontWeight: '700' },
});
