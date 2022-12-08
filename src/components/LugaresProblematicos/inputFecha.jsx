import React from "react";
import { View, TouchableOpacity, Text  } from "react-native"
import {TextInput} from "react-native-paper";
import styles from "./styles"
import DatePicker from '@react-native-community/datetimepicker';


export default function InputFecha({setAbrirCalendario, labelTextInput, valueTextInput, abrirCalendario, guardarDatosDataPicker, tipoDatePicker, tiempo}) {
    return (
        <>
            <TouchableOpacity onPress={()=>setAbrirCalendario(true)}>
                <View style={styles.containerInputFecha}>
                    <TextInput
                            label={labelTextInput}
                            mode='outlined'
                            disabled={true}
                            value={valueTextInput}
                    />

                </View>    
            </TouchableOpacity>

            {
                abrirCalendario ? (
                    <DatePicker mode={tipoDatePicker} locale="es-ES" value={new Date()} dateFormat={"day month year"} onChange={(e,date) => guardarDatosDataPicker(e,date,tiempo)} negativeButton={()=> {console.log("sal");}} />
                ):(null)
            }

        </>
    )
}