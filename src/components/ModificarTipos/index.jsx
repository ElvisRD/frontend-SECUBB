import React,{useState,useRef} from "react";
import { View, Text } from "react-native";
import { Appbar, TextInput, Button } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import IconAD from "react-native-vector-icons/AntDesign";
import {validacionCorreo} from "../../utils/validaciones"
import {modificarTipoUsuario} from "../../data/usuarios"
import { Formik } from "formik";
import Toast  from "react-native-toast-message";

export default function ModificarTipos({setIsVisible}){
    const [valorSeleccionado, setValorSeleccionado] = useState("Usuario");

    const initialValues = {
        correo: ""
    }

    const pickerRef = useRef();

   

    return (
        <View style={styles.containerModificarTipos}>
            <Appbar.Header style={styles.containerNav}>
                        <Appbar.Action animated={false} style={styles.botonCerrar} onPress={()=>{setIsVisible(false)}} icon={props => <IconAD name="arrowleft" size={35} color="black" />} />
            </Appbar.Header>
            
            <KeyboardAwareScrollView style={styles.modificarTipos}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validacionCorreo}
                    onSubmit={(values) => {

                        const body = {
                            correo: values.correo,
                            tipo: valorSeleccionado
                        }

                        modificarTipoUsuario(body).then((result) => {
                            Toast.show({
                                type: "success",
                                text1: "Usuario modificado con éxito",
                                visibilityTime: 3000,
                                autoHide: true,
                                topOffset: 60,
                            });

                            setIsVisible(false);
                            
                        }).catch((err) => {
                            if(err.response.status === 404){
                                Toast.show({
                                    type: "error",
                                    text1: "El usuario no existe",
                                    visibilityTime: 3000,
                                    autoHide: true,
                                    topOffset: 60,
                                });
                            }else{
                                Toast.show({
                                    type: "info",
                                    text1: "El usuario ya posee ese tipo",
                                    visibilityTime: 3000,
                                    autoHide: true,
                                    topOffset: 60,
                                });
                            }
                        });
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <>
                            <View style={styles.containerTitle}>
                                <Text style={styles.title}>Modificar tipo de usuario</Text>
                            </View>
                            <View style={styles.containerInputs}>
                                <View style={styles.containerSelect}>
                                    <Text style={styles.tituloSelect}>Tipo de alerta</Text>
                                   {/*  <Picker
                                        style={styles.select}
                                        ref={pickerRef}
                                        selectedValue={valorSeleccionado}
                                        onValueChange={(itemValue) => setValorSeleccionado(itemValue)}
                                    >
                                        <Picker.Item label="Usuario" value= "Usuario" />
                                        <Picker.Item label="Administrador" value="Administrador" />
                                    </Picker> */}
                                </View>
                                <View style={styles.containerInputCorreo}>
                                    <Text style={styles.textoInputCorreo}>Ingrese el correo del usuario</Text>
                                    <TextInput
                                        style={styles.inputCorreo}
                                        mode="outlined"
                                        label="Correo"
                                        outlineColor="#E5E5E5" activeOutlineColor="gray"
                                        onChangeText={handleChange('correo')}
                                        onBlur={handleBlur('correo')}
                                        value={values.correo}
                                    />
                                    {errors.correo && touched.correo ? 
                                            (
                                                <View style={styles.containerError}>
                                                    <Text style={styles.textoError} >{errors.correo}</Text>
                                                </View>
                                            ):(null)
                                    }
                                </View>
                            </View>
                            <View style={styles.containerBotonModificar}>
                                <Button style={styles.boton} mode="contained" onPress={handleSubmit}>
                                    Modificar
                                </Button>
                            </View>
                        </>
                    )}

                </Formik>
            </KeyboardAwareScrollView>
        </View>
    )

    
}
