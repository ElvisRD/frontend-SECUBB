import React,{useState, useEffect} from "react"
import { View, Text, TouchableOpacity, Pressable, Image } from 'react-native';
import styles from "./styles"
import { Button } from 'react-native-paper';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {like,dislike} from "../../data/alertas";
import { useSelector, useDispatch } from "react-redux";
import { daLikeAlertaRedux, borrarLikeAlertaRedux } from "../../redux/actions/likesActions";






export default function CardAlerta({socket, alerta, setIsVisibleAlerta, setVerAlerta, setVerComentarios,setAlertaSeleccionada}){
    const [liked, setLiked] = useState(false);
    const [cantidadComentarios, setCantidadComentarios] = useState(0);
    const [contadorLikes, setContadorLikes] = useState(0);
    const dispatch = useDispatch();
    const comentariosRedux = useSelector(state => state.comentarios.comentarios)
    const likesAlertaRedux = useSelector(state => state.likesAlerta.usuarios)
    const usuarioRedux = useSelector(state => state.usuario.usuario)


    
    useEffect(() => {
        if(comentariosRedux !== null){
            let cont = 0;
            comentariosRedux.map(comentario => {
                if(comentario.alertaId === alerta.id){
                    cont++;
                }
            })
            setCantidadComentarios(cont);
        }
    }, [comentariosRedux])

    const seleccionarAlerta = () => {
        setVerAlerta(alerta)
        setIsVisibleAlerta(true) 
    }

    useEffect(() => {
        if(likesAlertaRedux !== null){
            let cont = 0;
            likesAlertaRedux.map(like => {
                if(like.alertaId === alerta.id){
                    cont++;
                    if(like.usuarioId === usuarioRedux.id){
                        setLiked(true)
                    } 
                }
            })
            setContadorLikes(cont);
        }
    }, [likesAlertaRedux])

    /* useEffect(() => {
        if(alerta.daLikeAlerta[0] !== undefined && alerta.daLikeAlerta !== undefined){
            alerta.daLikeAlerta.map(daLike => {
                if(daLike.usuarioId === alerta.usuario.id){
                    setLiked(true)
                }
            })
            setContadorLikes(alerta.daLikeAlerta.length)
        }else{
            setContadorLikes(0)
        }
    }, []); */
 

    const handleLike = async () => {
        setLiked(!liked);
       
        const body = {  
            alertaId: alerta.id,
            usuarioId: usuarioRedux.id
        }

        if(liked){
            //dislike(body);
            await socket.emit("daDislikeAlerta", body);
            dispatch(borrarLikeAlertaRedux(body));
            setContadorLikes(contadorLikes-1);
        }else{
            //like(body);
            await socket.emit("daLikeAlerta", body);
            dispatch(daLikeAlertaRedux(body));
            setContadorLikes(contadorLikes+1);
        }
    }

    const verComentariosAlerta = () => {
        setAlertaSeleccionada(alerta)
        setVerComentarios(true)
    
    }

    return(
        <>
        
             <View style={styles.containerAlerta} >
                <TouchableOpacity style={styles.AlertaCard} onPress={seleccionarAlerta} >
                    <View style={styles.containerTipo}>
                        <Text style={styles.textoTipo}>{alerta.tipo}</Text>
                        <Text style={styles.textoHora}>{alerta.fecha.slice(11,16)}</Text> 
                    </View>
                    <View style={styles.containerDescripcion}>
                        <Text style={styles.descripcion} numberOfLines={4} >{alerta.descripcion}</Text>
                    </View>
                    
                    <View style={styles.containerBotones}>
                        <View style={styles.containerBotonLike}>
                            <Pressable style={styles.botonLike} onPress={handleLike}>
                                <MaterialCommunityIcons
                                    name={liked ? "heart" : "heart-outline"}
                                    size={25}
                                    color={liked ? "red" : "#AAAAAA"}
                                />
                            </Pressable>
                            <Text style={styles.likes}>{contadorLikes}</Text>
                        </View>
                        
                        <View style={styles.containerBotonComentario}>
                            <TouchableOpacity style={styles.botonComentarios} onPress={verComentariosAlerta}>
                                <MaterialCommunityIcons
                                    name="chat-outline"
                                    size={25}
                                    color="#AAAAAA"
                                />
                            </TouchableOpacity>
                            <Text style={styles.comentarios}>{cantidadComentarios}</Text>
                        </View>     
                    </View>
                </TouchableOpacity>
            </View> 
        </>
            
    )
}