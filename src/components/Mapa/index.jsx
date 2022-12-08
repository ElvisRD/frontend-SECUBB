import React,{useState, useEffect} from 'react';
import { View, StyleSheet, Text,TouchableOpacity } from 'react-native';
import MapView,{Marker} from 'react-native-maps';
import ModalAlerts from "../ModalAlertas";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import styles from "./styles"
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';




export default function Mapa({ setPortadaVisible, socket}) {

    const [coordenadasAlerta, setCoordenadasAlerta] = useState(null);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [alertas, setAlertas] = useState([]);
    const alertasRedux = useSelector(state => state.alertas.alertas)
   

    const [initialRegion, setInitialRegion] = useState({
        latitude: -36.726520,
        longitude: -72.986522,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,

    })

    const coordenadas = {
        la1: -36.726392,
        log1: -72.986794,
        lat2: -36.726407,
        log2: -72.986749,
        lat3: -36.726378,
        log3: -72.986747,
    }

    /* useEffect(() => {
        if(alertasNuevas !== ""){
            alertasNuevas.map(alerta => {
                setAlertas(oldAlertas => [...oldAlertas, alerta])
            })
           
        }         

    }, [alertasNuevas]) */

    useEffect(() => {
        if(alertasRedux !== null){
           setAlertas(alertasRedux);
        }  
    }, [alertasRedux])
    
    

    /* const [spinner, setSpinner] = useState(false); */

    /* useEffect(() => {
      socket.on("alerta", (alert) => {
       
      })
    }, []) */
 
    const eliminarToken = async () => {
        try {
          await AsyncStorage.removeItem('usuario')
          console.log("el usuario fue removido");
        } catch(e) {
            console.log("error al remover el usuario");
        }
      
    }
    
    
    const handleClickMap = () => {
        
        if(coordenadasAlerta === null){
           setCoordenadasAlerta(initialRegion)
        }

        setIsVisibleModal(true)
    }

    const pinTipoAlerta = (tipo) => {
            
                if(tipo === "Actividad sospechosa"){
                    return <IconFA5 name="map-marker-alt" size={40} color="red"/>
                }
                if(tipo === "Problema de iluminación"){
                    return <IconFA5 name="map-marker-alt" size={40} color="blue"/>
                }
                if(tipo === "Perros rondando"){
                    return <IconFA5 name="map-marker-alt" size={40} color="yellow"/>
                }
                if(tipo === "Emergencia de salud"){
                    return <IconFA5 name="map-marker-alt" size={40} color="green"/>
                }
                if(tipo === "Consumo de drogas"){
                    return <IconFA5 name="map-marker-alt" size={40} color="purple"/>
                }

    }

    return (
        <>
        {isVisibleModal ? (
            <ModalAlerts setIsVisibleModal={setIsVisibleModal} socket={socket} coordenadasAlerta={coordenadasAlerta}/>
         ):(null)} 
         
         <View style={styles.container}>

             <MapView
                initialRegion={initialRegion}  
                style={styles.mapa}
                onRegionChangeComplete={(e)=>{setCoordenadasAlerta(e)}}
                /* showsUserLocation={true}
                userLocationUpdateInterval={1000000}
                userLocationPriority="high" */
            >
              
              { alertas !== null ? (
                    alertas.map((alert,i) => 
                    <Marker
                        key={i}
                        coordinate={{
                            latitude: alert.latitude ,
                            longitude: alert.longitude
                        }}
                        //onPress={()=>{console.log("marker")}}
                    > 
                        {pinTipoAlerta(alert.tipo)}
                    </Marker>  
                    
                )):(null)
              }

            </MapView>

            <Icon
                name="map-marker-alert"
                size= {70} 
                color="gray"
                style={styles.makerMapa}
            /> 
            
            <TouchableOpacity style={styles.boton} onPress={handleClickMap}>
                <Icon
                    name="plus"
                    color="white"
                    size= {40}
                />
            </TouchableOpacity> 

            <TouchableOpacity style={styles.botonRuta} onPress={eliminarToken}>
                <Icon
                    name="plus"
                    color="white"
                    size= {40}
                />
            </TouchableOpacity> 

        </View>
        </>

    )
            

}



