import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import { TextInput, Button, Appbar } from "react-native-paper"
import styles from "./styles"
import {crearSugerencia} from "../../data/sugerencias"
import {useSelector} from "react-redux"
import IconAD from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-toast-message';

export default function ModalSugerencia({setModalSugerencia}){
    const [sugerencia, setSugerencia] = React.useState("");
    const usuarioRedux = useSelector(state => state.usuario.usuario);
    

    const enviarSugerencia = () => {
        const body = {
            sugerencia: sugerencia,
            usuarioId: usuarioRedux.id
        }

        crearSugerencia(body).then((res)=>{
            Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Sugerencia enviada correctamente',
                    visibilityTime: 2000,
                    autoHide: true,
                    topOffset: 30,
                    bottomOffset: 40,
            });
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
        setModalSugerencia(false);
    }



    return(
        <View style={styles.containerModalSugerencia}>
             <KeyboardAwareScrollView bounces={false} style={styles.modalSugerencia}>
                <Appbar.Header >
                    <Appbar.Action animated={false} style={styles.botonCerrar} onPress={()=>{setModalSugerencia(false)}} icon={props => <IconAD name="arrowleft" size={35} color="black" />} />
                </Appbar.Header>
                <View style={styles.containerTitle}>
                    <Text style={styles.title}>Sugerencia</Text>
                </View>
                <View style={styles.containerTextoSugerencia}>
                    <Text style={styles.texto}>¿Tienes alguna sugerencia para la aplicación? ¡Escríbenos!</Text>
                </View>
                <View style={styles.containerInput}>
                    <TextInput mode="outlined" style={styles.input} multiline={true} numberOfLines={10} label="Sugerencia" onChangeText={(text)=>{setSugerencia(text)}}/>
                </View> 

                <View style={styles.containerBotonEnviar}>
                    <Button mode="elevated" style={styles.botonEnviar} onPress={enviarSugerencia} >
                       Enviar
                    </Button>
                </View>
            </KeyboardAwareScrollView>  
        </View>
    );
}
