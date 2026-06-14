
import { useRouter } from 'expo-router';
import { useCallback, useState, useRef } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View, FlatList, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const headerImage = require('../../../assets/images/ac/banner.png');
const seringueiraImage = require('../../../assets/images/ac/seringueira.png');
const mercadoVelhoImage = require('../../../assets/images/ac/mercado.png');
const festivalDePraiaImage = require('../../../assets/images/ac/festival.png');
const culinariaAcreanaImage = require('../../../assets/images/ac/serra.png');

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
    name: 'Festival de Praia',
    category: 'Evento',
    location: 'Rio Branco',
    description: 'No Acre, quando o nível dos rios baixa durante o "verão amazônico" (julho a setembro), bancos de areia surgem, dando lugar a festivais com shows, esportes e gastronomia regional.',
    modalDescription: `
### A Festa de Praia do Acre
#### Origem e Desenvolvimento (Século XX)
A Festa de Praia surgiu a partir do costume das comunidades acreanas de aproveitar as praias naturais que aparecem durante o período de estiagem dos rios amazônicos. Com a diminuição do nível das águas entre os meses de julho e setembro, extensas faixas de areia tornam-se espaços de lazer, convivência e celebração para a população local.
#### Transformação em Evento Cultural
Ao longo dos anos, esses encontros informais evoluíram para grandes festivais organizados por prefeituras e comunidades. As festas passaram a incluir shows musicais, apresentações culturais, competições esportivas, concursos de beleza, feiras de artesanato e barracas com comidas típicas, atraindo visitantes de diversas regiões.
#### Valorização da Cultura Acreana
Mais do que um evento recreativo, a Festa de Praia tornou-se uma importante manifestação cultural do Acre. Ela fortalece o turismo, movimenta a economia local e valoriza as tradições das populações ribeirinhas, destacando a importância dos rios para a história, a cultura e a identidade do povo acreano.
`,
    image: festivalDePraiaImage,
    rating: 4,
  },
  {
    name: 'Seringueiras',
    category: 'Monumento',
    location: 'Xapuri',
    description: 'As seringueiras (Hevea brasiliensis) são as grandes protagonistas da história econômica, social e geográfica do Acre. Foi a busca pelo látex que desenhou as fronteiras do estado e atraiu as primeiras grandes levas de migrantes.',
    modalDescription: `
### As Seringueiras
#### O Ciclo da Borracha (Século XIX e início do Século XX)
As seringueiras (Hevea brasiliensis) desempenharam um papel fundamental na história do Acre. A partir da segunda metade do século XIX, a crescente demanda mundial por borracha impulsionou a extração do látex, atraindo milhares de trabalhadores para a região amazônica. A atividade seringalista promoveu o povoamento do território, movimentou a economia local e contribuiu diretamente para a consolidação da presença brasileira no Acre.
#### Importância Histórica e Econômica
Além de impulsionar o desenvolvimento regional, as seringueiras tornaram-se um símbolo da identidade acreana. A riqueza gerada pela borracha influenciou a formação de cidades, o crescimento do comércio e os acontecimentos que culminaram na incorporação do Acre ao território brasileiro.
`,
    image: seringueiraImage,
    rating: 5,
  },
  {
    name: 'Mercado Velho',
    category: 'Monumento',
    location: 'Rio Branco',
    description: 'Oficialmente chamado de Mercado Municipal Elpídio Ribeiro, é um dos principais pontos turísticos, culturais e gastronômicos da capital do Acre, Rio Branco. Localizado às margens do Rio Acre, ele carrega grande parte da identidade e da história do estado.',
    modalDescription: `
### Mercado Velho de Rio Branco
#### Centro Comercial e Ponto de Encontro
Localizado às margens do Rio Acre, o Mercado Velho foi um dos principais centros comerciais de Rio Branco durante o período de expansão econômica da borracha. O espaço reunia comerciantes, seringueiros e viajantes, funcionando como importante local de troca de mercadorias e circulação de produtos regionais.
#### Patrimônio Histórico do Acre
Ao longo dos anos, o Mercado Velho consolidou-se como um dos mais importantes patrimônios históricos e culturais da capital acreana. Atualmente, o local preserva a memória do desenvolvimento econômico e social do estado, sendo um símbolo das tradições, da arquitetura e da história de Rio Branco.
`,
    image: mercadoVelhoImage,
    rating: 4,
  },
  {
    name: 'Pirarucu com Tucupi',
    category: 'Comida Típica',
    location: 'Acre',
    description: 'É uma verdadeira joia da culinária amazônica, combinando dois dos ingredientes mais emblemáticos da região em um prato que é puro sabor, história e identidade.',
    modalDescription: 'O Pirarucu com Tucupi é uma especialidade da culinária acreana que você não pode deixar de provar!',
    image: culinariaAcreanaImage,
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


export default function Acre() {
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
              <Text style={styles.historyTitle}>A Terra Conquistada na Raça e na Diplomacia</Text>

              <Text style={styles.historySubtitle}>O Boom da Borracha e a Invasão Nordestina (Séc. XIX)</Text>
              <Text style={styles.historyText}>
                Até meados do século XIX, a região era habitada quase que exclusivamente por diversas etnias indígenas. Internacionalmente, o território era reconhecido como boliviano pelo Tratado de Ayacucho (1867). Tudo mudou com a demanda por látex da Revolução Industrial, atraindo milhares de nordestinos que fugiam da Grande Seca de 1877.
              </Text>

              <Text style={styles.historySubtitle}>A Revolução Acreana (1899–1903)</Text>
              <Text style={styles.historyText}>
                Quando a Bolívia tentou retomar o controle, os seringueiros brasileiros se revoltaram. O militar gaúcho Plácido de Castro liderou um exército de seringueiros que venceram as tropas bolivianas em 1903, consolidando o controle brasileiro sobre a região.
              </Text>

              <Text style={styles.historySubtitle}>O Tratado de Petrópolis (1903)</Text>
              <Text style={styles.historyText}>
                O Barão do Rio Branco negociou o Tratado de Petrópolis. O Brasil anexou o Acre em troca do pagamento de 2 milhões de libras esterlinas e da construção da Estrada de Ferro Madeira-Mamoré.
              </Text>

              <Text style={styles.historySubtitle}>De Território a Estado (1904–1962)</Text>
              <Text style={styles.historyText}>
                O Acre foi transformado em Território Federal sem autonomia política. A longa luta pela autonomia só terminou em 15 de junho de 1962, quando o Acre foi elevado à categoria de Estado, com Rio Branco como sua capital.
              </Text>
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
  activeTab: { backgroundColor: '#00796b' },
  tabText: { color: '#00796b', fontWeight: 'bold', fontSize: 16 },
  activeTabText: { color: '#fff' },
  content: { paddingVertical: 20, alignItems: 'center', width: '100%'},
  historyContainer: { backgroundColor: '#fff', borderRadius: 15, padding: 20, marginHorizontal: 20 },
  historyTitle: { fontSize: 22, fontWeight: 'bold', color: '#00796b', marginBottom: 15, textAlign: 'center' },
  historySubtitle: { fontSize: 18, fontWeight: 'bold', color: '#00796b', marginTop: 10, marginBottom: 5 },
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
    color: '#00796b',
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
    color: '#00796b',
    marginHorizontal: 2,
  },
  descriptionContainer: {
    paddingHorizontal: 20,
    maxHeight: 300
  },
  modalSubtitle: { fontSize: 20, fontWeight: 'bold', color: '#00796b', marginTop: 15, marginBottom: 5 },
  modalSubSubtitle: { fontSize: 18, fontWeight: 'bold', color: '#00796b', marginTop: 10, marginBottom: 5 },
  modalDescription: { fontSize: 16, color: '#333', lineHeight: 24 },
});
