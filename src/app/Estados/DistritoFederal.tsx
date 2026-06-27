import AbasSwipe from '../../components/AbasSwipe';
import LocalList from '../../components/LocalList';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getPontosFavoritos, togglePontoFavorito } from '../../services/pontosFavoritos';

const headerImage = require('../../../assets/images/estados/df.png');
const congressoNacionalImage = require('../../../assets/images/df/congresso.png');
const catedralImage = require('../../../assets/images/df/catedral.png');
const choroImage = require('../../../assets/images/df/choro.png');
const ponteImage = require('../../../assets/images/df/ponte.png');

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
        name: 'Clube do Choro',
        category: 'Evento',
        location: 'Brasília',
        description: 'Um dos principais redutos do choro no Brasil, com programação musical intensa e de alta qualidade.',
        modalDescription: `**Clube do Choro de Brasília**\n\n**A Preservação de uma Tradição Musical Brasileira**\nO Clube do Choro de Brasília nasceu em 1977, criado por músicos e admiradores do choro, um dos gêneros musicais mais tradicionais do Brasil. A instituição surgiu com o objetivo de preservar e divulgar esse patrimônio cultural, reunindo artistas, estudantes e apreciadores da música instrumental brasileira.\n\nAo longo das décadas, o clube tornou-se um dos principais centros de difusão do choro no país. Seu palco recebeu importantes músicos brasileiros e contribuiu para a formação de novas gerações de instrumentistas por meio de projetos educacionais e apresentações culturais. Hoje, o local é reconhecido como um símbolo da riqueza musical de Brasília e da valorização da cultura nacional.`,
        image: choroImage,
        rating: 4
    },
    {
        name: 'Congresso Nacional',
        category: 'Monumento',
        location: 'Brasília',
        description: 'Sede do poder legislativo brasileiro, um ícone da arquitetura moderna de Oscar Niemeyer.',
        modalDescription: `**Congresso Nacional**\n\n**O Centro do Poder Legislativo Brasileiro**\nO Congresso Nacional é um dos edifícios mais emblemáticos de Brasília e representa o Poder Legislativo do Brasil. Projetado por Oscar Niemeyer, foi inaugurado em 1960 juntamente com a nova capital federal.\n\nSua arquitetura tornou-se um dos maiores símbolos do modernismo brasileiro. As duas torres centrais são ladeadas por duas cúpulas: a convexa abriga o Senado Federal, enquanto a côncava abriga a Câmara dos Deputados. O conjunto foi planejado para representar o equilíbrio entre as instituições democráticas e a modernidade do país.\n\nAlém de sua função política, o Congresso Nacional simboliza a transferência da capital para o interior do país, projeto idealizado por Juscelino Kubitschek para promover a integração nacional.`,
        image: congressoNacionalImage,
        rating: 5
    },
    {
        name: 'Catedral Metropolitana',
        category: 'Monumento',
        location: 'Brasília',
        description: 'Uma obra-prima de Niemeyer, com seus 16 arcos de concreto e vitrais que se elevam aos céus.',
        modalDescription: `**Catedral Metropolitana de Brasília**\n\n**Um Marco da Arquitetura Moderna**\nA Catedral Metropolitana Nossa Senhora Aparecida é uma das obras mais conhecidas de Brasília. Projetada por Oscar Niemeyer e inaugurada em 1970, sua estrutura inovadora tornou-se um símbolo da arquitetura moderna mundial.\n\nO edifício é formado por dezesseis colunas curvas de concreto que se unem em direção ao céu, criando um efeito visual que remete a mãos erguidas em oração. Diferentemente das catedrais tradicionais, grande parte de seu espaço encontra-se abaixo do nível do solo, fazendo com que os visitantes percorram um corredor escuro antes de alcançar o interior iluminado.\n\nA Catedral representa não apenas um espaço religioso, mas também a visão artística que marcou a construção de Brasília, unindo espiritualidade, engenharia e inovação arquitetônica.`,
        image: catedralImage,
        rating: 5
    },
    {
        name: 'Ponte JK',
        category: 'Monumento',
        location: 'Brasília',
        description: 'Ponte estaiada sobre o Lago Paranoá, símbolo da modernidade e da engenharia de Brasília.',
        modalDescription: `**Ponte Juscelino Kubitschek**\n\n**Um Símbolo da Brasília Contemporânea**\nInaugurada em 2002, a Ponte JK foi construída para ligar o centro de Brasília às áreas residenciais localizadas às margens do Lago Paranoá. Seu nome homenageia Juscelino Kubitschek, responsável pela construção da capital federal.\n\nO projeto, desenvolvido pelo arquiteto Alexandre Chan, destaca-se pelos três grandes arcos assimétricos que atravessam a ponte, criando uma das estruturas mais inovadoras da engenharia brasileira contemporânea. Sua forma foi inspirada no movimento de uma pedra quicando sobre a água.\n\nAlém de facilitar a mobilidade urbana, a Ponte JK tornou-se um dos principais cartões-postais de Brasília, representando a continuidade do espírito modernista que marcou a criação da capital do país.`,
        image: ponteImage,
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

export default function DistritoFederal() {
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
          cor={"#cddc39"}
          historia={
            <View style={styles.content}>
              <View style={styles.historyContainer}>
                <Text style={styles.historyTitle}>O Sonho de Interiorizar o Brasil e a Construção de Brasília</Text>
              <Text style={styles.historySubtitle}>As Origens da Ideia</Text>
              <Text style={styles.historyText}>A criação de uma capital no interior do Brasil é um projeto antigo. A Constituição Republicana de 1891 determinou oficialmente a reserva de uma área no Planalto Central. Em 1892, a Missão Cruls delimitou a área que seria utilizada para a construção da nova capital.</Text>
              <Text style={styles.historySubtitle}>Juscelino Kubitschek e o Plano de Metas</Text>
              <Text style={styles.historyText}>A construção tornou-se realidade no governo de Juscelino Kubitschek, incorporada ao Plano de Metas com o lema "Cinquenta anos em cinco". As obras começaram em 1956, com projeto urbanístico de Lúcio Costa e arquitetura de Oscar Niemeyer.</Text>
              <Text style={styles.historySubtitle}>Os Candangos e a Construção</Text>
              <Text style={styles.historyText}>Milhares de trabalhadores, especialmente nordestinos, migraram para a região e ficaram conhecidos como candangos. Em apenas quatro anos, uma cidade inteira foi construída no coração do país.</Text>
              <Text style={styles.historySubtitle}>A Inauguração em 1960</Text>
              <Text style={styles.historyText}>Em 21 de abril de 1960, Brasília foi inaugurada, substituindo o Rio de Janeiro como capital federal. Em 1987, foi reconhecida pela UNESCO como Patrimônio Mundial, sendo a primeira cidade moderna do mundo a receber esse título.</Text>
              <Text style={styles.historySubtitle}>O Distrito Federal Contemporâneo</Text>
              <Text style={styles.historyText}>Atualmente, o Distrito Federal é o centro político e administrativo do Brasil, abrigando os principais órgãos dos Poderes Executivo, Legislativo e Judiciário. Símbolos como o Congresso Nacional, a Catedral Metropolitana e a Ponte JK representam a modernidade que marcou sua construção.</Text>
              </View>
            </View>
          }
          culturaLocal={
            <View style={styles.content}>
              <LocalList sigla="DF" imagensLocais={{}} />
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
  tabs: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, backgroundColor: '#f0f4c3' },
  tabButton: { paddingVertical: 8, paddingHorizontal: 25, borderRadius: 20 },
  activeTab: { backgroundColor: '#cddc39' },
  tabText: { color: '#cddc39', fontWeight: 'bold', fontSize: 16 },
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
