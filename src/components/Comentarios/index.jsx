import React, {useEffect, useState, useRef} from "react"
import { View, Text, TouchableOpacity, BackHandler, Keyboard,ScrollView, Dimensions } from "react-native"
import CardComentario from '../CardComentario';
import styles from "./styles"
import {editarComentario} from "../../data/comentarios";
import { TextInput, Dialog, Portal, Paragraph, Button, Provider } from 'react-native-paper';
import { useSelector, useDispatch } from "react-redux";
import { crearComentario } from "../../data/comentarios";
import { guardarComentarioRedux, editarComentarioRedux } from "../../redux/actions/comentariosActions";
import Toast from 'react-native-toast-message';
import Appbar from "../Appbar";
import formatText from "../../utils/modificarPrimeraLetra";



export default function Comentarios({setVerComentarios, socket, alertaId}) {

    const [inputComentario, setInputComentario] = useState("");
    const [comentarios, setComentarios] = useState(null);
    const [iconoInput, setIconoInput] = useState(false);
    const [confirmacion, setConfirmacion] = useState(false);
    const comentariosRedux = useSelector(state => state.comentarios.comentarios);
    const likesComentariosRedux = useSelector(state => state.likesComentario.usuarios);
    const usuarioRedux = useSelector(state => state.usuario.usuario);
    const [likesComentarios, setLikesComentarios] = useState(null);
    const [comentarioEditado, setComentarioEditado] = useState(null);
    const [modalEditar, setModalEditar] = useState(false);
    const dispatch = useDispatch();
    const dimensionesPantalla = Dimensions.get("window");  
    const scrollRef = useRef(null);
   
    useEffect(() => {
        const backAction = () => {
          setVerComentarios(false);
          return true;
        };
        
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setIconoInput(false)
        });

        /* const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        ); */
    
        return () => {
            //backHandler.remove(); 
            hideSubscription.remove();
        };
    }, []);

      useEffect(() => {
        if(comentariosRedux !== null){
            let comentariosFiltrados = comentariosRedux.filter(comentario => comentario.alertaId === alertaId);
            let comentariosOrdenados = comentariosFiltrados.sort((a, b) => a.id > b.id);
            setComentarios(comentariosOrdenados);
        }

      }, [comentariosRedux])

      useEffect(() => {
        if(likesComentariosRedux !== null){
            setLikesComentarios(likesComentariosRedux);
        }else{
            setLikesComentarios(null);
        }

      },[likesComentariosRedux,comentariosRedux])

      const filtrarLikesComentarios = (comentarioId) => {
        if(likesComentarios !== null && likesComentarios !== undefined){
            const likes = [];
            likesComentarios.map(like => {
                if(like.comentarioId === comentarioId){
                    likes.push(like)
                }
            })
            return likes;
        }else{
            return null
        }
    }
      
      const crearUnComentario = async () => {
        let inputComentarioEditado = inputComentario.replace("  ", '_');
        if(inputComentario !== "" && inputComentario !== " "){
            if(!inputComentarioEditado.includes("_")){
                const body = {
                    alertaId: alertaId,
                    comentario: formatText(inputComentario),
                    usuarioId: usuarioRedux.id,
        
                }
        
                let comentario = null;
                await crearComentario(body).then((result) => {
                    comentario=result.nuevoComentario;
                  }).catch((err) => {
                    console.log(err);
                }); 
        
                await socket.emit("comentario", comentario);
                dispatch(guardarComentarioRedux(comentario));
        
                Keyboard.dismiss()
                if (scrollRef && scrollRef.current) {
                    scrollRef.current?.scrollToEnd();
                }
                setInputComentario("");
                setConfirmacion(false)
            }else{
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Elimine los espacios seguidos.',
                    visibilityTime: 3000,
                });
            }
            
        }else{
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Introduzca su comentario.',
                visibilityTime: 3000,
            });
        }
      }

      const guardarComentarioEditado = async () => {
        if(comentarioEditado.comentario !== "" && comentarioEditado.comentario !== " "){
            let comentarioNuevo = comentarioEditado.comentario.replace("  ", '_');
            if(!comentarioNuevo.includes("_")){
                const body = {
                    id: comentarioEditado.id,
                    comentario: formatText(comentarioEditado.comentario),
                } 
    
                editarComentario(body).then(() => {
                    Toast.show({
                        type: 'success',
                        position: 'top',
                        text1: 'El comentario fue editado con éxito.',
                        visibilityTime: 3000,
                    });
                }).catch((err) => {
                    if(err.response.status === 404){
                        Toast.show({
                            type: 'error',
                            position: 'top',
                            text1: 'Error al editar el comentario.',
                            visibilityTime: 3000,
                        });
                    }else{
                        Toast.show({
                            type: 'info',
                            position: 'top',
                            text1: 'El comentario es el mismo',
                            visibilityTime: 3000,
                        });
                    }
                });
                
                comentarioEditado.comentario = formatText(comentarioEditado.comentario);
    
                await socket.emit("editarComentario", comentarioEditado);
                dispatch(editarComentarioRedux(comentarioEditado));
                setModalEditar(false) 
            }else{
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Elimine los espacios seguidos.',
                    visibilityTime: 3000,
                }); 
            }
            
        }else{
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Introduzca su comentario.',
                visibilityTime: 3000,
            });
        }
    }

    return (
    <View style={styles.containerComentarios} >
        <Appbar handlePressButtonLeft={()=>{setVerComentarios(false)}} iconoIzquierda="arrowleft" />
        <View style={styles.containerTitle}>
            <Text style={styles.title}>Comentarios</Text>
        </View>
            <ScrollView style={dimensionesPantalla.height < 700 ? styles.containerCardComentarioPantallaPeque:styles.containerCardComentarioPantallaGrand} >
                    {
                        comentarios !== null && comentarios[0] !== undefined ? (
                            comentarios.map((comentario, index) => {
                                return (
                                    <View style={styles.containerUniqueCardComentario} key={index}>
                                        <CardComentario comentario={comentario} todosLosLikes={likesComentarios} socket={socket} likes={filtrarLikesComentarios(comentario.id)} alertaId={alertaId} setModalEditar={setModalEditar} setComentarioEditado={setComentarioEditado} />
                                     </View>
                                )
                            })
                        ) : (
                            <View style={styles.containerErrorComentarios}> 
                                <Text style={styles.textoErrorComentario}>No se encontraron comentarios.</Text>
                            </View>
                        )
                    }
            </ScrollView>    

            <View style={styles.containerTextInputComentario}>
                <TextInput style={styles.textInput} multiline={true} activeUnderlineColor="transparent" value={inputComentario} onFocus={()=>setIconoInput(true)}  
                onChangeText={(text) => setInputComentario(text)}  placeholder='Deja tu comentario' maxLength={100} />
                <View style={styles.containerBotonEnviar}>
                    <TouchableOpacity style={styles.botonEnviar} onPress={crearUnComentario} disabled={iconoInput?(inputComentario !== ""?false:true):(inputComentario !== "" ? (false):(true))} >
                        <Text style={styles.textoBotonEnviar}>Enviar</Text>
                    </TouchableOpacity>
                </View>
            </View>
           
        <Provider>
            <Portal>
            <Dialog style={{backgroundColor: "white"}} visible={confirmacion} onDismiss={()=>setConfirmacion(false)}>
                <Dialog.Title>¿Estas seguro que quieres comentar lo siguiente?</Dialog.Title>
                <Dialog.Content>
                <Paragraph>{inputComentario}</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                <Button onPress={()=>setConfirmacion(false)}>Cancelar</Button>
                <Button onPress={crearUnComentario}>Confirmar</Button>
                </Dialog.Actions>
            </Dialog>
            </Portal>
        </Provider>

        <Provider >
                <Portal>
                        <Dialog contentStyles={{backgroundColor: "white"}} visible={modalEditar} onDismiss={()=>setModalEditar(false)}>
                        <Dialog.Content style={styles.containerTituloAlerta}><Text style={styles.textoAlertaEditar}>Editar comentario</Text></Dialog.Content>
                        <Dialog.Content style={styles.containerInputEditComentario}>
                            <TextInput style={styles.textInput} autoFocus={true} multiline={true} activeUnderlineColor="transparent" defaultValue={comentarioEditado !== null ? comentarioEditado.comentario : ""}
                            onChangeText={(text) => setComentarioEditado({...comentarioEditado, comentario: text})} placeholder='Deja tu comentario' maxLength={100} />
                        </Dialog.Content>
                        <Dialog.Actions>
                        <Button onPress={()=>setModalEditar(false)}><Text style={styles.textoBotonAlertaEditar}>Cancelar</Text></Button>
                        <Button onPress={guardarComentarioEditado}><Text style={styles.textoBotonAlertaEditar}>Confirmar</Text></Button>
                        </Dialog.Actions>  
                    </Dialog>
                </Portal>
        </Provider>
        
    </View>
    )
}
