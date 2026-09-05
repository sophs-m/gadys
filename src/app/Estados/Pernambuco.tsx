import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AbasSwipe from '../../components/AbasSwipe';
import LocalList from '../../components/LocalList';
import { getPontosFavoritos, togglePontoFavorito } from '../../services/pontosFavoritos';

const headerImage = require('../../../assets/images/estados/pe.png');
const recifeAntigoImage = require('../../../assets/images/pe/recife-antigo.png');
const olindaImage = require('../../../assets/images/pe/olinda.png');
const frevoImage = require('../../../assets/images/pe/frevo.png');

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
        name: 'Frevo',
        category: 'Evento',
        location: 'Pernambuco',
        description: 'Dança e ritmo musical eletrizante, com seus passistas e sombrinhas coloridas, que agita o carnaval de Pernambuco.',
        modalDescription: `**Frevo**\n\n**Energia, Resistência e Identidade Pernambucana**\nO frevo surgiu em Pernambuco no final do século XIX e início do século XX, principalmente nas ruas do Recife durante o período do carnaval. Ele nasceu da mistura de marchas militares, polcas e elementos da música popular, acelerados ao extremo pelas fanfarras das ruas.\n\nA dança do frevo, marcada por movimentos rápidos e acrobáticos com o uso de sombrinhas coloridas, se desenvolveu como expressão popular ligada às classes trabalhadoras e aos antigos blocos carnavalescos. Com o tempo, tornou-se símbolo da identidade pernambucana e uma das mais importantes manifestações culturais do Brasil.`,
        image: frevoImage,
        rating: 5
    },
    {
        name: 'Recife Antigo',
        category: 'Monumento',
        location: 'Recife',
        description: 'Bairro histórico com ruas de paralelepípedos, casarões coloridos e a Embaixada dos Bonecos Gigantes.',
        modalDescription: `**Recife Antigo**\n\n**Porto Colonial e Centro Histórico do Nordeste**\nO Recife Antigo é a área onde a cidade de Recife começou a se desenvolver, ainda no período colonial, por volta do século XVI. Sua localização estratégica, entre rios e o mar, transformou a região em um importante porto para o escoamento do açúcar produzido em Pernambuco.\n\nDurante a ocupação holandesa no século XVII, o Recife ganhou grande importância administrativa e urbanística, especialmente sob o governo de Maurício de Nassau, quando foram construídas pontes, canais e melhorias urbanas.\n\nHoje, o Recife Antigo preserva parte dessa história em seus casarões, ruas históricas e espaços culturais, sendo um dos principais centros turísticos e culturais de Pernambuco.`,
        image: recifeAntigoImage,
        rating: 5
    },
    {
        name: 'Olinda',
        category: 'Monumento',
        location: 'Olinda',
        description: 'Cidade Patrimônio da UNESCO, com suas ladeiras, igrejas barrocas e uma vista deslumbrante do mar.',
        modalDescription: `**Olinda**\n\n**Patrimônio Barroco e Formação da Capitania de Pernambuco**\nA cidade de Olinda foi fundada em 1535 e rapidamente se tornou um dos centros mais ricos do Brasil colonial, impulsionada pelo ciclo da cana-de-açúcar. Sua posição estratégica no litoral pernambucano favoreceu o comércio e a administração da capitania.\n\nDurante a invasão holandesa no século XVII, Olinda foi parcialmente destruída, e Recife passou a ganhar maior importância econômica e política. Mesmo assim, Olinda manteve seu valor religioso e cultural, preservando igrejas barrocas, conventos e um conjunto arquitetônico colonial único.\n\nAtualmente, Olinda é reconhecida como Patrimônio Cultural da Humanidade e é famosa por seu carnaval de rua, marcado por blocos, bonecos gigantes e forte participação popular.`,
        image: olindaImage,
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

export default function Pernambuco() {
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
          cor={"#f44336"}
          historia={
            <View style={styles.content}>
              <View style={styles.historyContainer}>
                <Text style={styles.historyTitle}>Revoluções, Açúcar e a Formação do Nordeste Brasileiro</Text>
              <Text style={styles.historySubtitle}>A Colonização e o Ciclo do Açúcar</Text>
              <Text style={styles.historyText}>O território era habitado por Caetés, Tabajaras e Potiguaras. A colonização portuguesa consolidou-se rapidamente, com Olinda tornando-se um dos primeiros centros administrativos. O clima e os solos férteis transformaram Pernambuco em uma das regiões mais ricas do Brasil colonial.</Text>
              <Text style={styles.historySubtitle}>A Invasão Holandesa e as Batalhas dos Guararapes</Text>
              <Text style={styles.historyText}>Em 1630, os holandeses ocuparam a região. Durante esse período, Recife cresceu em importância sob o governo de Maurício de Nassau. Os holandeses foram expulsos definitivamente em 1654, após as Batalhas dos Guararapes, que consolidaram a resistência luso-brasileira.</Text>
              <Text style={styles.historySubtitle}>As Revoluções Pernambucanas</Text>
              <Text style={styles.historyText}>Pernambuco teve papel central em diversas revoluções: a Revolução Pernambucana de 1817 e a Confederação do Equador de 1824. Esses episódios mostram o forte espírito político e contestador da região ao longo da história.</Text>
              <Text style={styles.historySubtitle}>Patrimônio Cultural</Text>
              <Text style={styles.historyText}>O frevo, o maracatu e o carnaval de Recife e Olinda são expressões culturais únicas do estado. O conjunto histórico de Olinda foi reconhecido pela UNESCO como Patrimônio Cultural da Humanidade.</Text>
              <Text style={styles.historySubtitle}>Pernambuco Contemporâneo</Text>
              <Text style={styles.historyText}>Atualmente, Pernambuco é um dos estados mais influentes do Nordeste, com forte presença cultural, histórica e econômica. Recife é importante polo urbano com destaque para tecnologia, educação e cultura.</Text>
              </View>
            </View>
          }
          culturaLocal={
            <View style={styles.content}>
              <LocalList sigla="PE" imagensLocais={{}} />
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
  tabs: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, backgroundColor: '#ffebee' },
  tabButton: { paddingVertical: 8, paddingHorizontal: 25, borderRadius: 20 },
  activeTab: { backgroundColor: '#f44336' },
  tabText: { color: '#f44336', fontWeight: 'bold', fontSize: 16 },
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
