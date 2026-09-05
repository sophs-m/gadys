import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AbasSwipe from '../../components/AbasSwipe';
import LocalList from '../../components/LocalList';
import { getPontosFavoritos, togglePontoFavorito } from '../../services/pontosFavoritos';

const headerImage = require('../../../assets/images/estados/rs.png');
const revolucaoFarroupilhaImage = require('../../../assets/images/rs/canion.png');
const serraImage = require('../../../assets/images/rs/serra.png');

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
        name: 'Cânion Itaimbezinho',
        category: 'Monumento',
        location: 'Rio Grande do Sul',
        description: ' É uma das mais impressionantes formações geológicas do Brasil. O cânion é conhecido por suas majestosas paredes rochosas e é um dos principais atrativos do Parque Nacional Aparados da Serra, que também é um símbolo do turismo sustentável e da conservação ambiental.',
        modalDescription: `**Cânion Itaimbezinho**\n\n**Formação Geológica e Patrimônio Natural do Sul**\nO Cânion Itaimbezinho, localizado na divisa entre Rio Grande do Sul e Santa Catarina, é uma das formações geológicas mais impressionantes do Brasil. Ele foi esculpido ao longo de milhões de anos pela ação da erosão sobre rochas basálticas de antigas atividades vulcânicas.\n\nHistoricamente, a região era ocupada por povos indígenas como Kaingang e Xokleng, que conheciam profundamente os caminhos e recursos naturais dos campos de altitude. Com a colonização, o acesso à área permaneceu difícil por muito tempo, o que ajudou a preservar sua paisagem praticamente intocada.\n\nHoje, o Itaimbezinho é símbolo do ecoturismo e da preservação ambiental no sul do Brasil, sendo um dos cânions mais visitados do país.`,
        image: revolucaoFarroupilhaImage,
        rating: 4
    },

    {
      name: 'Serra Gaúcha',
      category: 'Outro',
      location: 'Rio Grande do Sul',
      description: 'É um acidente geográfico localizado no nordeste do Rio Grande do Sul. A região é marcada por montanhas, vales e uma rica biodiversidade. ',
      modalDescription: `**Serra Gaúcha**\n\n** Imigração, Cultura Europeia e Desenvolvimento Regional**\nA Serra Gaúcha, no nordeste do Rio Grande do Sul, tem sua história marcada pela imigração europeia, especialmente a partir do século XIX. Italianos, alemães e outros grupos chegaram à região e se estabeleceram em pequenas propriedades rurais, dando início a um modelo de colonização baseado na agricultura familiar.

Esse processo transformou profundamente a economia e a cultura local, influenciando a arquitetura, a culinária, os idiomas e as tradições festivas da região. Cidades como Gramado, Canela e Caxias do Sul se desenvolveram a partir dessas colônias, tornando-se importantes polos industriais e turísticos.

Atualmente, a Serra Gaúcha é um dos principais destinos turísticos do Brasil, conhecida pelo clima europeu, pela produção de vinhos e pelo forte setor industrial e de serviços.`,
      image: serraImage,
      rating: 4
  },
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

export default function RioGrandeDoSul() {
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
          cor={"#4caf50"}
          historia={
            <View style={styles.content}>
              <View style={styles.historyContainer}>
                <Text style={styles.historyTitle}>Fronteira, Guerras e a Formação da Identidade Gaúcha</Text>
              <Text style={styles.historySubtitle}>As Missões Jesuíticas e as Disputas de Fronteira</Text>
              <Text style={styles.historyText}>O território era habitado por Guaranis, Kaingang e Charruas. No século XVII, os jesuítas espanhóis criaram as Missões Jesuíticas. Nos séculos XVII e XVIII, o território foi marcado por disputas entre portugueses e espanhóis, com intensos conflitos pela região do Prata.</Text>
              <Text style={styles.historySubtitle}>A Revolução Farroupilha</Text>
              <Text style={styles.historyText}>O conflito começou como revolta contra os altos impostos sobre o charque produzido no estado. Os farroupilhas chegaram a proclamar a República Rio-Grandense. A guerra terminou em 1845, mas deixou forte legado na identidade política e cultural gaúcha.</Text>
              <Text style={styles.historySubtitle}>A Imigração Europeia</Text>
              <Text style={styles.historyText}>A partir do século XIX, o Rio Grande do Sul recebeu grandes fluxos de imigrantes alemães e italianos, que colonizaram áreas de floresta no norte do estado, introduziram novas técnicas agrícolas e contribuíram para a diversidade cultural, especialmente na Serra Gaúcha.</Text>
              <Text style={styles.historySubtitle}>Cultura Gaúcha</Text>
              <Text style={styles.historyText}>O chimarrão, o churrasco, as danças tradicionais e o vestuário típico fazem parte da identidade gaúcha. Os Centros de Tradições Gaúchas (CTGs) preservam essa herança. A Serra Gaúcha destaca-se pela produção vitivinícola e pelo turismo.</Text>
              <Text style={styles.historySubtitle}>O Rio Grande do Sul Contemporâneo</Text>
              <Text style={styles.historyText}>Atualmente, o estado mantém forte identidade cultural e relevância econômica, com destaque para agropecuária, indústria e serviços. Sua posição de fronteira com países do Mercosul favorece o comércio internacional.</Text>
              </View>
            </View>
          }
          culturaLocal={
            <View style={styles.content}>
              <LocalList sigla="RS" imagensLocais={{}} />
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
  tabs: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, backgroundColor: '#e8f5e9' },
  tabButton: { paddingVertical: 8, paddingHorizontal: 25, borderRadius: 20 },
  activeTab: { backgroundColor: '#4caf50' },
  tabText: { color: '#4caf50', fontWeight: 'bold', fontSize: 16 },
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
