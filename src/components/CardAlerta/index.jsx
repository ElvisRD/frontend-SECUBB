import React,{useState, useEffect} from "react"
import { View, Text, TouchableOpacity, Pressable, Image } from 'react-native';
import styles from "./styles"
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {like,dislike} from "../../data/alertas";
import { useSelector, useDispatch } from "react-redux";
import { daLikeAlertaRedux, borrarLikeAlertaRedux } from "../../redux/actions/likesActions";

export default function CardAlerta({socket, alerta, setIsVisibleAlerta, setVerAlerta, setVerComentarios,setAlertaSeleccionada, likes, todosLosLikes, comentarios}){
    const [liked, setLiked] = useState(false);
    const [cantidadComentarios, setCantidadComentarios] = useState(0);
    const [contadorLikes, setContadorLikes] = useState(0);
    const dispatch = useDispatch();
    const usuarioRedux = useSelector(state => state.usuario.usuario)

    useEffect(() => {
        if(likes !== null){
            setLiked(false);
            let cont=0;
            likes.map(like => {
                cont++;
                if(like.alertaId === alerta.id && like.usuarioId === usuarioRedux.id){
                    setLiked(true)
                }
            })
            setContadorLikes(cont);
        }else{
            setLiked(false);
            setContadorLikes(0);
        }
    },[likes])

    useEffect(() => {
        if(comentarios !== null){
            let cont=0;
            comentarios.map(comentario => {
                if(comentario.alertaId === alerta.id){
                    cont++;
                }
            })
            setCantidadComentarios(cont);
        }else{
            setCantidadComentarios(0);
        }
    }, [comentarios])
    

    const seleccionarAlerta = () => {
        setVerAlerta(alerta)
        setIsVisibleAlerta(true) 
    }

    const handleLike = async () => {

        const body = {  
            alertaId: alerta.id,
            usuarioId: usuarioRedux.id
        }

        let positionArray = null;
       
        if(todosLosLikes !== null){
            for(let i=0; i<todosLosLikes.length; i++){
                if(todosLosLikes[i].alertaId === alerta.id && todosLosLikes[i].usuarioId === usuarioRedux.id){
                    positionArray = i;
                    break;
                }
            }
        }  
       
        if(liked){
           dislike(body);
           dispatch(borrarLikeAlertaRedux(body, positionArray));
            await socket.emit("daDislikeAlerta", body, positionArray);
        }else{
            like(body);
            dispatch(daLikeAlertaRedux(body));
            await socket.emit("daLikeAlerta", body);
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