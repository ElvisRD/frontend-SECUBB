import React,{useEffect, useState} from 'react'
import { View, Text, Image } from "react-native"
import { Dialog, Portal, Provider, Button } from 'react-native-paper'
import styles from "./styles"
import {KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import IconAD from 'react-native-vector-icons/AntDesign';
import IconMI from 'react-native-vector-icons/MaterialIcons';
import { eliminarAlerta } from '../../data/alertas';
import { URL_CONNECT_BACKEND } from '../../../env';
import { eliminarComentarioRedux } from '../../redux/actions/comentariosActions'
import { eliminarAlertaRedux } from '../../redux/actions/alertasActions'
import { borrarTodosLosLikesAlertaRedux} from '../../redux/actions/likesActions'
import {obtenerImagen} from "../../data/imagenes"
import Comentarios from '../Comentarios';
import { useSelector, useDispatch } from 'react-redux'
import Toast from 'react-native-toast-message';
import Appbar from '../Appbar'


export default function DetallesAlerta({setIsVisibleAlerta, verAlerta, socket}){
   
    const [spinnerFoto, setSpinnerFoto] = useState(true);
    const [spinnerComentarios, setSpinnerComentarios] = useState(true);
    const [modalEliminarAlerta, setModalEliminarAlerta] = useState(false);
    const [verComentarios, setVerComentarios] = useState(false);
    const [errorImagen, setErrorImagen] = useState(false);
    const usuarioRedux = useSelector(state => state.usuario.usuario);
    const alertasRedux = useSelector(state => state.alertas.alertas);
    const [imagen, setImagen] = useState();
    const dispatch = useDispatch();


    useEffect(() => {
       const getImagen = async() => {
            setSpinnerFoto(true);
            await obtenerImagen(verAlerta.id).then((result) => {
                setImagen(result.url.replace(/\\/g, "/"));
                setSpinnerFoto(false);
           }).catch((err) => {
                setErrorImagen(true)
           });
       }
       
       getImagen();

    }, [])

    useEffect(() => {
        if(alertasRedux !== null){
            const alerta = alertasRedux.find(alerta => alerta.id === verAlerta.id);
           if(alerta === undefined){
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'La alerta fue eliminada o desactivada',
                    visibilityTime: 2000,
                });
                setVerComentarios(false);
                setIsVisibleAlerta(false); 
                
            } 
            
        }else{
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'La alerta fue eliminada o desactivada',
                visibilityTime: 2000,
            });
            setVerComentarios(false);
            setIsVisibleAlerta(false);  
        }
      
    }, [alertasRedux])  
    
    const handlerEliminarAlerta = async () => {
        eliminarAlerta(verAlerta.id).then(() => {
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'La alerta fue eliminada correctamente',
                visibilityTime: 2000,
            }); 
        }).catch((err) => {
            console.log(err);
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Error al eliminar la alerta',
                visibilityTime: 2000,
            });; 
        });

        await socket.emit("eliminarAlerta", verAlerta);
        
        setIsVisibleAlerta(false);
        dispatch(eliminarAlertaRedux(verAlerta));
        dispatch(eliminarComentarioRedux(verAlerta));
        dispatch(borrarTodosLosLikesAlertaRedux(verAlerta));
    
       
    }

     

    return(

        <>
            {verComentarios ? <Comentarios socket={socket} setVerComentarios={setVerComentarios} alertaId={verAlerta.id}/> : (null)} 

            <View style={styles.containerAlerta}>

                {
                    verAlerta.usuarioId === usuarioRedux.id ? (
                    <Appbar handlePressButtonLeft={()=>{setIsVisibleAlerta(false)}} handlePressButtonRight={()=>setModalEliminarAlerta(true)} 
                    iconoIzquierda="arrowleft" iconoDerecha="delete-outline" 
                    />) : (
                    <Appbar handlePressButtonLeft={()=>{setIsVisibleAlerta(false)}} iconoIzquierda="arrowleft" /> 
                    )
                }
                
                <KeyboardAwareScrollView bounces={false} style={styles.alerta} >
                    <View style={styles.containerTituloAlerta}>
                        <Text style={styles.tituloAlerta}>{verAlerta.tipo}</Text>
                    </View>
                    <View style={styles.containerFecha}>
                        <Text style={styles.fecha}>Fecha: {verAlerta.fecha.slice(8,10)}/{verAlerta.fecha.slice(5,7)}/{verAlerta.fecha.slice(0,4)}</Text>
                        <Text style={styles.fecha}>Hora: {verAlerta.fecha.slice(11,16)}</Text>
                    </View>
                    
                    <View style={styles.containerUbicacion}>
                        <Text style={styles.atributoAlerta}>Ubicación</Text>
                        <Text style={styles.ubicacion}>{verAlerta.ubicacion}</Text>
                    </View>

                    {
                        verAlerta.descripcion_ubicacion !== "" ? (
                        <View style={styles.containerDescripcionUbicacion}>
                            <Text style={styles.atributoAlerta}>Descripción Ubicación </Text>
                            <Text style={styles.descripcion}>{verAlerta.descripcion_ubicacion}</Text>
                        </View>
                        ):(null)
                    }

                    <View style={styles.containerDescripcion}>
                        <Text style={styles.atributoAlerta}>Descripción</Text>
                        <Text style={styles.descripcion}>{verAlerta.descripcion}</Text>
                    </View>
                    
                    
                    {
                        errorImagen !== true ? (
                            <>
                            <View style = {styles.containerTituloImagen}>
                                <Text style={styles.atributoAlerta}>Imagen</Text>
                            </View>
                            <View style={styles.containerImagen}>
                                <Image style={styles.imagen} source={{uri: `${URL_CONNECT_BACKEND}/${imagen}`}} /> 
                            </View>
                            </>
                        ):
                        (null)
                        
                    } 
                    <View style={styles.containerUsuario}> 
                        <Text style={styles.atributoAlerta}>Reportado por </Text>
                        <Text style={styles.ubicacion}>{verAlerta.usuario.nombre} {verAlerta.usuario.apellido}</Text> 
                    </View>

                </KeyboardAwareScrollView>

                <View style={styles.containerBotonVerComentarios}>
                        <Button style={styles.botonComentarios} labelStyle={styles.textoBotonComentarios} mode="elevated" onPress={()=>{setVerComentarios(true);}}>
                            Ver comentarios
                        </Button>
                </View>
                
                <Provider >
                    <Portal>
                        <Dialog visible={modalEliminarAlerta} onDismiss={()=>setModalEliminarAlerta(false)} >
                            <Dialog.Icon icon="alert" />
                            <Dialog.Title>¿Estás seguro que deseas eliminar la alerta?</Dialog.Title>
                            <Dialog.Actions>
                            <Button onPress={()=>setModalEliminarAlerta(false)}>Cancelar</Button>
                            <Button onPress={handlerEliminarAlerta}>Confirmar</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                </Provider>

            </View>
        </>
        
    )
}