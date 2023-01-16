import React,{useState, useEffect} from 'react';
import styles from "./style";
import { View, Text,TouchableOpacity, BackHandler} from 'react-native';
import Mapa from "../../components/Mapa/"
import IconMCI from "react-native-vector-icons/MaterialCommunityIcons";
import Menu from "../../components/Menu/"
import Alertas from "../../components/Alertas"

import {URL_CONNECT_BACKEND} from "../../../env"
import { useDispatch, useSelector } from 'react-redux';
import { guardarAlertaRedux,eliminarAlertaRedux} from '../../redux/actions/alertasActions';
import { guardarComentarioRedux, eliminarComentarioRedux, editarComentarioRedux } from '../../redux/actions/comentariosActions';
import { guardarSugerenciaRedux, eliminarSugerenciaRedux } from '../../redux/actions/sugerenciasActions';
import { guardarNotificacionRedux } from '../../redux/actions/notificacionesActions';
import { daLikeAlertaRedux, borrarLikeAlertaRedux, daLikeComentarioRedux, borrarLikeComentarioRedux, borrarTodosLosLikesAlertaRedux } from '../../redux/actions/likesActions';
import io from "socket.io-client"

const socket = io(URL_CONNECT_BACKEND);

export default function Home({navigation}) {
  const [isVisibleMenu, setIsVisibleMenu] = useState(false);
  const [isVisibleAlertas, setIsVisibleAlertas] = useState(false);
  const [isVisibleTipoAlertas, setIsVisibleTipoAlertas] = useState(false);
  const  usuario = useSelector((state) => state.usuario.usuario);

  useEffect(() => {

    const backAction = () => {
      BackHandler.exitApp()
      return true;
    };

      const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
           backAction
      ); 

      return () => backHandler.remove();
  }, [])
  


  const dispatch = useDispatch();

  useEffect(() => {

    socket.on("comentario", (comentario) => {
      dispatch(guardarComentarioRedux(comentario))
    }) 

    socket.on("alerta", (alerta) => {
      dispatch(guardarAlertaRedux(alerta))
    })

    socket.on("daLikeAlerta", (like) => {
      dispatch(daLikeAlertaRedux(like))
    })

    socket.on("daDislikeAlerta", (dislike,position) => {
      dispatch(borrarLikeAlertaRedux(dislike,position))
    })  

    socket.on("daLikeComentario", (like) => {
      dispatch(daLikeComentarioRedux(like))
    })

    socket.on("daDislikeComentario", (dislike,position) => {
      dispatch(borrarLikeComentarioRedux(dislike,position))
    })

    socket.on("eliminarAlerta", (alerta) => {
      dispatch(eliminarAlertaRedux(alerta));
      dispatch(eliminarComentarioRedux(alerta));
      dispatch(borrarTodosLosLikesAlertaRedux(alerta));
    })

    socket.on("editarComentario", (comentario) => {
      dispatch(editarComentarioRedux(comentario));
    })

    if(usuario.tipo === "Administrador"){
      socket.on("guardarSugerencia", (sugerencia) => {
        dispatch(guardarSugerenciaRedux(sugerencia));
      })

      socket.on("eliminarSugerencia", (sugerencia) => {
        dispatch(eliminarSugerenciaRedux(sugerencia));
      })
    }
    
    socket.on("notificacion", (notificacion) => {
      dispatch(guardarNotificacionRedux(notificacion));
    });

    return () => {
      socket.off("comentario");
      socket.off("daLikeAlerta");
      socket.off("daDislikeAlerta");
      socket.off("alerta")
    }
    
  }, [])


  function handlePressButtons(nombre){

    switch(nombre){
      case "mapa": {
        setIsVisibleMenu(false);
        setIsVisibleAlertas(false);
        break;
      }
      case "noticias": {
        setIsVisibleAlertas(true);
        setIsVisibleMenu(false);
        setIsVisibleTipoAlertas(false);
        break;
      }
      case "...": {
        break;
      }
      case "home": {
        setIsVisibleMenu(true);
        setIsVisibleAlertas(false);
        setIsVisibleTipoAlertas(false);
        break;
      }
    }
  }

  return (

    <>
   
      <View style={styles.container}>
        <View style={styles.containerMapa}>
            {isVisibleMenu ? (
              <Menu handlePressButtons={handlePressButtons} navigation={navigation} socket={socket} />
            ):(null)}

            {isVisibleAlertas ? (
              <Alertas handlePressButtons={handlePressButtons} socket={socket}/>
            ): (null)}

          <Mapa socket={socket} verTipoAlertas={isVisibleTipoAlertas} setIsVisibleTipoAlertas={setIsVisibleTipoAlertas}/> 
        </View>
        <View style={styles.containerBotones}> 
          <TouchableOpacity style={styles.containerBoton} onPress={()=>{handlePressButtons("mapa")}} >
            <IconMCI
                name="map-outline"
                style={styles.boton}
                color= "#a3a2a0"
                size= {30}
            />
            <Text style={styles.textBoton} >Mapa</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.containerBoton} onPress={()=>{handlePressButtons("noticias")}} >
            <IconMCI
                name="clipboard-alert-outline"
                style={styles.boton}
                color= "#a3a2a0"
                size= {30}
            />
            <Text style={styles.textBoton}>Alertas</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.containerBoton} onPress={()=>{handlePressButtons("home")}}>
            <IconMCI
                name="menu"
                style={styles.boton}
                color= "#a3a2a0"
                size= {30}
            />
            <Text style={styles.textBoton}>Menú</Text>
          </TouchableOpacity>
        
        </View> 
      </View>
    </>
   
    
  );
}
