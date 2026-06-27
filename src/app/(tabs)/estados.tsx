import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import EstadoPopup from '../../components/EstadoPopup';
import NavLayout from '../../components/NavLayout';
import { comida, themes, useSettings } from '../../context/SettingsContext';
import { getEstadosFavoritos, toggleEstadoFavorito } from '../../services/estadosFavoritos';

const listaEstados = [
  { name: 'AC', fullName: 'Acre', page: 'Acre', image: require('../../../assets/images/estados/ac.png') },
  { name: 'AL', fullName: 'Alagoas', page: 'Alagoas', image: require('../../../assets/images/estados/al.png') },
  { name: 'AP', fullName: 'Amapá', page: 'Amapa', image: require('../../../assets/images/estados/ap.png') },
  { name: 'AM', fullName: 'Amazonas', page: 'Amazonas', image: require('../../../assets/images/estados/am.png') },
  { name: 'BA', fullName: 'Bahia', page: 'Bahia', image: require('../../../assets/images/estados/ba.png') },
  { name: 'CE', fullName: 'Ceará', page: 'Ceara', image: require('../../../assets/images/estados/ce.png') },
  { name: 'DF', fullName: 'Distrito Federal', page: 'DistritoFederal', image: require('../../../assets/images/estados/df.png') },
  { name: 'ES', fullName: 'Espírito Santo', page: 'EspiritoSanto', image: require('../../../assets/images/estados/es.png') },
  { name: 'GO', fullName: 'Goiás', page: 'Goias', image: require('../../../assets/images/estados/go.png') },
  { name: 'MA', fullName: 'Maranhão', page: 'Maranhao', image: require('../../../assets/images/estados/ma.png') },
  { name: 'MT', fullName: 'Mato Grosso', page: 'MatoGrosso', image: require('../../../assets/images/estados/mt.png') },
  { name: 'MS', fullName: 'Mato Grosso do Sul', page: 'MatoGrossoDoSul', image: require('../../../assets/images/estados/ms.png') },
  { name: 'MG', fullName: 'Minas Gerais', page: 'MinasGerais', image: require('../../../assets/images/estados/mg.png') },
  { name: 'PA', fullName: 'Pará', page: 'Para', image: require('../../../assets/images/estados/pa.png') },
  { name: 'PB', fullName: 'Paraíba', page: 'Paraiba', image: require('../../../assets/images/estados/pb.png') },
  { name: 'PR', fullName: 'Paraná', page: 'Parana', image: require('../../../assets/images/estados/pr.png') },
  { name: 'PE', fullName: 'Pernambuco', page: 'Pernambuco', image: require('../../../assets/images/estados/pe.png') },
  { name: 'PI', fullName: 'Piauí', page: 'Piaui', image: require('../../../assets/images/estados/pi.png') },
  { name: 'RJ', fullName: 'Rio de Janeiro', page: 'RioDeJaneiro', image: require('../../../assets/images/estados/rj.png') },
  { name: 'RN', fullName: 'Rio Grande do Norte', page: 'RioGrandeDoNorte', image: require('../../../assets/images/estados/rn.png') },
  { name: 'RS', fullName: 'Rio Grande do Sul', page: 'RioGrandeDoSul', image: require('../../../assets/images/estados/rs.png') },
  { name: 'RO', fullName: 'Rondônia', page: 'Rondonia', image: require('../../../assets/images/estados/ro.png') },
  { name: 'RR', fullName: 'Roraima', page: 'Roraima', image: require('../../../assets/images/estados/rr.png') },
  { name: 'SC', fullName: 'Santa Catarina', page: 'SantaCatarina', image: require('../../../assets/images/estados/sc.png') },
  { name: 'SP', fullName: 'São Paulo', page: 'SaoPaulo', image: require('../../../assets/images/estados/sp.png') },
  { name: 'SE', fullName: 'Sergipe', page: 'Sergipe', image: require('../../../assets/images/estados/se.png') },
  { name: 'TO', fullName: 'Tocantins', page: 'Tocantins', image: require('../../../assets/images/estados/to.png') },
];

export { listaEstados };

export default function Estados() {
  const router = useRouter();
  const { theme } = useSettings();
  const t = comida;
  const c = themes[theme];
  const [menuVisible, setMenuVisible] = useState(false);
  const [favs, setFavs] = useState<string[]>([]);
  const [popup, setPopup] = useState<{ sigla: string; image: any; page: string } | null>(null);

  useEffect(() => { getEstadosFavoritos().then(setFavs); }, []);

  const handleFav = async (sigla: string) => {
    await toggleEstadoFavorito(sigla);
    getEstadosFavoritos().then(setFavs);
  };

  return (
    <NavLayout active="estados" menuVisible={menuVisible} onMenuClose={() => setMenuVisible(false)}>
      <ScrollView contentContainerStyle={[styles.scrollContainer, { backgroundColor: c.bg }]}>
        <View style={[styles.header, { backgroundColor: c.header }]}>
          <TouchableOpacity style={styles.menuBtn} onPress={() => setMenuVisible(true)}>
            <Ionicons name="menu" size={28} color={c.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: c.text }]}>{t.estados}</Text>
          <View style={{ width: 40 }} />
        </View>
        <View style={styles.grid}>
          {listaEstados.map((estado, index) => (
            <TouchableOpacity key={index} style={[styles.gridItem, { backgroundColor: c.card }]}
              onPress={() => setPopup({ sigla: estado.name, image: estado.image, page: estado.page })}>
              <TouchableOpacity style={styles.heartBtn} onPress={() => handleFav(estado.name)}>
                <Ionicons
                  name={favs.includes(estado.name) ? 'heart' : 'heart-outline'}
                  size={16}
                  color={favs.includes(estado.name) ? '#e53935' : c.subtext}
                />
              </TouchableOpacity>
              <Image source={estado.image} style={styles.gridImage} />
              <Text style={[styles.gridText, { color: c.text }]}>{estado.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <EstadoPopup
        sigla={popup?.sigla ?? null}
        image={popup?.image}
        onClose={() => setPopup(null)}
        onEntrar={() => { router.push(`/Estados/${popup?.page}` as any); setPopup(null); }}
      />
    </NavLayout>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { paddingBottom: 90 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 55, paddingBottom: 15, paddingHorizontal: 20 },
  menuBtn: { width: 40, height: 40, justifyContent: 'center' },
  headerTitle: { fontSize: 22, fontWeight: 'bold' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', paddingHorizontal: 5, paddingTop: 10 },
  gridItem: { width: '30%', aspectRatio: 1, alignItems: 'center', justifyContent: 'center', marginVertical: 5, borderRadius: 15, padding: 5 },
  heartBtn: { position: 'absolute', top: 10, right: 10, zIndex: 1, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 20, padding: 5 },
  gridImage: { width: 60, height: 60, borderRadius: 10, marginBottom: 8 },
  gridText: { fontSize: 14, fontWeight: 'bold' },
});
