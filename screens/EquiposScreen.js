import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, FlatList, TextInput, StatusBar, TouchableOpacity } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { getEquipos } from "../database/EquipoRepository";
import CardEquipo from "../components/CardEquipo";
import { useNavigation } from "@react-navigation/native";

function EquiposScreen() {
  const navigation = useNavigation();
  const [equipos, setEquipos] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchEquipo, onSearchEquipo] = useState('');

  useEffect(() => {
    loadEquipos();
  }, []);

  const loadEquipos = async () => {
    try {
      const data = await getEquipos();
      setEquipos(data);
      setFilterData(data);
    } catch (e) {
      Alert.alert('Error al cargar los equipos');
    }
  }

  const handleEquipo = (id) => {
    navigation.navigate('Equipo', { id });
  }

  const handleSearch = (text) => {
    onSearchEquipo(text);

    if (text === '') {
      setFilterData(equipos);
      return;
    }

    const filtered = equipos.filter(item =>
      item.nombre.toLowerCase().includes(text.toLowerCase())
    );

    setFilterData(filtered);
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Text style={styles.title}>Equipos</Text>
      <View style={styles.search}>
        <MaterialIcons name="search" size={24} color="black" />
        <Text style={{ fontSize: 24 }}>|</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleSearch}
          value={searchEquipo}
          placeholder="Buscar equipo"
        />
      </View>
      <FlatList
        data={filterData}
        renderItem={({ item }) => (<CardEquipo equipo={item} onPress={handleEquipo} />)}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', marginHorizontal: 10 }}
      />
      <TouchableOpacity style={styles.btnAdd} onPress={() => navigation.navigate('AgregarEquipo')}>
        <Text style={styles.btnText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10
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
  },
  btnAdd: {
    position: 'absolute',
    right: 10,
    bottom: 20,
    width: 70,
    height: 70,
    backgroundColor: "#1ddb20",
    borderRadius: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    fontSize: 50,
    color: '#fff',
    fontWeight: 'bold'
  }
})

export default EquiposScreen;