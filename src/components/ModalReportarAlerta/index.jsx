import React,{useEffect, useState} from "react"
import { View, Text, TouchableOpacity, Image } from "react-native"
import { TextInput, Button } from 'react-native-paper';
import {KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconAD from 'react-native-vector-icons/AntDesign';
import styles from "./styles";
import { Formik } from "formik";
import Camara from "../Camara"
import axios from 'axios';
import validaciones from "./validaciones";

export default function ModalReportarAlerta({tipoAlerta, setModalReportar,setIsVisibleModal, socket, coordenadasAlerta}){
    const [visibleCamara, setVisibleCamara] = useState(false);
    const [imagen, setImagen] = useState("");
    
    const valoresIniciales = {
      tipo: tipoAlerta,
      descripcion: "",
      latitude: 0,
      longitude: 0,
      ubicacion: "",
      imagen: "",
      fecha: "",
      hora: ""
    }
    
    return(
      <>
        {visibleCamara ? <Camara setVisibleCamara={setVisibleCamara} setImagen={setImagen} /> : (null)}

        <View style={styles.containerModalReportar}>
          <KeyboardAwareScrollView bounces={false} style={styles.ModalReportarAlerta}>
          <View style={styles.containerBotonCerrar}>
                  <TouchableOpacity style={styles.botonCerrar} onPress={()=>{setModalReportar(false)}}>
                      <IconAD 
                          name='arrowleft'
                          color='black'
                          size={40}
                      />
                  </TouchableOpacity> 
            </View>
            <Formik
                  initialValues={valoresIniciales} 
                  validationSchema={validaciones}
                  onSubmit={async (values) => {

                    values.imagen=imagen;
                    
                    let today = new Date();

                    let fecha=today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear();
                    let hora = today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();

                    values.fecha=fecha;
                    values.hora=hora;

                    values.longitude = coordenadasAlerta.longitude
                    values.latitude = coordenadasAlerta.latitude

                    const body = {
                      tipo: values.tipo,
                      descripcion: values.descripcion,
                      ubicacion: values.ubicacion,
                      imagen: values.imagen,
                      latitude: values.latitude,
                      longitude: values.longitude,
                      hora: values.hora,
                      fecha: values.fecha,
                      activa: true,
                      usuarioId: 1
                      
                    }



                    try{
                      await axios.post('http://10.3.3.49:3002/api/alerta',body) //http://192.168.50.16:3002/api/alerta
                    }catch(er){
                      console.log(er);
                    }

                    socket.emit("alerta", values)

                    setModalReportar(false);
                    setIsVisibleModal(false);
   
                  }} 
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <>
                <View style={styles.containerInputsModal}>
                  <View style={styles.containerInputs}>
                    <TextInput mode="outlined" label="Tipo alerta" value={values.tipoAlerta} disabled/>
                  </View>
                  
                  
                  <View style={styles.containerInputs}>
                    <TextInput mode="outlined" label="Ubicación" multiline={true} numberOfLines={4} onBlur={handleBlur('ubicacion')} value={values.ubicacion} onChangeText={handleChange('ubicacion')}/>
                  </View>
                  {errors.ubicacion && touched.ubicacion? 
                  (
                    <View style={styles.containerError}>
                      <Text style={styles.textoError} >{errors.ubicacion}</Text>
                    </View>
                  ):(null)
                  }
                  <View style={styles.containerInputs}>
                    <TextInput mode="outlined" label="Descripción" multiline={true} onBlur={handleBlur('descripcion')} numberOfLines={6} value={values.descripcion} onChangeText={handleChange('descripcion')} />
                  </View>
                  {errors.descripcion && touched.descripcion ? 
                  (
                    <View style={styles.containerError}>
                      <Text style={styles.textoError}>{errors.descripcion}</Text>
                    </View>
                  ):(null)
                  }
                </View>
                  {
                    imagen !== "" ? (
                      <View style={styles.containerFoto}>
                        <Image source={{uri: imagen}} style={styles.foto}/>
                      </View>
                    ):(null)
                  }

                  <View style={styles.containerFotoYBoton}>
                    <View style={styles.containerBotonFoto}>
                      <TouchableOpacity style={styles.botonFoto} onPress={()=>{setVisibleCamara(true)}}>
                        <Icon 
                          name="add-photo-alternate"
                          size={30}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.containerBotonCrearAlerta}>
                        <Button mode="contained" style={styles.botonCrearAlerta} onPress={handleSubmit}>
                          Crear alerta
                        </Button>
                    </View>
                  </View>              
              </>
              
                )}
            </Formik>
          </KeyboardAwareScrollView>
        </View>
      </>

        
    )
}