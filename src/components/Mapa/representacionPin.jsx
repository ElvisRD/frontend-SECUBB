import React from "react"
import styles from "./styles"
import IconE from 'react-native-vector-icons/Entypo';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

export default function RepresentacionPin({colorPin, tipoAlerta}) {
    return(
        <View style={styles.pinRepresentado}>
            <IconE name="location-pin" size={35} color={colorPin}/>
            <Text style={styles.textTipoAlerta}>{tipoAlerta}</Text>
        </View>
    )
    
}