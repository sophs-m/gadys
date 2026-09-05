import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AbasSwipe from '../../components/AbasSwipe';
import LocalList from '../../components/LocalList';
import { getPontosFavoritos, togglePontoFavorito } from '../../services/pontosFavoritos';

const headerImage = require('../../../assets/images/estados/to.png');
const jalapaoImage = require('../../../assets/images/to/jalapao.png');
const capimDouradoImage = require('../../../assets/images/to/artesanato.png');
const congadasImage = require('../../../assets/images/to/congadas.png');

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
        name: 'Congada no Tocantins',
        category: 'Evento',
        location: 'Taguatinga',
        description: 'É uma manifestação cultural e religiosa afro-brasileira que combina dança, música, teatro e espiritualidade, celebrando santos católicos e ancestrais africanos.',
        modalDescription: `**Congada no Tocantins**\n\n**Fé, Herança Afro-brasileira e Cultura Popular**\nA Congada no Tocantins é uma manifestação cultural e religiosa que tem origem nas tradições afro-brasileiras trazidas durante o período colonial, especialmente ligadas às irmandades do Rosário. Ela chegou ao território tocantinense a partir da migração de populações do Centro-Oeste e Nordeste, sendo adaptada às comunidades locais ao longo do tempo.\n\nHistoricamente, a congada representa uma forma de resistência cultural das populações negras escravizadas e libertas, misturando elementos do catolicismo com ritmos, danças e narrativas de origem africana. No Tocantins, ela se mantém viva em festas populares, reforçando a identidade comunitária e a preservação da memória afro-brasileira no Cerrado.`,
        image: congadasImage,
        rating: 5
    },
    {
        name: 'Jalapão',
        category: 'Outro',
        location: 'Mateiros',
        description: 'Um oásis no coração do Brasil, com dunas, cachoeiras, fervedouros e uma natureza exuberante.',
        modalDescription: `**Jalapão**\n\n**Paisagem do Cerrado e História de Isolamento e Transformação**\nO Jalapão, localizado no leste do Tocantins, é uma região marcada por dunas douradas, fervedouros, rios e chapadas do Cerrado. Durante grande parte de sua história, o território permaneceu isolado, com ocupação esparsa de comunidades tradicionais que viviam da agricultura de subsistência, extrativismo e criação de animais.\n\nA partir do final do século XX, o Jalapão passou a ganhar destaque com o desenvolvimento do ecoturismo, revelando suas paisagens únicas e ecossistemas preservados. Essa transformação trouxe maior visibilidade à região e reforçou a importância da conservação ambiental.\n\nHoje, o Jalapão é um dos principais símbolos naturais do Tocantins, unindo biodiversidade, cultura local e turismo sustentável.`,
        image: jalapaoImage,
        rating: 5
    },
    {
        name: 'Artesanato de Capim Dourado',
        category: 'Outro',
        location: 'Ponte Alta do Tocantins',
        description: 'O “ouro do Jalapão”, uma fibra vegetal que se transforma em biojoias e objetos de decoração.',
        modalDescription: `**Artesanato de Capim Dourado**\n\n**O Ouro do Jalapão**\nO artesanato de capim dourado é a mais importante manifestação cultural do Jalapão. A técnica, herdada dos índios Xerente, consiste em costurar as hastes do capim dourado, uma planta que só nasce na região, com fios de seda de buriti. O resultado são peças de uma beleza única, que brilham como ouro.\n\nO artesanato de capim dourado é a principal fonte de renda de muitas comunidades do Jalapão. A colheita do capim é feita de forma sustentável, garantindo a preservação da espécie e a continuidade da tradição. As biojoias e os objetos de decoração de capim dourado são vendidos em todo o Brasil e no exterior, levando a cultura e a beleza do Jalapão para o mundo.`,
        image: capimDouradoImage,
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

export default function Tocantins() {
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
                <Text style={styles.historyTitle}>O Estado Mais Novo do Brasil e a Ocupação do Cerrado</Text>
              <Text style={styles.historySubtitle}>Povos Originários e a Ocupação do Norte Goiano</Text>
              <Text style={styles.historyText}>O território era habitado por Karajá, Javaé, Xerente, Apinajé e Krahô. Durante o período colonial e imperial, a região pertencia ao norte de Goiás, com ocupação lenta baseada em pecuária e agricultura de subsistência.</Text>
              <Text style={styles.historySubtitle}>O Movimento pela Criação do Estado</Text>
              <Text style={styles.historyText}>Ao longo do século XX, cresceu o movimento político que defendia a separação do norte de Goiás, argumentando que a região era historicamente negligenciada. O movimento culminou na criação do estado em 1988, com a Constituição Federal.</Text>
              <Text style={styles.historySubtitle}>Palmas: A Capital Planejada</Text>
              <Text style={styles.historyText}>A capital Palmas foi fundada em 1989 e planejada como centro administrativo moderno, sendo a capital mais nova do Brasil. Destaca-se por seu urbanismo organizado, amplas avenidas e crescimento rápido.</Text>
              <Text style={styles.historySubtitle}>O Cerrado e os Rios</Text>
              <Text style={styles.historyText}>O Tocantins abriga importantes ecossistemas do Cerrado e rios fundamentais como o Tocantins e o Araguaia. A Ilha do Bananal, entre o Araguaia e o Javaés, é uma das maiores ilhas fluviais do mundo. O Jalapão é um dos destinos ecológicos mais impressionantes do Brasil.</Text>
              <Text style={styles.historySubtitle}>Tocantins Contemporâneo</Text>
              <Text style={styles.historyText}>Atualmente, o estado passa por crescimento acelerado com forte expansão do agronegócio e desenvolvimento urbano. Sua história, recente em termos administrativos, reflete a consolidação do Cerrado como uma das regiões mais importantes do país.</Text>
              </View>
            </View>
          }
          culturaLocal={
            <View style={styles.content}>
              <LocalList sigla="TO" imagensLocais={{
              'Jalapão': jalapaoImage,
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
