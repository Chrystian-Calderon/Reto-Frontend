import { useEffect, useState } from "react";
import React, { Alert, FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import CardJugador from "../components/CardJugador.js";
import { getJugadores } from "../database/JugadorRepository";

function JugadoresScreen() {
  const [jugadores, setJugadores] = useState([]);
  const [filterJugadores, setFilterJugadores] = useState([]);
  const [searchJugador, onSearchJugador] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      loadJugadores();
    }, [])
  );

  const loadJugadores = async () => {
    try {
      const data = await getJugadores();
      setJugadores(data);
      setFilterJugadores(data);
    } catch (e) {
      Alert.alert("Error al cargar jugadores");
    }
  }

  const handleSearch = (text) => {
    onSearchJugador(text);

    if (text === '') {
      setFilterJugadores(jugadores);
      return;
    }

    const filtered = jugadores.filter(item =>
      item.nombre.toLowerCase().includes(text.toLowerCase()) ||
      item.posicion.toLowerCase().includes(text.toLowerCase())
    );

    setFilterJugadores(filtered);
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>Jugadores</Text>
      <View style={styles.search}>
        <MaterialIcons name="search" size={24} color="black" />
        <Text style={{ fontSize: 24 }}>|</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleSearch}
          value={searchJugador}
          placeholder="Buscar jugador"
        />
      </View>
      <FlatList
        data={filterJugadores}
        renderItem={({ item }) => <CardJugador jugador={item} />}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', marginHorizontal: 10 }}
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
  },
  search: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10
  },
  input: {
    flex: 1,
    height: 40,
    padding: 10
  }
});

export default JugadoresScreen;