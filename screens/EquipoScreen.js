import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert, Text, View, FlatList, StyleSheet, Image, Dimensions, Button } from "react-native";

import { getEquipoId } from "../database/EquipoRepository";
import { getJugadoresEquipo } from "../database/JugadorRepository";
import entrenadorImage from "../assets/entrenador.png";
import equipoImage from "../assets/equipo.png";
import CardJugador from "../components/CardJugador";

function EquipoScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;
  const [equipo, setEquipo] = useState({
    id: null,
    nombre: '',
    entrenador: '',
    estrategia: ''
  });
  const [jugadores, setJugadores] = useState([]);

  useEffect(() => {
    loadEquipo(id);
  }, []);

  const loadEquipo = async (id) => {
    try {
      const [equipo] = await getEquipoId(id);
      const jugadores = await getJugadoresEquipo(id);
      setEquipo(equipo);
      setJugadores(jugadores);
    } catch (e) {
      Alert.alert('Error al cargar el equipo');
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.equipoInfo}>
        <View style={styles.equipoInfoCard}>
          <Image
            source={equipoImage}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{equipo.nombre}</Text>
        </View>
        <View style={styles.equipoInfoCard}>
          <Image
            source={entrenadorImage}
            style={styles.image}
            resizeMode="contain"
          />
          <Text>Entrenador: {equipo.entrenador}</Text>
          <Text>Estrategia: {equipo.estrategia}</Text>
        </View>
      </View>
      <Button
        title="Ver Partidos"
        onPress={() => navigation.navigate('Historial', { id: equipo.id })}
      />
      <FlatList
        data={jugadores}
        renderItem={({ item }) => <CardJugador jugador={item} />}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', marginHorizontal: 10 }}
      />
    </View>
  );
}

const { width } = Dimensions.get('window');
const cardWidth = (width - 3 * 10) / 2;
const styles = StyleSheet.create({
  equipoInfo: {
    padding: 10,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    height: 100,
    marginBottom: 10
  },
  equipoInfoCard: {
    width: cardWidth,
    flexDirection: 'column',
    alignItems: 'center',
  }
})

export default EquipoScreen;