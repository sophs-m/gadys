import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getPontosFavoritos, togglePontoFavorito } from '../../services/pontosFavoritos';
import AbasSwipe from '../../components/AbasSwipe';
import LocalList from '../../components/LocalList';

const headerImage = require('../../../assets/images/estados/ac.png');
const seringueiraImage = require('../../../assets/images/ac/seringueira.png');
const mercadoVelhoImage = require('../../../assets/images/ac/mercado.png');
const festivalDePraiaImage = require('../../../assets/images/ac/festival.png');

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
    name: 'Festival de Praia',
    category: 'Evento',
    location: 'Rio Branco',
    description: 'No Acre, quando o nível dos rios baixa durante o "verão amazônico" (julho a setembro), bancos de areia surgem, dando lugar a festivais com shows, esportes e gastronomia regional.',
    modalDescription: `**A Festa de Praia do Acre**\n\n**Origem e Desenvolvimento (Século XX)**\nA Festa de Praia surgiu a partir do costume das comunidades acreanas de aproveitar as praias naturais que aparecem durante o período de estiagem dos rios amazônicos. Com a diminuição do nível das águas entre os meses de julho e setembro, extensas faixas de areia tornam-se espaços de lazer, convivência e celebração para a população local.\n\n**Transformação em Evento Cultural**\nAo longo dos anos, esses encontros informais evoluíram para grandes festivais organizados por prefeituras e comunidades. As festas passaram a incluir shows musicais, apresentações culturais, competições esportivas, concursos de beleza, feiras de artesanato e barracas com comidas típicas, atraindo visitantes de diversas regiões.\n\n**Valorização da Cultura Acreana**\nMais do que um evento recreativo, a Festa de Praia tornou-se uma importante manifestação cultural do Acre. Ela fortalece o turismo, movimenta a economia local e valoriza as tradições das populações ribeirinhas, destacando a importância dos rios para a história, a cultura e a identidade do povo acreano.`,
    image: festivalDePraiaImage,
    rating: 4,
  },
  {
    name: 'Seringueiras',
    category: 'Monumento',
    location: 'Xapuri',
    description: 'As seringueiras (Hevea brasiliensis) são as grandes protagonistas da história econômica, social e geográfica do Acre. Foi a busca pelo látex que desenhou as fronteiras do estado e atraiu as primeiras grandes levas de migrantes.',
    modalDescription: `**As Seringueiras**\n\n**O Ciclo da Borracha (Século XIX e início do Século XX)**\nAs seringueiras (Hevea brasiliensis) desempenharam um papel fundamental na história do Acre. A partir da segunda metade do século XIX, a crescente demanda mundial por borracha impulsionou a extração do látex, atraindo milhares de trabalhadores para a região amazônica. A atividade seringalista promoveu o povoamento do território, movimentou a economia local e contribuiu diretamente para a consolidação da presença brasileira no Acre.\n\n**Importância Histórica e Econômica**\nAlém de impulsionar o desenvolvimento regional, as seringueiras tornaram-se um símbolo da identidade acreana. A riqueza gerada pela borracha influenciou a formação de cidades, o crescimento do comércio e os acontecimentos que culminaram na incorporação do Acre ao território brasileiro.`,
    image: seringueiraImage,
    rating: 5,
  },
  {
    name: 'Mercado Velho',
    category: 'Monumento',
    location: 'Rio Branco',
    description: 'Oficialmente chamado de Mercado Municipal Elpídio Ribeiro, é um dos principais pontos turísticos, culturais e gastronômicos da capital do Acre, Rio Branco. Localizado às margens do Rio Acre, ele carrega grande parte da identidade e da história do estado.',
    modalDescription: `**Mercado Velho de Rio Branco**\n\n**Centro Comercial e Ponto de Encontro**\nLocalizado às margens do Rio Acre, o Mercado Velho foi um dos principais centros comerciais de Rio Branco durante o período de expansão econômica da borracha. O espaço reunia comerciantes, seringueiros e viajantes, funcionando como importante local de troca de mercadorias e circulação de produtos regionais.\n\n**Patrimônio Histórico do Acre**\nAo longo dos anos, o Mercado Velho consolidou-se como um dos mais importantes patrimônios históricos e culturais da capital acreana. Atualmente, o local preserva a memória do desenvolvimento econômico e social do estado, sendo um símbolo das tradições, da arquitetura e da história de Rio Branco.`,
    image: mercadoVelhoImage,
    rating: 4,
  },
 
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

