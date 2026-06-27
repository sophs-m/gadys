import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import api from './api';

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

export async function logout() {
  await SecureStore.deleteItemAsync('usuarioId');
  await SecureStore.deleteItemAsync('nome');
  await SecureStore.deleteItemAsync('tipoUsuario');
  router.replace('/login');
}
