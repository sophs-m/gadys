import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'historico_pesquisa';
const MAX = 8;

export async function getHistorico(): Promise<string[]> {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function addHistorico(termo: string): Promise<void> {
  const hist = await getHistorico();
  const updated = [termo, ...hist.filter(h => h !== termo)].slice(0, MAX);
  await AsyncStorage.setItem(KEY, JSON.stringify(updated));
}

export async function removeHistorico(termo: string): Promise<void> {
  const hist = await getHistorico();
  await AsyncStorage.setItem(KEY, JSON.stringify(hist.filter(h => h !== termo)));
}

export async function limparHistorico(): Promise<void> {
  await AsyncStorage.removeItem(KEY);
}
