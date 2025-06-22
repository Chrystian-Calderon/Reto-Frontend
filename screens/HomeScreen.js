import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

import { rankingEquipos } from '../database/EquipoRepository.js';
import CardRank from "../components/CardRank.js";

function HomeScreen() {
  const navigation = useNavigation();
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    loadRanking();
  }, []);

  const loadRanking = async () => {
    try {
      const data = await rankingEquipos();
      setRanking(data);
    } catch (e) {
      console.error("Error al cargar el ranking:", e);
      Alert.alert('Error al cargar entrenadores');
    }
  }

  const handleEquipo = (id) => {
    navigation.navigate('Equipo', { id });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ranking</Text>
      <View style={styles.headerRanking}>
        <Text style={styles.titleRanking}>Rank</Text>
        <Text style={styles.titleRanking}>Equipo</Text>
        <Text style={styles.titleRanking}>Partidos Ganados</Text>
      </View>
      <FlatList
        data={ranking}
        renderItem={({ item, index }) => (
          <CardRank key={item.id} equipo={item} rank={index + 1} onPress={handleEquipo} />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20
  },
  headerRanking: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    marginBottom: 10
  },
  titleRanking: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default HomeScreen;