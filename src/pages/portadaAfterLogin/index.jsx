import React,{useEffect} from "react";
import {View,Text} from "react-native";
import styles from "./styles";
import {guardarAlertaRedux} from "../../redux/actions/alertasActions";
import {obtenerAlertas} from "../../data/alertas";
import { guardarComentarioRedux } from "../../redux/actions/comentariosActions";
import { daLikeAlertaRedux } from "../../redux/actions/likesActions";
import { useDispatch } from "react-redux";


export default function PortadaAfterLogin({setPortadaVisible}){

    const dispatch = useDispatch();

    useEffect(() => {
      const getAlertas = () => {
        setPortadaVisible(true)
        obtenerAlertas(true).then((result) => {
          dispatch(guardarAlertaRedux(result))
           result.map(alerta => {
               if(alerta.comentarios[0] !== undefined){
                 alerta.comentarios.map(comentario => {
                   dispatch(guardarComentarioRedux(comentario));
                 })
               }else{
                 if(alerta.daLikeAlerta[0] !== undefined){
                   alerta.daLikeAlerta.map(like => {
                     dispatch(daLikeAlertaRedux(like));
                   })
                 }
               }
              
           })
           setPortadaVisible(false)
        }).catch((err) => {
           console.log("no se encontraron alertas");
        });
       }

       getAlertas(); 

    }, [])


    return (
        <View style={styles.containerPortada}>
            <Text>Preparando datos...</Text>
        </View>
    )
    
}