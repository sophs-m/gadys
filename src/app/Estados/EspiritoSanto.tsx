
import { useRouter } from 'expo-router';
import { useState, useRef } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, FlatList, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const headerImage = require('../../../assets/images/es/praias.png');
const conventoDaPenhaImage = require('../../../assets/images/es/convento.png');
const praiasDeGuarapariImage = require('../../../assets/images/es/praias.png');
const festaDaPolentaImage = require('../../../assets/images/es/festa.png');

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
        name: 'Festa da Polenta',
        category: 'Evento',
        location: 'Venda Nova do Imigrante',
        description: 'Celebra a cultura italiana com muita comida, música e o tradicional tombo da polenta gigante.',
        modalDescription: `
### Festa da Polenta
#### A Celebração da Herança Italiana no Espírito Santo
A Festa da Polenta, realizada em Venda Nova do Imigrante, é um dos eventos mais importantes do Espírito Santo e celebra a cultura dos imigrantes italianos que se estabeleceram na região a partir do final do século XIX. A festa surgiu como uma forma de valorizar as tradições, a culinária e o modo de vida trazidos pelos colonos, que tiveram papel fundamental no desenvolvimento agrícola e social do estado.
O evento é conhecido por sua gastronomia típica, com destaque para a polenta, prato que se tornou símbolo da resistência e da identidade dos imigrantes. Um dos momentos mais aguardados da festa é o "tombo da polenta", em que uma grande quantidade de polenta é virada de um caldeirão gigante, representando a fartura e a união da comunidade.
Além da comida, a festa promove shows, desfiles, danças folclóricas e a eleição da rainha da polenta, atraindo milhares de visitantes e fortalecendo a identidade cultural ítalo-capixaba.
`,
        image: festaDaPolentaImage,
        rating: 4
    },
    {
        name: 'Convento da Penha',
        category: 'Monumento',
        location: 'Vila Velha',
        description: 'Principal monumento histórico e religioso do estado, com uma vista panorâmica de Vitória e Vila Velha.',
        modalDescription: `
### Convento da Penha
#### Um Marco da Fé e da História Capixaba
O Convento da Penha, localizado em Vila Velha, é um dos mais antigos e importantes santuários religiosos do Brasil. Sua história começa no século XVI, quando o frei espanhol Pedro Palácios chegou à região e iniciou a construção de uma pequena capela no alto de um penhasco. Ao longo dos séculos, o local foi ampliado e se transformou em um imponente complexo arquitetônico.
O convento é dedicado a Nossa Senhora da Penha, padroeira do Espírito Santo, e atrai milhares de fiéis e turistas todos os anos. Além de sua importância religiosa, o monumento possui um grande valor histórico e cultural, representando a presença da ordem franciscana no Brasil e a influência da arquitetura colonial.
#### A Vista e a Integração com a Paisagem
Situado a mais de 150 metros de altura, o Convento da Penha oferece uma vista panorâmica de Vila Velha, Vitória e da Baía de Vitória. Sua localização privilegiada e a beleza de sua construção fazem dele um dos cartões-postais mais conhecidos do Espírito Santo e um símbolo da identidade capixaba.
`,
        image: conventoDaPenhaImage,
        rating: 5
    },
    {
        name: 'Praias de Guarapari',
        category: 'Monumento',
        location: 'Guarapari',
        description: 'Famosas por suas areias monazíticas, com propriedades terapêuticas, e pela beleza de suas praias.',
        modalDescription: `
### Praias de Guarapari
#### As Areias Monazíticas e o Turismo de Saúde
Guarapari, no litoral do Espírito Santo, ficou conhecida nacionalmente por suas praias com areias monazíticas, que possuem uma concentração natural de minerais radioativos e são associadas a supostos benefícios terapêuticos. A fama das "areias medicinais" atraiu visitantes em busca de tratamento para doenças como artrite e reumatismo, impulsionando o desenvolvimento do turismo de saúde na região desde meados do século XX.
#### Desenvolvimento Turístico e Beleza Natural
Além das propriedades de suas areias, as praias de Guarapari se destacam pela beleza de suas paisagens, com águas claras, formações rochosas e vegetação costeira. A combinação de fatores naturais e o desenvolvimento de uma infraestrutura turística fizeram da cidade um dos destinos de verão mais procurados do Sudeste brasileiro.
A história de Guarapari mostra como as características naturais de uma região podem influenciar seu desenvolvimento econômico e cultural, transformando uma antiga vila de pescadores em um importante polo turístico do país.
`,
        image: praiasDeGuarapariImage,
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


export default function EspiritoSanto() {
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
              <Text style={styles.historyTitle}>A Conquista da Fronteira Proibida</Text>
              <Text style={styles.historyText}>O Espírito Santo tem uma trajetória marcada pelo isolamento forçado pela Coroa Portuguesa colonial, seguido por uma impressionante abertura demográfica e econômica nos séculos XIX e XX.</Text>
              <Text style={styles.historySubtitle}>A Capitania e as Barreiras Geográficas</Text>
              <Text style={styles.historyText}>A Capitania do Espírito Santo foi doada em 1535 a Vasco Fernandes Coutinho. A resistência dos povos indígenas forçou os colonos a fundar a cidade de Vitória em 1551. Com a descoberta de ouro em Minas Gerais, o território passou a ser visto como barreira contra o contrabando de minerais — a metrópole proibiu a abertura de estradas e o povoamento do interior, sufocando economicamente a província.</Text>
              <Text style={styles.historySubtitle}>O Boom do Café e as Imigrações Europeias</Text>
              <Text style={styles.historyText}>O café entrou no sul do Espírito Santo vindo do Vale do Paraíba e se transformou no principal motor da economia estadual. Para ocupar o interior, o governo promoveu a imigração europeia:</Text>
              <Text style={styles.historyText}>Alemães e Pomeranos estabeleceram-se em regiões como Santa Maria de Jetibá a partir de 1847. Italianos chegaram em massa a partir de 1874, fundando colônias como Santa Teresa, considerada a primeira cidade colonizada por italianos no Brasil.</Text>
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
    container: { flex: 1, backgroundColor: '#ede7f6' },
    header: { height: 250 },
    headerImage: { width: '100%', height: '100%' },
    backButton: { position: 'absolute', top: 40, left: 20, zIndex: 10, backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20 },
    backButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    tabs: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, backgroundColor: '#ede7f6' },
    tabButton: { paddingVertical: 8, paddingHorizontal: 25, borderRadius: 20 },
    activeTab: { backgroundColor: '#673ab7' },
    tabText: { color: '#673ab7', fontWeight: 'bold', fontSize: 16 },
    activeTabText: { color: '#fff' },
    content: { paddingVertical: 20, alignItems: 'center', width: '100%'},
    historyContainer: { backgroundColor: '#fff', borderRadius: 15, padding: 20, marginHorizontal: 20 },
    historyTitle: { fontSize: 22, fontWeight: 'bold', color: '#673ab7', marginBottom: 15, textAlign: 'center' },
    historySubtitle: { fontSize: 18, fontWeight: 'bold', color: '#673ab7', marginTop: 15, marginBottom: 5 },
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
      color: '#673ab7',
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
      color: '#673ab7',
      marginHorizontal: 2,
    },
    descriptionContainer: {
      paddingHorizontal: 20,
      maxHeight: 300
    },
    modalSubtitle: { fontSize: 20, fontWeight: 'bold', color: '#673ab7', marginTop: 15, marginBottom: 5 },
    modalSubSubtitle: { fontSize: 18, fontWeight: 'bold', color: '#673ab7', marginTop: 10, marginBottom: 5 },
    modalDescription: { fontSize: 16, color: '#333', lineHeight: 24 },
  });
