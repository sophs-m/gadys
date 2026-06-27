import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'estados_favoritos';

export async function getEstadosFavoritos(): Promise<string[]> {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function toggleEstadoFavorito(sigla: string): Promise<boolean> {
  const favs = await getEstadosFavoritos();
  const isFav = favs.includes(sigla);
  const updated = isFav ? favs.filter(s => s !== sigla) : [...favs, sigla];
  await AsyncStorage.setItem(KEY, JSON.stringify(updated));
  return !isFav;
}
