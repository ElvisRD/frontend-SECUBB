import React, {useEffect, useState, useRef} from "react"
import { View, Text, TouchableOpacity, BackHandler, Keyboard,ScrollView } from "react-native"
import IconAD from 'react-native-vector-icons/AntDesign';
import CardComentario from '../CardComentario';
import styles from "./styles"
import {editarComentario} from "../../data/comentarios";
import { TextInput, Dialog, Portal, Paragraph, Button, Provider, Appbar } from 'react-native-paper';
import { useSelector, useDispatch } from "react-redux";
import { crearComentario } from "../../data/comentarios";
import { guardarComentarioRedux, editarComentarioRedux } from "../../redux/actions/comentariosActions";
import Toast from 'react-native-toast-message';



export default function Comentarios({setVerComentarios, socket, alertaId}) {

    const [inputComentario, setInputComentario] = useState("");
    const [comentarios, setComentarios] = useState(null);
    const [iconoInput, setIconoInput] = useState(false);
    const [confirmacion, setConfirmacion] = useState(false);
    const comentariosRedux = useSelector(state => state.comentarios.comentarios);
    const usuarioRedux = useSelector(state => state.usuario.usuario);
    const [comentarioEditado, setComentarioEditado] = useState(null);
    const [modalEditar, setModalEditar] = useState(false);
    const dispatch = useDispatch();
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
            setComentarios(comentariosFiltrados);
        }

      }, [comentariosRedux])
      
      const crearUnComentario = async () => {

        const body = {
            alertaId: alertaId,
            comentario: inputComentario,
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
      }

      const guardarComentarioEditado = async () => {

        const body = {
            id: comentarioEditado.id,
            comentario: comentarioEditado.comentario,
        } 

        editarComentario(body).then(() => {
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'El comentario fue editado con éxito.',
                visibilityTime: 2000,
            });
        }).catch((err) => {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Ocurrio un error al editar el comentario.',
                visibilityTime: 2000,
            });
        });
        
        await socket.emit("editarComentario", comentarioEditado);
        dispatch(editarComentarioRedux(comentarioEditado));
        setModalEditar(false)

    }


    return (
    <View style={styles.containerComentarios} >
        <Appbar.Header style={styles.containerNav}>
            <Appbar.Action animated={false} style={styles.botonCerrar} onPress={()=>{setVerComentarios(false)}} icon={props => <IconAD name="arrowleft" size={35} color="black" />} />
        </Appbar.Header>
        <View style={styles.containerTitle}>
            <Text style={styles.title}>Comentarios</Text>
        </View>
            <ScrollView style={styles.containerCardComentario}>
                    {
                        comentarios !== null && comentarios[0] !== undefined ? (
                            comentarios.map((comentario, index) => {
                                return (
                                    <View style={styles.containerUniqueCardComentario} key={index}>
                                        <CardComentario comentario={comentario} socket={socket} alertaId={alertaId} setModalEditar={setModalEditar} setComentarioEditado={setComentarioEditado} />
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
            <Dialog visible={confirmacion} onDismiss={()=>setConfirmacion(false)}>
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
                        <Dialog visible={modalEditar} onDismiss={()=>setModalEditar(false)}>
                        <Dialog.Title>Editar comentario</Dialog.Title>
                        <Dialog.Content style={styles.containerInputEditComentario}>
                            <TextInput style={styles.textInput} autoFocus={true} multiline={true} activeUnderlineColor="transparent" defaultValue={comentarioEditado !== null ? comentarioEditado.comentario : ""}
                            onChangeText={(text) => setComentarioEditado({...comentarioEditado, comentario: text})} placeholder='Deja tu comentario' maxLength={100} />
                        </Dialog.Content>
                        <Dialog.Actions>
                        <Button onPress={()=>setModalEditar(false)}>Cancelar</Button>
                        <Button onPress={guardarComentarioEditado}>Confirmar</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
        </Provider>
        
    </View>
    )
}
