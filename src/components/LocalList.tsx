import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { comida } from '../context/SettingsContext';
import { getFavoritos, getLocaisPorEstado, Local, toggleFavorito } from '../services/locais';
import { localImageMap } from '../data/localImageMap';
import { localDetails } from '../data/localDetails';
import { getStaticLocais } from '../data/localStaticData';

const BASE_URL = 'https://gadys-tcc.vercel.app';
const toUrl = (path: string) => path.startsWith('http') ? path : BASE_URL + path;
const { width: W } = Dimensions.get('window');

interface Props {
  sigla: string;
}

function LocalModal({ local, visible, onClose, isFav, onFavorito }: {
  local: Local | null;
  visible: boolean;
  onClose: () => void;
  isFav: boolean;
  onFavorito: () => void;
}) {
  const t = comida;
  const [photoIndex, setPhotoIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  if (!local) return null;

  const info = local.informacoesAdicionais ? (() => { try { return JSON.parse(local.informacoesAdicionais!); } catch { return null; } })() : null;
  const galleryUrls: string[] = info?.galleryImages?.map((g: any) => g.src ?? g) ?? [];
  const fallbackUrl = local.imagemUrl || localImageMap[local.nome] || null;
  const carouselUrls: string[] = info?.carouselImages ?? (galleryUrls.length > 0 ? galleryUrls : (fallbackUrl ? fallbackUrl.split(',').map((u: string) => u.trim()).filter(Boolean) : []));
  const images = carouselUrls.map(u => ({ uri: toUrl(u) }));
  const mainImage = images.length > 0 ? images[0] : null;

  const goTo = (i: number) => {
    setPhotoIndex(i);
    scrollRef.current?.scrollTo({ x: i * W, animated: true });
  };

  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>

          {/* Carrossel de imagens */}
          <View style={{ height: 220 }}>
            <ScrollView
              ref={scrollRef}
              horizontal pagingEnabled scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
            >
              {images.length > 0
                ? images.map((src, i) => <Image key={i} source={src} style={styles.modalImage} />)
                : mainImage ? <Image source={mainImage} style={styles.modalImage} /> : null
              }
            </ScrollView>
            {images.length > 1 && (
              <>
                <TouchableOpacity style={[styles.arrow, styles.arrowLeft]} onPress={() => goTo((photoIndex - 1 + images.length) % images.length)}>
                  <Text style={styles.arrowText}>‹</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.arrow, styles.arrowRight]} onPress={() => goTo((photoIndex + 1) % images.length)}>
                  <Text style={styles.arrowText}>›</Text>
                </TouchableOpacity>
                <View style={styles.dotsRow}>
                  {images.map((_, i) => <View key={i} style={[styles.dot, photoIndex === i && styles.dotActive]} />)}
                </View>
              </>
            )}
          </View>

          <TouchableOpacity style={styles.modalClose} onPress={onClose}>
            <Ionicons name="close" size={20} color="#fff" />
          </TouchableOpacity>

          <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
            <View style={styles.modalTitleRow}>
              <Text style={styles.modalTitle}>{local.nome}</Text>
              <TouchableOpacity onPress={onFavorito}>
                <Ionicons name={isFav ? 'heart' : 'heart-outline'} size={26} color={isFav ? '#e53935' : '#aaa'} />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalSub}>{local.subcategoria} • {local.cidade} • {local.estado}</Text>
            {local.endereco ? <View style={styles.modalRow}><Ionicons name="location-outline" size={14} color="#FFC700" /><Text style={styles.modalMeta}> {local.endereco}</Text></View> : null}
            {local.horarioFuncionamento ? <View style={styles.modalRow}><Ionicons name="time-outline" size={14} color="#FFC700" /><Text style={styles.modalMeta}> {local.horarioFuncionamento}</Text></View> : null}
            {local.preco ? <View style={styles.modalRow}><Ionicons name="cash-outline" size={14} color="#FFC700" /><Text style={styles.modalMeta}> {local.preco}</Text></View> : null}
            <Text style={styles.modalDesc}>{local.descricao}</Text>
            {localDetails[local.nome]?.secoes.map((secao, i) => (
              <View key={i} style={styles.secao}>
                <Text style={styles.secaoTitulo}>{secao.titulo}</Text>
                <Text style={styles.secaoTexto}>{secao.texto}</Text>
                {secao.lista?.map((item, j) => (
                  <Text key={j} style={styles.secaoItem}>• {item}</Text>
                ))}
                {secao.subsecoes?.map((sub, j) => (
                  <View key={j} style={styles.subsecao}>
                    <Text style={styles.subsecaoTitulo}>{sub.titulo}</Text>
                    <Text style={styles.subsecaoTexto}>{sub.texto}</Text>
                  </View>
                ))}
              </View>
            ))}
          </ScrollView>

          <TouchableOpacity style={styles.modalBtn} onPress={onClose}>
            <Text style={styles.modalBtnText}>{t.fechar}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

