import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import FormScreen from "../screens/FormScreen";
import GetDataScreen from "../screens/GetDataScreen";
import TrabajadoresScreen from "../screens/TrabajadoresScreen";

// Crea el Stack Navigator
const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Inicio" }}
      />
      <Stack.Screen
        name="Form"
        component={FormScreen}
        options={{ title: "Formulario" }}
      />
      <Stack.Screen
        name="GetData"
        component={GetDataScreen}
        options={{ title: "GetData" }}
      />

      <Stack.Screen name="Trabajadores" component={TrabajadoresScreen} />
      {/* AEsto es para agregar más pantallas --> usando más <Stack.Screen /> */}
    </Stack.Navigator>
  );
};

export default AppNavigator;
