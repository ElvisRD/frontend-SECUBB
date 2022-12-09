import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import { TextInput, Button, Appbar } from "react-native-paper"
import styles from "./styles"
import IconAD from 'react-native-vector-icons/AntDesign';

export default function ModalSugerencia({setModalSugerencia}){
    const [sugerencia, setSugerencia] = React.useState("");

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
                    <Button mode="elevated" style={styles.botonEnviar} onPress={() => console.log('Pressed')}>
                       Enviar
                    </Button>
                </View>
            </KeyboardAwareScrollView>  
        </View>
    );
}
