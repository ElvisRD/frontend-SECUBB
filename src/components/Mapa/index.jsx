import React,{useState, useEffect, useRef} from 'react';
import { View , Text,TouchableOpacity, Dimensions } from 'react-native';
import MapView,{Marker,PROVIDER_GOOGLE, Polygon} from 'react-native-maps';
import { Dialog, Portal, Provider, Button } from 'react-native-paper';
import ModalAlerts from "../ModalAlertas";
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
import Alerta from "../Alerta";
import TiposAlertaMapa from "./tiposAlertaMapa";
import mapStyle from "../../json/styleMap.json";
import departamentos from "../../json/depatamentosUbb.json";
import departamentoSiluetas from "../../json/departamentosSiluetas.json";
import * as geolib from 'geolib';
import  coordenadasUbb  from "../../json/coordenadasUbb";




export default function Mapa({ socket, coordenadasUsuario}) {

    const [coordenadasAlerta, setCoordenadasAlerta] = useState(null);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [verTiposAlertas, setVerTiposAlertas] = useState(false);
    const [modalAvisoAlerta, setModalAvisoAlerta] = useState(false);
    const [verAlerta, setVerAlerta] = useState(false);
    const [ubicacion, setUbicacion] = useState(null);
    const [alertaSeleccionada, setAlertaSeleccionada] = useState(null);
    const [alertas, setAlertas] = useState(null);
    const alertasRedux = useSelector(state => state.alertas.alertas)
    const notificacionRedux = useSelector(state => state.notificacion.notificacion)
    const usuarioRedux = useSelector(state => state.usuario.usuario)
    const dimensionesPantalla = Dimensions.get('window');


    const [initialRegion, _] = useState({
        latitude: -36.821884,
        longitude: -73.012440,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,

    })

    useEffect(() => {
        if(alertasRedux !== null){
            setAlertas(alertasRedux);
           
        }else{
            setAlertas(null);
        }
    }, [alertasRedux])

    useEffect(() => {

        if(notificacionRedux !== null && notificacionRedux !== undefined && usuarioRedux.notificaciones !== false){
            let mostrarNotificacion = geolib.isPointWithinRadius({latitude: notificacionRedux.latitude, longitude: notificacionRedux.longitude}, 
                {latitude: -36.82238193190107, longitude: -73.01337695114863}, 100);
                //latitude: coordenadasUsuario.coords.latitude, longitude: coordenadasUsuario.coords.longitude
                console.log(mostrarNotificacion);
            if(mostrarNotificacion){
                console.log(usuarioRedux);
                Toast.show({
                    type: 'info',
                    position: 'top',
                    text1: 'Alerta',
                    text2: 'Se creo una alerta cerca de tu ubicación',
                    visibilityTime: 4000,
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
                        text1: 'Error',
                        text2: 'Solo puedes crear alertas dentro de la UBB',
                        visibilityTime: 2000,
                    })
                }
                
           }else{

            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Error',
                text2: 'Solo puedes crear alertas mientras estes dentro de la UBB',
                visibilityTime: 2000,
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
        //-36.82238193190107, -73.01337695114863
        //latitude: coordenadasUsuario.coords.latitude, longitude: coordenadasUsuario.coords.longitude
        //latitude: coordenadasUsuario.coords.latitude, longitude: coordenadasUsuario.coords.longitude
        return seEncuentraDentro;
    }

    const soloAlertasDentroDeUbb = () => {
        let seEncuentraDentro = geolib.isPointInPolygon({ latitude: coordenadasAlerta.latitude, longitude: coordenadasAlerta.longitude }, coordenadasUbb.coordenadas)
        return seEncuentraDentro;
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

    const mostrarAlerta = (alerta) => {
        setAlertaSeleccionada(alerta);
        setVerAlerta(true);
    }


    return (
        <>
        {isVisibleModal ? (
            <ModalAlerts setIsVisibleModal={setIsVisibleModal} socket={socket} coordenadasAlerta={coordenadasAlerta} ubicacion={ubicacion}/>
         ):(null)} 

       {verAlerta ? (
            <Alerta setIsVisibleAlerta={setVerAlerta} socket={socket} verAlerta={alertaSeleccionada} />
        ) : (null)} 

        {
            verTiposAlertas ? (<TiposAlertaMapa setVerTiposAlertas={setVerTiposAlertas} />):(null)
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
                showsBuildings={false}
                showsScale={true}
                //showsMyLocationButton={true}
                
                
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

            <TouchableOpacity style={styles.botonPregunta} onPress={()=>setVerTiposAlertas(true)} >
                <IconAD 
                    name="question"
                    size={40}
                    color="white"
                
                />
            </TouchableOpacity>
            
            <TouchableOpacity style={dimensionesPantalla.height < 700 ? styles.botonPlusPantallaPeque : styles.botonPlusPantallaGrand} onPress={handleClickMap}>
                <Icon
                    name="plus"
                    color="white"
                    size= {40}
                />
            </TouchableOpacity> 

            <Provider >
                    <Portal>
                        <Dialog  visible={modalAvisoAlerta} onDismiss={()=>setModalAvisoAlerta(false)}>
                            <Dialog.Icon icon="alert" />
                            <Dialog.Title>¿Estás seguro que deseas cerrar sesión?</Dialog.Title>
                            <Dialog.Actions>
                                <Button onPress={()=>setModalAvisoAlerta(false)}>Cancelar</Button>
                                <Button onPress={()=>setModalAvisoAlerta(false)}>Confirmar</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
            </Provider>

        </View>
        
        </>

    )
            

}



