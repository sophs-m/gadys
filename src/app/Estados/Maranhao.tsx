import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AbasSwipe from '../../components/AbasSwipe';
import LocalList from '../../components/LocalList';

const headerImage = require('../../../assets/images/estados/maa.png');

export default function Maranhao() {
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
          cor={"#9c27b0"}
          historia={
            <View style={styles.content}>
              <View style={styles.historyContainer}>
                <Text style={styles.historyTitle}>O Encontro de Povos, Impérios e Culturas no Norte do Brasil</Text>
              <Text style={styles.historySubtitle}>A França Equinocial e a Fundação de São Luís</Text>
              <Text style={styles.historyText}>Em 1612, uma expedição francesa fundou São Luís, dando início à França Equinocial. Em 1615, forças portuguesas expulsaram os invasores. São Luís é a única capital brasileira fundada por franceses, tornando a história maranhense uma das mais singulares do país.</Text>
              <Text style={styles.historySubtitle}>O Estado do Maranhão e Grão-Pará</Text>
              <Text style={styles.historyText}>Em 1621, Portugal criou o Estado do Maranhão separado do Estado do Brasil, demonstrando a importância estratégica da região para a ocupação da Amazônia e defesa das fronteiras coloniais.</Text>
              <Text style={styles.historySubtitle}>O Ciclo do Algodão e a Influência Africana</Text>
              <Text style={styles.historyText}>Durante o século XVIII, a produção de algodão gerou grande prosperidade, permitindo a construção dos casarões revestidos de azulejos portugueses que caracterizam São Luís. A presença africana deu origem ao Bumba Meu Boi, reconhecido pela UNESCO como Patrimônio Cultural da Humanidade.</Text>
              <Text style={styles.historySubtitle}>A Balaiada</Text>
              <Text style={styles.historyText}>Entre 1838 e 1841, o Maranhão foi palco da Balaiada, importante revolta popular de vaqueiros, quilombolas e artesãos insatisfeitos com a concentração de poder nas elites locais.</Text>
              <Text style={styles.historySubtitle}>Lençóis Maranhenses e o Patrimônio Histórico</Text>
              <Text style={styles.historyText}>O Centro Histórico de São Luís foi declarado Patrimônio Mundial pela UNESCO em 1997. Os Lençóis Maranhenses, com suas dunas brancas e lagoas cristalinas, tornaram-se símbolo da biodiversidade brasileira e um dos destinos turísticos mais famosos do país.</Text>
              </View>
            </View>
          }
          culturaLocal={
            <View style={styles.content}>
              <LocalList sigla="MA" />
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
  tabs: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, backgroundColor: '#f3e5f5' },
  tabButton: { paddingVertical: 8, paddingHorizontal: 25, borderRadius: 20 },
  activeTab: { backgroundColor: '#9c27b0' },
  tabText: { color: '#9c27b0', fontWeight: 'bold', fontSize: 16 },
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
