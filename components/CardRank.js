import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";

import equipoImage from '../assets/equipo.png';

const CardRank = ({ equipo, rank, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(equipo.id)}>
      <View style={styles.equipoContainer}>
        <Text>{`#${rank}`}</Text>
        <Image
          source={equipoImage}
          style={styles.equipoImage}
        />
        <Text style={styles.title}>{equipo.nombre}</Text>
      </View>
      <Text style={styles.partidosGanados}>{equipo.partidos_ganados}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    paddingHorizontal: 20,
    marginHorizontal: 20,
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
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  equipoContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  equipoImage: {
    width: 30,
    height: 30,
    marginLeft: 20,
    marginRight: 10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  partidosGanados: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#555',
    marginRight: 20
  }
})

export default CardRank;