import { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

import { getEquipos } from "../database/EquipoRepository";
import { addPartido } from "../database/PartidoRepository";

function SimulacionScreen() {
  const [equipos, setEquipos] = useState([]);
  const [local, setLocal] = useState(null);
  const [visitante, setVisitante] = useState(null);
  const [resultado, setResultado] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    cargarEquipos();
  }, []);

  const cargarEquipos = async () => {
    try {
      const data = await getEquipos();
      setEquipos(data);
      if (data.length > 1) {
        setLocal(data[0].id);
        setVisitante(data[1].id);
      }
    } catch (e) {
      Alert.alert('Error al cargar equipos')
    }
  };

  const empezarSimulacion = async () => {
    if (!local || !visitante || local === visitante) {
      setResultado("Selecciona equipos diferentes.");
      return;
    }

    const golesLocal = Math.floor(Math.random() * 6);
    const golesVisitante = Math.floor(Math.random() * 6);
    let ganador = "Empate";
    if (golesLocal > golesVisitante) {
      ganador = equipos.find(e => e.id === local)?.nombre || "Local";
    } else if (golesVisitante > golesLocal) {
      ganador = equipos.find(e => e.id === visitante)?.nombre || "Visitante";
    }
    setResultado(`Resultado: ${golesLocal} - ${golesVisitante}\nGanador: ${ganador}`);

    await addPartido({
      equipo_local: local,
      equipo_visitante: visitante,
      resultado_local: golesLocal,
      resultado_visitante: golesVisitante
    });

    setTimeout(() => {
      navigation.goBack();
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Equipo Local</Text>
      <Picker
        selectedValue={local}
        onValueChange={setLocal}
        style={styles.picker}
      >
        {equipos.map(e => (
          <Picker.Item key={e.id} label={e.nombre} value={e.id} />
        ))}
      </Picker>
      <Text style={styles.label}>Equipo Visitante</Text>
      <Picker
        selectedValue={visitante}
        onValueChange={setVisitante}
        style={styles.picker}
      >
        {equipos.map(e => (
          <Picker.Item key={e.id} label={e.nombre} value={e.id} />
        ))}
      </Picker>
      <Button title="Empezar" onPress={empezarSimulacion} />
      {resultado && <Text style={styles.resultado}>{resultado}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center"
  },
  label: {
    fontWeight: "bold",
    marginTop: 10
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10
  },
  resultado: {
    marginTop: 20,
    fontSize: 18,
    textAlign: "center",
    color: "#007700"
  }
});

export default SimulacionScreen;