import React, { useEffect, useState } from "react";
import { Alert, Button, FlatList, StatusBar, StyleSheet, Text, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { getPartidos } from "../database/PartidoRepository.js";
import CardPartido from "../components/CardPartido.js";

function PartidosScreen() {
  const [partidos, setPartidos] = useState([]);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      cargarPartidos();
    }, [])
  );

  const cargarPartidos = async () => {
    try {
      const data = await getPartidos();
      setPartidos(data);
    } catch (e) {
      Alert.alert('Error al cargar partidos');
    }
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Text style={styles.title}>Partidos</Text>
      <Button
        title="Simular partido"
        onPress={() => navigation.navigate("Simulacion")}
      />
      <FlatList
        data={partidos}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => <CardPartido partido={item} />}
        contentContainerStyle={{ paddingVertical: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20
  }
});

export default PartidosScreen;