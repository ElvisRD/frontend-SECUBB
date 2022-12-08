import React,{useState,useEffect} from "react"
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import styles from "./styles"
import CardAlerta from "../CardAlerta"
import { useSelector } from "react-redux";
import IconAD from 'react-native-vector-icons/AntDesign';
import Alerta from "../Alerta"



export default function Alertas({handlePressButtons,socket}) {

    const [alertas, setAlertas] = useState([])
    const alertasRedux = useSelector(state => state.alertas.alertas)
    const [verAlerta, setVerAlerta] = useState(null)
    const [isVisibleAlerta, setIsVisibleAlerta] = useState(false);


     useEffect(() => {
        if(alertasRedux !== undefined){
            setAlertas(alertasRedux);
        }
    },[alertasRedux]) 


     

    return(
        <>
            {isVisibleAlerta ? <Alerta socket={socket} setIsVisibleAlerta={setIsVisibleAlerta} verAlerta={verAlerta} /> : null }
            <View style={styles.containerNoticias} >
                <View style={styles.containerBotonCerrar}>
                    <TouchableOpacity style={styles.botonCerrar} onPress={()=>{handlePressButtons("mapa")}}>
                        <IconAD name="close" size={30} color="black" />
                    </TouchableOpacity> 
                </View>
                <View style={styles.containerTitle}> 
                    <Text style={styles.title}>Alertas</Text>
                </View>
                <View style={styles.noticias}>
                    <ScrollView style={styles.containerNoticiasActuales} > 
                       {alertas !== undefined ? (
                            alertas.map((alerta,i) => (
                                <CardAlerta socket={socket} alerta={alerta} setIsVisibleAlerta={setIsVisibleAlerta} setVerAlerta={setVerAlerta} key={i} />
                            ))

                        ):(
                            <View style={styles.containerNoAlertas}>
                                <Text style={styles.textoNoAlertas}>No se encontraron alertas.</Text>
                            </View>
                        )}     
    
                    </ScrollView> 
                </View>  
            </View>
        </>
        
    )
}