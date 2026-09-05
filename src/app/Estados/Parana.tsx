import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AbasSwipe from '../../components/AbasSwipe';
import LocalList from '../../components/LocalList';
import { getPontosFavoritos, togglePontoFavorito } from '../../services/pontosFavoritos';

const headerImage = require('../../../assets/images/estados/pr.png');
const cataratasImage = require('../../../assets/images/pr/cataratas.png');
const jardimBotanicoImage = require('../../../assets/images/pr/jardim.png');
const fandangoImage = require('../../../assets/images/pr/fandango.png');

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
        name: 'Fandango Caiçara',
        category: 'Evento',
        location: 'Litoral do Paraná',
        description: 'Uma expressão cultural dos povos caiçaras, com música, dança e sapateado.',
        modalDescription: `**Fandango Caiçara**\n\n**Tradição Litorânea e Cultura de Resistência**\nO Fandango Caiçara é uma manifestação cultural tradicional das comunidades caiçaras do litoral do Paraná e do litoral sul de São Paulo. Sua origem está ligada à formação dessas populações, resultantes da mistura entre indígenas, portugueses e africanos, que desenvolveram um modo de vida baseado na pesca artesanal, agricultura de subsistência e forte relação com o mar.\n\nHistoricamente, o fandango surge como uma forma de celebração comunitária, com música, dança e versos improvisados, tocados com instrumentos como a rabeca e a viola. Além de entretenimento, ele também funciona como espaço de transmissão de conhecimentos e fortalecimento da identidade caiçara, sendo reconhecido como patrimônio cultural brasileiro.`,
        image: fandangoImage,
        rating: 4
    },
    {
        name: 'Cataratas do Iguaçu',
        category: 'Outro',
        location: 'Foz do Iguaçu',
        description: "Um conjunto de 275 quedas d'água, consideradas uma das Sete Maravilhas Naturais do Mundo.",
        modalDescription: `**Cataratas do Iguaçu**\n\n**Formação Natural e Patrimônio Mundial**\nAs Cataratas do Iguaçu, localizadas no oeste do Paraná, na fronteira com a Argentina, são uma das maiores e mais impressionantes quedas d'água do mundo. Sua formação geológica ocorreu há milhões de anos, a partir de processos erosivos que moldaram o rio Iguaçu e criaram o conjunto de mais de 270 quedas.\n\nAntes da colonização europeia, a região já era habitada por povos indígenas Guarani, que consideravam as cataratas um espaço sagrado. Com a chegada dos colonizadores, a área passou a ser explorada e posteriormente preservada.\n\nHoje, as cataratas são reconhecidas como Patrimônio Natural da Humanidade e desempenham papel fundamental no turismo, na conservação ambiental e na identidade do estado do Paraná.`,
        image: cataratasImage,
        rating: 5
    },
    {
        name: 'Jardim Botânico de Curitiba',
        category: 'Monumento',
        location: 'Curitiba',
        description: 'Um dos cartões-postais de Curitiba, com sua estufa de vidro inspirada no Palácio de Cristal de Londres.',
        modalDescription: `**Jardim Botânico de Curitiba**\n\n**Urbanismo, Natureza e Identidade Paranaense**\nO Jardim Botânico de Curitiba, inaugurado em 1991, tornou-se um dos principais símbolos da capital paranaense. Inspirado em jardins europeus, ele foi criado como parte do projeto de valorização ambiental e urbanística da cidade de Curitiba, que se destacou ao longo do século XX por seu planejamento urbano inovador.\n\nO espaço abriga estufas, jardins geométricos e áreas de preservação da Mata Atlântica, além de ser um importante centro de pesquisa e educação ambiental. Ele reflete a identidade de Curitiba como uma cidade que busca integrar natureza e urbanização de forma equilibrada.`,
        image: jardimBotanicoImage,
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

export default function Parana() {
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
          cor={"#03a9f4"}
          historia={
            <View style={styles.content}>
              <View style={styles.historyContainer}>
                <Text style={styles.historyTitle}>Fronteiras, Imigração e a Construção do Sul do Brasil</Text>
              <Text style={styles.historySubtitle}>Povos Originários e a Colonização</Text>
              <Text style={styles.historyText}>O Paraná era habitado principalmente por Guaranis, Kaingang e Xetá. A ocupação portuguesa começou no século XVII, com Paranaguá tornando-se importante ponto de ligação entre o interior e o mar.</Text>
              <Text style={styles.historySubtitle}>O Tropeirismo e a Formação da Província</Text>
              <Text style={styles.historyText}>O tropeirismo foi um dos principais fatores de desenvolvimento, com tropas de muares transportando gado e mercadorias entre o Sul e o Sudeste. Em 1853, o Paraná foi desmembrado de São Paulo, tornando-se província independente com Curitiba como capital.</Text>
              <Text style={styles.historySubtitle}>A Imigração Europeia</Text>
              <Text style={styles.historyText}>A partir da segunda metade do século XIX, o Paraná recebeu grandes fluxos de imigrantes italianos, alemães, poloneses e ucranianos, fundamentais para a colonização agrícola do interior e a diversificação econômica do estado.</Text>
              <Text style={styles.historySubtitle}>A Guerra do Contestado</Text>
              <Text style={styles.historyText}>Entre 1912 e 1916, o Paraná foi palco da Guerra do Contestado, um dos maiores conflitos sociais do país. Envolvendo camponeses e forças militares, o conflito foi motivado por disputas de terra e construção de ferrovias, deixando profundas marcas sociais.</Text>
              <Text style={styles.historySubtitle}>Cataratas do Iguaçu e Modernização</Text>
              <Text style={styles.historyText}>As Cataratas do Iguaçu são Patrimônio Natural da Humanidade e símbolo do estado. Curitiba tornou-se referência internacional em planejamento urbano. O Paraná é um dos estados mais desenvolvidos do Brasil, com forte economia industrial e agropecuária.</Text>
              </View>
            </View>
          }
          culturaLocal={
            <View style={styles.content}>
              <LocalList sigla="PR" imagensLocais={{}} />
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
  tabs: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, backgroundColor: '#e1f5fe' },
  tabButton: { paddingVertical: 8, paddingHorizontal: 25, borderRadius: 20 },
  activeTab: { backgroundColor: '#03a9f4' },
  tabText: { color: '#03a9f4', fontWeight: 'bold', fontSize: 16 },
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
