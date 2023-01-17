import React,{useEffect, useState} from "react";
import {View,Text, Linking, BackHandler, ActivityIndicator} from "react-native";
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
import { guardarUsuarioRedux, guardarUbicacionRedux } from "../../redux/actions/usuarioActions";
import * as Location from 'expo-location';
import Cargando from "../../components/Cargando";



export default function Portada({navigation}){
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
       const obtenerDatosStorage = async() => {
        try {
          const jsonValue = await AsyncStorage.getItem('usuario')
          const datosUsuario = JSON.parse(jsonValue);
          if(datosUsuario !== null){
              obtenerPermisoUbicacion().then((result) => {
                
                if(result){
                  dispatch(guardarUsuarioRedux(datosUsuario));
                  getAlertas();
                  getComentarios();
                
                  if(datosUsuario.tipo === "Administrador"){
                    getSugerencias();
                  } 
                  navigation.navigate("Home")
                }else{
                  setPermisoLocalizacion(true)
                }
              }).catch((err) => {
                console.log("error al obtener permiso de localización");
              });
              setCargando(false);
          }else{
            navigation.navigate("Login")
          }
        } catch(e) {
          console.log("error al obtener datos de usuario");
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
          if(err !== undefined){
            if(err.response.status === 404){
              console.log("No se encontraron alertas");
            }else{
              console.log("error al obtener alertas");
            }
          }
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
          if(err.response.status !== undefined){
            if(err.response.status === 404){
              console.log("No se encontraron comentarios");
            }else{
              console.log("error al obtener comentarios");
            }
          }
        });
       }

       const getSugerencias = async () => {
        await obtenerSugerencias().then((result) => {
           dispatch(guardarSugerenciaRedux(result))
        }).catch((err) => {
          if(err.response.status !== undefined){
            if(err.response.status === 404){
              console.log("No se encontraron sugerencias");
            }else{
              console.log("error al obtener sugerencias");
            }
          }
        });
       } 

       const obtenerPermisoUbicacion = async() => {
              let { status } = await Location.requestForegroundPermissionsAsync();
              if (status !== 'granted') {
                 return false;
              }
              
              let location = await Location.getCurrentPositionAsync({});
              dispatch(guardarUbicacionRedux(location));
              return true;
       }

       obtenerDatosStorage();
    }, [verificarActivacionPermiso])


    return (
      <>
       {cargando ? <Cargando /> : null} 
        <View style={styles.containerPortada}>
            <ActivityIndicator style={styles.spinner} animating={true} color="white" size={40} />
            <Text style={styles.textoCargando}>Cargando...</Text>
        </View>
        <Provider >
                <Portal>
                         <Dialog visible={permisoLocalizacion} dismissable={false} >
                              <Dialog.Icon icon="alert" />
                              <Dialog.Content style={styles.containerTituloAlerta}>
                                <Text style={styles.tituloAlerta}>Permiso de localización</Text>
                              </Dialog.Content>
                              <Dialog.Content style={styles.containerTextoAlerta}>
                                <Text style={styles.textoAlerta}>Para el correcto funcionamiento de la aplicación es obligatorio el permiso de localización.
                              </Text>
                              </Dialog.Content>
                              <Dialog.Actions style={styles.containerBotonAlerta}>
                                  <Button  onPress={() => Linking.openSettings()}><Text style={styles.textoBotonAlerta}>Ir a Configuraciones</Text></Button>
                                  <Button  onPress={()=> {setVerificarActivacionPermiso(verificarActivacionPermiso+1),setCargando(true)}}><Text style={styles.textoBotonAlerta}>Verificar</Text></Button>
                              </Dialog.Actions>
                          </Dialog>
                </Portal>
        </Provider>
      </>
    )
}