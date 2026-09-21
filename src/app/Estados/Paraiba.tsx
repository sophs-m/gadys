import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AbasSwipe from '../../components/AbasSwipe';
import LocalList from '../../components/LocalList';

const headerImage = require('../../../assets/images/estados/pb.png');

export default function Paraiba() {
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
          cor={"#1565c0"}
          historia={
            <View style={styles.content}>
              <View style={styles.historyContainer}>
                <Text style={styles.historyTitle}>Resistência, Cultura e a Formação do Nordeste Brasileiro</Text>
              <Text style={styles.historySubtitle}>Os Primeiros Povos e a Colonização</Text>
              <Text style={styles.historyText}>Antes dos portugueses, o território era habitado por Potiguaras, Tabajaras e Cariris. Em 1585 foi fundada a cidade de João Pessoa, inicialmente chamada de Filipéia de Nossa Senhora das Neves, consolidando o domínio português na região.</Text>
              <Text style={styles.historySubtitle}>O Ciclo do Açúcar</Text>
              <Text style={styles.historyText}>A partir do século XVII, a Paraíba integrou-se ao ciclo da cana-de-açúcar. Os engenhos se espalharam pelo litoral e pelo vale dos rios, impulsionando a economia colonial com forte dependência do trabalho de africanos escravizados.</Text>
              <Text style={styles.historySubtitle}>A Revolução de 1930</Text>
              <Text style={styles.historyText}>A Paraíba teve papel importante na Revolução de 1930. O assassinato do governador João Pessoa Cavalcanti de Albuquerque desencadeou o movimento liderado por Getúlio Vargas, que resultou na queda da República Velha. Em homenagem, a capital recebeu o nome de João Pessoa.</Text>
              <Text style={styles.historySubtitle}>Cultura e Identidade Paraibana</Text>
              <Text style={styles.historyText}>A cultura é marcada pela música, literatura popular e tradições nordestinas. O estado é berço de importantes nomes da cultura brasileira e possui forte ligação com o cordel, o forró e as festas populares, especialmente o São João.</Text>
              <Text style={styles.historySubtitle}>A Paraíba Contemporânea</Text>
              <Text style={styles.historyText}>Atualmente, o estado investe em educação, tecnologia e turismo. Suas praias, patrimônio histórico e manifestações culturais atraem visitantes de todo o Brasil. João Pessoa e Campina Grande são centros de crescimento econômico e cultural.</Text>
              </View>
            </View>
          }
          culturaLocal={
            <View style={styles.content}>
              <LocalList sigla="PB" />
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
  tabs: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, backgroundColor: '#e3f2fd' },
  tabButton: { paddingVertical: 8, paddingHorizontal: 25, borderRadius: 20 },
  activeTab: { backgroundColor: '#1565c0' },
  tabText: { color: '#1565c0', fontWeight: 'bold', fontSize: 16 },
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
