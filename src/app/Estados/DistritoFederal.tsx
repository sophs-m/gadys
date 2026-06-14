
import { useRouter } from 'expo-router';
import { useState, useRef } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, FlatList, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const headerImage = require('../../../assets/images/df/congresso.png');
const congressoNacionalImage = require('../../../assets/images/df/congresso.png');
const catedralImage = require('../../../assets/images/df/catedral.png');
const choroImage = require('../../../assets/images/df/choro.png');
const ponteImage = require('../../../assets/images/df/ponte.png');

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
        name: 'Clube do Choro',
        category: 'Evento',
        location: 'Brasília',
        description: 'Um dos principais redutos do choro no Brasil, com programação musical intensa e de alta qualidade.',
        modalDescription: `
### Clube do Choro de Brasília
#### Origem e Importância para a Música Brasileira
O Clube do Choro de Brasília foi fundado em 1977 por um grupo de músicos e amantes do choro, gênero musical que tem suas raízes no Rio de Janeiro do século XIX. Desde sua criação, o clube se tornou uma das mais importantes instituições dedicadas à preservação e divulgação da música instrumental brasileira.
Em um primeiro momento, as apresentações eram realizadas em locais improvisados. Com o tempo, o clube ganhou reconhecimento e uma sede própria, onde passou a oferecer shows, aulas, oficinas e festivais que atraem músicos e públicos de todo o Brasil e do exterior.
#### Centro de Cultura e Formação Musical
Ao longo de sua história, o Clube do Choro de Brasília ajudou a formar novas gerações de instrumentistas e a manter viva a tradição do choro. O espaço tornou-se um ponto de encontro para artistas renomados e jovens talentos, fortalecendo a cena cultural da capital federal.
Sua importância ultrapassa os limites do Distrito Federal, sendo reconhecido como um patrimônio da música brasileira e um dos principais centros de excelência do gênero no país.
`,
        image: choroImage,
        rating: 4
    },
    {
        name: 'Congresso Nacional',
        category: 'Monumento',
        location: 'Brasília',
        description: 'Sede do poder legislativo brasileiro, um ícone da arquitetura moderna de Oscar Niemeyer.',
        modalDescription: `
### Congresso Nacional
#### O Símbolo da Nova Capital Brasileira
A construção do Palácio do Congresso Nacional, projetado por Oscar Niemeyer, foi um dos marcos da transferência da capital do Rio de Janeiro para Brasília, na década de 1950. O edifício foi concebido para abrigar a Câmara dos Deputados e o Senado Federal, representando o Poder Legislativo do país.
Sua arquitetura moderna, com as duas cúpulas (uma côncava para o Senado e outra convexa para a Câmara), tornou-se um dos principais símbolos de Brasília e do Brasil. A construção do Congresso e dos demais edifícios da nova capital representou um grande esforço de interiorização do desenvolvimento e de modernização da administração pública brasileira.
#### Importância Política e Histórica
Desde sua inauguração, em 1960, o Congresso Nacional tem sido palco de importantes acontecimentos da história política do Brasil. O local sediou a elaboração de leis, debates sobre os rumos do país, a promulgação da Constituição de 1988 e momentos cruciais da redemocratização.
Atualmente, o edifício é um dos monumentos mais conhecidos do Brasil, representando a união dos poderes e a importância do debate democrático para a sociedade.
`,
        image: congressoNacionalImage,
        rating: 5
    },
    {
        name: 'Catedral Metropolitana',
        category: 'Monumento',
        location: 'Brasília',
        description: 'Uma obra-prima de Niemeyer, com seus 16 arcos de concreto e vitrais que se elevam aos céus.',
        modalDescription: `
### Catedral Metropolitana de Brasília
#### Um Ícone da Arquitetura e da Fé
A Catedral Metropolitana de Brasília, também conhecida como Catedral de Nossa Senhora Aparecida, foi projetada por Oscar Niemeyer e inaugurada em 1970. A obra é considerada um dos maiores exemplos da arquitetura modernista brasileira e um dos monumentos mais importantes da capital federal.
Sua estrutura circular, formada por 16 colunas de concreto que se curvam em direção ao céu, representa a união da terra com o divino. No interior, os vitrais coloridos criam um ambiente de luz e espiritualidade que encanta visitantes de todo o mundo.
#### Integração entre Arte, Religião e Urbanismo
A construção da catedral fez parte do plano original de Brasília, concebido por Lúcio Costa, que previa a criação de espaços públicos e edifícios monumentais para a nova capital do país. A catedral tornou-se um dos principais pontos turísticos de Brasília e um símbolo da convivência entre a modernidade arquitetônica e a religiosidade.
Além de sua importância como marco religioso, a Catedral de Brasília representa a capacidade da arquitetura de criar espaços que inspiram reflexão, admiração e sentimento de pertencimento.
`,
        image: catedralImage,
        rating: 5
    },
    {
        name: 'Ponte JK',
        category: 'Monumento',
        location: 'Brasília',
        description: 'Ponte estaiada sobre o Lago Paranoá, símbolo da modernidade e da engenharia de Brasília.',
        modalDescription: `
### Ponte Juscelino Kubitschek (Ponte JK)
#### Uma Obra de Arte sobre o Lago Paranoá
A Ponte Juscelino Kubitschek, conhecida como Ponte JK, foi inaugurada em 2002 para ligar a área central de Brasília à região do Lago Sul. Projetada pelo arquiteto Alexandre Chan, a ponte se destaca por seus três arcos de aço que se cruzam sobre o Lago Paranoá, criando um efeito visual único.
Desde sua inauguração, a Ponte JK tornou-se um dos mais importantes cartões-postais de Brasília e um exemplo da arquitetura contemporânea brasileira. A obra recebeu diversos prêmios internacionais de engenharia e arquitetura, sendo reconhecida por sua beleza e funcionalidade.
#### Integração Urbana e Símbolo da Brasília Contemporânea
Além de facilitar o trânsito na capital federal, a ponte transformou a paisagem urbana e se tornou um ponto de encontro e lazer para moradores e turistas. Sua construção representou um novo momento no desenvolvimento de Brasília, combinando soluções de engenharia com um design arrojado e inovador.
A Ponte JK é um exemplo de como a arquitetura pode criar obras que vão além da funcionalidade, tornando-se símbolos da identidade e da modernidade de uma cidade.
`,
        image: ponteImage,
        rating: 4
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


export default function DistritoFederal() {
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
              <Text style={styles.historyTitle}>A Mudança do Eixo Geopolítico do Brasil</Text>
              <Text style={styles.historyText}>A história do Distrito Federal moderno é o ápice de um planejamento geopolítico de segurança nacional e integração do território brasileiro que levou quase dois séculos para amadurecer.</Text>
              <Text style={styles.historySubtitle}>A Ideia da Interiorização</Text>
              <Text style={styles.historyText}>A tese de interiorizar a capital remonta ao século XVIII. O Marquês de Pombal cogitou a mudança; em 1823, José Bonifácio sugeriu formalmente o nome "Brasília". A Constituição de 1891 fixou os limites de uma zona no Planalto Central. Em 1892, a Missão Cruls delimitou o quadrilátero onde o DF está assentado hoje.</Text>
              <Text style={styles.historySubtitle}>A Construção e os Candangos</Text>
              <Text style={styles.historyText}>Juscelino Kubitschek transformou a transferência da capital no plano de metas do seu governo ("50 anos em 5"). O projeto urbanístico foi vencido por Lúcio Costa e os monumentais prédios públicos foram desenhados por Oscar Niemeyer.</Text>
              <Text style={styles.historyText}>A construção gerou uma migração massiva de trabalhadores nordestinos e goianos, conhecidos como candangos. Em tempo recorde, Brasília foi inaugurada em 21 de abril de 1960.</Text>
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
    container: { flex: 1, backgroundColor: '#f0f4c3' },
    header: { height: 250 },
    headerImage: { width: '100%', height: '100%' },
    backButton: { position: 'absolute', top: 40, left: 20, zIndex: 10, backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20 },
    backButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    tabs: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, backgroundColor: '#f0f4c3' },
    tabButton: { paddingVertical: 8, paddingHorizontal: 25, borderRadius: 20 },
    activeTab: { backgroundColor: '#cddc39' },
    tabText: { color: '#827717', fontWeight: 'bold', fontSize: 16 },
    activeTabText: { color: '#fff' },
    content: { paddingVertical: 20, alignItems: 'center', width: '100%'},
    historyContainer: { backgroundColor: '#fff', borderRadius: 15, padding: 20, marginHorizontal: 20 },
    historyTitle: { fontSize: 22, fontWeight: 'bold', color: '#827717', marginBottom: 15, textAlign: 'center' },
    historySubtitle: { fontSize: 18, fontWeight: 'bold', color: '#827717', marginTop: 15, marginBottom: 5 },
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
      color: '#827717',
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
      color: '#cddc39',
      marginHorizontal: 2,
    },
    descriptionContainer: {
      paddingHorizontal: 20,
      maxHeight: 300
    },
    modalSubtitle: { fontSize: 20, fontWeight: 'bold', color: '#827717', marginTop: 15, marginBottom: 5 },
    modalSubSubtitle: { fontSize: 18, fontWeight: 'bold', color: '#827717', marginTop: 10, marginBottom: 5 },
    modalDescription: { fontSize: 16, color: '#333', lineHeight: 24 },
  });
