import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AbasSwipe from '../../components/AbasSwipe';
import LocalList from '../../components/LocalList';
import { getPontosFavoritos, togglePontoFavorito } from '../../services/pontosFavoritos';

const headerImage = require('../../../assets/images/estados/mt.png');
const pantanalImage = require('../../../assets/images/mt/pantanal.png');
const chapadaImage = require('../../../assets/images/mt/chapada.png');
const siririImage = require('../../../assets/images/mt/siriri.png');

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
        name: 'Siriri e Cururu',
        category: 'Evento',
        location: 'Mato Grosso',
        description: 'Danças típicas que animam as festas do estado, com música, palmas e sapateado.',
        modalDescription: `**Siriri e Cururu**\n\n**Contexto Histórico e Influência Cultural**\nO siriri e o cururu surgem no interior do Centro-Oeste brasileiro, especialmente em Mato Grosso, como resultado da mistura entre culturas indígenas locais, influências africanas trazidas pelo período colonial e elementos da tradição portuguesa. O cururu, mais antigo, nasceu em ambientes rurais e religiosos, ligado a encontros em que violeiros improvisavam versos com temas bíblicos, sociais ou do cotidiano. Já o siriri se desenvolveu como expressão mais festiva, associada a danças comunitárias e celebrações populares.\n\nEssas manifestações tiveram papel importante na preservação da identidade cultural das comunidades ribeirinhas e do interior, funcionando como forma de transmissão oral de histórias, crenças e valores.`,
        image: siririImage,
        rating: 4
    },
    {
        name: 'Pantanal Norte',
        category: 'Outro',
        location: 'Poconé',
        description: 'A maior planície inundável do mundo, com uma biodiversidade impressionante e o melhor lugar para observar onças-pintadas.',
        modalDescription: `**Pantanal Norte**\n\n**Contexto Histórico e Influência**\nO Pantanal Norte sempre foi uma região de ocupação humana ligada à adaptação ao ambiente natural. Povos indígenas já utilizavam seus recursos antes da colonização, aproveitando o ciclo das cheias para pesca e deslocamento. Durante o período colonial, a região passou a ser ocupada de forma mais intensa com a expansão da pecuária, que se adaptou bem às áreas alagáveis.\n\nAo longo do tempo, o Pantanal influenciou diretamente o modo de vida pantaneiro, marcado pela figura do peão, pelas grandes fazendas e pela relação equilibrada com o ciclo das águas. Hoje, além de sua importância histórica na ocupação do interior do Brasil, o Pantanal Norte é essencial para a conservação ambiental e para o turismo ecológico.`,
        image: pantanalImage,
        rating: 5
    },
    {
        name: 'Chapada dos Guimarães',
        category: 'Outro',
        location: 'Chapada dos Guimarães',
        description: 'Cachoeiras, cânions e formações rochosas de tirar o fôlego, como a famosa cachoeira Véu de Noiva.',
        modalDescription: `**Chapada dos Guimarães**\n\n**Contexto Histórico e Influência**\nA Chapada dos Guimarães possui importância histórica ligada à ocupação do interior de Mato Grosso durante os ciclos de exploração e expansão territorial. No período colonial, a região serviu como área de passagem e observação estratégica devido à sua localização elevada no Cerrado.\n\nCom o tempo, a chapada passou a influenciar a cultura e o imaginário regional, sendo associada a paisagens naturais imponentes, quedas d'água e formações rochosas que marcaram a identidade do estado. Hoje, sua principal influência está no turismo ecológico e na preservação ambiental, sendo uma das áreas mais importantes para o estudo e conservação do Cerrado brasileiro.`,
        image: chapadaImage,
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

export default function MatoGrosso() {
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
          cor={"#a1887f"}
          historia={
            <View style={styles.content}>
              <View style={styles.historyContainer}>
                <Text style={styles.historyTitle}>A Fronteira do Ouro, das Monções e do Agronegócio Brasileiro</Text>
              <Text style={styles.historySubtitle}>Os Primeiros Povos e as Monções</Text>
              <Text style={styles.historyText}>O território era habitado por Bororos, Xavantes, Parecis e outros povos. A ocupação começou no século XVIII com bandeirantes que utilizavam as Monções, longas viagens fluviais pelos rios Tietê, Paraná, Paraguai e Cuiabá, para acessar o interior.</Text>
              <Text style={styles.historySubtitle}>A Descoberta do Ouro e a Capitania</Text>
              <Text style={styles.historyText}>Em 1719, Pascoal Moreira Cabral encontrou jazidas de ouro dando origem a Cuiabá. Em 1748 foi criada a Capitania de Mato Grosso. Para reforçar a fronteira oeste, Portugal fundou em 1752 Vila Bela da Santíssima Trindade como primeira capital.</Text>
              <Text style={styles.historySubtitle}>A Guerra do Paraguai</Text>
              <Text style={styles.historyText}>Entre 1864 e 1870, Mato Grosso foi um dos principais cenários da Guerra do Paraguai. As tropas paraguaias invadiram o sul da província, evidenciando a importância estratégica da região para a defesa das fronteiras brasileiras.</Text>
              <Text style={styles.historySubtitle}>A Divisão do Estado</Text>
              <Text style={styles.historyText}>Em 1977, o governo federal dividiu o território, criando Mato Grosso do Sul. A porção norte manteve o nome Mato Grosso, buscando facilitar a administração do vasto território.</Text>
              <Text style={styles.historySubtitle}>A Revolução do Agronegócio</Text>
              <Text style={styles.historyText}>A partir da década de 1970, avanços tecnológicos transformaram o Cerrado em área altamente produtiva. Mato Grosso tornou-se líder nacional na produção de soja, milho, algodão e carne bovina, além de abrigar o Pantanal, a maior área úmida tropical do mundo.</Text>
              </View>
            </View>
          }
          culturaLocal={
            <View style={styles.content}>
              <LocalList sigla="MT" imagensLocais={{}} />
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
  tabs: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, backgroundColor: '#fbe9e7' },
  tabButton: { paddingVertical: 8, paddingHorizontal: 25, borderRadius: 20 },
  activeTab: { backgroundColor: '#a1887f' },
  tabText: { color: '#a1887f', fontWeight: 'bold', fontSize: 16 },
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
