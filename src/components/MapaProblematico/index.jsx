import React,{useState, useEffect} from "react"
import { View, Text, TouchableOpacity } from "react-native"
import styles from "./styles"
import MapView,{Marker, PROVIDER_GOOGLE, Polygon} from 'react-native-maps';
import IconAD from 'react-native-vector-icons/AntDesign';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import departamentos from "../../json/depatamentosUbb.json";
import departamentoSiluetas from "../../json/departamentosSiluetas.json";
import DetallesAlerta from "../DetallesAlerta"
import mapStyle from "../../json/styleMap.json";
import IconFA from "react-native-vector-icons/FontAwesome";
import IconI from "react-native-vector-icons/Ionicons";
import IconMI from "react-native-vector-icons/MaterialIcons";
import IconE from "react-native-vector-icons/Entypo";
import IconMCI from "react-native-vector-icons/MaterialCommunityIcons";

export default function MapaProblematico({setMostrarMapa, alertas}) {
    const [coordenadasAlerta, setCoordenadasAlerta] = useState(null);
    const [alertaSeleccionada, setAlertaSeleccionada] = useState(null);
    const [verDetallesAlerta, setVerDetallesAlerta] = useState(false);
    
    const [initialRegion, setInitialRegion] = useState({
        latitude: -36.821884,
        longitude: -73.012440,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,

    })

    const pinTipoAlerta = (tipo) => {
        if(tipo === "Persona sospechosa"){
            return <IconFA5 name="map-marker-alt" size={40} color="red"/>
        }
        if(tipo === "Actividad sospechosa"){
            return <IconFA5 name="map-marker-alt" size={40} color="orange"/>
        }
        if(tipo === "Falla de iluminacion"){
            return <IconFA5 name="map-marker-alt" size={40} color="blue"/>
        }
        if(tipo === "Lugar con escasa iluminacion"){
            return <IconFA5 name="map-marker-alt" size={40} color="purple"/>
        }
        if(tipo === "Incidente de robo"){
            return <IconFA5 name="map-marker-alt" size={40} color="green"/>
        }
        if(tipo === "Incidente de violencia"){
            return <IconFA5 name="map-marker-alt" size={40} color="pink"/>
        }
    }

    const mostrarAlerta = (alerta) => {
        setAlertaSeleccionada(alerta)
        setVerDetallesAlerta(true)
    }

    return (
        
        <>
       {verDetallesAlerta ? <DetallesAlerta setIsVisibleAlerta={setVerDetallesAlerta} verAlerta={alertaSeleccionada} permisos={false} /> : (null) }  

         <View style={styles.containerMapa}>
             <MapView
                provider={PROVIDER_GOOGLE}
                initialRegion={initialRegion} 
                onRegionChangeComplete={(e)=> {setCoordenadasAlerta(e)}}
                style={styles.mapa}
                customMapStyle={mapStyle}
                showsBuildings={false}
            >
               { alertas.map((alerta,i) => (
                    <Marker
                        key={i}
                        coordinate={{
                            latitude: alerta.latitude ,
                            longitude: alerta.longitude
                        }}
                        onPress={()=>{mostrarAlerta(alerta)}}
                                
                    > 
                        {pinTipoAlerta(alerta.tipo)}
                    </Marker>
                    
                ))
                }

                {
                departamentos.map((depa, i) => (
                    <Marker
                        key={i}
                        title={depa.nombre}
                        coordinate={{
                            latitude: depa.latitud ,
                            longitude: depa.longitud
                        }}
                        opacity={0.5}
                        
                    >
                        <Text style={{position: "absolute"}}> </Text>
                        
                        {
                            coordenadasAlerta !== null  ? (
                                coordenadasAlerta.longitudeDelta < 0.008 && coordenadasAlerta.latitudeDelta < 0.008  ? (
                                    depa.tipoIcon === "AntDesign" ? (
                                        <IconAD name={depa.icono} size={25} color="black"/>
                                    ):(
                                        depa.tipoIcon === "FontAwesome" ? (
                                            <IconFA name={depa.icono} size={25} color="black"/>
                                        ):(
                                            depa.tipoIcon === "Ionicon" ? (
                                                <IconI name={depa.icono} size={25} color="black"/>
                                            ):(
                                                depa.tipoIcon === "MaterialIcons" ? (
                                                    <IconMI name={depa.icono} size={25} color="black"/>
                                                ):(
                                                    depa.tipoIcon === "Entypo" ? (
                                                        <IconE name={depa.icono} size={25} color="black"/>
                                                    ):(
                                                        depa.tipoIcon === "MaterialCommunityIcons" ? (
                                                            <IconMCI name={depa.icono} size={25} color="black"/>
                                                        ):(
                                                            null
                                                        )
                                                    )
                                                )
                                            )
                                        )
                                    ) 
                                ) : (null)
                            ):(null)  
                                 
                        } 
                    </Marker>
                ))
              }

                {departamentoSiluetas.map((departamento, i) => (
                    <Polygon 
                        key={i}
                        coordinates={departamento.coordenadas}
                        fillColor="rgba(0,0,0,0.1)"
                        strokeColor="rgba(0,0,0,0.1)"
                
                    />
                ))}
  
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