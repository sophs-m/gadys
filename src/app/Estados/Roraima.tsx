import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AbasSwipe from '../../components/AbasSwipe';
import LocalList from '../../components/LocalList';
import { getPontosFavoritos, togglePontoFavorito } from '../../services/pontosFavoritos';

const headerImage = require('../../../assets/images/estados/rr.png');
const monteRoraimaImage = require('../../../assets/images/rr/monte.png');
const corridaDeCavaloImage = require('../../../assets/images/rr/corrida.png');
const forteDeSaoJoaquimImage = require('../../../assets/images/rr/parque.png');

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
        name: 'Corrida de Cavalo',
        category: 'Evento',
        location: 'Normandia',
        description: 'Uma tradição indígena que celebra a força e a destreza dos cavalos lavradeiros.',
        modalDescription: `**Corridas de Cavalos**\n\n**Tradição Popular e Cultura Rural no Brasil**\nAs corridas de cavalos fazem parte de uma tradição popular presente em várias regiões do Brasil, especialmente em áreas rurais e de fronteira. Elas têm origem ligada à cultura da pecuária e da criação de gado, atividades que marcaram profundamente a formação do interior do país.\n\nAo longo do tempo, essas competições deixaram de ser apenas práticas de trabalho e transporte para se tornarem eventos sociais e festivos, reunindo comunidades em celebrações locais. Em alguns casos, estão associadas a festas tradicionais e ao calendário cultural de cidades do interior, refletindo a importância histórica do cavalo na ocupação do território brasileiro.`,
        image: corridaDeCavaloImage,
        rating: 5
    },
    {
        name: 'Monte Roraima',
        category: 'Monumento',
        location: 'Uiramutã',
        description: 'O sétimo ponto mais alto do Brasil, um lugar de beleza única e mistérios que inspiraram lendas e histórias.',
        modalDescription: `**Monte Roraima**\n\n**Formação Antiga, Cultura Indígena e Fronteira Natural**\nO Monte Roraima é uma das formações geológicas mais antigas do planeta e está localizado na tríplice fronteira entre Brasil, Venezuela e Guiana. Sua estrutura em formato de tepui impressiona pela altitude e pelas paredes verticais, resultado de milhões de anos de erosão.\n\nPara os povos indígenas da região, como os Macuxi e Pemón, o Monte Roraima possui grande importância espiritual e está presente em mitos de criação e narrativas tradicionais. Durante o período de exploração europeia, a região permaneceu isolada por muito tempo devido ao difícil acesso.\n\nHoje, o Monte Roraima é um importante símbolo natural da Amazônia setentrional e um dos destinos mais emblemáticos do ecoturismo brasileiro.`,
        image: monteRoraimaImage,
        rating: 5
    },
    {
        name: 'Parque Nacional do Viruá',
        category: 'Monumento',
        location: 'Caracaraí',
        description: 'Funciona como um centro de referência para pesquisas ecológicas de longa duração, e tem a missão de integrar atividades de pesquisa e conhecimentos de biodiversidade ao desenvolvimento local.',
        modalDescription: `**Parque Nacional do Viruá**\n\n**Biodiversidade e Conservação na Amazônia**\nO Parque Nacional do Viruá, localizado em Roraima, é uma importante unidade de conservação da Amazônia brasileira. A região abriga uma grande diversidade de ecossistemas, incluindo florestas alagadas, campinaranas e áreas de transição entre diferentes formações vegetais.\n\nHistoricamente pouco ocupada, a área manteve grande preservação ambiental, tornando-se essencial para pesquisas científicas e conservação da biodiversidade. O parque também protege espécies endêmicas e contribui para o equilíbrio ecológico da região amazônica.\n\nAtualmente, o Viruá é referência em conservação ambiental e estudo dos ecossistemas amazônicos pouco explorados.`,
        image: forteDeSaoJoaquimImage,
        rating: 4
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

export default function Roraima() {
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
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Voltar</Text>
      </TouchableOpacity>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image source={headerImage} style={styles.headerImage} />
        </View>

        <AbasSwipe
          cor={"#8bc34a"}
          historia={
            <View style={styles.content}>
              <View style={styles.historyContainer}>
                <Text style={styles.historyTitle}>Fronteira Norte, Povos Indígenas e a Construção do Estado Mais Setentrional</Text>
              <Text style={styles.historySubtitle}>Povos Originários e a Ocupação Lenta</Text>
              <Text style={styles.historyText}>O território era ocupado por Macuxi, Wapichana, Taurepang e Yanomami. A presença europeia foi tardia devido ao difícil acesso. A ocupação intensificou-se apenas nos séculos XVIII e XIX, com expedições militares e missões religiosas.</Text>
              <Text style={styles.historySubtitle}>O Território Federal e Roraima</Text>
              <Text style={styles.historyText}>Em 1943, foi criado o Território Federal do Rio Branco. Em 1962, passou a se chamar Roraima, nome associado ao Monte Roraima. Com a Constituição de 1988, tornou-se estado, garantindo maior autonomia administrativa.</Text>
              <Text style={styles.historySubtitle}>O Monte Roraima e a Natureza</Text>
              <Text style={styles.historyText}>O Monte Roraima é uma das formações geológicas mais antigas do planeta, localizado na tríplice fronteira entre Brasil, Venezuela e Guiana. Possui grande importância espiritual para povos indígenas e é um dos destinos mais emblemáticos do ecoturismo brasileiro.</Text>
              <Text style={styles.historySubtitle}>Boa Vista e o Crescimento Urbano</Text>
              <Text style={styles.historyText}>A capital Boa Vista foi planejada com traçado moderno em formato radial, tornando-se principal centro político e econômico. Sua localização próxima à linha do Equador a torna uma das capitais mais singulares do Brasil.</Text>
              <Text style={styles.historySubtitle}>Roraima Contemporânea</Text>
              <Text style={styles.historyText}>O estado é o menos populoso do Brasil, mas possui grande importância estratégica na Amazônia e nas relações de fronteira com Venezuela e Guiana. A cultura indígena é fundamental para a identidade do estado.</Text>
              </View>
            </View>
          }
          culturaLocal={
            <View style={styles.content}>
              <LocalList sigla="RR" imagensLocais={{
              'Monte Roraima': monteRoraimaImage,
            }} />
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
  tabs: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, backgroundColor: '#f1f8e9' },
  tabButton: { paddingVertical: 8, paddingHorizontal: 25, borderRadius: 20 },
  activeTab: { backgroundColor: '#8bc34a' },
  tabText: { color: '#8bc34a', fontWeight: 'bold', fontSize: 16 },
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
