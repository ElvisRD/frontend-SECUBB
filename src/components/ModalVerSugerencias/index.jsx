import React,{useState, useEffect} from "react"
import { View, Text, ScrollView } from "react-native"
import { Button, Appbar, Provider, Dialog, Portal } from "react-native-paper"
import styles from "./styles"
import {eliminarSugerencia} from "../../data/sugerencias"
import { eliminarSugerenciaRedux } from "../../redux/actions/sugerenciasActions"
import {useSelector, useDispatch} from "react-redux"
import CardSugerencia from "../CardSugerencia"
import IconAD from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-toast-message';


export default function ModalVerSugerencias({setModalVerSugerencias, socket}){
    const [sugerencias, setSugerencias] = useState(null);
    const [sugerencia, setSugerencia] = useState(null);
    const sugerenciasRedux = useSelector(state => state.sugerencias.sugerencias);
    const [modalEliminarSugerencia, setModalEliminarSugerencia] = useState(false);
    const dispatch = useDispatch();


    useEffect(() => {
        if(sugerenciasRedux !== null){
            setSugerencias(sugerenciasRedux)
        }
    }, [sugerenciasRedux]) 
    
    

   const handleEliminarSugerencia = () => {
        eliminarSugerencia(sugerencia.id).then( async ()=>{
            
            await socket.emit("eliminarSugerencia", sugerencia);
            dispatch(eliminarSugerenciaRedux(sugerencia));
            setModalEliminarSugerencia(false);

            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'La sugerencia fue eliminada correctamente',
                visibilityTime: 2000,
            });

        }).catch((err)=>{
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'La sugerencia no pudo ser eliminada',
                visibilityTime: 2000,
            }); 
        }) 

    } 

   
    return(
        <View style={styles.containerModalVerSugerencias}>
            <Appbar.Header style={styles.containerNav}>
                <Appbar.Action animated={false} style={styles.botonVolver} onPress={()=>{setModalVerSugerencias(false)}} icon={props => <IconAD name="arrowleft" size={35} color="black" />} />
                {/* se puede poner el boton para cerrar y volver al mapa */}
            </Appbar.Header>
            <View style={styles.containerTitle}>
                <Text style={styles.title}>Sugerencias</Text>
            </View>
            <View style={styles.sugerencias}>
                <ScrollView style={styles.containerSugerencias}>
                    {
                        sugerencias !== null ? (
                            sugerencias.map((sugerencia, i)=>{
                                return(
                                    <CardSugerencia key={i} sugerencia={sugerencia} setModalEliminarSugerencia={setModalEliminarSugerencia} setSugerencia={setSugerencia}/>
                                )
                            })
                        ):(
                            <View style={styles.containerNoSugerencias}>
                                <Text style={styles.textoNoSugerencias}>No hay sugerencias.</Text>
                            </View>
                        )
                    }

                </ScrollView>
            </View>
            <Provider >
                    <Portal>
                        <Dialog visible={modalEliminarSugerencia} onDismiss={()=>setModalEliminarSugerencia(false)}>
                            <Dialog.Icon icon="alert" />
                            <Dialog.Title>¿Estás seguro que deseas eliminar la sugerencia?</Dialog.Title>
                            <Dialog.Actions>
                            <Button onPress={()=>setModalEliminarSugerencia(false)}>Cancelar</Button>
                            <Button onPress={handleEliminarSugerencia}>Confirmar</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
            </Provider>
        </View>
    );
}
