
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./pages/login"
import Home from "./pages/home"



export default function App() {
  
  const Stack = createNativeStackNavigator();
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Sal" component={Home} options={{
            headerShown: false,
        }} />
        <Stack.Screen name="Login" component={Login} options={{
					headerShown: false,
				}} />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}

