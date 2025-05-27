import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAuth } from "../context/AuthContext";

// defino el tipo para la navegacióna
type RootStackParamList = {
  Home: undefined;
  Form: undefined;
  GetData: undefined;
  Trabajadores: undefined;

  // ac´a puedo agregar otras rutas como Profile: undefined, etc.
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation: HomeScreenNavigationProp;
};
/* HomeScreen de prueba */
/* const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido a la App!</Text>
      <Button
        title="Ir a otra pantalla (proximamente)"
        onPress={() => {
          console.log('Navegarías aquí a otra pantalla.');
          // navigation.navigate('Profile'); // Si tuvieras una pantalla Profile creada
        }}
      />
    </View>
  );
}; */

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { user, signIn, signOut } = useAuth();

  return (
    <View>
      {user ? (
        <>
          <Text>Bienvenido a Programación de Dispositivos Móviles {user}</Text>
          <Text>Semana 1 de tercer corte</Text>
          <Text>Semana 3 de tercer corte - explicación del proyecto</Text>
          <View style={{ marginVertical: 10 }} />
          <Button title="Cerrar sesión" onPress={signOut} />
          <View style={{ marginVertical: 10 }} />
          <Button
            title="Ir al Formulario"
            onPress={() => navigation.navigate("Form")}
          />
          <View style={{ marginVertical: 10 }} />
          <Button
            title="Ir al GetData"
            onPress={() => navigation.navigate("GetData")}
          />
          <View style={{ marginVertical: 10 }} />
          <Button
            title="Ver Trabajadores"
            onPress={() => navigation.navigate("Trabajadores")}
          />
        </>
      ) : (
        <>
          <Text>No has iniciado sesión</Text>
          <Button
            title="Iniciar sesión"
            onPress={() => signIn("UsuarioDemo")}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default HomeScreen;
