import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import styles from '../Mapa/styles';


export default function Mapa2(){

    const initialRegion = {
        latitude: -34.603722,
        longitude: -58.381592,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }

    return(
        <View style={styles.container}>
            <MapView
                initialRegion={initialRegion}  
                style={styles.mapa}
            />
        </View>
    )
}