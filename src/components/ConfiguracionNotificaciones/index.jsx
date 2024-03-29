import React,{useState,useEffect} from 'react'
import { View, Text} from 'react-native'
import IconAD from 'react-native-vector-icons/AntDesign'
import { TextInput, Button, Switch } from 'react-native-paper'
import styles from './styles'
import { editarNotificaciones } from '../../data/usuarios'
import { guardarUsuarioRedux } from '../../redux/actions/usuarioActions'
import { useSelector, useDispatch} from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Appbar from '../Appbar'

export default function ConfiguracionNotificaciones({setVisibleConfiguracionNotificaciones}){
    const usuarioRedux = useSelector(state => state.usuario.usuario)
    const [notificaciones, setNotificaciones] = useState(usuarioRedux.notificaciones)
    const dispatch = useDispatch();

    const guardarNotificaciones = async () => {
        const jsonValue = await AsyncStorage.getItem('usuario')
        const datosUsuario = JSON.parse(jsonValue);
        datosUsuario.notificaciones = notificaciones;
       
        const body = {
            id: usuarioRedux.id,
            notificaciones: notificaciones
        }

        try {
            await AsyncStorage.setItem('usuario', JSON.stringify(datosUsuario))
        }catch (e) {
            console.log("error al guardar notificaciones");
        } 

        editarNotificaciones(body).then(async () => {
           dispatch(guardarUsuarioRedux(datosUsuario));
        }).catch((err) => {
            console.log("error al editar notificaciones");
        }); 
        
    }

    return(
        <View style={styles.containerConfiguracionNotificaciones}>
            <Appbar handlePressButtonLeft={()=>{setVisibleConfiguracionNotificaciones(false)}} iconoIzquierda="arrowleft" />
            <View style={styles.containerTitle}>
                    <Text style={styles.title} adjustsFontSizeToFit >Notificaciones</Text>
            </View> 
            <View style={styles.contanierNotificaciones}>
                <View style={styles.containterDesactivarNotificaciones}>
                    <Text style={styles.textoNotificaciones}>Estado de notificaciones</Text>
                    <Switch style={styles.inputActivarNotificaciones} value={notificaciones} onValueChange={()=> {notificaciones ? setNotificaciones(false):setNotificaciones(true)}} />
                </View>
                
            </View>
            <View style={styles.containerBoton}>
                {
                    usuarioRedux.notificaciones === notificaciones ? <Button style={[styles.botonGuardar, {backgroundColor: "#E5E5E5"}]} mode="contained" onPress={guardarNotificaciones} disabled={true}
                    ><Text style={styles.textoBotonGuardar}>Guardar</Text></Button> : <Button style={styles.botonGuardar} mode="contained" onPress={guardarNotificaciones}
                    ><Text style={styles.textoBotonGuardar}>Guardar</Text></Button>
                }
            </View>
 
        </View>
    )
}