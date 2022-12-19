import React,{useEffect, useState} from "react"
import { View, Text, StyleSheet, TouchableOpacity  } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconAD from 'react-native-vector-icons/AntDesign';
import styles from "./styles"
import ModalReportarAlerta from "../ModalReportarAlerta";
import { Appbar } from 'react-native-paper';


export default function ModalAlertas({setIsVisibleModal,socket,coordenadasAlerta,ubicacion}){

    const [modalReportar, setModalReportar] = useState(false);
    const [tipoAlerta, setTipoAlerta] = useState("");


    const clickAlerta = (tipo) => {
        setTipoAlerta(tipo)
        setModalReportar(true);
    }
    
    return( 

        <>
          {modalReportar ? 
            <ModalReportarAlerta tipoAlerta={tipoAlerta} setModalReportar={setModalReportar} setIsVisibleModal={setIsVisibleModal}  
            socket={socket} coordenadasAlerta={coordenadasAlerta} ubicacion={ubicacion}/>
           :(null)} 

            <View style={styles.containerModal}>
                        <Appbar.Header style={styles.containerNav} >
                            <Appbar.Content style={styles.containerTitle} titleStyle={styles.title} title="Alertas" />
                            <Appbar.Action animated={false} style={styles.botonCerrar} onPress={()=>{setIsVisibleModal(false)}} icon={props => <IconAD name="close" size={35} color="black" />} />
                        </Appbar.Header>
                        <View  style={styles.containerBotonesAlerta}>
                            <View style={styles.fila}>
                                <View style={styles.containerAlerta}>
                                    <TouchableOpacity style={styles.alertaLuz} onPress={()=>{clickAlerta("Problema de iluminación")}}>
                                        <Icon
                                            name="lightbulb"
                                            size= {40}
                                        />
                                    </TouchableOpacity>
                                    <Text style={styles.textAlertas}>Problemas de iluminación</Text>
                                </View>
                                
                                <View style={styles.containerAlerta}>
                                    <TouchableOpacity style={styles.alertaSospechoso} onPress={()=>{clickAlerta("Actividad sospechosa")}} >
                                            <Icon
                                                name="user-secret"
                                                size={40}
                                            />
                                    </TouchableOpacity>
                                    <Text style={styles.textAlertas}>Actividad sospechosa</Text>
                                </View> 
                            </View>
                            <View style={styles.fila}>
                                <View style={styles.containerAlerta}>
                                    <TouchableOpacity style={styles.alertaPerros} onPress={()=>{clickAlerta("Perros rondando")}}>
                                                <Icon
                                                    name="dog"
                                                    size={40}
                                                />
                                        </TouchableOpacity>
                                        <Text style={styles.textAlertas}>Perros rondando</Text>

                                </View>
                                <View style={styles.containerAlerta}>
                                    <TouchableOpacity style={styles.alertaEmergencia} onPress={()=>{clickAlerta("Emergencia de salud")}}>
                                            <Icon
                                                name="briefcase-medical"
                                                size={40}
                                            />
                                    </TouchableOpacity>
                                    <Text style={styles.textAlertas}>Emergencia de salud</Text>
                                </View>
                            </View> 
                            <View style={styles.fila}>
                                <View style={styles.containerAlerta}>
                                        <TouchableOpacity style={styles.alertaEmergencia} onPress={()=>{clickAlerta("Consumo de drogas")}}>
                                                <Icon
                                                    name="cannabis"
                                                    size={40}
                                                />
                                        </TouchableOpacity>
                                        <Text style={styles.textAlertas} >Consumo de drogas</Text>

                                </View>
                                <View style={styles.containerAlerta}></View>
                            </View> 

                    </View>         
                </View>
        </>
        
    )
}

