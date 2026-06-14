
import { useRouter } from 'expo-router';
import { useState, useRef } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, FlatList, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const headerImage = require('../../../assets/images/ce/jericoacoara.png');
const canoaQuebradaImage = require('../../../assets/images/ce/canoa.png');
const jericoacoaraImage = require('../../../assets/images/ce/jericoacoara.png');
const forroImage = require('../../../assets/images/ce/forro.png');
const estatuaImage = require('../../../assets/images/ce/estatua.png');

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
        name: 'Forró',
        category: 'Evento',
        location: 'Ceará',
        description: 'Ritmo musical e dança que embala as noites cearenses, com suas sanfonas, zabumbas e triângulos.',
        modalDescription: `
### Forró
#### Origem e Formação de um Símbolo Nordestino
O forró é uma das manifestações culturais mais importantes do Nordeste brasileiro e possui origens ligadas às tradições populares do sertão. Sua formação resultou da mistura de influências indígenas, africanas e europeias, especialmente nos ritmos, instrumentos e danças desenvolvidos ao longo dos séculos. Embora suas raízes sejam mais antigas, o gênero ganhou projeção nacional a partir das décadas de 1940 e 1950 graças ao trabalho de Luiz Gonzaga, que levou a música nordestina para todo o país.
Tradicionalmente executado com sanfona, zabumba e triângulo, o forró tornou-se uma importante forma de expressão das vivências do povo nordestino, retratando temas como a seca, a migração, o trabalho no campo, as festas populares e o cotidiano sertanejo. Além de gênero musical, o forró representa um patrimônio cultural que fortalece a identidade regional e mantém vivas tradições transmitidas entre gerações.
`,
        image: forroImage,
        rating: 5
    },
    {
        name: 'Canoa Quebrada',
        category: 'Monumento',
        location: 'Aracati',
        description: 'Praia famosa por suas falésias avermelhadas, dunas e pelo símbolo da lua e da estrela.',
        modalDescription: `
### Canoa Quebrada
#### Da Vila de Pescadores ao Destino Turístico Internacional
Localizada no município de Aracati, Canoa Quebrada surgiu como uma pequena comunidade de pescadores que viveu por séculos de forma relativamente isolada. A região começou a ganhar notoriedade na década de 1970, quando viajantes e grupos ligados ao movimento hippie descobriram suas paisagens de falésias avermelhadas, praias extensas e clima tranquilo.
A partir desse período, Canoa Quebrada passou por um processo de desenvolvimento turístico que transformou a economia local. Mesmo com o crescimento da infraestrutura voltada para visitantes, a vila preservou elementos de sua cultura tradicional, especialmente a pesca artesanal e os costumes das comunidades locais.
Hoje, o símbolo da lua e estrela esculpido nas falésias tornou-se uma das imagens mais conhecidas do turismo cearense, representando a liberdade, a diversidade cultural e a beleza natural da região.
`,
        image: canoaQuebradaImage,
        rating: 5
    },
    {
        name: 'Jericoacoara',
        category: 'Monumento',
        location: 'Jijoca de Jericoacoara',
        description: 'Vila de pescadores com ruas de areia, praias paradisíacas e a famosa Pedra Furada.',
        modalDescription: `
### Jericoacoara
#### De Comunidade Isolada a Referência Mundial em Turismo
Jericoacoara, localizada no litoral oeste do Ceará, teve origem como uma pequena vila de pescadores cercada por dunas e áreas de vegetação costeira. Durante grande parte de sua história, o acesso ao local era extremamente difícil, o que contribuiu para a preservação de suas paisagens naturais e de seu modo de vida tradicional.
A partir das décadas de 1980 e 1990, a região passou a atrair visitantes brasileiros e estrangeiros interessados em suas praias, lagoas e formações naturais. O reconhecimento de sua importância ambiental levou à criação da Parque Nacional de Jericoacoara, fortalecendo as ações de conservação da área.
Atualmente, Jericoacoara é considerada um dos destinos turísticos mais famosos do Brasil. Seu desenvolvimento demonstra como a preservação ambiental e o turismo podem contribuir para o crescimento econômico sem apagar a história e as tradições locais.
`,
        image: jericoacoaraImage,
        rating: 5
    },
    {
        name: 'Centro Dragão do Mar de Arte e Cultura',
        category: 'Monumento',
        location: 'Fortaleza',
        description: 'Centro cultural e de entretenimento em homenagem ao herói abolicionista Francisco José do Nascimento.',
        modalDescription: `
### Centro Dragão do Mar de Arte e Cultura
#### Homenagem a um Líder Abolicionista
O Centro Dragão do Mar de Arte e Cultura, localizado em Fortaleza, recebeu esse nome em homenagem a Francisco José do Nascimento, líder jangadeiro que teve papel importante no movimento abolicionista cearense. Em 1881, ele e outros trabalhadores do porto recusaram-se a transportar pessoas escravizadas para embarcações, tornando-se símbolo da luta pela liberdade.
Inaugurado em 1999, o complexo foi criado com o objetivo de promover a cultura, a educação e as artes no Ceará. O espaço reúne museus, cinemas, teatros, bibliotecas, planetário e áreas para exposições, tornando-se um dos maiores centros culturais do país.
Além de sua importância arquitetônica e artística, o Dragão do Mar representa o compromisso do Ceará com a valorização da memória histórica, da produção cultural e do acesso da população às diversas formas de conhecimento e expressão artística.
`,
        image: estatuaImage,
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


export default function Ceara() {
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
              <Text style={styles.historyTitle}>A Resistência do Sertão e o Pioneirismo Abolicionista</Text>
              <Text style={styles.historyText}>O Ceará apresenta uma trajetória histórica singular dentro do Nordeste. Sua ocupação demorou a se consolidar devido ao relevo, ao regime de secas periódicas e ao violento conflito com a Confederação dos Cariris.</Text>
              <Text style={styles.historySubtitle}>A Sociedade do Couro e do Algodão</Text>
              <Text style={styles.historyText}>Diferente de Pernambuco e da Bahia, o Ceará não possuía o solo propício para os grandes engenhos de açúcar. A ocupação do território fez-se pelo gado que avançou pelo sertão adentro, dando origem à "Civilização do Couro".</Text>
              <Text style={styles.historyText}>No século XVIII, o Ceará encontrou outra força econômica: o algodão. Com a Guerra de Independência dos Estados Unidos e a Revolução Industrial Inglesa, a demanda pelo algodão cearense disparou, e Fortaleza cresceu rapidamente.</Text>
              <Text style={styles.historySubtitle}>O Pioneirismo na Abolição</Text>
              <Text style={styles.historyText}>Em janeiro de 1881, os jangadeiros liderados por Francisco José do Nascimento (o Dragão do Mar) recusaram-se a transportar escravizados para os navios. Sob o lema "No porto do Ceará não se embarcam mais escravos", o movimento paralisou o tráfico interprovincial.</Text>
              <Text style={styles.historyText}>Em 25 de março de 1884, o Ceará tornou-se a primeira província do Brasil a extinguir a escravidão, ganhando de José do Patrocínio o título de "Terra da Luz".</Text>
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
    container: { flex: 1, backgroundColor: '#fce4ec' },
    header: { height: 250 },
    headerImage: { width: '100%', height: '100%' },
    backButton: { position: 'absolute', top: 40, left: 20, zIndex: 10, backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20 },
    backButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    tabs: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, backgroundColor: '#fce4ec' },
    tabButton: { paddingVertical: 8, paddingHorizontal: 25, borderRadius: 20 },
    activeTab: { backgroundColor: '#e91e63' },
    tabText: { color: '#e91e63', fontWeight: 'bold', fontSize: 16 },
    activeTabText: { color: '#fff' },
    content: { paddingVertical: 20, alignItems: 'center', width: '100%'},
    historyContainer: { backgroundColor: '#fff', borderRadius: 15, padding: 20, marginHorizontal: 20 },
    historyTitle: { fontSize: 22, fontWeight: 'bold', color: '#e91e63', marginBottom: 15, textAlign: 'center' },
    historySubtitle: { fontSize: 18, fontWeight: 'bold', color: '#e91e63', marginTop: 15, marginBottom: 5 },
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
      color: '#e91e63',
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
      color: '#e91e63',
      marginHorizontal: 2,
    },
    descriptionContainer: {
      paddingHorizontal: 20,
      maxHeight: 300
    },
    modalSubtitle: { fontSize: 20, fontWeight: 'bold', color: '#e91e63', marginTop: 15, marginBottom: 5 },
    modalSubSubtitle: { fontSize: 18, fontWeight: 'bold', color: '#e91e63', marginTop: 10, marginBottom: 5 },
    modalDescription: { fontSize: 16, color: '#333', lineHeight: 24 },
  });
