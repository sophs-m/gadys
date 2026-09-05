import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AbasSwipe from '../../components/AbasSwipe';
import LocalList from '../../components/LocalList';
import { getPontosFavoritos, togglePontoFavorito } from '../../services/pontosFavoritos';

const headerImage = require('../../../assets/images/estados/maa.png');
const lencoisImage = require('../../../assets/images/estados/ma.png');
const centroHistoricoImage = require('../../../assets/images/ma/centro.png');
const bumbaMeuBoiImage = require('../../../assets/images/ma/bumba.png');

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
        name: 'Bumba Meu Boi',
        category: 'Evento',
        location: 'Maranhão',
        description: 'A maior festa popular do estado, uma mistura de teatro, dança e música que celebra a lenda do boi.',
        modalDescription: `**Bumba Meu Boi**\n\n**A Maior Expressão Cultural do Maranhão**\nO Bumba Meu Boi é uma das manifestações folclóricas mais importantes do Brasil e o principal símbolo cultural do Maranhão. Sua origem remonta ao período colonial, entre os séculos XVIII e XIX, quando elementos das culturas indígena, africana e europeia se misturaram para criar uma celebração única. A história gira em torno da lenda de Pai Francisco e Catirina, combinando humor, crítica social e religiosidade popular.\n\nAo longo do tempo, o Bumba Meu Boi deixou de ser apenas uma encenação teatral para se tornar uma grande manifestação comunitária. Diferentes grupos, conhecidos como \'sotaques\', desenvolveram estilos próprios de música, dança, figurinos e instrumentos. Em 2019, a manifestação foi reconhecida pela UNESCO, consolidando sua importância para a cultura brasileira e mundial.`,
        image: bumbaMeuBoiImage,
        rating: 5
    },
    {
        name: 'Lençóis Maranhenses',
        category: 'Monumento',
        location: 'Barreirinhas',
        description: 'Um deserto de dunas brancas que se enchem de lagoas de água doce na estação das chuvas, um cenário único no mundo.',
        modalDescription: `**Lençóis Maranhenses**\n\n**Uma Paisagem Moldada ao Longo de Milhares de Anos**\nOs Lençóis Maranhenses constituem um dos cenários naturais mais impressionantes do Brasil. O conjunto de dunas brancas começou a se formar ao longo de milhares de anos por meio da ação dos ventos, das correntes marítimas e do transporte de sedimentos trazidos pelos rios da região.\n\nDurante o período chuvoso, a água da chuva acumula-se entre as dunas, formando lagoas cristalinas que podem permanecer cheias por vários meses. Esse fenômeno cria uma paisagem rara no mundo.\n\nEm 1981 foi criado o Parque Nacional dos Lençóis Maranhenses para proteger esse patrimônio ambiental. Atualmente, os Lençóis Maranhenses são um dos destinos turísticos mais visitados do Brasil.`,
        image: lencoisImage,
        rating: 5
    },
    {
        name: 'Centro Histórico de São Luís',
        category: 'Monumento',
        location: 'São Luís',
        description: 'Patrimônio da UNESCO, com seus casarões revestidos de azulejos portugueses, um charme colonial inigualável.',
        modalDescription: `**Centro Histórico de São Luís**\n\n**Uma Herança da Colonização Francesa e Portuguesa**\nO Centro Histórico de São Luís guarda parte fundamental da história da ocupação do norte do Brasil. A cidade foi fundada pelos franceses em 1612, tornando-se a única capital brasileira criada por esse povo europeu. Poucos anos depois, a região foi conquistada pelos portugueses, que consolidaram sua presença e transformaram São Luís em um importante centro administrativo e comercial da colônia.\n\nDurante os séculos XVIII e XIX, a economia maranhense prosperou com a produção e exportação de algodão e arroz. Uma das marcas mais conhecidas do centro histórico são os revestimentos de azulejos portugueses que cobrem as fachadas de muitos prédios.\n\nCom mais de três mil edificações históricas preservadas, o Centro Histórico de São Luís é considerado um dos maiores conjuntos arquitetônicos coloniais da América Latina. Em 1997, foi reconhecido pela UNESCO.`,
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

export default function Maranhao() {
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
          cor={"#9c27b0"}
          historia={
            <View style={styles.content}>
              <View style={styles.historyContainer}>
                <Text style={styles.historyTitle}>O Encontro de Povos, Impérios e Culturas no Norte do Brasil</Text>
              <Text style={styles.historySubtitle}>A França Equinocial e a Fundação de São Luís</Text>
              <Text style={styles.historyText}>Em 1612, uma expedição francesa fundou São Luís, dando início à França Equinocial. Em 1615, forças portuguesas expulsaram os invasores. São Luís é a única capital brasileira fundada por franceses, tornando a história maranhense uma das mais singulares do país.</Text>
              <Text style={styles.historySubtitle}>O Estado do Maranhão e Grão-Pará</Text>
              <Text style={styles.historyText}>Em 1621, Portugal criou o Estado do Maranhão separado do Estado do Brasil, demonstrando a importância estratégica da região para a ocupação da Amazônia e defesa das fronteiras coloniais.</Text>
              <Text style={styles.historySubtitle}>O Ciclo do Algodão e a Influência Africana</Text>
              <Text style={styles.historyText}>Durante o século XVIII, a produção de algodão gerou grande prosperidade, permitindo a construção dos casarões revestidos de azulejos portugueses que caracterizam São Luís. A presença africana deu origem ao Bumba Meu Boi, reconhecido pela UNESCO como Patrimônio Cultural da Humanidade.</Text>
              <Text style={styles.historySubtitle}>A Balaiada</Text>
              <Text style={styles.historyText}>Entre 1838 e 1841, o Maranhão foi palco da Balaiada, importante revolta popular de vaqueiros, quilombolas e artesãos insatisfeitos com a concentração de poder nas elites locais.</Text>
              <Text style={styles.historySubtitle}>Lençóis Maranhenses e o Patrimônio Histórico</Text>
              <Text style={styles.historyText}>O Centro Histórico de São Luís foi declarado Patrimônio Mundial pela UNESCO em 1997. Os Lençóis Maranhenses, com suas dunas brancas e lagoas cristalinas, tornaram-se símbolo da biodiversidade brasileira e um dos destinos turísticos mais famosos do país.</Text>
              </View>
            </View>
          }
          culturaLocal={
            <View style={styles.content}>
              <LocalList sigla="MA" imagensLocais={{}} />
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
  tabs: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, backgroundColor: '#f3e5f5' },
  tabButton: { paddingVertical: 8, paddingHorizontal: 25, borderRadius: 20 },
  activeTab: { backgroundColor: '#9c27b0' },
  tabText: { color: '#9c27b0', fontWeight: 'bold', fontSize: 16 },
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
