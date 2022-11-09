import React,{useState} from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import {KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import styles from './styles'

export default function MiPerfil({setIsVisiblePerfil}){
    const [visibleContraseña, setVisibleContraseña] = useState(true);

    const contraseñaVisible = () => {
        if(visibleContraseña){
            setVisibleContraseña(false)
        }else{
            setVisibleContraseña(true)
        }
    }

    return(
        <View style={styles.containerPerfil}>
            <KeyboardAwareScrollView  bounces={false} style={styles.perfil}>
            <View style={styles.containerBotonCerrar}>
                <TouchableOpacity style={styles.botonCerrar} onPress={()=>{setIsVisiblePerfil(false)}}>
                    <Text style={styles.textoCerrar}>Volver</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.containerTituloPerfil}>
                <Text style={styles.tituloPerfil}>Mi Perfil</Text>
            </View>

            <View style={styles.containerInputs}>
                <View style={styles.containerInput}>
                    <TextInput mode="outlined" label="Nombre" />
                </View>
                <View style={styles.containerInput}>
                    <TextInput mode="outlined" label="Apellido"/>
                </View>
                <View style={styles.containerInput}>
                    <TextInput mode="outlined" label="Contraseña" secureTextEntry={visibleContraseña} right={<TextInput.Icon icon="eye" onPress={contraseñaVisible}/>}/>
                </View>
                <View style={styles.containerInput}>
                    <TextInput mode="outlined" label="Verificador Contraseña" secureTextEntry={visibleContraseña} right={<TextInput.Icon icon="eye" onPress={contraseñaVisible}/>}/>
                </View>
                <View style={styles.containerInput}>
                    <TextInput mode="outlined" label="Correo"/>
                </View>

            </View>
            <View style={styles.containerBotonEditar}>
                <Button>
                    Editar
                </Button>
            </View>

            </KeyboardAwareScrollView>
            
            
        </View>
    )
}