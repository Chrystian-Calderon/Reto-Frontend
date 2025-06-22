import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import HomeScreen from "./screens/HomeScreen";
import EquipoScreen from "./screens/EquipoScreen";
import JugadoresScreen from "./screens/JugadoresScreen";
import HistorialScreen from "./screens/HistorialScreen";

const StackHome = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function HomeStack() {
  return (
    <StackHome.Navigator initialRouteName="HomeScreen">
      <StackHome.Screen name="HomeScreen" component={HomeScreen} />
      <StackHome.Screen name="Equipo" component={EquipoScreen} />
      <StackHome.Screen name="Historial" component={HistorialScreen} />
    </StackHome.Navigator>
  )
}

function BottomTabs() {
  return (
    <Tabs.Navigator initialRouteName="Home">
      <Tabs.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Jugadores"
        component={JugadoresScreen}
      />
    </Tabs.Navigator>
  )
}

const Navigation = () => {
  return (
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
  )
}

export default Navigation;