import { Ionicons } from '@expo/vector-icons';import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Image, ScrollView, StyleSheet, Text, TextInput,
  TouchableOpacity, View,
} from 'react-native';

export default function Perfil() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);

  const handleSave = () => {
    router.push('/inicio');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Perfil</Text>
        </View>

        <View style={styles.profileContainer}>
          <View style={styles.avatarContainer}>
            <TouchableOpacity>
              <Image
                source={image ? { uri: image } : require('../../assets/images/logo.png')}
                style={styles.avatar}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.label}>Usuário:</Text>
            <TextInput style={styles.input} placeholderTextColor="#888" />
            <Text style={styles.label}>Nome:</Text>
            <TextInput style={styles.input} placeholderTextColor="#888" />
            <Text style={styles.label}>Sobrenome:</Text>
            <TextInput style={styles.input} placeholderTextColor="#888" />
            <Text style={styles.label}>E-mail:</Text>
            <TextInput style={styles.input} placeholderTextColor="#888" keyboardType="email-address" />
            <Text style={styles.label}>Telefone:</Text>
            <TextInput style={styles.input} placeholderTextColor="#888" keyboardType="phone-pad" />
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>SALVAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/inicio')}>
          <Ionicons name="home-outline" size={26} color="white" />
          <Text style={styles.navText}>Início</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/estados')}>
          <Ionicons name="map-outline" size={26} color="white" />
          <Text style={styles.navText}>Estados</Text>
        </TouchableOpacity>
        <View style={{ width: 60 }} />
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/favoritos')}>
          <Ionicons name="heart-outline" size={26} color="white" />
          <Text style={styles.navText}>Favoritos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/perfil')}>
          <Ionicons name="person" size={26} color="#FFC700" />
          <Text style={[styles.navText, styles.navTextActive]}>Perfil</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.navLogoContainer} onPress={() => router.push('/inicio')}>
        <Image source={require('../../assets/images/logo.png')} style={styles.navLogo} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A172A' },
  scrollContainer: { flexGrow: 1, paddingBottom: 90 },
  header: {
    paddingTop: 60, paddingBottom: 20, paddingHorizontal: 20,
    backgroundColor: '#0A172A', alignItems: 'center',
  },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: 'white' },
  profileContainer: { flex: 1, alignItems: 'center', paddingHorizontal: 20, paddingTop: 50 },
  avatarContainer: { marginBottom: -50, zIndex: 1 },
  avatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: '#FFC700' },
  formContainer: { backgroundColor: '#1E2F4A', padding: 30, paddingTop: 70, borderRadius: 20, width: '100%' },
  label: { color: '#ccc', marginBottom: 5, fontSize: 14 },
  input: { borderBottomWidth: 1, borderBottomColor: '#555', marginBottom: 20, paddingVertical: 8, fontSize: 16, color: 'white' },
  button: { backgroundColor: '#FFC700', padding: 15, borderRadius: 25, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#0A172A', fontWeight: 'bold', fontSize: 16 },
  bottomNav: {
    position: 'absolute', bottom: 0, left: 0, right: 0, height: 70,
    flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',
    backgroundColor: '#1E2F4A', paddingTop: 10,
  },
  navItem: { alignItems: 'center', width: 60 },
  navText: { color: 'white', fontSize: 12, marginTop: 4 },
  navTextActive: { color: '#FFC700' },
  navLogoContainer: {
    position: 'absolute', left: '50%', bottom: 20, marginLeft: -35,
    width: 70, height: 70, borderRadius: 35, backgroundColor: '#1E2F4A',
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3, shadowRadius: 5, elevation: 10,
  },
  navLogo: { width: 65, height: 65 },
});
