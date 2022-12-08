import React,{useState,useEffect} from 'react';
import {styles} from "./style";
import { View, Text,TouchableOpacity  } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { existeUsuario} from '../../data/usuarios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}) {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [verContraseña, setVerContraseña] = useState(false);

  const iniciarSesion = () => {
   
      const body = {
        correo: correo,
        contraseña: contraseña
      }

      existeUsuario(body).then((res)=>{
        guardarDatosUsuario(res.usuario)
        
      }).catch((err)=>{
        console.log("usuario no encontrado");
      })
    
  }

  const guardarDatosUsuario = async (usuario) => {
    console.log(usuario);
    try {
      await AsyncStorage.setItem('usuario', JSON.stringify(usuario))
      navigation.navigate("Home", {portadaAfterVisible: true});
    } catch (e) {
      console.log("error al guardar datos");
    } 
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <View>
          <Text style={styles.textBienvenido} >Bienvenido/a</Text>
        </View>
        <TextInput
          label="Correo"
          mode='outlined'
          onChangeText={text => {setCorreo(text)}}
          placeholder='Correo electronico'
          
        />

        <TextInput
              mode="outlined"
              label="Contraseña"
              placeholder="Contraseña"
              onChangeText={text => {setContraseña(text)}}
              textContentType='number'
              right={<TextInput.Icon icon="eye" onPress={()=>{setVerContraseña(!verContraseña)}}/>}
              secureTextEntry={!verContraseña}
             
        />
      </View>
      <View style={styles.containerButton}>
        <Button mode="contained" onPress={iniciarSesion} >
          Iniciar sesión
        </Button>
      </View>
      <View style={styles.containerRegistro} >
       <Text >¿Olvido su contraseña?  </Text>
        <TouchableOpacity onPress={()=>{console.log("hgola")}}> 
         <Text style={styles.textRegistrarse}>Recuperar</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
}

