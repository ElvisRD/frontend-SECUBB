import React,{useState, useEffect} from 'react';
import { View, StyleSheet, Text,TouchableOpacity } from 'react-native';
import MapView,{Marker} from 'react-native-maps';
import ModalAlerts from "../ModalAlertas";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import styles from "./styles"
import io from "socket.io-client"
import axios from "axios"


export default function Mapa({coords, setPortadaVisible}) {

    const [coordenadasAlerta, setCoordenadasAlerta] = useState(null);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [alertas, setAlertas] = useState([]);
    const socket = io("http://10.3.3.49:3002")

    const [initialRegion, setInitialRegion] = useState({
        latitude: -36.726520,
        longitude: -72.986522,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,

    })

    useEffect(() => {
       if(coords !== undefined){
            setPortadaVisible(false)
       }
    }, [coords])
    

    const [spinner, setSpinner] = useState(false);

    const markerOrigin = () => {
        return (
            <Marker
                coordinate={coords} >
                <Icon name="circle" size={10} />
            </Marker>
         )
        
    } 


    useEffect(() => {
      const socket = io("http://10.3.3.49:3002") //http://192.168.50.16:3002
      socket.on("alerta", (alert) => {
        setAlertas(oldAlert => [...oldAlert, alert])
      })
    }, [])

     useEffect(() => {
      const getAlertas = async() => {
        const alertsArray = [];
        try {
            const alerts = await axios.post(`http://10.3.3.49:3002/api/alertas?activa=true`, //http://192.168.50.16:3002/api/alertas
                {
                    activa: true
                },
            )
            
            alerts.data.map(alert => {
                alertsArray.push(alert)
            })  
             setAlertas(alertsArray);   
         
        } catch(err) {
            console.log(err);
        } 
      }

      getAlertas();
    }, []) 
    
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
                if(tipo === "Problema de iluminacion"){
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
                
            >
{/*               {coords !== undefined ? (markerOrigin()):(null)}  */}
              
              { alertas.length !== 0 ? (
                    alertas.map((alert,i) => 
                    <Marker
                        key={i}
                        coordinate={{
                            latitude: parseFloat(alert.latitude) ,
                            longitude: parseFloat(alert.longitude) 
                        }}
                        onPress={()=>{console.log("marker")}}
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
        </View>
        </>

    )

}



