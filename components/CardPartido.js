import { StyleSheet, Text, View } from "react-native";

const CardPartido = ({ partido }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>
        {partido.equipo_local} {partido.resultado_local} - {partido.resultado_visitante} {partido.equipo_visitante}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f2f2f2",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center"
  },
  text: {
    fontSize: 18,
    fontWeight: "bold"
  }
});

export default CardPartido;