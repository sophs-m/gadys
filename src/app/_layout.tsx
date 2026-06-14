import { Tabs } from 'expo-router';

const hidden = { tabBarButton: () => null };

export default function AppLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }}>
      <Tabs.Screen name="index" options={hidden} />
      <Tabs.Screen name="login" options={hidden} />
      <Tabs.Screen name="registro" options={hidden} />
      <Tabs.Screen name="inicio" options={hidden} />
      <Tabs.Screen name="estados" options={hidden} />
      <Tabs.Screen name="favoritos" options={hidden} />
      <Tabs.Screen name="perfil" options={hidden} />
      <Tabs.Screen name="Estados" options={hidden} />
    </Tabs>
  );
}
