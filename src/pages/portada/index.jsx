import React,{useEffect, useState} from "react";
import {View,Text, Linking, Image, PermissionsAndroid, BackHandler} from "react-native";
import {Provider, Dialog, Portal, Button } from "react-native-paper";
import styles from "./styles";
import {guardarAlertaRedux} from "../../redux/actions/alertasActions";
import {obtenerAlertas} from "../../data/alertas";
import { guardarComentarioRedux } from "../../redux/actions/comentariosActions";
import { daLikeComentarioRedux } from "../../redux/actions/likesActions";
import { daLikeAlertaRedux } from "../../redux/actions/likesActions";
import { guardarSugerenciaRedux } from "../../redux/actions/sugerenciasActions";
import { obtenerSugerencias } from "../../data/sugerencias";
import { useDispatch } from "react-redux";
import {obtenerComentarios} from "../../data/comentarios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { guardarUsuario } from "../../redux/actions/usuarioActions";
import * as Location from 'expo-location';
import IconUBB from "../../image/IconUBB.png";
import Cargando from "../../components/Cargando";



export default function Portada({navigation}){
    const [permisoLocalizacion, setPermisoLocalizacion] = useState(false);
    const [coordenadasUsuario, setCoordenadasUsuario] = useState(null);
    const [verificarActivacionPermiso, setVerificarActivacionPermiso] = useState(0); 
    const [cargando, setCargando] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
       const obtenerDatosStorage = async() => {
        try {
          const jsonValue = await AsyncStorage.getItem('usuario')
          const datosUsuario = JSON.parse(jsonValue);
          if(jsonValue !== null){
              setCargando(true)
              let permiso = await obtenerPermisoUbicacion();

              if(permiso){
                dispatch(guardarUsuario(datosUsuario));
                getAlertas();
                getComentarios();
              
                if(datosUsuario.tipo === "Administrador"){
                  getSugerencias();
                } 

              }else{
                setPermisoLocalizacion(true)
              }
              
              setCargando(false)
            
          }else{
            navigation.navigate("Login")
          }
        } catch(e) {
          console.log("error al obtener datos");
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

       const getSugerencias = async () => {
        await obtenerSugerencias().then((result) => {
           dispatch(guardarSugerenciaRedux(result))
        }).catch((err) => {
           console.log("no se encontraron sugerencias");
        });
       } 

       const obtenerPermisoUbicacion = async() => {
          
            try {
              const granted = await PermissionsAndroid.check(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
             
              if (granted === true) {
                let location = await Location.getCurrentPositionAsync({});
                setCoordenadasUsuario(location);
                return true;
              } else {
                setPermisoLocalizacion(true)
              }
            } catch (err) {
              console.log(err);
            }   
       }

       obtenerDatosStorage();
    }, [verificarActivacionPermiso])

    useEffect(() => {
      if(coordenadasUsuario !== null){
        navigation.navigate("Home", {portadaAfterVisible: false, coordenadasUsuario: coordenadasUsuario});
      }
    }, [coordenadasUsuario])
    
    return (
      <>
        {cargando ? <Cargando /> : null}
        <View style={styles.containerPortada}>
            <Image source={{IconUBB}} />
        </View>
        <Provider >
                <Portal>
                          <Dialog visible={permisoLocalizacion} dismissable={false} >
                              <Dialog.Icon icon="alert" />
                              <Dialog.Title>Permiso de localización</Dialog.Title>
                              <Dialog.Content><Text>Para el correcto funcionamiento de la aplicación es obligatorio el permiso de localización,
                                si usted rechaza este permiso la aplicación se cerrará.</Text></Dialog.Content>
                              <Dialog.Actions style={{justifyContent: "center"}}>
                                  <Button onPress={()=> BackHandler.exitApp()}>Rechazar</Button>
                                  <Button onPress={() => Linking.openSettings()}>Ir a Configuraciones</Button>
                                  <Button onPress={()=> setVerificarActivacionPermiso(verificarActivacionPermiso+1)}>Verificar</Button>
                              </Dialog.Actions>
                          </Dialog>
                </Portal>
        </Provider>
      </>
     
      
        
  
    )
    
}