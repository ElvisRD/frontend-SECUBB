import React,{useState, useRef} from "react"
import { View, TouchableOpacity, Text  } from "react-native"
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import IconAD from 'react-native-vector-icons/AntDesign';
import styles from "./styles"
import {Picker} from '@react-native-picker/picker';
import DatePicker from '@react-native-community/datetimepicker';
import { Button, Appbar } from "react-native-paper";
import InputFecha from "./inputFecha";
import MapaProblematico from "../MapaProblematico";


export default function ModalLugaresProblematicos({setModalLugaresProblematicos}) {

    const [valorSeleccionado, setValorSeleccionado] = useState("hola");
    const [mostrarMapa, setMostrarMapa] = useState(false);

    const [fechaInicialSeleccinada, setFechaInicialSeleccinada] = useState({
        fecha: "",
        hora: ""
    });
    const [fechaFinalSeleccinada, setFechaFinalSeleccinada] = useState({
        fecha: "",
        hora: ""
    })

    const [abrirCalendarioFechaInicial, setAbrirCalendarioFechaInicial] = useState(false);
    const [abrirCalendarioFechaFinal, setAbrirCalendarioFechaFinal] = useState(false);
    const [abrirHoraInicial, setAbrirHoraInicial] = useState(false);
    const [abrirHoraFinal, setAbrirHoraFinal] = useState(false);

    const selectList = [
    
            {label: "Lugar 1", value: "Lugar 1"},
            {label: "Lugar 2", value: "Lugar 2"},
            {label: "Lugar 3", value: "Lugar 3"}
    ]
    
    const pickerRef = useRef();

    function open() {
      pickerRef.current.focus();
    }
    
    function close() {
      pickerRef.current.blur();
    }

    const guardarFecha = (e,date,tiempo) => {

        if(e.type === "set"){
            setAbrirCalendarioFechaInicial(false);
            const mes = date.getMonth() + 1;
            const fechaCortada =  date.getDate()  + "/" + mes + "/" + date.getFullYear();

            if(tiempo === "inicial"){
                setAbrirCalendarioFechaInicial(false);
                setFechaInicialSeleccinada({...fechaInicialSeleccinada, fecha: fechaCortada})
            }else{
                setAbrirCalendarioFechaFinal(false);
                setFechaFinalSeleccinada({...fechaFinalSeleccinada, fecha: fechaCortada})
            }
           
        }else{
            if(tiempo === "inicial"){
                setAbrirCalendarioFechaInicial(false);
            }else{
                setAbrirCalendarioFechaFinal(false);
            }
        }

    }

    const guardarHora = (e,hora,tiempo) => {
        if(e.type === "set"){
            setAbrirHoraInicial(false);
            const horaCortada = hora.toString().split(" ")[4];
            
            if(tiempo === "inicial"){
                setAbrirHoraInicial(false);
                setFechaInicialSeleccinada({...fechaInicialSeleccinada, hora: horaCortada})
            }else{
                setAbrirHoraFinal(false);
                setFechaFinalSeleccinada({...fechaFinalSeleccinada, hora: horaCortada})
            }
            
        }else{
           if(tiempo === "inicial"){
                setAbrirHoraInicial(false);
            }else{
                setAbrirHoraInicial(false);
            }
        }
    }

    
    return (
        <> 
        {
            mostrarMapa ? <MapaProblematico setMostrarMapa={setMostrarMapa} /> : null
        }

         <View style={styles.containerModalLugaresProblematicos}>
             <KeyboardAwareScrollView bounces={false} style={styles.modalLugaresProblematicos}>
                <Appbar.Header>
                    <Appbar.Action animated={false} style={styles.botonCerrar} onPress={()=>{setModalLugaresProblematicos(false)}} icon={props => <IconAD name="arrowleft" size={35} color="black" />} />
                </Appbar.Header>
                <View style={styles.containerTitle}>
                    <Text style={styles.title}>Lugares Problematicos</Text>
                </View>
                
                <View  style={styles.containerLugares}>
                    <Text style={styles.tituloSelect}>Tipo de alerta</Text>
                    
                    <Picker
                        style={styles.select}
                        ref={pickerRef}
                        selectedValue={valorSeleccionado}
                        onValueChange={(itemValue, itemIndex) =>
                                setValorSeleccionado(itemValue)
                        }>
                        <Picker.Item label="Java" value="java" />
                        <Picker.Item label="JavaScript" value="js" />
                    </Picker>
  
                </View >
                <View style={styles.containerInputFechas}>
                    <View style={styles.containerTituloFecha}>
                        <Text style={styles.tituloFecha}>Fecha inicial</Text>
                    </View>
                    <View style={styles.containerFechaInicio}>

                        <InputFecha 
                            setAbrirCalendario={setAbrirCalendarioFechaInicial}
                            labelTextInput="Fecha inicial"
                            valueTextInput={fechaInicialSeleccinada.fecha}
                            abrirCalendario={abrirCalendarioFechaInicial}
                            guardarDatosDataPicker={guardarFecha}
                            tipoDatePicker="date"
                            tiempo="inicial"
                        
                        />
                       
                       <InputFecha 
                            setAbrirCalendario={setAbrirHoraInicial}
                            labelTextInput="Hora inicial"
                            valueTextInput={fechaInicialSeleccinada.hora}
                            abrirCalendario={abrirHoraInicial}
                            guardarDatosDataPicker={guardarHora}
                            tipoDatePicker="time"
                            tiempo="inicial"
                       
                       />
                        
                    </View>
                    <View style={styles.containerTituloFecha}>
                        <Text style={styles.tituloFecha}>Fecha final</Text>
                    </View>
                    <View style={styles.containerFechaFinal}>
                        <InputFecha 
                                setAbrirCalendario={setAbrirCalendarioFechaFinal}
                                labelTextInput="Fecha final"
                                valueTextInput={fechaFinalSeleccinada.fecha}
                                abrirCalendario={abrirCalendarioFechaFinal}
                                guardarDatosDataPicker={guardarFecha}
                                tipoDatePicker="date"
                                tiempo="final"    
                        />

                        <InputFecha 
                                setAbrirCalendario={setAbrirHoraFinal}
                                labelTextInput="Hora final"
                                valueTextInput={fechaFinalSeleccinada.hora}
                                abrirCalendario={abrirHoraFinal}
                                guardarDatosDataPicker={guardarHora}
                                tipoDatePicker="time"
                                tiempo="final"  
                        />
                       

                    </View>
                </View>
                <View style={styles.containerBotonMostrarLugares}>
                    <Button mode="elevated" onPress={()=>{setMostrarMapa(true)}}>
                        Mostrar mapa
                    </Button>
                </View>
            </KeyboardAwareScrollView>  
        </View>
        </>

       
    )
}