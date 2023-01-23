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
                <RepresentacionPin colorPin="red" tipoAlerta="Persona sospechosa" />
                <RepresentacionPin colorPin="orange" tipoAlerta="Actividad sospechosa" />
                <RepresentacionPin colorPin="blue" tipoAlerta="falla de iluminación" />
                <RepresentacionPin colorPin="green" tipoAlerta="Incidente de robo" />
                <RepresentacionPin colorPin="pink" tipoAlerta="Incidente de violencia" />
            </View>
        </View>
    )
}