import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AbasSwipe from '../../components/AbasSwipe';
import LocalList from '../../components/LocalList';

const headerImage = require('../../../assets/images/estados/rj.png');

const COR = '#FFC700';

export default function RioDeJaneiro() {
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
                <Text style={styles.historyTitle}>A Cidade Maravilhosa e Sua História</Text>
                <Text style={styles.historySubtitle}>A Fundação Colonial</Text>
                <Text style={styles.historyText}>O Rio de Janeiro foi fundado pelos portugueses em 1565, sendo uma das primeiras cidades planejadas do continente americano. Sua posição estratégica na Baía de Guanabara a tornaram essencial para o comércio e defesa colonial.</Text>
                <Text style={styles.historySubtitle}>Capital do Brasil e do Império</Text>
                <Text style={styles.historyText}>Em 1808, a família real portuguesa se transferiu para o Rio, transformando a cidade em capital do Império Português e, depois, do Brasil independente. O período trouxe grandes transformações urbanas e culturais.</Text>
                <Text style={styles.historySubtitle}>A Belle Époque Carioca</Text>
                <Text style={styles.historyText}>No início do século XX, o prefeito Pereira Passos remodelou a cidade nos moldes de Paris, abrindo grandes avenidas e modernizando o centro. O Rio tornou-se sinônimo de elegância e cultura no Brasil.</Text>
                <Text style={styles.historySubtitle}>Capital Federal até 1960</Text>
                <Text style={styles.historyText}>O Rio foi capital federal do Brasil até 1960, quando Brasília foi inaugurada. Mesmo perdendo o status político, permaneceu como capital cultural e econômica do país por décadas.</Text>
                <Text style={styles.historySubtitle}>Patrimônio Mundial</Text>
                <Text style={styles.historyText}>Em 2012, a paisagem carioca — com suas montanhas, praias e floresta urbana — foi reconhecida pela UNESCO como Patrimônio Mundial da Humanidade, a primeira paisagem cultural urbana do mundo a receber essa distinção.</Text>
              </View>
            </View>
          }
          culturaLocal={
            <View style={styles.content}>
              <LocalList sigla="RJ" />
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
  categoryHeader: { marginBottom: 10 },
  categoryHeaderText: { fontSize: 20, fontWeight: 'bold', color: COR },
  card: { backgroundColor: '#2A3F5F', borderRadius: 15, marginBottom: 20, elevation: 3 },
  cardHeart: { position: 'absolute', top: 10, right: 10, zIndex: 1, backgroundColor: 'rgba(0,0,0,0.35)', borderRadius: 20, padding: 5 },
  cardImage: { width: '100%', height: 150, borderTopLeftRadius: 15, borderTopRightRadius: 15 },
  cardContent: { padding: 15 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: COR },
  cardCategory: { fontSize: 14, color: '#aaa', marginVertical: 5 },
  cardDescription: { fontSize: 14, color: '#ccc' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: '#fff', borderRadius: 15, padding: 20, width: '90%', maxHeight: '80%' },
  modalImage: { width: '100%', height: 150, borderRadius: 15, marginBottom: 15 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: COR, marginBottom: 5 },
  modalCategory: { fontSize: 14, color: '#aaa', marginBottom: 10, paddingHorizontal: 20 },
  modalDescription: { fontSize: 15, color: '#ddd', lineHeight: 23 },
  closeButton: { backgroundColor: COR, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20, marginTop: 15, alignSelf: 'center' },
  closeButtonText: { color: '#0A172A', fontWeight: 'bold', fontSize: 15 },
});
