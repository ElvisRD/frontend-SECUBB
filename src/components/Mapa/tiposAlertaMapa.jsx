import React from 'react';
import styles from './styles';
import { View } from 'react-native';
import RepresentacionPin from './representacionPin';
import Appbar from '../Appbar';

export default function TiposAlertaMapa({setVerTiposAlertas}) {
    return (
        <View style={styles.containerTiposAlertas}>
             <Appbar titulo="Tipo de alertas" handlePressButtonRight={()=>{setVerTiposAlertas(false)}} iconoDerecha="close" />
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