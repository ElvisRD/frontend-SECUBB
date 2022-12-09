import React,{useEffect, useState} from "react"
import { View, Text, TouchableOpacity, Image } from "react-native"
import { TextInput, Button,Appbar } from 'react-native-paper';
import {KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconAD from 'react-native-vector-icons/AntDesign';
import styles from "./styles";
import { Formik } from "formik";
import Camara from "../Camara"
import {crearAlerta} from "../../data/alertas"
import {useDispatch, useSelector} from "react-redux"
import { guardarAlertaRedux } from "../../redux/actions/alertasActions";
import validaciones from "./validaciones";
import {guardarImagen} from "../../data/imagenes"



export default function ModalReportarAlerta({tipoAlerta, setModalReportar,setIsVisibleModal, socket, coordenadasAlerta}){
    const [visibleCamara, setVisibleCamara] = useState(false);
    const [imagen, setImagen] = useState("");
    const usuarioRedux = useSelector(state => state.usuario.usuario);
    const dispatch = useDispatch();
    
    const valoresIniciales = {
      tipo: tipoAlerta,
      descripcion: "",
      latitude: 0,
      longitude: 0,
      ubicacion: ""
    }
    
    return(
      <>
        {visibleCamara ? <Camara setVisibleCamara={setVisibleCamara} setImagen={setImagen} /> : (null)}

        <View style={styles.containerModalReportar}>
          <KeyboardAwareScrollView bounces={false} style={styles.ModalReportarAlerta}>
          <Appbar.Header >
                <Appbar.Action animated={false} style={styles.botonCerrar} onPress={()=>{setIsVisibleModal(false)}} icon={props => <IconAD name="arrowleft" size={35} color="black" />} />
          </Appbar.Header>
          <View style={styles.containerTitle}>
            <Text style={styles.title}>Crear alerta</Text>
          </View>
            <Formik
                  initialValues={valoresIniciales} 
                  validationSchema={validaciones}
                  onSubmit={async (values) => {

                    values.longitude = coordenadasAlerta.longitude
                    values.latitude = coordenadasAlerta.latitude

                    

                    const body = {
                      tipo: values.tipo,
                      descripcion: values.descripcion,
                      ubicacion: values.ubicacion,
                      latitude: values.latitude,
                      longitude: values.longitude,
                      activa: true,
                      usuarioId: usuarioRedux.id
                      
                    }        
                          
                    let nuevaAlerta = null;

                    await crearAlerta(body).then((result) => {
                      nuevaAlerta=result.alerta
                    }).catch((err) => {
                      console.log(err);
                    }); 

                    let tiposinEspacios = values.tipo.replace(/ /g,"_");

                    if(imagen !== ""){

                      const data = new FormData();

                      data.append('archivo', {
                      uri: imagen,
                      type: 'image/jpeg',
                      name: 'imagen.jpg',
                      });
                     
                      guardarImagen(nuevaAlerta.id, data, tiposinEspacios).then((result) => {
                        console.log(result);
                      }).catch((err) => {
                        console.log(err);
                      }); 
                    }    
                    
                    await socket.emit("alerta", nuevaAlerta);

                    dispatch(guardarAlertaRedux(nuevaAlerta));
                  
                    setModalReportar(false);
                   
                    setImagen("");
                    setIsVisibleModal(false);
   
                  }} 
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <>
                <View style={styles.containerInputsModal}>
                  <View style={styles.containerInputs}>
                    <TextInput mode="outlined" label="Tipo alerta" value={values.tipo} disabled/>
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