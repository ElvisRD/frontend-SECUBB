import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import IconAD from 'react-native-vector-icons/AntDesign';
import IconMI from 'react-native-vector-icons/MaterialIcons';
import styles from "./styles";

export default function Appbar({titulo,handlePressButtonRight,handlePressButtonLeft,iconoDerecha}) {
    return(
        <View style={styles.containerNav}>
            {
                titulo !== undefined ? (
                    <View style={styles.containerTitulo}>
                        <Text style={styles.titulo}>{titulo}</Text>
                    </View>
                ):(
                <View style={styles.containerBotonIzquierda}>
                    <TouchableOpacity style={styles.boton} onPress={handlePressButtonLeft}>
                        <IconAD name="arrowleft" size={35} color="white" />
                    </TouchableOpacity>
                </View>)
            }
            {
                iconoDerecha !== undefined ? (
                    <View style={styles.containerBotonDerecha}>
                        <TouchableOpacity style={styles.boton} onPress={handlePressButtonRight}> 
                        {
                            iconoDerecha === "close" ? (<IconAD name={iconoDerecha} size={35} color="white" />)
                            :(<IconMI name={iconoDerecha} size={35} color="white" />)
                        }
                        </TouchableOpacity>
                    </View>
                ) : (null)
            }
           
        </View>
    );
}