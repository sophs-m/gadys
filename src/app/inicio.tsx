import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Image, ImageBackground, Modal, ScrollView, StyleSheet,
  Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View,
} from 'react-native';

const DestaquesData = [
  { name: 'Teatro Amazonas', location: 'Amazonas', image: require('../../assets/images/am/teatro.png') },
  { name: 'Pelourinho', location: 'Bahia', image: require('../../assets/images/ba/pelourinho.png') },
  { name: 'Congonhas', location: 'Minas Gerais', image: require('../../assets/images/mg/ouro.png') },
];

const CuriosidadeData = {
  text: 'O Teatro Amazonas foi inaugurado em 1896, no auge do ciclo da borracha.',
  image: require('../../assets/images/am/teatro.png'),
};

export default function Inicio() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ImageBackground
          source={require('../../assets/images/rj/cristo.png')}
          style={styles.headerBackground}
          resizeMode="cover"
        >
          <View style={styles.headerOverlay}>
            <View style={styles.topBar}>
              <TouchableOpacity onPress={() => setMenuVisible(true)}>
                <Ionicons name="menu" size={32} color="white" />
              </TouchableOpacity>
              <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
              <View style={{ width: 32 }} />
            </View>
            <Text style={styles.headerTitle}>
              Histórias que <Text style={styles.headerTitleHighlight}>conectam</Text> o Brasil
            </Text>
          </View>
        </ImageBackground>

        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <TextInput
              placeholder="Pesquisar estado ou monumento..."
              placeholderTextColor="#555"
              style={styles.searchInput}
            />
            <Ionicons name="search" size={22} color="#333" style={styles.searchIcon} />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Destaques</Text>
            <TouchableOpacity onPress={() => router.push('/estados')}>
              <Text style={styles.seeAllText}>Ver todos</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
            {DestaquesData.map((item, index) => (
              <TouchableOpacity key={index} style={styles.destaqueCard}>
                <Image source={item.image} style={styles.destaqueImage} />
                <View style={styles.destaqueTextContainer}>
                  <Text style={styles.destaqueTitle}>{item.name}</Text>
                  <Text style={styles.destaqueSubtitle}>{item.location}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Curiosidade do dia</Text>
          <View style={styles.curiosidadeCard}>
            <Image source={CuriosidadeData.image} style={styles.curiosidadeImage} />
            <View style={styles.curiosidadeTextContainer}>
              <Text style={styles.curiosidadeText}>{CuriosidadeData.text}</Text>
              <TouchableOpacity style={styles.lerMaisButton}>
                <Text style={styles.lerMaisText}>Ler mais</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/inicio')}>
          <Ionicons name="home" size={26} color="#FFC700" />
          <Text style={[styles.navText, styles.navTextActive]}>Início</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/estados')}>
          <Ionicons name="map-outline" size={26} color="white" />
          <Text style={styles.navText}>Estados</Text>
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPressOut={() => setMenuVisible(false)}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              {[
                { label: 'Chat', route: '/chat' },
                { label: 'FAQ', route: '/faq' },
                { label: 'Sobre nós', route: '/sobre' },
                { label: 'Contato', route: '/contato' },
              ].map(({ label, route }) => (
                <TouchableOpacity key={label} style={styles.modalItem} onPress={() => { setMenuVisible(false); router.push(route as any); }}>
                  <Text style={styles.modalText}>{label}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity style={[styles.modalItem, styles.modalClose]} onPress={() => setMenuVisible(false)}>
                <Text style={styles.modalText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A172A' },
  scrollContainer: { paddingBottom: 90 },
  headerBackground: { width: '100%', height: 280 },
  headerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(10, 23, 42, 0.5)',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  logo: { width: 80, height: 40, resizeMode: 'contain' },
  headerTitle: { fontSize: 32, fontWeight: 'bold', color: 'white', marginTop: 20, width: '80%' },
  headerTitleHighlight: { color: '#FFC700' },
  searchSection: {
    backgroundColor: '#0A172A',
    padding: 20,
    marginTop: -30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
  },
  searchInput: { flex: 1, fontSize: 16, color: '#000' },
  searchIcon: { marginLeft: 10 },
  section: { paddingHorizontal: 20, marginVertical: 10 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: 'white' },
  seeAllText: { fontSize: 14, color: '#FFC700' },
  horizontalScroll: { paddingRight: 20 },
  destaqueCard: { width: 150, height: 200, backgroundColor: '#1E2F4A', borderRadius: 15, marginRight: 15, overflow: 'hidden' },
  destaqueImage: { width: '100%', height: 120 },
  destaqueTextContainer: { padding: 10 },
  destaqueTitle: { fontSize: 16, fontWeight: 'bold', color: 'white' },
  destaqueSubtitle: { fontSize: 12, color: '#ccc' },
  curiosidadeCard: { backgroundColor: '#163A42', borderRadius: 15, padding: 15, flexDirection: 'row', alignItems: 'center' },
  curiosidadeImage: { width: 100, height: 100, borderRadius: 10 },
  curiosidadeTextContainer: { flex: 1, marginLeft: 15 },
  curiosidadeText: { color: 'white', fontSize: 14, marginBottom: 10 },
  lerMaisButton: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 15, paddingVertical: 5, paddingHorizontal: 15, alignSelf: 'flex-start' },
  lerMaisText: { color: 'white', fontWeight: 'bold' },
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
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
  modalView: { height: '100%', width: '75%', backgroundColor: '#1E2F4A', paddingTop: 60, paddingHorizontal: 20 },
  modalItem: { paddingVertical: 15 },
  modalClose: { position: 'absolute', bottom: 30, borderTopWidth: 1, borderColor: '#334', paddingHorizontal: 20 },
  modalText: { fontSize: 18, color: 'white', fontWeight: 'bold' },
});
