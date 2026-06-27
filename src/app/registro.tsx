import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert, Image, ImageBackground, StyleSheet, Text,
  TextInput, TouchableOpacity, View,
} from 'react-native';
import { cadastrar } from '../services/auth';

export default function Registro() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCadastro = async () => {
    if (!nome || !email || !senha) { Alert.alert('Preencha todos os campos'); return; }
    setLoading(true);
    try {
      await cadastrar(nome, email, senha);
      router.replace('/(tabs)/inicio');
    } catch (e: any) {
      Alert.alert('Erro', e.message ?? 'Não foi possível criar a conta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/fundos/inicializacao.png')}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.logoArea}>
          <Image source={require('../../assets/images/logo.png')} style={styles.logo} resizeMode="contain" />
          <Text style={styles.welcome}>Criar Conta</Text>
          <Text style={styles.subtitle}>Junte-se e explore as histórias do Brasil.</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Nome completo"
            placeholderTextColor="#aaa"
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />

          <TouchableOpacity style={styles.btn} onPress={handleCadastro} disabled={loading}>
            <Text style={styles.btnText}>{loading ? 'Criando...' : 'Criar Conta'}</Text>
          </TouchableOpacity>

          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Já tem conta? </Text>
            <TouchableOpacity onPress={() => router.replace('/login')}>
              <Text style={styles.loginLink}>Entrar</Text>
            </TouchableOpacity>
          </View>
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
    paddingHorizontal: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoArea: { alignItems: 'center', marginBottom: 32 },
  logo: { width: 180, height: 90, marginBottom: 20 },
  welcome: { fontSize: 34, fontWeight: 'bold', color: '#FFF', marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 15, color: '#CCC', textAlign: 'center', lineHeight: 22 },
  form: { width: '100%', gap: 12 },
  input: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 14,
    color: '#FFF',
    fontSize: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  btn: {
    backgroundColor: '#FFC107',
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 4,
  },
  btnText: { color: '#07172F', fontWeight: 'bold', fontSize: 16 },
  loginRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 4 },
  loginText: { color: '#AAA', fontSize: 14 },
  loginLink: { color: '#FFC107', fontSize: 14, fontWeight: 'bold' },
});
