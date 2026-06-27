import AbasSwipe from '../../components/AbasSwipe';
import LocalList from '../../components/LocalList';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getPontosFavoritos, togglePontoFavorito } from '../../services/pontosFavoritos';

const headerImage = require('../../../assets/images/estados/pi.png');
const serraDaCapivaraImage = require('../../../assets/images/pi/serra-da-capivara.png');
const deltaDoParnaibaImage = require('../../../assets/images/pi/delta-do-parnaiba.png');
const batalhaDoJenipapoImage = require('../../../assets/images/pi/batalha-do-jenipapo.png');

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
        name: 'Batalha do Jenipapo',
        category: 'Evento',
        location: 'Campo Maior',
        description: 'Enfrentamento sangrento decisivo para a independência do Brasil, hoje celebrado com encenações e festas.',
        modalDescription: `**Batalha do Jenipapo**\n\n**Independência e Resistência no Piauí**\nA Batalha do Jenipapo, ocorrida em 1823 às margens do rio Jenipapo, no Piauí, foi um dos episódios mais importantes do processo de independência do Brasil no Norte e Nordeste. Mesmo após a proclamação da independência em 1822, tropas portuguesas ainda resistiam em algumas regiões do país.\n\nNo Piauí, civis, sertanejos e poucos soldados locais enfrentaram forças militares portuguesas muito mais bem armadas. A luta foi extremamente desigual e resultou em muitas perdas para os piauienses, mas teve grande importância simbólica: ajudou a consolidar a expulsão dos portugueses e a garantir a adesão da província ao Brasil independente.`,
        image: batalhaDoJenipapoImage,
        rating: 4
    },
    {
        name: 'Serra da Capivara',
        category: 'Monumento',
        location: 'São Raimundo Nonato',
        description: 'Parque nacional com a maior concentração de arte rupestre do mundo, um mergulho na pré-história.',
        modalDescription: `**Serra da Capivara**\n\n**Berço da História Humana nas Américas**\nA Serra da Capivara, localizada no sudeste do Piauí, é um dos mais importantes sítios arqueológicos do mundo. A região abriga milhares de pinturas rupestres em paredões de pedra, além de vestígios de antigas ocupações humanas.\n\nEstudos arqueológicos indicam que a área pode ter sido habitada há dezenas de milhares de anos, o que coloca a Serra da Capivara no centro de debates sobre a chegada dos primeiros humanos às Américas.\n\nAlém de sua importância científica, o parque também é fundamental para a preservação ambiental e cultural, sendo reconhecido como Patrimônio Mundial pela UNESCO.`,
        image: serraDaCapivaraImage,
        rating: 5
    },
    {
        name: 'Delta do Parnaíba',
        category: 'Monumento',
        location: 'Parnaíba',
        description: 'O único delta das Américas que deságua em mar aberto, um labirinto de ilhas, dunas e mangues.',
        modalDescription: `**Delta do Parnaíba**\n\n**Encontro de Águas e Biodiversidade Única**\nO Delta do Parnaíba, localizado entre os estados do Piauí e Maranhão, é o único delta em mar aberto das Américas. Formado pelo rio Parnaíba, ele se divide em vários braços antes de desaguar no Oceano Atlântico, criando ilhas, manguezais e canais.\n\nA região possui grande importância ecológica, abrigando rica biodiversidade, incluindo aves migratórias, peixes e espécies típicas de manguezal. Historicamente, o delta também foi utilizado como rota de navegação e pesca pelas populações locais.\n\nHoje, o Delta do Parnaíba é um importante destino de ecoturismo, destacando-se pela beleza natural e pela preservação dos ecossistemas costeiros.`,
        image: deltaDoParnaibaImage,
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

export default function Piaui() {
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
      <TouchableOpacity onPress={() => router.push('/lugares')} style={styles.backButton}>
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
                <Text style={styles.historyTitle}>Entre o Sertão, os Povos Indígenas e a Formação do Nordeste Interiorano</Text>
              <Text style={styles.historySubtitle}>A Colonização pelo Interior</Text>
              <Text style={styles.historyText}>Diferente de outras regiões do Nordeste, o Piauí não se desenvolveu pelo litoral. A colonização ocorreu pelo interior, impulsionada pela pecuária vinda da Bahia e Pernambuco, ao longo dos rios Parnaíba e afluentes. A Capitania do Piauí foi criada no século XVIII com capital em Oeiras.</Text>
              <Text style={styles.historySubtitle}>A Transferência da Capital para Teresina</Text>
              <Text style={styles.historyText}>Em 1852, a capital foi transferida para a recém-planejada Teresina. Foi a primeira capital planejada do país, construída às margens dos rios Parnaíba e Poti, facilitando o comércio fluvial e o crescimento urbano.</Text>
              <Text style={styles.historySubtitle}>A Batalha do Jenipapo</Text>
              <Text style={styles.historyText}>Em 1823, às margens do rio Jenipapo, civis e sertanejos enfrentaram tropas portuguesas bem armadas. A luta ajudou a consolidar a expulsão dos portugueses e a garantir a adesão da província ao Brasil independente, tornando-se símbolo de resistência.</Text>
              <Text style={styles.historySubtitle}>Cultura Sertaneja e a Serra da Capivara</Text>
              <Text style={styles.historyText}>O Piauí desenvolveu uma forte identidade ligada ao sertão e à figura do vaqueiro. A Serra da Capivara é um dos mais importantes sítios arqueológicos do mundo, com pinturas rupestres que podem indicar presença humana há dezenas de milhares de anos, sendo Patrimônio Mundial pela UNESCO.</Text>
              <Text style={styles.historySubtitle}>O Piauí Contemporâneo</Text>
              <Text style={styles.historyText}>O estado investe em energia eólica e solar, aproveitando suas condições climáticas favoráveis, tornando-se um dos maiores produtores de energias renováveis do Brasil. O Delta do Parnaíba, único delta em mar aberto das Américas, é outro destaque natural.</Text>
              </View>
            </View>
          }
          culturaLocal={
            <View style={styles.content}>
              <LocalList sigla="PI" imagensLocais={{}} />
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
