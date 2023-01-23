import React,{useState} from "react"
import { View, Text, TouchableOpacity  } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from "./styles"
import ModalReportarAlerta from "../ReportarAlerta";
import Appbar from "../Appbar";


export default function CrearAlerta({setIsVisibleModal,socket,coordenadasAlerta,ubicacion}){

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
                        <Appbar titulo="Alertas" handlePressButtonRight={()=>{setIsVisibleModal(false)}} iconoDerecha="close" />
                        <View  style={styles.containerBotonesAlerta}>
                            <View style={styles.fila}>
                                <View style={styles.containerAlerta}>
                                    <TouchableOpacity style={styles.alertaLuz} onPress={()=>{clickAlerta("Falla de iluminacion")}}>
                                        <Icon
                                            name="lightbulb"
                                            size= {35}
                                        />
                                    </TouchableOpacity>
                                    <Text style={styles.textAlertas}>Falla de iluminación</Text>
                                </View>
                                
                                <View style={styles.containerAlerta}>
                                    <TouchableOpacity style={styles.alertaSospechoso} onPress={()=>{clickAlerta("Persona sospechosa")}} >
                                            <Icon
                                                name="user-secret"
                                                size={35}
                                            />
                                    </TouchableOpacity>
                                    <Text style={styles.textAlertas}>Persona sospechosa</Text>
                                </View> 
                            </View>
                            <View style={styles.fila}>
                                <View style={styles.containerAlerta}>
                                    <TouchableOpacity style={styles.alertaActividadSospechosa} onPress={()=>{clickAlerta("Actividad sospechosa")}}>
                                                <Icon
                                                    name="shoe-prints"
                                                    size={33}
                                                />
                                        </TouchableOpacity>
                                        <Text style={styles.textAlertas}>Actividad sospechosa</Text>

                                </View>
                                <View style={styles.containerAlerta}>
                                    <TouchableOpacity style={styles.alertaEscasaIluminacion} onPress={()=>{clickAlerta("Lugar con escasa iluminacion")}}>
                                            <Icon
                                                name="low-vision"
                                                size={33}
                                            />
                                    </TouchableOpacity>
                                    <Text style={styles.textAlertas}>Lugar con escasa iluminación</Text>
                                </View>
                            </View> 
                            <View style={styles.fila}>
                                <View style={styles.containerAlerta}>
                                        <TouchableOpacity style={styles.alertaRobo} onPress={()=>{clickAlerta("Incidente de robo")}}>
                                                <Icon
                                                    name="running"
                                                    size={33}
                                                />
                                        </TouchableOpacity>
                                        <Text style={styles.textAlertas}>Incidente de robo</Text>
                                        <Text></Text>
                                </View>
                                <View style={styles.containerAlerta}>
                                    <TouchableOpacity style={styles.alertaViolencia} onPress={()=>{clickAlerta("Incidente de violencia")}}>
                                            <Icon
                                                name="user-injured"
                                                size={32}
                                            />
                                    </TouchableOpacity>
                                    <Text style={styles.textAlertas}>Incidente de violencia</Text>
                                </View>
                            </View> 

                    </View>         
                </View>
        </>
        
    )
}

