import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import HomeScreen from "./screens/HomeScreen";
import EquipoScreen from "./screens/EquipoScreen";
import JugadoresScreen from "./screens/JugadoresScreen";
import HistorialScreen from "./screens/HistorialScreen";
import EquiposScreen from "./screens/EquiposScreen";
import AddEquipoScreen from "./screens/AddEquipoScreen";
import PartidosScreen from "./screens/PartidosScreen";
import SimulacionScreen from "./screens/SimulacionScreen";

const StackHome = createNativeStackNavigator();
const StackEquipos = createNativeStackNavigator();
const StackPartidos = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function HomeStack() {
  return (
    <StackHome.Navigator initialRouteName="HomeScreen">
      <StackHome.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false
        }}
      />
      <StackHome.Screen name="Equipo" component={EquipoScreen} />
      <StackHome.Screen name="Historial" component={HistorialScreen} />
    </StackHome.Navigator>
  );
}

function EquiposStack() {
  return (
    <StackEquipos.Navigator initialRouteName="EquiposScreen">
      <StackEquipos.Screen
        name="EquiposScreen"
        component={EquiposScreen}
        options={{
          headerShown: false
        }}
      />
      <StackEquipos.Screen name="Equipo" component={EquipoScreen} />
      <StackEquipos.Screen name="AgregarEquipo" component={AddEquipoScreen} />
    </StackEquipos.Navigator>
  );
}

function PartidosStack() {
  return (
    <StackPartidos.Navigator initialRouteName="PartidosScreen">
      <StackPartidos.Screen
        name="PartidosScreen"
        component={PartidosScreen}
        options={{
          headerShown: false
        }}
      />
      <StackPartidos.Screen name="Simulacion" component={SimulacionScreen} />
    </StackPartidos.Navigator>
  );
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
        name="Equipos"
        component={EquiposStack}
        options={{
          tabBarLabel: 'Equipos',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="team" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Jugadores"
        component={JugadoresScreen}
        options={{
          tabBarLabel: 'Jugadores',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="person-running" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Partidos"
        component={PartidosStack}
        options={{
          tabBarLabel: 'Partidos',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="soccer" size={size} color={color} />
          ),
          headerShown: false,
        }}
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