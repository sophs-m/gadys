import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getFavoritos, getLocaisPorEstado, Local, toggleFavorito } from '../services/locais';

interface Props {
  sigla: string;
  titulo: string;
  subtitulo: string;
  headerImage: any;
  cor: string;
  rotaVoltar: string;
  imagensLocais?: Record<string, any>;
}

export default function DestinosEstado({ sigla, titulo, subtitulo, headerImage, cor, rotaVoltar, imagensLocais = {} }: Props) {
  const router = useRouter();
  const [locais, setLocais] = useState<Local[]>([]);
  const [favoritos, setFavoritos] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState('Todos');

  useEffect(() => {
    Promise.all([getLocaisPorEstado(sigla), getFavoritos()])
      .then(([ls, favs]) => { setLocais(ls); setFavoritos(favs); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [sigla]);

  const handleFavorito = async (local: Local) => {
    const isFav = favoritos.includes(local.id);
    try {
      await toggleFavorito(local.id);
      setFavoritos(prev => isFav ? prev.filter(id => id !== local.id) : [...prev, local.id]);
    } catch {
      Alert.alert('Erro', 'Faça login para favoritar');
    }
  };

  const categorias = ['Todos', ...Array.from(new Set(locais.map(l => l.subcategoria).filter(Boolean)))];

  const filtrados = locais.filter(l => {
    const buscaOk = l.nome.toLowerCase().includes(busca.toLowerCase()) || l.descricao.toLowerCase().includes(busca.toLowerCase());
    const catOk = categoria === 'Todos' || l.subcategoria === categoria;
    return buscaOk && catOk;
  });

  return (
    <View style={{ flex: 1, backgroundColor: '#f0f4f8' }}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: cor }]}>
        <TouchableOpacity onPress={() => router.push(rotaVoltar as any)} style={styles.backBtn}>
          <Text style={styles.backText}>← Voltar</Text>
        </TouchableOpacity>
        <Image source={headerImage} style={styles.headerImage} />
        <View style={styles.headerOverlay} />
        <View style={styles.headerContent}>
          <Text style={styles.titulo}>{titulo}</Text>
          <Text style={styles.subtitulo}>{subtitulo}</Text>
        </View>
      </View>

      {/* Controles */}
      <View style={[styles.controls, { backgroundColor: cor }]}>
        <TextInput
          style={styles.busca}
          placeholder="O que você quer descobrir?"
          placeholderTextColor="rgba(255,255,255,0.7)"
          value={busca}
          onChangeText={setBusca}
        />
        <FlatList
          horizontal
          data={categorias}
          keyExtractor={c => c}
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 12 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setCategoria(item)}
              style={[styles.filtroBtn, categoria === item && { backgroundColor: 'white' }]}
            >
              <Text style={[styles.filtroText, categoria === item && { color: cor }]}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Lista */}
      {loading ? (
        <ActivityIndicator color={cor} style={{ marginTop: 40 }} />
      ) : filtrados.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Nenhum local encontrado.</Text>
        </View>
      ) : (
        <FlatList
          data={filtrados}
          keyExtractor={l => String(l.id)}
          contentContainerStyle={styles.grid}
          renderItem={({ item }) => {
            const isFav = favoritos.includes(item.id);
            const img = imagensLocais[item.nome];
            return (
              <View style={styles.card}>
                {img ? (
                  <Image source={img} style={styles.cardImage} />
                ) : item.imagemUrl ? (
                  <Image source={{ uri: `https://gadys-backend.onrender.com${item.imagemUrl}` }} style={styles.cardImage} />
                ) : null}
                <View style={styles.cardBody}>
                  <View style={styles.cardTitleRow}>
                    <Text style={[styles.cardTitle, { color: cor }]} numberOfLines={2}>{item.nome}</Text>
                    <TouchableOpacity onPress={() => handleFavorito(item)} style={styles.favBtn}>
                      <Ionicons name={isFav ? 'heart' : 'heart-outline'} size={24} color={isFav ? '#e53935' : cor} />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.cardSub}>{item.subcategoria} • {item.cidade}</Text>
                  <Text style={styles.cardDesc} numberOfLines={3}>{item.descricao}</Text>
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: { height: 220, position: 'relative', justifyContent: 'flex-end' },
  headerImage: { position: 'absolute', width: '100%', height: '100%' },
  headerOverlay: { position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.45)' },
  headerContent: { position: 'relative', padding: 20, paddingBottom: 16 },
  backBtn: {
    position: 'absolute', top: 44, left: 16, zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.2)', borderWidth: 1.5, borderColor: 'white',
    paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20,
  },
  backText: { color: 'white', fontWeight: '600', fontSize: 14 },
  titulo: { color: 'white', fontSize: 28, fontWeight: '900', textShadowColor: 'rgba(0,0,0,0.6)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 4 },
  subtitulo: { color: 'rgba(255,255,255,0.85)', fontSize: 14, marginTop: 4 },
  controls: { paddingHorizontal: 16, paddingVertical: 16 },
  busca: {
    backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 25,
    paddingHorizontal: 18, paddingVertical: 10, color: 'white', fontSize: 15,
  },
  filtroBtn: {
    borderWidth: 1.5, borderColor: 'white', borderRadius: 20,
    paddingHorizontal: 16, paddingVertical: 7, marginRight: 8,
  },
  filtroText: { color: 'white', fontWeight: '600', fontSize: 13 },
  grid: { padding: 16, gap: 16 },
  card: {
    backgroundColor: 'white', borderRadius: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1, shadowRadius: 6, elevation: 4,
    overflow: 'hidden',
  },
  cardImage: { width: '100%', height: 180 },
  cardBody: { padding: 14 },
  cardTitleRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  cardTitle: { fontSize: 17, fontWeight: 'bold', flex: 1, marginRight: 8 },
  favBtn: { padding: 2 },
  cardSub: { fontSize: 13, color: '#888', marginVertical: 4 },
  cardDesc: { fontSize: 14, color: '#444', lineHeight: 20 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 60 },
  emptyText: { color: '#888', fontSize: 16 },
});
