
import { useRouter } from 'expo-router';
import { useState, useRef } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, FlatList, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const headerImage = require('../../../assets/images/ba/pelourinho.png');
const pelourinhoImage = require('../../../assets/images/ba/pelourinho.png');
const elevadorLacerdaImage = require('../../../assets/images/ba/elevador.png');
const carnavalImage = require('../../../assets/images/ba/carnaval.png');
const capoeira = require('../../../assets/images/ba/capoeira.png');

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
        name: 'Carnaval de Salvador',
        category: 'Evento',
        location: 'Salvador',
        description: 'A maior festa de rua do planeta, com trios elétricos, blocos afros e a energia contagiante do axé.',
        modalDescription: `
### Carnaval de Salvador
#### Das Festas Coloniais ao Maior Carnaval de Rua do Mundo
As origens do Carnaval de Salvador remontam ao século XIX, quando a população participava do entrudo, uma festa trazida pelos portugueses em que as pessoas brincavam nas ruas jogando água, farinha e outros materiais umas nas outras. Com o passar do tempo, a celebração incorporou elementos das culturas africanas presentes na Bahia, especialmente das tradições musicais e religiosas trazidas pelos povos escravizados.
No início do século XX, surgiram os primeiros clubes carnavalescos, corsos e blocos organizados. A grande transformação ocorreu em 1950, quando Dodô e Osmar adaptaram equipamentos sonoros a um veículo, criando o primeiro trio elétrico. A novidade revolucionou o Carnaval brasileiro, levando a música para as ruas e aproximando artistas e público. Nas décadas seguintes, o crescimento do axé music consolidou Salvador como referência mundial em festividades populares.
Hoje, o Carnaval de Salvador é uma das maiores expressões da cultura afro-brasileira, reunindo milhões de pessoas e movimentando a economia, o turismo e a produção cultural da Bahia.
`,
        image: carnavalImage,
        rating: 5
    },
    {
        name: 'Pelourinho',
        category: 'Monumento',
        location: 'Salvador',
        description: 'Centro histórico de Salvador, com suas ladeiras de paralelepípedos, casarões coloridos e igrejas barrocas.',
        modalDescription: `
### Pelourinho
#### O Coração Histórico do Brasil Colonial
Fundado no século XVI, o Pelourinho foi o centro político, econômico e religioso da primeira capital do Brasil, Salvador. Durante o período colonial, a região concentrava prédios administrativos, residências de famílias influentes, igrejas e centros comerciais ligados ao comércio atlântico.
O nome "Pelourinho" vem da estrutura de pedra instalada na praça principal para a aplicação pública de punições, especialmente contra pessoas escravizadas. Por esse motivo, o local guarda uma importante memória das desigualdades e da violência presentes durante o período escravista.
Ao longo dos séculos, o bairro tornou-se um dos principais centros da cultura afro-brasileira. Após períodos de decadência e abandono no século XX, passou por um amplo processo de restauração na década de 1990. Atualmente, suas ruas preservam casarões dos séculos XVII e XVIII, igrejas barrocas e espaços culturais que contam a história da formação social e cultural do Brasil.
O Pelourinho é reconhecido internacionalmente por representar a mistura de influências europeias, africanas e indígenas que ajudaram a construir a identidade brasileira.
`,
        image: pelourinhoImage,
        rating: 5
    },
    {
        name: 'Elevador Lacerda',
        category: 'Monumento',
        location: 'Salvador',
        description: 'Um dos cartões-postais da Bahia, ligando a Cidade Alta à Cidade Baixa, com uma vista deslumbrante da Baía de Todos-os-Santos.',
        modalDescription: `
### Elevador Lacerda
#### Uma Solução para o Crescimento de Salvador
Desde os tempos coloniais, Salvador era dividida entre a Cidade Alta e a Cidade Baixa. A Cidade Alta concentrava os centros administrativos, religiosos e residenciais, enquanto a Cidade Baixa abrigava o porto e as atividades comerciais. A diferença de aproximadamente 70 metros de altitude entre essas áreas dificultava o transporte de pessoas e mercadorias.
Para resolver esse problema, o engenheiro e empresário baiano Antônio de Lacerda idealizou uma estrutura capaz de conectar os dois níveis da cidade. Inaugurado em 1873, o Elevador Lacerda tornou-se um marco da engenharia brasileira e uma demonstração do processo de modernização urbana vivido por Salvador no século XIX.
Além de facilitar o cotidiano da população, o elevador fortaleceu o comércio entre as duas partes da cidade e contribuiu para o crescimento econômico da capital baiana. Reformado diversas vezes ao longo de sua história, continua sendo um dos principais símbolos urbanos do Brasil e um dos monumentos mais fotografados de Salvador.
`,
        image: elevadorLacerdaImage,
        rating: 5
    },
    {
        name: 'Capoeira',
        category: 'Outro',
        location: 'Bahia',
        description: 'Arte marcial afro-brasileira que mistura luta, dança e música. Patrimônio cultural imaterial da UNESCO.',
        modalDescription: `
### Capoeira
#### A Luta que se Tornou Patrimônio Cultural
A história da Capoeira está diretamente ligada à resistência dos africanos escravizados no Brasil. Entre os séculos XVI e XIX, milhões de africanos foram trazidos à força para trabalhar nas colônias portuguesas. Em meio às condições de opressão, eles preservaram tradições culturais e desenvolveram formas de resistência física e simbólica.
A Capoeira surgiu da combinação de movimentos corporais, ritmos musicais e conhecimentos de combate trazidos de diferentes regiões africanas. Para evitar a repressão dos senhores de engenho e das autoridades, seus praticantes frequentemente apresentavam os movimentos como dança ou manifestação cultural.
Após a abolição da escravidão, em 1888, a prática continuou sendo perseguida por muitos anos e chegou a ser criminalizada. Somente no século XX, mestres como Mestre Bimba e Mestre Pastinha contribuíram para sua valorização e reconhecimento como patrimônio cultural brasileiro.
Atualmente, a Capoeira é praticada em dezenas de países e representa um dos maiores símbolos da herança africana no Brasil. Sua influência ultrapassa o esporte e a dança, estando presente na música, na educação, na preservação da memória histórica e na valorização da cultura afro-brasileira.
`,
        image: capoeira,
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


export default function Bahia() {
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
              <Text style={styles.historyTitle}>O Tabuleiro Geopolítico do Império Colonial</Text>
              <Text style={styles.historyText}>A Bahia não é apenas onde o Brasil começou; ela foi o centro gravitacional econômico, cultural e político da América Portuguesa por mais de dois séculos.</Text>
              <Text style={styles.historySubtitle}>A Economia do Açúcar e o Tráfico Negreiro</Text>
              <Text style={styles.historyText}>Após a fundação de Salvador por Tomé de Sousa em 1549, a Bahia consolidou-se como a cabeça do império colonial. A região do Recôncavo Baiano desenvolveu uma economia açucareira de altíssima rentabilidade, transformando Salvador no principal porto de desembarque de africanos escravizados no Atlântico Sul.</Text>
              <Text style={styles.historyText}>Em 1624, os holandeses ocuparam a cidade, sendo expulsos no ano seguinte pela Jornada dos Vassalos. Mesmo após a transferência da capital para o Rio de Janeiro em 1763, a Bahia manteve uma influência cultural e mercantil incomensurável.</Text>
              <Text style={styles.historySubtitle}>Revoltas Sociais e a Guerra de Independência</Text>
              <Text style={styles.historyText}>Em 1798, estourou a Conjuração Baiana (Revolta dos Alfaiates), movimento influenciado pela Revolução Francesa que pregava a independência e o fim da escravidão.</Text>
              <Text style={styles.historyText}>Quando Dom Pedro I declarou a independência em 1822, as tropas portuguesas recusaram-se a aceitar e ocuparam Salvador. A expulsão definitiva dos portugueses ocorreu em 2 de julho de 1823, data máxima do calendário político baiano.</Text>
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
    container: { flex: 1, backgroundColor: '#e3f2fd' },
    header: { height: 250 },
    headerImage: { width: '100%', height: '100%' },
    backButton: { position: 'absolute', top: 40, left: 20, zIndex: 10, backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20 },
    backButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    tabs: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, backgroundColor: '#e3f2fd' },
    tabButton: { paddingVertical: 8, paddingHorizontal: 25, borderRadius: 20 },
    activeTab: { backgroundColor: '#2196f3' },
    tabText: { color: '#2196f3', fontWeight: 'bold', fontSize: 16 },
    activeTabText: { color: '#fff' },
    content: { paddingVertical: 20, alignItems: 'center', width: '100%'},
    historyContainer: { backgroundColor: '#fff', borderRadius: 15, padding: 20, marginHorizontal: 20 },
    historyTitle: { fontSize: 22, fontWeight: 'bold', color: '#2196f3', marginBottom: 15, textAlign: 'center' },
    historySubtitle: { fontSize: 18, fontWeight: 'bold', color: '#2196f3', marginTop: 15, marginBottom: 5 },
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
      color: '#2196f3',
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
      color: '#2196f3',
      marginHorizontal: 2,
    },
    descriptionContainer: {
      paddingHorizontal: 20,
      maxHeight: 300
    },
    modalSubtitle: { fontSize: 20, fontWeight: 'bold', color: '#2196f3', marginTop: 15, marginBottom: 5 },
    modalSubSubtitle: { fontSize: 18, fontWeight: 'bold', color: '#2196f3', marginTop: 10, marginBottom: 5 },
    modalDescription: { fontSize: 16, color: '#333', lineHeight: 24 },
  });
