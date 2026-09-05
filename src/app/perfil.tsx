import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import NavLayout from '../components/NavLayout';
import api from '../services/api';
import { comida, themes, useSettings } from '../context/SettingsContext';

const AVATAR_KEY = 'perfil_avatar';

export default function Perfil() {
  const router = useRouter();
  const { theme } = useSettings();
  const t = comida;
  const c = themes[theme];
  const [menuVisible, setMenuVisible] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadUsuario();
  }, []);

  const loadUsuario = async () => {
    const usuarioId = await SecureStore.getItemAsync('usuarioId');
    if (!usuarioId) return;
    try {
      const { data } = await api.get(`/api/usuarios/${usuarioId}`);
      setNome(data.nome ?? '');
      setEmail(data.email ?? '');
      if (data.imagem_perfil) {
        setImage(data.imagem_perfil);
      }
    } catch (error) {
      Alert.alert('Erro de Conexão', 'Não foi possível carregar os dados do perfil.');
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') return;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
      AsyncStorage.setItem(AVATAR_KEY, uri);
    }
  };

  const salvar = async () => {
    const usuarioId = await SecureStore.getItemAsync('usuarioId');
    if (!usuarioId) return;
    setSaving(true);
    try {
      await api.put(`/api/usuarios/${usuarioId}`, { nome, email });
      await SecureStore.setItemAsync('nome', nome);
      Alert.alert('Sucesso', 'Perfil atualizado!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar as alterações. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <NavLayout active="perfil" menuVisible={menuVisible} onMenuClose={() => setMenuVisible(false)}>
      <ScrollView contentContainerStyle={[styles.scrollContainer, { backgroundColor: c.bg }]}>
        <View style={[styles.header, { backgroundColor: c.header }]}>
          <TouchableOpacity style={styles.menuBtn} onPress={() => setMenuVisible(true)}>
            <Ionicons name="menu" size={28} color={c.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: c.text }]}>{t.perfil}</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.profileContainer}>
          <View style={styles.avatarContainer}>
            <TouchableOpacity onPress={pickImage} style={styles.avatarWrapper}>
              <Image
                source={image ? { uri: image } : require('../../assets/images/logo.png')}
                style={[styles.avatar, { borderColor: c.accent }]}
              />
              <View style={[styles.cameraBtn, { backgroundColor: c.accent }]}>
                <Ionicons name="camera" size={14} color={theme === 'light' ? '#fff' : '#07172F'} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={[styles.formContainer, { backgroundColor: c.card }]}>
            <Text style={[styles.label, { color: c.subtext }]}>{t.nome}:</Text>
            <TextInput
              style={[styles.input, { borderBottomColor: c.subtext, color: c.text }]}
              placeholderTextColor={c.subtext}
              value={nome}
              onChangeText={setNome}
            />

            <Text style={[styles.label, { color: c.subtext }]}>{t.email}:</Text>
            <TextInput
              style={[styles.input, { borderBottomColor: c.subtext, color: c.text }]}
              placeholderTextColor={c.subtext}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <TouchableOpacity
              style={[styles.button, { backgroundColor: c.accent, opacity: saving ? 0.7 : 1 }]}
              onPress={salvar}
              disabled={saving}
            >
              <Text style={[styles.buttonText, { color: theme === 'light' ? '#fff' : c.bg }]}>
                {saving ? 'Salvando...' : t.salvar}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </NavLayout>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, paddingBottom: 90 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 55, paddingBottom: 15, paddingHorizontal: 20 },
  menuBtn: { width: 40, height: 40, justifyContent: 'center' },
  headerTitle: { fontSize: 22, fontWeight: 'bold' },
  profileContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  avatarContainer: { marginBottom: -50, zIndex: 1 },
  avatarWrapper: { position: 'relative' },
  avatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 3 },
  cameraBtn: { position: 'absolute', bottom: 0, right: 0, width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  formContainer: {
    paddingHorizontal: 30,
    paddingTop: 70,
    paddingBottom: 40,
    borderRadius: 20,
    width: '90%',
  },
  label: { marginBottom: 5, fontSize: 14 },
  input: { borderBottomWidth: 1, marginBottom: 20, paddingVertical: 8, fontSize: 16 },
  button: { padding: 15, borderRadius: 25, alignItems: 'center', marginTop: 10 },
  buttonText: { fontWeight: 'bold', fontSize: 16 },
});
