import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AbasSwipe from '../../components/AbasSwipe';
import LocalList from '../../components/LocalList';

const headerImage = require('../../../assets/images/estados/ac.png');

export default function Acre() {
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
              <LocalList sigla="AC" />
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