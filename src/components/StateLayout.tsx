import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { themes, useSettings } from '../context/SettingsContext';

interface Tab { key: string; label: string; }

interface Props {
  title: string;
  headerImage: any;
  tabs: Tab[];
  activeTab: string;
  onTabChange: (key: string) => void;
  isFav: boolean;
  onFav: () => void;
  children: React.ReactNode;
}

export default function StateLayout({ title, headerImage, tabs, activeTab, onTabChange, isFav, onFav, children }: Props) {
  const router = useRouter();
  const { theme } = useSettings();
  const c = themes[theme];

  return (
    <View style={[styles.container, { backgroundColor: c.bg }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        {/* HEADER IMAGE */}
        <View style={styles.headerWrapper}>
          <Image source={headerImage} style={styles.headerImage} />
          <View style={styles.headerOverlay}>
            <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
              <Text style={styles.backText}>{title}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onFav}>
              <Ionicons name={isFav ? 'heart' : 'heart-outline'} size={28} color={isFav ? '#e53935' : '#fff'} />
            </TouchableOpacity>
          </View>
        </View>

        {/* TABS */}
        <View style={[styles.tabs, { backgroundColor: c.card }]}>
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, activeTab === tab.key && { backgroundColor: c.accent }]}
              onPress={() => onTabChange(tab.key)}
            >
              <Text style={[styles.tabText, { color: activeTab === tab.key ? (theme === 'light' ? '#fff' : '#0A172A') : c.subtext }]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* CONTENT */}
        <View style={{ paddingHorizontal: 15, paddingTop: 15 }}>
          {children}
        </View>
      </ScrollView>
    </View>
  );
}

export function PlaceCard({ place, onPress, isFav, onFavorito }: { place: any; onPress: (p: any) => void; isFav: boolean; onFavorito: (name: string) => void }) {
  const { theme } = useSettings();
  const c = themes[theme];

  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: c.card }]} onPress={() => onPress(place)}>
      <Image source={place.image} style={styles.cardImage} />
      <View style={styles.cardBody}>
        <View style={styles.cardTitleRow}>
          <Text style={[styles.cardTitle, { color: c.accent }]}>{place.name}</Text>
          <TouchableOpacity onPress={() => onFavorito(place.name)}>
            <Ionicons name={isFav ? 'heart' : 'heart-outline'} size={22} color={isFav ? '#e53935' : c.subtext} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.cardCategory, { color: c.subtext }]}>{place.category} • {place.location}</Text>
        <Text style={[styles.cardDescription, { color: c.subtext }]} numberOfLines={2}>{place.description}</Text>
      </View>
    </TouchableOpacity>
  );
}

export function HistorySection({ title, children }: { title?: string; children: React.ReactNode }) {
  const { theme } = useSettings();
  const c = themes[theme];

  return (
    <View style={[styles.historyContainer, { backgroundColor: c.card }]}>
      {title && <Text style={[styles.historyTitle, { color: c.accent }]}>{title}</Text>}
      {children}
    </View>
  );
}

export function HistoryText({ children }: { children: React.ReactNode }) {
  const { theme } = useSettings();
  const c = themes[theme];
  return <Text style={[styles.historyText, { color: c.subtext }]}>{children}</Text>;
}

export function HistorySubtitle({ children }: { children: React.ReactNode }) {
  const { theme } = useSettings();
  const c = themes[theme];
  return <Text style={[styles.historySubtitle, { color: c.accent }]}>{children}</Text>;
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerWrapper: { height: 240, position: 'relative' },
  headerImage: { width: '100%', height: '100%' },
  headerOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)', flexDirection: 'row',
    justifyContent: 'space-between', alignItems: 'flex-end',
    paddingHorizontal: 20, paddingBottom: 20,
  },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  backText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  tabs: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 12 },
  tab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  tabText: { fontWeight: 'bold', fontSize: 14 },
  card: { borderRadius: 15, marginBottom: 20, elevation: 3 },
  cardImage: { width: '100%', height: 180, borderTopLeftRadius: 15, borderTopRightRadius: 15 },
  cardBody: { padding: 15 },
  cardTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', flex: 1, marginRight: 8 },
  cardCategory: { fontSize: 14, marginBottom: 6 },
  cardDescription: { fontSize: 14, lineHeight: 20 },
  historyContainer: { borderRadius: 15, padding: 20, marginBottom: 20 },
  historyTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  historySubtitle: { fontSize: 18, fontWeight: 'bold', marginTop: 10, marginBottom: 5 },
  historyText: { fontSize: 16, lineHeight: 24, marginBottom: 10 },
});
