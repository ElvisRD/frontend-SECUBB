import React,{useState, useEffect} from "react"
import { View, Text, TouchableOpacity } from "react-native"
import styles from "./styles"
import MapView,{Heatmap, PROVIDER_GOOGLE} from 'react-native-maps';
import IconAD from 'react-native-vector-icons/AntDesign';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';

export default function MapaProblematico({setMostrarMapa, alertas}) {
    const [initialRegion, setInitialRegion] = useState({
        latitude: -36.726520,
        longitude: -72.986522,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,

    })
    const [puntos, setPuntos] = useState(null);



    useEffect(() => {
       
        const almacentarPuntos = () => {
            const puntosMapa = [];

            alertas.map((alerta,i) => {
                puntosMapa.push({
                    latitude: alerta.latitude,
                    longitude: alerta.longitude,
                    weight: 1
                })
            })

            

            setPuntos(puntosMapa);
    
        }

        almacentarPuntos();
        
    }, [])
    

    return (
        <>
         <View style={styles.containerMapa}>
             <MapView
                provider={PROVIDER_GOOGLE}
                initialRegion={initialRegion}  
                style={styles.mapa}
                rotateEnabled={false}
            >
                    <Heatmap
                        style={styles.pinCalor}
                        initialRegion={initialRegion}
                        points={puntos}
                        radius={22}
                        gradient={{
                            colors: ["black", "purple", "red", "yellow", "white"],
                            startPoints: [0.01, 0.04, 0.1, 0.45, 0.5]
                            }
                        }
                    />
  
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