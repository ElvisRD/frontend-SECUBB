import React, { useEffect, useRef, useState } from 'react'
import {View, TouchableOpacity, Image, Dimensions } from 'react-native';
import styles from './styles';
import { Camera } from 'expo-camera';
import Icon from 'react-native-vector-icons/AntDesign';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons'
import IconMI from 'react-native-vector-icons/MaterialIcons'



export default function Camara({setVisibleCamara, setImagen}){
    const [type, _] = useState(Camera.Constants.Type.back);
    const [foto, setFoto] = useState(null);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const camaraRef = useRef(null);
    const dimensionesPantalla = Dimensions.get("window");
    const height = Math.round((dimensionesPantalla.width * 16) / 9);

    
     const TomarFoto = async () => {
 
        if(camaraRef){
            await camaraRef.current.takePictureAsync().then((result) => {
                setFoto(result.uri)
            }).catch((err) => {
               console.log(err); 
            });
        }
     };



     const guardarImagen = () => {
        setVisibleCamara(false);
        setImagen(foto);
     };

     const Imagen = () => {
        return (
            <>
                <View style={styles.containerImagen}>
                    <Image source={{uri: foto}} style={[styles.camera ,{height: "95%"}]}/>
                </View>
                <View style={styles.containerBotonesFotoTomada}>
                    
                    <TouchableOpacity style={styles.botonFotoTomada} onPress={()=>{setFoto(null)}}>
                        <IconMC
                            name='reload'
                            color='white'
                            size={30}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botonFotoTomada} onPress={guardarImagen}>
                        <Icon
                            name='check'
                            color='white'
                            size={30}
                        />
                    </TouchableOpacity>
                </View>
            </>
           
        )
     }

     const Camara = () => {
        return (
            <>  
                <View style={styles.containerBotonesCamara}>
                    <View>
                        <TouchableOpacity onPress={()=>{setVisibleCamara(false)}}>
                            <Icon 
                                name='arrowleft'
                                color='white'
                                size={40}
                            />
                        </TouchableOpacity>
                    </View>
                    
                    <View>
                        <TouchableOpacity style={styles.botonFlash} 
                        onPress={()=> 
                            setFlash(flash === Camera.Constants.FlashMode.off 
                            ? Camera.Constants.FlashMode.on
                            : Camera.Constants.FlashMode.off)}>

                            <IconMC 
                                name='flash'
                                color={flash === Camera.Constants.FlashMode.off
                                ? "gray" 
                                : "white"}
                                size={40}
                            />
                                        
                        </TouchableOpacity>
                    </View>
                </View>

                <Camera style={[styles.camera ,{height: height }]} type={type}
                ref={camaraRef} flashMode={flash}
                ratio='16:9'
                />        
                
                <View style={styles.containerBotonSacarFoto}>
                    <TouchableOpacity style={styles.botonSacarFoto} onPress={TomarFoto}>
                        <IconMI 
                            name='motion-photos-on'
                            color='white'
                            size={80}
                        />
                    </TouchableOpacity>
                </View>
            </>    
        )
     }

    return(
        <View style={styles.containerCamara}>
           
           {!foto ? <Camara/> :
            <Imagen />}
            
        </View>

    )
}