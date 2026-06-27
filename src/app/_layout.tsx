import { Stack } from 'expo-router';
import { SettingsProvider } from '../context/SettingsContext';

export default function RootLayout() {
  return (
    <SettingsProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="Estados" />
        <Stack.Screen name="comidas" />
        <Stack.Screen name="favoritos" />
        <Stack.Screen name="perfil" />
        <Stack.Screen name="lugares" />
      </Stack>
    </SettingsProvider>
  );
}
