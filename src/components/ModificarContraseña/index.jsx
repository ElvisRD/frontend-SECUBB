import React,{useState} from "react"
import { View, Text } from "react-native"
import {KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { TextInput,Button } from "react-native-paper"
import styles from "./styles"
import {modificarContrasena} from "../../data/usuarios"
import  {validacionModificarContrasena}  from "../../utils/validaciones";
import { Formik } from "formik"
import Toast from 'react-native-toast-message';
import { useSelector } from "react-redux";
import Appbar from "../Appbar";

export default function ModificarContraseña({setIsVisible}) {
    const [visibleContraActual, setVisibleContraActual] = useState(false)
    const [visibleContraNueva, setVisibleContraNueva] = useState(false)
    const [visibleVerificacionContra, setVisibleVerificacionContra] = useState(false)
    const usuario = useSelector(state => state.usuario.usuario)

    const initialValues = {
        contrasenaActual: "",
        contrasenaNueva: "",
        verificacionContrasena: ""
    }

    return (
        <View style={styles.containerModificarContraseña}>
            <Appbar handlePressButtonLeft={()=>{setIsVisible(false)}} iconoIzquierda="arrowleft" />
            <KeyboardAwareScrollView style={styles.modificarContraseña}>
            <Formik
                initialValues={initialValues}
                validationSchema={validacionModificarContrasena}
                onSubmit={(values) => {

                    const body = {
                        id: usuario.id,
                        contrasenaNueva: values.contrasenaNueva,
                        contrasenaActual: values.contrasenaActual
                    }
                    
                    modificarContrasena(body).then((result) => { 
                        Toast.show({
                            type: 'success',
                            position: 'Top',
                            text1: 'Contraseña modificada',
                            text2: 'La contraseña se modifico correctamente',
                            visibilityTime: 3000,
                            topOffset: 60,
                        })

                        setIsVisible(false);
                    }).catch((err) => {
                       if(err.response.status === 400){
                            Toast.show({
                                type: 'error',
                                position: 'Top',
                                text1: 'Contraseña incorrecta',
                                text2: 'La contraseña actual no es correcta',
                                visibilityTime: 3000,
                                topOffset: 60,
                            })
                       }
                    }); 
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>
                        <View style={styles.containerTitle}>
                            <Text style={styles.title}>Modificar contraseña</Text>
                        </View>
                        <View style={styles.containerInputsModificarContra}>
                            
                            <TextInput
                                label="Contraseña Actual"
                                style={styles.input}
                                mode='outlined'
                                outlineColor="#E5E5E5" activeOutlineColor="gray"
                                onBlur={handleBlur('contrasenaActual')}
                                onChangeText={handleChange('contrasenaActual')}
                                value={values.contrasenaActual}
                                placeholder='Contraseña Actual'
                                right={<TextInput.Icon icon="eye" onPress={()=>{setVisibleContraActual(!visibleContraActual)}} />}
                                secureTextEntry={!visibleContraActual}
                            />

                             {errors.contrasenaActual && touched.contrasenaActual ? 
                                (
                                    <View style={styles.containerError}>
                                        <Text style={styles.textoError} >{errors.contrasenaActual}</Text>
                                    </View>
                                ):(null)
                             }

                             <TextInput
                                label="Contraseña Nueva"
                                style={styles.input}
                                mode='outlined'
                                outlineColor="#E5E5E5" activeOutlineColor="gray"
                                onBlur={handleBlur('contrasenaNueva')}
                                onChangeText={handleChange('contrasenaNueva')}
                                value={values.contrasenaNueva}
                                placeholder='Contraseña Nueva'
                                right={<TextInput.Icon icon="eye" onPress={()=>{setVisibleContraNueva(!visibleContraNueva)}}/>}
                                secureTextEntry={!visibleContraNueva}
                            />
                             {errors.contrasenaNueva && touched.contrasenaNueva ?
                                (
                                    <View style={styles.containerError}>
                                        <Text style={styles.textoError} >{errors.contrasenaNueva}</Text>
                                    </View>
                                ):(null)
                             }

                             <TextInput
                                label="Verificación Contraseña"
                                style={styles.input}
                                mode='outlined'
                                outlineColor="#E5E5E5" activeOutlineColor="gray"
                                onBlur={handleBlur('correo')}
                                onChangeText={handleChange('verificacionContrasena')}
                                value={values.verificacionContrasena}
                                placeholder='Verificación Contraseña'
                                right={<TextInput.Icon icon="eye" onPress={()=>{setVisibleVerificacionContra(!visibleVerificacionContra)}}/>}
                                secureTextEntry={!visibleVerificacionContra}
                            />
                             {errors.verificacionContrasena && touched.verificacionContrasena ?
                                (
                                    <View style={styles.containerError}>
                                        <Text style={styles.textoError}>{errors.verificacionContrasena}</Text>
                                    </View>
                                ):(null)
                             }
                        </View> 
                        <View style={styles.containerBoton}>
                            <Button mode="contained" buttonColor="#01579b" style={styles.botonCambiar} onPress={handleSubmit}  >
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
