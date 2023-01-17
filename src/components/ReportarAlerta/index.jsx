import React,{useState} from "react"
import { View, Text, TouchableOpacity, Image, Linking } from "react-native"
import { TextInput, Button, Provider, Portal, Dialog } from 'react-native-paper';
import {KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from "./styles";
import { Formik } from "formik";
import Camara from "../Camara"
import {crearAlerta} from "../../data/alertas"
import {useDispatch, useSelector} from "react-redux"
import { guardarAlertaRedux } from "../../redux/actions/alertasActions";
import {validacionReportarAlerta} from "../../utils/validaciones"
import {guardarImagen} from "../../data/imagenes"
import Toast from 'react-native-toast-message';
import {Camera} from "expo-camera"
import Cargando from "../Cargando"
import Appbar from "../Appbar";
import formatText from "../../utils/modificarPrimeraLetra";



export default function ReportarAlerta({tipoAlerta, setModalReportar,setIsVisibleModal, socket, coordenadasAlerta, ubicacion}){
    const [visibleCamara, setVisibleCamara] = useState(false);
    const [imagen, setImagen] = useState("");
    const usuarioRedux = useSelector(state => state.usuario.usuario);
    const dispatch = useDispatch();
    const [permisoCamara, setPermisoCamara] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const valoresIniciales = {
      tipo: tipoAlerta,
      descripcion: "",
      ubicacion: ubicacion,
      latitude: 0,
      longitude: 0,
      descripcion_ubicacion: ""
    }
  
    const handleBotonImagen = async () => {
      setLoading(true)
      const {status} = await Camera.requestCameraPermissionsAsync()
      
      if(status !== "granted"){
        setPermisoCamara(true);
      }else{
        setVisibleCamara(true);
        setPermisoCamara(false);
      }
      setLoading(false)
    }
    
    return(
      <>
        {loading ? <Cargando/> : (null)}
        {visibleCamara ? <Camara setVisibleCamara={setVisibleCamara} setImagen={setImagen} setLoading={setLoading}/> : (null)}

        <View style={styles.containerModalReportar}>
          <Appbar handlePressButtonLeft={()=>{setModalReportar(false)}} iconoIzquierda="arrowleft" />
          <KeyboardAwareScrollView bounces={false} style={styles.ModalReportarAlerta}>
          
          <View style={styles.containerTitle}>
            <Text style={styles.title}>Crear alerta</Text>
          </View>
            <Formik
                  initialValues={valoresIniciales} 
                  validationSchema={validacionReportarAlerta}
                  onSubmit={async (values) => {

                    values.longitude = coordenadasAlerta.longitude
                    values.latitude = coordenadasAlerta.latitude
                    
                    const body = {
                      tipo: values.tipo,
                      descripcion: formatText(values.descripcion),
                      ubicacion: values.ubicacion,
                      descripcion_ubicacion: formatText(values.descripcion_ubicacion),
                      latitude: values.latitude,
                      longitude: values.longitude,
                      usuarioId: usuarioRedux.id
                      
                    }     

                    let nuevaAlerta = null;
                    setLoading(true);
                   
                      await crearAlerta(body).then((result) => {
                      nuevaAlerta=result.alerta
                      Toast.show({
                          type: 'success',
                          position: 'top',
                          text1: 'La alerta fue creada con éxito',
                          visibilityTime: 3000,
                        });
                      }).catch((err) => {
                        Toast.show({
                          type: 'error',
                          position: 'top',
                          text1: 'Error al crear la alerta',
                          visibilityTime: 3000,
                        });; 
                      }); 

                    setLoading(false); 

                     let tipoSinEspacios = values.tipo.replace(/ /g,"_");

                    if(imagen !== ""){

                      const data = new FormData();

                      data.append('archivo', {
                        uri: imagen,
                        type: 'image/jpeg',
                        name: 'imagen.jpg',
                      });
                     
                      guardarImagen(nuevaAlerta.id, data, tipoSinEspacios).then(() => {
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
                    <TextInput mode="outlined" label="Ubicación" multiline={true} numberOfLines={1} value={values.ubicacion} disabled/>
                  </View>

                  <View style={styles.containerInputs}>
                    <TextInput mode="outlined" style={styles.inputs} outlineColor="#E5E5E5" activeOutlineColor="gray" label="Descripción ubicación" multiline={true} numberOfLines={4} maxLength={200} onBlur={handleBlur('descripcion_ubicacion')} value={values.descripcion_ubicacion} onChangeText={handleChange('descripcion_ubicacion')}/>
                  </View>
                  {errors.descripcion_ubicacion && touched.descripcion_ubicacion? 
                  (
                    <View style={styles.containerError}>
                      <Text style={styles.textoError} >{errors.descripcion_ubicacion}</Text>
                    </View>
                  ):(null)
                  }
                  <View style={styles.containerInputs}>
                    <TextInput mode="outlined" style={styles.inputs} outlineColor="#E5E5E5" activeOutlineColor="gray" label="Descripción" maxLength={200} multiline={true} onBlur={handleBlur('descripcion')} numberOfLines={6} value={values.descripcion} onChangeText={handleChange('descripcion')} />
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
                      <TouchableOpacity style={styles.botonFoto} onPress={handleBotonImagen}>
                        <Icon 
                          name="add-photo-alternate"
                          color="gray"
                          size={30}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.containerBotonCrearAlerta}>
                        <Button mode="contained" style={styles.botonCrearAlerta} buttonColor="#01579b" onPress={handleSubmit}>
                          Crear alerta
                        </Button>
                    </View>
                  </View>              
              </>
              
                )}
            </Formik>
          </KeyboardAwareScrollView>

          <Provider>
                    <Portal>
                        <Dialog  visible={permisoCamara} dismissable={false} >
                            <Dialog.Icon icon="alert" />
                            <Dialog.Content style={styles.containerTituloAlerta}><Text style={styles.tituloAlerta}>Permiso de Cámara</Text></Dialog.Content>
                            <Dialog.Content style={styles.containerTextoAlerta}>
                              <Text style={styles.textoAlerta}>Para el uso de la cámara, es necesario que se active el permiso en configuración, si usted rechaza este permiso, no podrá acceder a la cámara.</Text>
                            </Dialog.Content>
                            <Dialog.Actions style={styles.containerBotonAlerta}>
                                <Button onPress={()=>setPermisoCamara(false)}><Text style={styles.textoBotonAlerta}>Rechazar</Text></Button>
                                <Button onPress={() => Linking.openSettings()}><Text style={styles.textoBotonAlerta}>ir a Configuración</Text></Button>
                                <Button onPress={handleBotonImagen}><Text style={styles.textoBotonAlerta}>Verificar</Text></Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
          </Provider>
        </View> 
      </>

        
    )
}