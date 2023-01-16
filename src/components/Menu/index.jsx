import React,{useState} from "react"
import { View, Text, TouchableOpacity} from 'react-native';
import styles from "./styles"
import { Dialog, Portal, Provider, Button } from 'react-native-paper';
import ModalSugerencia from "../CrearSugerencia";
import ModalLugaresProblematicos from "../GenerarReporte";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ConfiguracionNotificaciones from "../ConfiguracionNotificaciones";
import ModalVerSugerencias from "../VerSugerencias";
import {limpiarRedux} from "../../redux/actions/usuarioActions";
import ModificarContraseña from "../ModificarContraseña"
import ModificarTipos from "../ModificarTipos"
import {useSelector, useDispatch} from "react-redux"
import Appbar from "../Appbar";

export default function Menu({handlePressButtons, navigation, socket}){
    const [isVisibleLugares, setModalLugaresProblematicos] = useState(false);
    const [isVisibleSugerencia, setModalSugerencia] = useState(false);
    const [isVisibleCerrarSesion, setIsVisibleCerrarSesion] = useState(false);
    const [isVisibleVerSugerencias, setIsVisibleVerSugerencias] = useState(false);
    const [isVisibleCambiarContraseña, setIsVisibleCambiarContraseña] = useState(false); 
    const [isVisibleModificarTipos, setIsVisibleModificarTipos] = useState(false);
    const [isVisibleConfiguracionNotificaciones, setVisibleConfiguracionNotificaciones] = useState(false);
    const usuarioRedux = useSelector(state => state.usuario.usuario);
    const dispatch = useDispatch();

    const eliminarToken = async () => {
        try {
          await AsyncStorage.removeItem('usuario')
        } catch(e) {
            console.log("error al remover el usuario");
        }

        setIsVisibleCerrarSesion(false); 
        dispatch(limpiarRedux());
        handlePressButtons("mapa");
        navigation.navigate("Login");
    }
    
    return(
        <>
        {isVisibleLugares ? <ModalLugaresProblematicos setModalLugaresProblematicos={setModalLugaresProblematicos} />:(null)} 
        {isVisibleSugerencia ? <ModalSugerencia setModalSugerencia={setModalSugerencia} socket={socket} />:(null)}
        {isVisibleCambiarContraseña ? <ModificarContraseña setIsVisible={setIsVisibleCambiarContraseña} />:(null)}
        {isVisibleModificarTipos ? <ModificarTipos setIsVisible={setIsVisibleModificarTipos} />:(null)}
        {isVisibleConfiguracionNotificaciones ? <ConfiguracionNotificaciones setVisibleConfiguracionNotificaciones={setVisibleConfiguracionNotificaciones} />:(null)}
        {isVisibleVerSugerencias ? <ModalVerSugerencias setModalVerSugerencias={setIsVisibleVerSugerencias} socket={socket} />:(null)}
        
        <View style={styles.containerMenu} >
              <View style={styles.menu}>
                <Appbar titulo="Menú" handlePressButtonRight={()=>{handlePressButtons("mapa")}} iconoDerecha="close" />
                <View style={styles.containerOpciones}> 
                    <TouchableOpacity style={styles.opcionPerfil} onPress={()=>{setVisibleConfiguracionNotificaciones(true)}} >
                        <Text style={styles.textOpcion}>Notificaciones</Text>
                    </TouchableOpacity>

                    {
                        usuarioRedux.tipo !== "Administrador" ? (
                            <TouchableOpacity style={styles.opcionPerfil} onPress={()=>{setModalSugerencia(true)}}>
                                <Text style={styles.textOpcion}>Enviar sugerencia</Text>
                            </TouchableOpacity>

                        ) : (null)
                    }
                    
                    <TouchableOpacity style={styles.opcionPerfil} onPress={()=>{setIsVisibleCambiarContraseña(true)}}>
                        <Text style={styles.textOpcion}>Modificar contraseña</Text>
                    </TouchableOpacity>

                    {
                        usuarioRedux.tipo === "Administrador" ? (
                            <>
                                <TouchableOpacity style={styles.opcionPerfil} onPress={()=>{setIsVisibleVerSugerencias(true)}}> 
                                    <Text style={styles.textOpcion}>Ver sugerencias</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.opcionPerfil} onPress={()=>{setIsVisibleModificarTipos(true)}}>
                                    <Text style={styles.textOpcion}>Modificar tipo</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.opcionPerfil} onPress={()=>{setModalLugaresProblematicos(true)}}>
                                    <Text style={styles.textOpcion}>Generar reporte</Text>
                                </TouchableOpacity>
                            </>
                            
                        ) : (null)
                    }
                    
                </View>
                <View style={styles.containerBotonCerrarSesion}>
                    <TouchableOpacity style={styles.botonCerrarSesion} onPress={()=>{setIsVisibleCerrarSesion(true)}} >
                        <Text style={styles.textCerrarSesion}>Cerrar sesión</Text>
                    </TouchableOpacity> 
                </View>
              </View>
        
                <Provider >
                    <Portal>
                        <Dialog visible={isVisibleCerrarSesion} onDismiss={()=>setIsVisibleCerrarSesion(false)}>
                            <Dialog.Icon icon="alert" />
                            <Dialog.Title>¿Estás seguro que deseas cerrar sesión?</Dialog.Title>
                            <Dialog.Actions>
                            <Button onPress={()=>setIsVisibleCerrarSesion(false)}>Cancelar</Button>
                            <Button onPress={eliminarToken}>Confirmar</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                </Provider>
        </View>
        </>
        
    )
}