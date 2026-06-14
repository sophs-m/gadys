
import { useRouter } from 'expo-router';
import { useState, useRef } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, FlatList, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const headerImage = require('../../../assets/images/ap/marco-zero.png');
const marcoZeroImage = require('../../../assets/images/ap/marco-zero.png');
const fortalezaImage = require('../../../assets/images/ap/fortaleza.png');
const marabaixoImage = require('../../../assets/images/ap/marabaixo.png');

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
        name: 'Marabaixo', 
        category: 'Evento', 
        location: 'Amapá', 
        description: 'Expressão cultural afro-amapaense que mistura dança, música e religiosidade, celebrada principalmente na Páscoa.', 
        modalDescription: `
### Marabaixo
#### Origem e Resistência Cultural
O Marabaixo é uma das mais importantes manifestações culturais do Amapá, com raízes nas tradições afro-brasileiras trazidas pelos descendentes de africanos escravizados que viveram na região. Surgido entre os séculos XVIII e XIX, o Marabaixo combina dança, música, religiosidade e celebração comunitária, sendo tradicionalmente realizado durante festividades ligadas ao Divino Espírito Santo e à Santíssima Trindade.
#### Influência na Identidade Amapaense
Mais do que uma expressão artística, o Marabaixo representa a resistência cultural e a preservação da memória das comunidades negras do Amapá. Seus tambores, cantos e danças ajudam a transmitir conhecimentos e tradições entre gerações, tornando-se um dos principais símbolos da identidade cultural amapaense.
`,
        image: marabaixoImage, 
        rating: 4 
    },
    { 
        name: 'Marco Zero', 
        category: 'Monumento', 
        location: 'Macapá', 
        description: 'Monumento que marca a passagem da linha do Equador, onde é possível estar nos dois hemisférios ao mesmo tempo.', 
        modalDescription: `
### Marco Zero
#### O Encontro com a Linha do Equador
Localizado em Macapá, o Marco Zero é um monumento construído para marcar a passagem da Linha do Equador pelo estado do Amapá. Inaugurado no final do século XX, o local permite que visitantes observem e atravessem simbolicamente a divisão entre os hemisférios Norte e Sul.
#### Importância Turística e Científica
O monumento tornou-se um dos principais cartões-postais do estado e um símbolo da posição geográfica privilegiada do Amapá. Além de atrair turistas, o espaço promove atividades educativas relacionadas à astronomia, geografia e à importância da Linha do Equador para os estudos científicos.
`,
        image: marcoZeroImage, 
        rating: 5 
    },
    { 
        name: 'Fortaleza de São José de Macapá', 
        category: 'Monumento', 
        location: 'Macapá', 
        description: 'Uma das maiores fortalezas do Brasil Colônia, construída para defender a Amazônia de invasões estrangeiras.',
        modalDescription: `
### Fortaleza de São José de Macapá
#### Defesa da Amazônia Portuguesa
Construída entre 1764 e 1782 por ordem da Coroa Portuguesa, a Fortaleza de São José de Macapá foi erguida para proteger a região amazônica contra possíveis invasões estrangeiras e garantir o domínio português sobre o extremo norte do território brasileiro. Sua construção envolveu trabalhadores indígenas, africanos escravizados e colonos portugueses.
#### Patrimônio Histórico Nacional
Considerada uma das maiores fortificações militares coloniais do Brasil, a fortaleza é um importante marco da ocupação portuguesa na Amazônia. Atualmente, é reconhecida como patrimônio histórico e cultural, preservando parte significativa da história da formação territorial do país e da cidade de Macapá. Sua imponência e valor histórico fazem dela um dos símbolos mais importantes do Amapá.
`,
        image: fortalezaImage, 
        rating: 5 
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
    const sections = description.split('---').map(s => s.trim()).filter(Boolean);
    return sections.map((section, index) => {
      const parts = section.split('###').map(p => p.trim()).filter(Boolean);
      const mainTitle = parts.shift() || '';
      
      return (
        <View key={index}>
          <Text style={styles.modalSubtitle}>{mainTitle}</Text>
          {parts.map((part, i) => {
            const subParts = part.split('####').map(sp => sp.trim()).filter(Boolean);
            const subTitle = subParts.shift() || '';
            const content = subParts.join('\n\n');
            return (
              <View key={i}>
                <Text style={styles.modalSubSubtitle}>{subTitle}</Text>
                <Text style={styles.modalDescription}>{content}</Text>
              </View>
            );
          })}
        </View>
      );
    });
  };
  

