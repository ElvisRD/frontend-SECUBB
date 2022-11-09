import React,{useState} from "react"
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import styles from "../../pages/home/style"
import { Button } from 'react-native-paper';
import { MaterialCommunityIcons } from "@expo/vector-icons";



export default function Alerta(){
    const [liked, setLiked] = useState(false);

    return(
        <TouchableOpacity style={styles.containerAlerta} >
            <View style={styles.AlertaCard}>
                <View style={styles.containerTitulo}>
                    <Text style={styles.titulo}>Ruidos molestos</Text>
                    <Text>hora</Text>
                </View>
                <View style={styles.containerDescripcion}>
                    <Text style={styles.descripcion}>un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum</Text>
                </View>
                <View>
                    <Text>imagen</Text>
                </View>
                <View style={styles.containerBotones}>
                    <Pressable onPress={() => setLiked((isLiked) => !isLiked)}>
                        <MaterialCommunityIcons
                            name={liked ? "heart" : "heart-outline"}
                            size={25}
                            color={liked ? "red" : "black"}
                        />
                    </Pressable>

                    <TouchableOpacity style={styles.botonComentarios}>
                        <MaterialCommunityIcons
                            name="chat-outline"
                            size={300}
                        />
                    </TouchableOpacity>
                </View>

            </View>
            
        </TouchableOpacity>
    )
}