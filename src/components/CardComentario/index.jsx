import React,{ useEffect, useState} from "react";
import { View, Text, Pressable } from 'react-native';
import styles from "./styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function CardComentario({comentario}){
    const [liked, setLiked] = useState(false);
    const [cantidadLikes, setCantidadLikes] = useState(0);

    useEffect(() => {
      //console.log("cardComentario");
      //console.log(comentario);
    }, [])
    

    return(
        <View style={styles.containerComentario}>
            <View style={styles.containerDatosComentario}>
                <View style={styles.containerUsuario}>
                    <Text style={styles.usuario}>aa: {comentario.comentario}</Text>
                </View>
                <View style={styles.textoDatosComentario}>
                    <Text style={styles.datoComentario}>fecha</Text>
                    <Text style={styles.datoComentario}>5 Me gusta</Text>
                </View>

            </View>
            

            <View style={styles.containerBotonLike}>
                    <Pressable style={styles.botonLike} onPress={() => setLiked((isLiked) => !isLiked)}>
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