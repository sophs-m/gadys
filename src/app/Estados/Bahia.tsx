import AbasSwipe from '../../components/AbasSwipe';
import LocalList from '../../components/LocalList';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getPontosFavoritos, togglePontoFavorito } from '../../services/pontosFavoritos';

const headerImage = require('../../../assets/images/estados/ba.png');
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
        modalDescription: `**Carnaval de Salvador**\n\n**Das Festas Coloniais ao Maior Carnaval de Rua do Mundo**\nAs origens do Carnaval de Salvador remontam ao século XIX, quando a população participava do entrudo, uma festa trazida pelos portugueses. Com o tempo, a celebração incorporou elementos das culturas africanas presentes na Bahia, especialmente das tradições musicais e religiosas trazidas pelos povos escravizados.\n\nNo início do século XX, surgiram os primeiros clubes carnavalescos, corsos e blocos organizados. A grande transformação ocorreu em 1950, quando Dodô e Osmar criaram o primeiro trio elétrico. Nas décadas seguintes, o crescimento do axé music consolidou Salvador como referência mundial em festividades populares.\n\nHoje, o Carnaval de Salvador é uma das maiores expressões da cultura afro-brasileira, reunindo milhões de pessoas e movimentando a economia, o turismo e a produção cultural da Bahia.`,
        image: carnavalImage,
        rating: 5
    },
    {
        name: 'Pelourinho',
        category: 'Monumento',
        location: 'Salvador',
        description: 'Centro histórico de Salvador, com suas ladeiras de paralelepípedos, casarões coloridos e igrejas barrocas.',
        modalDescription: `**Pelourinho**\n\n**O Coração Histórico do Brasil Colonial**\nFundado no século XVI, o Pelourinho foi o centro político, econômico e religioso da primeira capital do Brasil, Salvador. Durante o período colonial, a região concentrava prédios administrativos, residências de famílias influentes, igrejas e centros comerciais.\n\nO nome "Pelourinho" vem da estrutura de pedra instalada na praça principal para a aplicação pública de punições, especialmente contra pessoas escravizadas. Por esse motivo, o local guarda uma importante memória das desigualdades do período escravista.\n\nAo longo dos séculos, o bairro tornou-se um dos principais centros da cultura afro-brasileira. Após restauração na década de 1990, suas ruas preservam casarões dos séculos XVII e XVIII e igrejas barrocas que contam a história da formação social e cultural do Brasil.`,
        image: pelourinhoImage,
        rating: 5
    },
    {
        name: 'Elevador Lacerda',
        category: 'Monumento',
        location: 'Salvador',
        description: 'Um dos cartões-postais da Bahia, ligando a Cidade Alta à Cidade Baixa, com uma vista deslumbrante da Baía de Todos-os-Santos.',
        modalDescription: `**Elevador Lacerda**\n\n**Uma Solução para o Crescimento de Salvador**\nDesde os tempos coloniais, Salvador era dividida entre a Cidade Alta e a Cidade Baixa. A diferença de aproximadamente 70 metros de altitude entre essas áreas dificultava o transporte de pessoas e mercadorias.\n\nPara resolver esse problema, o engenheiro Antônio de Lacerda idealizou uma estrutura capaz de conectar os dois níveis da cidade. Inaugurado em 1873, o Elevador Lacerda tornou-se um marco da engenharia brasileira e um símbolo da modernização urbana de Salvador no século XIX.\n\nReformado diversas vezes ao longo de sua história, continua sendo um dos principais símbolos urbanos do Brasil e um dos monumentos mais fotografados de Salvador.`,
        image: elevadorLacerdaImage,
        rating: 5
    },
    {
        name: 'Capoeira',
        category: 'Outro',
        location: 'Bahia',
        description: 'Arte marcial afro-brasileira que mistura luta, dança e música. Patrimônio cultural imaterial da UNESCO.',
        modalDescription: `**Capoeira**\n\n**A Luta que se Tornou Patrimônio Cultural**\nA história da Capoeira está diretamente ligada à resistência dos africanos escravizados no Brasil. Em meio às condições de opressão, eles preservaram tradições culturais e desenvolveram formas de resistência física e simbólica.\n\nA Capoeira surgiu da combinação de movimentos corporais, ritmos musicais e conhecimentos de combate trazidos de diferentes regiões africanas. Para evitar a repressão, seus praticantes frequentemente apresentavam os movimentos como dança ou manifestação cultural.\n\nApós a abolição da escravidão, em 1888, a prática continuou sendo perseguida por anos. Somente no século XX, mestres como Mestre Bimba e Mestre Pastinha contribuíram para sua valorização. Atualmente, a Capoeira é praticada em dezenas de países e representa um dos maiores símbolos da herança africana no Brasil.`,
        image: capoeira,
        rating: 5
    }
];

