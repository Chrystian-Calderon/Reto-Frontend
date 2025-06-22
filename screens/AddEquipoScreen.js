import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Image, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { getEntrenadoresSinEquipo } from "../database/EntrenadorRepository";
import { addJugador } from "../database/JugadorRepository";
import { addEquipo } from "../database/EquipoRepository";
import equipoImage from "../assets/equipo.png";

function AddEquipoScreen() {
  const [nombreEquipo, setNombreEquipo] = useState("");
  const [entrenadores, setEntrenadores] = useState([]);
  const [entrenadorSeleccionado, setEntrenadorSeleccionado] = useState(null);

  const [jugadores, setJugadores] = useState([]);
  const [jugador, setJugador] = useState({
    nombre: "",
    posicion: "",
    nroCamiseta: "",
    edad: ""
  });

  useEffect(() => {
    cargarEntrenadores();
  }, []);

  const cargarEntrenadores = async () => {
    const lista = await getEntrenadoresSinEquipo();
    setEntrenadores(lista);
    if (lista.length > 0) setEntrenadorSeleccionado(lista[0].id);
  }

  const handleAddJugador = () => {
    if (!jugador.nombre || !jugador.posicion || !jugador.nroCamiseta || !jugador.edad) {
      Alert.alert("Todos los campos del jugador son obligatorios");
      return;
    }
    setJugadores([...jugadores, jugador]);
    setJugador({ nombre: "", posicion: "", nroCamiseta: "", edad: "" });
  }

  const handleAddEquipo = async () => {
    if (!nombreEquipo || !entrenadorSeleccionado || jugadores.length === 0) {
      Alert.alert("Debes ingresar nombre de equipo, entrenador y al menos un jugador");
      return;
    }
    try {
      // 1. Crear equipo
      const equipoID = await addEquipo({
        nombre: nombreEquipo,
        entrenadorID: entrenadorSeleccionado
      });
      // 2. Insertar jugadores
      for (const j of jugadores) {
        try {
          await addJugador({
            ...j,
            equipoID
          });
        } catch (e) {
          Alert.alert("Error al agregar jugador", j.nombre);
          return;
        }
      }
      Alert.alert("Equipo creado correctamente");
      setNombreEquipo("");
      setJugadores([]);
      setJugador({ nombre: "", posicion: "", nroCamiseta: "", edad: "" });
      cargarEntrenadores();
    } catch (e) {
      Alert.alert("Error al crear equipo");
    }
  }

  const crearEquipo = nombreEquipo && entrenadorSeleccionado && jugadores.length > 0;

  return (
    <View style={styles.container}>
      <Image source={equipoImage} style={styles.image} />
      <Text style={styles.label}>Nombre del equipo</Text>
      <TextInput
        style={styles.input}
        value={nombreEquipo}
        onChangeText={setNombreEquipo}
        placeholder="Nombre del equipo"
      />

      <Text style={styles.label}>Entrenador</Text>
      <Picker
        selectedValue={entrenadorSeleccionado}
        style={styles.input}
        onValueChange={(itemValue) => setEntrenadorSeleccionado(itemValue)}
      >
        {entrenadores.map((ent) => (
          <Picker.Item key={ent.id} label={ent.nombre} value={ent.id} />
        ))}
      </Picker>

      <Text style={styles.label}>Añadir jugador</Text>
      <TextInput
        style={styles.input}
        value={jugador.nombre}
        onChangeText={(text) => setJugador({ ...jugador, nombre: text })}
        placeholder="Nombre"
      />
      <TextInput
        style={styles.input}
        value={jugador.posicion}
        onChangeText={(text) => setJugador({ ...jugador, posicion: text })}
        placeholder="Posición"
      />
      <TextInput
        style={styles.input}
        value={jugador.nroCamiseta}
        onChangeText={(text) => setJugador({ ...jugador, nroCamiseta: text })}
        placeholder="Nro Camiseta"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={jugador.edad}
        onChangeText={(text) => setJugador({ ...jugador, edad: text })}
        placeholder="Edad"
        keyboardType="numeric"
      />
      <Button title="Añadir jugador" onPress={handleAddJugador} />

      <Text style={styles.label}>Jugadores añadidos</Text>
      <FlatList
        data={jugadores}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View style={styles.jugadorCard}>
            <Text style={styles.jugadorText}>{item.nombre}</Text>
            <Text style={styles.jugadorText}>{item.posicion}</Text>
            <Text style={styles.jugadorText}>#{item.nroCamiseta}</Text>
          </View>
        )}
      />

      <Button
        title="Añadir equipo"
        onPress={handleAddEquipo}
        disabled={!crearEquipo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 20
  },
  label: {
    fontWeight: "bold",
    marginTop: 10
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    marginVertical: 5
  },
  jugadorCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#f2f2f2",
    marginVertical: 5,
    borderRadius: 5
  },
  jugadorText: {
    fontSize: 16
  }
});

export default AddEquipoScreen;