import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"

import equipoImage from "../assets/equipo.png";

const CardEquipo = ({ equipo, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(equipo.id)}>
      <Image
        source={equipoImage}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>{equipo.nombre}</Text>
    </TouchableOpacity>
  )
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
  image: {
    width: 100,
    height: 100,
    marginBottom: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})

export default CardEquipo;