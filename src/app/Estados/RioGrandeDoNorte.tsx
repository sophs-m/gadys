import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AbasSwipe from '../../components/AbasSwipe';
import LocalList from '../../components/LocalList';

const headerImage = require('../../../assets/images/estados/rn.png');

export default function RioGrandeDoNorte() {
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
          cor={"#ff9800"}
          historia={
            <View style={styles.content}>
              <View style={styles.historyContainer}>
                <Text style={styles.historyTitle}>Ventos, Sal e a Formação do Nordeste Litorâneo</Text>
              <Text style={styles.historySubtitle}>Os Primeiros Povos e a Fundação de Natal</Text>
              <Text style={styles.historyText}>O território era habitado por Potiguaras, Tapuias e Tarairiús. Em 1599 foi fundada Natal, com a construção do Forte dos Reis Magos para garantir o controle português sobre o litoral e expulsar invasores estrangeiros.</Text>
              <Text style={styles.historySubtitle}>A Economia do Sal e do Algodão</Text>
              <Text style={styles.historyText}>O Rio Grande do Norte destacou-se historicamente pela produção de sal marinho nas regiões de Mossoró e Macau. No século XIX, o algodão também ganhou importância, impulsionado pela demanda internacional. Essas atividades contribuíram para o crescimento de cidades e para a integração ao comércio internacional.</Text>
              <Text style={styles.historySubtitle}>Resistência e Pioneirismo</Text>
              <Text style={styles.historyText}>Em 1883, Mossoró aboliu a escravidão antes da Lei Áurea, tornando-se símbolo de resistência. Em 1927, a cidade resistiu ao ataque de Lampião, sendo outro episódio marcante da identidade potiguar.</Text>
              <Text style={styles.historySubtitle}>Turismo e Belezas Naturais</Text>
              <Text style={styles.historyText}>O litoral potiguar é conhecido por suas dunas, falésias e praias de águas claras. Natal é um dos principais destinos turísticos do Nordeste. Os Parrachos de Maracajaú são formações de recifes de corais com rica biodiversidade marinha.</Text>
              <Text style={styles.historySubtitle}>O Rio Grande do Norte Contemporâneo</Text>
              <Text style={styles.historyText}>A presença de ventos constantes tornou o estado um dos maiores produtores de energia eólica do Brasil. A economia combina turismo, sal, petróleo e energias renováveis, mantendo forte identidade cultural nordestina.</Text>
              </View>
            </View>
          }
          culturaLocal={
            <View style={styles.content}>
              <LocalList sigla="RN" />
            </View>
          }
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A172A' },
  header: { height: 250, position: 'relative' },
  headerImage: { width: '100%', height: '100%' },
  backButton: { position: 'absolute', top: 40, left: 20, zIndex: 10, backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20 },
  backButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  tabs: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, backgroundColor: '#fff3e0' },
  tabButton: { paddingVertical: 8, paddingHorizontal: 25, borderRadius: 20 },
  activeTab: { backgroundColor: '#ff9800' },
  tabText: { color: '#ff9800', fontWeight: 'bold', fontSize: 16 },
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
