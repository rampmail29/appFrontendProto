import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export const FormScreen: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [cargo, setCargo] = useState('');

  const handleSubmit = () => {
    // Validación básica
    if (!nombre || !correo || !cargo) {
      Alert.alert('Todos los campos son obligatorios');
      return;
    }

    // Por ahora, solo mostramos los datos
    Alert.alert('Datos del trabajador', `Nombre: ${nombre}\nCorreo: ${correo}\nCargo: ${cargo}`);

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
    
export default FormScreen;