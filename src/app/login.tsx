import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator, Alert, Image, ImageBackground, KeyboardAvoidingView, Linking, Modal,
  Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import { esqueciSenha, login, loginPeloSite, salvarSessaoDoSite, SITE_URL } from '../services/auth';

const emailValido = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

export default function Login() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const tratandoRetorno = useRef(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [siteLoading, setSiteLoading] = useState(false);

  // "Esqueceu sua senha?"
  const [forgotVisible, setForgotVisible] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);

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

  // Retorno do site: quando o site redireciona para gadys2://login?usuarioId=... o app abre
  // esta tela com esses dados nos parâmetros. Guardamos a sessão e entramos no app.
  useEffect(() => {
    if (!params.usuarioId && !params.erro) return;
    if (tratandoRetorno.current) return;
    tratandoRetorno.current = true;
    salvarSessaoDoSite(params)
      .then(() => router.replace('/(tabs)/inicio'))
      .catch((e: any) => {
        tratandoRetorno.current = false;
        router.setParams({ usuarioId: undefined, nome: undefined, tipoUsuario: undefined, erro: undefined } as any);
        Alert.alert('Erro', e.message ?? 'Não foi possível entrar pelo site.');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.usuarioId, params.erro]);

  const abrirEsqueciSenha = () => {
    setForgotEmail(email); // aproveita o email já digitado
    setForgotVisible(true);
  };

  const handleEsqueciSenha = async () => {
    if (!emailValido(forgotEmail)) { Alert.alert('Email inválido', 'Digite um email válido.'); return; }
    setForgotLoading(true);
    try {
      await esqueciSenha(forgotEmail.trim());
      setForgotVisible(false);
      Alert.alert(
        'Verifique seu email',
        'Se o email estiver cadastrado, você receberá as instruções para redefinir sua senha.',
      );
    } catch (e: any) {
      Alert.alert('Erro', e.message ?? 'Não foi possível enviar o email de recuperação.');
    } finally {
      setForgotLoading(false);
    }
  };

  // Entrar/cadastrar pelo site e voltar para o app já logado.
  const entrarPeloSite = async () => {
    if (siteLoading || tratandoRetorno.current) return;
    // Na web o app já roda no navegador, então só abre o site.
    if (Platform.OS === 'web') {
      Linking.openURL(`${SITE_URL}/login`).catch(() => {});
      return;
    }
    setSiteLoading(true);
    try {
      const resultado = await loginPeloSite();
      if (resultado && !tratandoRetorno.current) {
        tratandoRetorno.current = true; // evita tratar o mesmo retorno duas vezes
        router.replace('/(tabs)/inicio');
      }
      // null = navegador fechado, ou o retorno chegou pela tela de login (useEffect acima)
    } catch (e: any) {
      Alert.alert('Erro', e.message ?? 'Não foi possível entrar pelo site.');
    } finally {
      setSiteLoading(false);
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

          {/* Senha com botão de mostrar/ocultar */}
          <View style={styles.passwordWrap}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Senha"
              placeholderTextColor="#aaa"
              secureTextEntry={!mostrarSenha}
              autoCapitalize="none"
              autoCorrect={false}
              value={senha}
              onChangeText={setSenha}
            />
            <TouchableOpacity
              onPress={() => setMostrarSenha((v) => !v)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              accessibilityRole="button"
              accessibilityLabel={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
            >
              <Ionicons name={mostrarSenha ? 'eye-off-outline' : 'eye-outline'} size={22} color="#CCC" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={abrirEsqueciSenha} style={styles.forgotBtn}>
            <Text style={styles.forgotText}>Esqueceu sua senha?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin} disabled={loading}>
            <Text style={styles.loginBtnText}>{loading ? 'Entrando...' : 'Entrar'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.siteBtn} onPress={entrarPeloSite} disabled={siteLoading}>
            {siteLoading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <View style={styles.siteBtnContent}>
                <Ionicons name="globe-outline" size={18} color="#FFF" />
                <Text style={styles.siteBtnText}>Entrar ou cadastrar pelo site</Text>
              </View>
            )}
          </TouchableOpacity>

          <View style={styles.signupRow}>
            <Text style={styles.signupText}>Não tem uma conta? </Text>
            <TouchableOpacity onPress={entrarPeloSite}>
              <Text style={styles.signupLink}>Cadastre-se</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>

      {/* Modal: recuperar senha */}
      <Modal
        visible={forgotVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setForgotVisible(false)}
      >
        <KeyboardAvoidingView
          style={styles.modalBackdrop}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.modalScroll}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>Recuperar senha</Text>
              <Text style={styles.modalText}>
                Digite o email da sua conta e enviaremos as instruções para redefinir a senha.
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#aaa"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={forgotEmail}
                onChangeText={setForgotEmail}
              />

              <TouchableOpacity
                style={styles.loginBtn}
                onPress={handleEsqueciSenha}
                disabled={forgotLoading}
              >
                <Text style={styles.loginBtnText}>{forgotLoading ? 'Enviando...' : 'Enviar'}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalCancel}
                onPress={() => setForgotVisible(false)}
                disabled={forgotLoading}
              >
                <Text style={styles.modalCancelText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
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
  passwordWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 25,
    paddingRight: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 14,
    color: '#FFF',
    fontSize: 15,
    outlineWidth: 0,
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

  siteBtn: {
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  siteBtnContent: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  siteBtnText: { color: '#FFF', fontSize: 14, fontWeight: '600' },

  signupRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 4 },
  signupText: { color: '#AAA', fontSize: 14 },
  signupLink: { color: '#FFC107', fontSize: 14, fontWeight: 'bold' },

  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' },
  modalScroll: { flexGrow: 1, justifyContent: 'center', padding: 28 },
  modalCard: {
    backgroundColor: '#0A172A',
    borderRadius: 24,
    padding: 24,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  modalTitle: { color: '#FFF', fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  modalText: { color: '#CCC', fontSize: 14, lineHeight: 20, textAlign: 'center', marginBottom: 4 },
  modalCancel: { alignItems: 'center', paddingVertical: 8 },
  modalCancelText: { color: '#AAA', fontSize: 14 },
});
