
import { useRouter } from 'expo-router';
import { useState, useRef } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, FlatList, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const headerImage = require('../../../assets/images/am/teatro.png');
const teatroAmazonasImage = require('../../../assets/images/am/teatro.png');
const encontroDasAguasImage = require('../../../assets/images/am/encontro.png');
const festivalDeParintinsImage = require('../../../assets/images/am/festival.png');

interface Place {
  name: string;
  category: 'Monumento' | 'Evento' | 'Comida Típica' | 'Outro';
  location: string;
  description: string;
  modalDescription?: string;
  image: any;
  rating: number;
}

const places: Place[] = [
    {
        name: 'Festival Folclórico de Parintins',
        category: 'Evento',
        location: 'Parintins',
        description: 'A maior ópera a céu aberto da América Latina, com a disputa entre os bois Garantido e Caprichoso.',
        modalDescription: `
### Festival Folclórico de Parintins
#### Origem e Tradição Popular
O Festival Folclórico de Parintins surgiu no município de Parintins, no Amazonas, a partir das tradicionais brincadeiras do Boi-Bumbá, uma manifestação cultural inspirada em lendas, costumes indígenas e influências africanas e europeias. Oficializado na década de 1960, o festival cresceu até se tornar um dos maiores espetáculos folclóricos do Brasil.
#### A Disputa entre Garantido e Caprichoso
O evento é marcado pela competição entre os bois-bumbás Garantido e Caprichoso, que apresentam grandiosas encenações com alegorias, músicas, danças e narrativas inspiradas na cultura amazônica. Realizado anualmente no Bumbódromo, o festival atrai milhares de turistas e promove a valorização das tradições, da arte e da identidade amazônica.
#### Influência Cultural e Econômica
Além de fortalecer o orgulho regional, o festival movimenta a economia local, gera empregos e projeta a cultura amazonense para o Brasil e o mundo, tornando-se um dos principais símbolos do estado do Amazonas.
`,
        image: festivalDeParintinsImage,
        rating: 5
    },
    {
        name: 'Teatro Amazonas',
        category: 'Monumento',
        location: 'Manaus',
        description: 'Símbolo da riqueza do ciclo da borracha, uma das mais belas casas de ópera do mundo.',
        modalDescription: `
### Teatro Amazonas
#### Símbolo do Ciclo da Borracha
Inaugurado em 1896, o Teatro Amazonas foi construído durante o auge do Ciclo da Borracha, período em que Manaus viveu grande prosperidade econômica graças à exportação do látex. A riqueza gerada pela atividade permitiu a realização de obras grandiosas que transformaram a cidade em um importante centro urbano da Amazônia.
#### Arquitetura e Importância Histórica
Com influências da arquitetura europeia, o teatro destaca-se por sua cúpula colorida, decorada com as cores da bandeira brasileira, e por seus materiais importados de diversos países. O edifício tornou-se um dos maiores patrimônios históricos e culturais do Brasil.
#### Influência Cultural
Atualmente, o Teatro Amazonas é palco de concertos, óperas, festivais e apresentações artísticas, representando a riqueza cultural do estado e preservando a memória de um dos períodos mais marcantes da história amazonense.
`,
        image: teatroAmazonasImage,
        rating: 5
    },
    {
        name: 'Encontro das Águas',
        category: 'Outro',
        location: 'Manaus',
        description: 'Fenômeno natural onde os rios Negro e Solimões correm lado a lado sem se misturar por quilômetros.',
        modalDescription: `
### Encontro das Águas
#### Origem Natural e Importância Histórica
O Encontro das Águas é um dos fenômenos naturais mais famosos da Amazônia, localizado próximo à cidade de Manaus. Nesse ponto, as águas escuras do Rio Negro encontram as águas barrentas do Rio Solimões, correndo lado a lado por cerca de 6 quilômetros sem se misturar imediatamente. Esse fenômeno ocorre devido às diferenças de temperatura, velocidade e densidade entre os dois rios.
#### Presença dos Povos Indígenas
Muito antes da chegada dos europeus, a região já era habitada por diversos povos indígenas, que utilizavam os rios como principais vias de transporte, comunicação e comércio. O encontro dos rios possuía importância estratégica, pois conectava diferentes comunidades da Amazônia e facilitava a circulação de pessoas e mercadorias.
#### Período Colonial e Formação de Manaus
Durante a colonização portuguesa, a área tornou-se um importante ponto de navegação e ocupação territorial. A localização privilegiada próxima ao Encontro das Águas contribuiu para o crescimento de Manaus, que mais tarde se transformaria em um dos principais centros urbanos da Amazônia. Os rios serviam como verdadeiras estradas naturais, fundamentais para a integração da região ao restante do país.
#### Influência Econômica e Cultural
Ao longo dos séculos, o Encontro das Águas esteve diretamente ligado ao desenvolvimento econômico do Amazonas. Durante o Ciclo da Borracha, entre os séculos XIX e XX, milhares de embarcações passaram pela região transportando látex e mercadorias. Além disso, o local inspirou lendas, manifestações culturais e tradições das populações ribeirinhas, tornando-se um símbolo da identidade amazônica.
#### Patrimônio Natural da Amazônia
Atualmente, o Encontro das Águas é reconhecido como um dos maiores patrimônios naturais do Brasil. Além de sua beleza cênica e relevância turística, ele representa a riqueza ambiental da Amazônia e a profunda relação entre os rios, a história e a cultura dos povos que vivem na região.
`,
        image: encontroDasAguasImage,
        rating: 5
    }
];

