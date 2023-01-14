
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./pages/login"
import Home from "./pages/home"
import store from "./redux/store";
import Portada from "./pages/portada"
import {Provider} from "react-redux"
import Toast from 'react-native-toast-message';

export default function App() {
  
  const Stack = createNativeStackNavigator();
  
  return (
    <>
    <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Portada'>
            <Stack.Screen name="Portada" component={Portada} options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Home" component={Home} options={{
              headerShown: false,
            }} />
            <Stack.Screen name="Login" component={Login} options={{
              headerShown: false,
            }} />
          </Stack.Navigator>
        </NavigationContainer>
    </Provider>
    <Toast />
    </>
    
   
  );
}

