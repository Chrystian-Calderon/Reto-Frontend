import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert, View } from "react-native";

import { getEquiposPartidos } from "../database/EquipoRepository.js";

function HistorialScreen() {
  const { id } = useRoute().params;
  const [partidos, setPartidos] = useState([]);

  useEffect(() => {
    loadHistorial(id);
  }, []);

  const loadHistorial = async (id) => {
    try {
      const partidos = await getEquiposPartidos(id);
      setPartidos(partidos);
    } catch (e) {
      Alert.alert('Error al cargar el historial');
    }
  }

  return (
    <View>

    </View>
  );
}

export default HistorialScreen;