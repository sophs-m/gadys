import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'pontos_favoritos';

export async function getPontosFavoritos(): Promise<string[]> {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function togglePontoFavorito(nome: string): Promise<boolean> {
  const favs = await getPontosFavoritos();
  const isFav = favs.includes(nome);
  const updated = isFav ? favs.filter(n => n !== nome) : [...favs, nome];
  await AsyncStorage.setItem(KEY, JSON.stringify(updated));
  return !isFav;
}
