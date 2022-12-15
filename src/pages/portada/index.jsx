import React,{useEffect} from "react";
import {View,Text} from "react-native";
import styles from "./styles";
import {guardarAlertaRedux} from "../../redux/actions/alertasActions";
import {obtenerAlertas} from "../../data/alertas";
import { guardarComentarioRedux } from "../../redux/actions/comentariosActions";
import { daLikeComentarioRedux } from "../../redux/actions/likesActions";
import { daLikeAlertaRedux } from "../../redux/actions/likesActions";
import { useDispatch } from "react-redux";
import {obtenerComentarios} from "../../data/comentarios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { guardarUsuario } from "../../redux/actions/usuarioActions";

export default function Portada({navigation}){

    const dispatch = useDispatch();

    useEffect(() => {
       const obtenerDatosStorage = async() => {
        try {
          const jsonValue = await AsyncStorage.getItem('usuario')
          if(jsonValue !== null){
            dispatch(guardarUsuario(JSON.parse(jsonValue)));
            getAlertas();
            getComentarios();
            /* setTimeout(() => {
              navigation.navigate("Home")
            }, 1500); */
            navigation.navigate("Home", {portadaAfterVisible: false})
          }else{
            navigation.navigate("Login")
          }
        } catch(e) {
          console.log("error al obtener datos");
        }
       }

       const getAlertas = () => {
        const likeAlertas = [];
        obtenerAlertas(true).then((result) => {
          dispatch(guardarAlertaRedux(result))
           result.map(alerta => {
                 if(alerta.daLikeAlerta[0] !== undefined){
                   alerta.daLikeAlerta.map(like => {
                    likeAlertas.push(like);
                   })
                 }
           }); 
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

       obtenerDatosStorage();
    }, [])


    return (
        <View style={styles.containerPortada}>
            <Text>Portada</Text>
        </View>
    )
    
}