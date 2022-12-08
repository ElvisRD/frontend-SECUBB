import React,{useState, useEffect} from 'react';
import styles from "./style";
import { View, Text,TouchableOpacity } from 'react-native';
import Mapa from "../../components/Mapa/"

import IconMCI from "react-native-vector-icons/MaterialCommunityIcons";
import Menu from "../../components/Menu/"
import Alertas from "../../components/Alertas"
import * as Location from 'expo-location';
import Portada from "../portada";
import {URL_CONNECT_BACKEND} from "../../../env"
import { useDispatch } from 'react-redux';
import { guardarAlertaRedux} from '../../redux/actions/alertasActions';
import { guardarComentarioRedux } from '../../redux/actions/comentariosActions';
import { daLikeAlertaRedux, borrarLikeAlertaRedux } from '../../redux/actions/likesActions';
import PortadaAfterLogin from '../portadaAfterLogin';
import io from "socket.io-client"

const socket = io(URL_CONNECT_BACKEND);

export default function Home({navigation, route}) {
  const [isVisibleMenu, setIsVisibleMenu] = useState(false);
  
  const [isVisibleMapa, setIsVisibleMapa] = useState(true);
  const [portadaVisible, setPortadaVisible] = useState(route.params.portadaAfterVisible);
  const [isVisibleNoticias, setIsVisibleNoticias] = useState(false);
 
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

    socket.on("daDislikeAlerta", (dislike) => {
      dispatch(borrarLikeAlertaRedux(dislike))
    })  

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
        setIsVisibleNoticias(false);
        break;
      }
      case "noticias": {
        setIsVisibleNoticias(true);
        setIsVisibleMenu(false);
        break;
      }
      case "...": {
        break;
      }
      case "home": {
        setIsVisibleMenu(true);
        setIsVisibleNoticias(false);
        break;
      }
    }
  }

  return (

    <>
    {
       portadaVisible ? <PortadaAfterLogin setPortadaVisible={setPortadaVisible} />:(null)
    }
   
      <View style={styles.container}>
        <View style={styles.containerMapa}>

          {isVisibleMenu ? (
              <Menu handlePressButtons={handlePressButtons}/>
            ):(null)}

            {isVisibleNoticias ? (
              <Alertas handlePressButtons={handlePressButtons} socket={socket}/>
            ): (null)}

          <Mapa setPortadaVisible={setPortadaVisible} socket={socket}/>
        </View>
        <View style={styles.containerBotones}> 
          <TouchableOpacity style={styles.containerBoton} onPress={()=>{handlePressButtons("mapa")}} >
            <IconMCI
                name="map-outline"
                style={styles.boton}
                size= {35}
            />
            <Text style={styles.textBoton} >Mapa</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.containerBoton} onPress={()=>{handlePressButtons("noticias")}} >
            <IconMCI
                name="clipboard-alert-outline"
                style={styles.boton}
                size= {35}
            />
            <Text style={styles.textBoton}>Alertas</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.containerBoton}>
            <IconMCI
                name="panorama-fisheye"
                style={styles.boton}
                size= {35}
            />
            <Text style={styles.textBoton} >???</Text>
          </TouchableOpacity>
        
        
       
          <TouchableOpacity style={styles.containerBoton} onPress={()=>{handlePressButtons("home")}}>
            <IconMCI
                name="menu"
                style={styles.boton}
                size= {35}
            />
            <Text style={styles.textBoton}>Menu</Text>
          </TouchableOpacity>
        
        </View> 
      </View>
    </>
   
    
  );
}
