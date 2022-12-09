import React,{useEffect, useState} from 'react'
import { View, Text, TouchableOpacity, Image } from "react-native"
import { Button, Appbar } from 'react-native-paper'
import styles from "./styles"
import {KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import IconAD from 'react-native-vector-icons/AntDesign';
import IconMI from 'react-native-vector-icons/MaterialIcons';
import IconF from 'react-native-vector-icons/Feather';
import { URL_CONNECT_BACKEND } from '../../../env';
import {obtenerImagen} from "../../data/imagenes"
import Comentarios from '../Comentarios';
import { useSelector } from 'react-redux'


export default function Alerta({setIsVisibleAlerta, verAlerta, socket}){
   
    const [spinnerFoto, setSpinnerFoto] = useState(true);
    const [spinnerComentarios, setSpinnerComentarios] = useState(true);
    const [verComentarios, setVerComentarios] = useState(false);
    const [errorImagen, setErrorImagen] = useState(false);
    const usuarioRedux = useSelector(state => state.usuario.usuario);
    const [imagen, setImagen] = useState();


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


    const eliminarAlerta = () => {
        console.log("Eliminar alerta");
    }
    

    return(

        <>
            {verComentarios ? <Comentarios socket={socket} setVerComentarios={setVerComentarios} alertaId={verAlerta.id}/> : (null)} 

            <View style={styles.containerAlerta}>
                <Appbar.Header >
                    <Appbar.Action animated={false} style={styles.botonVolver} onPress={()=>{setIsVisibleAlerta(false)}} icon={props => <IconAD name="arrowleft" size={35} color="black" />} />
                    {
                        verAlerta.usuarioId === usuarioRedux.id ? (
                            <Appbar.Action animated={false} style={styles.botonEliminar} onPress={eliminarAlerta} icon={props => <IconMI name="delete-outline" size={35} color="black" />} /> 
                        ):(null)
                    }
                </Appbar.Header>
                <KeyboardAwareScrollView bounces={false} style={styles.alerta} >
                    <View style={styles.containerTituloAlerta}>
                        <Text style={styles.tituloAlerta}>{verAlerta.tipo}</Text>
                    </View>
                    <View style={styles.containerFecha}>
                        <Text style={styles.fecha}>Fecha: {verAlerta.fecha.slice(8,10)}/{verAlerta.fecha.slice(5,7)}/{verAlerta.fecha.slice(0,4)}</Text>
                        <Text style={styles.fecha}>Hora: {verAlerta.fecha.slice(11,16)}</Text>
                    </View>
                    <View style={styles.containerDescripcion}>
                        <Text style={styles.atributoAlerta}>Descripción</Text>
                        <Text style={styles.descripcion}>hola</Text>
                    </View>
                    <View style={styles.containerUbicacion}>
                        <Text style={styles.atributoAlerta}>Ubicación</Text>
                        <Text style={styles.ubicacion}>{verAlerta.ubicacion}</Text>
                    </View>
                    <View style = {styles.containerTituloImagen}>
                        <Text style={styles.atributoAlerta}>Imagen</Text>
                    </View>
                    {
                        errorImagen !== true ? (
                            <View style={styles.containerImagen}>
                                <Image style={styles.imagen} source={{uri: `${URL_CONNECT_BACKEND}/${imagen}`}} /> 
                            </View>
                        ):
                        (
                        <View style={styles.containerTextoImagen}>
                            <Text style={styles.textoImagenNoEncontrada}>La alerta no tiene imagen</Text>
                        </View>)
                    } 
                    <View style={styles.containerUsuario}>
                        <Text style={styles.atributoAlerta}>Reportado por </Text>
                    </View>

                    <View style={styles.containerBotonVerComentarios}>
                        <Button style={styles.botonComentarios} labelStyle={styles.textoBotonComentarios} mode="elevated" onPress={() => setVerComentarios(true)}>
                            Ver comentarios
                        </Button>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </>
        
    )
}