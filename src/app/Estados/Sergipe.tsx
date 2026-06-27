import AbasSwipe from '../../components/AbasSwipe';
import LocalList from '../../components/LocalList';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getPontosFavoritos, togglePontoFavorito } from '../../services/pontosFavoritos';

const headerImage = require('../../../assets/images/estados/se.png');
const canionDoXingoImage = require('../../../assets/images/se/canion.png');
const festaDoMastroImage = require('../../../assets/images/se/festa-do-mastro.png');
const praiaDeAtalaiaImage = require('../../../assets/images/se/praca.png');

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
        name: 'Festa do Mastro',
        category: 'Evento',
        location: 'Capela',
        description: 'Uma festa que une o sagrado e o profano, com a queima do mastro e a “sarandaia” pelas ruas da cidade.',
        modalDescription: `**Festa do Mastro**\n\n**Tradição Popular e Identidade Sergipana**\nA Festa do Mastro é uma manifestação cultural tradicional de Sergipe, especialmente conhecida na cidade de Capela. Sua origem está ligada às celebrações religiosas e às antigas práticas comunitárias do interior nordestino, que misturam fé, festa e organização popular.\n\nO evento gira em torno do corte e transporte de um grande mastro de madeira, que simboliza devoção e união da comunidade. Ao longo do tempo, a festa incorporou elementos profanos, como música, dança e celebrações de rua, tornando-se uma das expressões mais importantes da cultura popular sergipana.`,
        image: festaDoMastroImage,
        rating: 5
    },
    {
        name: 'Cânion do Xingó',
        category: 'Outro',
        location: 'Canindé de São Francisco',
        description: 'Um vale profundo e estreito, com paredões de arenito de até 50 metros de altura, formado pelo represamento do Rio São Francisco.',
        modalDescription: `**Cânion de Xingó**\n\n**História Geológica e Cultura do Sertão do São Francisco**\nO Cânion de Xingó, localizado na divisa entre Sergipe e Alagoas, é uma impressionante formação rochosa esculpida ao longo de milhões de anos pela ação do rio São Francisco. Antes da construção da Usina de Xingó, a região era marcada por corredeiras e paisagens naturais do sertão semiárido.\n\nHistoricamente, o entorno do cânion foi ocupado por comunidades ribeirinhas que viviam da pesca e da agricultura de subsistência. Com a formação do reservatório da usina, a área passou a ter também importância turística e energética.\n\nHoje, o Cânion de Xingó é um dos principais destinos de ecoturismo do Nordeste, reunindo natureza, história geológica e cultura sertaneja.`,
        image: canionDoXingoImage,
        rating: 5
    },
    {
        name: 'Praça São Francisco',
        category: 'Monumento',
        location: 'São Cristóvão',
        description: 'A praça é um testemunho único do período em que as coroas de Portugal e Espanha estavam unidas, entre 1580 e 1640.',
        modalDescription: `**Praça São Francisco**\n\n**Patrimônio Histórico e Memória Colonial**\nA Praça São Francisco, localizada em São Cristóvão (Sergipe), é um dos mais importantes conjuntos arquitetônicos coloniais do Brasil. Sua origem remonta ao período da colonização portuguesa, quando a cidade foi uma das primeiras capitais da capitania de Sergipe.\n\nA praça é cercada por edifícios históricos, como igrejas e antigos casarões, que refletem a organização urbana do período colonial. Seu conjunto arquitetônico preserva características do barroco e da influência religiosa na formação das cidades brasileiras.\n\nAtualmente, a Praça São Francisco é reconhecida como Patrimônio Cultural da Humanidade, sendo um dos principais símbolos da história e da identidade sergipana.`,
        image: praiaDeAtalaiaImage,
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

export default function Sergipe() {
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
          cor={"#ffca28"}
          historia={
            <View style={styles.content}>
              <View style={styles.historyContainer}>
                <Text style={styles.historyTitle}>O Menor Estado e a Formação do Nordeste Colonial</Text>
              <Text style={styles.historySubtitle}>Os Primeiros Povos e a Colonização</Text>
              <Text style={styles.historyText}>O território era habitado por Tupinambás, Caetés e Kiriris. A colonização portuguesa foi marcada por conflitos com indígenas. Durante muito tempo, Sergipe foi subordinado à Bahia, sendo utilizado como área de expansão agrícola e pecuária.</Text>
              <Text style={styles.historySubtitle}>O Ciclo do Açúcar</Text>
              <Text style={styles.historyText}>Assim como outras regiões do Nordeste, Sergipe integrou-se ao ciclo da cana-de-açúcar, com engenhos espalhados pelo litoral. A produção dependia fortemente do trabalho de africanos escravizados, que tiveram papel central na formação cultural do estado.</Text>
              <Text style={styles.historySubtitle}>A Criação da Capitania e Aracaju</Text>
              <Text style={styles.historyText}>Em 1820, Sergipe foi elevado à condição de capitania independente. Em 1855, a capital foi transferida de São Cristóvão para a recém-planejada Aracaju, que se tornou rapidamente o principal centro político e econômico do estado.</Text>
              <Text style={styles.historySubtitle}>Patrimônio Histórico</Text>
              <Text style={styles.historyText}>A Praça São Francisco, em São Cristóvão, é Patrimônio Cultural da Humanidade pela UNESCO, preservando igrejas barrocas e casarões coloniais. O Cânion do Xingó e as praias de Aracaju completam o patrimônio natural do estado.</Text>
              <Text style={styles.historySubtitle}>Sergipe Contemporâneo</Text>
              <Text style={styles.historyText}>Atualmente, a economia sergipana é baseada na indústria, comércio, petróleo e gás. O estado combina tradição cultural nordestina, festas populares como o São João e crescimento econômico contínuo.</Text>
              </View>
            </View>
          }
          culturaLocal={
            <View style={styles.content}>
              <LocalList sigla="SE" imagensLocais={{}} />
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
  tabs: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, backgroundColor: '#fffde7' },
  tabButton: { paddingVertical: 8, paddingHorizontal: 25, borderRadius: 20 },
  activeTab: { backgroundColor: '#ffca28' },
  tabText: { color: '#ffca28', fontWeight: 'bold', fontSize: 16 },
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
