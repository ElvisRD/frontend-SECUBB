import React,{useState, useRef} from "react"
import { View, Text  } from "react-native"
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import styles from "./styles"
import {Picker} from '@react-native-picker/picker';
import { Button, Dialog, Portal, Provider } from 'react-native-paper';
import {obtenerAlertasPorFechaYTipo} from "../../data/alertas";
import InputFecha from "./inputFecha";
import MapaProblematico from "../MapaProblematico";
import Appbar from "../Appbar";
import { Toast } from "react-native-toast-message/lib/src/Toast";


export default function GenerarReporte({setModalLugaresProblematicos}) {

    const [valorSeleccionado, setValorSeleccionado] = useState("Problemas de iluminación");
    const [mostrarMapa, setMostrarMapa] = useState(false);
    const [alertas, setAlertas] = useState(null);
    const [visibleAlertaFaltaDatos, setVisibleAlertaFaltaDatos] = useState(false);
    const [visibleAlertaInicialMayor, setVisibleAlertaInicialMayor] = useState(false);
    

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

    const obtenerAlertas = () => {
        
        if(fechaInicialSeleccinada.fecha === "" || fechaInicialSeleccinada.hora === "" || fechaFinalSeleccinada.fecha === "" || fechaFinalSeleccinada.hora === ""){
            setVisibleAlertaFaltaDatos(true);
        }else{
            const fechaInicialDividida = fechaInicialSeleccinada.fecha.split("/");
            const fechaFinalDividida = fechaFinalSeleccinada.fecha.split("/");
           
           
            if(parseInt(fechaInicialDividida[0])<10){
                fechaInicialDividida[0] = "0" + fechaInicialDividida[0];
            }
            if(parseInt(fechaInicialDividida[1])<10){
                fechaInicialDividida[1] = "0" + fechaInicialDividida[1];
            }

            if(parseInt(fechaFinalDividida[0])<10){
                fechaFinalDividida[0] = "0" + fechaFinalDividida[0];
            }
            if(parseInt(fechaFinalDividida[1])<10){
                fechaFinalDividida[1] = "0" + fechaFinalDividida[1];
            }

            const fechaInicialModificada = fechaInicialDividida[2] + "-" + fechaInicialDividida[1] + "-" + fechaInicialDividida[0]+"T"+fechaInicialSeleccinada.hora+".000Z";
            const fechaFinalModificada = fechaFinalDividida[2] + "-" + fechaFinalDividida[1] + "-" + fechaFinalDividida[0]+"T"+fechaFinalSeleccinada.hora+".000Z";
            valorSeleccionado.replace(" ","%20");

            if(fechaInicialDividida > fechaFinalDividida){
                setVisibleAlertaInicialMayor(true)
                return null;
            }

            obtenerAlertasPorFechaYTipo(valorSeleccionado,fechaInicialModificada,fechaFinalModificada).then((result) => {
                setAlertas(result);
                setMostrarMapa(true);
            }).catch((err) => {
                if(err.response.status === 404){
                    Toast.show({
                        type: "error",
                        position: "top",
                        text1: "No se encontraron alertas",
                        visibilityTime: 3000,
                    })
                }else{
                    console.log("ocurrio un error al obtener las alertas");
                }
            });

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
            mostrarMapa ? <MapaProblematico setMostrarMapa={setMostrarMapa} alertas={alertas} /> : null
        }

         <View style={styles.containerModalLugaresProblematicos}>
             <KeyboardAwareScrollView bounces={false} style={styles.modalLugaresProblematicos}>
                <Appbar handlePressButtonLeft={()=>{setModalLugaresProblematicos(false)}} iconoIzquierda="arrowleft" />
                <View style={styles.containerTitle}>
                    <Text style={styles.title}>Generar GenerarReporte</Text>
                </View>
                
                <View  style={styles.containerLugares}>
                    <Text style={styles.tituloSelect}>Tipo de alerta</Text>
                    <Picker
                        style={styles.select}
                        ref={pickerRef}
                        selectedValue={valorSeleccionado}
                        onValueChange={(itemValue) => setValorSeleccionado(itemValue)}
                    >
                        <Picker.Item label="Problemas de iluminación" value= "Problemas de iluminación" />
                        <Picker.Item label="Actividad sospechosa" value="Actividad sospechosa" />
                        <Picker.Item label="Perros rondando" value="Perros rondando" />
                        <Picker.Item label="Emergencia de salud" value="Emergencia de salud" />
                        <Picker.Item label="Consumo de drogas" value="Consumo de drogas" />
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
                            diaMaximo={new Date()}
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
                                diaMaximo={new Date()}  
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
                    <Button style={styles.botonMostrarMapa} mode="elevated" onPress={obtenerAlertas}>
                       <Text style={styles.textoBoton}>Mostrar mapa</Text> 
                    </Button>
                </View>
            </KeyboardAwareScrollView>  
            <Provider >
                    <Portal>
                        <Dialog visible={visibleAlertaFaltaDatos} onDismiss={()=>setVisibleAlertaFaltaDatos(false)}>
                            <Dialog.Icon icon="alert-circle-outline" />
                            <Dialog.Title>
                                <Text style={styles.textoAlerta}>Por favor, rellene las fechas y horas.</Text>
                            </Dialog.Title>
                            <Dialog.Actions>
                                <Button onPress={()=>setVisibleAlertaFaltaDatos(false)}>
                                    <Text style={styles.textoBotonAlerta}>Volver</Text>
                                </Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
            </Provider>

            <Provider >
                    <Portal>
                        <Dialog visible={visibleAlertaInicialMayor} onDismiss={()=>setVisibleAlertaInicialMayor(false)}>
                            <Dialog.Icon icon="alert-circle-outline" />
                            <Dialog.Title>
                                <Text style={styles.textoAlerta}>La fecha inicial no puede ser mayor a la fecha final.</Text>
                            </Dialog.Title>
                            <Dialog.Actions>
                                <Button onPress={()=>setVisibleAlertaInicialMayor(false)}>
                                    <Text style={styles.textoBotonAlerta}>Volver</Text>
                                </Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
            </Provider>
        </View>
        </>

       
    )
}