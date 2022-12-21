import React,{useState,useEffect} from 'react';
import {styles} from "./style";
import { View, Text, Keyboard} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { existeUsuario} from '../../data/usuarios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PortadaAfterLogin from '../portadaAfterLogin';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

export default function Login({navigation}) {
  const [correo, setCorreo] = useState("");
  const [portadaAfterLogin, setPortadaAfterLogin] = useState(false);
  const [contraseña, setContraseña] = useState("");
  const [verContraseña, setVerContraseña] = useState(false);

  const iniciarSesion = () => {
       Keyboard.dismiss();
      const body = {
        correo: correo,
        contraseña: contraseña
      }
      
      existeUsuario(body).then((res)=>{
          guardarDatosUsuario(res.usuario)
      }).catch((err)=>{
         Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: 'Correo o contraseña incorrectos',
          visibilityTime: 3000,
          autoHide: true,
         })
      })
    
  }

  const guardarDatosUsuario = async (usuario) => {
   
    setCorreo("");
    setContraseña("");
    
    try {
      await AsyncStorage.setItem('usuario', JSON.stringify(usuario))
      setPortadaAfterLogin(true)
    
    } catch (e) {
      console.log("error al guardar datos");
    } 

  }


  return (
    <>
      {portadaAfterLogin ? <PortadaAfterLogin navigation={navigation} setPortadaAfterLogin={setPortadaAfterLogin}/> : null}

      <View style={styles.container}>
        <View style={styles.containerInput}>
          <View>
            <Text style={styles.textBienvenido} >Bienvenido/a</Text>
          </View>
          <TextInput
            label="Correo"
            mode='outlined'
            value={correo}
            onChangeText={text => {setCorreo(text)}}
            placeholder='Correo electronico'
            
          />

          <TextInput
                mode="outlined"
                label="Contraseña"
                value={contraseña}
                placeholder="Contraseña"
                onChangeText={text => {setContraseña(text)}}
                textContentType='number'
                right={<TextInput.Icon icon="eye" onPress={()=>{setVerContraseña(!verContraseña)}}/>}
                secureTextEntry={!verContraseña}
              
          />
        </View>
        <View style={styles.containerButton}>
          <Button mode="contained" onPress={iniciarSesion} buttonColor="#01579b" >
            Iniciar sesión
          </Button>
        </View>
      </View>
    </>
  );
}

