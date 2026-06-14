import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Favoritos() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Favoritos</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-outline" size={64} color="#555" />
          <Text style={styles.emptyText}>Nenhum favorito ainda</Text>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/estados')}>
            <Text style={styles.buttonText}>Explorar estados</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/inicio')}>
          <Ionicons name="home-outline" size={26} color="white" />
          <Text style={styles.navText}>Início</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/estados')}>
          <Ionicons name="map-outline" size={26} color="white" />
          <Text style={styles.navText}>Estados</Text>
        </TouchableOpacity>
        <View style={{ width: 60 }} />
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/favoritos')}>
          <Ionicons name="heart" size={26} color="#FFC700" />
          <Text style={[styles.navText, styles.navTextActive]}>Favoritos</Text>
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
  scrollContainer: { flexGrow: 1, paddingBottom: 90 },
  header: {
    paddingTop: 60, paddingBottom: 20, paddingHorizontal: 20,
    backgroundColor: '#0A172A', alignItems: 'center',
  },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: 'white' },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 80 },
  emptyText: { color: '#888', fontSize: 16, marginTop: 16, marginBottom: 24 },
  button: { backgroundColor: '#FFC700', borderRadius: 25, paddingVertical: 12, paddingHorizontal: 30 },
  buttonText: { color: '#0A172A', fontWeight: 'bold', fontSize: 16 },
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
    justifyContent: 'center', alignItems: 'center', elevation: 10,
  },
  navLogo: { width: 65, height: 65 },
});
