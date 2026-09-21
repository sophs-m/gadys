import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AbasSwipe from '../../components/AbasSwipe';
import LocalList from '../../components/LocalList';

const headerImage = require('../../../assets/images/estados/am.png');

const COR = '#FFC700';

export default function Amazonas() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: '#0A172A' }}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Voltar</Text>
      </TouchableOpacity>
      
        <View style={styles.header}>
          <Image source={headerImage} style={styles.headerImage} />
        </View>
        <AbasSwipe
          cor={COR}
          historia={
            <View style={styles.content}>
              <View style={styles.historyContainer}>
                <Text style={styles.historyTitle}>O Coração da Amazônia e a História da Maior Floresta Tropical do Mundo</Text>
                <Text style={styles.historySubtitle}>Os Primeiros Povos da Amazônia</Text>
                <Text style={styles.historyText}>Povos como Tikuna, Yanomami, Baniwa, Sateré-Mawé e Tukano contribuíram para a diversidade cultural amazônica. Descobertas arqueológicas revelaram grandes comunidades organizadas com sistemas agrícolas avançados e profundo conhecimento ambiental.</Text>
                <Text style={styles.historySubtitle}>A Conquista Portuguesa</Text>
                <Text style={styles.historyText}>Em 1669 foi fundado o Forte de São José do Rio Negro, núcleo que deu origem à atual Manaus. Os rios tornaram-se verdadeiras estradas naturais para a ocupação do interior e a integração da região à colônia.</Text>
                <Text style={styles.historySubtitle}>O Ciclo da Borracha</Text>
                <Text style={styles.historyText}>No final do século XIX, a Amazônia tornou-se a principal fornecedora de látex do planeta. A riqueza transformou Manaus em uma das cidades mais modernas da América Latina, com o Teatro Amazonas inaugurado em 1896 como símbolo desse período.</Text>
                <Text style={styles.historySubtitle}>A Crise da Borracha</Text>
                <Text style={styles.historyText}>No início do século XX, sementes de seringueira levadas à Ásia permitiram plantações altamente produtivas, provocando o colapso da economia amazônica. O Amazonas enfrentou décadas de dificuldades econômicas.</Text>
                <Text style={styles.historySubtitle}>A Zona Franca de Manaus</Text>
                <Text style={styles.historyText}>Em 1967 foi criada a Zona Franca de Manaus, oferecendo incentivos fiscais para atrair indústrias. A iniciativa transformou Manaus em um dos principais polos industriais do Brasil, nos setores de eletrônicos, motocicletas e informática.</Text>
              </View>
            </View>
          }
          culturaLocal={
            <View style={styles.content}>
              <LocalList sigla="AM" />
            </View>
          }
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A172A' },
  header: { height: 250 },
  headerImage: { width: '100%', height: '100%' },
  backButton: { position: 'absolute', top: 40, left: 20, zIndex: 10, backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20 },
  backButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  content: { padding: 20 },
  historyContainer: { backgroundColor: '#1E2F4A', borderRadius: 15, padding: 20 },
  historyTitle: { fontSize: 22, fontWeight: 'bold', color: COR, marginBottom: 15, textAlign: 'center' },
  historySubtitle: { fontSize: 18, fontWeight: 'bold', color: COR, marginTop: 10, marginBottom: 5 },
  historyText: { fontSize: 16, color: '#ccc', lineHeight: 24, marginBottom: 10 },
  card: { backgroundColor: '#2A3F5F', borderRadius: 15, marginBottom: 20, elevation: 3 },
  cardHeart: { position: 'absolute', top: 10, right: 10, zIndex: 1, backgroundColor: 'rgba(0,0,0,0.35)', borderRadius: 20, padding: 5 },
  cardImage: { width: '100%', height: 150, borderTopLeftRadius: 15, borderTopRightRadius: 15 },
  cardContent: { padding: 15 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: COR },
  cardCategory: { fontSize: 14, color: '#aaa', marginVertical: 5 },
  cardDescription: { fontSize: 14, color: '#ccc' },
  modalContainer: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.6)' },
  modalContent: { backgroundColor: '#1E2F4A', borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '90%' },
  modalImage: { width: '100%', height: 220, borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  modalCloseBtn: { position: 'absolute', top: 14, right: 14, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 20, width: 30, height: 30, justifyContent: 'center', alignItems: 'center' },
  modalCloseBtnText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  modalBody: { padding: 20 },
  modalTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 5 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff', flex: 1, marginRight: 10 },
  modalCategory: { fontSize: 14, color: '#aaa', marginBottom: 10 },
  modalDescription: { fontSize: 15, color: '#ddd', lineHeight: 23 },
  modalSubtitle: { fontWeight: 'bold', color: '#FFC700' },
  closeButton: { backgroundColor: '#FFC700', margin: 20, marginTop: 0, borderRadius: 25, paddingVertical: 13, alignItems: 'center' },
  closeButtonText: { color: '#0A172A', fontWeight: 'bold', fontSize: 15 },
});
