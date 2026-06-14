
import { useRouter } from 'expo-router';
import { useCallback, useState, useRef } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View, FlatList, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const headerImage = require('../../../assets/images/al/maragogi.png');
const maragogiImage = require('../../../assets/images/al/maragogi.png');
const fozDoSaoFranciscoImage = require('../../../assets/images/al/foz-sao-francisco.png');
const artesanatoImage = require('../../../assets/images/al/artesanato.png');
const sururuDeCapoteImage = require('../../../assets/images/al/japara.png');
const bomJesusImage = require('../../../assets/images/al/bom-jesus.png');

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
    name: 'Festa de Bom Jesus dos Navegantes',
    category: 'Evento',
    location: 'Penedo',
    description: 'Uma das maiores festas religiosas do estado, com uma procissão de barcos no Rio São Francisco.',
    modalDescription: `
### Festa de Bom Jesus dos Navegantes (Bom Jesus do Capote)
#### Origem e Tradição Religiosa
A devoção a Bom Jesus dos Navegantes chegou ao litoral alagoano durante o período colonial, trazida pelos portugueses. A celebração surgiu da forte relação das comunidades costeiras e ribeirinhas com a navegação e a pesca, atividades essenciais para a sobrevivência da população local. Ao longo dos séculos, a festa consolidou-se como uma das mais importantes manifestações religiosas de Alagoas, reunindo procissões terrestres e fluviais, missas e celebrações populares.

#### Influência Cultural
Além de expressar a fé da população, a festa fortalece os laços comunitários e preserva tradições que fazem parte da identidade alagoana. O evento também movimenta o turismo religioso e contribui para a valorização do patrimônio cultural do estado.
`,
    image: bomJesusImage,
    rating: 4,
  },
  {
    name: 'Maragogi',
    category: 'Monumento',
    location: 'Maragogi',
    description: 'Conhecida como o Caribe Brasileiro, com piscinas naturais de águas cristalinas.',
    modalDescription: `
### Maragogi
#### Da Vila de Pescadores ao Polo Turístico
Maragogi teve origem como uma pequena comunidade dedicada à pesca e à agricultura. Com o passar do tempo, suas características naturais excepcionais passaram a atrair visitantes, especialmente devido às piscinas naturais formadas pelos recifes de corais. O município tornou-se um dos principais destinos turísticos do Nordeste e um dos cartões-postais de Alagoas.

#### Influência Econômica e Ambiental
O crescimento do turismo transformou a economia local, gerando empregos e impulsionando setores como hotelaria, gastronomia e transporte. Ao mesmo tempo, Maragogi tornou-se referência na preservação dos ecossistemas costeiros, destacando a importância da conservação ambiental para o desenvolvimento sustentável.
`,
    image: maragogiImage,
    rating: 5,
  },
  {
    name: 'Foz do Rio São Francisco',
    category: 'Outro',
    location: 'Piaçabuçu',
    description: 'Um cenário deslumbrante onde o Velho Chico encontra o mar.',
    modalDescription: `
### Foz do Rio São Francisco
#### Um Marco Natural e Histórico
A Foz do Rio São Francisco representa o encontro entre o "Velho Chico" e o Oceano Atlântico, na divisa entre Alagoas e Sergipe. Desde os primeiros séculos da colonização, o rio desempenhou papel fundamental no transporte de pessoas, mercadorias e informações pelo interior do Brasil, sendo considerado um dos principais eixos de integração nacional.

#### Influência para a Região
As comunidades estabelecidas ao longo do rio desenvolveram modos de vida fortemente ligados à pesca, à agricultura e à navegação. Atualmente, a Foz do São Francisco é um importante destino turístico e símbolo da riqueza natural brasileira, além de representar a importância histórica do rio para o desenvolvimento econômico e cultural do país.
`,
    image: fozDoSaoFranciscoImage,
    rating: 5,
  },
  {
    name: 'Artesanato em Filé',
    category: 'Outro',
    location: 'Pontal da Barra, Maceió',
    description: 'Uma técnica de bordado única, que produz peças coloridas e delicadas.',
    modalDescription: `
### Artesanato em Filé
#### Origem nas Comunidades Pesqueiras
O artesanato em filé surgiu nas comunidades litorâneas de Alagoas, inspirado nas redes utilizadas pelos pescadores. As artesãs passaram a utilizar uma malha semelhante à das redes para criar bordados decorativos com padrões geométricos coloridos, transformando uma técnica simples em uma expressão artística reconhecida nacionalmente.

#### Influência Cultural e Econômica
Transmitido de geração em geração, o filé tornou-se um dos maiores símbolos da cultura alagoana. Além de preservar saberes tradicionais, a atividade gera renda para inúmeras famílias e fortalece o artesanato local. Suas peças são comercializadas em todo o Brasil, contribuindo para a divulgação da identidade cultural de Alagoas e para a valorização do trabalho artesanal.
`,
    image: artesanatoImage,
    rating: 4,
  },
  {
    name: 'Sururu de Capote',
    category: 'Comida Típica',
    location: 'Alagoas',
    description: 'Um molusco cozido no leite de coco, um dos pratos mais tradicionais do estado.',
    modalDescription: 'O Sururu de Capote é uma iguaria da culinária alagoana que você precisa experimentar.',
    image: sururuDeCapoteImage,
    rating: 5,
  },
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


