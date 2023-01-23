import React,{useState,useEffect} from "react"
import { View, Text, ScrollView, Dimensions } from 'react-native';
import styles from "./styles"
import CardAlerta from "../CardAlerta"
import { useSelector } from "react-redux";
import Alerta from "../DetallesAlerta"
import Comentarios from "../Comentarios";
import Appbar from "../Appbar"


export default function Alertas({handlePressButtons,socket}) {

    const [alertas, setAlertas] = useState([])
    const [likesAlertas, setLikesAlertas] = useState(null);
    const [comentariosAlertas, setComentariosAlertas] = useState(null);
    const alertasRedux = useSelector(state => state.alertas.alertas)
    const [alertaSeleccionada, setAlertaSeleccionada] = useState(null)
    const [verAlerta, setVerAlerta] = useState(null)
    const [verComentarios, setVerComentarios] = useState(false);
    const [isVisibleAlerta, setIsVisibleAlerta] = useState(false);
    const dimensionesPantalla = Dimensions.get("window");
    const comentariosRedux = useSelector(state => state.comentarios.comentarios)
    const likesAlertaRedux = useSelector(state => state.likesAlerta.usuarios)

    useEffect(() => {
        if(alertasRedux !== undefined){
            setAlertas(alertasRedux);
        }
    },[alertasRedux]) 

    useEffect(() => {
      if(likesAlertaRedux !== null){
        setLikesAlertas(likesAlertaRedux);
      }else{
        setLikesAlertas(null);
      }
    }, [likesAlertaRedux,alertasRedux])
    
    useEffect(() => {
        if(comentariosRedux !== null){
            setComentariosAlertas(comentariosRedux);
          }else{
            setComentariosAlertas(null);
          }
    }, [comentariosRedux,alertasRedux])
    
    const filtrarLikesAlerta = (alertaId) => {
        if(likesAlertas !== null && likesAlertas !== undefined){
            const likes = [];
            likesAlertas.map(like => {
                if(like.alertaId === alertaId){
                    likes.push(like)
                }
            })
            return likes;
        }else{
            return null
        }
    }

    const filtrarComentariosAlerta = (alertaId) => {
        if(comentariosAlertas !== null && comentariosAlertas !== undefined){
            const comentarios = [];
            comentariosAlertas.map(comentario => {
                if(comentario.alertaId === alertaId){
                    comentarios.push(comentario)
                }
            })
            return comentarios;
        }else{
            return null
        }
    }



    return(
        <>
            {isVisibleAlerta ? <Alerta socket={socket} setIsVisibleAlerta={setIsVisibleAlerta} verAlerta={verAlerta} permisos={true}/> : null }
            {verComentarios ? <Comentarios socket={socket} setVerComentarios={setVerComentarios} alertaId={alertaSeleccionada.id} /> : (null)} 

            <View style={styles.containerAlertas} >
                <Appbar titulo="Alertas" handlePressButtonRight={()=>{handlePressButtons("mapa")}} iconoDerecha="close" />
                <View style={dimensionesPantalla.height < 700 ? styles.alertasPantallaPeque: styles.alertasPantallaGrand}>
                    <ScrollView style={styles.containerAlertasActuales}> 
                       {alertas !== null ? (
                            alertas.map((alerta,i) => (
                               alerta.activa === true ? 
                                    <CardAlerta socket={socket} alerta={alerta} likes={filtrarLikesAlerta(alerta.id)} todosLosLikes={likesAlertas} comentarios={filtrarComentariosAlerta(alerta.id)} setIsVisibleAlerta={setIsVisibleAlerta} setVerAlerta={setVerAlerta} key={i} setVerComentarios={setVerComentarios} setAlertaSeleccionada={setAlertaSeleccionada}/>
                               :(null)   
                            ))
                        ):(
                            <View style={styles.containerNoAlertas}>
                                <Text style={styles.textoNoAlertas}>No se encontraron alertas.</Text>
                            </View>
                        )}     
                    </ScrollView> 
                </View>  
            </View>
        </>
        
    )
}