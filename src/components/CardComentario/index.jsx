import React,{ useEffect, useState} from "react";
import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import styles from "./styles";
import { Provider, Portal, Dialog, Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { daLikeComentarioRedux, borrarLikeComentarioRedux } from "../../redux/actions/likesActions";
import {like, dislike} from "../../data/comentarios";
import { useSelector, useDispatch} from "react-redux";


export default function CardComentario({comentario, socket, alertaId, setModalEditar, setComentarioEditado}){
    const [liked, setLiked] = useState(false);
    const [contadorLikes, setContadorLikes] = useState(0);
    const likesComentariosRedux = useSelector(state => state.likesComentario.usuarios);
    const usuarioRedux = useSelector(state => state.usuario.usuario);
    const dispatch = useDispatch();
   
    

    useEffect(() => {
        if(likesComentariosRedux !== null ){
            let cont = 0;
            likesComentariosRedux.map(like => {
                if(comentario.id === like.comentarioId){
                    cont++;
                    if(like.usuarioId === usuarioRedux.id){
                        setLiked(true);
                    }
                }
            }) 
            setContadorLikes(cont);
        }else{
            setContadorLikes(0);
        } 
    }, [likesComentariosRedux])

    const handleLike = async () => {
        const body = {  
            comentarioId: comentario.id,
            alertaId: comentario.alertaId,
            usuarioId: usuarioRedux.id
        }

        let positionArray = null;
        if(likesComentariosRedux !== null){
            for(let i=0 ; i < likesComentariosRedux.length ; i++){
                if(likesComentariosRedux[i].comentarioId === comentario.id && likesComentariosRedux[i].usuarioId === usuarioRedux.id 
                    && likesComentariosRedux[i].alertaId === comentario.alertaId){
                    positionArray=i;
                    break;
                }
            }

        }
        

        if(liked){
            
            dislike(body);
            dispatch(borrarLikeComentarioRedux(body, positionArray));
            await socket.emit("daDislikeComentario", body,positionArray);
            setLiked(false);
        }else{

            like(body);
            dispatch(daLikeComentarioRedux(body));
            await socket.emit("daLikeComentario", body);
            setLiked(true);
        }
    }
    
    const editarComentario = () => {
        if(usuarioRedux.id === comentario.usuarioId){
            setComentarioEditado(comentario)
            setModalEditar(true);
        }
    }

    return(
        <View style={styles.containerComentario}>
            <View style={styles.containerDatosComentario}>
                <View style={styles.containerUsuario}>
                    <Text style={styles.usuario}><Text style={styles.nombreUsuario}>aa </Text>{comentario.comentario}</Text>
                </View>
                <View style={styles.textoDatosComentario}>
                    <Text style={styles.datoComentario}>{comentario.fecha.slice(11,16)}</Text>
                    <Text style={styles.datoComentario}>{contadorLikes} Me gusta</Text>
                    {
                        comentario.usuarioId === usuarioRedux.id ? (
                        <TouchableOpacity>
                            <Text style={styles.datoComentario} onPress={editarComentario} >Editar</Text>
                        </TouchableOpacity>
                        ): null
                    }
                </View>

            </View>
            

            <View style={styles.containerBotonLike}>
                    <Pressable style={styles.botonLike} onPress={handleLike}>
                        <MaterialCommunityIcons
                                    name={liked ? "heart" : "heart-outline"}
                                    size={30}
                                    color={liked ? "red" : "#AAAAAA"}
                        />
                    </Pressable>
            </View>
            
        
        </View>
        
    )
}