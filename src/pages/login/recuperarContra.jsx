import React,{useState} from "react"
import { View, Text, Keyboard, ToastAndroid } from "react-native"
import {KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { TextInput, Appbar,Button } from "react-native-paper"
import IconAD from 'react-native-vector-icons/AntDesign';
import { styles } from "./style"
import {recuperarContrasena} from "../../data/usuarios"
import  {validacionCorreo}  from "../../utils/validaciones";
import { Formik } from "formik"
import Toast from 'react-native-toast-message';

export default function RecuperarContra({setRecuperarContraseña}) {

    const initialValues = {
        correo: ""
    }

    return (
        <View style={styles.containerRecuperarContraseña}>
            <Appbar.Header style={styles.containerNav}>
                    <Appbar.Action animated={false} style={styles.botonCerrar} onPress={()=>{setRecuperarContraseña(false)}} icon={props => <IconAD name="arrowleft" size={35} color="black" />} />
            </Appbar.Header>
            <KeyboardAwareScrollView>
            <Formik
                initialValues={initialValues}
                validationSchema={validacionCorreo}
                onSubmit={(values) => {
                    Keyboard.dismiss();
                    recuperarContrasena(values).then((res)=>{
                        Toast.show({
                            type: 'success',
                            text1: 'Correo de recuperación enviado con éxito',
                            text2: 'Revisa tu correo electrónico',
                            visibilityTime: 3000,
                            autoHide: true,
                            topOffset: 60,
                        });
                       
                        setRecuperarContraseña(false);
                    }).catch((err)=>{
                        if(err.response.status === 400){
                            Toast.show({
                                type: 'error',
                                text1: 'Error',
                                text2: 'El correo ingresado no le pertenece a la universidad',
                                visibilityTime: 3000,
                                autoHide: true,
                                topOffset: 60,
                            });
                        }else{
                       
                            Toast.show({
                                type: 'error',
                                text1: 'Error',
                                text2: 'No se encontró cuenta asociada al correo ingresado',
                                visibilityTime: 3000,
                                autoHide: true,
                                topOffset: 60,
                             })
                        }
                    })
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>
                        <View style={styles.containerInputRecuperarCuenta}>
                            <View style={styles.containerTitle}>
                                <Text style={styles.title}>Recuperar contraseña</Text>
                            </View>
                            <View style={styles.containerTexto}>
                                <Text style={styles.texto}>Ingresa el correo con el que te registraste</Text>
                            </View>
                            <TextInput
                                label="Correo"
                                style={styles.input}
                                mode='outlined'
                                outlineColor="#E5E5E5" activeOutlineColor="gray"
                                onBlur={handleBlur('correo')}
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
                        </View> 
                        <View style={styles.containerBotonRecuperarCuenta}>
                            <Button mode="contained" buttonColor="#01579b" style={styles.botonRegistrar} onPress={handleSubmit}  >
                                Recuperar contraseña
                            </Button>
                        </View>
                    </>
                )}
            </Formik>     
            </KeyboardAwareScrollView>
        </View>
    )
}
