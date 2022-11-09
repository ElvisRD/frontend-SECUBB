import React,{useState, useEffect} from 'react';
import styles from "./style";
import { View, Text,TouchableOpacity } from 'react-native';
import Mapa from "../../components/Mapa/"
import Icon from 'react-native-vector-icons/FontAwesome';
import IconMCI from "react-native-vector-icons/MaterialCommunityIcons";
import Menu from "../../components/Menu/"
import Noticias from "../../components/Noticias/"
import * as Location from 'expo-location';
import Portada from "../portada";


export default function Home() {
  const [isVisibleMenu, setIsVisibleMenu] = useState(false);
  const [isVisibleMapa, setIsVisibleMapa] = useState(true);
  const [portadaVisible, setPortadaVisible] = useState(true);
  const [isVisibleNoticias, setIsVisibleNoticias] = useState(false);
  const [coordsUsuario, setCoordsUsuario] = useState();

  useEffect(() => {
    const posisionActual = async() => {
        setPortadaVisible(true)
         let {status} = await Location.requestForegroundPermissionsAsync()
         if(status === 'granted'){
            const position = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Low})
            setCoordsUsuario({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001
          })
         
         }else{
            console.log("permiso denegado");
         }
       
    }


    posisionActual();
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
     {portadaVisible ? <Portada />:(null)}

      <View style={styles.container}>
        <View style={styles.containerMapa}>

          {isVisibleMenu ? (
              <Menu />
            ):(null)}

            {isVisibleNoticias ? (
              <Noticias />
            ): (null)}

          <Mapa coords={coordsUsuario} setPortadaVisible={setPortadaVisible}/>
        </View>
        <View style={styles.containerBotones}> 

  
          <TouchableOpacity style={styles.containerBoton} onPress={()=>{handlePressButtons("mapa")}} >
            <Icon
                name="map-o"
                style={styles.boton}
                size= {26}
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
                name="account-outline"
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
