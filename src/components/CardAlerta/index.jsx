import React,{useState, useEffect} from "react"
import { View, Text, TouchableOpacity, Pressable, Image } from 'react-native';
import styles from "./styles"
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {like,dislike} from "../../data/alertas";
import { useSelector, useDispatch } from "react-redux";
import { daLikeAlertaRedux, borrarLikeAlertaRedux } from "../../redux/actions/likesActions";

export default function CardAlerta({socket, alerta, setIsVisibleAlerta, setVerAlerta, setVerComentarios,setAlertaSeleccionada, likesUsuarios}){
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(null);
    const [cantidadComentarios, setCantidadComentarios] = useState(0);
    const [contadorLikes, setContadorLikes] = useState(0);
    const dispatch = useDispatch();

    const usuarioRedux = useSelector(state => state.usuario.usuario)
    

    useEffect(() => {
        if(likesUsuarios !== null){
            setLiked(false);
            setLikes(likesUsuarios)
            let cont=0;
            likesUsuarios.map(like => {
                cont++;
                if(like.alertaId === alerta.id && like.usuarioId === usuarioRedux.id){
                    setLiked(true)
                }
            })
            setContadorLikes(cont);
        }else{
            console.log("hola");
            setLiked(false);
            setLikes(null);
            setContadorLikes(0);
        }
    },[likesUsuarios])

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
        if(likes !== null){
            for(let i=0; i<likes.length; i++){
                if(likes[i].alertaId === alerta.id && likes[i].usuarioId === usuarioRedux.id){
                    positionArray = i;
                    break;
                }
            }
        }  

        console.log(likes);
        //console.log(positionArray);

        if(liked){
            //dislike(body);
           setLiked(false)
           dispatch(borrarLikeAlertaRedux(body, positionArray));
            //await socket.emit("daDislikeAlerta", body, positionArray);
        }else{
            //like(body);
            console.log("se dio like");
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