const CarouselCard = ({ item }: { item: Place }) => (
    <View style={styles.carouselCard}>
      <Image source={item.image} style={styles.carouselCardImage} />
      <View style={styles.carouselCardContent}>
        <Text style={styles.carouselCardTitle}>{item.name}</Text>
        <Text style={styles.carouselCardDescription} numberOfLines={3}>{item.description}</Text>
      </View>
    </View>
  );

  const renderDescription = (description: string) => {
    const sections = description.split('###').filter(s => s.trim());
    return sections.map((section, index) => {
        const parts = section.split('####');
        const mainTitle = parts[0].trim();
        return (
            <View key={index}>
                <Text style={styles.modalSubtitle}>{mainTitle}</Text>
                {parts.slice(1).map((subSection, subIndex) => {
                    const subParts = subSection.split('\n');
                    const subTitle = subParts[0].trim();
                    const content = subParts.slice(1).join('\n').trim();
                    return (
                        <View key={subIndex}>
                            <Text style={styles.modalSubSubtitle}>{subTitle}</Text>
                            <Text style={styles.modalDescription}>{content}</Text>
                        </View>
                    )
                })}
            </View>
        )
    })
  };


export default function Amazonas() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Cultura Local');
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList<Place>>(null);

  const onScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / (screenWidth - 40));
    setActiveIndex(index);
  };

  const renderCulturaLocal = () => (
    <>
      <FlatList
        ref={flatListRef}
        data={places}
        renderItem={({ item }) => (
            <CarouselCard item={item} />
        )}
        keyExtractor={item => item.name}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        style={{ width: screenWidth }}
        snapToInterval={screenWidth-40}
        decelerationRate="fast"
        contentContainerStyle={{paddingHorizontal: 20}}
      />
      <View style={styles.pagination}>
        {places.map((_, i) => (
          <Text key={i} style={i === activeIndex ? styles.paginationActiveText : styles.paginationText}>
            •
          </Text>
        ))}
      </View>
      <ScrollView style={styles.descriptionContainer}>
        {renderDescription(places[activeIndex].modalDescription || places[activeIndex].description)}
      </ScrollView>
    </>
  );

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => router.push('/estados')} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Voltar</Text>
      </TouchableOpacity>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image source={headerImage} style={styles.headerImage} />
        </View>

        <View style={styles.tabs}>
          <TouchableOpacity onPress={() => setActiveTab('Historia')} style={[styles.tabButton, activeTab === 'Historia' && styles.activeTab]}>
            <Text style={[styles.tabText, activeTab === 'Historia' && styles.activeTabText]}>História</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('Cultura Local')} style={[styles.tabButton, activeTab === 'Cultura Local' && styles.activeTab]}>
            <Text style={[styles.tabText, activeTab === 'Cultura Local' && styles.activeTabText]}>Cultura Local</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {activeTab === 'Historia' ? (
            <View style={styles.historyContainer}>
              <Text style={styles.historyTitle}>O Gigante da Floresta, as Missões e a Borracha</Text>
              <Text style={styles.historyText}>Ocupando o coração da maior floresta tropical do planeta, o Amazonas teve uma colonização tardia, baseada na navegação fluvial e no extrativismo.</Text>
              <Text style={styles.historySubtitle}>As Missões Religiosas e as Drogas do Sertão</Text>
              <Text style={styles.historyText}>A penetração portuguesa consolidou-se a partir de expedições militares, como a de Pedro Teixeira em 1637, e pela forte atuação de ordens religiosas. A Fortaleza de São José do Rio Negro, fundada em 1669, daria origem à futura cidade de Manaus. Em 1850, a província do Amazonas se emancipou formalmente do Grão-Pará.</Text>
              <Text style={styles.historySubtitle}>A Belle Époque Amazônica</Text>
              <Text style={styles.historyText}>Entre 1880 e 1910, o Amazonas viveu o Ciclo da Borracha. Manaus enriqueceu de forma espantosa — a elite construiu uma cidade europeizada no meio da selva, com bondes elétricos e o monumental Teatro Amazonas (inaugurado em 1896).</Text>
              <Text style={styles.historyText}>O ciclo ruiu após o britânico Henry Wickham contrabandear sementes de seringueira para Londres. Cultivada em plantation na Ásia, a borracha asiática inundou o mercado, mergulhando o Amazonas em uma longa estagnação só revertida com a Zona Franca de Manaus.</Text>
            </View>
          ) : (
            renderCulturaLocal()
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e0f2f1' },
  header: { height: 250 },
  headerImage: { width: '100%', height: '100%' },
  backButton: { position: 'absolute', top: 40, left: 20, zIndex: 10, backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20 },
  backButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  tabs: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, backgroundColor: '#e0f2f1' },
  tabButton: { paddingVertical: 8, paddingHorizontal: 25, borderRadius: 20 },
  activeTab: { backgroundColor: '#009688' },
  tabText: { color: '#009688', fontWeight: 'bold', fontSize: 16 },
  activeTabText: { color: '#fff' },
  content: { paddingVertical: 20, alignItems: 'center', width: '100%'},
  historyContainer: { backgroundColor: '#fff', borderRadius: 15, padding: 20, marginHorizontal: 20 },
  historyTitle: { fontSize: 22, fontWeight: 'bold', color: '#009688', marginBottom: 15, textAlign: 'center' },
  historySubtitle: { fontSize: 18, fontWeight: 'bold', color: '#009688', marginTop: 15, marginBottom: 5 },
  historyText: { fontSize: 16, color: '#333', lineHeight: 24, marginBottom: 10 },
  carouselCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: screenWidth - 80,
    marginHorizontal: 10
  },
  carouselCardImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  carouselCardContent: {
    padding: 15,
  },
  carouselCardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#009688',
  },
  carouselCardDescription: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  paginationText: {
    fontSize: 30,
    color: '#888',
    marginHorizontal: 2,
  },
  paginationActiveText: {
    fontSize: 30,
    color: '#009688',
    marginHorizontal: 2,
  },
  descriptionContainer: {
    paddingHorizontal: 20,
    maxHeight: 300
  },
  modalSubtitle: { fontSize: 20, fontWeight: 'bold', color: '#009688', marginTop: 15, marginBottom: 5 },
  modalSubSubtitle: { fontSize: 18, fontWeight: 'bold', color: '#009688', marginTop: 10, marginBottom: 5 },
  modalDescription: { fontSize: 16, color: '#333', lineHeight: 24 },
});
