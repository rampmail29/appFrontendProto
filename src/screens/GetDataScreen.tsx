import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { apiGet } from '../services/api';

const GetDataScreen: React.FC = () => {
  const [numeroDocumento, setNumeroDocumento] = useState('');
  const [resultado, setResultado] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [busquedaRealizada, setBusquedaRealizada] = useState(false); // 🆕

  const buscarTrabajador = async () => {
    if (!numeroDocumento.trim()) {
      Alert.alert('Debes ingresar un número de documento');
      return;
    }

    setLoading(true);
    setBusquedaRealizada(false);

    try {
      const data = await apiGet('/consultar', { numeroDocumento });

      if (data) {
        setResultado(data);
      } else {
        setResultado(null);
      }
    } catch (error) {
      setResultado(null); // Limpiar en caso de error
      //Alert.alert('Error consultando el servidor');
      //console.error(error);
    } finally {
      setLoading(false);
      setBusquedaRealizada(true); // ✅ Marcar que ya se consultó
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consulta de Trabajador</Text>

      <TextInput
        style={styles.input}
        placeholder="Número de documento"
        keyboardType="numeric"
        value={numeroDocumento}
        onChangeText={setNumeroDocumento}
      />

      <Button title="Buscar" onPress={buscarTrabajador} />

      {loading && <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 20 }} />}

      {!loading && resultado && (
        <View style={styles.resultado}>
          <Text style={styles.resultadoTitulo}>Resultado:</Text>
          <Text>Nombre: {resultado.nombre}</Text>
          <Text>
            Fecha de expedición documento: {resultado.fechaExpedicionDocumento}
          </Text>
          <Text>Correo: {resultado.email}</Text>
          <Text>Fecha de registro: {resultado.fechaRegistro}</Text>
          <Text>Dependencia: {resultado.dependencia}</Text>
        </View>
      )}

      {!loading && busquedaRealizada && !resultado && (
        <Text style={styles.sinResultados}>No se encontraron resultados para el documento ingresado.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 50 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderColor: '#aaa',
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  resultado: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
  },
  resultadoTitulo: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sinResultados: {
    marginTop: 30,
    fontStyle: 'italic',
    color: '#888',
  },
});

export default GetDataScreen;