export default function Alagoas() {
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
              <Text style={styles.historyTitle}>Das Alagoas do Sul ao Berço da República</Text>
              <Text style={styles.historyText}>O território de Alagoas começou sua história ocidental sob a sombra da Capitania de Pernambuco. A região era inicialmente povoada por diversas etnias indígenas, como os Caetés, e era geograficamente caracterizada por suas imensas lagoas e uma densa Mata Atlântica.</Text>
              <Text style={styles.historySubtitle}>O Complexo Canavieiro e o Conflito Étnico</Text>
              <Text style={styles.historyText}>No século XVI, os portugueses perceberam que o solo de massapê do litoral alagoano era perfeito para a cana-de-açúcar. Engenhos multiplicaram-se rapidamente em torno de vilas como Porto Calvo e Alagoas do Sul.</Text>
              <Text style={styles.historyText}>O coração geográfico e a densidade da mata propiciaram a maior experiência de resistência à escravidão nas Américas: o Quilombo dos Palmares. Palmares não era uma única aldeia, mas uma confederação de mocambos que chegou a abrigar mais de 20 mil pessoas, sendo destruído apenas em 1694.</Text>
              <Text style={styles.historySubtitle}>A Emancipação de 1817 e a Mudança de Capital</Text>
              <Text style={styles.historyText}>Alagoas permaneceu subordinada a Pernambuco até 1817. Como recompensa pela lealdade a Dom João VI durante a Revolução Pernambucana, o monarca assinou o alvará de emancipação política em 16 de setembro de 1817.</Text>
              <Text style={styles.historyText}>No século XIX, o eixo econômico mudou para o litoral, culminando na transferência da capital para Maceió em 1839. O estado encerrou o século projetando-se na política nacional com os generais Deodoro da Fonseca e Floriano Peixoto.</Text>
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
  container: { flex: 1, backgroundColor: '#e0f7fa' },
  header: { height: 250 },
  headerImage: { width: '100%', height: '100%' },
  backButton: { position: 'absolute', top: 40, left: 20, zIndex: 10, backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20 },
  backButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  tabs: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, backgroundColor: '#e0f7fa' },
  tabButton: { paddingVertical: 8, paddingHorizontal: 25, borderRadius: 20 },
  activeTab: { backgroundColor: '#0097a7' },
  tabText: { color: '#0097a7', fontWeight: 'bold', fontSize: 16 },
  activeTabText: { color: '#fff' },
  content: { paddingVertical: 20, alignItems: 'center', width: '100%'},
  historyContainer: { backgroundColor: '#fff', borderRadius: 15, padding: 20, marginHorizontal: 20 },
  historyTitle: { fontSize: 22, fontWeight: 'bold', color: '#0097a7', marginBottom: 15, textAlign: 'center' },
  historySubtitle: { fontSize: 18, fontWeight: 'bold', color: '#0097a7', marginTop: 15, marginBottom: 5 },
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
    color: '#0097a7',
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
    color: '#0097a7',
    marginHorizontal: 2,
  },
  descriptionContainer: {
    paddingHorizontal: 20,
    maxHeight: 300
  },
  modalSubtitle: { fontSize: 20, fontWeight: 'bold', color: '#0097a7', marginTop: 15, marginBottom: 5 },
  modalSubSubtitle: { fontSize: 18, fontWeight: 'bold', color: '#0097a7', marginTop: 10, marginBottom: 5 },
  modalDescription: { fontSize: 16, color: '#333', lineHeight: 24 },
});
