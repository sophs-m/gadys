import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AbasSwipe from '../../components/AbasSwipe';
import LocalList from '../../components/LocalList';

const headerImage = require('../../../assets/images/estados/df.png');

export default function DistritoFederal() {
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
              <LocalList sigla="DF" />
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
