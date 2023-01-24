import React,{useState, useEffect} from "react"
import { View, Text, ScrollView } from "react-native"
import { Button, Provider, Dialog, Portal } from "react-native-paper"
import styles from "./styles"
import {eliminarSugerencia} from "../../data/sugerencias"
import { eliminarSugerenciaRedux } from "../../redux/actions/sugerenciasActions"
import {useSelector, useDispatch} from "react-redux"
import CardSugerencia from "../CardSugerencia"
import Toast from 'react-native-toast-message';
import Appbar from "../Appbar";


export default function ModalVerSugerencias({setModalVerSugerencias, socket}){
    const [sugerencias, setSugerencias] = useState(null);
    const [sugerencia, setSugerencia] = useState(null);
    const sugerenciasRedux = useSelector(state => state.sugerencias.sugerencias);
    const [modalEliminarSugerencia, setModalEliminarSugerencia] = useState(false);
    const dispatch = useDispatch();


    useEffect(() => {
        if(sugerenciasRedux !== null){
            setSugerencias(sugerenciasRedux)
        }else{
            setSugerencias(null)
        }
    }, [sugerenciasRedux]) 
    
    

   const handleEliminarSugerencia = () => {
        eliminarSugerencia(sugerencia.id).then( async ()=>{
            dispatch(eliminarSugerenciaRedux(sugerencia));
            await socket.emit("eliminarSugerencia", sugerencia);
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
            <Appbar handlePressButtonLeft={()=>{setModalVerSugerencias(false)}} iconoIzquierda="arrowleft" />
            <View style={styles.containerTitle}>
                <Text style={styles.title}>Sugerencias</Text>
            </View>
            <View style={styles.sugerencias}>
                <ScrollView style={styles.containerSugerencias}>
                    {
                        sugerencias !== null ? (
                            sugerencias.map((suge, i)=>{
                                return(
                                    <CardSugerencia key={i} sugerencia={suge} setModalEliminarSugerencia={setModalEliminarSugerencia} setSugerencia={setSugerencia}/>
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
            <Provider>
                    <Portal >
                        <Dialog visible={modalEliminarSugerencia} onDismiss={()=>setModalEliminarSugerencia(false)}>
                            <Dialog.Icon icon="alert" />
                            <Dialog.Content style={styles.containerTextoAlerta}>
                                <Text style={styles.textoAlerta}>
                                    ¿Estás seguro que deseas eliminar la sugerencia?
                                </Text>
                            </Dialog.Content>
                            <Dialog.Actions>
                            <Button onPress={()=>setModalEliminarSugerencia(false)}><Text style={styles.textoBotonAlerta}>Cancelar</Text></Button>
                            <Button onPress={handleEliminarSugerencia}><Text style={styles.textoBotonAlerta}>Confirmar</Text></Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
            </Provider>
        </View>
    );
}
