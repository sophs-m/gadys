import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AbasSwipe from '../../components/AbasSwipe';
import LocalList from '../../components/LocalList';
import { getPontosFavoritos, togglePontoFavorito } from '../../services/pontosFavoritos';

const headerImage = require('../../../assets/images/estados/ap.png');
const marcoZeroImage = require('../../../assets/images/ap/marco-zero.png');
const fortalezaImage = require('../../../assets/images/ap/fortaleza.png');
const marabaixoImage = require('../../../assets/images/ap/marabaixo.png');

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
        name: 'Marabaixo', 
        category: 'Evento', 
        location: 'Amapá', 
        description: 'Expressão cultural afro-amapaense que mistura dança, música e religiosidade, celebrada principalmente na Páscoa.', 
        modalDescription: `**Marabaixo**\n\n**Origem e Resistência Cultural**\nO Marabaixo é uma das mais importantes manifestações culturais do Amapá, com raízes nas tradições afro-brasileiras trazidas pelos descendentes de africanos escravizados que viveram na região. Surgido entre os séculos XVIII e XIX, o Marabaixo combina dança, música, religiosidade e celebração comunitária, sendo tradicionalmente realizado durante festividades ligadas ao Divino Espírito Santo e à Santíssima Trindade.\n\n**Influência na Identidade Amapaense**\nMais do que uma expressão artística, o Marabaixo representa a resistência cultural e a preservação da memória das comunidades negras do Amapá. Seus tambores, cantos e danças ajudam a transmitir conhecimentos e tradições entre gerações, tornando-se um dos principais símbolos da identidade cultural amapaense.`,
        image: marabaixoImage, 
        rating: 4 
    },
    { 
        name: 'Marco Zero', 
        category: 'Monumento', 
        location: 'Macapá', 
        description: 'Monumento que marca a passagem da linha do Equador, onde é possível estar nos dois hemisférios ao mesmo tempo.', 
        modalDescription: `**Marco Zero**\n\n**O Encontro com a Linha do Equador**\nLocalizado em Macapá, o Marco Zero é um monumento construído para marcar a passagem da Linha do Equador pelo estado do Amapá. Inaugurado no final do século XX, o local permite que visitantes observem e atravessem simbolicamente a divisão entre os hemisférios Norte e Sul.\n\n**Importância Turística e Científica**\nO monumento tornou-se um dos principais cartões-postais do estado e um símbolo da posição geográfica privilegiada do Amapá. Além de atrair turistas, o espaço promove atividades educativas relacionadas à astronomia, geografia e à importância da Linha do Equador para os estudos científicos.`,
        image: marcoZeroImage, 
        rating: 5 
    },
    { 
        name: 'Fortaleza de São José de Macapá', 
        category: 'Monumento', 
        location: 'Macapá', 
        description: 'Uma das maiores fortalezas do Brasil Colônia, construída para defender a Amazônia de invasões estrangeiras.',
        modalDescription: `**Fortaleza de São José de Macapá**\n\n**Defesa da Amazônia Portuguesa**\nConstruída entre 1764 e 1782 por ordem da Coroa Portuguesa, a Fortaleza de São José de Macapá foi erguida para proteger a região amazônica contra possíveis invasões estrangeiras e garantir o domínio português sobre o extremo norte do território brasileiro. Sua construção envolveu trabalhadores indígenas, africanos escravizados e colonos portugueses.\n\n**Patrimônio Histórico Nacional**\nConsiderada uma das maiores fortificações militares coloniais do Brasil, a fortaleza é um importante marco da ocupação portuguesa na Amazônia. Atualmente, é reconhecida como patrimônio histórico e cultural, preservando parte significativa da história da formação territorial do país e da cidade de Macapá.`,
        image: fortalezaImage, 
        rating: 5 
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

export default function Amapa() {
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
          cor={"#ff9800"}
          historia={
            <View style={styles.content}>
              <View style={styles.historyContainer}>
                <Text style={styles.historyTitle}>A Fronteira Amazônica e a Consolidação do Extremo Norte Brasileiro</Text>
              <Text style={styles.historySubtitle}>Os Primeiros Povos da Região</Text>
              <Text style={styles.historyText}>O território do atual Amapá era habitado por povos como Palikur, Galibi, Karipuna e Waiãpi, que desenvolveram modos de vida adaptados aos rios, florestas e áreas costeiras da Amazônia.</Text>
              <Text style={styles.historySubtitle}>Disputas Coloniais pelo Território</Text>
              <Text style={styles.historyText}>Durante os séculos XVI e XVII, portugueses, franceses, holandeses e ingleses disputaram o controle da região. Os portugueses construíram a Fortaleza de São José de Macapá (1764–1782) para garantir sua soberania no extremo norte da colônia.</Text>
              <Text style={styles.historySubtitle}>A Questão do Amapá</Text>
              <Text style={styles.historyText}>Durante o século XIX, a França reivindicava parte do território entre o Rio Oiapoque e o Rio Araguari. Em 1900, a arbitragem internacional decidiu favoravelmente ao Brasil, consolidando definitivamente as fronteiras do país no extremo norte.</Text>
              <Text style={styles.historySubtitle}>A Criação do Território Federal</Text>
              <Text style={styles.historyText}>Em 1943, durante o governo de Getúlio Vargas, foi criado o Território Federal do Amapá, trazendo investimentos em infraestrutura, educação, saúde e administração pública.</Text>
              <Text style={styles.historySubtitle}>A Transformação em Estado</Text>
              <Text style={styles.historyText}>Com a Constituição Federal de 1988, o Amapá foi elevado à categoria de estado, ampliando sua autonomia política e administrativa, com Macapá como capital.</Text>
              </View>
            </View>
          }
          culturaLocal={
            <View style={styles.content}>
              <LocalList sigla="AP" imagensLocais={{
              'Marco Zero': marcoZeroImage,
              'Fortaleza de São José de Macapá': fortalezaImage,
              'Marabaixo': marabaixoImage,
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
  tabs: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, backgroundColor: '#fff5e6' },
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
