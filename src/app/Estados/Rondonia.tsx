import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AbasSwipe from '../../components/AbasSwipe';
import LocalList from '../../components/LocalList';
import { getPontosFavoritos, togglePontoFavorito } from '../../services/pontosFavoritos';

const headerImage = require('../../../assets/images/estados/ro.png');
const estradaDeFerroMadeiraMamoreImage = require('../../../assets/images/ro/estrada-de-ferro.png');
const festivalDeGuajaraMirimImage = require('../../../assets/images/ro/festival.png');
const fortePrincipeDaBeiraImage = require('../../../assets/images/ro/forte.png');

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
        name: 'Festival Folclórico de Guajará-Mirim',
        category: 'Evento',
        location: 'Guajará-Mirim',
        description: 'A disputa entre os bois-bumbás Malhadinho e Flor do Campo, uma festa de cores, ritmos e tradições.',
        modalDescription: `**Festival Folclórico de Guajará-Mirim**\n\n**Tradição, Identidade e Cultura Amazônica**\nO Festival Folclórico de Guajará-Mirim, em Rondônia, é uma das principais manifestações culturais da região amazônica de fronteira. Ele surgiu como forma de valorização das tradições locais, reunindo danças, músicas, lendas e expressões populares que refletem a mistura entre influências indígenas, migrantes brasileiros e culturas bolivianas próximas.\n\nO festival tem forte caráter comunitário e ajuda a preservar a memória cultural da região do rio Mamoré, sendo também um espaço de resistência cultural em uma área historicamente marcada pela ocupação recente e pela diversidade de povos.`,
        image: festivalDeGuajaraMirimImage,
        rating: 5
    },
    {
        name: 'Estrada de Ferro Madeira-Mamoré',
        category: 'Monumento',
        location: 'Porto Velho',
        description: 'A “Ferrovia do Diabo”, que custou a vida de milhares de trabalhadores, hoje um símbolo da saga da borracha.',
        modalDescription: `**Estrada de Ferro Madeira-Mamoré**\n\n**Integração, Borracha e História da Amazônia**\nA Estrada de Ferro Madeira-Mamoré foi construída no início do século XX em Rondônia, durante o ciclo da borracha. Seu objetivo era facilitar o escoamento da produção de látex, contornando as dificuldades de navegação nos rios Madeira e Mamoré.\n\nA obra foi extremamente difícil, marcada por doenças tropicais, condições precárias de trabalho e grande número de trabalhadores vindos de várias partes do mundo. Apesar disso, a ferrovia se tornou um marco da tentativa de integração da Amazônia ao restante do Brasil e simboliza um dos grandes projetos de infraestrutura do período.`,
        image: estradaDeFerroMadeiraMamoreImage,
        rating: 5
    },
    {
        name: 'Real Forte Príncipe da Beira',
        category: 'Monumento',
        location: 'Costa Marques',
        description: 'A maior edificação militar portuguesa construída no Brasil, um marco da disputa pela posse da Amazônia.',
        modalDescription: `**Real Forte Príncipe da Beira**\n\n**Defesa da Fronteira e Ocupação Colonial**\nO Real Forte Príncipe da Beira, localizado às margens do rio Guaporé em Rondônia, foi construído no século XVIII durante o período colonial português. Sua função principal era garantir a defesa da fronteira oeste do Brasil e consolidar a presença portuguesa na região amazônica.\n\nA fortaleza representa a estratégia militar de ocupação do interior do continente, em uma área de intensa disputa entre Portugal e Espanha. Hoje, é um dos mais importantes patrimônios históricos da Amazônia brasileira.`,
        image: fortePrincipeDaBeiraImage,
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

export default function Rondonia() {
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
          cor={"#cddc39"}
          historia={
            <View style={styles.content}>
              <View style={styles.historyContainer}>
                <Text style={styles.historyTitle}>Fronteira da Amazônia, Ferrovias e Formação de um Estado Recente</Text>
              <Text style={styles.historySubtitle}>Povos Originários e a Borracha</Text>
              <Text style={styles.historyText}>O território era habitado por Karipuna, Uru-Eu-Wau-Wau, Oro-Wari e outros grupos. No final do século XIX, o Ciclo da Borracha atraiu milhares de trabalhadores nordestinos, impulsionando a ocupação humana sob condições extremamente difíceis.</Text>
              <Text style={styles.historySubtitle}>A Estrada de Ferro Madeira-Mamoré</Text>
              <Text style={styles.historyText}>Construída no início do século XX para facilitar o transporte da borracha, a ferrovia foi marcada por doenças tropicais e grande mortalidade. Tornou-se símbolo histórico da tentativa de integração da Amazônia e da ocupação da região.</Text>
              <Text style={styles.historySubtitle}>O Território Federal e a Criação do Estado</Text>
              <Text style={styles.historyText}>Em 1943 foi criado o Território Federal do Guaporé, renomeado Rondônia em 1956 em homenagem ao marechal Cândido Rondon. Em 1981, foi elevado à categoria de estado, consolidando a autonomia política e administrativa da região.</Text>
              <Text style={styles.historySubtitle}>A Integração pela BR-364</Text>
              <Text style={styles.historyText}>A construção da BR-364 nas décadas de 1960 e 1970 transformou Rondônia, incentivando forte migração do Sul e Sudeste do Brasil, acelerando o crescimento populacional e urbano, mas também gerando pressão sobre a floresta.</Text>
              <Text style={styles.historySubtitle}>Rondônia Contemporânea</Text>
              <Text style={styles.historyText}>A economia é baseada em agropecuária, mineração e energia. Porto Velho é o principal centro político e econômico. O estado enfrenta desafios de preservação ambiental ao mesmo tempo em que expande sua produção agrícola.</Text>
              </View>
            </View>
          }
          culturaLocal={
            <View style={styles.content}>
              <LocalList sigla="RO" imagensLocais={{
              'Ferrovia Madeira-Mamoré': estradaDeFerroMadeiraMamoreImage,
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
  tabs: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, backgroundColor: '#f0f4c3' },
  tabButton: { paddingVertical: 8, paddingHorizontal: 25, borderRadius: 20 },
  activeTab: { backgroundColor: '#cddc39' },
  tabText: { color: '#cddc39', fontWeight: 'bold', fontSize: 16 },
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
