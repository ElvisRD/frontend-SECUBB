
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./pages/login"
import Home from "./pages/home"
import store from "./redux/store";
import Portada from "./pages/portada"
import RecuperarContra from "./pages/recuperarContraseña";
import Registro from "./pages/registro";
import {Provider} from "react-redux"
import Toast, { BaseToast, ErrorToast, InfoToast} from 'react-native-toast-message';

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'green' }}
      contentContainerStyle={{ paddingHorizontal: 8 }}
      text1Style={{
        fontSize: 12,
        fontWeight: "600"
      }}
    />

  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: 'red' }}
      contentContainerStyle={{ paddingHorizontal: 8 }}
      text1Style={{
        fontSize: 12,
        fontWeight: "600"
      }}

    />
  ),
  info: (props) => (
    <InfoToast
      {...props}
      style={{ borderLeftColor: '#03a9f4' }}
      contentContainerStyle={{ paddingHorizontal: 8 }}
      text1Style={{
        fontSize: 12,
        fontWeight: "600"
      }}
    />
  )
}

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
            <Stack.Screen name="RecuperarContraseña" component={RecuperarContra} options={{
              headerShown: false,
            }} />
             <Stack.Screen name="Registro" component={Registro} options={{
              headerShown: false,
            }} />
          </Stack.Navigator>
          <Toast config={toastConfig} />
        </NavigationContainer>
    </Provider>   
    </>
    
   
  );
}

