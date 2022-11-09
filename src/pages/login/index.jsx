import React from 'react';
import {styles} from "./style";
import { View, Text,TouchableOpacity  } from 'react-native';


import { TextInput, Button } from 'react-native-paper';

export default function Login() {
  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <View>
          <Text style={styles.textBienvenido} >Bienvenido/a</Text>
        </View>
        
        <TextInput
          label="Correo"
          mode='outlined'
          placeholder='Correo electronico'
          
        />

        <TextInput
              mode="outlined"
              label="Contraseña"
              placeholder="Contraseña"
              textContentType='number'
              // right={<TextInput.Affix text="/100" />}
              secureTextEntry={true}
        />
      </View>
      <View style={styles.containerButton}>
        <Button mode="contained" onPress={() => console.log('Pressed')} >
          Iniciar sesión
        </Button>
      </View>
      <View style={styles.containerRegistro} >
       <Text >¿No tienes cuenta?  </Text>
        <TouchableOpacity onPress={()=>{console.log("hgola")}}> 
         <Text style={styles.textRegistrarse}>Registrarse</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
}

