import React,{useState, useEffect} from 'react';
import { View , Text,TouchableOpacity, Dimensions } from 'react-native';
import MapView,{Marker,PROVIDER_GOOGLE, Polygon} from 'react-native-maps';
import CrearAlerta from "../CrearAlerta";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconAD from 'react-native-vector-icons/AntDesign';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import IconI from 'react-native-vector-icons/Ionicons';
import IconE from 'react-native-vector-icons/Entypo';
import IconMI from 'react-native-vector-icons/MaterialIcons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from "./styles"
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import Alerta from "../DetallesAlerta";
import TiposAlertaMapa from "./tiposAlertaMapa";
import mapStyle from "../../json/styleMap.json";
import departamentos from "../../json/depatamentosUbb.json";
import departamentoSiluetas from "../../json/departamentosSiluetas.json";
import * as geolib from 'geolib';
import  coordenadasUbb  from "../../json/coordenadasUbb";

export default function Mapa({socket, setIsVisibleTipoAlertas, verTipoAlertas}) {

    const [coordenadasAlerta, setCoordenadasAlerta] = useState(null);
    const [coordenadasUsuario, setCoordenadasUsuario] = useState(null);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalAvisoAlerta, setModalAvisoAlerta] = useState(false);
    const [verAlerta, setVerAlerta] = useState(false);
    const [ubicacion, setUbicacion] = useState(null);
    const [alertaSeleccionada, setAlertaSeleccionada] = useState(null);
    const [alertas, setAlertas] = useState(null);
    const alertasRedux = useSelector(state => state.alertas.alertas)
    const notificacionRedux = useSelector(state => state.notificacion.notificacion)
    const usuarioRedux = useSelector(state => state.usuario)
    const dimensionesPantalla = Dimensions.get('window');
    const [initialRegion, setInitialRegion] = useState({
        latitude: -36.821884,
        longitude: -73.012440,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
    }) 

    useEffect(() => {
        if(usuarioRedux.coordenadas !== null){
            //console.log(usuarioRedux.coordenadas);
            setCoordenadasUsuario(usuarioRedux.coordenadas);
           //console.log(usuarioRedux.coordenadas.coords.latitude);
            /* setInitialRegion({latitude: usuarioRedux.coordenadas.coords.latitude, 
                longitude: usuarioRedux.coordenadas.coords.longitude});  */

        }
    }, [usuarioRedux.coordenadas])
        
    useEffect(() => {
        if(alertasRedux !== null){
            setAlertas(alertasRedux);
           
        }else{
            setAlertas(null);
        }
    }, [alertasRedux])

    useEffect(() => {

        if(notificacionRedux !== null && notificacionRedux !== undefined && usuarioRedux.notificaciones !== false){
           /* let mostrarNotificacion = geolib.isPointWithinRadius({latitude: notificacionRedux.latitude, longitude: notificacionRedux.longitude}, 
                {latitude: -36.82238193190107, longitude: -73.01337695114863}, 100);  */
           let mostrarNotificacion = geolib.isPointWithinRadius({latitude: notificacionRedux.latitude, longitude: notificacionRedux.longitude}, 
                    {latitude: coordenadasUsuario.coords.latitude, longitude: coordenadasUsuario.coords.longitude}, 100); 
                //console.log(mostrarNotificacion);
            if(mostrarNotificacion){
                console.log(usuarioRedux);
                Toast.show({
                    type: 'info',
                    position: 'top',
                    text1: 'Fue creada una alerta cerca de tu ubicación',
                    visibilityTime: 3000,
                });
            }
        }
       
    }, [notificacionRedux])

    useEffect(() => {
      setCoordenadasAlerta(initialRegion);
    }, [])
    
    
    const handleClickMap = async () => {
        
           if(usuarioSeEncuentraEnUbb()){
                if(soloAlertasDentroDeUbb()){
                    setModalAvisoAlerta(true);
                    let encontreAlerta = false;
                    if(coordenadasAlerta === null){
                        if(alertasRedux !== null){
                            for(let i = 0; i < alertasRedux.length; i++){
                                if(alertasRedux[i].latitude === initialRegion.latitude && alertasRedux[i].longitude === initialRegion.longitude){ 
                                    encontreAlerta = true;
                                    break;
                                }
                            }
                
                            if(!encontreAlerta){
                                setCoordenadasAlerta(initialRegion);
                                verSiAlertaSeEncuentraEnDepartamento();
                                setIsVisibleModal(true);
                            }
                        }else{
                    
                            setCoordenadasAlerta(initialRegion);
                            verSiAlertaSeEncuentraEnDepartamento();
                            setIsVisibleModal(true);
                        }
            
                    }else{
                        
                        verSiAlertaSeEncuentraEnDepartamento();
                        setIsVisibleModal(true);
                    }
                }else{
                    Toast.show({
                        type: 'error',
                        position: 'top',
                        text1: 'Solo puedes crear alertas dentro de la UBB',
                        visibilityTime: 3000,
                    })
                }
                
           }else{

            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Solo puedes crear alertas estando dentro de la UBB',
                visibilityTime: 3000,
            })
           } 
        
    }

    const verSiAlertaSeEncuentraEnDepartamento = () => {
       
        let seEncontro = false;
        let nombreDepa = null;
        
        for(let i = 0; i < departamentoSiluetas.length; i++){
            if( geolib.isPointInPolygon({ latitude: coordenadasAlerta.latitude, longitude: coordenadasAlerta.longitude }, departamentoSiluetas[i].coordenadas)){
                seEncontro = true;
                nombreDepa = departamentoSiluetas[i].nombre;
                break;
            }
        }

       if(seEncontro){
            setUbicacion(nombreDepa);
       }else{
            setUbicacion("Exterior");
       }
    
    }

    const usuarioSeEncuentraEnUbb = () => {
        let seEncuentraDentro = geolib.isPointInPolygon({ latitude: -36.82238193190107, longitude: -73.01337695114863 }, coordenadasUbb.coordenadas)
        //let seEncuentraDentro = geolib.isPointInPolygon({ latitude: coordenadasUsuario.coords.latitude, longitude: coordenadasUsuario.coords.longitude }, coordenadasUbb.coordenadas)
        //-36.82238193190107, -73.01337695114863
        //latitude: coordenadasUsuario.coords.latitude, longitude: coordenadasUsuario.coords.longitude
        return seEncuentraDentro;
    }

    const soloAlertasDentroDeUbb = () => {
        let seEncuentraDentro = geolib.isPointInPolygon({ latitude: coordenadasAlerta.latitude, longitude: coordenadasAlerta.longitude }, coordenadasUbb.coordenadas)
        return seEncuentraDentro;
    }

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
        setAlertaSeleccionada(alerta);
        setVerAlerta(true);      
    }

    return (
        <>
        {isVisibleModal ? (
            <CrearAlerta setIsVisibleModal={setIsVisibleModal} socket={socket} coordenadasAlerta={coordenadasAlerta} ubicacion={ubicacion}/>
         ):(null)} 

       {verAlerta ? (
            <Alerta setIsVisibleAlerta={setVerAlerta} socket={socket} verAlerta={alertaSeleccionada} permisos={true} />
        ) : (null)} 

        {
            verTipoAlertas ? (<TiposAlertaMapa setVerTiposAlertas={setIsVisibleTipoAlertas} />):(null)
        }
         <View style={styles.container}>
             <MapView
                provider={PROVIDER_GOOGLE}
                initialRegion={initialRegion}  
                style={styles.mapa}
                onRegionChangeComplete={(e)=> {setCoordenadasAlerta(e)}}
                moveOnMarkerPress={false}
                rotateEnabled={false}
                customMapStyle={mapStyle}
                zoomTapEnabled={false}
                //loadingEnabled={true}
                showsBuildings={false}
                showsScale={true}
                /* showsUserLocation={true}
                userLocationUpdateInterval={120000}
                userLocationPriority="high" */
                
                //onTouchEnd={(e)=>console.log("aa")}
                //onTouchStart={(e)=>console.log("aa")}
                /* showsUserLocation={true}
                userLocationUpdateInterval={1000000}
                userLocationPriority="high" */
            >
              
              { alertas !== null ? (
                    alertas.map((alerta, i) => (
                        alerta.activa === true ? (
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
                        ):(null)
                    )
                )):(null)

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
                                coordenadasAlerta.longitudeDelta < 0.006 && coordenadasAlerta.latitudeDelta < 0.006  ? (
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
              ))
            }
            </MapView>

            <Icon
                name="map-marker-alert"
                size= {70} 
                color="gray"
                style={styles.makerMapa}

            /> 

            <TouchableOpacity style={styles.botonPregunta} onPress={()=>setIsVisibleTipoAlertas(true)} >
                <IconAD 
                    name="question"
                    size={40}
                    color="#a3a2a0"
                
                />
            </TouchableOpacity> 
            
            <TouchableOpacity style={dimensionesPantalla.height < 700 ? styles.botonPlusPantallaPeque : styles.botonPlusPantallaGrand} onPress={handleClickMap}>
                <Icon
                    name="plus"
                    color="#a3a2a0"
                    size= {40}
                />
            </TouchableOpacity> 
        </View>
        </>
    )
}



