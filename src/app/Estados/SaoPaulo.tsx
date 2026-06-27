import AbasSwipe from '../../components/AbasSwipe';
import LocalList from '../../components/LocalList';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const headerImage = require('../../../assets/images/estados/sp.png');
const maspImage = require('../../../assets/images/sp/masp.png');
const parqueImage = require('../../../assets/images/sp/parque.png');

const COR = '#FFC700';

export default function SaoPaulo() {
  const router = useRouter();

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
          cor={COR}
          historia={
            <View style={styles.content}>
              <View style={styles.historyContainer}>
                <Text style={styles.historyTitle}>São Paulo: Da Fundação Jesuítica à Metrópole Global</Text>
                <Text style={styles.historySubtitle}>A Fundação Jesuítica (1554)</Text>
                <Text style={styles.historyText}>São Paulo foi fundada em 25 de janeiro de 1554 pelos padres jesuítas Manuel da Nóbrega e José de Anchieta, no alto do Planalto Piratininga. A localização estratégica distante do litoral favoreceu as expedições de exploração do interior do continente.</Text>
                <Text style={styles.historySubtitle}>Os Bandeirantes</Text>
                <Text style={styles.historyText}>No século XVII, os bandeirantes partiram de São Paulo em expedições que expandiram as fronteiras do Brasil, descobrindo ouro em Minas Gerais e Goiás, e apresando indígenas. São Paulo tornou-se o ponto de partida do desbravamento do interior do continente.</Text>
                <Text style={styles.historySubtitle}>O Café e a Industrialização</Text>
                <Text style={styles.historyText}>No final do século XIX, a riqueza gerada pelo café transformou São Paulo. A imigração intensa de italianos, japoneses, espanhóis e outros povos criou uma cidade cosmopolita. Com o capital cafeeiro, nasceu a indústria paulistana no início do século XX.</Text>
                <Text style={styles.historySubtitle}>A Semana de Arte Moderna (1922)</Text>
                <Text style={styles.historyText}>Em 1922, São Paulo sediou a Semana de Arte Moderna, marco da cultura brasileira que revolucionou a literatura, as artes plásticas e a música. O evento redefiniu a identidade cultural do Brasil no século XX.</Text>
                <Text style={styles.historySubtitle}>A Maior Metrópole da América do Sul</Text>
                <Text style={styles.historyText}>Com mais de 12 milhões de habitantes, São Paulo é hoje a maior cidade do Brasil e da América do Sul, o principal centro financeiro, cultural e gastronômico do país, com uma diversidade sem igual.</Text>
              </View>
            </View>
          }
          culturaLocal={
            <View style={styles.content}>
              <LocalList sigla="SP" imagensLocais={{
                'MASP': maspImage,
                'Parque Ibirapuera': parqueImage,
              }} />
            </View>
          }
        />
      </ScrollView>
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
});
