import * as SecureStore from 'expo-secure-store';
import api from './api';

export interface Local {
  id: number;
  nome: string;
  descricao: string;
  categoria: string;
  subcategoria: string;
  cidade: string;
  estado: string;
  imagemUrl: string;
  endereco?: string;
  horarioFuncionamento?: string;
  preco?: string;
  informacoesAdicionais?: string;
}

export async function getLocaisPorEstado(sigla: string): Promise<Local[]> {
  const { data } = await api.get(`/api/locais/estado/${sigla}`);
  return data;
}

export async function getFavoritos(): Promise<number[]> {
  const usuarioId = await SecureStore.getItemAsync('usuarioId');
  if (!usuarioId) return [];
  const { data } = await api.get(`/api/favoritos?usuarioId=${usuarioId}`);
  return data.map((f: any) => f.local?.id ?? f.localId ?? f.id);
}

export async function toggleFavorito(localId: number): Promise<void> {
  const usuarioId = await SecureStore.getItemAsync('usuarioId');
  if (!usuarioId) throw new Error('não autenticado');
  const favs = await getFavoritos();
  if (favs.includes(localId)) {
    await api.delete(`/api/favoritos?usuarioId=${usuarioId}&localId=${localId}`);
  } else {
    await api.post(`/api/favoritos?usuarioId=${usuarioId}&localId=${localId}`);
  }
}
