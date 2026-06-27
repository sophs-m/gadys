import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View,} from 'react-native';
import { login } from '../services/auth';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !senha) { Alert.alert('Preencha email e senha'); return; }
    setLoading(true);
    try {
      await login(email, senha);
      router.replace('/(tabs)/inicio');
    } catch (e: any) {
      Alert.alert('Erro', e.message ?? 'Email ou senha incorretos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      // amazonq-ignore-next-line
      source={require('../../assets/images/fundos/inicializacao.png')}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.overlay}>

        {/* Logo */}
        <View style={styles.logoArea}>
          <Image source={require('../../assets/images/logo.png')} style={styles.logo} resizeMode="contain" />
          <Text style={styles.welcome}>Bem-vindo!</Text>
          <Text style={styles.subtitle}>Explore, aprenda e conheça as histórias do Brasil.</Text>
        </View>

        {/* Formulário */}
        <View style={styles.form}>
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

          <TouchableOpacity onPress={() => {}} style={styles.forgotBtn}>
            <Text style={styles.forgotText}>Esqueceu sua senha?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin} disabled={loading}>
            <Text style={styles.loginBtnText}>{loading ? 'Entrando...' : 'Entrar'}</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Ou faça login com</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social */}
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialBtn}>
              <Text style={styles.socialBtnText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn}>
              <Text style={styles.socialBtnText}>Apple</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.signupRow}>
            <Text style={styles.signupText}>Não tem uma conta? </Text>
            <TouchableOpacity onPress={() => Alert.alert('Em breve', 'Cadastro estará disponível em breve')}>
              <Text style={styles.signupLink}>Cadastre-se</Text>
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
    // amazonq-ignore-next-line
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
  forgotBtn: { alignSelf: 'flex-end', marginTop: -4 },
  forgotText: { color: '#FFC107', fontSize: 13 },

  loginBtn: {
    backgroundColor: '#FFC107',
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 4,
  },
  loginBtnText: { color: '#07172F', fontWeight: 'bold', fontSize: 16 },

  divider: { flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 4 },
  dividerLine: { flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.2)' },
  dividerText: { color: '#AAA', fontSize: 13 },

  socialRow: { flexDirection: 'row', gap: 12 },
  socialBtn: {
    flex: 1, backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 25, paddingVertical: 13,
    alignItems: 'center', borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  socialBtnText: { color: '#FFF', fontSize: 14, fontWeight: '600' },

  signupRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 4 },
  signupText: { color: '#AAA', fontSize: 14 },
  signupLink: { color: '#FFC107', fontSize: 14, fontWeight: 'bold' },
});
