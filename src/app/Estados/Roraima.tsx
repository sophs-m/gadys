import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AbasSwipe from '../../components/AbasSwipe';
import LocalList from '../../components/LocalList';

const headerImage = require('../../../assets/images/estados/rr.png');

export default function Roraima() {
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
          cor={"#8bc34a"}
          historia={
            <View style={styles.content}>
              <View style={styles.historyContainer}>
                <Text style={styles.historyTitle}>Fronteira Norte, Povos Indígenas e a Construção do Estado Mais Setentrional</Text>
              <Text style={styles.historySubtitle}>Povos Originários e a Ocupação Lenta</Text>
              <Text style={styles.historyText}>O território era ocupado por Macuxi, Wapichana, Taurepang e Yanomami. A presença europeia foi tardia devido ao difícil acesso. A ocupação intensificou-se apenas nos séculos XVIII e XIX, com expedições militares e missões religiosas.</Text>
              <Text style={styles.historySubtitle}>O Território Federal e Roraima</Text>
              <Text style={styles.historyText}>Em 1943, foi criado o Território Federal do Rio Branco. Em 1962, passou a se chamar Roraima, nome associado ao Monte Roraima. Com a Constituição de 1988, tornou-se estado, garantindo maior autonomia administrativa.</Text>
              <Text style={styles.historySubtitle}>O Monte Roraima e a Natureza</Text>
              <Text style={styles.historyText}>O Monte Roraima é uma das formações geológicas mais antigas do planeta, localizado na tríplice fronteira entre Brasil, Venezuela e Guiana. Possui grande importância espiritual para povos indígenas e é um dos destinos mais emblemáticos do ecoturismo brasileiro.</Text>
              <Text style={styles.historySubtitle}>Boa Vista e o Crescimento Urbano</Text>
              <Text style={styles.historyText}>A capital Boa Vista foi planejada com traçado moderno em formato radial, tornando-se principal centro político e econômico. Sua localização próxima à linha do Equador a torna uma das capitais mais singulares do Brasil.</Text>
              <Text style={styles.historySubtitle}>Roraima Contemporânea</Text>
              <Text style={styles.historyText}>O estado é o menos populoso do Brasil, mas possui grande importância estratégica na Amazônia e nas relações de fronteira com Venezuela e Guiana. A cultura indígena é fundamental para a identidade do estado.</Text>
              </View>
            </View>
          }
          culturaLocal={
            <View style={styles.content}>
              <LocalList sigla="RR" />
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
  tabs: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, backgroundColor: '#f1f8e9' },
  tabButton: { paddingVertical: 8, paddingHorizontal: 25, borderRadius: 20 },
  activeTab: { backgroundColor: '#8bc34a' },
  tabText: { color: '#8bc34a', fontWeight: 'bold', fontSize: 16 },
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
