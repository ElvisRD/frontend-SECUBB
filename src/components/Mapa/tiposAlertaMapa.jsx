import React from 'react';
import styles from './styles';
import { View, StyleSheet, Text,TouchableOpacity } from 'react-native';
import IconAD from 'react-native-vector-icons/AntDesign';
import { Appbar } from 'react-native-paper';
import RepresentacionPin from './representacionPin';

export default function TiposAlertaMapa({setVerTiposAlertas}) {
    return (
        <View style={styles.containerTiposAlertas}>
             <Appbar.Header>
                    <Appbar.Content style={styles.containerTitle} titleStyle={styles.title} title="Tipos de alertas" />
                    <Appbar.Action animated={false} style={styles.botonCerrar} onPress={()=>{setVerTiposAlertas(false)}} icon={props => <IconAD name="close" size={35} color="black" />} />
            </Appbar.Header>
            <View style={styles.containerAlertas}>
                <RepresentacionPin colorPin="red" tipoAlerta="hola" />
                <RepresentacionPin colorPin="red" tipoAlerta="hola" />
                <RepresentacionPin colorPin="red" tipoAlerta="hola" />
                <RepresentacionPin colorPin="red" tipoAlerta="hola" />
                <RepresentacionPin colorPin="red" tipoAlerta="hola" />
            </View>
        </View>
    )
}