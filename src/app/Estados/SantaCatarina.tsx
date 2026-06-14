import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const headerImage = require('../../../assets/images/sc/florianopolis.png');
const florianopolisImage = require('../../../assets/images/sc/florianopolis.png');
const betoCarreroImage = require('../../../assets/images/sc/beto-carrero.png');
const oktoberfestImage = require('../../../assets/images/sc/oktoberfest.png');
const serraDoRioImage = require('../../../assets/images/sc/serra-do-rio.png');

interface Place {
  name: string;
  category: 'Monumento' | 'Evento' | 'Comida Típica' | 'Outro';
  location: string;
  description: string;
  image: any;
  rating: number;
}

const places: Place[] = [
  { name: 'Florianópolis', category: 'Outro', location: 'Santa Catarina', description: 'A capital catarinense, com suas mais de 40 praias, lagoas, dunas e uma rica cultura açoriana.', image: florianopolisImage, rating: 5 },
  { name: 'Beto Carrero World', category: 'Outro', location: 'Penha', description: 'O maior parque temático da América Latina, com uma grande variedade de brinquedos, shows e atrações.', image: betoCarreroImage, rating: 5 },
  { name: 'Oktoberfest', category: 'Evento', location: 'Blumenau', description: 'A maior festa alemã das Américas, com muito chope, música, dança e comida típica.', image: oktoberfestImage, rating: 5 },
  { name: 'Serra do Rio do Rastro', category: 'Outro', location: 'Lauro Müller', description: 'Uma das estradas mais espetaculares do mundo, com suas curvas sinuosas e paisagens de tirar o fôlego.', image: serraDoRioImage, rating: 5 },
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

export default function SantaCatarina() {
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
              <Text style={styles.historyTitle}>A Disputa pela Ilha da Magia e a Guerra do Contestado</Text>
              <Text style={styles.historyText}>Povoado por açorianos e alemães, o território catarinense foi palco de conflitos territoriais com a Espanha e de uma sangrenta guerra civil no início do século XX.</Text>
              <Text style={styles.historySubtitle}>A Fundação de Desterro e a Imigração Alemã</Text>
              <Text style={styles.historyText}>Em 1675, o bandeirante Francisco Dias Velho fundou o povoado de Nossa Senhora do Desterro, hoje Florianópolis. No século XVIII, o litoral recebeu milhares de colonos açorianos, que moldaram a cultura local. No século seguinte, o vale do rio Itajaí começou a ser povoado por imigrantes alemães, que fundaram cidades como Blumenau e Joinville.</Text>
              <Text style={styles.historySubtitle}>A Guerra do Contestado e a República Juliana</Text>
              <Text style={styles.historyText}>Entre 1912 e 1916, uma área rica em erva-mate e madeira foi palco da Guerra do Contestado, um conflito messiânico que opôs camponeses ao Exército. Em 1839, durante a Revolução Farroupilha, os rebeldes tomaram Laguna e proclamaram a efêmera República Juliana.</Text>
            </View>
          ) : renderCulturaLocal()}
        </View>
      </ScrollView>
      <PlaceModal place={selectedPlace} visible={modalVisible} onClose={closeModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e3f2fd' },
  header: { height: 250 },
  headerImage: { width: '100%', height: '100%' },
  backButton: { position: 'absolute', top: 40, left: 20, zIndex: 10, backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20 },
  backButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  tabs: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, backgroundColor: '#e3f2fd' },
  tabButton: { paddingVertical: 8, paddingHorizontal: 25, borderRadius: 20 },
  activeTab: { backgroundColor: '#2196f3' },
  tabText: { color: '#2196f3', fontWeight: 'bold', fontSize: 16 },
  activeTabText: { color: '#fff' },
  content: { padding: 20 },
  historyContainer: { backgroundColor: '#fff', borderRadius: 15, padding: 20 },
  historyTitle: { fontSize: 22, fontWeight: 'bold', color: '#2196f3', marginBottom: 15, textAlign: 'center' },
  historySubtitle: { fontSize: 18, fontWeight: 'bold', color: '#2196f3', marginTop: 15, marginBottom: 5 },
  historyText: { fontSize: 16, color: '#333', lineHeight: 24, marginBottom: 10 },
  categoryHeader: { fontSize: 20, fontWeight: 'bold', color: '#2196f3', marginTop: 15, marginBottom: 5 },
  separator: { height: 1, backgroundColor: '#bbdefb', marginVertical: 10, marginBottom: 15 },
  card: { backgroundColor: '#fff', borderRadius: 15, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  cardImage: { width: '100%', height: 150, borderTopLeftRadius: 15, borderTopRightRadius: 15 },
  cardContent: { padding: 15 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#2196f3' },
  cardCategory: { fontSize: 14, color: '#666', marginVertical: 5 },
  cardDescription: { fontSize: 14, color: '#333' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: '#fff', borderRadius: 15, padding: 20, width: '80%', alignItems: 'center' },
  modalImage: { width: '100%', height: 150, borderRadius: 15, marginBottom: 15 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#2196f3', marginBottom: 5 },
  modalCategory: { fontSize: 16, color: '#666', marginBottom: 10 },
  modalDescription: { fontSize: 16, color: '#333', textAlign: 'center', marginBottom: 20 },
  closeButton: { backgroundColor: '#2196f3', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20 },
  closeButtonText: { color: '#fff', fontSize: 16 },
});
