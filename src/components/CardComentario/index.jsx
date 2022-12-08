import React,{ useEffect, useState} from "react";
import { View, Text, Pressable } from 'react-native';
import styles from "./styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { daLikeComentarioRedux, borrarLikeComentarioRedux } from "../../redux/actions/likesActions";
import {like, dislike} from "../../data/comentarios";
import { useSelector, useDispatch} from "react-redux";


export default function CardComentario({comentario, socket, alertaId}){
    const [liked, setLiked] = useState(false);
    const [contadorLikes, setContadorLikes] = useState(0);
    const [cantidadLikes, setCantidadLikes] = useState(0);
    const likesComentariosRedux = useSelector(state => state.likesComentario.usuarios);
    const usuarioRedux = useSelector(state => state.usuario.usuario);
    const dispatch = useDispatch();
    

    useEffect(() => {
        if(likesComentariosRedux !== null){
            let cont = 0;
            likesComentariosRedux.map(like => {
    
                if(like.alertaId === alertaId && like.comentarioId === comentario.id){
                    cont++;
                    if(like.usuarioId === usuarioRedux.id && like.comentarioId === comentario.id){
                        setLiked(true)
                    }  
                } 
            }) 
            setContadorLikes(cont);
        }
    }, [likesComentariosRedux])


    const handleLike = async () => {
        setLiked(!liked);
       
        const body = {  
            comentarioId: comentario.id,
            alertaId: comentario.alertaId,
            usuarioId: usuarioRedux.id
        }

        if(liked){
            dislike(body);
            await socket.emit("daDislikeComentario", body);
            dispatch(borrarLikeComentarioRedux(body));
            setContadorLikes(contadorLikes-1);
        }else{
            like(body);
            await socket.emit("daLikeComentario", body);
            dispatch(daLikeComentarioRedux(body));
            setContadorLikes(contadorLikes+1);
        }
    }
    

    return(
        <View style={styles.containerComentario}>
            <View style={styles.containerDatosComentario}>
                <View style={styles.containerUsuario}>
                    <Text style={styles.usuario}>aa: {comentario.comentario}</Text>
                </View>
                <View style={styles.textoDatosComentario}>
                    <Text style={styles.datoComentario}>fecha</Text>
                    <Text style={styles.datoComentario}>{contadorLikes} Me gusta</Text>
                </View>

            </View>
            

            <View style={styles.containerBotonLike}>
                    <Pressable style={styles.botonLike} onPress={handleLike}>
                        <MaterialCommunityIcons
                                    name={liked ? "heart" : "heart-outline"}
                                    size={30}
                                    color={liked ? "red" : "black"}
                        />
                    </Pressable>
            </View>
        </View>
        
    )
}