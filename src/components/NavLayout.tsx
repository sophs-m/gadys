import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { comida, themes, useSettings } from '../context/SettingsContext';

type NavPage = 'inicio' | 'estados' | 'favoritos' | 'perfil';

interface Props {
  active: NavPage;
  menuVisible: boolean;
  onMenuClose: () => void;
  children?: React.ReactNode;
}

export default function NavLayout({ active, menuVisible, onMenuClose, children }: Props) {
  const router = useRouter();
  const { theme } = useSettings();
  const t = comida;
  const c = themes[theme];

  const navItems: { key: NavPage; icon: string; activeIcon: string; route: string }[] = [
    { key: 'inicio',    icon: 'home-outline',   activeIcon: 'home',   route: '/(tabs)/inicio' },
    { key: 'estados',   icon: 'map-outline',    activeIcon: 'map',    route: '/(tabs)/estados' },
    { key: 'favoritos', icon: 'heart-outline',  activeIcon: 'heart',  route: '/favoritos' },
    { key: 'perfil',    icon: 'person-outline', activeIcon: 'person', route: '/perfil' },
  ];



  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      {children}

      {/* BOTTOM NAV */}
      <View style={[styles.bottomNav, { backgroundColor: c.nav }]}>
        {navItems.map((item, i) => {
          const isActive = active === item.key;
          if (i === 1) {
            return (
              <React.Fragment key={item.key}>
                <TouchableOpacity style={styles.navItem} onPress={() => router.push(item.route as any)}>
                  <Ionicons name={(isActive ? item.activeIcon : item.icon) as any} size={26} color={isActive ? c.accent : c.text} />
                  <Text style={[styles.navText, { color: isActive ? c.accent : c.text }]}>{t[item.key]}</Text>
                </TouchableOpacity>
                <View style={{ width: 60 }} />
              </React.Fragment>
            );
          }
          return (
            <TouchableOpacity key={item.key} style={styles.navItem} onPress={() => router.push(item.route as any)}>
              <Ionicons name={(isActive ? item.activeIcon : item.icon) as any} size={26} color={isActive ? c.accent : c.text} />
              <Text style={[styles.navText, { color: isActive ? c.accent : c.text }]}>{t[item.key]}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* LOGO CENTER */}
      <TouchableOpacity style={[styles.navLogoContainer, { backgroundColor: c.nav }]} onPress={() => router.push('/(tabs)/inicio')}>
        <Image source={require('../../assets/images/logo.png')} style={styles.navLogo} />
      </TouchableOpacity>

      {/* MENU LATERAL */}
      <Modal animationType="slide" transparent visible={menuVisible} onRequestClose={onMenuClose}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPressOut={onMenuClose}>
          <TouchableWithoutFeedback>
            <View style={[styles.modalView, { backgroundColor: c.nav }]}>

              {/* language selector disabled temporarily */}

              <View style={[styles.divider, { borderColor: c.subtext }]} />

              {['Chat', 'FAQ', t.perfil].map((label, i) => (
                <TouchableOpacity key={i} style={styles.modalItem} onPress={() => { onMenuClose(); if (label === t.perfil) router.push('/perfil'); }}>
                  <Text style={[styles.modalText, { color: c.text }]}>{label}</Text>
                </TouchableOpacity>
              ))}

              <TouchableOpacity style={[styles.modalItem, styles.modalClose, { borderColor: c.subtext }]} onPress={onMenuClose}>
                <Text style={[styles.modalText, { color: c.text }]}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    position: 'absolute', bottom: 0, left: 0, right: 0, height: 70,
    flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingTop: 10,
  },
  navItem: { alignItems: 'center', width: 60 },
  navText: { fontSize: 12, marginTop: 4 },
  navLogoContainer: {
    position: 'absolute', left: '50%', bottom: 20, marginLeft: -35,
    width: 70, height: 70, borderRadius: 35, justifyContent: 'center', alignItems: 'center', elevation: 10,
  },
  navLogo: { width: 65, height: 65 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
  modalView: { height: '100%', width: '75%', paddingTop: 60, paddingHorizontal: 20 },
  menuSection: { fontSize: 13, fontWeight: '600', marginBottom: 10, marginTop: 20 },
  langRow: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  langBtn: { borderWidth: 1.5, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  langText: { fontSize: 13, fontWeight: '600' },
  themeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  divider: { borderTopWidth: 1, marginVertical: 20 },
  modalItem: { paddingVertical: 15 },
  modalClose: { position: 'absolute', bottom: 30, borderTopWidth: 1, paddingHorizontal: 20 },
  modalText: { fontSize: 18, fontWeight: 'bold' },
});
