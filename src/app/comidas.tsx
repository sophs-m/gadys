import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { themes, translations, useSettings } from '../context/SettingsContext';

type ComidaKey = 'acaraje' | 'arroz' | 'baiao' | 'barreado' | 'bolo' | 'caranguejada' | 'carnesol' | 'carneiro' | 'chambari' | 'chimarrao' | 'churrasco' | 'feijoada' | 'galinhada' | 'ginga' | 'maria' | 'moqueca' | 'pacoca' | 'pamonha' | 'mortadela' | 'paoqueijo' | 'pato' | 'pirarucu' | 'sopa' | 'sururu' | 'tacaca' | 'tainha' | 'terere' | 'tucupi';

const comidaImages: Record<ComidaKey, any> = {
  acaraje:     require('../../assets/images/comidas/acaraje.png'),
  arroz:       require('../../assets/images/comidas/arroz.png'),
  baiao:       require('../../assets/images/comidas/baiao.png'),
  barreado:    require('../../assets/images/comidas/barreado.png'),
  bolo:        require('../../assets/images/comidas/bolo-de-rolo.png'),
  caranguejada:require('../../assets/images/comidas/caranguejada.png'),
  carnesol:    require('../../assets/images/comidas/carne-de-sol.png'),
  carneiro:    require('../../assets/images/comidas/carneiro.png'),
  chambari:    require('../../assets/images/comidas/chambari.png'),
  chimarrao:   require('../../assets/images/comidas/chimarrao.png'),
  churrasco:   require('../../assets/images/comidas/churrasco.png'),
  feijoada:    require('../../assets/images/comidas/feijoada.png'),
  galinhada:   require('../../assets/images/comidas/galinhada.png'),
  ginga:       require('../../assets/images/comidas/ginga.png'),
  maria:       require('../../assets/images/comidas/maria.png'),
  moqueca:     require('../../assets/images/comidas/moqueca.png'),
  pacoca:      require('../../assets/images/comidas/pacoca.png'),
  pamonha:     require('../../assets/images/comidas/pamonha.png'),
  mortadela:   require('../../assets/images/comidas/mortadela.png'),
  paoqueijo:   require('../../assets/images/comidas/pao-de-queijo.png'),
  pato:        require('../../assets/images/comidas/pato.png'),
  pirarucu:    require('../../assets/images/comidas/pirarucu.png'),
  sopa:        require('../../assets/images/comidas/sopa.png'),
  sururu:      require('../../assets/images/comidas/sururu.png'),
  tacaca:      require('../../assets/images/comidas/tacaca.png'),
  tainha:      require('../../assets/images/comidas/tainha.png'),
  terere:      require('../../assets/images/comidas/terere.png'),
  tucupi:      require('../../assets/images/comidas/tucupi.png'),
};

const comidaKeys: ComidaKey[] = Object.keys(comidaImages) as ComidaKey[];

const localFoodsByState: Partial<Record<string, ComidaKey[]>> = {
  AC: ['sopa'], AL: ['sururu'], AP: ['tacaca'], AM: ['tucupi', 'pirarucu'],
  BA: ['acaraje', 'moqueca'], CE: ['baiao'], DF: ['mortadela'], ES: ['moqueca'],
  GO: ['pamonha'], MA: ['arroz', 'caranguejada'], MT: ['maria'], MS: ['carneiro', 'terere'],
  MG: ['paoqueijo', 'feijoada'], PA: ['pato', 'tacaca', 'tucupi'], PB: ['carnesol'],
  PR: ['barreado'], PE: ['bolo', 'carnesol'], PI: ['pacoca'], RJ: ['feijoada'],
  RN: ['ginga'], RS: ['churrasco', 'chimarrao'], RO: ['pirarucu'], RR: ['pacoca'],
  SC: ['tainha'], SP: ['mortadela'], SE: ['caranguejada'], TO: ['chambari'],
};

export default function Comidas() {
  const router = useRouter();
  const { theme } = useSettings();
  const c = themes[theme];
  const t = translations.pt;
  const { open, state } = useLocalSearchParams<{ open?: string; state?: string }>();
  const [selected, setSelected] = useState<ComidaKey | null>(null);
  const visibleFoodKeys = state && localFoodsByState[state] ? localFoodsByState[state] : comidaKeys;

  useEffect(() => {
    if (open && comidaKeys.includes(open as ComidaKey)) setSelected(open as ComidaKey);
  }, [open]);

  return (
    <View style={[styles.container, { backgroundColor: c.bg }]}>
      <View style={[styles.header, { backgroundColor: c.header }]}>
        <TouchableOpacity onPress={() => router.push('/(tabs)/inicio')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={c.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: c.text }]}>{state ? 'Culinária local' : t.comidas}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.grid}>
        {visibleFoodKeys.map((key) => (
          <TouchableOpacity key={key} style={[styles.card, { backgroundColor: c.card }]} onPress={() => setSelected(key)}>
            <Image source={comidaImages[key]} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={[styles.cardName, { color: c.text }]}>{t[`c_${key}_name`]}</Text>
              <Text style={[styles.cardRegion, { color: c.subtext }]}>{t[`c_${key}_region`]}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal visible={!!selected} transparent animationType="fade" onRequestClose={() => setSelected(null)}>
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => setSelected(null)}>
          <TouchableWithoutFeedback>
            <View style={[styles.popup, { backgroundColor: c.card }]}>
              {selected && (
                <>
                  <Image source={comidaImages[selected]} style={styles.popupImage} />
                  <View style={styles.popupContent}>
                    <Text style={[styles.popupName, { color: c.text }]}>{t[`c_${selected}_name`]}</Text>
                    <Text style={[styles.popupRegion, { color: c.accent }]}>{t[`c_${selected}_region`]}</Text>
                    <Text style={[styles.popupDesc, { color: c.subtext }]}>{t[`c_${selected}_desc`]}</Text>
                    <TouchableOpacity style={[styles.closeBtn, { backgroundColor: c.accent }]} onPress={() => setSelected(null)}>
                      <Text style={[styles.closeBtnText, { color: theme === 'light' ? '#fff' : '#0A172A' }]}>{t.fechar}</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 55, paddingBottom: 15, paddingHorizontal: 20 },
  backButton: { width: 40, height: 40, justifyContent: 'center' },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', padding: 15, paddingBottom: 30 },
  card: { width: '48%', borderRadius: 15, marginBottom: 15, overflow: 'hidden' },
  cardImage: { width: '100%', height: 130 },
  cardContent: { padding: 10 },
  cardName: { fontWeight: 'bold', fontSize: 14 },
  cardRegion: { fontSize: 12, marginTop: 3 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.65)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  popup: { width: '100%', borderRadius: 20, overflow: 'hidden' },
  popupImage: { width: '100%', height: 200 },
  popupContent: { padding: 20 },
  popupName: { fontSize: 22, fontWeight: 'bold', marginBottom: 4 },
  popupRegion: { fontSize: 14, marginBottom: 12 },
  popupDesc: { fontSize: 14, lineHeight: 21 },
  closeBtn: { marginTop: 20, borderRadius: 25, paddingVertical: 12, alignItems: 'center' },
  closeBtnText: { fontWeight: 'bold', fontSize: 15 },
});
