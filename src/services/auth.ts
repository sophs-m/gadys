
import * as Linking from 'expo-linking';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import * as WebBrowser from 'expo-web-browser';
import api from './api';
 
// Necessário para finalizar a sessão aberta no navegador (principalmente na web).
WebBrowser.maybeCompleteAuthSession();
 
// Site do GADYS, usado para entrar/cadastrar e voltar para o app já logado.
export const SITE_URL = 'https://gadys-tcc.vercel.app';
 
export async function login(email: string, senha: string) {
  const { data } = await api.post('/api/auth/login', { email, senha, recaptchaToken: 'mobile' });
  if (!data.sucesso) throw new Error(data.mensagem);
  await SecureStore.setItemAsync('usuarioId', String(data.usuarioId));
  await SecureStore.setItemAsync('nome', data.nome);
  await SecureStore.setItemAsync('tipoUsuario', data.tipoUsuario);
  return data;
}
 
export async function cadastrar(nome: string, email: string, senha: string, dataNascimento?: string) {
  const { data } = await api.post('/api/auth/cadastrar', { nome, email, senha, dataNascimento });
  if (!data.sucesso) throw new Error(data.mensagem);
  await SecureStore.setItemAsync('usuarioId', String(data.usuarioId));
  await SecureStore.setItemAsync('nome', data.nome);
  await SecureStore.setItemAsync('tipoUsuario', data.tipoUsuario);
  return data;
}
 
// Envia o pedido de recuperação de senha para o backend.
export async function esqueciSenha(email: string) {
  const { data } = await api.post('/api/auth/esqueci-senha', { email });
  if (data?.sucesso === false) throw new Error(data.mensagem);
  return data;
}
 
const texto = (v: unknown) => (Array.isArray(v) ? String(v[0]) : v == null ? undefined : String(v));
 
/**
 * Guarda a sessão que o site devolveu na URL de retorno:
 *   ?usuarioId=...&nome=...&tipoUsuario=...   (ou ?erro=mensagem em caso de falha)
 */
export async function salvarSessaoDoSite(params: Record<string, unknown>) {
  const erro = texto(params.erro);
  if (erro) throw new Error(erro);
 
  const usuarioId = texto(params.usuarioId);
  if (!usuarioId) throw new Error('Não foi possível concluir o login pelo site. Tente novamente.');
 
  const nome = texto(params.nome) ?? '';
  const tipoUsuario = texto(params.tipoUsuario) ?? 'USUARIO';
 
  await SecureStore.setItemAsync('usuarioId', usuarioId);
  await SecureStore.setItemAsync('nome', nome);
  await SecureStore.setItemAsync('tipoUsuario', tipoUsuario);
  return { usuarioId, nome, tipoUsuario };
}
 
/**
 * Entrar ou cadastrar pelo site.
 * Abre o site (/login) num navegador interno enviando ?origem=mobile&redirect_uri=<link do app>.
 * Depois que o usuário entra ou se cadastra, o site redireciona para o redirect_uri com os dados
 * da conta. Retorna null se o navegador for fechado/dispensado sem devolver a sessão
 * (no Android o link de retorno pode chegar direto na tela de login; ela também trata isso).
 */
export async function loginPeloSite() {
  // Usa a rota "login", que já existe no app, como destino do redirecionamento.
  const redirectUrl = Linking.createURL('login');
  const url = `${SITE_URL}/login?origem=mobile&redirect_uri=${encodeURIComponent(redirectUrl)}`;
 
  const result = await WebBrowser.openAuthSessionAsync(url, redirectUrl);
  if (result.type !== 'success') return null;
 
  return salvarSessaoDoSite(Linking.parse(result.url).queryParams ?? {});
}
 
export async function logout() {
  await SecureStore.deleteItemAsync('usuarioId');
  await SecureStore.deleteItemAsync('nome');
  await SecureStore.deleteItemAsync('tipoUsuario');
  router.replace('/login');
}
 
