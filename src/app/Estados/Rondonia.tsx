import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const headerImage = require('../../../assets/images/ro/estrada-de-ferro.png');
const madeiraMamoreImage = require('../../../assets/images/ro/estrada-de-ferro.png');
const festivalImage = require('../../../assets/images/ro/festival.png');
const usinaImage = require('../../../assets/images/ro/usina.png');
const forteImage = require('../../../assets/images/ro/forte.png');

interface Place {
  name: string;
  category: 'Monumento' | 'Evento' | 'Comida Típica' | 'Outro';
  location: string;
  description: string;
  image: any;
  rating: number;
}

const places: Place[] = [
  { name: 'Estrada de Ferro Madeira-Mamoré', category: 'Monumento', location: 'Porto Velho', description: 'A lendária ferrovia construída na selva amazônica, um marco da engenharia e da história da região.', image: madeiraMamoreImage, rating: 5 },
  { name: 'Festival Folclórico de Guajará-Mirim', category: 'Evento', location: 'Guajará-Mirim', description: 'Uma disputa entre os bois-bumbás Malhadinho e Flor do Campo, com muita música e dança.', image: festivalImage, rating: 4 },
  { name: 'Usina Hidrelétrica de Santo Antônio', category: 'Outro', location: 'Porto Velho', description: 'Uma das maiores usinas hidrelétricas do Brasil, um gigante da engenharia em meio à floresta amazônica.', image: usinaImage, rating: 5 },
  { name: 'Real Forte Príncipe da Beira', category: 'Monumento', location: 'Costa Marques', description: 'A maior fortaleza portuguesa construída no Brasil, um marco da colonização na Amazônia.', image: forteImage, rating: 5 },
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

export default function Rondonia() {
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
              <Text style={styles.historyTitle}>A Ferrovia do Diabo e as Fronteiras de Rondon</Text>
              <Text style={styles.historyText}>Rondônia é um estado moldado pela engenharia, pela extração de riquezas tropicais e por fluxos migratórios incentivados pelo Estado brasileiro.</Text>
              <Text style={styles.historySubtitle}>A Madeira-Mamoré e o Tratado de Petrópolis</Text>
              <Text style={styles.historyText}>A história da região acelerou com o Tratado de Petrópolis em 1903. Para indenizar a Bolívia pela compra do Acre, o Brasil comprometeu-se a erguer a Estrada de Ferro Madeira-Mamoré (1907–1912). A obra enfrentou surtos severos de malária e febre amarela, custando a vida de milhares de trabalhadores, dando à linha o apelido de "Ferrovia do Diabo". Porto Velho surgiu como acampamento de obras desse projeto.</Text>
              <Text style={styles.historySubtitle}>O Território do Guaporé e a Marcha Agrícola</Text>
              <Text style={styles.historyText}>Em 1943, Vargas criou o Território Federal do Guaporé, rebatizado de Rondônia em 1956 em homenagem ao Marechal Rondon. Nas décadas de 1970 e 1980, os governos militares promoveram a ocupação com a abertura da rodovia BR-364, atraindo milhares de agricultores sulistas e culminando na elevação a Estado em 1981.</Text>
            </View>
          ) : renderCulturaLocal()}
        </View>
      </ScrollView>
      <PlaceModal place={selectedPlace} visible={modalVisible} onClose={closeModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fbe7' },
  header: { height: 250 },
  headerImage: { width: '100%', height: '100%' },
  backButton: { position: 'absolute', top: 40, left: 20, zIndex: 10, backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20 },
  backButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  tabs: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, backgroundColor: '#f9fbe7' },
  tabButton: { paddingVertical: 8, paddingHorizontal: 25, borderRadius: 20 },
  activeTab: { backgroundColor: '#827717' },
  tabText: { color: '#827717', fontWeight: 'bold', fontSize: 16 },
  activeTabText: { color: '#fff' },
  content: { padding: 20 },
  historyContainer: { backgroundColor: '#fff', borderRadius: 15, padding: 20 },
  historyTitle: { fontSize: 22, fontWeight: 'bold', color: '#827717', marginBottom: 15, textAlign: 'center' },
  historySubtitle: { fontSize: 18, fontWeight: 'bold', color: '#827717', marginTop: 15, marginBottom: 5 },
  historyText: { fontSize: 16, color: '#333', lineHeight: 24, marginBottom: 10 },
  categoryHeader: { fontSize: 20, fontWeight: 'bold', color: '#827717', marginTop: 15, marginBottom: 5 },
  separator: { height: 1, backgroundColor: '#f0f4c3', marginVertical: 10, marginBottom: 15 },
  card: { backgroundColor: '#fff', borderRadius: 15, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  cardImage: { width: '100%', height: 150, borderTopLeftRadius: 15, borderTopRightRadius: 15 },
  cardContent: { padding: 15 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#827717' },
  cardCategory: { fontSize: 14, color: '#666', marginVertical: 5 },
  cardDescription: { fontSize: 14, color: '#333' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: '#fff', borderRadius: 15, padding: 20, width: '80%', alignItems: 'center' },
  modalImage: { width: '100%', height: 150, borderRadius: 15, marginBottom: 15 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#827717', marginBottom: 5 },
  modalCategory: { fontSize: 16, color: '#666', marginBottom: 10 },
  modalDescription: { fontSize: 16, color: '#333', textAlign: 'center', marginBottom: 20 },
  closeButton: { backgroundColor: '#827717', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20 },
  closeButtonText: { color: '#fff', fontSize: 16 },
});
