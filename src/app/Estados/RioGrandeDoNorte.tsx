import AbasSwipe from '../../components/AbasSwipe';
import LocalList from '../../components/LocalList';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getPontosFavoritos, togglePontoFavorito } from '../../services/pontosFavoritos';

const headerImage = require('../../../assets/images/estados/rn.png');
const parrachosImage = require('../../../assets/images/rn/parrachos.png');
const maiorCajueiroImage = require('../../../assets/images/rn/festa.png');
const forteDosReisMagosImage = require('../../../assets/images/rn/forte.png');

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
        name: "Festa de Sant'Ana",
        category: 'Monumento',
        location: 'Currais Novos',
        description: "É um evento que celebra a tradição religiosa e cultural do Seridó potiguar. Inclui missas, novenário, apresentações culturais, feiras de artesanato e shows musicais.",
        modalDescription: `**Festa de Sant'Ana**\n\n**Devoção, Tradição e Cultura Popular do Nordeste**\nA Festa de Sant'Ana é uma das celebrações religiosas mais antigas do Brasil, com forte presença no Nordeste. Sua origem está ligada à tradição católica trazida pelos portugueses durante o período colonial, quando a devoção a Sant'Ana, mãe de Maria, foi amplamente difundida nas vilas e cidades do interior.\n\nCom o tempo, a festa deixou de ser apenas religiosa e passou a incorporar elementos da cultura popular, como procissões, quermesses, festas de rua e apresentações culturais. Em muitas cidades, ela também marca momentos importantes do calendário social e econômico local, reforçando a identidade comunitária e a herança histórica do interior brasileiro.`,
        image: maiorCajueiroImage,
        rating: 5
    },
    {
        name: 'Forte dos Reis Magos',
        category: 'Outro',
        location: 'Extremoz',
        description: 'A fortaleza em forma de estrela que deu origem à cidade de Natal, um marco da história do Brasil',
        modalDescription: `**Festa dos Reis Magos**\n\n**Fé e Herança Colonial no Litoral Potiguar**\nA Festa dos Reis Magos tem origem na tradição cristã que celebra a visita dos três Reis Magos ao menino Jesus. No Rio Grande do Norte, essa devoção foi introduzida durante o período colonial, especialmente com a presença portuguesa no litoral.\n\nA celebração está diretamente ligada à fundação de Natal e ao Forte dos Reis Magos, construído no final do século XVI para proteção da região. Com o tempo, a festa passou a unir elementos religiosos e culturais, incluindo missas, procissões e eventos populares, fortalecendo a identidade histórica da capital potiguar.`,
        image: forteDosReisMagosImage,
        rating: 5
    },
    {
        name: 'Parrachos de Maracajaú',
        category: 'Monumento',
        location: 'Natal',
        description: 'São recifes de corais formando piscinas naturais de águas cristalinas ideais para mergulho e snorkel.',
        modalDescription: `**Parrachos de Maracajaú**\n\n**História Natural e Turismo Sustentável no Rio Grande do Norte**\nOs Parrachos de Maracajaú, localizados no litoral do Rio Grande do Norte, são formações de recifes de corais conhecidas por suas águas cristalinas e grande biodiversidade marinha. Historicamente, a região foi utilizada por comunidades pesqueiras tradicionais que dependiam diretamente dos recursos do mar.\n\nCom o avanço do turismo no século XX, os parrachos se tornaram um dos principais destinos ecológicos do estado, atraindo visitantes para mergulho e observação da vida marinha. Hoje, são um exemplo de integração entre preservação ambiental e desenvolvimento turístico sustentável no litoral nordestino.`,
        image: parrachosImage,
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

export default function RioGrandeDoNorte() {
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
          cor={"#ff9800"}
          historia={
            <View style={styles.content}>
              <View style={styles.historyContainer}>
                <Text style={styles.historyTitle}>Ventos, Sal e a Formação do Nordeste Litorâneo</Text>
              <Text style={styles.historySubtitle}>Os Primeiros Povos e a Fundação de Natal</Text>
              <Text style={styles.historyText}>O território era habitado por Potiguaras, Tapuias e Tarairiús. Em 1599 foi fundada Natal, com a construção do Forte dos Reis Magos para garantir o controle português sobre o litoral e expulsar invasores estrangeiros.</Text>
              <Text style={styles.historySubtitle}>A Economia do Sal e do Algodão</Text>
              <Text style={styles.historyText}>O Rio Grande do Norte destacou-se historicamente pela produção de sal marinho nas regiões de Mossoró e Macau. No século XIX, o algodão também ganhou importância, impulsionado pela demanda internacional. Essas atividades contribuíram para o crescimento de cidades e para a integração ao comércio internacional.</Text>
              <Text style={styles.historySubtitle}>Resistência e Pioneirismo</Text>
              <Text style={styles.historyText}>Em 1883, Mossoró aboliu a escravidão antes da Lei Áurea, tornando-se símbolo de resistência. Em 1927, a cidade resistiu ao ataque de Lampião, sendo outro episódio marcante da identidade potiguar.</Text>
              <Text style={styles.historySubtitle}>Turismo e Belezas Naturais</Text>
              <Text style={styles.historyText}>O litoral potiguar é conhecido por suas dunas, falésias e praias de águas claras. Natal é um dos principais destinos turísticos do Nordeste. Os Parrachos de Maracajaú são formações de recifes de corais com rica biodiversidade marinha.</Text>
              <Text style={styles.historySubtitle}>O Rio Grande do Norte Contemporâneo</Text>
              <Text style={styles.historyText}>A presença de ventos constantes tornou o estado um dos maiores produtores de energia eólica do Brasil. A economia combina turismo, sal, petróleo e energias renováveis, mantendo forte identidade cultural nordestina.</Text>
              </View>
            </View>
          }
          culturaLocal={
            <View style={styles.content}>
              <LocalList sigla="RN" imagensLocais={{}} />
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
  tabs: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, backgroundColor: '#fff3e0' },
  tabButton: { paddingVertical: 8, paddingHorizontal: 25, borderRadius: 20 },
  activeTab: { backgroundColor: '#ff9800' },
  tabText: { color: '#ff9800', fontWeight: 'bold', fontSize: 16 },
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
