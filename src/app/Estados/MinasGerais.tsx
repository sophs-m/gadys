import AbasSwipe from '../../components/AbasSwipe';
import LocalList from '../../components/LocalList';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getPontosFavoritos, togglePontoFavorito } from '../../services/pontosFavoritos';

const headerImage = require('../../../assets/images/estados/mg.png');
const ouroPretoImage = require('../../../assets/images/mg/ouro.png');
const inhotimImage = require('../../../assets/images/mg/instituto.png');
const congadoImage = require('../../../assets/images/mg/congado.png');

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
        name: 'Congado',
        category: 'Evento',
        location: 'Minas Gerais',
        description: 'Uma festa folclórica de origem africana que celebra a coroação de reis e rainhas do Congo, com música, dança e desfiles coloridos.',
        modalDescription: `**Congado**\n\n**Herança Afro-brasileira e Resistência Cultural**\nO Congado é uma manifestação cultural e religiosa de origem afro-brasileira que se desenvolveu principalmente em Minas Gerais durante o período colonial. Ele nasce da fusão entre tradições africanas trazidas por pessoas escravizadas, o catolicismo imposto pelos colonizadores e elementos da cultura indígena.\n\nHistoricamente, o congado funcionava como uma forma de resistência e preservação da identidade africana, permitindo a manutenção de cantos, danças, ritmos e narrativas de ancestralidade dentro do contexto da escravidão. As irmandades do Rosário tiveram papel central nesse processo, organizando festas, coroações de reis e celebrações comunitárias.\n\nHoje, o congado é uma das mais importantes expressões da cultura popular mineira, simbolizando fé, memória e resistência histórica.`,
        image: congadoImage,
        rating: 5
    },
    {
        name: 'Ouro Preto',
        category: 'Monumento',
        location: 'Ouro Preto',
        description: 'Cidade histórica colonial, patrimônio da Humanidade pela UNESCO, famosa por sua arquitetura barroca.',
        modalDescription: `**Ouro Preto**\n\n**Ciclo do Ouro e Patrimônio Histórico do Brasil**\nA cidade de Ouro Preto, em Minas Gerais, surgiu no final do século XVII durante o ciclo da mineração de ouro. A descoberta de grandes jazidas na região atraiu milhares de pessoas e transformou o local em um dos principais centros econômicos do Brasil colonial.\n\nDurante o século XVIII, Ouro Preto tornou-se capital da Capitania de Minas Gerais e palco de importantes acontecimentos históricos, como a Inconfidência Mineira, que refletia o descontentamento com a exploração portuguesa.\n\nA riqueza do ciclo do ouro impulsionou a construção de igrejas barrocas, obras de arte e arquitetura colonial que permanecem preservadas até hoje, fazendo da cidade um dos maiores patrimônios históricos do país.`,
        image: ouroPretoImage,
        rating: 5
    },
    {
        name: 'Instituto Inhotim',
        category: 'Outro',
        location: 'Brumadinho',
        description: 'Um dos mais importantes acervos de arte contemporânea do Brasil e um jardim botânico de relevância mundial.',
        modalDescription: `**Instituto Inhotim**\n\n**Arte Contemporânea e Natureza em Diálogo**\nO Instituto Inhotim, localizado em Brumadinho (Minas Gerais), é um dos maiores centros de arte contemporânea a céu aberto do mundo. Ele foi criado a partir da coleção privada de Bernardo de Mello Paz e aberto ao público no início dos anos 2000.\n\nSua importância está na combinação entre arte, paisagismo e preservação ambiental, reunindo obras de artistas brasileiros e internacionais em meio a jardins botânicos e áreas de Mata Atlântica e Cerrado.\n\nO Inhotim influenciou a forma de pensar museus no Brasil, unindo experiência artística e contato direto com a natureza, além de se tornar referência em turismo cultural e educação ambiental.`,
        image: inhotimImage,
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

export default function MinasGerais() {
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
          cor={"#c62828"}
          historia={
            <View style={styles.content}>
              <View style={styles.historyContainer}>
                <Text style={styles.historyTitle}>Ouro, Conjurações e a Construção da Identidade Brasileira</Text>
              <Text style={styles.historySubtitle}>A Descoberta do Ouro e o Ciclo Minerador</Text>
              <Text style={styles.historyText}>No final do século XVII, expedições bandeirantes descobriram ouro na região, provocando uma corrida para o interior. Cidades como Ouro Preto, Sabará e Mariana tornaram-se centros econômicos da colônia, transformando Minas Gerais no principal polo econômico brasileiro do século XVIII.</Text>
              <Text style={styles.historySubtitle}>A Sociedade Mineira Colonial</Text>
              <Text style={styles.historyText}>A riqueza do ouro trouxe crescimento urbano com forte presença de igrejas, irmandades religiosas e comércio interno. A presença africana escravizada marcou profundamente a cultura mineira, influenciando música, culinária, religiosidade e tradições populares.</Text>
              <Text style={styles.historySubtitle}>A Inconfidência Mineira</Text>
              <Text style={styles.historyText}>No final do século XVIII, o aumento dos impostos gerou a Inconfidência Mineira. Influenciada por ideias iluministas, a conspiração defendia a criação de uma república independente. Tiradentes foi executado e transformado em símbolo da luta pela independência do Brasil.</Text>
              <Text style={styles.historySubtitle}>A Importância Política</Text>
              <Text style={styles.historyText}>Durante a República Velha, destacou-se a política do "café com leite", alternando poder entre Minas Gerais e São Paulo. Essa influência ajudou a moldar decisões nacionais e consolidou o estado como peça-chave na política brasileira.</Text>
              <Text style={styles.historySubtitle}>Ouro Preto e a Cultura Mineira</Text>
              <Text style={styles.historyText}>Ouro Preto foi reconhecida como Patrimônio Mundial pela UNESCO. A culinária mineira destaca-se com pão de queijo, feijão-tropeiro e doce de leite. Atualmente, Minas é um dos estados mais importantes do Brasil em população, economia e cultura.</Text>
              </View>
            </View>
          }
          culturaLocal={
            <View style={styles.content}>
              <LocalList sigla="MG" imagensLocais={{
              'Ouro Preto': ouroPretoImage,
              'Instituto Inhotim': inhotimImage,
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
  tabs: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, backgroundColor: '#ffebee' },
  tabButton: { paddingVertical: 8, paddingHorizontal: 25, borderRadius: 20 },
  activeTab: { backgroundColor: '#c62828' },
  tabText: { color: '#c62828', fontWeight: 'bold', fontSize: 16 },
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
