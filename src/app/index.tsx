import { useRouter } from 'expo-router';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

// Acima disso consideramos "tela de navegador/desktop": a imagem de fundo (pensada
// para a proporção de um celular) deixa de ser usada para não esticar/distorcer.
const MOBILE_BREAKPOINT = 700;

export default function Index() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isMobileScreen = width < MOBILE_BREAKPOINT;

  return (
    <ImageBackground
      source={isMobileScreen ? require('../../assets/images/fundos/inicializacao.png') : undefined}
      style={[styles.bg, !isMobileScreen && styles.bgWeb]}
      resizeMode="cover"
    >
      <View style={[styles.overlay, !isMobileScreen && styles.overlayWeb]}>
        <View style={styles.top}>
          <Image source={require('../../assets/images/logo.png')} style={styles.logo} resizeMode="contain" />
          <Text style={styles.tagline}></Text>
        </View>

        <View style={styles.bottom}>
          <TouchableOpacity style={styles.btn} onPress={() => router.push('/login')}>
            <Text style={styles.btnText}>Começar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  bgWeb: { backgroundColor: '#0A172A' },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(7,23,47,0.35)',
    paddingHorizontal: 30,
    paddingTop: 120,
    paddingBottom: 60,
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
  },
  overlayWeb: { backgroundColor: 'transparent' },
  top: { alignItems: 'center' },
  logo: { width: 880, height: 440, marginBottom: 4 },
  tagline: { color: '#DDD', fontSize: 16, textAlign: 'center', lineHeight: 22 },
  bottom: { gap: 12 },
  btn: {
    backgroundColor: '#FFC107',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
  },
  btnText: { color: '#07172F', fontWeight: 'bold', fontSize: 17 },
});
