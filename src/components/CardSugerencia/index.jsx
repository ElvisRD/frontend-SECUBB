import React,{ useEffect, useState} from "react";
import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import IconAD from "react-native-vector-icons/AntDesign";
import styles from "./styles";
import { Provider, Portal, Dialog, Button } from "react-native-paper";




export default function CardSugerencia({sugerencia,setModalEliminarSugerencia,setSugerencia}){
    
    const handleDeleteSugerencia = () => {
        setSugerencia(sugerencia)
        setModalEliminarSugerencia(true)
    }

    return(
        <View style={styles.containerCardSugerencia}>
            <View style={styles.cardSugerencia}>
                <View style={styles.containerSuperior}>
                    <View>
                        <Text style={styles.textoNombreUsuario}>
                            {sugerencia.usuario.nombre} {sugerencia.usuario.apellido}
                        </Text> 
                    </View>
                    <TouchableOpacity style={styles.botonEliminar} onPress={handleDeleteSugerencia}>
                        <IconAD name="close" size={30} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.containerTextoSugerencia}>
                    <Text style={styles.textoSugerencia}>{sugerencia.sugerencia}</Text>
                </View>

            </View>
        </View> 
    )
}