export default function Acre() {
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
          cor={"#00796b"}
          historia={
            <View style={styles.content}>
              <View style={styles.historyContainer}>
                <Text style={styles.historyTitle}>Da Floresta Amazônica à Conquista da Identidade Brasileira</Text>
              <Text style={styles.historySubtitle}>Os Primeiros Habitantes</Text>
              <Text style={styles.historyText}>Muito antes da chegada dos europeus, a região do atual Acre era habitada por diversos povos indígenas, como os Huni Kuin (Kaxinawá), Ashaninka, Yawanawá, Katukina e outros grupos. Pelo Tratado de Ayacucho (1867), a área era oficialmente reconhecida como pertencente à Bolívia.</Text>
              <Text style={styles.historySubtitle}>O Ciclo da Borracha e a Migração Nordestina</Text>
              <Text style={styles.historyText}>A história do Acre mudou no final do século XIX com a expansão do Ciclo da Borracha. Milhares de nordestinos migraram para a região fugindo das secas severas, passando a atuar nos seringais e extraindo látex das seringueiras. Embora o território pertencesse à Bolívia, a maioria da população passou a ser formada por brasileiros.</Text>
              <Text style={styles.historySubtitle}>A Revolução Acreana (1899–1903)</Text>
              <Text style={styles.historyText}>Entre 1899 e 1903 ocorreram diversas revoltas conhecidas como Revolução Acreana. O movimento ganhou força sob a liderança de Plácido de Castro, que organizou forças militares que enfrentaram tropas bolivianas e conquistaram o controle da região.</Text>
              <Text style={styles.historySubtitle}>O Tratado de Petrópolis (1903)</Text>
              <Text style={styles.historyText}>Em 1903, sob a liderança do Barão do Rio Branco, foi assinado o Tratado de Petrópolis. O Brasil incorporou oficialmente o Acre ao seu território em troca do pagamento de 2 milhões de libras esterlinas, da cessão de pequenas áreas fronteiriças e da construção da Estrada de Ferro Madeira-Mamoré.</Text>
              <Text style={styles.historySubtitle}>De Território a Estado (1904–1962)</Text>
              <Text style={styles.historyText}>Após sua incorporação, o Acre foi transformado em Território Federal em 1904. Em 15 de junho de 1962, o Acre foi finalmente elevado à categoria de estado brasileiro, com Rio Branco como capital.</Text>
              <Text style={styles.historySubtitle}>Chico Mendes e a Defesa da Amazônia</Text>
              <Text style={styles.historyText}>Durante a segunda metade do século XX, Chico Mendes liderou movimentos em defesa dos trabalhadores da floresta e da preservação ambiental. Após seu assassinato em 1988, transformou-se em símbolo global da conservação ambiental e dos direitos das populações tradicionais.</Text>
              </View>
            </View>
          }
          culturaLocal={
            <View style={styles.content}>
              <LocalList sigla="AC" imagensLocais={{
              'Seringueiras': seringueiraImage,
              'Mercado Velho': mercadoVelhoImage,
              'Festival de Praia': festivalDePraiaImage,
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
  tabs: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, backgroundColor: '#e0f2f1' },
  tabButton: { paddingVertical: 8, paddingHorizontal: 25, borderRadius: 20 },
  activeTab: { backgroundColor: '#00796b' },
  tabText: { color: '#00796b', fontWeight: 'bold', fontSize: 16 },
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