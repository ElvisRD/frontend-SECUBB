import React,{useState} from "react"
import { View, Text, TouchableOpacity } from 'react-native';
import styles from "./styles"
import { Button, Appbar } from 'react-native-paper';
import Perfil from "../MiPerfil"
import IconAD from 'react-native-vector-icons/AntDesign';
import ModalSugerencia from "../ModalSugerencia";
import ModalLugaresProblematicos from "../LugaresProblematicos";

export default function Menu({handlePressButtons}){
    const [isVisiblePerfil, setIsVisiblePerfil] = useState(false);
    const [isVisibleLugares, setModalLugaresProblematicos] = useState(false);
    const [isVisibleSugerencia, setModalSugerencia] = useState(false);
    
    return(
        <>
        {isVisiblePerfil ? <Perfil setIsVisiblePerfil={setIsVisiblePerfil} />:(null)}
        {isVisibleLugares ? <ModalLugaresProblematicos setModalLugaresProblematicos={setModalLugaresProblematicos} />:(null)} 
        {isVisibleSugerencia ? <ModalSugerencia setModalSugerencia={setModalSugerencia} />:(null)}
        
        <View style={styles.containerMenu} >
              <View style={styles.menu}>
                {/* <View style={styles.containerBotonCerrar}>
                        <TouchableOpacity style={styles.botonCerrar} onPress={()=>{handlePressButtons("mapa")}}>
                            <IconAD name="close" size={30} color="black" />
                        </TouchableOpacity> 
                </View>
                <View style={styles.menuTitle}> 
                    <Text style={styles.title}>Menú</Text>
                </View> */}
                <Appbar.Header >
                    <Appbar.Content style={styles.containerTitle} titleStyle={styles.title} title="Menú" />
                    <Appbar.Action animated={false} style={styles.botonCerrar} onPress={()=>{handlePressButtons("mapa")}} icon={props => <IconAD name="close" size={35} color="black" />} />
                </Appbar.Header>

                <View style={styles.containerOpciones}> 
                    {/* <TouchableOpacity style={styles.opcionPerfil} onPress={()=>{setIsVisiblePerfil(true)}}>
                        <Text style={styles.textOpcion}>Mi perfil</Text>
                    </TouchableOpacity> */}

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
                    <View style={styles.botonCerrarSesion} >
                        <Button onPress={() => console.log('Pressed')} >
                            Cerrar sesión
                        </Button>
                    </View>  
                </View>
              </View>
             
        </View>
        </>
        
    )
}