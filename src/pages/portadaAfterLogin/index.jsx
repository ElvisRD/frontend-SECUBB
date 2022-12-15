import React,{useEffect} from "react";
import {View,Text} from "react-native";
import styles from "./styles";
import {guardarAlertaRedux} from "../../redux/actions/alertasActions";
import { daLikeComentarioRedux } from "../../redux/actions/likesActions";
import {obtenerAlertas} from "../../data/alertas";
import {obtenerComentarios} from "../../data/comentarios";
import { guardarComentarioRedux } from "../../redux/actions/comentariosActions";
import { daLikeAlertaRedux } from "../../redux/actions/likesActions";
import { useDispatch } from "react-redux";


export default function PortadaAfterLogin({setPortadaVisible}){

    const dispatch = useDispatch();

    useEffect(() => {
      const getAlertas = () => {
        setPortadaVisible(true)
        const likeAlertas = [];
        obtenerAlertas(true).then((result) => {
          dispatch(guardarAlertaRedux(result))
           result.map(alerta => {
                 if(alerta.daLikeAlerta[0] !== undefined){
                   alerta.daLikeAlerta.map(like => {
                    likeAlertas.push(like);
                   })
                 }
           })
           if(likeAlertas[0] !== undefined){
            dispatch(daLikeAlertaRedux(likeAlertas));
           }
         
        }).catch((err) => {
           console.log("no se encontraron alertas");
        });
       }
       
       const getComentarios = () => {
        const likeComentarios = [];
        obtenerComentarios().then((result) => {
          dispatch(guardarComentarioRedux(result))
          result.map(comentario => {
            if(comentario.daLikeComentario[0] !== undefined){
              comentario.daLikeComentario.map(like => {
                likeComentarios.push(like);
              })  
            }
          }); 
          if(likeComentarios[0] !== undefined){
            dispatch(daLikeComentarioRedux(likeComentarios));
          }
         
        }).catch((err) => {
           console.log("no se encontraron comentarios");
        });
       }

       getAlertas(); 
       getComentarios();

    }, [])


    return (
        <View style={styles.containerPortada}>
            <Text>Preparando datos...</Text>
        </View>
    )
    
}