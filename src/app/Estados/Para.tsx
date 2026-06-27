import AbasSwipe from '../../components/AbasSwipe';
import LocalList from '../../components/LocalList';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getPontosFavoritos, togglePontoFavorito } from '../../services/pontosFavoritos';

const headerImage = require('../../../assets/images/estados/pa.png');
const veropesoImage = require('../../../assets/images/pa/ver-o-peso.png');
const cirioImage = require('../../../assets/images/pa/cirio.png');
const marajoImage = require('../../../assets/images/pa/marajo.png');

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
        name: 'Círio de Nazaré',
        category: 'Evento',
        location: 'Belém',
        description: 'A maior festa religiosa do Brasil, uma procissão que reúne milhões de fiéis em devoção a Nossa Senhora de Nazaré.',
        modalDescription: `**Círio de Nazaré**\n\n**Fé, História e Identidade Amazônica**\nO Círio de Nazaré é uma das maiores manifestações religiosas do Brasil e ocorre anualmente em Belém, no estado do Pará. Sua origem remonta ao século XVIII, quando a imagem de Nossa Senhora de Nazaré foi encontrada por um caboclo às margens do igarapé Murucutu. A partir desse episódio, começou a devoção que daria origem à procissão.\n\nCom o tempo, o evento cresceu e passou a reunir milhões de fiéis, tornando-se uma das maiores romarias católicas do mundo. O Círio também reflete a mistura entre religiosidade, cultura amazônica e tradição popular, envolvendo promessas, procissões fluviais e manifestações culturais que vão além do aspecto religioso.`,
        image: cirioImage,
        rating: 5
    },
    {
        name: 'Mercado Ver-o-Peso',
        category: 'Monumento',
        location: 'Belém',
        description: 'Um dos mercados mais antigos do Brasil, com uma explosão de cores, cheiros e sabores amazônicos.',
        modalDescription: `**Mercado Ver-o-Peso**\n\n**Comércio, Cultura e História de Belém**\nO Mercado Ver-o-Peso, localizado em Belém do Pará, surgiu no período colonial como ponto de controle da entrada e saída de mercadorias na Amazônia. Seu nome vem da antiga função de fiscalizar o peso e a taxação dos produtos que chegavam à cidade.\n\nCom o tempo, o mercado se tornou um dos maiores centros de comércio popular da região Norte, reunindo produtos da floresta, ervas medicinais, peixes, frutas e alimentos típicos da Amazônia.\n\nMais do que um espaço econômico, o Ver-o-Peso é também um símbolo cultural, refletindo a diversidade e a identidade amazônica construída ao longo dos séculos.`,
        image: veropesoImage,
        rating: 5
    },
    {
        name: 'Ilha de Marajó',
        category: 'Outro',
        location: 'Marajó',
        description: 'A maior ilha fluviomarinha do mundo, com búfalos, praias selvagens e uma cultura única.',
        modalDescription: `**Ilha de Marajó**\n\n**Cultura Ribeirinha e Biodiversidade Amazônica**\nA Ilha de Marajó, localizada na foz do rio Amazonas, é a maior ilha fluviomarinha do mundo e possui uma história marcada pela presença de antigas civilizações indígenas marajoaras, conhecidas por sua cerâmica sofisticada e organização social complexa.\n\nDurante o período colonial, a região foi ocupada de forma esparsa devido às condições naturais, mas manteve forte presença de comunidades ribeirinhas que vivem em harmonia com os ciclos das águas.\n\nA cultura marajoara é uma das mais importantes da Amazônia, influenciando a arte, o artesanato e a identidade regional. Hoje, a ilha também se destaca pela pecuária bubalina, pelo turismo ecológico e pela preservação de ecossistemas únicos.`,
        image: marajoImage,
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

export default function Para() {
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
          cor={"#009688"}
          historia={
            <View style={styles.content}>
              <View style={styles.historyContainer}>
                <Text style={styles.historyTitle}>Amazônia, Rios Gigantes e a Formação de um Estado Estratégico</Text>
              <Text style={styles.historySubtitle}>Povos Originários e a Fundação de Belém</Text>
              <Text style={styles.historyText}>O Pará era habitado por Tupinambás, Mundurukus, Tapajós e Kayapó. Em 1616, os portugueses fundaram o Forte do Presépio, origem de Belém, principal ponto de controle da entrada ao interior da floresta amazônica.</Text>
              <Text style={styles.historySubtitle}>As Drogas do Sertão</Text>
              <Text style={styles.historyText}>A economia inicial baseava-se na coleta de produtos como cacau, baunilha, cravo e castanha-do-pará. Esses produtos foram fundamentais para integrar a Amazônia ao sistema colonial português.</Text>
              <Text style={styles.historySubtitle}>O Ciclo da Borracha</Text>
              <Text style={styles.historyText}>No final do século XIX, o Pará viveu grande prosperidade com o Ciclo da Borracha. Belém passou por intensa modernização, com construção de teatros, praças e mercados. O Mercado Ver-o-Peso tornou-se símbolo da relação entre a população e a biodiversidade amazônica.</Text>
              <Text style={styles.historySubtitle}>O Círio de Nazaré</Text>
              <Text style={styles.historyText}>O Círio de Nazaré é a maior manifestação religiosa da Amazônia, realizado anualmente em Belém. Reúne milhões de fiéis e foi reconhecido como Patrimônio Cultural Imaterial da Humanidade pela UNESCO.</Text>
              <Text style={styles.historySubtitle}>O Pará Contemporâneo</Text>
              <Text style={styles.historyText}>Atualmente, o Pará é um dos estados mais importantes da Amazônia, com economia baseada na mineração, agropecuária, energia e comércio exterior. Desempenha papel fundamental na preservação ambiental da floresta amazônica.</Text>
              </View>
            </View>
          }
          culturaLocal={
            <View style={styles.content}>
              <LocalList sigla="PA" imagensLocais={{
              'Alter do Chão': veropesoImage,
              'Mercado Ver-o-Peso': veropesoImage,
              'Ilha de Marajó': marajoImage,
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
  tabs: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, backgroundColor: '#e0f2f1' },
  tabButton: { paddingVertical: 8, paddingHorizontal: 25, borderRadius: 20 },
  activeTab: { backgroundColor: '#009688' },
  tabText: { color: '#009688', fontWeight: 'bold', fontSize: 16 },
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
