import React,{useState} from "react"
import { View, Text, TouchableOpacity} from 'react-native';
import styles from "./styles"
import { Dialog, Portal, Appbar, Provider, Button } from 'react-native-paper';
import Perfil from "../MiPerfil"
import IconAD from 'react-native-vector-icons/AntDesign';
import ModalSugerencia from "../ModalSugerencia";
import ModalLugaresProblematicos from "../LugaresProblematicos";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Menu({handlePressButtons, navigation}){
    const [isVisiblePerfil, setIsVisiblePerfil] = useState(false);
    const [isVisibleLugares, setModalLugaresProblematicos] = useState(false);
    const [isVisibleSugerencia, setModalSugerencia] = useState(false);
    const [isVisibleCerrarSesion, setIsVisibleCerrarSesion] = useState(false);

    const eliminarToken = async () => {
        try {
          await AsyncStorage.removeItem('usuario')
          console.log("el usuario fue removido");
        } catch(e) {
            console.log("error al remover el usuario");
        }
      
    }
    
    return(
        <>
        {isVisiblePerfil ? <Perfil setIsVisiblePerfil={setIsVisiblePerfil} />:(null)}
        {isVisibleLugares ? <ModalLugaresProblematicos setModalLugaresProblematicos={setModalLugaresProblematicos} />:(null)} 
        {isVisibleSugerencia ? <ModalSugerencia setModalSugerencia={setModalSugerencia} />:(null)}
        
        <View style={styles.containerMenu} >
              <View style={styles.menu}>
                <Appbar.Header style={styles.containerNav}>
                    <Appbar.Content style={styles.containerTitle} titleStyle={styles.title} title="Menú" />
                    <Appbar.Action animated={false} style={styles.botonCerrar} onPress={()=>{handlePressButtons("mapa")}} icon={props => <IconAD name="close" size={35} color="black" />} />
                </Appbar.Header>

                <View style={styles.containerOpciones}> 
                    <TouchableOpacity style={styles.opcionPerfil} >
                        <Text style={styles.textOpcion}>Notificaciones</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.opcionPerfil} onPress={()=>{setModalSugerencia(true)}}>
                        <Text style={styles.textOpcion}>Sugerencia</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.opcionPerfil} onPress={()=>{setModalLugaresProblematicos(true)}}>
                        <Text style={styles.textOpcion}>Ver lugares</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerBotonCerrarSesion}>
                    <TouchableOpacity style={styles.botonCerrarSesion} onPress={()=>{setIsVisibleCerrarSesion(true)}} >
                        <Text style={styles.textCerrarSesion}>Cerrar sesión</Text>
                    </TouchableOpacity> 
                </View>
              </View>
        
                <Provider >
                    <Portal>
                        <Dialog visible={isVisibleCerrarSesion} onDismiss={()=>setIsVisibleCerrarSesion(false)}>
                            <Dialog.Icon icon="alert" />
                            <Dialog.Title>¿Estás seguro que deseas cerrar sesión?</Dialog.Title>
                            <Dialog.Actions>
                            <Button onPress={()=>setIsVisibleCerrarSesion(false)}>Cancelar</Button>
                            <Button onPress={eliminarToken}>Confirmar</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                </Provider>

        </View>
        

        </>
        
    )
}