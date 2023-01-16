import React,{useState} from "react"
import { View, Text } from "react-native"
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import { TextInput, Button } from "react-native-paper"
import styles from "./styles"
import {crearSugerencia} from "../../data/sugerencias"
import {useSelector} from "react-redux"
import Toast from 'react-native-toast-message';
import {validacionSugerencia} from "../../utils/validaciones"
import {Formik} from "formik";
import Cargando from "../Cargando"
import Appbar from "../Appbar"
import formatText from "../../utils/modificarPrimeraLetra"

export default function ModalSugerencia({setModalSugerencia,socket}){
    const [cargando, setCargando] = useState(false);
    const usuarioRedux = useSelector(state => state.usuario.usuario);
    
    const initialValues = {
        sugerencia: ""
    }

    const enviarSugerencia = () => {
        setCargando(true)
        
    }



    return(
       <>
        {cargando ? <Cargando/> : null}

        <View style={styles.containerModalSugerencia}>
            <Appbar handlePressButtonLeft={()=>{setModalSugerencia(false)}} iconoIzquierda="arrowleft" />
             <KeyboardAwareScrollView bounces={false} style={styles.modalSugerencia}>
                <View style={styles.containerTitle}>
                    <Text style={styles.title}>Sugerencia</Text>
                </View>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validacionSugerencia}
                    onSubmit={values => {
                        setCargando(true)
                        let sugerenciaSinEspacios = values.sugerencia.replace("  ", '_');
                        if(sugerenciaSinEspacios.includes("_")){
                            Toast.show({
                                type: 'error',
                                position: 'top',
                                text1: 'Error',
                                text2: 'No se permiten espacios dobles en la sugerencia',
                                visibilityTime: 3000,
                                topOffset: 60,
                            });
                            setCargando(false);
                        }else{
                            const body = {
                                sugerencia: formatText(values.sugerencia),
                                usuarioId: usuarioRedux.id
                            }
                    
                            crearSugerencia(body).then(async (res)=>{
                                Toast.show({
                                        type: 'success',
                                        position: 'top',
                                        text1: 'Sugerencia enviada correctamente',
                                        visibilityTime: 2000,
                                        autoHide: true,
                                        topOffset: 30,
                                        bottomOffset: 40,
                                });
                                
                                await socket.emit("guardarSugerencia", res.sugerencia);
                               
                            }).catch((err)=>{
                                Toast.show({
                                    type: 'error',
                                    position: 'top',
                                    text1: 'Error al enviar la sugerencia',
                                    visibilityTime: 2000,
                                    autoHide: true,
                                    topOffset: 30,
                                    bottomOffset: 40,
                                });
                            });
                            setCargando(false);
                            setModalSugerencia(false);
                        } 
                    }}

                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
                     <>
                        <View style={styles.containerTextoSugerencia}>
                            <Text style={styles.texto}>¿Tienes alguna sugerencia para la aplicación? ¡Escríbenos!</Text>
                        </View>
                        <View style={styles.containerInput}>
                            <TextInput mode="outlined" style={styles.input} multiline={true} onBlur={handleBlur("sugerencia")} numberOfLines={10} values={values.sugerencia} label="Sugerencia" maxLength={200} onChangeText={handleChange("sugerencia")}/>
                        </View> 
                        {errors.sugerencia && touched.sugerencia ? 
                        (
                            <View style={styles.containerError}>
                                <Text style={styles.textoError}>{errors.sugerencia}</Text>
                            </View>
                        ):(null)
                        }
                        <View style={styles.containerBotonEnviar}>
                            <Button mode="elevated" style={styles.botonEnviar} onPress={handleSubmit} >
                                <Text style={styles.textoBotonEnviar}>Enviar</Text>
                            </Button>
                        </View>
                     </>
                    )}
                </Formik>
            </KeyboardAwareScrollView>  
        </View>
       
       </>
    );
}
