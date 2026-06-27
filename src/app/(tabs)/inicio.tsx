import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import {
    Image, ScrollView, StyleSheet,
    Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import NavLayout from '../../components/NavLayout';
import TimelineCard from '../../components/TimelineCard';
import { comida, themes, useSettings } from '../../context/SettingsContext';

const HIST_KEY = 'historico_pesquisa';

const searchData = [
  { label: 'Acre', route: '/Estados/Acre' },
  { label: 'Alagoas', route: '/Estados/Alagoas' },
  { label: 'Amapá', route: '/Estados/Amapa' },
  { label: 'Amazonas', route: '/Estados/Amazonas' },
  { label: 'Bahia', route: '/Estados/Bahia' },
  { label: 'Ceará', route: '/Estados/Ceara' },
  { label: 'Distrito Federal', route: '/Estados/DistritoFederal' },
  { label: 'Espírito Santo', route: '/Estados/EspiritoSanto' },
  { label: 'Goiás', route: '/Estados/Goias' },
  { label: 'Maranhão', route: '/Estados/Maranhao' },
  { label: 'Mato Grosso', route: '/Estados/MatoGrosso' },
  { label: 'Mato Grosso do Sul', route: '/Estados/MatoGrossoDoSul' },
  { label: 'Minas Gerais', route: '/Estados/MinasGerais' },
  { label: 'Pará', route: '/Estados/Para' },
  { label: 'Paraíba', route: '/Estados/Paraiba' },
  { label: 'Paraná', route: '/Estados/Parana' },
  { label: 'Pernambuco', route: '/Estados/Pernambuco' },
  { label: 'Piauí', route: '/Estados/Piaui' },
  { label: 'Rio de Janeiro', route: '/Estados/RioDeJaneiro' },
  { label: 'Rio Grande do Norte', route: '/Estados/RioGrandeDoNorte' },
  { label: 'Rio Grande do Sul', route: '/Estados/RioGrandeDoSul' },
  { label: 'Rondônia', route: '/Estados/Rondonia' },
  { label: 'Roraima', route: '/Estados/Roraima' },
  { label: 'Santa Catarina', route: '/Estados/SantaCatarina' },
  { label: 'São Paulo', route: '/Estados/SaoPaulo' },
  { label: 'Sergipe', route: '/Estados/Sergipe' },
  { label: 'Tocantins', route: '/Estados/Tocantins' },
  { label: 'Teatro Amazonas', route: '/Estados/Amazonas' },
  { label: 'Cristo Redentor', route: '/Estados/RioDeJaneiro' },
  { label: 'Pelourinho', route: '/Estados/Bahia' },
  { label: 'Lençóis Maranhenses', route: '/Estados/Maranhao' },
  { label: 'Cataratas do Iguaçu', route: '/Estados/Parana' },
  { label: 'Ouro Preto', route: '/Estados/MinasGerais' },
  { label: 'Jalapão', route: '/Estados/Tocantins' },
  { label: 'Monte Roraima', route: '/Estados/Roraima' },
  { label: 'Chapada dos Veadeiros', route: '/Estados/Goias' },
  { label: 'Encontro das Águas', route: '/Estados/Amazonas' },
  { label: 'Mercado Ver-o-Peso', route: '/Estados/Para' },
];

const HeaderImages = [
  { image: require('../../../assets/images/go/chapada.png'), label: 'Chapada dos Veadeiros', local: 'Goiás' },
  { image: require('../../../assets/images/rj/cristo.png'), label: 'Cristo Redentor', local: 'Rio de Janeiro' },
  { image: require('../../../assets/images/am/teatro.png'), label: 'Teatro Amazonas', local: 'Amazonas' },
  { image: require('../../../assets/images/ma/lencois.png'), label: 'Lençóis Maranhenses', local: 'Maranhão' },
  { image: require('../../../assets/images/pr/cataratas.png'), label: 'Cataratas do Iguaçu', local: 'Paraná' },
];

const NetflixDestaquesData = (t: Record<string,string>) => [
  { title: 'Rio de Janeiro', subtitle: t.subRJ, page: 'RioDeJaneiro', image: require('../../../assets/images/rj/cristo.png') },
  { title: 'Bahia',          subtitle: t.subBA, page: 'Bahia',        image: require('../../../assets/images/ba/pelourinho.png') },
  { title: 'Amazonas',       subtitle: t.subAM, page: 'Amazonas',     image: require('../../../assets/images/am/teatro.png') },
  { title: 'Maranhão',       subtitle: t.subMA, page: 'Maranhao',     image: require('../../../assets/images/ma/lencois.png') },
  { title: 'Minas Gerais',   subtitle: t.subMG, page: 'MinasGerais',  image: require('../../../assets/images/mg/ouro.png') },
  { title: 'Paraná',         subtitle: t.subPR, page: 'Parana',       image: require('../../../assets/images/pr/cataratas.png') },
  { title: 'Pernambuco',     subtitle: t.subPE, page: 'Pernambuco',   image: require('../../../assets/images/pe/olinda.png') },
  { title: 'Goiás',          subtitle: t.subGO, page: 'Goias',        image: require('../../../assets/images/go/chapada.png') },
  { title: 'Pará',           subtitle: t.subPA, page: 'Para',         image: require('../../../assets/images/pa/ver-o-peso.png') },
  { title: 'São Paulo',      subtitle: t.subSP, page: 'SaoPaulo',     image: require('../../../assets/images/sp/avenida.png') },
];

const MonumentosDestaque = [
  { title: 'Teatro Amazonas', location: 'Amazonas', image: require('../../../assets/images/am/teatro.png'), route: '/Estados/Amazonas' },
  { title: 'Pelourinho', location: 'Bahia', image: require('../../../assets/images/ba/pelourinho.png'), route: '/Estados/Bahia' },
  { title: 'Cristo Redentor', location: 'Rio de Janeiro', image: require('../../../assets/images/rj/cristo.png'), route: '/Estados/RioDeJaneiro' },
  { title: 'Lençóis Maranhenses', location: 'Maranhão', image: require('../../../assets/images/ma/lencois.png'), route: '/Estados/Maranhao' },
  { title: 'Cataratas do Iguaçu', location: 'Paraná', image: require('../../../assets/images/pr/cataratas.png'), route: '/Estados/Parana' },
  { title: 'Ouro Preto', location: 'Minas Gerais', image: require('../../../assets/images/mg/ouro.png'), route: '/Estados/MinasGerais' },
];

const ComidasTipicas = (t: Record<string,string>) => [
  { title: t.c_acaraje_name,   key: 'acaraje',   image: require('../../../assets/images/comidas/acaraje.png') },
  { title: t.c_paoqueijo_name, key: 'paoqueijo', image: require('../../../assets/images/comidas/pao-de-queijo.png') },
  { title: t.c_tacaca_name,    key: 'tacaca',    image: require('../../../assets/images/comidas/tucupi.png') },
  { title: t.c_feijoada_name,  key: 'feijoada',  image: require('../../../assets/images/comidas/baiao.png') },
  { title: t.c_churrasco_name, key: 'churrasco', image: require('../../../assets/images/comidas/churrasco.png') },
  { title: t.c_pirarucu_name,  key: 'pirarucu',  image: require('../../../assets/images/comidas/pirarucu.png') },
];

/* ---------- Componentes ---------- */

const SectionTitle = ({ title }: { title: string }) => (
  <Text style={styles.sectionTitle}>{title}</Text>
)

const NetflixCard = ({ item, numero, onPress }: { item: ReturnType<typeof NetflixDestaquesData>[0]; numero: number; onPress: () => void }) => (
    <TouchableOpacity style={styles.netflixCard} onPress={onPress}>
    <Image source={item.image} style={styles.netflixImage} />
    <View style={styles.netflixOverlay}>
      <Text style={styles.netflixSubtitle}>{item.subtitle}</Text>
      <Text style={styles.netflixTitle}>{item.title}</Text>
    </View>
    <Text style={styles.netflixNumber}>{numero}</Text>
  </TouchableOpacity>
);

const MonumentCard = ({ title, location, image, onPress }: { title: string; location: string; image: any; onPress: () => void }) => (
  <TouchableOpacity style={styles.monumentCard} onPress={onPress}>
    <Image source={image} style={styles.monumentImage} />
    <View style={styles.monumentOverlay}>
      <Text style={styles.monumentTitle}>{title}</Text>
      <Text style={styles.monumentLocation}>📍 {location}</Text>
    </View>
  </TouchableOpacity>
);

const FoodCard = ({ title, image, onPress }: { title: string; image: any; onPress: () => void }) => (
  <TouchableOpacity style={styles.foodCard} onPress={onPress}>
    <Image source={image} style={styles.foodImage} />
    <View style={styles.foodOverlay}>
      <Text style={styles.foodTitle}>{title}</Text>
    </View>
  </TouchableOpacity>
);

/* ---------- Tela principal ---------- */

export default function Inicio() {
  const router = useRouter();
  const { theme } = useSettings();
  const t = comida;
  const c = themes[theme];
  const [menuVisible, setMenuVisible] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [historico, setHistorico] = useState<string[]>([]);

  useEffect(() => {
    SecureStore.getItemAsync('nome').then(n => { if (n) setNomeUsuario(n); });
    AsyncStorage.getItem(HIST_KEY).then(v => { if (v) setHistorico(JSON.parse(v)); });
  }, []);

  const searchResults = searchQuery.length > 1
    ? searchData.filter(i => i.label.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 6)
    : [];

  const handleSelect = (label: string, route: string) => {
    const updated = [label, ...historico.filter(h => h !== label)].slice(0, 8);
    setHistorico(updated);
    AsyncStorage.setItem(HIST_KEY, JSON.stringify(updated));
    setSearchQuery('');
    setSearchFocused(false);
    router.push(route as any);
  };

  const removeHistorico = (termo: string) => {
    const updated = historico.filter(h => h !== termo);
    setHistorico(updated);
    AsyncStorage.setItem(HIST_KEY, JSON.stringify(updated));
  };

  return (
    <NavLayout active="inicio" menuVisible={menuVisible} onMenuClose={() => setMenuVisible(false)}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 90 }}>

        {/* HERO */}
        <View style={styles.hero}>
          <Image source={require('../../../assets/images/fundos/header.png')} style={styles.heroImage} />
          <View style={styles.heroOverlay}>
            <View style={styles.topBar}>
              <TouchableOpacity onPress={() => setMenuVisible(true)}>
                <Ionicons name="menu" size={32} color="white" />
              </TouchableOpacity>
              <View style={{ width: 32 }} />
            </View>
            {nomeUsuario && (
              <Text style={styles.heroGreeting}>
                Olá, {nomeUsuario.split(' ')[0]}!
              </Text>
            )}
            <Text style={styles.heroTitle}>
              {t.heroGreeting}{' '}
              <Text style={styles.heroHighlight}>{t.heroAction}</Text>{' '}{t.heroBrasil}
            </Text>
          </View>
          <LinearGradient colors={['transparent', '#07172F']} style={styles.heroGradient}>
            <View style={styles.searchBar}>
              <TextInput
                placeholder={t.pesquisar}
                placeholderTextColor="#888"
                style={styles.searchInput}
                value={searchQuery}
                onChangeText={setSearchQuery}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
              />
              {searchQuery.length > 0
                ? <TouchableOpacity onPress={() => setSearchQuery('')}>
                    <Ionicons name="close-circle" size={20} color="#888" />
                  </TouchableOpacity>
                : <Ionicons name="search" size={20} color="#888" />
              }
            </View>
          </LinearGradient>
        </View>

        {/* CONTAINER */}
        <View style={styles.mainContainer}>

          {/* PESQUISA - dropdowns */}
          <View style={styles.searchWrapper}>

            {/* Resultados */}
            {searchResults.length > 0 && (
              <View style={styles.dropdown}>
                {searchResults.map((item, i) => (
                  <TouchableOpacity
                    key={i}
                    style={[styles.dropdownItem, i < searchResults.length - 1 && styles.dropdownBorder]}
                    onPress={() => handleSelect(item.label, item.route)}
                  >
                    <Ionicons name="location-outline" size={14} color="#FFC700" style={{ marginRight: 10 }} />
                    <Text style={styles.dropdownText}>{item.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Histórico */}
            {searchQuery.length === 0 && searchFocused && historico.length > 0 && (
              <View style={styles.dropdown}>
                <View style={styles.histHeader}>
                  <Text style={styles.histTitle}>{t.buscasRecentes}</Text>
                  <TouchableOpacity onPress={() => { setHistorico([]); AsyncStorage.removeItem(HIST_KEY); }}>
                    <Text style={styles.histLimpar}>{t.limpar}</Text>
                  </TouchableOpacity>
                </View>
                {historico.map((termo, i) => (
                  <View key={i} style={[styles.dropdownItem, i < historico.length - 1 && styles.dropdownBorder]}>
                    <Ionicons name="time-outline" size={14} color="#aaa" style={{ marginRight: 10 }} />
                    <TouchableOpacity style={{ flex: 1 }} onPress={() => setSearchQuery(termo)}>
                      <Text style={styles.dropdownText}>{termo}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => removeHistorico(termo)}>
                      <Ionicons name="close" size={16} color="#aaa" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>



          {/* LINHA DO TEMPO */}
          <TimelineCard />

          {/* DESTAQUES NETFLIX */}
          <SectionTitle title={t.destaques} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 40, paddingBottom: 10 }}>
            {NetflixDestaquesData(t).map((item, i) => (
              <NetflixCard key={i} item={item} numero={i + 1} onPress={() => router.push(`/Estados/${item.page}` as any)} />
            ))}
          </ScrollView>


          {/* MONUMENTOS EM DESTAQUE */}
          <SectionTitle title={t.monumentos} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 25 }}>
            {MonumentosDestaque.map((item, i) => (
              <MonumentCard key={i} {...item} onPress={() => router.push(`${item.route}?open=${encodeURIComponent(item.title)}` as any)} />
            ))}
          </ScrollView>

          {/* COMIDAS TÍPICAS */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t.comidas}</Text>
            <TouchableOpacity onPress={() => router.push('/comidas')}>
              <Text style={styles.seeAllText}>{t.verTodas} →</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 40, paddingBottom: 10 }}>
            {ComidasTipicas(t).map((item, i) => (
              <FoodCard key={i} {...item} onPress={() => router.push(`/comidas?open=${item.key}` as any)} />
            ))}
            <TouchableOpacity style={styles.verTodosBtn} onPress={() => router.push('/comidas')}>
              <Text style={styles.verTodosText}>{t.verTodos}</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFC107" />
            </TouchableOpacity>
          </ScrollView>

        </View>
      </ScrollView>
    </NavLayout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { height: 420 },
  heroImage: { width: '100%', height: '100%', position: 'absolute' },
  heroGradient: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 140, justifyContent: 'flex-end', paddingHorizontal: 20, paddingBottom: 20 },
  heroOverlay: {
    flex: 1, backgroundColor: 'rgba(7,23,47,0.3)',
    paddingHorizontal: 25, paddingTop: 55, justifyContent: 'flex-end', paddingBottom: 150,
  },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'auto' },
  logo: { width: 80, height: 40, resizeMode: 'contain' },
  heroGreeting: { fontSize: 20, color: '#FFF', marginBottom: 2, fontWeight: '600' },
  heroTitle: { fontSize: 36, fontWeight: 'bold', color: '#FFF', width: '85%',  },
  heroHighlight: { color: '#FFC107' },
  heroCaption: { color: '#EEE', fontSize: 13 },

  // Container
  mainContainer: {
    backgroundColor: '#07172F',
    padding: 20,
  },

  // Pesquisa
  searchWrapper: { marginBottom: 25, zIndex: 10 },
  searchBar: {
    backgroundColor: '#FFF', borderRadius: 50,
    paddingHorizontal: 20, flexDirection: 'row',
    alignItems: 'center', height: 55,
  },
  searchInput: { flex: 1, fontSize: 15, color: '#000' },
  dropdown: {
    backgroundColor: '#1E2F4A', borderRadius: 16,
    marginTop: 6, overflow: 'hidden',
  },
  dropdownItem: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12,
  },
  dropdownBorder: { borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.08)' },
  dropdownText: { color: '#FFF', fontSize: 14 },
  histHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10,
  },
  histTitle: { color: '#aaa', fontSize: 12, fontWeight: '600' },
  histLimpar: { color: '#FFC700', fontSize: 12 },

  // Section
  sectionTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold', marginBottom: 15, marginTop: 5 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, marginTop: 5 },
  seeAllText: { color: '#FFC700', fontSize: 13 },

  // Netflix card
  netflixCard: { width: 160, height: 220, borderRadius: 16, marginRight: 20, overflow: 'visible' },
  netflixImage: { width: '100%', height: '100%', borderRadius: 16, position: 'absolute' },
  netflixOverlay: {
    flex: 1, backgroundColor: 'rgba(7,23,47,0.45)',
    borderRadius: 16, padding: 12, justifyContent: 'flex-end',
  },
  netflixTitle: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  netflixSubtitle: { color: '#CCC', fontSize: 10, marginBottom: 4 },
  netflixNumber: {
    position: 'absolute', bottom: -18, right: -10,
    fontSize: 90, fontWeight: '900',
    color: '#FFC107',
    textShadowColor: '#07172F',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 1,
    lineHeight: 90,
  },

  // Monument card
  monumentCard: { width: 220, height: 160, borderRadius: 20, marginRight: 12, overflow: 'hidden' },
  monumentImage: { width: '100%', height: '100%', position: 'absolute' },
  monumentOverlay: {
    flex: 1, backgroundColor: 'rgba(7,23,47,0.3)',
    padding: 15, justifyContent: 'flex-end',
  },
  monumentTitle: { color: '#FFF', fontWeight: 'bold', fontSize: 15 },
  monumentLocation: { color: '#DDD', fontSize: 12, marginTop: 3 },

  // Food
  foodCard: { width: 160, height: 220, borderRadius: 16, marginRight: 20, overflow: 'hidden' },
  foodImage: { width: '100%', height: '100%', borderRadius: 16, position: 'absolute' },
  foodOverlay: { flex: 1, backgroundColor: 'rgba(7,23,47,0.45)', borderRadius: 16, padding: 12, justifyContent: 'flex-end' },
  foodTitle: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  foodNumber: {
    position: 'absolute', bottom: -18, right: -10,
    fontSize: 90, fontWeight: '900',
    color: 'rgba(8, 0, 0, 0)',
    textShadowColor: '#07172F',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 1,
    lineHeight: 90,
  },
  verTodosBtn: {
    width: 170, height: 220, borderRadius: 16, marginRight: 20,
    backgroundColor: '#102646', justifyContent: 'center', alignItems: 'center', gap: 8,
  },
  verTodosText: { color: '#FFF', fontWeight: 'bold', fontSize: 14, textAlign: 'center' },
});
