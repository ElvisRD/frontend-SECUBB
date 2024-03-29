import React,{useState,useEffect} from 'react';
import styles from "./styles";
import { View, Text, Keyboard, TouchableOpacity, BackHandler} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import {KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { verificacionUsuario} from '../../data/usuarios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PortadaAfterLogin from '../portadaAfterLogin';
import Toast  from 'react-native-toast-message';
import {validacionesLogin} from '../../utils/validaciones';
import { Formik } from "formik";

export default function Login({navigation}) {
  const [portadaAfterLogin, setPortadaAfterLogin] = useState(false);
  const [verContraseña, setVerContraseña] = useState(false);

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };
    

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    ); 

    return () => {
        backHandler.remove(); 
    };

  }, []);


  const initialValues = {
    correo: "",
    contrasena: "",
  }

  const guardarDatosUsuario = async (usuario) => {
    try {
      await AsyncStorage.setItem('usuario', JSON.stringify(usuario))
    } catch (e) {
      console.log("error al guardar datos");
    } 
  }


  return (
    <>
      {portadaAfterLogin ? <PortadaAfterLogin navigation={navigation} setPortadaAfterLogin={setPortadaAfterLogin}/> : null}
  
      <View style={styles.containerLogin}>
        <KeyboardAwareScrollView style={styles.login} keyboardShouldPersistTaps="always" > 
            <Formik
                      initialValues={initialValues}
                      validationSchema={validacionesLogin}
                      onSubmit={(values) => {
                        Keyboard.dismiss();
                        verificacionUsuario(values).then((res)=>{
                            guardarDatosUsuario(res.usuario)
                            values.correo = "";
                            values.contrasena = "";
                            setPortadaAfterLogin(true);
                        }).catch((err)=>{
                            if(err.response.status === 401){
                              Toast.show({
                                type: 'error',
                                text1: 'El correo ingresado no pertenece a la universidad',
                                visibilityTime: 3000,
                                autoHide: true,
                                topOffset: 60,
                              
                              });
                            }else{
                              if(err.response.status === 404){
                                Toast.show({
                                  type: 'error',
                                  text1: 'El correo ingresado no tiene una cuenta asociada',
                                  visibilityTime: 3000,
                                  autoHide: true,
                                  topOffset: 60,
                                
                                });
                              }else{
                                if(err.response.status === 400){
                                  Toast.show({
                                    type: 'error',
                                    text1: 'Error',
                                    text2: 'La contraseña ingresada es incorrecta',
                                    visibilityTime: 3000,
                                    autoHide: true,
                                    topOffset: 60,
                                  
                                  });
                                }
                              }
                          }
                        })
                        
                      }}
            >
              {({ handleChange, handleSubmit, values, touched, errors, handleBlur}) => (
                <>
                  <View style={styles.containerInputsLogin} >
                        <View style={styles.containerTextoLogin}>
                          <Text style={styles.textBienvenido} >Bienvenido/a</Text>
                        </View>
                        <TextInput
                                  label="Correo"
                                  style={styles.inputLogin}
                                  mode='outlined'
                                  onBlur={handleBlur('correo')}
                                  outlineColor="#E5E5E5" activeOutlineColor="gray"
                                  onChangeText={handleChange('correo')}
                                  value={values.correo}
                                  placeholder='Correo'
                            
                        />
                        {errors.correo && touched.correo ? 
                              (
                                  <View style={styles.containerError}>
                                        <Text style={styles.textoError} >{errors.correo}</Text>
                                  </View>
                              ):(null)
                        }
                        <TextInput
                              mode="outlined"
                              label="Contraseña"
                              onBlur={handleBlur('contrasena')}
                              outlineColor="#E5E5E5" activeOutlineColor="gray"
                              style={styles.inputLogin}
                              value={values.contrasena}
                              placeholder="Contraseña"
                              onChangeText={handleChange('contrasena')}
                              textContentType='number'
                              right={<TextInput.Icon icon="eye" onPress={()=>{setVerContraseña(!verContraseña)}}/>}
                              secureTextEntry={!verContraseña}
                        />
                        {errors.contrasena && touched.contrasena ? 
                              (
                                  <View style={styles.containerError}>
                                        <Text style={styles.textoError} >{errors.contrasena}</Text>
                                  </View>
                              ):(null)
                        }
                  </View>
                      <View style={styles.containerButtonLogin}>
                        <Button mode="contained" style={styles.botonLogin} onPress={handleSubmit} buttonColor="#01579b" >
                          Iniciar sesión
                        </Button>
                      </View>
                </>
              )}
            </Formik>
            <View>
              <View style={styles.containerOlvidasteContra}>
                        <TouchableOpacity onPress={()=>{Keyboard.dismiss(),navigation.navigate("RecuperarContraseña")}}><Text style={styles.textRegistrarse} >¿Olvidaste tu contraseña?</Text></TouchableOpacity>
                      </View>
                      <View style={styles.containerRegistrateAqui}>
                      <View style={styles.textRegistrateAqui}>
                        <Text>¿No tienes cuenta?</Text> 
                        <TouchableOpacity onPress={()=>{Keyboard.dismiss(),navigation.navigate("Registro")}}><Text style={styles.textRegistrarse}>  Registrate aquí!</Text></TouchableOpacity>
                      </View>
              </View>
            </View>
        </KeyboardAwareScrollView>
      </View>
    </>
  );
}

