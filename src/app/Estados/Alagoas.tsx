import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AbasSwipe from '../../components/AbasSwipe';
import LocalList from '../../components/LocalList';
import { getPontosFavoritos, togglePontoFavorito } from '../../services/pontosFavoritos';

const headerImage = require('../../../assets/images/estados/al.png');
const maragogiImage = require('../../../assets/images/al/maragogi.png');
const fozDoSaoFranciscoImage = require('../../../assets/images/al/foz-sao-francisco.png');
const artesanatoImage = require('../../../assets/images/al/artesanato.png');

const bomJesusImage = require('../../../assets/images/al/bom-jesus.png');

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
    name: 'Festa de Bom Jesus dos Navegantes',
    category: 'Evento',
    location: 'Salvador',
    description: 'Uma das maiores festas religiosas do estado, com uma procissão de barcos no Rio São Francisco.',
    modalDescription: `**Festa de Bom Jesus dos Navegantes**\n\n**Origem e Tradição Religiosa**\nA devoção a Bom Jesus dos Navegantes chegou ao litoral alagoano durante o período colonial, trazida pelos portugueses. A celebração surgiu da forte relação das comunidades costeiras e ribeirinhas com a navegação e a pesca, atividades essenciais para a sobrevivência da população local. Ao longo dos séculos, a festa consolidou-se como uma das mais importantes manifestações religiosas de Alagoas, reunindo procissões terrestres e fluviais, missas e celebrações populares.\n\n**Influência Cultural**\nAlém de expressar a fé da população, a festa fortalece os laços comunitários e preserva tradições que fazem parte da identidade alagoana. O evento também movimenta o turismo religioso e contribui para a valorização do patrimônio cultural do estado.`,
    image: bomJesusImage,
    rating: 4,
  },
  {
    name: 'Maragogi',
    category: 'Monumento',
    location: 'Maragogi',
    description: 'Conhecida como o Caribe Brasileiro, com piscinas naturais de águas cristalinas.',
    modalDescription: `**Maragogi**\n\n**Da Vila de Pescadores ao Polo Turístico**\nMaragogi teve origem como uma pequena comunidade dedicada à pesca e à agricultura. Com o passar do tempo, suas características naturais excepcionais passaram a atrair visitantes, especialmente devido às piscinas naturais formadas pelos recifes de corais. O município tornou-se um dos principais destinos turísticos do Nordeste e um dos cartões-postais de Alagoas.\n\n**Influência Econômica e Ambiental**\nO crescimento do turismo transformou a economia local, gerando empregos e impulsionando setores como hotelaria, gastronomia e transporte. Ao mesmo tempo, Maragogi tornou-se referência na preservação dos ecossistemas costeiros, destacando a importância da conservação ambiental para o desenvolvimento sustentável.`,
    image: maragogiImage,
    rating: 5,
  },
  {
    name: 'Foz do Rio São Francisco',
    category: 'Outro',
    location: 'Piaçabuçu',
    description: 'Um cenário deslumbrante onde o Velho Chico encontra o mar.',
    modalDescription: `**Foz do Rio São Francisco**\n\n**Um Marco Natural e Histórico**\nA Foz do Rio São Francisco representa o encontro entre o "Velho Chico" e o Oceano Atlântico, na divisa entre Alagoas e Sergipe. Desde os primeiros séculos da colonização, o rio desempenhou papel fundamental no transporte de pessoas, mercadorias e informações pelo interior do Brasil, sendo considerado um dos principais eixos de integração nacional.\n\n**Influência para a Região**\nAs comunidades estabelecidas ao longo do rio desenvolveram modos de vida fortemente ligados à pesca, à agricultura e à navegação. Atualmente, a Foz do São Francisco é um importante destino turístico e símbolo da riqueza natural brasileira, além de representar a importância histórica do rio para o desenvolvimento econômico e cultural do país.`,
    image: fozDoSaoFranciscoImage,
    rating: 5,
  },
  {
    name: 'Artesanato em Filé',
    category: 'Outro',
    location: 'Alagoas',
    description: 'Uma técnica de bordado única, que produz peças coloridas e delicadas.',
    modalDescription: `**Artesanato em Filé**\n\n**Origem nas Comunidades Pesqueiras**\nO artesanato em filé surgiu nas comunidades litorâneas de Alagoas, inspirado nas redes utilizadas pelos pescadores. As artesãs passaram a utilizar uma malha semelhante à das redes para criar bordados decorativos com padrões geométricos coloridos, transformando uma técnica simples em uma expressão artística reconhecida nacionalmente.\n\n**Influência Cultural e Econômica**\nTransmitido de geração em geração, o filé tornou-se um dos maiores símbolos da cultura alagoana. Além de preservar saberes tradicionais, a atividade gera renda para inúmeras famílias e fortalece o artesanato local. Suas peças são comercializadas em todo o Brasil, contribuindo para a divulgação da identidade cultural de Alagoas e para a valorização do trabalho artesanal.`,
    image: artesanatoImage,
    rating: 4,
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

export default function Alagoas() {
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
          cor={"#0097a7"}
          historia={
            <View style={styles.content}>
              <View style={styles.historyContainer}>
                <Text style={styles.historyTitle}>Dos Povos Indígenas ao Berço de Grandes Transformações do Brasil</Text>
              <Text style={styles.historySubtitle}>Os Primeiros Habitantes e a Colonização</Text>
              <Text style={styles.historyText}>Antes da chegada dos portugueses, o território era habitado por diversos povos indígenas, principalmente os Caetés. Durante o século XVI, os portugueses iniciaram a exploração da área como parte da Capitania de Pernambuco.</Text>
              <Text style={styles.historySubtitle}>A Economia Açucareira e a Escravidão</Text>
              <Text style={styles.historyText}>A partir do século XVII, Alagoas consolidou-se como uma das principais áreas produtoras de açúcar. O crescimento foi sustentado pelo trabalho de africanos escravizados, cuja presença influenciou profundamente a cultura alagoana.</Text>
              <Text style={styles.historySubtitle}>O Quilombo dos Palmares</Text>
              <Text style={styles.historyText}>Entre os séculos XVII e XVIII, desenvolveu-se na Serra da Barriga o Quilombo dos Palmares, o maior quilombo da história da América Portuguesa. Liderado por Zumbi dos Palmares, reuniu milhares de pessoas e foi destruído apenas em 1694.</Text>
              <Text style={styles.historySubtitle}>A Emancipação de Pernambuco</Text>
              <Text style={styles.historyText}>Alagoas permaneceu subordinada a Pernambuco até 1817. Como recompensa pela lealdade a Dom João VI durante a Revolução Pernambucana, o monarca assinou o alvará de emancipação política em 16 de setembro de 1817.</Text>
              <Text style={styles.historySubtitle}>O Império e a República</Text>
              <Text style={styles.historyText}>Alagoas é terra natal de Deodoro da Fonseca e Floriano Peixoto, dois personagens centrais na Proclamação da República em 1889. No século XIX, a capital foi transferida para Maceió em 1839.</Text>
              </View>
            </View>
          }
          culturaLocal={
            <View style={styles.content}>
              <LocalList sigla="AL" imagensLocais={{}} />
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
  tabs: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, backgroundColor: '#e0f7fa' },
  tabButton: { paddingVertical: 8, paddingHorizontal: 25, borderRadius: 20 },
  activeTab: { backgroundColor: '#0097a7' },
  tabText: { color: '#0097a7', fontWeight: 'bold', fontSize: 16 },
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