const PlaceCard = ({ place, onPress, isFav, onFavorito }: { place: Place; onPress: (place: Place) => void; isFav: boolean; onFavorito: (name: string) => void }) => (
  <TouchableOpacity onPress={() => onPress(place)}>
    <View style={styles.card}>
      <Image source={place.image} style={styles.cardImage} />
      <TouchableOpacity style={styles.cardHeart} onPress={() => onFavorito(place.name)}>
        <Ionicons name={isFav ? 'heart' : 'heart-outline'} size={22} color={isFav ? '#e53935' : '#aaa'} />
      </TouchableOpacity>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{place.name}</Text>
        <Text style={styles.cardCategory}>{place.category} • {place.location}</Text>
        <Text style={styles.cardDescription}>{place.description}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const PlaceModal = ({ place, visible, onClose, isFav, onFavorito }: { place: Place | null; visible: boolean; onClose: () => void; isFav?: boolean; onFavorito?: (name: string) => void }) => {
  if (!place) return null;

  const renderDescription = (description: string) => {
    const parts = (description || '').split('**');
    return (
      <Text style={styles.modalDescription}>
        {parts.map((part, index) => {
          if (index % 2 === 1) {
            return <Text key={index} style={styles.modalSubtitle}>{part}</Text>;
          }
          return part;
        })}
      </Text>
    );
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Image source={place.image} style={styles.modalImage} />
          <TouchableOpacity style={styles.modalCloseBtn} onPress={onClose}>
            <Text style={styles.modalCloseBtnText}>✕</Text>
          </TouchableOpacity>
          <ScrollView style={styles.modalBody}>
            <View style={styles.modalTitleRow}>
              <Text style={styles.modalTitle}>{place.name}</Text>
              <TouchableOpacity onPress={() => onFavorito && onFavorito(place.name)}>
                <Ionicons name={isFav ? 'heart' : 'heart-outline'} size={26} color={isFav ? '#e53935' : '#aaa'} />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalCategory}>{place.category} • {place.location}</Text>
            {renderDescription(place.modalDescription || place.description)}
          </ScrollView>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default function Bahia() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [pontosFavs, setPontosFavs] = useState<string[]>([]);

  useEffect(() => { getPontosFavoritos().then(setPontosFavs); }, []);

  const handlePontoFavorito = (nome: string) => {
    togglePontoFavorito(nome).then(() => getPontosFavoritos().then(setPontosFavs));
  };

  const openModal = useCallback((place: Place) => {
    setSelectedPlace(place);
    setModalVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
    setSelectedPlace(null);
  }, []);


  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => router.push('/estados')} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Voltar</Text>
      </TouchableOpacity>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image source={headerImage} style={styles.headerImage} />
        </View>

        <AbasSwipe
          cor={"#2196f3"}
          historia={
            <View style={styles.content}>
              <View style={styles.historyContainer}>
                <Text style={styles.historyTitle}>O Berço do Brasil e a Formação da Identidade Nacional</Text>
              <Text style={styles.historySubtitle}>Os Primeiros Povos e a Chegada dos Portugueses</Text>
              <Text style={styles.historyText}>O território da Bahia era habitado por diversos povos indígenas, especialmente Tupinambás. Em 22 de abril de 1500, a frota de Pedro Álvares Cabral chegou ao litoral baiano, iniciando oficialmente a colonização portuguesa na América.</Text>
              <Text style={styles.historySubtitle}>A Fundação de Salvador</Text>
              <Text style={styles.historyText}>Em 1549, Salvador foi fundada por Tomé de Sousa e tornou-se a primeira capital do Brasil, o principal centro político, administrativo e religioso da colônia durante mais de dois séculos.</Text>
              <Text style={styles.historySubtitle}>O Ciclo do Açúcar e a Influência Africana</Text>
              <Text style={styles.historyText}>Grandes engenhos foram instalados no Recôncavo Baiano. Salvador transformou-se em um dos maiores portos de entrada de pessoas escravizadas das Américas. Foi na Bahia que se consolidaram o Candomblé, a Capoeira, o Samba de Roda e diversas festas populares.</Text>
              <Text style={styles.historySubtitle}>A Independência da Bahia</Text>
              <Text style={styles.historyText}>Embora a Independência tenha sido proclamada em 1822, tropas portuguesas resistiram na Bahia até 2 de julho de 1823. Por isso, o 2 de Julho é considerado pelos baianos a verdadeira consolidação da independência brasileira.</Text>
              <Text style={styles.historySubtitle}>Modernização e Patrimônio Histórico</Text>
              <Text style={styles.historyText}>A descoberta de petróleo no Recôncavo Baiano na década de 1930 marcou nova fase de crescimento. O Pelourinho, com casarões coloniais e igrejas barrocas, foi reconhecido como Patrimônio Mundial pela UNESCO.</Text>
              </View>
            </View>
          }
          culturaLocal={
            <View style={styles.content}>
              <LocalList sigla="BA" imagensLocais={{}} />
            {places.map(p => <PlaceCard key={p.name} place={p} onPress={openModal} isFav={pontosFavs.includes(p.name)} onFavorito={handlePontoFavorito} />)}
            </View>
          }
        />
      </ScrollView>
      <PlaceModal place={selectedPlace} visible={modalVisible} onClose={closeModal} isFav={selectedPlace ? pontosFavs.includes(selectedPlace.name) : false} onFavorito={handlePontoFavorito} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A172A' },
  header: { height: 250, position: 'relative' },
  headerImage: { width: '100%', height: '100%' },
  backButton: { position: 'absolute', top: 40, left: 20, zIndex: 10, backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20 },
  backButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  tabs: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, backgroundColor: '#e3f2fd' },
  tabButton: { paddingVertical: 8, paddingHorizontal: 25, borderRadius: 20 },
  activeTab: { backgroundColor: '#2196f3' },
  tabText: { color: '#2196f3', fontWeight: 'bold', fontSize: 16 },
  activeTabText: { color: '#fff' },
  content: { padding: 20 },
  historyContainer: { backgroundColor: '#1E2F4A', borderRadius: 15, padding: 20 },
  historyTitle: { fontSize: 22, fontWeight: 'bold', color: '#FFC700', marginBottom: 15, textAlign: 'center' },
  historySubtitle: { fontSize: 18, fontWeight: 'bold', color: '#FFC700', marginTop: 10, marginBottom: 5 },
  historyText: { fontSize: 16, color: '#ccc', lineHeight: 24, marginBottom: 10 },
  categoryHeader: { fontSize: 20, fontWeight: 'bold', color: '#FFC700', marginTop: 15, marginBottom: 5 },
  separator: { height: 1, backgroundColor: '#e0e0e0', marginVertical: 10, marginBottom: 15 },
  card: { backgroundColor: '#2A3F5F', borderRadius: 15, marginBottom: 20, elevation: 3 },
  cardHeart: { position: 'absolute', top: 10, right: 10, zIndex: 1, backgroundColor: 'rgba(0,0,0,0.35)', borderRadius: 20, padding: 5 },
  cardImage: { width: '100%', height: 150, borderTopLeftRadius: 15, borderTopRightRadius: 15 },
  cardContent: { padding: 15 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#FFC700' },
  cardCategory: { fontSize: 14, color: '#aaa', marginVertical: 5 },
  cardDescription: { fontSize: 14, color: '#ccc' },
  modalContainer: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.6)' },
  modalContent: { backgroundColor: '#1E2F4A', borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '90%' },
  modalImage: { width: '100%', height: 220, borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  modalCloseBtn: { position: 'absolute', top: 14, right: 14, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 20, width: 30, height: 30, justifyContent: 'center', alignItems: 'center' },
  modalCloseBtnText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  modalBody: { padding: 20 },
  modalTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingHorizontal: 20, paddingTop: 16, marginBottom: 5 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff', flex: 1, marginRight: 10 },
  modalCategory: { fontSize: 14, color: '#aaa', marginBottom: 10, paddingHorizontal: 20 },
  modalDescription: { fontSize: 15, color: '#ddd', lineHeight: 23 },
  modalSubtitle: { fontWeight: 'bold', color: '#FFC700' },
  closeButton: { backgroundColor: '#FFC700', margin: 20, marginTop: 0, borderRadius: 25, paddingVertical: 13, alignItems: 'center' },
  closeButtonText: { color: '#0A172A', fontWeight: 'bold', fontSize: 15 },
});
