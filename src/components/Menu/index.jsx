import React,{useState} from "react"
import { View, Text, TouchableOpacity } from 'react-native';
import styles from "./styles"
import { Button } from 'react-native-paper';
import Perfil from "../MiPerfil"

export default function Menu(){
    const [isVisiblePerfil, setIsVisiblePerfil] = useState(false);

    return(
        <>
        {
            isVisiblePerfil ? <Perfil setIsVisiblePerfil={setIsVisiblePerfil} />:(null)
        }
        
        <View style={styles.containerMenu} >
              <View style={styles.menu}>
                  <View style={styles.menuTitle}> 
                     <Text style={styles.title}>Menú</Text>
                  </View>
                  <View style={styles.containerOpciones}> 
                    {/* <TouchableOpacity style={styles.opcionPerfil} onPress={()=>{setIsVisiblePerfil(true)}}>
                        <Text style={styles.textOpcion}>Mi perfil</Text>
                    </TouchableOpacity> */}

                    <TouchableOpacity style={styles.opcionPerfil} >
                        <Text style={styles.textOpcion}>Notificaciones</Text>
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