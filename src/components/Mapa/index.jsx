import React,{useState, useEffect} from 'react';
import { View, StyleSheet, Text,TouchableOpacity } from 'react-native';
import MapView,{Marker,PROVIDER_GOOGLE} from 'react-native-maps';
import { Dialog, Portal, Provider, Button } from 'react-native-paper';
import ModalAlerts from "../ModalAlertas";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconAD from 'react-native-vector-icons/AntDesign';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import styles from "./styles"
import { useSelector } from 'react-redux';
import Alerta from "../Alerta";
import TiposAlertaMapa from "./tiposAlertaMapa";




export default function Mapa({ setPortadaVisible, socket}) {

    const [coordenadasAlerta, setCoordenadasAlerta] = useState(null);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [verTiposAlertas, setVerTiposAlertas] = useState(false);
    const [modalAvisoAlerta, setModalAvisoAlerta] = useState(false);
    const [verAlerta, setVerAlerta] = useState(false);
    const [alertaSeleccionada, setAlertaSeleccionada] = useState(null);
    const [alertas, setAlertas] = useState(null);
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

    useEffect(() => {
        if(alertasRedux !== null){
            setAlertas(alertasRedux);
        }else{
            setAlertas(null);
        }
    }, [alertasRedux])
    
    

    /* const [spinner, setSpinner] = useState(false); */

    /* useEffect(() => {
      socket.on("alerta", (alert) => {
       
      })
    }, []) */
 
    
    
    
    const handleClickMap = async () => {

        let encontreAlerta = false;
        setModalAvisoAlerta(true);
        if(coordenadasAlerta === null){

            if(alertasRedux !== null){
                for(let i = 0; i < alertasRedux.length; i++){
                    if(alertasRedux[i].latitude === initialRegion.latitude && alertasRedux[i].longitude === initialRegion.longitude){
                        console.log("encontre alerta");
                        
                        encontreAlerta = true;
                        break;
                    }
                }
    
                if(!encontreAlerta){
                    setCoordenadasAlerta(initialRegion);
                    setIsVisibleModal(true);
                }
            }else{
                setCoordenadasAlerta(initialRegion);
                setIsVisibleModal(true);
            }

        }else{
            setIsVisibleModal(true);
        }

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
            <ModalAlerts setIsVisibleModal={setIsVisibleModal} socket={socket} coordenadasAlerta={coordenadasAlerta}/>
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
                onRegionChangeComplete={(e)=>{setCoordenadasAlerta(e)}}
                moveOnMarkerPress={false}
                rotateEnabled={false}
                /* showsUserLocation={true}
                userLocationUpdateInterval={1000000}
                userLocationPriority="high" */
            >
              
              { alertas !== null ? (
                    alertas.map((alerta, i) => (
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
                    )
                )):(null)
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
            
            <TouchableOpacity style={styles.boton} onPress={handleClickMap}>
                <Icon
                    name="plus"
                    color="white"
                    size= {40}
                />
            </TouchableOpacity> 

            <Provider style={{zIndex: 30}}>
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



