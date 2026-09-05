import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AbasSwipe from '../../components/AbasSwipe';
import LocalList from '../../components/LocalList';
import { getPontosFavoritos, togglePontoFavorito } from '../../services/pontosFavoritos';

const headerImage = require('../../../assets/images/estados/sc.png');
const oktoberfestImage = require('../../../assets/images/sc/oktoberfest.png');
const florianopolisImage = require('../../../assets/images/sc/florianopolis.png');
const serraImage = require('../../../assets/images/sc/serra-do-rio.png');

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
        name: 'Oktoberfest',
        category: 'Evento',
        location: 'Blumenau',
        description: 'A maior festa alemã das Américas, com muito chope, música, dança e comida típica.',
        modalDescription: `**Oktoberfest**\n\n**Imigração Alemã e Identidade Cultural em Santa Catarina**\nA Oktoberfest de Santa Catarina, especialmente a de Blumenau, surgiu na década de 1980 como uma forma de valorizar a herança dos imigrantes alemães que colonizaram o Vale do Itajaí a partir do século XIX. Esses imigrantes trouxeram tradições culturais, culinária, arquitetura e costumes que se mantiveram vivos nas comunidades locais.\n\nA festa foi inspirada na Oktoberfest original da Alemanha e se tornou um dos maiores eventos culturais do Brasil. Além da música e da dança, ela simboliza a preservação da identidade cultural germânica no sul do país e impulsiona fortemente o turismo regional.`,
        image: oktoberfestImage,
        rating: 5
    },
    {
        name: 'Florianopolis',
        category: 'Outro',
        location: 'Capital',
        description: 'É a capital do estado, conhecida como a "Ilha da Magia", a cidade é formada por um conjunto de ilhas e um trecho continental, sendo a Ilha de Santa Catarina a maior delas',
        modalDescription: `**Florianópolis**\n\n**Colonização Açoriana e Desenvolvimento Urbano**\nA cidade de Florianópolis, capital de Santa Catarina, teve sua origem no período colonial como Nossa Senhora do Desterro. Sua ocupação foi marcada principalmente pela chegada de imigrantes açorianos no século XVIII, que trouxeram influências culturais ainda visíveis na arquitetura, culinária e tradições locais.\n\nDurante o período imperial e republicano, a cidade se consolidou como centro administrativo e estratégico do litoral sul do Brasil. Com o tempo, passou por forte crescimento urbano e se tornou um dos principais destinos turísticos do país, conhecido por suas praias e qualidade de vida.`,
        image: florianopolisImage,
        rating: 5
    },
    {
        name: 'Serra do Rio Rastro',
        category: 'Outro',
        location: 'SC-390',
        description: 'Está situada entre os municípios de Lauro Müller e Bom Jardim da Serra. A estrada que atravessa a serra, é conhecida por suas 284 curvas e trechos íngremes, tornando-a uma das estradas mais famosas do Brasil e do mundo.',
        modalDescription: `**Serra do Rio do Rastro**\n\n**Engenharia, Paisagem e Desenvolvimento**\nA Serra do Rio do Rastro, localizada no sul de Santa Catarina, é conhecida por suas curvas sinuosas e paisagens impressionantes da Serra Geral. A estrada que corta a serra foi construída para conectar o litoral ao planalto, facilitando o transporte e a integração econômica da região.\n\nHistoricamente, a área era de difícil acesso, ocupada por comunidades rurais e marcada por atividades de agricultura e pecuária. Com a abertura da estrada, houve maior integração entre regiões e desenvolvimento turístico.\n\nHoje, a Serra do Rio do Rastro é um dos principais cartões-postais do estado, sendo referência em turismo de natureza e aventura.`,
        image: serraImage,
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

export default function SantaCatarina() {
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
          cor={"#2196f3"}
          historia={
            <View style={styles.content}>
              <View style={styles.historyContainer}>
                <Text style={styles.historyTitle}>Imigração Europeia, Fronteiras e a Construção do Sul Industrial</Text>
              <Text style={styles.historySubtitle}>Os Primeiros Povos e a Colonização</Text>
              <Text style={styles.historyText}>O território era habitado por Carijós, Kaingang e Xokleng. A presença portuguesa consolidou-se a partir do século XVII, com Florianópolis, inicialmente chamada Nossa Senhora do Desterro, tornando-se centro administrativo da região.</Text>
              <Text style={styles.historySubtitle}>A Imigração Europeia</Text>
              <Text style={styles.historyText}>A partir do século XIX, Santa Catarina recebeu grandes fluxos de imigrantes alemães, italianos, poloneses e açorianos, criando pequenas propriedades familiares. Cidades como Blumenau e Joinville cresceram a partir dessas comunidades, tornando-se polos industriais.</Text>
              <Text style={styles.historySubtitle}>A Guerra do Contestado</Text>
              <Text style={styles.historyText}>Entre 1912 e 1916, Santa Catarina foi palco da Guerra do Contestado, envolvendo disputas por terras, construção de ferrovias e expulsão de posseiros. O conflito teve forte caráter social e religioso, deixando profundas marcas na região.</Text>
              <Text style={styles.historySubtitle}>Cultura e Festas Típicas</Text>
              <Text style={styles.historyText}>A cultura catarinense combina influências europeias com tradições brasileiras. A Oktoberfest de Blumenau é a maior festa alemã das Américas. O litoral, com Florianópolis, Balneário Camboriú e Bombinhas, é um dos mais procurados do Brasil.</Text>
              <Text style={styles.historySubtitle}>Santa Catarina Contemporânea</Text>
              <Text style={styles.historyText}>Atualmente, é um dos estados mais desenvolvidos do Brasil, com altos índices de qualidade de vida. Sua economia combina indústria, agropecuária e turismo, sendo referência nacional em tecnologia, têxteis e exportação de alimentos.</Text>
              </View>
            </View>
          }
          culturaLocal={
            <View style={styles.content}>
              <LocalList sigla="SC" imagensLocais={{}} />
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
