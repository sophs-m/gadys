import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const listaEstados = [
  { name: 'AC', page: 'Acre', image: require('../../assets/images/estados/ac.png') },
  { name: 'AL', page: 'Alagoas', image: require('../../assets/images/estados/al.png') },
  { name: 'AP', page: 'Amapa', image: require('../../assets/images/estados/ap.png') },
  { name: 'AM', page: 'Amazonas', image: require('../../assets/images/estados/am.png') },
  { name: 'BA', page: 'Bahia', image: require('../../assets/images/estados/ba.png') },
  { name: 'CE', page: 'Ceara', image: require('../../assets/images/estados/ce.png') },
  { name: 'DF', page: 'DistritoFederal', image: require('../../assets/images/estados/df.png') },
  { name: 'ES', page: 'EspiritoSanto', image: require('../../assets/images/estados/es.png') },
  { name: 'GO', page: 'Goias', image: require('../../assets/images/estados/go.png') },
  { name: 'MA', page: 'Maranhao', image: require('../../assets/images/estados/ma.png') },
  { name: 'MT', page: 'MatoGrosso', image: require('../../assets/images/estados/mt.png') },
  { name: 'MS', page: 'MatoGrossoDoSul', image: require('../../assets/images/estados/ms.png') },
  { name: 'MG', page: 'MinasGerais', image: require('../../assets/images/estados/mg.png') },
  { name: 'PA', page: 'Para', image: require('../../assets/images/estados/pa.png') },
  { name: 'PB', page: 'Paraiba', image: require('../../assets/images/estados/pb.png') },
  { name: 'PR', page: 'Parana', image: require('../../assets/images/estados/pr.png') },
  { name: 'PE', page: 'Pernambuco', image: require('../../assets/images/estados/pe.png') },
  { name: 'PI', page: 'Piaui', image: require('../../assets/images/estados/pi.png') },
  { name: 'RJ', page: 'RiodeJaneiro', image: require('../../assets/images/estados/rj.png') },
  { name: 'RN', page: 'RioGrandedoNorte', image: require('../../assets/images/estados/rn.png') },
  { name: 'RS', page: 'RioGrandedoSul', image: require('../../assets/images/estados/rs.png') },
  { name: 'RO', page: 'Rondonia', image: require('../../assets/images/estados/ro.png') },
  { name: 'RR', page: 'Roraima', image: require('../../assets/images/estados/rr.png') },
  { name: 'SC', page: 'SantaCatarina', image: require('../../assets/images/estados/sc.png') },
  { name: 'SP', page: 'SaoPaulo', image: require('../../assets/images/estados/sp.png') },
  { name: 'SE', page: 'Sergipe', image: require('../../assets/images/estados/se.png') },
  { name: 'TO', page: 'Tocantins', image: require('../../assets/images/estados/to.png') },
];

export default function Estados() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Estados</Text>
        </View>
        <View style={styles.grid}>
          {listaEstados.map((estado, index) => (
            <TouchableOpacity
              key={index}
              style={styles.gridItem}
              onPress={() => router.push(`/Estados/${estado.page}` as any)}
            >
              <Image source={estado.image} style={styles.gridImage} />
              <Text style={styles.gridText}>{estado.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/inicio')}>
          <Ionicons name="home-outline" size={26} color="white" />
          <Text style={styles.navText}>Início</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/estados')}>
          <Ionicons name="map" size={26} color="#FFC700" />
          <Text style={[styles.navText, styles.navTextActive]}>Estados</Text>
        </TouchableOpacity>
        <View style={{ width: 60 }} />
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/favoritos')}>
          <Ionicons name="heart-outline" size={26} color="white" />
          <Text style={styles.navText}>Favoritos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/perfil')}>
          <Ionicons name="person-outline" size={26} color="white" />
          <Text style={styles.navText}>Perfil</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.navLogoContainer} onPress={() => router.push('/inicio')}>
        <Image source={require('../../assets/images/logo.png')} style={styles.navLogo} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A172A' },
  scrollContainer: { paddingBottom: 90 },
  header: {
    paddingTop: 60, paddingBottom: 20, paddingHorizontal: 20,
    backgroundColor: '#0A172A', alignItems: 'center',
  },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: 'white' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', paddingHorizontal: 5 },
  gridItem: {
    width: '30%', aspectRatio: 1, alignItems: 'center', justifyContent: 'center',
    marginVertical: 5, backgroundColor: '#1E2F4A', borderRadius: 15, padding: 5,
  },
  gridImage: { width: 60, height: 60, borderRadius: 10, marginBottom: 8 },
  gridText: { fontSize: 14, fontWeight: 'bold', color: 'white' },
  bottomNav: {
    position: 'absolute', bottom: 0, left: 0, right: 0, height: 70,
    flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',
    backgroundColor: '#1E2F4A', paddingTop: 10,
  },
  navItem: { alignItems: 'center', width: 60 },
  navText: { color: 'white', fontSize: 12, marginTop: 4 },
  navTextActive: { color: '#FFC700' },
  navLogoContainer: {
    position: 'absolute', left: '50%', bottom: 20, marginLeft: -35,
    width: 70, height: 70, borderRadius: 35, backgroundColor: '#1E2F4A',
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3, shadowRadius: 5, elevation: 10,
  },
  navLogo: { width: 65, height: 65 },
});
