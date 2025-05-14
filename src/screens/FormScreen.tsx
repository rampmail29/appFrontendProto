import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { apiPost } from "../services/api";
import Toast from 'react-native-root-toast';

const FormScreen: React.FC = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [dependencia, setDependencia] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [fechaExpedicionDocumento, setFechaExpedicionDocumento] = useState("");
  const [loading, setLoading] = useState(false);
  const [errores, setErrores] = useState<{ [key: string]: string }>({});

  const handleSubmit = async () => {
    const nuevosErrores: { [key: string]: string } = {};

    if (!nombre) nuevosErrores.nombre = "El nombre es obligatorio";
    if (!email) {
      nuevosErrores.email = "El correo es obligatorio";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      nuevosErrores.email = "El correo no tiene un formato válido";
    }
    if (!dependencia) nuevosErrores.dependencia = "La dependencia es obligatoria";
    if (!tipoDocumento) nuevosErrores.tipoDocumento = "Seleccione un tipo de documento";
    if (!numeroDocumento) nuevosErrores.numeroDocumento = "El número de documento es obligatorio";
    if (!fechaExpedicionDocumento) {
      nuevosErrores.fechaExpedicionDocumento = "La fecha de expedición es obligatoria";
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(fechaExpedicionDocumento)) {
      nuevosErrores.fechaExpedicionDocumento = "Formato de fecha inválido (yyyy-mm-dd)";
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    setErrores({});
    setLoading(true);

    try {
      const nuevoTrabajador = {
        nombre,
        email,
        dependencia,
        tipoDocumento,
        numeroDocumento,
        fechaExpedicionDocumento,
      };

      await apiPost("/crear", nuevoTrabajador);

      Alert.alert("Éxito", "Trabajador registrado exitosamente");

      setNombre("");
      setEmail("");
      setDependencia("");
      setTipoDocumento("");
      setNumeroDocumento("");
      setFechaExpedicionDocumento("");
    } catch (error) {
      Alert.alert("Error", "No se pudo registrar el trabajador");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formulario de Trabajador</Text>

      <TextInput
        style={[styles.input, errores.nombre && styles.inputError]}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      {errores.nombre && <Text style={styles.error}>{errores.nombre}</Text>}

      <TextInput
        style={[styles.input, errores.email && styles.inputError]}
        placeholder="Correo"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      {errores.email && <Text style={styles.error}>{errores.email}</Text>}

      <TextInput
        style={[styles.input, errores.dependencia && styles.inputError]}
        placeholder="Dependencia"
        value={dependencia}
        onChangeText={setDependencia}
      />
      {errores.dependencia && <Text style={styles.error}>{errores.dependencia}</Text>}

      <Text style={styles.label}>Tipo de Documento</Text>
      <View style={[styles.pickerWrapper, errores.tipoDocumento && styles.inputError]}>
        <Picker
          selectedValue={tipoDocumento}
          onValueChange={(itemValue) => setTipoDocumento(itemValue)}
        >
          <Picker.Item label="Seleccione un tipo..." value="" />
          <Picker.Item label="Cédula" value="Cédula" />
          <Picker.Item label="NIT" value="NIT" />
          <Picker.Item label="Tarjeta de Identidad" value="Tarjeta de Identidad" />
        </Picker>
      </View>
      {errores.tipoDocumento && <Text style={styles.error}>{errores.tipoDocumento}</Text>}

      <TextInput
        style={[styles.input, errores.numeroDocumento && styles.inputError]}
        placeholder="Número de Documento"
        keyboardType="numeric"
        value={numeroDocumento}
        onChangeText={setNumeroDocumento}
      />
      {errores.numeroDocumento && <Text style={styles.error}>{errores.numeroDocumento}</Text>}

      <TextInput
        style={[styles.input, errores.fechaExpedicionDocumento && styles.inputError]}
        placeholder="Fecha de Expedición (yyyy-mm-dd)"
        value={fechaExpedicionDocumento}
        onChangeText={setFechaExpedicionDocumento}
      />
      {errores.fechaExpedicionDocumento && (
        <Text style={styles.error}>{errores.fechaExpedicionDocumento}</Text>
      )}

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 20 }} />
      ) : (
        <Button title="Guardar" onPress={handleSubmit} />
      )}
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
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderColor: "#aaa",
    borderWidth: 1,
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  inputError: {
    borderColor: "red",
  },
  error: {
    color: "red",
    marginBottom: 10,
    fontSize: 12,
  },
  pickerWrapper: {
    borderColor: "#aaa",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  label: {
    marginBottom: 5,
    fontWeight: "bold",
  },
});

export default FormScreen;
