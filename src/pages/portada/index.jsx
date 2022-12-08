import React,{useEffect} from "react";
import {View,Text} from "react-native";
import styles from "./styles";
import {guardarAlertaRedux} from "../../redux/actions/alertasActions";
import {obtenerAlertas} from "../../data/alertas";
import { guardarComentarioRedux } from "../../redux/actions/comentariosActions";
import { daLikeAlertaRedux } from "../../redux/actions/likesActions";
import { useDispatch } from "react-redux";
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
        }).catch((err) => {
           console.log("no se encontraron alertas");
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