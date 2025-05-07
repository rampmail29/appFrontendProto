/* import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export const GetDataScreen: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [cargo, setCargo] = useState('');
  const [direccion, setDireccion] = useState('');
  const [documento, setDocumento] = useState('');

  const handleSubmit = () => {
    // Validación básica
    if (!nombre || !correo || !cargo || !direccion || !documento) {
      Alert.alert('Todos los campos son obligatorios');
      return;
    }

    // Por ahora, solo mostramos los datos
    Alert.alert('Datos del trabajador', `Nombre: ${nombre}\nCorreo: ${correo}\nCargo: ${cargo}\nDirección: ${direccion}\nDocumento: ${documento}`);

    // Más adelante puedes llamar a tu función del servicio API aquí
    // await postTrabajador({ nombre, correo, cargo });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formulario de Trabajador</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={styles.input}
        placeholder="Correo"
        keyboardType="email-address"
        value={correo}
        onChangeText={setCorreo}
      />

      <TextInput
        style={styles.input}
        placeholder="Cargo"
        value={cargo}
        onChangeText={setCargo}
      />
      <TextInput
        style={styles.input}
        placeholder="Dirección"
        value={direccion}
        onChangeText={setDireccion}
      />
      <TextInput
        style={styles.input}
        placeholder="Documento"
        value={documento}
        onChangeText={setDocumento}
      />

      <Button title="Enviar" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderColor: '#aaa',
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});
    
export default GetDataScreen; */
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { apiGet } from '../services/api';

const GetDataScreen: React.FC = () => {
  const [trabajadores, setTrabajadores] = useState<any[]>([]);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const data = await apiGet('/trabajadores');
        setTrabajadores(data);
      } catch (error) {
        console.error('Error al cargar trabajadores:', error);
      }
    };

    cargarDatos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trabajadores</Text>
      <FlatList
        data={trabajadores}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Nombre: {item.nombre}</Text>
            <Text>Correo: {item.correo}</Text>
            <Text>Cargo: {item.cargo}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  item: { borderBottomWidth: 1, borderColor: '#ccc', paddingVertical: 10 },
});

export default GetDataScreen;
