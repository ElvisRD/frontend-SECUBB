import React from "react"
import { View, Text } from 'react-native';
import styles from "./styles"
import Noticia from "../Noticia"


export default function Noticias(){
    return(
        <View style={styles.containerNoticias} >
              <View style={styles.noticias}>
                  <View style={styles.noticiasTitle}> 
                     <Text style={styles.title}>Noticias</Text>
                  </View>
                  <View style={styles.containerNoticiasActuales}> 
                    <Noticia />
                  </View>
                  
              </View>
             
        </View>
    )
}