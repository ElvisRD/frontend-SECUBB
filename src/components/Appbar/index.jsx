import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import IconAD from 'react-native-vector-icons/AntDesign';
import styles from "./styles";

export default function Appbar({titulo,handlePressButton,icono}) {
    return(
        <View style={styles.containerNav}>
            {
                titulo !== "" ? (
                    <View style={styles.containerTitulo}>
                        <Text style={styles.titulo}>{titulo}</Text>
                    </View>
                ):(null)
            }
           
            <View style={styles.containerBoton}>
                <TouchableOpacity style={styles.boton} onPress={handlePressButton}> 
                    <IconAD name={icono} size={30} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
}