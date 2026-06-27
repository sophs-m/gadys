import AbasSwipe from '../../components/AbasSwipe';
import LocalList from '../../components/LocalList';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getPontosFavoritos, togglePontoFavorito } from '../../services/pontosFavoritos';

const headerImage = require('../../../assets/images/estados/pb.png');
const centroHistoricoImage = require('../../../assets/images/pb/centro-historico.png');
const saoJoaoImage = require('../../../assets/images/pb/sao-joao.png');

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
        name: 'Festa de São João',
        category: 'Evento',
        location: 'Campina Grande',
        description: 'O maior São João do Mundo, com forró, quadrilhas, comidas típicas e o famoso casamento caipira.',
        modalDescription: `**Festa de São João**\n\n**Tradição, Cultura Popular e Herança Rural**\nA Festa de São João é uma das celebrações mais importantes do calendário cultural brasileiro, com raízes nas festas juninas trazidas de Portugal durante o período colonial. Com o tempo, ela foi incorporando elementos da cultura indígena e africana, ganhando características próprias em cada região do país.\n\nNo Nordeste, a festa se tornou um grande símbolo cultural ligado ao ciclo agrícola do milho e à vida rural. As comemorações incluem quadrilhas juninas, fogueiras, comidas típicas, forró e celebrações religiosas em homenagem a São João Batista. Mais do que uma festa religiosa, o São João representa a identidade cultural nordestina e a memória da vida no sertão.`,
        image: saoJoaoImage,
        rating: 5
    },
    {
        name: 'Centro Histórico de João Pessoa',
        category: 'Monumento',
        location: 'João Pessoa',
        description: 'Um dos mais importantes do Brasil, com um conjunto arquitetônico que inclui a Igreja de São Francisco e o Casarão dos Azulejos.',
        modalDescription: `**Centro Histórico de João Pessoa**\n\n**Memória Colonial e Patrimônio Cultural**\nO Centro Histórico de João Pessoa, na Paraíba, é um dos mais antigos conjuntos urbanos do Brasil e reflete diferentes fases da ocupação colonial no Nordeste. A cidade, fundada no século XVI, foi originalmente chamada de Filipéia de Nossa Senhora das Neves e passou por períodos de domínio português e holandês.\n\nSua arquitetura preserva igrejas barrocas, praças e casarões que mostram a evolução urbana desde o período colonial. O centro histórico também está ligado à expansão da cana-de-açúcar e à organização administrativa da capitania da Paraíba.\n\nHoje, essa área é considerada um importante patrimônio cultural, representando a memória histórica do estado e sendo um dos principais símbolos da identidade paraibana.`,
        image: centroHistoricoImage,
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

export default function Paraiba() {
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
          cor={"#1565c0"}
          historia={
            <View style={styles.content}>
              <View style={styles.historyContainer}>
                <Text style={styles.historyTitle}>Resistência, Cultura e a Formação do Nordeste Brasileiro</Text>
              <Text style={styles.historySubtitle}>Os Primeiros Povos e a Colonização</Text>
              <Text style={styles.historyText}>Antes dos portugueses, o território era habitado por Potiguaras, Tabajaras e Cariris. Em 1585 foi fundada a cidade de João Pessoa, inicialmente chamada de Filipéia de Nossa Senhora das Neves, consolidando o domínio português na região.</Text>
              <Text style={styles.historySubtitle}>O Ciclo do Açúcar</Text>
              <Text style={styles.historyText}>A partir do século XVII, a Paraíba integrou-se ao ciclo da cana-de-açúcar. Os engenhos se espalharam pelo litoral e pelo vale dos rios, impulsionando a economia colonial com forte dependência do trabalho de africanos escravizados.</Text>
              <Text style={styles.historySubtitle}>A Revolução de 1930</Text>
              <Text style={styles.historyText}>A Paraíba teve papel importante na Revolução de 1930. O assassinato do governador João Pessoa Cavalcanti de Albuquerque desencadeou o movimento liderado por Getúlio Vargas, que resultou na queda da República Velha. Em homenagem, a capital recebeu o nome de João Pessoa.</Text>
              <Text style={styles.historySubtitle}>Cultura e Identidade Paraibana</Text>
              <Text style={styles.historyText}>A cultura é marcada pela música, literatura popular e tradições nordestinas. O estado é berço de importantes nomes da cultura brasileira e possui forte ligação com o cordel, o forró e as festas populares, especialmente o São João.</Text>
              <Text style={styles.historySubtitle}>A Paraíba Contemporânea</Text>
              <Text style={styles.historyText}>Atualmente, o estado investe em educação, tecnologia e turismo. Suas praias, patrimônio histórico e manifestações culturais atraem visitantes de todo o Brasil. João Pessoa e Campina Grande são centros de crescimento econômico e cultural.</Text>
              </View>
            </View>
          }
          culturaLocal={
            <View style={styles.content}>
              <LocalList sigla="PB" imagensLocais={{}} />
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
  tabs: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, backgroundColor: '#e3f2fd' },
  tabButton: { paddingVertical: 8, paddingHorizontal: 25, borderRadius: 20 },
  activeTab: { backgroundColor: '#1565c0' },
  tabText: { color: '#1565c0', fontWeight: 'bold', fontSize: 16 },
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