export default function Amapa() {
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
              <Text style={styles.historyTitle}>O Escudo do Norte e o Contestado Franco-Brasileiro</Text>
              <Text style={styles.historyText}>A história do Amapá está intrinsecamente ligada à geopolítica amazônica e à defesa das fronteiras do Brasil. Situado na margem esquerda do Rio Amazonas, o território era uma zona de fricção internacional permanente.</Text>
              <Text style={styles.historySubtitle}>O Tratado de Utrecht e as Invasões Francesas</Text>
              <Text style={styles.historyText}>Em 1713, o Tratado de Utrecht tentou colocar um fim à disputa, estabelecendo o Rio Oiapoque como o limite entre as possessões francesas e as portuguesas. No entanto, a França insistia que o rio mencionado era o Rio Araguari, reivindicando quase todo o território do atual Amapá.</Text>
              <Text style={styles.historyText}>Essa área ficou conhecida como o Contestado Franco-Brasileiro. Em 1895, o capitão francês Lunier invadiu a vila de Amapá, gerando um conflito armado rechaçado pelo general Veiga Cabral, considerado um herói local.</Text>
              <Text style={styles.historySubtitle}>A Resolução Diplomática e a Era Territorial</Text>
              <Text style={styles.historyText}>Em 1900, a arbitragem internacional foi totalmente favorável ao Brasil, fixando a fronteira no Oiapoque. Em 1943, Getúlio Vargas criou o Território Federal do Amapá, desmembrado do Pará. O capitão Janary Nunes modernizou a infraestrutura e estimulou a exploração do manganês na Serra do Navio pela ICOMI, até o território virar Estado com a Constituição de 1988.</Text>
            </View>
          ) : renderCulturaLocal()}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff5e6' },
    header: { height: 250 },
    headerImage: { width: '100%', height: '100%' },
    backButton: { position: 'absolute', top: 40, left: 20, zIndex: 10, backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20 },
    backButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    tabs: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, backgroundColor: '#fff5e6' },
    tabButton: { paddingVertical: 8, paddingHorizontal: 25, borderRadius: 20 },
    activeTab: { backgroundColor: '#ff9800' },
    tabText: { color: '#ff9800', fontWeight: 'bold', fontSize: 16 },
    activeTabText: { color: '#fff' },
    content: { paddingVertical: 20, alignItems: 'center', width: '100%'},
    historyContainer: { backgroundColor: '#fff', borderRadius: 15, padding: 20, marginHorizontal: 20 },
    historyTitle: { fontSize: 22, fontWeight: 'bold', color: '#ff9800', marginBottom: 15, textAlign: 'center' },
    historySubtitle: { fontSize: 18, fontWeight: 'bold', color: '#ff9800', marginTop: 15, marginBottom: 5 },
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
      color: '#ff9800',
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
      color: '#ff9800',
      marginHorizontal: 2,
    },
    descriptionContainer: {
      paddingHorizontal: 20,
      maxHeight: 300
    },
    modalSubtitle: { fontSize: 20, fontWeight: 'bold', color: '#ff9800', marginTop: 15, marginBottom: 5 },
    modalSubSubtitle: { fontSize: 18, fontWeight: 'bold', color: '#ff9800', marginTop: 10, marginBottom: 5 },
    modalDescription: { fontSize: 16, color: '#333', lineHeight: 24 },
  });
