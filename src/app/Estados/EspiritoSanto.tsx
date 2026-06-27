import AbasSwipe from '../../components/AbasSwipe';
import LocalList from '../../components/LocalList';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getPontosFavoritos, togglePontoFavorito } from '../../services/pontosFavoritos';

const headerImage = require('../../../assets/images/estados/es.png');
const conventoDaPenhaImage = require('../../../assets/images/es/convento.png');
const praiasDeGuarapariImage = require('../../../assets/images/es/praias.png');
const festaDaPolentaImage = require('../../../assets/images/es/festa.png');

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
        name: 'Festa da Polenta',
        category: 'Evento',
        location: 'Venda Nova do Imigrante',
        description: 'Celebra a cultura italiana com muita comida, música e o tradicional tombo da polenta gigante.',
        modalDescription: `**Festa da Polenta**\n\n**A Herança da Imigração Italiana no Espírito Santo**\nA Festa da Polenta surgiu como forma de preservar os costumes trazidos pelos imigrantes italianos que chegaram ao estado a partir da segunda metade do século XIX. Muitos desses imigrantes estabeleceram-se na região serrana capixaba, especialmente em Venda Nova do Imigrante, onde desenvolveram atividades agrícolas e mantiveram vivas suas tradições culturais.\n\nCriada em 1979, a festa nasceu para celebrar a história, a culinária e os costumes das famílias descendentes de italianos. Um dos momentos mais conhecidos é o "Tombo da Polenta", quando uma enorme quantidade de polenta é preparada e servida ao público.\n\n**Influência Cultural e Econômica**\nAo longo das décadas, a Festa da Polenta transformou-se em um dos maiores eventos culturais do Espírito Santo. Além de valorizar a memória da imigração italiana, promove danças folclóricas, apresentações musicais, gastronomia típica e fortalece o turismo regional.`,
        image: festaDaPolentaImage,
        rating: 4
    },
    {
        name: 'Convento da Penha',
        category: 'Monumento',
        location: 'Vila Velha',
        description: 'Principal monumento histórico e religioso do estado, com uma vista panorâmica de Vitória e Vila Velha.',
        modalDescription: `**Convento da Penha**\n\n**Um dos Santuários Mais Antigos do Brasil**\nO Convento da Penha é um dos mais importantes patrimônios históricos e religiosos do Espírito Santo. Localizado em Vila Velha, sua história começou em 1558, quando o frei franciscano Frei Pedro Palácios chegou à região trazendo uma imagem de Nossa Senhora das Alegrias.\n\nInicialmente, foi construída uma pequena capela no alto de um penhasco com vista para o litoral. Com o aumento da devoção popular, o local foi ampliado ao longo dos séculos, tornando-se um dos principais centros de peregrinação religiosa do país.\n\n**Importância Histórica e Cultural**\nAlém de sua relevância religiosa, o Convento da Penha acompanhou grande parte da história do Espírito Santo desde o período colonial. Atualmente, recebe milhares de visitantes e peregrinos todos os anos, especialmente durante a tradicional Festa da Penha.`,
        image: conventoDaPenhaImage,
        rating: 5
    },
    {
        name: 'Praias de Guarapari',
        category: 'Monumento',
        location: 'Guarapari',
        description: 'Famosas por suas areias monazíticas, com propriedades terapêuticas, e pela beleza de suas praias.',
        modalDescription: `**Praias de Guarapari**\n\n**Da Ocupação Indígena ao Desenvolvimento Turístico**\nA região onde hoje se localiza Guarapari era habitada por povos indígenas muito antes da chegada dos colonizadores portugueses. A cidade começou a se desenvolver durante o período colonial, inicialmente ligada à pesca, à agricultura e ao comércio costeiro.\n\nAo longo do século XX, Guarapari ganhou destaque nacional devido à beleza de suas praias e à presença das chamadas areias monazíticas, ricas em minerais radioativos. A partir das décadas de 1950 e 1960, a cidade passou a receber um número crescente de turistas.\n\n**Influência no Espírito Santo**\nHoje, Guarapari é um dos principais destinos turísticos do Sudeste brasileiro. O turismo impulsiona a economia local e contribui para a divulgação da cultura e das belezas naturais capixabas.`,
        image: praiasDeGuarapariImage,
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

export default function EspiritoSanto() {
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
      <TouchableOpacity onPress={() => router.push('/estados')} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Voltar</Text>
      </TouchableOpacity>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image source={headerImage} style={styles.headerImage} />
        </View>

        <AbasSwipe
          cor={"#673ab7"}
          historia={
            <View style={styles.content}>
              <View style={styles.historyContainer}>
                <Text style={styles.historyTitle}>Entre o Mar, as Montanhas e a Imigração que Transformou o Estado</Text>
              <Text style={styles.historySubtitle}>Os Primeiros Povos e a Colonização</Text>
              <Text style={styles.historyText}>O território era habitado por Tupiniquins, Temiminós, Botocudos e Goitacás. A colonização começou em 1535, quando Vasco Fernandes Coutinho desembarcou na região. O nome Espírito Santo foi dado por a chegada ter ocorrido durante a celebração do Pentecostes.</Text>
              <Text style={styles.historySubtitle}>O Convento da Penha e o Isolamento Estratégico</Text>
              <Text style={styles.historyText}>O Convento da Penha, fundado em 1558, tornou-se um dos maiores símbolos da identidade capixaba. Quando ouro foi descoberto em Minas Gerais, Portugal restringiu o desenvolvimento do Espírito Santo para evitar o contrabando, retardando seu crescimento econômico.</Text>
              <Text style={styles.historySubtitle}>A Imigração Europeia</Text>
              <Text style={styles.historyText}>A partir da segunda metade do século XIX, o governo incentivou a chegada de imigrantes italianos, alemães e pomeranos, que fundaram comunidades agrícolas no interior e contribuíram para a diversificação econômica. A influência é visível na arquitetura, gastronomia e festas populares.</Text>
              <Text style={styles.historySubtitle}>O Café e o Crescimento Econômico</Text>
              <Text style={styles.historyText}>Durante os séculos XIX e XX, a produção de café tornou-se a principal atividade econômica, impulsionando o crescimento de diversas cidades. Posteriormente, a economia diversificou-se com atividades industriais, portuárias e de mineração.</Text>
              <Text style={styles.historySubtitle}>O Espírito Santo Contemporâneo</Text>
              <Text style={styles.historyText}>Atualmente, o estado destaca-se por sua economia diversificada, baseada na atividade portuária, mineração, indústria, agronegócio e turismo. O litoral, com as praias de Guarapari, e as tradições da imigração italiana formam uma identidade única.</Text>
              </View>
            </View>
          }
          culturaLocal={
            <View style={styles.content}>
              <LocalList sigla="ES" imagensLocais={{
              'Pedra Azul': conventoDaPenhaImage,
              'Guarapari': praiasDeGuarapariImage,
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
  tabs: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, backgroundColor: '#ede7f6' },
  tabButton: { paddingVertical: 8, paddingHorizontal: 25, borderRadius: 20 },
  activeTab: { backgroundColor: '#673ab7' },
  tabText: { color: '#673ab7', fontWeight: 'bold', fontSize: 16 },
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
