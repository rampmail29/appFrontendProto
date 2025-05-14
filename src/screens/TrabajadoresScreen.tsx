import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  RefreshControl,
  Button,
  Modal,
  TextInput,
  ScrollView,
} from "react-native";
import { apiGet, apiDelete, apiPut } from "../services/api";
import Toast from "react-native-root-toast";

interface Trabajador {
  _id: string;
  nombre: string;
  email: string;
  tipoDocumento: string;
  numeroDocumento: string;
  dependencia: string;
  fechaExpedicionDocumento?: string;
}

const TrabajadoresScreen: React.FC = () => {
  const [trabajadores, setTrabajadores] = useState<Trabajador[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [trabajadorEdit, setTrabajadorEdit] = useState<Trabajador | null>(null);

  const cargarTrabajadores = async () => {
    try {
      setLoading(true);
      const data = await apiGet("/consultar");
      setTrabajadores(data);
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los trabajadores");
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await cargarTrabajadores();
    setRefreshing(false);
  }, []);

  const eliminarTrabajador = async (numeroDocumento: string) => {
    Alert.alert("Confirmar", "¿Deseas eliminar este trabajador?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          try {
            await apiDelete(`/eliminar?numeroDocumento=${numeroDocumento}`);
            setTrabajadores(prev => prev.filter(t => t.numeroDocumento !== numeroDocumento));
            Toast.show("Trabajador eliminado correctamente", {
              duration: Toast.durations.SHORT,
              position: Toast.positions.BOTTOM,
              backgroundColor: "#28a745",
              textColor: "#fff",
            });
          } catch (error) {
            Toast.show("Error al eliminar el trabajador", {
              duration: Toast.durations.SHORT,
              position: Toast.positions.BOTTOM,
              backgroundColor: "#dc3545",
              textColor: "#fff",
            });
          }
        },
      },
    ]);
  };

  const abrirModalEdicion = (trabajador: Trabajador) => {
    setTrabajadorEdit({ ...trabajador });
    setModalVisible(true);
  };

  const guardarCambios = async () => {
    if (trabajadorEdit) {
      try {
        await apiPut(`/actualizar/${trabajadorEdit.numeroDocumento}`, trabajadorEdit);
        Toast.show("Trabajador actualizado", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          backgroundColor: "#007bff",
          textColor: "#fff",
        });
        setModalVisible(false);
        setTrabajadorEdit(null);
        cargarTrabajadores();
      } catch (error) {
        Toast.show("Error al actualizar", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          backgroundColor: "#dc3545",
          textColor: "#fff",
        });
      }
    }
  };

  useEffect(() => {
    cargarTrabajadores();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Trabajadores</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : trabajadores.length === 0 ? (
        <Text style={styles.mensaje}>No hay trabajadores registrados.</Text>
      ) : (
        <FlatList
          data={trabajadores}
          keyExtractor={(item) => item._id}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.nombre}>{item.nombre}</Text>
              <Text>Email: {item.email}</Text>
              <Text>{item.tipoDocumento}: {item.numeroDocumento}</Text>
              <Text>Dependencia: {item.dependencia}</Text>
              {item.fechaExpedicionDocumento && <Text>Expedido: {item.fechaExpedicionDocumento}</Text>}

              <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                <Button title="Editar" color="#17a2b8" onPress={() => abrirModalEdicion(item)} />
                <Button title="Eliminar" color="#d9534f" onPress={() => eliminarTrabajador(item.numeroDocumento)} />
              </View>
            </View>
          )}
        />
      )}

      {/* Modal de Edición */}
      <Modal visible={modalVisible} animationType="slide">
        <ScrollView style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Editar Trabajador</Text>

          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={trabajadorEdit?.nombre || ""}
            onChangeText={(text) => setTrabajadorEdit({ ...trabajadorEdit!, nombre: text })}
          />

          <TextInput
            style={styles.input}
            placeholder="Correo"
            value={trabajadorEdit?.email || ""}
            onChangeText={(text) => setTrabajadorEdit({ ...trabajadorEdit!, email: text })}
          />

          <TextInput
            style={styles.input}
            placeholder="Dependencia"
            value={trabajadorEdit?.dependencia || ""}
            onChangeText={(text) => setTrabajadorEdit({ ...trabajadorEdit!, dependencia: text })}
          />

          <TextInput
            style={styles.input}
            placeholder="Fecha de Expedición"
            value={trabajadorEdit?.fechaExpedicionDocumento || ""}
            onChangeText={(text) => setTrabajadorEdit({ ...trabajadorEdit!, fechaExpedicionDocumento: text })}
          />

          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
            <Button title="Cancelar" onPress={() => setModalVisible(false)} color="#6c757d" />
            <Button title="Guardar" onPress={guardarCambios} color="#007bff" />
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 30,
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  mensaje: {
    fontStyle: "italic",
    color: "#666",
    marginTop: 20,
  },
  card: {
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  nombre: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  modalContainer: {
    padding: 20,
    marginTop: 40,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderColor: "#aaa",
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});

export default TrabajadoresScreen;
