import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const headerImage = require('../../../assets/images/pa/ver-o-peso.png');
const veropesoImage = require('../../../assets/images/pa/ver-o-peso.png');
const cirioImage = require('../../../assets/images/pa/cirio.png');
const marajoImage = require('../../../assets/images/pa/marajo.png');

interface Place {
  name: string;
  category: 'Monumento' | 'Evento' | 'Comida Típica' | 'Outro';
  location: string;
  description: string;
  image: any;
  rating: number;
}

const places: Place[] = [
  { name: 'Mercado Ver-o-Peso', category: 'Monumento', location: 'Belém', description: 'Um dos mercados mais antigos do Brasil, com uma explosão de cores, cheiros e sabores amazônicos.', image: veropesoImage, rating: 5 },
  { name: 'Círio de Nazaré', category: 'Evento', location: 'Belém', description: 'A maior festa religiosa do Brasil, uma procissão que reúne milhões de fiéis em devoção a Nossa Senhora de Nazaré.', image: cirioImage, rating: 5 },
  { name: 'Ilha de Marajó', category: 'Outro', location: 'Marajó', description: 'A maior ilha fluviomarinha do mundo, com búfalos, praias selvagens e uma cultura única.', image: marajoImage, rating: 5 },
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

export default function Para() {
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
        <View style={styles.header}>
          <Image source={headerImage} style={styles.headerImage} />
        </View>
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
              <Text style={styles.historyTitle}>O Isolamento do Grão-Pará e o Sangue da Cabanagem</Text>
              <Text style={styles.historyText}>O Pará desenvolveu-se como uma colônia quase independente do restante do Brasil, marcada por uma floresta impenetrável e por intensas revoltas sociais.</Text>
              <Text style={styles.historySubtitle}>O Forte do Presépio e a Distância da Corte</Text>
              <Text style={styles.historyText}>A fundação de Belém em 1616 por Francisco Caldeira Castelo Branco visava fechar a foz do Amazonas contra ingleses e holandeses. O Estado do Grão-Pará prestava contas diretamente a Lisboa. O Pará não aceitou a Independência de 1822 e só foi integrado ao Império em agosto de 1823, sob ameaça de bombardeio da esquadra de lorde Cochrane.</Text>
              <Text style={styles.historyText}>O ambiente de exclusão e a pobreza extrema culminaram na Cabanagem (1835–1840), a única revolta regencial em que as classes populares tomaram o poder de uma província inteira. A repressão imperial dizimou cerca de 30% da população paraense da época.</Text>
              <Text style={styles.historySubtitle}>O Ciclo da Borracha e a Belle Époque Amazônica</Text>
              <Text style={styles.historyText}>No final do século XIX, a extração do látex transformou Belém. A riqueza da borracha financiou bondes elétricos, palacetes e o suntuoso Theatro da Paz. O ciclo entrou em colapso na década de 1910, quando a produção britânica na Ásia superou o mercado brasileiro.</Text>
            </View>
          ) : renderCulturaLocal()}
        </View>
      </ScrollView>
      <PlaceModal place={selectedPlace} visible={modalVisible} onClose={closeModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e0f2f1' },
  header: { height: 250 },
  headerImage: { width: '100%', height: '100%' },
  backButton: { position: 'absolute', top: 40, left: 20, zIndex: 10, backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20 },
  backButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  tabs: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, backgroundColor: '#e0f2f1' },
  tabButton: { paddingVertical: 8, paddingHorizontal: 25, borderRadius: 20 },
  activeTab: { backgroundColor: '#009688' },
  tabText: { color: '#009688', fontWeight: 'bold', fontSize: 16 },
  activeTabText: { color: '#fff' },
  content: { padding: 20 },
  historyContainer: { backgroundColor: '#fff', borderRadius: 15, padding: 20 },
  historyTitle: { fontSize: 22, fontWeight: 'bold', color: '#009688', marginBottom: 15, textAlign: 'center' },
  historySubtitle: { fontSize: 18, fontWeight: 'bold', color: '#009688', marginTop: 15, marginBottom: 5 },
  historyText: { fontSize: 16, color: '#333', lineHeight: 24, marginBottom: 10 },
  categoryHeader: { fontSize: 20, fontWeight: 'bold', color: '#009688', marginTop: 15, marginBottom: 5 },
  separator: { height: 1, backgroundColor: '#b2dfdb', marginVertical: 10, marginBottom: 15 },
  card: { backgroundColor: '#fff', borderRadius: 15, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  cardImage: { width: '100%', height: 150, borderTopLeftRadius: 15, borderTopRightRadius: 15 },
  cardContent: { padding: 15 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#009688' },
  cardCategory: { fontSize: 14, color: '#666', marginVertical: 5 },
  cardDescription: { fontSize: 14, color: '#333' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: '#fff', borderRadius: 15, padding: 20, width: '80%', alignItems: 'center' },
  modalImage: { width: '100%', height: 150, borderRadius: 15, marginBottom: 15 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#009688', marginBottom: 5 },
  modalCategory: { fontSize: 16, color: '#666', marginBottom: 10 },
  modalDescription: { fontSize: 16, color: '#333', textAlign: 'center', marginBottom: 20 },
  closeButton: { backgroundColor: '#009688', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20 },
  closeButtonText: { color: '#fff', fontSize: 16 },
});
