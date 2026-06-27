import { Tabs } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FFC700',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { display: 'none' },
      }}
    >
      <Tabs.Screen
        name="inicio"
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => <FontAwesome5 name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="estados"
        options={{
          title: 'Estados',
          tabBarIcon: ({ color }) => <FontAwesome5 name="map-marked-alt" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
