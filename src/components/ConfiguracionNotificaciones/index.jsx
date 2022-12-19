import React,{useState} from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import IconAD from 'react-native-vector-icons/AntDesign'
import { TextInput, Button, Appbar, Switch } from 'react-native-paper'
import styles from './styles'

export default function ConfiguracionNotificaciones({setVisibleConfiguracionNotificaciones}){
    const [notificaciones, setNotificaciones] = useState(false)

    return(
        <View style={styles.containerConfiguracionNotificaciones}>
            <Appbar.Header style={styles.containerNav}>
                    <Appbar.Action animated={false} style={styles.botonCerrar} onPress={()=>{setVisibleConfiguracionNotificaciones(false)}} icon={props => <IconAD name="arrowleft" size={35} color="black" />} />
            </Appbar.Header>
            <View style={styles.containerTitle}>
                    <Text style={styles.title}>Notificaciones</Text>
            </View> 
            <View style={styles.contanierNotificaciones}>
                <View style={styles.containterDesactivarNotificaciones}>
                    <Text style={styles.textoNotificaciones}>Activas notificaciones</Text>
                    <Switch style={styles.inputActivarNotificaciones} value={notificaciones} onValueChange={()=> {notificaciones ? setNotificaciones(false):setNotificaciones(true)}} />
                </View>
            </View>
            
        </View>
    )
}