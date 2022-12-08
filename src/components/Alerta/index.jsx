import React,{useEffect, useState} from 'react'
import { View, Text, TouchableOpacity, Image } from "react-native"
import { Button } from 'react-native-paper'
import styles from "./styles"
import {KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import IconAD from 'react-native-vector-icons/AntDesign';
import { URL_CONNECT_BACKEND } from '../../../env';
import {obtenerImagen} from "../../data/imagenes"
import Comentarios from '../Comentarios';


export default function Alerta({setIsVisibleAlerta, verAlerta, socket}){
   
    const [spinnerFoto, setSpinnerFoto] = useState(true);
    const [spinnerComentarios, setSpinnerComentarios] = useState(true);
    const [verComentarios, setVerComentarios] = useState(false);
    const [errorImagen, setErrorImagen] = useState(false);
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
    

    return(

        <>
            {verComentarios ? <Comentarios socket={socket} setVerComentarios={setVerComentarios} usuarioId={verAlerta.usuarioId} alertaId={verAlerta.id}/> : (null)} 

            <View style={styles.containerAlerta}>
                <View style={styles.containerBotonVolver}>
                        <TouchableOpacity style={styles.botonVolver} onPress={()=>{setIsVisibleAlerta(false)}}>
                            <IconAD 
                                name='arrowleft'
                                color='black'
                                size={40}
                            />
                        </TouchableOpacity> 
                </View>
                <KeyboardAwareScrollView bounces={false} style={styles.alerta} >
                    
                    <View style={styles.containerTituloAlerta}>
                        <Text style={styles.tituloAlerta}>{verAlerta.tipo}</Text>
                    </View>
                    <View style={styles.containerFecha}>
                        <Text style={styles.fecha}>{verAlerta.fecha}</Text>
                        <Text style={styles.fecha}>{verAlerta.hora}</Text>
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
                        <Text style={styles.atributoImagen}>Imagen</Text>
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
                        <Text style={styles.textUsuario}>Reportado por </Text>
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