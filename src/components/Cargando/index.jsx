import React from "react"
import { View } from 'react-native';
import {ActivityIndicator} from 'react-native-paper'
import styles from "./styles";

export default function Cargando() {
    return(
        <View style={styles.containerCargando}>
            <ActivityIndicator animating={true} color="blue" />
        </View>
    )
}