import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import NavLayout from '../components/NavLayout';
import { comida, themes, useSettings } from '../context/SettingsContext';
import api from '../services/api';
import { getEstadosFavoritos, toggleEstadoFavorito } from '../services/estadosFavoritos';
import { getFavoritos, Local, toggleFavorito } from '../services/locais';
import { listaEstados } from './(tabs)/estados';

export default function Favoritos() {
  const router = useRouter();
  const { theme } = useSettings();
  const t = comida;
  const c = themes[theme];
  const [menuVisible, setMenuVisible] = useState(false);
  const [locaisFavs, setLocaisFavs] = useState<Local[]>([]);
  const [estadosFavs, setEstadosFavs] = useState<string[]>([]);
  const [favIds, setFavIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(useCallback(() => {
    setLoading(true);
    Promise.all([getEstadosFavoritos(), getFavoritos()])
      .then(async ([estados, ids]) => {
        setEstadosFavs(estados);
        setFavIds(ids);
        if (ids.length > 0) {
          // amazonq-ignore-next-line
          const { data } = await api.get('/api/locais/ativos');
          setLocaisFavs(data.filter((l: Local) => ids.includes(l.id)));
        } else setLocaisFavs([]);
      }).catch(() => {}).finally(() => setLoading(false));
  }, []));

  const handleRemoveFavLocal = async (localId: number) => {
    await toggleFavorito(localId);
    setLocaisFavs(prev => prev.filter(l => l.id !== localId));
    setFavIds(prev => prev.filter(id => id !== localId));
  };

  const handleRemoveFavEstado = async (sigla: string) => {
    await toggleEstadoFavorito(sigla);
    setEstadosFavs(prev => prev.filter(s => s !== sigla));
  };

  const estadosFavsData = listaEstados.filter(e => estadosFavs.includes(e.name));
  const isEmpty = locaisFavs.length === 0 && estadosFavsData.length === 0;

  return (
    <NavLayout active="favoritos" menuVisible={menuVisible} onMenuClose={() => setMenuVisible(false)}>
      <ScrollView contentContainerStyle={[styles.scrollContainer, { backgroundColor: c.bg }]}>
        <View style={[styles.header, { backgroundColor: c.header }]}>
          <TouchableOpacity style={styles.menuBtn} onPress={() => setMenuVisible(true)}>
            <Ionicons name="menu" size={28} color={c.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: c.text }]}>{t.favoritos}</Text>
          <View style={{ width: 40 }} />
        </View>

        {loading ? (
          <ActivityIndicator color={c.accent} style={{ marginTop: 60 }} />
        ) : isEmpty ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="heart-outline" size={64} color={c.subtext} />
            <Text style={[styles.emptyText, { color: c.subtext }]}>
              Nenhum favorito ainda
            </Text>
            <TouchableOpacity style={[styles.button, { backgroundColor: c.accent }]} onPress={() => router.push('/estados')}>
              <Text style={[styles.buttonText, { color: c.bg }]}>
                Explorar estados
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {estadosFavsData.length > 0 && (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: c.text }]}>{t.estados}</Text>
                <View style={styles.estadosGrid}>
                  {estadosFavsData.map((estado) => (
                    <TouchableOpacity key={estado.name} style={[styles.estadoCard, { backgroundColor: c.card }]}
                      onPress={() => router.push(`/Estados/${estado.page}` as any)}>
                      <TouchableOpacity style={styles.heartBtn} onPress={() => handleRemoveFavEstado(estado.name)}>
                        <Ionicons name="heart" size={16} color="#e53935" />
                      </TouchableOpacity>
                      <Image source={estado.image} style={styles.estadoImage} />
                      <Text style={[styles.estadoText, { color: c.text }]}>{estado.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
            {locaisFavs.length > 0 && (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: c.text }]}>
                  Pontos Turísticos
                </Text>
                {locaisFavs.map((local) => (
                  <View key={local.id} style={[styles.localCard, { backgroundColor: c.card }]}>
                    <View style={styles.localContent}>
                      <View style={styles.localTitleRow}>
                        <Text style={[styles.localName, { color: c.accent }]}>{local.nome}</Text>
                        <TouchableOpacity onPress={() => handleRemoveFavLocal(local.id)}>
                          <Ionicons name="heart" size={22} color="#e53935" />
                        </TouchableOpacity>
                      </View>
                      <Text style={[styles.localSub, { color: c.subtext }]}>{local.cidade} • {local.estado}</Text>
                      <Text style={[styles.localDesc, { color: c.text }]} numberOfLines={2}>{local.descricao}</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>
    </NavLayout>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, paddingBottom: 90 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 55, paddingBottom: 15, paddingHorizontal: 20 },
  menuBtn: { width: 40, height: 40, justifyContent: 'center' },
  headerTitle: { fontSize: 22, fontWeight: 'bold' },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 80 },
  emptyText: { fontSize: 16, marginTop: 16, marginBottom: 24 },
  button: { borderRadius: 25, paddingVertical: 12, paddingHorizontal: 30 },
  buttonText: { fontWeight: 'bold', fontSize: 16 },
  section: { paddingHorizontal: 20, marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  estadosGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  estadoCard: { width: '30%', aspectRatio: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 15, padding: 5 },
  heartBtn: { position: 'absolute', top: 6, right: 8, zIndex: 1 },
  estadoImage: { width: 50, height: 50, borderRadius: 8, marginBottom: 6 },
  estadoText: { fontSize: 13, fontWeight: 'bold' },
  localCard: { borderRadius: 15, marginBottom: 12, overflow: 'hidden' },
  localContent: { padding: 15 },
  localTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  localName: { fontSize: 16, fontWeight: 'bold', flex: 1, marginRight: 10 },
  localSub: { fontSize: 12, marginVertical: 4 },
  localDesc: { fontSize: 13 },
});