function LocalCard({ local, isFav, onPress, onFavorito }: {
  local: Local;
  isFav: boolean;
  onPress: () => void;
  onFavorito: () => void;
}) {
  const [imgLoading, setImgLoading] = useState(true);
  const rawUrl = local.imagemUrl || localImageMap[local.nome] || null;
  const uri = rawUrl ? toUrl(rawUrl.split(',')[0].trim()) : null;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.imageWrapper}>
          {uri ? (
            <Image
              source={{ uri }}
              style={styles.image}
              onLoadStart={() => setImgLoading(true)}
              onLoadEnd={() => setImgLoading(false)}
            />
          ) : null}
          {(imgLoading || !uri) && (
            <View style={styles.imagePlaceholder}>
              <ActivityIndicator color="#FFC700" size="small" />
            </View>
          )}
        </View>
        <TouchableOpacity style={styles.cardHeart} onPress={(e) => { e.stopPropagation?.(); onFavorito(); }}>
          <Ionicons
            name={isFav ? 'heart' : 'heart-outline'}
            size={22}
            color={isFav ? '#e53935' : '#aaa'}
          />
        </TouchableOpacity>
        <View style={styles.content}>
          <Text style={styles.title}>{local.nome}</Text>
          <Text style={styles.sub}>{local.subcategoria} • {local.cidade}</Text>
          <Text style={styles.desc} numberOfLines={2}>{local.descricao}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function LocalList({ sigla }: Props) {
  const t = comida;
  const { open } = useLocalSearchParams<{ open?: string }>();
  const [locais, setLocais] = useState<Local[]>([]);
  const [favoritos, setFavoritos] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Local | null>(null);

  useEffect(() => {
    Promise.all([getLocaisPorEstado(sigla), getFavoritos()])
      .then(([ls, favs]) => {
        // Mescla: banco tem prioridade; estáticos aparecem apenas se nome não existir no banco
        const bancNomes = new Set(ls.map(l => l.nome.toLowerCase()));
        const estaticos = getStaticLocais(sigla).filter(l => !bancNomes.has(l.nome.toLowerCase()));
        const merged = [...ls, ...estaticos];
        setLocais(merged);
        setFavoritos(favs);
        if (open) {
          const match = merged.find(l => l.nome.toLowerCase() === decodeURIComponent(open).toLowerCase());
          if (match) setSelected(match);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [sigla]);

  const handleFavorito = async (local: Local) => {
    const isFav = favoritos.includes(local.id);
    try {
      await toggleFavorito(local.id);
      setFavoritos(prev => isFav ? prev.filter(id => id !== local.id) : [...prev, local.id]);
    } catch {
      Alert.alert('Erro', t.loginParaFavoritar);
    }
  };

  if (loading) return <ActivityIndicator color="#009688" style={{ marginTop: 20 }} />;
  if (locais.length === 0) return null;

  return (
    <View>
      {locais.map((local) => (
        <LocalCard
          key={local.id}
          local={local}
          isFav={favoritos.includes(local.id)}
          onPress={() => setSelected(local)}
          onFavorito={() => handleFavorito(local)}
        />
      ))}

      <LocalModal
        local={selected}
        visible={!!selected}
        onClose={() => setSelected(null)}
        isFav={selected ? favoritos.includes(selected.id) : false}
        onFavorito={() => selected && handleFavorito(selected)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#2A3F5F', borderRadius: 15, marginBottom: 20, elevation: 3 },
  imageWrapper: { width: '100%', height: 150, borderTopLeftRadius: 15, borderTopRightRadius: 15, overflow: 'hidden', backgroundColor: '#1a2e47' },
  image: { width: '100%', height: 150, borderTopLeftRadius: 15, borderTopRightRadius: 15 },
  imagePlaceholder: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a2e47' },
  content: { padding: 15 },
  cardHeart: { position: 'absolute', top: 10, right: 10, zIndex: 1, backgroundColor: 'rgba(0,0,0,0.35)', borderRadius: 20, padding: 5 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#FFC700', marginBottom: 2 },
  sub: { fontSize: 14, color: '#aaa', marginVertical: 5 },
  desc: { fontSize: 14, color: '#ccc' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  modalCard: { backgroundColor: '#1E2F4A', borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '95%', flex: 1 },
  modalImage: { width: W, height: 220, borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  modalClose: {
    position: 'absolute', top: 14, right: 14,
    backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 20, padding: 5,
  },
  arrow: { position: 'absolute', top: '50%', marginTop: -24, width: 40, height: 48, justifyContent: 'center', alignItems: 'center', zIndex: 10 },
  arrowLeft: { left: 8 },
  arrowRight: { right: 8 },
  arrowText: { color: '#fff', fontSize: 34, fontWeight: '300', lineHeight: 40 },
  dotsRow: { position: 'absolute', bottom: 8, left: 0, right: 0, flexDirection: 'row', justifyContent: 'center', gap: 5 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.4)' },
  dotActive: { backgroundColor: '#fff', width: 16, borderRadius: 3 },
  modalBody: { padding: 20 },
  modalTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 },
  modalTitle: { fontSize: 22, fontWeight: 'bold', color: '#fff', flex: 1, marginRight: 12 },
  modalSub: { fontSize: 13, color: '#aaa', marginBottom: 12 },
  modalRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  modalMeta: { fontSize: 13, color: '#ccc', flex: 1 },
  modalDesc: { fontSize: 15, color: '#ddd', lineHeight: 23, marginTop: 12, marginBottom: 10 },
  secao: { marginTop: 20, paddingTop: 16, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.08)' },
  secaoTitulo: { fontSize: 17, fontWeight: 'bold', color: '#FFC700', marginBottom: 8 },
  secaoTexto: { fontSize: 14, color: '#ccc', lineHeight: 22, marginBottom: 8 },
  secaoItem: { fontSize: 13, color: '#aaa', lineHeight: 20, marginBottom: 4, paddingLeft: 4 },
  subsecao: { marginTop: 12 },
  subsecaoTitulo: { fontSize: 14, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  subsecaoTexto: { fontSize: 13, color: '#bbb', lineHeight: 20 },
  modalBtn: {
    backgroundColor: '#FFC700', margin: 20, marginTop: 0,
    borderRadius: 25, paddingVertical: 13, alignItems: 'center',
  },
  modalBtnText: { color: '#0A172A', fontWeight: 'bold', fontSize: 15 },
});
