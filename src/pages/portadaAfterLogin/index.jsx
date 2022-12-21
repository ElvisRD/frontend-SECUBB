import React,{useEffect, useState} from "react";
import {View,Text} from "react-native";
import styles from "./styles";
import {Provider, Portal, Button, Dialog} from "react-native-paper";
import {guardarAlertaRedux} from "../../redux/actions/alertasActions";
import { daLikeComentarioRedux } from "../../redux/actions/likesActions";
import {obtenerAlertas} from "../../data/alertas";
import {obtenerComentarios} from "../../data/comentarios";
import { guardarSugerenciaRedux } from "../../redux/actions/sugerenciasActions";
import { obtenerSugerencias } from "../../data/sugerencias";
import { guardarComentarioRedux } from "../../redux/actions/comentariosActions";
import { daLikeAlertaRedux } from "../../redux/actions/likesActions";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from 'expo-location';



export default function PortadaAfterLogin({setPortadaVisible, setCoordenadasUsuario}){

    const [permisoLocalizacion, setPermisoLocalizacion] = useState(false);
    const [verificarActivacionPermiso, setVerificarActivacionPermiso] = useState(0);

    const dispatch = useDispatch();

    useEffect(() => {

      const getPermisoLocalizacion = async () => {
        let {status} = await Location.requestForegroundPermissionsAsync();
        if(status !== "granted"){
          setPermisoLocalizacion(true);
        }else{
          let location = await Location.getCurrentPositionAsync({});
          setCoordenadasUsuario(location);
         
        }
      }

      const getAlertas = () => {
        const likeAlertas = [];
        obtenerAlertas().then((result) => {
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

       const getSugerencias = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('usuario')
          const datosUsuario = JSON.parse(jsonValue);
          if(datosUsuario.tipo === "Administrador"){
            obtenerSugerencias().then((result) => {
              dispatch(guardarSugerenciaRedux(result))
            }).catch((err) => {
              console.log("no se encontraron sugerencias");
            })
          }
        } catch(e) {
          console.log("error al obtener datos");
        }
       }

       getPermisoLocalizacion();
       getAlertas(); 
       getComentarios();
       getSugerencias();

    }, [verificarActivacionPermiso])


    return (
      <>
        <View style={styles.containerPortada}>
              <Text>Preparando datos...</Text>
        </View>
        <Provider>
                        <Portal>
                            <Dialog visible={permisoLocalizacion} dismissable={false} >
                                <Dialog.Icon icon="alert" />
                                <Dialog.Title>Permiso de localización</Dialog.Title>
                                <Dialog.Content><Text>Para el correcto funcionamiento de la aplicación es necesario que acepte el permiso de localización,
                                  si usted rechaza este permiso la aplicacion se cerrara.</Text></Dialog.Content>
                                <Dialog.Actions>
                                    <Button onPress={() =>{setPermisoLocalizacion(false)}}>Rechazar</Button>
                                    <Button onPress={() => Linking.openSettings()}>Ir a Configuraciones</Button>
                                    <Button onPress={() => setVerificarActivacionPermiso(verificarActivacionPermiso+1)}>Verificar</Button>
                                </Dialog.Actions>
                            </Dialog>
                        </Portal>
        </Provider>
      </>
        
    )
    
}