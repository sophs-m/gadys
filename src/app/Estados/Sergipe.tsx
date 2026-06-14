import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const headerImage = require('../../../assets/images/se/praca.png');
const canionDoXingoImage = require('../../../assets/images/se/canion.png');
const pracaSaoFranciscoImage = require('../../../assets/images/se/praca.png');
const festaDoMastroImage = require('../../../assets/images/se/festa-do-mastro.png');

interface Place {
  name: string;
  category: 'Monumento' | 'Evento' | 'Comida Típica' | 'Outro';
  location: string;
  description: string;
  image: any;
  rating: number;
}

const places: Place[] = [
  { name: 'Cânion do Xingó', category: 'Monumento', location: 'Canindé de São Francisco', description: 'Um vale profundo e navegável no Rio São Francisco, com paisagens espetaculares e águas verdes.', image: canionDoXingoImage, rating: 5 },
  { name: 'Praça São Francisco', category: 'Monumento', location: 'São Cristóvão', description: 'Patrimônio da UNESCO, um conjunto arquitetônico que reúne a igreja, o convento e o museu de arte sacra.', image: pracaSaoFranciscoImage, rating: 5 },
  { name: 'Festa do Mastro', category: 'Evento', location: 'Capela', description: 'Uma festa junina única, onde os participantes buscam o mastro na mata e o levantam na praça da cidade.', image: festaDoMastroImage, rating: 4 },
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

export default function Sergipe() {
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
              <Text style={styles.historyTitle}>O Celeiro de Massapê e a Cidade do Xadrez</Text>
              <Text style={styles.historyText}>Sergipe nasceu da necessidade de pacificação camponesa e atuou por séculos como o pulmão econômico e alimentício da capital colonial de Salvador.</Text>
              <Text style={styles.historySubtitle}>A Conquista da Capitania e a Tutela Baiana</Text>
              <Text style={styles.historyText}>Entre 1590 e 1593, Cristóvão de Barros liderou uma violenta campanha militar contra os indígenas comandados pelo cacique Serigy. O objetivo era criar um corredor seguro ligando Salvador a Pernambuco. O solo fértil de massapê encheu o território de engenhos de açúcar e estâncias de gado.</Text>
              <Text style={styles.historyText}>A emancipação política de Sergipe ocorreu em 8 de julho de 1820, por decreto de Dom João VI. A Bahia resistiu à separação, que só se consolidou de fato após as guerras de independência em 1823.</Text>
              <Text style={styles.historySubtitle}>A Mudança de Capital e a Modernidade de Aracaju</Text>
              <Text style={styles.historyText}>Em 1855, o presidente da província transferiu a capital para Aracaju. Projetada pelo engenheiro Sebastião Basílio Pirro, Aracaju tornou-se uma das primeiras cidades planejadas do Brasil, com um traçado geométrico semelhante a um tabuleiro de xadrez.</Text>
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
