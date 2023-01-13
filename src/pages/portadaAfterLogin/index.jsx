import React,{useEffect, useState} from "react";
import {View,Text, PermissionsAndroid, BackHandler} from "react-native";
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
import { guardarUsuarioRedux, guardarUbicacionRedux } from "../../redux/actions/usuarioActions";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from 'expo-location';
import Cargando from "../../components/Cargando";



export default function PortadaAfterLogin({navigation, setPortadaAfterLogin}){

    const [permisoLocalizacion, setPermisoLocalizacion] = useState(false);
    const [verificarActivacionPermiso, setVerificarActivacionPermiso] = useState(0);
    const [cargando, setCargando] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
      const backAction = () => {
        BackHandler.exitApp();
        return true;
      };
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      ); 
      return () => {
          backHandler.remove(); 
      };
    }, []);

    useEffect(() => {
      const getPermisoLocalizacion = async () => {
        try {
          /* const granted = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION); */

            let { status } = await Location.requestForegroundPermissionsAsync();
                
            if (status !== 'granted') {
              setErrorMsg('Permission to access location was denied');
              return false;
            }
            let location = await Location.getCurrentPositionAsync({});
            dispatch(guardarUbicacionRedux(location));
            return true;
            
        } catch (err) {
          Alert.alert("Error", "No se obtuvo el permiso de localización"); 
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
          Alert.alert("Error", "No se obtuvieron las alertas"); 
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
           Alert.alert("Error", "No se obtuvieron los comentarios"); 
        });
       }

       const getSugerencias = async () => {
    
        obtenerSugerencias().then((result) => {
            dispatch(guardarSugerenciaRedux(result))
        }).catch((err) => {
          Alert.alert("Error", "No se obtuvieron las sugerencias"); 
        })
     
       }

       const obtenerDatos = async () => {

        const jsonValue = await AsyncStorage.getItem('usuario')
        const datosUsuario = JSON.parse(jsonValue);
        
        
        dispatch(guardarUsuarioRedux(datosUsuario));
       
       getPermisoLocalizacion().then((result) => {
        console.log(result);
        if(result === true){
          getAlertas();
          getComentarios();
          
          if(datosUsuario.tipo === "Administrador"){
            getSugerencias();
          }
          setPortadaAfterLogin(false);
          navigation.navigate("Home");
        }else{
          setPermisoLocalizacion(true);
        } 
        }).catch((err) => {
          Alert.alert("Error", "No se obtuvo el permiso de localización"); 
        });  
      
       }
     
      obtenerDatos();

    }, [verificarActivacionPermiso])


    return (
      <>
        {cargando ? <Cargando /> : null}
        <View style={styles.containerPortada}>
              <Text>Preparando datos...</Text>
        </View>
        <Provider>
                        <Portal>
                            <Dialog visible={permisoLocalizacion} dismissable={false} >
                                <Dialog.Icon icon="alert" />
                                <Dialog.Title>Permiso de localización</Dialog.Title>
                                <Dialog.Content><Text>Para el correcto funcionamiento de la aplicación es obligatorio el permiso de localización,
                                si usted rechaza este permiso la aplicación se cerrará.</Text></Dialog.Content>
                                <Dialog.Actions style={{justifyContent: "center"}}>
                                    <Button onPress={() => BackHandler.exitApp()}> Rechazar</Button>
                                    <Button onPress={() => Linking.openSettings()}>Ir a Configuraciones</Button>
                                    <Button onPress={() => {setVerificarActivacionPermiso(verificarActivacionPermiso+1), setCargando(true)}}>Verificar</Button>
                                </Dialog.Actions>
                            </Dialog>
                        </Portal>
        </Provider>
      </>
        
    )
    
}