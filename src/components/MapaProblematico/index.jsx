import React,{useState} from "react"
import { View, Text, TouchableOpacity } from "react-native"
import styles from "./styles"
import MapView,{Marker} from 'react-native-maps';
import IconAD from 'react-native-vector-icons/AntDesign';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';

export default function MapaProblematico({setMostrarMapa}) {
    const [initialRegion, setInitialRegion] = useState({
        latitude: -36.726520,
        longitude: -72.986522,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,

    })

    return (
        <>
         <View style={styles.containerMapa}>
             <MapView
                initialRegion={initialRegion}  
                style={styles.mapa}
            >
              
             {/*  { alertas.length !== 0 ? (
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
              } */}
              

            </MapView>

            <TouchableOpacity style={styles.boton} onPress={()=>setMostrarMapa(false)}>
                <IconAD
                    name="arrowleft"
                    color="white"
                    size= {40}
                />
            </TouchableOpacity> 
   
        </View>
        </>
    )    
}