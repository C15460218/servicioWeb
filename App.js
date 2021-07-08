/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import InicioScreen from './views/inicio';
import AgregarScreen from './views/agregar';
import ItemScreen from './views/item';
import ModificarScreen from './views/modificar'


const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="inicioScreen" component={InicioScreen} options={{title: 'Inicio'}}/>
        <Stack.Screen name="agregarScreen" component={AgregarScreen} options={{title: 'Agregar Nota'}}/>
        <Stack.Screen name="itemScreen" component={ItemScreen} options={{title: 'Visualización de Nota'}}/>
        <Stack.Screen name="modificarScreen" component={ModificarScreen} options={{title: 'Modificar Nota'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
};
export default App;
