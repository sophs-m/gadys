import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AbasSwipe from '../../components/AbasSwipe';
import LocalList from '../../components/LocalList';
import { getPontosFavoritos, togglePontoFavorito } from '../../services/pontosFavoritos';

const headerImage = require('../../../assets/images/estados/ms.png');
const bonitoImage = require('../../../assets/images/ms/bonito.png');
const pantanalImage = require('../../../assets/images/ms/pantanal.png');

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
        name: 'Bonito',
        category: 'Outro',
        location: 'Bonito',
        description: 'Capital do ecoturismo brasileiro, com rios de águas cristalinas, grutas e a maior diversidade de peixes de água doce do mundo.',
        modalDescription: `**Bonito**\n\n**Ecoturismo, Águas Cristalinas e Conservação Ambiental**\nO município de Bonito, em Mato Grosso do Sul, ganhou destaque a partir do século XX, quando atividades de turismo ecológico começaram a se desenvolver de forma organizada. A região, antes baseada na agropecuária e em pequenas propriedades rurais, passou a ser reconhecida por suas águas extremamente cristalinas, cavernas e rios de grande visibilidade.\n\nA principal influência histórica de Bonito está na mudança de uso do território: de área rural tradicional para referência mundial em ecoturismo sustentável. Isso ocorreu principalmente a partir das décadas finais do século XX, quando foram criadas normas rígidas de preservação ambiental.\n\nHoje, Bonito é um dos maiores símbolos do turismo ambiental do Brasil, com rios, grutas e cachoeiras que se tornaram referência internacional em conservação.`,
        image: bonitoImage,
        rating: 5
    },
    {
        name: 'Pantanal Sul',
        category: 'Outro',
        location: 'Corumbá',
        description: 'A porção sul do Pantanal, com fazendas históricas, aves raras e uma natureza exuberante acessível pela Estrada Parque.',
        modalDescription: `**Pantanal Sul**\n\n**História, Ocupação e Cultura Pantaneira**\nO Pantanal Sul, localizado principalmente em Mato Grosso do Sul, possui uma história marcada pela ocupação ligada à pecuária extensiva. Desde o período colonial, a região foi utilizada para criação de gado em grandes fazendas, aproveitando as áreas alagáveis durante as cheias sazonais.\n\nAntes disso, povos indígenas já habitavam a região e conheciam profundamente o ciclo das águas. Com o avanço da colonização, essa relação com o ambiente foi incorporada ao modo de vida pantaneiro.\n\nA influência mais marcante do Pantanal Sul está na formação da cultura pantaneira, baseada na vida rural, na figura do peão e no uso tradicional da terra. Além disso, a região tornou-se um dos maiores patrimônios naturais do mundo, sendo fundamental para a biodiversidade e para o equilíbrio hídrico da América do Sul.`,
        image: pantanalImage,
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

export default function MatoGrossoDoSul() {
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
          cor={"#388e3c"}
          historia={
            <View style={styles.content}>
              <View style={styles.historyContainer}>
                <Text style={styles.historyTitle}>A Fronteira do Pantanal e a Formação de um Estado Estratégico</Text>
              <Text style={styles.historySubtitle}>Povos Indígenas e a Colonização</Text>
              <Text style={styles.historyText}>O território era habitado por Guarani, Kaiowá, Terena e Kadiwéu. A posição fronteiriça com Paraguai e Bolívia fez da região uma área de constante vigilância e influência cultural durante o período colonial.</Text>
              <Text style={styles.historySubtitle}>A Guerra do Paraguai</Text>
              <Text style={styles.historyText}>Entre 1864 e 1870, a região foi profundamente impactada pela Guerra do Paraguai. As tropas paraguaias invadiram e destruíram fazendas e cidades, deixando a região praticamente desorganizada, com longo processo de reconstrução posterior.</Text>
              <Text style={styles.historySubtitle}>A Pecuária e a Cultura Pantaneira</Text>
              <Text style={styles.historyText}>Após o conflito, a pecuária tornou-se a principal base econômica. O Pantanal e o Cerrado ofereceram condições favoráveis para a criação extensiva de gado, dando origem à cultura pantaneira, marcada pelo peão e pela relação com a natureza.</Text>
              <Text style={styles.historySubtitle}>A Criação do Estado em 1977</Text>
              <Text style={styles.historyText}>Em 1977, o governo federal criou oficialmente o estado de Mato Grosso do Sul, desmembrado do antigo Mato Grosso. Campo Grande foi escolhida como capital por sua posição estratégica e crescimento econômico.</Text>
              <Text style={styles.historySubtitle}>O Pantanal e a Economia Atual</Text>
              <Text style={styles.historyText}>O Pantanal, maior planície alagável do planeta, é Patrimônio Natural da Humanidade pela UNESCO. A economia combina agropecuária, papel e celulose, mineração e turismo, com forte comércio internacional pela proximidade ao Mercosul.</Text>
              </View>
            </View>
          }
          culturaLocal={
            <View style={styles.content}>
              <LocalList sigla="MS" imagensLocais={{}} />
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
  tabs: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, backgroundColor: '#e8f5e9' },
  tabButton: { paddingVertical: 8, paddingHorizontal: 25, borderRadius: 20 },
  activeTab: { backgroundColor: '#388e3c' },
  tabText: { color: '#388e3c', fontWeight: 'bold', fontSize: 16 },
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
