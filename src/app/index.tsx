import { useRouter } from 'expo-router';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Index() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('../../assets/images/fundos/inicializacao.png')}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
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
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(7,23,47,0.35)',
    paddingHorizontal: 30,
    paddingTop: 120,
    paddingBottom: 60,
    justifyContent: 'space-between',
  },
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
