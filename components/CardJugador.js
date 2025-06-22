import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Image } from "react-native";

import jugadorImage from '../assets/jugador.png';

const CardJugador = ({ jugador }) => {
  return (
    <View style={styles.card}>
      <Image
        source={jugadorImage}
        style={{ width: 140, height: 150, }}
        resizeMode="contain"
      />
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{jugador.nombre}</Text>
      <Text>Nro camiseta: {jugador.nroCamiseta}</Text>
      <Text>Posicion: {jugador.posicion}</Text>
    </View>
  );
}

const { width } = Dimensions.get('window');
const cardWidth = (width - 3 * 10) / 2;
const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default CardJugador;