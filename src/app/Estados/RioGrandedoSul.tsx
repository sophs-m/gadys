import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const headerImage = require('../../../assets/images/rs/canion.png');
const canionImage = require('../../../assets/images/rs/canion.png');
const serraImage = require('../../../assets/images/rs/serra.png');

interface Place {
  name: string;
  category: 'Monumento' | 'Evento' | 'Comida Típica' | 'Outro';
  location: string;
  description: string;
  image: any;
  rating: number;
}

const places: Place[] = [
  { name: 'Cânion Itaimbezinho', category: 'Outro', location: 'Cambará do Sul', description: 'Um dos maiores cânions do Brasil, com paredes de até 720 metros e uma paisagem de tirar o fôlego.', image: canionImage, rating: 5 },
  { name: 'Serra Gaúcha', category: 'Outro', location: 'Rio Grande do Sul', description: 'Região de colonização alemã e italiana, com paisagens deslumbrantes, vinícolas e cidades charmosas como Gramado e Canela.', image: serraImage, rating: 5 },
];

const PlaceCard = ({ place, onPress }: { place: Place; onPress: (place: Place) => void }) => (
  <TouchableOpacity onPress={() => onPress(place)}>
    <View style={styles.card}>
      <Image source={place.image} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{place.name}</Text>
        <Text style={styles.cardCategory}>{place.category} • {place.location}</Text>
        <Text style={styles.cardDescription}>{place.description}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const PlaceModal = ({ place, visible, onClose }: { place: Place | null; visible: boolean; onClose: () => void }) => {
  if (!place) return null;
  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Image source={place.image} style={styles.modalImage} />
          <Text style={styles.modalTitle}>{place.name}</Text>
          <Text style={styles.modalCategory}>{place.category} • {place.location}</Text>
          <Text style={styles.modalDescription}>{place.description}</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default function RioGrandedoSul() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Historia');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const openModal = useCallback((place: Place) => { setSelectedPlace(place); setModalVisible(true); }, []);
  const closeModal = useCallback(() => { setModalVisible(false); setSelectedPlace(null); }, []);

  const renderCulturaLocal = () => {
    const categories: Place['category'][] = ['Evento', 'Monumento', 'Comida Típica', 'Outro'];
    return categories.map(category => {
      const filtered = places.filter(p => p.category === category);
      if (filtered.length === 0) return null;
      return (
        <View key={category}>
          <Text style={styles.categoryHeader}>{category}</Text>
          <View style={styles.separator} />
          {filtered.map(p => <PlaceCard key={p.name} place={p} onPress={openModal} />)}
        </View>
      );
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => router.push('/estados')} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Voltar</Text>
      </TouchableOpacity>
      <ScrollView style={styles.container}>
        <View style={styles.header}><Image source={headerImage} style={styles.headerImage} /></View>
        <View style={styles.tabs}>
          <TouchableOpacity onPress={() => setActiveTab('Historia')} style={[styles.tabButton, activeTab === 'Historia' && styles.activeTab]}>
            <Text style={[styles.tabText, activeTab === 'Historia' && styles.activeTabText]}>História</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('Cultura Local')} style={[styles.tabButton, activeTab === 'Cultura Local' && styles.activeTab]}>
            <Text style={[styles.tabText, activeTab === 'Cultura Local' && styles.activeTabText]}>Cultura Local</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          {activeTab === 'Historia' ? (
            <View style={styles.historyContainer}>
              <Text style={styles.historyTitle}>A Fronteira Gaúcha e a Epopeia da Revolução Farroupilha</Text>
              <Text style={styles.historyText}>O Rio Grande do Sul se forjou como uma província militarizada, em meio a disputas fronteiriças entre as coroas ibéricas e a rebeldia dos farrapos, que forjaram a identidade do gaúcho.</Text>
              <Text style={styles.historySubtitle}>O Tratado de Madri e as Missões Jesuíticas</Text>
              <Text style={styles.historyText}>Em 1750, o Tratado de Madri determinou a troca da Colônia do Sacramento pelos Sete Povos das Missões. A recusa dos índios guaranis em abandonar as missões deu início à Guerra Guaranítica. A região foi, então, aberta à pecuária extensiva, consolidando a criação de gado como a principal atividade econômica do pampa gaúcho.</Text>
              <Text style={styles.historySubtitle}>A Revolução Farroupilha e a Imigração Europeia</Text>
              <Text style={styles.historyText}>A insatisfação com a política tarifária do Império levou à eclosão da Revolução Farroupilha (1835–1845), a mais longa guerra civil brasileira. Os revoltosos proclamaram a República Rio-Grandense e lutaram por uma década. No fim do século XIX, o estado passou a receber colonos alemães e italianos na Serra Gaúcha, diversificando a economia com a produção de uva e vinho.</Text>
            </View>
          ) : renderCulturaLocal()}
        </View>
      </ScrollView>
      <PlaceModal place={selectedPlace} visible={modalVisible} onClose={closeModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f8e9' },
  header: { height: 250 },
  headerImage: { width: '100%', height: '100%' },
  backButton: { position: 'absolute', top: 40, left: 20, zIndex: 10, backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20 },
  backButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  tabs: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, backgroundColor: '#f1f8e9' },
  tabButton: { paddingVertical: 8, paddingHorizontal: 25, borderRadius: 20 },
  activeTab: { backgroundColor: '#8bc34a' },
  tabText: { color: '#8bc34a', fontWeight: 'bold', fontSize: 16 },
  activeTabText: { color: '#fff' },
  content: { padding: 20 },
  historyContainer: { backgroundColor: '#fff', borderRadius: 15, padding: 20 },
  historyTitle: { fontSize: 22, fontWeight: 'bold', color: '#8bc34a', marginBottom: 15, textAlign: 'center' },
  historySubtitle: { fontSize: 18, fontWeight: 'bold', color: '#8bc34a', marginTop: 15, marginBottom: 5 },
  historyText: { fontSize: 16, color: '#333', lineHeight: 24, marginBottom: 10 },
  categoryHeader: { fontSize: 20, fontWeight: 'bold', color: '#8bc34a', marginTop: 15, marginBottom: 5 },
  separator: { height: 1, backgroundColor: '#dcedc8', marginVertical: 10, marginBottom: 15 },
  card: { backgroundColor: '#fff', borderRadius: 15, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  cardImage: { width: '100%', height: 150, borderTopLeftRadius: 15, borderTopRightRadius: 15 },
  cardContent: { padding: 15 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#8bc34a' },
  cardCategory: { fontSize: 14, color: '#666', marginVertical: 5 },
  cardDescription: { fontSize: 14, color: '#333' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: '#fff', borderRadius: 15, padding: 20, width: '80%', alignItems: 'center' },
  modalImage: { width: '100%', height: 150, borderRadius: 15, marginBottom: 15 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#8bc34a', marginBottom: 5 },
  modalCategory: { fontSize: 16, color: '#666', marginBottom: 10 },
  modalDescription: { fontSize: 16, color: '#333', textAlign: 'center', marginBottom: 20 },
  closeButton: { backgroundColor: '#8bc34a', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20 },
  closeButtonText: { color: '#fff', fontSize: 16 },
});
