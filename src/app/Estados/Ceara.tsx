import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getPontosFavoritos, togglePontoFavorito } from '../../services/pontosFavoritos';
import AbasSwipe from '../../components/AbasSwipe';
import LocalList from '../../components/LocalList';

const headerImage = require('../../../assets/images/estados/ce.png');
const canoaQuebradaImage = require('../../../assets/images/ce/canoa.png');
const jericoacoaraImage = require('../../../assets/images/ce/jericoacoara.png');
const forroImage = require('../../../assets/images/ce/forro.png');
const estatuaImage = require('../../../assets/images/ce/centro.png');

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
        name: 'Forró',
        category: 'Evento',
        location: 'Ceará',
        description: 'Ritmo musical e dança que embala as noites cearenses, com suas sanfonas, zabumbas e triângulos.',
        modalDescription: `**Forró**\n\n**Origem e Formação de um Símbolo Nordestino**\nO forró é uma das manifestações culturais mais importantes do Nordeste brasileiro e possui origens ligadas às tradições populares do sertão. Sua formação resultou da mistura de influências indígenas, africanas e europeias. O gênero ganhou projeção nacional a partir das décadas de 1940 e 1950 graças ao trabalho de Luiz Gonzaga, que levou a música nordestina para todo o país.\n\nTradicionalmente executado com sanfona, zabumba e triângulo, o forró tornou-se uma importante forma de expressão das vivências do povo nordestino, retratando temas como a seca, a migração, o trabalho no campo e o cotidiano sertanejo. Além de gênero musical, o forró representa um patrimônio cultural que fortalece a identidade regional e mantém vivas tradições transmitidas entre gerações.`,
        image: forroImage,
        rating: 5
    },
    {
        name: 'Canoa Quebrada',
        category: 'Monumento',
        location: 'Aracati',
        description: 'Praia famosa por suas falésias avermelhadas, dunas e pelo símbolo da lua e da estrela.',
        modalDescription: `**Canoa Quebrada**\n\n**Da Vila de Pescadores ao Destino Turístico Internacional**\nLocalizada no município de Aracati, Canoa Quebrada surgiu como uma pequena comunidade de pescadores que viveu por séculos de forma relativamente isolada. A região começou a ganhar notoriedade na década de 1970, quando viajantes e grupos ligados ao movimento hippie descobriram suas paisagens de falésias avermelhadas, praias extensas e clima tranquilo.\n\nA partir desse período, Canoa Quebrada passou por um processo de desenvolvimento turístico que transformou a economia local. Mesmo com o crescimento da infraestrutura voltada para visitantes, a vila preservou elementos de sua cultura tradicional, especialmente a pesca artesanal.\n\nHoje, o símbolo da lua e estrela esculpido nas falésias tornou-se uma das imagens mais conhecidas do turismo cearense, representando a liberdade, a diversidade cultural e a beleza natural da região.`,
        image: canoaQuebradaImage,
        rating: 5
    },
    {
        name: 'Jericoacoara',
        category: 'Monumento',
        location: 'Jijoca de Jericoacoara',
        description: 'Vila de pescadores com ruas de areia, praias paradisíacas e a famosa Pedra Furada.',
        modalDescription: `**Jericoacoara**\n\n**De Comunidade Isolada a Referência Mundial em Turismo**\nJericoacoara, localizada no litoral oeste do Ceará, teve origem como uma pequena vila de pescadores cercada por dunas e áreas de vegetação costeira. Durante grande parte de sua história, o acesso ao local era extremamente difícil, o que contribuiu para a preservação de suas paisagens naturais.\n\nA partir das décadas de 1980 e 1990, a região passou a atrair visitantes brasileiros e estrangeiros interessados em suas praias, lagoas e formações naturais. O reconhecimento de sua importância ambiental levou à criação do Parque Nacional de Jericoacoara.\n\nAtualmente, Jericoacoara é considerada um dos destinos turísticos mais famosos do Brasil, demonstrando como a preservação ambiental e o turismo podem contribuir para o crescimento econômico sem apagar a história e as tradições locais.`,
        image: jericoacoaraImage,
        rating: 5
    },
    {
        name: 'Centro Dragão do Mar de Arte e Cultura',
        category: 'Monumento',
        location: 'Fortaleza',
        description: 'Centro cultural e de entretenimento em homenagem ao herói abolicionista Francisco José do Nascimento.',
        modalDescription: `**Centro Dragão do Mar de Arte e Cultura**\n\n**Homenagem a um Líder Abolicionista**\nO Centro Dragão do Mar recebeu esse nome em homenagem a Francisco José do Nascimento, líder jangadeiro que teve papel importante no movimento abolicionista cearense. Em 1881, ele e outros trabalhadores do porto recusaram-se a transportar pessoas escravizadas para embarcações, tornando-se símbolo da luta pela liberdade.\n\nInaugurado em 1999, o complexo foi criado com o objetivo de promover a cultura, a educação e as artes no Ceará. O espaço reúne museus, cinemas, teatros, bibliotecas, planetário e áreas para exposições, tornando-se um dos maiores centros culturais do país.`,
        image: estatuaImage,
        rating: 4
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

export default function Ceara() {
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
          cor={"#e91e63"}
          historia={
            <View style={styles.content}>
              <View style={styles.historyContainer}>
                <Text style={styles.historyTitle}>Da Resistência Indígena à Terra da Liberdade</Text>
              <Text style={styles.historySubtitle}>Os Primeiros Povos do Ceará</Text>
              <Text style={styles.historyText}>O território cearense era habitado por diversos povos indígenas, como os Potiguaras, Tabajaras, Tremembés e Kariris. Esses povos desenvolveram conhecimentos sobre a convivência com o clima do sertão, influenciando costumes e tradições que permanecem na identidade cearense.</Text>
              <Text style={styles.historySubtitle}>A Ocupação Colonial e a Pecuária</Text>
              <Text style={styles.historyText}>Diferentemente de outros estados nordestinos, o Ceará não se desenvolveu em torno da cana-de-açúcar. A atividade que impulsionou a ocupação do interior foi a pecuária, que expandiu-se pelos sertões durante os séculos XVII e XVIII, dando origem à "Civilização do Couro".</Text>
              <Text style={styles.historySubtitle}>As Grandes Secas e as Migrações</Text>
              <Text style={styles.historyText}>O Ceará enfrentou sucessivas secas ao longo de sua história. A Grande Seca de 1877 a 1879 provocou intenso movimento migratório para outras regiões do país, especialmente para a Amazônia durante o Ciclo da Borracha.</Text>
              <Text style={styles.historySubtitle}>A Terra da Luz</Text>
              <Text style={styles.historyText}>Em 1884, quatro anos antes da Lei Áurea, o Ceará aboliu a escravidão, tornando-se a primeira província brasileira a fazê-lo. O líder jangadeiro Francisco José do Nascimento (Dragão do Mar) recusou-se a transportar escravizados, sendo símbolo desse movimento. O Ceará passou a ser conhecido como "Terra da Luz".</Text>
              <Text style={styles.historySubtitle}>Cultura e Belezas Naturais</Text>
              <Text style={styles.historyText}>O forró tornou-se uma das maiores expressões da identidade nordestina. Destinos como Jericoacoara e Canoa Quebrada transformaram-se em importantes polos turísticos, atraindo visitantes do mundo inteiro e fortalecendo a economia local.</Text>
              </View>
            </View>
          }
          culturaLocal={
            <View style={styles.content}>
              <LocalList sigla="CE" imagensLocais={{
              'Jericoacoara': jericoacoaraImage,
              'Canoa Quebrada': canoaQuebradaImage,
              'Forró': forroImage,
              'Centro Dragão do Mar de Arte e Cultura': estatuaImage,
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
  tabs: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, backgroundColor: '#fce4ec' },
  tabButton: { paddingVertical: 8, paddingHorizontal: 25, borderRadius: 20 },
  activeTab: { backgroundColor: '#e91e63' },
  tabText: { color: '#e91e63', fontWeight: 'bold', fontSize: 16 },
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
