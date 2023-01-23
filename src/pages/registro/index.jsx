import React, {useState} from "react"
import { View, Text, Keyboard} from 'react-native';
import {KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { TextInput, Button } from "react-native-paper";
import  styles  from "./styles";
import { Formik } from "formik";
import  {validacionesRegistro}  from "../../utils/validaciones";
import { crearUsuario } from "../../data/usuarios";
import Toast from "react-native-toast-message";
import formatText from "../../utils/modificarPrimeraLetra";
import Appbar from '../../components/Appbar'

export default function Registro({navigation}) {
 
    const initialValues = {
        nombre: "",
        apellido: "",
        correo: "",
    }

    return (
        <View style={styles.containerRegistrar}>
            <Appbar handlePressButtonLeft={()=>{navigation.navigate("Login")}} iconoIzquierda="arrowleft" /> 
            <KeyboardAwareScrollView style={styles.Registrar} keyboardShouldPersistTaps="always">
            <Formik
                initialValues={initialValues}
                validationSchema={validacionesRegistro}
                onSubmit={(values) => {
                    Keyboard.dismiss();

                    const body = {
                        nombre: formatText(values.nombre),
                        apellido: formatText(values.apellido),
                        correo: values.correo,
                    }

                    crearUsuario(body).then((res)=>{
                        Toast.show({
                            type: 'success',
                            text1: 'Registro exitoso',
                            text2: 'Tu contraseña ha sido enviada a tu correo electrónico',
                            visibilityTime: 3000,
                            autoHide: true,
                            topOffset: 60,
                        })

                        setRegistro(false);

                    }).catch((err)=>{
                        if(err.response.status === 406){
                            Toast.show({
                                type: 'error',
                                text1: 'Error',
                                text2: 'Ya existe una cuenta con el correo ingresado',
                                visibilityTime: 3000,
                                autoHide: true,
                                topOffset: 60,
                            })
                           
                        }else{
                            Toast.show({
                                type: 'error',
                                text1: 'Error',
                                text2: 'El correo ingresado no corresponde a un correo institucional',
                                visibilityTime: 3000,
                                autoHide: true,
                                topOffset: 60,
                            })
                        }
                    })
                    
                }}
            >
                {({ handleChange, handleSubmit, values, errors, handleBlur, touched }) => (
                <>
                    <View style={styles.containerInputsRegistro}>
                        <View style={styles.containerTituloRegistro}>
                          <Text style={styles.tituloRegistro} >Registrarse</Text>
                        </View>
                        <View style={styles.containerTextoExplicativo}>
                            <Text style={styles.textoExplicativo}>Introduce tus datos para recibir una contraseña de acceso</Text>
                        </View>
                        <TextInput
                                  label="Nombre"
                                  style={styles.inputRegistro}
                                  mode='outlined'
                                  outlineColor="#E5E5E5" activeOutlineColor="gray"
                                  onBlur={handleBlur('nombre')}
                                  onChangeText={handleChange('nombre')}
                                  value={values.nombre}
                                  placeholder='Nombre'
                        />
                        {errors.nombre && touched.nombre ? 
                              (
                                  <View style={styles.containerError}>
                                        <Text style={styles.textoError} >{errors.nombre}</Text>
                                  </View>
                              ):(null)
                        }
                        <TextInput
                              mode="outlined"
                              label="Apellido"
                              outlineColor="#E5E5E5" activeOutlineColor="gray"
                              style={styles.inputRegistro}
                              onBlur={handleBlur('apellido')}
                              value={values.apellido}
                              placeholder="apellido"
                              onChangeText={handleChange('apellido')}
                         
                        />
                        {errors.apellido && touched.apellido ? 
                              (
                                  <View style={styles.containerError}>
                                        <Text style={styles.textoError} >{errors.apellido}</Text>
                                  </View>
                              ):(null)
                        }
                         <TextInput
                              mode="outlined"
                              label="Correo"
                              onBlur={handleBlur('correo')}
                              outlineColor="#E5E5E5" activeOutlineColor="gray"
                              style={styles.inputRegistro}
                              value={values.correo}
                              placeholder="Correo"
                              onChangeText={handleChange('correo')}
                             
                        />
                        {errors.correo && touched.correo ? 
                              (
                                  <View style={styles.containerError}>
                                        <Text style={styles.textoError} >{errors.correo}</Text>
                                  </View>
                              ):(null)
                        }
                  </View>
                  <View style={styles.containerBotonRegistro}>
                    <Button mode="contained" style={styles.botonRegistrar} onPress={handleSubmit} buttonColor="#01579b" >
                        Registrarse
                    </Button>
                  </View>
                </>
                )}
            </Formik>
            </KeyboardAwareScrollView>
        </View>
    )
}